import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Testimonies.module.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDuration } from './utils/Utils';

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

export function TestimonyCard({ id, title, image, date, lang, path, duration }) {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const sluggedTitle = title["en"];
  const slug = slugify(sluggedTitle);

  const handleCardClick = () => {
    navigate(`/${path}/${id}-${slug}`);
  };

  return (
   <div className={styles.testimoniesCard}>
  <div className={styles.testimoniesImageWrapper}>
  {/* Skeleton overlay */}
  {!isLoaded && <div className={styles.skeleton}></div>}

  <img
    src={image}
    alt={title[lang]}
    className={`${styles.testimonyImage} ${isLoaded ? styles.visible : ''}`}
    onLoad={() => setIsLoaded(true)}
    onError={() => setIsLoaded(true)}
  />

  {duration && (
    <span className={`${styles.durationBadge} ${isLoaded ? styles.visible : ''}`}>
      {duration}
    </span>
  )}
</div>


  {/* Always render title/date and fade-in */}
  <h3 className={`${styles.testimoniesCardTitle} ${isLoaded ? styles.visible : ''}`}>
    {title[lang]}
  </h3>
  <p className={`${styles.testimoniesDate} ${isLoaded ? styles.visible : ''}`}>
    {date}
  </p>

  <button
    style={{ border: 'none' }}
    className={styles.testimoniesVideoLink}
    onClick={handleCardClick}
    disabled={!isLoaded} // prevent click before ready
  >
    {isLoaded ? 'Watch Now' : 'Loading...'}
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
        const testimoniesWithDuration = await Promise.all(
          data.map(async (testimony) => {
            if (!testimony.subtitles) return testimony;

            try {
              const res = await fetch(testimony.subtitles);
              const subs = await res.json();

              if (subs.length > 0) {
                const last = subs[subs.length - 1];
                const duration = formatDuration(last.start);
                return { ...testimony, duration };
              }
            } catch (err) {
              console.error(`Failed to load subtitles for ${testimony.id}:`, err);
            }

            return testimony;
          })
        );

        setTestimonies(testimoniesWithDuration);
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
      <div key={idx} className={styles.testimonySkeleton}></div>
    ));
  };

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
              .map(({ id, title, video, date, duration }) => (
                <TestimonyCard
                  key={id}
                  id={id}
                  title={title}
                  image={getYouTubeThumbnail(video)}
                  date={date}
                  lang={lang}
                  duration={duration}
                  path={`${initialLang || 'en'}/testimony`}
                />
              ))
          )}
        </div>
      </div>
    </section>
  );
}

