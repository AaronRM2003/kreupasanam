import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Testimonies.module.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';
import ImageWithBoxes from '../components/utils/ImageWithBoxes'; 
import WatchProgressBar from '../components/utils/WatchProgressBar';

const languageMap = {
  en: 'English', hi: 'हिन्दी', zh: '中文', bn: 'বাংলা', ta: 'தமிழ்',
  te: 'తెలుగు', fr: 'Français', es: 'Español', mr: 'मराठी', kn: 'ಕನ್ನಡ',
};

function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

function MonthlyTestimonyCard({ id, videoId, title, image, date, lang, path, duration, overlayData, expectedIn, savedProgress }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const slug = slugify(title["en"]);

  const overlayString = JSON.stringify(overlayData);
  const stableOverlayData = useMemo(() => overlayData, [overlayString]);

  const progressPercent = useMemo(() => {
    if (savedProgress && savedProgress.duration > 0) {
      const pct = (savedProgress.progress / savedProgress.duration) * 100;
      return pct < 95 ? pct : 0;
    }
    return 0;
  }, [savedProgress?.progress, savedProgress?.duration]); 

  const formattedReleaseTime = useMemo(() => {
    if (!expectedIn) return null;
    const [hours, minutes] = expectedIn.split(":").map(Number);
    const now = new Date();
    const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const target = new Date(istNow);
    target.setHours(hours, minutes, 0, 0);
    return target.toLocaleTimeString(lang || "en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  }, [expectedIn, lang]);

  const isComingSoon = !!expectedIn;
  const handleCardClick = () => { if (!isComingSoon) navigate(`/${path}/${id}-${slug}`); };

  const translations = {
    en: { releasing: "Expected at", coming: "Coming Soon", watch: "Watch Now", loading: "Loading..." },
    hi: { releasing: "अपेक्षित समय", coming: "जल्द आ रहा है", watch: "अभी देखें", loading: "लोड हो रहा है..." },
    ta: { releasing: "எதிர்பார்க்கப்படும் நேரம்", coming: "விரைவில்", watch: "இப்போது பார்க்கவும்", loading: "ஏற்றுகிறது..." },
    bn: { releasing: "প্রত্যাশিত সময়", coming: "শীঘ্রই আসছে", watch: "এখন দেখুন", loading: "লোড হচ্ছে..." },
    te: { releasing: "అంచనా సమయం", coming: "త్వరలో వస్తోంది", watch: "ఇప్పుడు చూడండి", loading: "లోడ్ అవుతోంది..." },
    mr: { releasing: "अपेक्षित वेळ", coming: "लवकरच येत आहे", watch: "आता पहा", loading: "लोड होत आहे..." },
    fr: { releasing: "Prévu à", coming: "Bientôt disponible", watch: "Regarder", loading: "Chargement..." },
    es: { releasing: "Programado para", coming: "Próximamente", watch: "Ver ahora", loading: "Cargando..." },
    zh: { releasing: "预计时间", coming: "即将推出", watch: "立即观看", loading: "加载中..." },
    kn: { releasing: "ನಿರೀಕ್ಷಿತ ಸಮಯ", coming: "ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ", watch: "ಈಗ ವೀಕ್ಷಿಸಿ", loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ..." },
  };
  const t = translations[lang] || translations.en;

  return (
    <div className={styles.testimoniesCard}>
      <div className={`${styles.testimoniesImageWrapper} ${isComingSoon ? styles.blurEffect : ""}`}>
        {!isLoaded && <div className={styles.skeleton}></div>}

        <ImageWithBoxes 
          src={image} 
          data={stableOverlayData} 
          lang={lang} 
          onImageLoad={() => {
            if (!isLoaded) setIsLoaded(true);
          }} 
        />

        {!isComingSoon && isLoaded && videoId && (
          <WatchProgressBar videoId={videoId} />
        )}

        {duration && !isComingSoon && (
          <span className={`${styles.durationBadge} ${isLoaded ? styles.visible : ""}`}>{duration}</span>
        )}

        {isComingSoon && isLoaded && (
          <div className={styles.comingSoonOverlay}>
            <div className={styles.overlayText}>{t.releasing}</div>
            <div className={styles.overlayTime}>{formattedReleaseTime}</div>
          </div>
        )}
      </div>

      <h3 className={`${styles.testimoniesCardTitle} ${isLoaded ? styles.visible : ""}`}>{title[lang]}</h3>
      <p className={`${styles.testimoniesDate} ${isLoaded ? styles.visible : ""}`}>{date}</p>
      <button className={`${styles.testimoniesVideoLink} ${isComingSoon ? styles.disabledBtn : ""}`} onClick={handleCardClick} disabled={!isLoaded || isComingSoon}>
        {!isLoaded ? t.loading : isComingSoon ? t.coming : t.watch}
      </button>
    </div>
  );
}

export default function MonthlyTestimonies({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const [testimonies, setTestimonies] = useState([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [continueWatchingItem, setContinueWatchingItem] = useState(null);
  const [allProgressData, setAllProgressData] = useState({});
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => { if (initialLang && initialLang !== lang) setLang(initialLang); }, [initialLang]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setVisibleCount(12); }, [selectedMonth, selectedYear]);

  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['All','2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  useEffect(() => {
    let isMounted = true; 
    setLoadingTestimonies(true);
    
    fetch("/assets/testimony-content.json")
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return; 
        
        const preCalculatedData = data.map(testimony => {
          let finalOverlay = testimony.overlay || null;
          if (!finalOverlay && testimony.overlayRef != null) {
            const base = data.find(t => t.id === testimony.overlayRef);
            if (base && base.overlay) {
              finalOverlay = {
                ...base.overlay,
                texts: testimony.overlayTexts || base.overlay.texts
              };
            }
          }

          const match = testimony.video?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
          const extractedVideoId = match ? match[1] : null;
          const thumbnail = extractedVideoId ? `https://img.youtube.com/vi/${extractedVideoId}/sddefault.jpg` : null;

          return { ...testimony, finalOverlay, extractedVideoId, thumbnail };
        });

        setTestimonies(preCalculatedData);
        setLoadingTestimonies(false);
      })
      .catch(() => {
        if (isMounted) setLoadingTestimonies(false);
      });

    return () => { isMounted = false; };
  }, []); 

  // 🚀 PERFECT SYNC: Event listeners
  useEffect(() => {
    if (testimonies.length === 0) return;

    const syncProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('yt_watch_progress_testimony') || '{}');
        setAllProgressData(prev => JSON.stringify(prev) === JSON.stringify(stored) ? prev : stored);

        let latestVideoId = null;
        let maxTimestamp = 0;

        for (const [vId, data] of Object.entries(stored)) {
          if (data && data.duration > 0) {
            const percent = data.progress / data.duration;
            if (percent < 0.95 && data.lastWatched > maxTimestamp) {
              maxTimestamp = data.lastWatched;
              latestVideoId = vId;
            }
          }
        }

        if (latestVideoId) {
          const match = testimonies.find(t => t.extractedVideoId === latestVideoId);
          setContinueWatchingItem(prev => prev?.id === match?.id ? prev : (match || null));
        } else {
          setContinueWatchingItem(null);
        }
      } catch (e) {}
    };

    syncProgress();
    window.addEventListener('yt_progress_updated', syncProgress);
    window.addEventListener('pageshow', syncProgress);
    window.addEventListener('focus', syncProgress);

    return () => {
      window.removeEventListener('yt_progress_updated', syncProgress);
      window.removeEventListener('pageshow', syncProgress);
      window.removeEventListener('focus', syncProgress);
    };
  }, [testimonies]);

  const filteredTestimonies = useMemo(() => {
    return testimonies
      .filter(t => t.id !== continueWatchingItem?.id)
      .filter(({ date }) => {
        const d = new Date(date);
        const m = d.toLocaleString("en", { month: "long" });
        const y = d.getFullYear().toString();
        return (selectedMonth === "All" || m === selectedMonth) && (selectedYear === "All" || y === selectedYear);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [testimonies, selectedMonth, selectedYear, continueWatchingItem]);

  const displayedTestimonies = filteredTestimonies.slice(0, visibleCount);

  return (
    <div>
      <AppBar lang={lang} />
      <img src="/assets/logo.png" alt="Logo" className="floating-logo" />

      <section
        className={styles.testimoniesSection}
        style={{ marginBottom: '2rem', backgroundColor: windowWidth <= 768 ? '#fff' : 'transparent' }}
      >
        <div className={styles.testimoniesSectionContainer}>
          
          <div className={styles.testimoniesHeader}>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <button
                className={styles.backButton}
                onClick={() => window.history.back()}
                style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  display: window.innerWidth <= 768 ? 'none' : 'block',
                }}
              >
                &#8592; <span>Back</span>
              </button>
              <h2 className={styles.testimoniesTitle}>Testimonies</h2>
            </div>

            <p className={styles.testimoniesSubtitle}>Stories of healing, grace...</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', margin: '0.5rem' }}>
              <Dropdown onSelect={(e) => e !== lang && setLang(e)}>
                <Dropdown.Toggle variant="outline-secondary">{languageMap[lang] ?? languageMap['en']}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(languageMap).map(([key, label]) => (
                    <Dropdown.Item key={key} eventKey={key}>{label}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown onSelect={(e) => e !== selectedYear && setSelectedYear(e)}>
                <Dropdown.Toggle variant="outline-secondary">{selectedYear}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {years.map((year) => <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown onSelect={(e) => e !== selectedMonth && setSelectedMonth(e)}>
                <Dropdown.Toggle variant="outline-secondary">{selectedMonth}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {months.map((month) => <Dropdown.Item key={month} eventKey={month}>{month}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {loadingTestimonies ? (
            <div style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#246bfd', fontSize: '1.2rem', marginBottom: '10rem' }}>
              <div style={{ width: 40, height: 40, border: '4px solid #d3e3ff', borderTop: '4px solid #246bfd', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
              Loading...
              <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
            </div>
          ) : (
            <>
              {/* 🎬 MERGED GRID */}
              <div className={styles.testimoniesGrid}>
                
                {/* 1. Continue Watching Card */}
                {continueWatchingItem && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.05), rgba(0, 179, 255, 0.1))', 
                    borderRadius: '24px', 
                    padding: '12px',
                    border: '2px solid rgba(36, 107, 253, 0.3)', 
                    boxShadow: '0 8px 20px rgba(36, 107, 253, 0.08)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px 10px 4px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#246bfd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span style={{ color: '#1e2b5a', margin: 0, fontWeight: '800', fontSize: '1.05rem', letterSpacing: '-0.3px' }}>
                        Continue Watching
                      </span>
                    </div>

                    <MonthlyTestimonyCard
                      key={`continue-${continueWatchingItem.id}`}
                      id={continueWatchingItem.id}
                      videoId={continueWatchingItem.extractedVideoId} 
                      title={continueWatchingItem.title}
                      image={continueWatchingItem.thumbnail} 
                      date={continueWatchingItem.date}
                      lang={lang}
                      path={`${initialLang || 'en'}/testimony`}
                      duration={continueWatchingItem.duration}
                      overlayData={continueWatchingItem.finalOverlay} 
                      savedProgress={allProgressData[continueWatchingItem.extractedVideoId]} 
                      expectedIn={continueWatchingItem.expectedIn}
                    />
                  </div>
                )}

                {/* 2. Standard Cards */}
                {displayedTestimonies.length > 0 ? (
                  displayedTestimonies.map((t) => (
                    <MonthlyTestimonyCard
                      key={t.id}
                      id={t.id}
                      videoId={t.extractedVideoId}
                      title={t.title}
                      image={t.thumbnail}
                      date={t.date}
                      lang={lang}
                      path={`${initialLang || 'en'}/testimony`}
                      duration={t.duration}
                      overlayData={t.finalOverlay} 
                      savedProgress={allProgressData[t.extractedVideoId]}
                      expectedIn={t.expectedIn}
                    />
                  ))
                ) : (
                  !continueWatchingItem && (
                    <div className={styles.testimoniesCard} style={{
                      gridColumn: "1 / -1", display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', 
                      border: '2px dashed #a2c4ff', borderRadius: '24px',
                      backgroundColor: 'rgba(240,245,255,0.5)', margin: '2rem auto 8rem auto',
                      textAlign: 'center', boxShadow: '0 8px 24px rgba(36,107,253,0.08)',
                    }}>
                      <div style={{ background: '#e6f0ff', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                        <HiOutlineEmojiSad size={50} color="#246bfd" />
                      </div>
                      <h3 style={{ color: '#1e2b5a', fontWeight: '700', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Testimonies Found</h3>
                    </div>
                  )
                )}
              </div>

              {visibleCount < filteredTestimonies.length && (
                <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '3rem' }}>
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    style={{
                      padding: '14px 36px', borderRadius: '30px', background: '#246bfd',
                      color: 'white', border: 'none', fontWeight: '700', fontSize: '1.1rem',
                      cursor: 'pointer', boxShadow: '0 8px 20px rgba(36, 107, 253, 0.25)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <FadeInOnScroll delay={0.4}>
        <Footer lang={lang} />
      </FadeInOnScroll>
    </div>
  );
}