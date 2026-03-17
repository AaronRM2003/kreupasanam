import { useState, useRef, useEffect } from "react";
import { generateBatch } from "../utils/piperEngine";

export function usePiperSpeechSync({
  playerRef,
  showVideo,
  subtitles,
  currentSubtitle,
  currentTime,
  lang,
  videoId
}) {

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);

  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  const audioCache = useRef(new Map());
  const generationQueue = useRef(new Set());

  const lastSubtitleKeyRef = useRef(null);
  const lastVideoIdRef = useRef(videoId);
  const lastTimeRef = useRef(0);

  const playingRef = useRef(false);

  // -------------------------
  // Init Audio Context
  // -------------------------

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
  }, []);

  // -------------------------
  // Clear cache when video changes
  // -------------------------

  useEffect(() => {

    if (lastVideoIdRef.current !== videoId) {

      audioCache.current.clear();
      generationQueue.current.clear();

      lastVideoIdRef.current = videoId;

      stopAudio();

    }

  }, [videoId]);

  // -------------------------
  // Stop audio safely
  // -------------------------

  function stopAudio() {

    if (sourceRef.current) {

      try { sourceRef.current.stop(); }
      catch {}

      sourceRef.current = null;

    }

    playingRef.current = false;

  }

  // -------------------------
  // Generate batch audio
  // -------------------------

  async function generateBatchAudio(subs) {

    const items = [];

    for (const s of subs) {

      const key = `${s.startSeconds}-${s.endSeconds}`;

      if (
        audioCache.current.has(key) ||
        generationQueue.current.has(key)
      ) continue;

      generationQueue.current.add(key);

      items.push({
        key,
        text: s.text || ""
      });

    }

    if (!items.length) return;

    try {

      const results = await generateBatch(items);

      for (const r of results) {

        const audioBuffer =
          await audioContextRef.current.decodeAudioData(
            r.audio.buffer
          );

        audioCache.current.set(r.key, audioBuffer);

        generationQueue.current.delete(r.key);

      }

    } catch (err) {

      console.error("Piper batch error", err);

    }

  }

  // -------------------------
  // Play audio
  // -------------------------

  function playAudio(buffer, offset = 0) {

    if (!audioContextRef.current) return;

    stopAudio();

    const source =
      audioContextRef.current.createBufferSource();

    const gain =
      audioContextRef.current.createGain();

    source.buffer = buffer;

    gain.gain.value = volume / 100;

    source.connect(gain);
    gain.connect(audioContextRef.current.destination);

    source.start(0, offset);

    sourceRef.current = source;

    playingRef.current = true;

  }

  // -------------------------
  // Main sync logic
  // -------------------------

  useEffect(() => {

    if (!isSpeaking) return;
    if (!showVideo) return;
    if (!currentSubtitle) return;

    const sub = subtitles.find(
      s =>
        currentTime >= s.startSeconds &&
        currentTime < s.endSeconds
    );

    if (!sub) return;

    const key =
      `${sub.startSeconds}-${sub.endSeconds}`;

    if (lastSubtitleKeyRef.current === key) return;

    lastSubtitleKeyRef.current = key;

    const index = subtitles.indexOf(sub);

    // Batch current + next subtitles
    const batch =
      subtitles.slice(index, index + 4);

    generateBatchAudio(batch).then(() => {

      const audio =
        audioCache.current.get(key);

      if (!audio) return;

      const progress =
        (currentTime - sub.startSeconds) /
        (sub.endSeconds - sub.startSeconds);

      const offset =
        audio.duration * progress;

      playAudio(audio, Math.max(0, offset));

    });

    // Limit cache size
    if (audioCache.current.size > 30) {

      const firstKey =
        audioCache.current.keys().next().value;

      audioCache.current.delete(firstKey);

    }

  }, [
    currentTime,
    currentSubtitle,
    isSpeaking,
    subtitles,
    showVideo
  ]);

  // -------------------------
  // Seek detection
  // -------------------------

  useEffect(() => {

    const delta =
      Math.abs(currentTime - lastTimeRef.current);

    if (delta > 1.2) {

      stopAudio();

      lastSubtitleKeyRef.current = null;

    }

    lastTimeRef.current = currentTime;

  }, [currentTime]);

  // -------------------------
  // Stop when disabled
  // -------------------------

  useEffect(() => {

    if (!isSpeaking) {

      stopAudio();

      lastSubtitleKeyRef.current = null;

    }

  }, [isSpeaking]);

  // -------------------------
  // Controls
  // -------------------------

  function toggleSpeaking() {

    setIsSpeaking(prev => !prev);

  }

  function stopSpeaking() {

    setIsSpeaking(false);

    stopAudio();

  }

  function handleVolumeChange(e) {

    setVolume(Number(e.target.value));

  }

  return {

    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange

  };

}