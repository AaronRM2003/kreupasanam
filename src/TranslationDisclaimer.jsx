import { useState, useEffect } from 'react';
import './components/styles.css';

export default function TranslationDisclaimer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenTranslationDisclaimer');
    if (!hasSeen) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenTranslationDisclaimer', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Translation Disclaimer</h2>
      <p style={styles.message}>
  Please note that some translations or references to names of individuals, places, or culturally significant terms may not be entirely accurate. We sincerely apologize for any confusion or inconvenience this may cause.
</p>

        <button onClick={handleClose} style={styles.button}>Got It</button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2rem',
    maxWidth: '480px',
    width: '100%',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    textAlign: 'center',
    animation: 'fadeInScale 0.4s ease-out',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  message: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#555',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

// Optional: Add this to your global CSS for animation
/* 
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
*/
