import React, { useState,useEffect } from 'react';
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
}) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const slug = slugify(title["en"]);

  const handleCardClick = () => {
    navigate(`/${path}/${id}-${slug}`);
  };

  return (
    <div className={styles.testimoniesCard}>
      <div className={styles.testimoniesImageWrapper}>
        {/* Skeleton overlay */}
        {!isLoaded && <div className={styles.skeleton}></div>}

        <ImageWithBoxes
          src={image}
          data={overlayData}
          lang={lang}
          onImageLoad={() => setIsLoaded(true)}
        />

        {duration && (
          <span
            className={`${styles.durationBadge} ${
              isLoaded ? styles.visible : ""
            }`}
          >
            {duration}
          </span>
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

      {/* CTA */}
      <button
        className={styles.testimoniesVideoLink}
        onClick={handleCardClick}
        disabled={!isLoaded}
        style={{ border: "none" }}
      >
        {isLoaded ? "Watch Now" : "Loading..."}
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
              .filter(({ id }) => [16, 22, 8].includes(id))
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

