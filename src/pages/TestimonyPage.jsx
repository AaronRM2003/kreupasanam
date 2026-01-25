import { useState, useEffect ,useMemo, useRef} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import { FaShareAlt, FaCompass } from 'react-icons/fa';
import styles from './TestimonyPage.module.css';

import {
  getYouTubeVideoID,
  generateShareText,
  preloadImages,
  LanguageDropdown,
  ShareModal,
  detectBrowserTranslateLang,
} from '../components/utils/Utils';

import { useYouTubePlayer } from '../components/hooks/useYoutubePlayer';
import { useSubtitles } from '../components/hooks/useSubtitles';
import { useSpeechSync } from '../components/hooks/useSpeechSync';
import FloatingVideoPlayer from '../components/utils/FloatingVideoPlayer';
import LangHelpOverlay from '../components/utils/LangHelpOverlay';
import ImageWithBoxes from '../components/utils/ImageWithBoxes';
import TranscriptModal from '../components/utils/TranscriptModel'
import { normalizeToLocale } from '../components/utils/Utils';

export default function TestimonyPage({ lang: initialLang }) {
  const { idSlug } = useParams();  // Changed from id to idSlug
  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  const [testimonies, setTestimonies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [userLang, setUserLang] = useState(null);

  // Parse id and slug from idSlug param
  // Assuming idSlug is from useParams()
  let id = null;
  let slug = '';

  if (idSlug) {
    const separatorIndex = idSlug.indexOf('-');
    if (separatorIndex === -1) {
      id = idSlug;    // no slug part
    } else {
      id = idSlug.substring(0, separatorIndex);
      slug = idSlug.substring(separatorIndex + 1);
    }
  }

  // Find testimony by id
  const testimonysearch = testimonies.find(item => item.id === Number(id));

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
 
  // If testimony exists, verify slug matches
  const testimony = testimonysearch && slug === slugify(testimonysearch.title['en']) ? testimonysearch : null;

  // Fetch testimonies on mount
  useEffect(() => {
    setLoadingData(true);
    setErrorLoading(false);
    fetch('/assets/testimony-content.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setTestimonies(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error loading testimony content:', err);
        setErrorLoading(true);
        setLoadingData(false);
      });
  }, []);

  // Safe destructuring with fallback values to avoid errors before data loads
  const title = (testimony && testimony.title) || {};
  const date = (testimony && testimony.date) || '';
  const content = (testimony && testimony.content) || {};
  const video = (testimony && testimony.video) || '';
  const subtitlesUrl = (testimony && testimony.subtitles) || '';
const overlayData = testimony?.overlay ?? null;
  const navigate = useNavigate();
  // Get videoId and thumbnail URLS
  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  // Preload images (background + thumbnail)
  const cssBackgroundImages = [
    '/assets/angel3.webp',
    '/assets/angel3.webp',
    '/assets/cloud.webp',
  ];

  
  useEffect(() => {
  const warmUp = () => {
    window.speechSynthesis.getVoices();
    document.removeEventListener("click", warmUp);
  };
  document.addEventListener("click", warmUp);
}, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);

  // Show language help overlay for special lang value
  useEffect(() => {
    setShowLangHelp(lang === 'other');
  }, [lang]);

  // Generate share text when dependencies change

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

const shareText = useMemo(() => {
  if (!testimony || typeof window === 'undefined') return '';

  const shareUrl = window.location.href; // current page URL

  return generateShareText(
    testimony,
    lang,
    shareUrl,
    "A powerful testimony of Faith",
    includeSummary,
    video
  );
}, [testimony, lang, includeSummary, video]);



  // YouTube player hook
  const { currentTime, playerRef, duration: totalDuration } = useYouTubePlayer(videoId, showVideo);

  // Subtitles & current subtitle hook
  const { subtitles, currentSubtitle } = useSubtitles(subtitlesUrl, lang, currentTime);
  
  const ttsSupported = typeof window !== 'undefined' && !!window.speechSynthesis;
  const isBrowserTranslateOn = !!userLang;

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

      isBrowserTranslateOn,
      userLang, // ✅ new
    })
  : {};


  // Auto-disable speech when video closes
  useEffect(() => {
  if (!showVideo && isSpeaking) {
    stopSpeaking();
  }
}, [showVideo, isSpeaking, stopSpeaking]);

const lastTimeRef = useRef(0);
const wasPausedRef = useRef(false);
const isAutoSeekingRef = useRef(false);

useEffect(() => {
  if (!playerRef.current || !isSpeaking) return;

  const player = playerRef.current;

  const checkState = () => {
    if (typeof player.getPlayerState !== "function") return;

    const state = player.getPlayerState();

    // YouTube states:
    // 1 = playing, 2 = paused
    if (state === 2 && !wasPausedRef.current) {
      // ⏸ Video paused
      wasPausedRef.current = true;

      // Try to pause speech
      try {
        window.speechSynthesis.pause();
      } catch {
        // ignore
      }
    }

  if (state === 1 && wasPausedRef.current) {
  wasPausedRef.current = false;

  const currentSub = subtitles.find(
    s =>
      currentTime >= s.startSeconds &&
      currentTime < s.endSeconds
  );

  if (currentSub) {
    player.seekTo(currentSub.startSeconds + 0.01, true);
  }

  // 🔁 Restart speech without touching UI
  setTimeout(() => {
    restartSpeaking();
  }, 120);
}

  };

  const interval = setInterval(checkState, 250);

  return () => clearInterval(interval);
}, [playerRef, isSpeaking, subtitles, currentTime]);

useEffect(() => {
  if (!showVideo) return;
  if (!playerRef.current) return;
  if (!isSpeaking) {
    lastTimeRef.current = currentTime;
    return;
  }

  const lastTime = lastTimeRef.current;
  const delta = Math.abs(currentTime - lastTime);

  // Detect manual seek (user drag)
  if (delta > 1.2 && !isAutoSeekingRef.current) {
    // 🔍 Find nearest subtitle start
    const target = subtitles.reduce((closest, sub) => {
      if (sub.startSeconds <= currentTime) {
        if (
          !closest ||
          Math.abs(sub.startSeconds - currentTime) <
            Math.abs(closest.startSeconds - currentTime)
        ) {
          return sub;
        }
      }
      return closest;
    }, null);

    if (target) {
      isAutoSeekingRef.current = true;

      playerRef.current.seekTo(target.startSeconds, true);

      // Allow future seeks after this correction
      setTimeout(() => {
        isAutoSeekingRef.current = false;
      }, 300);
    }
  }

  lastTimeRef.current = currentTime;
}, [currentTime, isSpeaking, subtitles, playerRef, showVideo]);

const handleClick = () => {
    navigate(`/${initialLang || 'en'}/testimonies`);
  };
  // Share URLs
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title['en'])}&body=${encodeURIComponent(shareText)}`;
  // Show loading if assets or testimony not ready
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return; 
    const checkScreen = () => setIsMobileOrTablet(window.innerWidth <= 1368);
    checkScreen(); // initial check

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  
  if (loadingData) {
      return (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Loading content...</p>
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

  // Show 404 if testimony not found after loading
  if (!testimony) {
    return (
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundContainer}>
          <span className={styles.notFoundCode}>404</span>
          <h1 className={styles.notFoundTitle}>Testimony Not Found</h1>
          <p className={styles.notFoundText}>
            Oops! The testimony you're looking for doesn’t exist or may have been removed.
          </p>
          <Link to={`/${lang || 'en'}/testimonies`} className={styles.notFoundButton}>
            Browse More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.testimonyPage}>
     
      {/* Header */}
      {!isMobileOrTablet && ( 
      <div className={styles.testimonyHeader}>
        <div className={styles.testimonyLeft}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            &#8592; <span className={styles.backText}>Back</span>
          </button>
        </div>
     
        <div className={styles.testimonyCenter}>
          <div className={styles.animatedLineLeft}></div>
          <h2 className={styles.testimonyHeading}>Testimony</h2>
          <div className={styles.animatedLineRight}></div>
        </div>

        <div className={styles.testimonyRight}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {!isMobileOrTablet && (
            <LanguageDropdown lang={lang} onSelect={setLang} />
          )}

          </div>
        </div>
      </div>
)}

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
     
        <div className={styles.testimonyInner} >
           
                   {isMobileOrTablet && (  <h2 className={styles.testimonyHeading}>Testimony</h2>)}


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
    {/* Skeleton shimmer while image loads */}
    {!thumbnailLoaded && (
      <div className={styles.thumbnailSkeleton}></div>
    )}
   <div key={lang} style={{ contain: "layout paint" }}>
  <ImageWithBoxes
    src={thumbnailUrl}
    data={overlayData}
    lang={lang}
    onImageLoad={() => setThumbnailLoaded(true)}
  />
</div>

   

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
          <div className={styles.testimonyText} >
            <h1 className={styles.testimonyTitle}>{title[lang] || title['en']}</h1>
            <p className={styles.testimonyDate}>{date}</p>
            <div className={styles.testimonyContent}>{content[lang] || content['en']}</div>
            <button
  className={styles.transcriptButton}
  onClick={() => setShowTranscript(true)}
>
  📜 Read More
</button>

          </div>

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600',marginTop: '1rem' }}>Share this testimony:</p>
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
              title="Testimony"
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
    ttsSupported={ttsSupported} // optional: hide Speak button if false
    onClose={() => setShowVideo(false)}

    userLang={userLang}
  />
)}

    </div>
  );
}
