import { useEffect, useRef, useState } from 'react';

export function useYouTubePlayer(videoId, isPlaying) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const lastSavedTimeRef = useRef(0); // 👈 NEW: Tracks when we last saved to disk
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getCategory = () => {
    if (typeof window === 'undefined') return 'general';
    const pathSegment = window.location.pathname.split('/')[2];
    return pathSegment ? pathSegment.toLowerCase() : 'general'; 
  };
  
  const PROGRESS_KEY = `yt_watch_progress_${getCategory()}`;

  useEffect(() => {
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
      lastSavedTimeRef.current = 0;
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
        if (data && (!data.duration || (data.progress / data.duration) < 0.95)) {
          startSeconds = Math.floor(data.progress);
        }
      } catch (e) {}

      playerRef.current = new window.YT.Player('yt-player', {
        videoId,
        playerVars: {
          autoplay: 1, controls: 1, modestbranding: 1, cc_load_policy: 0, fs: 0,
          start: startSeconds, 
        },
        events: {
          onReady: (event) => {
            const player = event.target;
            const dur = player.getDuration?.();
            if (dur) setDuration(dur);

            // 🚀 Fast 500ms interval for perfect TTS sync
            intervalRef.current = setInterval(() => {
              if (playerRef.current?.getCurrentTime) {
                const currTime = playerRef.current.getCurrentTime();
                
                // 1. UPDATE STATE FAST (For TTS)
                setCurrentTime(currTime);

                const d = playerRef.current.getDuration?.() || 0;
                if (d && d !== duration) setDuration(d);

                // 2. SAVE TO DISK SLOWLY (Only save every 3 seconds to prevent crashes)
                if (currTime > 3 && d > 0 && Math.abs(currTime - lastSavedTimeRef.current) >= 3) {
                  lastSavedTimeRef.current = currTime; // Update tracker
                  
                  try {
                    const storedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                    storedProgress[videoId] = { progress: currTime, duration: d, lastWatched: Date.now() };
                    localStorage.setItem(PROGRESS_KEY, JSON.stringify(storedProgress));
                    
                    // Dispatch specific event
                    window.dispatchEvent(new CustomEvent('yt_progress_updated', {
                      detail: { videoId: videoId, progress: currTime, duration: d }
                    }));
                  } catch (e) {}
                }
              }
            }, 500); // 👈 Back to 500ms interval
          },
          onStateChange: (event) => {
            if (event.data === 1 && !hasSeeked && startSeconds > 3) {
              hasSeeked = true; 
              event.target.seekTo(startSeconds, true);
            }
          }
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
    };
  }, [videoId, isPlaying]);

  return { currentTime, playerRef, duration };
}