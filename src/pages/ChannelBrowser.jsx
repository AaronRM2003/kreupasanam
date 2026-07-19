import React, { useState, useEffect, useMemo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ChannelBrowser.module.css';
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';

// Used for displaying the language in the UI Dropdown
const languageMap = {
  en: 'English', hi: 'हिन्दी', bn: 'বাংলা', ta: 'தமிழ்', kn: 'ಕನ್ನಡ',it: 'Italiano',
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

export default function ChannelBrowser({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [filterType, setFilterType] = useState('All'); 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  
  // 🔴 STATE FOR TRACKING THE CURRENTLY PLAYING VIDEO
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => { if (initialLang && initialLang !== lang) setLang(initialLang); }, [initialLang]);

  useEffect(() => {
    fetch('/assets/channel-videos.json')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load channel videos:", err);
        setLoading(false);
      });
  }, []);

  const filteredVideos = useMemo(() => {
    const targetLanguage = languageToEnglishMap[lang] || 'English'; 
    
    return videos.filter(video => {
      const matchesLanguage = video.language === targetLanguage;
      const matchesType = filterType === 'All' || video.type === filterType;
      return matchesLanguage && matchesType;
    }).sort((a, b) => new Date(b.date) - new Date(a.date)); 
  }, [videos, lang, filterType]);

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
                <div key={video.id} className={styles.videoCard}>
                  
                  {/* 🔴 INLINE VIDEO PLAYER LOGIC */}
                  <div 
                    className={styles.thumbnailWrapper} 
                    onClick={() => setPlayingVideoId(video.id)}
                  >
                    {playingVideoId === video.id ? (
                      <iframe 
                        className={styles.videoPlayer}
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`} 
                        title={video.title} 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <>
                        <img src={video.thumbnail} alt={video.title} loading="lazy" />
                        
                        {/* Play Button Overlay */}
                        <div className={styles.playOverlay}>
                          <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        
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
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIconWrapper}>
                  <HiOutlineEmojiSad size={50} color="#246bfd" />
                </div>
                <h3 className={styles.emptyStateTitle}>No Videos Found</h3>
                <p className={styles.emptyStateText}>
                  We couldn't find any {filterType !== 'All' ? filterType.toLowerCase() : ''} videos in {languageMap[lang]}.
                </p>
              </div>
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