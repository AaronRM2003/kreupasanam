import { useState, useEffect,useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShareAlt, FaCompass } from 'react-icons/fa';
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

export default function DhyanamPage({ lang: initialLang }) {
  const { idSlug } = useParams();  // changed from id to idSlug

  const [dhyanam, setDhyanam] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);

  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
      navigate(`/${initialLang || 'en'}/dhyanam`);
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

  // Fetch dhyanam content JSON dynamically
  useEffect(() => {
    setLoadingData(true);
    setErrorLoading(false);
    fetch('/assets/dhyanam-content.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setDhyanam(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error loading dhyanam content:', err);
        setErrorLoading(true);
        setLoadingData(false);
      });
  }, []);

  // Find the dhyanam item by id (converted to number)
  const dhyanamItemsearch = dhyanam?.find(item => item.id === Number(id));

  // Function to slugify text (you already have this)
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  }
 
  // If dhyanamItem exists, verify slug matches
  const dhyanamItem = dhyanamItemsearch && slug === slugify(dhyanamItemsearch.title['en']) ? dhyanamItemsearch : null;
  // Provide safe fallback object for hooks even if dhyanamItem not ready
  const safeDhyanamItem = dhyanamItem || {
    title: {},
    date: '',
    content: {},
    video: '',
    subtitles: '',
  };

  const { title, date, content, video, subtitles: subtitlesUrl } = safeDhyanamItem;

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
  if (!safeDhyanamItem || typeof window === 'undefined') return '';

  // Use current page URL instead of /share/ URL
  const shareUrl = window.location.href;

  return generateShareText(
    safeDhyanamItem,
    lang,
    shareUrl,
    "Dhyanam meditation",
    includeSummary,
    video
  );
}, [safeDhyanamItem, lang, includeSummary, video]);

  
  // YouTube player hook - ALWAYS call hooks before conditionals
  const { currentTime, playerRef, duration: totalDuration } = useYouTubePlayer(videoId, showVideo);

  // Subtitles & current subtitle
  const { subtitles, currentSubtitle } = useSubtitles(subtitlesUrl, lang, currentTime);

  // Speech sync & volume control hook
   const ttsSupported = typeof window !== 'undefined' && !!window.speechSynthesis;

  // Speech sync & volume control hook
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
    })
  : {};
  
    // Auto-disable speech when video closes
    useEffect(() => {
    if (!showVideo && isSpeaking) {
      stopSpeaking();
    }
  }, [showVideo, isSpeaking, stopSpeaking]);

  
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
      checkScreen(); // initial check
  
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

  if (errorLoading || !dhyanam) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <span className={styles.notFoundCode}>500</span>
          <h1 className={styles.notFoundTitle}>Error Loading Dhyanam</h1>
          <p className={styles.notFoundText}>
            There was a problem loading the content. Please try again later.
          </p>
          <Link to={`/${lang || 'en'}/dhyanam`} className={styles.notFoundButton}>
            Go Back
          </Link>
        </div>
      </div>
    );
  }

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
 {!isMobileOrTablet && (
            <LanguageDropdown lang={lang} onSelect={setLang} />
          )}          </div>
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
               <img src="/assets/logo.png" alt="Logo" className="floating-logo" />

        <div className={styles.testimonyInner}>
{videoId && !showVideo ? (
  <div
    className={styles.thumbnailWrapper}
    onClick={() => setShowVideo(true)}
    style={{ cursor: 'pointer' }}
  >
    {/* Skeleton shimmer while image loads */}
    {!thumbnailLoaded && (
      <div className={styles.thumbnailSkeleton}></div>
    )}

    <img
      src={thumbnailUrl}
      alt="Video Thumbnail"
      className={`${styles.thumbnailImage} ${thumbnailLoaded ? styles.visible : styles.hidden}`}
      onLoad={() => setThumbnailLoaded(true)}
      onError={() => setThumbnailLoaded(true)} // fallback
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

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600' }}>Share this meditation:</p>
             <div className={styles.actionRow}>
                     
                       <button className={`${styles.actionButton} ${styles.share}`} onClick={() => setShowShareModal(true)}>
                         <FaShareAlt />
                         <span>Share</span>
                       </button>
                     
                       <button className={`${styles.actionButton} ${styles.explore}`} onClick={handleClick}>
                         <FaCompass />
                         <span>Explore More</span>
                       </button>
                     </div>

            <ShareModal
              show={showShareModal}
              onHide={() => setShowShareModal(false)}
              title="Dhyanam"
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
        />
      )}
    </div>
  );
}
