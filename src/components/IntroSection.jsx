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
const translations = {
  en: {
  title: "Witness the Power\nof Faith in Action",
  introText: "At the Marian Shrine in Alappuzha, Kerala, the faithful honor Our Lady of Kreupasanam, experiencing healing, peace, and divine grace through the Marian Covenant.",
  button: "Explore Stories",
},

hi: {
  title: "आस्था की शक्ति का साक्षी बनें",
  introText: "केरल के अलप्पुझा स्थित मरियम श्राइन में श्रद्धालु क्रुपासनम माता की उपासना करते हैं और मेरीयन वाचा के माध्यम से उपचार, शांति और ईश्वर की कृपा का अनुभव करते हैं।",
  button: "कहानियाँ देखें",
},

zh: {
  title: "见证信仰的力量",
  introText: "在印度喀拉拉邦阿拉普扎的玛利亚圣地，信徒们敬奉克鲁帕萨纳姆圣母，并通过圣母圣约体验治愈、平安与神圣恩典。",
  button: "探索见证",
},

bn: {
  title: "বিশ্বাসের শক্তির সাক্ষী হন",
  introText: "কেরলের আলাপুজা অবস্থিত ম্যারিয়ান তীর্থক্ষেত্রে ভক্তরা ক্রুপাসানম মাতার উপাসনা করেন এবং মেরিয়ান চুক্তির মাধ্যমে চিকিৎসা, শান্তি ও ঈশ্বরীয় কৃপা অনুভব করেন।",
  button: "গল্পগুলো অন্বেষণ করুন",
},

ta: {
  title: "நம்பிக்கையின் சக்தியை அனுபவியுங்கள்",
  introText: "கேரளாவின் ஆலப்புழாவில் உள்ள மரியன் திருக்கோயிலில் பக்தர்கள் க்ருபாசனம் மாதாவை வணங்கி, மரியன் ஒப்பந்தத்தின் மூலம் குணம், அமைதி மற்றும் இறைவனின் அருளை அனுபவிக்கிறார்கள்.",
  button: "கதைகளை காண்க",
},

te: {
  title: "నమ్మక శక్తిని సాక్ష్యంగా చూడండి",
  introText: "కెరళా, అలప్పుజా లోని మేరియ‌న్ పుణ్యక్షేత్రంలో భక్తులు క్రుపాసనమ్ మాతను గౌరవిస్తూ, మేరియ‌న్ ఒప్పందం ద్వారా వైద్యం, శాంతి మరియు దైవిక కృపను అనుభవిస్తున్నారు.",
  button: "కథనాలను అన్వేషించండి",
},

fr: {
  title: "Témoignez de la puissance\nde la foi en action",
  introText: "Au sanctuaire marial d'Alappuzha, au Kerala, les fidèles vénèrent Notre-Dame de Kreupasanam et vivent la guérison, la paix et la grâce divine grâce au Pacte Marian.",
  button: "Explorer les témoignages",
},

es: {
  title: "Sé testigo del poder\nde la fe en acción",
  introText: "En el Santuario Mariano de Alappuzha, Kerala, los fieles veneran a Nuestra Señora de Kreupasanam y experimentan sanación, paz y gracia divina a través del Pacto Mariano.",
  button: "Explorar historias",
},

mr: {
  title: "विश्वासाच्या शक्तीचा साक्षीदार व्हा",
  introText: "केरळमधील अलप्पुझा येथील मेरीयन तीर्थक्षेत्रात भक्त क्रुपासनम माताची उपासना करतात आणि मेरीयन कराराद्वारे उपचार, शांती आणि दैवी कृपेचा अनुभव घेतात.",
  button: "कथा शोधा",
},

kn: {
  title: "ಧರ್ಮದ ಶಕ್ತಿಗೆ ಸಾಕ್ಷಿಯಾದಿರಿ",
  introText: "ಕೇರಳದ ಅಲ್ಪುಜಾದಲ್ಲಿ ಇರುವ ಕ್ರುಪಾಸನಮ್ ಮೆರಿಯನ್ ಧಾರ್ಮಿಕ ಕ್ಷೇತ್ರದಲ್ಲಿ ಭಕ್ತರು ಮೆರಿಯನನ್ನು ಪೂಜಿಸುತ್ತಾರೆ ಮತ್ತು ಮೆರಿಯನ್ ಒಪ್ಪಂದದ ಮೂಲಕ ಚಿಕಿತ್ಸೆ, ಶಾಂತಿ ಮತ್ತು ದೈವಿಕ ಅನುಗ್ರಹವನ್ನು ಅನುಭವಿಸುತ್ತಾರೆ.",
  button: "ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
}

};

