import React, { useState, useEffect,useRef } from 'react';
import styles from './About.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const translations = {
  hi: {
    heading: 'परिचय',
    introheading: 'मेरे बारे में',
    intro: 'मैं क्रेउपासानम में एक वाचा धारक हूँ। यह ',
    note: 'आधिकारिक पृष्ठ नहीं है',
    description: ', बल्कि गैर-मलयाली बोलने वालों की मदद के लिए बनाया गया एक सरल वेबसाइट है।',
    contact: 'यदि आपके पास कोई सुझाव, प्रतिक्रिया या समस्या है, तो कृपया मुझसे संपर्क करें।',

    missionHeading: 'उद्देश्य',
    mission: 'उद्देश्य यह है कि गैर-मलयाली लोग क्रेउपासानम की सामग्री को आसानी से समझ सकें।',

    howItWorksHeading: 'कैसे उपयोग करें?',
    howItWorksItems: [
      'वह वीडियो ढूंढें जिसे आप देखना चाहते हैं।',
      'आपके लिए उपयुक्त उपशीर्षक भाषा चुनें।',
      'यदि चाहें तो आपका डिवाइस उपशीर्षकों को पढ़ सकता है।',
      'आप प्रत्येक वीडियो के नीचे दिए गए सारांश को भी पढ़ सकते हैं।',
    ],

    contentheading: 'सामग्री',
    acknowledgements: 'अनुवाद AI, Google और मैनुअल इनपुट्स के माध्यम से किए गए हैं।',

    privacy: 'हम आपकी गोपनीयता का सम्मान करते हैं। केवल स्वैच्छिक प्रतिक्रिया सबमिशन के अलावा कोई व्यक्तिगत डेटा एकत्र नहीं किया जाता है।',

    faqHeading: 'सामान्य प्रश्न',
    faq: [
      {
        question: 'क्या यह एक आधिकारिक साइट है?',
        answer: 'नहीं, यह एक अनौपचारिक वेबसाइट है जो अनुवाद में मदद करती है।',
      },
      {
        question: 'क्या अनुवाद सटीक हैं?',
        answer: 'कुछ शब्दों, स्थानों या वाचा से संबंधित शब्दों में त्रुटियाँ हो सकती हैं, जैसा कि अस्वीकरण में बताया गया है।',
      },
    ],
  },

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

  zh: {
    heading: '关于',
    introheading: '关于我',
    intro: '我是Kreupasanam的契约承诺者。这是一个',
    note: '非官方网站',
    description: '，只是一个帮助非马拉雅拉姆语使用者理解语言的简单网站。',
    contact: '如果您有任何反馈、建议或发现任何问题，请随时与我联系。',

    missionHeading: '意图',
    mission: '我们的意图是帮助非马拉雅拉姆语者轻松理解Kreupasanam的内容。',

    howItWorksHeading: '如何使用？',
    howItWorksItems: [
      '找到您想观看的视频。',
      '选择适合您的字幕语言。',
      '如果您愿意，设备的文本转语音功能可以朗读字幕。',
      '您还可以阅读每个视频下面的摘要以更好地理解。',
    ],

    contentheading: '内容',
    acknowledgements: '翻译由AI、Google和人工输入完成。',

    privacy: '我们尊重您的隐私。除自愿反馈提交外，本网站不收集任何个人数据。',

    faqHeading: '常见问题',
    faq: [
      {
        question: '这是官方网站吗？',
        answer: '不是，这是一个帮助翻译的非官方网页。',
      },
      {
        question: '翻译准确吗？',
        answer: '可能存在一些不准确，特别是一些名称、地点或契约相关的词汇，如免责声明中所述。',
      },
    ],
  },

  bn: {
    heading: 'পরিচিতি',
    introheading: 'আমার সম্পর্কে',
    intro: 'আমি ক্রেউপাসানামে একটি কর্নার্ট গ্রহণকারী। এটি একটি ',
    note: 'সরকারি পৃষ্ঠা নয়',
    description: ', তবে একটি সাধারণ ওয়েবসাইট যা মালয়ালম ভাষাভাষী নয় এমনদের সাহায্যের জন্য তৈরি করা হয়েছে।',
    contact: 'আপনার কোন প্রতিক্রিয়া, পরামর্শ বা সমস্যা থাকলে দয়া করে আমার সাথে যোগাযোগ করুন।',

    missionHeading: 'উদ্দেশ্য',
    mission: 'উদ্দেশ্য হল মালয়ালম ভাষাভাষী নয় এমন লোকেদের ক্রেউপাসানাম বিষয়বস্তু সহজে বোঝার জন্য সাহায্য করা।',

    howItWorksHeading: 'কিভাবে ব্যবহার করবেন?',
    howItWorksItems: [
      'আপনি যে ভিডিওটি দেখতে চান তা খুঁজুন।',
      'আপনার জন্য উপযুক্ত সাবটাইটেল ভাষা নির্বাচন করুন।',
      'আপনার ডিভাইসের টেক্সট-টু-স্পিচ ফিচার সাবটাইটেল পড়তে পারে।',
      'আপনি প্রতিটি ভিডিওর নিচে দেওয়া সারাংশ পড়েও ভালোভাবে বুঝতে পারেন।',
    ],

    contentheading: 'বিষয়বস্তু',
    acknowledgements: 'অনুবাদগুলি AI, Google, এবং ম্যানুয়াল ইনপুট দিয়ে করা হয়েছে।',

    privacy: 'আমরা আপনার গোপনীয়তার সম্মান করি। স্বেচ্ছাসেবী প্রতিক্রিয়া জমা ছাড়া কোনও ব্যক্তিগত তথ্য সংগ্রহ করা হয় না।',

    faqHeading: 'সাধারণ প্রশ্ন',
    faq: [
      {
        question: 'এটি কি একটি সরকারি সাইট?',
        answer: 'না, এটি একটি অনানুষ্ঠানিক ওয়েবসাইট যা অনুবাদে সাহায্য করে।',
      },
      {
        question: 'অনুবাদগুলি সঠিক?',
        answer: 'কিছু অনির্দিষ্টতা থাকতে পারে, বিশেষ করে নাম, স্থান বা কর্নার্ট সম্পর্কিত শব্দাবলীতে, যেমন ডিসক্লেমারে উল্লেখ করা হয়েছে।',
      },
    ],
  },

  ta: {
    heading: 'குறித்தாக',
    introheading: 'என்னை பற்றி',
    intro: 'நான் கிரூபாசனம் என்ற உடன்படிக்கையாளர். இது ஒரு ',
    note: 'அதிகாரப்பூர்வமான பக்கம் அல்ல',
    description: 'மற்றும் மலையாளம் பேசாதவர்கள் மொழியை புரிந்துகொள்ள உதவும் ஒரு எளிய வலைத்தளம்.',

    contact: 'உங்களுக்கு ஏதேனும் கருத்துகள், பரிந்துரைகள் அல்லது பிரச்சனைகள் இருந்தால், தயவுசெய்து என்னை தொடர்பு கொள்ளுங்கள்.',

    missionHeading: 'நோக்கம்',
    mission: 'மலையாளத்திலிருந்து தாராளமில்லாதவர்கள் கிரூபாசனம் உள்ளடக்கத்தை எளிதாக புரிந்து கொள்ள உதவுவது நோக்கம்.',

    howItWorksHeading: 'எப்படிப் பயன்படுத்துவது?',
    howItWorksItems: [
      'நீங்கள் பார்க்க விரும்பும் வீடியோவைத் தேர்ந்தெடுக்கவும்.',
      'உங்களுக்கு பொருத்தமான உபதலை மொழியைத் தேர்ந்தெடுக்கவும்.',
      'உங்கள் சாதனத்தின் உரை-மொழி மாற்றுதல் அம்சம் உபதலை வாசிக்க முடியும்.',
      'ஒவ்வொரு வீடியோவிற்கும் கீழே உள்ள சுருக்கத்தை வாசித்து மேலும் புரிந்துகொள்ளலாம்.',
    ],

    contentheading: 'உள்ளடக்கம்',
    acknowledgements: 'மொழிபெயர்ப்புகள் AI, Google மற்றும் கையேடு உள்ளீடுகள் மூலம் செய்யப்பட்டவை.',

    privacy: 'நாங்கள் உங்கள் தனியுரிமையை மதிக்கின்றோம். தன்னிச்சையான கருத்துப்பதிவுகளை தவிர வேறு எந்த தனிப்பட்ட தரவையும் சேகரிக்கவில்லை.',

    faqHeading: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    faq: [
      {
        question: 'இது அதிகாரப்பூர்வமான தளமா?',
        answer: 'இல்லை, இது மொழிபெயர்ப்பில் உதவும் ஒரு அதிகாரப்பூர்வமற்ற இணையதளம்.',
      },
      {
        question: 'மொழிபெயர்ப்புகள் துல்லியமாக உள்ளதா?',
        answer: 'சில பெயர்கள், இடங்கள் அல்லது உடன்படிக்கை தொடர்பான சொற்களில் தவறுகள் இருக்கலாம், தயவுசெய்து மறுப்பு அறிக்கையை பார்க்கவும்.',
      },
    ],
  },

  te: {
    heading: 'గురించి',
    introheading: 'నా గురించి',
    intro: 'నేను క్రెఉపసనం లో ఒక కవరెనెంట్ తీసుకున్నవాణ్ని. ఇది ఒక ',
    note: 'అధికారిక పేజీ కాదు',
    description: 'కానీ మలయాళం మాట్లాడని వారికి భాషను అర్థం చేసుకోవడానికి సులభం చేయడానికి సాదారణ వెబ్‌సైట్.',

    contact: 'మీకు ఏవైనా అభిప్రాయాలు, సూచనలు లేదా సమస్యలు ఉంటే దయచేసి నాకు సంప్రదించండి.',

    missionHeading: 'ప్రయోజనం',
    mission: 'మలయాళం మాట్లాడని వారు క్రెఉపసనం విషయాలను సులభంగా అర్థం చేసుకునేందుకు ఈ ప్రయత్నం.',

    howItWorksHeading: 'ఎలా ఉపయోగించాలి?',
    howItWorksItems: [
      'మీరు చూడాలనుకునే వీడియోను కనుగొనండి.',
      'మీకు సరిపోయే సబ్‌టైటిల్ భాషను ఎంచుకోండి.',
      'మీ పరికరం సబ్‌టైటిల్స్‌ను చదవగలదు.',
      'ప్రతి వీడియో కింద ఇచ్చిన సారాంశాన్ని చదవండి.',
    ],

    contentheading: 'విషయం',
    acknowledgements: 'అనువాదాలు AI, Google మరియు మాన్యువల్ ఇన్పుట్‌ల ద్వారా చేయబడినవి.',

    privacy: 'మేము మీ గోప్యతను గౌరవిస్తాము. స్వచ్ఛంద అభిప్రాయం సమర్పణలను తప్పించి వ్యక్తిగత డేటా సేకరించము.',

    faqHeading: 'తీసుకున్న ప్రశ్నలు',
    faq: [
      {
        question: 'ఇది అధికారిక సైట్嗎?',
        answer: 'కాదు, ఇది అనువాదాల్లో సహాయంగా ఉండే అప్రామాణిక వెబ్‌సైట్.',
      },
      {
        question: 'అనువాదాలు ఖచ్చితంగా ఉన్నాయా?',
        answer: 'కొన్ని పేర్లు, ప్రదేశాలు లేదా కవరెనెంట్ సంబంధిత పదాలలో పొరపాట్లు ఉండవచ్చు, మినహాయింపు ప్రకటనలో చెప్పినట్లుగా.',
      },
    ],
  },

  fr: {
    heading: 'À propos',
    introheading: 'À propos de moi',
    intro: 'Je suis un contractant dans Kreupasanam. Ceci est une ',
    note: 'page non officielle',
    description:
      ', mais un site simple créé pour aider les non-malayalamophones à comprendre la langue.',
    contact:
      'Si vous avez des commentaires, des suggestions ou si vous constatez des problèmes, n’hésitez pas à me contacter.',

    missionHeading: 'Intention',
    mission:
      'L’intention est d’aider les non-malayalais à comprendre facilement le contenu de Kreupasanam.',

    howItWorksHeading: 'Comment utiliser?',
    howItWorksItems: [
      'Trouvez la vidéo que vous souhaitez regarder.',
      'Choisissez la langue des sous-titres qui vous convient.',
      'Si vous le souhaitez, la fonction de synthèse vocale de votre appareil peut lire les sous-titres.',
      'Vous pouvez également lire le résumé sous chaque vidéo pour mieux comprendre.',
    ],

    contentheading: 'Contenu',
    acknowledgements: 'Les traductions ont été réalisées à l’aide de l’IA, de Google et d’entrées manuelles.',

    privacy:
      'Nous respectons votre vie privée. Aucune donnée personnelle n’est collectée via ce site, sauf pour les retours volontaires.',

    faqHeading: 'FAQ',
    faq: [
      {
        question: 'Est-ce un site officiel?',
        answer: 'Non, il s’agit d’un site non officiel destiné à aider à la traduction.',
      },
      {
        question: 'Les traductions sont-elles précises?',
        answer:
          'Il peut exister quelques inexactitudes, en particulier avec les noms, les lieux ou les termes liés au contrat, comme mentionné dans la clause de non-responsabilité.',
      },
    ],
  },

  es: {
    heading: 'Acerca de',
    introheading: 'Sobre mí',
    intro: 'Soy un tomador de pacto en Kreupasanam. Esto es ',
    note: 'no es una página oficial',
    description:
      ', sino un sitio web simple creado para ayudar a quienes no hablan malayalam a entender el idioma.',
    contact:
      'Si tiene algún comentario, sugerencia o nota algún problema, no dude en contactarme.',

    missionHeading: 'Intención',
    mission:
      'La intención es ayudar a quienes no hablan malayalam a entender fácilmente el contenido de Kreupasanam.',

    howItWorksHeading: '¿Cómo usar?',
    howItWorksItems: [
      'Encuentra el video que quieres ver.',
      'Elige el idioma de los subtítulos que prefieras.',
      'Si quieres, la función de texto a voz de tu dispositivo puede leer los subtítulos.',
      'También puedes leer el resumen debajo de cada video para entender mejor.',
    ],

    contentheading: 'Contenido',
    acknowledgements: 'Las traducciones se realizaron con IA, Google e insumos manuales.',

    privacy:
      'Respetamos su privacidad. No se recopilan datos personales a través de este sitio, excepto por envíos voluntarios.',

    faqHeading: 'Preguntas frecuentes',
    faq: [
      {
        question: '¿Es este un sitio oficial?',
        answer: 'No, este es un sitio no oficial para ayudar con las traducciones.',
      },
      {
        question: '¿Son precisas las traducciones?',
        answer:
          'Puede haber algunas imprecisiones, especialmente con nombres, lugares o términos relacionados con el pacto, como se menciona en el descargo de responsabilidad.',
      },
    ],
  },

  mr: {
    heading: 'आमच्याबद्दल',
    introheading: 'माझ्याबद्दल',
    intro: 'मी क्रेउपासनाममधील एक करारधारक आहे. हे ',
    note: 'अधिकृत पृष्ठ नाही',
    description: ', परंतु हे एक साधे संकेतस्थळ आहे जे गैर-मलयाळी बोलणाऱ्यांना भाषा समजून घेण्यासाठी तयार केले आहे.',
    contact: 'आपल्याला काही अभिप्राय, सूचना किंवा समस्या असल्यास कृपया मला संपर्क करा.',

    missionHeading: 'उद्दिष्ट',
    mission: 'उद्दिष्ट आहे की गैर-मलयाळी लोक Kreupasanam सामग्री सहज समजू शकतील.',

    howItWorksHeading: 'कसे वापरावे?',
    howItWorksItems: [
      'आपण पाहू इच्छित व्हिडिओ शोधा.',
      'आपल्यासाठी योग्य असलेली उपशीर्षक भाषा निवडा.',
      'आपल्या उपकरणाचा मजकूर-ते-आवाज वैशिष्ट्य उपशीर्षक वाचू शकतो.',
      'प्रत्येक व्हिडिओखाली दिलेल्या सारांशाला वाचा जेणेकरून चांगले समजता येईल.',
    ],

    contentheading: 'सामग्री',
    acknowledgements: 'अनुवाद AI, Google आणि मॅन्युअल इनपुट्सद्वारे केले गेले आहेत.',

    privacy: 'आम्ही आपल्या गोपनीयतेचा आदर करतो. स्वैच्छिक अभिप्राय सादरीकरणांशिवाय कोणताही वैयक्तिक डेटा गोळा केला जात नाही.',

    faqHeading: 'सामान्य प्रश्न',
    faq: [
      {
        question: 'हे अधिकृत साइट आहे का?',
        answer: 'नाही, हे अनधिकृत संकेतस्थळ आहे जे अनुवादात मदत करते.',
      },
      {
        question: 'अनुवाद अचूक आहेत का?',
        answer: 'काही नाम, ठिकाणे किंवा कराराशी संबंधित शब्दांमध्ये त्रुटी असू शकतात, जसे की अस्वीकरणात नमूद आहे.',
      },
    ],
  },

  kn: {
    heading: 'ಬಗ್ಗೆ',
    introheading: 'ನನ್ನ ಬಗ್ಗೆ',
    intro: 'ನಾನು ಕ್ರೆಯುಪಸನಮ್‌ನಲ್ಲಿ ಒಪ್ಪಂದಗಾರನಾಗಿದ್ದೇನೆ. ಇದು ಒಂದು ',
    note: 'ಅಧಿಕೃತ ಪುಟವಲ್ಲ',
    description: 'ಆದರೆ ಇದು ಮಲಯಾಳಂ ಮಾತಾಡದವರಿಗೆ ಭಾಷೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವ ಸರಳ ವೆಬ್‌ಸೈಟ್.',

    contact: 'ನಿಮ್ಮ ಬಳಿ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆ, ಸಲಹೆ ಅಥವಾ ಸಮಸ್ಯೆಗಳಿದ್ದರೆ ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಿ.',

    missionHeading: 'ಉದ್ದೇಶ',
    mission: 'ಮಲಯಾಳಂ ಅಲ್ಲದವರು ಕ್ರೆಯುಪಸನಮ್ ವಿಷಯವನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವುದು ಉದ್ದೇಶವಾಗಿದೆ.',

    howItWorksHeading: 'ಹೆಗೆ ಬಳಸುವುದು?',
    howItWorksItems: [
      'ನೀವು ನೋಡಲು ಬಯಸುವ ವೀಡಿಯೋವನ್ನು ಹುಡುಕಿ.',
      'ನಿಮಗೆ ಸೂಕ್ತವಾದ ಸಬ್‌ಟೈಟಲ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      'ನಿಮ್ಮ ಸಾಧನದ ಪಠ್ಯ-ಧ್ವನಿ ವೈಶಿಷ್ಟ್ಯವು ಸಬ್‌ಟೈಟಲ್ಗಳನ್ನು ಓದಬಹುದು.',
      'ಪ್ರತಿ ವೀಡಿಯೋ ಕೆಳಗೆ ನೀಡಲಾದ ಸಾರಾಂಶವನ್ನು ಓದಿ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ.',
    ],

    contentheading: 'ವಿಷಯ',
    acknowledgements: 'ಅನುವಾದಗಳು AI, Google ಮತ್ತು ಕೈಯಿಂದ ಮಾಡಿದ ಇನ್ಪುಟ್‌ಗಳ ಮೂಲಕ ನಡೆದಿವೆ.',

    privacy: 'ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತೇವೆ. ಸ್ವಯಂಸೇವಕ ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಕೆಯನ್ನು ಹೊರತುಪಡಿಸಿ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',

    faqHeading: 'ಅಕಸ್ಮಾತ್ ಪ್ರಶ್ನೆಗಳು',
    faq: [
      {
        question: 'ಇದು ಅಧಿಕೃತ ತಾಣವೇ?',
        answer: 'ಇಲ್ಲ, ಇದು ಅನೌಪಚಾರಿಕ ವೆಬ್‌ಸೈಟ್ ಆಗಿದ್ದು, ಅನುವಾದಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      },
      {
        question: 'ಅನುವಾದಗಳು ನಿಖರವಾಗಿವೆಯೇ?',
        answer: 'ಹೆಸರುಗಳು, ಸ್ಥಳಗಳು ಅಥವಾ ಒಪ್ಪಂದ ಸಂಬಂಧಿತ ಪದಗಳಲ್ಲಿ ಕೆಲವು ತಪ್ಪುಗಳಿರಬಹುದು, ಈ ನಿರಾಕರಣೆಯಲ್ಲಿ ಸೂಚಿಸಲಾಗಿದೆ.',
      },
    ],
  },
};

// Reusable ScrollHoverCard component for hover-like scroll animation on mobile
function ScrollHoverCard({ children, className }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: '-30% 0px -30% 0px', // wider margin, less frequent triggers
  });

  const debounceRef = useRef(null);

  useEffect(() => {
    // For desktop, just set once
    if (window.innerWidth >= 768) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
      return;
    }

    // For mobile, debounce to avoid rapid animation triggers
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          y: -3, // smaller movement for less work
          transition: { duration: 0.3, ease: 'easeOut' },
        });
      } else {
        controls.start({
          opacity: 0.7, // less opacity change for smoother look
          y: 5,
          transition: { duration: 0.3, ease: 'easeOut' },
        });
      }
    }, 100); // 100ms debounce

    // Cleanup timeout on unmount
    return () => clearTimeout(debounceRef.current);
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.7, y: 5 }}
      animate={controls}
      style={{ willChange: 'transform, opacity' }} // helps GPU acceleration
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
