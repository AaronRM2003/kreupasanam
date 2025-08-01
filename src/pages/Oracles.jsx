import React, { useState, useEffect } from 'react';
import oracles from '../assets/oracles-content.json';
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

export default function Oracles({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);

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

  // Get all thumbnails first
  const thumbnails = oracles.map(({ video }) => getYouTubeThumbnail(video)).filter(Boolean);

  // Increment loaded count on each image load
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // When all images are loaded, mark complete
  useEffect(() => {
    if (thumbnails.length > 0 && imagesLoaded === thumbnails.length) {
      setAllImagesLoaded(true);
    }
    // Handle case no images at all
    if (thumbnails.length === 0) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);

  return (
    <section
      className={styles.testimoniesSection}
      style={{ marginTop: '0', backgroundColor: window.innerWidth <= 768 ? '#fff' : 'transparent' }}
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
              Oracles
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
          </div>
        </div>

        {/* Loading screen */}
        {!allImagesLoaded && (
          <div
            style={{
              height: '300px',
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
                width: '40px',
                height: '40px',
                border: '4px solid #d3e3ff',
                borderTop: '4px solid #246bfd',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem',
              }}
            ></div>
            Loading Oracles...
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Show content only after images loaded */}
        {allImagesLoaded && (
          <div className={styles.testimoniesGrid}>
            {oracles.length > 0 ? (
              oracles
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(({ id, title, video, date }) => {
                  const thumbnail = getYouTubeThumbnail(video);
                  return (
                    <TestimonyCard
                      key={id}
                      id={id}
                      title={title}
                      image={thumbnail || ''}
                      date={date}
                      lang={lang}
                      path={`${lang}/oracles`}
                      onImageLoad={handleImageLoad}
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
                <h3 style={{ color: '#246bfd', fontWeight: '600', fontSize: '1.4rem' }}>No Oracles Available</h3>
              </div>
            )}
          </div>
        )}

        {/* Hidden images for preloading */}
        <div style={{ display: 'none' }}>
          {thumbnails.map((src, idx) => (
            <img key={idx} src={src} alt="" onLoad={handleImageLoad} />
          ))}
        </div>
      </div>
    </section>
  );
}
