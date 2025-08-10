import React, { useState } from 'react';
import styles from './Footer.module.css';
import { FaEnvelope } from 'react-icons/fa';
import { GiDove } from 'react-icons/gi'; // Game Icons library has a dove icon


export default function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/mzzvgyaa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
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
  <FaEnvelope style={{ color: '#d93025' }} />
  <a href="mailto:kreupasanamtestimonies@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.emailLink}>
    kreupasanamtestimonies@gmail.com
  </a>
</p>


            <h3 style={{ marginTop: '1.5rem' }}>Stay Updated</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className={styles.newsletter}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Subscribe'}
                </button>
              </form>
            ) : (
              <p className={`${styles.thankYouMessage}`}>
                  Thank you for subscribing!
                  </p>

            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
 <p>
      <GiDove style={{ color: '#fff', fontSize: '1.2rem', verticalAlign: 'middle', marginRight: '0.3rem' }} />
      {new Date().getFullYear()} Kreupasanam Testimonies. Shared with love. Not affiliated with the official shrine.
    </p>        </div>
      </footer>
    </div>
  );
}

