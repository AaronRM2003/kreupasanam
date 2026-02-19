import { useState, useEffect, useRef } from 'react';
import { enhanceWithSsml } from './useSsml';
import { useIsGoogleTTS } from './useIsGoogleTts';
import { useSSMLSupportTest } from './useIsSsmlSupport';
import { useSelectedVoice } from './useSelectedVoice';
import { addEndTimesToSubtitles, speechUnits } from '../utils/Utils';

export function useSpeechSync({
  playerRef,
  showVideo,
  subtitles,
  currentSubtitle,
  currentTime,
  lang,
  isBrowserTranslateOn=false,
  userLang = null,
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const hasStartedSpeakingRef = useRef(false);
  const lastSpokenRef = useRef('');
  const [playerReady, setPlayerReady] = useState(false);
  const didInitialSyncRef = useRef(false);
  const activeSubtitleKeyRef = useRef(null);
  const lastVideoTimeRef = useRef(0);
  const carryOverDebtRef = useRef(0);

  // --- NEW refs for fade logic ---
  const fadeRafRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const scheduledDownTimeoutRef = useRef(null);
  const lastUserAdjustAtRef = useRef(0);
  const userManualOverrideRef = useRef(false); // true if user moved slider recently
  const fadeStateRef = useRef({}); // store currently active fade details

  const acceptedUserLang =
    lang === "en" &&
    isBrowserTranslateOn &&
    userLang &&
    !!localStorage.getItem(userLang);  // exact only

  const effectiveLang = acceptedUserLang ? userLang : lang;
  const baseLang = (effectiveLang || "en").split("-")[0];

  const isSSMLSupported = useSSMLSupportTest();

  function normalizeTextForCompare(t) {
    return (t || "")
      .replace(/\s+/g, " ")
      .replace(/\u00A0/g, " ") // nbsp
      .trim()
      .toLowerCase();
  }
  const translatedDomRef = useRef("");
  function readSubtitleDom() {
    const el = document.getElementById("subtitle-dom");
    return (el?.innerText || el?.textContent || "").trim();
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function waitForTranslatedDomTextStable(
    original,
    {
      maxWaitMs = 2000,
      stableMs = 80,
      minDiffChars = 2,
    } = {}
  ) {
    const start = performance.now();
    const normOriginal = normalizeTextForCompare(original);

    let lastDom = "";
    let lastChangeAt = performance.now();

    while (performance.now() - start < maxWaitMs) {
      const domText = readSubtitleDom();
      const normDom = normalizeTextForCompare(domText);

      if (domText !== lastDom) {
        lastDom = domText;
        lastChangeAt = performance.now();
      }

      const isDifferent = normDom && normDom !== normOriginal;
      const diffEnough =
        Math.abs((normDom?.length || 0) - (normOriginal?.length || 0)) >= minDiffChars;

      if (isDifferent && diffEnough && performance.now() - lastChangeAt >= stableMs) {
        return { text: domText, delayMs: performance.now() - start };
      }

      await new Promise(requestAnimationFrame);
    }

    return { text: null, delayMs: performance.now() - start };
  }

  useEffect(() => {
    if (!isSpeaking) {
      didInitialSyncRef.current = false;
    }
  }, [isSpeaking]);

  useEffect(() => {
    const last = lastVideoTimeRef.current;
    const now = currentTime;
    const delta = now - last;

    if (Math.abs(delta) > 0.8) {
      // big seek - cancel everything
      window.speechSynthesis.cancel();

      activeSubtitleKeyRef.current = null;
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = '';
      didInitialSyncRef.current = false;

      carryOverDebtRef.current = 0;

      // cancel fades
      cancelAutoFade();
    }
    lastVideoTimeRef.current = now;
  }, [currentTime]);

  useEffect(() => {
    if (!isBrowserTranslateOn) return;

    const wrapper = document.getElementById("subtitle-wrapper");
    if (!wrapper) return;

    const update = () => {
      const el = document.getElementById("subtitle-dom");
      translatedDomRef.current = (el?.innerText || el?.textContent || "").trim();
    };

    update();

    const obs = new MutationObserver(update);
    obs.observe(wrapper, { childList: true, subtree: true, characterData: true });

    return () => obs.disconnect();
  }, [isBrowserTranslateOn]);

  // Sync volume once player is available
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player?.setVolume instanceof Function) {
        player.setVolume(volume);
        setPlayerReady(true);
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [volume, playerRef]);

  useEffect(() => {
    if (playerReady && playerRef.current?.setVolume instanceof Function) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady, playerRef]);

  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      if (hasStartedSpeakingRef.current) {
        window.speechSynthesis.cancel();
        activeSubtitleKeyRef.current = null;
      }
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = '';
      // Stop fades
      cancelAutoFade();
    }
  }, [isSpeaking, showVideo]);

  const maxStepUp = 0.5;
  const lastAdjustedRateRef = useRef(1);

  function adjustedRateFixedSpeech(wps, rawRate, margin) {
    const k = rawRate / wps;
    let adjustedRate = 1 / k;
    adjustedRate -= margin;
    return Math.max(0, Math.min(1, adjustedRate));
  }

  function getSmoothedAdjustedRate(wps, rawRate, margin) {
    const targetAdjustedRate = adjustedRateFixedSpeech(wps, rawRate, margin);

    const lastAdj = lastAdjustedRateRef.current;

    if (targetAdjustedRate < lastAdj) {
      lastAdjustedRateRef.current = targetAdjustedRate;
      return parseFloat(targetAdjustedRate.toFixed(4));
    } else if (targetAdjustedRate > lastAdj) {
      let newAdjRate = lastAdj + maxStepUp;
      if (newAdjRate > targetAdjustedRate) newAdjRate = targetAdjustedRate;
      lastAdjustedRateRef.current = newAdjRate;
      return parseFloat(newAdjRate.toFixed(4));
    } else {
      return parseFloat(lastAdj.toFixed(4));
    }
  }

  // --------------------
  // Volume fade helpers (NEW)
  // --------------------
  function cancelAutoFade() {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    if (scheduledDownTimeoutRef.current) {
      clearTimeout(scheduledDownTimeoutRef.current);
      scheduledDownTimeoutRef.current = null;
    }
    fadeStateRef.current = {};
  }

  // linear fade using requestAnimationFrame
  function fadeVolume({ from, to, duration = 800, onTick = null, onComplete = null }) {
    cancelAutoFade();
    const start = performance.now();
    fadeStateRef.current = { from, to, duration, start };

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const next = Math.round(from + (to - from) * t);
      // Only apply if user didn't recently override:
      const sinceManual = performance.now() - (lastUserAdjustAtRef.current || 0);
      const manualOverrideActive = userManualOverrideRef.current && sinceManual < 2000; // 2s grace
      if (!manualOverrideActive) {
        setVolume((prev) => {
          // avoid redundant setState if same
          if (prev === next) return prev;
          if (playerRef.current?.setVolume) playerRef.current.setVolume(next);
          return next;
        });
      } else {
        // If user override is active, cancel fades
        cancelAutoFade();
        if (onComplete) onComplete(false);
        return;
      }

      if (onTick) onTick(next);

      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
        fadeStateRef.current = {};
        if (onComplete) onComplete(true);
      }
    }
    fadeRafRef.current = requestAnimationFrame(step);
  }

  // Schedule an automatic fade up after speech end, then schedule ramp down before next subtitle
  function scheduleAutoFadeAfterSpeech({ currentSub, currentTimeSec }) {
    cancelAutoFade();

    // don't run if user manual override was set very recently
    const sinceManual = performance.now() - (lastUserAdjustAtRef.current || 0);
    if (userManualOverrideRef.current && sinceManual < 1500) {
      // user just adjusted — skip automatic fades this time
      return;
    }

    // compute next subtitle start (if any)
    const idx = subtitles.findIndex(s => s.startSeconds === currentSub.startSeconds && s.endSeconds === currentSub.endSeconds);
    const nextSub = (idx >= 0 && idx + 1 < subtitles.length) ? subtitles[idx + 1] : null;

    const nowVideo = currentTimeSec; // seconds
    const timeUntilNextMs = nextSub ? Math.max(0, (nextSub.startSeconds - nowVideo) * 1000) : 6000;

    // Fade up start: 2s after speech end
    const fadeUpDelay = 2000;
    let fadeUpStartDelay = fadeUpDelay;

    // If next subtitle is very soon, compress the fade up duration so we don't overshoot
    let fadeUpDuration = 800; // ms default
    // We'll plan to start ramp-down 800ms before next subtitle
    const downLeadMs = 800;
    let rampDownStartIn = Math.max(0, timeUntilNextMs - downLeadMs);

    // If rampDownStartIn <= fadeUpDelay, there's not enough room. Compress fade up duration
    if (rampDownStartIn <= fadeUpDelay) {
      // make fadeUp start immediately, compress duration to finish before ramp down
      fadeUpStartDelay = 200; // start almost immediately after end
      fadeUpDuration = Math.max(100, Math.min(600, Math.floor(Math.max(50, rampDownStartIn - 100))));
      // if still tiny, we'll just do a brief pop and then immediate ramp down
    }

    // determine volumes:
    const currentVol = volume;
    // automated max: if user never moved, use 100; if user moved, respect their chosen level as maximum
    const userPrefVol = (lastUserAdjustAtRef.current ? currentVol : null);
    const autoMaxVol = userPrefVol != null ? Math.max(currentVol, userPrefVol) : 100;
    const targetUpVol = Math.min(100, Math.max(currentVol, autoMaxVol));

    // target down is 10 (but only if user hasn't recently overridden)
    const targetDownVol = 10;

    // schedule fade up
    fadeTimeoutRef.current = setTimeout(() => {
      // double-check not overridden recently
      const sinceManualInner = performance.now() - (lastUserAdjustAtRef.current || 0);
      if (userManualOverrideRef.current && sinceManualInner < 1500) {
        cancelAutoFade();
        return;
      }

      fadeVolume({
        from: (typeof volume === 'number' ? volume : 10),
        to: targetUpVol,
        duration: fadeUpDuration,
        onComplete: (succeeded) => {
          // if succeeded and next subtitle exists, schedule ramp down
          if (!succeeded) return;
          // compute exact ms until ramp down start
          if (nextSub) {
            // compute up-to-date time until next using currentTime prop
            const nowVideo2 = currentTime; // seconds (prop may be updated)
            const msUntilNext = Math.max(0, (nextSub.startSeconds - nowVideo2) * 1000);
            const downAt = Math.max(0, msUntilNext - downLeadMs);
            // schedule ramp down
            scheduledDownTimeoutRef.current = setTimeout(() => {
              // final check for manual override
              const sinceManualInner2 = performance.now() - (lastUserAdjustAtRef.current || 0);
              if (userManualOverrideRef.current && sinceManualInner2 < 1500) {
                cancelAutoFade();
                return;
              }
              // compute small duration for ramp down based on remaining time
              const downDuration = Math.min(600, Math.max(120, downLeadMs));
              fadeVolume({
                from: (typeof volume === 'number' ? volume : targetUpVol),
                to: targetDownVol,
                duration: downDuration,
              });
            }, downAt);
          } else {
            // no next subtitle -> slowly fade down after a pause (optional)
            scheduledDownTimeoutRef.current = setTimeout(() => {
              fadeVolume({
                from: (typeof volume === 'number' ? volume : targetUpVol),
                to: targetDownVol,
                duration: 800,
              });
            }, 1800); // little gap
          }
        },
      });
    }, fadeUpStartDelay);
  }

  // handle manual slider: mark manual override and cancel auto fades
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    lastUserAdjustAtRef.current = performance.now();
    userManualOverrideRef.current = true;
    // keep manual override for a small window; fades will check the timestamp
    setVolume(newVol);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(newVol);
    // cancel any automated fades immediately
    cancelAutoFade();
    // optional: clear manual override after 5s of no adjustments
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    // schedule auto-clear of manual override
    fadeTimeoutRef.current = setTimeout(() => {
      userManualOverrideRef.current = false;
      fadeTimeoutRef.current = null;
    }, 5000);
  };

  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      const newSpeaking = !prev;
      if (newSpeaking) setVolume(10); // default when reading on
      return newSpeaking;
    });
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
    hasStartedSpeakingRef.current = false;
    lastSpokenRef.current = '';
    setVolume(100);
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(100);
    }
    cancelAutoFade();
  };

  // -------------------- other helpers (unchanged)
  function resolveVoiceByURI(uri) {
    if (!uri) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => v.voiceURI === uri) || null;
  }

  function getAdaptiveAlpha(samples) {
    if (samples < 3) return 0.35;
    if (samples < 10) return 0.2;
    if (samples < 25) return 0.12;
    return 0.06;
  }

  function computeAdjustedPlaybackRate({
    baselineWps,
    unitCount,
    duration,
    margin,
    lastRateRef,
  }) {
    if (!baselineWps || !unitCount || !duration) return 1;

    const rawRate = unitCount / duration;
    const target = Math.max(
      0,
      Math.min(1, baselineWps / rawRate - margin)
    );
    if (duration <= 3) {
      lastRateRef.current = target;
      return target;
    }

    const last = lastRateRef.current;

    if (target < last) {
      lastRateRef.current = target;
      return target;
    }

    const stepped = Math.min(last + 0.5, target);
    lastRateRef.current = stepped;
    return stepped;
  }

  function normalizeColonNumbers(text) {
    return text.replace(/\b(\d{1,3}):(\d{1,3})\b/g, '$1 $2');
  }
  function isLangAcceptedExactly(langTag) {
    if (!langTag) return false;
    return !!localStorage.getItem(langTag);
  }

  const voice = useSelectedVoice(effectiveLang);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!isSpeaking || !showVideo || !currentSubtitle || !subtitles.length) return;

      const shouldTranslate = acceptedUserLang;

      // Prepare text
      let text = currentSubtitle
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\.{2,}/g, '')
        .replace(/[-*]{2,}/g, '')
        .replace(/\b(V\.P\.)\b/g, 'VP')
        .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
        .trim();

      text = normalizeColonNumbers(text);

      // translation
      let translationDelay = 0;
      if (shouldTranslate) {
        const { text: translated, delayMs } =
          await waitForTranslatedDomTextStable(currentSubtitle);

        if (cancelled || !translated) return;

        if (
          normalizeTextForCompare(translated) ===
          normalizeTextForCompare(currentSubtitle)
        ) {
          return;
        }

        text = translated;
        translationDelay = delayMs / 1000;
      }

      // subtitle timing
      const currentSub = subtitles.find(
        s => currentTime >= s.startSeconds && currentTime < s.endSeconds
      );

      let duration = currentSub?.duration ?? 3;
      if (!currentSub) return;

      const subtitleKey = `${currentSub.startSeconds}-${currentSub.endSeconds}`;

      if (activeSubtitleKeyRef.current === subtitleKey) {
        return;
      }

      duration = Math.max(0.7, duration - translationDelay);
      if (
        carryOverDebtRef.current > 0 &&
        duration > 3
      ) {
        const payback = Math.min(
          carryOverDebtRef.current,
          duration * 0.25
        );

        duration -= payback;
        carryOverDebtRef.current -= payback;
      }

      // speech units
      let baselineWps = 80;

      const voiceURI = localStorage.getItem(effectiveLang);
      const testKey = `voice_test_data_${effectiveLang}`;
      const learnedKey = `voice_learned_wps_${effectiveLang}`;

      try {
        const testData = JSON.parse(localStorage.getItem(testKey) || '{}');
        if (testData[voiceURI]?.wps) {
          baselineWps = parseFloat(testData[voiceURI].wps);
        }
      } catch {}

      try {
        const learnedData = JSON.parse(localStorage.getItem(learnedKey) || '{}');
        if (learnedData[voiceURI]?.wps) {
          baselineWps = baselineWps * 0.7 + learnedData[voiceURI].wps * 0.3;
        }
      } catch {}

      let unitCount = speechUnits(text, effectiveLang);
      const isShort = duration <= 3;
      if (isShort) {
        const cap = duration * baselineWps * 1.3;
        unitCount = Math.min(unitCount, cap);
      }
      if (lastSpokenRef.current === text) {
        if (!isShort) return;
        lastSpokenRef.current = "";
      }

      // margin model
      const speechMargin = 0.035;
      const translationMargin = Math.min(0.08, translationDelay * 0.05);
      let margin = speechMargin + translationMargin;
      if (isShort) {
        margin *= 0.6;
      }

      // playback rate sync
      if (playerRef.current?.setPlaybackRate) {
        const rate = computeAdjustedPlaybackRate({
          baselineWps,
          unitCount,
          duration,
          margin,
          lastRateRef: lastAdjustedRateRef,
        });
        let maxRate = 1.2;
        if (["hi","mr","bn","kn","te"].includes(baseLang)) {
          maxRate = 1.15;
        }
        if (["ja","ko","zh"].includes(baseLang)) {
          maxRate = 1.1;
        }
        let minRate = 0.75;
        if (isShort) minRate = 0.85;
        if (duration <= 2) minRate = 0.9;
        if (duration <= 1.5) minRate = 0.95;

        playerRef.current.setPlaybackRate(
          Math.max(minRate, Math.min(maxRate, rate))
        );
      }

      // Speak
      const utterance = new SpeechSynthesisUtterance(text);
      let wasCancelled = false;
      utterance.onstart = () => {
        hasStartedSpeakingRef.current = true;
        lastSpokenRef.current = text;
        activeSubtitleKeyRef.current = subtitleKey;

        console.log("🗣️ TTS START", {
          text,
          duration,
          effectiveLang,
          voice: utterance.voice?.name || "browser-default",
          voiceURI: utterance.voice?.voiceURI || "none",
          baselineWpsUsed: baselineWps,
          unitCount,
          computedRate: lastAdjustedRateRef.current,
          carryOverDebt: carryOverDebtRef.current.toFixed(3),
        });

        if (!didInitialSyncRef.current && playerRef.current) {
          if (typeof playerRef.current.play === "function") {
            playerRef.current.play();
          } else if (typeof playerRef.current.playVideo === "function") {
            playerRef.current.playVideo();
          }
        }
        didInitialSyncRef.current = true;
      };

      utterance.onerror = () => {
        wasCancelled = true;
      };

      utterance.onpause = () => {
        wasCancelled = true;
      };

      const speechStart = performance.now();

      utterance.onend = () => {
        if (wasCancelled) return;
        if (duration <= 3) {
          // short utterances: no learning and no auto-fade scheduling
          activeSubtitleKeyRef.current = null;
          return;
        }

        activeSubtitleKeyRef.current = null;

        const speechEnd = performance.now();
        const actualDuration = (speechEnd - speechStart) / 1000;

        if (translationDelay > duration * 0.4) return;
        if (!actualDuration || actualDuration < 0.5) return;
        if (unitCount < 2) return;

        const overrun = actualDuration - duration;

        if (overrun > 0.12 && duration > 3) {
          carryOverDebtRef.current = Math.min(
            0.6,
            carryOverDebtRef.current + overrun
          );
        }

        // learning code (unchanged)...
        const learnedKey2 = `voice_learned_wps_${effectiveLang}`;
        let learnedData = {};

        const samplesKey = `voice_learned_samples_${effectiveLang}`;

        let samplesData = {};
        try {
          samplesData = JSON.parse(localStorage.getItem(samplesKey) || '{}');
        } catch {}

        const samples = samplesData[voiceURI] ?? 0;

        try {
          learnedData = JSON.parse(localStorage.getItem(learnedKey2) || '{}');
        } catch {}

        const prev = learnedData[voiceURI]?.wps ?? baselineWps;

        const observedWps = unitCount / actualDuration;
        const ratio = observedWps / prev;

        if (ratio < 0.6 || ratio > 1.6) return;

        const durationWeight = Math.min(1.0, actualDuration / 6);
        const weightedObserved =
          prev * (1 - durationWeight) + observedWps * durationWeight;

        const alpha = getAdaptiveAlpha(samples);

        let updatedWps =
          prev * (1 - alpha) + weightedObserved * alpha;

        if (carryOverDebtRef.current > 0.25) {
          updatedWps *= 0.96;
        }

        updatedWps = Math.max(
          40,
          Math.min(140, updatedWps)
        );

        learnedData[voiceURI] = {
          wps: parseFloat(updatedWps.toFixed(3)),
          lastUpdated: Date.now(),
        };

        samplesData[voiceURI] = samples + 1;
        localStorage.setItem(samplesKey, JSON.stringify(samplesData));

        const shouldPersist = samples < 5 || samples % 3 === 0;

        if (shouldPersist) {
          localStorage.setItem(learnedKey2, JSON.stringify(learnedData));
        }

        console.log("📈 LEARN APPLY", {
          prev,
          observedWps,
          updatedWps,
          samplesBefore: samples,
          persisted: shouldPersist,
        });

        // --- NEW: schedule auto-fade after speech end for this subtitle ---
        try {
          scheduleAutoFadeAfterSpeech({ currentSub, currentTimeSec: currentTime });
        } catch (err) {
          console.warn("Failed to schedule auto fade", err);
        }
      };

      const testedVoiceURI = localStorage.getItem(effectiveLang);
      const testedVoice = resolveVoiceByURI(testedVoiceURI);

      utterance.lang = shouldTranslate ? userLang : (lang || 'en-US');

      if (testedVoice) {
        utterance.voice = testedVoice;
      } else {
        console.warn("⚠️ Tested voice not found, fallback in use");
        utterance.voice = voice || null;
      }

      const synth = window.speechSynthesis;

      console.log("BEFORE SPEAK", {
        pending: synth.pending,
        speaking: synth.speaking,
        paused: synth.paused,
        isShort,
        text,
        duration,
      });

      if (!didInitialSyncRef.current && playerRef.current) {
        if (typeof playerRef.current.pause === "function") {
          playerRef.current.pause();
        } else if (typeof playerRef.current.pauseVideo === "function") {
          playerRef.current.pauseVideo();
        }
      }

      if (cancelled) return;
      synth.resume();

      if (synth.speaking || synth.pending) {
        return;
      }

      if (isShort) {
        synth.speak(utterance);
      } else {
        setTimeout(() => {
          synth.speak(utterance);
        }, 80);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [
    isSpeaking,
    showVideo,
    currentSubtitle,
    subtitles,
    effectiveLang,
    currentTime,
    isSSMLSupported,
  ]);

  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
    }
  }, [isSpeaking, playerRef]);

  // NOTE: Updated handleVolumeChange used; expose it as 'handleVolumeChange' for UI.
  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange,
  };
}
