import React, { useState, useEffect } from 'react';

export function useWatchProgress(videoId) {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (!videoId) return;
    
    // 1. Initial Load: Read from storage just ONCE when the page opens
    const loadInitialProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('yt_watch_progress') || '{}');
        const data = stored[videoId];
        if (data && data.duration > 0) {
          const percent = (data.progress / data.duration) * 100;
          setProgressPercent(percent < 95 ? percent : 0);
        }
      } catch (e) {
        console.error("Error reading progress", e);
      }
    };
    
    loadInitialProgress();

    // 2. Event Listener: ONLY update if the event specifically matches THIS video
    const handleProgressEvent = (e) => {
      if (e.detail && e.detail.videoId === videoId) {
        const percent = (e.detail.progress / e.detail.duration) * 100;
        setProgressPercent(percent < 95 ? percent : 0);
      }
    };

    window.addEventListener('yt_progress_updated', handleProgressEvent);
    
    return () => window.removeEventListener('yt_progress_updated', handleProgressEvent);
  }, [videoId]);

  return progressPercent;
}

export default function WatchProgressBar({ videoId }) {
  const progressPercent = useWatchProgress(videoId);

  if (!progressPercent || progressPercent <= 0) return null;

  return (
    <div 
      style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '4px', width: '100%',
        background: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden', zIndex: 10
      }}
    >
      <div 
        style={{
          height: '100%', background: '#ff0000',
          width: `${progressPercent}%`,
          transition: 'width 0.3s ease-out' // Smoothly animate the progress
        }}
      />
    </div>
  );
}