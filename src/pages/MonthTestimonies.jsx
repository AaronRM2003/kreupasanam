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

const languageMap = {
  en: 'English', hi: 'हिन्दी', zh: '中文', bn: 'বাংলা', ta: 'தமிழ்',
  te: 'తెలుగు', fr: 'Français', es: 'Español', mr: 'मराठी', kn: 'ಕನ್ನಡ',
};

// --- HELPER FUNCTIONS ---
function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

// --- SELF-CONTAINED CARD (100% Loop-Proof) ---
function MonthlyTestimonyCard({ id, videoId, title, image, date, lang, path, duration, overlayData, expectedIn, savedProgress }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const slug = slugify(title["en"]);

  // 🛡️ BULLETPROOF FIX 1: Destroy infinite loops caused by overlay objects
  // By stringifying the object, we guarantee React will NEVER re-render unless the actual text changes.
  const overlayString = JSON.stringify(overlayData);
  const stableOverlayData = useMemo(() => overlayData, [overlayString]);

  // 🛡️ BULLETPROOF FIX 2: Only depend on the exact numbers, never the object reference
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
          data={stableOverlayData} // 👈 Using the safe, stringified-checked data
          lang={lang} 
          onImageLoad={() => {
            if (!isLoaded) setIsLoaded(true); // 👈 Safe state update
          }} 
        />

        {/* 🔴 RED PROGRESS BAR */}
        {!isComingSoon && isLoaded && progressPercent > 0 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', width: '100%', background: 'rgba(255,255,255,0.3)', zIndex: 10 }}>
            <div style={{ height: '100%', background: '#ff0000', width: `${progressPercent}%` }} />
          </div>
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

// --- MAIN PAGE COMPONENT ---
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

  // 🚀 CRITICAL OPTIMIZATION: Process Overlays immediately with an isMounted check
  useEffect(() => {
    let isMounted = true; // 🛡️ BULLETPROOF FIX 3: Prevents state updates after navigating away
    setLoadingTestimonies(true);
    
    fetch("/assets/testimony-content.json")
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return; // Exit if user clicked "Back" during fetch
        
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

  // 🛡️ BULLETPROOF FIX 4: Only update Progress Data if it actually changed
  useEffect(() => {
    if (testimonies.length === 0) return;
    try {
      const stored = JSON.parse(localStorage.getItem('yt_watch_progress') || '{}');
      
      // Strict equivalence check stops re-renders on "Back" navigation
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

          {loadingTestimonies && (
            <div style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#246bfd', fontSize: '1.2rem', marginBottom: '10rem' }}>
              <div style={{ width: 40, height: 40, border: '4px solid #d3e3ff', borderTop: '4px solid #246bfd', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
              Loading...
              <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
            </div>
          )}

          {!loadingTestimonies && (
            <>
              {/* 🎬 Premium Continue Watching Section */}
              {continueWatchingItem && (
                <div style={{
                  marginBottom: '1rem',
                  padding: windowWidth <= 768 ? '1rem 1rem' : '2.5rem',
                  background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.04), rgba(0, 179, 255, 0.08))',
                  borderRadius: '24px',
                  border: '1px solid rgba(36, 107, 253, 0.15)',
                  boxShadow: '0 10px 30px rgba(36, 107, 253, 0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#246bfd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <h3 style={{ color: '#1e2b5a', margin: 0, fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.3px' }}>
                      Continue Watching
                    </h3>
                  </div>
                  <div className={styles.testimoniesGrid}>
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
                </div>
              )}


              {/* 🎬 Main Testimonies Grid */}
              <div className={styles.testimoniesGrid}>
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
                  <div className={styles.testimoniesCard} style={{
                    gridColumn: "1 / -1", display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', 
                    border: '2px dashed #a2c4ff', borderRadius: '20px',
                    backgroundColor: 'rgba(240,245,255,0.5)', margin: '2rem auto 18rem auto',
                    textAlign: 'center', boxShadow: '0 8px 24px rgba(36,107,253,0.08)',
                  }}>
                    <HiOutlineEmojiSad size={50} color="#246bfd" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ color: '#246bfd', fontWeight: '600', fontSize: '1.4rem' }}>No Testimonies Available</h3>
                  </div>
                )}
              </div>

              {/* 🎬 Pagination Button */}
              {visibleCount < filteredTestimonies.length && (
                <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    style={{
                      padding: '12px 32px', borderRadius: '30px', background: '#246bfd',
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