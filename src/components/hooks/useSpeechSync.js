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
// ------------------------------------
// FIXED CHUNK CHECKPOINTS (in seconds)
// Example: 4:00 (240s), 10:00 (600s)
// ------------------------------------
const CHUNKS = [0, 240, 600, Infinity]; 

function getChunkIndex(time) {
  for (let i = 0; i < CHUNKS.length - 1; i++) {
    if (time >= CHUNKS[i] && time < CHUNKS[i + 1]) return i;
  }
  return 0;
}

const currentChunkRef = useRef(getChunkIndex(currentTime));


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

  const wordCount = currentSubtitle.trim().split(/\s+/).length;

  // Get the utterance voice if possible
  let wps = 2; // default fallback

  // Prepare the text first to create utterance and get voice
  let textToSpeak = currentSubtitle
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

  // Determine the current chunk
const newChunkIndex = getChunkIndex(currentTime);

// Chunk changed?
if (newChunkIndex !== currentChunkRef.current) {
  lastAdjustedRateRef.current = 1;   // reset smoothing
  currentChunkRef.current = newChunkIndex;
}

// Apply video speed only ONCE per chunk
if (playerRef.current?.setPlaybackRate) {

  // Calculate the chunk-wide playback rate
  const rates = getSmoothedAdjustedRate(wps, rawRate);

  if (rates) {
    const numFactor = numberFactor(textToSpeak);
    const lenFactor = lengthFactor(textToSpeak);

    let adjustedRateWithFactors = rates * numFactor * lenFactor;
    adjustedRateWithFactors = Math.max(0.1, Math.min(1.2, adjustedRateWithFactors));

    // This rate remains constant for entire chunk
    const adjustedRate = adjustedRateWithFactors;

    playerRef.current.setPlaybackRate(adjustedRate);
  }
}

  console.log(`Speech rate: ${speechRate}, Adjusted rate: ${adjustedRate}`);
  if (isSSMLSupported) {
    textToSpeak = enhanceWithSsml(textToSpeak);
  }

  utterance.rate = speechRate;

  window.speechSynthesis.cancel();
  // When the utterance finishes BEFORE chunk end,
// jump video to next chunk start
utterance.onend = () => {
  const chunk = currentChunkRef.current;
  const nextChunkStart = CHUNKS[chunk + 1];

  if (nextChunkStart !== Infinity) {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(nextChunkStart, true);
    }
  }
};

  window.speechSynthesis.speak(utterance);
}, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang, playerRef, isSSMLSupported]);

// Handle user pause/resume/seek behavior
useEffect(() => {
  if (!showVideo) return;

  const player = playerRef.current;
  if (!player) return;

  // When user seeks, recalc chunk and restart TTS from correct subtitle
  const handleSeeked = () => {
    const time = player.getCurrentTime?.() ?? currentTime;
    const newChunk = getChunkIndex(time);
    currentChunkRef.current = newChunk;

    // Reset smoothing for this chunk
    lastAdjustedRateRef.current = 1;

    // Restart TTS from the subtitle at this new location
    lastSpokenRef.current = '';
  };

  player.addEventListener?.("seeked", handleSeeked);

  return () => {
    player.removeEventListener?.("seeked", handleSeeked);
  };
}, [playerRef, showVideo]);

// If user pauses → stop TTS
// If user resumes → restart from same subtitle
useEffect(() => {
  const player = playerRef.current;
  if (!player) return;

  const onPause = () => {
    window.speechSynthesis.cancel();
  };

  const onPlay = () => {
    lastSpokenRef.current = ''; // So TTS restarts from current subtitle
  };

  player.addEventListener?.("pause", onPause);
  player.addEventListener?.("play", onPlay);

  return () => {
    player.removeEventListener?.("pause", onPause);
    player.removeEventListener?.("play", onPlay);
  };
}, [playerRef]);

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
