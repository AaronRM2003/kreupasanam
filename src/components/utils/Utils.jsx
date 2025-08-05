import { Dropdown } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaRegCopy,
  FaCheck
} from 'react-icons/fa';

export function ShareModal({
  show,
  onHide,
  shareText,
  title,
  setShareText,
  fbShareUrl,
  waShareUrl,
  telegramShareUrl,
  emailShareUrl,
  styles,
  includeSummary,
  setIncludeSummary,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 5000); // Reset after 2 seconds
      });
    // ❌ no alert or error needed
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
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
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
  return (
    <Dropdown onSelect={onSelect}>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-lang"
        style={{
          backgroundColor: 'white',
          color: '#246bfd',
          borderColor: '#ccc',
          boxShadow: '0 2px 8px rgba(36, 107, 253, 0.15)',
          borderRadius: '30px',
          padding: '0.5rem 1.5rem',
          fontWeight: '600',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(36, 107, 253, 0.3)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(36, 107, 253, 0.15)'}
      >
        {supportedLanguages[lang] || lang}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          padding: '0.25rem 0',
          minWidth: '150px',
        }}
      >
        {Object.entries(supportedLanguages).map(([key, label]) => (
          <Dropdown.Item
            key={key}
            eventKey={key}
            style={{
              borderRadius: '8px',
              transition: 'background-color 0.25s ease, color 0.25s ease',
              fontWeight: '600',
              padding: '1rem 1.5rem',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(36, 107, 253, 0.1)';
              e.currentTarget.style.color = '#246bfd';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'inherit';
            }}
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
      return subtitles[i].text[lang] || subtitles[i].text['en'] || '';
    }
  }
  return '';
}

export function countWordsInSubtitles(subtitles, lang) {
  if (!Array.isArray(subtitles)) return 0;
  return subtitles.reduce((count, entry) => {
    const text = entry?.text?.[lang] || entry?.text?.en || '';
    return count + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

export function addEndTimesToSubtitles(subtitles) {
  return subtitles.map((sub, i) => {
    const startSeconds = timeStringToSeconds(sub.start);
    const nextStartSeconds =
      i < subtitles.length - 1
        ? timeStringToSeconds(subtitles[i + 1].start)
        : startSeconds + 2.5; // or some default duration

    return {
      ...sub,
      startSeconds,
      endSeconds: nextStartSeconds,
    };
  });
}


// Get duration of subtitle at given time
export function getSubtitleDuration(subtitles, currentTime) {
  for (const sub of subtitles) {
    if (currentTime >= sub.startSeconds && currentTime < sub.endSeconds) {
      return sub.endSeconds - sub.startSeconds;
    }
  }
  return 0;
}
