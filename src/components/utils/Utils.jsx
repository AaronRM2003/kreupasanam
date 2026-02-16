import { Dropdown } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import { useState,useEffect, useRef } from 'react';
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaRegCopy,
  FaInstagram,
} from 'react-icons/fa';
import styles from "./share.module.css"

export const ORIGINAL_WIDTH = 1280;
export const ORIGINAL_HEIGHT = 720;


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
   overlayData,
  imageSrc,
  lang,
}) {
  const [localText, setLocalText] = useState(shareText); // local copy
  const [copied, setCopied] = useState(false);
  const hasOverlay = Boolean(overlayData?.boxes?.length);


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
            Include the whole text
          </label>
        </div>
        {hasOverlay && (
  <button
    className={`${styles.shareOption} ${styles.download}`}
    type="button"
    onClick={() => {
      exportImageWithBoxes({
        src: imageSrc,
        boxes: overlayData.boxes,
        texts: overlayData.texts,
        lang,
      });
    }}
  >
   Download Image
  </button>
)}


        <div className={styles.shareOptionsGrid}>
          <a
  href={fbShareUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={`${styles.shareOption} ${styles.facebook}`}
  onClick={async (e) => {
    try {
      await navigator.clipboard.writeText(localText); // copy text first
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }}
>
  <FaFacebookF />
  Facebook
</a>

<a
  href="https://www.instagram.com/"
  target="_blank"
  rel="noopener noreferrer"
  className={`${styles.shareOption} ${styles.instagram}`}
  onClick={async (e) => {
    try {
      await navigator.clipboard.writeText(localText); // copy text first
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
    }

    // Optional: If Web Share API is available, use it
    if (navigator.share) {
      e.preventDefault();
      navigator.share({
        title: title,
        text: localText,
        url: window.location.href,
      }).catch((err) => console.error("Share failed:", err));
    }
  }}
>
  <FaInstagram />
  Instagram
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

// utils/browserTranslate.js
export function detectBrowserTranslateLang() {
  if (typeof window === "undefined") return null;

  const html = document.documentElement;

  const isTranslated =
    html.classList.contains("translated-ltr") ||
    html.classList.contains("translated-rtl");

  if (!isTranslated) return null;

  // Usually becomes "hi", "ta", "te" etc. Sometimes may become "hi-IN"
  const lang = html.getAttribute("lang") || "";

  return lang ? lang : null;
}

// optional: normalize to BCP-47 locale
export function normalizeToLocale(lang) {
  if (!lang) return null;

  // normalize format
  const clean = lang.replace("_", "-").toLowerCase();
  const base = clean.split("-")[0];


  // everything else → base language only
  return base;
}
function estimateIndicUnits(text) {
  // Count Unicode syllabic clusters
  return (text.match(/[\u0C80-\u0CFF\u0C00-\u0C7F\u0B80-\u0BFF\u0D00-\u0D7F]/g) || []).length / 2;
}

export function speechUnits(text, lang) {
  if (!text) return 0;

  // ---- CJK languages (character-timed) ----
  // Japanese, Korean (Chinese handled similarly if added later)
 if (lang === "ja" || lang === "ko" || lang === "zh") {
    let units = text.length * 0.9;

    const commaCount = (text.match(/[、，,]/g) || []).length;
    units += commaCount * 0.4;

    return units;
  }

  let units = 0;

  const numberWords = new Set([
    "one","two","three","four","five","six","seven","eight","nine","ten",
    "first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"
  ]);

  // ---- Word-based languages ----
  text.split(/\s+/).forEach(word => {
    let u = 1;
    const lower = word.toLowerCase();

    // digits
    if (/\d/.test(word)) u += 0.6;

    // English number words
    if (numberWords.has(lower)) u += 0.6;

    // tens (English / French / Spanish)
    if (/(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)/.test(lower)) {
      u += 0.8;
    }

    // large number words
    if (/(hundred|thousand|million)/.test(lower)) {
      u += 1.0;
    }

    // long words (Indian & Romance languages benefit a lot from this)
    if (word.length >= 8) u += 0.3;
    if (word.length >= 12) u += 0.5;

    // proper names
    if (/^[A-Z][a-z]+/.test(word)) u += 0.15;

    // ---- Indian language tweaks ----
    if (lang === "hi" || lang === "mr" || lang === "bn") {
      // syllable-timed, numbers are slower
      if (/\d/.test(word)) u += 0.2;
      if (numberWords.has(lower)) u += 0.2;
    }

    if (lang === "kn" || lang === "te") {
      // agglutinative / compound-heavy
      if (word.length >= 8) u += 0.2;
      if (word.length >= 12) u += 0.3;
    }
    const isIndic = ["te","kn","ta","ml","bn","mr"].includes(lang);

text.split(/\s+/).forEach(word => {
  let u = 1;

  // Telugu/Kannada words are longer but spoken faster
  if (!isIndic) {
    if (word.length >= 8) u += 0.3;
    if (word.length >= 12) u += 0.5;
  } else {
    // Indic: very small length penalty
    if (word.length >= 10) u += 0.1;
  }

  // Numbers are slower in Indic, but not by much
  if (/\d/.test(word)) u += isIndic ? 0.15 : 0.6;

  units += u;
});
if (isIndic) {
  units += (text.match(/,/g) || []).length * 0.25;
  units += (text.match(/[.!?]/g) || []).length * 0.35;
} else {
  units += (text.match(/,/g) || []).length * 0.4;
}


    // ---- Romance languages ----
    if (lang === "fr" || lang === "es") {
      // smoother but number words are long
      if (/(vingt|trente|quarante|cinquante|soixante|soixante-dix|quatre-vingt|quatre-vingt-dix)/.test(lower)) {
        u += 0.8;
      }
      if (/(treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa)/.test(lower)) {
        u += 0.8;
      }
    }

    units += u;
  });

  // ---- Punctuation pauses ----
  const commaCount = (text.match(/,/g) || []).length;
  units += commaCount * 0.4;

  const colonCount = (text.match(/:/g) || []).length;
  units += colonCount * 0.5;

  const dashCount = (text.match(/[—–-]/g) || []).length;
  units += dashCount * 0.3;

  return units;
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

export default function AutoFitText({
  text,
  width,
  height,
  color,
  lang,
  backgroundColor,
  fontFamily = "Inter",
  fontWeight = "bold",
  padding = 9,
}) {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(12);
   const shadowColor = getAdaptiveShadow(color, backgroundColor);
  useEffect(() => {
  setFontSize(12);
}, [lang]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text || width === 0 || height === 0) return;

    // 🔑 NEVER allow text area to become too narrow
    const effectiveWidth = Math.max(
      width * 0.75,
      width - padding * 2
    );

    const fit = () => {
      let min = 6;
      let max = Math.min(width, height);
      let best = min;

      while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        el.style.fontSize = `${mid}px`;
        el.style.maxWidth = `${effectiveWidth}px`;

        const fitsHeight =
          el.scrollHeight <= height - padding * 2 - 4;

        if (fitsHeight) {
          best = mid;
          min = mid + 0.8;
        } else {
          max = mid - 0.8;
        }
      }

      setFontSize(best);
    };

    document.fonts?.ready ? document.fonts.ready.then(fit) : fit();
  }, [text, width, height, padding, fontFamily,lang]);

  return (
  <div
    style={{
      width,
      height,
      padding,
      boxSizing: "border-box",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    }}
  >
  

<span
  ref={ref}
  style={{
    color,
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight: 1.3,
    maxWidth: "100%",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    display: "block",

    // 🔥 adaptive shadow
    textShadow: `
      0 1px 2px ${shadowColor},
      0 2px 6px ${shadowColor}
    `,
  }}
>
  {text}
</span>

  </div>
);
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function luminance({ r, g, b }) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getAdaptiveShadow(textColor, bgColor) {
  if (!textColor || !bgColor) {
    return "rgba(0,0,0,0.4)";
  }

  const textLum = luminance(hexToRgb(textColor));
  const bgLum = luminance(hexToRgb(bgColor));

  // contrast direction
  const useDarkShadow = textLum > bgLum;

  return useDarkShadow
    ? "rgba(0,0,0,0.45)"
    : "rgba(255,255,255,0.45)";
}


export async function exportImageWithBoxes({
  src,
  boxes,
  texts,
  lang,
}) {
  const canvas = document.createElement("canvas");
  canvas.width = ORIGINAL_WIDTH;
  canvas.height = ORIGINAL_HEIGHT;

  const ctx = canvas.getContext("2d");

  // 🔑 Wait for font
  if (document.fonts) {
    await document.fonts.ready;
  }

  // Load image
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = src;

  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
  });

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Draw overlays
  boxes.forEach((box, i) => {
    const text = texts?.[lang]?.[i] ?? "";

    // Background
    ctx.fillStyle = box.background;
    roundRect(ctx, box.x, box.y, box.w, box.h, 12);
    ctx.fill();

    // 🔑 Fit text like AutoFitText
    const { fontSize, lines } = fitText(
      ctx,
      text,
      box.w,
      box.h
    );

    ctx.fillStyle = box.fontColor;
    ctx.font = `600 ${fontSize}px Inter`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeightPx = fontSize * 1.25;
    const startY =
      box.y +
      box.h / 2 -
      ((lines.length - 1) * lineHeightPx) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(
        line.trim(),
        box.x + box.w / 2,
        startY + index * lineHeightPx
      );
    });
  });

  // Download
  const link = document.createElement("a");
  link.download = "thumbnail.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}


function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  const lines = [];

  words.forEach(word => {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word + " ";
    } else {
      line = test;
    }
  });
  lines.push(line);

  const startY = y - (lines.length - 1) * lineHeight / 2;

  lines.forEach((l, i) => {
    ctx.fillText(l.trim(), x, startY + i * lineHeight);
  });
}

function fitText(ctx, text, boxWidth, boxHeight, {
    fontFamily = "Inter",
    fontWeight = 600,
    padding = 16,
    maxFontSize = 64,
    minFontSize = 10,
    lineHeight = 1.25,
  } = {} ) {
  let fontSize = maxFontSize;

  while (fontSize >= minFontSize) {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (let word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > boxWidth - padding * 2) {
        lines.push(line);
        line = word + " ";
      } else {
        line = test;
      }
    }
    lines.push(line);

    const totalHeight = lines.length * fontSize * lineHeight;

    if (totalHeight <= boxHeight - padding * 2) {
      return { fontSize, lines };
    }

    fontSize--;
  }

  return { fontSize: minFontSize, lines: [text] };
}
