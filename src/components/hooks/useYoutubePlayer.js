import { useEffect, useRef, useState } from 'react';

export function useYouTubePlayer(videoId, isPlaying) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          cc_load_policy: 0,
          fs: 0,
        },
        events: {
          onReady: (event) => {
            const player = event.target;

            const dur = player.getDuration?.();
            if (dur) setDuration(dur);

            intervalRef.current = setInterval(() => {
              if (playerRef.current?.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
              }
              if (playerRef.current?.getDuration) {
                const d = playerRef.current.getDuration();
                if (d && d !== duration) setDuration(d);
              }
            }, 500);
          },

          // ✅ NEW — YouTube pause/play/seek detection added here
          onStateChange: (event) => {
            const state = event.data;

            if (state === window.YT.PlayerState.PAUSED) {
              window.speechSynthesis.cancel();
              setTimeout(() => window.speechSynthesis.cancel(), 30);
            }

            if (
              state === window.YT.PlayerState.SEEKING ||
              state === window.YT.PlayerState.BUFFERING ||
              state === window.YT.PlayerState.CUED
            ) {
              window.speechSynthesis.cancel();
              setTimeout(() => window.speechSynthesis.cancel(), 30);
            }
          }
          // -----------------------------------------------
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
    };
  }, [videoId, isPlaying]);

  return { currentTime, playerRef, duration };
}
