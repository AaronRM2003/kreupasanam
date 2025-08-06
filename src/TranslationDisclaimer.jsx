import { useState, useEffect } from 'react';
import './components/styles.css';


const TRANSLATION_MESSAGES = {
  en: `Please note that some translations or references to names of individuals, places, or culturally significant terms may not be entirely accurate. We sincerely apologize for any confusion or inconvenience this may cause.`,
  hi: `कृपया ध्यान दें कि कुछ अनुवाद या व्यक्तियों, स्थानों या सांस्कृतिक रूप से महत्वपूर्ण शब्दों के नाम पूरी तरह सटीक नहीं हो सकते हैं। किसी भी भ्रम या असुविधा के लिए हम खेद प्रकट करते हैं।`,
  zh: `请注意，某些翻译或对个人、地点或具有文化意义的术语的引用可能并不完全准确。对于可能引起的任何困惑或不便，我们深表歉意。`,
  bn: `দয়া করে লক্ষ্য করুন যে কিছু অনুবাদ বা ব্যক্তির নাম, স্থান বা সাংস্কৃতিকভাবে গুরুত্বপূর্ণ শব্দের উল্লেখ সম্পূর্ণরূপে সঠিক নাও হতে পারে। কোনও বিভ্রান্তি বা অসুবিধার জন্য আমরা আন্তরিকভাবে ক্ষমা প্রার্থনা করি।`,
  ta: `சில மொழிபெயர்ப்புகள் அல்லது நபர்கள், இடங்கள் அல்லது பண்பாட்டு முக்கியத்துவம் வாய்ந்த சொற்களின் பெயர்களில் துல்லியமாக இருக்காமல் இருக்கலாம். ஏதேனும் குழப்பம் அல்லது துயரத்திற்கு நாங்கள் மனமார்ந்த முறையில் மன்னிப்புக் கோருகிறோம்.`,
  te: `కొన్ని అనువాదాలు లేదా వ్యక్తుల, ప్రదేశాల లేదా సాంస్కృతిక ప్రాముఖ్యత కలిగిన పదాల పేర్లపై సూచనలు పూర్తిగా ఖచ్చితంగా ఉండకపోవచ్చు. ఏదైనా గందరగోళం లేదా అసౌకర్యానికి మేము క్షమాపణలు తెలుపుతాము.`,
  fr: `Veuillez noter que certaines traductions ou références aux noms de personnes, lieux ou termes culturellement significatifs peuvent ne pas être entièrement exactes. Nous nous excusons sincèrement pour toute confusion ou gêne occasionnée.`,
  es: `Tenga en cuenta que algunas traducciones o referencias a nombres de personas, lugares o términos culturalmente significativos pueden no ser completamente precisas. Pedimos disculpas sinceramente por cualquier confusión o inconveniente que esto pueda causar.`,
  mr: `कृपया लक्षात घ्या की काही भाषांतरं किंवा व्यक्ती, ठिकाणे किंवा सांस्कृतिकदृष्ट्या महत्त्वाच्या संज्ञांच्या संदर्भात पूर्णपणे अचूक नसू शकतात. कोणत्याही गैरसमजासाठी किंवा असुविधेसाठी आम्ही खेद व्यक्त करतो.`,
  kn: `ಕೆಲವು ಅನುವಾದಗಳು ಅಥವಾ ವ್ಯಕ್ತಿಗಳು, ಸ್ಥಳಗಳು ಅಥವಾ ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಮಹತ್ವಪೂರ್ಣ ಪದಗಳ ಹೆಸರುಗಳು ಸಂಪೂರ್ಣವಾಗಿ ನಿಖರವಾಗಿರದೇ ಇರಬಹುದು. ಯಾವುದೇ ಗೊಂದಲ ಅಥವಾ ಅಸೌಕರ್ಯಕ್ಕೆ ನಾವು ಕ್ಷಮೆಯಾಚಿಸುತ್ತೇವೆ।`,
};

const TRANSLATION_TITLES = {
  en: "Translation Disclaimer",
  hi: "अनुवाद अस्वीकरण",
  zh: "翻译免责声明",
  bn: "অনুবাদ বিবৃতি",
  ta: "மொழிபெயர்ப்பு அறிக்கை",
  te: "అనువాద నివేదిక",
  fr: "Avis de traduction",
  es: "Descargo de traducción",
  mr: "भाषांतर सूचना",
  kn: "ಅನುವಾದ ಸೂಚನೆ",
};

const BUTTON_TEXT = {
  en: "Got It",
  hi: "ठीक है",
  zh: "知道了",
  bn: "বোঝা গেছে",
  ta: "புரிந்துகொண்டேன்",
  te: "సరే",
  fr: "Compris",
  es: "Entendido",
  mr: "समजले",
  kn: "ಸರಿ",
};

export default function TranslationDisclaimer({ lang = "en" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenTranslationDisclaimer");
    if (!hasSeen) {
      setShow(true);
      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    }

    return () => {
      // Reset styles when modal unmounts
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.touchAction = "auto";
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenTranslationDisclaimer", "true");
    setShow(false);
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.body.style.width = "auto";
    document.body.style.touchAction = "auto";
  };

  if (!show) return null;

  // Use English fallback if language is missing
  const message = TRANSLATION_MESSAGES[lang] || TRANSLATION_MESSAGES.en;
  const title = TRANSLATION_TITLES[lang] || TRANSLATION_TITLES.en;
  const buttonLabel = BUTTON_TEXT[lang] || BUTTON_TEXT.en;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.message}>{message}</p>
        <button onClick={handleClose} style={styles.button}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 99999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },

  modal: {
  backgroundColor: "#fff",
  borderRadius: "16px",
  padding: "2rem",
  maxWidth: "600px",  // fixed max width for desktop
  width: "90vw",      // width relative to viewport on smaller screens
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  textAlign: "center",
  animation: "fadeInScale 0.4s ease-out",
},


  title: {
    fontSize: "clamp(1.2rem, 2vw, 1.75rem)",
    marginBottom: "1rem",
    color: "#333",
  },

  message: {
    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
    lineHeight: 1.6,
    color: "#555",
    textAlign: "justify",
  },

  button: {
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
