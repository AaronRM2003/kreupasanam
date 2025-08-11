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

const margin = 0.05;   // your safe margin
const maxStepUp = 0.15;

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
  // Remove content inside square brackets (already done)
  .replace(/\[[^\]]*\]/g, '')  
  // Remove ellipses or multiple dots
  .replace(/\.{2,}/g, '')      
  // Remove standalone punctuation like -- or ***
  .replace(/[-*]{2,}/g, '')    
  // Replace V.P. with VP as before
  .replace(/\b(V\.P\.)\b/g, 'VP')
  // Trim whitespace
  .trim();


  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  // Set utterance lang as before
  
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
      adjustedRate = rates;
      playerRef.current.setPlaybackRate(adjustedRate);
    }
  }
  console.log(`Speech rate: ${speechRate}, Adjusted rate: ${adjustedRate}`);
  if (isSSMLSupported) {
    textToSpeak = enhanceWithSsml(textToSpeak);
  }

  utterance.rate = speechRate;

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
