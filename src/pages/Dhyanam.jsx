import { useState, useEffect, useMemo } from 'react';
import styles from '../components/Testimonies.module.css';
import { TestimonyCard } from '../components/Testimonies';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';

const languageMap = {
  en: 'English', hi: 'हिन्दी', zh: '中文', bn: 'বাংলা', ta: 'தமிழ்',
  te: 'తెలుగు', fr: 'Français', es: 'Español', mr: 'मराठी', kn: 'ಕನ್ನಡ',
};

export default function Dhyanam({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [dataList, setDataList] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // 🚀 FIX: We removed continueWatchingItem from state!
  const [allProgressData, setAllProgressData] = useState({});
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => { if (initialLang && initialLang !== lang) setLang(initialLang); }, [initialLang]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true; 
    setLoadingData(true);
    fetch("/assets/dhyanam-content.json") 
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return; 
        
        const preCalculatedData = data.map(item => {
          let finalOverlay = item.overlay || null;
          if (!finalOverlay && item.overlayRef != null) {
            const base = data.find(t => t.id === item.overlayRef);
            if (base && base.overlay) {
              finalOverlay = { ...base.overlay, texts: item.overlayTexts || base.overlay.texts };
            }
          }

          const match = item.video?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
          const extractedVideoId = match ? match[1] : null;
          const thumbnail = extractedVideoId ? `https://img.youtube.com/vi/${extractedVideoId}/sddefault.jpg` : null;

          return { ...item, finalOverlay, extractedVideoId, thumbnail };
        });

        setDataList(preCalculatedData);
        setLoadingData(false);
      })
      .catch(() => { if (isMounted) setLoadingData(false); });

    return () => { isMounted = false; };
  }, []); 

  // 🚀 FIX: This now ONLY fetches storage. No complicated logic to get swallowed.
  useEffect(() => {
    if (dataList.length === 0) return;

    const syncProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('yt_watch_progress_dhyanam') || '{}');
        setAllProgressData(prev => JSON.stringify(prev) === JSON.stringify(stored) ? prev : stored);
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
  }, [dataList]);

  // 🚀 FIX: The Continue block is now DERIVED directly from the red line data!
  const continueWatchingItem = useMemo(() => {
    if (!dataList.length) return null;

    let bestMatch = null;
    let maxTimestamp = 0;

    for (const [vId, data] of Object.entries(allProgressData)) {
      if (data && data.duration > 0) {
        const percent = data.progress / data.duration;
        const timestamp = data.lastWatched || 1; 

        if (percent < 0.95 && timestamp > maxTimestamp) {
          const match = dataList.find(t => t.extractedVideoId === vId);
          if (match) {
            maxTimestamp = timestamp;
            bestMatch = match;
          }
        }
      }
    }
    return bestMatch;
  }, [dataList, allProgressData]); // Recalculates automatically if red lines update

  const filteredData = useMemo(() => {
    return dataList
      .filter(t => t.id !== continueWatchingItem?.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [dataList, continueWatchingItem]);

  const displayedData = filteredData.slice(0, visibleCount);

  return (
    <div>
      <AppBar lang={lang} />
      <img src="/assets/logo.png" alt="Logo" className="floating-logo" />

      <section className={styles.testimoniesSection} style={{ marginBottom: '2rem', backgroundColor: windowWidth <= 768 ? '#fff' : 'transparent' }}>
        <div className={styles.testimoniesSectionContainer}>
          
          <div className={styles.testimoniesHeader}>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <button
                className={styles.backButton} onClick={() => window.history.back()}
                style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', display: windowWidth <= 768 ? 'none' : 'block' }}
              >
                &#8592; <span>Back</span>
              </button>
              <h2 className={styles.testimoniesTitle}>Dhyanam</h2>
            </div>
            
            <p className={styles.testimoniesSubtitle}>Usually Uploaded on Wednesday...</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', margin: '0.5rem' }}>
              <Dropdown onSelect={(e) => e !== lang && setLang(e)}>
                <Dropdown.Toggle variant="outline-secondary">{languageMap[lang] ?? languageMap['en']}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(languageMap).map(([key, label]) => (
                    <Dropdown.Item key={key} eventKey={key}>{label}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {loadingData && (
            <div style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#246bfd', fontSize: '1.2rem', marginBottom: '10rem' }}>
              <div style={{ width: 40, height: 40, border: '4px solid #d3e3ff', borderTop: '4px solid #246bfd', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
              Loading Dhyanam...
              <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
            </div>
          )}

          {!loadingData && (
            <div className={styles.testimoniesGrid}>
              
              {/* 🎬 1. CONTINUE WATCHING BLOCK */}
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

                  <TestimonyCard
                    key={`continue-${continueWatchingItem.id}`} 
                    id={continueWatchingItem.id} 
                    videoId={continueWatchingItem.extractedVideoId} 
                    title={continueWatchingItem.title} 
                    image={continueWatchingItem.thumbnail} 
                    date={continueWatchingItem.date} 
                    lang={lang}
                    path={`${initialLang || 'en'}/dhyanam`} 
                    duration={continueWatchingItem.duration} 
                    overlayData={continueWatchingItem.finalOverlay} 
                    savedProgress={allProgressData[continueWatchingItem.extractedVideoId]} 
                    expectedIn={continueWatchingItem.expectedIn}
                  />
                </div>
              )}

              {/* 🎬 2. STANDARD CARDS */}
              {displayedData.length > 0 ? (
                displayedData.map((t) => (
                  <TestimonyCard
                    key={t.id} 
                    id={t.id} 
                    videoId={t.extractedVideoId} 
                    title={t.title} 
                    image={t.thumbnail} 
                    date={t.date} 
                    lang={lang}
                    path={`${initialLang || 'en'}/dhyanam`} 
                    duration={t.duration} 
                    overlayData={t.finalOverlay} 
                    savedProgress={allProgressData[t.extractedVideoId]} 
                    expectedIn={t.expectedIn}
                  />
                ))
              ) : (
                !continueWatchingItem && (
                  <div className={styles.testimoniesCard} style={{ gridColumn: "1 / -1", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', border: '2px dashed #a2c4ff', borderRadius: '24px', backgroundColor: 'rgba(240,245,255,0.5)', margin: '2rem auto 8rem auto', textAlign: 'center', boxShadow: '0 8px 24px rgba(36,107,253,0.08)' }}>
                    <div style={{ background: '#e6f0ff', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}><HiOutlineEmojiSad size={50} color="#246bfd" /></div>
                    <h3 style={{ color: '#1e2b5a', fontWeight: '700', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Content Found</h3>
                  </div>
                )
              )}

            </div>
          )}

          {/* Pagination */}
          {!loadingData && visibleCount < filteredData.length && (
            <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '3rem' }}>
              <button onClick={() => setVisibleCount(prev => prev + 12)} style={{ padding: '12px 32px', borderRadius: '30px', background: '#246bfd', color: 'white', border: 'none', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(36, 107, 253, 0.25)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                Load More
              </button>
            </div>
          )}

        </div>
      </section>
      <FadeInOnScroll delay={0.4}><Footer lang={lang} /></FadeInOnScroll>
    </div>
  );
}