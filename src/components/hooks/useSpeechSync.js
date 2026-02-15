import { useState, useEffect, useRef } from 'react';
import { enhanceWithSsml } from './useSsml';
import { useIsGoogleTTS } from './useIsGoogleTts';
import { useSSMLSupportTest } from './useIsSsmlSupport';
import { useSelectedVoice } from './useSelectedVoice';
import { addEndTimesToSubtitles } from '../utils/Utils';

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
const acceptedUserLang =
  lang === "en" &&
  isBrowserTranslateOn &&
  userLang &&
  !!localStorage.getItem(userLang);  // exact only

const effectiveLang = acceptedUserLang ? userLang : lang;
  const translationDelayRef = useRef(0);




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
      window.speechSynthesis.cancel();
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
function speechUnits(text) {
  if (!text) return 0;

  let units = 0;

  const numberWords = new Set([
    "one","two","three","four","five","six","seven","eight","nine","ten",
    "first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"
  ]);

  // 1️⃣ Word-level spoken effort
  text.split(/\s+/).forEach(word => {
    let u = 1;
    const lower = word.toLowerCase();

    // digits: 3, 16, 2024
    if (/\d/.test(word)) u += 0.6;

    // number words: one, second, three
    if (numberWords.has(lower)) u += 0.6;

    // tens: twenty, thirty, seventy
    if (/(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)/.test(lower)) {
      u += 0.8;
    }

    // large numbers: hundred, thousand
    if (/(hundred|thousand|million)/.test(lower)) {
      u += 1.0;
    }

    // long words
    if (word.length >= 8) u += 0.3;
    if (word.length >= 12) u += 0.5;

    // proper names
    if (/^[A-Z][a-z]+/.test(word)) u += 0.15;

    units += u;
  });

  // 2️⃣ Punctuation pauses (phrase-level)
  const commaCount = (text.match(/,/g) || []).length;
  units += commaCount * 0.4;

  return units;
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

    if (!hasStartedSpeakingRef.current) {
      hasStartedSpeakingRef.current = true;
      lastSpokenRef.current = '';
    }

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

    if (lastSpokenRef.current === text) return;
    lastSpokenRef.current = text;

    // --------------------
    // Subtitle timing
    // --------------------
    const currentSub = subtitles.find(
      s => currentTime >= s.startSeconds && currentTime < s.endSeconds
    );

    let duration = currentSub?.duration ?? 3;
    duration = Math.max(0.7, duration - translationDelay);

    // --------------------
    // Speech units
    // --------------------
    const unitCount = speechUnits(text);

    // --------------------
    // Load baseline WPS
    // --------------------
    let baselineWps = 2;
    const voiceURI = localStorage.getItem(effectiveLang);
    const testKey = `voice_test_data_${effectiveLang}`;

    try {
      const data = JSON.parse(localStorage.getItem(testKey) || '{}');
      if (data[voiceURI]?.wps) {
        baselineWps = parseFloat(data[voiceURI].wps);
      }
    } catch {}

    // --------------------
    // Margin model
    // --------------------
    const speechMargin = 0.035;
    const translationMargin = Math.min(0.08, translationDelay * 0.05);
    const margin = speechMargin + translationMargin;

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

      playerRef.current.setPlaybackRate(
        Math.max(0.1, Math.min(1.2, rate))
      );
    }

    // --------------------
    // Speak
    // --------------------
    const utterance = new SpeechSynthesisUtterance(text);

    if (shouldTranslate) {
      utterance.lang = userLang;
      utterance.voice = null;
    } else {
      utterance.lang = lang || 'en-US';
utterance.voice = voice || null;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    synth.resume();

    setTimeout(() => {
      synth.speak(utterance);
    }, 80);
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
