import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../pages/TestimonyPage.module.css';
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
  ttsSupported = false,
}) {
  const [showCloseButton, setShowCloseButton] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(window.innerWidth > window.innerHeight);
  const [showTtsWarning, setShowTtsWarning] = React.useState(false);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (!ttsSupported) setShowTtsWarning(true);
  }, [ttsSupported]);

  function handleWrapperClick() {
    setShowCloseButton(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowCloseButton(false), 3000);
  }

  function handleVideoClick() {
    if (window.innerWidth > window.innerHeight) {
      handleWrapperClick();
    }
    if (!ttsSupported) {
      setShowTtsWarning(true);
    }
  }

  // ✅ Render warning via portal outside wrapper
  const warningDialog = !ttsSupported && showTtsWarning
    ? ReactDOM.createPortal(
        <div className={styles.ttsWarningOverlay}>
          <div className={styles.ttsWarningBox}>
           <h3>Speech Not Supported</h3>
<p>
  Oops! Your browser doesn’t support the speech feature.  
  For the best experience, please try using Chrome, Edge, or Safari.
</p>

            <button
              className={styles.ttsWarningButton}
              onClick={() => setShowTtsWarning(false)}
            >
              OK
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div className={styles.floatingVideoWrapper} onClick={handleWrapperClick}>
        <div
          className={styles.floatingVideo}
          onClick={handleVideoClick}
          style={{ position: 'relative' }}
        >
          <div id="yt-player" style={{ width: '100%' }} ref={playerRef}></div>

          {/* Close button (portrait) */}
          {showCloseButton && !isLandscape && (
            <button className={styles.closeButton} onClick={onClose} aria-label="Close video">
              <svg width="24" height="24" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Close button (landscape) */}
          {isLandscape && (
            <button
              className={styles.closeButtonLandscape}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close video landscape"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Controls (only if TTS supported) */}
          {ttsSupported && (
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
          )}
        </div>

        {currentSubtitle && (
          <div className={styles.subtitleBox}>{currentSubtitle}</div>
        )}
      </div>

      {/* Warning overlay injected outside wrapper */}
      {warningDialog}
    </>
  );
}
