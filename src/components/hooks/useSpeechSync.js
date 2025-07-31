import { useState, useEffect, useRef } from 'react';

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

  // Track if player is ready to accept commands
  const [playerReady, setPlayerReady] = useState(false);

  // Detect when playerRef.current becomes available
  useEffect(() => {
    if (playerRef.current) {
      setPlayerReady(true);
    } else {
      setPlayerReady(false);
    }
  }, [playerRef.current]);

  // Sync volume state to player when player is ready or volume changes
  useEffect(() => {
    if (playerReady && playerRef.current?.setVolume instanceof Function) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady, playerRef]);

  // Reset speech synthesis when stopped or video hidden
  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      window.speechSynthesis.cancel();
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = '';
      return;
    }
  }, [isSpeaking, showVideo]);

  // Sync speech with current subtitle & video time
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
      lastSpokenRef.current = ''; // Allow first subtitle
    }

    if (!hasStartedSpeakingRef.current) return;
    if (lastSpokenRef.current === currentSubtitle) return;

    lastSpokenRef.current = currentSubtitle;

    // Find subtitle duration for speech rate
    const currentSub = subtitles.find(
      (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
    );
    const subtitleDuration = currentSub?.duration || 3;
    const wordCount = currentSubtitle.trim().split(/\s+/).length;
    const rawRate = wordCount / subtitleDuration;
    const speechRate = Math.min(Math.max(rawRate, 0.7), 1.1);

    // Adjust video playback speed to sync with speech rate
    if (playerRef.current?.setPlaybackRate) {
      const adjustedRate = Math.max(0.8, Math.min(1, 1.4 / rawRate));
      console.log(wordCount, subtitleDuration, speechRate, adjustedRate);
      playerRef.current.setPlaybackRate(adjustedRate);
    }

    // Speak subtitle text
    const utterance = new SpeechSynthesisUtterance(currentSubtitle);

    let selectedLang = 'en-US'; // default fallback

    switch (lang) {
      case 'ml':
        selectedLang = 'ml-IN'; // Malayalam
        break;
      case 'ta':
        selectedLang = 'ta-IN'; // Tamil
        break;
      case 'hi':
        selectedLang = 'hi-IN'; // Hindi
        break;
      case 'bn':
        selectedLang = 'bn-IN'; // Bengali
        break;
      case 'te':
        selectedLang = 'te-IN'; // Telugu
        break;
      case 'kn':
        selectedLang = 'kn-IN'; // Kannada
        break;
      case 'gu':
        selectedLang = 'gu-IN'; // Gujarati
        break;
      case 'mr':
        selectedLang = 'mr-IN'; // Marathi
        break;
      case 'ur':
        selectedLang = 'ur-IN'; // Urdu
        break;
      case 'en-uk':
        selectedLang = 'en-GB'; // English (UK)
        break;
      case 'en':
      default:
        selectedLang = 'en-US'; // English (US)
        break;
    }

    utterance.lang = selectedLang;
    utterance.rate = speechRate;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang, playerRef]);

  // Reset playback rate and volume when speech stops
  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
    }
  }, [isSpeaking, playerRef]);

  // Volume control handler
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    // The volume syncing useEffect will handle setting this on the player
  };

  // Toggle speaking state
  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      const newSpeaking = !prev;

      if (newSpeaking) {
        // when turning ON speaking, set internal volume state to 20
        setVolume(20);
        // player volume will be set by the syncing useEffect when player is ready
      }

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
