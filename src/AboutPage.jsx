import React, { useState, useEffect } from 'react';
import styles from './About.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const translations = {
  en: {
    heading: 'About',
    introheading: 'About Me',
    intro: 'I am a covenant taker in Kreupasanam. This is ',
    note: 'not an official page',
    description:
      ', but a simple website created to help non-Malayalam speakers understand the language.',
    contact:
      'If you have any feedback, suggestions, or notice any issues, please feel free to contact me',

    missionHeading: 'Intention',
    mission: 'The intention is to help non-Malayalees understand Kreupasanam content easily.',

    howItWorksHeading: 'How to Use?',
    howItWorksItems: [
      'Find the video you want to watch.',
      'Choose the subtitle language that suits you.',
      'If you want, your device’s text-to-speech feature can read out the subtitles.',
      'You can also read the summary below each video to understand better.',
    ],

    contentheading: 'Content',
    acknowledgements: 'Translations were done using AI, Google, and manual inputs.',

    privacy:
      'We respect your privacy. No personal data is collected through this site except for voluntary feedback submissions.',

    faqHeading: 'FAQ',
    faq: [
      {
        question: 'Is this an official site?',
        answer: 'No, this is an unofficial website to help with translations.',
      },
      {
        question: 'Are the translations accurate?',
        answer:
          'Some inaccuracies may exist, especially with names, places, or covenant-related terms, as mentioned in the disclaimer.',
      },
    ],
  },
};

// Reusable ScrollHoverCard component for hover-like scroll animation on mobile
function ScrollHoverCard({ children, className }) {
  const controls = useAnimation();

  // rootMargin: top and bottom margin shrinking viewport to ~center band
  // For example, -40% top and bottom means observer area is the middle 20% of viewport height
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '-40% 0px -40% 0px', 
  });

 useEffect(() => {
  if (window.innerWidth >= 768) {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
    return;
  }
  if (inView) {
    controls.start({
      opacity: 1,
      y: -6,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  } else {
    controls.start({
      opacity: 0.5,
      y: 10,
      transition: { duration: 0.4, ease: 'easeOut' },
    });
  }
}, [inView, controls]);


  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 1, y: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}

export default function About({ lang = 'en' }) {
  const t = translations[lang] || translations['en'];
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.sectionWrapper}>
        <div className={styles.container}>
          <div className={styles.headerWrapper}>
            <button
              className={styles.backButton}
              onClick={() => window.history.back()}
              style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}
            >
              &#8592; <span>Back</span>
            </button>
            <h1 className={styles.heading}>{t.heading}</h1>
          </div>

          {/* New grid wrapper starts */}
          <div className={styles.gridWrapper}>
            <ScrollHoverCard className={`${styles.card} ${styles.featuredCard}`}>
              <h2>{t.introheading}</h2>
              <p>
                {t.intro}
                <strong>{t.note}</strong>
                {t.description}
              </p>
              <p>{t.contact} </p>
            </ScrollHoverCard>

            <ScrollHoverCard className={styles.card}>
              <h2>{t.missionHeading}</h2>
              <p>{t.mission}</p>
            </ScrollHoverCard>

            <ScrollHoverCard className={styles.card}>
              <h2>{t.howItWorksHeading}</h2>
              <ul className={styles.list}>
                {t.howItWorksItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </ScrollHoverCard>

            <ScrollHoverCard className={styles.card}>
              <h2>{t.contentheading}</h2>
              <p>{t.acknowledgements}</p>
              <p>{t.privacy}</p>
            </ScrollHoverCard>

            <ScrollHoverCard className={styles.card}>
              <h2>{t.faqHeading}</h2>
              <div className={styles.faqList}>
                {t.faq.map(({ question, answer }, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <button
                      className={styles.faqQuestion}
                      onClick={() => toggleFAQ(idx)}
                    >
                      {question}
                    </button>
                    {openFAQ === idx && (
                      <div className={styles.faqAnswer}>{answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollHoverCard>
          </div>
          {/* New grid wrapper ends */}
        </div>
      </section>
    </div>
  );
}
