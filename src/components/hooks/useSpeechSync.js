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
    userLang = null,  // ✅ new

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




const acceptedUserLang =
  lang === "en" &&
  isBrowserTranslateOn &&
  userLang &&
  !!localStorage.getItem(userLang);  // exact only

const effectiveLang = acceptedUserLang ? userLang : lang;
  const translationDelayRef = useRef(0);
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
    maxWaitMs = 2000,   // ✅ instead of 300ms
    stableMs = 80,      // DOM must stay unchanged for 80ms
    minDiffChars = 2,   // ignore tiny whitespace changes
  } = {}
) {
  const start = performance.now();
  const normOriginal = normalizeTextForCompare(original);

  let lastDom = "";
  let lastChangeAt = performance.now();

  while (performance.now() - start < maxWaitMs) {
    const domText = readSubtitleDom();
    const normDom = normalizeTextForCompare(domText);

    // Track DOM changes
    if (domText !== lastDom) {
      lastDom = domText;
      lastChangeAt = performance.now();
    }

    const isDifferent = normDom && normDom !== normOriginal;
    const diffEnough =
      Math.abs((normDom?.length || 0) - (normOriginal?.length || 0)) >= minDiffChars;

    // ✅ translated + stable for stableMs
    if (isDifferent && diffEnough && performance.now() - lastChangeAt >= stableMs) {
      return { text: domText, delayMs: performance.now() - start };
    }

    await new Promise(requestAnimationFrame);
  }

  // timeout
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

  // 🔥 seek detection: forward OR backward
  if (Math.abs(delta) > 0.8) {
    window.speechSynthesis.cancel();

    // full reset
    activeSubtitleKeyRef.current = null;
    hasStartedSpeakingRef.current = false;
    lastSpokenRef.current = '';
    didInitialSyncRef.current = false;

    // optional but recommended
    carryOverDebtRef.current = 0;
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

  update(); // initial read

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
    // 🔒 Only cancel if speech actually started
    if (hasStartedSpeakingRef.current) {
      window.speechSynthesis.cancel();
      activeSubtitleKeyRef.current = null; // 🔓 RELEASE
    }
    hasStartedSpeakingRef.current = false;
    lastSpokenRef.current = '';
  }
}, [isSpeaking, showVideo]);




const maxStepUp = 0.5;
 // default margin


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
// Speech timing helpers
// --------------------


function resolveVoiceByURI(uri) {
  if (!uri) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find(v => v.voiceURI === uri) || null;
}

function getAdaptiveAlpha(samples) {
  if (samples < 3) return 0.35;   // 🔥 converge fast
  if (samples < 10) return 0.2;
  if (samples < 25) return 0.12;
  return 0.06;                   // 🎯 fine tuning
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
    Math.min(1, Math.pow(baselineWps / rawRate, 0.75) - margin)
  );
  if (duration <= 3) {
    lastRateRef.current = target;
    return target;
  }
  console.log({
  baselineWps,
  rawRate,
  linear: baselineWps / rawRate,
  curved: Math.pow(baselineWps / rawRate, 0.75)
});

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
  return !!localStorage.getItem(langTag); // ✅ exact key only
}


  const voice = useSelectedVoice(effectiveLang);
  // let translationDelaySec = 0;

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

   


    // --------------------
    // Subtitle timing
    // --------------------
    const currentSub = subtitles.find(
      s => currentTime >= s.startSeconds && currentTime < s.endSeconds
    );

    let duration = currentSub?.duration ?? 3;
    if (!currentSub) return;

    const subtitleKey = `${currentSub.startSeconds}-${currentSub.endSeconds}`;

    // 🔒 HARD LOCK — EXIT IMMEDIATELY
    if (activeSubtitleKeyRef.current === subtitleKey) {
      return;
    }

duration = Math.max(0.7, duration - translationDelay);
if (
  carryOverDebtRef.current > 0 &&
  duration > 3 // never short subtitles
) {
  const payback = Math.min(
    carryOverDebtRef.current,
    duration * 0.25 // 🔒 max 25% compression
  );

  duration -= payback;
  carryOverDebtRef.current -= payback;
}



    // --------------------
    // Speech units
    // --------------------
    let baselineWps = 80;

    // --------------------
    // Load baseline WPS
    // --------------------

    const voiceURI = localStorage.getItem(effectiveLang);
    const testKey = `voice_test_${effectiveLang}`;
    const learnedKey = `voice_learned_wps_${effectiveLang}`;

    // 1️⃣ Load tested WPS
    try {
      const testData = JSON.parse(localStorage.getItem(testKey) || '{}');
      if (testData[voiceURI]?.wps) {
        baselineWps = parseFloat(testData[voiceURI].wps);
      }
    } catch {}

    // 2️⃣ Blend learned WPS (if exists)
    try {
      const learnedData = JSON.parse(localStorage.getItem(learnedKey) || '{}');
      if (learnedData[voiceURI]?.wps) {
        // tested = anchor, learned = refinement
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
    // --------------------
    // Margin model
    // --------------------
    const speechMargin = 0.035;
    const translationMargin = Math.min(0.08, translationDelay * 0.05);
    let margin = speechMargin + translationMargin;
    if (isShort) {
      margin *= 0.6;
    }

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

      // Indian syllable-timed languages
      if (["hi","mr","bn","kn","te"].includes(baseLang)) {
        maxRate = 1.15;
      }

      // Character-timed languages
      if (["ja","ko","zh"].includes(baseLang)) {
        maxRate = 1.1;
      }
      let minRate = 0.55;
      if (isShort) minRate = 0.85;
      if (duration <= 2) minRate = 0.9;
      if (duration <= 1.5) minRate = 0.95;

      playerRef.current.setPlaybackRate(
        Math.max(minRate, Math.min(maxRate, rate))
      );

    }

    // --------------------
    // Speak
    // --------------------
const utterance = new SpeechSynthesisUtterance(text);
let wasCancelled = false;
utterance.onstart = () => {
  
    hasStartedSpeakingRef.current = true; // 🔥 REQUIRED
    lastSpokenRef.current = text;
      activeSubtitleKeyRef.current = subtitleKey; // 🔒 LOCK

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

// ✅ capture start time immediately after creation
const speechStart = performance.now();

// ✅ attach learning ONLY on successful end
utterance.onend = () => {
  if (wasCancelled) return;
  if (duration <= 3) return;

  activeSubtitleKeyRef.current = null; // 🔓 RELEASE

  const speechEnd = performance.now();
  const actualDuration = (speechEnd - speechStart) / 1000;

  // --- guards ---
  if (translationDelay > duration * 0.4) return;
  if (!actualDuration || actualDuration < 0.5) return;
  if (unitCount < 2) return;

  const overrun = actualDuration - duration;
  console.log("⏱️ SPEECH END", {
    actualDuration,
    duration,
    overrun,
  });

  if (overrun > 0.12 && duration > 3) {
    carryOverDebtRef.current = Math.min(
      0.6,
      carryOverDebtRef.current + overrun
    );
  }

  // --------------------
  // Load learned state FIRST
  // --------------------
  const learnedKey = `voice_learned_wps_${effectiveLang}`;
  let learnedData = {};

  const samplesKey = `voice_learned_samples_${effectiveLang}`;

  let samplesData = {};
  try {
    samplesData = JSON.parse(localStorage.getItem(samplesKey) || '{}');
  } catch {}

  const samples = samplesData[voiceURI] ?? 0;

  try {
    learnedData = JSON.parse(localStorage.getItem(learnedKey) || '{}');
  } catch {}

  const prev = learnedData[voiceURI]?.wps ?? baselineWps;

  // --------------------
  // Observe speech
  // --------------------
  const observedWps = unitCount / actualDuration;
  const ratio = observedWps / prev;

  // Reject anomalies
  if (ratio < 0.6 || ratio > 1.6) return;

  // Weight long samples more
  const durationWeight = Math.min(1.0, actualDuration / 6);
  const weightedObserved =
    prev * (1 - durationWeight) + observedWps * durationWeight;

  // Adaptive learning rate
  const alpha = getAdaptiveAlpha(samples);

  let updatedWps =
    prev * (1 - alpha) + weightedObserved * alpha;

  // Penalize persistent overruns
  if (carryOverDebtRef.current > 0.25) {
    updatedWps *= 0.85;
  }

updatedWps = Math.max(
  40,    // lower bound
  Math.min(140, updatedWps)
);
  // --------------------
  // Save
  // --------------------
  learnedData[voiceURI] = {
    wps: parseFloat(updatedWps.toFixed(3)),
    lastUpdated: Date.now(),
  };

  samplesData[voiceURI] = samples + 1;
  localStorage.setItem(samplesKey, JSON.stringify(samplesData));


  const shouldPersist = samples < 5 || samples % 3 === 0;

  if (shouldPersist) {
    localStorage.setItem(learnedKey, JSON.stringify(learnedData));
  }
    
  console.log("📈 LEARN APPLY", {
    prev,
    observedWps,
    updatedWps,
    samplesBefore: samples,
    persisted: shouldPersist,
  });

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

  // 🔒 DO NOT re-speak while already speaking
if (synth.speaking || synth.pending) {
  return;
}

   if (isShort) {
  synth.speak(utterance); // 🔥 IMMEDIATE
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

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
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
  };

  
  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange,
  };
} 