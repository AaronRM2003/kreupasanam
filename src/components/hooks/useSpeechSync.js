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
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const hasStartedSpeakingRef = useRef(false);
  const lastSpokenRef = useRef('');
  const [playerReady, setPlayerReady] = useState(false);

  const isSSMLSupported = useSSMLSupportTest();

  // ---------------- CHUNK SYSTEM ---------------------

const CHUNKS = [
  { start: 0, end: 240 },   // 0–4 min
  { start: 240, end: 600 }, // 4–10 min
  { start: 600, end: Infinity }
];

const getChunkIndex = (time) =>
  CHUNKS.findIndex(c => time >= c.start && time < c.end);

const currentChunkRef = useRef(null);
const chunkPlaybackRateRef = useRef(1);
const pendingSeekToChunkEndRef = useRef(false);

// Compute stable rate per chunk (based on average subtitle WPS)
function computeChunkRate(chunkIndex) {
  const chunk = CHUNKS[chunkIndex];

  const subsInChunk = subtitles.filter(
    s => s.startSeconds >= chunk.start && s.startSeconds < chunk.end
  );

  if (subsInChunk.length === 0) return 1;

  let totalWPS = 0;

  subsInChunk.forEach(s => {
    const words = getSubText(s).trim().split(/\s+/).length;
    const rawRate = words / s.duration; // words per sec
    totalWPS += rawRate;
  });

  const avgRawRate = totalWPS / subsInChunk.length;

  // Convert using your existing algorithm
  const chunkRate = adjustedRateFixedSpeech(2, avgRawRate);

  return Math.max(0.5, Math.min(1.2, chunkRate));
}

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
const maxStepUp = 0.25;

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




  const voice = useSelectedVoice(lang);

  useEffect(() => {
  if (!showVideo || subtitles.length === 0) return;

  const chunkIndex = getChunkIndex(currentTime);

  if (chunkIndex !== currentChunkRef.current) {
    currentChunkRef.current = chunkIndex;

    const newRate = computeChunkRate(chunkIndex);
    chunkPlaybackRateRef.current = newRate;

    // Apply video rate
    if (playerRef.current?.setPlaybackRate) {
      playerRef.current.setPlaybackRate(newRate);
    }
  }
}, [currentTime, showVideo, subtitles]);
function getSubText(sub) {
  return typeof sub === 'string' ? sub : (sub?.text || "");
}

  useEffect(() => {
  if (!isSpeaking || !showVideo || !currentSubtitle || subtitles.length === 0) return;

  if (!hasStartedSpeakingRef.current) {
    hasStartedSpeakingRef.current = true;
    lastSpokenRef.current = '';
  }

  if (lastSpokenRef.current === currentSubtitle) return;
  lastSpokenRef.current = currentSubtitle;

  const currentSub = subtitles.find(
  (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
);

const subtitleDuration = currentSub?.duration ?? 3;

  const wordCount = getSubText(currentSubtitle).trim().split(/\s+/).length;

  // Get the utterance voice if possible
  let wps = 2; // default fallback

  // Prepare the text first to create utterance and get voice
  let textToSpeak = getSubText(currentSubtitle)
  // Remove content inside square brackets
  .replace(/\[[^\]]*\]/g, '')  
  // Remove ellipses or multiple dots
  .replace(/\.{2,}/g, '')      
  // Remove standalone punctuation like -- or ***
  .replace(/[-*]{2,}/g, '')    
  // Replace V.P. with VP
  .replace(/\b(V\.P\.)\b/g, 'VP')
  // ✅ Replace Kreupasanam with Kripaasanam for better pronunciation
  .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
  // Trim whitespace
  .trim();
  



  const utterance = new SpeechSynthesisUtterance(textToSpeak);
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

  // Playback rate comes ONLY from the chunk now
const fixedChunkRate = chunkPlaybackRateRef.current;
playerRef.current?.setPlaybackRate(fixedChunkRate);

  console.log(`Speech rate: ${speechRate}, Adjusted rate: ${adjustedRate}`);
  if (isSSMLSupported) {
    textToSpeak = enhanceWithSsml(textToSpeak);
  }

  utterance.rate = speechRate;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  // When TTS finishes early → jump to end of chunk
utterance.onend = () => {
  const chunk = CHUNKS[currentChunkRef.current];

  if (currentTime < chunk.end && !pendingSeekToChunkEndRef.current) {
    pendingSeekToChunkEndRef.current = true;

    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(chunk.end, true);
    }

    setTimeout(() => {
      pendingSeekToChunkEndRef.current = false;
    }, 300);
  }
};

}, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang, playerRef, isSSMLSupported]);

useEffect(() => {
  if (!isSpeaking) return;

  const chunkIndex = getChunkIndex(currentTime);
  currentChunkRef.current = chunkIndex;

  const newRate = chunkPlaybackRateRef.current;

  if (playerRef.current?.setPlaybackRate) {
    playerRef.current.setPlaybackRate(newRate);
  }

  // Restart TTS for the matching subtitle
  const sub = subtitles.find(
    s => currentTime >= s.startSeconds && currentTime < s.endSeconds
  );

  if (sub && lastSpokenRef.current !== getSubText(sub)) {
    lastSpokenRef.current = ''; // force restart
  }
}, [currentTime, isSpeaking]);

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
