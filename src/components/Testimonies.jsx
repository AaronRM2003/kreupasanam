import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Testimonies.module.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
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

export function TestimonyCard({ id, title, image, date, lang, path, onImageLoad }) {
  const navigate = useNavigate();

  // Pick title based on lang or fallback to English
  const sluggedTitle = title['en'];
  console.log(title);
  // Create slug from translated title
  const slug = slugify(sluggedTitle);

  // On click, navigate to /path/id-slug
  const handleCardClick = () => {
    navigate(`/${path}/${id}-${slug}`);
  };

  return (
    <div className={styles.testimoniesCard}>
      <div className={styles.testimoniesImageWrapper}>
        <img
          src={image}
          alt={title[lang]}
          onLoad={onImageLoad}
          onError={onImageLoad} // fallback on error to avoid hanging spinner
        />
      </div>
      <h3 className={styles.testimoniesCardTitle}>{title[lang]}</h3>
      <p className={styles.testimoniesDate}>{date}</p>
      <button
        style={{ border: 'none' }}
        className={styles.testimoniesVideoLink}
        onClick={handleCardClick}
      >
        Watch Now
      </button>
    </div>
  );
}


export default function Testimonies({lang:initialLang}) {
  const [lang, setLang] = useState(initialLang||'en');
  const [testimonies, setTestimonies] = useState([]);

  useEffect(() => {
    fetch('/assets/testimony-content.json')
      .then((res) => res.json())
      .then((data) => setTestimonies(data))
      .catch((err) => console.error('Failed to load testimonies:', err));
  }, []);

  return (
    <section style={{}} className={styles.testimoniesSection}>
      <div className={styles.testimoniesSectionContainer}>
        <div className={styles.testimoniesHeader}>
          <h2 className={styles.testimoniesTitle}>More Powerful Testimonies</h2>
          <p className={styles.testimoniesSubtitle}>Stories of healing, grace...</p>

          {/* ✅ Language Dropdown */}
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
         {testimonies
  .filter(({ id }) => [16, 17, 8].includes(id))
  .map(({ id, title, video, date }) => (
    <TestimonyCard
      key={id}
      id={id}
      title={title}
      image={getYouTubeThumbnail(video)}
      date={date}
      lang={lang}
      path={`${initialLang || 'en'}/testimony`}
    />
))}

        </div>
      </div>
    </section>
  );
}
