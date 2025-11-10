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

const margin = 0.09;   // safe margin
const maxStepUp = 0.25;

const lastAdjustedRateRef = useRef(1);

function adjustedRateFixedSpeech(cps, rawRate) {
  const k = rawRate / cps;
  const speechRate = 1;
  let adjustedRate = speechRate / k;
  adjustedRate -= margin;
  if (adjustedRate > 1) adjustedRate = 1;
  if (adjustedRate < 0) adjustedRate = 0;
  return adjustedRate;
}

function getSmoothedAdjustedRate(cps, rawRate) {
  const targetAdjustedRate = adjustedRateFixedSpeech(cps, rawRate);
  const lastAdj = lastAdjustedRateRef.current;

  if (targetAdjustedRate < lastAdj) {
    // Decreasing: jump immediately
    lastAdjustedRateRef.current = targetAdjustedRate;
    return parseFloat(targetAdjustedRate.toFixed(4));
  } else if (targetAdjustedRate > lastAdj) {
    // Increasing: increase gradually by maxStepUp
    let newAdjRate = lastAdj + maxStepUp;
    if (newAdjRate > targetAdjustedRate) newAdjRate = targetAdjustedRate;
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

  // ✅ Use characters per second instead of words
  const charCount = currentSubtitle.replace(/\s+/g, '').length;

  // Get the utterance voice if possible
  let cps = 15; // default baseline (average human speech)

  // Clean the text for speech
  let textToSpeak = currentSubtitle
    .replace(/\[[^\]]*\]/g, '')       // remove [bracketed] parts
    .replace(/\.{2,}/g, '')           // remove ellipses
    .replace(/[-*]{2,}/g, '')         // remove long dashes/asterisks
    .replace(/\b(V\.P\.)\b/g, 'VP')   // normalize abbreviations
    .replace(/\bKreupasanam\b/gi, 'Kri-paasenam') // fix pronunciation
    .trim();

  const utterance = new SpeechSynthesisUtterance(textToSpeak);

  function numberFactor(text) {
    const numbers = text.match(/\d+/g);
    if (!numbers) return 1;

    let factor = 1;
    numbers.forEach(num => {
      if (num.length >= 4) factor *= 0.85;
      else if (num.length === 3) factor *= 0.9;
    });

    const bibleRefPattern = /\b([A-Z][a-z]+)\s+\d{1,3}:\d{1,3}\b/;
    if (bibleRefPattern.test(text)) factor *= 0.8;

    return Math.max(0.4, Math.min(1, factor));
  }

  // ✅ use the new key structure (v2)
  const savedVoiceName = localStorage.getItem(`voice_selected_v2_${lang}`);
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.name === savedVoiceName);
  utterance.voice = matchedVoice || voice || null;
  utterance.lang = lang || 'en-US';

  if (utterance.voice?.name) {
    const testKey = `voice_test_data_v2_${lang}`;
    const storedData = localStorage.getItem(testKey);

    if (storedData) {
      try {
        const allTestData = JSON.parse(storedData);
        const voiceData = allTestData[utterance.voice.name];
        if (voiceData && voiceData.cps) {
          cps = parseFloat(voiceData.cps);
        }
      } catch (e) {
        console.error("Failed to parse voice test data:", e);
      }
    }
  }

  console.log(cps, `voice_${utterance.voice?.name}_tested`);
  const rawRate = charCount / subtitleDuration;
  console.log(charCount, subtitleDuration);

  let speechRate = 1; // fallback
  let adjustedRate = 1;

  if (playerRef.current?.setPlaybackRate) {
    console.log(`Raw rate: ${rawRate}, CPS: ${cps}`);
    const rates = getSmoothedAdjustedRate(cps, rawRate);

    if (rates) {
      const numFactor = numberFactor(textToSpeak);
      let adjustedRateWithNumbers = rates * numFactor;

      adjustedRateWithNumbers = Math.max(0.1, Math.min(1.2, adjustedRateWithNumbers));
      adjustedRate = adjustedRateWithNumbers;

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
