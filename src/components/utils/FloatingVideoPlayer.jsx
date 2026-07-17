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

  userLang = null,
  isVoiceTestActiveRef
}) {
  const [showCloseButton, setShowCloseButton] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(window.innerWidth > window.innerHeight);
  const [showTtsWarning, setShowTtsWarning] = React.useState(false);
  const timeoutRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);
  const [subtitleKey, setSubtitleKey] = React.useState(0);
  const [hideSubtitles, setHideSubtitles] = React.useState(false);
  // Add this near your other React.useState declarations in FloatingVideoPlayer.jsx
const [isVideoReady, setIsVideoReady] = React.useState(false);

React.useEffect(() => {
  const checkPlayerInterval = setInterval(() => {
    if (playerRef?.current?.getPlayerState && playerRef?.current?.getCurrentTime) {
      const state = playerRef.current.getPlayerState();
      const time = playerRef.current.getCurrentTime();
      
      // 1 = PLAYING. We also ensure time > 0.05s so we know frames are actually rendering.
      if (state === 1 && time > 0.05) {
        setIsVideoReady(true);
        clearInterval(checkPlayerInterval);
      }
    }
  }, 100); // Dropped to 100ms for a slightly snappier response

  return () => clearInterval(checkPlayerInterval);
}, [playerRef]);


React.useEffect(() => {
  setSubtitleKey(prev => prev + 1);
}, [currentSubtitle]);


async function copyLink() {
  const text = window.location.href;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers/webviews (like Instagram)
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "-9999px";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    alert("Could not copy link. Please copy it manually.");
  }
}



function enterFullscreen() {
  const el = document.documentElement;

  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

React.useEffect(() => {
  enterFullscreen();

  return () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  };
}, []);
React.useEffect(() => {
  if (!isSpeaking && hideSubtitles) {
    setHideSubtitles(false);
  }
}, [isSpeaking, hideSubtitles]);


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

          <p style={{ fontSize: "13px", opacity: 0.8 }}>
            Tip: If you're using Instagram browser → tap ⋮ and choose <b>Open in Browser</b>.
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              className={styles.ttsWarningButton}
              onClick={copyLink}
            >
              {copied ? "Copied ✅" : "Copy Link"}
            </button>

            <button
              className={styles.ttsWarningButton}
              onClick={() => setShowTtsWarning(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  : null;


  return (
    <>
      <div className={styles.floatingVideoWrapper} onClick={handleWrapperClick}>
          {!isLandscape && (
  <div className={styles.rotateHint}>
    <span className={styles.rotateIcon}>↻</span>
    Rotate for full screen
  </div>
)}
          <div
  className={styles.floatingVideo}
  onClick={handleVideoClick}
  style={{ position: 'relative' }}
>
  
  {/* NEW: Loading Screen Overlay */}
  {!isVideoReady && (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000', // Pitch black to blend nicely
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {/* Reusing your existing spinner class */}
      <div className={styles.spinner}></div>
    </div>
  )}

          <div id="yt-player" style={{ width: '100%' }}></div>

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

</div>

        {/* Controls moved OUTSIDE .floatingVideo to prevent clipping */}
        {ttsSupported && isVideoReady && (
          <SubtitleVoiceControls
            isSpeaking={isSpeaking}
            volume={volume}
            toggleSpeaking={toggleSpeaking}
            handleVolumeChange={handleVolumeChange}
            playerRef={playerRef}
            lang={lang}
            userLang={userLang}
            isVoiceTestActiveRef={isVoiceTestActiveRef}
            setHideSubtitles={setHideSubtitles}
            hideSubtitles={hideSubtitles}
          />
        )}

     <div id="subtitle-wrapper">
  {!hideSubtitles && currentSubtitle && isVideoReady && (
    <div
      key={subtitleKey}
      id="subtitle-dom"
      className={styles.subtitleBox}
    >
      {currentSubtitle}
    </div>
  )}
</div>

      </div>

      {/* Warning overlay injected outside wrapper */}
      {warningDialog}
    </>
  );
}
