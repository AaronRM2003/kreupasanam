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
  useEffect(() => {
  if (!isSpeaking || !showVideo || subtitles.length === 0) return;

  const chunk = getSubtitleChunk(subtitles, currentTime);

  if (!chunk) return;

  // Avoid re-speaking same chunk
  if (lastChunkRef.current === chunk.mergedText) return;

  lastChunkRef.current = chunk.mergedText;

  // Prepare utterance
  let text = chunk.mergedText;
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply SSML if supported
  if (isSSMLSupported) {
    text = enhanceWithSsml(text);
  }

  utterance.voice = voice || null;
  utterance.rate = 1;

  // Clean old TTS
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

  // When speech finishes
  utterance.onend = () => {
    const videoTime = playerRef.current?.getCurrentTime?.() || 0;

    if (videoTime < chunk.chunkEnd - 0.3) {
      // Jump video forward to matched time
      playerRef.current.seekTo(chunk.chunkEnd);
    }

    // Let next chunk happen automatically
  };

}, [isSpeaking, showVideo, currentTime, subtitles]);


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
