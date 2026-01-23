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
  if (!isSpeaking || !showVideo || !currentSubtitle || subtitles.length === 0) return;

  if (!hasStartedSpeakingRef.current) {
    hasStartedSpeakingRef.current = true;
    lastSpokenRef.current = '';
  }
  const shouldSpeakTranslated =acceptedUserLang;

  let margin = 0.10;

  // ✅ Build cleaned subtitle text
  let textToSpeak = currentSubtitle
    .replace(/\[[^\]]*\]/g, '')   // Remove [Music] etc
    .replace(/\.{2,}/g, '')       // Remove ellipses
    .replace(/[-*]{2,}/g, '')     // Remove --- or ***
    .replace(/\b(V\.P\.)\b/g, 'VP')
    .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
    .trim();

  textToSpeak = normalizeColonNumbers(textToSpeak);

  // ✅ Default speech is cleaned subtitle
  let textSource = textToSpeak;

  // ✅ If browser translate ON, wait and speak only translated DOM text

if (shouldSpeakTranslated) {
  const { text: translated, delayMs } = await waitForTranslatedDomTextStable(
    currentSubtitle,
    {
      maxWaitMs: 2200, // ✅ you can tune 1800–2500
      stableMs: 80,
      minDiffChars: 2,
    }
  );

  if (cancelled) return;

  translationDelayRef.current = delayMs / 1000;

const baseMargin = 0.10;
const translatedBaseExtra = 0.01;
const dynamicExtra = Math.min(0.10, translationDelayRef.current * 0.06);

margin = baseMargin + translatedBaseExtra + dynamicExtra;


  // ✅ If translation not ready → DO NOT speak original
  if (!translated) {
    console.warn("⏳ Translation not ready. Skipping TTS for this subtitle.");
    return;
  }

  const normTranslated = normalizeTextForCompare(translated);
  const normOriginal = normalizeTextForCompare(currentSubtitle);

  if (!normTranslated || normTranslated === normOriginal) {
    console.warn("⚠️ Translation still same as original. Skipping.");
    return;
  }

  textSource = translated;
}
if (!isBrowserTranslateOn) {
  margin = 0.10;
}




  // ✅ speakKey MUST be exactly what you're speaking
  const speakKey = textSource;

  if (lastSpokenRef.current === speakKey) return;
  lastSpokenRef.current = speakKey;

  // ✅ Now compute subtitle duration
  const currentSub = subtitles.find(
    (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
  );

  const subtitleDuration = currentSub?.duration ?? 3;
  let effectiveDuration = subtitleDuration;

if (shouldSpeakTranslated) {
  effectiveDuration = subtitleDuration - translationDelayRef.current;

  // never let it go too low (otherwise rawRate explodes)
  effectiveDuration = Math.max(0.7, effectiveDuration);
}


  // ✅ IMPORTANT:
  // Word count should match what you're speaking (translated or not)
  const wordCount = textSource.trim().split(/\s+/).filter(Boolean).length;

  // WPS fallback
  let wps = 2;

  // ✅ Create utterance from FINAL textSource
  const utterance = new SpeechSynthesisUtterance(textSource);

  function lengthFactor(text) {
    const words = text.trim().split(/\s+/);
    if (words.length === 0) return 1;

    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
    const avgChars = totalChars / words.length;

    // Typical spoken English average is around 4.7 chars/word
    // We'll use that as a baseline
    const baseline = 3;

    let factor = 1;

    // If avg word length is higher → longer pronunciation → slow down
    if (avgChars > baseline) {
      // For each extra char above baseline, reduce by 3–5%
      factor *= Math.max(0.7, 1 - ((avgChars - baseline) * 0.05));
    } 
    // If words are short → can go slightly faster
    else if (avgChars < baseline - 1) {
      factor *= Math.min(1.15, 1 + ((baseline - avgChars) * 0.04));
    }

    return factor;
}

  // Set utterance lang as before
  function numberFactor(text) {
  const numbers = text.match(/\d+/g); // match all sequences of digits
  if (!numbers) return 1; // no numbers, normal speed

  let factor = 1;

  // Slow down for long numbers
  numbers.forEach(num => {
    if (num.length >= 4) factor *= 0.85;  // very long number
    else if (num.length === 3) factor *= 0.9;
  });

  // 👇 Detect Bible-style references like "Numbers 2:6", "John 3:16", etc.
  const bibleRefPattern = /\b([A-Z][a-z]+)\s+\d{1,3}:\d{1,3}\b/;
  if (bibleRefPattern.test(text)) {
    // Add more delay for chapter–verse phrasing
    factor *= 0.8; // reduce further by 20%
  }

  // Keep factor within reasonable range
  return Math.max(0.4, Math.min(1.3, factor));
}


const voices = window.speechSynthesis.getVoices();
const savedVoiceURI = localStorage.getItem(`${effectiveLang}`);
const matchedVoice = voices.find(v => v.voiceURI === savedVoiceURI);
utterance.voice = matchedVoice || voice || null;
console.log(voice, matchedVoice, savedVoiceURI);
if (utterance.voice?.name) {
  const testKey = `voice_test_data_${effectiveLang}`;
  const storedData = localStorage.getItem(testKey);

  if (storedData) {
    try {
      const allTestData = JSON.parse(storedData);
      const voiceData = allTestData[utterance.voice.name];
      if (voiceData && voiceData.wps) {
        wps = parseFloat(voiceData.wps);
      }
    } catch (e) {
      console.error("Failed to parse voice test data:", e);
    }
  }
}


  console.log(wps,`voice_${utterance.voice.name}_tested`);
  const rawRate = wordCount / effectiveDuration;
  console.log(wordCount,subtitleDuration, effectiveDuration);

  let speechRate = 1; // fallback
  let adjustedRate = 1;

  if (playerRef.current?.setPlaybackRate) {
    console.log(`Raw rate: ${rawRate}, WPS: ${wps}`);
    const rates = getSmoothedAdjustedRate(wps, rawRate,margin);
    
    if (rates) {
     const numFactor = numberFactor(textSource);
      const lenFactor = lengthFactor(textSource);
      console.log(`Length factor: ${lenFactor}`);
      let adjustedRateWithFactors = rates * numFactor * lenFactor;
      adjustedRateWithFactors = Math.max(0.1, Math.min(1.2, adjustedRateWithFactors));

      
    // Clamp to reasonable bounds
        adjustedRate = adjustedRateWithFactors;
      playerRef.current.setPlaybackRate(adjustedRate);  
    }
  }
  console.log(`Speech rate: ${speechRate}, Adjusted rate: ${adjustedRate}`);
  if (isSSMLSupported) {
    textToSpeak = enhanceWithSsml(textToSpeak);
  }

  utterance.rate = speechRate;
    if (shouldSpeakTranslated) {
  utterance.lang = userLang;   // ✅ speak translated language
  utterance.voice = null;      // ✅ let browser pick best voice for lang
} else {
  utterance.lang = lang || "en-US";
}

utterance.onstart = () => console.log("✅ TTS started:", utterance.lang, utterance.voice?.name);
utterance.onend = () => console.log("✅ TTS ended");
utterance.onerror = (e) => console.log("❌ TTS error:", e);
console.log("ABOUT TO SPEAK:", textSource);

const synth = window.speechSynthesis;

// 🔥 if Chrome is paused, it will be silent without resume()
synth.resume();

// 🔥 Chrome bug workaround: cancel + delayed speak
synth.cancel();

setTimeout(() => {
  synth.resume();          // resume again just in case
  synth.speak(utterance);
}, 80);
  };
  run();
  return () => { cancelled = true; };

}, [isSpeaking, showVideo, currentSubtitle, subtitles, effectiveLang, playerRef, isSSMLSupported]);


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
