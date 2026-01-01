import { useState, useEffect, useMemo } from 'react';
import styles from '../components/Testimonies.module.css';
import { TestimonyCard } from '../components/Testimonies';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import AppBar from '../components/AppBar';
import { formatDuration } from '../components/utils/Utils';
import Footer from '../components/Footer';
import FadeInOnScroll from '../framer';

const languageMap = {
  en: 'English',
  hi: 'हिन्दी',
  zh: '中文',
  bn: 'বাংলা',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  fr: 'Français',
  es: 'Español',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
};

export default function MonthlyTestimonies({ lang: initialLang }) {
  const today = new Date();
  const currentMonth = today.toLocaleString('en', { month: 'long' });
  const currentYear = today.getFullYear().toString();

  const [lang, setLang] = useState(initialLang || 'en');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [testimonies, setTestimonies] = useState([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Fetch testimonies JSON
useEffect(() => {
  setLoadingTestimonies(true);
  fetch('/assets/testimony-content.json')
    .then(res => res.json())
    .then(async (data) => {
      
      setTestimonies(data);

      // Filter based on initial month/year
      const filtered = testimonies.filter(({ date }) => {
        const d = new Date(date);
        const monthName = d.toLocaleString('en', { month: 'long' });
        const year = d.getFullYear().toString();
        return (selectedMonth === 'All' || monthName === selectedMonth)
            && (selectedYear === 'All' || year === selectedYear);
      });

      // Preload only first 5 thumbnails (or all if less than 5)
      const preloadImage = (src) =>
        new Promise(resolve => {
          if (!src) return resolve();
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = resolve;
        });

      const thumbnails = filtered.map(({ video }) => getYouTubeThumbnail(video));
      const firstBatch = thumbnails.slice(0, 1);

      await Promise.all(firstBatch.map(preloadImage));

      // Show grid after 1 image load (rest will continue in background)
      setLoadingTestimonies(false);

      // Start preloading the remaining images silently
      thumbnails.slice(1).forEach(preloadImage);
    })
    .catch(err => {
      console.error('Failed to load testimonies:', err);
      setLoadingTestimonies(false);
    });
}, [selectedMonth, selectedYear]);




  // Update language if initialLang changes
  useEffect(() => {
    if (initialLang && initialLang !== lang) setLang(initialLang);
  }, [initialLang]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = ['All','2026', '2025', '2024', '2023', '2022', '2021', '2020'];

  const getYouTubeThumbnail = (url) => {
    try {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      return match ? `https://img.youtube.com/vi/${match[1]}/sddefault.jpg` : null;
    } catch {
      return null;
    }
  };

  // Filter testimonies based on month & year
  const filteredTestimonies = useMemo(() => {
    return testimonies.filter(({ date }) => {
      const d = new Date(date);
      const monthName = d.toLocaleString('en', { month: 'long' });
      const year = d.getFullYear().toString();
      const monthMatch = selectedMonth === 'All' || monthName === selectedMonth;
      const yearMatch = selectedYear === 'All' || year === selectedYear;
      return monthMatch && yearMatch;
    });
  }, [testimonies, selectedMonth, selectedYear]);
  function resolveOverlay(testimony, all) {
  // direct overlay
  if (testimony.overlay) return testimony.overlay;

  // reuse overlay
  if (testimony.overlayRef != null) {
    const base = all.find(t => t.id === testimony.overlayRef);
    if (!base?.overlay) return null;

    return {
      ...base.overlay,
      texts: testimony.overlayTexts ?? base.overlay.texts
    };
  }

  return null;
}


  return (
    <div>
      <AppBar lang={lang} />
      <img src="/assets/logo.png" alt="Logo" className="floating-logo" />

      <section
        className={styles.testimoniesSection}
        style={{
          marginTop: '7rem',
          marginBottom: '2rem',
          backgroundColor: windowWidth <= 768 ? '#fff' : 'transparent'
        }}
      >
        <div className={styles.testimoniesSectionContainer}>
          <div className={styles.testimoniesHeader}>
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <button
                className={styles.backButton}
                onClick={() => window.history.back()}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: window.innerWidth <= 768 ? 'none' : 'block',
                }}
              >
                &#8592; <span>Back</span>
              </button>
              <h2 className={styles.testimoniesTitle}>Testimonies</h2>
            </div>

            <p className={styles.testimoniesSubtitle}>Stories of healing, grace...</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', margin: '0.5rem' }}>
              {/* Language Dropdown */}
              <Dropdown onSelect={(e) => e !== lang && setLang(e)}>
                <Dropdown.Toggle variant="outline-secondary">{languageMap[lang] ?? languageMap['en']}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.entries(languageMap).map(([key, label]) => (
                    <Dropdown.Item key={key} eventKey={key}>{label}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {/* Year Dropdown */}
              <Dropdown onSelect={(e) => e !== selectedYear && setSelectedYear(e)}>
                <Dropdown.Toggle variant="outline-secondary">{selectedYear}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {years.map((year) => <Dropdown.Item key={year} eventKey={year}>{year}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>

              {/* Month Dropdown */}
              <Dropdown onSelect={(e) => e !== selectedMonth && setSelectedMonth(e)}>
                <Dropdown.Toggle variant="outline-secondary">{selectedMonth}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {months.map((month) => <Dropdown.Item key={month} eventKey={month}>{month}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {/* Loading spinner */}
          {loadingTestimonies && (
            <div style={{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#246bfd',
              fontSize: '1.2rem',
              marginBottom: '10rem'
            }}>
              <div style={{
                width: 40,
                height: 40,
                border: '4px solid #d3e3ff',
                borderTop: '4px solid #246bfd',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 16
              }} />
              Loading Testimonies...
              <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
            </div>
          )}

          {/* Testimonies grid */}
        {/* Grid wrapper always rendered */}
{!loadingTestimonies && (
  <div className={styles.testimoniesGrid}>
    {filteredTestimonies.length > 0 ? (
      filteredTestimonies.map((t) => (
  <TestimonyCard
    key={t.id}
    id={t.id}
    title={t.title}
    image={getYouTubeThumbnail(t.video)}
    date={t.date}
    lang={lang}
    path={`${initialLang || 'en'}/testimony`}
    duration={t.duration}
    overlayData={resolveOverlay(t, filteredTestimonies)} // 👈 HERE
  />
))
    ) : (
      <div className={styles.testimoniesCard} style={{
        gridColumn: "1 / -1", /* <-- make it span full grid width */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        border: '2px dashed #a2c4ff',
        borderRadius: '20px',
        backgroundColor: 'rgba(240,245,255,0.5)',
        margin: '4rem auto 18rem auto',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(36,107,253,0.08)',
      }}>
        <HiOutlineEmojiSad size={50} color="#246bfd" style={{ marginBottom: '1rem' }} />
        <h3 style={{ color: '#246bfd', fontWeight: '600', fontSize: '1.4rem' }}>No Testimonies Available</h3>
        <p style={{ color: '#444', marginTop: '0.5rem', fontSize: '1rem' }}>
          We couldn’t find any testimonies for <strong>{selectedMonth}</strong> {selectedYear}.
        </p>
      </div>
    )}
  </div>
)}

        </div>
      </section>
      <FadeInOnScroll delay={0.4}>
                    <Footer lang={lang} />
                  </FadeInOnScroll>
    </div>
  );
}
