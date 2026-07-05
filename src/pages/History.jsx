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

export default function History({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const [history, setHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
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
    setLoadingData(true);
    fetch("/assets/history-content.json")
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

        setHistory(preCalculatedData);
        setLoadingData(false);
      })
      .catch(() => { if (isMounted) setLoadingData(false); });

    return () => { isMounted = false; };
  }, []); 

  useEffect(() => {
    if (history.length === 0) return;
    try {
      const stored = JSON.parse(localStorage.getItem('yt_watch_progress_history') || '{}');
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
        const match = history.find(t => t.extractedVideoId === latestVideoId);
        setContinueWatchingItem(prev => prev?.id === match?.id ? prev : (match || null));
      } else {
        setContinueWatchingItem(null);
      }
    } catch (e) {}
  }, [history]);

  const filteredData = useMemo(() => {
    return history
      .filter(t => t.id !== continueWatchingItem?.id)
      .filter(({ date }) => {
        const d = new Date(date);
        const m = d.toLocaleString("en", { month: "long" });
        const y = d.getFullYear().toString();
        return (selectedMonth === "All" || m === selectedMonth) && (selectedYear === "All" || y === selectedYear);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, selectedMonth, selectedYear, continueWatchingItem]);

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
              <h2 className={styles.testimoniesTitle}>History</h2>
            </div>
            
            <p className={styles.testimoniesSubtitle}>About the Apparition, Interviews...</p>

            {/* 🔄 REVERTED TO SIMPLE DROPDOWNS */}
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

          {loadingData && (
            <div style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#246bfd', fontSize: '1.2rem', marginBottom: '10rem' }}>
              <div style={{ width: 40, height: 40, border: '4px solid #d3e3ff', borderTop: '4px solid #246bfd', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
              Loading History...
              <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
            </div>
          )}

          {!loadingData && (
            <>
              {continueWatchingItem && (
                <div style={{ marginBottom: '1rem', padding: windowWidth <= 768 ? '1rem 1rem' : '2.5rem', background: 'linear-gradient(135deg, rgba(36, 107, 253, 0.04), rgba(0, 179, 255, 0.08))', borderRadius: '24px', border: '1px solid rgba(36, 107, 253, 0.15)', boxShadow: '0 10px 30px rgba(36, 107, 253, 0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#246bfd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <h3 style={{ color: '#1e2b5a', margin: 0, fontWeight: '800', fontSize: '1rem', letterSpacing: '-0.3px' }}>Continue Watching</h3>
                  </div>
                  <div className={styles.testimoniesGrid}>
                    <TestimonyCard
                      key={`continue-${continueWatchingItem.id}`} id={continueWatchingItem.id} videoId={continueWatchingItem.extractedVideoId} 
                      title={continueWatchingItem.title} image={continueWatchingItem.thumbnail} date={continueWatchingItem.date} lang={lang}
                      path={`${initialLang || 'en'}/history`} duration={continueWatchingItem.duration} overlayData={continueWatchingItem.finalOverlay} 
                      savedProgress={allProgressData[continueWatchingItem.extractedVideoId]} expectedIn={continueWatchingItem.expectedIn}
                    />
                  </div>
                </div>
              )}

              {displayedData.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #f0f5ff', paddingBottom: '0.8rem' }}>
                  <h3 style={{ color: '#1e2b5a', margin: 0, fontWeight: '800', fontSize: '1.3rem' }}>All History</h3>
                </div>
              )}

              <div className={styles.testimoniesGrid}>
                {displayedData.length > 0 ? (
                  displayedData.map((t) => (
                    <TestimonyCard
                      key={t.id} id={t.id} videoId={t.extractedVideoId} title={t.title} image={t.thumbnail} date={t.date} lang={lang}
                      path={`${initialLang || 'en'}/history`} duration={t.duration} overlayData={t.finalOverlay} 
                      savedProgress={allProgressData[t.extractedVideoId]} expectedIn={t.expectedIn}
                    />
                  ))
                ) : (
                  <div className={styles.testimoniesCard} style={{ gridColumn: "1 / -1", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', border: '2px dashed #a2c4ff', borderRadius: '24px', backgroundColor: 'rgba(240,245,255,0.5)', margin: '2rem auto 8rem auto', textAlign: 'center', boxShadow: '0 8px 24px rgba(36,107,253,0.08)' }}>
                    <div style={{ background: '#e6f0ff', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}><HiOutlineEmojiSad size={50} color="#246bfd" /></div>
                    <h3 style={{ color: '#1e2b5a', fontWeight: '700', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No History Found</h3>
                  </div>
                )}
              </div>

              {visibleCount < filteredData.length && (
                <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '3rem' }}>
                  <button onClick={() => setVisibleCount(prev => prev + 12)} style={{ padding: '14px 36px', borderRadius: '30px', background: '#246bfd', color: '#fff', border: 'none', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 8px 20px rgba(36, 107, 253, 0.25)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <FadeInOnScroll delay={0.4}><Footer lang={lang} /></FadeInOnScroll>
    </div>
  );
}