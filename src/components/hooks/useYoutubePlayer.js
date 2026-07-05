import { useEffect, useRef, useState } from 'react';

const PROGRESS_KEY = 'yt_watch_progress';

export function useYouTubePlayer(videoId, isPlaying) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // 1. THIS SHOULD ALWAYS FIRE when you click the thumbnail
    console.warn("🔄 Hook triggered -> isPlaying:", isPlaying, "videoId:", videoId);

    if (!isPlaying) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentTime(0);
      setDuration(0);
      return;
    }

    const initPlayer = () => {
      // 2. CRITICAL FIX: Wait for the div to actually exist in the DOM
      if (!document.getElementById('yt-player')) {
        console.warn("⏳ Waiting for <div id='yt-player'> to render in the DOM...");
        setTimeout(initPlayer, 100);
        return;
      }

      console.warn("🚀 Found 'yt-player', initializing YouTube API...");

      let startSeconds = 0;
      let hasSeeked = false;

      // Fetch saved time
      try {
        const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const data = stored[videoId];

        if (data && (!data.duration || (data.progress / data.duration) < 0.95)) {
          startSeconds = Math.floor(data.progress);
          console.warn(`▶️ RESUMING at ${startSeconds}s for video ${videoId}`);
        }
      } catch (e) {
        console.error("Progress read error", e);
      }

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
            console.warn("✅ YouTube Player ON_READY fired!");
            const player = event.target;
            const dur = player.getDuration?.();
            if (dur) setDuration(dur);

            // Start saving progress immediately
            intervalRef.current = setInterval(() => {
              if (playerRef.current?.getCurrentTime) {
                const currTime = playerRef.current.getCurrentTime();
                setCurrentTime(currTime);

                const d = playerRef.current.getDuration?.() || 0;
                if (d && d !== duration) setDuration(d);

                // Save if watched > 3 seconds
                if (currTime > 3 && d > 0) {
                  try {
                    const storedProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
                    storedProgress[videoId] = {
                      progress: currTime,
                      duration: d,
                      lastWatched: Date.now()
                    };
                    localStorage.setItem(PROGRESS_KEY, JSON.stringify(storedProgress));

                    // Dispatch event for UI
                    window.dispatchEvent(new CustomEvent('yt_progress_updated', {
                      detail: {
                        videoId: videoId,
                        progress: currTime,
                        duration: d
                      }
                    }));

                    console.warn(`💾 SAVED: ${currTime.toFixed(0)}s / ${d.toFixed(0)}s`);
                  } catch (e) {
                    console.error("Save error", e);
                  }
                }
              }
            }, 1000);
          },
          onStateChange: (event) => {
            if (event.data === 1) {
              console.warn("▶️ Video is PLAYING");
              if (!hasSeeked && startSeconds > 3) {
                hasSeeked = true;
                console.warn(`🎯 Forcing seek to ${startSeconds}s`);
                event.target.seekTo(startSeconds, true);
              }
            }
          }
        },
      });
    };

    // 3. Bulletproof Script Loading
    if (!window.YT) {
      console.warn("📥 Injecting YouTube script...");
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else if (window.YT && window.YT.Player) {
      console.warn("♻️ YouTube script already loaded. Reusing.");
      initPlayer();
    } else {
      console.warn("⏳ YouTube script loading, attaching callback.");
      const oldCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldCallback) oldCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoId, isPlaying]);

  return { currentTime, playerRef, duration };
}