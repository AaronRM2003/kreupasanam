import React from 'react';
import styles from '../../pages/TestimonyPage.module.css'; // or reuse existing styles
import SubtitleVoiceControls from './SpeakerButton';

export default function FloatingVideoPlayer({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
  playerRef,
  lang,
  currentSubtitle,
  onClose,
}) {
  const [showCloseButton, setShowCloseButton] = React.useState(false);
  const timeoutRef = React.useRef(null);

  // State to track orientation for showing landscape button
  const [isLandscape, setIsLandscape] = React.useState(window.innerWidth > window.innerHeight);

  React.useEffect(() => {
    function handleResize() {
      setIsLandscape(window.innerWidth > window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleWrapperClick() {
    setShowCloseButton(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowCloseButton(false);
    }, 3000);
  }

  // Handler for video container click - only show close button if landscape
  function handleVideoClick() {
    if (window.innerWidth > window.innerHeight) {
      handleWrapperClick();
    }
  }

  return (
    <div className={styles.floatingVideoWrapper} onClick={handleWrapperClick}>
      <div className={styles.floatingVideo} onClick={handleVideoClick} style={{ position: 'relative' }}>
        <div id="yt-player" style={{ width: '100%' }} ref={playerRef}></div>

        {/* Original close button, visible only when NOT in landscape */}
        {showCloseButton && !isLandscape && (
          <button className={styles.closeButton} onClick={onClose} aria-label="Close video">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* New close button ONLY for landscape */}
        { isLandscape && (
          <button
            className={styles.closeButtonLandscape}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close video landscape"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
          }}
        >
          <SubtitleVoiceControls
            isSpeaking={isSpeaking}
            volume={volume}
            toggleSpeaking={toggleSpeaking}
            handleVolumeChange={handleVolumeChange}
            playerRef={playerRef}
            lang={lang}
          />
        </div>
      </div>

      <div className={styles.subtitleBox}>{currentSubtitle}</div>
    </div>
  );
}
