import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ChannelBrowser.module.css';
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';

// 🔴 UNIFIED STORAGE KEY - Ensures it perfectly syncs with the Dhyanam page too!
const STORAGE_KEY = 'yt_watch_progress';

// Used for displaying the language in the UI Dropdown
const languageMap = {
  en: 'English', hi: 'हिन्दी', bn: 'বাংলা', ta: 'தமிழ்', kn: 'ಕನ್ನಡ', it: 'Italiano',
};

// Used strictly for filtering the JSON data which is written in English
const languageToEnglishMap = {
  en: 'English', hi: 'Hindi', zh: 'Chinese', bn: 'Bengali', ta: 'Tamil', kn: 'Kannada', it: 'Italian'
};

const parseDuration = (duration) => {
  if (!duration) return "";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  
  let result = "";
  if (hours > 0) result += `${hours}:`;
  result += `${hours > 0 ? minutes.toString().padStart(2, '0') : minutes}:${seconds.toString().padStart(2, '0')}`;
  return result;
};

// THE RED LINE COMPONENT
const ChannelProgressBar = ({ videoId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        if (data[videoId] && data[videoId].duration > 0) {
          const percent = (data[videoId].progress / data[videoId].duration) * 100;
          setProgress(Math.min(Math.max(percent, 0), 100));
        }
      } catch (e) {}
    };

    updateProgress();
    window.addEventListener('yt_progress_updated', updateProgress);
    return () => window.removeEventListener('yt_progress_updated', updateProgress);
  }, [videoId]);

  if (progress === 0) return null;

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5px', backgroundColor: 'rgba(255,255,255,0.3)', zIndex: 15 }}>
      <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#ff0000', transition: 'width 0.5s ease' }}></div>
    </div>
  );
};

// INDIVIDUAL VIDEO CARD TO HANDLE YT API, AUTO-PAUSE, AND LOCALSTORAGE
const VideoCardItem = ({ video, lang, playingVideoId, setPlayingVideoId }) => {
  const isPlaying = playingVideoId === video.id;
  const wrapperRef = useRef(null);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize YouTube API & Track Progress
  useEffect(() => {
    if (!isPlaying) return;

    const initPlayer = () => {
      // Small safety check to ensure the DOM element exists before attaching YT Player
      if (!document.getElementById(`yt-player-${video.id}`)) return;

      playerRef.current = new window.YT.Player(`yt-player-${video.id}`, {
        videoId: video.id,
        playerVars: { autoplay: 1, rel: 0, enablejsapi: 1, playsinline: 1 },
        events: {
          onStateChange: (event) => {
            // PLAYING STATE = 1
            if (event.data === 1) {
              intervalRef.current = setInterval(() => {
                // 🔴 SAFER CHECK: Ensures the API has fully loaded the getCurrentTime function
                if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                  const currentTime = playerRef.current.getCurrentTime();
                  const duration = playerRef.current.getDuration();
                  
                  if (currentTime > 0 && duration > 0) {
                    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                    saved[video.id] = { progress: currentTime, duration, lastWatched: Date.now() };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
                    
                    // Trigger custom event so the red line updates immediately
                    window.dispatchEvent(new Event('yt_progress_updated'));
                  }
                }
              }, 3000); // Save every 3 seconds
            } else {
              clearInterval(intervalRef.current);
            }
          }
        }
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const handleReady = () => initPlayer();
      window.addEventListener('ytApiReady', handleReady);
      return () => window.removeEventListener('ytApiReady', handleReady);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [isPlaying, video.id]);

  // Intersection Observer for Auto-Pause
  useEffect(() => {
    if (!isPlaying) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If it goes out of view, pause it safely
        if (!entry.isIntersecting && playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      },
      { threshold: 0.1 }
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <div className={styles.videoCard} ref={wrapperRef}>
      <div 
        className={styles.thumbnailWrapper} 
        onClick={() => setPlayingVideoId(video.id)}
      >
        {isPlaying ? (
          <div className={styles.videoPlayer}>
            <div id={`yt-player-${video.id}`} style={{ width: '100%', height: '100%' }}></div>
          </div>
        ) : (
          <>
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
            
            <div className={styles.playOverlay}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            
            <ChannelProgressBar videoId={video.id} />
            
            <span className={styles.durationBadge}>{parseDuration(video.duration)}</span>
            <span className={styles.typeBadge}>{video.type}</span>
          </>
        )}
      </div>

      <div className={styles.videoInfo}>
        <a 
          href={`https://www.youtube.com/watch?v=${video.id}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.titleLink}
        >
          <h3 className={styles.videoTitle}>{video.title}</h3>
        </a>
        <p className={styles.videoDate}>
          {new Date(video.date).toLocaleDateString(lang || 'en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
};

export default function ChannelBrowser({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [filterType, setFilterType] = useState('All'); 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [allProgressData, setAllProgressData] = useState({});
  const [continueWatchingId, setContinueWatchingId] = useState(null);

  useEffect(() => { if (initialLang && initialLang !== lang) setLang(initialLang); }, [initialLang]);

  // Load YouTube IFrame API Script Globally
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = () => {
        window.dispatchEvent(new Event('ytApiReady'));
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Fetch JSON
  // Fetch JSON
  useEffect(() => {
    fetch('/assets/channel-videos.json')
      .then(res => res.json())
      .then(data => {
        // 🔴 STRICT DEDUPLICATION: Ensures no two videos can ever share the same ID
        const uniqueVideos = Array.from(new Map(data.map(v => [v.id, v])).values());
        
        setVideos(uniqueVideos);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load channel videos:", err);
        setLoading(false);
      });
  }, []);

  // SYNC ALL PROGRESS
  useEffect(() => {
    if (videos.length === 0) return;

    const syncProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        setAllProgressData(prev => JSON.stringify(prev) === JSON.stringify(stored) ? prev : stored);
      } catch (e) {}
    };

    syncProgress();
    window.addEventListener('yt_progress_updated', syncProgress);
    return () => window.removeEventListener('yt_progress_updated', syncProgress);
  }, [videos]);

  // CALCULATE CONTINUE WATCHING ID (FREEZES WHILE PLAYING)
  useEffect(() => {
    if (playingVideoId) return; // Freezes the block layout so it doesn't jump while watching

    if (!videos.length || Object.keys(allProgressData).length === 0) return;

    let bestMatchId = null;
    let maxTimestamp = 0;

    for (const [vId, data] of Object.entries(allProgressData)) {
      if (!data) continue;

      const duration = data.duration || 1; 
      const progress = data.progress || 0;
      const percent = progress / duration;
      const timestamp = data.lastWatched || 1; 

      if (percent > 0 && percent < 0.95 && timestamp > maxTimestamp) {
        const match = videos.find(t => t.id === vId);
        if (match) {
          maxTimestamp = timestamp;
          bestMatchId = vId;
        }
      }
    }
    setContinueWatchingId(bestMatchId);
  }, [videos, allProgressData, playingVideoId]);

  const continueWatchingItem = useMemo(() => {
    return videos.find(v => v.id === continueWatchingId) || null;
  }, [videos, continueWatchingId]);

  // FILTER VIDEOS
  const filteredVideos = useMemo(() => {
    const targetLanguage = languageToEnglishMap[lang] || 'English'; 
    
    return videos.filter(video => {
      // Don't show the continue watching video in the main grid
      if (continueWatchingItem && video.id === continueWatchingItem.id) return false;

      const matchesLanguage = video.language === targetLanguage;
      const matchesType = filterType === 'All' || video.type === filterType;
      return matchesLanguage && matchesType;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); 
  }, [videos, lang, filterType, continueWatchingItem]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);

  return (
    <div className={styles.pageContainer}>

      {/* --- CHANNEL HEADER BANNER --- */}
      <div className={styles.bannerWrapper}>
        <div className={styles.headerBanner}>
          
          <button className={styles.backButton} onClick={() => window.history.back()}>
            &#8592; Back
          </button>

          <div className={styles.headerLogoWrapper}>
            <img src="/assets/channel.jpeg" alt="KreupasanamInternational" className={styles.headerLogo} />
          </div>
          <h1 className={styles.headerTitle}>
            Kreupasanam International
          </h1>
          <p className={styles.headerSubtitle}>
            Watch testimonies, retreats of youtube channel, Kreupasanam International.
          </p>
        </div>
      </div>

      <div className={styles.contentContainer}>
        
        {/* --- FILTERS --- */}
        <div className={styles.filterSection}>
          <h2 className={styles.filterTitle}>
            Latest Videos
          </h2>

          <div className={styles.filterControls}>
            <Dropdown onSelect={(e) => setFilterType(e)}>
              <Dropdown.Toggle variant="outline-primary" className={styles.dropdownToggle}>
                Type: {filterType}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All">All Videos</Dropdown.Item>
                <Dropdown.Item eventKey="Testimony">Testimony</Dropdown.Item>
                <Dropdown.Item eventKey="Retreat">Retreat</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={(e) => setLang(e)}>
              <Dropdown.Toggle variant="outline-secondary" className={styles.dropdownToggle}>
                {languageMap[lang] || 'Select Language'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.entries(languageMap).map(([key, label]) => (
                  <Dropdown.Item key={key} eventKey={key}>{label}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* --- CONTINUE WATCHING BLOCK --- */}
        {!loading && continueWatchingItem && (
          <div className={styles.continueWatchingContainer}>
            <div className={styles.continueHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#246bfd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Continue Watching
            </div>
            
            <VideoCardItem
              video={continueWatchingItem}
              lang={lang}
              playingVideoId={playingVideoId}
              setPlayingVideoId={setPlayingVideoId}
            />
          </div>
        )}

        {/* --- VIDEO GRID --- */}
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            Loading videos...
          </div>
        ) : (
          <div className={styles.videoGrid}>
            {displayedVideos.length > 0 ? (
              displayedVideos.map((video) => (
                <VideoCardItem
                  key={video.id}
                  video={video}
                  lang={lang}
                  playingVideoId={playingVideoId}
                  setPlayingVideoId={setPlayingVideoId}
                />
              ))
            ) : (
              !continueWatchingItem && (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIconWrapper}>
                    <HiOutlineEmojiSad size={50} color="#246bfd" />
                  </div>
                  <h3 className={styles.emptyStateTitle}>No Videos Found</h3>
                  <p className={styles.emptyStateText}>
                    We couldn't find any {filterType !== 'All' ? filterType.toLowerCase() : ''} videos in {languageMap[lang]}.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* --- LOAD MORE --- */}
        {!loading && visibleCount < filteredVideos.length && (
          <div className={styles.loadMoreContainer}>
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)} 
              className={styles.loadMoreBtn}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <FadeInOnScroll delay={0.2}><Footer lang={lang} /></FadeInOnScroll>
    </div>
  );
}