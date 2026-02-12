import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./IntroSection.css";
import heroImage from "../assets/kreupasanammother.webp";

export default function IntroSection({ lang = 'en', onReady }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/${lang}/testimonies`);

  const t = translations[lang] || translations['en'];

  // Notify parent only once when image is loaded
  useEffect(() => {
    if (imageLoaded && typeof onReady === "function") {
      onReady();
    }
  }, [imageLoaded, onReady]);

  return (
    <section className="introBox1 animated-glow">
  <Container>
    <Row className="d-flex align-items-center justify-content-between flex-wrap">
      <Col xs={12} md={6} className="image-wrapper order-1">
        <img
          src={heroImage}
          alt="Testimony intro"
          className="img-fluid rounded-4 shadow-md"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </Col>

      <Col xs={12} md={6} className="text-content order-2">
        <h1 className="title">
          {t.title.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h1>
        <p className="introText">{t.introText}</p>

        <Button className="introBtn shimmer-button" onClick={handleCardClick}>
          <span>{t.button}</span>
          <span className="arrow"> ➔</span>
        </Button>
      </Col>
    </Row>
  </Container>
</section>

  );
}
const translations ={
  "en": {
    "title": "Marian Covenant",
    "introText": "At the Marian Shrine in Alappuzha, Kerala, the faithful gather in prayer, entrusting their lives to God through the intercession of the Blessed Virgin Mary. By doing whatever He tells us, the Gospel is lived through the Marian Covenant.",
    "button": "Explore"
  },
  "fr": {
    "title": "Alliance Mariale",
    "introText": "Au sanctuaire marial d’Alappuzha, au Kerala, les fidèles se rassemblent dans la prière, confiant leur vie à Dieu par l’intercession de la Bienheureuse Vierge Marie. En faisant tout ce qu’Il nous dit, l’Évangile est vécu à travers l’Alliance mariale.",
    "button": "Explorer"
  },
  "es": {
    "title": "Alianza Mariana",
    "introText": "En el Santuario Mariano de Alappuzha, Kerala, los fieles se reúnen en oración, confiando sus vidas a Dios por la intercesión de la Santísima Virgen María. Al hacer todo lo que Él nos dice, el Evangelio se vive a través de la Alianza Mariana.",
    "button": "Explorar"
  },
  "hi": {
    "title": "मरियन वाचा",
    "introText": "केरल के अलप्पुझा स्थित मरियन तीर्थस्थल में श्रद्धालु प्रार्थना में एकत्र होते हैं और धन्य कुँवारी मरियम की मध्यस्थता से अपने जीवन ईश्वर को सौंपते हैं। वह जो हमें कहते हैं उसे करके, मरियन वाचा के माध्यम से सुसमाचार जिया जाता है।",
    "button": "अन्वेषण करें"
  },
  "bn": {
    "title": "মেরিয়ান চুক্তি",
    "introText": "কেরালার আলাপ্পুঝার মেরিয়ান তীর্থস্থলে ভক্তরা প্রার্থনায় সমবেত হয়ে ধন্য কুমারী মরিয়মের মধ্যস্থতায় তাদের জীবন ঈশ্বরের হাতে সমর্পণ করেন। তিনি যা করতে বলেন তা পালন করলে মেরিয়ান চুক্তির মাধ্যমে সুসমাচার জীবিত হয়।",
    "button": "অন্বেষণ করুন"
  },
  "kn": {
    "title": "ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ",
    "introText": "ಕೇರಳದ ಅಲಪ್ಪುಳದ ಮರಿಯನ್ ದೇವಾಲಯದಲ್ಲಿ ಭಕ್ತರು ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಸೇರಿ ಧನ್ಯ ಕನ್ಯಾ ಮರಿಯಮ್ಮನ ಮಧ್ಯಸ್ಥಿಕೆಯಿಂದ ತಮ್ಮ ಜೀವನವನ್ನು ದೇವರಿಗೆ ಅರ್ಪಿಸುತ್ತಾರೆ. ಅವರು ಹೇಳುವಂತೆ ಮಾಡುವುದರಿಂದ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಮೂಲಕ ಸುವಾರ್ತೆ ಜೀವಂತವಾಗುತ್ತದೆ.",
    "button": "ಅನ್ವೇಷಿಸಿ"
  },
  "mr": {
    "title": "मरियन करार",
    "introText": "केरळमधील अलप्पुझा येथील मरियन देवस्थानात भक्त प्रार्थनेत एकत्र येऊन धन्य कन्या मरियामच्या मध्यस्थीने आपले जीवन देवाला अर्पण करतात. तो जे सांगतो ते केल्याने मरियन करारातून सुवार्ता जगली जाते.",
    "button": "अन्वेषण करा"
  },
  "ta": {
    "title": "மரியன் உடன்படிக்கை",
    "introText": "கேரளாவின் ஆலப்புழாவில் உள்ள மரியன் திருத்தலத்தில் நம்பிக்கையாளர்கள் ஜெபத்தில் ஒன்று கூடி, புனித கன்னி மரியாவின் நடுநிலையால் தங்கள் வாழ்க்கையை இறைவனிடம் ஒப்படைக்கிறார்கள். அவர் சொல்வதையெல்லாம் செய்வதன் மூலம் மரியன் உடன்படிக்கையின் வழியாக நற்செய்தி வாழப்படுகிறது.",
    "button": "ஆராயுங்கள்"
  },
  "te": {
    "title": "మరియన్ ఒడంబడిక",
    "introText": "కేరళలోని అలప్పుజా మరియన్ మందిరంలో విశ్వాసులు ప్రార్థనలో ఏకమై, ధన్య కన్య మరియమ్మ మధ్యవర్తిత్వం ద్వారా తమ జీవితాలను దేవునికి అప్పగిస్తారు. ఆయన చెప్పినదాన్ని చేయడం ద్వారా మరియన్ ఒడంబడికలో సువార్త జీవితం అవుతుంది.",
    "button": "అన్వేషించండి"
  },
  "zh": {
    "title": "玛利亚盟约",
    "introText": "在印度喀拉拉邦阿勒皮的玛利亚朝圣地，信众在祈祷中聚集，通过至圣童贞玛利亚的代祷将生命托付给天主。遵行祂所吩咐的一切，福音在玛利亚盟约中得以活出来。",
    "button": "探索"
  }
};

