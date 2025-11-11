import { useState, useEffect, useRef, useMemo } from 'react';
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
  const [playerReady, setPlayerReady] = useState(false);

  const isSSMLSupported = useSSMLSupportTest();
  const voice = useSelectedVoice(lang);

  // Cache references
  const lastSubtitleRef = useRef('');
  const hasStartedRef = useRef(false);
  const lastRateRef = useRef(1);

  // Cache voice list
  const [voices, setVoices] = useState([]);
  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /** Volume sync */
  useEffect(() => {
    const checkReady = () => {
      const player = playerRef.current;
      if (player?.setVolume instanceof Function) {
        player.setVolume(volume);
        setPlayerReady(true);
        return true;
      }
      return false;
    };
    if (!checkReady()) {
      const id = setInterval(() => checkReady() && clearInterval(id), 200);
      return () => clearInterval(id);
    }
  }, [playerRef, volume]);

  /** Stop speaking reset */
  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      window.speechSynthesis.cancel();
      hasStartedRef.current = false;
      lastSubtitleRef.current = '';
    }
  }, [isSpeaking, showVideo]);

  /** Helper: compute adjusted rate */
  const computeAdjustedRate = (wps, rawRate, text) => {
    const base = Math.min(1, Math.max(0, 1 - (rawRate / wps - 1) * 0.06));

    // Apply number and length factors
    const lenFactor = (() => {
      const words = text.trim().split(/\s+/);
      const avgLen = words.reduce((a, b) => a + b.length, 0) / words.length || 4;
      const baseline = 3.7;
      return avgLen > baseline ? Math.max(0.7, 1 - (avgLen - baseline) * 0.05)
                               : Math.min(1.15, 1 + (baseline - avgLen) * 0.04);
    })();

    const numFactor = (() => {
      let f = 1;
      const nums = text.match(/\d+/g);
      if (nums) {
        nums.forEach(n => {
          if (n.length >= 4) f *= 0.85;
          else if (n.length === 3) f *= 0.9;
        });
      }
      if (/\b([A-Z][a-z]+)\s+\d{1,3}:\d{1,3}\b/.test(text)) f *= 0.8;
      return Math.max(0.4, Math.min(1, f));
    })();

    let adjusted = base * lenFactor * numFactor;
    adjusted = Math.max(0.1, Math.min(1.2, adjusted));

    // Smooth increases
    if (adjusted > lastRateRef.current) {
      adjusted = Math.min(adjusted, lastRateRef.current + 0.25);
    }
    lastRateRef.current = adjusted;
    return adjusted;
  };

  /** Speech synchronization */
  useEffect(() => {
    if (!isSpeaking || !showVideo || !currentSubtitle || subtitles.length === 0)
      return;

    const currentSub = subtitles.find(
      s => currentTime >= s.startSeconds && currentTime < s.endSeconds
    );
    if (!currentSub) return;

    const text = currentSubtitle
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\.{2,}|[-*]{2,}/g, '')
      .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
      .trim();

    if (lastSubtitleRef.current === text) return;
    lastSubtitleRef.current = text;

    const duration = currentSub?.duration ?? 3;
    const wordCount = text.split(/\s+/).length;
    const rawRate = wordCount / duration;

    let wps = 2;
    try {
      const saved = JSON.parse(localStorage.getItem(`voice_test_data_${lang}`));
      const savedVoice = localStorage.getItem(lang);
      if (saved?.[savedVoice]?.wps) wps = saved[savedVoice].wps;
    } catch {}

    const adjustedRate = computeAdjustedRate(wps, rawRate, text);
    playerRef.current?.setPlaybackRate?.(adjustedRate);

    const utterance = new SpeechSynthesisUtterance(
      isSSMLSupported ? enhanceWithSsml(text) : text
    );

    utterance.voice =
      voices.find(v => v.name === localStorage.getItem(lang)) ||
      voice ||
      null;
    utterance.lang = lang || 'en-US';
    utterance.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, showVideo, currentSubtitle, currentTime]);

  /** Volume reset */
  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
    }
  }, [isSpeaking]);

  const toggleSpeaking = () => {
    setIsSpeaking(prev => {
      const newState = !prev;
      setVolume(newState ? 10 : 100);
      return newState;
    });
  };

  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking: () => setIsSpeaking(false),
    volume,
    handleVolumeChange: e => setVolume(Number(e.target.value)),
  };
}
