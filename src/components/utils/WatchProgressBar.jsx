import React, { useState, useEffect } from 'react';

export function useWatchProgress(videoId) {
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    if (!videoId) return;

    // 🚀 MATCHES THE PLAYER EXACTLY
    const getCategory = () => {
      if (typeof window === 'undefined') return 'general';
      const path = window.location.href.toLowerCase();
      
       if (path.includes('testimony') || path.includes('testimonies')) return 'testimony';
    if (path.includes('oracles')) return 'oracles';
    if (path.includes('prayers')) return 'prayers';
    if (path.includes('dhyanam')) return 'dhyanam';
    if (path.includes('history')) return 'history';
      
      return 'general';
    };

    const PROGRESS_KEY = `yt_watch_progress_${getCategory()}`;

    const fetchProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const data = stored[videoId];
        if (data && data.duration > 0) {
          const percent = (data.progress / data.duration) * 100;
          setProgressPercent(percent < 95 ? percent : 0);
        } else {
          setProgressPercent(0);
        }
      } catch (e) {
        console.error("Error reading progress", e);
      }
    };

    // Load instantly, then listen for background updates
    fetchProgress();
    window.addEventListener('yt_progress_updated', fetchProgress);

    return () => window.removeEventListener('yt_progress_updated', fetchProgress);
  }, [videoId]);

  return progressPercent;
}

export default function WatchProgressBar({ videoId }) {
  const progressPercent = useWatchProgress(videoId);

  // Hide if there is no progress
  if (!progressPercent || progressPercent <= 0) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '4px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <div 
        style={{
          height: '100%',
          background: '#ff0000',
          width: `${progressPercent}%`,
          transition: 'width 0.3s ease-out'
        }}
      />
    </div>
  );
}