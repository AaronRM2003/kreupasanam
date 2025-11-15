import { useState, useEffect, useRef } from "react";
import { useSelectedVoice } from "./useSelectedVoice";
import { useSSMLSupportTest } from "./useIsSsmlSupport";

export function useSpeechSync({
  playerRef,
  showVideo,
  subtitles,
  currentSubtitle,
  currentTime,
  lang
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);

  const isSSMLSupported = useSSMLSupportTest();
  const voice = useSelectedVoice(lang);

  // ---------------------------
  // FIXED CHUNKS
  // ---------------------------
  const CHUNKS = [0, 240, 600, Infinity];

  function getChunkIndex(t) {
    for (let i = 0; i < CHUNKS.length - 1; i++) {
      if (t >= CHUNKS[i] && t < CHUNKS[i + 1]) return i;
    }
    return 0;
  }

  const currentChunkRef = useRef(getChunkIndex(currentTime));

  // Used to ensure only one chunk utterance plays at a time
  const speakingChunkRef = useRef(null);
  const lastUserSeekRef = useRef(false);

  // ---------------------------------------------------------
  // Build FULL CHUNK SPEECH TEXT (continuous no stops)
  // ---------------------------------------------------------
  function getChunkText(chunkIndex, fromTime) {
    const start = CHUNKS[chunkIndex];
    const end = CHUNKS[chunkIndex + 1];

    // Only include subtitles inside chunk that are >= current time
    const chunkSubs = subtitles.filter(
      (s) => s.startSeconds >= fromTime && s.startSeconds < end
    );

    const text = chunkSubs
      .map((s) => s.text[lang] || s.text)
      .join(" ");

    return text
      .replace(/\[[^\]]*\]/g, "")
      .replace(/\.{2,}/g, "")
      .replace(/[-*]{2,}/g, "")
      .replace(/\b(V\.P\.)\b/g, "VP")
      .replace(/\bKreupasanam\b/gi, "Kri-paasenam")
      .trim();
  }

  // -----------------------------------------------------
  // MAIN SPEAKING EFFECT – runs whenever speaking/resuming
  // -----------------------------------------------------
  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      window.speechSynthesis.cancel();
      speakingChunkRef.current = null;
      return;
    }

    if (!playerRef.current || subtitles.length === 0) return;

    const player = playerRef.current;

    const now = player.getCurrentTime?.() ?? currentTime;

    const chunkIndex = getChunkIndex(now);
    currentChunkRef.current = chunkIndex;

    // If this chunk already speaking and user didn’t seek → do nothing
    if (
      speakingChunkRef.current === chunkIndex &&
      lastUserSeekRef.current === false
    ) {
      return;
    }

    // Reset seek flag
    lastUserSeekRef.current = false;

    // Cancel previous speech
    window.speechSynthesis.cancel();

    // Build full continuous text of the chunk
    const text = getChunkText(chunkIndex, now);

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    // voice
    utterance.voice = voice;
    utterance.lang = lang;
    utterance.rate = 1;

    speakingChunkRef.current = chunkIndex;

    // Start speaking
    window.speechSynthesis.speak(utterance);

    // -------------------------------------------------
    // EARLY FINISH → jump to chunk end
    // -------------------------------------------------
    utterance.onend = () => {
      const currentVideoTime = player.getCurrentTime?.() ?? now;
      const chunkEnd = CHUNKS[chunkIndex + 1];
      if (currentVideoTime < chunkEnd) {
        player.seekTo?.(chunkEnd, true);
      }
    };
  }, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang]);

  // -------------------------------------------------------
  // USER SEEKS → restart correct chunk + correct subtitle
  // -------------------------------------------------------
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleSeeked = () => {
      lastUserSeekRef.current = true;
      window.speechSynthesis.cancel();
      speakingChunkRef.current = null;
    };

    player.addEventListener?.("seeked", handleSeeked);
    return () => player.removeEventListener?.("seeked", handleSeeked);
  }, [playerRef]);

  // -------------------------------------------------------
  // USER PAUSE / PLAY
  // -------------------------------------------------------
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onPause = () => {
      lastUserSeekRef.current = false;
      window.speechSynthesis.cancel();
    };

    const onPlay = () => {
      lastUserSeekRef.current = false;
      speakingChunkRef.current = null; // restart chunk from here
    };

    player.addEventListener?.("pause", onPause);
    player.addEventListener?.("play", onPlay);

    return () => {
      player.removeEventListener?.("pause", onPause);
      player.removeEventListener?.("play", onPlay);
    };
  }, [playerRef]);

  // ---------------------------
  // SPEECH ON/OFF
  // ---------------------------
  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      const newVal = !prev;
      if (newVal) setVolume(10);
      return newVal;
    });
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
    speakingChunkRef.current = null;
    setVolume(100);
    playerRef.current?.setVolume?.(100);
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  return {
    isSpeaking,
    toggleSpeaking,
    stopSpeaking,
    volume,
    handleVolumeChange
  };
}
