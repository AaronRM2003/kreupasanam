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
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const hasStartedSpeakingRef = useRef(false);
  const lastSpokenRef = useRef('');
  const [playerReady, setPlayerReady] = useState(false);


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

async function waitForTranslatedDomText(original, timeoutMs = 250) {
  const start = performance.now();
  const normOriginal = normalizeTextForCompare(original);

  while (performance.now() - start < timeoutMs) {
    const domText = readSubtitleDom();
    const normDom = normalizeTextForCompare(domText);

    // if DOM exists and differs from original => translation caught
    if (normDom && normDom !== normOriginal) return domText;

    // wait for next frame (better than setTimeout(0))
    await new Promise(requestAnimationFrame);
  }

  // if we failed to catch translation within timeout, return latest DOM anyway
  return readSubtitleDom();
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

const margin = 0.10;   // your safe margin
const maxStepUp = 0.5;

const lastAdjustedRateRef = useRef(1);

function adjustedRateFixedSpeech(wps, rawRate) {
  const k = rawRate / wps;
  const speechRate = 1;
  let adjustedRate = speechRate / k;
  adjustedRate -= margin;
  if (adjustedRate > 1) adjustedRate = 1;
  if (adjustedRate < 0) adjustedRate = 0;
  return adjustedRate;
}

function getSmoothedAdjustedRate(wps, rawRate) {
  const targetAdjustedRate = adjustedRateFixedSpeech(wps, rawRate);
  const lastAdj = lastAdjustedRateRef.current;

  if (targetAdjustedRate < lastAdj) {
    // Decreasing: jump immediately
    lastAdjustedRateRef.current = targetAdjustedRate;
    return parseFloat(targetAdjustedRate.toFixed(4));
  } else if (targetAdjustedRate > lastAdj) {
    // Increasing: increase gradually by maxStepUp
    let newAdjRate = lastAdj + maxStepUp;
    if (newAdjRate > targetAdjustedRate) newAdjRate = targetAdjustedRate;
    console.log(targetAdjustedRate,newAdjRate);
    lastAdjustedRateRef.current = newAdjRate;
    return parseFloat(newAdjRate.toFixed(4));
  } else {
    // Equal
    return parseFloat(lastAdj.toFixed(4));
  }
}


function normalizeColonNumbers(text) {
  return text.replace(/\b(\d{1,3}):(\d{1,3})\b/g, '$1 $2');
}


  const voice = useSelectedVoice(lang);
  useEffect(() => {
     let cancelled = false;

  const run = async () => {
  if (!isSpeaking || !showVideo || !currentSubtitle || subtitles.length === 0) return;

  if (!hasStartedSpeakingRef.current) {
    hasStartedSpeakingRef.current = true;
    lastSpokenRef.current = '';
  }

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
if (isBrowserTranslateOn) {
  // 👇 actively wait a few frames to catch translated DOM
  const translated = await waitForTranslatedDomText(currentSubtitle, 300);

  const normTranslated = normalizeTextForCompare(translated);
  if (!normTranslated) return;

  textSource = translated;
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
  return Math.max(0.4, Math.min(1, factor));
}


 const savedVoiceName = localStorage.getItem(`${lang}`);
const voices = window.speechSynthesis.getVoices();
const matchedVoice = voices.find(v => v.name === savedVoiceName);
utterance.voice = matchedVoice || voice || null;
console.log(voice, matchedVoice, savedVoiceName);
utterance.lang = lang || 'en-US';

if (utterance.voice?.name) {
  const testKey = `voice_test_data_${lang}`;
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
  const rawRate = wordCount / subtitleDuration;
  console.log(wordCount, subtitleDuration);

  let speechRate = 1; // fallback
  let adjustedRate = 1;

  if (playerRef.current?.setPlaybackRate) {
    console.log(`Raw rate: ${rawRate}, WPS: ${wps}`);
    const rates = getSmoothedAdjustedRate(wps, rawRate);
    
    if (rates) {
     const numFactor = numberFactor(textToSpeak);
      const lenFactor = lengthFactor(textToSpeak);
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
    if (isBrowserTranslateOn) {
  utterance.lang = "hi-IN";      // ✅ speak as Hindi
  utterance.voice = null;        // ✅ let browser pick Hindi voice
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

}, [isSpeaking, showVideo, currentSubtitle, subtitles, lang, playerRef, isSSMLSupported]);


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
