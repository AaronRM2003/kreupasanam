import { useState, useEffect, useRef } from 'react';
import { enhanceWithSsml } from './useSsml';
import { useIsGoogleTTS } from './useIsGoogleTts';
import { useSSMLSupportTest } from './useIsSsmlSupport';
import { useSelectedVoice } from './useSelectedVoice';
import { addEndTimesToSubtitles } from '../utils/Utils';

/**
 * useSpeechSync
 * - playerRef: ref to video player (expects setVolume, setPlaybackRate, seekTo)
 * - showVideo: boolean
 * - subtitles: array of subtitle objects (should have startSeconds, endSeconds, duration, text or text.{lang})
 * - currentSubtitle: the "current subtitle" value passed by parent (may be string or object)
 * - currentTime: current video time in seconds
 * - lang: language code (e.g. 'en')
 */
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
  const lastSpokenRef = useRef(''); // stores last spoken text (string)
  const [playerReady, setPlayerReady] = useState(false);

  const isSSMLSupported = useSSMLSupportTest();
  const voice = useSelectedVoice(lang);

  // ---------------- CHUNKS ----------------
  const CHUNKS = [
    { start: 0, end: 240 },   // 0:00 - 4:00
    { start: 240, end: 600 }, // 4:00 - 10:00
    { start: 600, end: Infinity }
  ];

  const getChunkIndex = (time) =>
    CHUNKS.findIndex(c => time >= c.start && time < c.end);

  const currentChunkRef = useRef(getChunkIndex(currentTime));
  // store playback rate per chunk (index => rate)
  const chunkRatesRef = useRef([1, 1, 1]);

  // prevents repeated seeks when onend fires
  const pendingSeekRef = useRef(false);

  // ---------------- Helpers ----------------

  // Robust text extractor: handles string, object.text string, multilingual text object
  function getTextFrom(sub) {
    if (!sub) return '';
    if (typeof sub === 'string') return sub;
    // prefer direct text string
    if (typeof sub.text === 'string') return sub.text;
    // multilingual object { en: "...", ml: "..." }
    if (typeof sub.text === 'object' && sub.text !== null) {
      return sub.text[lang] || sub.text.en || '';
    }
    // maybe top-level fields
    if (typeof sub.title === 'string') return sub.title;
    if (typeof sub.content === 'string') return sub.content;
    return '';
  }

  // Clean and normalize string for speaking
  function sanitizeText(s) {
    return s
      .replace(/\[[^\]]*\]/g, '')   // remove brackets
      .replace(/\.{2,}/g, '')       // remove ellipses etc
      .replace(/[-*]{2,}/g, '')
      .replace(/\b(V\.P\.)\b/g, 'VP')
      .replace(/\bKreupasanam\b/gi, 'Kri-paasenam')
      .trim();
  }

  // Estimators used to approximate TTS time for a subtitle
  function lengthFactor(text) {
    const words = (text || '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return 1;
    const totalChars = words.reduce((s, w) => s + w.length, 0);
    const avgChars = totalChars / words.length;
    const baseline = 4.7; // more realistic baseline for spoken English
    let factor = 1;
    if (avgChars > baseline) {
      factor *= Math.max(0.7, 1 - ((avgChars - baseline) * 0.03));
    } else if (avgChars < baseline - 1) {
      factor *= Math.min(1.12, 1 + ((baseline - avgChars) * 0.03));
    }
    return factor;
  }
  function numberFactor(text) {
    if (!text) return 1;
    const numbers = text.match(/\d+/g);
    let factor = 1;
    if (numbers) {
      numbers.forEach(num => {
        if (num.length >= 4) factor *= 0.85;
        else if (num.length === 3) factor *= 0.9;
      });
    }
    const bibleRefPattern = /\b([A-Z][a-z]+)\s+\d{1,3}:\d{1,3}\b/;
    if (bibleRefPattern.test(text)) factor *= 0.8;
    return Math.max(0.4, Math.min(1, factor));
  }

  // Estimate TTS time for a given subtitle using words count and voice WPS
  function estimateTtsTimeForSub(sub, wps = 2) {
    const text = getTextFrom(sub);
    const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
    const lenF = lengthFactor(text);
    const numF = numberFactor(text);
    const est = (words / Math.max(0.1, wps)) * lenF * numF;
    // clamp reasonable range
    return Math.max(0.5, Math.min(est, Math.max(3, words * 0.6 + 0.5)));
  }

  // Compute chunk rate (called once per chunk when subtitles load or change)
  function computeChunkRate(chunkIndex, voiceWps = 2) {
    const chunk = CHUNKS[chunkIndex];
    const subsInChunk = (subtitles || []).filter(
      s => s.startSeconds >= chunk.start && s.startSeconds < chunk.end
    );
    if (subsInChunk.length === 0) return 1;

    // Total words and estimated TTS time
    let totalWords = 0;
    let totalEstimatedTtsTime = 0;
    subsInChunk.forEach(s => {
      const txt = getTextFrom(s);
      const words = txt.trim().split(/\s+/).filter(Boolean).length || 1;
      totalWords += words;
      totalEstimatedTtsTime += estimateTtsTimeForSub(s, voiceWps);
    });

    // desired audio WPS = totalWords / totalEstimatedTtsTime
    const desiredWps = totalWords / Math.max(0.001, totalEstimatedTtsTime);

    // map desiredWps into a playbackRate factor for video:
    // We want video playbackRate so that video progress matches speech speed roughly.
    // If desiredWps equals voiceWps => playbackRate ~ 1
    let rate = 1;
    if (desiredWps > 0) rate = desiredWps / Math.max(0.1, voiceWps);

    // smooth and clamp
    rate = Math.max(0.6, Math.min(1.4, rate)); // realistic video speed
    return parseFloat(rate.toFixed(3));
  }

  // ---------------- Player readiness & volume ----------------
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

  // ---------------- compute chunk rates when subtitles or voice change ----------------
  useEffect(() => {
    if (!subtitles || subtitles.length === 0) return;
    // pick a voice WPS from saved voice data if available
    let voiceWps = 2;
    try {
      const saved = localStorage.getItem(`voice_test_data_${lang}`);
      if (saved) {
        const all = JSON.parse(saved);
        const vname = (localStorage.getItem(`${lang}`) || '');
        if (vname && all[vname] && all[vname].wps) voiceWps = parseFloat(all[vname].wps) || voiceWps;
      }
    } catch (e) {
      // ignore
    }

    // compute per chunk
    const rates = CHUNKS.map((_, idx) => computeChunkRate(idx, voiceWps));
    chunkRatesRef.current = rates;
    // if currently speaking, immediately apply current chunk's rate
    const idx = getChunkIndex(currentTime);
    currentChunkRef.current = idx;
    const pr = chunkRatesRef.current[idx] ?? 1;
    playerRef.current?.setPlaybackRate?.(pr);
  }, [subtitles, lang, voice?.name]);

  // ---------------- ensure cleanup on stop / hide ----------------
  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      window.speechSynthesis.cancel();
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = '';
    }
  }, [isSpeaking, showVideo]);

  // ---------------- speak logic (core) ----------------
  // We'll centralize speaking in a function so it can be restarted after seek/pause.
  const speakSubtitle = (sub) => {
    if (!sub) return;
    const rawText = getTextFrom(sub) || '';
    const text = sanitizeText(rawText);
    if (!text) return;

    // avoid repeating the same spoken text
    if (lastSpokenRef.current === text) return;
    lastSpokenRef.current = text;
    hasStartedSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(isSSMLSupported ? enhanceWithSsml(text) : text);
    // TTS voice and lang
    const savedVoiceName = localStorage.getItem(`${lang}`);
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.name === savedVoiceName);
    utterance.voice = matchedVoice || voice || null;
    utterance.lang = lang || 'en-US';
    // keep speech.rate at 1 (we only change video playback rate)
    utterance.rate = 1;

    // When a subtitle finishes, check whether it's the last subtitle in the chunk.
    utterance.onend = () => {
      // small delay guard to avoid immediate conflicts with seek events
      setTimeout(() => {
        try {
          const chunkIdx = currentChunkRef.current;
          const chunk = CHUNKS[chunkIdx];
          if (!chunk) return;

          // find all subtitles in chunk (ordered)
          const subsInChunk = (subtitles || []).filter(
            s => s.startSeconds >= chunk.start && s.startSeconds < chunk.end
          );
          if (subsInChunk.length === 0) return;

          // find index of current subtitle inside chunk
          const idxInChunk = subsInChunk.findIndex(s => s.startSeconds === sub.startSeconds && s.endSeconds === sub.endSeconds);

          // if this subtitle was the last in the chunk, jump to chunk end
          if (idxInChunk !== -1 && idxInChunk === subsInChunk.length - 1) {
            if (!pendingSeekRef.current) {
              pendingSeekRef.current = true;
              playerRef.current?.seekTo?.(chunk.end, true);
              // release pending flag after slight delay
              setTimeout(() => { pendingSeekRef.current = false; }, 400);
            }
          } else {
            // otherwise do nothing — the next subtitle will be spoken when effect re-runs based on currentTime
          }
        } catch (e) {
          // ignore
        }
      }, 50);
    };

    // cancel any previous utterances and speak
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Main effect: triggered when playing and current subtitle/time updates
  useEffect(() => {
    if (!isSpeaking || !showVideo || !subtitles || subtitles.length === 0) return;

    // compute subtitle object at currentTime
    const sub = subtitles.find(s => currentTime >= s.startSeconds && currentTime < s.endSeconds);

    // if user seeks (currentTime jump) we reset lastSpoken so it will re-speak
    // also handle resuming after pause
    const subText = sub ? getTextFrom(sub) : '';
    // If lastSpoken matches same text, do nothing. Otherwise (seeked or new subtitle), speak.
    if (!sub) return;
    if (lastSpokenRef.current === sanitizeText(subText)) {
      // already spoken this subtitle; do nothing
      return;
    }

    // Ensure player has chunk's playback rate applied
    const chunkIndex = getChunkIndex(currentTime);
    currentChunkRef.current = chunkIndex;
    const chunkRate = (chunkRatesRef.current && chunkRatesRef.current[chunkIndex]) || 1;
    playerRef.current?.setPlaybackRate?.(chunkRate);

    // Speak this subtitle
    speakSubtitle(sub);

  }, [isSpeaking, showVideo, currentTime, subtitles, lang, isSSMLSupported, voice]);

  // If user seeks manually while speaking, force restart of TTS at that subtitle
  useEffect(() => {
    if (!isSpeaking) return;
    // Reset lastSpoken to allow re-speaking of subtitle at new position
    lastSpokenRef.current = '';
    // Apply chunk rate for new currentTime
    const chunkIndex = getChunkIndex(currentTime);
    currentChunkRef.current = chunkIndex;
    const chunkRate = (chunkRatesRef.current && chunkRatesRef.current[chunkIndex]) || 1;
    playerRef.current?.setPlaybackRate?.(chunkRate);

    // The main effect will pick up currentTime change and call speakSubtitle
  }, [currentTime]);

  // When stopping speaking, reset playback rate and volume
  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
      window.speechSynthesis.cancel();
    }
  }, [isSpeaking, playerRef]);

  // simple volume control handler
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(newVol);
  };

  const toggleSpeaking = () => {
    setIsSpeaking(prev => {
      const newVal = !prev;
      if (newVal) setVolume(10); // drop video volume while TTS speaks
      if (!newVal) {
        window.speechSynthesis.cancel();
        lastSpokenRef.current = '';
      }
      return newVal;
    });
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
    hasStartedSpeakingRef.current = false;
    lastSpokenRef.current = '';
    setVolume(100);
    if (playerRef.current?.setVolume) playerRef.current.setVolume(100);
    if (playerRef.current?.setPlaybackRate) playerRef.current.setPlaybackRate(1);
  };

  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange,
  };
}
