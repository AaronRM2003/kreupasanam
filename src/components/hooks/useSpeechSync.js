import { useState, useEffect, useRef, useCallback } from 'react';
import { enhanceWithSsml } from './useSsml';
import { useIsGoogleTTS } from './useIsGoogleTts';
import { useSSMLSupportTest } from './useIsSsmlSupport';
import { useSelectedVoice } from './useSelectedVoice';
import { addEndTimesToSubtitles } from '../utils/Utils';

// Hook: useSpeechSync (patched - Option 1 behavior)
// - Flexible mode: user may seek anywhere; when seeking, TTS restarts from the START of the subtitle containing that time.
// - Checkpoints are only used for chunk-end auto-sync; they do NOT restrict seeking.
// - Expects subtitles already processed by addEndTimesToSubtitles (each has startSeconds, endSeconds, duration).

export function useSpeechSync({
  playerRef,
  showVideo,
  subtitles = [],
  currentSubtitle,
  currentTime,
  lang = 'en-US',
  duration = 0,
  checkpoints = [],
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const isSSMLSupported = useSSMLSupportTest();
  const voice = useSelectedVoice(lang);

  // ===== Refs for internal state =====
  const wordTimelineRef = useRef([]); // [{ time, word, subtitleIndex }]
  const checkpointsRef = useRef([]);
  const utteranceRef = useRef(null);
  const ttsStartStateRef = useRef(null);
  const pollingRef = useRef(null);
  const lastPlayerTimeRef = useRef(0);

  // playback smoothing
  const lastAdjustedRateRef = useRef(1);
  const maxStepUp = 0.25;

  // Build checkpoints (if empty, split into 3 equal parts)
  useEffect(() => {
    let ch = Array.isArray(checkpoints) ? [...checkpoints] : [];
    if (!ch || ch.length === 0) {
      const d = Number(duration) || 0;
      if (d > 3) {
        const a = Math.floor(d / 3);
        ch = [a, a * 2];
      } else {
        ch = [];
      }
    }
    // ensure sorted and unique
    ch = ch.map((c) => Math.max(0, Math.floor(Number(c) || 0))).filter((v) => v > 0 && v < duration);
    ch = Array.from(new Set(ch)).sort((a, b) => a - b);

    checkpointsRef.current = ch;
  }, [checkpoints, duration]);

  // Helper: ensure subtitles have start/end seconds
  function normalizeSubs(subs) {
    if (!Array.isArray(subs)) return [];
    const s = subs.map((sub) => ({
      startSeconds: Number(sub.startSeconds ?? sub.start ?? 0),
      endSeconds: Number(sub.endSeconds ?? sub.end ?? 0),
      text: (sub.text ?? sub.content ?? '').toString(),
    }));
    return addEndTimesToSubtitles ? addEndTimesToSubtitles(s) : s;
  }

  // Build a word timeline using Option C: distribute each subtitle's duration across its words
  useEffect(() => {
    const subs = normalizeSubs(subtitles);
    const timeline = [];
    subs.forEach((sub, subIdx) => {
      const start = sub.startSeconds || 0;
      const end = sub.endSeconds || start + 3;
      const dur = Math.max(0.01, end - start);
      const words = (sub.text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
      if (words.length === 0) return;
      const per = dur / words.length;
      for (let i = 0; i < words.length; i++) {
        timeline.push({
          word: words[i],
          time: start + i * per,
          subtitleIndex: subIdx,
        });
      }
    });
    wordTimelineRef.current = timeline;
  }, [subtitles]);

  // Utility: find nearest word index for a given video time
  const findWordIndexForTime = useCallback((t) => {
    const tl = wordTimelineRef.current;
    if (!tl || tl.length === 0) return 0;
    // binary search by time
    let lo = 0,
      hi = tl.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tl[mid].time === t) return mid;
      if (tl[mid].time < t) lo = mid + 1;
      else hi = mid - 1;
    }
    return Math.max(0, lo - 1);
  }, []);

  // Utility: find chunk (checkpoint) index for a given time
  const findChunkIndexForTime = useCallback((t) => {
    const ch = [0, ...(checkpointsRef.current || []), duration || Number.MAX_SAFE_INTEGER];
    for (let i = 0; i < ch.length - 1; i++) {
      if (t >= ch[i] && t < ch[i + 1]) return i;
    }
    return Math.max(0, ch.length - 2);
  }, [duration]);

  // Utility: find subtitle index for a video time
  const findSubtitleIndexForTime = useCallback((t) => {
    const subs = normalizeSubs(subtitles);
    if (!subs || subs.length === 0) return -1;
    for (let i = 0; i < subs.length; i++) {
      if (t >= subs[i].startSeconds && t < subs[i].endSeconds) return i;
    }
    // if after last, return last
    if (t >= subs[subs.length - 1].endSeconds) return subs.length - 1;
    return -1;
  }, [subtitles]);

  // Stop current speech safely
  const cancelSpeech = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
    utteranceRef.current = null;
    ttsStartStateRef.current = null;
  }, []);

  // Start speaking from a given video time
  // Option 1 behavior: when user seeks, start from the START of the subtitle that contains that time
  const speakFromVideoTime = useCallback((videoTime, opts = {}) => {
    // opts: { chunkOnly: true } - speak only until chunk end
    const tl = wordTimelineRef.current;
    if (!tl || tl.length === 0) return;

    cancelSpeech();

    // find subtitle index containing this time -> start from the subtitle start (Option 1)
    const subs = normalizeSubs(subtitles);
    let subIdx = findSubtitleIndexForTime(videoTime);
    if (subIdx === -1) subIdx = 0;

    // find first word index that belongs to this subtitle
    let wordIdx = tl.findIndex((w) => w.subtitleIndex === subIdx);
    if (wordIdx === -1) {
      // fallback: nearest word by time
      wordIdx = findWordIndexForTime(videoTime);
    }

    const chunkIdx = findChunkIndexForTime(videoTime);
    const ch = [0, ...(checkpointsRef.current || []), duration || Number.MAX_SAFE_INTEGER];
    const chunkStart = ch[chunkIdx];
    const chunkEnd = ch[chunkIdx + 1];

    // build text from the START of the subtitle until chunkEnd
    const words = [];
    // ensure we start at earliest index for that subtitle
    const earliest = tl.findIndex((w) => w.subtitleIndex === subIdx);
    if (earliest >= 0) wordIdx = earliest;

    for (let i = wordIdx; i < tl.length; i++) {
      if (tl[i].time >= chunkEnd) break;
      words.push(tl[i].word);
    }

    if (words.length === 0) return; // nothing to speak

    let textToSpeak = words.join(' ');
    if (isSSMLSupported) textToSpeak = enhanceWithSsml(textToSpeak);

    const utter = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utter;
    // select voice
    const savedVoiceName = localStorage.getItem(`${lang}`);
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.name === savedVoiceName);
    utter.voice = matchedVoice || voice || null;
    utter.lang = lang || 'en-US';
    utter.rate = 1; // keep TTS rate 1; adjust video instead

    // mark start state for estimated progress: use the subtitle start time as base (first word time)
    const startWordTime = tl[wordIdx]?.time ?? videoTime;
    ttsStartStateRef.current = {
      startedAtWallClock: Date.now(), // ms
      startWordIndex: wordIdx,
      startWordTime, // estimated video time when tts started (subtitle start)
      chunkEnd,
      chunkIdx,
    };

    utter.onend = () => {
      // when block finishes, seek video to chunkEnd and reset playback rate
      const player = playerRef.current;
      if (player?.seekTo) {
        try { player.seekTo(chunkEnd, true); } catch (e) {}
      }
      try { player?.setPlaybackRate?.(1); } catch (e) {}
      // clear state
      ttsStartStateRef.current = null;
      utteranceRef.current = null;
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utter);

    // ensure speaking flag
    setIsSpeaking(true);
  }, [cancelSpeech, findWordIndexForTime, findChunkIndexForTime, findSubtitleIndexForTime, isSSMLSupported, lang, voice, duration, subtitles]);

  // Pause/resume handling when user pauses/resumes video
  const handlePlayerStateChange = useCallback((state) => {
    if (!window.speechSynthesis) return;
    if (state === 2) {
      // paused
      try { window.speechSynthesis.pause(); } catch (e) {}
    } else if (state === 1) {
      // playing
      try { window.speechSynthesis.resume(); } catch (e) {}
    }
  }, []);

  // Polling loop to sync video playbackRate to TTS progress
  useEffect(() => {
    if (!isSpeaking) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    pollingRef.current = setInterval(() => {
      const player = playerRef.current;
      if (!player || !player.getCurrentTime) return;
      const now = Date.now();
      const videoTime = player.getCurrentTime();
      lastPlayerTimeRef.current = videoTime;

      const ttsState = ttsStartStateRef.current;
      if (!ttsState) return; // nothing to compare

      // estimate how many seconds tts has spoken so far
      const elapsedMs = now - ttsState.startedAtWallClock;
      const elapsedSec = Math.max(0, elapsedMs / 1000);

      // estimate what video time tts corresponds to
      const estimatedTtsVideoTime = ttsState.startWordTime + elapsedSec;

      // compare estimatedTtsVideoTime vs actual video time
      const diff = estimatedTtsVideoTime - videoTime;

      // if tts ahead of video by > 0.5s -> speed up video
      // if video ahead of tts by > 0.5s -> slow down video
      const threshold = 0.5;
      let targetRate = 1;
      if (diff > threshold) {
        // tts ahead -> increase playback rate so video catches up
        const factor = Math.min(1 + Math.abs(diff) / 10, 2);
        targetRate = Math.min(2, factor);
      } else if (diff < -threshold) {
        // video ahead -> slow video down
        const factor = Math.max(1 - Math.abs(diff) / 10, 0.25);
        targetRate = Math.max(0.25, factor);
      } else {
        targetRate = 1;
      }

      // smooth increases (allow quick decreases)
      const last = lastAdjustedRateRef.current || 1;
      let newRate = last;
      if (targetRate < last) {
        newRate = targetRate; // jump down immediately
      } else if (targetRate > last) {
        newRate = Math.min(last + maxStepUp, targetRate);
      }
      newRate = Math.max(0.25, Math.min(2, newRate));
      lastAdjustedRateRef.current = newRate;

      try { player.setPlaybackRate?.(newRate); } catch (e) {}

      // If tts has reached chunk end (or is very close), ensure video is placed at chunk end
      if (ttsState.chunkEnd && estimatedTtsVideoTime >= ttsState.chunkEnd - 0.05) {
        try { player.seekTo(ttsState.chunkEnd, true); } catch (e) {}
        try { player.setPlaybackRate?.(1); } catch (e) {}
        try { window.speechSynthesis.cancel(); } catch (e) {}
        ttsStartStateRef.current = null;
        utteranceRef.current = null;
        setIsSpeaking(false);
      }

    }, 300);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
      pollingRef.current = null;
    };
  }, [isSpeaking, playerRef]);

  // Seek detection: if user scrubs, restart TTS from the start of the subtitle
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !player.getCurrentTime) return;

    const check = () => {
      try {
        const t = player.getCurrentTime();
        const last = lastPlayerTimeRef.current || 0;
        // if user jumped more than 1.2s since last observed time -> treat as seek
        if (Math.abs(t - last) > 1.2) {
          // restart TTS at this video time (Option 1 - restart subtitle)
          if (isSpeaking) {
            speakFromVideoTime(t);
          }
        }
        lastPlayerTimeRef.current = t;
      } catch (e) {}
    };

    const intv = setInterval(check, 500);
    return () => clearInterval(intv);
  }, [playerRef, isSpeaking, speakFromVideoTime]);

  // If showVideo toggles off or isSpeaking false, cancel speech
  useEffect(() => {
    if (!isSpeaking || !showVideo) cancelSpeech();
  }, [isSpeaking, showVideo, cancelSpeech]);

  // Public controls
  const toggleSpeaking = useCallback(() => {
    setIsSpeaking((prev) => {
      const next = !prev;
      if (next) {
        const player = playerRef.current;
        const t = (player && player.getCurrentTime) ? player.getCurrentTime() : 0;
        setTimeout(() => speakFromVideoTime(t), 50);
      } else {
        cancelSpeech();
      }
      return next;
    });
  }, [playerRef, speakFromVideoTime, cancelSpeech]);

  const stopSpeaking = useCallback(() => {
    setIsSpeaking(false);
    cancelSpeech();
    try { playerRef.current?.setPlaybackRate?.(1); } catch (e) {}
  }, [cancelSpeech, playerRef]);

  const handleVolumeChange = useCallback((e) => {
    const newVol = Number(e?.target?.value ?? e);
    setVolume(newVol);
    try { playerRef.current?.setVolume?.(newVol); } catch (e) {}
  }, [playerRef]);

  // expose current small helpers if needed
  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange,
    _internal: {
      wordTimeline: () => wordTimelineRef.current,
      checkpoints: () => checkpointsRef.current,
      ttsState: () => ttsStartStateRef.current,
    },
  };
}
