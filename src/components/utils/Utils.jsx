import { Dropdown } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaRegCopy,
  FaCheck
} from 'react-icons/fa';
import styles from "./share.module.css"

export function ShareModal({
  show,
  onHide,
  shareText, // initial value only
  title,
  fbShareUrl,
  waShareUrl,
  telegramShareUrl,
  emailShareUrl,
  includeSummary,
  setIncludeSummary,
}) {
  const [localText, setLocalText] = useState(shareText); // local copy
  const [copied, setCopied] = useState(false);

  // Reset localText whenever modal opens
  useEffect(() => {
    if (show) setLocalText(shareText);
  }, [show, shareText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localText);
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopied(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} title={title} centered>
      <Modal.Header closeButton>
        <Modal.Title>Share this {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
          Message:
        </label>
        <textarea
          rows={5}
          value={localText}
          onChange={(e) => setLocalText(e.target.value)} // only local
          placeholder="Write something personal before sharing..."
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            resize: 'vertical',
            height: '300px',
          }}
        />

        <div style={{ margin: '1rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={includeSummary}
              onChange={(e) => setIncludeSummary(e.target.checked)}
            />
            Include full testimony in share text
          </label>
        </div>

        <div className={styles.shareOptionsGrid}>
          <a href={fbShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles.shareOption} ${styles.facebook}`}>
            <FaFacebookF />
            Facebook
          </a>

          <a href={waShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles.shareOption} ${styles.whatsapp}`}>
            <FaWhatsapp />
            WhatsApp
          </a>

          <a href={telegramShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles.shareOption} ${styles.telegram}`}>
            <FaTelegramPlane />
            Telegram
          </a>

          <a href={emailShareUrl} target="_blank" rel="noopener noreferrer" className={`${styles.shareOption} ${styles.email}`}>
            <FaEnvelope />
            Gmail
          </a>

         <button
  onClick={handleCopy}
  className={`${styles.shareOption} ${styles.copy}`}
  type="button"
  style={{
    backgroundColor: copied ? 'green' : '',
    color: copied ? 'white' : 'initial',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  }}
>
  <FaRegCopy style={{ marginRight: '8px' }} />
  {copied ? 'Copied!' : 'Copy'}
</button>


        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


// utils/testimonyUtils.js

export const supportedLanguages = {
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
  other:'More',
};

export function LanguageDropdown({ lang, onSelect }) {
const [isMobile, setIsMobile] = useState(window.innerWidth <= 1368);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 1368);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  // Mobile-specific button style
const mobileButtonStyle = {
  width: "auto",
  background: "none",
  color: "#0887f7",
  border: "1px solid #003768ff",
  borderRadius: "20px",
  padding: "0.4rem 1rem",
  fontWeight: "600",
  fontSize: "1rem",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0 2px 5px rgba(0, 55, 104, 0.15)", // soft shadow
};





  // Desktop/default button style
  const desktopButtonStyle = {
    width: 'auto',
    backgroundColor: 'white',
    color: '#246bfd',
    borderColor: '#ccc',
    borderRadius: '30px',
    padding: '0.5rem 1rem',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(36, 107, 253, 0.15)',
  };

  return (
    <Dropdown onSelect={onSelect} className={isMobile ? "mobile-dropdown" : ""} drop={isMobile ? "down" : "auto"}>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-lang"
        style={isMobile ? mobileButtonStyle : desktopButtonStyle}
      >
        {supportedLanguages[lang] || lang}
      </Dropdown.Toggle>

   <Dropdown.Menu
  popperConfig={{ modifiers: [{ name: 'computeStyles', options: { adaptive: false } }] }}
  style={{
    position: 'absolute',
    top: isMobile ? '60px' : undefined,
    left: isMobile ? '0' : undefined,
    width: isMobile ? '100%' : 'auto',
    borderRadius: isMobile ? '10px' : '12px',
    boxShadow: isMobile ? '0 8px 32px rgba(0,0,0,0.15)' : '0 8px 24px rgba(0,0,0,0.1)',
    padding: isMobile ? '1rem 0' : '0.25rem 0',
    margin: 0,
    zIndex: 1050,
  }}
>


        {Object.entries(supportedLanguages).map(([key, label]) => (
          <Dropdown.Item
            key={key}
            eventKey={key}
            style={{
              width: isMobile ? '100%' : 'auto',
              padding: isMobile ? '1.25rem 2rem' : '1rem 1.5rem',
              fontSize: isMobile ? '1.05rem' : '0.95rem',
              fontWeight: '600',
              borderRadius: isMobile ? '0' : '8px',
              cursor: 'pointer',
              transition: 'background-color 0.25s ease',
            }}
            onMouseEnter={e => !isMobile && ((e.currentTarget.style.backgroundColor = 'rgba(36,107,253,0.1)'), (e.currentTarget.style.color = '#246bfd'))}
            onMouseLeave={e => !isMobile && ((e.currentTarget.style.backgroundColor = 'transparent'), (e.currentTarget.style.color = 'inherit'))}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

// Extract YouTube video ID from URL
export function getYouTubeVideoID(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}
export function formatDuration(startTime) {
  // startTime like "27:41" or "1:05:20"
  const parts = startTime.split(":").map(Number);
  
  let totalSeconds = 0;
  if (parts.length === 3) {
    totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    totalSeconds = parts[0] * 60 + parts[1];
  }

  // Add ~5s buffer
  totalSeconds += 5;

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

// Convert time string (HH:MM:SS or MM:SS) to seconds
export function timeStringToSeconds(timeStr) {
  if (typeof timeStr !== 'string') return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

// Generate share text snippet for testimony preview
export function generateShareText(testimony, lang, currentUrl, text, includeFullContent = false,youtubeLink) {
  if (!testimony) return '';
  const { title, date, content, video } = testimony;
  const t = title[lang] || title['en'];
  const d = date || '';
  const cRaw = content[lang] || content['en'] || '';
  const cPreview = cRaw.split(' ').slice(0, 60).join(' ') + (cRaw.split(' ').length > 60 ? '...' : '');

  return `${text}

📖 ${t}
📅 ${d}

"${includeFullContent ? cRaw : cPreview}"

🔗 ${currentUrl}

Kreupasanam Official - ${youtubeLink}`;
}



// Preload an array of image URLs, call callback when all done
export function preloadImages(imageUrls, onAllLoaded) {
  let loadedCount = 0;
  const totalToLoad = imageUrls.length;

  if (totalToLoad === 0) {
    onAllLoaded();
    return;
  }

  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      loadedCount++;
      if (loadedCount === totalToLoad) onAllLoaded();
    };
  });
}

// Get current subtitle text given current time and language
export function getCurrentSubtitle(subtitles, currentTime, lang) {
  if (!subtitles.length) return '';
  for (let i = 0; i < subtitles.length; i++) {
    const startSec = timeStringToSeconds(subtitles[i].start);
    const endSec = i + 1 < subtitles.length
      ? timeStringToSeconds(subtitles[i + 1].start)
      : startSec + 5;
    if (currentTime >= startSec && currentTime < endSec) {
      console.log(' Subtitle:', subtitles[i]);
      return subtitles[i].text[lang] || subtitles[i].text['en'] || '';
    }
  }
  return '';
}


export function addEndTimesToSubtitles(subtitles) {
  return subtitles.map((sub, i) => {
    const startSeconds = timeStringToSeconds(sub.start);
    const nextStartSeconds =
      i < subtitles.length - 1
        ? timeStringToSeconds(subtitles[i + 1].start)
        : startSeconds + 5; // fallback duration for last subtitle

    return {
      ...sub,
      startSeconds,
      endSeconds: nextStartSeconds,
      duration: nextStartSeconds - startSeconds,  // add this line
    };
  });
}




