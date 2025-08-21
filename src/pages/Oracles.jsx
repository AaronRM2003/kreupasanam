import { useState, useEffect, useMemo } from 'react';
import styles from '../components/Testimonies.module.css';
import { TestimonyCard } from '../components/Testimonies';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import AppBar from '../components/AppBar';

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
  const [oracles, setOracles] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Sync language with props
  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  // Fetch oracles data
  useEffect(() => {
    setLoadingData(true);
    setErrorLoading(false);
    fetch('/assets/oracles-content.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch oracles content');
        return res.json();
      })
      .then((data) => {
        setOracles(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error loading oracles content:', err);
        setErrorLoading(true);
        setLoadingData(false);
      });
  }, []);

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

  // Memoized thumbnails
  const thumbnails = useMemo(() => {
    return oracles.map(({ video }) => getYouTubeThumbnail(video)).filter(Boolean);
  }, [oracles]);

  // Reset image load counter only when thumbnails count changes
  useEffect(() => {
    if (thumbnails.length > 0) {
      setImagesLoaded(0);
      setAllImagesLoaded(false);
    } else {
      setAllImagesLoaded(true);
    }
  }, [thumbnails.length]);

  // Count loaded images and mark when all done
  useEffect(() => {
    if (thumbnails.length > 0 && imagesLoaded >= thumbnails.length) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  // Memoized sorted oracles
  const sortedOracles = useMemo(() => {
    return oracles.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [oracles]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loadingData) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            border: '6px solid #f3f3f3',
            borderTop: '4px solid #246bfd',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        />
        <p style={{ fontSize: '1.25rem', color: '#333' }}>Loading content...</p>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (errorLoading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fefefe',
          flexDirection: 'column',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '6rem', fontWeight: 'bold', color: '#e74c3c', marginBottom: '1rem' }}>
          500
        </span>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>
          Error Loading Oracles
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '1rem' }}>
          There was a problem loading the content. Please try again later.
        </p>
      </div>
    );
  }



  return (
    <div >
          <AppBar lang={initialLang || 'en'}/>
           <img src="/assets/logo.png" alt="Logo" className="floating-logo" />
             <section
    className={styles.testimoniesSection}
    style={{ 
      marginTop: '7rem',
      marginBottom:'2rem', 
      backgroundColor: windowWidth <= 768 ? '#fff' : 'transparent' 
    }}
  >
      <div className={styles.testimoniesSectionContainer} style={{ margin: '0 0rem' }}>
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
              marginBottom: '10rem',
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
              marginBottom: '12rem',
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

        {allImagesLoaded && (
          <div className={styles.testimoniesGrid}>
            {sortedOracles.length > 0 ? (
              sortedOracles.map(({ id, title, video, date }) => {
                const thumbnail = getYouTubeThumbnail(video);
                return (
                  <TestimonyCard
                    key={id}
                    id={id}
                    title={title}
                    image={thumbnail || ''}
                    date={date}
                    lang={lang}
                    path={`${initialLang || 'en'}/oracles`}
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
                <h3 style={{ color: '#246bfd', fontWeight: 600, fontSize: '1.4rem' }}>
                  No Oracles Available
                </h3>
              </div>
            )}
          </div>
        )}

        {/* Hidden image preloaders */}
        <div style={{ display: 'none' }}>
          {thumbnails.map((src, idx) => (
            <img key={idx} src={src} alt="" onLoad={handleImageLoad} onError={handleImageLoad} />
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
