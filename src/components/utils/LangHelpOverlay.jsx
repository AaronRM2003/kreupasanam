import React from 'react';
import styles from '../../pages/TestimonyPage.module.css' // or reuse existing styles

export default function LangHelpOverlay({ onClose }) {
  return (
    <>
      <div className={styles.overlayBackground} onClick={onClose}></div>

      <div className={styles.fixedTooltipBox}>
        <strong>🌐 Need another language?</strong>
        <p style={{ marginTop: '8px' }}>
          ① Tap <b>⋮ (3 dots)</b> in the top-right<br />
          ② Tap <b>“Translate”</b> <span style={{ fontSize: '1.2em' }}>🌍</span><br /><br />
          ✅ Now you can read in your language!
        </p>

        <a
          href="https://support.google.com/chrome/answer/173424?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          📘 Learn more
        </a>

        <button
          className={styles.okButton}
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </>
  );
}
