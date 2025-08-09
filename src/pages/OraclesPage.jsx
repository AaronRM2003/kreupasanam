import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import styles from './TestimonyPage.module.css';

import {
  getYouTubeVideoID,
  generateShareText,
  preloadImages,
  LanguageDropdown,
  ShareModal,
} from '../components/utils/Utils';

import { useYouTubePlayer } from '../components/hooks/useYoutubePlayer';
import { useSubtitles } from '../components/hooks/useSubtitles';
import { useSpeechSync } from '../components/hooks/useSpeechSync';
import FloatingVideoPlayer from '../components/utils/FloatingVideoPlayer';
import LangHelpOverlay from '../components/utils/LangHelpOverlay';

export default function OraclesPage({ lang: initialLang }) {
  const { idSlug } = useParams(); // changed from id to idSlug
  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [shareText, setShareText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [oracles, setOracles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch oracles data on mount
  useEffect(() => {
    fetch('/assets/oracles-content.json')
      .then((res) => res.json())
      .then((data) => {
        setOracles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load oracles:', err);
        setLoading(false);
      });
  }, []);

  // Parse id and slug from idSlug param
  let id;
  let slug;
  if (idSlug) {
    const separatorIndex = idSlug.indexOf('-');
    if (separatorIndex === -1) {
      // No slug provided
      id = idSlug;
      slug = '';
    } else {
      id = idSlug.substring(0, separatorIndex);
      slug = idSlug.substring(separatorIndex + 1);
    }
  }

  // Find current oracle by id (convert id to number if needed)
  const oracle = oracles.find((item) => item.id === Number(id));

  // Provide safe fallback to avoid undefined errors in hooks
  const safeOracle = oracle || {
    title: {},
    date: '',
    content: {},
    video: '',
    subtitles: '',
  };

  const { title, date, content, video, subtitles: subtitlesUrl } = safeOracle;

  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  const cssBackgroundImages = ['/assets/angel3.webp', '/assets/angel3.webp', '/assets/cloud.webp'];

  // Preload all necessary images (background + thumbnail)
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);

  // Show language help overlay for specific language key
  useEffect(() => {
    setShowLangHelp(lang === 'other');
  }, [lang]);

  // Generate share text when dependencies change
  useEffect(() => {
    setShareText(generateShareText(safeOracle, lang, window.location.href, 'A Spiritual Oracle', includeSummary, video));
  }, [lang, safeOracle, includeSummary, video]);

  // Hooks always called unconditionally
  const { currentTime, playerRef, duration: totalDuration } = useYouTubePlayer(videoId, showVideo);
  const { subtitles, currentSubtitle } = useSubtitles(subtitlesUrl, lang, currentTime);
  const { isSpeaking, toggleSpeaking,stopSpeaking, volume, handleVolumeChange } = useSpeechSync({
      playerRef,
      showVideo,
      subtitles,
      currentSubtitle,
      currentTime,
      lang,
    });
  
    // Auto-disable speech when video closes
    useEffect(() => {
    if (!showVideo && isSpeaking) {
      stopSpeaking();
    }
  }, [showVideo, isSpeaking, stopSpeaking]);

  // Share URLs for social media
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title['en'])}&body=${encodeURIComponent(shareText)}`;

  // Show loading while fetching or assets loading
  if (loading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p>Loading oracle content...</p>
      </div>
    );
  }

  if (!oracle) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundCode}>404</h1>
          <h2 className={styles.notFoundTitle}>ORACLE Not Found</h2>
          <p className={styles.notFoundText}>
            The oracle episode you’re looking for doesn’t exist or has been removed.
          </p>
          <Link to={`/${lang || 'en'}/oracles`} className={styles.notFoundButton}>
            Browse Oracles
          </Link>
        </div>
      </div>
    );
  }

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
          <h2 className={styles.testimonyHeading}>Living ORACLES</h2>
          <div className={styles.animatedLineRight}></div>
        </div>

        <div className={styles.testimonyRight}>
          <LanguageDropdown lang={lang} onSelect={setLang} />
        </div>
      </div>

      {showLangHelp && (
        <LangHelpOverlay
          onClose={() => {
            setLang('en');
            setShowLangHelp(false);
          }}
        />
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
              <img src={thumbnailUrl} alt="Video Thumbnail" className={styles.thumbnailImage} />
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
              <img src={thumbnailUrl} alt="Video Thumbnail" className={styles.thumbnailImage} />
            </div>
          )}

          <div className={styles.testimonyText}>
            <h1 className={styles.testimonyTitle}>{title[lang] || title['en']}</h1>
            <p className={styles.testimonyDate}>{date}</p>
            <div className={styles.testimonyContent}>{content[lang] || content['en']}</div>
          </div>

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600' }}>Share this Oracle:</p>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className={styles.shareMainButton} onClick={() => setShowShareModal(true)}>
                🔗 Share
              </button>
            </div>

            <ShareModal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              title="Oracle"
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
          lang={lang}
          currentSubtitle={currentSubtitle}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}
