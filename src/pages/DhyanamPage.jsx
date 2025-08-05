import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

import dhyanam from '../assets/dhyanam-content.json';
import styles from './TestimonyPage.module.css';

import {
  getYouTubeVideoID,
  generateShareText,
  preloadImages,
  LanguageDropdown,
  ShareModal,
  addEndTimesToSubtitles
} from '../components/utils/Utils';

import { useYouTubePlayer } from '../components/hooks/useYoutubePlayer';
import { useSubtitles } from '../components/hooks/useSubtitles';
import SubtitleVoiceControls from '../components/utils/SpeakerButton';

import { useSpeechSync } from '../components/hooks/useSpeechSync';
import FloatingVideoPlayer from '../components/utils/FloatingVideoPlayer';
import LangHelpOverlay from '../components/utils/LangHelpOverlay';

export default function DhyanamPage({ lang: initialLang }) {
  const { id } = useParams();
  const dhyanamItem = dhyanam.find(item => item.id === parseInt(id));
  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [shareText, setShareText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);

  if (!dhyanamItem) {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundContainer}>
        <span className={styles.notFoundCode}>404</span>
        <h1 className={styles.notFoundTitle}>Dhyanam Not Found</h1>
        <p className={styles.notFoundText}>
          The episode you’re looking for doesn’t exist or may have been removed.
        </p>
        <Link to={`/${lang || 'en'}/dhyanam`} className={styles.notFoundButton}>
          Browse More
        </Link>
      </div>
    </div>
  );
}


  const { title, date, content, video, subtitles: subtitlesUrl } = dhyanamItem;

  const cssBackgroundImages = [
    '/assets/angel3.webp',
    '/assets/angel3.webp',
    '/assets/cloud.webp',
  ];

  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  // Preload background + thumbnail images
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);

  useEffect(() => {
    if (lang === 'other') {
      setShowLangHelp(true);
    } else {
      setShowLangHelp(false);
    }
  }, [lang]);

  // Generate share text
  useEffect(() => {
    setShareText(generateShareText(dhyanamItem, lang, window.location.href, "Dhyanam meditation",includeSummary,video));
  }, [lang, dhyanamItem,includeSummary]);

  // YouTube player hook
  const { currentTime, playerRef, duration: totalDuration } = useYouTubePlayer(videoId, showVideo);

  // Subtitles & current subtitle
  const {
    subtitles,            // With end times
    currentSubtitle       // Filtered for time/lang
  } = useSubtitles(subtitlesUrl, lang, currentTime);

  // Speech sync & volume control hook
  const {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange,
  } = useSpeechSync({ playerRef, showVideo, subtitles, currentSubtitle, currentTime, lang });

  // Auto-disable speaking when video is closed
  useEffect(() => {
    if (!showVideo && isSpeaking) {
      window.speechSynthesis.cancel();
    }
  }, [showVideo, isSpeaking]);

  // Share URLs
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title['en'])}&body=${encodeURIComponent(shareText)}`;


  if (!allAssetsLoaded) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p>Loading visuals...</p>
      </div>
    );
  }

  return (
    <div className={styles.testimonyPage}>
      {/* Header */}
      <div className={styles.testimonyHeader}>
        <div className={styles.testimonyLeft}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            &#8592; <span className={styles.backText}>Back</span>
          </button>
        </div>

        <div className={styles.testimonyCenter}>
          <div className={styles.animatedLineLeft}></div>
          <h2 className={styles.testimonyHeading}>Dhyanam</h2>
          <div className={styles.animatedLineRight}></div>
        </div>

        <div className={styles.testimonyRight}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <LanguageDropdown lang={lang} onSelect={setLang} />
          </div>
        </div>
      </div>

      {showLangHelp && (
        <LangHelpOverlay onClose={() => {
          setLang('en');
          setShowLangHelp(false);
        }} />
      )}

      {/* Background floating images */}
      <div className={`${styles.floatingImage} ${styles.left}`}></div>
      <div className={`${styles.floatingImage} ${styles.right}`}></div>
      <div className={`${styles.floatingCloud} ${styles.bottom}`}></div>

      {/* Main content */}
      <div className={styles.testimonyContainer}>
        <div className={styles.testimonyInner}>
          {videoId && !showVideo ? (
            <div
              className={styles.thumbnailWrapper}
              onClick={() => setShowVideo(true)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={styles.thumbnailImage}
              />
              <div className={styles.smallPlayIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff0000"
                  width="60%"
                  height="60%"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className={styles.thumbnailWrapper}>
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={styles.thumbnailImage}
              />
            </div>
          )}

          <div className={styles.testimonyText}>
            <h1 className={styles.testimonyTitle}>{title[lang] || title['en']}</h1>
            <p className={styles.testimonyDate}>{date}</p>
            <div className={styles.testimonyContent}>{content[lang] || content['en']}</div>
          </div>

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600' }}>Share this meditation:</p>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className={styles.shareMainButton} onClick={() => setShowShareModal(true)}>
                🔗 Share
              </button>
            </div>

            <ShareModal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              title="Dhyanam"
              shareText={shareText}
              setShareText={setShareText}
              fbShareUrl={fbShareUrl}
              waShareUrl={waShareUrl}
              telegramShareUrl={telegramShareUrl}
              emailShareUrl={emailShareUrl}
              styles={styles}
              includeSummary={includeSummary}
                setIncludeSummary={setIncludeSummary}
            />
          </div>
        </div>
      </div>

      {/* Video player and subtitles */}
      {showVideo && (
        <FloatingVideoPlayer
          isSpeaking={isSpeaking}
          volume={volume}
          toggleSpeaking={toggleSpeaking}
          handleVolumeChange={handleVolumeChange}
          playerRef={playerRef}
          currentSubtitle={currentSubtitle}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}
