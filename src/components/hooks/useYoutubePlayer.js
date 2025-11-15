import { useEffect, useRef, useState } from "react";

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

    // Load API only once
    const loadYT = () => {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
        } else {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(tag);

          window.onYouTubeIframeAPIReady = () => resolve();
        }
      });
    };

    let isMounted = true;

    loadYT().then(() => {
      if (!isMounted) return;

      playerRef.current = new window.YT.Player("yt-player", {
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

            // Get duration initially
            const dur = player.getDuration?.();
            if (dur) setDuration(dur);

            // Start time tracking
            intervalRef.current = setInterval(() => {
              if (!playerRef.current) return;

              const t = playerRef.current.getCurrentTime?.();
              if (typeof t === "number") setCurrentTime(t);

              const d = playerRef.current.getDuration?.();
              if (typeof d === "number" && d !== duration) {
                setDuration(d);
              }
            }, 300);
          },

          onStateChange: (event) => {
            const state = event.data;

            if (state === window.YT.PlayerState.PAUSED) {
              console.log("YT PAUSED");
            }

            if (state === window.YT.PlayerState.PLAYING) {
              console.log("YT PLAYING");
            }

            if (state === window.YT.PlayerState.BUFFERING) {
              console.log("YT BUFFERING (seek)");
            }

            if (state === window.YT.PlayerState.CUED) {
              console.log("YT CUED (seek or ended)");
            }
          },
        },
      });
    });

    return () => {
      isMounted = false;

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

  return {
    currentTime,
    duration,
    playerRef,
  };
}
