import { useState, useEffect, useRef } from 'react';
import { enhanceWithSsml } from './useSsml';
import { useIsGoogleTTS } from './useIsGoogleTts';
import { useSSMLSupportTest } from './useIsSsmlSupport';

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
  const lastSpokenRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);

  const isSSMLSupported = useSSMLSupportTest(); // ✅ use hook at top level

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

  useEffect(() => {
    if (
      !isSpeaking ||
      !showVideo ||
      !currentSubtitle ||
      !subtitles.length
    )
      return;

    if (!hasStartedSpeakingRef.current) {
      hasStartedSpeakingRef.current = true;
      lastSpokenRef.current = '';
    }

    if (lastSpokenRef.current === currentSubtitle) return;
    lastSpokenRef.current = currentSubtitle;

    const currentSub = subtitles.find(
      (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
    );

    const subtitleDuration = currentSub?.duration || 3;
    const wordCount = currentSubtitle.trim().split(/\s+/).length;
    const rawRate = wordCount / subtitleDuration;
    const speechRate = Math.min(Math.max(rawRate, 0.7), 1.1);

    if (playerRef.current?.setPlaybackRate) {
      const adjustedRate = Math.max(0.8, Math.min(1, 1.4 / rawRate));
      playerRef.current.setPlaybackRate(adjustedRate);
    }

    let textToSpeak = currentSubtitle.replace(/\[[^\]]*\]/g, '').trim();
    textToSpeak = textToSpeak.replace(/\b(V\.P\.)\b/g, 'VP');

    if (isSSMLSupported) {
    //  speechRate  = Math.min(Math.max(rawRate, 0.4), 0.6);
      console.log("supported");
      textToSpeak = enhanceWithSsml(textToSpeak);
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const langMap = {
      ml: 'ml-IN',
      ta: 'ta-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      gu: 'gu-IN',
      mr: 'mr-IN',
      ur: 'ur-IN',
      'en-uk': 'en-GB',
      en: 'en-US',
    };

    utterance.lang = langMap[lang] || 'en-US';
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
      if (newSpeaking) setVolume(20);
      return newSpeaking;
    });
  };

  return {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange,
  };
}
