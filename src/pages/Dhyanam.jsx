import  { useState, useEffect ,useMemo} from 'react';
import styles from '../components/Testimonies.module.css';
import { TestimonyCard } from '../components/Testimonies';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import backstyle from './TestimonyPage.module.css';

export default function Dhyanam({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [dhyanam, setDhyanam] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

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

  // Fetch dhyanam-content.json on mount
  useEffect(() => {
    setLoadingData(true);
    setErrorLoading(false);
    fetch('/assets/dhyanam-content.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setDhyanam(data);
        setLoadingData(false);
      })
      .catch((err) => {
        console.error('Error loading dhyanam content:', err);
        setErrorLoading(true);
        setLoadingData(false);
      });
  }, []);

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

  // Extract all valid thumbnail URLs once dhyanam data is loaded
  const thumbnails = useMemo(() => {
  return dhyanam.map(({ video }) => getYouTubeThumbnail(video)).filter(Boolean);
}, [dhyanam]);

useEffect(() => {
  if (thumbnails.length > 0) {
    setImagesLoaded(0);
    setAllImagesLoaded(false);
  } else {
    setAllImagesLoaded(true);
  }
}, [thumbnails.length]);

const handleImageLoad = () => {
  setImagesLoaded((prev) => prev + 1);
};

useEffect(() => {
  if (imagesLoaded === thumbnails.length && thumbnails.length > 0) {
    setAllImagesLoaded(true);
  }
}, [imagesLoaded, thumbnails.length]);


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

      {/* Add the keyframes for spin animation */}
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
      <span
        style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: '#e74c3c',
          marginBottom: '1rem',
        }}
      >
        500
      </span>
      <h1
        style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#333',
        }}
      >
        Error Loading Dhyanam
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '1rem' }}>
        There was a problem loading the content. Please try again later.
      </p>
      {/* Optional: Add a refresh or go back button here */}
    </div>
  );
}

  return (
    <section
      className={styles.testimoniesSection}
      style={{ marginTop: 0, backgroundColor: window.innerWidth <= 768 ? '#fff' : 'transparent' }}
    >
      <div className={styles.testimoniesSectionContainer} style={{ margin: '0 0.5rem' }}>
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
              Dhyanam
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
                {languageMap[lang] || lang}
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

        {/* Loading Screen */}
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
            ></div>
            Loading Dhyanam...
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
            {dhyanam.length > 0 ? (
             dhyanam
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
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
                    path={`${lang}/dhyanam`}
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
                  borderRadius: 20,
                  backgroundColor: 'rgba(240, 245, 255, 0.5)',
                  maxWidth: 600,
                  margin: '3rem auto',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(36, 107, 253, 0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <HiOutlineEmojiSad size={50} color="#246bfd" style={{ marginBottom: 16 }} />
                <h3 style={{ color: '#246bfd', fontWeight: 600, fontSize: '1.4rem' }}>
                  No Dhyanam Available
                </h3>
              </div>
            )}
          </div>
        )}

        {/* Hidden images to preload */}
        <div style={{ display: 'none' }}>
          {thumbnails.map((src, idx) => (
            <img key={idx} src={src} alt="" onLoad={handleImageLoad} />
          ))}
        </div>
      </div>
    </section>
  );
}
