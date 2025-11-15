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

// Only speak when entering a chunk OR user resumes OR user seeks
if (!hasStartedSpeakingRef.current || currentSubtitle !== lastSpokenRef.current) {

  hasStartedSpeakingRef.current = true;
  lastSpokenRef.current = currentSubtitle;

  // ❗ build continuous chunk text
  let chunkSpeechText = getChunkText(subtitles, currentTime);

  // apply same cleaning
  chunkSpeechText = chunkSpeechText
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\.{2,}/g, '')
    .replace(/[-*]{2,}/g, '')
    .replace(/\b(V\.P\.)\b/g, 'VP')
    .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
    .trim();

  const utterance = new SpeechSynthesisUtterance(chunkSpeechText);
  utterance.voice = matchedVoice || voice;
  utterance.lang = lang;

  // Rate settings same as before…
  utterance.rate = 1; 

  // 🔥 reset + speak only once
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

  // handle early-finish skip
  utterance.onend = () => {
    const now = playerRef.current.getCurrentTime?.() ?? currentTime;
    const chunkEnd = CHUNKS[currentChunkRef.current + 1];
    if (now < chunkEnd) {
      playerRef.current.seekTo?.(chunkEnd, true);
    }
  };
}

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
