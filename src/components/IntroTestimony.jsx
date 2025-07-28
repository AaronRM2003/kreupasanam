import "./IntroTestimony.css";

export default function TestimonyVerseCard({ lang = 'en' }) {
  const t = translations[lang] || translations['en'];

  return (
    <div className="testimony-container">
      <div className="verse-box">
        <p className="verse-text">{t.verse}</p>
        <p className="verse-ref">{t.ref}</p>
      </div>

      <div className="testimony-description">
        <p>{t.description}</p>
      </div>
    </div>
  );
}

const translations = {
  en: {
    verse: "“They overcame him by the blood of the Lamb and by the word of their testimony.”",
    ref: "— Revelation 12:11",
    description:
      "Every testimony shared here is a light shining through the darkness—a story of faith, healing, and the living power of Jesus Christ. These real stories speak louder than words, and may they inspire your journey too."
  },
  hi: {
    verse: "“उन्होंने मेमने के रक्त और अपनी गवाही के वचन से उसे परास्त किया।”",
    ref: "— प्रकाशितवाक्य 12:11",
    description:
      "यहाँ साझा हर गवाही अंधकार में एक रोशनी की तरह है—विश्वास, उपचार, और यीशु मसीह की जीवित शक्ति की कहानी। ये सच्ची कहानियाँ शब्दों से ज़्यादा प्रभावशाली हैं, और आपकी यात्रा को भी प्रेरित करें।"
  },
  zh: {
    verse: "“他们因羔羊的血和所作见证的话胜过了他。”",
    ref: "— 启示录 12:11",
    description:
      "这里分享的每一个见证都是穿透黑暗的光芒——关于信仰、医治和耶稣基督活力的故事。这些真实的故事胜过千言万语，也愿它们激励你的信仰旅程。"
  },
  bn: {
    verse: "“তারা মেষশাবকের রক্ত দ্বারা এবং তাদের সাক্ষ্যের বাক্য দ্বারা তাকে জয়ী হলো।”",
    ref: "— প্রকাশিত বাক্য ১২:১১",
    description:
      "এখানে প্রতিটি সাক্ষ্য অন্ধকারে একটি আলোর মতো—বিশ্বাস, নিরাময় এবং যীশু খ্রিষ্টের জীবন্ত শক্তির গল্প। এই বাস্তব গল্পগুলো শব্দের চেয়ে বেশি শক্তিশালী, এবং এগুলো আপনার যাত্রাকেও অনুপ্রাণিত করুক।"
  },
  ta: {
    verse: "“அவர்கள் முட்டாளின் ரத்தத்தாலும் அவர்களின் சாட்சி வார்த்தையாலும் அவனை வென்றனர்.”",
    ref: "— வெளிப்பாடு 12:11",
    description:
      "இங்கே பகிரப்படும் ஒவ்வொரு சாட்சியும் இருண்டோரத்தில் ஒளியாகும் — நம்பிக்கை, குணம் மற்றும் இயேசு கிறிஸ்துவின் உயிருள்ள சக்தியின் கதை. இந்த உண்மையான கதைகள் வார்த்தைகளுக்கு மேல் பேசுகின்றன, உங்கள் பயணத்தையும் ஊக்குவிக்கட்டும்."
  },
  te: {
    verse: "“ఆమెష్కార రక్తము మరియు వారి సాక్షి వాక్యముతో వారు అతన్ని జయించెను.”",
    ref: "— ఉహాపన 12:11",
    description:
      "ఇక్కడ పంచుకున్న ప్రతి సాక్ష్యం అంధకారంలో వెలుగుగా ఉంటుంది — నమ్మకం, బాగా తేలికపరచుట మరియు యేసు క్రీస్తు యొక్క జీవ శక్తి కథ. ఈ నిజమైన కథలు మాటలకంటే గొప్పగా మాట్లాడతాయి, మరియు మీ ప్రయాణాన్నీ ప్రేరేపించగలవు."
  },
  fr: {
    verse: "« Ils l’ont vaincu par le sang de l’Agneau et par la parole de leur témoignage. »",
    ref: "— Apocalypse 12:11",
    description:
      "Chaque témoignage partagé ici est une lumière dans les ténèbres — une histoire de foi, de guérison et de la puissance vivante de Jésus-Christ. Ces récits réels parlent plus fort que les mots, et puissent-ils inspirer votre propre chemin."
  },
  es: {
    verse: "“Ellos lo vencieron por la sangre del Cordero y por la palabra de su testimonio.”",
    ref: "— Apocalipsis 12:11",
    description:
      "Cada testimonio compartido aquí es una luz que brilla en la oscuridad—una historia de fe, sanación y el poder vivo de Jesucristo. Estas historias reales hablan más fuerte que las palabras, y que también inspiren tu camino."
  },
  mr: {
    verse: "“ते मेंढपाशाच्या रक्ताने आणि त्यांच्या साक्षीच्या शब्दाने त्याचा पराभव केला.”",
    ref: "— प्रकटीकरण १२:११",
    description:
      "येथे शेअर केलेली प्रत्येक साक्ष अंधारात प्रकाशासारखी आहे—विश्वास, उपचार आणि येशू ख्रिस्ताच्या जिवंत शक्तीची कहाणी. या खरी कथा शब्दांपेक्षा जास्त प्रभावी आहेत आणि तुमच्या प्रवासालाही प्रेरणा देतील."
  },
  kn: {
    verse: "“ಅವರು ಕುರಿದ ರಕ್ತದಿಂದ ಮತ್ತು ತಮ್ಮ ಸಾಕ್ಷಿ ಮಾತಿನಿಂದ ಅವನನ್ನು ಗೆದ್ದರು.”",
    ref: "— ಪ್ರಕಟಿತವಾದ 12:11",
    description:
      "ಇಲ್ಲಿ ಹಂಚಿಕೊಂಡಿರುವ ಪ್ರತಿಯೊಂದು ಸಾಕ್ಷಿ ಕತ್ತಲೆಯಲ್ಲೊಂದು ಬೆಳಕಾಗಿದೆ—ನಂಬಿಕೆ, ಚೇತರಿಕೆ ಮತ್ತು ಯೇಸು ಕ್ರಿಸ್ತನ ಜೀವಂತ ಶಕ್ತಿಯ ಕಥೆ. ಈ ನಿಜವಾದ ಕಥೆಗಳು ಮಾತುಗಳಿಂದ ಹೆಚ್ಚು ಪ್ರಭಾವಶಾಲಿ, ಮತ್ತು ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಕೂಡ ಪ್ರೇರೇಪಿಸಲಿ."
  }
};
