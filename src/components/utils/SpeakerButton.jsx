import { useState, useEffect } from 'react';
import { FaWaveSquare, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';

export default function SubtitleVoiceControls({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
}) {
  const [showControls, setShowControls] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [maxInteractionTimeout, setMaxInteractionTimeout] = useState(null);
  const [positionStyle, setPositionStyle] = useState({});
  const [buttonSize, setButtonSize] = useState(40); // Button diameter
  const [controlsVisible, setControlsVisible] = useState(false);

  const updatePosition = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobileDevice) {
      // Desktop
      setPositionStyle({
        right: '20%',
        top: '35%',
        bottom: 'auto',
      });
      setButtonSize(48);
    } else if (isPortrait) {
      // Mobile Portrait
      setPositionStyle({
        right: '5%',
        bottom: '20%',
        top: 'auto',
      });
      setButtonSize(36);
    } else {
      // Mobile Landscape
      setPositionStyle({
        right: '4%',
        top: '40%',
        bottom: 'auto',
      });
      setButtonSize(25);
    }
  };

  useEffect(() => {
    setShowControls(true);
    setControlsVisible(true);

    const timer = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const clearAllTimeouts = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    if (maxInteractionTimeout) clearTimeout(maxInteractionTimeout);
  };

  const toggleControls = () => {
    clearAllTimeouts();
    setShowControls(true);
    setControlsVisible(true);

    const timeout = setTimeout(() => {
      if (!isInteracting) {
        setControlsVisible(false);
        setTimeout(() => setShowControls(false), 300);
      }
    }, 3000);
    setHideTimeout(timeout);
  };

  const startInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(true);
    setControlsVisible(true);

    const maxTimeout = setTimeout(() => {
      setIsInteracting(false);
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 6000);
    setMaxInteractionTimeout(maxTimeout);
  };

  const endInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(false);

    const timeout = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3000);
    setHideTimeout(timeout);
  };

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...positionStyle,
      }}
    >
      {/* Floating Button */}
      {!showControls && (
        <button
          onClick={toggleControls}
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            background: '#222',
            borderRadius: '50%',
            border: 'none',
            color: '#00f2fe',
            boxShadow: '0 0 10px #00f2feaa',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
          aria-label="Toggle voice controls"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px #38f9d7cc';
            e.currentTarget.style.color = '#38f9d7';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 10px #00f2feaa';
            e.currentTarget.style.color = '#00f2fe';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isSpeaking ? (
            <FaVolumeUp size={Math.floor(buttonSize * 0.5)} />
          ) : (
            <FaVolumeDown size={Math.floor(buttonSize * 0.5)} />
          )}
        </button>
      )}

      {/* Controls Panel */}
      {showControls && (
        <div
          onMouseEnter={startInteraction}
          onMouseLeave={endInteraction}
          onTouchStart={startInteraction}
          onTouchEnd={endInteraction}
          style={{
            marginTop: '10px',
            background: 'rgba(20,20,20,0.95)',
            padding: '14px 18px',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backdropFilter: 'blur(6px)',
            opacity: controlsVisible ? 1 : 0,
            visibility: controlsVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            boxShadow: '0 0 15px #00f2fe88',
          }}
        >
          {/* Toggle Subtitles Switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '18px',
              cursor: 'pointer',
              userSelect: 'none',
              color: '#fff',
              fontSize: '0.95rem',
            }}
            onClick={toggleSpeaking}
          >
            <span>Read Subtitles</span>

            <div
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '24px',
                backgroundColor: isSpeaking ? '#007BFF' : '#ccc',
                position: 'relative',
                transition: 'background-color 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  left: isSpeaking ? '22px' : '2px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
            </div>
          </div>

          {/* Volume Control */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: '#fff',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaVolumeUp />
              <span>Volume: {volume}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              onMouseDown={() => setIsInteracting(true)}
              onMouseUp={endInteraction}
              onTouchStart={() => setIsInteracting(true)}
              onTouchEnd={endInteraction}
              style={{
                width: '140px',
                accentColor: '#007BFF',
                borderRadius: '4px',
                height: '16px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
