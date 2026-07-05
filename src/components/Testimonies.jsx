import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Testimonies.module.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import ImageWithBoxes from './utils/ImageWithBoxes'; 

const languageMap = {
  en: 'English', hi: 'हिन्दी', zh: '中文', bn: 'বাংলা', ta: 'தமிழ்',
  te: 'తెలుగు', fr: 'Français', es: 'Español', mr: 'मराठी', kn: 'ಕನ್ನಡ',
};

function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
}

// 🚀 EXPORTED UNIVERSAL BULLETPROOF CARD
export function TestimonyCard({ id, videoId, title, image, date, lang, path, duration, overlayData, expectedIn, savedProgress }) {
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
          onImageLoad={() => { if (!isLoaded) setIsLoaded(true); }} 
        />

        {!isComingSoon && isLoaded && progressPercent > 0 && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', width: '100%', background: 'rgba(255,255,255,0.3)', zIndex: 10 }}>
            <div style={{ height: '100%', background: '#ff0000', width: `${progressPercent}%`, transition: 'width 0.3s ease' }} />
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

// 🚀 EXPORTED WIDGET FOR HOME PAGE
export default function Testimonies({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [testimonies, setTestimonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/assets/testimony-content.json')
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        const preCalculatedData = data.map(testimony => {
          let finalOverlay = testimony.overlay || null;
          if (!finalOverlay && testimony.overlayRef != null) {
            const base = data.find(t => t.id === testimony.overlayRef);
            if (base && base.overlay) {
              finalOverlay = { ...base.overlay, texts: testimony.overlayTexts || base.overlay.texts };
            }
          }
          const match = testimony.video?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
          return {
            ...testimony, finalOverlay,
            extractedVideoId: match ? match[1] : null,
            thumbnail: match ? `https://img.youtube.com/vi/${match[1]}/sddefault.jpg` : null
          };
        });
        setTestimonies(preCalculatedData);
        setIsLoading(false);
      })
      .catch(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const renderSkeletons = () => Array.from({ length: 3 }).map((_, idx) => (
    <div key={idx} className={styles.testimonySkeletonCard}>
      <div className={`${styles.testimonySkeletonImage} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonText} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonSmall} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonButton} ${styles.skeleton}`}></div>
    </div>
  ));

  return (
    <section className={styles.testimoniesSection}>
      <div className={styles.testimoniesSectionContainer}>
        <div className={styles.testimoniesHeader}>
          <h2 className={styles.testimoniesTitle}>More Powerful Testimonies</h2>
          <p className={styles.testimoniesSubtitle}>Stories of healing, grace...</p>
          <Dropdown onSelect={(e) => setLang(e)}>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-lang">
              {languageMap[lang] || lang}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.entries(languageMap).map(([key, label]) => (
                <Dropdown.Item key={key} eventKey={key}>{label}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.testimoniesGrid}>
          {isLoading ? renderSkeletons() : (
            testimonies
              .filter(({ id }) => [62, 22, 44].includes(id))
              .map((t) => (
                <TestimonyCard
                  key={t.id} id={t.id} videoId={t.extractedVideoId} title={t.title}
                  image={t.thumbnail} date={t.date} lang={lang}
                  path={`${initialLang || 'en'}/testimony`} duration={t.duration}
                  overlayData={t.finalOverlay} 
                  savedProgress={null} // Not strictly needed on widget home
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}