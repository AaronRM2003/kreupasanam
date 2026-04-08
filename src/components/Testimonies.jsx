import React, { useState,useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Testimonies.module.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDuration } from './utils/Utils';
import ImageWithBoxes from './utils/ImageWithBoxes';

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
const getYouTubeThumbnail = (url) => {
    try {
      const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };


function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-');      // Replace multiple - with single -
}

export function TestimonyCard({
  id,
  title,
  image,
  date,
  lang,
  path,
  duration,
  overlayData,
  expectedIn, // IST time string like "2:30"
}) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const slug = slugify(title["en"]);

  /* -----------------------------
     Convert IST time string
  ------------------------------*/
  const formattedReleaseTime = useMemo(() => {
  if (!expectedIn) return null;

  const [hours, minutes] = expectedIn.split(":").map(Number);

  const now = new Date();

  const istNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const target = new Date(istNow);
  target.setHours(hours, minutes, 0, 0);

  return target.toLocaleTimeString(lang || "en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}, [expectedIn, lang]);

  const isComingSoon = !!expectedIn;

  const handleCardClick = () => {
    if (!isComingSoon) {
      navigate(`/${path}/${id}-${slug}`);
    }
  };

  /* -----------------------------
     Translations
  ------------------------------*/
  const translations = {
  en: {
    releasing: "Expected at",
    coming: "Coming Soon",
    watch: "Watch Now",
    loading: "Loading...",
  },
  hi: {
    releasing: "अपेक्षित समय",
    coming: "जल्द आ रहा है",
    watch: "अभी देखें",
    loading: "लोड हो रहा है...",
  },
  ta: {
    releasing: "எதிர்பார்க்கப்படும் நேரம்",
    coming: "விரைவில்",
    watch: "இப்போது பார்க்கவும்",
    loading: "ஏற்றுகிறது...",
  },
  bn: {
    releasing: "প্রত্যাশিত সময়",
    coming: "শীঘ্রই আসছে",
    watch: "এখন দেখুন",
    loading: "লোড হচ্ছে...",
  },
  te: {
    releasing: "అంచనా సమయం",
    coming: "త్వరలో వస్తోంది",
    watch: "ఇప్పుడు చూడండి",
    loading: "లోడ్ అవుతోంది...",
  },
  mr: {
    releasing: "अपेक्षित वेळ",
    coming: "लवकरच येत आहे",
    watch: "आता पहा",
    loading: "लोड होत आहे...",
  },
  fr: {
    releasing: "Prévu à",
    coming: "Bientôt disponible",
    watch: "Regarder",
    loading: "Chargement...",
  },
  es: {
    releasing: "Programado para",
    coming: "Próximamente",
    watch: "Ver ahora",
    loading: "Cargando...",
  },
  zh: {
    releasing: "预计时间",
    coming: "即将推出",
    watch: "立即观看",
    loading: "加载中...",
  },
  kn: {
    releasing: "ನಿರೀಕ್ಷಿತ ಸಮಯ",
    coming: "ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    watch: "ಈಗ ವೀಕ್ಷಿಸಿ",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  },
};

  const t = translations[lang] || translations.en;

  return (
    <div className={styles.testimoniesCard}>
      <div
        className={`${styles.testimoniesImageWrapper} ${
          isComingSoon ? styles.blurEffect : ""
        }`}
      >
        {!isLoaded && <div className={styles.skeleton}></div>}

        <ImageWithBoxes
          src={image}
          data={overlayData}
          lang={lang}
          onImageLoad={() => setIsLoaded(true)}
        />

        {duration && !isComingSoon && (
          <span
            className={`${styles.durationBadge} ${
              isLoaded ? styles.visible : ""
            }`}
          >
            {duration}
          </span>
        )}

        {isComingSoon && isLoaded && (
          <div className={styles.comingSoonOverlay}>
            <div className={styles.overlayText}>
              {t.releasing}
            </div>
           <div className={styles.overlayTime}>
  {formattedReleaseTime}
</div>
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className={`${styles.testimoniesCardTitle} ${
          isLoaded ? styles.visible : ""
        }`}
      >
        {title[lang]}
      </h3>

      {/* Date */}
      <p
        className={`${styles.testimoniesDate} ${
          isLoaded ? styles.visible : ""
        }`}
      >
        {date}
      </p>

      <button
        className={`${styles.testimoniesVideoLink} ${
          isComingSoon ? styles.disabledBtn : ""
        }`}
        onClick={handleCardClick}
        disabled={!isLoaded || isComingSoon}
      >
        {!isLoaded
          ? t.loading
          : isComingSoon
          ? t.coming
          : t.watch}
      </button>
    </div>
  );
}


export default function Testimonies({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || 'en');
  const [testimonies, setTestimonies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/testimony-content.json')
      .then((res) => res.json())
      .then(async (data) => {
        

        setTestimonies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load testimonies:', err);
        setIsLoading(false);
      });
  }, []);

  // Render shimmer skeleton cards
const renderSkeletons = () => {
  return Array.from({ length: 3 }).map((_, idx) => (
    <div key={idx} className={styles.testimonySkeletonCard}>
      <div className={`${styles.testimonySkeletonImage} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonText} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonSmall} ${styles.skeleton}`}></div>
      <div className={`${styles.testimonySkeletonButton} ${styles.skeleton}`}></div>
    </div>
  ));
};
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
                <Dropdown.Item key={key} eventKey={key}>
                  {label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className={styles.testimoniesGrid}>
          {isLoading ? (
            renderSkeletons()
          ) : (
            testimonies
              .filter(({ id }) => [62, 22, 44].includes(id))
              .map((t) => (
  <TestimonyCard
    key={t.id}
    id={t.id}
    title={t.title}
    image={getYouTubeThumbnail(t.video)}
    date={t.date}
    lang={lang}
    path={`${initialLang || 'en'}/testimony`}
    duration={t.duration}
    overlayData={resolveOverlay(t, testimonies)} // 👈 HERE
  />
))
          )}
        </div>
      </div>
    </section>
  );
}

