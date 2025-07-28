import React, { useState, useEffect } from 'react'; // already imported
import testimonies from '../assets/testimony-content.json';
import styles from '../components/Testimonies.module.css';
import { TestimonyCard } from '../components/Testimonies';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import backstyle from './TestimonyPage.module.css';

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
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear().toString();

  const [lang, setLang] = useState(initialLang || 'en');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // New states to track image loading
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = ['All', '2024', '2023', '2022', '2021', '2020'];

  const getYouTubeThumbnail = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };

  // Filter testimonies by month and year
  const filteredTestimonies = testimonies.filter(({ date }) => {
    const testimonyDate = new Date(date);
    const monthName = testimonyDate.toLocaleString('default', { month: 'long' });
    const year = testimonyDate.getFullYear().toString();

    const monthMatch = selectedMonth === 'All' || monthName === selectedMonth;
    const yearMatch = selectedYear === 'All' || year === selectedYear;

    return monthMatch && yearMatch;
  });

  // Extract all thumbnail URLs of filtered testimonies (skip nulls)
  const thumbnails = filteredTestimonies
    .map(({ video }) => getYouTubeThumbnail(video))
    .filter(Boolean);

  // Image load handler
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Set allImagesLoaded when all filtered images have loaded or if none
   useEffect(() => {
    setImagesLoaded(0);
    setAllImagesLoaded(false);
  }, [selectedMonth, selectedYear, lang]);

  useEffect(() => {
    if (thumbnails.length > 0 && imagesLoaded === thumbnails.length) {
      setAllImagesLoaded(true);
    }
    if (thumbnails.length === 0) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);

  return (
    <section
      className={styles.testimoniesSection}
      style={{
        marginTop: '0',
        backgroundColor: window.innerWidth <= 768 ? '#fff' : 'transparent',
      }}
    >
      <div className={styles.testimoniesSectionContainer} style={{ margin: '0 1rem' }}>
        <div className={styles.testimoniesHeader}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <button
              className={backstyle.backButton}
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

            <h2 className={styles.testimoniesTitle} style={{ margin: 0 }}>
              Testimonies
            </h2>
          </div>

          <p className={styles.testimoniesSubtitle}>Stories of healing, grace...</p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            {/* Language Dropdown */}
            <Dropdown onSelect={(e) => setLang(e)}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-lang">
                {languageMap[lang] ?? languageMap['en']}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.entries(languageMap).map(([key, label]) => (
                  <Dropdown.Item key={key} eventKey={key}>
                    {label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Year Dropdown */}
            <Dropdown onSelect={(e) => setSelectedYear(e)}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-year">
                {selectedYear}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {years.map((year) => (
                  <Dropdown.Item key={year} eventKey={year}>
                    {year}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Month Dropdown */}
            <Dropdown onSelect={(e) => setSelectedMonth(e)}>
              <Dropdown.Toggle variant="outline-secondary" id="dropdown-month">
                {selectedMonth}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {months.map((month) => (
                  <Dropdown.Item key={month} eventKey={month}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Loading screen */}
        {!allImagesLoaded && (
          <div
            style={{
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              color: '#246bfd',
              fontSize: '1.2rem',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                border: '4px solid #d3e3ff',
                borderTop: '4px solid #246bfd',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: 16,
              }}
            />
            Loading Testimonies...
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Render testimonies only after all images loaded */}
        {allImagesLoaded && (
          <div className={styles.testimoniesGrid}>
            {filteredTestimonies.length > 0 ? (
              filteredTestimonies.map(({ id, title, video, date }) => {
                const thumbnail = getYouTubeThumbnail(video);
                return (
                  <TestimonyCard
                    key={id}
                    id={id}
                    title={title}
                    image={thumbnail}
                    date={date}
                    lang={lang}
                    path={`${lang}/testimony`}
                  />
                );
              })
            ) : (
              <div
                className={styles.testimoniesCard}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem 1rem',
                  border: '2px dashed #a2c4ff',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(240, 245, 255, 0.5)',
                  maxWidth: '600px',
                  margin: '3rem auto',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(36, 107, 253, 0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <HiOutlineEmojiSad size={50} color="#246bfd" style={{ marginBottom: '1rem' }} />
                <h3 style={{ color: '#246bfd', fontWeight: '600', fontSize: '1.4rem' }}>
                  No Testimonies Available
                </h3>
                <p style={{ color: '#444', marginTop: '0.5rem', fontSize: '1rem' }}>
                  We couldn’t find any testimonies for <strong>{selectedMonth}</strong>{' '}
                  {selectedYear}.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hidden images to preload and track onLoad */}
        <div style={{ display: 'none' }}>
          {thumbnails.map((src, idx) => (
            <img key={idx} src={src} alt="" onLoad={handleImageLoad} />
          ))}
        </div>
      </div>
    </section>
  );
}
