import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./IntroSection.css";
import heroImage from "../assets/kreupasanammother1.png";

// Example translations object (you should replace this with your actual one)

export default function IntroSection({ lang = 'en' }) {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/testimonies`);

  const t = translations[lang] || translations['en']; // fallback to English

  return (
    <section className="introBox1 animated-glow">
      <Container>
        <Row className="d-flex align-items-center justify-content-between flex-wrap">
          <Col xs={12} md={6} className="image-wrapper order-1 order-md-1">
            <img
              src={heroImage}
              alt="Testimony intro"
              className="img-fluid rounded-4 shadow-lg"
            />
          </Col>

          <Col xs={12} md={6} className="text-content order-2 order-md-2">
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
    introText: "Our Lady of Kreupasanam, venerated at the Marian Shrine in Alappuzha, Kerala, has been a beacon of healing, peace, and miraculous intercession for thousands. Through the Marian Covenant, the faithful experience profound spiritual renewal and divine intervention.",
    button: "Explore Stories",
  },
  hi: {
    title: "विश्वास की शक्ति का साक्षी बनें\nक्रिया में",
    introText: "केरल के अलप्पुझा के मैरियन श्राइन में पूजित क्रेउपासनम माता हजारों लोगों के लिए उपचार, शांति और चमत्कारिक मध्यस्थता का प्रतीक रही हैं। मैरियन संधि के माध्यम से श्रद्धालु गहरे आध्यात्मिक नवीनीकरण और दिव्य हस्तक्षेप का अनुभव करते हैं।",
    button: "कहानियां खोजें",
  },
  zh: {
    title: "见证信仰的力量\n在行动中彰显",
    introText: "我们的克鲁帕萨南圣母，受人尊敬于喀拉拉邦阿拉普扎的玛丽亚圣地，是成千上万人康复、和平与奇迹代祷的灯塔。通过玛丽亚圣约，信徒们体验深刻的灵性更新和神圣的介入。",
    button: "探索故事",
  },
  bn: {
    title: "বিশ্বাসের শক্তির সাক্ষী হন\nকর্মে বিশ্বাসের শক্তি",
    introText: "আমাদের করূপসানম মাদার, যিনি আলাপুজা, কেরালার মেরিয়ান শ্রাইন-এ পূজিত, হাজার হাজার মানুষের জন্য আরোগ্য, শান্তি এবং অলৌকিক মধ্যস্থতার এক দীপ্তিময় আলোকস্তম্ভ। মেরিয়ান চুক্তির মাধ্যমে ভক্তরা গভীর আধ্যাত্মিক পুনর্জন্ম এবং ঈশ্বরীয় হস্তক্ষেপ অনুভব করেন।",
    button: "গল্প অন্বেষণ করুন",
  },
  ta: {
    title: "நம்பிக்கையின் சக்தியை\nசெயலில் காணுங்கள்",
    introText: "அலப்புழா, கேரளாவில் உள்ள மரியான் திருத்தலத்தில் பாராட்டப்படும் எங்கள் கிருபாசனம் அன்னை ஆயிரக்கணக்கான மக்களுக்கு குணமடைதல், அமைதி மற்றும் அதிசயத் தழுவலுக்கான வெளிச்சமாக இருக்கிறார். மரியான் ஒப்பந்தத்தின் மூலம் விசுவாசிகள் ஆழ்ந்த ஆன்மீக புதுப்பிப்பு மற்றும் தெய்வீக தலையீட்டை அனுபவிக்கிறார்கள்.",
    button: "கதைகளை ஆராயுங்கள்",
  },
  te: {
    title: "ఆధ్యాత్మిక విశ్వాస శక్తిని\nక్రియలో చూడండి",
    introText: "అలప్పుజా, కేరళలోని మేరియన్ పుణ్యక్షేత్రంలో పూజించబడే మా క్రూపాసనం అమ్మాయి వేల మందికి ఆరోగ్యం, శాంతి మరియు అద్భుత మద్యస్థతకు దీపస్థంభంగా నిలుస్తోంది. మేరియన్ ఒప్పందం ద్వారా భక్తులు లోతైన ఆధ్యాత్మిక పునరుత్పత్తి మరియు దివ్య జోక్యం అనుభవిస్తారు.",
    button: "కథలను అన్వేషించండి",
  },
  fr: {
    title: "Découvrez la puissance\nde la foi en action",
    introText: "Notre Dame de Kreupasanam, vénérée au sanctuaire marial d’Alappuzha, Kerala, est un phare de guérison, de paix et d’intercession miraculeuse pour des milliers de personnes. Grâce à la Alliance Mariale, les fidèles vivent un profond renouveau spirituel et une intervention divine.",
    button: "Explorer les témoignages",
  },
  es: {
    title: "Sé testigo del poder\nde la fe en acción",
    introText: "Nuestra Señora de Kreupasanam, venerada en el Santuario Mariano en Alappuzha, Kerala, ha sido un faro de sanación, paz e intercesión milagrosa para miles. A través del Pacto Mariano, los fieles experimentan una profunda renovación espiritual e intervención divina.",
    button: "Explorar historias",
  },
  mr: {
    title: "विश्वासाच्या शक्तीचे साक्षीदार बना\nकार्यवाहीत विश्वास",
    introText: "आमची क्रुपासनम माता, केरळमधील अलापुझा येथील मेरीयन मंदिरात पूजल्या जातात, हजारो लोकांसाठी आरोग्य, शांतता आणि चमत्कारिक मध्यस्थतेचा प्रकाशस्तंभ ठरल्या आहेत. मेरीयन कराराद्वारे भक्तांना खोल आध्यात्मिक नूतनीकरण आणि दैवी हस्तक्षेप अनुभवता येतो.",
    button: "कथा शोधा",
  },
  kn: {
    title: "ನಂಬಿಕೆಯ ಶಕ್ತಿಯನ್ನು\nಕ್ರಿಯೆಯಲ್ಲಿ ಸಾಕ್ಷಿಯಾಗಿರಿ",
    introText: "ಕರ್ನಾಟಕದ ಅಲ್ಪುಜ್ಜಾದ ಮೇರಿ ಶ್ರೈನ್‌ನಲ್ಲಿ ಪೂಜಿಸಲ್ಪಡುವ ನಮ್ಮ ಕೃಪಾಸನಮ್ಮ ಅನೇಕರಿಗೆ ಗುಣಮುಖ, ಶಾಂತಿ ಮತ್ತು ಅದ್ಭುತ ಮಧ್ಯಸ್ಥಿಕೆ beacon ಆಗಿದ್ದಾರೆ. ಮೇರಿ ಒಪ್ಪಂದದ ಮೂಲಕ ಭಕ್ತರು ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ನವೀಕರಣ ಮತ್ತು ದಿವ್ಯ ಹಸ್ತಕ್ಷೇಪವನ್ನು ಅನುಭವಿಸುತ್ತಾರೆ.",
    button: "ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
  },
};
