import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import testimonies from '../assets/testimony-content.json';
import styles from './TestimonyPage.module.css';
import { FaFacebookF, FaWhatsapp, FaTelegramPlane, FaEnvelope, FaRegCopy } from 'react-icons/fa';

export default function TestimonyPage({ lang: initialLang }) {
  const { id } = useParams();
  const testimony = testimonies.find(item => item.id === parseInt(id));
  const [lang, setLang] = useState(initialLang || 'en');
  const [showVideo, setShowVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitles, setSubtitles] = useState([]);

  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareText, setShareText] = useState('');

  // We'll track if all images (background + thumbnail) are loaded
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);

  const cssBackgroundImages = [
    '/assets/angel3.webp',
    '/assets/angel3.webp',
    '/assets/cloud.webp',
  ];

  const { title, date, content, video } = testimony || {};

  // Extract YouTube video ID from URL
  const getYouTubeVideoID = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };
  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  // Preload all images (background + thumbnail) and set loaded flag when done
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);

    let loadedCount = 0;
    const totalToLoad = allImages.length;

    if (totalToLoad === 0) {
      // No images to load, mark as loaded immediately
      setAllAssetsLoaded(true);
      return;
    }

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalToLoad) {
          setAllAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        // Even on error, count as loaded to prevent infinite loading
        loadedCount++;
        if (loadedCount === totalToLoad) {
          setAllAssetsLoaded(true);
        }
      };
    });
  }, [thumbnailUrl]);

  // Generates a rich share text for WhatsApp, Telegram, Email
  const generateShareText = () => {
    if (!testimony) return '';
    const t = title[lang] || title['en'];
    const d = date || '';
    const cRaw = content[lang] || content['en'] || '';
    // Take first 60 words of content for preview
    const cPreview = cRaw.split(' ').slice(0, 60).join(' ') + (cRaw.split(' ').length > 60 ? '...' : '');
    const url = window.location.href;
    return `A Powerful Testimony of Faith

📖 ${t}
📅 ${d}

"${cPreview}"

🔗 ${url}`;
  };

  // Update share text when testimony or language changes
  useEffect(() => {
    if (testimony) {
      setShareText(generateShareText());
    }
  }, [lang, testimony]);

  // Fetch subtitles JSON when testimony or lang changes
  useEffect(() => {
    if (testimony && testimony.subtitles) {
      fetch(testimony.subtitles)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load subtitles');
          return res.json();
        })
        .then(data => setSubtitles(data))
        .catch(err => {
          console.error('Subtitle loading failed:', err);
          setSubtitles([]);
        });
    } else {
      setSubtitles([]);
    }
  }, [testimony]);
useEffect(() => {
  if (showVideo) {
    // Delay slightly to allow DOM update
    setTimeout(() => {
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 200); // tweak delay if needed
  }
}, [showVideo]);

  // Find current subtitle text based on currentTime and selected language
  const currentSubtitle = (() => {
    if (!subtitles.length) return '';
    for (let i = 0; i < subtitles.length; i++) {
      const startSec = timeStringToSeconds(subtitles[i].start);
      const endSec = i + 1 < subtitles.length ? timeStringToSeconds(subtitles[i + 1].start) : startSec + 5;
      if (currentTime >= startSec && currentTime < endSec) {
        return subtitles[i].text[lang] || subtitles[i].text['en'] || '';
      }
    }
    return '';
  })();

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Initialize or destroy YouTube player based on showVideo
  useEffect(() => {
    if (!showVideo) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
      return;
    }

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          cc_load_policy: 0,
          fs: 0,
        },
        events: {
          onReady: () => {
            intervalRef.current = setInterval(() => {
              if (playerRef.current && playerRef.current.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
              }
            }, 500);
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
    };
  }, [showVideo, videoId]);

  if (!testimony) {
    return (
      <div className={styles.testimonyPage}>
        <div className={styles.testimonyTitleBox}>
          <h2 className={styles.testimonyHeading}>Testimony</h2>
        </div>
        <h2 className={styles.errorTitle}>Testimony Not Found</h2>
        <p className={styles.errorText}>The testimony you are looking for does not exist.</p>
      </div>
    );
  }

  // If assets still loading, show loading screen
  if (!allAssetsLoaded) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p>Loading visuals...</p>
      </div>
    );
  }

  // For sharing URLs
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title['en'])}&body=${encodeURIComponent(shareText)}`;

  // Copy text helper
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Message copied to clipboard!'))
      .catch(() => alert('Failed to copy!'));
  };

  return (
    <div className={styles.testimonyPage}>
      <div className={styles.testimonyHeader}>
        {/* Left: Back button */}
        <div className={styles.testimonyLeft}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            &#8592; <span className={styles.backText}>Back</span>
          </button>
        </div>

        {/* Center: Title */}
        <div className={styles.testimonyCenter}>
          <div className={styles.animatedLineLeft}></div>
          <h2 className={styles.testimonyHeading}>Testimony</h2>
          <div className={styles.animatedLineRight}></div>
        </div>

        {/* Right: Language Dropdown */}
        <div className={styles.testimonyRight}>
          <Dropdown onSelect={setLang}>
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
              {{
                en: 'English',
                hi: 'हिन्दी',
                zh: '中文',
                bn: 'বাংলা',
                ta: 'தமிழ்',
                te: 'తెలుగు',
                fr: 'Français',
                es: 'Español',
                mr: 'मराठी',
                kn: 'ಕನ್ನಡ'
              }[lang] || lang}
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
              {['en', 'zh', 'bn', 'hi', 'ta', 'te', 'fr', 'es', 'mr', 'kn'].map(key => (
                <Dropdown.Item
                  key={key}
                  eventKey={key}
                  style={{
                    borderRadius: '8px',
                    transition: 'background-color 0.25s ease, color 0.25s ease',
                    fontWeight: '600',
                    padding: '1rem 1.5rem',
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
                  {{
                    en: 'English',
                    hi: 'हिन्दी',
                    zh: '中文',
                    bn: 'বাংলা',
                    ta: 'தமிழ்',
                    te: 'తెలుగు',
                    fr: 'Français',
                    es: 'Español',
                    mr: 'मराठी',
                    kn: 'ಕನ್ನಡ'
                  }[key]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className={`${styles.floatingImage} ${styles.left}`}></div>
      <div className={`${styles.floatingImage} ${styles.right}`}></div>
      <div className={`${styles.floatingCloud} ${styles.bottom}`}></div>

      <div className={styles.testimonyContainer}>
        <div className={styles.testimonyInner}>
          {videoId && !showVideo ? (
            <div
              className={styles.thumbnailWrapper}
              onClick={() => setShowVideo(true)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={styles.thumbnailImage}
              />
              <div className={styles.smallPlayIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ff0000"
                  width="60%"
                  height="60%"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className={styles.thumbnailWrapper}>
              <img
                src={thumbnailUrl}
                alt="Video Thumbnail"
                className={styles.thumbnailImage}
              />
            </div>
          )}

          <div className={styles.testimonyText}>
            <h1 className={styles.testimonyTitle}>{title[lang] || title['en']}</h1>
            <p className={styles.testimonyDate}>{date}</p>
            <div className={styles.testimonyContent}>{content[lang] || content['en']}</div>
          </div>

          <div className={styles.shareSection}>
            <p style={{ fontWeight: '600' }}>Share this testimony:</p>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className={styles.shareMainButton} onClick={() => setShowShareModal(true)}>
                🔗 Share
              </button>
            </div>

            <Modal show={showShareModal} onHide={() => setShowShareModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Share this Testimony</Modal.Title>
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
                  }}
                />

                {/* Share Buttons */}
                <div className={styles.shareOptionsGrid}>
                  <a
                    href={fbShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareOption} ${styles.facebook}`}
                  >
                    <FaFacebookF />
                    Facebook
                  </a>

                  <a
                    href={waShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareOption} ${styles.whatsapp}`}
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </a>

                  <a
                    href={telegramShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareOption} ${styles.telegram}`}
                  >
                    <FaTelegramPlane />
                    Telegram
                  </a>

                  <a
                    href={emailShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.shareOption} ${styles.email}`}
                  >
                    <FaEnvelope />
                    Gmail
                  </a>

                  <button
                    onClick={copyToClipboard}
                    className={`${styles.shareOption} ${styles.copy}`}
                    type="button"
                  >
                    <FaRegCopy />
                    Copy
                  </button>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowShareModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      {showVideo && (
        <div className={styles.floatingVideoWrapper}>
          <div className={styles.floatingVideo}>
            <div id="yt-player" style={{ width: '100%' }}></div>
            <button className={styles.closeButton} onClick={() => setShowVideo(false)}>✕</button>
          </div>

          <div className={styles.subtitleBox}>
            {currentSubtitle}
          </div>
        </div>
      )}
    </div>
  );
}

function timeStringToSeconds(timeStr) {
  if (typeof timeStr !== 'string') return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
