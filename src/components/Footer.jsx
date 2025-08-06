import React, { useEffect, useState } from 'react';
import styles from './Footer.module.css';
import { FaEnvelope } from 'react-icons/fa';
import { GiDove } from 'react-icons/gi';

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [isOneSignalReady, setIsOneSignalReady] = useState(false);

  useEffect(() => {
    if (!window.OneSignal) {
      console.warn('OneSignal SDK not loaded');
      return;
    }
    // Wait until OneSignal SDK is ready:
    window.OneSignal.push(() => {
      setIsOneSignalReady(true);
    });
  }, []);

  const handlePushSubscribe = async () => {
  if (!window.OneSignalDeferred) {
    alert('OneSignal is not available.');
    return;
  }

  window.OneSignalDeferred.push(async function (OneSignal) {
    try {
      const isSupported = await OneSignal.isPushNotificationsSupported();
      if (!isSupported) {
        alert('Push notifications are not supported in this browser.');
        return;
      }

      const permission = await OneSignal.getNotificationPermission();
      if (permission !== 'granted') {
        await OneSignal.subscribe();
        alert('You are now subscribed to push notifications!');
      } else {
        alert('You are already subscribed to notifications.');
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  });
};


  return (
    <div>
      <div className={styles.waveTop}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#3949ab"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,181.3C672,171,768,117,864,117.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.section}>
            <h3>Contact Us</h3>
            <p className={styles.emailText}>
              <FaEnvelope style={{ marginRight: '0.5rem', color: '#d93025' }} />
              <a
                href="mailto:kreupasanamtestimonies@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.emailLink}
              >
                kreupasanamtestimonies@gmail.com
              </a>
            </p>

            <h3 style={{ marginTop: '1.5rem' }}>Get Notifications</h3>
            <button
              type="button"
              onClick={handlePushSubscribe}
              disabled={loading || !isOneSignalReady}
              className={styles.subscribeButton}
            >
              {loading && <div className={styles.spinner} aria-label="loading spinner"></div>}
              {loading ? 'Subscribing...' : 'Subscribe to Notifications'}
            </button>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            <GiDove
              style={{
                color: '#fff',
                fontSize: '1.2rem',
                verticalAlign: 'middle',
                marginRight: '0.3rem',
              }}
            />
            {new Date().getFullYear()} Kreupasanam Testimonies. Shared with love.
            Not affiliated with the official shrine.
          </p>
        </div>
      </footer>
    </div>
  );
}
