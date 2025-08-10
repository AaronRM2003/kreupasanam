import React, { useState, useEffect } from 'react';
import styles from '../../pages/TestimonyPage.module.css';

function getBrowserName() {
  const userAgent = navigator.userAgent;

  if (/chrome|crios|crmo/i.test(userAgent) && !/edg|edge|opr|opera/i.test(userAgent)) {
    return 'chrome';
  } else if (/firefox|fxios/i.test(userAgent)) {
    return 'firefox';
  } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
    return 'safari';
  } else if (/edg|edge/i.test(userAgent)) {
    return 'edge';
  } else if (/opr|opera/i.test(userAgent)) {
    return 'opera';
  } else {
    return 'other';
  }
}

export default function LangHelpOverlay({ onClose }) {
  const [browser, setBrowser] = useState('other');

  useEffect(() => {
    setBrowser(getBrowserName());
  }, []);

  const instructions = {
    chrome: (
      <>
        ① Tap <b>⋮ (3 dots)</b> in the top-right<br />
        ② Tap <b>“Translate”</b> <span style={{ fontSize: '1.2em' }}>🌍</span><br /><br />
        ✅ Now you can read in your language!
      </>
    ),
    firefox: (
      <>
        ① Tap <b>☰ (menu)</b> in the top-right<br />
        ② Tap <b>“Translate page”</b> (if available) or install a translation add-on<br /><br />
        ✅ Now you can read in your language!
      </>
    ),
    safari: (
      <>
        ① Tap <b>AA</b> icon in the URL bar<br />
        ② Tap <b>Translate to [Your Language]</b><br /><br />
        ✅ Now you can read in your language!
      </>
    ),
    edge: (
      <>
        ① Tap <b>⋯ (3 dots)</b> in the top-right<br />
        ② Tap <b>“Translate”</b> <span style={{ fontSize: '1.2em' }}>🌍</span><br /><br />
        ✅ Now you can read in your language!
      </>
    ),
    opera: (
      <>
        ① Tap <b>≡ (menu)</b> in the top-left<br />
        ② Tap <b>“Page”</b> then <b>“Translate”</b><br /><br />
        ✅ Now you can read in your language!
      </>
    ),
    other: (
      <>
        Please use your browser's translation feature.<br />
        Or try Google Chrome for easiest translation support.
      </>
    ),
  };

  return (
    <>
      <div className={styles.overlayBackground} onClick={onClose}></div>

      <div className={styles.fixedTooltipBox}>
        <strong>🌐 Need another language?</strong>
        <p style={{ marginTop: '8px' }}>
          {instructions[browser]}
        </p>

        <a
  href={learnMoreLinks[browser]}
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
const learnMoreLinks = {
  chrome: "https://support.google.com/chrome/answer/173424", 
  firefox: "https://addons.mozilla.org/en-US/firefox/search/?q=translate",
  safari: "https://support.apple.com/guide/safari/translate-webpages-ibrw7e50a7a/mac", 
  edge: "https://support.microsoft.com/en-us/topic/use-microsoft-translator-in-microsoft-edge-browser-4ad1c6cb-01a4-4227-be9d-a81e127fcb0b",
  opera: "https://help.opera.com/en/latest/web-preferences/#translate",
  other: "https://support.google.com/chrome/answer/173424"
};

