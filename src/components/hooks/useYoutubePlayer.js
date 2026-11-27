import { useEffect, useRef, useState } from 'react';

export function useYouTubePlayer(videoId, isPlaying) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const lastSavedTimeRef = useRef(0);

  // Interpolation & deduplication refs
  const lastYtTimeRef = useRef(-1);
  const lastSyncPerfRef = useRef(0);
  const lastEmittedTimeRef = useRef(-1);
  const durationRef = useRef(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🚀 BULLETPROOF CATEGORY DETECTION
  const getCategory = () => {
    if (typeof window === 'undefined') return 'general';

    const path = window.location.pathname.toLowerCase();

    if (path.includes('/testimony') || path.includes('/testimonies')) return 'testimony';
    if (path.includes('/oracles')) return 'oracles';
    if (path.includes('/prayers')) return 'prayers';
    if (path.includes('/retreat')) return 'dhyanam';
    if (path.includes('/history')) return 'history';

    return 'general';
  };

  const PROGRESS_KEY = `yt_watch_progress_${getCategory()}`;

  useEffect(() => {
    const resetTracking = () => {
      lastSavedTimeRef.current = 0;
      lastYtTimeRef.current = -1;
      lastSyncPerfRef.current = 0;
      lastEmittedTimeRef.current = -1;
      durationRef.current = 0;
    };

    if (!isPlaying) {
      if (playerRef.current) {
        try {
          if (document.getElementById('yt-player')) playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentTime(0);
      setDuration(0);
      resetTracking();
      return;
    }

    const initPlayer = () => {
      if (!document.getElementById('yt-player')) {
        setTimeout(initPlayer, 100);
        return;
      }

      let startSeconds = 0;
      let hasSeeked = false;

      try {
        const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const data = stored[videoId];
        if (data && (!data.duration || data.progress / data.duration < 0.95)) {
          startSeconds = Math.floor(data.progress);
        }
      } catch (e) {}

      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          cc_load_policy: 0,
          fs: 0,
          start: startSeconds,
        },
        events: {
          onReady: (event) => {
            const player = event.target;
            const dur = player.getDuration?.() || 0;
            if (dur) {
              durationRef.current = dur;
              setDuration(dur);
            }

            // 100ms poll + interpolation between YouTube's ~200ms postMessage updates
            intervalRef.current = setInterval(() => {
              const p = playerRef.current;
              if (!p?.getCurrentTime) return;

              const ytTime = p.getCurrentTime();
              const state = p.getPlayerState?.();
              const now = performance.now();

              let smoothTime = ytTime;

              if (state === 1) {
                if (ytTime !== lastYtTimeRef.current) {
                  // Fresh timestamp from YouTube — reset anchor
                  lastYtTimeRef.current = ytTime;
                  lastSyncPerfRef.current = now;
                } else {
                  // Estimate time elapsed since YouTube's last tick (capped at 0.5s to prevent drift on stalls)
                  const rate = p.getPlaybackRate?.() || 1;
                  const elapsed = Math.min((now - lastSyncPerfRef.current) / 1000, 0.5);
                  smoothTime = lastYtTimeRef.current + elapsed * rate;
                }
              } else {
                // Paused / buffering / ended — stay pinned to exact YouTube time
                lastYtTimeRef.current = ytTime;
                lastSyncPerfRef.current = now;
              }

              // 1. UPDATE STATE ONLY WHEN TIME ACTUALLY CHANGES
              if (smoothTime !== lastEmittedTimeRef.current) {
                lastEmittedTimeRef.current = smoothTime;
                setCurrentTime(smoothTime);
              }

              const d = p.getDuration?.() || 0;
              if (d && d !== durationRef.current) {
                durationRef.current = d;
                setDuration(d);
              }

              // 2. SAVE TO DISK SLOWLY (Every 3 seconds)
              if (ytTime > 3 && d > 0 && Math.abs(ytTime - lastSavedTimeRef.current) >= 3) {
                lastSavedTimeRef.current = ytTime;

                try {
                  const storedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                  storedProgress[videoId] = {
                    progress: ytTime,
                    duration: d,
                    lastWatched: Date.now(),
                  };
                  localStorage.setItem(PROGRESS_KEY, JSON.stringify(storedProgress));

                  window.dispatchEvent(new CustomEvent('yt_progress_updated'));
                } catch (e) {}
              }
            }, 100);
          },
          onStateChange: (event) => {
            if (event.data === 1 && !hasSeeked && startSeconds > 3) {
              hasSeeked = true;
              event.target.seekTo(startSeconds, true);
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const oldCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldCallback) oldCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        try {
          if (document.getElementById('yt-player')) playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      resetTracking();
    };
  }, [videoId, isPlaying]);

  return { currentTime, playerRef, duration };
}