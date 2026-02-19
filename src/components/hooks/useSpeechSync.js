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
  isBrowserTranslateOn = false,
  userLang = null,
}) {
  // --- state + refs ---
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const hasStartedSpeakingRef = useRef(false);
  const lastSpokenRef = useRef('');
  const [playerReady, setPlayerReady] = useState(false);
  const didInitialSyncRef = useRef(false);
  const activeSubtitleKeyRef = useRef(null);
  const lastVideoTimeRef = useRef(0);
  const carryOverDebtRef = useRef(0);

  // --- fade related refs ---
  const fadeRafRef = useRef(null);
  const fadeUpTimeoutRef = useRef(null);
  const fadeDownTimeoutRef = useRef(null);
  const lastUserAdjustAtRef = useRef(0);
  const userManualOverrideRef = useRef(false);

  // --- constants for fade/timing (tweakable) ---
  const WAIT_AFTER_END = 2.0; // seconds to wait after speech end before fading up
  const FADE_UP_TIME = 0.8; // seconds to fade up
  const FADE_DOWN_TIME = 0.8; // seconds to fade down
  const MANUAL_OVERRIDE_GRACE_MS = 1500; // if user moved slider within this window, block auto fades

  const acceptedUserLang =
    lang === 'en' && isBrowserTranslateOn && userLang && !!localStorage.getItem(userLang);

  const effectiveLang = acceptedUserLang ? userLang : lang;
  const baseLang = (effectiveLang || 'en').split('-')[0];

  const isSSMLSupported = useSSMLSupportTest();

  function normalizeTextForCompare(t) {
    return (t || '')
      .replace(/\s+/g, ' ')
      .replace(/\u00A0/g, ' ')
      .trim()
      .toLowerCase();
  }
  const translatedDomRef = useRef('');
  function readSubtitleDom() {
    const el = document.getElementById('subtitle-dom');
    return (el?.innerText || el?.textContent || '').trim();
  }

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function waitForTranslatedDomTextStable(
    original,
    { maxWaitMs = 2000, stableMs = 80, minDiffChars = 2 } = {}
  ) {
    const start = performance.now();
    const normOriginal = normalizeTextForCompare(original);

    let lastDom = '';
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

    // seek detection
    if (Math.abs(delta) > 0.8) {
      window.speechSynthesis.cancel();

      activeSubtitleKeyRef.current = null;
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = '';
      didInitialSyncRef.current = false;

      carryOverDebtRef.current = 0;

      // cancel fades
      cancelAutoFades();
    }

    lastVideoTimeRef.current = now;
  }, [currentTime]);

  useEffect(() => {
    if (!isBrowserTranslateOn) return;

    const wrapper = document.getElementById('subtitle-wrapper');
    if (!wrapper) return;

    const update = () => {
      const el = document.getElementById('subtitle-dom');
      translatedDomRef.current = (el?.innerText || el?.textContent || '').trim();
    };

    update();

    const obs = new MutationObserver(update);
    obs.observe(wrapper, { childList: true, subtree: true, characterData: true });

    return () => obs.disconnect();
  }, [isBrowserTranslateOn]);

  // Sync player volume once available
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

      // stop fades when speech stops or video hidden
      cancelAutoFades();
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
  // Fade helpers
  // --------------------
  function cancelAutoFades() {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
    if (fadeUpTimeoutRef.current) {
      clearTimeout(fadeUpTimeoutRef.current);
      fadeUpTimeoutRef.current = null;
    }
    if (fadeDownTimeoutRef.current) {
      clearTimeout(fadeDownTimeoutRef.current);
      fadeDownTimeoutRef.current = null;
    }
  }

  function fadeVolumeLinear({ from, to, durationMs = 800, onComplete = null }) {
    // Cancel any running fade
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }

    const start = performance.now();
    const startVol = Math.round(from);
    const endVol = Math.round(to);
    const diff = endVol - startVol;

    function step(now) {
      const t = Math.min(1, (now - start) / durationMs);
      const nextVol = Math.round(startVol + diff * t);

      // honor recent manual override
      const sinceManual = performance.now() - (lastUserAdjustAtRef.current || 0);
      if (userManualOverrideRef.current && sinceManual < MANUAL_OVERRIDE_GRACE_MS) {
        // cancel fade if user intervened recently
        cancelAutoFades();
        if (typeof onComplete === 'function') onComplete(false);
        return;
      }

      setVolume((prev) => {
        if (prev === nextVol) return prev;
        if (playerRef.current?.setVolume) playerRef.current.setVolume(nextVol);
        return nextVol;
      });

      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
        if (typeof onComplete === 'function') onComplete(true);
      }
    }

    fadeRafRef.current = requestAnimationFrame(step);
  }

  // handle user manual slider change
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    lastUserAdjustAtRef.current = performance.now();
    userManualOverrideRef.current = true;
    setVolume(newVol);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(newVol);

    // Cancel any scheduled auto fades when user touches the slider
    cancelAutoFades();

    // clear manual override after some time (so auto fades can resume later)
    setTimeout(() => {
      userManualOverrideRef.current = false;
    }, 5000);
  };

  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      const newSpeaking = !prev;
      if (newSpeaking) setVolume(10);
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
    cancelAutoFades();
  };

  // --------------------
  // other helpers (unchanged)
  // --------------------
  function resolveVoiceByURI(uri) {
    if (!uri) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((v) => v.voiceURI === uri) || null;
  }

  function getAdaptiveAlpha(samples) {
    if (samples < 3) return 0.35;
    if (samples < 10) return 0.2;
    if (samples < 25) return 0.12;
    return 0.06;
  }

  function computeAdjustedPlaybackRate({ baselineWps, unitCount, duration, margin, lastRateRef }) {
    if (!baselineWps || !unitCount || !duration) return 1;

    const rawRate = unitCount / duration;
    const target = Math.max(0, Math.min(1, baselineWps / rawRate - margin));
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

  // --------------------
  // main speech effect (unchanged except onend scheduling)
  // --------------------
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!isSpeaking || !showVideo || !currentSubtitle || !subtitles.length) return;

      const shouldTranslate = acceptedUserLang;

      // --------------------
      // Prepare text
      // --------------------
      let text = currentSubtitle
        .replace(/\[[^\]]*\]/g, '')
        .replace(/\.{2,}/g, '')
        .replace(/[-*]{2,}/g, '')
        .replace(/\b(V\.P\.)\b/g, 'VP')
        .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
        .trim();

      text = normalizeColonNumbers(text);

      // --------------------
      // Handle translation
      // --------------------
      let translationDelay = 0;

      if (shouldTranslate) {
        const { text: translated, delayMs } = await waitForTranslatedDomTextStable(currentSubtitle);

        if (cancelled || !translated) return;

        if (normalizeTextForCompare(translated) === normalizeTextForCompare(currentSubtitle)) {
          return;
        }

        text = translated;
        translationDelay = delayMs / 1000;
      }

      // --------------------
      // Subtitle timing
      // --------------------
      const currentSub = subtitles.find(
        (s) => currentTime >= s.startSeconds && currentTime < s.endSeconds
      );

      let duration = currentSub?.duration ?? 3;
      if (!currentSub) return;

      const subtitleKey = `${currentSub.startSeconds}-${currentSub.endSeconds}`;

      // HARD LOCK — EXIT IMMEDIATELY if already active
      if (activeSubtitleKeyRef.current === subtitleKey) {
        return;
      }

      duration = Math.max(0.7, duration - translationDelay);
      if (carryOverDebtRef.current > 0 && duration > 3) {
        const payback = Math.min(carryOverDebtRef.current, duration * 0.25);
        duration -= payback;
        carryOverDebtRef.current -= payback;
      }

      // --------------------
      // Speech units
      // --------------------
      let baselineWps = 80;

      const voiceURI = localStorage.getItem(effectiveLang);
      const testKey = `voice_test_data_${effectiveLang}`;
      const learnedKey = `voice_learned_wps_${effectiveLang}`;

      try {
        const testData = JSON.parse(localStorage.getItem(testKey) || '{}');
        if (testData[voiceURI]?.wps) baselineWps = parseFloat(testData[voiceURI].wps);
      } catch {}

      try {
        const learnedData = JSON.parse(localStorage.getItem(learnedKey) || '{}');
        if (learnedData[voiceURI]?.wps) baselineWps = baselineWps * 0.7 + learnedData[voiceURI].wps * 0.3;
      } catch {}

      let unitCount = speechUnits(text, effectiveLang);
      const isShort = duration <= 3;
      if (isShort) {
        const cap = duration * baselineWps * 1.3;
        unitCount = Math.min(unitCount, cap);
      }
      if (lastSpokenRef.current === text) {
        if (!isShort) return;
        lastSpokenRef.current = '';
      }

      // --------------------
      // Margin model
      // --------------------
      const speechMargin = 0.035;
      const translationMargin = Math.min(0.08, translationDelay * 0.05);
      let margin = speechMargin + translationMargin;
      if (isShort) margin *= 0.6;

      // --------------------
      // Playback rate sync
      // --------------------
      if (playerRef.current?.setPlaybackRate) {
        const rate = computeAdjustedPlaybackRate({
          baselineWps,
          unitCount,
          duration,
          margin,
          lastRateRef: lastAdjustedRateRef,
        });
        let maxRate = 1.2;

        if (['hi', 'mr', 'bn', 'kn', 'te'].includes(baseLang)) {
          maxRate = 1.15;
        }

        if (['ja', 'ko', 'zh'].includes(baseLang)) {
          maxRate = 1.1;
        }
        let minRate = 0.75;
        if (isShort) minRate = 0.85;
        if (duration <= 2) minRate = 0.9;
        if (duration <= 1.5) minRate = 0.95;

        playerRef.current.setPlaybackRate(Math.max(minRate, Math.min(maxRate, rate)));
      }

      // --------------------
      // Speak
      // --------------------
      const utterance = new SpeechSynthesisUtterance(text);
      let wasCancelled = false;
      utterance.onstart = () => {
        hasStartedSpeakingRef.current = true;
        lastSpokenRef.current = text;
        activeSubtitleKeyRef.current = subtitleKey;

        console.log('🗣️ TTS START', {
          text,
          duration,
          effectiveLang,
          voice: utterance.voice?.name || 'browser-default',
          voiceURI: utterance.voice?.voiceURI || 'none',
          baselineWpsUsed: baselineWps,
          unitCount,
          computedRate: lastAdjustedRateRef.current,
          carryOverDebt: carryOverDebtRef.current.toFixed(3),
        });

        if (!didInitialSyncRef.current && playerRef.current) {
          if (typeof playerRef.current.play === 'function') {
            playerRef.current.play();
          } else if (typeof playerRef.current.playVideo === 'function') {
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
          carryOverDebtRef.current = Math.min(0.6, carryOverDebtRef.current + overrun);
        }

        // --------------------
        // Save learning (unchanged)
        // --------------------
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
        const weightedObserved = prev * (1 - durationWeight) + observedWps * durationWeight;
        const alpha = getAdaptiveAlpha(samples);

        let updatedWps = prev * (1 - alpha) + weightedObserved * alpha;
        if (carryOverDebtRef.current > 0.25) updatedWps *= 0.96;

        updatedWps = Math.max(40, Math.min(140, updatedWps));

        learnedData[voiceURI] = { wps: parseFloat(updatedWps.toFixed(3)), lastUpdated: Date.now() };
        samplesData[voiceURI] = samples + 1;
        localStorage.setItem(samplesKey, JSON.stringify(samplesData));

        const shouldPersist = samples < 5 || samples % 3 === 0;
        if (shouldPersist) localStorage.setItem(learnedKey2, JSON.stringify(learnedData));

        console.log('📈 LEARN APPLY', { prev, observedWps, updatedWps, samplesBefore: samples, persisted: shouldPersist });

        // --------------------
        // NEW: schedule auto fade only if enough time left before next subtitle
        // --------------------
        try {
          // find index & next subtitle
          const idx = subtitles.findIndex(
            (s) => s.startSeconds === currentSub.startSeconds && s.endSeconds === currentSub.endSeconds
          );
          const nextSub = idx >= 0 && idx + 1 < subtitles.length ? subtitles[idx + 1] : null;

          // speech end time in video timeline is the currentTime prop value now
          const speechEndVideoTime = currentTime; // seconds
          const timeLeft = nextSub ? nextSub.startSeconds - speechEndVideoTime : Infinity; // seconds

          // total worst-case required time for wait + fade up + fade down
          const REQUIRED = WAIT_AFTER_END + FADE_UP_TIME + FADE_DOWN_TIME; // seconds

          // if not enough time, skip fades entirely
          if (!isFinite(timeLeft) || timeLeft < REQUIRED) {
            // do not schedule fades
            // if Infinity (no next subtitle) it's fine to run fades (we used isFinite check)
            if (!isFinite(timeLeft)) {
              // last subtitle: we can still do a fade up & down with a gap after up
              // but to be safe, schedule fade up then down after small pause
              const fromVol = volume;
              const toVol = 100;
              fadeUpTimeoutRef.current = setTimeout(() => {
                fadeVolumeLinear({ from: fromVol, to: toVol, durationMs: FADE_UP_TIME * 1000 });
                // schedule fade down after a pause
                fadeDownTimeoutRef.current = setTimeout(() => {
                  fadeVolumeLinear({ from: toVol, to: 10, durationMs: FADE_DOWN_TIME * 1000 });
                }, 1800);
              }, WAIT_AFTER_END * 1000);
            }
            return;
          }

          // At this point we have enough room: schedule fade up after WAIT_AFTER_END,
          // and schedule fade down such that it completes right before next subtitle start.
          const fadeUpDelayMs = WAIT_AFTER_END * 1000;
          const fadeUpDurationMs = FADE_UP_TIME * 1000;
          const fadeDownDurationMs = FADE_DOWN_TIME * 1000;

          // Compute when to start fade down (ms from now)
          // we want fade-down to finish exactly at nextSub.startSeconds (video time)
          // So startDownAt = (timeLeft - FADE_DOWN_TIME) seconds from now
          const startDownInMs = Math.max(0, (timeLeft - FADE_DOWN_TIME) * 1000);

          // Safety: if startDownInMs <= fadeUpDelayMs then there's a tiny window — but this shouldn't happen because we checked REQUIRED
          // Schedule fade up
          const fromVol = volume;
          const toVol = 100;

          fadeUpTimeoutRef.current = setTimeout(() => {
            // re-check manual override
            const sinceManual = performance.now() - (lastUserAdjustAtRef.current || 0);
            if (userManualOverrideRef.current && sinceManual < MANUAL_OVERRIDE_GRACE_MS) {
              cancelAutoFades();
              return;
            }
            fadeVolumeLinear({ from: fromVol, to: toVol, durationMs: fadeUpDurationMs });
          }, fadeUpDelayMs);

          // Schedule fade down so it starts at startDownInMs
          fadeDownTimeoutRef.current = setTimeout(() => {
            const sinceManual = performance.now() - (lastUserAdjustAtRef.current || 0);
            if (userManualOverrideRef.current && sinceManual < MANUAL_OVERRIDE_GRACE_MS) {
              cancelAutoFades();
              return;
            }
            // read current vol to use as 'from'. However, fadeVolumeLinear will read provided 'from' value,
            // using 'toVol' is safe fallback.
            fadeVolumeLinear({ from: (typeof volume === 'number' ? volume : toVol), to: 10, durationMs: fadeDownDurationMs });
          }, startDownInMs);
        } catch (err) {
          console.warn('Failed scheduling auto fades', err);
        }
      };

      const testedVoiceURI = localStorage.getItem(effectiveLang);
      const testedVoice = resolveVoiceByURI(testedVoiceURI);

      utterance.lang = shouldTranslate ? userLang : (lang || 'en-US');

      if (testedVoice) {
        utterance.voice = testedVoice;
      } else {
        console.warn('⚠️ Tested voice not found, fallback in use');
        utterance.voice = voice || null;
      }

      const synth = window.speechSynthesis;

      console.log('BEFORE SPEAK', {
        pending: synth.pending,
        speaking: synth.speaking,
        paused: synth.paused,
        isShort,
        text,
        duration,
      });

      if (!didInitialSyncRef.current && playerRef.current) {
        if (typeof playerRef.current.pause === 'function') {
          playerRef.current.pause();
        } else if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }

      if (cancelled) return;
      synth.resume();

      // DO NOT re-speak while already speaking
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
  }, [isSpeaking, showVideo, currentSubtitle, subtitles, effectiveLang, currentTime, isSSMLSupported]);

  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
    }
  }, [isSpeaking, playerRef]);

  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange,
  };
}
