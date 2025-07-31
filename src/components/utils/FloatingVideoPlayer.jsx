import React from 'react';
import styles from '../../pages/TestimonyPage.module.css' // or reuse existing styles
import SubtitleVoiceControls from './SpeakerButton';

export default function FloatingVideoPlayer({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
  playerRef,
  currentSubtitle,
  onClose,
}) {
  return (
    <div className={styles.floatingVideoWrapper}>
      <div className={styles.floatingVideo}>
        <div id="yt-player" style={{ width: '100%' }} ref={playerRef}></div>

        <button className={styles.closeButton} onClick={onClose}>✕</button>

        <div
          style={{
            position: 'absolute',
            top: "50%",
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
          />
        </div>
      </div>

      <div className={styles.subtitleBox}>
        {currentSubtitle}
      </div>
    </div>
  );
}
