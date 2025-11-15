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
 function getSubtitleGroup(subs, time, lang, size = 6) {
  const idx = subs.findIndex(
    s => time >= s.startSeconds && time < s.endSeconds
  );
  if (idx === -1) return null;

  const group = subs.slice(idx, idx + size);

  return {
    id: idx, // ⭐ NEW — stable identifier
    text: group
      .map(s => (s.text?.[lang] || "").trim())
      .filter(t => t.length > 0)
      .join(" "),
    start: group[0].startSeconds,
    end: group[group.length - 1].endSeconds,
    duration: group[group.length - 1].endSeconds - group[0].startSeconds
  };
}
const lastGroupIndexRef = useRef(-1);
useEffect(() => {
  const player = playerRef.current;
  if (!player) return;

  const handlePause = () => {
    window.speechSynthesis.cancel();
    hasStartedSpeakingRef.current = false;
  };

  const handlePlay = () => {
    hasStartedSpeakingRef.current = false; 
  };

  const handleSeek = () => {
    window.speechSynthesis.cancel();
    lastGroupIndexRef.current = -1;
    hasStartedSpeakingRef.current = false;
  };

  player.addEventListener("pause", handlePause);
  player.addEventListener("play", handlePlay);
  player.addEventListener("seeking", handleSeek);

  return () => {
    player.removeEventListener("pause", handlePause);
    player.removeEventListener("play", handlePlay);
    player.removeEventListener("seeking", handleSeek);
  };
}, [playerRef]);


  useEffect(() => {
  if (!isSpeaking || !showVideo || !currentSubtitle || subtitles.length === 0) return;

  if (!hasStartedSpeakingRef.current) {
  lastSpokenRef.current = '';
}


  const group = getSubtitleGroup(subtitles, currentTime, lang);
  // New: calculate stable group index
const currentIndex = subtitles.findIndex(
  s => currentTime >= s.startSeconds && currentTime < s.endSeconds
);

const groupSize = 6;
const currentGroupIndex = Math.floor(currentIndex / groupSize);

// If same group, skip speaking
if (currentGroupIndex === lastGroupIndexRef.current) {
  return;
}

// Save new group index
lastGroupIndexRef.current = currentGroupIndex;
hasStartedSpeakingRef.current = true; // <— moved here

 if (!group || !group.text) return;

 if (lastSpokenRef.current === currentGroupIndex) return;
lastSpokenRef.current = currentGroupIndex;



 const subtitleDuration = group.duration || 3;
 const wordCount = group.text.trim().split(/\s+/).length;

  // Get the utterance voice if possible
  let wps = 2; // default fallback

  // Prepare the text first to create utterance and get voice
let textToSpeak = group.text  // Remove content inside square brackets
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
  utterance.onend = () => {
  const player = playerRef.current;
  if (!player) return;

  const now = player.getCurrentTime?.() || 0;

  // If TTS finished early move video to end of group
  if (now < group.end - 0.3) {
    player.seekTo(group.end, true);
  }
};

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang, playerRef, isSSMLSupported]);


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
