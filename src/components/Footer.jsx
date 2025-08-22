import React, { useState } from 'react';
import styles from './Footer.module.css';
import { FaEnvelope } from 'react-icons/fa';
import { GiDove } from 'react-icons/gi';

const translations = {
  en: {
    contact: 'Contact Us',
    stayUpdated: 'Stay Updated',
    placeholder: 'Your email',
    subscribe: 'Subscribe',
    thankYou: 'Thank you for subscribing!',
    footerNote: 'Kreupasanam Testimonies. Shared with love. Not affiliated with the official shrine.',
  },
  hi: {
    contact: 'संपर्क करें',
    stayUpdated: 'अद्यतन रहें',
    placeholder: 'आपका ईमेल',
    subscribe: 'सदस्यता लें',
    thankYou: 'सदस्यता के लिए धन्यवाद!',
    footerNote: 'क्रुपासनम गवाही। प्रेम से साझा किया गया। आधिकारिक श्राइन से संबद्ध नहीं।',
  },
  bn: {
    contact: 'আমাদের সাথে যোগাযোগ করুন',
    stayUpdated: 'আপডেট থাকুন',
    placeholder: 'আপনার ইমেইল',
    subscribe: 'সাবস্ক্রাইব করুন',
    thankYou: 'সাবস্ক্রিপশনের জন্য ধন্যবাদ!',
    footerNote: 'ক্রুপাসানম সাক্ষ্য। ভালোবাসা দিয়ে শেয়ার করা হয়েছে। অফিসিয়াল মন্দিরের সাথে সম্পর্কিত নয়।',
  },
  ta: {
    contact: 'எங்களை தொடர்பு கொள்ளவும்',
    stayUpdated: 'அப்டேட் பெறுங்கள்',
    placeholder: 'உங்கள் மின்னஞ்சல்',
    subscribe: 'சந்தா செய்க',
    thankYou: 'சந்தா செய்ததற்கு நன்றி!',
    footerNote: 'க்ருபாசனம் சாட்சி. காதலுடன் பகிரப்பட்டது. அதிகாரப்பூர்வ ஆலயத்துடன் தொடர்பு இல்லை.',
  },
  te: {
    contact: 'మమ్మల్ని సంప్రదించండి',
    stayUpdated: 'తాజా సమాచారం పొందండి',
    placeholder: 'మీ ఇమెయిల్',
    subscribe: 'చందా చేయండి',
    thankYou: 'చందా కోసం ధన్యవాదాలు!',
    footerNote: 'క్రుపాసనమ్ సాక్ష్యాలు. ప్రేమతో పంచబడింది. అధికారిక ఆలయంతో సంబంధం లేదు.',
  },
  fr: {
    contact: 'Contactez-nous',
    stayUpdated: 'Restez informé',
    placeholder: 'Votre email',
    subscribe: "S'abonner",
    thankYou: 'Merci pour votre abonnement !',
    footerNote: 'Témoignages de Kreupasanam. Partagé avec amour. Non affilié au sanctuaire officiel.',
  },
  es: {
    contact: 'Contáctanos',
    stayUpdated: 'Mantente actualizado',
    placeholder: 'Tu correo electrónico',
    subscribe: 'Suscribirse',
    thankYou: '¡Gracias por suscribirte!',
    footerNote: 'Testimonios de Kreupasanam. Compartido con amor. No afiliado al santuario oficial.',
  },
  mr: {
    contact: 'संपर्क साधा',
    stayUpdated: 'अपडेट राहा',
    placeholder: 'आपला ईमेल',
    subscribe: 'सदस्यता घ्या',
    thankYou: 'सदस्यतेसाठी धन्यवाद!',
    footerNote: 'क्रुपासनम साक्ष्य. प्रेमाने शेअर केले. अधिकृत तीर्थाशी संबंधित नाही.',
  },
  kn: {
    contact: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
    stayUpdated: 'ನವೀಕರಣೆ ಪಡೆಯಿರಿ',
    placeholder: 'ನಿಮ್ಮ ಇಮೇಲ್',
    subscribe: 'ಸಬ್ಸ್ಕ್ರೈಬ್ ಮಾಡಿ',
    thankYou: 'ಸಬ್ಸ್ಕ್ರಿಪ್ಷನ್‌ಗಾಗಿ ಧನ್ಯವಾದಗಳು!',
    footerNote: 'ಕ್ರುಪಾಸನಮ್ ಸಾಕ್ಷ್ಯಗಳು. ಪ್ರೀತಿಯಿಂದ ಹಂಚಲಾಗಿದೆ. ಅಧಿಕೃತ ದೇವಾಲಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಿಲ್ಲ.',
  },
  zh: {
    contact: '联系我们',
    stayUpdated: '保持更新',
    placeholder: '您的邮箱',
    subscribe: '订阅',
    thankYou: '感谢您的订阅！',
    footerNote: '克鲁帕萨纳姆见证。满怀爱心分享。与官方圣地无关。',
  },
};

export default function Footer({ lang = 'en' }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const t = translations[lang] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://formspree.io/f/mzzvgyaa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0091ffff" />
              <stop offset="100%" stopColor="hsla(218, 100%, 30%, 1.00)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,181.3C672,171,768,117,864,117.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.section}>
            <h3>{t.contact}</h3>
            <p className={styles.emailText}>
              <FaEnvelope style={{ color: '#d93025' }} />
              <a
                href="mailto:kreupasanamtestimonies@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.emailLink}
              >
                kreupasanamtestimonies@gmail.com
              </a>
            </p>

            <h3 style={{ marginTop: '1.5rem' }}>{t.stayUpdated}</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className={styles.newsletter}>
                <input
                  type="email"
                  placeholder={t.placeholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : t.subscribe}
                </button>
              </form>
            ) : (
              <p className={styles.thankYouMessage}>{t.thankYou}</p>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            <GiDove
              style={{ color: '#fff', fontSize: '1.2rem', verticalAlign: 'middle', marginRight: '0.3rem' }}
            />
            {new Date().getFullYear()} {t.footerNote}
          </p>
        </div>
      </footer>
    </div>
  );
}
