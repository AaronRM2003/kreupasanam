import { useState, useEffect,useMemo } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShareAlt, FaCompass } from 'react-icons/fa';
import styles from './TestimonyPage.module.css';

import {
  getYouTubeVideoID,
  generateShareText,
  preloadImages,
  LanguageDropdown,
  ShareModal,
  detectBrowserTranslateLang,
  normalizeToLocale,
} from '../components/utils/Utils';

import { useYouTubePlayer } from '../components/hooks/useYoutubePlayer';
import { useSubtitles } from '../components/hooks/useSubtitles';

import { useSpeechSync } from '../components/hooks/useSpeechSync';
import FloatingVideoPlayer from '../components/utils/FloatingVideoPlayer';
import LangHelpOverlay from '../components/utils/LangHelpOverlay';
import TranscriptModal from '../components/utils/TranscriptModel';

export default function PrayersPage({ lang: initialLang }) {
  const { idSlug } = useParams();  // changed from id to idSlug

  const [prayers, setPrayers] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const [showTranscript, setShowTranscript] = useState(false);
    const [userLang, setUserLang] = useState(null);


  const navigate = useNavigate();
  const handleClick = () => {
      navigate(`/${initialLang || 'en'}/prayers`);
    };

  // Parse id and slug from idSlug param
  let id;
  let slug;
  if (idSlug) {
    const separatorIndex = idSlug.indexOf('-');
    if (separatorIndex === -1) {
      id = idSlug;
      slug = '';
    } else {
      id = idSlug.substring(0, separatorIndex);
      slug = idSlug.substring(separatorIndex + 1);
    }
  }

  // Fetch prayers content JSON dynamically
  useEffect(() => {
    setLoadingData(true);
    setErrorLoading(false);
    fetch('/assets/prayers-content.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setPrayers(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error loading prayers content:', err);
        setErrorLoading(true);
        setLoadingData(false);
      });
  }, []);

  // Find the prayers item by id (converted to number)
  const prayersItemsearch = prayers?.find(item => item.id === Number(id));

  // Function to slugify text
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
 
  // If prayersItem exists, verify slug matches
  const prayersItem = prayersItemsearch && slug === slugify(prayersItemsearch.title['en']) ? prayersItemsearch : null;

  // Provide safe fallback object for hooks even if prayersItem not ready
  const safePrayersItem = prayersItem || {
    title: {},
    date: '',
    content: {},
    video: '',
    subtitles: '',
  };

  const { title, date, content, video, subtitles: subtitlesUrl } = safePrayersItem;

  const cssBackgroundImages = ['/assets/angel3.webp', '/assets/angel3.webp', '/assets/cloud.webp'];

  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  // Preload background + thumbnail images
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);

  // Show language help overlay for special lang
  useEffect(() => {
    setShowLangHelp(lang === 'other');
  }, [lang]);

  // Generate share text on dependencies change
  const shareText = useMemo(() => {
  if (!safePrayersItem || typeof window === 'undefined') return '';

  const shareUrl = window.location.href;

  return generateShareText(
    safePrayersItem,
    lang,
    shareUrl,
    "Prayers meditation",
    includeSummary,
    video
  );
}, [safePrayersItem, lang, includeSummary, video]);

  // YouTube player hook - ALWAYS call hooks before conditionals
  const { currentTime, playerRef, duration: totalDuration } = useYouTubePlayer(videoId, showVideo);

  // Subtitles & current subtitle
  const { subtitles, currentSubtitle } = useSubtitles(subtitlesUrl, lang, currentTime);

  // Speech sync & volume control hook
  const ttsSupported = typeof window !== 'undefined' && !!window.speechSynthesis;
  const isBrowserTranslateOn = !!userLang;

  const {
    isSpeaking = false,
    toggleSpeaking = () => {},
    stopSpeaking = () => {},
    volume = 100,
    handleVolumeChange = () => {},
  } = ttsSupported
    ? useSpeechSync({
        playerRef,
        showVideo,
        subtitles,
        currentSubtitle,
        currentTime,
        lang,

        isBrowserTranslateOn,
      userLang, // ✅ new
      })
    : {};
  useEffect(() => {
  const warmUp = () => {
    window.speechSynthesis.getVoices();
    document.removeEventListener("click", warmUp);
  };
  document.addEventListener("click", warmUp);
}, []);

  // Auto-disable speech when video closes
  useEffect(() => {
    if (!showVideo && isSpeaking) {
      stopSpeaking();
    }
  }, [showVideo, isSpeaking, stopSpeaking]);

    useEffect(() => {
  if (typeof window === "undefined") return;

  const update = () => {
    const detected = detectBrowserTranslateLang();
    setUserLang(detected ? normalizeToLocale(detected) : null);
  };

  update();

  // Observe html changes because translate modifies html class/lang
  const obs = new MutationObserver(update);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "lang"],
  });

  return () => obs.disconnect();
}, []);

  // Share URLs
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    shareText
  )}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title['en'])}&body=${encodeURIComponent(
    shareText
  )}`;

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobileOrTablet(window.innerWidth <= 1368);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Conditional renderings AFTER hooks:
  if (loadingData) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p>Loading content...</p>
      </div>
    );
  }

  if (errorLoading || !prayers) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <span className={styles.notFoundCode}>500</span>
          <h1 className={styles.notFoundTitle}>Error Loading Prayers</h1>
          <p className={styles.notFoundText}>
            There was a problem loading the content. Please try again later.
          </p>
          <Link to={`/${lang || 'en'}/prayers`} className={styles.notFoundButton}>
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!prayersItem) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <span className={styles.notFoundCode}>404</span>
          <h1 className={styles.notFoundTitle}>Prayer Not Found</h1>
          <p className={styles.notFoundText}>
            The episode you’re looking for doesn’t exist or may have been removed.
          </p>
          <Link to={`/${lang || 'en'}/prayers`} className={styles.notFoundButton}>
            Browse More
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

      {!isMobileOrTablet && (  <div className={styles.testimonyHeader}>
        <div className={styles.testimonyLeft}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            &#8592; <span className={styles.backText}>Back</span>
          </button>
        </div>

        <div className={styles.testimonyCenter}>
          <div className={styles.animatedLineLeft}></div>
          <h2 className={styles.testimonyHeading}>Prayers</h2>
          <div className={styles.animatedLineRight}></div>
        </div>

        <div className={styles.testimonyRight}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {!isMobileOrTablet && (
              <LanguageDropdown lang={lang} onSelect={setLang} />
            )}
          </div>
        </div>
      </div>)}

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
        <img src="/assets/logo.png" alt="Logo" className="floating-logo" />

        <div className={styles.testimonyInner}>
            {isMobileOrTablet && (  <h2 className={styles.testimonyHeading}>Prayer</h2>)}
             <div
                className={styles.bgBlur}
                style={{
                  backgroundImage: `url(${thumbnailUrl})`
                }}
              />
          {videoId && !showVideo ? (
            <div
              className={styles.thumbnailWrapper}
              onClick={() => setShowVideo(true)}
              style={{ cursor: 'pointer' }}
            >
              {!thumbnailLoaded && (
                <div className={styles.thumbnailSkeleton}></div>
              )}

              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={`${styles.thumbnailImage} ${thumbnailLoaded ? styles.visible : styles.hidden}`}
                onLoad={() => setThumbnailLoaded(true)}
                onError={() => setThumbnailLoaded(true)}
              />

              {thumbnailLoaded && (
                <div className={styles.smallPlayIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff0000" width="60%" height="60%">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.thumbnailWrapper}>
              <img src={thumbnailUrl} alt="Video Thumbnail" className={styles.thumbnailImage} />
            </div>
          )}

          {isMobileOrTablet && (
            <div>
              <LanguageDropdown lang={lang} onSelect={setLang} />
            </div>
          )}

          <div className={styles.testimonyText}>
            <h1 className={styles.testimonyTitle}>{title[lang] || title['en']}</h1>
            <p className={styles.testimonyDate}>{date}</p>
            <div className={styles.testimonyContent}>{content[lang] || content['en']}</div>
             
          </div>
          <button
              className={styles.transcriptButton}
              onClick={() => setShowTranscript(true)}
            >
              📜 Read More
            </button>

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600',marginTop:'1rem' }}>Share this prayer:</p>
            <div className={styles.actionRow}>
              <button className={`${styles.actionButton} ${styles.share}`} onClick={() => setShowShareModal(true)}>
                <FaShareAlt />
                <span>Share</span>
              </button>

              
            </div>
             <div className={styles.footerNavLinks}>
  <NavLink to={`/${initialLang}/home`} className={styles.footerNavLink}>Home</NavLink>
  <NavLink to={`/${initialLang}/about`} className={styles.footerNavLink}>About</NavLink>
  <NavLink to={`/${initialLang}/testimonies`} className={styles.footerNavLink}>Testimonies</NavLink>
  <NavLink to={`/${initialLang}/oracles`} className={styles.footerNavLink}>Oracles</NavLink>
  <NavLink to={`/${initialLang}/dhyanam`} className={styles.footerNavLink}>Dhyanam</NavLink>
  <NavLink to={`/${initialLang}/prayers`} className={styles.footerNavLink}>Prayers</NavLink>
</div>
            <ShareModal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              title="Prayer"
              shareText={shareText}
              fbShareUrl={fbShareUrl}
              waShareUrl={waShareUrl}
              telegramShareUrl={telegramShareUrl}
              emailShareUrl={emailShareUrl}
              includeSummary={includeSummary}
              setIncludeSummary={setIncludeSummary}
            />
          </div>
        </div>
      </div>
  <TranscriptModal
  show={showTranscript}
  onClose={() => setShowTranscript(false)}
  subtitles={subtitles}
  lang={lang}
/>
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
          ttsSupported={ttsSupported}
          onClose={() => setShowVideo(false)}

           userLang={userLang}
        />
      )}
    </div>
  );
}
