import React, { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { useYouTubePlayer } from '../hooks/useYoutubePlayer';

export default function YouTubePlayer({ videoId, isPlaying = true }) {
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(100);
  const { currentTime, playerRef } = useYouTubePlayer(videoId, isPlaying);

  const toggleVolumeSlider = () => setShowVolume(prev => !prev);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(newVolume);
    }
  };

  return (
    <div style={{ position: 'relative', padding: 20 }}>
      <div id="yt-player" style={{ width: '100%', height: '360px' }}></div>

      <button
        onClick={toggleVolumeSlider}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '50%',
          padding: 10,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <FaVolumeUp size={20} />
      </button>

      {showVolume && (
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          style={{
            position: 'absolute',
            top: 50,
            right: 10,
            transform: 'rotate(-90deg)',
            height: 100,
            width: 30,
            accentColor: '#007BFF',
          }}
        />
      )}
    </div>
  );
}
