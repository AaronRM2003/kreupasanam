import { ViteReactSSG } from "vite-react-ssg";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { NavLink, useNavigate, useParams, Link, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import { Dropdown, Container, Row, Col, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaEnvelope, FaFacebookF, FaWhatsapp, FaTelegramPlane, FaRegCopy, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { GiDove } from "react-icons/gi";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiOutlineEmojiSad } from "react-icons/hi";
function AppBar({ lang }) {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);
  const navRef = useRef(null);
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const toggleNav = () => setNavOpen((prev) => !prev);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    if (navOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navOpen]);
  const navJSX = /* @__PURE__ */ jsxs("nav", { ref: navRef, className: `nav-links ${navOpen ? "open" : ""}`, children: [
    /* @__PURE__ */ jsx(NavLink, { to: `/${lang}/about`, children: "About" }),
    /* @__PURE__ */ jsx(NavLink, { to: `/${lang}/testimonies`, children: "Testimonies" }),
    /* @__PURE__ */ jsx(NavLink, { to: `/${lang}/oracles`, children: "Oracles" }),
    /* @__PURE__ */ jsx(NavLink, { to: `/${lang}/dhyanam`, children: "Dhyanam" })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "app-bar-wrapper", children: [
    /* @__PURE__ */ jsxs("header", { className: `app-bar ${scrolled ? "scrolled" : ""}`, children: [
      /* @__PURE__ */ jsx("h1", { className: `logo ${scrolled ? "scrolled" : ""}`, children: "Kreupasanam Testimonies" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `menu-toggle ${navOpen ? "active" : ""}`,
          onClick: toggleNav,
          "aria-label": "Toggle navigation",
          children: "☰"
        }
      ),
      (!isMobile || isLandscape) && navJSX
    ] }),
    isMobile && !isLandscape && navJSX
  ] });
}
const testimonies = /* @__PURE__ */ JSON.parse(`[{"id":1,"title":{"en":"Covenant of Strength","bn":"শক্তির চুক্তি","zh":"力量的约定","hi":"शक्ति की प्रतिज्ञा","kn":"ಶಕ್ತಿಯ ಒಡಂಬಡಿಕೆ","mr":"शक्तीचा करार","es":"Pacto de Fortaleza","ta":"சக்தியின் உடன்படிக்கை","te":"శక్తి ఒప్పందం","fr":"Alliance de Force"},"date":"June 27, 2025","video":"https://youtu.be/mIXhPIxxsw4?si=vwTSrG2ggvou9CX2","content":{"en":"Jismadon, a nurse from Kannur now working in Ireland, shares an awe‑inspiring testimony of how the Marian Covenant transformed her life. After facing repeated failures in her OET exam and watching her father battle a severe heart condition, she turned to prayer through the Kreupasanam Covenant. Participating in Akhanda Japamala and clinging to the promises of the Marian Covenant, she witnessed a remarkable shift — her father’s condition improved, and her long‑awaited exam success opened doors for her overseas journey.\\n\\nBut the real storm came when she was diagnosed with Stage 4 ovarian cancer. Doctors gave her little hope. Yet, with unwavering faith and deep surrender, she continued to walk the Covenant path, trusting every step to the intercession of Mother Mary. What followed were undeniable signs of divine grace — minimal side effects from chemotherapy, peaceful healing, and a successful surgery that left even the doctors surprised. Every moment felt carried by something greater, something sacred.\\n\\nJismadon’s story is more than survival — it’s a living miracle. She urges everyone not to give up when darkness strikes, for through the Marian Covenant and the motherly presence felt so powerfully at Kreupasanam, the impossible becomes possible. Her journey is a radiant example of what happens when one clings to heaven’s promises with childlike trust.","bn":"ইরল্যান্ডে কর্মরত কন্নুরের নার্স যিস্মাডন তার জীবনের অবিশ্বাস্য রূপান্তরের সাক্ষ্য ভাগ করেন মারিয়ান করভেন্যান্টের মাধ্যমে। বারবার OET পরীক্ষায় ব্যর্থতা এবং তার বাবার গুরুতর হৃদরোগ দেখলে তিনি ক্রীউপসানম করভেন্যান্টে দীক্ষা নিয়ে প্রার্থনার আশ্রয় নেন। অহঙ্কার্য জপমালায় অংশগ্রহণ করে এবং মারিয়ান করভেন্যান্টের প্রতিশ্রুতিগুলোর সঙ্গে নিবিড়ভাবে যুক্ত হয়ে তিনি অসাধারণ ফলাফল দেখেন — তার বাবার স্বাস্থ‌্য উন্নত হয় এবং পরীক্ষায় সফলতা তাকে বিদেশে যাত্রার পথ খুলে দেয়।\\n\\nকিন্তু আসল ঝড় তখন আসে যখন তিনি স্টেজ ৪ ডিম্বাশয় ক্যান্সার আক্রান্ত হন। ডাক্তাররা খুব কম আশা দেন। তবুও, অনীহা ভাঙা বিশ্বাস ও গভীর আত্মসমর্পণের সঙ্গে, তিনি করভেন্যান্টের পথে এগিয়ে যান, প্রতিটি ধাপ নেদার intercession‑এ বিশ্বাস রেখে। ফলাফল হল ঐশ্বরিক অনুগ্রহের অপ্রতিরোধ্য চিহ্ন — রসায়নোত্তর চিকিৎসার অল্প পার্শ্বপ্রতিক্রিয়া, শান্তিপূর্ণ সুস্থতা, সফল শল্যচিকিৎসা যা ডাক্তারদেরও অবাক করে। প্রতিটি মুহূর্ত অনুভব হত কোনো মহান, কোনো পবিত্র শক্তি দ্বারা পরিচালিত।\\n\\nযিস্মাডনের গল্প শুধু বেঁচে থাকার নয় — এটি একটি জীবন্ত অলৌকিকতা। তিনি সবাইকে অনুরোধ করেন অন্ধকারে হাল ছেড়ে না দিতে, কারণ মারিয়ান করভেন্যান্ট ও ক্রেউপসানমের মাতৃত্বপূর্ণ উপস্থিতির মাধ্যমে অসম্ভব সম্ভব হয়ে ওঠে। তার যাত্রাপথ একটি উজ্জ্বল উদাহরণ যা দেখায় সন্তানের মতো বিশ্বাসে স্বর্গের প্রতিশ্রুতিগুলো ধরে রাখলে কী ঘটে।","zh":"吉斯玛登，一名来自卡纳尔、目前在爱尔兰工作的护士，通过“玛利亚盟约”分享了她那令人惊叹的生命转化见证。在 OET 考试屡次失败、父亲身患重病之际，她投靠克鲁帕萨南盟约，通过参加阿罕达·罗萨祂马拉祈祷会并坚守玛利亚盟约的应许，见证了非凡的转机——父亲康复，考试成功，进而打开了出国工作的道路。\\n\\n真正的风暴发生在她被诊断为第四期卵巢癌时。医生几乎不看好治疗前景。但她凭借坚定的信心和全然的交托，继续走在盟约道路上，把每一步都交托给圣母玛利亚的代祷。随后出现的是不可否认的神恩迹象——化疗几乎没有副作用、她平静地康复、手术成功令医生也为之惊讶。每个瞬间都仿佛被那更伟大、更神圣的力量托起。\\n\\n吉斯玛登的故事不仅仅是存活——它是一段活生生的奇迹。她呼吁大家在黑暗来临时不要放弃，因为通过玛利亚盟约和在克鲁帕萨南所感受到的那种母性临在，不可能也变成可能。她的旅程是一个灿烂的示例，表明当以童真般的信心抓住天堂的应许时，会发生什么。","hi":"कन्नूर की नर्स जिस्माडन, जो वर्तमान में आयरलैंड में कार्यरत हैं, ने मैरियन कॉवेनेंट के माध्यम से अपने जीवन के आश्चर्यजनक परिवर्तन की प्रेरणादायक गवाही दी है। बार‑बार OET परीक्षा में असफलता और पिता की गंभीर हृदय स्थिति का सामना करते हुए, उन्होंने क्रेउपासनाम कॉवेनेंट में विश्‍वास जताकर प्रार्थना की राह अपनाई। अखंड जापमाला में भाग लेकर और मैरियन कॉवेनेंट की प्रतिज्ञाओं पर टिका रहकर उन्होंने अद्भुत परिणाम देखा — उनके पिता का स्वास्थ्य सुधरा और परीक्षा में सफलता ने उन्हें विदेश में काम करने का मार्ग दिया।\\n\\nतब असली तूफान तब आया जब उन्हें स्टेज 4 ओवेरियन कैंसर का निदान हुआ। डॉक्टरों ने बहुत कम उम्मीद जताई। फिर भी, अटल विश्वास और गहरी आत्मसमर्पण के साथ, उन्होंने कॉवेनेंट के मार्ग पर चलना जारी रखा, हर कदम को मैरी की मध्यस्थता में समर्पित किया। इसके परिणामस्वरूप ईश्वरीय कृपा के अटल संकेत उभरे — कीमोथेरेपी के दौरान कम से कम साइड इफेक्ट्स, शांतिपूर्ण उपचार, सफल सर्जरी जिसने डॉक्टरों को भी हैरान कर दिया। हर क्षण ऐसा लगता था जैसे कहीं से कोई पवित्र शक्ति उन्हें संबल दे रही हो।\\n\\nजिस्माडन की कहानी सिर्फ जीवन रक्षा नहीं है — यह एक जीवंत चमत्कार है। वह सभी से आग्रह करती हैं कि अंधकार छा जाने पर भी हार न मानें, क्योंकि मैरियन कॉवेनेंट और क्रेउपासनाम में अनुभव की गई मातृसदृश उपस्थिति के माध्यम से असंभव संभव हो जाता है। उनकी यात्रा एक चमकीला उदाहरण है कि जब कोई बच्चे की तरह विश्वास के साथ स्वर्ग की प्रतिज्ञाओं को थामे रखता है, तो क्या-क्या अद्भुत हो सकता है।","kn":"ಕೆन्नೂರಿನ ನರ್ಸ್ ಜಿಸ್ಮಡನ್ ಅವರು ಇಡೀ ಬದುಕನ್ನು ಪರಿವರ್ತಿಸುವ ಮಾಯರಿಯನ್ ಒಪ್ಪಂದದ ಸಾಕ್ಷ್ಯವನ್ನು ಆರ್‌ಐಶಿಂಡಿಸಿ ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಅನೇಕ ಬಾರಿ OET ಪರೀಕ್ಷೆಯಲ್ಲಿ ವಿಫಲಗೊಂಡು, ತಂದ님의 ತೀವ್ರ ಹೃದಯ ಸಮಸ್ಯೆಯನ್ನು ನೋಡಿದಾಗ, ಅವರು ಕ್‍ರೆಉಪಾಸನಮ್ ಒಪ್ಪಂದದ ಮೂಲಕ ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಆಶ್ರಯ ಪಡೆದರು. ಅಖಂಡ ಜಪಮಾಲೆಯಲ್ಲಿ ಪಾಲ್ಗೊಂಡು ಮತ್ತು ಮಾಯರಿಯನ್ ಒಪ್ಪಂದದ ವಾಗ್ದಾನಗಳಿಗೆ ನಂಬಿಕೆ ಸಾಧಿಸಿ, ಅವರು ಅದ್ಭುತ ಫಲಗಳನ್ನು ಅನುಭವಿಸಿದರು — ತಂದ님의 ಆರೋಗ್ಯ ಸುಧಾರಿಸು, ಪರೀಕ್ಷೆಯಲ್ಲಿ ಯಶಸ್ಸು ಕಂಡು ವಿದೇಶ ಹಾದಿ ತೆರೆಯಿತು.\\n\\nಆದರೆ ನಿಜವಾದ ಬಿರುಗಾಳಿ ಬಂದಾಗ ಅವರು ಸ್ಟೇಜ್ 4 ಒವೇರಿಯನ್ ಕ್ಯಾನ್ಸರ್ ಪೀಡಿತರಾದರು. ವೈದ್ಯರು ಹೆಚ್ಚು ನಿರಾಕ್ಷ್ಯನಿರೀಕ್ಷೆ ವರಿಸಿದರು. ಆದರೂ, ಸಹಿಸಂಕರ್ಷವಾಗದ ನಂಬಿಕೆ ಮತ್ತು ಆಳವಾದ ಸಮರ್ಪಣೆಯಿಂದ ಅವರು ಒಪ್ಪಂದದ ಹಾದಿಯಲ್ಲಿ ಸಾಗಿದರು, ಪ್ರತಿ ಹೆಜ್ಜೆಯನ್ನು ಮದರ್‌ ಮರಿಯಾಗೆ ಸಮರ್ಪಿಸಿದರು. ಹೀಗಾಗಿ ಬಂದ ಪರಿಣಾಮಗಳು ದೇವದೃಷ್ಟಿಯ ಅटल ಸೂಚನೆಗಳು — ರಸಾಯನ ಚಿಕಿತ್ಸೆಯ ತೀವ್ರ ಫಲಪ್ರದ ಪ್ರಭಾವಗಳು, ಶಾಂತ ವರ್ಷದ ಚಿಕಿತ್ಸೆಯು, ಯಶಸ್ವಿ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ, ವೈದ್ಯರನ್ನು ಸಹ ಆಶ್ಚರ್ಯಪಡಿಸಿ. ಪ್ರತಿ ಕ್ಷಣವೇ ಅತ್ಯಂತರದ, ಪವಿತ್ರ ಶಕ್ತಿಯೊಂದಿಗೆ ಸಾಗುತ್ತಿದ್ದಂತೆ ಅನುಭವ ಆಗಿತು.\\n\\nಜಿಸ್ಮಡನ ಕಥೆ ಕೇವಲ ಬದುಕುತ್ತಾ ಇರೋದಲ್ಲ — ಇದು ಜೀವಂತ ಚಿಂತಣೋಚ್ಛವರ್ಷ. ಅವರು ಎಲ್ಲರನ್ನು ವಿನಂತಿಸುತ್ತಾರೆ: ಕತ್ತಲೆಯ ಸಮಯದಲ್ಲೂ ನಂಬಿಕೆಯನ್ನು ಬೆಕ್ಕಿಸಬೇಡಿ, ಏಕೆಂದರೆ ಮಾಯರಿಯನ್ ಒಪ್ಪಂದದ ಮೂಲಕ ಹಾಗೂ ಕ್ರೆಉಪಾಸನಮ್‌ನಲ್ಲಿ ಅನುಭವಿಸಿದ ತಾತ್ತ್ವಿಕ ಸಿಹಲಿರುವ ಮಹತ್ವದಿಂದ ಅಸಾಧ್ಯವೂ ಸಾಧ್ಯವಾಗುತ್ತದೆ. ಅವರ ಪ್ರಯಾಣ ಇದು ಒಂದು ಪ್ರಕಾಶಮಾನ ಉದಾಹರಣೆ — ಮಕ್ಕಳಂತ ನಿಶ್ಚಿತ ನಂಬಿಕೆದೊಂದಿಗೆ ಸ್ವರ್ಗದ ವಾಗ್ದಾನಗಳನ್ನು ಹಿಡಿದರೆ ಏನಾಗುತ್ತದೆ ಎಂದು ತೋರಿಸುತ್ತದೆ.","mr":"कन्नूर येथील परिच्छन्न जिस्माडन, जी सध्या आयर्लंडमध्ये परिचरिका म्हणून कार्यरत आहे, यांनी मोलिकत्वपूर्ण मैरियन करव्हेन्बांधनाच्या माध्यमातून त्यांच्या आयुष्यातील विस्मयकारक परिवर्तनाबाबत एक प्रेरणादायी साक्ष्य शेअर केले आहे. अनेक वेळा OET परीक्षेत अपयश आणि वडिलांच्या गंभीर हृदयस्थितीला सामोरे जाताना, त्यांनी क्रेउपासनम करव्हेन्बांधनाच्या आधारे प्रार्थनेचा मार्ग स्वीकारला. अखंड जापमालामध्ये सहभागी होऊन आणि मैरियन करव्हेन्बांधनाच्या प्रतिज्ञांवर टिकून राहून त्यांनी अद्वितीय परिणाम पाहिले—त्यांच्या वडिलांचे आरोग्य सुधारले आणि परीक्षेतील यशाने त्यांना परदेशात काम करण्याचा मार्ग खुले केला.\\n\\nपण खरी कसोटि त्यांना तेव्हा आली जेव्हा त्यांना स्टेज 4 ओव्हेरियन कॅन्सरचा निदान झाला. डॉक्टरांनी फार कमी आशा व्यक्त केली. तरीही, अडिग श्रद्धा आणि सखोल समर्पणासह, त्यांनी करव्हेन्बांधनाचा मार्ग चालू ठेवला, प्रत्येक टप्प्यावर आइवरीची प्रतिबिंब म्हणजे मरीया यांच्या मध्यस्थतेवर विश्वास ठेवला. त्याचे परिणाम अविश्वसनीय होते—कीमोथेरपीचा परिणाम अत्यल्प दुष्परिणामांसह, शांततेत संयमाने होणारा उपचार आणि डॉक्टरांनाही चकित करणारी यशस्वी शस्त्रक्रिया. प्रत्येक क्षण असे वाटत होते की एखादी पवित्र शक्ती त्यांना आधार देत आहे.\\n\\nजिस्माडनची कथा केवळ जीवित राहण्याची नाही तर एक जिवंत चमत्कार आहे. त्या सर्वांना आवाहन करतात की अंधाराची वेळीही हार मानू नये, कारण मैरियन करव्हेन्बांधन आणि क्रेउपासनम येथे अनुभवलेली मातृसदृश उपस्थितीमुळे अशक्य सुद्धा शक्य होतं. त्यांच्या प्रवासाने दाखवून दिलं आहे की एखाद्याने लहान मुलासारखी श्रद्धा धरून स्वर्गाच्या प्रतिज्ञांना घट्ट धरले, तर काय काय अद्भुत घडू शकतं.","es":"Jismadon, enfermera originaria de Kannur que trabaja actualmente en Irlanda, comparte un testimonio conmovedor sobre cómo el Pacto Mariano transformó su vida. Tras múltiples fracasos en el examen OET y el sufrimiento de ver a su padre con una grave enfermedad cardíaca, ella se encomendó al Pacto de Kreupasanam. Participando en el Akhanda Japamala y aferrándose a las promesas del Pacto Mariano, presenció una transformación increíble — la salud de su padre mejoró y su éxito en el examen le abrió la puerta al trabajo en el extranjero.\\n\\nPero la verdadera prueba llegó cuando le diagnosticaron cáncer de ovario en estadio 4. Los médicos no tenían muchas esperanzas. Sin embargo, con fe inquebrantable y profunda entrega, ella continuó caminando por el camino del Pacto, confiando cada paso a la intercesión de la Virgen María. Lo que siguió fueron señales indiscutibles de gracia divina — mínimos efectos secundarios de la quimioterapia, sanación pacífica y una cirugía exitosa que dejó sorprendidos incluso a los médicos. Cada instante se sintió sostenido por algo más grande, algo sagrado.\\n\\nLa historia de Jismadon es más que supervivencia — es un milagro vivo. Ella insta a todos a no rendirse cuando llegue la oscuridad, porque a través del Pacto Mariano y la presencia maternal tan poderosa en Kreupasanam, lo imposible se vuelve posible. Su camino es un ejemplo radiante de lo que sucede cuando se agarra con fe infantil las promesas del cielo.","ta":"கன்னூரிலிருந்து வரும் நர்ஸ் ஜிஸ்மடன் தற்போது ஐர்லாந்தில் வேலை செய்வவர். மாரியன் ஒப்பந்தத்தின் வழியாக அவரது வாழ்வில் நேர்ந்த மாற்றத்தை அழகாக பகிர்கிறார். பலமுறை OET தேர்வில் தோல்வியடைந்து, தந்தையின் தீவிர இதய பிரச்சினையை எதிர்கொண்டபோது, அவர் கிரெஉபாசனம் ஒப்பந்தத்தின் வழியாக பிரார்த்தனையில் உண்மை வைத்தார். அகந்த ஜபமாலா தொடர்புபடுத்தி, மாரியன் ஒப்பந்தத்தின் வாக்குறுதிகளை அதிர்மியமாய் நம்பியதை தொடர்ந்து, அற்புதமான மாற்றம் கண்டார் — தந்தையின் உடல் நிலை மேம்பட்டு, தேர்வில் வெற்றி பெற்று வெளிநாட்டு வேலை வாய்ப்பு திறந்தது.\\n\\nஆனால் சீர் சோதனை வந்தபோது, அவருக்கு ஸ்டேஜ் 4 ஓவரியன் புற்றுநோயானது இருப்பதாக கண்டறியப்பட்டது. மருத்துவர்கள் அவருக்கு நம்பிக்கையில்லாமல் இருந்தனர். ஆனால் அவர் வலுபடுத்திய நம்பிக்கையுடனும் ஆழ்ந்த சமர்ப்பணத்துடனுமே ஒப்பந்தப் பாதையை தொடர்ந்தார், ஒவ்வொரு படியையும் மாரியார் மத்தியில் நம்பிக்கையுடன் செலுத்தினார். அதன் தொடர்ந்து வெல்லாத கடவுளின் ஆசீர்வாத நிலைகளை பெற்றார் — கீமோதிருக்கான குறைந்த பக்க விளைவுகள், அமைதியான குணமடையும் நிலை, மருத்துவர்களையும் அதிர்ச்சியடைய செய்த ஒரு வெற்றிகரமான அறுவைசிகிச்சை. ஒவ்வொரு தருணமும் ஒரு பெரிய, பவித்ரமான சக்தி அவரை சந்தித்தது.\\n\\nஜிஸ்மடனின் கதை வெறும் உயிர் மீட்பு மட்டுமல்ல — அது ஒரு உயிரும் கொண்ட அதிசயம். இருண்ட வேளையில் நாளைய விடாமுயற்சி செய்யாமல், மாரியன் ஒப்பந்தம் மற்றும் கிரெஉபாசனத்தின் தாய்மையுநீ உருவான அருகாமை மூலம், சாத்தியமில்லாததும் சாத்தியமாகும் என்று அவர் அனைவரையும் அழைக்கிறார். குழந்தை போல் விசுவாசத்துடன் சொர்க்க வாக்குறுதிகளை பிடித்தால் என்ன நடக்கலாம் என்பதையும் அவரது பயணம் அழகாக காட்டுகிறது.","te":"కన్నూర్ నుంచి వచ్చి ప్రస్తుతం ఐర్లాండ్‌లో పని చేస్తున్న నర్స్ జిస్మాడన్, మరియాన్ ఒప్పందం ద్వారా తన జీవితంలో చోటుచేసుకున్న అద్భుతమైన మార్పును ఆసక్తికరంగా అందించాడు. అనేక సార్లు OET పరీక్షల్లో విఫలమైనపుడు, తండ్రి తీవ్ర హృద్రోగ బాధను చూసి బాధపడుతూ, ఆమె క్రెఉపాసనమ్ ఒప్పందంలో ప్రార్థనలో ఆశ్రయం పొందింది. అఖండ జపమాలాలో పాల్గొని, మరియాన్ ఒప్పంద ప్రతిజ్ఞలపై గట్టి విశ్వాసంతో నిలబడటంతో, ఆశ్చర్యకరమైన ఫలితాలు వచ్చాయి — తండ్రి ఆరోగ్యం మెరుగు చెందింది, పరీక్షలో విజయం సాధించి విదేశీ ఉద్యోగం అవకాశాన్ని తెచ్చింది.\\n\\nకానీ అసలైన పరీక్ష ఎప్పుడు వస్తుందో అందరికీ తెలుసు — ఆమెకు స్టేజ్ 4 ఒవేరియన్ కాన్సర్ నిర్ధారణైంది. వైద్యులు ఆశలు తక్కువగా ప్రకటించారు. అయినప్పటికీ, అతలాకుతలమైన విశ్వాసం మరియు లోతైన అంకితం తో, ఆమె ఒప్పంద మార్గంలో కొనసాగింది, ప్రతి అడుగును మరియాకు అర్పించింది. దాని ఫలితంగా దివ్య కృప సూచనలు వచ్చాయి — రసాయన చికిత్సలో తక్కువ జీవన దుష్ప్రభావాలు, ప్రశాంతంగా గల సంపూర్ణ ఆరోగ్యం, వైద్యులను కూడా ఆశ్చర్యపెట్టిన విజయవంతమైన శస్త్రచికిత్స. ప్రతి క్షణం ఏదో గొప్ప, పవిత్ర శక్తి ద్వారా తీసుకోబడినదన్న అనుభూతిని కలిగించింది.\\n\\nజిస్మాడన్ కథ కేవలం జీవించడమే కాదు — అది జీవంతమైన ఒక అద్భుతం. ఆమె అందర్నీ కోరుకుంటున్నారు కళ్ళు దాటిపోయిన ఆంధకారం రావడం మూలంగా ఓడిపోకండి, ఎందుకంటే మరియాన్ ఒప్పందం మరియు క్రెఉపాసనంలో మారియ ద్వారా అనుభూతి చెందిన తాత్త్విక తల్లి సాన్నిధ్యం ద్వారా అసాధ్యమైనది సాధ్యమే అవుతుంది. వారి ప్రయాణం చూపిస్తుంది ఏ వయసులోనైనా పిల్లలా విశ్వాసంతో స్వర్గ వాగ్దానాలను పట్టుకున్నప్పుడు ఏమి జరిగొచ్చు."},"subtitles":"/assets/testimony/27jun.json"},{"id":2,"title":{"en":"Merit to Grace","bn":"যোগ্যতা থেকে অনুগ্রহ","zh":"从功劳到恩典","hi":"योग्यता से कृपा तक","kn":"ಮೆರಿಟ್‌ನಿಂದ ಕೃಪೆಗೆ","mr":"सपत्नतेकडून कृपेपर्यंत","es":"Del Mérito a la Gracia","ta":"தகுதியிலிருந்து அருளுக்கே","te":"అర్హత నుండి కృపకు","fr":"Du Mérite à la Grâce"},"date":"June 28, 2025","video":"https://youtu.be/hFeG2bxgsog?si=5c8bz6n5LLeSDHoh","content":{"en":"In early 2025, Jeromin, a software engineer in Abu Dhabi, faced a crushing professional setback that left his family anxious and uncertain. Months of job hunting ended in disappointment, and the emotional toll was growing. Amid this crisis, his mother urged the family to turn to Kreupasanam and take the Marian Covenant—a spiritual promise of surrender and faith through the intercession of Mother Mary. On April 12, just before Divine Mercy Sunday, they took the Covenant online. That single act of trust became a turning point in their lives.\\n\\nFrom the moment they embraced the Covenant, blessings began to unfold. Their daughter, Jewel Maria, had been suffering from recurring fevers and adenoid issues for months. But within days of taking the Covenant, they finally secured a long‑awaited doctor’s appointment on Holy Saturday—only to discover that her condition had dramatically improved and surgery was no longer required. At the same time, Jeromin experienced a breakthrough in his job search. After surrendering his anxieties in prayer, he received an unexpected interview call on May 29, and within minutes of the interview, he was offered a job—just before the deadline he had lifted up in prayer.\\n\\nThe Marian Covenant didn’t just change their circumstances; it changed their hearts. Daily Mass, the Rosary, and a deep sense of peace became part of their family rhythm. They began to share their testimony and support others in faith. The Kreupasanam Marian Covenant became their lifeline—guiding them from despair to hope, from struggle to stability. Their story is a living witness to the power of trusting Mother Mary’s intercession and letting God work through the Covenant.","bn":"২০২৫ সালের শুরুতে আবুধাবির সফটওয়্যার ইঞ্জিনিয়ার জেরোমিন একটি ভয়াবহ পেশাগত বাধার সম্মুখীন হন, যা তার পরিবারকে উদ্বিগ্ন ও অনিশ্চয়তার মধ্যে ফেলে দেয়। মাসব্যাপী চাকরি খোঁজার পর হতাশা বাড়ছিল এবং মানসিক চাপ ক্ষুণ্ন হচ্ছিল। এই সংকটের মধ্যে, তার মা পরিবারটিকে Kreupasanam-এর দিকে নিয়ে যেতে এবং Marian Covenant গ্রহণ করার পরামর্শ দেন—মাদার মেরির মধ্যস্থতার মাধ্যমে আত্মসমর্পণ ও বিশ্বাসের এক আধ্যাত্মিক প্রতিশ্রুতি। ১২ এপ্রিল, Divine Mercy Sunday-এর ঠিক আগে, তারা অনলাইনে Covenant নেন। সেই এক বিশ্বাসের সিদ্ধান্ত তাদের জীবনের একটি মোড় ঘুরিয়ে দেয়।\\n\\nCovenant গ্রহণের মুহূর্ত থেকেই আশীর্বাদ শুরু হয়। তাদের মেয়ে Jewel Maria দীর্ঘদিন ধরে জ্বর এবং অ্যাডেনয়েড সমস্যায় ভুগছিল। Covenant নেবার কয়েক দিনের মধ্যে তারা Holy Saturday-তে একটি দীর্ঘ প্রতীক্ষিত ডাক্তারের অ্যাপয়েন্টমেন্ট পায়—কিন্তু সেখানে জানা যায় যে তার অবস্থা উল্লেখযোগ্যভাবে উন্নত হয়েছে এবং আর অস্ত্রোপচারের প্রয়োজন নেই। একই সময়ে, জেরোমিনের চাকরি অনুসন্ধানে এক বিশাল উল্টো মুহূর্ত আসে। প্রার্থনায় উদ্বেগ ত্যাগ করার পর, ২৯ মে তার আকস্মিক একটি ইন্টারভিউ কল আসে এবং মিনিটের মধ্যে তিনি একটি চাকরির প্রস্তাব পান—ঠিক prayer‑deadline-এর আগে।\\n\\nMarian Covenant শুধু তাদের পরিস্থিতি বদলায়নি; এটি তাদের হৃদয়কেও পরিবর্তিত করেছে। দৈনিক ম্যাস, রোজারি প্রার্থনা এবং গভীর শান্তি তাদের পারিবারিক জীবন হয়ে দাঁড়ায়। তারা তাদের সাক্ষ্য ভাগ করতে শুরু করে এবং অন্যদের বিশ্বাসে সহায়তা করে। Kreupasanam Marian Covenant তাদের জীবনের রশ্মি হয়ে ওঠে—নিরাশা থেকে আশা, সংগ্রাম থেকে স্থিতিশীলতায় নিয়ে যাওয়ার শক্তি। তাদের গল্প হলো মাদার মেরির মধ্যস্থতার ওপর আস্থা রাখার এবং Covenant-এর মাধ্যমে ঈশ্বরকে কাজ করতে দেওয়ার শক্তির জীবন্ত সাক্ষ্য।","zh":"在2025年初，来自阿布扎比的软件工程师杰罗敏遭遇了沉重的职业挫折，使他的家庭陷入焦虑与不安。数月的求职以失望告终，情绪压力不断累积。在这场危机中，他的母亲建议家人转向Kreupasanam，并在线于4月12日（慈悲主日前夕）接受圣母玛利亚的中保，通过玛利安盟约作出灵性宣誓。那一刻的信任行动，成为他们生命的转折点。\\n\\n他们接受盟约后，祝福立即出现。他们的女儿Jewel Maria长期受发烧和腺样体问题困扰。但在接受盟约几天后，他们终于在圣周六预约上了期待已久的医生，结果发现她的病情大幅好转，不再需要手术。与此同时，杰罗敏的求职也迎来突破。放下焦虑，祈祷后，他于5月29日接到一通意外的面试电话，面试仅几分钟便收到录用通知——刚好在他祈祷的截止日期之前。\\n\\n玛利安盟约不仅改变了他们的处境，也改变了他们的内心。每日弥撒、玫瑰经祈祷和平静的心态成为家庭生活的一部分。他们开始分享见证，扶持他人在信仰中前行。Kreupasanam的玛利安盟约成为他们的生命线——引领他们从绝望走向希望，从挣扎到稳固。他们的故事是信靠圣母代求，通过盟约让上帝大能得以彰显的真实见证。","hi":"2025 की शुरुआत में, अबू धाबी में एक सॉफ्टवेयर इंजीनियर जेरोमिन एक गहरी पेशेवर असफलता का सामना कर रहे थे, जिसने उनके परिवार को चिंता और अनिश्चितता में डाल दिया। महीनों तक नौकरी की खोज निराशा में समाप्त हुई और भावनात्मक बोझ बढ़ता गया। इसी संकट में, उनकी माँ ने परिवार को Kreupasanam से जुड़ने और Marian Covenant ग्रहण करने के लिए प्रेरित किया—मदर मैरी की मध्यस्थता द्वारा आत्मसमर्पण और विश्वास की एक आध्यात्मिक प्रतिज्ञा। Divine Mercy Sunday से ठीक पहले, 12 अप्रैल को उन्होंने ऑनलाइन Covenant लिया। उस एक विश्वासपूर्ण निर्णय ने उनके जीवन में मोड़ ला दिया।\\n\\nCovenant ग्रहण करते ही आशीर्वाद प्रकट होने लगे। उनकी बेटी Jewel Maria कई महीनों से बार-बार बुखार और एडेनॉयड समस्या से पीड़ित थी। लेकिन Covenant से कुछ दिनों बाद, उन्हें Holy Saturday को एक प्रतीक्षित डॉक्टर की अपॉइंटमेंट मिली—जहाँ यह पता चला कि उसकी हालत में काफी सुधार हुआ है और अब ऑपरेशन की ज़रूरत नहीं है। इसी समय, जेरोमिन की नौकरी की तलाश में एक अनपेक्षित मोड़ आया। प्रार्थना में अपनी चिंताओं को छोड़ने के बाद, 29 मई को उन्हें एक अप्रत्याशित इंटरव्यू कॉल मिला, और मिनटों में उन्हें एक नौकरी का प्रस्ताव मिल गया—बिल्कुल उस prayer‑deadline से पहले जिसे उन्होंने प्रार्थना में निर्धारित किया था।\\n\\nMarian Covenant ने सिर्फ उनकी परिस्थितियाँ नहीं बदलीं; इसने उनके दिलों को भी बदल दिया। दैनिक मास, रोज़री प्रार्थना और गहरी शांति उनका पारिवारिक जीवन बन गया। उन्होंने अपना साक्ष्य साझा करना शुरू किया और दूसरों को विश्वास में सहायता करने लगे। Kreupasanam का Marian Covenant उनकी जीवन‑रह बन गया—निराशा से आशा, संघर्ष से स्थिरता तक उन्हें ले जाने वाली एक मार्गदर्शक शक्ति। उनकी कहानी मदर मैरी की मध्यस्थता पर विश्वास रखने और Covenant के माध्यम से प्रभु को कार्य करने देने की शक्ति का जीवंत प्रमाण है।","kn":"2025 ರ ಆರಂಭದಲ್ಲಿ, ಅಬೂಧಾಬಿಯ ಸಾಫ್ಟ್‌ವೇರ್ ಎಂಜಿನಿಯರ್ ಜೆರೋಮಿನ್ ಮಹತ್ವಪೂರ್ಣ ವೃತ್ತಿಪರ ವಿಫಲತೆಯನ್ನು ಎದುರಿಸಿದರು, ಇದು ಅವರ ಕುಟುಂಬವನ್ನು ಆತಂಕ ಹಾಗೂ ಅನಿಶ್ಚಿತತೆಯೊಳಗೇ ಹಾಕಿತು. ತಿಂಗಳುಗಳ ಉದ್ಯೋಗ ಹುಡುಕಾಟ ನಮನಿಕೆ ಮತ್ತು ನಿಷ್ಠೂರುತೆಯಲ್ಲಿ ತಿರುಗಿತು, ಭಾವನಾತ್ಮಕ ಒತ್ತಡ ಹೆಚ್ಚುಗಾಮಾಯಿತು. ಇದನ್ನು ಕುರಿತು, ಅವರ ತಾಯಿ ಕುಟುಂಬವನ್ನು Kreupasanam ಕಡೆ ಕರೆದು Marian Covenant ಸ್ವೀಕರಿಸುವ ಸಲಹೆ ನೀಡಿದರು—ಮದರ್ ಮೇರಿಯವರ ಮಧ್ಯಸ್ಥಿಕೆಯನ್ನು ಅವಲಂಬಿಸಿ ನಂಬಿಕೆ ಮತ್ತು ಸಮರ್ಪಣೆಯ ಮೂಲಕ ಸುವಾರ್ತ ಅದರ ಒಂದು ಆಧ್ಯಾತ್ಮಿಕ ವಾಗ್ದಾನ. Divine Mercy Sundayಗೆ ಮುಂಚಿತವಾಗಿಯೇ ಏಪ್ರಿಲ್ 12 ರಂದು ಅವರು ಆನ್ಲೈನ್‌ನಲ್ಲಿ Covenant ಪಡೆದರು. ಆ ನಂಬಿಕೆಯ ಕ್ರಿಯೆಯನ್ನು ಅವರ ಜೀವನದ ಮೋಡಕ್ಕೆ ಮುಖಾಂತರವೆಂದು ಹೇಳಬಹುದು.\\n\\nCovenant ಸ್ವೀಕರಿಸಿದ ಕ್ಷಣದಿಂದಲೇ ಆಶೀರ್ವಾದಗಳು ತೋರಿಸಲು ಆರಂಭವಾಯಿತು. ಅವರ ಮಗಳು Jewel Maria, ದೀರ್ಘಕಾಲ ಮೈಕ್ರೋ ಜ್ವರ ಮತ್ತು ಅಡೆನಾಯ್ಡ್ ಸಮಸ್ಯೆಯಿಂದ ಬಳಲುತ್ತಿತ್ತು. ಆದರೆ Covenant‌ನ ಸ್ವೀಕಾರಕ್ಕೂ ಕೆಲ ದಿನಗಳಲ್ಲಿ Holy Saturdayಗೆ ಅವರು ಕಾಯುತ್ತಿದ್ದ ವೈದ್ಯರ ಸಮಯ ಲಭಿಸಿತು—ಅಲ್ಲಿ ಕಂಡುಬಂದಿತು ಅವಳ ಪರಿಸ್ಥಿತಿ ಅತ್ಯಲ್ಪ ಉತ್ತಮಗೊಂಡಿದೆ ಮತ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಬೇಕಾಗಿರಲಿಲ್ಲ. ಅದೇ ಸಮಯದಲ್ಲಿ, ಜೆರೋಮಿನ್ ಅವರ ಉದ್ಯೋಗ ಹುಡುಕಾಟದಲ್ಲಿ ಆಶಚಾರ್ಯಕರ ತಿರುವನ್ನು ಕಂಡರು. ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಆತಂಕವನ್ನೆಲ್ಲ ಬಿಟ್ಟುಹೋಗೆ, ಮೇ 29ರಂದು ಅನಿರೀಕ್ಷಿತ ಸಂದರ್ಶನ ಕರೆಗೆ ಒಳಪಟ್ಟರು ಮತ್ತು ಕೆಲವು ನಿಮಿಷಗಳಲ್ಲಿ ನೌಕರಿಯ ಆಫರ್ ದೊರೆಯಿತು—ಅದು prayer‑deadline ಮುನ್ನವೇ.\\n\\nMarian Covenant ಅವರ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಮಾತ್ರ ಬದಲಾಯಿಸಿದಲ್ಲದ್ದು; ಅವರ ಹೃದಯವನ್ನೂ ಬದಲಿಸಿದೆ. ದೈನಂದಿನ ಮಿಸ್, ರೋಸರಿ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಆಳವಾದ ಶಾಂತಿಯನ್ನು ಅವರ ಕುಟುಂಬದ ಜೀವನದ ಭಾಗವಾಯಿತು. ಅವರು ತಮ್ಮ ಸಾಕ್ಷ್ಯ ಹಂಚಿಕೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸಿ, ಇತರರಿಗೆ ನಂಬಿಕೆಯಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡಲು ಮುಂದಾದರು. Kreupasanam Marian Covenant ಅವರು ನಿರಾಶೆಯಿಂದ ಆಶಾಕ್ಕೆ, ಹೋರಾಟದಿಂದ ಸ್ಥಿರತೆಗೆ ಡಾಲಿಸುವ ಜೀವ ರೇಖೆಯಾಗಿ ಮೂಡಿಸಿಕೊಂಡಿತು. ಅವರ ಕಥೆ ಮಾದರ್ ಮೇರಿಯವರ ಮಧ್ಯಸ್ಥಿಕೆಯಲ್ಲಿ ನಂಬಿಕೆ ಇಟ್ಟುಕೊಂಡು Covenant ಮೂಲಕ ದೇವರನ್ನು ಕಾರ್ಯ ಮಾಡಲು ಅವಕಾಶದ ಪ್ರಭಾವವನ್ನು ವ್ಯಕ್ತಪಡಿಸುವ ಜೀವಂತ ಪ್ರಮಾಣವಾಗಿದೆ.","mr":"2025 च्या सुरुवातीला, अबू धाबीतील सॉफ्टवेअर अभियंता जेरोमिन यांनी एक गंभीर व्यावसायिक अडचणीचा सामना केला, ज्यामुळे त्यांचे कुटुंब चिंतेत आणि अनिश्चिततेत अडकले. महीनोंची नोकरी शोधावी पण निराशा वाढत गेली आणि भावनिक ताणही वाढत गेला. या संकटात, त्यांच्या आईने कुटुंबाला Kreupasanam कडे वळवण्याचा आणि Marian Covenant स्वीकारण्याचा सल्ला दिला—मदर मैरी यांची मध्यस्थता स्वीकारून आत्मसमर्पण व श्रद्धेची एक आध्यात्मिक प्रतिज्ञा. Divine Mercy Sunday च्या अगोदर, 12 एप्रिल रोजी त्यांनी ऑनलाइन Covenant घेतला. त्या एक विश्वासपूर्ण निर्णयाने त्यांच्या जीवनात एक मोठी वैकुंठता भासवली.\\n\\nCovenant स्वीकारण्यासाठी त्या दिवसापासूनच आशीर्वाद प्रदर्शित होऊ लागले. त्यांच्या मुली Jewel Maria ला महिन्यांपासून ताप आणि अडेनॉइडच्या समस्यांमुळे त्रास होत होता. पण Covenant घेतल्यानंतर काही दिवसांनी Holy Saturday रोजी त्यांनी प्रतीक्षित डॉक्टर अपॉइंटमेंट मिळवली—जिथे आढळले की तिची स्थिती फार सुधारली आहे आणि आता शस्त्रक्रियेशी आवश्यकता नाही. त्याच वेळी, जेरोमिन यांचा नोकरी शोधात एक चमत्कारिक बदल झाला. प्रार्थनेत त्यांचे भय आणि चिंता सोडल्यावर, 29 मे रोजी अचानक एक मुलाखत कॉल आला आणि काही मिनिटांतच नोकरीची ऑफर मिळाली—प्रार्थनेच्या मुदतीपूर्वी!\\n\\nMarian Covenant ने केवळ त्यांची परिस्थिती बदलली नाही; त्यांचा हृदयही बदलले. दैनंदिन मास, रोजरी प्रार्थना आणि गाढ शांतता त्यांच्या कुटुंब जीवनाचा अविभाज्य भाग बनली. त्यांनी आपले साक्ष्य इतरांशी शेअर करायला सुरुवात केली आणि इतरांना विश्वासात सहाय्य केले. Kreupasanam मधील Marian Covenant त्यांच्या जीवनात एक जीवनरेषा ठरली—त्या निराशतेतून आशेकडे, संघर्षातून स्थिरतेकडे नेणारी. त्यांच्या कथेत मदर मैरींच्या मध्यस्थतेवर आस्था ठेवण्यामुळे आणि Covenant मधून परमेश्वराला कार्य करण्याचे स्थान देण्याची शक्ती स्पष्ट केली आहे.","es":"A principios de 2025, Jeromin, un ingeniero de software en Abu Dabi, enfrentó un devastador retroceso profesional que sumió a su familia en ansiedad e incertidumbre. Meses buscando empleo terminaron en decepción y la presión emocional siguió creciendo. En plena crisis, su madre los animó a acudir a Kreupasanam y asumir el Pacto Mariano—una promesa espiritual de entrega y fe mediante la intercesión de la Virgen María. El 12 de abril, justo antes del Domingo de la Divina Misericordia, hicieron el Pacto en línea. Ese acto de confianza marcó un punto decisivo en sus vidas.\\n\\nDesde el momento en que abrazaron el Pacto, comenzaron a llegar bendiciones. Su hija, Jewel Maria, llevaba meses sufriendo fiebres recurrentes y problemas de adenoides. Pero pocos días después del Pacto, consiguieron finalmente una cita médica el Sábado Santo—donde descubrieron que su condición había mejorado notablemente y ya no era necesaria la cirugía. Al mismo tiempo, Jeromin experimentó una sorprendente reversión en su búsqueda laboral. Tras entregar sus ansiedades en oración, recibió una llamada inesperada el 29 de mayo para una entrevista que concluyó en minutos con una oferta laboral—justo antes del plazo que había establecido en oración.\\n\\nEl Pacto Mariano no solo transformó sus circunstancias; transformó sus corazones. La Misa diaria, el Rosario y una profunda paz interior se convirtieron en parte de su rutina familiar. Comenzaron a compartir su testimonio y a ayudar a otros en la fe. El Pacto Mariano de Kreupasanam se convirtió en su salvavidas espiritual—guiándolos de la desesperación a la esperanza, de la lucha a la estabilidad. Su historia es un testimonio vivo del poder de confiar en la intercesión de la Virgen María y permitir que Dios actúe a través del Pacto.","ta":"2025 தொடக்கத்தில், அபூதாபியில் உள்ள மென்பொருள் பொறியாளர் ஜெரோமின் ஒரு பெரும் தொழிற் விசித்திரமான துன்பத்தைக் சந்தித்தார், இது அவரது குடும்பத்தை கவலை மற்றும் உறுதிப்பங்கற்ற நிலையில் வைத்தது. மாதங்கள் நீடித்த வேலை தேடல் ஏமாற்றத்தின் முடிவடைய, மனதின் எடை அதிகமானது. இந்த சிக்கலான நிலைமையில், அவரது தாய் குடும்பத்தையே Kreupasanam நோக்கி திருப்பி Marian Covenant எடுத்துக் கொள்ள ஊக்குவித்தார்—மதர் மரியாவின் இடைநிலை மூலம் ஒப்படைப்பு மற்றும் நம்பிக்கையின்முகமாக ஆன்மீக உறுதி. Divine Mercy Sundayக்கு முன், ஏப்ரல் 12-ஆம் தேதி அவர்கள் ஆன்லைனில் Covenant எடுத்தனர். அந்த ஒரு நம்பிக்கை நிறைந்த முடிவு அவர்களின் வாழ்கையை மாற்றியிருந்தது.\\n\\nCovenant ஏற்றுக்கொண்ட உடனே ஆசீர்வாதங்கள் தெளிவடைந்தன. அவர்களின் மகள் Jewel Maria கடந்த பல மாதங்களாக மீண்டும் மீண்டும் கொண்ட ஜ¦பரம் மற்றும் அடனாய்ட் பிரச்னைகளைப் போல கcustsituations. ஆனாலும், Covenant ஏற்றுக் கொண்ட சில நாட்களில் Holy Saturday அன்று அவர்கள் எதிர்பார்த்த மருத்துவரின் நேரத்தைப் பெற்றனர்—அங்கு கண்டது அவளின் நிலை மிகுந்த முன்னேற்றம் அடைந்தது, மேலும் அறுவை சிகிச்சை தேவையில்லை. அதே நேரத்தில், ஜெரோமின் வேலை தேடலில் ஒரு அதிசயமான மாற்றம் ஏற்பட்டு, prayers‑இல் கவலைகளை விட்டு, மே 29 அன்று எதிர்பாராத நேர்காணல் அழைப்பு வந்தது, சில நொடிகளில் வேலை வாய்ப்பு கிடைத்தது—அந்த prayer‑deadlineக்கு முன்.\\n\\nMarian Covenant அவர்களின் சூழ்நிலையை மட்டுமல்ல, அவர்களது இதயங்களையும் மாற்றியது. தின MASS, ரோசரி பிரார்த்தனை மற்றும் ஆழ்ந்த அமைதி அவர்களது குடும்ப வாழ்வின் ஒரு முக்கிய பாகமாகி. அவர்கள் தங்கள் சாட்சி பகிர்ந்து, அனைத்து நம்பிக்கையில் மக்களை உதவத் தொடங்கினர். Kreupasanam Marian Covenant அவர்கள் எதிர்மறை நிலைமையிலிருந்து நம்பிக்கைக்கு, போராட்டத்திலிருந்து நிலைத்தன்மைக்கு வழிகாட்டியது. அவர்களது கதை மாதர் மரியாவின் இடைநிலை மீது நம்பிக்கை வைத்து Covenant மூலம் கடவுளை இயங்க அனுமதித்தால் என்ன தெரியுமோ, அதன் உள்ளார்ந்த சக்தியின் செயல் என்பதைப் பதிவு செய்கிறது.","te":"2025 ప్రారంభంలో, అబుదాబిలో ఉన్న సాఫ్ట్‌వేర్ ఇంజినీర్ జెరోమిన్ ఒక తీవ్రమైన వృత్తిపరమైన సంక్షోభాన్ని ఎదుర్కొన్నారు, ఇది వారి కుటుంబాన్ని ఆందోళన మరియు అనిశ్చితిలోకి తోడింది. నెలల అతడి ఉద్యోగ శోధన విఫలమవగా, భావోద్వేగ ఒత్తిడి పెరిగింది. ఈ సంక్షోభ సమయంలో, అతని తల్లి కుటుంబాన్ని Kreupasanam వైపు తిరిగి Marian Covenant తీసుకునే సూచన చేశారు—మదర్ మేరీ మధ్యస్తత్వం ద్వారా త్యాగం, విశ్వాసం అనే సాంప్రదాయాత్మక ప్రమాణాన్ని తీసుకోవడంను. Divine Mercy Sundayకు ముందే, ఏప్రిల్ 12న ఆయా వారు ఆన్‌లైన్‌లో Covenant తీసుకున్నారు. ఒక నమ్మకం మేరకు తీసుకున్న ఆ నిర్ణయం వారి జీవితాల్లో ఒక కీలక పరిణామమైందిఇ.\\n\\nCovenant అంగీకరించిన వెంటనే ఆశీర్వాదాలు ప్రారంభమయ్యాయి. వారి చిన్నారి Jewel Maria సతత ఫీవర్స్ మరియు అడెనాయిడ్ సమస్యలతో బాధపడుతోంది. Covenant తీసుకున్న కొన్ని రోజులలోనే, వారు Holy Saturday రోజు ఒక پزشక అపాయింట్‌మెంట్ పొందారు—అక్కడ ఆమె ఆరోగ్యం గణనీయంగా మెరుగైందని నిర్ధారణ, ఇప్పుడు శస్త్రచికిత్స అవసరం లేదనేది. అదే సమయంలో, జెరోమిన్ ఉద్యోగ శోధనలో ఒక మైలురాయిని చేరుకున్నాడు. ప్రార్థనలో ధైర్యం కోల్పోవటం తర్వాత, మే 29న ఒక అనూహ్య ఇంటర్వ్యూ కాల్ వచ్చింది, కొన్ని నిమిషాల్లోనే అతనికి ఉద్యోగ ఆఫర్ వచ్చింది—అది prayer‑deadlineకి ముందు.\\n\\nMarian Covenant వారి పరిస్థుతులను మాత్రమే మార్చలేదు; అది వారి హృదయాలను కూడా మార్చింది. రోజువారీ Mass, Rosary ప్రార్థన మరియు ఆత్మీయ శాంతి వారి కుటుంబ జీవితం భాగమైంది. వారు తమ సాక్ష్యాన్ని పంచుకుంటూ, ఇతరులను విశ్వాసంలో ఆదరించాలని ప్రారంభించారు. Kreupasanam Marian Covenant వారు నిస్సహాయ స్థితి నుంచి ఆశకు, పోరాటం నుంచి స్థిరత్వానికి ఆవేశాన్ని మార్గనిర্দেশించింది. వారి కథ మదర్ మేరీ మధ్యస్థత్వంపై విశ్వాసం ఉంచాలని, Covenant ద్వారా దేవుని కార్యాచరణకు స్థలమిచ్చాలని ప్రేరేపించే శక్తివంతమైన జీవితం సాక్ష్యం.","fr":"Au début de 2025, Jeromin, ingénieur logiciel à Abou Dhabi, a connu un revers professionnel dévastateur qui a plongé sa famille dans l’angoisse et l’incertitude. Plusieurs mois de recherche d’emploi se sont soldés par des déceptions croissantes, et la pression émotionnelle augmentait. Au cœur de cette crise, sa mère les a incités à se tourner vers Kreupasanam et à faire l’expériencedu Pacte Marian—une promesse spirituelle de remise et de foi sous la protection de la Vierge Marie. Le 12 avril, juste avant le Dimanche de la Divine Miséricorde, ils ont pris le Pacte en ligne. Ce geste de confiance a marqué un tournant dans leur vie.\\n\\nDès qu’ils ont embrassé le Pacte, les bénédictions ont commencé. Leur fille, Jewel Maria, souffrait depuis des mois de fièvres récurrentes et de problèmes d’adénoïdes. Mais quelques jours après le Pacte, ils ont enfin obtenu un rendez-vous médical le Samedi Saint—où l’on leur a dit que son état s’était considérablement amélioré et que l’opération n’était plus nécessaire. Simultanément, Jeromin a connu une percée inattendue dans sa recherche d’emploi. Après avoir abandonné ses anxiétés dans la prière, il a reçu un appel surprise le 29 mai pour un entretien, et quelques minutes plus tard, il s’est vu offrir un poste—juste avant la date limite pour laquelle il avait prié.\\n\\nLe Pacte Marian n’a pas seulement transformé leur situation – il a transformé leur cœur. La messe quotidienne, le Rosaire et une paix profonde sont devenus le rythme de leur vie familiale. Ils ont commencé à partager leur témoignage et à soutenir d’autres personnes dans la foi. Le Pacte Marian de Kreupasanam est devenu leur bouée de sauvetage spirituelle—les guidant du désespoir à l’espoir, de la lutte à la stabilité. Leur histoire est un témoignage vivant de la puissance de la confiance dans l’intercession de la Vierge Marie et de la façon dont Dieu agit à travers le Pacte."},"subtitles":"/assets/testimony/28jun.json"},{"id":3,"title":{"en":"Covenant of Transformation","bn":"পরিবর্তনের চুক্তি","zh":"转变的约定","hi":"परिवर्तन की प्रतिज्ञा","kn":"ಮாற்றದ ಒಡಂಬಡಿಕೆ","mr":"परिवर्तनाचा करार","es":"Pacto de Transformación","ta":"மாற்றத்தின் உடன்படிக்கை","te":"మార్పు ఒప్పందం","fr":"Alliance de Transformation"},"date":"June 29, 2025","video":"https://youtu.be/lLLCVtYSPSk?si=I07Tv0TiB7efNZ2s","content":{"en":"Anu’s journey began with doubt and skepticism toward the Marian Covenant at Kreupasanam. Although a faithful churchgoer, she initially rejected the holy oil and prayers from Kreupasanam, unsure of their power. But in moments of deep struggle—during illness and career challenges abroad—she encountered miraculous signs, including a dream of a colored scapular and the comforting presence of the Mother through the sacred holy oil and prayer.\\n\\nThrough faith in the Marian Covenant, Anu experienced life-changing miracles: overcoming a difficult nursing interview, securing work permits, receiving divine protection during war, and abundant blessings like a home and land. She also found spiritual strength using holy salt to control anger, showing how the sacraments from Kreupasanam became her lifeline, guiding her through hardship with the Mother’s loving intercession.\\n\\nUltimately, Anu renewed her covenant with renewed faith and humility, recognizing that the power of the Mother at Kreupasanam is real and active. Her testimony is a vivid witness to how prayer, faith, and sacred sacramentals—oil, scapular, salt—bring miracles and spiritual transformation, inviting others to experience the grace and protection of the Marian Covenant.","bn":"অনুর যাত্রা শুরু হয়েছিল ক্ৰেউপাসনামের মারিয়ান চুক্তির প্রতি সন্দেহ এবং অবিশ্বাস নিয়ে। যদিও সে একজন বিশ্বস্ত চার্চগোয়ার, সে প্রথমে ক্ৰেউপাসনামের পবিত্র তেল এবং প্রার্থনাগুলো প্রত্যাখ্যান করেছিল, তাদের শক্তি সম্পর্কে নিশ্চিত না হয়ে। কিন্তু গভীর সংগ্রামের মুহূর্তগুলোতে—অসুস্থতা এবং বিদেশে কর্মজীবনের চ্যালেঞ্জের সময়—সে অলৌকিক চিহ্নগুলি দেখতে পেয়েছিল, যার মধ্যে একটি রঙিন স্ক্যাপুলারের স্বপ্ন এবং মায়ের সান্ত্বনাদায়ক উপস্থিতি পবিত্র তেল ও প্রার্থনার মাধ্যমে ছিল।\\n\\nমারিয়ান চুক্তির প্রতি বিশ্বাসের মাধ্যমে, অনু জীবন পরিবর্তনকারী অলৌকিক ঘটনা অনুভব করেছিল: কঠিন নার্সিং ইন্টারভিউ অতিক্রম করা, কর্মপরমিট নিশ্চিত করা, যুদ্ধের সময় ঐশ্বরিক সুরক্ষা পাওয়া এবং একটি বাড়ি ও জমি মত প্রচুর আশীর্বাদ। সে রাগ নিয়ন্ত্রণের জন্য পবিত্র লবণ ব্যবহার করে আধ্যাত্মিক শক্তিও পেয়েছিল, যা দেখায় কিভাবে ক্ৰেউপাসনামের সাধু সামগ্রীগুলো তার জীবনরেখা হয়ে ওঠে, মায়ের ভালোবাসাময় মধ্যস্থতায় তাকে কঠিন সময় পার হতে সাহায্য করে।\\n\\nঅবশেষে, অনু তার চুক্তি পুনর্নবীকরণ করল নবীন বিশ্বাস এবং বিনয়ের সঙ্গে, স্বীকার করে যে ক্ৰেউপাসনামের মায়ের শক্তি বাস্তব এবং সক্রিয়। তার সাক্ষ্য প্রার্থনা, বিশ্বাস এবং পবিত্র সাধু সামগ্রী—তেল, স্ক্যাপুলার, লবণ—কিভাবে অলৌকিকতা এবং আধ্যাত্মিক রূপান্তর নিয়ে আসে তা জীবন্তভাবে প্রমাণ করে, অন্যদের মারিয়ান চুক্তির করুণা এবং সুরক্ষার অভিজ্ঞতা করার আহ্বান জানায়।","zh":"阿努的旅程开始时对克鲁帕萨南的圣母盟约持怀疑和疑虑。虽然她是忠实的教会成员，但最初她拒绝了来自克鲁帕萨南的圣油和祷告，不确定它们的力量。但在疾病和海外职业挑战的深刻挣扎中，她遇到了奇迹般的迹象，包括一个彩色圣带的梦境，以及通过神圣的圣油和祷告感受到圣母的安慰存在。\\n\\n通过对圣母盟约的信仰，阿努经历了改变人生的奇迹：克服了艰难的护理面试，获得了工作许可，在战争期间获得了神圣保护，以及诸如住房和土地等丰厚的祝福。她还通过使用圣盐来控制愤怒，展现了克鲁帕萨南的圣物如何成为她的生命线，在困难中通过圣母慈爱的代求引导她。\\n\\n最终，阿努以新的信仰和谦卑更新了她的盟约，认识到克鲁帕萨南圣母的力量是真实且活跃的。她的见证生动展示了祈祷、信仰和神圣圣物——圣油、圣带、盐——如何带来奇迹和灵性转变，邀请他人体验圣母盟约的恩典和保护。","hi":"अनु की यात्रा क्रेउपासनम में मरियन समझौते के प्रति संदेह और शंका के साथ शुरू हुई। यद्यपि वह एक विश्वासपूर्ण चर्च जाने वाली थी, उसने शुरू में क्रेउपासनम के पवित्र तेल और प्रार्थनाओं को अस्वीकार कर दिया, उनकी शक्ति के बारे में अनिश्चित होकर। लेकिन बीमारी और विदेश में करियर चुनौतियों के गहरे संघर्ष के क्षणों में, उसने चमत्कारिक संकेत देखे, जिनमें रंगीन स्कैपुलर का सपना और पवित्र तेल और प्रार्थना के माध्यम से माता की सांत्वनापूर्ण उपस्थिति शामिल थी।\\n\\nमरियन समझौते में विश्वास के माध्यम से, अनु ने जीवन-परिवर्तनकारी चमत्कार अनुभव किए: कठिन नर्सिंग इंटरव्यू को पार करना, कार्य परमिट सुरक्षित करना, युद्ध के दौरान दिव्य संरक्षण प्राप्त करना, और एक घर और जमीन जैसी प्रचुर आशीषें। उसने गुस्से को नियंत्रित करने के लिए पवित्र नमक का उपयोग करके आध्यात्मिक शक्ति भी पाई, जो दिखाता है कि कैसे क्रेउपासनम के संस्कारों ने उसकी जीवनरेखा बनकर उसकी कठिनाइयों में माता की प्रेमपूर्ण मध्यस्थता के साथ मार्गदर्शन किया।\\n\\nअंत में, अनु ने पुनः विश्वास और विनम्रता के साथ अपना समझौता नवीनीकृत किया, यह स्वीकार करते हुए कि क्रेउपासनम में माता की शक्ति वास्तविक और सक्रिय है। उसका साक्ष्य इस बात का जीवंत प्रमाण है कि प्रार्थना, विश्वास और पवित्र संस्कार—तेल, स्कैपुलर, नमक—कैसे चमत्कार और आध्यात्मिक परिवर्तन लाते हैं, और दूसरों को मरियन समझौते की कृपा और संरक्षण का अनुभव करने के लिए आमंत्रित करता है।","kn":"ಅನು ಕ್ರೇಉಪಾಸನಂನ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಗೆ ಸಂಶಯ ಮತ್ತು ಅನುಮಾನದಿಂದ ತನ್ನ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿದಳು. ಅವಳು ನಂಬಿಕೆಗೆ ಬದ್ಧವಾದ ಚರ್ಚಿಗೆ ಹೋಗುತ್ತಿದ್ದರೂ, ಮೊದಲಿಗೆ ಕ್ರೇಉಪಾಸನಂನ ಪವಿತ್ರ ಎಣ್ಣೆ ಮತ್ತು ಪ್ರಾರ್ಥನೆಗಳನ್ನು ನಿರಾಕರಿಸಿದಳು, ಅವುಗಳ ಶಕ್ತಿಯ ಬಗ್ಗೆ ಖಚಿತವಿರಲಿಲ್ಲ. ಆದರೆ ಅನಾರೋಗ್ಯ ಮತ್ತು ವಿದೇಶದಲ್ಲಿನ ವೃತ್ತಿ ಸವಾಲುಗಳ ಆಳವಾದ ಸಂಕಟಗಳ ವೇಳೆ, ಅವಳು ಅದ್ಭುತ ಸಂಕೇತಗಳನ್ನು ಕಾಣಿತು, ಬಣ್ಣದ ಸ್ಕ್ಯಾಪುಲರ್ ಕನಸು ಮತ್ತು ಪವಿತ್ರ ಎಣ್ಣೆ ಮತ್ತು ಪ್ರಾರ್ಥನೆಯ ಮೂಲಕ ತಾಯಿಯ ಸಾಂತ್ವನಕರ ಹಾಜರಾತಿ ಸೇರಿದಂತೆ.\\n\\nಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಮೇಲಿನ ನಂಬಿಕೆಯ ಮೂಲಕ, ಅನು ಜೀವನವನ್ನು ಬದಲಿಸುವ ಅದ್ಭುತಗಳನ್ನು ಅನುಭವಿಸಿದಳು: ಕಠಿಣ ನರ್ಸಿಂಗ್ ಸಂದರ್ಶನವನ್ನು ಜಯಿಸುವುದು, ಕೆಲಸ ಪರವಾನಿಗೆ ಪಡೆಯುವುದು, ಯುದ್ಧದ ವೇಳೆ ದೈವಿಕ ರಕ್ಷಣೆ ಪಡೆಯುವುದು ಮತ್ತು ಮನೆ ಮತ್ತು ಭೂಮಿಯಂತಹ ಸಮೃದ್ಧ ಆಶೀರ್ವಾದಗಳನ್ನು ಪಡೆಯುವುದು. ಅವಳು ಕೆಮ್ಮು ನಿಯಂತ್ರಿಸಲು ಪವಿತ್ರ ಉಪ್ಪು ಬಳಸಿಕೊಂಡು ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯನ್ನು ಕಂಡುಹಿಡಿದಳು, ಇದರಿಂದ ಕ್ರೇಉಪಾಸನಂನ ಸಂಪದಿಗಳು ಅವಳ ಜೀವನರೇಖೆಯಾಗಿ, ತಾಯಿಯ ಪ್ರೇಮದ ಮಧ್ಯಸ್ಥಿಕೆ ಮೂಲಕ ಸಂಕಟಗಳ ನಡುವೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದವು ಎಂದು ತೋರಿಸುತ್ತದೆ.\\n\\nಕೊನೆಗೆ, ಅನು ತನ್ನ ಒಡಂಬಡಿಕೆಯನ್ನು ನವೀಕರಿಸಿ ನಂಬಿಕೆ ಮತ್ತು ವಿನಯದಿಂದ, ಕ್ರೇಉಪಾಸನಂನ ತಾಯಿಯ ಶಕ್ತಿ ನಿಜವಾಗಿಯೂ ಪ್ರಚಲಿತ ಮತ್ತು ಸಕ್ರಿಯವಾಗಿದೆ ಎಂಬುದನ್ನು ಒಪ್ಪಿಕೊಂಡಳು. ಅವಳ ಸಾಕ್ಷ್ಯವು ಪ್ರಾರ್ಥನೆ, ನಂಬಿಕೆ ಮತ್ತು ಪವಿತ್ರ ಸಂಪದಿಗಳು—ಎಣ್ಣೆ, ಸ್ಕ್ಯಾಪುಲರ್, ಉಪ್ಪು—ಅದ್ಭುತಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪರಿವರ್ತನೆಯನ್ನು ಹೇಗೆ ತಂದವು ಎಂಬುದಕ್ಕೆ ಜೀವಂತ ಸಾಕ್ಷ್ಯವಾಗಿದೆ ಮತ್ತು ಇತರರನ್ನು ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಕೃಪೆ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ಅನುಭವಿಸಲು ಆಹ್ವಾನಿಸುತ್ತದೆ.","mr":"अनूची यात्रा क्रेपुसानममधील मरियन कराराबद्दल शंका आणि संशयाने सुरू झाली. ती एक विश्वासू चर्च जाणारी असली तरी प्रथम तिने क्रेपुसानममधील पवित्र तेल आणि प्रार्थना नाकारल्या, त्यांच्या शक्तीबद्दल अनिश्चित होती. पण आजारपण आणि परदेशातील करिअरच्या आव्हानांच्या कठीण काळात तिने चमत्कारिक चिन्हे पाहिली, ज्यात रंगीत स्कॅप्युलरचा स्वप्न आणि पवित्र तेल आणि प्रार्थनेद्वारे मातेमुळे दिलेल्या सांत्वनाची उपस्थिती होती.\\n\\nमरियन करारावर विश्वास ठेवून, अनूने जीवन बदलणारे चमत्कार अनुभवले: कठीण नर्सिंग मुलाखत पार करणे, कामाच्या परवानगी मिळवणे, युद्धादरम्यान दैवी संरक्षण मिळवणे, आणि घर व जमिनीसारख्या भरपूर आशीर्वाद मिळवणे. तिने रागावर नियंत्रण मिळवण्यासाठी पवित्र मीठ वापरून आध्यात्मिक ताकद देखील मिळवली, ज्यामुळे क्रेपुसानममधील पवित्र वस्तू तिचे आधार बनल्या आणि मातेच्या प्रेमळ मध्यस्थतेने तिला कठीण काळातून मार्गदर्शन केले.\\n\\nशेवटी, अनूने आपला करार नवीन श्रद्धा आणि नम्रतेने नूतनीकरण केला, आणि क्रेपुसानममधील मातेची शक्ती खरी आणि सक्रिय असल्याचे मान्य केले. तिचा साक्ष्य प्रार्थना, श्रद्धा आणि पवित्र वस्तू—तेल, स्कॅप्युलर, मीठ—कसे चमत्कार आणि आध्यात्मिक परिवर्तन घडवतात याचे जिवंत दर्शन आहे, आणि इतरांना मरियन कराराचा आशीर्वाद आणि संरक्षण अनुभवण्याचं आमंत्रण आहे.","es":"El viaje de Anu comenzó con dudas y escepticismo hacia el Pacto Mariano en Kreupasanam. Aunque era una fiel asistente a la iglesia, inicialmente rechazó el aceite santo y las oraciones de Kreupasanam, sin estar segura de su poder. Pero en momentos de profunda lucha—durante enfermedades y desafíos profesionales en el extranjero—experimentó signos milagrosos, incluyendo un sueño con un escapulario de color y la presencia reconfortante de la Madre a través del sagrado aceite santo y la oración.\\n\\nA través de la fe en el Pacto Mariano, Anu experimentó milagros que cambiaron su vida: superó una difícil entrevista de enfermería, obtuvo permisos de trabajo, recibió protección divina durante la guerra, y abundantes bendiciones como una casa y tierras. También encontró fortaleza espiritual usando sal santa para controlar su ira, demostrando cómo los sacramentales de Kreupasanam se convirtieron en su salvavidas, guiándola en las dificultades con la amorosa intercesión de la Madre.\\n\\nFinalmente, Anu renovó su pacto con fe renovada y humildad, reconociendo que el poder de la Madre en Kreupasanam es real y activo. Su testimonio es un vívido testimonio de cómo la oración, la fe y los sacramentales sagrados—aceite, escapulario, sal—traen milagros y transformación espiritual, invitando a otros a experimentar la gracia y protección del Pacto Mariano.","ta":"அனுவின் பயணம் கிரேயுபசனம் மரியன் உடன்படிக்கையின் மீது சந்தேகம் மற்றும் மறுப்புடன் தொடங்கியது. நம்பிக்கையான பிள்ளையார் போல் இருந்தாலும், அவள் முதலில் கிரேயுபசனத்தின் புனித எண்ணெய் மற்றும் பிரார்த்தனைகளை மறுத்தாள், அவற்றின் சக்தி பற்றி உறுதியாக இல்லை. ஆனால் நோய் மற்றும் வெளிநாட்டில் தொழில் சவால்களில் தீவிரமான போராட்டத்தின்போது, அவள் அதிசயமான அடையாளங்களை சந்தித்தாள், அதில் ஒரு வண்ணம் நிறைந்த ஸ்காபுலர் கனவு மற்றும் புனித எண்ணெய் மற்றும் பிரார்த்தனையின் மூலம் தாய்மாரின் ஆறுதல் உள்ளடங்கியது.\\n\\nமரியன் உடன்படிக்கையில் நம்பிக்கையின் மூலம், அனு வாழ்க்கையை மாற்றும் அதிசயங்களை அனுபவித்தாள்: கடினமான நர்ஸ் நேர்முகத்தைக் கடந்து, வேலை அனுமதிகளை பெற்றுக்கொண்டு, போரின் போது தெய்வீக பாதுகாப்பைப் பெற்றாள் மற்றும் வீட்டும் நிலத்தையும் போன்ற மிகுந்த ஆசீர்வாதங்களை பெற்றாள். அவள் கோபத்தை கட்டுப்படுத்த புனித உப்பையும் பயன்படுத்தி ஆன்மிக சக்தியைக் கண்டுபிடித்தாள், இது கிரேயுபசனத்தின் புனித பொருட்கள் அவளது உயிர்க்கேடு ஆனவை ஆகி, தாய்மாரின் அன்பான இடைக்காலத்தால் அவளை கடின சூழ்நிலைகளில் வழிகாட்டியது.\\n\\nஇறுதியில், அனு புதிய நம்பிக்கை மற்றும் பணிவுடன் அவள் உடன்படிக்கையை புதுப்பித்தாள், கிரேயுபசனத்தில் தாய்மாரின் சக்தி உண்மையாகவும் செயல்படுவதாகவும் அறிந்தாள். அவளின் சாட்சி பிரார்த்தனை, நம்பிக்கை மற்றும் புனித புனித பொருட்கள்—எண்ணெய், ஸ்காபுலர், உப்பு—எப்படி அதிசயங்களையும் ஆன்மிக மாற்றங்களையும் கொண்டு வருகிறது என்பதைக் காட்டுகிறது, மற்றும் பிறரையும் மரியன் உடன்படிக்கையின் அருள் மற்றும் பாதுகாப்பை அனுபவிக்க அழைக்கிறது.","te":"అనూ ప్రయాణం క్రేయుపాసనం మారియన్ ఒప్పందం పట్ల అనుమానం మరియు సందేహాలతో మొదలైంది. ఆమె విశ్వాసి చర్చి వ్యక్తి అయినప్పటికీ, మొదట క్రేయుపాసనం నుండి వచ్చిన పవిత్ర నూనె మరియు ప్రార్థనలను తిరస్కరించింది, వాటి శక్తి గురించి నిర్ధారించుకోలేదు. కానీ ఆసుపత్రిలో అనారోగ్యం మరియు విదేశాల్లో ఉద్యోగ సంబంధ సమస్యల సమయంలో లోతైన సంకట సమయాలలో ఆమె అద్భుత సంకేతాలను అనుభవించింది, వాటిలో రంగురంగుల స్కాపులర్ కల కలలు మరియు పవిత్ర నూనె మరియు ప్రార్థన ద్వారా తల్లి సౌకర్యవంతమైన ఉనికిని పొందింది.\\n\\nమారియన్ ఒప్పందంపై విశ్వాసం ద్వారా, అనూ జీవితాన్ని మార్చే అద్భుతాలను అనుభవించింది: కఠినమైన నర్సింగ్ ఇంటర్వ్యూ పాస్ చేయడం, పని అనుమతులు పొందడం, యుద్ధ సమయంలో దివ్య రక్షణ పొందడం మరియు ఒక ఇల్లు మరియు భూమి వంటి సమృద్ధి ఆశీర్వాదాలు పొందడం. కోపాన్ని నియంత్రించడానికి పవిత్ర ఉప్పును ఉపయోగించి ఆధ్యాత్మిక బలం కూడా పొందింది, క్రేయుపాసనం నుండి వచ్చిన పవిత్ర వస్తువులు ఆమెకు జీవనాధారం అయ్యాయి మరియు తల్లి ప్రేమపూరిత మధ్యస్థతతో ఆమెను కష్టకాలంలో మార్గనిర్దేశం చేశాయి.\\n\\nచివరకు, అనూ తన ఒప్పందాన్ని నూతన విశ్వాసంతో మరియు వినయంతో పునరుద్ధరించింది, క్రేయుపాసనంలోని తల్లి శక్తి నిజమైనది మరియు క్రియాశీలమని గ్రహించింది. ఆమె సాక్ష్యం ప్రార్థన, విశ్వాసం మరియు పవిత్ర పవిత్ర వస్తువులు—నూనె, స్కాపులర్, ఉప్పు—ఎలా అద్భుతాలు మరియు ఆధ్యాత్మిక మార్పు తెస్తాయో స్పష్టంగా చూపిస్తుంది, మరియు మరికొంతమందిని మరియన్ ఒప్పందం యొక్క కృప మరియు రక్షణను అనుభవించమని ఆహ్వానిస్తుంది.","fr":"Le parcours d'Anu a commencé avec des doutes et du scepticisme envers l'Alliance Mariale à Kreupasanam. Bien qu'elle soit une fidèle pratiquante, elle a d'abord rejeté l'huile sainte et les prières de Kreupasanam, incertaine de leur puissance. Mais dans des moments de profonde lutte—pendant la maladie et les défis professionnels à l'étranger—elle a rencontré des signes miraculeux, y compris un rêve d'un scapulaire coloré et la présence réconfortante de la Mère à travers la sainte huile et la prière sacrée.\\n\\nGrâce à la foi dans l'Alliance Mariale, Anu a vécu des miracles qui ont changé sa vie : surmonter un entretien d'infirmière difficile, obtenir des permis de travail, recevoir une protection divine pendant la guerre, et des bénédictions abondantes comme une maison et des terres. Elle a également trouvé la force spirituelle en utilisant du sel sacré pour contrôler sa colère, montrant comment les sacramentaux de Kreupasanam sont devenus sa bouée de sauvetage, la guidant dans les difficultés grâce à l'intercession aimante de la Mère.\\n\\nFinalement, Anu a renouvelé son alliance avec une foi renouvelée et une humilité, reconnaissant que le pouvoir de la Mère à Kreupasanam est réel et actif. Son témoignage est un témoignage vivant de la manière dont la prière, la foi et les sacramentaux sacrés—huile, scapulaire, sel—apportent des miracles et une transformation spirituelle, invitant les autres à faire l'expérience de la grâce et de la protection de l'Alliance Mariale."},"subtitles":"/assets/testimony/29jun.json"},{"id":4,"title":{"en":"Covenant of Family","bn":"পরিবারের চুক্তি","zh":"家庭的约定","hi":"परिवार की प्रतिज्ञा","kn":"ಕುಟುಂಬದ ಒಡಂಬಡಿಕೆ","mr":"कुटुंबाचा करार","es":"Pacto Familiar","ta":"குடும்ப உடன்படிக்கை","te":"కుటుంబ ఒప్పందం","fr":"Alliance Familiale"},"date":"July 3, 2025","video":"https://youtu.be/6RShpzPCavg?si=kUEi7G7Z9D__iNSi","content":{"en":"Princey Varghese’s journey of faith and hope was deeply transformed by the Kreupasanam Marian Covenant. While struggling with the pain of separation from her children due to immigration laws in Israel, she found new strength after embracing the covenant and the intercession of Mother Mary. Encouraged by friends, she took the PTE exam and began praying earnestly, anointing herself with the holy oil from Kreupasanam, which symbolized divine blessing and protection in her difficult journey.\\n\\nHer faith through the covenant was accompanied by remarkable miracles that strengthened her resolve. She experienced a vivid dream of Mother Mary and her late uncle reassuring her that “everything will be alright.” A reluctant bank manager suddenly provided important salary documents needed for her visa application, and despite numerous doubts from immigration agents, she received her New Zealand visa against all odds. She also used blessed salt from the covenant to help her elderly patient find strength and courage, showing the tangible power of these sacramentals.\\n\\nThrough these signs and the steadfast power of the Marian Covenant, Princey not only reunited her family in New Zealand but also witnessed her husband’s conversion and their church wedding after 15 years. Her testimony is a powerful witness to the grace, miracles, and spiritual renewal made possible through the Kreupasanam Marian Covenant and its sacred sacramentals, bringing hope and unity where there seemed to be none.","bn":"প্রিন্সি ভার্গিসের বিশ্বাস ও আশার যাত্রা ক্রুপাসানম মারিয়ান চুক্তির মাধ্যমে গভীরভাবে রূপান্তরিত হয়েছে। ইস্রায়েলের অভিবাসন আইনের কারণে তার সন্তানদের থেকে বিচ্ছেদের ব্যথা সহ্য করার সময়, তিনি চুক্তিটি গ্রহণ এবং মাদার মেরির মধ্যস্থতায় নতুন শক্তি পেয়েছেন। বন্ধুদের উৎসাহে তিনি পিটিই পরীক্ষা দিয়েছিলেন এবং আন্তরিকভাবে প্রার্থনা শুরু করেছিলেন, ক্রুপাসানম থেকে প্রাপ্ত পবিত্র তেলের মাধ্যমে নিজেকে অভিষিক্ত করেছিলেন, যা তার কঠিন যাত্রায় ঐশ্বরিক আশীর্বাদ এবং সুরক্ষার প্রতীক ছিল।\\n\\nচুক্তির মাধ্যমে তার বিশ্বাস অসাধারণ অলৌকিক ঘটনাগুলোর সঙ্গে ছিল যা তার সংকল্পকে শক্তিশালী করেছিল। তিনি মাদার মেরি এবং তার প্রয়াত চাচার একটি উজ্জ্বল স্বপ্ন দেখেছিলেন, যারা তাকে নিশ্চিত করেছিলেন যে “সবকিছু ঠিক হয়ে যাবে।” একজন অনিচ্ছুক ব্যাংক ম্যানেজার হঠাৎ করে তার ভিসা আবেদন জন্য প্রয়োজনীয় গুরুত্বপূর্ণ বেতন সংক্রান্ত কাগজপত্র সরবরাহ করেছিলেন, এবং অভিবাসন কর্মকর্তাদের অনেক সন্দেহ সত্ত্বেও, তিনি সমস্ত প্রতিবন্ধকতা অতিক্রম করে নিউজিল্যান্ডের ভিসা পেয়েছিলেন। তিনি চুক্তির আশীর্বাদপ্রাপ্ত লবণও ব্যবহার করেছিলেন তার বৃদ্ধ রোগীকে শক্তি এবং সাহস পেতে সাহায্য করার জন্য, যা এই পবিত্র সামগ্রীগুলোর স্পষ্ট ক্ষমতা প্রদর্শন করে।\\n\\nএই চিহ্ন এবং মারিয়ান চুক্তির দৃঢ় শক্তির মাধ্যমে, প্রিন্সি কেবল নিউজিল্যান্ডে তার পরিবারকে পুনর্মিলিত করেননি, বরং তার স্বামীর ধর্মান্তর এবং তাদের ১৫ বছরের পর গির্জার বিবাহের সাক্ষী হয়েছেন। তার সাক্ষ্য ক্রুপাসানম মারিয়ান চুক্তি এবং এর পবিত্র সামগ্রীগুলোর মাধ্যমে সম্ভাব্য অনুগ্রহ, অলৌকিক ঘটনা এবং আধ্যাত্মিক পুনর্জীবনের একটি শক্তিশালী সাক্ষ্য, যা যেখানে আশা ও ঐক্য ছিল না সেখানে তা নিয়ে এসেছে।","zh":"Princey Varghese 的信仰与希望之旅因 Kreupasanam 圣母盟约而深刻改变。在因以色列移民法与孩子分离的痛苦中，她通过接受盟约和圣母的代祷获得了新的力量。在朋友的鼓励下，她参加了 PTE 考试，开始虔诚祈祷，并用 Kreupasanam 赐予的圣油膏抹自己，这象征着神圣的祝福和保护，伴随她经历艰难旅程。\\n\\n通过盟约，她的信仰伴随着非凡的奇迹，增强了她的决心。她做了一个生动的梦，梦见圣母和已故的叔叔向她保证“一切都会好起来”。一位不情愿的银行经理突然提供了她签证申请所需的重要工资证明，尽管移民官员多次怀疑，她还是克服万难获得了新西兰签证。她还用盟约中祝福的盐帮助年迈的病人获得力量和勇气，显示出这些圣物的实质力量。\\n\\n通过这些迹象和圣母盟约坚定的力量，Princey 不仅在新西兰与家人团聚，还见证了丈夫的皈依和他们 15 年后的教堂婚礼。她的见证强有力地证明了通过 Kreupasanam 圣母盟约及其神圣圣物所带来的恩典、奇迹和灵性更新，在原本无望之地带来了希望与团结。","hi":"प्रिंसी वर्गीज़ की आस्था और आशा की यात्रा क्रुपासनम मरियन संधि द्वारा गहराई से परिवर्तित हुई। इज़राइल के आव्रजन कानूनों के कारण अपने बच्चों से अलगाव के दर्द का सामना करते हुए, उन्होंने संधि को अपनाकर और माता मरियम की मध्यस्थता से नई शक्ति प्राप्त की। दोस्तों के प्रोत्साहन से, उन्होंने पीटीई परीक्षा दी और गंभीरता से प्रार्थना शुरू की, क्रुपासनम से प्राप्त पवित्र तेल से अपने माथे पर अभिषेक किया, जो उनके कठिन सफर में दिव्य आशीर्वाद और सुरक्षा का प्रतीक था।\\n\\nसंधि के माध्यम से उनकी आस्था असाधारण चमत्कारों से जुड़ी हुई थी जिसने उनके संकल्प को मजबूत किया। उन्होंने माता मरियम और अपने दिवंगत चाचा का एक जीवंत सपना देखा जिसने उन्हें आश्वासन दिया कि \\"सब ठीक हो जाएगा।\\" एक अनिच्छुक बैंक प्रबंधक ने अचानक उनके वीज़ा आवेदन के लिए आवश्यक महत्वपूर्ण वेतन दस्तावेज़ प्रदान किए, और कई संदेहों के बावजूद, उन्होंने न्यूज़ीलैंड का वीज़ा प्राप्त किया। उन्होंने वृद्ध मरीज को ताकत और साहस देने के लिए संधि से आशीर्वाद प्राप्त नमक भी इस्तेमाल किया, जो इन पवित्र वस्तुओं की मूर्त शक्ति को दर्शाता है।\\n\\nइन संकेतों और मरियन संधि की दृढ़ शक्ति के माध्यम से, प्रिंसी ने न केवल न्यूज़ीलैंड में अपने परिवार के साथ पुनर्मिलन किया बल्कि अपने पति के धर्मांतरण और 15 वर्षों बाद उनके चर्च विवाह का भी साक्षी बने। उनकी गवाही क्रुपासनम मरियन संधि और इसके पवित्र सामग्रियों के माध्यम से संभव हुई कृपा, चमत्कारों और आध्यात्मिक नवीनीकरण की एक शक्तिशाली गवाही है, जिसने आशा और एकता लाई जहां पहले कहीं नहीं थी।","kn":"ಪ್ರಿನ್ಸಿ ವರ್ಘೀಸ್ ಅವರ ನಂಬಿಕೆ ಮತ್ತು ಆಶಯದ ಪ್ರಯಾಣವನ್ನು ಕ್ರೂಪಾಸನಂ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಆಳವಾಗಿ ರೂಪಾಂತರಿಸಿದೆ. ಇಸ್ರೇಲ್‌ನ ವಲಸೆ ಕಾನೂನುಗಳಿಂದ ತಮ್ಮ ಮಕ್ಕಳಿಂದ ದೂರವಾಗಿರುವ ನೋವಿನ ನಡುವೆ, ಅವರು ಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿ, ಮಾತೃ ಮರಿಯ ಮಧ್ಯಸ್ಥತೆಯಿಂದ ಹೊಸ ಶಕ್ತಿ ಕಂಡುಕೊಂಡರು. ಸ್ನೇಹಿತರ ಪ್ರೋತ್ಸಾಹದಿಂದ, ಅವರು ಪಿಟಿಇ ಪರೀಕ್ಷೆ ಬರೆದರು ಮತ್ತು ಪ್ರಾರ್ಥನೆ ಆರಂಭಿಸಿದರು, ಕ್ರೂಪಾಸನಂನಿಂದ ಪಡೆದ ಪವಿತ್ರ ಎಣ್ಣೆಯಿಂದ ತಾವು ಸ್ವತಃ ಅಭಿಷೇಕ ಮಾಡಿದರು, ಇದು ಅವರ ಕಠಿಣ ಪ್ರಯಾಣದಲ್ಲಿ ದೈವಿಕ ಆಶೀರ್ವಾದ ಮತ್ತು ರಕ್ಷಣೆಯ ಸಂಕೇತವಾಗಿತ್ತು.\\n\\nಒಡಂಬಡಿಕೆಯ ಮೂಲಕ ಅವರ ನಂಬಿಕೆ ಅತ್ಯುತ್ತಮ ಅದ್ಭುತಗಳಿಂದ ಕೂಡಿತ್ತು, ಇದು ಅವರ ಸಂಕಲ್ಪವನ್ನು ಬಲಪಡಿಸಿತು. ಅವರು ಮಾತೃ ಮರಿಯವರ ಮತ್ತು ಅವರ ನಿಧನರಾದ ಅತ್ತೆಯವರ ಸ್ಪಷ್ಟ ಕನಸು ಕಂಡರು, ಅದು \\"ಎಲ್ಲವೂ ಸರಿಯಾಗಿ ನಡೆಯುತ್ತದೆ\\" ಎಂದು ಅವರಿಗೆ ಭರವಸೆ ನೀಡಿತು. ಒಬ್ಬ ಹಿಂಜರಿದ ಬ್ಯಾಂಕ್ ವ್ಯವಸ್ಥಾಪಕರು ಅವಶ್ಯಕ ವೇತನ ದಾಖಲೆಗಳನ್ನು ನೀಡಿದರು, ಮತ್ತು ವಲಸೆ ಅಧಿಕಾರಿಗಳ ಶಂಕೆಗೂ ಮುನ್ನ, ಅವರು ನ್ಯೂಜಿಲ್ಯಾಂಡ್ ವೀಸಾವನ್ನು ಪಡೆದುಕೊಂಡರು. ಅವರು ಒಡಂಬಡಿಕೆಯಿಂದ ಆಶೀರ್ವದಿಸಲ್ಪಟ್ಟ ಉಪ್ಪನ್ನು ಬಳಸಿ ಹಿರಿಯ ರೋಗಿಗೆ ಶಕ್ತಿ ಮತ್ತು ಧೈರ್ಯ ನೀಡಿದರು, ಇದು ಈ ಪವಿತ್ರ ವಸ್ತುಗಳ ಸ್ಪಷ್ಟ ಶಕ್ತಿಯನ್ನು ತೋರಿಸುತ್ತದೆ.\\n\\nಈ ಗುರುತುಗಳು ಮತ್ತು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ದೃಢ ಶಕ್ತಿಯ ಮೂಲಕ, ಪ್ರಿನ್ಸಿ ಅವರು ನ್ಯೂಜಿಲ್ಯಾಂಡ್‌ನಲ್ಲಿ ತನ್ನ ಕುಟುಂಬವನ್ನು ಪುನರ್ಮಿಲನಗೊಳಿಸದಿದ್ದರೂ, ತಮ್ಮ ಗಂಡನ ಧರ್ಮಾಂತರ ಮತ್ತು 15 ವರ್ಷಗಳ ನಂತರ ಅವರ ಚರ್ಚ್ ಮದುವೆಯ ಸಾಕ್ಷಿಯಾಗಿದ್ದಾರೆ. ಅವರ ಸಾಕ್ಷ್ಯವು ಕ್ರೂಪಾಸನಂ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಅದರ ಪವಿತ್ರ ವಸ್ತುಗಳ ಮೂಲಕ ಸಾಧ್ಯವಾದ ಕೃಪೆ, ಅದ್ಭುತಗಳು ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪುನರುಜ್ಜೀವನೆಯ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವಾಗಿದೆ, ಇದು ಅಲ್ಲಿ ಭರವಸೆ ಮತ್ತು ಏಕತೆಯನ್ನು ತರಲು ಸಾಧ್ಯವಾಯಿತು.","mr":"प्रिंसी वर्गीज यांचा श्रद्धा आणि आशेचा प्रवास क्रुपासनम मेरीअन करारामुळे खोलवर परिवर्तन झाला. इस्रायलमधील स्थलांतर कायद्यांमुळे त्यांच्या मुलांपासून वेगळेपणाच्या वेदनेत, त्यांनी करार स्वीकारला आणि माता मेरीच्या मध्यस्थतेने नवीन शक्ती प्राप्त केली. मित्रांच्या प्रोत्साहनाने त्यांनी पीटीई परीक्षा दिली आणि मनापासून प्रार्थना सुरू केली, क्रुपासनममधून मिळालेल्या पवित्र तेलाने स्वतःला अभिषेक केले, ज्याने त्यांच्या कठीण प्रवासात दैवी आशीर्वाद आणि संरक्षणाचा संकेत दिला.\\n\\nकराराच्या माध्यमातून त्यांचा श्रद्धा असामान्य चमत्कारांनी भरला, ज्यामुळे त्यांचा निर्धार बळकट झाला. त्यांनी माता मेरी आणि त्यांच्या मृत काकांचा एक तल्लख स्वप्न पाहिला ज्याने त्यांना \\"सर्व काही ठीक होईल\\" असे आश्वासन दिले. एक अनिच्छुक बँक व्यवस्थापक अचानक त्यांच्या व्हिसा अर्जासाठी आवश्यक महत्वाचे वेतन दस्तऐवज दिले, आणि स्थलांतर अधिकाऱ्यांच्या अनेक शंकांनंतरही त्यांनी न्यूझीलंड व्हिसा मिळवला. त्यांनी वृद्ध रुग्णाला शक्ती आणि धैर्य मिळविण्यासाठी करारातून आशीर्वादित मीठ देखील वापरले, जे या पवित्र वस्तूंच्या मूर्त शक्तीचे दर्शन घडविते.\\n\\nया चिन्हांद्वारे आणि मेरीअन कराराच्या ठाम शक्तीने, प्रिंसीने केवळ न्यूझीलंडमध्ये आपले कुटुंब पुनर्मिलन केले नाही तर आपल्या पतीच्या धर्मपरिवर्तन आणि १५ वर्षांनंतर त्यांच्या चर्चमध्ये लग्नाचे साक्षीदार झाले. त्यांचा साक्षात्कार क्रुपासनम मेरीअन करार आणि त्याच्या पवित्र वस्तूंमुळे शक्य झालेल्या कृपेचे, चमत्कारांचे आणि आध्यात्मिक पुनरुत्थानाचे एक शक्तिशाली साक्ष्य आहे, जे आशा आणि एकता आणते जिथे पूर्वी नव्हते.","es":"El viaje de fe y esperanza de Princey Varghese fue profundamente transformado por el Pacto Marian de Kreupasanam. Mientras luchaba con el dolor de la separación de sus hijos debido a las leyes de inmigración en Israel, encontró nueva fuerza al abrazar el pacto y la intercesión de la Madre María. Animada por sus amigos, presentó el examen PTE y comenzó a orar fervientemente, ungida con el aceite sagrado de Kreupasanam, que simbolizaba la bendición y protección divina en su difícil camino.\\n\\nSu fe a través del pacto estuvo acompañada de milagros notables que fortalecieron su determinación. Experimentó un sueño vívido de la Madre María y su difunto tío asegurándole que “todo estará bien.” Un gerente de banco renuente proporcionó repentinamente documentos importantes de salario necesarios para su solicitud de visa y, a pesar de las numerosas dudas de los agentes de inmigración, recibió su visa para Nueva Zelanda contra todo pronóstico. También usó sal bendita del pacto para ayudar a su paciente anciana a encontrar fuerza y valor, mostrando el poder tangible de estos sacramentales.\\n\\nA través de estas señales y el firme poder del Pacto Marian, Princey no solo reunió a su familia en Nueva Zelanda sino que también fue testigo de la conversión de su esposo y de su boda en la iglesia después de 15 años. Su testimonio es un poderoso testimonio de la gracia, los milagros y la renovación espiritual posibles a través del Pacto Marian de Kreupasanam y sus sacramentales sagrados, trayendo esperanza y unidad donde parecía no haber ninguna.","ta":"பிரின்சி வர்கீஸின் நம்பிக்கை மற்றும் நம்பிக்கை பயணம் கிருபாசனம் மரியன் உடன்படிக்கையால் ஆழமாக மாற்றப்பட்டது. இஸ்ரேல் குடியேற்ற சட்டங்களால் குழந்தைகளிடமிருந்து பிரிந்த துன்பத்தில், அவர் உடன்படிக்கையை ஏற்று தாய்மார் மரியாவின் இடையூறினால் புதிய பலத்தை பெற்றார். நண்பர்களின் ஊக்கத்தால், அவர் PTE தேர்வை எழுதியார் மற்றும் மனமுவந்த பிரார்த்தனை தொடங்கினார், கிருபாசனத்திலிருந்து பெற்ற புனித எண்ணெயைப் பூசினார், இது அவரது கடுமையான பயணத்தில் இறைவனின் ஆசீர்வாதமும் பாதுகாப்பும் என்று குறிக்கிறது.\\n\\nஉடன்படிக்கையின் மூலம் அவரது நம்பிக்கை சிறந்த அதிசயங்களால் இணைக்கப்பட்டது, இது அவரது தீர்மானத்தை வலுப்படுத்தியது. அவர் தாய்மார் மரியாவையும் அவரது இறந்த மாமாவையும் வாழ்க்கைத் துவக்கத்தில் கனவு காண்ந்தார், \\"எல்லாம் நன்றாக இருக்கும்\\" என்று உறுதி செய்தனர். ஒரு தயக்கமுள்ள வங்கிக் மேலாளர் அவசரமாக அவரது விசா விண்ணப்பத்திற்கு தேவையான முக்கிய சம்பள ஆவணங்களை வழங்கினார், மேலும் குடியேற்ற அதிகாரிகளின் சந்தேகங்களையும் மீறி, அவர் நியூசிலாந்து விசாவைப் பெற்றார். அவர் உடன்படிக்கையிலிருந்து ஆசீர்வதிக்கப்பட்ட உப்பைப் பயன்படுத்தி வயதான நோயாளிக்கு பலமும் துணிச்சலும் வழங்கினார், இது இந்த புனித பொருட்களின் தெளிவான சக்தியை காட்டுகிறது.\\n\\nஇந்த அறிகுறிகள் மற்றும் மரியன் உடன்படிக்கையின் உறுதியான சக்தியால், பிரின்சி நியூசிலாந்தில் தனது குடும்பத்துடன் மறுபிரிவை அடைந்தார் மட்டுமல்லாமல், 15 ஆண்டுகளுக்கு பிறகு அவரது கணவரின் மாற்றத்தை மற்றும் அவர்களின் சபை திருமணத்தை பார்த்தார். அவரது சாட்சி கிருபாசனம் மரியன் உடன்படிக்கையாலும் அதன் புனித பொருட்களாலும் சாத்தியமான கிருபை, அதிசயங்கள் மற்றும் ஆன்மிக புதுமையின் சக்திவாய்ந்த சாட்சி, எங்கே நம்பிக்கை மற்றும் ஒன்றிணைவு இல்லாமல் இருந்தது அங்கே நம்பிக்கை மற்றும் ஒன்றிணைவை கொண்டு வந்தது.","te":"ప్రిన్సీ వర్గీస్ యొక్క విశ్వాసం మరియు ఆశయ యాత్ర క్రుపాసనం మారియన్ ఒప్పందం ద్వారా లోతుగా మారింది. ఇజ్రాయెల్ ప్రవాస చట్టాల వల్ల తన పిల్లల నుండి వేరుపడిన బాధలో, ఆమె ఒప్పందాన్ని అంగీకరించి తల్లి మారియమ్మ మధ్యవర్తిత్వం ద్వారా కొత్త శక్తిని పొందింది. మిత్రుల ప్రోత్సాహంతో ఆమె PTE పరీక్ష తీసుకుంది మరియు ఆరాధన చేయడం ప్రారంభించింది, క్రుపాసనం నుండి అందించిన పవిత్ర నూనెతో తనను తాను అభిషేకం చేసింది, ఇది ఆమె కష్టమైన ప్రయాణంలో దైవ ఆశీర్వాదం మరియు రక్షణను సూచిస్తుంది.\\n\\nఒప్పందం ద్వారా ఆమె విశ్వాసం అద్భుతమైన అద్భుతాలతో పాటు ఉంది, ఇది ఆమె సంకల్పాన్ని బలోపేతం చేసింది. ఆమె తల్లి మారియమ్మ మరియు తన మరణించిన మామ ఒక స్పష్టమైన కలను చూసింది, వారు \\"అన్నీ బాగుండనున్నాయి\\" అని ఆమెకు హామీ ఇచ్చారు. ఒక ఇష్టం లేకుండా ఉన్న బ్యాంకు మేనేజర్ తక్షణం వీసా దరఖాస్తుకు అవసరమైన ముఖ్యమైన జీత పత్రాలు అందజేశారు, మరియు వలస అధికారుల అనేక సందేహాలన్నింటినీ దాటుకుని ఆమె న్యూజిలాండ్ వీసా పొందింది. ఆమె ఒప్పందం నుండి ఆశీర్వదించిన ఉప్పును వృద్ధ రోగికి శక్తి మరియు ధైర్యం పొందేందుకు ఉపయోగించింది, ఇది ఈ పవిత్ర వస్తువుల స్పష్టమైన శక్తిని చూపిస్తుంది.\\n\\nఈ గుర్తులు మరియు మారియన్ ఒప్పందం యొక్క స్థిరమైన శక్తి ద్వారా, ప్రిన్సీ కేవలం న్యూజిలాండ్‌లో తన కుటుంబాన్ని మళ్లీ కలిపలేదు, 15 సంవత్సరాల తర్వాత తన భర్త మార్పు మరియు వారి చర్చి వివాహం కూడా చూశారు. ఆమె సాక్ష్యం క్రుపాసనం మారియన్ ఒప్పందం మరియు దాని పవిత్ర వస్తువుల ద్వారా సాధ్యమైన కృప, అద్భుతాలు మరియు ఆధ్యాత్మిక పునరుద్ధరణ యొక్క శక్తివంతమైన సాక్ష్యం, ఇది ఎక్కడా ఆశ మరియు ఐక్యత లేనివి ఉన్న చోట ఆశ మరియు ఐక్యత తీసుకువచ్చింది.","fr":"Le parcours de foi et d'espoir de Princey Varghese a été profondément transformé par l'Alliance Mariale de Kreupasanam. Alors qu'elle luttait contre la douleur de la séparation de ses enfants en raison des lois sur l'immigration en Israël, elle a trouvé une nouvelle force en embrassant l'alliance et l'intercession de la Mère Marie. Encouragée par ses amis, elle a passé l'examen PTE et a commencé à prier avec ferveur, s'oignant avec l'huile sainte de Kreupasanam, qui symbolisait la bénédiction divine et la protection dans son difficile voyage.\\n\\nSa foi à travers l'alliance a été accompagnée de miracles remarquables qui ont renforcé sa détermination. Elle a fait un rêve vif de la Mère Marie et de son oncle défunt lui assurant que « tout ira bien ». Un directeur de banque réticent a soudainement fourni des documents salariaux importants nécessaires à sa demande de visa, et malgré de nombreux doutes de la part des agents d'immigration, elle a obtenu son visa pour la Nouvelle-Zélande contre toute attente. Elle a également utilisé du sel béni de l'alliance pour aider son patient âgé à trouver force et courage, montrant le pouvoir tangible de ces sacramentaux.\\n\\nGrâce à ces signes et à la puissance constante de l'Alliance Mariale, Princey n'a pas seulement réuni sa famille en Nouvelle-Zélande, mais a également été témoin de la conversion de son mari et de leur mariage à l'église après 15 ans. Son témoignage est un puissant témoignage de la grâce, des miracles et du renouveau spirituel rendus possibles grâce à l'Alliance Mariale de Kreupasanam et à ses sacramentaux sacrés, apportant espoir et unité là où il n'y en avait pas."},"subtitles":"/assets/testimony/3jul.json"},{"id":5,"title":{"en":"Covenant for All","bn":"সকলের জন্য চুক্তি","zh":"为所有人的约定","hi":"सभी के लिए प्रतिज्ञा","kn":"ಎಲ್ಲರಿಗೂ ಒಡಂಬಡಿಕೆ","mr":"सर्वांसाठी करार","es":"Pacto para Todos","ta":"எல்லாருக்கும் உடன்படிக்கை","te":"అందరికీ ఒప్పందం","fr":"Alliance pour Tous"},"date":"July 7, 2025","video":"https://youtu.be/acywUaq8-R8?si=g_kAnN_E7uiTHhz7","content":{"en":"Swaminathan from Kanyakumari Marthandam shares his transformative journey after receiving the Marian Covenant materials, including a book and Tamil newspaper, through his youngest daughter. After using the Covenant salt dissolved in his food, he experienced profound spiritual changes—starting daily prayers, regular church attendance, and confession. Over time, he witnessed remarkable healings of illnesses and a deepening of faith. The Kreupasanam Marian Covenant became the foundation of his life, bringing him closer to the Holy Mother through visions, dreams, and intercession that provided comfort and healing.\\n\\nCentral to his testimony are the Covenant sacraments such as the Covenant salt, oil, and medal, which he faithfully used. These sacramental items played a pivotal role in healing physical ailments like toothache, thyroid problems, and wounds, and also helped his granddaughter recover from illness. The Holy Mother's presence and closeness, revealed through visions and miraculous interventions, reinforced his commitment to the Covenant life and inspired acts of prayer and charity.\\n\\nSwaminathan emphasizes the power of the Marian Covenant and Kreupasanam grace to transform lives spiritually, physically, and socially. He highlights family unity in prayer, the significance of interpreting dreams and visions, and the ongoing mission of charity. His testimony encourages embracing the Covenant sacraments, seeking the Holy Mother's intercession, and experiencing healing, peace, and spiritual renewal.","bn":"কন্যাকুমারী মার্থান্ডামের স্বামীনাথন তাঁর রূপান্তরমূলক যাত্রা শেয়ার করেন মারিয়ান চুক্তির উপকরণগুলি পাওয়ার পরে, যার মধ্যে একটি বই এবং একটি তামিল সংবাদপত্র ছিল, যা তাঁর সবচেয়ে ছোট কন্যার মাধ্যমে তাঁকে দেওয়া হয়েছিল। তিনি চুক্তির লবণ খাবারে দ্রবীভূত করে ব্যবহারের পর গভীর আধ্যাত্মিক পরিবর্তন অনুভব করেন—প্রতিদিন প্রার্থনা শুরু করা, নিয়মিত গির্জায় যাওয়া এবং গোপন যাপনের অভ্যাস করা। সময়ের সাথে সাথে তিনি অসুস্থতার অসাধারণ নিরাময় এবং বিশ্বাসের গভীরতা প্রত্যক্ষ করেন। ক্রেউপাসানম মারিয়ান চুক্তি তাঁর জীবনের ভিত্তি হয়ে ওঠে, যা তাঁকে পরী মাতার কাছে নিয়ে যায় দৃষ্টি, স্বপ্ন এবং মঝোয়ানায় যা সান্ত্বনা ও নিরাময় প্রদান করে।\\n\\nতাঁর সাক্ষ্যতে কেন্দ্রীয় ভূমিকা পালন করে চুক্তির উপাসনাসামগ্রী যেমন লবণ, তেল এবং পদক, যেগুলি তিনি বিশ্বস্তভাবে ব্যবহার করেছেন। এই পবিত্র উপকরণগুলি দাঁতের ব্যথা, থাইরয়েড সমস্যাসহ শারীরিক অসুস্থতা নিরাময়ে গুরুত্বপূর্ণ ভূমিকা পালন করেছে এবং তাঁর নাতনীর অসুস্থতা নিরাময়ে সাহায্য করেছে। পরী মাতার উপস্থিতি এবং নৈকট্য, যা দৃষ্টি ও অলৌকিক হস্তক্ষেপের মাধ্যমে প্রকাশ পায়, তাঁর চুক্তির জীবন প্রতিশ্রুতি জোরদার করেছে এবং প্রার্থনা ও দান করার কাজকে অনুপ্রাণিত করেছে।\\n\\nস্বামীনাথন মারিয়ান চুক্তি এবং ক্রেউপাসানম কৃপার শক্তিকে আধ্যাত্মিক, শারীরিক ও সামাজিকভাবে জীবন পরিবর্তনের জন্য গুরুত্ব দেন। তিনি পরিবারের একতা প্রার্থনায়, স্বপ্ন এবং দৃষ্টির ব্যাখ্যার তাৎপর্য এবং দানের চলমান মিশনকে তুলে ধরেন। তাঁর সাক্ষ্য চুক্তির উপাসনাসামগ্রী গ্রহণ, পরী মাতার মঝোয়ানা চাওয়া এবং নিরাময়, শান্তি ও আধ্যাত্মিক পুনর্জন্মের অভিজ্ঞতা অর্জনের জন্য উৎসাহ দেয়।","zh":"来自坎亚库马里马尔坦达姆的斯瓦米纳坦分享了他在通过小女儿收到圣母盟约材料（包括一本书和一份泰米尔语报纸）后的改变之旅。在食物中溶解并使用盟约盐后，他经历了深刻的灵性变化——开始每日祈祷、定期参加教堂礼拜和忏悔。随着时间推移，他见证了疾病的显著康复和信仰的加深。克鲁帕萨南圣母盟约成为他生命的基石，通过异象、梦境和代祷将他带近圣母，带来安慰和治愈。\\n\\n他证词的核心是他忠实使用的盟约圣礼，如盟约盐、油和奖章。这些圣物在治疗牙痛、甲状腺问题和伤口等身体疾病中发挥了关键作用，也帮助他的孙女康复。圣母的临在和亲近通过异象和奇迹般的干预显现，强化了他对盟约生活的承诺，并激励他进行祈祷和慈善行为。\\n\\n斯瓦米纳坦强调圣母盟约和克鲁帕萨南恩典在灵性、身体和社会生活转变中的力量。他强调家庭祈祷的团结、梦境和异象的解读重要性以及持续的慈善使命。他的见证鼓励人们接受盟约圣礼，寻求圣母的代祷，并体验治愈、平安和灵性更新。","hi":"कन्याकुमारी मार्थंडम के स्वामीनाथन ने मरीयन संधि सामग्री, जिसमें एक पुस्तक और तमिल समाचार पत्र शामिल था, अपनी सबसे छोटी बेटी के माध्यम से प्राप्त करने के बाद अपनी परिवर्तनकारी यात्रा साझा की। संधि के नमक को अपने भोजन में घोलकर उपयोग करने के बाद उन्होंने गहरे आध्यात्मिक परिवर्तन अनुभव किए—रोजाना प्रार्थना शुरू की, नियमित चर्च जाना और कबूलनामे की। समय के साथ, उन्होंने बीमारियों के असाधारण उपचार और विश्वास की गहराई देखी। क्रेयूपासनम मरीयन संधि उनके जीवन की नींव बन गई, जिसने उन्हें दर्शन, सपनों और मध्यस्थता के माध्यम से पवित्र माता के करीब लाया, जिन्होंने सांत्वना और उपचार प्रदान किया।\\n\\nउनकी गवाही में संधि संस्कार जैसे संधि नमक, तेल और पदक केंद्रीय हैं, जिनका उन्होंने विश्वासपूर्वक उपयोग किया। इन संस्कार वस्तुओं ने दांत दर्द, थायरॉयड समस्याओं और घावों जैसे शारीरिक रोगों के इलाज में महत्वपूर्ण भूमिका निभाई और उनकी पोती के रोग से उबरने में भी मदद की। पवित्र माता की उपस्थिति और निकटता, जो दर्शन और चमत्कारिक हस्तक्षेप के माध्यम से प्रकट हुई, ने उनके संधि जीवन की प्रतिबद्धता को मजबूत किया और प्रार्थना और परोपकार के कार्यों को प्रेरित किया।\\n\\nस्वामीनाथन मरीयन संधि और क्रेयूपासनम कृपा की शक्ति पर जोर देते हैं जो आध्यात्मिक, शारीरिक और सामाजिक रूप से जीवन को बदल देती है। वे परिवार की एकता में प्रार्थना, सपनों और दर्शन की व्याख्या के महत्व, और परोपकार के निरंतर मिशन को उजागर करते हैं। उनकी गवाही संधि संस्कारों को अपनाने, पवित्र माता की मध्यस्थता मांगने, और उपचार, शांति और आध्यात्मिक नवीनीकरण का अनुभव करने के लिए प्रोत्साहित करती है।","kn":"ಕನ್ಯಾಕುಮಾರಿ ಮಾರ್ಥಾಂಡಂನ ಸ್ವಾಮಿನಾಥನ್ ಅವರು ತನ್ನ ಕಿರಿಯ ಪುತ್ರಿ ಮೂಲಕ ಪಡೆದ ಮರಿಯಾನ್ ಒಡಂಬಡಿಕೆ ಸಾಮಗ್ರಿಗಳನ್ನು (ಒಂದು ಪುಸ್ತಕ ಮತ್ತು ತಮಿಳು ಪತ್ರಿಕೆ ಸೇರಿ) ಪಡೆದ ನಂತರ ತಮ್ಮ ಪರಿವರ್ತನೆದಾಯಕ ಪ್ರಯಾಣವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಒಡಂಬಡಿಕೆ ಉಪ್ಪನ್ನು ತಮ್ಮ ಆಹಾರದಲ್ಲಿ ಕರಗಿಸಿ ಬಳಸದ ನಂತರ ಅವರು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಗಾಢವಾದ ಬದಲಾವಣೆಗಳನ್ನು ಅನುಭವಿಸಿದರು—ಪ್ರತಿದಿನ ಪ್ರಾರ್ಥನೆ, ನಿಯಮಿತವಾಗಿ ಚರ್ಚಿಗೆ ಹೋಗುವುದು ಮತ್ತು ಪಾಪಪರಿಹಾರ ಮಾಡುವುದು ಆರಂಭಿಸಿದರು. ಸಮಯದೊಂದಿಗೆ, ಅವರು ಅನಾರೋಗ್ಯಗಳ ಅದ್ಭುತ ಚಿಕಿತ್ಸೆಯನ್ನು ಮತ್ತು ಭಕ್ತಿಯ ಗಾಢತೆಯನ್ನು ನೋಡಿದರು. ಕ್ರೆಯುಪಾಸನಮ್ ಮರಿಯಾನ್ ಒಡಂಬಡಿಕೆ ಅವರ ಜೀವನದ ಆಧಾರವಾಗಿದ್ದು, ದೃಶ್ಯಗಳು, ಕನಸುಗಳು ಮತ್ತು ಮಧ್ಯಸ್ಥಿಕೆಗಳ ಮೂಲಕ ಅವರು ಪವಿತ್ರ ತಾಯಿಯ ಹತ್ತಿರ ಬಂದರು, ಉದ್ದೇಶದ ಒಪ್ಪಿಗೆಯನ್ನು ನೀಡಿದರು ಮತ್ತು ಚೇತರಿಕೆಯ ಅನುಭವ ಪಡೆದರು.\\n\\nತಮ್ಮ ಸಾಕ್ಷ್ಯದಲ್ಲಿ ಒಡಂಬಡಿಕೆ ಸ್ತೋತ್ರಗಳಾದ ಉಪ್ಪು, ಎಣ್ಣೆ ಮತ್ತು ಪದಕಗಳ ಕೇಂದ್ರ ಸ್ಥಾನವಿದ್ದು, ಅವುಗಳನ್ನು ಅವರು ನಂಬಿಕೆಯಿಂದ ಬಳಸಿದರು. ಈ ಪವಿತ್ರ ವಸ್ತುಗಳು ದಂತ ನೋವು, ಥೈರಾಯ್ಡ್ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಗಾಯಗಳಂತಹ ದೈಹಿಕ ಕಾಯಿಲೆಗಳ ಚಿಕಿತ್ಸೆಗಾಗಿ ಮಹತ್ವಪೂರ್ಣ ಪಾತ್ರವಹಿಸಿವೆ ಮತ್ತು ತಮ್ಮ ಮೊಮ್ಮಗಿಯ ಆರೋಗ್ಯ ಸುಧಾರಣೆಗೆ ಸಹಾಯಮಾಡಿವೆ. ಪವಿತ್ರ ತಾಯಿಯ ಹಾಜರಿ ಮತ್ತು ಹತ್ತಿರತೆ, ದೃಶ್ಯಗಳು ಮತ್ತು ಅಚ್ಚರಿ ಗಳಿಕೆಯ ಮುಖಾಂತರ ಬಹಿರಂಗವಾಗಿದ್ದು, ಒಡಂಬಡಿಕೆ ಜೀವನದ ಬದ್ಧತೆಯನ್ನು ಬಲಪಡಿಸಿತು ಮತ್ತು ಪ್ರಾರ್ಥನೆ ಹಾಗೂ ದಾನ ಕಾರ್ಯಗಳನ್ನು ಪ್ರೇರೇಪಿಸಿತು.\\n\\nಸ್ವಾಮಿನಾಥನ್ ಮರಿಯಾನ್ ಒಡಂಬಡಿಕೆಯ ಶಕ್ತಿ ಮತ್ತು ಕ್ರೆಯುಪಾಸನಮ್ ಕೃಪೆಯು ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ, ದೈಹಿಕವಾಗಿ ಮತ್ತು ಸಾಮಾಜಿಕವಾಗಿ ಜೀವನವನ್ನು ಪರಿವರ್ತಿಸುವುದನ್ನು ಒತ್ತಿಹೇಳುತ್ತಾರೆ. ಅವರು ಕುಟುಂಬದ ಏಕತೆ, ಕನಸುಗಳು ಮತ್ತು ದೃಶ್ಯಗಳ ವ್ಯಾಖ್ಯಾನದ ಮಹತ್ವ ಮತ್ತು ದಾನದ ನಿರಂತರ ಅಭಿಯಾನವನ್ನು ಹೋಲಿಸುತ್ತಾರೆ. ಅವರ ಸಾಕ್ಷ್ಯ ಒಡಂಬಡಿಕೆ ಸ್ತೋತ್ರಗಳನ್ನು ಸ್ವೀಕರಿಸುವುದು, ಪವಿತ್ರ ತಾಯಿಯ ಮಧ್ಯಸ್ಥಿಕೆ ಕೋರುವುದು ಮತ್ತು ಚೇತರಿಕೆ, ಶಾಂತಿ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ನವೀಕರಣವನ್ನು ಅನುಭವಿಸುವಂತೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ.","mr":"कन्याकुमारी मार्थंडम येथील स्वामीनाथन यांनी त्यांच्या लहान मुलीच्या माध्यमातून मऱ्हान करार साहित्य, ज्यामध्ये एक पुस्तक आणि तामिळ वृत्तपत्र होते, प्राप्त केल्यानंतर त्यांच्या परिवर्तनकारी प्रवासाचे वर्णन केले. त्यांनी करारातील मीठ त्यांच्या अन्नात विरघळवून वापरल्यानंतर त्यांनी खोल आध्यात्मिक बदल अनुभवले—दररोज प्रार्थना सुरू केली, नियमित चर्चला जाणे आणि कबुली देणे. काळज्याने, त्यांनी आजारांवर आश्चर्यकारक उपचार पाहिले आणि विश्वासाची खोलवर वाढ झाली. क्रेयूपासनम मऱ्हान करार त्यांच्या आयुष्याचा पाया बनला, ज्यामुळे ते दर्शन, स्वप्ने आणि मध्यस्थतेच्या माध्यमातून पवित्र आईच्या जवळ गेले, ज्यांनी दिलासा आणि उपचार दिला.\\n\\nत्यांच्या साक्ष्यात करारातील संस्कार जसे की मीठ, तेल आणि पदक यांचा महत्त्वाचा भाग आहे, जे त्यांनी निष्ठेने वापरले. या पवित्र वस्तूांनी दातदुखी, थायरॉइड समस्या आणि जखमांसारख्या शारीरिक आजारांवर उपचार करण्यात महत्त्वाची भूमिका बजावली आणि त्यांच्या नातूच्या आजारातून मुक्तीसाठी मदत केली. पवित्र आईची उपस्थिती आणि जवळीक, दर्शन आणि चमत्कारी हस्तक्षेपांद्वारे प्रकट झाली, ज्यामुळे त्यांच्या करार जीवनातील बांधिलकी वाढली आणि प्रार्थना व धर्मकार्यांना प्रेरणा मिळाली.\\n\\nस्वामीनाथन मऱ्हान करार आणि क्रेयूपासनम कृपेची आध्यात्मिक, शारीरिक आणि सामाजिक जीवनात बदल घडवून आणण्याची शक्ती यावर भर देतात. ते कुटुंबातील एकात्मता, स्वप्ने व दर्शनांच्या अर्थव्याख्येचे महत्त्व आणि धर्मकार्याच्या सततच्या मिशनवर प्रकाश टाकतात. त्यांची साक्ष करारातील संस्कार स्वीकारण्यास, पवित्र आईच्या मध्यस्थतेसाठी प्रार्थना करण्यास आणि उपचार, शांती व आध्यात्मिक नूतनीकरण अनुभवण्यास प्रोत्साहित करते.","es":"Swaminathan, de Kanyakumari Marthandam, comparte su viaje transformador tras recibir los materiales del Pacto Mariano, incluyendo un libro y un periódico tamil, a través de su hija menor. Después de usar la sal del Pacto disuelta en su comida, experimentó profundos cambios espirituales: comenzó oraciones diarias, asistencia regular a la iglesia y confesión. Con el tiempo, fue testigo de sanaciones notables de enfermedades y un aumento en su fe. El Pacto Mariano de Kreupasanam se convirtió en la base de su vida, acercándolo a la Santa Madre a través de visiones, sueños e intercesión que le brindaron consuelo y sanación.\\n\\nCentral en su testimonio están los sacramentos del Pacto como la sal, el aceite y la medalla, que usó fielmente. Estos objetos sacramentales jugaron un papel clave en sanar dolencias físicas como dolor de muelas, problemas de tiroides y heridas, y también ayudaron a su nieta a recuperarse de una enfermedad. La presencia y cercanía de la Santa Madre, reveladas a través de visiones e intervenciones milagrosas, reforzaron su compromiso con la vida del Pacto e inspiraron actos de oración y caridad.\\n\\nSwaminathan enfatiza el poder del Pacto Mariano y la gracia de Kreupasanam para transformar vidas espiritual, física y socialmente. Destaca la unidad familiar en la oración, la importancia de interpretar sueños y visiones, y la misión continua de caridad. Su testimonio anima a abrazar los sacramentos del Pacto, buscar la intercesión de la Santa Madre y experimentar sanación, paz y renovación espiritual.","ta":"கன்னியாகுமரி மார்தண்டத்தில் இருந்து வரும் ஸ்வாமிநாதன் தனது இளம் மகளின் மூலம் பெற்ற மரியன் உடன்படிக்கை பொருட்களை, அதில் ஒரு புத்தகம் மற்றும் தமிழ் செய்தித்தாள் ஆகியவை அடங்கும், பெற்றபிறகு அவருடைய மாற்றமளிக்கும் பயணத்தை பகிர்கிறார். உடன்படிக்கை உப்பை தனது உணவில் கரைத்து பயன்படுத்திய பின்னர், அவர் ஆழ்ந்த ஆன்மீக மாற்றங்களை அனுபவித்தார் — தினசரி பிரார்த்தனை செய்யத் தொடங்கினார், வழக்கமான தேவாலயச் செல்லும் பழக்கத்தை ஏற்படுத்தினார் மற்றும் திருத்தத்தை பின்பற்றினார். காலக்கட்டத்தில், அவர் நோய்களின் அற்புத சிகிச்சைகளை மற்றும் விசுவாசத்தின் ஆழத்தை காண்ந்தார். கிரேயுபாசனம் மரியன் உடன்படிக்கை அவரது வாழ்க்கையின் அடிப்படையாக மாறியது, காட்சிகள், கனவுகள் மற்றும் மத்தியில் பிரார்த்தனை மூலம் புனித தாயை நெருங்க வைத்தது, இது ஆறுதல் மற்றும் சிகிச்சையை வழங்கியது.\\n\\nஅவரது சாட்சி மையமாக உடன்படிக்கை உப்பு, எண்ணெய் மற்றும் பதக்கங்களை நம்பிக்கையுடன் பயன்படுத்தினார். இந்த புனித பொருட்கள் பல் வலி, தைராய்டு பிரச்சனைகள் மற்றும் காயங்களுக்கு சிகிச்சை அளிக்க முக்கிய பங்கு வகித்தன, மேலும் அவரது பேரனது மகள் நோயிலிருந்து குணமடைந்தார். புனித தாயின் இருப்பும் அருகாமையும் காட்சிகள் மற்றும் அதிசயமான இடையூறுகளால் வெளிப்பட்டது, இது அவரது உடன்படிக்கை வாழ்க்கைக்கு உறுதியை அளித்து பிரார்த்தனை மற்றும் தொண்டு பணிகளை ஊக்குவித்தது.\\n\\nஸ்வாமிநாதன் மரியன் உடன்படிக்கை மற்றும் கிரேயுபாசனம் கிருபையின் ஆற்றலை ஆன்மீகமாக, உடல் மற்றும் சமூக வாழ்வில் மாற்றத்தை ஏற்படுத்தும் என்று வலியுறுத்துகிறார். குடும்ப பிரார்த்தனையில் ஒற்றுமை, கனவுகள் மற்றும் காட்சிகளின் விளக்கத்தின் முக்கியத்துவம் மற்றும் தொடர்ந்த தொண்டு பணிகளை அவர் எடுத்துரைக்கிறார். அவரது சாட்சி உடன்படிக்கை புனித பொருட்களை ஏற்றுக்கொண்டு புனித தாயின் இடையூறு கோர, குணம், அமைதி மற்றும் ஆன்மீக புதுமையை அனுபவிக்க அனைவரையும் ஊக்குவிக்கிறது.","te":"కన్యాకుమారి మార్తాండం నుండి స్వామినాథన్ తన చిన్న కూతరు ద్వారా అందుకున్న మరియాని ఒప్పంద సామగ్రి, ఇందులో ఒక పుస్తకం మరియు తమిళ న్యూస్‌పేపర్ ఉన్నాయి, అందుకున్న తర్వాత తన మార్పును పంచుకున్నాడు. ఒప్పంద ఉప్పును తన ఆహారంలో కలిపి ఉపయోగించిన తర్వాత, ఆయన ఆధ్యాత్మికంగా గాఢమైన మార్పులు అనుభవించాడు—రోజూ ప్రార్థనలు ప్రారంభించి, నియమితంగా చర్చికి వెళ్లడం మరియు కబూలుదల చేయడం మొదలుపెట్టాడు. కాలానుగుణంగా, ఆయన అనారోగ్యాల ఆశ్చర్యకరమైన మెరుగుదలలు మరియు విశ్వాసం లో లోతైన పెరుగుదల చూశాడు. క్రేయుపాసనం మరియాని ఒప్పందం ఆయన జీవితం యొక్క ప్రాతిపదిక అయి, దర్శనాలు, స్వప్నాలు మరియు మధ్యవర్తిత్వం ద్వారా పవిత్ర తల్లి దగ్గరికి తీసుకొచ్చింది, ఇది సాంత్వన మరియు ఆరోగ్యాన్ని అందించింది.\\n\\nఅయన సాక్ష్యానికి కేంద్రం ఒప్పంద ఉప్పు, నూనె మరియు పతకం వంటి ఒప్పంద సంకీర్తనలు, అవి ఆయన విశ్వాసంగా ఉపయోగించాడు. ఈ పుణ్య సామగ్రి పళ్ల నొప్పి, థైరాయిడ్ సమస్యలు మరియు గాయాల వంటి శారీరక వ్యాధుల చికిత్సలో కీలక పాత్ర పోషించింది మరియు తన మనవరాలి ఆసుగల నుంచి కోలుకోవడంలో కూడా సహాయపడింది. దర్శనాలు మరియు అద్భుతమైన జోక్యాల ద్వారా వెల్లడైన పవిత్ర తల్లి యొక్క సాన్నిహిత్యం మరియు సమీపతనం ఆయన ఒప్పంద జీవితానికి కట్టుబాటును బలోపేతం చేసి ప్రార్థన మరియు దాతృత్వ చర్యలకు ప్రేరణ కలిగించింది.\\n\\nస్వామినాథన్ మరియాని ఒప్పందం మరియు క్రేయుపాసనం కృప యొక్క శక్తిని ఆధ్యాత్మికంగా, శారీరకంగా మరియు సామాజికంగా జీవితాలను మార్చడంలో ముఖ్యమని తెలిపారు. కుటుంబ ప్రార్థనలో ఐక్యత, స్వప్నాలు మరియు దర్శనాల అర్థం మరియు కొనసాగుతున్న దాతృత్వ మిషన్ ముఖ్యతను ఆయన వివరించారు. ఆయన సాక్ష్యం ఒప్పంద సంకీర్తనలను స్వీకరించమని, పవిత్ర తల్లి మధ్యవర్తిత్వం కోసం ప్రార్థించమని, ఆరోగ్యం, శాంతి మరియు ఆధ్యాత్మిక పునరుద్ధరణ అనుభవించమని ప్రోత్సహిస్తుంది.","fr":"Swaminathan de Kanyakumari Marthandam partage son parcours transformateur après avoir reçu les matériaux de l'Alliance Mariale, y compris un livre et un journal tamoul, par l'intermédiaire de sa plus jeune fille. Après avoir utilisé le sel de l'Alliance dissous dans sa nourriture, il a vécu des changements spirituels profonds — débutant des prières quotidiennes, une fréquentation régulière de l'église et la confession. Avec le temps, il a été témoin de guérisons remarquables de maladies et d'un approfondissement de la foi. L'Alliance Mariale de Kreupasanam est devenue le fondement de sa vie, le rapprochant de la Sainte Mère à travers des visions, des rêves et une intercession qui ont apporté réconfort et guérison.\\n\\nAu cœur de son témoignage se trouvent les sacrements de l'Alliance tels que le sel, l'huile et la médaille, qu'il a fidèlement utilisés. Ces objets sacramentels ont joué un rôle clé dans la guérison de maux physiques comme les maux de dents, les problèmes de thyroïde et les blessures, et ont également aidé sa petite-fille à se rétablir d'une maladie. La présence et la proximité de la Sainte Mère, révélées par des visions et des interventions miraculeuses, ont renforcé son engagement envers la vie de l'Alliance et inspiré des actes de prière et de charité.\\n\\nSwaminathan souligne la puissance de l'Alliance Mariale et de la grâce de Kreupasanam pour transformer les vies spirituellement, physiquement et socialement. Il met en avant l'unité familiale dans la prière, l'importance d'interpréter les rêves et les visions, ainsi que la mission continue de charité. Son témoignage encourage à embrasser les sacrements de l'Alliance, à chercher l'intercession de la Sainte Mère et à expérimenter la guérison, la paix et le renouveau spirituel."},"subtitles":"/assets/testimony/7jul.json"},{"id":6,"title":{"en":"A Marian Missionary","bn":"একজন মারিয়ান মিশনারি","zh":"一位玛利亚传教士","hi":"एक मरियम मिशनरी","kn":"ಒಬ್ಬ ಮೇರಿಯನ್ ಮಿಷನರಿ","mr":"एक मरियन मिशनरी","es":"Una misionera mariana","ta":"ஒரு மரியாள் பிரச்சாரகர்","te":"ఒక మరియ మిషనరీ","fr":"Une missionnaire mariale"},"date":"July 10, 2025","video":"https://youtu.be/8gDjNigl45w?si=Ads0q146wEjprSoL","content":{"en":"Tiji Justo and her family, now living in Canada, powerfully testify to the miracles they’ve experienced through the Kreupasanam Marian Covenant. Her story begins with a profound act of intercessory prayer—on behalf of her deaf and mute sister-in-law who, after seven years of infertility, was miraculously blessed with a healthy baby boy. Tiji consistently carried this intention within her own Covenant, spiritually placing the Covenant seal on her womb, praying with unwavering faith even across borders. In October 2023, her sister-in-law experienced a supernatural electric jolt while receiving Mother Mary's statue during Rosary month—a divine sign followed by confirmation of pregnancy the very next day. The child was born healthy in May 2024, a testimony to the power of prayer and Mother Mary’s intercession through the Covenant.\\n\\nTheir testimony continues with a series of immigration miracles. Despite immense hurdles—including IELTS challenges, WES rejection, missing certificates, courier delays, and nearing PR deadlines—Tiji and her husband leaned entirely on Covenant practices: applying Covenant oil and using blessed salt over documents. Through these deeply faithful acts, against all odds, the very IRCC that warned of rejection sent their PR approval one day before the deadline. They were even able to help another family, Sheena and Mithur, receive PR after being introduced to the Marian Covenant during a Rosary rally in Canada.\\n\\nNow committed to mission work, Tiji distributes Kreupasanam newspapers anointed with salt and prayer, walking in extreme weather through Canadian streets—sometimes to the point of physical pain—to share the Marian message. She fearlessly checks trash bins to ensure not a single paper is wasted and engages daily in digital evangelization for 400–500 people. Through prayer, sacrifice, and unwavering commitment to Jesus through Mary, her family’s life has become a living testament to the power of the Kreupasanam Marian Covenant, proving that faith, when sealed with the Covenant medal, oil, and salt, can break barriers and work miracles in every corner of the world.","bn":"তিজি জুস্টো এবং তার পরিবার, যারা এখন কানাডায় বসবাস করছেন, ক্রেউপাসানম মারিয়ান চুক্তির মাধ্যমে তারা যে অলৌকিক ঘটনা erlebt করেছেন তার শক্তিশালী সাক্ষ্য দেন। তার গল্প শুরু হয় অন্তরস্থ স্তরের মধ্যস্থতা প্রার্থনার মাধ্যমে—তার বধূ, যিনি বধূরূপে শ্রবণ এবং বাকপ্রতিবন্ধী, যিনি সাত বছর নিষ fertilityব্বতার পর আশ্চর্যজনকভাবে সুস্থ একটি ছেলে সন্তানের আশীর্বাদ পেয়েছেন। তিজি ধারাবাহিকভাবে তার নিজের চুক্তিতে এই উদ্দেশ্যটি বহন করেছেন, আধ্যাত্মিকভাবে চুক্তির সীল তার গর্ভে স্থাপন করে, সীমান্ত পেরিয়ে অবিচল বিশ্বাসে প্রার্থনা করেছেন। অক্টোবর ২০২৩ সালে, রোসারি মাসে তার বধূ মাদার মেরির মূর্তি গ্রহণ করার সময় অতিপ্রাকৃত একটি বৈদ্যুতিক ঝটকা অনুভব করেন—একটি ঐশ্বরিক চিহ্ন যা পরের দিন গর্ভাবস্থার নিশ্চিতকরণ দ্বারা অনুসরণ করা হয়। শিশুটি মে ২০২৪ সালে সুস্থ জন্মায়, যা প্রার্থনার শক্তি এবং মাদার মেরির মধ্যস্থতার সাক্ষ্য।\\n\\nতাদের সাক্ষ্য অব্যাহত থাকে বেশ কয়েকটি অভিবাসন অলৌকিক ঘটনার মাধ্যমে। বিশাল প্রতিবন্ধকতা সত্ত্বেও—আইইএলটিএস চ্যালেঞ্জ, ডাব্লিউইএস প্রত্যাখ্যান, হারানো সার্টিফিকেট, কুরিয়ার বিলম্ব এবং পিআর সময়সীমার নিকটে—তিজি এবং তার স্বামী সম্পূর্ণরূপে চুক্তির প্রথার উপর নির্ভর করেছেন: চুক্তির তেল প্রয়োগ এবং নথিপত্রে আশীর্বাদকৃত লবণ ব্যবহার করেছেন। এই গভীর বিশ্বাসের মাধ্যমে, সমস্ত সম্ভাবনার বিরুদ্ধে, সেই আইআরসিসি যা প্রত্যাখ্যানের সতর্কতা দিয়েছিল তাদের পিআর অনুমোদন মেয়াদ শেষের ঠিক এক দিন আগে পাঠায়। তারা এমনকি আরেকটি পরিবার, শীনা এবং মিথুরকেও সাহায্য করতে সক্ষম হয়েছেন, যাদের মেরিয়ান চুক্তির সঙ্গে পরিচয় করিয়ে দেওয়া হয়েছিল কানাডায় রোসারি র্যালির সময়।\\n\\nএখন মিশন কাজে নিবেদিত, তিজি ক্রেউপাসানম পত্রিকা লবণ এবং প্রার্থনা দ্বারা আশীর্বাদ করে বিতরণ করেন, কঠোর আবহাওয়ায় কানাডার রাস্তা ধরে হাঁটেন—কখনও কখনও শারীরিক ব্যথার পর্যায় পর্যন্ত—মেরিয়ান বার্তা ভাগাভাগি করতে। তিনি নির্ভয়ে আবর্জনা বিন পরীক্ষা করেন যাতে একটিও পত্রিকা নষ্ট না হয় এবং প্রতিদিন ডিজিটাল ইভাঙ্গেলাইজেশনে ৪০০-৫০০ জন মানুষের সাথে যুক্ত থাকেন। প্রার্থনা, ত্যাগ এবং যীশুর প্রতি অবিচল নিবেদন দ্বারা, মেরির মাধ্যমে তার পরিবারের জীবন ক্রেউপাসানম মারিয়ান চুক্তির শক্তির জীবন্ত সাক্ষ্য হয়ে উঠেছে, প্রমাণ করে যে বিশ্বাস, যখন চুক্তির মেডেল, তেল এবং লবণ দ্বারা সীলবদ্ধ হয়, তখন তা বাধা ভেঙে দেয় এবং বিশ্বের প্রত্যেক কোণায় অলৌকিক কাজ করে।","zh":"蒂吉·贾斯托（Tiji Justo）和她的家人现居加拿大，强烈见证了他们通过克鲁帕萨纳姆圣母盟约经历的奇迹。她的故事始于一次深切的代祷——为她那失聪且不能说话的弟媳祈祷，这位弟媳在七年不孕之后，奇迹般地怀孕并生下了一个健康的男孩。蒂吉始终在自己的盟约中承载着这个祈愿，精神上将盟约印章置于她的子宫上，即使跨越国界，也坚定不移地祈祷。2023年10月，在玫瑰经月期间，她的弟媳在接过圣母玛利亚的雕像时感受到一阵超自然的电击——这是一个神圣的迹象，紧接着第二天确认怀孕。孩子于2024年5月健康出生，证明了祷告的力量和圣母玛利亚通过盟约的代求。\\n\\n他们的见证还包括一系列的移民奇迹。尽管面临巨大挑战——包括雅思考试困难、WES拒绝、证书遗失、快递延误以及临近永久居民申请截止日期——蒂吉和她的丈夫完全依靠盟约的实践：在文件上涂抹盟约圣油并使用受祝福的盐。通过这些深厚的信仰行为，尽管困难重重，曾威胁拒绝他们的加拿大移民局（IRCC）却在截止日期前一天批准了他们的永久居民申请。他们甚至帮助了另一个家庭Sheena和Mithur，在加拿大的一次玫瑰经集会中被介绍给圣母盟约后获得了永久居民身份。\\n\\n现今，蒂吉致力于传教工作，分发用盐和祈祷祝福的克鲁帕萨纳姆报纸，不顾加拿大极端天气，徒步在街头传播圣母的信息——有时甚至忍受身体的痛苦。她勇敢地检查垃圾桶，确保没有一张报纸被浪费，并每天为400至500人进行数字化福音传教。通过祈祷、牺牲以及对耶稣通过圣母的坚定承诺，她的家庭成为了克鲁帕萨纳姆圣母盟约力量的活见证，证明了信仰在盟约的徽章、圣油和盐的封印下，能够打破障碍，在世界的每个角落创造奇迹。","hi":"तिजी जस्टो और उनका परिवार, जो अब कनाडा में रह रहे हैं, क्रेउपासनम मैरियन कॉवेनेंट के माध्यम से अनुभव किए गए चमत्कारों की सशक्त गवाही देते हैं। उनकी कहानी एक गहन मध्यस्थ प्रार्थना के साथ शुरू होती है—उनकी बहनोई की पत्नी के लिए, जो बधिर और मूक हैं और सात वर्षों की बांझपन के बाद एक स्वस्थ बेटे के साथ चमत्कारिक रूप से धन्य हुईं। तिजी ने अपने स्वयं के कॉवेनेंट में इस इरादे को निरंतर रखा, आध्यात्मिक रूप से कॉवेनेंट की मुहर अपने गर्भ पर रखकर, बिना डिगे विश्वास के साथ सीमाओं के पार प्रार्थना की। अक्टूबर 2023 में, रोज़री माह के दौरान उनकी बहनोई ने मदर मैरी की प्रतिमा ग्रहण करते समय एक अलौकिक इलेक्ट्रिक झटका महसूस किया—एक दिव्य संकेत जिसके तुरंत बाद अगले दिन गर्भावस्था की पुष्टि हुई। बच्चा मई 2024 में स्वस्थ जन्मा, जो प्रार्थना की शक्ति और कॉवेनेंट के माध्यम से मदर मैरी के मध्यस्थता की गवाही है।\\n\\nउनकी गवाही आप्रवासन के चमत्कारों की एक श्रृंखला के साथ जारी है। विशाल बाधाओं के बावजूद—आईईएलटीएस की चुनौतियाँ, डब्ल्यूईएस का अस्वीकार, लापता प्रमाण पत्र, कुरियर में देरी, और पीआर की समय सीमा के करीब—तिजी और उनके पति पूरी तरह से कॉवेनेंट प्रथाओं पर भरोसा करते हैं: दस्तावेज़ों पर कॉवेनेंट ऑयल लगाना और आशीर्वादित नमक का उपयोग करना। इन गहरे विश्वासपूर्ण क्रियाओं के माध्यम से, सभी बाधाओं के खिलाफ, वही IRCC जिसने अस्वीकृति की चेतावनी दी थी, ने अंतिम तारीख से एक दिन पहले उनकी पीआर मंजूरी भेजी। वे एक अन्य परिवार, शीना और मिथुर, को भी मदद कर पाए, जिन्हें कनाडा में एक रोज़री रैली के दौरान मैरियन कॉवेनेंट से परिचित कराया गया था।\\n\\nअब मिशन कार्य के लिए समर्पित, तिजी नमक और प्रार्थना से अभिषिक्त क्रेउपासनम समाचार पत्र वितरित करती हैं, कठोर मौसम में कनाडाई सड़कों पर चलती हैं—कभी-कभी शारीरिक पीड़ा तक पहुँचने तक—मैरियन संदेश साझा करने के लिए। वह निडर होकर कूड़ेदान की जाँच करती हैं ताकि एक भी पत्रिका व्यर्थ न हो और दैनिक रूप से 400-500 लोगों के लिए डिजिटल सुसमाचार कार्य में संलग्न रहती हैं। प्रार्थना, त्याग, और यीशु के प्रति अडिग समर्पण के माध्यम से, मैरी के द्वारा, उनका परिवार क्रेउपासनम मैरियन कॉवेनेंट की शक्ति का जीवंत प्रमाण बन गया है, जो साबित करता है कि विश्वास, जब कॉवेनेंट पदक, तेल, और नमक से सील किया जाता है, तो वह बाधाओं को तोड़ सकता है और दुनिया के हर कोने में चमत्कार कर सकता है।","kn":"ಟಿಜಿ ಜಸ್ಟೋ ಮತ್ತು ಅವರ ಕುಟುಂಬ ಈಗ ಕ್ಯಾನಡಾದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದಾರೆ. ಅವರು ಕ್ರೆಯುಪಸನಂ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯಿಂದ ಅನುಭವಿಸಿದ ಅದ್ಭುತಗಳನ್ನು ಶಕ್ತಿಶಾಲಿಯಾಗಿ ಸಾಕ್ಷ್ಯವನ್ನಾಗಿ ನೀಡುತ್ತಾರೆ. ಅವರ ಕಥೆ ಶ್ರವಣ ಮತ್ತು ಮಾತು ಇಲ್ಲದ ತಮ್ಮ ಸೊಸೆಯಿಗಾಗಿ ಮಾಡಿದ ಮಧ್ಯಸ್ಥ ಪ್ರಾರ್ಥನೆಯಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ. ಆಕೆ ಏಳು ವರ್ಷಗಳ ಬಂಜೆತನದ ನಂತರ ಅದ್ಭುತವಾಗಿ ಆರೋಗ್ಯವಂತ ಮಗುವನ್ನು ಪಡೆದರು. ಟಿಜಿ ತಮ್ಮ ಒಡಂಬಡಿಕೆಯಲ್ಲಿ ಈ ಉದ್ದೇಶವನ್ನು ನಿರಂತರವಾಗಿ ದೇವರ ಮುಂದೆ ಇಟ್ಟರು, ಆಕೆಯ ಗರ್ಭದ ಮೇಲೆ ಆಧ್ಯಾತ್ಮಿಕವಾಗಿ ಒಡಂಬಡಿಕೆ مهر ಚಿಹ್ನೆಯನ್ನು ಇಡುತ್ತಿದ್ದರು ಮತ್ತು ನಂಬಿಕೆಯೊಂದಿಗೆ ಪ್ರಾರ್ಥಿಸುತ್ತಿದ್ದರು—even borders didn't stop her.\\n\\nಅಕ್ಟೋಬರ್ 2023 ರಲ್ಲಿ, ರೋಸರಿ ತಿಂಗಳ ಸಮಯದಲ್ಲಿ, ಮದರ್ ಮೇರಿಯ ಪ್ರತಿಮೆಯನ್ನು ಸ್ವೀಕರಿಸುವಾಗ ಆಕೆ ವಿದ್ಯುತ್ ಶಾಕ್‌ನಂತ ಒಂದು ಅಸಾಮಾನ್ಯ ಅನುಭವವನ್ನು ಅನುಭವಿಸಿದರು—ಇದು ದಿವ್ಯ ಸಂಕೇತವಾಗಿದ್ದು, ಮುಂದಿನ ದಿನವೇ ಗರ್ಭಧಾರಣೆಯ ದೃಢೀಕರಣವಾಯಿತು. ಮಗುವು ಮೇ 2024 ರಲ್ಲಿ ಆರೋಗ್ಯವಂತನಾಗಿ ಹುಟ್ಟಿದನು—ಇದು ಪ್ರಾರ್ಥನೆಯ ಶಕ್ತಿಗೂ ಮದರ್ ಮೇರಿಯ ಮಧ್ಯಸ್ಥಿಕೆಯಿಗೂ ಸಾಕ್ಷಿಯಾಗಿದೆ.\\n\\nಅವರ ಸಾಕ್ಷ್ಯ ವಲಸೆ ಸಂಬಂಧಿತ ಅನೇಕ ಅದ್ಭುತಗಳನ್ನು ಮುಂದುವರಿಸುತ್ತದೆ. IELTS ಪರೀಕ್ಷೆಯ ತೊಂದರೆಗಳು, WES ನಿರಾಕರಣೆ, ಪ್ರಮಾಣಪತ್ರಗಳ ಕೊರತೆ, ಕೂರಿಯರ್ ವಿಳಂಬಗಳು ಮತ್ತು PR ಅವಧಿಯ ಅಂತಿಮ ದಿನಾಂಕದ ಒತ್ತಡಗಳ ನಡುವೆಯೂ, ಟಿಜಿ ಮತ್ತು ಅವರ ಪತಿಯು ಸಂಪೂರ್ಣವಾಗಿ ಒಡಂಬಡಿಕೆಗೆ ಶರಣಾಗಿ ಜೀವಿಸುತ್ತಿದ್ದರು: ದಾಖಲೆಗಳ ಮೇಲೆ ಎಣ್ಣೆ ಹಚ್ಚುವುದು ಮತ್ತು ಆಶೀರ್ವದಿತ ಉಪ್ಪನ್ನು ಬಳಸುವುದು. ಇಂತಹ ವಿಶ್ವಾಸದ ಕೆಲಸಗಳ ಮೂಲಕ, ನಿರಾಕರಣೆ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆ ನೀಡಿದ IRCC ಸಂಸ್ಥೆಯೇ ಅಂತಿಮ ದಿನಕ್ಕೊಂದು ದಿನ ಮೊದಲು ಅವರ PR ಅನ್ನು ಅನುಮೋದಿಸಿತು. ಅವರು ಕ್ಯಾನಡಾದ ರೋಸರಿ ಸಭೆಯಲ್ಲಿ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಪರಿಚಯಿಸಿದ ನಂತರ ಮತ್ತೊಬ್ಬ ಕುಟುಂಬವಾದ ಶೀನಾ ಮತ್ತು ಮಿಥುರಿಗೂ PR ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಿದರು.\\n\\nಈಗ ಅವರು ಮಿಷನ್ ಕಾರ್ಯಕ್ಕೆ ಬದ್ಧರಾಗಿದ್ದಾರೆ. ಟಿಜಿ ಆಶೀರ್ವದಿತ ಉಪ್ಪ ಮತ್ತು ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ ಕ್ರೆಯುಪಸನಂ ಪತ್ರಿಕೆಗಳನ್ನು ಕ್ಯಾನಡಾದ ಬೀದಿಗಳಲ್ಲಿ ತಂಪು ಹವಾಮಾನವನ್ನೂ ಮೀರಿ ಸಾಗಿಸುತ್ತಿದ್ದಾರೆ—ಅವರು ಶಾರೀರಿಕ ನೋವಿಗೆ ಕಾರಣವಾದರೂ ಸಹಿತ ಮೇರಿಯನ್ ಸಂದೇಶವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ. ಒಂದು ಪತ್ರಿಕೆಯೂ ವ್ಯರ್ಥವಾಗದಂತೆ ತಪಾಸಣೆಗೆ ಕಸದ ಬಿನ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತಾರೆ ಮತ್ತು ಪ್ರತಿದಿನ 400–500 ಜನರಿಗೆ ಡಿಜಿಟಲ್ ಸುವಾರ್ತೆ ಕಾರ್ಯ ಮಾಡುತ್ತಾರೆ. ಪ್ರಾರ್ಥನೆ, ತ್ಯಾಗ ಮತ್ತು ಮೇರಿಯ ಮೂಲಕ ಯೇಸುವಿನ ಕಡೆಗೆ ಬದ್ಧತೆಯ ಮೂಲಕ, ಅವರ ಕುಟುಂಬದ ಜೀವನವು ಕ್ರೆಯುಪಸನಂ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಶಕ್ತಿಗೆ ಜೀವಂತ ಸಾಕ್ಷಿಯಾಗಿದ್ದು, مهر, ಎಣ್ಣೆ ಮತ್ತು ಉಪ್ಪದ ಮೂಲಕ ಒಡಂಬಡಿಕೆಯಿಂದ ಮುದ್ರಿಸಲಾದ ನಂಬಿಕೆ ಪ್ರಪಂಚದ ಪ್ರತಿಯೊಂದು ಮೂಲೆಯಲ್ಲಿಯೂ ಅದ್ಭುತಗಳನ್ನು ಮಾಡಲು ಸಾಧ್ಯವೆಂಬುದನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.","mr":"कॅनडामध्ये वास्तव्यास असलेल्या टिजी जस्टो आणि त्यांच्या कुटुंबाने क्रेुपसानम मेरीयन कराराच्या माध्यमातून मिळालेल्या चमत्कारांची प्रभावी साक्ष दिली आहे. त्यांची कहाणी त्यांच्या बहिणीच्या सासूबाईंसाठी दिलेल्या मध्यस्थ प्रार्थनेपासून सुरू होते, ज्या ऐकू शकत नव्हत्या आणि बोलू शकत नव्हत्या, व सात वर्षांच्या वंध्यत्वानंतर त्यांना एक निरोगी मुलगा झाला. टिजीने हा हेतु आपल्या करारात समाविष्ट करून ठेवला, त्यांच्या गर्भावर कराराची शिक्का मोहर लावली आणि विश्वासाने प्रार्थना केली. ऑक्टोबर २०२३ मध्ये, रोझरी महिन्यात मरीया मातेची मूर्ती स्वीकारताना त्यांच्या बहिणीच्या सासूबाईना विद्युत झटका जाणवला—दिव्य संकेत—आणि दुसऱ्याच दिवशी गर्भधारणा झाल्याचे निश्चित झाले. मे २०२४ मध्ये निरोगी मूल जन्माला आले.\\n\\nत्यांची साक्ष इमिग्रेशन संबंधित अनेक चमत्कारांनी समृद्ध आहे. IELTS अडचणी, WES नकार, हरवलेली प्रमाणपत्रे, कुरिअरची विलंबता आणि PR ची अंतिम मुदत या सर्व अडचणींवर त्यांनी कराराच्या तैलाचा वापर करून, कागदपत्रांवर आशीर्वादीत मीठ लावून मात केली. जे IRCC आधी नकाराची सूचना देत होते, त्याच प्राधिकरणाने मुदतीच्या आदल्या दिवशी PR मंजुरी दिली. टिजी आणि तिच्या पतीने दुसऱ्या कुटुंबालाही PR मिळवून दिले.\\n\\nआता टिजी मिशन कार्यात पूर्णपणे समर्पित आहेत. त्या क्रेुपसानमच्या प्रार्थनेने आणि मीठाने अभिषिक्त झालेली वर्तमानपत्रे वितरीत करतात, थंड हवामानातही चालत असतात, कचऱ्याच्या डब्यात पाहून एकही प्रत वाया जाणार नाही याची खात्री करतात. त्या दररोज ४००–५०० लोकांपर्यंत डिजिटल साक्षात्कार पोहोचवतात. प्रार्थना, बलिदान, आणि मरीया मातेच्या माध्यमातून येशूकडे पूर्ण समर्पणामुळे, त्यांच्या कुटुंबाचे जीवन क्रेुपसानम मेरीयन कराराचे चमत्कारीक साक्षीदार झाले आहे.","es":"Tiji Justo y su familia, ahora residentes en Canadá, dan un poderoso testimonio de los milagros que han experimentado a través del Pacto Mariano de Kreupasanam. Su historia comienza con una profunda oración de intercesión por su cuñada, sorda y muda, que después de siete años de infertilidad fue bendecida milagrosamente con un niño sano. Tiji incluyó esta intención en su propio Pacto, aplicando espiritualmente el sello del Pacto sobre su vientre y orando con fe inquebrantable. En octubre de 2023, durante el mes del Rosario, su cuñada sintió una descarga eléctrica sobrenatural al recibir la estatua de la Virgen María—una señal divina que fue seguida por la confirmación del embarazo al día siguiente. El niño nació sano en mayo de 2024.\\n\\nSu testimonio continúa con una serie de milagros migratorios. A pesar de obstáculos como el IELTS, el rechazo de WES, la falta de documentos, retrasos de mensajería y fechas límites para la residencia permanente, Tiji y su esposo confiaron plenamente en las prácticas del Pacto: aplicando aceite del Pacto y usando sal bendita sobre los documentos. Milagrosamente, la misma oficina de IRCC que antes advirtió sobre el rechazo aprobó su solicitud un día antes de la fecha límite. Incluso ayudaron a otra familia, Sheena y Mithur, a recibir su residencia tras conocer el Pacto durante un Rosario en Canadá.\\n\\nAhora, comprometida con la misión, Tiji distribuye periódicos de Kreupasanam ungidos con sal y oración, caminando por las frías calles canadienses, incluso con dolor físico, para compartir el mensaje de María. Revisa los contenedores de basura para asegurarse de que ningún periódico se desperdicie y evangeliza digitalmente a 400–500 personas al día. A través de la oración, el sacrificio y la fidelidad a Jesús por medio de María, su familia es un testimonio viviente del poder del Pacto Mariano de Kreupasanam.","ta":"இப்போது கனடாவில் வசித்து வரும் டிஜி ஜஸ்டோ மற்றும் அவரது குடும்பம், கிரெயுபசானம் மரியாள் உடன்படிக்கையின் வழியாக பெற்ற அதிசயங்களை வலிமையான முறையில் சாட்சியம் கூறுகிறார்கள். அவர்களின் கதை, செவியிலும் வாயிலும் குறைவுள்ள மருமகளுக்காக அன்போடு மேற்கொண்ட மத்தியஸ்த ஜெபத்தால் துவங்குகிறது. ஏழு ஆண்டுகள் வண்டிலாக இருந்த அவருக்கு, திருவிழிகளின் மாதமான அக்டோபர் 2023 இல், அன்னையின் சிலையை ஏற்கும்போது மின்னிழுக்கத்தைப்போல் ஒரு உணர்வு ஏற்பட்டது. அதற்கடுத்த நாளே கர்ப்பம் உறுதி செய்யப்பட்டது. 2024 மே மாதத்தில், ஒரு ஆரோக்கியமான மகன் பிறந்தான்.\\n\\nஅவர்கள் வெளிநாட்டு குடியேற்றத்தில் எதிர்கொண்ட சவால்கள்—IELTS, WES மறுப்பு, சான்றிதழ்கள் இழப்பு, தாமதங்கள், இறுதி தேதிகள் ஆகியவற்றையும் அவர்கள் மரியாள் உடன்படிக்கையின் எண்ணெயும், உப்பும் பயன்படுத்தி கடந்து வந்தனர். மறுப்பு எச்சரிக்கை அளித்த IRCC ஒரே நாளில் PR வழங்கியது. மேலும், கனடாவில் ரோசரி நிகழ்வில் மரியாள் உடன்படிக்கையை அறிந்த சீனா மற்றும் மிதுர் என்ற குடும்பத்திற்கும் PR உதவியளித்தனர்.\\n\\nஇப்போது டிஜி ஒரு மிஷனரி வாழ்க்கையை நடத்துகிறார். உப்பும் ஜெபமும் கொண்டு ஆசீர்வதிக்கப்பட்ட கிரெயுபசானம் செய்தித்தாள்களை வீடுகளுக்கு பகிர்ந்து வருகின்றார்—even துன்பகரமான குளிரிலும். ஒரு செய்தித்தாளும் வீணாகாமல் இருக்கும் வகையில், குப்பைத்தொட்டிகளை கூட சோதிக்கிறார். தினசரி 400–500 நபர்களுக்கு ஆன்மீக செய்திகளை டிஜிட்டல் வழியாக பகிர்ந்து வருகிறார். மரியாளின் வழியாக இயேசுவை உணர்ந்து, ஜெபமும், தியாகமும், உறுதியும் கொண்டு, அவரது குடும்பம் கிரெயுபசானம் மரியாள் உடன்படிக்கையின் வாழும் சாட்சியாக மாறியுள்ளது.","te":"ఇప్పుడు కెనడాలో నివసిస్తున్న టిజీ జస్టో మరియు ఆమె కుటుంబం క్రెయుపసానం మరియమ్మ ఒప్పందం ద్వారా అనుభవించిన అద్భుతాలను శక్తివంతంగా సాక్ష్యం ఇస్తున్నారు. ఆమె కథ శ్రవణ లోపముతో కూడిన తన మరిది భార్య కోసం చేసిన మధ్యవర్తిత్వ ప్రార్థనతో మొదలవుతుంది. ఏడు సంవత్సరాల వంధ్యత్వానంతరం ఒక ఆరోగ్యవంతమైన బాబు ఆశీర్వదించబడింది. టిజీ ఈ ఉద్దేశాన్ని తన ఒప్పందంలో నిలిపి, ఆమె గర్భంపై ఒప్పంద ముద్రను ఆధ్యాత్మికంగా ఉంచి, నమ్మకంతో ప్రార్థించారు. అక్టోబర్ 2023లో రోసరీ నెలలో మరియమ్మ విగ్రహాన్ని స్వీకరించినప్పుడు ఆమెకు ఒక భౌతిక షాక్ వచ్చినట్టు అనిపించింది—దివ్య సంకేతం. మరుసటి రోజు గర్భధారణ నిర్ధారణ అయింది. మే 2024లో ఆ బాబు ఆరోగ్యంగా పుట్టాడు.\\n\\nఇమ్మిగ్రేషన్ అడ్డంకులను కూడా వారు ప్రార్థనతో అధిగమించారు: IELTS, WES తిరస్కరణ, సర్టిఫికేట్ సమస్యలు, కూరియర్ ఆలస్యం, PR గడువు వంటి వాటిని కూడా, టిజీ మరియు ఆమె భర్త ఒప్పంద నూనెను పత్రాలపై రాస్తూ, ఆశీర్వదించిన ఉప్పును ఉపయోగిస్తూ విశ్వాసంతో ఎదుర్కొన్నారు. తిరస్కరణను హెచ్చరించిన IRCC ఒక రోజు ముందు PR మంజూరు చేసింది. అలాగే, శీనా మరియు మిథూర్ అనే మరో కుటుంబానికి కూడా రోసరీ సందర్భంగా మరియమ్మ ఒప్పందాన్ని పరిచయం చేసి PR వచ్చేలా సహాయపడ్డారు.\\n\\nఇప్పుడు టిజీ తన జీవితాన్ని మిషనరీ సేవకు అంకితం చేశారు. క్రెయుపసానం పత్రికలను ఉప్పు మరియు ప్రార్థనతో అభిషేకించి, తీవ్రమైన వాతావరణంలో కూడా వీధుల్లో పంపిణీ చేస్తున్నారు. ఒక్క పత్రిక కూడా వ్యర్థం కాకుండా చూసేందుకు చెత్త బిన్లు కూడా తనిఖీ చేస్తారు. రోజూ 400–500 మందికి డిజిటల్ సువార్త ప్రచారం చేస్తున్నారు. ప్రార్థన, త్యాగం మరియు మరియమ్మ ద్వారా యేసుని అనుసరించడంలో వారి కుటుంబం క్రెయుపసానం ఒప్పంద శక్తిని జీవంగా ప్రతిబింబిస్తోంది.","fr":"Tiji Justo et sa famille, aujourd'hui installés au Canada, témoignent puissamment des miracles vécus grâce à l'Alliance Mariale de Kreupasanam. L'histoire commence par une intense prière d'intercession pour sa belle-sœur, sourde et muette, qui, après sept années d'infertilité, a été miraculeusement bénie d'un petit garçon en bonne santé. Tiji portait cette intention dans son propre engagement, appliquant spirituellement le sceau de l’Alliance sur son propre ventre et priant avec foi. En octobre 2023, au mois du Rosaire, sa belle-sœur a ressenti une secousse électrique en recevant la statue de la Vierge—un signe divin suivi dès le lendemain de la confirmation de grossesse. L’enfant est né en bonne santé en mai 2024.\\n\\nLeur témoignage continue avec une série de miracles liés à l’immigration. Malgré de nombreuses difficultés—IELTS, refus du WES, documents manquants, retards de courrier, et échéance imminente pour la résidence permanente—Tiji et son mari se sont totalement confiés aux pratiques de l’Alliance : application d’huile bénite et sel consacré sur les documents. Contre toute attente, l’IRCC a accordé leur résidence un jour avant l’échéance. Ils ont même aidé une autre famille, Sheena et Mithur, à recevoir la résidence après avoir découvert l’Alliance Mariale lors d’un Rosaire au Canada.\\n\\nAujourd’hui missionnaire engagée, Tiji distribue des journaux Kreupasanam bénis avec du sel et de la prière dans les rues canadiennes malgré le froid, allant jusqu’à fouiller les poubelles pour éviter tout gaspillage. Elle évangélise également chaque jour 400 à 500 personnes par voie numérique. Grâce à la prière, au sacrifice et à une fidélité totale à Jésus à travers Marie, leur famille est devenue un témoignage vivant de la puissance de l’Alliance Mariale de Kreupasanam."},"subtitles":"/assets/testimony/10jul.json"},{"id":7,"title":{"en":"Blessed by God","bn":"ঈশ্বরের আশীর্বাদপ্রাপ্ত","zh":"蒙神祝福","hi":"भगवान का आशीर्वाद","kn":"ದೇವರ ಆಶೀರ್ವಾದ","mr":"देवाकडून आशीर्वादित","es":"Bendecido por Dios","ta":"கடவுளின் ஆசீர்வாதம்","te":"దేవుడు ఆశీర్వదించిన","fr":"Béni par Dieu"},"date":"July 11, 2025","video":"https://youtu.be/n9pO0tnUIFA?si=d-laRFm6Xs9O-3cy","content":{"en":"Soumya Manoj from Pathanamthitta shares a powerful testimony of transformation through the Kreupasanam Marian Covenant. Starting with the online covenant in August 2022 and later the pilgrimage covenant, she and her husband embraced a covenant life centered on prayer and faith in Jesus and Mother Mary. They experienced miraculous healings, including her husband's severe cellulitis infection healing without surgery and her own 23-year irregular menstrual cycle becoming regular without medication. Since entering covenant life, her husband, who has diabetes, has not needed medication. Their daily devotion to apparition prayers and rosaries gave them strength to endure suffering.\\n\\nTheir blessings extended beyond health to financial breakthroughs and provision for a home called Kripabhavan. They credit these blessings to the spiritual power of the Marian Covenant and sacramentals like Covenant Salt, Covenant Oil, and the Covenant Medal from Kreupasanam. Through persistent prayer, candle lighting, and faith, they overcame challenges to purchase land, settle debts, and complete their house. Their covenant life also inspired charitable acts, including feeding the hungry and caring for the sick, praying for others with forgiveness and compassion.\\n\\nEven amid trials like the loss of their infant and her mother's passing, Soumya found peace by uniting her suffering with Christ's. The Kreupasanam Marian Covenant transformed their despair into hope, teaching them to endure suffering with grace. Today, they live as grateful witnesses to God's blessings, praying for others and glorifying Jesus and Mother Mary. Their story testifies to the power of covenant life, sacramentals, and steadfast faith.","bn":"পাথানমথিত্তার সুময় মনোজ কৃপাসনাম মেরিয়ান চুক্তির মাধ্যমে রূপান্তরের একটি শক্তিশালী সাক্ষ্য ভাগ করেছেন। আগস্ট ২০২২-এ অনলাইন চুক্তি নিয়ে শুরু করে এবং পরে তীর্থযাত্রার চুক্তি গ্রহণ করে, তিনি এবং তাঁর স্বামী যীশু ও পবিত্র মায়ার প্রতি প্রার্থনা এবং বিশ্বাসে কেন্দ্র করে চুক্তির জীবন শুরু করেন। তারা বিস্ময়কর আরোগ্য লাভ করেন, যার মধ্যে তার স্বামীর তীব্র সেলুলাইটিস সংক্রমণ অপারেশন ছাড়াই সেরে ওঠা এবং তার নিজস্ব ২৩ বছর ধরে অনিয়মিত মাসিক চক্র চিকিৎসা ছাড়াই নিয়মিত হওয়া রয়েছে। চুক্তি জীবনে প্রবেশ করার পর থেকে, তার স্বামী, যিনি ডায়াবেটিসে আক্রান্ত, কোন ওষুধ নেননি। দৈনিক প্রকাশনা প্রার্থনা এবং রোসারি তাদের কষ্ট সহ্য করার শক্তি দিয়েছে।\\n\\nতাদের আশীর্বাদ স্বাস্থ্যসেবা ছাড়াও আর্থিক অগ্রগতি এবং ‘কৃপাভবন’ নামক বাড়ির জন্য ব্যবস্থা পর্যন্ত বিস্তৃত হয়েছে। তারা এই আশীর্বাদগুলি মেরিয়ান চুক্তি এবং কৃপাসনাম থেকে প্রাপ্ত চুক্তি লবণ, চুক্তি তেল এবং চুক্তি মেডালের আধ্যাত্মিক শক্তির জন্য কৃতজ্ঞ। অবিরত প্রার্থনা, মোমবাতি জ্বালানো এবং বিশ্বাসের মাধ্যমে তারা জমি কিনতে, ঋণ পরিশোধ করতে এবং বাড়ি শেষ করতে চ্যালেঞ্জগুলি পার করেছে। তাদের চুক্তি জীবন দয়ালু কাজকর্মকে অনুপ্রাণিত করেছে, যেমন ক্ষুধার্তদের খাওয়ানো এবং অসুস্থদের যত্ন নেওয়া, ক্ষমাশীল ও করুণাময় হৃদয়ে অন্যদের জন্য প্রার্থনা করা।\\n\\nশিশুর মৃত্যু এবং মায়ের মৃত্যুর মতো পরীক্ষার মধ্যেও, সুময়া খ্রিস্টের সঙ্গে তার কষ্ট মিলিয়ে শান্তি পেয়েছেন। কৃপাসনাম মেরিয়ান চুক্তি তাদের হতাশাকে আশা হিসেবে রূপান্তরিত করেছে, দয়া সহ্য করার শিক্ষা দিয়েছে। আজ তারা ঈশ্বরের আশীর্বাদের জন্য কৃতজ্ঞ সাক্ষী হিসেবে জীবন যাপন করছেন, অন্যদের জন্য প্রার্থনা করছেন এবং যীশু ও পবিত্র মায়াকে গৌরব দিচ্ছেন। তাদের গল্প চুক্তির জীবন, চুক্তি পদার্থ এবং দৃঢ় বিশ্বাসের শক্তির সাক্ষ্য।","zh":"来自帕坦南蒂塔的Soumya Manoj分享了通过Kreupasanam圣母盟约带来的深刻转变见证。她于2022年8月开始线上盟约，随后接受朝圣盟约，她和丈夫一起践行以祷告和对耶稣及圣母玛利亚的信仰为核心的盟约生活。他们经历了奇迹般的治愈，包括她丈夫严重的蜂窝织炎在未动手术的情况下康复，以及她本人23年来不规则的月经周期在未用药的情况下变得规律。进入盟约生活后，她患有糖尿病的丈夫不再需要服药。他们每天虔诚地进行显现祷告和念玫瑰经，赋予他们忍受痛苦的力量。\\n\\n他们的祝福不仅限于健康，还包括经济突破和为名为Kripabhavan的家提供条件。他们将这些祝福归功于圣母盟约的灵性力量及Kreupasanam的圣物，如盟约盐、盟约油和盟约勋章。通过坚持祈祷、点灯和信仰，他们克服了购买土地、偿还债务和完成住房建设的困难。他们的盟约生活也激励他们进行慈善行为，包括喂养饥饿者和照顾病患，以宽恕和慈悲之心为他人祈祷。\\n\\n即使在失去婴儿和母亲去世的考验中，Soumya通过与基督同苦找到了平安。Kreupasanam圣母盟约将他们的绝望转化为希望，教导他们以恩典忍受苦难。如今，他们作为感恩的见证者生活，为他人祈祷，赞美耶稣和圣母玛利亚。他们的故事见证了盟约生活、圣物和坚定信仰的力量。","hi":"पठानमथिट्टा की सौम्या मनोज ने क्रुपासनाम मेरीअन संधि के माध्यम से अपने जीवन में आए बदलाव की एक सशक्त गवाही साझा की है। अगस्त 2022 में ऑनलाइन संधि से शुरू होकर बाद में तीर्थ यात्रा संधि लेकर, उन्होंने और उनके पति ने यीशु और माता मरियम में प्रार्थना और विश्वास के केंद्रित संधि जीवन को अपनाया। उन्होंने चमत्कारिक उपचारों का अनुभव किया, जिसमें पति के गंभीर सेल्युलाइटिस संक्रमण का बिना सर्जरी के ठीक होना और उनकी 23 साल की अनियमित मासिक धर्म चक्र का बिना दवा के नियमित होना शामिल है। संधि जीवन में प्रवेश करने के बाद, उनके पति, जो डायबिटीज के मरीज हैं, को दवाइयों की आवश्यकता नहीं पड़ी। दैनिक प्रार्थना और माला जाप ने उन्हें दुख सहने की शक्ति दी।\\n\\nउनके आशीर्वाद केवल स्वास्थ्य तक सीमित नहीं थे, बल्कि वित्तीय उन्नति और कृपाभवन नामक घर की व्यवस्था तक फैले। वे इन आशीर्वादों को मेरीअन संधि और क्रुपासनाम से प्राप्त संधि नमक, संधि तेल, और संधि पदक की आध्यात्मिक शक्ति का फल मानते हैं। लगातार प्रार्थना, मोमबत्ती जलाने, और विश्वास के माध्यम से उन्होंने जमीन खरीदने, कर्ज चुकाने, और घर पूरा करने की चुनौतियों को पार किया। उनकी संधि जीवन ने दान कार्यों को भी प्रेरित किया, जैसे भूखे लोगों को भोजन देना और बीमारों की देखभाल करना, क्षमा और करुणा के साथ दूसरों के लिए प्रार्थना करना।\\n\\nशिशु के निधन और उनकी माता के निधन जैसे कठिन समय के बीच, सौम्या ने अपने दुख को मसीह के साथ मिलाकर शांति पाई। क्रुपासनाम मेरीअन संधि ने उनके निराशा को आशा में बदला, और उन्हें अनुग्रह के साथ दुःख सहने की शिक्षा दी। आज वे ईश्वर के आशीर्वाद के कृतज्ञ साक्षी के रूप में जीवन यापन कर रहे हैं, दूसरों के लिए प्रार्थना कर रहे हैं, और यीशु तथा माता मरियम की महिमा गा रहे हैं। उनकी कहानी संधि जीवन, संधि सामग्री, और दृढ़ विश्वास की शक्ति का प्रमाण है।","kn":"ಪಾತಾನಮತ್ತಿತ್ತದ ಸೌಮ್ಯ ಮನೋಜ್ ಅವರು ಕ್ರುಪಾಸನಾಮ್ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯಿಂದ ಅನುಭವಿಸಿದ ಪರಿವರ್ತನೆಯ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ. 2022ರ ಆಗಸ್ಟ್‌ನಲ್ಲಿ ಆನ್‌ಲೈನ್ ಒಡಂಬಡಿಕೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ ನಂತರ ಯಾತ್ರೆ ಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿ, ಅವರು ಮತ್ತು ಅವರ ಪತಿ ಯೇಸು ಮತ್ತು ಪವಿತ್ರ ಮರಿಯವರಲ್ಲಿ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ನಂಬಿಕೆಗೆ ಕೇಂದ್ರಿತ ಒಡಂಬಡಿಕಿನ ಜೀವನವನ್ನು ಸ್ವೀಕರಿಸಿದರು. ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯಿಲ್ಲದೆ ಅವರ ಗಂಭೀರ ಸೆಲುಲೈಟಿಸ್ ಸೋಂಕಿನ ಗುಣಮುಖತೆಯೊಂದಿಗೆ ಅವರ ಪತಿಯ ಗುಣಮುಖತೆಯನ್ನು ಮತ್ತು 23 ವರ್ಷಗಳ ಅವ್ಯವಸ್ಥಿತ ಮಾಸಿಕಚಕ್ರವನ್ನು ಔಷಧಿ ಇಲ್ಲದೆ ನಿಯಮಿತವಾಗಿಸುವಂತಹ ಅದ್ಭುತ ಸುದ್ಧಿಗಳನ್ನು ಅವರು ಅನುಭವಿಸಿದ್ದಾರೆ. ಒಡಂಬಡಿಕಿನ ಜೀವನಕ್ಕೆ ಪ್ರವೇಶಿಸಿದ ನಂತರ, ಮಧುಮೇಹದಿಂದ ಬಳಲುತ್ತಿರುವ ಅವರ ಪತಿ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕಾಗಿಲ್ಲ. ದೈನಂದಿನ ಕಾಣಿಕೆ ಪ್ರಾರ್ಥನೆಗಳು ಮತ್ತು ರೋಸರಿ ಪ್ರಾರ್ಥನೆಗಳು ಅವರಿಗೆ ತೊಂದರೆಗಳನ್ನು ಸಹಿಸಲು ಶಕ್ತಿಯನ್ನು ನೀಡಿವೆ.\\n\\nಆರೋಗ್ಯದ ಹೊರತಾಗಿ ಅವರ ಆಶೀರ್ವಾದಗಳು ಹಣಕಾಸಿನ ಸಾಧನೆಗಳಿಗೂ ಮತ್ತು ಕ್ರಿಪಾಭವನ ಎಂದು ಹೆಸರಿಸಲಾದ ಮನೆಗಾಗಿ ವ್ಯವಸ್ಥೆಗೆ ವಿಸ್ತರಿಸಿದವು. ಅವರು ಈ ಆಶೀರ್ವಾದಗಳನ್ನು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಗೆ ಮತ್ತು ಕ್ರುಪಾಸನಾಮ್‌ನ ಒಡಂಬಡಿಕೆ ಉಪ್ಪು, ಒಡಂಬಡಿಕೆ ಎಣ್ಣೆ ಮತ್ತು ಒಡಂಬಡಿಕೆ ಮೆಡಲ್ ಹೋಲುವ ಧಾರ್ಮಿಕ ವಸ್ತುಗಳಿಗೆ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತಾರೆ. ನಂಬಿಕೆ, ಪ್ರಾರ್ಥನೆ ಮತ್ತು ದೀಪ ಜ್ವಾಲೆಗಳಿಂದ ಅವರು ಭೂಮಿಯನ್ನು ಖರೀದಿಸುವುದು, ಸಾಲಗಳನ್ನು ಮುಗಿಸುವುದು ಮತ್ತು ತಮ್ಮ ಮನೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸುವುದು ಮುಂತಾದ ಸವಾಲುಗಳನ್ನು ಮೀರಿ ಬಂದಿದ್ದಾರೆ. ಅವರ ಒಡಂಬಡಿಕೆ ಜೀವನವು ಹಸಿದವರ ಆಹಾರ ಒದಗಿಸುವುದು ಮತ್ತು ಅಸ್ವಸ್ಥರ ಆರೈಕೆ ಮಾಡುವುದು ಸೇರಿದಂತೆ ದಯಾಳು ಕಾರ್ಯಗಳನ್ನು ಪ್ರೇರೇಪಿಸಿತು, ಕರುಣೆ ಮತ್ತು ಕ್ಷಮೆಯ ಹೃದಯದಿಂದ ಇತರರಿಗಾಗಿ ಪ್ರಾರ್ಥಿಸುವುದು.\\n\\nತಮ್ಮ ಶಿಶುವಿನ ಕಳೆತನ ಮತ್ತು ತಮ್ಮ ತಾಯಿಯ ಅಗಲಿಕೆಗೆ ತಾತ್ಕಾಲಿಕವಾಗಿದ್ದರೂ ಸಹ, ಸೌಮ್ಯ ಕ್ರಿಸ್ತನೊಂದಿಗೆ ತನ್ನ ನೋವನ್ನು ಏಕತೆಯಾಗಿಸಿಕೊಂಡು ಶಾಂತಿಯನ್ನು ಕಂಡುಕೊಂಡಳು. ಕ್ರುಪಾಸನಾಮ್ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಅವರ ನಿರಾಸೆಯನ್ನು ಆಶಾಕ್ಕೆ ಪರಿವರ್ತಿಸಿದೆ ಮತ್ತು ಅನುಗ್ರಹದಿಂದ ನೋವನ್ನು ಸಹಿಸುವುದನ್ನು ಕಲಿಸಿದೆ. ಇವತ್ತು ಅವರು ದೇವರ ಆಶೀರ್ವಾದಗಳಿಗೆ ಕೃತಜ್ಞರಾಗಿ ಜೀವಿಸುತ್ತಿದ್ದಾರೆ, ಇತರರಿಗಾಗಿ ಪ್ರಾರ್ಥಿಸುತ್ತಿದ್ದಾರೆ ಮತ್ತು ಯೇಸು ಮತ್ತು ಪವಿತ್ರ ಮರಿಯವರ ಮಹಿಮೆ ಮಾಡುತ್ತಾರೆ. ಅವರ ಕಥೆ ಒಡಂಬಡಿಕೆ ಜೀವನ, ಧಾರ್ಮಿಕ ವಸ್ತುಗಳು ಮತ್ತು ಅಚಲವಾದ ನಂಬಿಕೆಯ ಶಕ್ತಿಗೆ ಸಾಕ್ಷ್ಯವಾಗಿದೆ.","mr":"पठानमथिट्टा येथील सौम्या मनोज यांनी क्रुपासनाम मेरीयन कराराद्वारे जीवनात आलेल्या रूपांतराची ताकदवान साक्षी दिली आहे. ऑगस्ट 2022 मध्ये ऑनलाइन करार घेऊन नंतर तीर्थयात्रेचा करार स्वीकारून, ती आणि तिचा नवरा येशू आणि माता मरियमवर प्रार्थना आणि श्रद्धा केंद्रित करार जीवन स्वीकारले. त्यांनी आश्चर्यकारक उपचार अनुभवले, ज्यात नवऱ्याच्या गंभीर सेलुलायटिस संक्रमणावर शस्त्रक्रिये शिवाय बरे होणे आणि स्वतःचा 23 वर्षांचा अनियमित मासिक पाळीचा चक्र औषधाशिवाय नियमित होणे यांचा समावेश आहे. करार जीवनात प्रवेश केल्यापासून, तिच्या नवऱ्याला, ज्यांना मधुमेह आहे, औषधांची गरज नाही. दररोजच्या प्रार्थना आणि माळा जपांनी त्यांना वेदना सहन करण्यासाठी बळ दिले.\\n\\nत्यांचे आशीर्वाद केवळ आरोग्यापुरते मर्यादित नव्हते तर आर्थिक प्रगती आणि कृपाभवन नावाच्या घरासाठी तरतूद पर्यंत पोहोचले. ते या आशीर्वादांना मेरीयन कराराच्या आध्यात्मिक शक्ती आणि क्रुपासनाममधील करार मीठ, करार तेल आणि करार पदक यांसारख्या पवित्र वस्तूंचे श्रेय देतात. सातत्यपूर्ण प्रार्थना, मेणबत्ती प्रज्वलन आणि श्रद्धेद्वारे त्यांनी जमीन खरेदी करणे, कर्ज फेडणे आणि घर पूर्ण करणे या आव्हानांवर मात केली. त्यांचे करार जीवन भूकेल्यांना अन्न देणे आणि आजारींची काळजी घेणे यासह दयाळू कामांनाही प्रेरणा देणारे होते, क्षमाशीलतेने आणि करुणेने इतरांसाठी प्रार्थना करणे.\\n\\nशिशूच्या मृत्यू आणि आईच्या निधनासारख्या आव्हानांदरम्यानही, सौम्याने ख्रिस्तासह आपल्या वेदनांना एकत्र करून शांती अनुभवली. क्रुपासनाम मेरीयन कराराने त्यांच्या निराशेला आशेत रूपांतरित केले आणि त्यांना कृपेने वेदना सहन करण्याचे शिकलो. आज ते देवाच्या आशीर्वादांचे कृतज्ञ साक्षीदार म्हणून जीवन जगत आहेत, इतरांसाठी प्रार्थना करत आहेत आणि येशू व माता मरियमची स्तुती करत आहेत. त्यांची कथा करार जीवन, पवित्र वस्तू आणि ठाम श्रद्धेच्या सामर्थ्याची साक्ष आहे.","es":"Soumya Manoj de Pathanamthitta comparte un poderoso testimonio de transformación a través del Pacto Marian de Kreupasanam. Comenzando con el pacto en línea en agosto de 2022 y luego con el pacto de peregrinación, ella y su esposo adoptaron una vida de pacto centrada en la oración y la fe en Jesús y la Madre María. Experimentaron sanaciones milagrosas, incluyendo la infección severa de celulitis de su esposo que sanó sin cirugía y su propio ciclo menstrual irregular durante 23 años que se volvió regular sin medicación. Desde que entraron en la vida de pacto, su esposo, quien tiene diabetes, no ha necesitado medicación. Su devoción diaria a las oraciones de apariciones y rosarios les dio fuerza para soportar el sufrimiento.\\n\\nSus bendiciones se extendieron más allá de la salud a avances financieros y la provisión de una casa llamada Kripabhavan. Atribuyen estas bendiciones al poder espiritual del Pacto Marian y sacramentales como la Sal del Pacto, el Aceite del Pacto y la Medalla del Pacto de Kreupasanam. A través de la oración persistente, el encendido de velas y la fe, superaron desafíos para comprar tierras, saldar deudas y completar su casa. Su vida de pacto también inspiró actos caritativos, incluyendo alimentar a los hambrientos y cuidar a los enfermos, orando por otros con perdón y compasión.\\n\\nIncluso en medio de pruebas como la pérdida de su bebé y el fallecimiento de su madre, Soumya encontró paz al unir su sufrimiento con el de Cristo. El Pacto Marian de Kreupasanam transformó su desesperación en esperanza, enseñándoles a soportar el sufrimiento con gracia. Hoy, viven como testigos agradecidos de las bendiciones de Dios, orando por otros y glorificando a Jesús y a la Madre María. Su historia testifica el poder de la vida de pacto, los sacramentales y la fe firme.","ta":"பாதநம்திட்டாவில் இருந்து சௌம்யா மனோஜ் கிருபாசனம் மரியன் உடன்படிக்கையின் மூலம் மாற்றத்தை கொண்டுவரும் சக்திவாய்ந்த சாட்சி பகிர்கிறார். ஆகஸ்ட் 2022-ல் ஆன்லைன் உடன்படிக்கையுடன் தொடங்கி பின்னர் pielgrimage உடன்படிக்கை பெற்ற அவர் மற்றும் அவருடைய கணவர் இயேசு மற்றும் தாய்மாரியாவில் பணிவும் விசுவாசமும் கொண்ட உடன்படிக்கை வாழ்க்கையை ஏற்றுக்கொண்டனர். அவர்களது கணவரின் தீவிர செலுலைடிஸ் தொற்று அறுவை சிகிச்சை இல்லாமல் குணமடைந்தது மற்றும் 23 ஆண்டுகளுக்கு மேலான அவருடைய ஒழுங்கற்ற மாதவிடாய் சுழற்சி மருந்து இல்லாமல் ஒழுங்காக ஆனது போன்ற அற்புத சிகிச்சைகளை அவர்கள் அனுபவித்தனர். உடன்படிக்கை வாழ்க்கைக்கு வந்தபின், அவரது கணவர், உடல் சர்க்கரை நோயால் பாதிக்கப்பட்டவர், மருந்துகள் தேவையில்லை. அவர்கள் அப்பரிஷன் பிரார்த்தனைகளும் ரோசரியும் தினசரி செய்கிறார்கள், அதனால் துன்பங்களை எதிர்கொள்ள சக்தி பெற்றுள்ளனர்.\\n\\nஅவர்கள் பெற்ற ஆசீர்வாதங்கள் உடல்நலத்திற்கு மட்டுமல்லாமல் நிதி முன்னேற்றத்துக்கும் கிரிபாபவான் எனும் வீட்டிற்கும் உள்ளன. கிருபாசனத்திலிருந்து வந்த உடன்படிக்கை உப்பு, உடன்படிக்கை எண்ணெய் மற்றும் உடன்படிக்கை பதக்கம் போன்ற தெய்வீக பொருட்களின் ஆவ்யத்த்மிக சக்திக்காக அவர்கள் இந்த ஆசீர்வாதங்களுக்கு நன்றி செலுத்துகிறார்கள். தொடர்ந்து பிரார்த்தனை செய்து, மெழுகுவர்த்தி ஏற்றி, விசுவாசத்துடன் போராட்டங்களை தாண்டி நிலத்தை வாங்கி, கடன்களை முடித்து, வீட்டை முடித்தனர். அவர்களின் உடன்படிக்கை வாழ்க்கை, பசியுள்ளவர்களுக்கு உணவு வழங்குதல் மற்றும் நோயாளிகளைப் பார்த்துக்கொள்ளுதல் போன்ற கருணையுடன் மற்றவர்களுக்காக மன்னிப்பு மற்றும் பரிவு கொண்ட பிரார்த்தனை ஆகியவற்றிற்கும் ஊக்கம் அளித்தது.\\n\\nகுழந்தையை இழப்பு மற்றும் தாய் மறைவின் போது கூட, சௌம்யா தன் துன்பத்தை கிரிஸ்துவுடன் இணைத்து அமைதி கண்டுபிடித்தார். கிருபாசனம் மரியன் உடன்படிக்கை அவர்களின் நம்பிக்கையில்லாத நிலையை நம்பிக்கையாக மாற்றியது, அவர்களுக்கு கீர்த்தி மற்றும் கருணையுடன் துன்பத்தை சமாளிக்க கற்றுத்தந்தது. இன்றைய தினம், அவர்கள் கடவுளின் ஆசீர்வாதங்களுக்கு நன்றி செலுத்தும் சாட்சி, மற்றவர்களுக்கு பிரார்த்தனை செய்வதும், இயேசுவையும் தாய்மாரியையும்திருவிப்பதும் ஆக இருக்கின்றனர். அவர்களின் கதை உடன்படிக்கை வாழ்க்கை, தெய்வீக பொருட்கள் மற்றும் உறுதியான விசுவாசத்தின் சக்தி என்பதற்கு சாட்சியம்.","te":"పాఠానంతిత్త నుండి సౌమ్య మనోజ్ క్రుపాసనమ్ మరియన్ ఒప్పందం ద్వారా మార్పు చెందిన శక్తివంతమైన సాక్ష్యాన్ని పంచుకున్నారు. 2022 ఆగస్టులో ఆన్‌లైన్ ఒప్పందంతో మొదలుకొని తరువాత యాత్ర ఒప్పందం ద్వారా, ఆమె మరియు ఆమె భర్త యేసు మరియు తల్లి మరియాకు ప్రార్థన మరియు విశ్వాసంతో కూడిన ఒప్పంద జీవితం ఆచరించారు. వారు అద్భుతమైన ఆరోగ్య రాకలును అనుభవించారు, వీటిలో ఆమె భర్త తీవ్ర సెల్యులైటిస్ సంక్రమణ శస్త్రచికిత్స లేకుండా కోలుకోవడం మరియు తన 23 ఏళ్ల అనియమిత మాసిక చక్రం మందుల లేకుండా సక్రమంగా మారింది. ఒప్పంద జీవితం ప్రవేశించిన తరువాత, మధుమేహంతో బాధపడుతున్న ఆమె భర్త మందులు అవసరం లేదు. వారు ప్రతిరోజూ దర్శన ప్రార్థనలు మరియు రోజరీలను పాడుతూ బాధలను అధిగమించే శక్తిని పొందారు.\\n\\nవారి ఆశీర్వాదాలు ఆరోగ్యానికి మాత్రమే పరిమితం కాకుండా ఆర్థిక పురోగతి మరియు కృపాభవన్ అనే పేరున్న ఇంటికి నిధుల సమకూర్చడం వరకు విస్తరించాయి. వారు ఈ ఆశీర్వాదాలను మరియన్ ఒప్పందం యొక్క ఆధ్యాత్మిక శక్తి మరియు క్రుపాసనమ్ నుండి వచ్చిన ఒప్పంద ఉప్పు, ఒప్పంద నూనె, మరియు ఒప్పంద పతకం వంటి పవిత్ర వస్తువులకు కృతజ్ఞతలతో అనుసంధానించారు. నిరంతర ప్రార్థన, మణి వెలుగు మరియు విశ్వాసం ద్వారా వారు భూమి కొనడం, రుణాలు తీర్చడం మరియు ఇంటిని పూర్తి చేయడం వంటి సవాళ్లను అధిగమించారు. వారి ఒప్పంద జీవితం ఆకలితో ఉన్నవారికి భోజనం అందించడం మరియు రోగులను చూసుకోవడం వంటి దయామయ చర్యలను ప్రేరేపించింది, క్షమతో మరియు సహానుభూతితో ఇతరుల కోసం ప్రార్థించడం.\\n\\nఅవయవపు నష్టముతో మరియు తన తల్లి మరణంతో కూడిన కష్ట సమయాల్లో కూడా, సౌమ్య తన బాధలను క్రీస్తుతో కలిపి శాంతిని పొందింది. క్రుపాసనమ్ మరియన్ ఒప్పందం వారి నిరాశను ఆశగా మార్చింది, వారికి కరుణతో బాధలను తట్టుకోవడం నేర్పించింది. ఈరోజు వారు దేవుని ఆశీర్వాదాలకు కృతజ్ఞతలు తెలుపుతూ, ఇతరుల కోసం ప్రార్థిస్తూ, యేసు మరియు తల్లి మరియాకు మహిమలు చింపుతూ జీవిస్తున్నారు. వారి కథ ఒప్పంద జీవితం, పవిత్ర వస్తువులు మరియు స్థిరమైన విశ్వాస శక్తికి సాక్ష్యం.","fr":"Soumya Manoj de Pathanamthitta partage un témoignage puissant de transformation grâce à l'Alliance Mariale de Kreupasanam. Commencée avec l'alliance en ligne en août 2022, puis l'alliance de pèlerinage, elle et son mari ont adopté une vie d'alliance centrée sur la prière et la foi en Jésus et en la Vierge Marie. Ils ont vécu des guérisons miraculeuses, notamment la guérison sans chirurgie de la cellulite sévère de son mari et la régularisation de son propre cycle menstruel irrégulier de 23 ans sans médicaments. Depuis leur entrée dans la vie d'alliance, son mari, qui souffre de diabète, n'a plus eu besoin de médicaments. Leur dévotion quotidienne aux prières d'apparition et aux chapelets leur a donné la force de supporter la souffrance.\\n\\nLeurs bénédictions se sont étendues au-delà de la santé à des percées financières et à la construction d'une maison appelée Kripabhavan. Ils attribuent ces bénédictions au pouvoir spirituel de l'Alliance Mariale et aux sacramentaux tels que le Sel d'Alliance, l'Huile d'Alliance et la Médaille d'Alliance de Kreupasanam. Grâce à une prière persistante, à l'allumage de bougies et à la foi, ils ont surmonté les défis d'achat de terrains, de remboursement de dettes et d'achèvement de leur maison. Leur vie d'alliance a également inspiré des actes de charité, notamment nourrir les affamés et soigner les malades, priant pour les autres avec pardon et compassion.\\n\\nMême au milieu d'épreuves telles que la perte de leur bébé et le décès de sa mère, Soumya a trouvé la paix en unissant sa souffrance à celle du Christ. L'Alliance Mariale de Kreupasanam a transformé leur désespoir en espoir, leur enseignant à supporter la souffrance avec grâce. Aujourd'hui, ils vivent en témoins reconnaissants des bénédictions de Dieu, priant pour les autres et glorifiant Jésus et la Vierge Marie. Leur histoire témoigne de la puissance de la vie d'alliance, des sacramentaux et de la foi ferme."},"subtitles":"/assets/testimony/11jul.json"},{"id":8,"title":{"en":"Covenant of Hope","bn":"আশার চুক্তি","zh":"希望的约定","hi":"आशा का संधि","kn":"ನಂಬಿಕೆಯ ಒಡಂಬಡಿಕೆ","mr":"आशेचा करार","es":"Pacto de Esperanza","ta":"நம்பிக்கையின் உடன்படிக்கை","te":"నమ్మక ఒప్పందం","fr":"Alliance d’Espoir"},"date":"July 15, 2025","video":"https://youtu.be/Lm3PcXQclZo?si=ob3CT4tdNIorJOAG","content":{"en":"Sheeba Francis from Ernakulam shares a powerful testimony of her son Danish’s miraculous healing through the grace of the Marian Covenant at Kreupasanam. Despite initial hesitation due to her church affiliations, Sheeba’s faith led her to join the Kreupasanam community and make the covenant. She committed to daily prayer, Bible reading, and attending Divine Liturgy, receiving divine strength through Mother Mary and Jesus. When Danish suffered a severe hand injury and later a life-threatening electric shock, Sheeba’s unwavering faith, supported by the covenant’s spiritual practices, was central to his recovery from near death.\\n\\nThroughout the ordeal, Sheeba used key sacramental elements from the Marian Covenant—such as the holy oil and covenant medal—to anoint and protect her son. Applying the holy oil on Danish’s hand visibly accelerated healing, drying wounds and removing scars. The medal and prayers, including the powerful Creed, became sources of comfort and spiritual strength during critical moments, such as when Danish was on a ventilator with only 1% chance of survival. The testimony affirms the sacred power of these sacramentals and the importance of renewing the covenant as a sign of faith and commitment.\\n\\nSheeba also highlights the role of the Kreupasanam Marian Covenant community in fostering a holy life through prayer, sacraments, and mutual support. She credits the daily Divine Liturgy and continuous rosary prayers for her son’s healing, underscoring how covenant practices bring God’s miracles into believers’ lives. Beyond personal healing, Sheeba demonstrates Christian charity by helping others in need, reflecting the covenant’s call to righteousness. This testimony invites all to trust in the covenant’s grace, rely on sacramental blessings like the oil and medal, and experience the transformative power of prayer and faith in Mother Mary and Jesus.","bn":"এর্নাকুলামের শিবা ফ্রান্সিস তাঁর পুত্র দানিশের অলৌকিক নিরাময়ের শক্তিশালী সাক্ষ্য শেয়ার করেন, যা ক্রেউপাসানমে মারিয়ান চুক্তির করুণা দ্বারা সম্ভব হয়েছে। চার্চের সঙ্গে সম্পর্কের কারণে প্রথমে দ্বিধাগ্রস্ত হওয়ার পরও শিবা তাঁর বিশ্বাসের কারণে ক্রেউপাসানম সম্প্রদায়ের সঙ্গে যুক্ত হন এবং চুক্তি করেন। তিনি প্রতিদিন প্রার্থনা, বাইবেল পাঠ এবং দিভাইন লিটার্জিতে যোগদানের মাধ্যমে মাদার মেরি ও যীশুর থেকে আধ্যাত্মিক শক্তি পান। দানিশ যখন গুরুতর হাতের আঘাত এবং পরবর্তীতে প্রাণঘাতী বিদ্যুতের আঘাতে আক্রান্ত হন, তখন চুক্তির আধ্যাত্মিক অভ্যাসের মাধ্যমে শিবার অবিচল বিশ্বাস তার প্রাণ রক্ষায় মুখ্য ভূমিকা পালন করে।\\n\\nশিবা মারিয়ান চুক্তির গুরুত্বপূর্ণ সাধুসামগ্রী যেমন পবিত্র তেল ও চুক্তির মেডেল ব্যবহার করে তাঁর পুত্রকে অভিষিক্ত ও রক্ষা করেন। দানিশের হাতে পবিত্র তেল প্রয়োগ করলে নিরাময় দ্রুততর হয়, ক্ষত শুকিয়ে যায় এবং দাগ মুছে যায়। মেডেল এবং প্রার্থনাসমূহ, বিশেষ করে শক্তিশালী ক্রীড, সংকটময় মুহূর্তে — যখন দানিশ ভেন্টিলেটরে মাত্র ১% বাঁচার সম্ভাবনা ছিল — সান্ত্বনা এবং আধ্যাত্মিক শক্তির উৎস হয়। এই সাক্ষ্য এই সাধুসামগ্রীর পবিত্র শক্তি এবং বিশ্বাসের প্রতীক হিসেবে চুক্তি নবায়নের গুরুত্বকে নিশ্চিত করে।\\n\\nশিবা ক্রেউপাসানম মারিয়ান চুক্তি সম্প্রদায়ের prayer, সাধুসামগ্রী এবং পারস্পরিক সহায়তার মাধ্যমে পবিত্র জীবনযাপনকে গুরুত্ব দেন। তিনি তাঁর পুত্রের নিরাময়ে দৈনিক দিভাইন লিটার্জি এবং অবিরত রোজারি প্রার্থনার ভূমিকা স্বীকার করেন, যা বিশ্বাসীদের জীবনে ঈশ্বরের অলৌকিক ঘটনাগুলি আনে। ব্যক্তিগত নিরাময় ছাড়াও, শিবা অন্যদের সাহায্য করে খ্রিস্টান দয়া প্রদর্শন করেন, যা চুক্তির ধার্মিকতার আহ্বানকে প্রতিফলিত করে। এই সাক্ষ্য সকলকে চুক্তির করুণা বিশ্বাস করতে, তেল ও মেডেলসহ সাধুসামগ্রীর আশ্রয় নিতে এবং মাদার মেরি ও যীশুর প্রতি বিশ্বাস ও প্রার্থনার পরিবর্তনশীল শক্তি অনুভব করতে আহ্বান জানায়।","zh":"来自埃尔纳库拉姆的希巴·弗朗西斯分享了她儿子丹尼什通过克鲁帕萨南圣母盟约的恩典奇迹般康复的强有力见证。尽管因教会归属感而初时犹豫，希巴的信心引领她加入克鲁帕萨南社区并立下盟约。她坚持每日祷告、读经及参加圣祭礼仪，从圣母玛利亚和耶稣那里获得神圣力量。当丹尼什遭受严重手部受伤及后续生命危急的触电时，希巴坚定不移的信仰与盟约的属灵实践共同促成了他死里逃生的奇迹。\\n\\n在整个过程中，希巴使用了圣母盟约中的重要圣物——圣油和盟约勋章，为儿子施膏并保护他。在丹尼什的手上涂抹圣油显著加快了伤口愈合，伤口干燥且无疤痕。勋章和祷告，包括强有力的信经，在关键时刻（如丹尼什仅有1%生存机会并依赖呼吸机时）成为了慰藉和精神力量的源泉。这一见证肯定了这些圣物的神圣力量，以及作为信仰和承诺象征的盟约更新的重要性。\\n\\n希巴还强调了克鲁帕萨南圣母盟约社区在通过祷告、圣事和相互支持中培养圣洁生活的作用。她感谢每日圣祭礼仪和不断的玫瑰经祈祷对儿子康复的贡献，强调盟约实践如何将神迹带入信徒生命中。除个人康复外，希巴还通过帮助有需要的人展现了基督徒的慈善精神，反映了盟约对正义生活的呼召。此见证邀请所有人信赖盟约的恩典，依靠如圣油和勋章等圣物的祝福，体验对圣母玛利亚和耶稣祈祷与信仰的转化力量。","hi":"एर्नाकुलम की शीबा फ्रांसिस अपने पुत्र डैनिश के चमत्कारी उपचार की शक्तिशाली गवाही देती हैं, जो क्रेपसानम में मरियन संधि की कृपा से हुई। अपने चर्च के संबद्धता के कारण प्रारंभिक संकोच के बावजूद, शीबा का विश्वास उन्हें क्रेपसानम समुदाय से जोड़ता है और संधि करने के लिए प्रेरित करता है। उन्होंने दैनिक प्रार्थना, बाइबल पठन और दिव्य अनुष्ठान में भाग लेकर मां मरियम और यीशु से दिव्य शक्ति प्राप्त की। जब डैनिश को गंभीर हाथ की चोट लगी और बाद में जानलेवा विद्युत झटका लगा, तो संधि की आध्यात्मिक प्रथाओं के माध्यम से शीबा का अटूट विश्वास उनके लगभग मृत्यु से उबरने में केंद्रीय भूमिका निभाता है।\\n\\nपूरा अनुभव काल में, शीबा ने मरियन संधि के महत्वपूर्ण संस्कार तत्वों जैसे पवित्र तेल और संधि पदक का उपयोग अपने पुत्र का अभिषेक और संरक्षण करने के लिए किया। डैनिश के हाथ पर पवित्र तेल लगाने से उपचार में तेज़ी आई, घाव सूख गए और निशान हट गए। पदक और प्रार्थनाएं, जिसमें शक्तिशाली क्रीड भी शामिल है, संकट के क्षणों में — जैसे जब डैनिश वेंटिलेटर पर था और बचने की संभावना केवल 1% थी — सांत्वना और आध्यात्मिक शक्ति के स्रोत बने। यह गवाही इन संस्कारों की पवित्र शक्ति और विश्वास और प्रतिबद्धता के प्रतीक के रूप में संधि नवीनीकरण के महत्व को पुष्ट करती है।\\n\\nशीबा क्रेपसानम मरियन संधि समुदाय की प्रार्थना, संस्कार और पारस्परिक समर्थन के माध्यम से पवित्र जीवन को प्रोत्साहित करने की भूमिका पर भी प्रकाश डालती हैं। वह अपने पुत्र के उपचार के लिए दैनिक दिव्य अनुष्ठान और निरंतर रोज़री प्रार्थनाओं को श्रेय देती हैं, यह रेखांकित करते हुए कि संधि की प्रथाएं विश्वासियों के जीवन में परमेश्वर के चमत्कार लाती हैं। व्यक्तिगत उपचार से परे, शीबा जरूरतमंदों की सहायता करके ईसाई परोपकार दिखाती हैं, जो संधि के धार्मिक जीवन के आह्वान को दर्शाता है। यह गवाही सभी को संधि की कृपा पर भरोसा करने, पवित्र तेल और पदक जैसे संस्कारिक आशीर्वादों पर निर्भर रहने, और मां मरियम और यीशु में प्रार्थना और विश्वास की परिवर्तनकारी शक्ति का अनुभव करने के लिए आमंत्रित करती है।","kn":"ಏರ್ನಾಕುಲಂನ ಶೀಬಾ ಫ್ರಾನ್ಸಿಸ್ ಅವರು ಕ್ರೆಯುಪಾಸನಂನಲ್ಲಿ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯಿಂದ ತನ್ನ ಮಗ ಡ್ಯಾನಿಶ್ ಅವರ ಅದ್ಭುತ ಚೇತನದ ಕುರಿತು ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ. ಚರ್ಚಿನ ಸಂಬಂಧದಿಂದ ಪ್ರಾರಂಭದಲ್ಲಿ ಹಿಂಜರಿತ್ತರೂ, ಶೀಬಾ ಅವರ ನಂಬಿಕೆ ಅವರನ್ನು ಕ್ರೆಯುಪಾಸನಂ ಸಮುದಾಯಕ್ಕೆ ಸೇರಲು ಮತ್ತು ಒಡಂಬಡಿಕೆಯನ್ನು ಮಾಡಲು ಪ್ರೇರಣೆ ನೀಡಿತು. ಅವರು ಪ್ರತಿದಿನ ಪ್ರಾರ್ಥನೆ, ಬೈಬಲ್ ಓದುವುದು ಮತ್ತು ದಿವ್ಯ ಪೂಜೆಯಲ್ಲಿ ಭಾಗವಹಿಸುವ ಮೂಲಕ ದೇವಿಮತ್ತೆ ಮರಿಯ ಮತ್ತು ಯೇಸು ಅವರಿಂದ ದೈವಿಕ ಶಕ್ತಿ ಪಡೆದರು. ಡ್ಯಾನಿಶ್ ಗಂಭೀರ ಕೈ ಗಾಯ ಹಾಗೂ ನಂತರ ಜೀವಕ್ಕೆ ಹಾನಿಕಾರಕ ವಿದ್ಯುತ್ ಶಾಕ್ ಅನುಭವಿಸಿದಾಗ, ಒಡಂಬಡಿಕೆಯ ಆಧ್ಯಾತ್ಮಿಕ ಅಭ್ಯಾಸಗಳಿಂದ ಶೀಬಾ ಅವರ ಸ್ಥಿರ ನಂಬಿಕೆ ಅವರ ಬದುಕು ಮರಣದಿಂದ ಮರಳಿ ಬರುವುದರಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿದೆ.\\n\\nಸಂಪೂರ್ಣ ಸಮಯದಲ್ಲಿ, ಶೀಬಾ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಪ್ರಮುಖ ಧಾರ್ಮಿಕ ವಸ್ತುಗಳಾದ ಪವಿತ್ರ ಎಣ್ಣೆ ಮತ್ತು ಒಡಂಬಡಿಕೆ ಪದಕವನ್ನು ಬಳಸಿ ಮಗನನ್ನು ಪುನರುತ್ಥಾನ ಮತ್ತು ರಕ್ಷಣೆಗೆ ಅಳವಡಿಸಿದರು. ಡ್ಯಾನಿಶ್ ಅವರ ಕೈಯಲ್ಲಿ ಪವಿತ್ರ ಎಣ್ಣೆ ಹಚ್ಚಿದಾಗ ಗಾಯಗಳ ಗುಣಮುಖತೆಯನ್ನು ವೇಗಗೊಳಿಸಿ, ಹನಿ ಒಣಗಿತು ಮತ್ತು ಚಿಹ್ನೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿತು. ಪದಕ ಮತ್ತು ಪ್ರಾರ್ಥನೆಗಳು, ವಿಶೇಷವಾಗಿ ಶಕ್ತಿಶಾಲಿ ಕ್ರೀಡ್, ಗಂಭೀರ ಕ್ಷಣಗಳಲ್ಲಿ — ಡ್ಯಾನಿಶ್ ವೆಂಟಿಲೇಟರ್ ಮೇಲೆ ಇದ್ದಾಗ ಮತ್ತು ಅವನು 1% ಮಾತ್ರ ಬಾಳುವ ಸಾಧ್ಯತೆ ಇದ್ದಾಗ — ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿ ಮತ್ತು ಸಾಂತ್ವನೆಯ ಮೂಲಗಳಾಗಿದ್ದವು. ಈ ಸಾಕ್ಷ್ಯವು ಈ ಧಾರ್ಮಿಕ ವಸ್ತುಗಳ ಪವಿತ್ರ ಶಕ್ತಿಯನ್ನು ಮತ್ತು ನಂಬಿಕೆ ಮತ್ತು ಬದ್ಧತೆಯ ಸಂಕೇತವಾಗಿ ಒಡಂಬಡಿಕೆ ನವೀಕರಣದ ಮಹತ್ವವನ್ನು ದೃಢಪಡಿಸುತ್ತದೆ.\\n\\nಶೀಬಾ ಕ್ರೆಯುಪಾಸನಂ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆ ಸಮುದಾಯವು ಪ್ರಾರ್ಥನೆ, ಧಾರ್ಮಿಕ ವಿಧಿಗಳು ಮತ್ತು ಪರಸ್ಪರ ಸಹಕಾರದ ಮೂಲಕ ಪವಿತ್ರ ಜೀವನವನ್ನು ಬೆಳೆಸುವ ಪಾತ್ರವನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತಾರೆ. ಅವರು ತಮ್ಮ ಮಗನ ಚೇತನಕ್ಕಾಗಿ ದೈನಂದಿನ ದಿವ್ಯ ಪೂಜೆ ಮತ್ತು ನಿರಂತರ ರೋಸರಿ ಪ್ರಾರ್ಥನೆಗಳಿಗೆ ಕ್ರೆಡಿಟ್ ನೀಡುತ್ತಾರೆ, ಒಡಂಬಡಿಕೆ ಅಭ್ಯಾಸಗಳು ವಿಶ್ವಾಸಿಗಳ ಜೀವನದಲ್ಲಿ ದೇವರ ಅದ್ಭುತಗಳನ್ನು ತರಲು ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತವೆ ಎಂಬುದನ್ನು ಒತ್ತಿಹೇಳುತ್ತಾರೆ. ವೈಯಕ್ತಿಕ ಚೇತನಕ್ಕಿಂತ ಹೆಚ್ಚಿನವಾಗಿ, ಶೀಬಾ ಇತರರ ಸಹಾಯದಿಂದ ಕ್ರಿಶ್ಚಿಯನ್ ಪರೋಪಕಾರವನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತಾರೆ, ಇದು ಒಡಂಬಡಿಕೆಯ ಧರ್ಮದ ಕರೆ ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ. ಈ ಸಾಕ್ಷ್ಯ ಎಲ್ಲರನ್ನು ಒಡಂಬಡಿಕೆಯ ಕೃಪೆಯನ್ನು ನಂಬಲು, ಎಣ್ಣೆ ಮತ್ತು ಪದಕದಂತಹ ಧಾರ್ಮಿಕ ಆಶೀರ್ವಾದಗಳನ್ನು ಅವಲಂಬಿಸಲು, ಮತ್ತು ದೇವಿ ಮರಿಯ ಮತ್ತು ಯೇಸುಮسيಹನ ಮೇಲಿನ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ನಂಬಿಕೆಯ ಪರಿವರ್ತನೆಯ ಶಕ್ತಿಯನ್ನು ಅನುಭವಿಸಲು ಆಹ್ವಾನಿಸುತ್ತದೆ.","mr":"एर्नाकुलम येथील शीबा फ्रान्सिस यांनी क्रूपासनम येथील मेरीअन कराराच्या कृपेने त्यांच्या मुलगा डॅनिशच्या चमत्कारी बरे होण्याचा प्रभावी साक्षात्कार दिला आहे. चर्चशी संबंधित असलेल्या काही शंकांनंतरही, शीबा यांचा विश्वास त्यांना क्रूपासनम समुदायात सहभागी होण्यास आणि करार करण्यास प्रेरित केला. त्यांनी दररोज प्रार्थना, बायबल वाचन आणि दैवी विधीमध्ये सहभागी होऊन माते मरियम आणि येशूंकडून दैवी शक्ती प्राप्त केली. डॅनिशला गंभीर हाताच्या जखमेचा आणि नंतर जीवघेण्या विद्युत शॉकचा सामना करावा लागला, तेव्हा कराराच्या आध्यात्मिक प्रथांमुळे शीबा यांचा अटळ विश्वास त्यांच्या मृत्यूच्या जवळून परत येण्यामध्ये महत्त्वाचा ठरला.\\n\\nसंपूर्ण काळात, शीबा यांनी मेरीअन करारातील महत्त्वाच्या धार्मिक वस्तू जसे की पवित्र तेल आणि करार पदकाचा उपयोग करून त्यांच्या मुलाला अभिषेक केला आणि त्याचे संरक्षण केले. डॅनिशच्या हातावर पवित्र तेल लावल्याने उपचार वेगाने झाले, जखमा कोरड्या झाल्या आणि डाग निघून गेले. पदक आणि प्रार्थना, ज्यामध्ये शक्तिशाली क्रीड समाविष्ट आहे, संकटाच्या काळात — जेव्हा डॅनिश व्हेंटिलेटरवर होता आणि जिवंत राहण्याची शक्यता फक्त १% होती — तो सांत्वना आणि आध्यात्मिक शक्तीचा स्रोत बनले. हा साक्षात्कार या धार्मिक वस्तूंच्या पवित्र शक्तीला आणि श्रद्धा व बांधिलकीचा चिन्ह म्हणून करार नूतनीकरणाच्या महत्त्वाला पुष्टी देतो.\\n\\nशीबा क्रूपासनम मेरीअन करार समुदायाच्या प्रार्थना, धार्मिक विधी आणि परस्पर सहकार्याद्वारे पवित्र जीवन वाढविण्याच्या भूमिकेवर देखील प्रकाश टाकतात. ते त्यांच्या मुलाच्या उपचारासाठी दररोज दैवी विधी आणि सततच्या रोजरी प्रार्थनांचे श्रेय देतात, ज्यामुळे कराराच्या प्रथांनी विश्वासूंच्या जीवनात देवाचे चमत्कार कसे आणले हे अधोरेखित होते. वैयक्तिक उपचारापलीकडे, शीबा गरजूंना मदत करून ख्रिश्चन दया दाखवतात, जी कराराच्या धार्मिक जीवनाच्या आवाहनाचे प्रतिबिंब आहे. हा साक्षात्कार सर्वांना कराराच्या कृपेवर विश्वास ठेवण्याचे, पवित्र तेल आणि पदकासारख्या धार्मिक आशीर्वादांवर अवलंबून राहण्याचे, आणि माता मरियम व येशूमध्ये प्रार्थना व श्रद्धेची परिवर्तनकारी शक्ती अनुभवण्याचे आमंत्रण देतो.","es":"Sheeba Francis, de Ernakulam, comparte un poderoso testimonio sobre la sanación milagrosa de su hijo Danish a través de la gracia del Pacto Mariano en Kreupasanam. A pesar de su inicial vacilación debido a las afiliaciones de su iglesia, la fe de Sheeba la llevó a unirse a la comunidad de Kreupasanam y hacer el pacto. Se comprometió a la oración diaria, la lectura de la Biblia y la asistencia a la Liturgia Divina, recibiendo fuerza divina a través de la Madre María y Jesús. Cuando Danish sufrió una grave lesión en la mano y posteriormente una descarga eléctrica que puso en riesgo su vida, la fe inquebrantable de Sheeba, apoyada por las prácticas espirituales del pacto, fue central para su recuperación de la muerte.\\n\\nDurante toda la prueba, Sheeba utilizó elementos sacramentales clave del Pacto Mariano, como el aceite santo y la medalla del pacto, para ungir y proteger a su hijo. Aplicar el aceite santo en la mano de Danish aceleró visiblemente la curación, secando las heridas y eliminando las cicatrices. La medalla y las oraciones, incluido el poderoso Credo, se convirtieron en fuentes de consuelo y fortaleza espiritual durante momentos críticos, como cuando Danish estaba con ventilador y solo tenía un 1% de posibilidad de sobrevivir. El testimonio afirma el poder sagrado de estos sacramentales y la importancia de renovar el pacto como señal de fe y compromiso.\\n\\nSheeba también destaca el papel de la comunidad del Pacto Mariano de Kreupasanam en fomentar una vida santa mediante la oración, los sacramentos y el apoyo mutuo. Ella acredita la Liturgia Divina diaria y las oraciones continuas del rosario para la sanación de su hijo, subrayando cómo las prácticas del pacto traen milagros de Dios a la vida de los creyentes. Más allá de la sanación personal, Sheeba demuestra la caridad cristiana ayudando a otros necesitados, reflejando el llamado del pacto a la justicia. Este testimonio invita a todos a confiar en la gracia del pacto, apoyarse en las bendiciones sacramentales como el aceite y la medalla, y experimentar el poder transformador de la oración y la fe en la Madre María y Jesús.","ta":"எர்ணாகுளம் சேர்ந்த ஷீபா ஃபிரான்சிஸ், கிரூபசனம் மாரியன் உடன்படிக்கையின் அருளால் அவரது மகன் டேனிஷின் அதிசய குணமடைதலைப் பற்றிய சக்திவாய்ந்த சாட்சி பகிர்கிறார். தனது தேவாலய உடன்பட்ட காரணங்களால் ஆரம்பத்தில் தயக்கம் இருந்தபோதிலும், ஷீபாவின் விசுவாசம் அவரை கிரூபசனம் சமூகத்தில் சேர்ந்துவிட்டு உடன்படிக்கையை செய்ய வழிவகுத்தது. அவர் தினசரி பிரார்த்தனை, பைபிள் வாசிப்பு மற்றும் திவ்ய லிடர்ஜியில் கலந்துகொண்டு, தாய் மரியாவிலும் இயேசுவிலும் இருந்து தெய்வீக பலத்தை பெற்றார். டேனிஷ் கடுமையான கையடி மற்றும் பின்னர் உயிருக்கு ஆபத்தான மின் அதிர்வை அனுபவித்தபோது, உடன்படிக்கையின் ஆன்மிக நடைமுறைகளால் ஷீபாவின் உறுதியான விசுவாசம் அவரது உயிர் பிழைப்பில் மையமாக இருந்தது.\\n\\nமுழு போராட்ட காலத்தில், ஷீபா மாரியன் உடன்படிக்கையின் முக்கிய தேவாலய பொருட்களான பवித எண்ணெய் மற்றும் உடன்படிக்கை பதக்கத்தைப் பயன்படுத்தி மகனை ஆசி செய்து பாதுகாப்பு செய்தார். டேனிஷின் கையில் பவித எண்ணெய் தடவுவதால் குணமடையுதல் வேகமானது, காயங்கள் உலர்ந்தன மற்றும் பிணைகள் நீங்கின. பதக்கமும் பிரார்த்தனைகளும், சக்திவாய்ந்த கிரீடும் உட்பட, முக்கியமான நேரங்களில் — டேனிஷ் வென்டிலேட்டரில் இருந்த போது, அவர் வாழும் வாய்ப்பு 1% மட்டுமே இருந்தபோது — ஆறுதல் மற்றும் ஆன்மிக பலத்துக்கு ஆதாரமாக இருந்தன. இந்த சாட்சி, இந்த தேவாலய பொருட்களின் பவித்ர சக்தியையும், விசுவாசத்தின் அடையாளமாக உடன்படிக்கையை புதுப்பிப்பதின் முக்கியத்துவத்தையும் உறுதிப்படுத்துகிறது.\\n\\nஷீபா கிரூபசனம் மாரியன் உடன்படிக்கை சமூகத்தின் பிரார்த்தனை, தேவாலய நிகழ்ச்சிகள் மற்றும் பரஸ்பர ஆதரவு மூலம் பவித்ரமான வாழ்க்கையை வளர்க்கும் பங்கையும் வலியுறுத்துகிறார். அவரது மகனின் குணமடைவில் தினசரி திவ்ய லிடர்ஜியும் தொடர்ச்சியான ரோசரி பிரார்த்தனைகளும் முக்கிய பங்கு வகித்தன என்று அவர் தெரிவிக்கிறார், உடன்படிக்கை நடைமுறைகள் விசுவாசிகளின் வாழ்க்கையில் இறைவனின் அதிசயங்களை கொண்டு வருகிறது என்பதை வலியுறுத்துகிறார். தனிப்பட்ட குணமடைவிற்கு அப்பால், ஷீபா அவசியமானவர்களுக்கு உதவி செய்வதன் மூலம் கிறிஸ்துவ பரிவை வெளிப்படுத்துகிறார், இது உடன்படிக்கையின் நீதிமான வாழ்வின் அழைப்பை பிரதிபலிக்கிறது. இந்த சாட்சி அனைவரையும் உடன்படிக்கையின் அருளில் நம்பிக்கை வைக்க, எண்ணெய் மற்றும் பதக்கத்திற்கான தேவாலய ஆசீர்வாதங்களை சார்ந்து, தாய் மரியாவுக்கும் இயேசுவுக்கும் உள்ள பிரார்த்தனை மற்றும் விசுவாசத்தின் மாற்றுச்சக்தியைக் காணுமாறு அழைக்கிறது.","te":"ఎర్నాకులం నుంచి షీబా ఫ్రాన్సిస్ తన కుమారుడు డానిష్ క్రూపాసనం మరియన్ ఒప్పందం కృపతో అద్భుతమైన ఆరోగ్యవంతమైన కధను పంచుకుంటోంది. తన చర్చీ సంబంధాల కారణంగా మొదట సందేహాలున్నా, షీబా విశ్వాసం క్రూపాసనం సమాజంలో చేరి ఒప్పందం చేసేందుకు ప్రేరణిచింది. ఆమె రోజూ ప్రార్థనలు, బైబిల్ చదవడం, దివ్య లిటర్జీకి హాజరై, మదర్ మేరీ మరియు యేసు ద్వారా దివ్యశక్తిని అందుకుంది. డానిష్ తీవ్రమైన చేతి గాయం మరియు తర్వాత ప్రాణహానికరమైన ఎలక్ట్రిక్ షాక్ పట్ల బాధపడినప్పుడు, ఒప్పంద ఆధ్యాత్మిక ఆచారాలతో షీబా నిలకడైన విశ్వాసం అతని మరణాన్ని తప్పించుకోవడంలో ప్రధాన పాత్ర పోషించింది.\\n\\nముగింపు సమయం లో, షీబా మరియన్ ఒప్పందంలోని పవిత్ర ద్రవ్యాలు — పవిత్ర నూనె మరియు ఒప్పంద మెడల్ వంటివి — తన కుమారుడిని అభిషేకం చేసి రక్షించడానికి ఉపయోగించుకుంది. డానిష్ చేతిపై పవిత్ర నూనె రాయడం వేగంగా ఆపత్కాలిక గాయాలను కోల్పోవడం, మచ్చలను తొలగించడం సహాయపడింది. మెడల్ మరియు ప్రార్థనలు, ముఖ్యంగా శక్తివంతమైన క్రీడ్, తీవ్రమైన క్షణాల్లో — డానిష్ వెంటిలేటర్ మీద ఉన్నప్పుడు 1% మాత్రమే జీవించే అవకాశం ఉండగా — ఆత్మీయ శక్తి మరియు సాంత్వన మూలాలయ్యాయి. ఈ సాక్ష్యం ఈ పవిత్ర వస్తువుల పవిత్ర శక్తిని, విశ్వాసం మరియు కట్టుబాటుకు సంకేతంగా ఒప్పందాన్ని పునరుద్ధరించే ముఖ్యత్వాన్ని నిర్ధారిస్తుంది.\\n\\nషీబా క్రూపాసనం మరియన్ ఒప్పంద సమాజం ప్రార్థనలు, పూజల మరియు పరస్పర సహకారంతో పవిత్ర జీవితం పెంపొందించడంలో పాత్రను హైలైట్ చేస్తుంది. ఆమె తన కుమారుడి ఆరోగ్య పట్ల రోజువారీ దివ్య లిటర్జీ మరియు నిరంతర రోజారీ ప్రార్థనలకు కృతజ్ఞతలు తెలుపుతుంది, ఒప్పంద ఆచారాలు విశ్వాసుల జీవితాల్లో దేవుని చमत్కారాలను తీసుకువస్తాయని గమనిస్తుంది. వ్యక్తిగత చికిత్సకు మించి, షీబా అవసరమున్న వారికి సహాయం చేయడం ద్వారా క్రైస్తవ దయను చూపిస్తుంది, ఇది ఒప్పంద ధర్మపాలనకు ప్రతిబింబంగా ఉంది. ఈ సాక్ష్యం అందరినీ ఒప్పంద కృపపై నమ్మకం ఉంచమని, పవిత్ర నూనె మరియు మెడల్ వంటి ఆత్మీయ ఆశీర్వాదాలను ఆశ్రయించమని, మరియు మదర్ మేరీ మరియు యేసులో ప్రార్థన మరియు విశ్వాసం ద్వారా మార్పు శక్తిని అనుభవించమని ఆహ్వానిస్తుంది.","fr":"Sheeba Francis d’Ernakulam partage un témoignage puissant sur la guérison miraculeuse de son fils Danish grâce à la grâce de l’Alliance mariale à Kreupasanam. Malgré une hésitation initiale due à ses affiliations ecclésiastiques, la foi de Sheeba l’a conduite à rejoindre la communauté de Kreupasanam et à conclure l’alliance. Elle s’est engagée à la prière quotidienne, à la lecture de la Bible et à la participation à la liturgie divine, recevant une force divine par l’intercession de la Vierge Marie et de Jésus. Lorsque Danish a subi une grave blessure à la main puis un choc électrique mettant sa vie en danger, la foi inébranlable de Sheeba, soutenue par les pratiques spirituelles de l’alliance, a été centrale dans sa récupération d’une mort imminente.\\n\\nTout au long de cette épreuve, Sheeba a utilisé des éléments sacramentels clés de l’Alliance mariale — comme l’huile sainte et la médaille de l’alliance — pour oindre et protéger son fils. L’application de l’huile sainte sur la main de Danish a accéléré visiblement la guérison, asséchant les plaies et éliminant les cicatrices. La médaille et les prières, y compris le puissant Credo, sont devenues des sources de réconfort et de force spirituelle lors de moments critiques, comme lorsque Danish était sous ventilateur avec seulement 1 % de chances de survie. Le témoignage affirme le pouvoir sacré de ces sacramentaux et l’importance de renouveler l’alliance comme signe de foi et d’engagement.\\n\\nSheeba souligne également le rôle de la communauté de l’Alliance mariale de Kreupasanam dans la promotion d’une vie sainte par la prière, les sacrements et le soutien mutuel. Elle attribue la guérison de son fils à la liturgie divine quotidienne et aux prières continues du rosaire, soulignant comment les pratiques de l’alliance apportent les miracles de Dieu dans la vie des croyants. Au-delà de la guérison personnelle, Sheeba manifeste la charité chrétienne en aidant les autres dans le besoin, reflétant l’appel de l’alliance à la justice. Ce témoignage invite chacun à faire confiance à la grâce de l’alliance, à s’appuyer sur les bénédictions sacramentelles telles que l’huile et la médaille, et à expérimenter la puissance transformatrice de la prière et de la foi en la Vierge Marie et Jésus."},"subtitles":"/assets/testimony/15jul.json"},{"id":9,"title":{"en":"Healing through Faith","bn":"বিশ্বাসের মাধ্যমে আরোগ্য","zh":"信仰中的疗愈","hi":"विश्वास के माध्यम से उपचार","kn":"ನಂಬಿಕೆಯಿಂದ ಚೇತನ","mr":"विश्वासातून बरे होणे","es":"Sanación por la Fe","ta":"நம்பிக்கையால் குணமடையல்","te":"నమ్మకంతో ఆరోగ్యం","fr":"Guérison par la Foi"},"date":"July 16, 2025","video":"https://youtu.be/TlOFmbeOQWo?si=FzzX5m-Hz2PCnTOs","content":{"en":"Geetha from Kayamkulam shares a powerful testimony about the miraculous healing of her 79-year-old mother, who suffered a critical heart attack. Throughout her mother’s severe condition—including multiple hospital transfers and a major cardiac event—Geetha faithfully relied on the Marian Covenant and the sacramental items from Kreupasanam. She continuously prayed with the covenant medal placed on her mother’s chest, applied the holy oil, and gave her water mixed with the blessed covenant salt. Despite doctors’ doubts and the severity of the situation, her unwavering faith and the use of these sacred items brought healing and protection, demonstrating the profound power of the Kreupasanam Marian Covenant.\\n\\nDuring the intense moments in the ICU, when surgery and angioplasty were risky and her mother’s survival seemed uncertain, Geetha experienced a comforting divine presence. She recounts a radiant figure—believed to be Jesus—appearing to assure her of her mother’s recovery within minutes. This spiritual encounter, combined with persistent prayer and the use of Kreupasanam’s sacramentals, helped bring her mother back to health without further complications. The covenant medal, oil, and salt are central to the healing process, acting as tangible expressions of faith and divine grace throughout the ordeal.\\n\\nGeetha concludes by expressing deep gratitude to the Kreupasanam Mother, Jesus, and Mother Mary for the miraculous healing and ongoing protection. She emphasizes the importance of faith in the Marian Covenant and the blessings that flow through the covenant sacramentals. Her testimony encourages others to trust in the Kreupasanam sacramental items and the covenant’s spiritual power, assuring that divine intervention can bring comfort, healing, and strength even in the most desperate circumstances.","bn":"কায়মকুলামের গীতা তার ৭৯ বছর বয়সী মাতার অলৌকিক আরোগ্যের একটি শক্তিশালী সাক্ষ্য ভাগ করে নেন, যিনি গুরুতর হার্ট অ্যাটাকে ভুগছিলেন। তার মায়ের গুরুতর অবস্থায়—যেখানে একাধিক হাসপাতাল বদল এবং বড় হার্টের ঘটনা ঘটেছিল—গীতা বিশ্বস্তভাবে মেরিয়ান কভেন্যান্ট এবং ক্রেউপাসানামের পবিত্র সামগ্রীগুলোর ওপর নির্ভর করতেন। তিনি ধারাবাহিকভাবে কভেন্যান্ট মেডাল তার মায়ের বুকে রাখতেন, পবিত্র তেল প্রয়োগ করতেন এবং আশীর্বাদপ্রাপ্ত কভেন্যান্ট লবণ মিশ্রিত পানি দিয়েছিলেন। চিকিৎসকদের সন্দেহ এবং পরিস্থিতির গম্ভীরতার মধ্যে তার অবিচল বিশ্বাস এবং এই পবিত্র সামগ্রীগুলোর ব্যবহার আরোগ্য এবং সুরক্ষা নিয়ে এসেছিল, যা ক্রেউপাসানাম মেরিয়ান কভেন্যান্টের গভীর শক্তি প্রমাণ করে।\\n\\nআইসিইউ-র তীব্র মুহূর্তগুলিতে, যখন সার্জারি এবং এঞ্জিওপ্লাস্টি ঝুঁকিপূর্ণ ছিল এবং তার মায়ের বেঁচে থাকার সম্ভাবনা অনিশ্চিত ছিল, গীতা একটি সান্ত্বনাদায়ক ঐশ্বরিক উপস্থিতি অনুভব করেছিল। তিনি একটি দীপ্তিমান ব্যক্তির কথা স্মরণ করেন—যাকে যীশু মনে করা হয়—যিনি কয়েক মিনিটের মধ্যে তার মায়ের আরোগ্যের নিশ্চয়তা দিয়েছিলেন। এই আধ্যাত্মিক সাক্ষাৎ, অবিচল প্রার্থনা এবং ক্রেউপাসানামের পবিত্র সামগ্রী ব্যবহারের সাথে মিলিত হয়ে তার মাকে সুস্থ করে তুলেছে, কোনও অতিরিক্ত জটিলতা ছাড়াই। কভেন্যান্ট মেডাল, তেল এবং লবণ আরোগ্য প্রক্রিয়ার কেন্দ্রে রয়েছে, বিশ্বাস এবং ঐশ্বরিক করুণা প্রকাশের স্পষ্ট প্রতীক হিসেবে কাজ করে।\\n\\nগীতা ক্রেউপাসানাম মাদার, যীশু এবং মাদার মেরির প্রতি গভীর কৃতজ্ঞতা প্রকাশ করেন অলৌকিক আরোগ্য এবং চলমান সুরক্ষার জন্য। তিনি মেরিয়ান কভেন্যান্টে বিশ্বাসের গুরুত্ব এবং কভেন্যান্ট পবিত্র সামগ্রী থেকে প্রবাহিত আশীর্বাদের কথা জোর দেন। তার সাক্ষ্য অন্যদের ক্রেউপাসানামের পবিত্র সামগ্রী এবং কভেন্যান্টের আধ্যাত্মিক শক্তিতে বিশ্বাস রাখার উৎসাহ দেয়, নিশ্চিত করে যে ঐশ্বরিক হস্তক্ষেপ কঠিন পরিস্থিতিতেও সান্ত্বনা, আরোগ্য এবং শক্তি নিয়ে আসতে পারে।","zh":"来自凯扬库拉姆的吉塔分享了她79岁母亲奇迹般康复的强烈见证，她的母亲曾遭受严重的心脏病发作。在她母亲严重病情期间——包括多次转院和重大心脏事件——吉塔始终坚定依靠玛利亚盟约和克鲁帕萨纳姆的圣物。她不断地祈祷，将盟约奖章放在母亲胸前，涂抹圣油，并给她喝混合了祝福盟约盐的水。尽管医生对情况表示怀疑且病情严重，她坚定的信念和对这些圣物的使用带来了治愈和保护，彰显了克鲁帕萨纳姆玛利亚盟约的深厚力量。\\n\\n在重症监护室紧张的时刻，当手术和血管成形术风险很大，母亲的存活似乎不确定时，吉塔感受到一种安慰的神圣存在。她回忆起一个光辉的身影——被认为是耶稣——出现，向她保证母亲会在几分钟内康复。这次灵性的遭遇，加上持续的祷告和使用克鲁帕萨纳姆的圣物，帮助她的母亲康复，没有出现进一步的并发症。盟约奖章、圣油和盐在治疗过程中起到了核心作用，是信仰和神圣恩典的具体表现。\\n\\n吉塔最后表达了对克鲁帕萨纳姆之母、耶稣和圣母玛利亚的深切感激，感谢他们带来的奇迹康复和持续保护。她强调了对玛利亚盟约的信仰以及盟约圣物带来的祝福的重要性。她的见证鼓励他人信任克鲁帕萨纳姆的圣物和盟约的精神力量，确保神圣的介入能在最绝望的时刻带来安慰、治愈和力量。","hi":"कायमकुलम की गीता अपने 79 वर्षीय माँ के चमत्कारिक स्वास्थ्य लाभ की एक सशक्त गवाही साझा करती हैं, जिन्हें गंभीर हृदयाघात हुआ था। माँ की गंभीर स्थिति के दौरान — जिसमें कई अस्पतालों में स्थानांतरण और एक बड़ा हृदय रोग शामिल था — गीता ने मरीअन कॉवेनेंट और क्रेउपासानम के पवित्र वस्त्रों पर विश्वास रखा। उन्होंने अपनी माँ के सीने पर कॉवेनेंट मेडल रखकर निरंतर प्रार्थना की, पवित्र तेल लगाया, और आशीर्वादित कॉवेनेंट नमक मिलाकर पानी दिया। डॉक्टरों की शंका और स्थिति की गंभीरता के बावजूद, उनकी अटूट आस्था और इन पवित्र वस्त्रों के उपयोग से स्वास्थ्य लाभ और सुरक्षा मिली, जो क्रेउपासानम मरीअन कॉवेनेंट की गहरी शक्ति को दर्शाता है।\\n\\nआईसीयू में तनावपूर्ण क्षणों के दौरान, जब सर्जरी और एंजियोप्लास्टी जोखिमपूर्ण थे और माँ के जीवित रहने की संभावना अनिश्चित थी, गीता ने एक सांत्वनादायक दिव्य उपस्थिति का अनुभव किया। उन्होंने एक चमकीले व्यक्तित्व का स्मरण किया—जिसे यीशु माना जाता है—जो उन्हें आश्वस्त करता है कि उनकी माँ मिनटों में ठीक हो जाएंगी। यह आध्यात्मिक अनुभव, लगातार प्रार्थना और क्रेउपासानम के पवित्र वस्त्रों के उपयोग के साथ मिलकर उनकी माँ को बिना किसी जटिलता के स्वस्थ करने में मदद करता है। कॉवेनेंट मेडल, तेल, और नमक उपचार प्रक्रिया के केंद्र में हैं, जो आस्था और दिव्य अनुग्रह की मूर्त अभिव्यक्ति के रूप में कार्य करते हैं।\\n\\nगीता ने चमत्कारिक स्वास्थ्य लाभ और निरंतर सुरक्षा के लिए क्रेउपासानम मदर, यीशु, और मदर मैरी के प्रति गहरी कृतज्ञता व्यक्त की। उन्होंने मरीअन कॉवेनेंट में आस्था और कॉवेनेंट पवित्र वस्त्रों से मिलने वाले आशीर्वाद के महत्व पर जोर दिया। उनकी गवाही दूसरों को क्रेउपासानम के पवित्र वस्त्रों और कॉवेनेंट की आध्यात्मिक शक्ति में विश्वास रखने के लिए प्रोत्साहित करती है, यह सुनिश्चित करते हुए कि दिव्य हस्तक्षेप सबसे निराशाजनक परिस्थितियों में भी सांत्वना, उपचार, और शक्ति ला सकता है।","kn":"ಕಾಯಮ್ಕುಲಮ್‌ನಿಂದ ಗೀತಾ ತಮ್ಮ 79 ವರ್ಷದ ತಾಯಿಯ ಅದ್ಭುತ ಗುಣಮುಖತೆಯ ಬಗ್ಗೆ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನನು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ, ಅವರ ತಾಯಿ ಗಂಭೀರ ಹೃದಯಾಘಾತವನ್ನು ಅನುಭವಿಸಿದ್ದರು. ತಾಯಿಯ ಗಂಭೀರ ಸ್ಥಿತಿಯಲ್ಲಿ—ಬಹುಬಾರಿಯ ಆಸ್ಪತ್ರೆ ಸ್ಥಳಾಂತರ ಮತ್ತು ದೊಡ್ಡ ಹೃದಯ ಘಟನೆ ಸಹಿತ—ಗೀತಾ ನಂಬಿಕೆಯಿಂದ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಕ್ರ್ಯೂಪಾಸನಮ್‌ನ ಪವಿತ್ರ ವಸ್ತುಗಳ ಮೇಲೆ ಅವಲಂಬಿಸಿದ್ದರು. ಅವರು ತಮ್ಮ ತಾಯಿಯ ಎದೆಯ ಮೇಲೆ ಒಡಂಬಡಿಕೆಯ ಮೆಡಲ್ ಇಟ್ಟುಕೊಂಡು ನಿರಂತರವಾಗಿ ಪ್ರಾರ್ಥಿಸಿದರು, ಪವಿತ್ರ ಎಣ್ಣೆ ಅನ್ವಯಿಸಿದರು ಮತ್ತು ಆಶೀರ್ವಾದಿತ ಒಡಂಬಡಿಕೆ ಉಪ್ಪು ಮಿಶ್ರಿತ ನೀರನ್ನು ಕೊಟ್ಟರು. ವೈದ್ಯರ ಅನುಮಾನಗಳು ಮತ್ತು ಪರಿಸ್ಥಿತಿಯ ತೀವ್ರತೆ ನಡುವೆಯೂ, ಅವರ ಅಚಲ ನಂಬಿಕೆ ಮತ್ತು ಈ ಪವಿತ್ರ ವಸ್ತುಗಳ ಬಳಕೆ ಗುಣಮುಖತೆ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ತಂದಿತು, ಇದು ಕ್ರ್ಯೂಪಾಸನಮ್ ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಆಳವಾದ ಶಕ್ತಿಯನ್ನು ತೋರಿಸುತ್ತದೆ.\\n\\nಐಸಿಯುಯಲ್ಲಿ ತೀವ್ರ ಕ್ಷಣಗಳಲ್ಲಿ, ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಮತ್ತು ಅಂಜಿಯೋಪ್ಲಾಸ್ಟಿ ಅಪಾಯಕಾರಿಯಾಗಿದ್ದಾಗ ಮತ್ತು ತಾಯಿಯ ಜೀವಿತಾವಕಾಶ ಅನುಮಾನಾಸ್ಪದವಾಗಿದ್ದಾಗ, ಗೀತಾ ಶಾಂತಿಕರ ದೈವೀಕ ಸಾನ್ನಿಧ್ಯವನ್ನು ಅನುಭವಿಸಿದರು. ಅವರು ಪ್ರಕಾಶಮಾನ ಆಕಾರವನ್ನು ಸ್ಮರಿಸುತ್ತಾರೆ—ಜೀಸು ಎಂದು ನಂಬಲಾಗುತ್ತದೆ—ಅವರು ಕೆಲವು ನಿಮಿಷಗಳಲ್ಲಿ ತಾಯಿಯ ಗುಣಮುಖತೆಯ ಭರವಸೆ ನೀಡಿದರು. ಈ ಆತ್ಮೀಯ ಸಂಭಾಷಣೆ, ನಿರಂತರ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಕ್ರ್ಯೂಪಾಸನಮ್‌ನ ಪವಿತ್ರ ವಸ್ತುಗಳ ಬಳಕೆಯೊಂದಿಗೆ, ತಾಯಿಯನ್ನು ಯಾವುದೇ ಇತರೆ ಸಂಕೀರ್ಣತೆಗಳಿಲ್ಲದೆ ಆರೋಗ್ಯಕ್ಕೆ ತರುತ್ತದೆ. ಒಡಂಬಡಿಕೆ ಮೆಡಲ್, ಎಣ್ಣೆ ಮತ್ತು ಉಪ್ಪು ಗುಣಮುಖತಾ ಪ್ರಕ್ರಿಯೆಯ ಕೇಂದ್ರವಾಗಿವೆ, ವಿಶ್ವಾಸ ಮತ್ತು ದೈವಿಕ ಕೃಪೆಯ ಸ್ಪಷ್ಟ ವ್ಯಕ್ತ್ಯತೆಗಳಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ.\\n\\nಗೀತಾ ಕ್ರ್ಯೂಪಾಸನಮ್ ತಾಯಿ, ಜೀಸು ಮತ್ತು ಮೇರಿ ಅವರಿಗೆ ಅದ್ಭುತ ಗುಣಮುಖತೆ ಮತ್ತು ನಿತ್ಯ ರಕ್ಷಣೆಗೆ ಗಾಢವಾದ ಕೃತಜ್ಞತೆ ವ್ಯಕ್ತಪಡಿಸುತ್ತಾರೆ. ಅವರು ಮೇರಿಯನ್ ಒಡಂಬಡಿಕೆಯಲ್ಲಿ ನಂಬಿಕೆಯ ಮಹತ್ವ ಮತ್ತು ಒಡಂಬಡಿಕೆ ಪವಿತ್ರ ವಸ್ತುಗಳಿಂದ ಹರಿಯುವ ಆಶೀರ್ವಾದಗಳ ಬಗ್ಗೆ ಒತ್ತಾಯಿಸುತ್ತಾರೆ. ಅವರ ಸಾಕ್ಷ್ಯವು ಇತರರನ್ನು ಕ್ರ್ಯೂಪಾಸನಮ್ ಪವಿತ್ರ ವಸ್ತುಗಳು ಮತ್ತು ಒಡಂಬಡಿಕೆಯ ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯಲ್ಲಿ ನಂಬಿಕೆ ಇಡುವಂತೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ, ದೇವೀಯ ಹಸ್ತಕ್ಷೇಪವು ಅತ್ಯಂತ ನಿರಾಶಾಜನಕ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿಯೂ ಸಹ ಸಾಂತ್ವನ, ಗುಣಮುಖತೆ ಮತ್ತು ಶಕ್ತಿಯನ್ನು ತರಬಲ್ಲದಾಗಿ ಖಚಿತಪಡಿಸುತ್ತದೆ.","mr":"कायमकुलमच्या गीता यांनी त्यांच्या ७९ वर्षीय आईच्या चमत्कारिक आरोग्य लाभाचा प्रभावी साक्षात्कार शेअर केला आहे, जिने गंभीर हृदयविकाराचा झटका सहन केला होता. आईच्या गंभीर स्थितीत—ज्यात अनेक रुग्णालयांत हलवले जाणे आणि मोठा हृदयाचा प्रकार यांचा समावेश होता—गीता यांनी मेरियन करार आणि क्र्यूपासनमच्या पवित्र वस्तूंचा विश्वास ठेवला. त्यांनी सातत्याने करारातील पदक आईच्या छातीत ठेवून प्रार्थना केली, पवित्र तेल लावले आणि आशीर्वादित करारातील मीठ मिसळलेले पाणी दिले. डॉक्टरांच्या शंका असूनही आणि परिस्थितीच्या गंभीरतेतही, त्यांचा अढळ विश्वास आणि या पवित्र वस्तूंचा वापर आरोग्य लाभ आणि संरक्षण आणले, जे क्र्यूपासनम मेरियन कराराच्या खोलवर प्रभावी शक्तीचे दर्शन घडवते.\\n\\nआयसीयूमध्ये ताणलेल्या क्षणांमध्ये, जेव्हा शस्त्रक्रिया आणि एंजिओप्लास्टी धोकादायक होती आणि आईच्या जीवित राहण्याची खात्री नव्हती, तेव्हा गीताला एक सांत्वन देणारी दैवी उपस्थिती जाणवली. त्यांनी एक तेजस्वी आकृती आठवली—जीशू असल्याचा विश्वास होता—जिने काही मिनिटांत आईच्या बरे होण्याची खात्री दिली. ही आध्यात्मिक भेट, सातत्यपूर्ण प्रार्थना आणि क्र्यूपासनमच्या पवित्र वस्तूंचा वापर यामुळे त्यांच्या आईला कोणत्याही जटिलता न होता आरोग्य लाभ मिळाला. करारातील पदक, तेल आणि मीठ उपचार प्रक्रियेतील केंद्रस्थानी होते, जे विश्वास आणि दैवी कृपेच्या मूर्त अभिव्यक्तीप्रमाणे कार्य करतात.\\n\\nगीता यांनी क्र्यूपासनम मदर, जीशू आणि मदर मेरी यांचे चमत्कारिक आरोग्य लाभ आणि सतत संरक्षणाबद्दल मनापासून आभार मानले. त्यांनी मेरियन करारातील श्रद्धा आणि करारातील पवित्र वस्तूंमधून येणाऱ्या आशीर्वादाचे महत्त्व अधोरेखित केले. त्यांचा साक्षात्कार इतरांना क्र्यूपासनमच्या पवित्र वस्तूंवर आणि कराराच्या आध्यात्मिक शक्तीवर विश्वास ठेवण्यास प्रोत्साहित करतो, याची खात्री देतो की दैवी हस्तक्षेप अगदी अत्यंत कठीण परिस्थितीतही सांत्वन, आरोग्य आणि सामर्थ्य आणू शकतो.","es":"Geetha de Kayamkulam comparte un testimonio poderoso sobre la sanación milagrosa de su madre de 79 años, quien sufrió un ataque cardíaco crítico. Durante la grave condición de su madre, que incluyó múltiples traslados hospitalarios y un evento cardíaco mayor, Geetha confió fielmente en el Pacto Mariano y los objetos sacramentales de Kreupasanam. Ella oraba continuamente con la medalla del pacto colocada en el pecho de su madre, aplicaba el aceite sagrado y le daba agua mezclada con la sal bendita del pacto. A pesar de las dudas de los médicos y la gravedad de la situación, su fe inquebrantable y el uso de estos objetos sagrados trajeron sanación y protección, demostrando el profundo poder del Pacto Mariano de Kreupasanam.\\n\\nDurante los momentos intensos en la UCI, cuando la cirugía y la angioplastia eran riesgosas y la supervivencia de su madre parecía incierta, Geetha experimentó una presencia divina reconfortante. Ella recuerda una figura radiante—que se cree es Jesús—apareciendo para asegurarle la recuperación de su madre en minutos. Este encuentro espiritual, combinado con la oración persistente y el uso de los sacramentales de Kreupasanam, ayudó a devolver la salud de su madre sin complicaciones adicionales. La medalla, el aceite y la sal del pacto son centrales en el proceso de sanación, actuando como expresiones tangibles de fe y gracia divina a lo largo de la prueba.\\n\\nGeetha concluye expresando profunda gratitud a la Madre Kreupasanam, Jesús y la Madre María por la sanación milagrosa y la protección continua. Ella enfatiza la importancia de la fe en el Pacto Mariano y las bendiciones que fluyen a través de los sacramentales del pacto. Su testimonio anima a otros a confiar en los objetos sacramentales de Kreupasanam y en el poder espiritual del pacto, asegurando que la intervención divina puede brindar consuelo, sanación y fortaleza incluso en las circunstancias más desesperadas.","ta":"காயம்குளத்திலிருந்து கீதா தனது 79 வயது தாயின் அதிசயமான குணமடைப்பின் சக்திவாய்ந்த சாட்சி பகிர்கிறார், அவள் தாய் கடுமையான இதய நோயால் பாதிக்கப்பட்டார். தாயின் கடுமையான நிலையில்—பல மருத்துவமனைகள் மாற்றப்பட்டதும் முக்கிய இதய நிகழ்வும் உள்பட—கீதா மாரியன் உடன்படிக்கையும் கிரேஉபாசனம் புனித பொருட்களையும் நம்பிக்கையுடன் பயன்படுத்தினார். அவள் தொடர்ந்து உடன்படிக்கை பதக்கம் தாயின் மார்பில் வைத்துக் கொண்டு பிரார்த்தனை செய்தார், புனித எண்ணெய் தடவினார் மற்றும் ஆசீர்வதிக்கப்பட்ட உடன்படிக்கை உப்பை கலந்து நீர் கொடுத்தார். மருத்துவர்கள் சந்தேகித்தாலும் மற்றும் நிலைமையின் தீவிரத்தைக் கவனித்தாலும், அவளின் நிலைத்திருக்கும் நம்பிக்கையும் இந்த புனித பொருட்கள் குணமடைப்பு மற்றும் பாதுகாப்பை கொண்டு வந்தன, கிரேஉபாசனம் மாரியன் உடன்படிக்கையின் ஆழ்ந்த சக்தியை வெளிப்படுத்துகின்றன.\\n\\nஐசியூவில் கடுமையான நிமிடங்களில், அறுவை சிகிச்சை மற்றும் அஞ்சியோபிளாஸ்டி ஆபத்தானவை என்றும் தாயின் உயிர் நிலைதான் சந்தேகத்துக்குள்ளாக இருந்தபோதும், கீதா ஆறுதல் தரும் தெய்வீக இருப்பை அனுபவித்தார். அவள் பிரகாசமான உருவத்தை நினைவுகூருகிறார்—அவர் இயேசு என்று நம்பப்படுகிறது—அவர் சில நிமிடங்களில் தாயின் குணமடையும் உறுதியளித்தார். இந்த ஆன்மீக சந்திப்பு, நிலைத்திருக்கும் பிரார்த்தனை மற்றும் கிரேஉபாசனம் புனித பொருட்களின் பயன்பாட்டுடன் சேர்ந்து, அவளுடைய தாயை எந்த சிக்கல்களும் இல்லாமல் ஆரோக்கியமாக்க உதவியது. உடன்படிக்கை பதக்கம், எண்ணெய் மற்றும் உப்பு குணமடைப்பின் மையம் ஆகும், விசுவாசத்தின் மற்றும் தெய்வீக கிருபையின் ஸ்பஷ்ட வெளிப்பாடுகள் ஆக செயல்படுகின்றன.\\n\\nகீதா கிரேஉபாசனம் தாய், இயேசு மற்றும் தாய் மரியாவுக்கு அதிசய குணமடைப்புக்கும் தொடர்ச்சியான பாதுகாப்புக்கும் ஆழ்ந்த நன்றி தெரிவிக்கிறார். அவள் மாரியன் உடன்படிக்கையில் உள்ள விசுவாசத்தின் முக்கியத்துவத்தையும் உடன்படிக்கை புனித பொருட்களிலிருந்து வரும் ஆசீர்வாதங்களையும் வலியுறுத்துகிறார். அவள் சாட்சி மற்றவர்களை கிரேஉபாசனம் புனித பொருட்கள் மற்றும் உடன்படிக்கையின் ஆன்மீக சக்தியில் நம்பிக்கை வைக்க ஊக்குவிக்கிறது, கடுமையான சூழ்நிலைகளிலும் தெய்வீக கைச்சலிப்பு ஆறுதல், குணம் மற்றும் சக்தியை தரக்கூடியதென உறுதிப்படுத்துகிறது.","te":"కాయమ్కులం నుంచి గీత తన 79 ఏళ్ళ తల్లి అత్యంత ప్రమాదకరమైన హృద్రోగానికి గురైన తర్వాత ఆమె యొక్క అద్భుతమైన ఆరోగ్య కోలుకున్నదానిపై శక్తివంతమైన సాక్ష్యం పంచుకుంటోంది. ఆమె తల్లి తీవ్ర పరిస్థితిలో ఉన్నప్పుడు - అనేక ఆసుపత్రులకి తరలింపులు మరియు ముఖ్యమైన హృదయ సంఘటనతో పాటు - గీత క్రూపసనం మారియన్ ఒప్పందం మరియు పवిత్ర వస్తువులపై విశ్వాసం పెట్టుకుంది. ఆమె నిరంతరం ఒప్పందం మెడల్ ను తన తల్లి ఛాతీపై పెట్టి ప్రార్థనలు చేయడం, పవిత్ర నూనెను పూసుకోవడం, ఆశీర్వదించిన ఒప్పంద ఉప్పు కలిపిన నీళ్లు ఇచ్చింది. డాక్టర్లు సంశయపడ్డప్పటికీ, పరిస్థితి తీవ్రంగా ఉన్నప్పటికీ, ఆమె అచంచల విశ్వాసం మరియు ఈ పవిత్ర వస్తువుల వాడకం నయం మరియు రక్షణ తెచ్చింది, ఇది క్రూపసనం మారియన్ ఒప్పందం యొక్క లోతైన శక్తిని చూపిస్తుంది.\\n\\nఐసీయూలో తీవ్ర సమయాల్లో, శస్త్రచికిత్స మరియు అంజియోప్లాస్టీ ప్రమాదకరమైనప్పుడు మరియు తల్లి జీవించబోతున్నదనే నిర్ధారితం లేకపోవడంతో, గీత ఒక ఆరాధనాత్మక దైవిక ఉనికిని అనుభవించింది. ఆమె ప్రకాశవంతమైన రూపాన్ని గుర్తుచేసుకుంది - ఇది యేసు అని నమ్మబడుతుంది - తల్లి కొన్ని నిమిషాల్లో కోలుకుంటారని భరోసా ఇచ్చింది. ఈ ఆధ్యాత్మిక కలిసివుండటం, నిరంతర ప్రార్థన మరియు క్రూపసనం పవిత్ర వస్తువుల వాడకంతో ఆమె తల్లి ఆరోగ్యంగా తిరిగి వచ్చింది, మరింత సంక్లిష్టతలేకుండా. ఒప్పందం మెడల్, నూనె మరియు ఉప్పు గుణచికిత్స ప్రక్రియలో కీలకమైనవి, విశ్వాసం మరియు దైవ కృప యొక్క స్పష్టమైన ప్రతీకలు.\\n\\nగీత క్రూపసనం తల్లి, యేసు మరియు తల్లి మరియాకు అద్భుతమైన ఆరోగ్య కోలుకున్నదానికి మరియు కొనసాగుతున్న రక్షణకు లోతైన కృతజ్ఞతను వ్యక్తం చేసింది. ఆమె మారియన్ ఒప్పందంలో విశ్వాసం మరియు ఒప్పంద పవిత్ర వస్తువుల ద్వారా వచ్చే ఆశీర్వాదాల ప్రాముఖ్యతను హైలైట్ చేసింది. ఆమె సాక్ష్యం ఇతరులను క్రూపసనం పవిత్ర వస్తువులు మరియు ఒప్పంద ఆధ్యాత్మిక శక్తిపై నమ్మకముంటుండాలని ప్రేరేపిస్తుంది, అత్యంత కఠిన పరిస్థితులలో కూడా దైవ హస్తক্ষেপం సాంత్వన, ఆరోగ్యం మరియు బలాన్ని తెచ్చగలదని హామీ ఇస్తుంది.","fr":"Geetha de Kayamkulam partage un témoignage puissant sur la guérison miraculeuse de sa mère de 79 ans, qui a souffert d'une crise cardiaque grave. Tout au long de la condition sévère de sa mère—comprenant plusieurs transferts hospitaliers et un événement cardiaque majeur—Geetha s'est fiée avec foi à l'Alliance Mariale et aux objets sacramentels de Kreupasanam. Elle priait continuellement avec la médaille de l'alliance placée sur la poitrine de sa mère, appliquait l'huile sainte, et lui donnait de l'eau mélangée avec le sel béni de l'alliance. Malgré les doutes des médecins et la gravité de la situation, sa foi inébranlable et l'usage de ces objets sacrés ont apporté guérison et protection, démontrant la profonde puissance de l'Alliance Mariale de Kreupasanam.\\n\\nPendant les moments intenses en soins intensifs, lorsque la chirurgie et l'angioplastie étaient risquées et que la survie de sa mère semblait incertaine, Geetha a ressenti une présence divine réconfortante. Elle raconte une figure radieuse—croyant être Jésus—apparaissant pour lui assurer la guérison de sa mère en quelques minutes. Cette rencontre spirituelle, combinée à une prière persistante et à l'utilisation des sacramentaux de Kreupasanam, a aidé à ramener sa mère à la santé sans complications supplémentaires. La médaille, l'huile et le sel de l'alliance sont au cœur du processus de guérison, agissant comme des expressions tangibles de la foi et de la grâce divine tout au long de l'épreuve.\\n\\nGeetha conclut en exprimant une profonde gratitude envers la Mère de Kreupasanam, Jésus et la Sainte Vierge Marie pour la guérison miraculeuse et la protection continue. Elle souligne l'importance de la foi dans l'Alliance Mariale et des bénédictions qui découlent des sacramentaux de l'alliance. Son témoignage encourage les autres à faire confiance aux objets sacramentels de Kreupasanam et à la puissance spirituelle de l'alliance, assurant que l'intervention divine peut apporter réconfort, guérison et force même dans les circonstances les plus désespérées."},"subtitles":"/assets/testimony/16jul.json"},{"id":10,"title":{"en":"Marian Relationship","bn":"মেরিয়ান সম্পর্ক","zh":"圣母关系","hi":"मरियाई संबंध","kn":"ಮೇರಿಯನ್ ಸಂಬಂಧ","mr":"मारीअन नाते","es":"Relación Mariana","ta":"மரியன் தொடர்பு","te":"మేరియన్ సంబంధం","fr":"Relation Mariale"},"date":"July 18, 2025","video":"https://youtu.be/NTelBn_ULtU?si=TLBTIUL9saCHHz6P","content":{"en":"This powerful testimony centers on the transformative journey of a family through their faith in the Marian Covenant from Kreupasanam. After taking the covenant in March 2023, the family experienced divine blessings and miracles, including the eventual purchase of their own home after years of living in a rented house and enduring setbacks like a landslide and administrative delays. The testimony emphasizes unwavering trust in Mother Mary’s intercession, strengthened through prayers, Holy Mass attendance, and reliance on the sacred promises made at the altar of apparition.\\n\\nThe Marian Covenant from Kreupasanam played a pivotal role in their healing and provision. The testimony recounts multiple miracles attributed to the covenant's sacraments—the anointing covenant oil brought healing to an elderly woman’s broken hand, relieved severe hip pain in the husband, and cured the daughter’s persistent stomach ailment. The covenant salt and medal are also mentioned as sacred tools used alongside prayer, reinforcing the family's deep spiritual connection and faith in Mother Mary’s protection and guidance throughout their struggles.\\n\\nThroughout their journey, the family actively engaged in distributing Kreupasanam newsletters to spread the message of the covenant and testimonies of grace, reaching even non-Christian communities. The renewal of the Marian Covenant is portrayed as a continual source of strength and blessing, with the family witnessing tangible answers to prayer in their children's education and family well-being. This testimony beautifully showcases the power of the Kreupasanam Marian Covenant and its sacraments as instruments of hope, healing, and provision in the believer’s life.","bn":"এই শক্তিশালী সাক্ষ্যটি ক্রুপাসানামের মারিয়ান চুক্তির প্রতি তাদের বিশ্বাসের মাধ্যমে একটি পরিবারের রূপান্তরমূলক যাত্রাকে কেন্দ্র করে। ২০২৩ সালের মার্চে চুক্তি নেওয়ার পর, পরিবারটি ঐশ্বরিক আশীর্বাদ ও অলৌকিকতা অনুভব করে, যার মধ্যে রয়েছে ভাড়া বাসা থেকে বহু বছর থাকার পর অবশেষে নিজেদের বাড়ি কেনা এবং ভূমিধস ও প্রশাসনিক বিলম্বের মতো বাধাগুলি সহ্য করা। সাক্ষ্যটি মা মেরির মধ্যস্থতার প্রতি অটুট বিশ্বাসকে গুরুত্ব দেয়, যা প্রার্থনা, পবিত্র যজ্ঞে অংশগ্রহণ এবং প্রতিপাদন মণ্ডপে দেওয়া পবিত্র প্রতিশ্রুতির উপর নির্ভরশীলতার মাধ্যমে শক্তিশালী হয়।\\n\\nক্রুপাসানামের মারিয়ান চুক্তি তাদের নিরাময় এবং প্রয়োজনীয়তার ক্ষেত্রে গুরুত্বপূর্ণ ভূমিকা পালন করেছে। সাক্ষ্যটি চুক্তির বিধানগুলোর কারণে ঘটে যাওয়া একাধিক অলৌকিক ঘটনা বর্ণনা করে — অঞ্জন চুক্তির তেল বৃদ্ধ মহিলার ভাঙা হাতকে সুস্থ করে, স্বামীর তীব্র কোমর ব্যথা কমায় এবং কন্যার দীর্ঘস্থায়ী পেটের সমস্যার নিরাময় করে। প্রার্থনার সাথে ব্যবহৃত চুক্তির লবণ এবং মেডেলকেও পবিত্র উপকরণ হিসাবে উল্লেখ করা হয়েছে, যা পরিবারের গভীর আধ্যাত্মিক সংযোগ এবং মা মেরির সুরক্ষা ও পথনির্দেশের প্রতি বিশ্বাসকে জোরদার করে।\\n\\nতাদের যাত্রার সময়, পরিবারটি ক্রুপাসানামের নিউজলেটার বিতরণে সক্রিয়ভাবে অংশগ্রহণ করেছে চুক্তির বার্তা এবং কৃপার সাক্ষ্য প্রচারে, এমনকি অ-কৃষ্ণধর্মীয় সম্প্রদায়ের মধ্যেও। মারিয়ান চুক্তির নবায়নকে একটি ধারাবাহিক শক্তি এবং আশীর্বাদের উৎস হিসাবে উপস্থাপন করা হয়েছে, যেখানে পরিবারটি তাদের সন্তানের শিক্ষায় এবং পারিবারিক কল্যাণে প্রার্থনার দৃশ্যমান উত্তর প্রত্যক্ষ করে। এই সাক্ষ্যটি সুন্দরভাবে ক্রুপাসানামের মারিয়ান চুক্তি এবং এর বিধানগুলোর শক্তিকে আশা, নিরাময় এবং প্রয়োজন মেটানোর উপকরণ হিসেবে প্রদর্শন করে।","zh":"这段有力的见证聚焦于一个家庭通过他们对克鲁帕萨纳姆圣母盟约的信仰所经历的转变旅程。自2023年3月接受盟约以来，这个家庭经历了神圣的祝福和奇迹，包括在多年租住之后，最终购买了属于自己的房屋，期间经历了滑坡和行政延误等挫折。见证强调了对圣母玛利亚代求的坚定信任，通过祈祷、参加弥撒圣事以及依赖显现祭坛上所作的神圣承诺而得以加强。\\n\\n克鲁帕萨纳姆的圣母盟约在他们的治疗和供应中发挥了关键作用。见证回顾了多次归因于盟约圣礼的奇迹——膏油为一位老年妇女破损的手带来了治疗，缓解了丈夫的严重髋部疼痛，治愈了女儿持续的胃痛。盟约盐和圣牌也被提及为与祷告一同使用的圣物，强化了家庭与圣母玛利亚保护和指引的深厚精神联系和信仰。\\n\\n在整个过程中，家庭积极参与分发克鲁帕萨纳姆的通讯，传播盟约的信息和恩典见证，甚至覆盖非基督教社区。圣母盟约的续约被描绘为持续的力量和祝福来源，家庭在孩子们的教育和家庭福祉中见证了祷告的实际回应。这个见证美丽地展示了克鲁帕萨纳姆圣母盟约及其圣礼作为信徒生命中希望、治疗和供给工具的力量。","hi":"यह शक्तिशाली साक्ष्य क्रुपासनम से मेरीअन संधि में उनके विश्वास के माध्यम से एक परिवार की परिवर्तनकारी यात्रा पर केंद्रित है। मार्च 2023 में संधि लेने के बाद, परिवार ने दैवीय आशीर्वाद और चमत्कारों का अनुभव किया, जिसमें कई वर्षों तक किराए के घर में रहने और भूस्खलन व प्रशासनिक देरी जैसी बाधाओं का सामना करने के बाद अंततः अपना खुद का घर खरीदना शामिल है। यह साक्ष्य माता मरियम की मध्यस्थता में अटूट विश्वास को उजागर करता है, जो प्रार्थनाओं, पवित्र मिस्सा में भाग लेने और प्रकट स्थल के वेदी पर किए गए पवित्र वादों पर निर्भरता से मजबूत हुआ।\\n\\nक्रुपासनम की मेरीअन संधि ने उनके उपचार और प्रावधान में महत्वपूर्ण भूमिका निभाई। साक्ष्य में संधि के संस्कारों से संबंधित कई चमत्कारों का उल्लेख है—अन्वेषण संधि तेल ने एक वृद्ध महिला के टूटी हुई हाथ को ठीक किया, पति के गंभीर कूल्हे दर्द को कम किया, और बेटी के लगातार पेट दर्द को ठीक किया। संधि के नमक और पदक को भी प्रार्थना के साथ उपयोग किए गए पवित्र उपकरण के रूप में उल्लेखित किया गया है, जो परिवार के गहरे आध्यात्मिक संबंध और माता मरियम की सुरक्षा और मार्गदर्शन में विश्वास को मजबूत करता है।\\n\\nअपने सफर के दौरान, परिवार ने संधि और कृपा के साक्ष्यों का संदेश फैलाने के लिए क्रुपासनम के न्यूज़लेटर्स का वितरण सक्रिय रूप से किया, यहां तक कि गैर-ईसाई समुदायों तक भी पहुंच बनाई। मेरीअन संधि का नवीनीकरण निरंतर शक्ति और आशीर्वाद का स्रोत माना गया है, जिसमें परिवार ने अपने बच्चों की शिक्षा और पारिवारिक कल्याण में प्रार्थना के ठोस जवाब देखे हैं। यह साक्ष्य खूबसूरती से क्रुपासनम मेरीअन संधि और इसके संस्कारों की शक्ति को विश्वासियों के जीवन में आशा, उपचार और प्रावधान के उपकरण के रूप में प्रदर्शित करता है।","kn":"ಕ್ರೋಪಾಸನಮ್‌ನ ಮರಿಯಾನ್ ಒಪ್ಪಂದದಲ್ಲಿ ಅವರ ನಂಬಿಕೆಯಿಂದಾಗಿ ಒಂದು ಕುಟುಂಬದ ಪರಿವರ್ತನೆ ಯಾತ್ರೆಯ ಮೇಲೆ ಈ ಶಕ್ತಿಯುತ ಸಾಕ್ಷ್ಯ ಕೇಂದ್ರೀಕೃತವಾಗಿದೆ. ಮಾರ್ಚ್ 2023ರಲ್ಲಿ ಒಪ್ಪಂದ ತೆಗೆದುಕೊಂಡ ನಂತರ, ಕುಟುಂಬವು ದಿವ್ಯ ಆಶೀರ್ವಾದಗಳು ಮತ್ತು ಅದ್ಭುತಗಳನ್ನು ಅನುಭವಿಸಿದೆ, ಇದರಲ್ಲಿ ಹಲವಾರು ವರ್ಷಗಳ ಕಾಲ ಬಾಡಿಗೆ ಮನೆದಲ್ಲಿ ವಾಸಿಸುವ ನಂತರ ತಮ್ಮದೇ ಮನೆ ಖರೀದಿಸುವುದು ಮತ್ತು ಭೂಕುಸಿತ ಮತ್ತು ಆಡಳಿತಿಕ ವಿಳಂಬಗಳಂತಹ ವಿಘ್ನಗಳನ್ನು ಸಹಿಸುವುದು ಸೇರಿವೆ. ಈ ಸಾಕ್ಷ್ಯವು ಪ್ರಾರ್ಥನೆಗಳು, ಪವಿತ್ರ ಮಿಸ್‌ಸಾ ಹಾಜರಾತಿ ಮತ್ತು ದರ್ಶನ ವೇದಿಗೆ ಮಾಡಿದ ಪವಿತ್ರ ವಾಗ್ದಾನಗಳ ಮೇಲೆ ಅವಲಂಬಿತವಾಗಿರುವ ಮದರ್ ಮರಿಯವರ ಮಧ್ಯಸ್ಥತೆಯಲ್ಲಿ ಅಚಲ ನಂಬಿಕೆಯನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ.\\n\\nಕ್ರೋಪಾಸನಮ್‌ನ ಮರಿಯಾನ್ ಒಪ್ಪಂದವು ಅವರ ಗುಣಮುಖತೆ ಮತ್ತು ಒದಗಿಸುವಿಕೆಯಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿತು. ಈ ಸಾಕ್ಷ್ಯವು ಒಪ್ಪಂದದ ಸಂಸ್ಕಾರಗಳಿಂದ ಸಂಭವಿಸಿದ ಅನೇಕ ಅದ್ಭುತಗಳನ್ನು ವರ್ಣಿಸುತ್ತದೆ—ಆನಾಯಿಸಲು ನೀಡಲಾದ ಸಂಧಿ ಎಣ್ಣೆ ಹಿರಿಯ ಮಹಿಳೆಯ ಒಡೆಯಾದ ಕೈಗೆ ಗುಣಮಾಡಿತು, ಗಂಡನ ತೀವ್ರ ಹಿಪ್ ನೋವನ್ನು ತಗ್ಗಿಸಿತು ಮತ್ತು ಮಗಳ ಮುಂದುವರೆದ ಹೊಟ್ಟೆ ನೋವನ್ನು ಚಿಕಿತ್ಸಿಸಿತು. ಒಪ್ಪಂದದ ಉಪ್ಪು ಮತ್ತು ಮೆಡಲ್ ಕೂಡ ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ ಬಳಸುವ ಪವಿತ್ರ ಉಪಕರಣಗಳಾಗಿ ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ, ಇದು ಕುಟುಂಬದ ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಸಂಪರ್ಕ ಮತ್ತು ಮದರ್ ಮರಿಯವರ ರಕ್ಷಣೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನದ ಮೇಲೆ ನಂಬಿಕೆಯನ್ನು ಬಲಪಡಿಸುತ್ತದೆ.\\n\\nತಮ್ಮ ಪ್ರಯಾಣದ ವೇಳೆ, ಕುಟುಂಬವು ಒಪ್ಪಂದದ ಸಂದೇಶ ಮತ್ತು ಕೃಪೆಯ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಹರಡಲು ಕ್ರೋಪಾಸನಮ್ ನ್ಯೂಸ್‌ಲೆಟರ್‌ಗಳನ್ನು ಸಕ್ರಿಯವಾಗಿ ಹಂಚಿಕೊಂಡಿತು, ಅಕ್ರಿಶ್ಚಿಯನ್ ಸಮುದಾಯಗಳಿಗೂ ತಲುಪಿತು. ಮರಿಯಾನ್ ಒಪ್ಪಂದದ ನವೀಕರಣವು ಶಕ್ತಿಯ ಮತ್ತು ಆಶೀರ್ವಾದದ ಸತತ ಮೂಲವಾಗಿ ಕಾಣಿಸಲ್ಪಟ್ಟಿದೆ, ಕುಟುಂಬವು ತಮ್ಮ ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಮತ್ತು ಕುಟುಂಬದ ಕಲ್ಯಾಣದಲ್ಲಿ ಪ್ರಾರ್ಥನೆಗೆ ಸ್ಪಷ್ಟ ಉತ್ತರಗಳನ್ನು ಸಾಕ್ಷ್ಯವಾಗಿ ಕಂಡಿದೆ. ಈ ಸಾಕ್ಷ್ಯವು ನಂಬಿಕೆಯವರ ಜೀವನದಲ್ಲಿ ಆಶೆ, ಗುಣಮುಖತೆ ಮತ್ತು ಒದಗಿಸುವಿಕೆಯ ಸಾಧನಗಳಾಗಿ ಕ್ರೋಪಾಸನಮ್ ಮರಿಯಾನ್ ಒಪ್ಪಂದ ಮತ್ತು ಅದರ ಸಂಸ್ಕಾರಗಳ ಶಕ್ತಿಯನ್ನು ಸುಂದರವಾಗಿ ಪ್ರದರ್ಶಿಸುತ್ತದೆ.","mr":"हे सामर्थ्यवान साक्ष्य क्रुपासनम येथील मेरीअन करारातील त्यांच्या विश्वासाद्वारे कुटुंबाच्या परिवर्तनशील प्रवासावर केंद्रित आहे. मार्च 2023 मध्ये करार स्वीकारल्यानंतर, कुटुंबाने दैवी आशीर्वाद आणि चमत्कार अनुभवले, ज्यामध्ये अनेक वर्षे भाड्याच्या घरात राहिल्यानंतर अखेरीस स्वतःचे घर खरेदी करणे आणि भूस्खलन आणि प्रशासकीय विलंब यांसारख्या अडचणींना सामोरे जाणे यांचा समावेश आहे. साक्ष्यात आई मेरी यांच्या मध्यस्थतेवरील ठाम विश्वास अधोरेखित केला जातो, जो प्रार्थना, पवित्र मास्सा उपस्थिती आणि दर्शन वेदीवर केलेल्या पवित्र वचनांवर अवलंबून आहे.\\n\\nक्रुपासनम येथील मेरीअन कराराने त्यांच्या उपचार आणि पुरवठ्यामध्ये महत्त्वपूर्ण भूमिका बजावली आहे. साक्ष्यात करारातील संस्कारांमुळे झालेले अनेक चमत्कार नमूद आहेत—अन्वेषण करार तेलाने एका वृद्ध महिलांच्या तुटलेल्या हाताला बरे केले, नवऱ्याच्या तीव्र कूल्ह्याच्या दुखण्याला आराम दिला आणि मुलीच्या सातत्यपूर्ण पोटदुखीवर उपचार केला. करारातील मीठ आणि पदक यांना देखील प्रार्थनेसोबत वापरल्या जाणाऱ्या पवित्र साधनांप्रमाणे नमूद केले आहे, जे कुटुंबाच्या खोल आध्यात्मिक संबंध आणि आई मेरी यांच्या संरक्षण आणि मार्गदर्शनावरील विश्वासाला बळकट करतात.\\n\\nत्यांच्या प्रवासादरम्यान, कुटुंबाने करार आणि कृपेच्या साक्षींचा संदेश पसरविण्यासाठी क्रुपासनम न्यूजलेटरचे वितरण सक्रियपणे केले, अगदी गैर-ख्रिश्चन समुदायांपर्यंतही पोहोचले. मेरीअन कराराचे नूतनीकरण एक सततची शक्ती आणि आशीर्वादाचा स्रोत म्हणून दर्शविले गेले आहे, ज्यात कुटुंबाने त्यांच्या मुलांच्या शिक्षण आणि कौटुंबिक कल्याणात प्रार्थनेच्या ठोस उत्तरांचा अनुभव घेतला आहे. हे साक्ष्य विश्वासूंच्या जीवनातील आशा, उपचार आणि पुरवठ्याच्या साधनांप्रमाणे क्रुपासनम मेरीअन करार आणि त्याच्या संस्कारांची शक्ती सुंदरपणे दाखवते.","es":"Este poderoso testimonio se centra en el viaje transformador de una familia a través de su fe en el Pacto Mariano de Kreupasanam. Después de tomar el pacto en marzo de 2023, la familia experimentó bendiciones divinas y milagros, incluyendo la compra eventual de su propia casa tras años de vivir en una vivienda alquilada y soportar contratiempos como un deslizamiento de tierra y retrasos administrativos. El testimonio enfatiza una confianza inquebrantable en la intercesión de la Madre María, fortalecida a través de oraciones, la asistencia a la Santa Misa y la dependencia de las promesas sagradas hechas en el altar de la aparición.\\n\\nEl Pacto Mariano de Kreupasanam desempeñó un papel fundamental en su sanación y provisión. El testimonio relata múltiples milagros atribuidos a los sacramentos del pacto: el aceite de unción del pacto trajo sanación a la mano rota de una mujer mayor, alivió el dolor severo de cadera del esposo y curó la persistente dolencia estomacal de la hija. La sal y la medalla del pacto también se mencionan como herramientas sagradas usadas junto con la oración, reforzando la profunda conexión espiritual de la familia y la fe en la protección y guía de la Madre María durante sus dificultades.\\n\\nA lo largo de su camino, la familia participó activamente en la distribución de boletines de Kreupasanam para difundir el mensaje del pacto y testimonios de gracia, llegando incluso a comunidades no cristianas. La renovación del Pacto Mariano se presenta como una fuente continua de fortaleza y bendición, con la familia siendo testigo de respuestas tangibles a las oraciones en la educación de sus hijos y el bienestar familiar. Este testimonio muestra hermosamente el poder del Pacto Mariano de Kreupasanam y sus sacramentos como instrumentos de esperanza, sanación y provisión en la vida del creyente.","ta":"க்ருபாசனம் மாரியன் ஒப்பந்தத்தில் நம்பிக்கை கொண்ட குடும்பத்தின் மாற்றுத்திறனான பயணத்தை மையமாக்கும் இந்த சக்திவாய்ந்த சாட்சி. 2023 மார்ச் மாதம் ஒப்பந்தத்தை எடுத்த பிறகு, அவர்கள் பல வருடங்கள் வாடகை வீட்டில் வாழ்ந்த பிறகு, நிலச்சரிவுகள் மற்றும் நிர்வாக தாமதங்கள் போன்ற சவால்களை எதிர்கொண்டு, தங்களது சொந்த வீட்டை வாங்குவதில் இறைவியின் ஆசீர்வாதங்களையும் அதிசயங்களையும் அனுபவித்தனர். இந்த சாட்சி தாய் மரியாவின் மத்தியஸ்தத்வத்தில் திடமான நம்பிக்கையை வலுப்படுத்துகிறது, இது பிரார்த்தனைகள், பரிசுத்த திருவிழா பங்கேற்பு மற்றும் தோற்றம் செய்யப்பட்ட வediயில் செய்யப்பட்ட பரிசுத்த வாக்குறுதிகளின் மீது நம்பிக்கையால் வலுவடைந்தது.\\n\\nக்ருபாசனம் மாரியன் ஒப்பந்தம் அவர்களது குணமடையல் மற்றும் தேவையில் முக்கிய பங்கு வகித்தது. ஒப்பந்தத்தின் மறைபோசனை எண்ணெய் மூதாட்டியின் உடைந்த கையை குணப்படுத்தியது, கணவரின் கடுமையான இடுப்பு வலியை நிவர்த்தி செய்தது மற்றும் மகளின் நீண்டநாள் வயிற்று புண்னை குணப்படுத்தியது. ஒப்பந்த உப்பும் பதக்கமும் பிரார்த்தனையுடன் இணைந்து பயன்படுத்தப்படும் பவित्र கருவிகளாகவும் குறிப்பிடப்பட்டுள்ளன, இது குடும்பத்தின் ஆழமான ஆன்மீக தொடர்பையும் தாய் மரியாவின் பாதுகாப்பிலும் வழிகாட்டுதலிலும் நம்பிக்கையையும் வலுப்படுத்துகிறது.\\n\\nஅவர்களின் பயணத்தில், குடும்பம் க்ருபாசனம் செய்தித்தாள்களை பரப்புவதில் செயலில் ஈடுபட்டது, ஒப்பந்தத்தின் செய்தி மற்றும் காக்கும் சாட்சிகளை பரப்ப, அம்பிராயமான அல்லாத சமூகங்களுக்கும் சென்றடைந்தது. மாரியன் ஒப்பந்தத்தை புதுப்பிப்பது ஒரு தொடர்ந்த சக்தி மற்றும் ஆசீர்வாத மூலமாக காட்சி செய்யப்படுகிறது, குடும்பம் தங்கள் பிள்ளைகளின் கல்வி மற்றும் குடும்ப நலனில் பிரார்த்தனையின் தெளிவான பதில்களை காண்கிறது. இந்த சாட்சி க்ருபாசனம் மாரியன் ஒப்பந்தத்தின் சக்தியை நம்புகிறவர்களின் வாழ்கையில் நம்பிக்கை, குணமடைவு மற்றும் தேவையை பூர்த்தி செய்யும் கருவிகள் ஆக அழகாக வெளிப்படுத்துகிறது.","te":"క్రుపాసనంలోని మేరియన్ ఒప్పందంపై వారి విశ్వాసం ద్వారా ఒక కుటుంబం మార్చుకున్న ప్రయాణంపై ఈ శక్తివంతమైన సాక్ష్యం కేంద్రీకృతమైంది. 2023 మార్చిలో ఒప్పందాన్ని తీసుకున్న తర్వాత, ఆ కుటుంబం దైవ ఆశీర్వాదాలు మరియు అద్భుతాలను అనుభవించింది, అందులో చాలాకాలం అద్దె ఇల్లు నివసించి, భూకంపం మరియు పరిపాలనా ఆలస్యం వంటి అడ్డంకులను తట్టుకుని వారి స్వంత ఇంటిని కొనుగోలు చేయడం కూడా ఉంది. ఈ సాక్ష్యం తల్లి మేరీ మద్యస్థతపై అచంచల నమ్మకాన్ని ప్రధానంగా చూపిస్తుంది, ప్రార్థనలు, పవిత్ర మసీహా హాజరు మరియు ప్రత్యక్ష వేదికపై చేసిన పవిత్ర హామీలపై ఆధారపడటం ద్వారా బలపడుతుంది.\\n\\nక్రుపాసనంలోని మేరియన్ ఒప్పందం వారి ఆరోగ్యం మరియు అవసరాలలో కీలక పాత్ర పోషించింది. సాక్ష్యం ఒప్పందం ధర్మక్రియలకు చెందిన అనేక అద్భుతాలను వివరించును—అనాయస ఒప్పంద తైలంతో ఒక వృద్ధ మహిళ చేతి గాయానికి క్షమాపణ వచ్చింది, భర్తకు తీవ్ర కుబ్బు నొప్పి తగ్గింది, మరియు కుమార్తె యొక్క నిరంతర కడుపు వ్యాధి కోలుకోనిది. ఒప్పంద ఉప్పు మరియు మెడల్ కూడా ప్రార్థనతో పాటు ఉపయోగించే పవిత్ర సాధనాలుగా ప్రస్తావించబడ్డాయి, ఇది కుటుంబం మరియు తల్లి మేరీ రక్షణ మరియు మార్గదర్శకత్వంపై గాఢ ఆధ్యాత్మిక సంబంధం మరియు విశ్వాసాన్ని బలోపేతం చేస్తుంది.\\n\\nతాము సాగిన ప్రయాణంలో, ఆ కుటుంబం క్రుపాసనం న్యూస్‌లెటర్లను పంపిణీ చేయడంలో చురుకుగా పాల్గొన్నారు, ఒప్పంద సందేశం మరియు కృప యొక్క సాక్ష్యాలను వ్యాప్తి చేయడానికి, క్రైస్తవ సంఘాలకు కూడా చేరుకుంది. మేరియన్ ఒప్పందం పునరుద్ధరణ శక్తి మరియు ఆశీర్వాదం యొక్క నిరంతర మూలంగా చూపబడింది, కుటుంబం తమ పిల్లల విద్య మరియు కుటుంబ శ్రేయస్సులో ప్రార్థనలకు స్పష్టమైన జవాబులను ప్రత్యక్షంగా చూశారు. ఈ సాక్ష్యం క్రుపాసనం మేరియన్ ఒప్పందం మరియు దాని ధర్మక్రియలను విశ్వాసుల జీవితంలో ఆశ, ఆరోగ్యం మరియు అవసరాల సాధనాలుగా అందంగా చూపిస్తుంది.","fr":"Ce puissant témoignage se concentre sur le parcours transformateur d'une famille à travers leur foi dans l'Alliance Mariale de Kreupasanam. Après avoir pris l'alliance en mars 2023, la famille a connu des bénédictions divines et des miracles, y compris l'achat éventuel de leur propre maison après des années de location et des revers tels qu'un glissement de terrain et des retards administratifs. Le témoignage met en avant une confiance inébranlable dans l'intercession de la Vierge Marie, renforcée par les prières, la participation à la messe et la confiance dans les promesses sacrées faites à l'autel de l'apparition.\\n\\nL'Alliance Mariale de Kreupasanam a joué un rôle crucial dans leur guérison et leur provision. Le témoignage relate plusieurs miracles attribués aux sacrements de l'alliance—l'huile d'onction a guéri la main cassée d'une femme âgée, soulagé une douleur intense à la hanche du mari et guéri le mal d'estomac persistant de la fille. Le sel et la médaille de l'alliance sont également mentionnés comme des outils sacrés utilisés avec la prière, renforçant la profonde connexion spirituelle de la famille et leur foi dans la protection et la guidance de la Vierge Marie tout au long de leurs épreuves.\\n\\nTout au long de leur parcours, la famille s'est activement engagée dans la distribution des bulletins de Kreupasanam pour diffuser le message de l'alliance et les témoignages de grâce, atteignant même des communautés non chrétiennes. Le renouvellement de l'Alliance Mariale est présenté comme une source continue de force et de bénédiction, la famille étant témoin de réponses tangibles à leurs prières dans l'éducation de leurs enfants et le bien-être familial. Ce témoignage illustre magnifiquement la puissance de l'Alliance Mariale de Kreupasanam et de ses sacrements comme instruments d'espoir, de guérison et de provision dans la vie du croyant."},"subtitles":"/assets/testimony/18jul.json"},{"id":11,"title":{"en":"Guided by Grace","bn":"অনুগ্রহের মাধ্যমে পথপ্রদর্শন","zh":"恩典引导","hi":"कृपा से मार्गदर्शन","kn":"ಕೃಪೆಯಿಂದ ಮಾರ್ಗದರ್ಶನ","mr":"कृपेने मार्गदर्शन","es":"Guiado por la Gracia","ta":"அருளால் வழிநடத்தல்","te":"కృపతో మార్గనిర్దేశనం","fr":"Guidé par la Grâce"},"date":"July 20, 2025","video":"https://youtu.be/Pgi_86HoGA4?si=cjArRlniyeJwS7Hs","content":{"en":"Amala George’s testimony powerfully illustrates the transformative impact of the Marian Covenant from Kreupasanam in her life and studies. Starting with her mother’s covenant commitment in 2019, Amala embraced the covenant life herself, carrying the covenant medal as a source of spiritual strength and guidance during intense academic and personal challenges. Despite facing severe mental harassment from college authorities and overwhelming academic pressure, she continually sought Mother Mary’s intercession through prayer and the covenant sacramentals, including the covenant medal, oil, and salt. These sacramentals played a vital role in her healing, protection, and overcoming difficulties, culminating in her topping the university and earning a gold medal in her Master’s degree.\\n\\nThe testimony also emphasizes the deep faith and daily reliance on the covenant’s grace, especially through the regular use of the covenant oil and salt for physical and spiritual healing, and the covenant medal as a source of comfort and divine communication. Amala experienced guidance that felt like direct messages from Mother Mary, who led her step-by-step through academic obstacles and decisions. The covenant became a living connection to the Holy Trinity and Mother Mary, supporting her persistence in prayer and faith even amid opposition from non-believing teachers and skeptical peers.\\n\\nUltimately, the Marian Covenant of Kreupasanam not only helped Amala complete her studies with exceptional success but also guided her future path to a PhD funded by the central government. The sacramentals and covenant prayers fortified her spirit and provided practical blessings, protection from harm, and clear communication from Mother Mary. This testimony highlights the powerful role of the Marian Covenant and its sacramentals as instruments of faith, healing, protection, and divine guidance in the lives of believers.","bn":"আমালা জর্জের সাক্ষ্য শক্তিশালীভাবে ক্রিউপাসানম থেকে মারিয়ান চুক্তির পরিবর্তনমূলক প্রভাবকে তার জীবন এবং পড়াশোনায় প্রদর্শন করে। ২০১৯ সালে তার মায়ের চুক্তি গ্রহণের মাধ্যমে শুরু করে, আমালা নিজেও চুক্তি জীবন গ্রহণ করেন, কঠিন একাডেমিক এবং ব্যক্তিগত চ্যালেঞ্জের সময় আধ্যাত্মিক শক্তি এবং দিকনির্দেশনার জন্য চুক্তির মেডেল বহন করে। কলেজ কর্তৃপক্ষের মানসিক হয়রানির মুখোমুখি হওয়া সত্ত্বেও, তিনি মাদার মেরির মধ্যস্থতায় প্রার্থনা এবং চুক্তির ধর্মীয় বস্তু যেমন মেডেল, তেল এবং লবণ ব্যবহার করে সাহায্য চান। এই ধর্মীয় বস্তুগুলি তার আরোগ্য, সুরক্ষা এবং অসুবিধা কাটিয়ে ওঠার ক্ষেত্রে গুরুত্বপূর্ণ ভূমিকা পালন করেছে, যার ফলে তিনি বিশ্ববিদ্যালয়ে সেরা স্থান অর্জন করে সোনার মেডেল পান।\\n\\nএই সাক্ষ্য গভীর বিশ্বাস এবং দৈনন্দিন চুক্তির অনুগ্রহের ওপর নির্ভরতা তুলে ধরে, বিশেষ করে চুক্তির তেল এবং লবণ শারীরিক ও আধ্যাত্মিক আরোগ্যের জন্য নিয়মিত ব্যবহারে, এবং চুক্তির মেডেল স্বস্তি এবং ঐশ্বরিক যোগাযোগের উৎস হিসেবে কাজ করে। আমালা এমন নির্দেশনা পান যা মাদার মেরি থেকে সরাসরি বার্তার মতো মনে হয়, যিনি একাডেমিক প্রতিবন্ধকতা এবং সিদ্ধান্তে তাকে ধাপে ধাপে পরিচালনা করেন। চুক্তি পবিত্র ত্রিত্ব এবং মাদার মেরির সাথে জীবন্ত সংযোগ হয়ে ওঠে, যা তাকে অবিশ্বাসী শিক্ষক এবং সন্দেহপ্রবণ সহপাঠীদের বিরোধিতার মধ্যেও প্রার্থনা এবং বিশ্বাসে দৃঢ় থাকার জন্য সহায়তা করে।\\n\\nঅবশেষে, ক্রিউপাসানমের মারিয়ান চুক্তি শুধু আমালাকে তার পড়াশোনা অসাধারণভাবে সম্পন্ন করতে সাহায্য করেনি, বরং কেন্দ্রীয় সরকারের অর্থায়নে পিএইচডি করার ভবিষ্যৎ পথও নির্দেশ করেছেন। ধর্মীয় বস্তু এবং চুক্তির প্রার্থনাগুলো তার আত্মাকে শক্তিশালী করেছে এবং আর্শীবাদ, সুরক্ষা এবং মাদার মেরির স্পষ্ট যোগাযোগ প্রদান করেছে। এই সাক্ষ্য বিশ্বাসীদের জীবনে মারিয়ান চুক্তি এবং এর ধর্মীয় বস্তুগুলোর শক্তিশালী ভূমিকা Faith, আরোগ্য, সুরক্ষা এবং ঐশ্বরিক নির্দেশনার যন্ত্র হিসেবে তুলে ধরে।","zh":"阿玛拉·乔治的见证有力地展示了克鲁帕萨南玛丽安圣约在她的生活和学业中的变革性影响。自2019年她母亲接受圣约以来，阿玛拉自己也拥抱了圣约生活，携带着圣约勋章，在艰难的学业和个人挑战中获得灵性力量和指引。尽管面对学院当局的严重精神骚扰和巨大的学业压力，她不断通过祈祷和使用包括圣约勋章、圣约圣油和圣约盐等圣物，寻求圣母玛利亚的代祷。这些圣物在她的康复、保护和克服困难中起到了关键作用，最终她获得了大学的第一名和硕士学位金牌。\\n\\n该见证还强调了对圣约恩典的深厚信仰和每日依赖，尤其是通过定期使用圣约圣油和圣约盐进行身心的治愈，以及圣约勋章作为安慰和神圣沟通的来源。阿玛拉感受到如同圣母玛利亚亲自向她传达的信息，圣母一步步引导她克服学业障碍和做出决策。圣约成为她与圣三一和圣母玛利亚之间活生生的联系，支持她在非信徒教师和怀疑同学的反对中坚持祈祷和信仰。\\n\\n最终，克鲁帕萨南的玛丽安圣约不仅帮助阿玛拉以卓越成绩完成学业，还指引她走上由中央政府资助的博士研究之路。圣物和圣约祷告强化了她的精神，提供了实际的祝福、保护免受伤害以及来自圣母玛利亚的清晰沟通。这段见证突显了玛丽安圣约及其圣物作为信仰、治愈、保护和神圣引导工具在信徒生活中的强大作用。","hi":"अमला जॉर्ज की गवाही क्रुपासनम से मैरीअन संधि के उनके जीवन और पढ़ाई पर परिवर्तनकारी प्रभाव को शक्तिशाली रूप से दर्शाती है। 2019 में उनकी मां के संधि लेने के साथ शुरू होकर, अमला ने स्वयं भी संधि जीवन अपनाया, और कठिन शैक्षणिक और व्यक्तिगत चुनौतियों के दौरान आध्यात्मिक शक्ति और मार्गदर्शन के लिए संधि पदक को साथ रखा। कॉलेज अधिकारियों से गंभीर मानसिक उत्पीड़न और भारी अकादमिक दबाव के बावजूद, उन्होंने प्रार्थना और संधि के धार्मिक वस्त्रों—जैसे पदक, तेल और नमक—के माध्यम से मां मरियम की मध्यस्थता मांगी। इन धार्मिक वस्त्रों ने उनके उपचार, सुरक्षा और कठिनाइयों को पार करने में महत्वपूर्ण भूमिका निभाई, जिसके परिणामस्वरूप उन्होंने विश्वविद्यालय में टॉप किया और अपने मास्टर्स डिग्री में स्वर्ण पदक प्राप्त किया।\\n\\nइस गवाही में गहरी आस्था और संधि की कृपा पर दैनिक निर्भरता को भी रेखांकित किया गया है, विशेष रूप से शारीरिक और आध्यात्मिक उपचार के लिए नियमित रूप से संधि तेल और नमक के उपयोग के माध्यम से, और संधि पदक को सांत्वना और दिव्य संवाद का स्रोत माना गया। अमला ने मार्गदर्शन का अनुभव किया जो मां मरियम से सीधे संदेशों की तरह था, जिन्होंने उन्हें शैक्षणिक बाधाओं और निर्णयों में कदम-दर-कदम नेतृत्व किया। संधि पवित्र त्रिमूर्ति और मां मरियम से जीवंत संबंध बन गई, जिसने उन्हें अविश्वासी शिक्षकों और संदेहवादी सहपाठियों के विरोध के बीच भी प्रार्थना और विश्वास में दृढ़ रहने में सहायता की।\\n\\nअंततः, क्रुपासनम की मैरीअन संधि ने न केवल अमला को असाधारण सफलता के साथ अपनी पढ़ाई पूरी करने में मदद की, बल्कि केंद्रीय सरकार द्वारा वित्त पोषित पीएचडी के लिए उनका भविष्य का मार्ग भी निर्देशित किया। धार्मिक वस्त्रों और संधि प्रार्थनाओं ने उनकी आत्मा को मजबूत किया और व्यावहारिक आशीर्वाद, सुरक्षा, और मां मरियम से स्पष्ट संवाद प्रदान किया। यह गवाही विश्वासियों के जीवन में मैरीअन संधि और इसके धार्मिक वस्त्रों की विश्वास, उपचार, सुरक्षा और दिव्य मार्गदर्शन के उपकरण के रूप में शक्तिशाली भूमिका को उजागर करती है।","kn":"ಅಮಲಾ ಜಾರ್ಜ್ ಅವರ ಸಾಕ್ಷ್ಯವು ಕ್ರ್ಯೂಪಾಸಾನಂನಿಂದ ಮರಿಯನ್ ಒಪ್ಪಂದದ ಅವರ ಜೀವನ ಮತ್ತು ಅಧ್ಯಯನಗಳಲ್ಲಿ transformative ಪ್ರಭಾವವನ್ನು ಶಕ್ತಿಶಾಲಿಯಾಗಿ ತೋರಿಸುತ್ತದೆ. 2019ರಲ್ಲಿ ಅವರ ತಾಯಿಯ ಒಪ್ಪಂದದ ನಿರ್ಧಾರದೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗಿ, ಅಮಲಾ ತನ್ನದೇ ಆದ ಒಪ್ಪಂದ ಜೀವನವನ್ನು ಅಳವಡಿಸಿಕೊಂಡಿದ್ದು, ಗಂಭೀರ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸವಾಲುಗಳ ಸಮಯದಲ್ಲಿ ಆತ್ಮೀಯ ಶಕ್ತಿ ಮತ್ತು ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಒಪ್ಪಂದ ಪದಕವನ್ನು ಧರಿಸುತ್ತಿದ್ದರು. ಕಾಲೇಜು ಅಧಿಕಾರಿಗಳಿಂದ ಗಂಭೀರ ಮಾನಸಿಕ ಹಿಂಸೆ ಹಾಗೂ ಭಾರೀ ಅಕಾಡೆಮಿಕ್ ಒತ್ತಡದ ಎದುರಿಸಿದರೂ, ಅವರು ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಒಪ್ಪಂದ ಧರ್ಮೀಯ ವಸ್ತುಗಳು – ಪದಕ, ಎಣ್ಣೆ ಮತ್ತು ಉಪ್ಪು ಸೇರಿದಂತೆ – ಮೂಲಕ ಮದರ್ ಮೇರಿಯ ಮಧ್ಯಸ್ಥತೆಯನ್ನು ಕೇಳಿದರು. ಈ ಧರ್ಮೀಯ ವಸ್ತುಗಳು ಅವರ ಚಿಕಿತ್ಸೆಯಲ್ಲಿ, ರಕ್ಷಣೆಯಲ್ಲಿ ಮತ್ತು ಸಮಸ್ಯೆಗಳನ್ನು ಸಮಾಧಾನಗೊಳಿಸುವಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿತು, ಪರಿಣಾಮವಾಗಿ ಅವರು ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಟಾಪ್ ಮಾಡಿ ತಮ್ಮ ಮಾಸ್ಟರ್ಸ್ ಪದವಿಯಲ್ಲಿ ಚಿನ್ನದ ಪದಕ ಪಡೆದರು.\\n\\nಈ ಸಾಕ್ಷ್ಯವು ಒಪ್ಪಂದದ ಕೃಪೆಯಲ್ಲಿ ಆಳವಾದ ನಂಬಿಕೆ ಮತ್ತು ದಿನನಿತ್ಯದ ಅವಲಂಬನೆಯನ್ನು ವಿಶೇಷವಾಗಿ ಒಪ್ಪಂದ ಎಣ್ಣೆ ಮತ್ತು ಉಪ್ಪನ್ನು ಶಾರೀರಿಕ ಹಾಗೂ ಆಧ್ಯಾತ್ಮಿಕ ಆರೊಗ್ಯಕ್ಕಾಗಿ ನಿಯಮಿತವಾಗಿ ಬಳಸುವುದರ ಮೂಲಕ ಮತ್ತು ಒಪ್ಪಂದ ಪದಕವನ್ನು ಆರಾಮ ಮತ್ತು ದಿವ್ಯ ಸಂವಹನದ ಮೂಲವಾಗಿ ಬಳಸುವುದರ ಮೂಲಕ ಒತ್ತು ನೀಡುತ್ತದೆ. ಅಮಲಾ ಮದರ್ ಮೇರಿ ಅವರಿಂದ ನೇರ ಸಂದೇಶಗಳಂತೆ ಮಾರ್ಗದರ್ಶನವನ್ನು ಅನುಭವಿಸಿದರು, ಅವರು ಅಕಾಡೆಮಿಕ್ ಅಡೆತಡೆ ಮತ್ತು ನಿರ್ಣಯಗಳಲ್ಲಿ ಹೆಜ್ಜೆ ಹೆಜ್ಜೆ ಮೂಲಕ ಅವರು ಮಾರ್ಗದರ್ಶನ ನೀಡಿದರು. ಒಪ್ಪಂದವು ಪವಿತ್ರ ತ್ರಿಮೂರ್ತಿ ಮತ್ತು ಮದರ್ ಮೇರಿಯೊಂದಿಗೆ ಜೀವಂತ ಸಂಪರ್ಕವಾಗಿದ್ದು, ನಂಬಿಕೆಯಾಗದ ಶಿಕ್ಷಕರು ಮತ್ತು ಸಂಶಯಿ ಸಹಪಾಠಿಗಳ ವಿರೋಧದ ನಡುವೆಯೂ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ನಂಬಿಕೆಯಲ್ಲಿ ಅವರ ಸ್ಥಿರತೆಯನ್ನು ಬೆಂಬಲಿಸಿದೆ.\\n\\nಅಂತಿಮವಾಗಿ, ಕ್ರ್ಯೂಪಾಸಾನಂನ ಮರಿಯನ್ ಒಪ್ಪಂದವು ಅಮಲಾವನ್ನು ಮಾತ್ರವಲ್ಲದೆ ಅದ್ಭುತ ಯಶಸ್ವಿಯಾಗಿ ತಮ್ಮ ಅಧ್ಯಯನಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡದೆ, ಕೇಂದ್ರ ಸರ್ಕಾರದಿಂದ ಅನುದಾನಿತ ಪಿಎಚ್‌ಡಿ ಅವರ ಭವಿಷ್ಯ ಮಾರ್ಗವನ್ನು ಸಹ ಮಾರ್ಗದರ್ಶನ ಮಾಡಿತು. ಧರ್ಮೀಯ ವಸ್ತುಗಳು ಮತ್ತು ಒಪ್ಪಂದ ಪ್ರಾರ್ಥನೆಗಳು ಅವರ ಆತ್ಮವನ್ನು ಬಲಪಡಿಸಿವೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಆಶೀರ್ವಾದಗಳು, ರಕ್ಷಣೆಯು ಮತ್ತು ಮದರ್ ಮೇರಿ ಅವರಿಂದ ಸ್ಪಷ್ಟ ಸಂವಹನವನ್ನು ಒದಗಿಸಿವೆ. ಈ ಸಾಕ್ಷ್ಯವು ನಂಬಿಕೆಯಲ್ಲಿ, ಆರೊಗ್ಯದಲ್ಲಿ, ರಕ್ಷಣೆಯಲ್ಲಿ ಮತ್ತು ದಿವ್ಯ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಮರಿಯನ್ ಒಪ್ಪಂದ ಮತ್ತು ಅದರ ಧರ್ಮೀಯ ವಸ್ತುಗಳ ಶಕ್ತಿಶಾಲಿ ಪಾತ್ರವನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತದೆ.","mr":"अमला जॉर्जचा साक्षात्कार क्रुपासनम येथील मरीन कराराचा त्यांच्या जीवनावर आणि अभ्यासावर होणारा परिवर्तनकारी परिणाम जोरदारपणे दाखवतो. 2019 मध्ये त्यांच्या आईने करार स्वीकारल्यानंतर, अमलाने स्वतःही कराराचे जीवन स्वीकारले आणि तीव्र शैक्षणिक आणि वैयक्तिक आव्हानांच्या काळात आध्यात्मिक शक्ती आणि मार्गदर्शनासाठी करार पदक घातले. कॉलेज प्रशासनाकडून गंभीर मानसिक त्रास सहन केल्यावरही, तिने प्रार्थना आणि करारातील धार्मिक वस्तू, जसे की पदक, तेल आणि मीठ यांचा वापर करून आई मरीच्या मध्यस्थतेची मागणी केली. या धार्मिक वस्तूंनी तिच्या आरोग्यासाठी, संरक्षणासाठी आणि अडचणींवर मात करण्यासाठी महत्त्वपूर्ण भूमिका बजावली, परिणामी तिने विद्यापीठात पहिलं स्थान मिळवले आणि तिच्या मास्टर्स पदवीत सुवर्णपदक मिळवले.\\n\\nहा साक्षात्कार कराराच्या कृपेवर सखोल श्रद्धा आणि दैनिक अवलंबित्व यावर देखील भर देतो, विशेषतः शारीरिक आणि आध्यात्मिक उपचारासाठी करारातील तेल आणि मीठचा नियमित वापर आणि आराम आणि दैवी संवादासाठी करार पदकाचा वापर करून. अमलाला आई मरीकडून थेट संदेश मिळाल्यासारखी वाटणारी मार्गदर्शनाची अनुभूती झाली, जिने तिला शैक्षणिक अडथळ्यांमध्ये आणि निर्णयांमध्ये टप्प्याटप्प्याने मार्गदर्शन केले. करार पवित्र त्रीत्यांश आणि आई मरी यांच्याशी एक जिवंत संबंध झाला, ज्यामुळे तिला अविश्वासी शिक्षक आणि संशयवादी सहाध्यायांच्या विरोधात प्रार्थना आणि श्रद्धा टिकवून ठेवण्यास मदत झाली.\\n\\nशेवटी, क्रुपासनमचा मरीन करार अमलाला केवळ तिचे अभ्यास अपवादात्मक यशाने पूर्ण करण्यास मदत केली नाही तर केंद्रीय सरकारच्या निधीने चालणाऱ्या पीएचडीसाठी तिचा भविष्यातील मार्ग देखील दाखविला. धार्मिक वस्तू आणि करार प्रार्थनांनी तिच्या आत्म्याला बळ दिले आणि व्यावहारिक आशीर्वाद, संरक्षण आणि आई मरीकडून स्पष्ट संवाद प्रदान केला. हा साक्षात्कार श्रद्धा, उपचार, संरक्षण आणि दैवी मार्गदर्शन साधन म्हणून मरीन करार आणि त्याच्या धार्मिक वस्तूंची शक्तिशाली भूमिका अधोरेखित करतो.","es":"El testimonio de Amala George ilustra poderosamente el impacto transformador del Pacto Mariano de Kreupasanam en su vida y estudios. Comenzando con el compromiso de pacto de su madre en 2019, Amala abrazó la vida del pacto ella misma, llevando la medalla del pacto como fuente de fuerza espiritual y guía durante intensos desafíos académicos y personales. A pesar de enfrentar severo acoso mental por parte de las autoridades universitarias y una abrumadora presión académica, buscó continuamente la intercesión de la Madre María a través de la oración y los sacramentales del pacto, incluyendo la medalla, el aceite y la sal del pacto. Estos sacramentales jugaron un papel vital en su sanación, protección y superación de dificultades, culminando en ser la mejor estudiante de la universidad y obtener una medalla de oro en su Maestría.\\n\\nEl testimonio también enfatiza la profunda fe y la dependencia diaria en la gracia del pacto, especialmente a través del uso regular del aceite y la sal del pacto para la sanación física y espiritual, y la medalla del pacto como fuente de consuelo y comunicación divina. Amala experimentó una guía que se sentía como mensajes directos de la Madre María, quien la llevó paso a paso a través de los obstáculos académicos y decisiones. El pacto se convirtió en una conexión viva con la Santísima Trinidad y la Madre María, apoyando su persistencia en la oración y la fe incluso ante la oposición de profesores no creyentes y compañeros escépticos.\\n\\nEn última instancia, el Pacto Mariano de Kreupasanam no solo ayudó a Amala a completar sus estudios con un éxito excepcional, sino que también guió su futuro camino hacia un doctorado financiado por el gobierno central. Los sacramentales y las oraciones del pacto fortalecieron su espíritu y proporcionaron bendiciones prácticas, protección contra el daño y una comunicación clara de la Madre María. Este testimonio destaca el poderoso papel del Pacto Mariano y sus sacramentales como instrumentos de fe, sanación, protección y guía divina en la vida de los creyentes.","ta":"அமலா ஜார்ஜின் சாட்சியம் கிரூபசனம் இருந்து வரும் மரியன் ஒப்பந்தத்தின் மாற்றம் உண்டாக்கும் தாக்கத்தை அவரது வாழ்க்கை மற்றும் படிப்புகளில் வலுவாக காட்டுகிறது. 2019-ல் அவரது தாயாரின் ஒப்பந்த உறுதியோடு தொடங்கி, அமலா தானும் ஒப்பந்த வாழ்க்கையை ஏற்றுக்கொண்டு, கடுமையான கல்வி மற்றும் தனிப்பட்ட சவால்களின் போது ஆவிய சக்தி மற்றும் வழிகாட்டுதலுக்காக ஒப்பந்த பட்ஜெல் அணிந்தார். கல்லூரி அதிகாரிகளின் மன அழுத்தம் மற்றும் கடுமையான கல்வி அழுத்தத்தை எதிர்கொள்வதற்கிடையில், அவர் பிரார்த்தனை மற்றும் ஒப்பந்தத்தின் சாமர்த்திய பொருட்கள் (பட்ஜெல், எண்ணெய் மற்றும் உப்பு) மூலம் மாதர் மேரியின் இடைக்காலத்தைக் கேட்டார். இந்த சாமர்த்திய பொருட்கள் அவரது சிகிச்சை, பாதுகாப்பு மற்றும் பிரச்சினைகளை கடக்க உதவிய முக்கிய பங்கு வகித்தன, இதன் முடிவில் அவர் பல்கலைக்கழகத்தில் முதன்மையாகவும் தனது முதுநிலை பட்டத்தில் பொன்விருதையும் பெற்றார்.\\n\\nசாட்சி ஒப்பந்தத்தின் அருள் மீதும் ஆழ்ந்த நம்பிக்கையும் தினசரி சார்பும், குறிப்பாக உடல் மற்றும் ஆன்மிக சிகிச்சைக்காக ஒப்பந்த எண்ணெய் மற்றும் உப்பை நியமமாகப் பயன்படுத்துவதிலும், ஆறுதல் மற்றும் தெய்வீக தொடர்புக்கான ஒப்பந்த பட்ஜெலையும் வலியுறுத்துகிறது. அமலா மாதர் மேரியிடம் நேரடி செய்திகளாக உணர்ந்த வழிகாட்டுதலை அனுபவித்தார், அவர் கல்வி தடைகள் மற்றும் முடிவுகளில் அடுத்தடுத்த படிகளாக வழிகாட்டினார். ஒப்பந்தம் பரிசுத்த திரிமூர்த்தி மற்றும் மாதர் மேரியுடன் உயிருடன் இணைப்பாக மாறியது, நம்பிக்கை இல்லாத ஆசிரியர்கள் மற்றும் சந்தேக நம்பிக்கையுள்ள சக மாணவர்களின் எதிர்ப்புகளுக்கு மத்தியில் கூட அவரை பிரார்த்தனையிலும் நம்பிக்கையிலும் உறுதியுடன் இருந்து உதவியது.\\n\\nமுடிவாக, கிரூபசனத்தின் மரியன் ஒப்பந்தம் அமலாவை சிறப்பாக படிப்பை முடிக்க உதவியதுடன், மத்திய அரசால் நிதியளிக்கப்பட்ட பிஎச்ச்டி பயணத்திற்கான அவருடைய எதிர்கால பாதையையும் வழிகாட்டியது. சாமர்த்திய பொருட்கள் மற்றும் ஒப்பந்த பிரார்த்தனைகள் அவரது ஆன்மாவை வலுப்படுத்தி, நடைமுறை ஆசீர்வாதங்கள், பாதுகாப்பு மற்றும் மாதர் மேரியிடமிருந்து தெளிவான தொடர்பை வழங்கின. இந்த சாட்சி நம்பிக்கை, குணம், பாதுகாப்பு மற்றும் தெய்வீக வழிகாட்டுதலின் கருவிகளாக மரியன் ஒப்பந்தம் மற்றும் அதன் சாமர்த்திய பொருட்களின் சக்திவாய்ந்த வேடிக்கையை வெளிப்படுத்துகிறது.","te":"అమలా జార్జి సాక్ష్యం క్రూపసానం నుండి మారియన్ ఒప్పందం ఆమె జీవితం మరియు చదువులో కలిగించిన మార్పును శక్తివంతంగా చూపిస్తుంది. 2019లో ఆమె తల్లి ఒప్పందం తీసుకోవడం ప్రారంభంగా, అమలా తనంతటే ఒప్పంద జీవితం స్వీకరించి, తీవ్ర విద్యా మరియు వ్యక్తిగత సవాళ్ల సమయంలో ఆధ్యాత్మిక బలం మరియు మార్గదర్శకత్వం కోసం ఒప్పంద పదకాన్ని ధరించింది. కాలేజీ అధికారుల నుంచి తీవ్రమైన మానసిక హింస మరియు భారీ విద్యా ఒత్తిడిని ఎదుర్కొంటున్నప్పటికీ, ఆమె ప్రార్థన మరియు ఒప్పంద ధార్మిక వస్తువులు - పదకం, తైలం, ఉప్పు వంటి వాటితో మదర్ మేరీ మధ్యస్థత కోరింది. ఈ ధార్మిక వస్తువులు ఆమె ఆరోగ్యం, రక్షణ మరియు కష్టాలను అధిగమించడంలో కీలక పాత్ర పోషించాయి, ఫలితంగా ఆమె యూనివర్శిటీలో అగ్ర స్థానాన్ని సంపాదించి తన మాస్టర్స్ డిగ్రీలో గోల్డ్ మెడల్ పొందింది.\\n\\nఈ సాక్ష్యం ఒప్పంద కృపపై లోతైన విశ్వాసం మరియు రోజువారీ ఆధారపడటం ముఖ్యమని సూచిస్తుంది, ముఖ్యంగా శారీరక మరియు ఆధ్యాత్మిక సవరణ కోసం ఒప్పంద తైలం మరియు ఉప్పును క్రమంగా ఉపయోగించడం ద్వారా, మరియు ఒప్పంద పదకాన్ని సান্ত్వన మరియు దైవ సంభాషణకు ఉపయోగించడం ద్వారా. అమలా మదర్ మేరీ నుండి నేరుగా సందేశాలు అందుకున్నట్టు మార్గనిర్దేశకత్వాన్ని అనుభవించింది, వారు విద్యా అడ్డంకులు మరియు నిర్ణయాలలో దశలవారీగా ఆమెను నడిపించారు. ఒప్పందం పవిత్ర త్రిమూర్తి మరియు మదర్ మేరీతో జీవించేది కనెక్షన్ అయింది, అవిశ్వాసి ఉపాధ్యాయులు మరియు సందేహాస్పద సహచరుల ఎదుట కూడా ఆమె ప్రార్థన మరియు విశ్వాసం నిలుపుకోవడానికి మద్దతు ఇచ్చింది.\\n\\nచివరికి, క్రూపసానం మారియన్ ఒప్పందం అమలాకు తన చదువును అసాధారణ విజయంలో పూర్తిచేయడంలో సహాయపడటమే కాకుండా, కేంద్ర ప్రభుత్వ నిధులతో కూడిన పీహెచ్‌డీకు ఆమె భవిష్యత్తు మార్గాన్ని కూడా సూచించింది. ధార్మిక వస్తువులు మరియు ఒప్పంద ప్రార్థనలు ఆమె ఆత్మను బలోపేతం చేయగా, ప్రాక్టికల్ ఆశీర్వాదాలు, రక్షణ మరియు మదర్ మేరీ నుండి స్పష్టమైన సంభాషణను అందించాయి. ఈ సాక్ష్యం విశ్వాసంలో, ఆరోగ్యంలో, రక్షణలో మరియు దైవ మార్గదర్శకత్వంలో మారియన్ ఒప్పందం మరియు దాని ధార్మిక వస్తువుల శక్తివంతమైన పాత్రను హైలైట్ చేస్తుంది.","fr":"Le témoignage d'Amala George illustre puissamment l'impact transformateur de l'Alliance Mariale de Kreupasanam dans sa vie et ses études. Commencée avec l'engagement de sa mère envers l'Alliance en 2019, Amala a elle-même embrassé la vie de l'Alliance, portant la médaille de l'Alliance comme source de force spirituelle et de guidance durant des défis académiques et personnels intenses. Malgré le harcèlement mental sévère de la part des autorités universitaires et une pression académique écrasante, elle a continuellement cherché l'intercession de la Vierge Marie à travers la prière et les sacramentaux de l'Alliance, incluant la médaille, l'huile et le sel de l'Alliance. Ces sacramentaux ont joué un rôle vital dans sa guérison, sa protection et le dépassement des difficultés, culminant avec sa première place à l'université et l'obtention d'une médaille d'or lors de son Master.\\n\\nLe témoignage souligne également la foi profonde et la dépendance quotidienne à la grâce de l'Alliance, notamment par l'usage régulier de l'huile et du sel de l'Alliance pour la guérison physique et spirituelle, ainsi que la médaille comme source de réconfort et de communication divine. Amala a vécu une guidance ressentie comme des messages directs de la Vierge Marie, qui l'a conduite pas à pas à travers les obstacles académiques et les décisions. L'Alliance est devenue une connexion vivante avec la Sainte Trinité et la Vierge Marie, soutenant sa persévérance dans la prière et la foi malgré l'opposition de professeurs non-croyants et de pairs sceptiques.\\n\\nFinalement, l'Alliance Mariale de Kreupasanam n'a pas seulement aidé Amala à terminer ses études avec un succès exceptionnel, mais a aussi guidé son chemin futur vers un doctorat financé par le gouvernement central. Les sacramentaux et les prières de l'Alliance ont fortifié son esprit et offert des bénédictions pratiques, une protection contre les dangers et une communication claire de la Vierge Marie. Ce témoignage met en lumière le rôle puissant de l'Alliance Mariale et de ses sacramentaux en tant qu'instruments de foi, de guérison, de protection et de guidance divine dans la vie des croyants."},"subtitles":"/assets/testimony/20jul.json"},{"id":12,"title":{"en":"Faithful Mother's Journey","bn":"বিশ্বস্ত মায়ের যাত্রা","zh":"忠信母亲的旅程","hi":"विश्वासी माँ की यात्रा","kn":"ನಂಬಿಕೆ ಇರುವ ತಾಯಿಯ ಪ್ರಯಾಣ","mr":"विश्वासू आईचा प्रवास","es":"El Viaje de una Madre Fiel","ta":"நம்பிக்கையுள்ள தாயின் பயணம்","te":"నమ్మకమైన తల్లి ప్రయాణం","fr":"Le Voyage d'une Mère Fidèle"},"date":"July 21, 2025","video":"https://youtu.be/8LQ8sQ7-Tkc?si=Fqya0C59v1CN80Ip","content":{"en":"Subisha Jinson’s testimony centers on her deep faith journey with the Marian Covenant through Kreupasanam amid her baby’s serious heart condition. When her newborn was diagnosed with heart valve issues, she was overwhelmed and distressed but found hope and strength in the prayers and testimonies associated with Kreupasanam. Despite many challenges, including managing her children alone and limited resources, she was determined to take the Marian Covenant at Kreupasanam, believing firmly in Amma’s protection and intercession.\\n\\nThroughout this period, the sacramentals of the Marian Covenant—especially the covenant medal, oil, and salt—played a vital role in her spiritual support and healing process. She carried the covenant medal as a source of courage, used the covenant oil to bless her family, and embraced the covenant life’s prayers and devotion, which strengthened her trust in God’s power to do the impossible. Miraculously, over time, the baby’s heart valves progressively healed without any medication, a healing attributed to Mother Mary’s intercession through the covenant.\\n\\nSubisha also shared how the Marian Covenant brought peace and practical help in other family crises, like her son’s hospital discharge when insurance issues threatened payment. The covenant community and the continuous spiritual practices, including confession and daily prayers, helped her stay close to Mother Mary and Jesus. The testimony underscores how Kreupasanam and the covenant life provide not only spiritual comfort but tangible miracles, guidance, and the strength to face life’s hardships with faith.","bn":"সুশীষা জিনসনের স্বাক্ষ্যটির কেন্দ্রবিন্দু তাঁর সন্তানদের গুরুতর হৃদযন্ত্রের সমস্যার মাঝেও ক্রেউপাসনামের মাধ্যমে মারিয়ান চুক্তির প্রতি তাঁর গভীর বিশ্বাসের যাত্রা। নবজাতকের হার্ট ভলভ সমস্যা ধরা পড়লে তিনি উদ্বিগ্ন ও দুঃখিত হলেও, তিনি ক্রেউপাসনামের প্রার্থনা ও témoignies থেকে আশা ও শক্তি খুঁজে পান। একা সন্তানের যত্ন নেওয়া, সীমিত সম্পদসহ অসংখ্য চ্যালেঞ্জের পরও, তিনি মারিয়ান চুক্তি গ্রহণ করতে দৃঢ়প্রতিজ্ঞ ছিলেন, আর তিনি অম্মার সুরক্ষা ও মধ্যস্থতার প্রতি দৃঢ় বিশ্বাস রাখতেন।\\n\\nএই সময়কালে মারিয়ান চুক্তির পবিত্র প্রতীকি বস্তুগুলো—বিশেষ করে চুক্তি মেডেল, তেল ও লবণ—তাঁর আধ্যাত্মিক সহায়তা ও নিরাময়ে গুরুত্বপূর্ণ ভূমিকা পালন করে। তিনি সাহসের উৎস হিসেবে চুক্তি মেডেল বহন করতেন, পরিবারের আশীর্বাদের জন্য চুক্তি তেল ব্যবহার করতেন, এবং ধ্যান-প্রার্থনায় নিমজ্জিত হয়ে বিশ্বাসের শক্তি পান যেটি ঈশ্বরের অসাধ্যকে সম্ভাব্য করার ক্ষমতায় তাঁর আস্থা দৃঢ় করে। অলৌকিকভাবে, সময়ের সঙ্গে সঙ্গে শিশুটির হৃদযন্ত্রের ভলভ সম্পূর্ণভাবে নিরাময় লাভ করে কোনও ঔষধ ছাড়াই, যা মারিয়ান মধ্যস্থতার মাধ্যমে সম্ভব হয়েছে।\\n\\nসুশীষা আরও জানান যে মারিয়ান চুক্তি কীভাবে পরিবারের অন্যান্য সংকটেও শান্তি ও ব্যবহারিক সাহায্য নিয়ে এসেছে—যেমন তাঁর পুত্রের হাসপাতাল থেকে ছাড়ানোর সময় বীমা সমস্যা যখন বিল পরিশোধে বিঘ্ন ঘটাচ্ছিল। চুক্তি সম্প্রদায় এবং নিয়মিত আধ্যাত্মিক অনুশীলন—যেমন ক্ষমা ও প্রতিদিনের প্রার্থনা—তাঁকে মা মারিয়া ও যীশুর কাছে থাকতে সহায়তা করে। এই সাক্ষ্য প্রমাণ করে যে ক্রেউপাসনাম এবং চুক্তিজীবন কেবল আধ্যাত্মিক সান্ত্বনা নয়, অন্তর্দৃষ্টি ও জীবন জীবনের চ্যালেঞ্জ মোকাবিলার শক্তিও প্রদান করে।","zh":"Subisha Jinson 的见证主要围绕她通过 Kreupasanam 加入玛利亚盟约的坚定信仰之路，尽管她的婴儿患有严重的心脏病。当她的新生儿被诊断出心脏瓣膜问题时，她非常焦虑和悲痛，但她在 Kreupasanam 的祈祷和见证中找到了希望和力量。尽管面临独自抚养孩子和资源有限等许多挑战，她仍决心在 Kreupasanam 接受玛利亚盟约，坚信 Amma 的保护和代祷。\\n\\n在这段期间，玛利亚盟约的圣物——尤其是盟约勋章、圣油和圣盐——在她的精神支持和治愈过程中起到了关键作用。她随身携带盟约勋章以获取勇气，使用盟约圣油为家人祝福，投入盟约生活的祷告与奉献，加深她对上帝做不可能之事的信任。奇迹般地，随着时间推移，婴儿的心脏瓣膜逐渐痊愈，无需任何药物治疗，这治愈被归因于通过盟约玛利亚的代祷。\\n\\nSubisha 还分享了玛利亚盟约在其他家庭危机中的和平与实际帮助，例如她儿子出院时保险问题威胁到支付。盟约社区以及持续的属灵实践，包括忏悔和每日祷告，帮助她贴近圣母玛利亚和耶稣。此见证强调 Kreupasanam 与盟约生活不仅提供属灵安慰，还带来显而易见的奇迹、指引，以及以信心面对人生困境的力量。","hi":"सुबिशा जिन्सन की गवाही उनके गहन आस्थावान यात्रा पर केंद्रित है, जिसमें उन्होंने Kreupasanam में मरियानी विलय, “Marian Covenant”, लिया, जबकि उनके बच्चे की गंभीर हृदय समस्या थी। जब उनके नवजात को हृदय वाल्व की समस्या का निदान हुआ, तब वह चिंतित और परेशान थीं, लेकिन Kreupasanam से जुड़ी प्रार्थनाओं और गवाहियों से उन्होंने आशा और शक्ति पाई। कई चुनौतियों के बावजूद, जैसे अकेले तीन बच्चों की देखभाल और सीमित संसाधन, वह दृढ़ संकल्पित थीं कि वे Amma की सुरक्षा और मध्यस्थता में विश्वास करते हुए Kreupasanam में Marian Covenant लें।\\n\\nइस अवधि में Marian Covenant के पवित्र साधन—विशेष रूप से Covenant Medal, Covenant Oil, और Covenant Salt—ने उनकी आत्मिक सहायता और उपचार प्रक्रिया में महत्वपूर्ण भूमिका निभाई। उन्होंने साहस के स्रोत के रूप में Covenant Medal साथ रखा, परिवार को आशीर्वाद देने के लिए Covenant Oil का उपयोग किया, और Covenant जीवन की प्रार्थना और भक्ति को अपनाया, जिसने ईश्वर की असंभव को संभव करने वाली शक्ति में उनके विश्वास को मजबूत किया। चमत्कारिक रूप से समय के साथ, बच्चे के हृदय वाल्व धीरे-धीरे बिना किसी दवा के ठीक हो गए, जिसे Marian की मध्यस्थता द्वारा माना गया।\\n\\nसुबिशा ने यह भी साझा किया कि Marian Covenant ने अन्य पारिवारिक संकटों में शांति और व्यावहारिक सहायता कैसे लायी—जैसे उनके बेटे को अस्पताल से छुट्टी मिली लेकिन इंश्योरेंस समस्या ने भुगतान में बाधा डाली। Covenant समुदाय और सतत आध्यात्मिक अभ्यास—जैसे confession और दैनिक प्रार्थना—ने उन्हें माँ मरियम और यीशु के करीब रहने में सहायक किया। यह गवाही दर्शाती है कि Kreupasanam और Covenant जीवन न केवल आध्यात्मिक सांत्वना प्रदान करते हैं, बल्कि जीवंत चमत्कार, मार्गदर्शन, और विश्वास के साथ जीवन की कठिनाइयों का सामना करने की ताकत भी देते हैं।","kn":"ಸುಬಿಶಾ ಜಿನ್ಸನ್ ಅವರ ಸಾಕ್ಷ್ಯವು Kreupasanam ಮೂಲಕ ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆಯೊಂದಕ್ಕೆ ಅವರ ಆಳವಾದ ನಂಬಿಕೆಯ ಯಾತ್ರೆಯನ್ನೇ ಕೇಂದ್ರಗೊಳಿಸುತ್ತದೆ, ಆ ಸಂದರ್ಭದಲ್ಲಿ ಅವರ ಶಿಶು ಜ್ಞಾನಹೃದಯದ ગંભીર ಹೃದಯ ಸಮಸ್ಯೆಯಿಂದ ಬಳಲುತ್ತಿದ್ದ. ಅವರ ನವಜಾತ ಶಿಶುವಿಗೆ ಹೃದಯ ಕವಾಟ ಸಮಸ್ಯೆ ಇರುವ ಎಂದು ಕಂಡು ಬಂದಾಗ, ಅವರು ತೊಂದರೆಗೊಳಗಾಗಿದ್ದರು, ಆದರೆ Kreupasanam ನ ಪ್ರಾರ್ಥನೆಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯಗಳಿಂದ ಅವರು ನಿರಾಸೆ ಮತ್ತು ಶಕ್ತಿ ಪಡೆಯಿದರು. ತಾನು ತನುಮಟ್ಟಿಗಲ್ಲದೆ ಮೂವರು ಮಕ್ಕಳ ತಾಯಿ, ನಿಯಮಿತ ಸಂಪನ್ಮೂಲಗಳ ಕೊರತೆ ಇತ್ಯಾದಿ ಅನೇಕ ಸವಾಲುಗಳ ನಡುವೆ, ಅವರು Amma ರಕ್ಷಣಾ ಹಾಗೂ ಮಧ್ಯಸ್ಥಾಕ್ಕೆ ಭರವಸೆ ಇಟ್ಟು Kreupasanam ನಲ್ಲಿ ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆ ತೆಗೆದುಕೊಳ್ಳಲು ನಿರ್ಧಾರ ಮಾಡಿಕೊಂಡರು.\\n\\nಈ ಅವಧಿಯಲ್ಲಿ ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಪವಿತ್ರ ವಸ್ತುಗಳು—ವಿಶೇಷವಾಗಿ ಒಡಂಬಡಿಕೆ ಮೆಡಲ್, ತೆಲ, ಹಾಗೂ ಉಪ್ಪು—ಅವರ ಆತ್ಮಿಕ ಸಹಾಯ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಅತ್ಯಂತ ಮುಖ್ಯವಾಗಿದ್ದವು. ಅವರು ಧೈರ್ಯದ ಮೂಲವಾಗಿ ಒಡಂಬಡಿಕೆ ಮೆಡಲ್ ಅನ್ನು ಹೊಂದಿಕೊಂಡರು, ಕುಟುಂಬವನ್ನು ಆಶೀರ್ವದಿಸಲು ಒಡಂಬಡಿಕೆ ತೆಲ ಬಳಸಿದರು, ಸಹಪ್ರಾರ್ಥನೆ ಮತ್ತು ಭಕ್ತಿಯ ಮೂಲಕ ಒಡಂಬಡಿಕೆ ಜೀವನವನ್ನು ಸ್ವೀಕರಿಸಿದರು, ಇದು ದೇವರ ಅಪರಿಮಿತ ಶಕ್ತಿಯ ಮೇಲೆ ಅವರ ನಂಬಿಕೆಯನ್ನು ಗಟ್ಟಿ ಮಾಡಿತು. ಅದ್ಭುತವಾಗಿ, ಸಮಯದೊಂದಿಗೆ, ಶಿಶುವಿನ ಹೃದಯ ಕವಾಟಗಳು ಯಾವುದೇ ಔಷಧವಿಲ್ಲದೆ ಕ್ರಮೇಣ ಸರಿ ಆದವು, ಮತ್ತು ಈ ಚಿಕಿತ್ಸೆ ಮಾರಿಯನ ಮಧ್ಯಸ್ಥಿಕೆಯಿಂದ ಸಂಭವಿಸಿದರು ಎಂದು ಭಾವಿಸಲಾಗಿದೆ.\\n\\nಸುಬಿಶಾ ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ ಹೇಗೆ ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತಿತರ ಕುಟುಂಬಗುಟುಪಡೆಗಳ ಸಂಕಷ್ಟಗಳಲ್ಲಿ ಸಹ ಶಾಂತಿ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಸಹಾಯ ನೀಡಿತು — ಉದಾಹರಣೆಗೆ, ಅವರ ಮಗ ಗಮನಾರ್ಹ ಹಣಪಾವತಿ ಸಮಸ್ಯೆಯಿಂದ ಬಿಡುಗಡೆ ಆಗುತ್ತಿದ್ದರು. ಒಡಂಬಡಿಕೆ ಸಮುದಾಯ ಮತ್ತು ನಿರಂತರ ಧಾರ್ಮಿಕ ಅಭ್ಯಾಸಗಳು—ಜನವನ್ನೂ ಕ್ಷಮೆ ಸಲ್ಲಿಸುವುದು ಮತ್ತು ಪ್ರತಿದಿನದ ಪ್ರಾರ್ಥನೆ ಇತ್ಯಾದಿ —ಅವರಿಗೆ ತಾಯಿ ಮರಿಯ ಮತ್ತು ಯೇಸುನ ಹತ್ತಿರವಾಗಲು ಸಹಾಯ ಮಾಡಿತು. ಈ ಸಾಕ್ಷ್ಯವು ಸೂಚಿಸುತ್ತದೆ Kreupasanam ಮತ್ತು ಒಡಂಬಡಿಕೆ ಜೀವನವು ಕೇವಲ ಆಧ್ಯಾತ್ಮಿಕ ಆರಾಮವೇ ಅಲ್ಲ, ಅದು ಸ್ಪಷ್ಟವಾದ ಅದ್ಭುತಗಳು, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನಂಬಿಕೆಯಿಂದ ಜೀವನದ ಕಠಿಣತೆಗಳನ್ನು ಎದುರಿಸುವ ಶಕ್ತಿಯನ್ನೂ ನೀಡುತ್ತದೆ.","mr":"सुबिशा जिन्सन यांचा साक्ष्य मुख्यतः Kreupasanam द्वारे Marian Covenant सोबतच्या त्यांच्या गहन विश्वास प्रवासाभोवती फिरते, ज्या वेळी त्यांच्या बाळाला गंभीर हृदय स्थिती होती. त्यांच्या नवजाताला हृदयाच्या वाल्वमध्ये समस्या निदान झाल्यावर, त्या अत्यंत चिंताग्रस्त आणि यात्री होत्या, परंतु Kreupasanam मधील प्रार्थना आणि साक्ष्य यांनी तिला आशा आणि शक्ती दिली. अनेक आव्हानांनंतर, जसे की तीन मुलांची एकटी काळजी आणि मर्यादित संसाधने, त्या दृढ निर्धाराने Kreupasanam मध्ये Marian Covenant स्वीकारले, Amma यांच्या संरक्षण आणि मध्यस्थतेवर ठाम विश्वास ठेवून.\\n\\nया काळात Marian Covenant चे पवित्र चिन्ह—विशेषतः Covenant Medal, Covenant Oil आणि Covenant Salt—त्यांच्या आध्यात्मिक आधार आणि उपचार प्रक्रियेत महत्वाची भूमिका बजावली. त्या धैर्य स्रोत म्हणून Covenant Medal सोबत ठेवत होत्या, कौंटुंबिक आशीर्वादासाठी Covenant Oil वापरल्या, आणि Covenant जीवनातील प्रार्थना व समर्पण स्विकारल्या, ज्यामुळे देवाच्या ‘असंभव’ क्षमतेवर त्यांचा विश्वास दृढ झाला. चमत्कारिकपणे, कालांतराने, बाळाचे हृदय वाल्व कोणत्याही औषधांशिवाय हळूहळू बरे झाले, आणि हे Marian यांच्या मध्यस्थतेमुळे झाल्याचे मानले गेले.\\n\\nसुबिशाने हे देखील सामायिक केले की Marian Covenant ने अन्य कौटुंबिक संकटात शांतता आणि व्यावहारिक मदत कशी केली—उदाहरणार्थ, त्यांच्या मुलाच्या हॉस्पिटलमधून डिस्चार्जवेळी विमा समस्यांमुळे बिल भरण्यात अडचण आली होती. Covenant समुदाय आणि सततच्या आध्यात्मिक सरावाने—including confession व दैनिक प्रार्थना—त्यांना आई मरिया आणि येशू यांच्या जवळ ठेवले. हे साक्ष्य सिद्ध करते की Kreupasanam आणि Covenant जीवन फक्त आध्यात्मिक सांत्वना देत नाही, तर स्पष्ट चमत्कार, मार्गदर्शन, आणि विश्वासाने जीवनातील आव्हानांना सामोरे जाण्याची ताकद देखील देते.","es":"El testimonio de Subisha Jinson se centra en su profunda trayectoria de fe con el Pacto Mariano a través de Kreupasanam en medio de la grave afección cardíaca de su bebé. Cuando a su recién nacido le diagnosticaron problemas en las válvulas del corazón, ella estaba abrumada y angustiada, pero encontró esperanza y fortaleza en las oraciones y testimonios asociados con Kreupasanam. A pesar de muchos desafíos, como criar sola a sus hijos con recursos limitados, estaba decidida a tomar el Pacto Mariano en Kreupasanam, confiando firmemente en la protección e intercesión de Amma.\\n\\nDurante ese periodo, los sacramentales del Pacto Mariano —especialmente la medalla del pacto, el aceite del pacto y la sal del pacto— desempeñaron un papel fundamental en su apoyo espiritual y en el proceso de sanación. Llevaba la medalla del pacto como fuente de valentía, utilizaba el aceite del pacto para bendecir a su familia y adoptó las oraciones y la devoción de la vida de pacto, lo que fortaleció su fe en el poder de Dios para hacer lo imposible. Milagrosamente, con el tiempo, las válvulas del corazón del bebé se sanaron progresivamente sin ningún medicamento, una curación atribuida a la intercesión de la Madre María a través del pacto.\\n\\nSubisha también compartió cómo el Pacto Mariano trajo paz y ayuda práctica en otras crisis familiares, como el alta hospitalaria de su hijo cuando los problemas de seguros amenazaban con impedir el pago. La comunidad del pacto y las prácticas espirituales continuas, incluida la confesión y las oraciones diarias, la ayudaron a mantenerse cerca de la Madre María y Jesús. El testimonio subraya cómo Kreupasanam y la vida de pacto brindan no solo consuelo espiritual, sino también milagros tangibles, orientación y la fortaleza para enfrentar las dificultades de la vida con fe.","ta":"சுபிஷா ஜின்சன் அவர்களின் சாட்சி அவர்களது குழந்தையின் நெஞ்சு குறைபாட்டின்போது Kreupasanam மூலம் மாரியன் ஒப்பந்தத்தின் மீது அவர்களின் ஆழ்ந்த விசுவாச பயணத்தை மையமாகக் கொண்டது. அவருடைய நவீன குழந்தைக்கு நெஞ்சு வால்வு சிக்கல் கண்டறியப்பட்டபோது, அவர்கள் கவலையுடன் மனஅழுத்தத்துக்கு உள்ளாகினார், ஆனால் Kreupasanam சார்ந்த பிரார்த்தனைகள் மற்றும் சாட்சி மூலம் நம்பிக்கை மற்றும் வலிமையை கண்ட encontraron. தன்னாலேயே குழந்தைகளை பராமரிப்பது, கட்டுப்படுத்தப்பட்ட வளங்கள் போன்ற பல சவால்களைச் சந்தித்தபோதிலும், Amma வின் பாதுகாப்பு மற்றும் இடைப்பட்டுவல்கள் மீதான அவர்களின் உறுதியுடன் Kreupasanam இல் மாரியன் ஒப்பந்தத்தை ஏற்கத் தீர்மானித்தாள்.\\n\\nஇந்த காலத்தில் மாரியன் ஒப்பந்தத்தின் மறைமுக பொருள்கள்—சிறப்பு Covenant Medal, Covenant Oil மற்றும் Covenant Salt—அவரது ஆன்மீக ஆதரவும் குணப்படுத்தும் செயலிலும் முக்கிய பங்கு வகித்தன. அவர் துணிச்சலுடைய ஆதாரமாக Covenant Medal அணிந்து கொண்டார், குடும்பத்திற்கு அருள்புரிவதற்கு Covenant Oil பயன்படுத்தினார், Covenant வாழ்க்கையின் பிரார்த்தனைகள் மற்றும் அர்ப்பணிப்பை ஏற்றுக் கொண்டார், இது கடவுளின் ‘அசாத்தியத்தை சாத்தியப்படுத்தும்’ சக்தியில் அவரது நம்பிக்கையை ஆழப்படுத்தியது. அதிசயமாக, காலப்போகையில், குழந்தையின் நெஞ்சு வால்வுகள் எந்த மருந்தையுமின்றி மெதுவாக குணமாகின, இது ஒப்பந்தத்தின் மூலம் மரியாவின் இடைப்பட்டலால் ஏற்பட்ட குணமாக வேண்டும் என்று கருதப்பட்டது.\\n\\nசுபிஷா மேலும் பகிர்ந்தார் எவ்வாறு மாரியன் ஒப்பந்தம் மற்ற குடும்ப நெருக்கடிகளிலும் அமைதி மற்றும் நடைமுறை உதவியை கொண்டுவந்தது—உதாரணமாக குழந்தையின் மருத்துவமனையிலிருந்து வெளியேற்றும் போது காப்பீட்டு பிரச்சினைகள் கட்டணத்திற்கு தடையாக இருந்தது. ஒப்பந்த சமூகம் மற்றும் தொடர்ச்சியான ஆன்மீக நடைமுறைகள்—including confession மற்றும் தினம்‑தினம் பிரார்த்தனை—அவரை மரிய மாண்புமிகு மற்றும் இயேசுவிற்கு அருகாக வைத்தன. இந்த சாட்சி Kreupasanam மற்றும் ஒப்பந்த வாழ்க்கை ஆன்மீக ஆறுதல் மட்டுமல்ல, பரிசுத்தமான அதிசயங்கள், வழிகாட்டுதல் மற்றும் நம்பிக்கை மூலம் வாழ்க்கை சவால்களை எதிர்கொள்ளும் சக்தியும் தரும் என்பதைக் கோட்பாடு செய்கிறது.","te":"సుభిషా జిన్సన్ యొక్క సాక్ష్యం ఆమె బిడ్డ యొక్క గంభీర హృదయ సంబంధ సమస్యలో కూడా Kreupasanam ద్వారా Marian Covenant తో ఆమె లోతైన విశ్వాస యాత్ర మీద కేంద్రీకృతమైంది. ఆమె శిశువుకు గుండె వాల్వ్ సమస్యల تشsrి జరిగింది, ఆమె ఆందోళనగా మరియు బాధగా ఉన్నా నుండి, Kreupasanam తో సంబంధించిన ప్రార్థనలు మరియు సాక్ష్యాల ద్వారా ఆమె ఆశ మరియు బలం పొందింది. స్వతంత్రంగా పిల్లలను సంరక్షించడం, పరిమిత వనరులు వంటి ఎన్నో సవాళ్లన్నింటినీ ఎదుర్కొన్నా, ఆమె Amma యొక్క సంరక్షణ మరియు మధ్యస్తత్వంపై డట్టు విశ్వాసంతో Kreupasanam లో Marian Covenant తీసుకోవాలనుకుంటూ నిర్ణయించుకుంది.\\n\\nఈ సమయంలో Marian Covenant యొక్క సంప్రదాయ వస్తువులు—ప్రత్యేకంగా Covenant Medal, Covenant Oil, Covenant Salt—ఆమె ఆధ్యాత్మిక మద్దతు మరియు స్వస్థతా ప్రక్రియలో కీలక పాత్ర పోషించాయి. ధైర్య వనరుగా Covenant Medal తీసుకుని, కుటుంబాన్ని ఆశీర్వదించడానికి Covenant Oil వాడింది, Covenant జీవితం యొక్క ప్రార్థనలు మరియు భక్తిని స్వీకరించింది, ఇది దేవుని అసాధ్యలను సాధ్యంచేసే శక్తిపై ఆమె విశ్వాసాన్ని పటిష్ఠంగా చేసింది. అద్భుతంగా, కాలాప్రవాహంతో పాటు, శిశువు హృదయ వాల్వ్లు ఏ ఔషధాలతోకూ లేనిదైన సరిపోయాయి, ఈ స్వస్థత Marian మధ్యస్థత్వం ద్వారా ప్రసిద్ధిపొందింది.\\n\\nసుభిషా మరియామాత్రం ఇతర కుటుంబ సంక్షోభాల్లో శాంతి మరియు ప్రాక్టికల్ సహాయం ఎలా తీసుకువచ్చిందో కూడా పంచుకుంది—ఉదాహరణకు, వారి కొడుకు ఆసుపత్రి నుంచి విడుదల అయ్యే సమయంలో బీమా సమస్యలు చెల్లింపుని ఇబ్బందికి గురి చేశాయి. Covenant సంఘం మరియు నిరంతర ఆధ్యాత్మిక అనుసరణలు—including confession మరియు ప్రతి‑రోజు ప్రార్థనలు—ఆమెను తల్లి మరియా మరియు యేసుకు దగ్గరగా ఉంచాయి. ఈ సాక్ష్యం Kreupasanam మరియు Covenant జీవితం కేవలం ఆధ్యాత్మిక సంతృప్తి మాత్రమే కాదు, స్ఫుటమైన అద్భుతాలు, మార్గదర్శనం మరియు నమ్మకంతో జీవన సమస్యలను అధిగమించే శక్తిని కూడా అందిస్తుందని హైలైట్ చేస్తుంది.","fr":"Le témoignage de Subisha Jinson se concentre sur son parcours de foi profond lié au Covenant Marian à travers Kreupasanam alors que son bébé souffrait d'une grave affection cardiaque. Lorsque son nouveau-né a été diagnostiqué avec des problèmes de valves cardiaques, elle était accablée et en détresse, mais elle a trouvé espoir et force dans les prières et témoignages associés à Kreupasanam. Malgré de nombreux défis, comme élever seule ses enfants avec des ressources limitées, elle était déterminée à prendre le Covenant Marian à Kreupasanam, croyant fermement en la protection et l’intercession d’Amma.\\n\\nPendant cette période, les sacramentaux du Covenant Marian — en particulier la médaille du covenant, l’huile du covenant et le sel du covenant — ont joué un rôle fondamental dans son soutien spirituel et le processus de guérison. Elle portait la médaille du covenant comme source de courage, utilisait l’huile du covenant pour bénir sa famille et a adopté les prières et la dévotion du mode de vie du covenant, ce qui a renforcé sa confiance dans le pouvoir de Dieu de rendre possible l’impossible. Miraculeusement, au fil du temps, les valves cardiaques du bébé se sont progressivement guéries sans aucun médicament, une guérison attribuée à l’intercession de la Vierge Marie à travers le covenant.\\n\\nSubisha a également partagé comment le Covenant Marian a apporté paix et aide concrète dans d’autres crises familiales, comme la sortie d’hôpital de son fils lorsque des problèmes d’assurance menaçaient le paiement. La communauté du covenant et les pratiques spirituelles continues, y compris la confession et les prières quotidiennes, l’ont aidée à rester proche de la Vierge Marie et de Jésus. Ce témoignage souligne comment Kreupasanam et la vie du covenant offrent non seulement du réconfort spirituel, mais aussi des miracles tangibles, une guidance et la force d’affronter les difficultés de la vie avec foi."},"subtitles":"/assets/testimony/21jul.json"}]`);
const testimoniesSection = "_testimoniesSection_10qap_3";
const testimoniesSectionContainer = "_testimoniesSectionContainer_10qap_15";
const testimoniesTitle = "_testimoniesTitle_10qap_81";
const testimoniesHeader = "_testimoniesHeader_10qap_93";
const testimoniesSubtitle = "_testimoniesSubtitle_10qap_141";
const testimoniesGrid = "_testimoniesGrid_10qap_181";
const testimoniesCard = "_testimoniesCard_10qap_223";
const testimoniesImageWrapper = "_testimoniesImageWrapper_10qap_261";
const testimoniesCardTitle = "_testimoniesCardTitle_10qap_309";
const testimoniesDate = "_testimoniesDate_10qap_347";
const testimoniesVideoLink = "_testimoniesVideoLink_10qap_373";
const styles$5 = {
  testimoniesSection,
  testimoniesSectionContainer,
  testimoniesTitle,
  testimoniesHeader,
  testimoniesSubtitle,
  testimoniesGrid,
  testimoniesCard,
  testimoniesImageWrapper,
  testimoniesCardTitle,
  testimoniesDate,
  testimoniesVideoLink
};
const languageMap$2 = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  fr: "Français",
  es: "Español",
  mr: "मराठी"
};
const getYouTubeThumbnail = (url) => {
  try {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  } catch {
    return null;
  }
};
function TestimonyCard({ id, title, image, date, lang, path }) {
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/${path}/${id}`);
  const translatedTitle = title[lang] || title.en;
  return /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesCard, children: [
    /* @__PURE__ */ jsx("div", { className: styles$5.testimoniesImageWrapper, children: /* @__PURE__ */ jsx("img", { src: image, alt: translatedTitle }) }),
    /* @__PURE__ */ jsx("h3", { className: styles$5.testimoniesCardTitle, children: translatedTitle }),
    /* @__PURE__ */ jsx("p", { className: styles$5.testimoniesDate, children: date }),
    /* @__PURE__ */ jsx(
      "button",
      {
        style: { border: "none" },
        className: styles$5.testimoniesVideoLink,
        onClick: handleCardClick,
        children: "Watch Now"
      }
    )
  ] });
}
function Testimonies({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  return /* @__PURE__ */ jsx("section", { className: styles$5.testimoniesSection, children: /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesSectionContainer, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesHeader, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$5.testimoniesTitle, children: "More Powerful Testimonies" }),
      /* @__PURE__ */ jsx("p", { className: styles$5.testimoniesSubtitle, children: "Stories of healing, grace..." }),
      /* @__PURE__ */ jsxs(Dropdown, { onSelect: (e) => setLang(e), children: [
        /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-lang", children: languageMap$2[lang] || lang }),
        /* @__PURE__ */ jsx(Dropdown.Menu, { children: Object.entries(languageMap$2).map(([key, label]) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: key, children: label }, key)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$5.testimoniesGrid, children: testimonies.filter(({ id }) => [1, 4, 8].includes(id)).map(({ id, title, video, date }) => /* @__PURE__ */ jsx(
      TestimonyCard,
      {
        id,
        title,
        image: getYouTubeThumbnail(video),
        date,
        lang,
        path: `${lang}/testimony`
      },
      id
    )) })
  ] }) });
}
const heroImage$1 = "/assets/kreupasanammother-Ctmmd_VW.webp";
function IntroSection({ lang = "en", onReady }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = () => navigate(`/${lang}/testimonies`);
  const t = translations$2[lang] || translations$2["en"];
  useEffect(() => {
    if (imageLoaded && typeof onReady === "function") {
      onReady();
    }
  }, [imageLoaded, onReady]);
  return /* @__PURE__ */ jsx("section", { className: "introBox1 animated-glow", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "d-flex align-items-center justify-content-between flex-wrap", children: [
    /* @__PURE__ */ jsx(Col, { xs: 12, md: 6, className: "image-wrapper order-1", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: heroImage$1,
        alt: "Testimony intro",
        className: "img-fluid rounded-4 shadow-md",
        onLoad: () => setImageLoaded(true),
        onError: () => setImageLoaded(true)
      }
    ) }),
    /* @__PURE__ */ jsxs(Col, { xs: 12, md: 6, className: "text-content order-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "title", children: t.title.split("\n").map((line, i) => /* @__PURE__ */ jsxs("span", { children: [
        line,
        /* @__PURE__ */ jsx("br", {})
      ] }, i)) }),
      /* @__PURE__ */ jsx("p", { className: "introText", children: t.introText }),
      /* @__PURE__ */ jsxs(Button, { className: "introBtn shimmer-button", onClick: handleCardClick, children: [
        /* @__PURE__ */ jsx("span", { children: t.button }),
        /* @__PURE__ */ jsx("span", { className: "arrow", children: " ➔" })
      ] })
    ] })
  ] }) }) });
}
const translations$2 = {
  en: {
    title: "Witness the Power\nof Faith in Action",
    introText: "Our Lady of Kreupasanam, venerated at the Marian Shrine in Alappuzha, Kerala, has been a beacon of healing, peace, and miraculous intercession for thousands. Through the Marian Covenant, the faithful experience profound spiritual renewal and divine intervention.",
    button: "Explore Stories"
  },
  hi: {
    title: "विश्वास की शक्ति का साक्षी बनें\nक्रिया में",
    introText: "केरल के अलप्पुझा के मैरियन श्राइन में पूजित क्रेउपासनम माता हजारों लोगों के लिए उपचार, शांति और चमत्कारिक मध्यस्थता का प्रतीक रही हैं। मैरियन संधि के माध्यम से श्रद्धालु गहरे आध्यात्मिक नवीनीकरण और दिव्य हस्तक्षेप का अनुभव करते हैं।",
    button: "कहानियां खोजें"
  },
  zh: {
    title: "见证信仰的力量\n在行动中彰显",
    introText: "我们的克鲁帕萨南圣母，受人尊敬于喀拉拉邦阿拉普扎的玛丽亚圣地，是成千上万人康复、和平与奇迹代祷的灯塔。通过玛丽亚圣约，信徒们体验深刻的灵性更新和神圣的介入。",
    button: "探索故事"
  },
  bn: {
    title: "বিশ্বাসের শক্তির সাক্ষী হন\nকর্মে বিশ্বাসের শক্তি",
    introText: "আমাদের করূপসানম মাদার, যিনি আলাপুজা, কেরালার মেরিয়ান শ্রাইন-এ পূজিত, হাজার হাজার মানুষের জন্য আরোগ্য, শান্তি এবং অলৌকিক মধ্যস্থতার এক দীপ্তিময় আলোকস্তম্ভ। মেরিয়ান চুক্তির মাধ্যমে ভক্তরা গভীর আধ্যাত্মিক পুনর্জন্ম এবং ঈশ্বরীয় হস্তক্ষেপ অনুভব করেন।",
    button: "গল্প অন্বেষণ করুন"
  },
  ta: {
    title: "நம்பிக்கையின் சக்தியை\nசெயலில் காணுங்கள்",
    introText: "அலப்புழா, கேரளாவில் உள்ள மரியான் திருத்தலத்தில் பாராட்டப்படும் எங்கள் கிருபாசனம் அன்னை ஆயிரக்கணக்கான மக்களுக்கு குணமடைதல், அமைதி மற்றும் அதிசயத் தழுவலுக்கான வெளிச்சமாக இருக்கிறார். மரியான் ஒப்பந்தத்தின் மூலம் விசுவாசிகள் ஆழ்ந்த ஆன்மீக புதுப்பிப்பு மற்றும் தெய்வீக தலையீட்டை அனுபவிக்கிறார்கள்.",
    button: "கதைகளை ஆராயுங்கள்"
  },
  te: {
    title: "ఆధ్యాత్మిక విశ్వాస శక్తిని\nక్రియలో చూడండి",
    introText: "అలప్పుజా, కేరళలోని మేరియన్ పుణ్యక్షేత్రంలో పూజించబడే మా క్రూపాసనం అమ్మాయి వేల మందికి ఆరోగ్యం, శాంతి మరియు అద్భుత మద్యస్థతకు దీపస్థంభంగా నిలుస్తోంది. మేరియన్ ఒప్పందం ద్వారా భక్తులు లోతైన ఆధ్యాత్మిక పునరుత్పత్తి మరియు దివ్య జోక్యం అనుభవిస్తారు.",
    button: "కథలను అన్వేషించండి"
  },
  fr: {
    title: "Découvrez la puissance\nde la foi en action",
    introText: "Notre Dame de Kreupasanam, vénérée au sanctuaire marial d’Alappuzha, Kerala, est un phare de guérison, de paix et d’intercession miraculeuse pour des milliers de personnes. Grâce à la Alliance Mariale, les fidèles vivent un profond renouveau spirituel et une intervention divine.",
    button: "Explorer les témoignages"
  },
  es: {
    title: "Sé testigo del poder\nde la fe en acción",
    introText: "Nuestra Señora de Kreupasanam, venerada en el Santuario Mariano en Alappuzha, Kerala, ha sido un faro de sanación, paz e intercesión milagrosa para miles. A través del Pacto Mariano, los fieles experimentan una profunda renovación espiritual e intervención divina.",
    button: "Explorar historias"
  },
  mr: {
    title: "विश्वासाच्या शक्तीचे साक्षीदार बना\nकार्यवाहीत विश्वास",
    introText: "आमची क्रुपासनम माता, केरळमधील अलापुझा येथील मेरीयन मंदिरात पूजल्या जातात, हजारो लोकांसाठी आरोग्य, शांतता आणि चमत्कारिक मध्यस्थतेचा प्रकाशस्तंभ ठरल्या आहेत. मेरीयन कराराद्वारे भक्तांना खोल आध्यात्मिक नूतनीकरण आणि दैवी हस्तक्षेप अनुभवता येतो.",
    button: "कथा शोधा"
  },
  kn: {
    title: "ನಂಬಿಕೆಯ ಶಕ್ತಿಯನ್ನು\nಕ್ರಿಯೆಯಲ್ಲಿ ಸಾಕ್ಷಿಯಾಗಿರಿ",
    introText: "ಕರ್ನಾಟಕದ ಅಲ್ಪುಜ್ಜಾದ ಮೇರಿ ಶ್ರೈನ್‌ನಲ್ಲಿ ಪೂಜಿಸಲ್ಪಡುವ ನಮ್ಮ ಕೃಪಾಸನಮ್ಮ ಅನೇಕರಿಗೆ ಗುಣಮುಖ, ಶಾಂತಿ ಮತ್ತು ಅದ್ಭುತ ಮಧ್ಯಸ್ಥಿಕೆ beacon ಆಗಿದ್ದಾರೆ. ಮೇರಿ ಒಪ್ಪಂದದ ಮೂಲಕ ಭಕ್ತರು ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ನವೀಕರಣ ಮತ್ತು ದಿವ್ಯ ಹಸ್ತಕ್ಷೇಪವನ್ನು ಅನುಭವಿಸುತ್ತಾರೆ.",
    button: "ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ"
  }
};
function TestimonyVerseCard({ lang = "en" }) {
  const t = translations$1[lang] || translations$1["en"];
  return /* @__PURE__ */ jsxs("div", { className: "testimony-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "verse-box", children: [
      /* @__PURE__ */ jsx("p", { className: "verse-text", children: t.verse }),
      /* @__PURE__ */ jsx("p", { className: "verse-ref", children: t.ref })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "testimony-description", children: /* @__PURE__ */ jsx("p", { children: t.description }) })
  ] });
}
const translations$1 = {
  en: {
    verse: "“They overcame him by the blood of the Lamb and by the word of their testimony.”",
    ref: "— Revelation 12:11",
    description: "Every testimony shared here is a light shining through the darkness—a story of faith, healing, and the living power of Jesus Christ. These real stories speak louder than words, and may they inspire your journey too."
  },
  hi: {
    verse: "“उन्होंने मेमने के रक्त और अपनी गवाही के वचन से उसे परास्त किया।”",
    ref: "— प्रकाशितवाक्य 12:11",
    description: "यहाँ साझा हर गवाही अंधकार में एक रोशनी की तरह है—विश्वास, उपचार, और यीशु मसीह की जीवित शक्ति की कहानी। ये सच्ची कहानियाँ शब्दों से ज़्यादा प्रभावशाली हैं, और आपकी यात्रा को भी प्रेरित करें।"
  },
  zh: {
    verse: "“他们因羔羊的血和所作见证的话胜过了他。”",
    ref: "— 启示录 12:11",
    description: "这里分享的每一个见证都是穿透黑暗的光芒——关于信仰、医治和耶稣基督活力的故事。这些真实的故事胜过千言万语，也愿它们激励你的信仰旅程。"
  },
  bn: {
    verse: "“তারা মেষশাবকের রক্ত দ্বারা এবং তাদের সাক্ষ্যের বাক্য দ্বারা তাকে জয়ী হলো।”",
    ref: "— প্রকাশিত বাক্য ১২:১১",
    description: "এখানে প্রতিটি সাক্ষ্য অন্ধকারে একটি আলোর মতো—বিশ্বাস, নিরাময় এবং যীশু খ্রিষ্টের জীবন্ত শক্তির গল্প। এই বাস্তব গল্পগুলো শব্দের চেয়ে বেশি শক্তিশালী, এবং এগুলো আপনার যাত্রাকেও অনুপ্রাণিত করুক।"
  },
  ta: {
    verse: "“அவர்கள் முட்டாளின் ரத்தத்தாலும் அவர்களின் சாட்சி வார்த்தையாலும் அவனை வென்றனர்.”",
    ref: "— வெளிப்பாடு 12:11",
    description: "இங்கே பகிரப்படும் ஒவ்வொரு சாட்சியும் இருண்டோரத்தில் ஒளியாகும் — நம்பிக்கை, குணம் மற்றும் இயேசு கிறிஸ்துவின் உயிருள்ள சக்தியின் கதை. இந்த உண்மையான கதைகள் வார்த்தைகளுக்கு மேல் பேசுகின்றன, உங்கள் பயணத்தையும் ஊக்குவிக்கட்டும்."
  },
  te: {
    verse: "“ఆమెష్కార రక్తము మరియు వారి సాక్షి వాక్యముతో వారు అతన్ని జయించెను.”",
    ref: "— ఉహాపన 12:11",
    description: "ఇక్కడ పంచుకున్న ప్రతి సాక్ష్యం అంధకారంలో వెలుగుగా ఉంటుంది — నమ్మకం, బాగా తేలికపరచుట మరియు యేసు క్రీస్తు యొక్క జీవ శక్తి కథ. ఈ నిజమైన కథలు మాటలకంటే గొప్పగా మాట్లాడతాయి, మరియు మీ ప్రయాణాన్నీ ప్రేరేపించగలవు."
  },
  fr: {
    verse: "« Ils l’ont vaincu par le sang de l’Agneau et par la parole de leur témoignage. »",
    ref: "— Apocalypse 12:11",
    description: "Chaque témoignage partagé ici est une lumière dans les ténèbres — une histoire de foi, de guérison et de la puissance vivante de Jésus-Christ. Ces récits réels parlent plus fort que les mots, et puissent-ils inspirer votre propre chemin."
  },
  es: {
    verse: "“Ellos lo vencieron por la sangre del Cordero y por la palabra de su testimonio.”",
    ref: "— Apocalipsis 12:11",
    description: "Cada testimonio compartido aquí es una luz que brilla en la oscuridad—una historia de fe, sanación y el poder vivo de Jesucristo. Estas historias reales hablan más fuerte que las palabras, y que también inspiren tu camino."
  },
  mr: {
    verse: "“ते मेंढपाशाच्या रक्ताने आणि त्यांच्या साक्षीच्या शब्दाने त्याचा पराभव केला.”",
    ref: "— प्रकटीकरण १२:११",
    description: "येथे शेअर केलेली प्रत्येक साक्ष अंधारात प्रकाशासारखी आहे—विश्वास, उपचार आणि येशू ख्रिस्ताच्या जिवंत शक्तीची कहाणी. या खरी कथा शब्दांपेक्षा जास्त प्रभावी आहेत आणि तुमच्या प्रवासालाही प्रेरणा देतील."
  },
  kn: {
    verse: "“ಅವರು ಕುರಿದ ರಕ್ತದಿಂದ ಮತ್ತು ತಮ್ಮ ಸಾಕ್ಷಿ ಮಾತಿನಿಂದ ಅವನನ್ನು ಗೆದ್ದರು.”",
    ref: "— ಪ್ರಕಟಿತವಾದ 12:11",
    description: "ಇಲ್ಲಿ ಹಂಚಿಕೊಂಡಿರುವ ಪ್ರತಿಯೊಂದು ಸಾಕ್ಷಿ ಕತ್ತಲೆಯಲ್ಲೊಂದು ಬೆಳಕಾಗಿದೆ—ನಂಬಿಕೆ, ಚೇತರಿಕೆ ಮತ್ತು ಯೇಸು ಕ್ರಿಸ್ತನ ಜೀವಂತ ಶಕ್ತಿಯ ಕಥೆ. ಈ ನಿಜವಾದ ಕಥೆಗಳು ಮಾತುಗಳಿಂದ ಹೆಚ್ಚು ಪ್ರಭಾವಶಾಲಿ, ಮತ್ತು ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಕೂಡ ಪ್ರೇರೇಪಿಸಲಿ."
  }
};
const logo = "/assets/logo-BOWwCKQc.webp";
function truncateWords(text, wordLimit) {
  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}
function FeaturedTestimonySection({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);
  const testimony = testimonies.find((item) => item.id === 1);
  const { title = {}, content = {}, date, video } = testimony || {};
  return /* @__PURE__ */ jsxs("section", { className: "featured-testimony-box", children: [
    /* @__PURE__ */ jsxs("div", { className: "header-row", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-heading", children: "Featured Testimony" }),
      /* @__PURE__ */ jsxs(
        Dropdown,
        {
          onSelect: setLang,
          style: { marginRight: "1rem" },
          children: [
            /* @__PURE__ */ jsx(
              Dropdown.Toggle,
              {
                variant: "outline-secondary",
                id: "dropdown-lang",
                onMouseEnter: (e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(36, 107, 253, 0.3)",
                onMouseLeave: (e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(36, 107, 253, 0.15)",
                children: {
                  en: "English",
                  hi: "हिन्दी",
                  zh: "中文",
                  bn: "বাংলা",
                  ta: "தமிழ்",
                  te: "తెలుగు",
                  fr: "Français",
                  es: "Español",
                  mr: "मराठी",
                  kn: "ಕನ್ನಡ"
                }[lang] || lang
              }
            ),
            /* @__PURE__ */ jsx(
              Dropdown.Menu,
              {
                style: {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                  padding: "0.25rem 0",
                  minWidth: "150px"
                },
                children: ["en", "zh", "bn", "hi", "ta", "te", "fr", "es", "mr", "kn"].map((key) => /* @__PURE__ */ jsx(
                  Dropdown.Item,
                  {
                    eventKey: key,
                    style: {
                      borderRadius: "8px",
                      transition: "background-color 0.25s ease, color 0.25s ease",
                      fontWeight: "600",
                      padding: "1rem 1.5rem"
                    },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.backgroundColor = "rgba(36, 107, 253, 0.1)";
                      e.currentTarget.style.color = "#246bfd";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "inherit";
                    },
                    children: {
                      en: "English",
                      hi: "हिन्दी",
                      zh: "中文",
                      bn: "বাংলা",
                      ta: "தமிழ்",
                      te: "తెలుగు",
                      fr: "Français",
                      es: "Español",
                      mr: "मराठी",
                      kn: "ಕನ್ನಡ"
                    }[key]
                  },
                  key
                ))
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "testimony-card", children: [
      /* @__PURE__ */ jsx("h3", { className: "testimony-title", children: title[lang] || title["en"] }),
      /* @__PURE__ */ jsx("p", { className: "testimony-content", children: truncateWords(content[lang] || content["en"], 50) }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", className: "explore-btn", href: `/${lang}/testimony/1`, children: "Let's Read!" })
    ] })
  ] });
}
function ImageSpacer({
  src,
  alt = "Image",
  position = "left",
  marginSize = "80px",
  className = "",
  maxWidth = "50%",
  hideOnMobile = false
}) {
  const wrapperRef = useRef(null);
  const [isVisibleMobile, setIsVisibleMobile] = useState(true);
  const [isVisibleWrap, setIsVisibleWrap] = useState(true);
  useEffect(() => {
    const checkMobile = () => {
      const isSmallViewport = window.innerWidth < 1200;
      if (hideOnMobile && isSmallViewport) {
        setIsVisibleMobile(false);
      } else {
        setIsVisibleMobile(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [hideOnMobile]);
  useEffect(() => {
    const wrapper2 = wrapperRef.current;
    const parent = wrapper2?.parentElement;
    if (!wrapper2 || !parent) return;
    const checkWrap = () => {
      const wrapperTop = wrapper2.getBoundingClientRect().top;
      const parentTop = parent.getBoundingClientRect().top;
      const isWrapped = wrapperTop > parentTop + 10;
      setIsVisibleWrap(!isWrapped);
    };
    const observer = new ResizeObserver(checkWrap);
    observer.observe(wrapper2);
    observer.observe(parent);
    window.addEventListener("resize", checkWrap);
    checkWrap();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkWrap);
    };
  }, []);
  const isVisible = isVisibleMobile && isVisibleWrap;
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: wrapperRef,
      className: `image-spacer-wrapper ${position === "left" ? "margin-right" : "margin-left"} ${className}`,
      style: {
        marginRight: position === "left" ? marginSize : void 0,
        marginLeft: position === "right" ? marginSize : void 0,
        maxWidth,
        flexShrink: 0,
        flexGrow: 0
      },
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            className: "image-spacer",
            style: {
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain"
              // ✅ add this
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "image-ground-shadow" })
      ]
    }
  );
}
ImageSpacer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  position: PropTypes.oneOf(["left", "right"]),
  marginSize: PropTypes.string,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  hideOnMobile: PropTypes.bool
};
const heroImage = "/assets/mother-CKd8WmFN.webp";
const heroImage1 = "/assets/lamb-4Hs_Foxe.webp";
const footer = "_footer_w8ul1_3";
const waveTop = "_waveTop_w8ul1_33";
const footerTop = "_footerTop_w8ul1_63";
const section = "_section_w8ul1_85";
const newsletter = "_newsletter_w8ul1_125";
const emailText = "_emailText_w8ul1_245";
const emailLink = "_emailLink_w8ul1_265";
const thankYouMessage = "_thankYouMessage_w8ul1_291";
const footerBottom = "_footerBottom_w8ul1_329";
const styles$4 = {
  footer,
  waveTop,
  footerTop,
  section,
  newsletter,
  emailText,
  emailLink,
  thankYouMessage,
  footerBottom
};
function Footer() {
  const [submitted, setSubmitted] = useState(false);
  const [email2, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/mzzvgyaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ email: email2 })
      });
      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: styles$4.waveTop, children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 1440 320", preserveAspectRatio: "none", children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#3949ab",
        d: "M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,181.3C672,171,768,117,864,117.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      }
    ) }) }),
    /* @__PURE__ */ jsxs("footer", { className: styles$4.footer, children: [
      /* @__PURE__ */ jsx("div", { className: styles$4.footerTop, children: /* @__PURE__ */ jsxs("div", { className: styles$4.section, children: [
        /* @__PURE__ */ jsx("h3", { children: "Contact Us" }),
        /* @__PURE__ */ jsxs("p", { className: styles$4.emailText, children: [
          /* @__PURE__ */ jsx(FaEnvelope, { style: { marginRight: "0.5rem", color: "#d93025" } }),
          /* @__PURE__ */ jsx("a", { href: "mailto:kreupasanamtestimonies@gmail.com", target: "_blank", rel: "noopener noreferrer", className: styles$4.emailLink, children: "kreupasanamtestimonies@gmail.com" })
        ] }),
        /* @__PURE__ */ jsx("h3", { style: { marginTop: "1.5rem" }, children: "Stay Updated" }),
        !submitted ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: styles$4.newsletter, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              placeholder: "Your email",
              required: true,
              value: email2,
              onChange: (e) => setEmail(e.target.value),
              disabled: loading
            }
          ),
          /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, children: loading ? "Loading..." : "Subscribe" })
        ] }) : /* @__PURE__ */ jsx("p", { className: `${styles$4.thankYouMessage}`, children: "Thank you for subscribing!" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$4.footerBottom, children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx(GiDove, { style: { color: "#fff", fontSize: "1.2rem", verticalAlign: "middle", marginRight: "0.3rem" } }),
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Kreupasanam Testimonies. Shared with love. Not affiliated with the official shrine."
        ] }),
        "        "
      ] })
    ] })
  ] });
}
function FadeInOnScroll({
  children,
  delay = 0,
  yOffset = 0,
  xOffset = 0,
  duration = 0.6,
  ease = "easeOut",
  once = true
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15,
    // Trigger when 15% is visible
    triggerOnce: once
  });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  const variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: Math.min(Math.max(duration, 0.1), 3),
        // clamp between 0.1s - 3s
        delay: Math.max(delay, 0),
        ease
      }
    }
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: controls,
      variants,
      children
    }
  );
}
function Home({ lang }) {
  const [introReady, setIntroReady] = useState(false);
  const [isHero1Visible, setIsHero1Visible] = useState(true);
  const [isHero2Visible, setIsHero2Visible] = useState(true);
  useEffect(() => {
    const checkVisibility = () => {
      const isMobile = window.innerWidth <= 1312 || window.innerHeight <= 500;
      setIsHero1Visible(!isMobile);
      setIsHero2Visible(!isMobile);
    };
    checkVisibility();
    const timeout = setTimeout(checkVisibility, 250);
    window.addEventListener("resize", checkVisibility);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    introReady && /* @__PURE__ */ jsx(AppBar, { lang }),
    /* @__PURE__ */ jsxs("div", { className: "page", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "Logo", className: "floating-logo" }),
      !introReady ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontFamily: "Arial, sans-serif",
              backgroundColor: "#f8f9ff",
              color: "#246bfd"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: "40px",
                    height: "40px",
                    border: "4px solid #d3e3ff",
                    borderTop: "4px solid #246bfd",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginBottom: "1.5rem"
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { style: { fontSize: "1.2rem", fontWeight: 500 }, children: "Guided by grace…" }),
              /* @__PURE__ */ jsx("style", { children: `
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                ` })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: /* @__PURE__ */ jsx(IntroSection, { lang, onReady: () => setIntroReady(true) }) })
      ] }) : /* @__PURE__ */ jsx(FadeInOnScroll, { children: /* @__PURE__ */ jsx(IntroSection, { lang }) }),
      introReady && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(FadeInOnScroll, { delay: 0.1, children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "d-flex align-items-center",
            style: {
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 3%"
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: { flex: "1 1 600px", minWidth: "300px" }, children: /* @__PURE__ */ jsx(TestimonyVerseCard, { lang }) }),
              isHero1Visible && /* @__PURE__ */ jsx("div", { style: { flex: "0 1 320px" }, children: /* @__PURE__ */ jsx(
                ImageSpacer,
                {
                  src: heroImage1,
                  maxWidth: "80%",
                  marginSize: "5%",
                  position: "right",
                  hideOnMobile: true
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(FadeInOnScroll, { delay: 0.2, children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "d-flex align-items-center",
            style: {
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 3%"
            },
            children: [
              isHero2Visible && /* @__PURE__ */ jsx("div", { style: { flex: "0 1 320px" }, children: /* @__PURE__ */ jsx(
                ImageSpacer,
                {
                  src: heroImage,
                  maxWidth: "100%",
                  marginSize: "4%",
                  position: "left",
                  hideOnMobile: true
                }
              ) }),
              /* @__PURE__ */ jsx("div", { style: { flex: "1 1 600px", minWidth: "300px" }, children: /* @__PURE__ */ jsx(FeaturedTestimonySection, { lang }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(FadeInOnScroll, { delay: 0.3, children: /* @__PURE__ */ jsx("section", { className: "section", children: /* @__PURE__ */ jsx(Testimonies, { lang }) }) }),
        /* @__PURE__ */ jsx(FadeInOnScroll, { delay: 0.4, children: /* @__PURE__ */ jsx(Footer, { lang }) })
      ] })
    ] })
  ] });
}
const testimonyPage = "_testimonyPage_i54ur_1";
const testimonyHeader = "_testimonyHeader_i54ur_25";
const testimonyBack = "_testimonyBack_i54ur_57";
const testimonyLang = "_testimonyLang_i54ur_59";
const testimonyCenter = "_testimonyCenter_i54ur_67";
const videoButtonWrapper = "_videoButtonWrapper_i54ur_85";
const videoButton = "_videoButton_i54ur_85";
const youtubeIcon = "_youtubeIcon_i54ur_143";
const videoText = "_videoText_i54ur_153";
const notFoundPage = "_notFoundPage_i54ur_185";
const notFoundContent = "_notFoundContent_i54ur_205";
const fadeIn = "_fadeIn_i54ur_1";
const notFoundCode = "_notFoundCode_i54ur_225";
const notFoundTitle = "_notFoundTitle_i54ur_243";
const notFoundText = "_notFoundText_i54ur_255";
const notFoundButton = "_notFoundButton_i54ur_269";
const backButton$1 = "_backButton_i54ur_323";
const backText = "_backText_i54ur_369";
const testimonyTitleBox = "_testimonyTitleBox_i54ur_381";
const testimonyHeading = "_testimonyHeading_i54ur_395";
const languageDropdown = "_languageDropdown_i54ur_419";
const dropdownToggle = "_dropdownToggle_i54ur_445";
const testimonyContainer = "_testimonyContainer_i54ur_507";
const testimonyTitle = "_testimonyTitle_i54ur_381";
const testimonyDate = "_testimonyDate_i54ur_563";
const testimonyContent = "_testimonyContent_i54ur_577";
const floatingImage = "_floatingImage_i54ur_597";
const left = "_left_i54ur_629";
const float = "_float_i54ur_597";
const right = "_right_i54ur_643";
const floatFlipped = "_floatFlipped_i54ur_1";
const bottom = "_bottom_i54ur_657";
const loadingOverlay = "_loadingOverlay_i54ur_673";
const spinner = "_spinner_i54ur_701";
const spin = "_spin_i54ur_701";
const imageWrapper = "_imageWrapper_i54ur_729";
const thumbnailImg = "_thumbnailImg_i54ur_745";
const thumbnailWrapper = "_thumbnailWrapper_i54ur_795";
const thumbnailImage = "_thumbnailImage_i54ur_809";
const smallPlayIcon = "_smallPlayIcon_i54ur_821";
const wavePulse = "_wavePulse_i54ur_1";
const floatingCloud = "_floatingCloud_i54ur_959";
const decorativeRow = "_decorativeRow_i54ur_985";
const decorativeItem = "_decorativeItem_i54ur_1007";
const testimonyRight = "_testimonyRight_i54ur_1177";
const closeButton = "_closeButton_i54ur_1299";
const floatingVideoWrapper = "_floatingVideoWrapper_i54ur_1327";
const floatingVideo = "_floatingVideo_i54ur_1327";
const subtitleBox = "_subtitleBox_i54ur_1399";
const visibleSubtitle = "_visibleSubtitle_i54ur_1467";
const hiddenSubtitle = "_hiddenSubtitle_i54ur_1479";
const speakerButton = "_speakerButton_i54ur_1501";
const volumeSlider = "_volumeSlider_i54ur_1547";
const overlayBackground = "_overlayBackground_i54ur_1635";
const fixedTooltipBox = "_fixedTooltipBox_i54ur_1663";
const okButton = "_okButton_i54ur_1747";
const shareMainButton = "_shareMainButton_i54ur_1915";
const shareOption = "_shareOption_i54ur_1951";
const whatsapp = "_whatsapp_i54ur_2013";
const facebook = "_facebook_i54ur_2029";
const telegram = "_telegram_i54ur_2045";
const email = "_email_i54ur_2061";
const copy = "_copy_i54ur_2081";
const shareOptionsGrid = "_shareOptionsGrid_i54ur_2097";
const pulse = "_pulse_i54ur_1";
const styles$3 = {
  testimonyPage,
  testimonyHeader,
  testimonyBack,
  testimonyLang,
  testimonyCenter,
  videoButtonWrapper,
  videoButton,
  youtubeIcon,
  videoText,
  notFoundPage,
  notFoundContent,
  fadeIn,
  notFoundCode,
  notFoundTitle,
  notFoundText,
  notFoundButton,
  backButton: backButton$1,
  backText,
  testimonyTitleBox,
  testimonyHeading,
  languageDropdown,
  dropdownToggle,
  testimonyContainer,
  testimonyTitle,
  testimonyDate,
  testimonyContent,
  floatingImage,
  left,
  float,
  right,
  floatFlipped,
  bottom,
  loadingOverlay,
  spinner,
  spin,
  imageWrapper,
  thumbnailImg,
  thumbnailWrapper,
  thumbnailImage,
  smallPlayIcon,
  wavePulse,
  floatingCloud,
  decorativeRow,
  decorativeItem,
  testimonyRight,
  closeButton,
  floatingVideoWrapper,
  floatingVideo,
  "yt-player": "_yt-player_i54ur_1",
  subtitleBox,
  visibleSubtitle,
  hiddenSubtitle,
  speakerButton,
  volumeSlider,
  overlayBackground,
  fixedTooltipBox,
  okButton,
  shareMainButton,
  shareOption,
  whatsapp,
  facebook,
  telegram,
  email,
  copy,
  shareOptionsGrid,
  pulse
};
function ShareModal({
  show,
  onHide,
  shareText,
  title,
  setShareText,
  fbShareUrl,
  waShareUrl,
  telegramShareUrl,
  emailShareUrl,
  styles: styles2,
  includeSummary,
  setIncludeSummary
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5e3);
    });
  };
  return /* @__PURE__ */ jsxs(Modal, { show, onHide, title, centered: true, children: [
    /* @__PURE__ */ jsx(Modal.Header, { closeButton: true, children: /* @__PURE__ */ jsxs(Modal.Title, { children: [
      "Share this ",
      title
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Body, { children: [
      /* @__PURE__ */ jsx("label", { style: { fontWeight: 600, marginBottom: "0.5rem", display: "block" }, children: "Message:" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          rows: 5,
          value: shareText,
          onChange: (e) => setShareText(e.target.value),
          placeholder: "Write something personal before sharing...",
          style: {
            width: "100%",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            resize: "vertical",
            height: "300px"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { margin: "1rem 0" }, children: /* @__PURE__ */ jsxs("label", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: includeSummary,
            onChange: (e) => setIncludeSummary(e.target.checked)
          }
        ),
        "Include full testimony in share text"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles2.shareOptionsGrid, children: [
        /* @__PURE__ */ jsxs("a", { href: fbShareUrl, target: "_blank", rel: "noopener noreferrer", className: `${styles2.shareOption} ${styles2.facebook}`, children: [
          /* @__PURE__ */ jsx(FaFacebookF, {}),
          "Facebook"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: waShareUrl, target: "_blank", rel: "noopener noreferrer", className: `${styles2.shareOption} ${styles2.whatsapp}`, children: [
          /* @__PURE__ */ jsx(FaWhatsapp, {}),
          "WhatsApp"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: telegramShareUrl, target: "_blank", rel: "noopener noreferrer", className: `${styles2.shareOption} ${styles2.telegram}`, children: [
          /* @__PURE__ */ jsx(FaTelegramPlane, {}),
          "Telegram"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: emailShareUrl, target: "_blank", rel: "noopener noreferrer", className: `${styles2.shareOption} ${styles2.email}`, children: [
          /* @__PURE__ */ jsx(FaEnvelope, {}),
          "Gmail"
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleCopy,
            className: `${styles2.shareOption} ${styles2.copy}`,
            type: "button",
            style: {
              backgroundColor: copied ? "green" : "",
              color: copied ? "white" : "initial",
              transition: "background-color 0.3s ease, color 0.3s ease"
            },
            children: [
              /* @__PURE__ */ jsx(FaRegCopy, { style: { marginRight: "8px" } }),
              copied ? "Copied!" : "Copy"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: onHide, children: "Close" }) })
  ] });
}
const supportedLanguages = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  fr: "Français",
  es: "Español",
  mr: "मराठी",
  kn: "ಕನ್ನಡ",
  other: "More"
};
function LanguageDropdown({ lang, onSelect }) {
  return /* @__PURE__ */ jsxs(Dropdown, { onSelect, children: [
    /* @__PURE__ */ jsx(
      Dropdown.Toggle,
      {
        variant: "outline-secondary",
        id: "dropdown-lang",
        style: {
          backgroundColor: "white",
          color: "#246bfd",
          borderColor: "#ccc",
          boxShadow: "0 2px 8px rgba(36, 107, 253, 0.15)",
          borderRadius: "30px",
          padding: "0.5rem 1.5rem",
          fontWeight: "600",
          transition: "all 0.3s ease"
        },
        onMouseEnter: (e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(36, 107, 253, 0.3)",
        onMouseLeave: (e) => e.currentTarget.style.boxShadow = "0 2px 8px rgba(36, 107, 253, 0.15)",
        children: supportedLanguages[lang] || lang
      }
    ),
    /* @__PURE__ */ jsx(
      Dropdown.Menu,
      {
        style: {
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          padding: "0.25rem 0",
          minWidth: "150px"
        },
        children: Object.entries(supportedLanguages).map(([key, label]) => /* @__PURE__ */ jsx(
          Dropdown.Item,
          {
            eventKey: key,
            style: {
              borderRadius: "8px",
              transition: "background-color 0.25s ease, color 0.25s ease",
              fontWeight: "600",
              padding: "1rem 1.5rem",
              cursor: "pointer"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.backgroundColor = "rgba(36, 107, 253, 0.1)";
              e.currentTarget.style.color = "#246bfd";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "inherit";
            },
            children: label
          },
          key
        ))
      }
    )
  ] });
}
function getYouTubeVideoID(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
}
function timeStringToSeconds(timeStr) {
  if (typeof timeStr !== "string") return 0;
  const parts = timeStr.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}
function generateShareText(testimony, lang, currentUrl, text, includeFullContent = false, youtubeLink) {
  if (!testimony) return "";
  const { title, date, content, video } = testimony;
  const t = title[lang] || title["en"];
  const d = date || "";
  const cRaw = content[lang] || content["en"] || "";
  const cPreview = cRaw.split(" ").slice(0, 60).join(" ") + (cRaw.split(" ").length > 60 ? "..." : "");
  return `${text}

📖 ${t}
📅 ${d}

"${includeFullContent ? cRaw : cPreview}"

🔗 ${currentUrl}

Kreupasanam Official - ${youtubeLink}`;
}
function preloadImages(imageUrls, onAllLoaded) {
  let loadedCount = 0;
  const totalToLoad = imageUrls.length;
  if (totalToLoad === 0) {
    onAllLoaded();
    return;
  }
  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      loadedCount++;
      if (loadedCount === totalToLoad) onAllLoaded();
    };
  });
}
function getCurrentSubtitle(subtitles, currentTime, lang) {
  if (!subtitles.length) return "";
  for (let i = 0; i < subtitles.length; i++) {
    const startSec = timeStringToSeconds(subtitles[i].start);
    const endSec = i + 1 < subtitles.length ? timeStringToSeconds(subtitles[i + 1].start) : startSec + 5;
    if (currentTime >= startSec && currentTime < endSec) {
      return subtitles[i].text[lang] || subtitles[i].text["en"] || "";
    }
  }
  return "";
}
function useYouTubePlayer(videoId, isPlaying) {
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (!isPlaying) {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
      return;
    }
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          cc_load_policy: 0,
          fs: 0
        },
        events: {
          onReady: (event) => {
            const player = event.target;
            const dur = player.getDuration?.();
            if (dur) setDuration(dur);
            intervalRef.current = setInterval(() => {
              if (playerRef.current?.getCurrentTime) {
                setCurrentTime(playerRef.current.getCurrentTime());
              }
              if (playerRef.current?.getDuration) {
                const d = playerRef.current.getDuration();
                if (d && d !== duration) setDuration(d);
              }
            }, 500);
          }
        }
      });
    };
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentTime(0);
      setDuration(0);
    };
  }, [videoId, isPlaying]);
  return { currentTime, playerRef, duration };
}
function useSubtitles(subtitlesUrl, lang, currentTime) {
  const [subtitles, setSubtitles] = useState([]);
  useEffect(() => {
    if (!subtitlesUrl) {
      setSubtitles([]);
      return;
    }
    fetch(subtitlesUrl).then((res) => {
      if (!res.ok) throw new Error("Failed to load subtitles");
      return res.json();
    }).then((data) => setSubtitles(data)).catch(() => setSubtitles([]));
  }, [subtitlesUrl]);
  const currentSubtitle = getCurrentSubtitle(subtitles, currentTime, lang);
  return { subtitles, currentSubtitle };
}
function SubtitleVoiceControls({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange
}) {
  const [showControls, setShowControls] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [maxInteractionTimeout, setMaxInteractionTimeout] = useState(null);
  const [positionStyle, setPositionStyle] = useState({});
  const [buttonSize, setButtonSize] = useState(40);
  const [controlsVisible, setControlsVisible] = useState(false);
  const updatePosition = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobileDevice) {
      setPositionStyle({
        right: "20%",
        top: "35%",
        bottom: "auto"
      });
      setButtonSize(48);
    } else if (isPortrait) {
      setPositionStyle({
        right: "5%",
        bottom: "20%",
        top: "auto"
      });
      setButtonSize(36);
    } else {
      setPositionStyle({
        right: "4%",
        top: "40%",
        bottom: "auto"
      });
      setButtonSize(25);
    }
  };
  useEffect(() => {
    setShowControls(true);
    setControlsVisible(true);
    const timer = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3e3);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);
  const clearAllTimeouts = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    if (maxInteractionTimeout) clearTimeout(maxInteractionTimeout);
  };
  const toggleControls = () => {
    clearAllTimeouts();
    setShowControls(true);
    setControlsVisible(true);
    const timeout = setTimeout(() => {
      if (!isInteracting) {
        setControlsVisible(false);
        setTimeout(() => setShowControls(false), 300);
      }
    }, 3e3);
    setHideTimeout(timeout);
  };
  const startInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(true);
    setControlsVisible(true);
    const maxTimeout = setTimeout(() => {
      setIsInteracting(false);
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 6e3);
    setMaxInteractionTimeout(maxTimeout);
  };
  const endInteraction = () => {
    clearAllTimeouts();
    setIsInteracting(false);
    const timeout = setTimeout(() => {
      setControlsVisible(false);
      setTimeout(() => setShowControls(false), 300);
    }, 3e3);
    setHideTimeout(timeout);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "fixed",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...positionStyle
      },
      children: [
        !showControls && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleControls,
            style: {
              width: `${buttonSize}px`,
              height: `${buttonSize}px`,
              background: "#222",
              borderRadius: "50%",
              border: "none",
              color: "#00f2fe",
              boxShadow: "0 0 10px #00f2feaa",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            },
            "aria-label": "Toggle voice controls",
            onMouseEnter: (e) => {
              e.currentTarget.style.boxShadow = "0 0 20px #38f9d7cc";
              e.currentTarget.style.color = "#38f9d7";
              e.currentTarget.style.transform = "scale(1.1)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.boxShadow = "0 0 10px #00f2feaa";
              e.currentTarget.style.color = "#00f2fe";
              e.currentTarget.style.transform = "scale(1)";
            },
            children: isSpeaking ? /* @__PURE__ */ jsx(FaVolumeUp, { size: Math.floor(buttonSize * 0.5) }) : /* @__PURE__ */ jsx(FaVolumeDown, { size: Math.floor(buttonSize * 0.5) })
          }
        ),
        showControls && /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseEnter: startInteraction,
            onMouseLeave: endInteraction,
            onTouchStart: startInteraction,
            onTouchEnd: endInteraction,
            style: {
              marginTop: "10px",
              background: "rgba(20,20,20,0.95)",
              padding: "14px 18px",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backdropFilter: "blur(6px)",
              opacity: controlsVisible ? 1 : 0,
              visibility: controlsVisible ? "visible" : "hidden",
              transition: "opacity 0.3s ease, visibility 0.3s ease",
              boxShadow: "0 0 15px #00f2fe88"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "18px",
                    cursor: "pointer",
                    userSelect: "none",
                    color: "#fff",
                    fontSize: "0.95rem"
                  },
                  onClick: toggleSpeaking,
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "Read Subtitles" }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          width: "44px",
                          height: "24px",
                          borderRadius: "24px",
                          backgroundColor: isSpeaking ? "#007BFF" : "#ccc",
                          position: "relative",
                          transition: "background-color 0.3s ease"
                        },
                        children: /* @__PURE__ */ jsx(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              top: "2px",
                              left: isSpeaking ? "22px" : "2px",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#fff",
                              transition: "left 0.3s ease",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                            }
                          }
                        )
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    color: "#fff",
                    fontSize: "0.85rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
                      /* @__PURE__ */ jsx(FaVolumeUp, {}),
                      /* @__PURE__ */ jsxs("span", { children: [
                        "Volume: ",
                        volume,
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "range",
                        min: "0",
                        max: "100",
                        value: volume,
                        onChange: handleVolumeChange,
                        onMouseDown: () => setIsInteracting(true),
                        onMouseUp: endInteraction,
                        onTouchStart: () => setIsInteracting(true),
                        onTouchEnd: endInteraction,
                        style: {
                          width: "140px",
                          accentColor: "#007BFF",
                          borderRadius: "4px",
                          height: "16px"
                        }
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function enhanceWithSsml(text) {
  if (!text.trim()) return "<speak></speak>";
  const escapeXml = (input) => input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const randomBetween = (min, max) => Math.random() * (max - min) + min;
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const wrapProsody = (word, { pitch, rate, volume }) => {
    let tag = `<prosody`;
    if (pitch) tag += ` pitch="${pitch}"`;
    if (rate) tag += ` rate="${rate}"`;
    if (volume) tag += ` volume="${volume}"`;
    tag += `>${word}</prosody>`;
    return tag;
  };
  const wrapEmphasis = (word) => {
    const levels = ["strong", "moderate", "reduced"];
    const level = randomChoice(levels);
    return `<emphasis level="${level}">${word}</emphasis>`;
  };
  const wrapWhisper = (word) => `<amazon:effect name="whispered">${word}</amazon:effect>`;
  const phraseSplitRegex = /([.!?])/g;
  const rawPhrases = text.split(phraseSplitRegex).reduce((acc, val, i, arr) => {
    if (phraseSplitRegex.test(val)) {
      acc[acc.length - 1] += val;
    } else if (val.trim()) {
      acc.push(val.trim());
    }
    return acc;
  }, []);
  const baseRateRange = [30, 45];
  function getProsodyParams(wordIndex, phraseLength) {
    const rate = `${randomBetween(...baseRateRange).toFixed(1)}%`;
    const pitchShift = wordIndex < 2 ? randomBetween(2, 6) : wordIndex > phraseLength - 3 ? randomBetween(-6, -2) : randomBetween(-2, 2);
    const pitch = `${pitchShift.toFixed(1)}%`;
    const volumes = ["medium", "x-loud", "loud", "soft", "x-soft"];
    const volume = randomChoice(volumes);
    return { pitch, rate, volume };
  }
  let processedPhrases = rawPhrases.map((phrase) => {
    const words = phrase.split(/\s+/);
    const len = words.length;
    const emphasizeIndices = /* @__PURE__ */ new Set();
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.25) emphasizeIndices.add(i);
    }
    const whisperIndices = /* @__PURE__ */ new Set();
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.05) whisperIndices.add(i);
    }
    const wrappedWords = words.map((wordRaw, i) => {
      const word = escapeXml(wordRaw);
      let prosodyParams = getProsodyParams(i, len);
      let wrapped = wrapProsody(word, prosodyParams);
      if (whisperIndices.has(i)) {
        wrapped = wrapWhisper(wrapped);
      } else if (emphasizeIndices.has(i)) {
        wrapped = wrapEmphasis(wrapped);
      }
      return wrapped;
    });
    const conjunctions = /* @__PURE__ */ new Set(["and", "but", "or", "because", "however", "so", "then"]);
    let result = [];
    let commaInterval = 4 + Math.floor(Math.random() * 2);
    for (let i = 0; i < wrappedWords.length; i++) {
      result.push(wrappedWords[i]);
      if (i === wrappedWords.length - 1) break;
      const lowerWord = words[i].toLowerCase();
      if (conjunctions.has(lowerWord)) {
        result.push(",");
      } else if ((i + 1) % commaInterval === 0) {
        result.push(",");
        commaInterval = 4 + Math.floor(Math.random() * 2);
      }
    }
    return result.join(" ");
  });
  const finalSsml = processedPhrases.join(() => {
    const pause = 700 + Math.floor(Math.random() * 200);
    return `<break time="${pause}ms"/>`;
  });
  return `<speak>${finalSsml}</speak>`;
}
function useSSMLSupportTest() {
  const [ssmlSupported, setSSMLSupported] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    try {
      utter.text = '<speak>Hello <break time="500ms"/> world!</speak>';
      utter.lang = "en-US";
      const voices = synth.getVoices();
      const googleVoice = voices.find((v) => v.name.toLowerCase().includes("google"));
      if (googleVoice) {
        utter.voice = googleVoice;
      }
      utter.onstart = () => {
        setSSMLSupported(true);
        synth.cancel();
      };
      utter.onerror = () => {
        setSSMLSupported(false);
      };
      synth.speak(utter);
    } catch (err) {
      setSSMLSupported(false);
    }
  }, []);
  return ssmlSupported;
}
function useSpeechSync({
  playerRef,
  showVideo,
  subtitles,
  currentSubtitle,
  currentTime,
  lang
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(100);
  const hasStartedSpeakingRef = useRef(false);
  const lastSpokenRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const isSSMLSupported = useSSMLSupportTest();
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player?.setVolume instanceof Function) {
        player.setVolume(volume);
        setPlayerReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [volume, playerRef]);
  useEffect(() => {
    if (playerReady && playerRef.current?.setVolume instanceof Function) {
      playerRef.current.setVolume(volume);
    }
  }, [volume, playerReady, playerRef]);
  useEffect(() => {
    if (!isSpeaking || !showVideo) {
      window.speechSynthesis.cancel();
      hasStartedSpeakingRef.current = false;
      lastSpokenRef.current = "";
    }
  }, [isSpeaking, showVideo]);
  useEffect(() => {
    if (!isSpeaking || !showVideo || !currentSubtitle || !subtitles.length)
      return;
    if (!hasStartedSpeakingRef.current) {
      hasStartedSpeakingRef.current = true;
      lastSpokenRef.current = "";
    }
    if (lastSpokenRef.current === currentSubtitle) return;
    lastSpokenRef.current = currentSubtitle;
    const currentSub = subtitles.find(
      (sub) => currentTime >= sub.startSeconds && currentTime < sub.endSeconds
    );
    const subtitleDuration = currentSub?.duration || 3;
    const wordCount = currentSubtitle.trim().split(/\s+/).length;
    const rawRate = wordCount / subtitleDuration;
    const speechRate = Math.min(Math.max(rawRate, 0.7), 1.1);
    if (playerRef.current?.setPlaybackRate) {
      const adjustedRate = Math.max(0.8, Math.min(1, 1.4 / rawRate));
      playerRef.current.setPlaybackRate(adjustedRate);
    }
    let textToSpeak = currentSubtitle.replace(/\[[^\]]*\]/g, "").trim();
    textToSpeak = textToSpeak.replace(/\b(V\.P\.)\b/g, "VP");
    if (isSSMLSupported) {
      console.log("supported");
      textToSpeak = enhanceWithSsml(textToSpeak);
    }
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const langMap = {
      ml: "ml-IN",
      ta: "ta-IN",
      hi: "hi-IN",
      bn: "bn-IN",
      te: "te-IN",
      kn: "kn-IN",
      gu: "gu-IN",
      mr: "mr-IN",
      ur: "ur-IN",
      "en-uk": "en-GB",
      en: "en-US"
    };
    utterance.lang = langMap[lang] || "en-US";
    utterance.rate = speechRate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, showVideo, currentSubtitle, currentTime, subtitles, lang, playerRef, isSSMLSupported]);
  useEffect(() => {
    if (!isSpeaking && playerRef.current) {
      playerRef.current.setPlaybackRate?.(1);
      playerRef.current.setVolume?.(100);
      setVolume(100);
    }
  }, [isSpeaking, playerRef]);
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
  };
  const toggleSpeaking = () => {
    setIsSpeaking((prev) => {
      const newSpeaking = !prev;
      if (newSpeaking) setVolume(20);
      return newSpeaking;
    });
  };
  return {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange
  };
}
function FloatingVideoPlayer({
  isSpeaking,
  volume,
  toggleSpeaking,
  handleVolumeChange,
  playerRef,
  currentSubtitle,
  onClose
}) {
  return /* @__PURE__ */ jsxs("div", { className: styles$3.floatingVideoWrapper, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.floatingVideo, children: [
      /* @__PURE__ */ jsx("div", { id: "yt-player", style: { width: "100%" }, ref: playerRef }),
      /* @__PURE__ */ jsx("button", { className: styles$3.closeButton, onClick: onClose, children: "✕" }),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            position: "absolute",
            top: "50%",
            right: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 1e3
          },
          children: /* @__PURE__ */ jsx(
            SubtitleVoiceControls,
            {
              isSpeaking,
              volume,
              toggleSpeaking,
              handleVolumeChange
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$3.subtitleBox, children: currentSubtitle })
  ] });
}
function LangHelpOverlay({ onClose }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: styles$3.overlayBackground, onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: styles$3.fixedTooltipBox, children: [
      /* @__PURE__ */ jsx("strong", { children: "🌐 Need another language?" }),
      /* @__PURE__ */ jsxs("p", { style: { marginTop: "8px" }, children: [
        "① Tap ",
        /* @__PURE__ */ jsx("b", { children: "⋮ (3 dots)" }),
        " in the top-right",
        /* @__PURE__ */ jsx("br", {}),
        "② Tap ",
        /* @__PURE__ */ jsx("b", { children: "“Translate”" }),
        " ",
        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.2em" }, children: "🌍" }),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "✅ Now you can read in your language!"
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://support.google.com/chrome/answer/173424?hl=en",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "📘 Learn more"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: styles$3.okButton,
          onClick: onClose,
          children: "OK"
        }
      )
    ] })
  ] });
}
function TestimonyPage({ lang: initialLang }) {
  const { id } = useParams();
  const testimony = testimonies.find((item) => item.id === parseInt(id));
  const [lang, setLang] = useState(initialLang || "en");
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [shareText, setShareText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [show, setShow] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  if (!testimony) {
    return /* @__PURE__ */ jsx("div", { className: styles$3.notFoundPage, children: /* @__PURE__ */ jsxs("div", { className: styles$3.notFoundContainer, children: [
      /* @__PURE__ */ jsx("span", { className: styles$3.notFoundCode, children: "404" }),
      /* @__PURE__ */ jsx("h1", { className: styles$3.notFoundTitle, children: "Testimony Not Found" }),
      /* @__PURE__ */ jsx("p", { className: styles$3.notFoundText, children: "Oops! The testimony you're looking for doesn’t exist or may have been removed." }),
      /* @__PURE__ */ jsx(Link, { to: `/${lang || "en"}/testimonies`, className: styles$3.notFoundButton, children: "Browse More" })
    ] }) });
  }
  const { title, date, content, video, subtitles: subtitlesUrl } = testimony;
  const cssBackgroundImages = [
    "/assets/angel3.webp",
    "/assets/angel3.webp",
    "/assets/cloud.webp"
  ];
  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);
  useEffect(() => {
    if (lang === "other") {
      setShowLangHelp(true);
    } else {
      setShowLangHelp(false);
    }
  }, [lang]);
  useEffect(() => {
    setShareText(generateShareText(testimony, lang, window.location.href, "A powerful testimony of Faith", includeSummary, video));
  }, [lang, testimony, includeSummary]);
  const { currentTime, playerRef } = useYouTubePlayer(videoId, showVideo);
  const {
    subtitles,
    // With end times
    currentSubtitle
    // Filtered for time/lang
  } = useSubtitles(subtitlesUrl, lang, currentTime);
  const {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange
  } = useSpeechSync({ playerRef, showVideo, subtitles, currentSubtitle, currentTime, lang });
  useEffect(() => {
    if (!showVideo && isSpeaking) {
      window.speechSynthesis.cancel();
    }
  }, [showVideo, isSpeaking]);
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title["en"])}&body=${encodeURIComponent(shareText)}`;
  if (!allAssetsLoaded) {
    return /* @__PURE__ */ jsxs("div", { className: styles$3.loadingOverlay, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.spinner }),
      /* @__PURE__ */ jsx("p", { children: "Loading visuals..." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyPage, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyHeader, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyLeft, children: /* @__PURE__ */ jsxs("button", { className: styles$3.backButton, onClick: () => window.history.back(), children: [
        "← ",
        /* @__PURE__ */ jsx("span", { className: styles$3.backText, children: "Back" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyCenter, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineLeft }),
        /* @__PURE__ */ jsx("h2", { className: styles$3.testimonyHeading, children: "Testimony" }),
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineRight })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyRight, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: /* @__PURE__ */ jsx(LanguageDropdown, { lang, onSelect: setLang }) }) })
    ] }),
    showLangHelp && /* @__PURE__ */ jsx(LangHelpOverlay, { onClose: () => {
      setLang("en");
      setShowLangHelp(false);
    } }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.left}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.right}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingCloud} ${styles$3.bottom}` }),
    /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContainer, children: /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyInner, children: [
      videoId && !showVideo ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: styles$3.thumbnailWrapper,
          onClick: () => setShowVideo(true),
          style: { cursor: "pointer" },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: thumbnailUrl,
                alt: "Video Thumbnail",
                className: styles$3.thumbnailImage
              }
            ),
            /* @__PURE__ */ jsx("div", { className: styles$3.smallPlayIcon, children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "#ff0000",
                width: "60%",
                height: "60%",
                children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: styles$3.thumbnailWrapper, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: thumbnailUrl,
          alt: "Video Thumbnail",
          className: styles$3.thumbnailImage
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyText, children: [
        /* @__PURE__ */ jsx("h1", { className: styles$3.testimonyTitle, children: title[lang] || title["en"] }),
        /* @__PURE__ */ jsx("p", { className: styles$3.testimonyDate, children: date }),
        /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContent, children: content[lang] || content["en"] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.shareSection, children: [
        /* @__PURE__ */ jsx("p", { style: { fontWeight: "600" }, children: "Share this testimony:" }),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: "2rem" }, children: /* @__PURE__ */ jsx("button", { className: styles$3.shareMainButton, onClick: () => setShowShareModal(true), children: "🔗 Share" }) }),
        /* @__PURE__ */ jsx(
          ShareModal,
          {
            show: showShareModal,
            onHide: () => setShowShareModal(false),
            title: "Testimony",
            shareText,
            setShareText,
            fbShareUrl,
            waShareUrl,
            telegramShareUrl,
            emailShareUrl,
            styles: styles$3,
            defaultShareText: generateShareText(testimony, lang, window.location.href, "A power testimony of Faith"),
            includeSummary,
            setIncludeSummary
          }
        )
      ] })
    ] }) }),
    showVideo && /* @__PURE__ */ jsx(
      FloatingVideoPlayer,
      {
        isSpeaking,
        volume,
        toggleSpeaking,
        handleVolumeChange,
        playerRef,
        currentSubtitle,
        onClose: () => setShowVideo(false)
      }
    )
  ] });
}
const languageMap$1 = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  fr: "Français",
  es: "Español",
  mr: "मराठी",
  kn: "ಕನ್ನಡ"
};
function MonthlyTestimonies({ lang: initialLang }) {
  const today = /* @__PURE__ */ new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear().toString();
  const [lang, setLang] = useState(initialLang || "en");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => {
      setFade(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const years = ["All", "2025", "2024", "2023", "2022", "2021", "2020"];
  const getYouTubeThumbnail2 = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };
  const filteredTestimonies = useMemo(() => {
    return testimonies.filter(({ date }) => {
      const testimonyDate2 = new Date(date);
      const monthName = testimonyDate2.toLocaleString("en", { month: "long" });
      const year = testimonyDate2.getFullYear().toString();
      const monthMatch = selectedMonth === "All" || monthName === selectedMonth;
      const yearMatch = selectedYear === "All" || year === selectedYear;
      return monthMatch && yearMatch;
    });
  }, [selectedMonth, selectedYear]);
  const thumbnails = useMemo(() => {
    return filteredTestimonies.map(({ video }) => getYouTubeThumbnail2(video)).filter(Boolean);
  }, [filteredTestimonies]);
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  useEffect(() => {
    setImagesLoaded(0);
    setAllImagesLoaded(thumbnails.length === 0);
  }, [thumbnails]);
  useEffect(() => {
    if (imagesLoaded === thumbnails.length && thumbnails.length > 0) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: styles$5.testimoniesSection,
      style: {
        marginTop: "0",
        backgroundColor: window.innerWidth <= 768 ? "#fff" : "transparent"
      },
      children: /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesSectionContainer, style: { margin: "0 1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesHeader, children: [
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", textAlign: "center" }, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: styles$3.backButton,
                onClick: () => window.history.back(),
                style: {
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: window.innerWidth <= 768 ? "none" : "block"
                },
                children: [
                  "← ",
                  /* @__PURE__ */ jsx("span", { children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: styles$5.testimoniesTitle, style: { margin: 0 }, children: "Testimonies" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles$5.testimoniesSubtitle, children: "Stories of healing, grace..." }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem"
              },
              children: [
                /* @__PURE__ */ jsxs(Dropdown, { onSelect: (e) => {
                  if (e !== lang) setLang(e);
                }, children: [
                  /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-lang", children: languageMap$1[lang] ?? languageMap$1["en"] }),
                  /* @__PURE__ */ jsx(Dropdown.Menu, { children: Object.entries(languageMap$1).map(([key, label]) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: key, children: label }, key)) })
                ] }),
                /* @__PURE__ */ jsxs(Dropdown, { onSelect: (e) => {
                  if (e !== selectedYear) setSelectedYear(e);
                }, children: [
                  /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-year", children: selectedYear }),
                  /* @__PURE__ */ jsx(Dropdown.Menu, { children: years.map((year) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: year, children: year }, year)) })
                ] }),
                /* @__PURE__ */ jsxs(
                  Dropdown,
                  {
                    onSelect: (e) => {
                      if (e !== selectedMonth) setSelectedMonth(e);
                    },
                    children: [
                      /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-month", children: selectedMonth }),
                      /* @__PURE__ */ jsx(Dropdown.Menu, { children: months.map((month) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: month, children: month }, month)) })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        !allImagesLoaded && /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#246bfd",
              fontSize: "1.2rem"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: 40,
                    height: 40,
                    border: "4px solid #d3e3ff",
                    borderTop: "4px solid #246bfd",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginBottom: 16
                  }
                }
              ),
              "Loading Testimonies...",
              /* @__PURE__ */ jsx("style", { children: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            ` })
            ]
          }
        ),
        allImagesLoaded && /* @__PURE__ */ jsx("div", { className: styles$5.testimoniesGrid, children: filteredTestimonies.length > 0 ? filteredTestimonies.map(({ id, title, video, date }) => {
          const thumbnail = getYouTubeThumbnail2(video);
          return /* @__PURE__ */ jsx(
            TestimonyCard,
            {
              id,
              title,
              image: thumbnail,
              date,
              lang,
              path: `${lang}/testimony`
            },
            id
          );
        }) : /* @__PURE__ */ jsxs(
          "div",
          {
            className: styles$5.testimoniesCard,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 1rem",
              border: "2px dashed #a2c4ff",
              borderRadius: "20px",
              backgroundColor: "rgba(240, 245, 255, 0.5)",
              maxWidth: "600px",
              margin: "3rem auto",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(36, 107, 253, 0.08)",
              backdropFilter: "blur(8px)"
            },
            children: [
              /* @__PURE__ */ jsx(HiOutlineEmojiSad, { size: 50, color: "#246bfd", style: { marginBottom: "1rem" } }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#246bfd", fontWeight: "600", fontSize: "1.4rem" }, children: "No Testimonies Available" }),
              /* @__PURE__ */ jsxs("p", { style: { color: "#444", marginTop: "0.5rem", fontSize: "1rem" }, children: [
                "We couldn’t find any testimonies for ",
                /* @__PURE__ */ jsx("strong", { children: selectedMonth }),
                " ",
                selectedYear,
                "."
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: thumbnails.map((src, idx) => /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt: "",
            onLoad: handleImageLoad,
            onError: handleImageLoad
          },
          `${src}-${selectedMonth}-${selectedYear}-${lang}`
        )) })
      ] })
    }
  );
}
const oracles = /* @__PURE__ */ JSON.parse(`[{"id":1,"title":{"zh":"活的神谕 - 第1集","bn":"লিভিং ওরাকলস - পর্ব ১","en":"Living ORACLES - Episode 1","hi":"लिविंग ओराकल्स - एपिसोड 1","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 1","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 1","fr":"Oracles Vivants - Épisode 1","es":"Oráculos Vivientes - Episodio 1","mr":"लिव्हिंग ओरॅकल्स - भाग 1","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೧"},"date":"May 4, 2025","video":"https://youtu.be/NvsyKlUb7Yk?si=2wuHWcCUaJToLf0H","content":{"zh":"在《活的神谕》第一集中，Jomol 介绍了全新系列，并温馨邀请观众进入以神的话语和马利亚圣约为中心的祈祷空间。受《使徒行传》7:38 的启发，V.P. Joseph 神父鼓励以见证为基础的事工，帮助人通过神的话语和活生的真理，在信仰中成长。\\n\\n节目重点分享来自阿拉普扎的公务员 Sunimol Vincent 的有力见证。她被诊断为罕见的自身免疫疾病“神经肉芽肿病”，尽管身体极度不适却从未被吸引进入 Kreupasanam。直到某日，在神圣的感召下，她前往并接受了“马利亚圣约”。\\n\\n立约之后，她经历了突破——医生终于确诊了她的病情。她分享此刻如何改变了她的属灵生命，使她能够与圣母玛利亚建立个人关系，并深切地领受耶稣进入她的生命。\\n\\nSunimol 回忆起一段神秘经历：耶稣与圣母在她房中显现，肯定了她的苦难，并鼓励她更深地爱天父。这次神圣显现教导她：马利亚圣约不仅是一种虔敬，更是一种属灵使命——信任、带着使命而受苦，并与上主的旨意同行。\\n\\nJomol 以邀请观众永恒地坚定信心并全心接受马利亚圣约来结束本集，让他们也能通过 Kreupasanam 的事工，活出对上主恩典与同在的更深觉醒。","bn":"‘লিভিং ওরাকলস’–এর প্রথম পর্বে, Jomol নতুন সিরিজটি পরিচয় করিয়ে দেন এবং দর্শকদের ঈশ্বরের শব্দ এবং মারিয়নের শপথকে কেন্দ্র করে একটি প্রার্থনাময় পরিবেশে স্বাগত জানান। কর্মসমূহের বই ৭:৩৮ দ্বারা অনুপ্রাণিত হয়ে, ফাদার V.P. Joseph প্রেরণা দেন এই সাক্ষ্যভিত্তিক মন্ত্রিত্ব শুরু করার জন্য যা মানুষকে জীবন্ত বাক্য ও জীবন্ত সত্যের মাধ্যমে বিশ্বাসে বৃদ্ধি পেতে সাহায্য করে।\\n\\nএই পর্বে আলাপ্পুজার সরকারি কর্মচারী Sunimol Vincent-এর শক্তিশালী সাক্ষ্য তুলে ধরা হয়েছে। তার শরীরে ‘নিউরোসারকয়েডোসিস’ নামক একটি বিরল অটোইমিউন রোগ শনাক্ত হয়। কঠিন শারীরিক অবস্থার মধ্যেও সে কখনোই Kreupasanam-এর দিকে আকৃষ্ট হননি। একদিন, ঈশ্বরীয় আহ্বানে প্রভাবিত হয়ে, সে গিয়ে মারিয়ান শপথ গ্রহণ করেন।\\n\\nশপথগ্রহণের পর, তিনি একটি ভাঙ্গন উপভোগ করেন—ডাক্তাররা অবশেষে তার রোগ নির্ণয় করতে সক্ষম হন। তিনি ব্যক্ত করেন যে এই মুহূর্তটি তাঁর আধ্যাত্মিক জীবনে পরিবর্তন এনেছে, যেভাবে তিনি বরগীর মাদের সাথে ব্যক্তিগত সম্পর্ক তৈরি করেছেন এবং নিজের জীবনে যীশুকে গভীরভাবে আমন্ত্রণ জানিয়েছেন।\\n\\nSunimol স্মরণ করেন এক মিস্টিক্যাল অভিজ্ঞতা যেখানে যীশু এবং বরগীর মা তাঁর ঘরে উপস্থিত হন, তাঁর কষ্টকে স্বীকৃতি দেন এবং তাঁকে আরও গভীরভাবে পিতাকে ভালোবাসার আহ্বান জানান। এই ঈশ্বরীয় উপস্থিতি তাঁকে শেখায় যে মারিয়ান শপথ শুধুমাত্র একটি ভক্তিভাব নয়, বরং একটি আধ্যাত্মিক নির্বাচন—বিশ্বাস রাখা, উদ্দেশ্য নিয়ে কষ্ট ভুগানো, এবং সর্বমঙ্গল ইচ্ছার সাথে জীবন যাপন।\\n\\nপর্বটির সমাপ্তিতে, Jomol দর্শকদেরকে আন্তরিকভাবে মারিয়ান শপথ গ্রহণ এবং বিশ্বাসে দৃঢ় থাকতে আহ্বান জানান, যেন তারা Kreupasanam মিশনের মাধ্যমে ঈশ্বরের করুণা ও উপস্থিতির গভীরতর বোধ লাভ করতে পারেন।","en":"In the 1st episode of Living Oracles, Jomol introduces the new series and warmly welcomes viewers into a prayerful space focused on the Word of God and the Marian Covenant. Inspired by the Book of Acts 7:38, Father V.P. Joseph encourages the launch of this testimony‑based ministry to help people grow in faith through divine revelations and the Living Word.\\n\\nThe episode highlights the powerful testimony of Sunimol Vincent, a government employee from Alappuzha, who was diagnosed with a rare autoimmune disorder called neurosarcoidosis. Despite severe physical limitations and pain, she never felt drawn to Kreupasanam until one day, moved by divine prompting, she came forward and made the Marian Covenant.\\n\\nAfter taking the covenant, she experienced a breakthrough: doctors were finally able to diagnose her illness. She shares how this moment transformed her spiritual life, allowing her to develop a personal relationship with the Blessed Mother and receive Jesus into her life in a deeply intimate way.\\n\\nSunimol recalls a mystical experience where both Jesus and the Blessed Mother appeared in her room, affirming her suffering and encouraging her to love God the Father more deeply. This divine encounter taught her that the Marian Covenant is not just a devotion, but a spiritual election—a calling to trust, suffer with purpose, and live in communion with God’s will.\\n\\nJomol concludes the episode by inviting viewers to embrace the Marian Covenant with lasting commitment and faith, so that they, too, may grow in awareness of God's grace and presence through the Kreupasanam mission.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಮೊದಲ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಹೊಸ ಸರಣಿಯನ್ನು ಪರಿಚಯಿಸಿ, ದೇವದ ವಾಕ್ಯ ಮತ್ತು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಗೆ ಕೇಂದ್ರವಾಗಿರುವ ಪ್ರಾರ್ಥನಾತ್ಮಕ ವಾತಾವರಣಕ್ಕೆ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತಾರೆ. ಕಾರ್ಯಗಳ ಪುಸ್ತಕದ 7:38ರಿಂದ ಪ್ರೇರಿತವಾಗಿ, ಫಾದರ್ ವಿ.ಪಿ. ಜೋಸೆಫ್ ಈ ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಸೇವೆಯನ್ನು ಪ್ರಾರಂಭಿಸುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಾರೆ, ಇದು ದಿವ್ಯ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಜೀವಂತ ವಾಕ್ಯದ ಮೂಲಕ ಜನರು ನಂಬಿಕೆಯಲ್ಲಿ ಬೆಳೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.\\n\\nಈ ಕಂತಿನಲ್ಲಿ ಅಲಪ್ಪುಜ್ಯಾದ ಸರ್ಕಾರದ ಉದ್ಯೋಗಿ ಸುನಿಮೋಲ್ ವಿನ್ಸೆಂಟ್ ಅವರ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನು ಹೈಲೈಟ್ ಮಾಡಲಾಗುತ್ತದೆ, ಅವರಿಗೆ ನ್ಯೂರೋಸಾರ್ಕೊಯ್ಡೋಸಿಸ್ ಎಂಬ ಅಪರೂಪದ ಸ್ವಯಂಪ್ರತಿಕ್ರಿಯಾತ್ಮಕ ರೋಗದ ನಿವಾರಣೆ ದೊರಕಿತು. ತೀವ್ರ ದೈಹಿಕ ನಿರ್ಬಂಧಗಳು ಮತ್ತು ನೋವಿನ ಮಧ್ಯೆಯೂ ಸಹ, ಅವರು ಕೃಪಾಸನಂ ಕಡೆಗೆ ಸೆಳೆಯಲ್ಪಟ್ಟಿರಲಿಲ್ಲ; ಆದರೂ ಒಬ್ಬ ದಿನ, ದಿವ್ಯ ಪ್ರೇರಣೆಯಿಂದ, ಅವರು ಮುಂದುವರೆದು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿದರು.\\n\\nಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿದ ನಂತರ, ಅವರು ಮುರಿದ ಎಡವಾಟನ್ನು ಅನುಭವಿಸಿದರು: ವೈದ್ಯರು ಅವರ ರೋಗವನ್ನು ಕೊನೆಗೆ ಗುರುತಿಸಿದರು. ಅವರು ಈ ಕ್ಷಣವು ಅವರ ಆಧ್ಯಾತ್ಮಿಕ ಜೀವನವನ್ನು ಹೇಗೆ ಪರಿವರ್ತನೆ ಮಾಡಿತು ಎಂದು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ, ಇದು ಅವರಿಗೆ ಆಶೀರ್ವದಿತ ತಾಯಿ ಅವರೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಸಂಬಂಧವನ್ನು ಬೆಳೆಸಲು ಮತ್ತು ಯೇಸುವನ್ನು ಅತ್ಯಂತ ಹೃದಯಸ್ಪರ್ಶಿ ರೀತಿಯಲ್ಲಿ ಸ್ವೀಕರಿಸಲು ಅವಕಾಶ ನೀಡಿತು.\\n\\nಸುನಿಮೋಲ್ ಅವರು ಒಂದು ರಹಸ್ಯಮಯ ಅನುಭವವನ್ನು ನೆನಸಿಕೊಳ್ಳುತ್ತಾರೆ, ಅಲ್ಲಿ ಯೇಸು ಮತ್ತು ಆಶೀರ್ವದಿತ ತಾಯಿ ಇಬ್ಬರೂ ಅವರ ಕೊಠಡಿಯಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡರು, ಅವರ ನೋವುಗಳನ್ನು ದೃಢಪಡಿಸಿದರು ಮತ್ತು ದೇವತ ತಂದೆಯನ್ನು ಹೆಚ್ಚು ಪ್ರೀತಿಸಲು ಪ್ರೇರೇಪಿಸಿದರು. ಈ ದಿವ್ಯ ಭೇಟಿಯು ಅವರಿಗೆ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಕೇವಲ ಭಕ್ತಿಯಾಗುವುದಲ್ಲ, ಆದರೆ ಆಧ್ಯಾತ್ಮಿಕ ಆಯ್ಕೆ ಎಂದು ಕಲಿಸಿತು—ನಂಬಿಕೆ ಇಟ್ಟುಕೊಳ್ಳಲು, ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ದುಃಖಪಡುವುದು ಮತ್ತು ದೇವರ ಇಚ್ಛೆಯೊಂದಿಗೆ ಸಂಗತಿಯಲ್ಲಿ ಬದುಕುವುದು.\\n\\nಜೋಮೋಲ್ ಕಂತಿನ ಅಂತ್ಯದಲ್ಲಿ, ಪ್ರೇಕ್ಷಕರನ್ನು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ದೀರ್ಘಕಾಲಿಕ ಬದ್ಧತೆ ಮತ್ತು ನಂಬಿಕೆಯಿಂದ ಸ್ವೀಕರಿಸಲು ಆಹ್ವಾನಿಸುತ್ತಾರೆ, ಹೀಗಾಗಿ ಅವರು ಕೂಡ ದೇವರ ಕೃಪೆ ಮತ್ತು ಸನ್ನಿಧಿಯನ್ನು ಕೃಪಾಸನಂ ಮಿಷನ್ ಮೂಲಕ ಅರಿಯಲು ಬೆಳೆಯುತ್ತಾರೆ.","hi":"‘लिविंग ओराकल्स’ के पहले एपिसोड में, Jomol नई श्रृंखला का परिचय देती हैं और दर्शकों का दिल खोल कर स्वागत करती हैं एक प्रार्थनात्मक माहौल में, जहां मुख्य रूप से परमेश्वर के वचन और मैरियन संधि पर ध्यान केंद्रित है। प्रेरितिक कर्म 7:38 से प्रेरणा लेकर, फादर V.P. Joseph इस गवाही‑आधारित सेवा की शुरूआत करने के लिए प्रेरित करते हैं, जो दिव्य प्रकाश और जीवित वचन द्वारा लोगों को विश्वास में बढ़ने में मदद करती है।\\n\\nइस एपिसोड में, आलप्पुझा की सरकारी कर्मचारी Sunimol Vincent की शक्तिशाली गवाही सुनाई जाती है, जिन्हें न्यूरोसारकोइडोसिस नामक एक दुर्लभ ऑटोइम्यून बीमारी का निदान हुआ था। गंभीर शारीरिक सीमाओं और दर्द के बावजूद, वह कभी Kreupasanam की ओर नहीं आकर्षित हुईं। उस दिन, दिव्य प्रेरणा से प्रेरित होकर, उन्होंने मैरियन संधि ग्रहण की।\\n\\nसंधि लेने के बाद, उन्हें एक चमत्कारिक मोड़ का अनुभव हुआ: डॉक्टर अंततः उनकी बीमारी का निदान कर सके। वह बताती हैं कि इस क्षण ने उनकी आध्यात्मिक जीवन को बदल दिया, जिससे उन्होंने आशीषित माता के साथ व्यक्तिगत संबंध विकसित किया और अपने जीवन में गहराई से यीशु का स्वागत किया।\\n\\nSunimol एक आध्यात्मिक अनुभव को याद करती हैं, जहाँ यीशु और आशीषित माता उनके कमरे में प्रकट हुए, उनके दर्द को स्वीकारा और उन्हें ईश्वर पिता से और गहराई से प्रेम करने के लिए प्रोत्साहित किया। इस दिव्य मिलन ने उन्हें सिखाया कि मैरियन संधि केवल एक भक्ति नहीं, बल्कि आध्यात्मिक चुनाव है—विश्वास करना, उद्देश्य के साथ दुख सहना, और ईश्वर की इच्छा के साथ जीवन यापन।\\n\\nअंत में, Jomol दर्शकों से स्थायी प्रतिबद्धता और विश्वास के साथ मैरियन संधि को अपनाने का आग्रह करती हैं, ताकि वे भी Kreupasanam के माध्यम से ईश्वर की कृपा और उपस्थिति के प्रति जागरूकता में वृद्धि कर सकें।","ta":"‘லிவிங் ஓரகில்ஸ்’ முதல் எபிஸோடில் Jomol புதிய தொடருக்கான அறிமுகத்தை வழங்கி, பார்வையாளர்களை இறைவன் வாக்கு மற்றும் மரியாரின் உடன்படிக்கையை மையமாகக் கொண்டு ஒரு பிரார்த்தனையான இடத்திற்கு அன்புடன் வரவேற்கிறார். இயோவாக்களின் செயல்கள் 7:38 மூலம் ஈர்ப்படைந்து, V.P. Joseph தந்தை இந்த சாட்சி‑அடிப்படையிலான சேவையை தொடங்க ஊக்குவிக்கிறார், இது பெரும் வெளிச்சம் மற்றும் உயிர்வாக்கு மூலம் நம்பிக்கையில் வளர உதவுகிறது.\\n\\nஇந்த எபிசோட்டில் அலப்புழந்தோரும் அரசு பணியாளர் Sunimol Vincent உளறிய ஆழ்ந்த சாட்சியம் இடம்பெறுகிறது. நியூரோசார்கொய்டோசிஸை போன்ற ஒரு அரிய ஆட்டோ-இம்யூன் நோயால் பாதிக்கப்பட்டதால், கடுமையான உடலியல் வினாக்களுடன் இருந்தபோதிலும், அவள் ஒருபோதும் Kreupasanam-இற்கு ஈர்க்கப்படவில்லை. ஒரு நாள், தெய்வீக தூண்டுதலை அனுபவித்து, அவள் அங்கே வந்து மரியாரின் உடன்பக்தியை ஏற்றுக்கொண்டாள்.\\n\\nஉடன்பக்தியை எடுத்ததற்கு பின், அவள் ஒரு பிரகடனம் காண்கிறாள்: மருத்துவர் இறுதியில் அவரது நோயை கண்டறிந்தார்கள். அந்த தருணம் அவளது ஆன்மிக வாழ்க்கையை மாற்றியது; அது அவருக்கு ஆசீர்வதிக்கப்பட்ட தாயுடன் தனிப்பட்ட உறவை உருவாக்க உதவியது மற்றும் அவருடைய வாழ்வில் இயேசுவை ஆழமாக வரவேற்க உதவியது.\\n\\nSunimol ஒரு மாய அனுபவத்தை நினைவுகூர்கிறாள், அப்போது இயேசு மற்றும் ஆசீர்வதிக்கப்பட்ட தாய் அவருடைய அறையில் தோன்றினர், அவர்களின் வலியை உணர்ந்து, அவரை பரமபிதாவை ஆழமாக காதலிக்க ஊக்கமளித்தனர். இந்த தெய்வீக நிகழ்வு அவர் கற்றுக்கொண்டது: மரியாரின் உடன்பக்தி என்பது ஒரு பக்தியை மட்டுமல்ல, ஆன்மீக தேர்வு — நம்பிக்கையுடன் இருக்க, நோக்கத்தோடு துக்கத்தை எதிர்கொள், தேவனுடைய இচ্ছையோடும் வாழ்.\\n\\nJomol பார்வையாளர்களை இந்த உடன்பக்தியை நிலையான உறுதி மற்றும் நம்பிக்கையுடன் ஏற்க அழைக்கிறார், மேலும் அவர்கள் Kreupasanam வழியாக கடவுளின் கிருபையும் உள்உளத்தில் உணரும் வாய்ப்பைப் பெறலாம்.","te":"‘లివింగ్ ఓరాకిల్స్’ మొదటి ఎపిసోడ్‌లో, Jomol కొత్త సిరీస్‌ను పరిచయం చేసి, దేవుని వాక్యం మరియు మరియుని ఒప్పందంపై దృష్టి పెట్టిన ప్రార్థన స్థలంలో ప్రేక్షకులను ఆహ్వానిస్తారు. యాక్ట్స్ 7:38 ప్రేరణతో, ఫాదర్ V.P. జోసెఫ్ ఈ సాక్ష్యాధారిత సేవ ప్రారంభానికై ప్రోత్సహిస్తారు, ఇది దైవ ప్రకాశం మరియు జీవ వాక్యం ద్వారా విశ్వాసంలో ఎదగ సహాయం చేస్తుంది.\\n\\nఈ ఎపిసోడ్లో అలప్పుజాకు చెందిన ప్రభుత్వ ఉద్యోగి Sunimol Vincent యొక్క శక్తివంతమైన సాక్ష్యం పొందుపరచబడింది. ఆమెకు న్యూరోసార్కోయిడోసిస్ అనే అరుదైన ఆటోఇమ్యూన్ వ్యాధి గుర్తించబడినప్పటికీ, తీవ్ర శారీరక పరిమితులతో కూడిన నొప్పికి మధ్య కూడా, Kreupasanam వైపు ఆకర్షితుడినవళ్లేదు. ఒక రోజు, దివ్య ప్రేరణతో, ఆమె అక్కడకు వచ్చి మరియుని ఒప్పందం చేపట్టారు.\\n\\nఒప్పందం తీసుకున్న తర్వాత, ఆమె ఒక ఆధ్యాత్మిక మలుపు అనుభవించింది: డాక్టర్లు చివరకు ఆమె వ్యాధిని గుర్తించారు. ఈ క్షణం ఆమె ఆధ్యాత్మిక జీవితాన్ని మార్చింది; ఇది ఆమెకు ఆశీర్వదించబడిన తల్లి తో వ్యక్తిగత సంబంధాన్ని అభివృద్ధి చేసుకోవడానికి, మరియు ఆమె జీవితంలో యేసును భావపూర్వకంగా స్వీకరించడానికి అవకాశం ఇచ్చింది.\\n\\nSunimol ఒక మిస్టికల్ అనుభవాన్ని గుర్తు చేస్తుంది, అక్కడ యేసు మరియు ఆశీర్వదించబడిన తల్లి ఆమె గదిలో ప్రత్యక్షమయ్యారు, ఆమె బాధను అర్థం చేసుకుని, ఆమెను పరమ పితాను మరింతగా ప్రేమించమని ప్రోత్సహించార�","fr":"Dans le 1ᵉʳ épisode de *Oracles Vivants*, Jomol présente la nouvelle série et accueille chaleureusement les téléspectateurs dans un espace de prière centré sur la Parole de Dieu et le Pacte marial. Inspiré par Actes 7:38, le Père V.P. Joseph encourage le lancement de ce ministère basé sur les témoignages, afin d’aider les gens à grandir dans la foi par des révélations divines et la Parole vivante.\\n\\nL’épisode met en lumière le témoignage puissant de Sunimol Vincent, fonctionnaire à Alappuzha, diagnostiquée avec un trouble auto‑immun rare appelé neurosarcoïdose. Malgré de sévères limitations physiques et la douleur, elle n’a jamais été attirée par Kreupasanam jusqu’au jour où, poussée par une inspiration divine, elle s’est présentée et a pris le Pacte marial.\\n\\nAprès avoir fait le pacte, elle a vécu une percée : les médecins ont enfin pu poser un diagnostic. Elle partage comment ce moment a transformé sa vie spirituelle, lui permettant d’établir une relation personnelle avec la Vierge Marie et d’accueillir Jésus dans sa vie d’une manière profondément intime.\\n\\nSunimol raconte une expérience mystique dans laquelle Jésus et la Vierge Marie sont apparus dans sa chambre, affirmant ses souffrances et l’encourageant à aimer davantage Dieu le Père. Cette rencontre divine lui a enseigné que le Pacte marial n’est pas seulement une dévotion, mais une élection spirituelle — un appel à faire confiance, à souffrir avec un objectif, et à vivre en communion avec la volonté de Dieu.\\n\\nJomol conclut l’épisode en invitant les téléspectateurs à accueillir le Pacte marial avec un engagement durable et une foi ferme, afin qu’ils aussi puissent grandir dans la conscience de la grâce et de la présence de Dieu à travers la mission de Kreupasanam.","es":"En el primer episodio de *Oráculos Vivientes*, Jomol presenta la nueva serie y da una cálida bienvenida a los espectadores a un espacio de oración centrado en la Palabra de Dios y el Pacto Mariano. Inspirado por el libro de los Hechos 7:38, el padre V.P. Joseph alienta el lanzamiento de este ministerio basado en testimonios, para ayudar a las personas a crecer en la fe mediante revelaciones divinas y la Palabra Viva.\\n\\nEl episodio destaca el poderoso testimonio de Sunimol Vincent, funcionaria pública de Alappuzha, diagnosticada con un trastorno autoinmune raro llamado neurosarcoidosis. A pesar de sus severas limitaciones físicas y el dolor, nunca se sintió atraída a Kreupasanam hasta que un día, movida por un llamado divino, se presentó y aceptó el Pacto Mariano.\\n\\nDespués de hacer el pacto, experimentó un avance: los médicos finalmente pudieron diagnosticar su enfermedad. Comparte cómo ese momento transformó su vida espiritual, permitiéndole desarrollar una relación personal con la Virgen y recibir a Jesús en su vida de una manera profundamente íntima.\\n\\nSunimol recuerda una experiencia mística donde Jesús y la Virgen aparecieron en su habitación, afirmando su sufrimiento y animándola a amar más profundamente al Padre Celestial. Este encuentro divino le enseñó que el Pacto Mariano no es solo una devoción, sino una elección espiritual: un llamado a confiar, sufrir con propósito y vivir en comunión con la voluntad de Dios.\\n\\nJomol concluye el episodio invitando a los espectadores a abrazar el Pacto Mariano con un compromiso duradero y fe, para que ellos también puedan crecer en conciencia de la gracia y presencia de Dios a través de la misión de Kreupasanam.","mr":"‘लिव्हिंग ओरॅकल्स’ च्या पहिले भागात, Jomol नवीन मालिका सादर करतात आणि प्रेक्षकांचे मनापासून स्वागत करतात जिथे प्रार्थनास्थळावर देवाचे वचन आणि मरियन करार यावर लक्ष केंद्रित केलेले आहे. प्रेरितांचा कार्य 7:38 या श्लोकातून प्रेरणा घेऊन, फादर V.P. Joseph हे साक्षात्कारांवर आधारित मंत्रालय सुरू करण्यासाठी प्रेउत्साहित करतात, जे लोकांना दैवी प्रकाश आणि जिवंत वचनाद्वारे श्रद्धेत वाढ मिळवून देण्यास मदत करते.\\n\\nहा भाग अलप्पुझाचे सरकारी कर्मचारी Sunimol Vincent यांचे साक्षात्कार प्रकट करतो. तिला न्यूरोसार्कॉयडोसिस नावाच्या दुर्मिळ ऑटो‑इम्यून आजाराचे निदान झाले. तीने शारीरिक अडचणी आणि वेदने असूनही Kreupasanam कडे कधीही आकर्षित झाली नाही. पण एक दिवस, दैवी प्रेरणेने प्रेरित होऊन ती त्या ठिकाणी गेली आणि मरियन करार स्वीकारला.\\n\\nकरार करताच तिने एक चमत्कारी घडामोड अनुभवली: डॉक्टरांना अखेर तिचा आजार ओळखता आला. तिने सांगितले की त्या क्षणाने तिचे आध्यात्मिक जीवन बदलले, ज्यायोगे तिला धन्य माता मारियाबरोबर वैयक्तिक नाते निर्माण करण्याची संधी मिळाली आणि ती गाभ्यापूर्वक येशूला तिच्या आयुष्यात सामावून घेऊ शकील.\\n\\nSunimol एक रहस्यमय अनुभव आठवते जिथे येशू आणि धन्य माता तिच्या खोलीत प्रकट झाले, तिच्या कष्टांना मान्यता दिली आणि तिला स्वर्गीय पित्यावर अधिक प्रेम करण्यासाठी प्रेरित केले. या दैवी भेटीने तिला शिकवले की मरियन करार हा केवळ भक्ती नाही, तर एक आध्यात्मिक निवड आहे — आत्मविश्वास ठेवण्याचे, उद्देशाने दु: ख सहन करण्याचे, आणि देवाच्या इच्छेच्या समवेत जीवन जगण्याचे आह्वान.\\n\\nJomol हा भाग संपवताना प्रेक्षकांना प्रस्थापित-विश्वासपूर्ण बांधणीसह मरियन करार स्वीकारण्यास आमंत्रित करतात, जेणेकरून ते Kreupasanam च्या मिशनच्या माध्यमातून देवाच्या कृपेची आणि उपस्थितीची जाणीव प्राप्त करू शकतील."},"subtitles":"/assets/oracles/oracles1.json"},{"id":2,"title":{"zh":"活的神谕 - 第2集","bn":"লিভিং ওরাকলস - পর্ব ২","en":"Living ORACLES - Episode 2","hi":"लिविंग ओराकल्स - एपिसोड 2","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 2","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 2","fr":"Oracles Vivants - Épisode 2","es":"Oráculos Vivientes - Episodio 2","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೨","mr":"लिव्हिंग ओरॅकल्स - भाग 2"},"date":"May 11, 2025","video":"https://youtu.be/BMfZ2YiFN-k?si=kUPjWE588rXnf19m","content":{"zh":"在《活的神谕》第2集中，Jomol热情欢迎观众回归，继续通过玛利亚盟约和神圣启示的信仰旅程。本集重点介绍来自科泽科德的55岁兄弟Josy的强有力见证，他分享了在克鲁帕萨南接受玛利亚盟约后的奇迹经历。\\n\\nJosy讲述了尽管学历有限，他却获得了意想不到的神圣祝福，包括欧洲的工作机会、旅行资金以及重要文件的及时续期——所有这些都没有依靠常规手段。这些事件让他确认了忠实遵守盟约所带来的切实的物质和精神利益。\\n\\n他还分享了一次与圣体圣事相关的深刻属灵遭遇，耶稣教导了拥抱玛利亚为我们的属灵母亲并在信仰中深切共融的重要性。Josy的故事揭示了玛利亚盟约如何通过开启恩典、指引和超自然眷顾之门，改变平凡生命。\\n\\nJomol在节目结尾鼓励所有观众以信任和真诚接受玛利亚盟约，通过克鲁帕萨南使命体验上帝的慈爱与奇迹。","bn":"লিভিং ওরাকলস - পর্ব ২-তে, জোমল উষ্ণভাবে দর্শকদের আবার স্বাগত জানিয়ে বিশ্বাস এবং ঈশ্বরের প্রকাশনার যাত্রা মারিয়ান চুক্তির মাধ্যমে চালিয়ে যেতে বলেন। এই পর্বটি কোঝিকোডের ৫৫ বছর বয়সী ভাই জোশির শক্তিশালী সাক্ষ্যকে কেন্দ্র করে, যিনি কৃপারসানামে মারিয়ান চুক্তি গ্রহণের পর তার অলৌকিক অভিজ্ঞতা শেয়ার করেন।\\n\\nজোশি বর্ণনা করেন কিভাবে সীমিত শিক্ষার পরও তিনি অপ্রত্যাশিত ঈশ্বরীয় আশীর্বাদ পেয়েছেন, যেমন ইউরোপে চাকরির সুযোগ, ভ্রমণের জন্য অর্থ এবং গুরুত্বপূর্ণ নথিপত্রের সময়মত নবায়ন — সবই প্রচলিত উপায় ছাড়াই। এই ঘটনা তাকে চুক্তি বিশ্বস্তভাবে পালন করার বাস্তবিক শারীরিক ও আধ্যাত্মিক সুবিধা নিশ্চিত করেছে।\\n\\nতিনি একটি গভীর আধ্যাত্মিক সাক্ষাত্কারের কথা শেয়ার করেন যা পবিত্র মিসার সাথে সংযুক্ত, যেখানে যীশু মারিয়াকে আমাদের আধ্যাত্মিক মাতৃরূপে গ্রহণের এবং বিশ্বাসে গভীর মিলনের গুরুত্ব শেখান। জোশির গল্প প্রকাশ করে কিভাবে মারিয়ান চুক্তি সাধারণ জীবনে করুণা, নির্দেশনা এবং অদ্ভুত অনুগ্রহের দরজা খুলে দেয়।\\n\\nজোমল পর্বের শেষাংশে সমস্ত দর্শকদের বিশ্বাস ও আন্তরিকতার সাথে মারিয়ান চুক্তি গ্রহণ করতে উৎসাহিত করেন, যেন তারা কৃপারসানাম মিশনের মাধ্যমে ঈশ্বরের ভালোবাসা ও আশ্চর্য অনুভব করতে পারে।","en":"In the 2nd episode of Living Oracles, Jomol warmly welcomes viewers back to continue the journey of faith and divine revelation through the Marian Covenant. This episode focuses on the powerful testimony of Josy, a 55-year-old brother from Kozhikode, who shares his miraculous experiences after taking the Marian Covenant in Kreupasanam.\\n\\nJosy recounts how, despite limited education and qualifications, he received unexpected divine blessings including a job opportunity in Europe, financial provision for travel, and timely renewal of important documents — all without conventional means. These events confirmed for him the tangible physical and spiritual benefits of faithfully living the Covenant.\\n\\nHe also shares a profound spiritual encounter connected to the Holy Mass, where Jesus teaches the importance of embracing Mary as our spiritual mother and living with deep communion in the faith. Josy's story reveals how the Marian Covenant transforms ordinary lives by opening doors to grace, guidance, and supernatural favor.\\n\\nJomol closes the episode by encouraging all viewers to embrace the Marian Covenant with trust and sincerity, to experience God’s loving presence and miracles in their own lives through the Kreupasanam mission.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಎರಡನೇ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ, ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಮೂಲಕ ನಂಬಿಕೆ ಮತ್ತು ದಿವ್ಯ ಪ್ರಕಟಣೆಯ ಯಾತ್ರೆಯನ್ನು ಮುಂದುವರೆಸುತ್ತಾರೆ. ಈ ಕಂತಿನಲ್ಲಿ ಕೋഴിക്കೋಡಿನ ೫೫ ವರ್ಷದ ಸೋದರನಾದ ಜೋಸಿ ಅವರ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನು ಕೇಂದ್ರೀಕರಿಸಲಾಗಿದೆ, ಅವರು ಕೃಪಾಸನಂನಲ್ಲಿ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ತೆಗೆದುಕೊಂಡ ನಂತರ ಅನುಭವಿಸಿದ ಅದ್ಭುತ ಘಟನೆಗಳನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ.\\n\\nಜೋಸಿ ಅವರು ತಮ್ಮ ಸೀಮಿತ ಶಿಕ್ಷಣ ಮತ್ತು ಅರ್ಹತೆಗಳಿದ್ದರೂ, ಯೂರೋಪ್‌ನಲ್ಲಿ ಉದ್ಯೋಗದ ಅವಕಾಶ, ಪ್ರಯಾಣಕ್ಕಾಗಿ ಹಣಕಾಸು ವ್ಯವಸ್ಥೆ ಮತ್ತು ಪ್ರಮುಖ ದಾಖಲೆಗಳ ಸಮಯೋಚಿತ ನವೀಕರಣ ಸೇರಿದಂತೆ ಅನಿರೀಕ್ಷಿತ ದಿವ್ಯ ಆಶೀರ್ವಾದಗಳನ್ನು ಪಡೆದಿರುವುದನ್ನು ವಿವರಿಸುತ್ತಾರೆ — ಎಲ್ಲಾ ಪರಂಪರागत ಮಾರ್ಗಗಳನ್ನು ಬಿಟ್ಟಿ. ಈ ಘಟನೆಗಳು ಅವರಿಗೆ ಒಡಂಬಡಿಕೆಯನ್ನು ನಿಷ್ಠೆಯಿಂದ ಜೀವನ ಮಾಡುವುದು ಭೌತಿಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಲಾಭಗಳನ್ನು ನೀಡುವುದಾಗಿ ದೃಢಪಡಿಸಿವೆ.\\n\\nಅವರು ಪವಿತ್ರ ಮಸ್ಯಾ ಜೊತೆ ಸಂಬಂಧಪಟ್ಟ ಗಂಭೀರ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವವನ್ನೂ ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ, ಅಲ್ಲಿ ಯೇಸು ಮರಿಯನ್ನು ನಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ತಾಯಿಯಂತೆ ಸ್ವೀಕರಿಸುವ ಮಹತ್ವ ಮತ್ತು ನಂಬಿಕೆಯಲ್ಲಿ ಆಳವಾದ ಸಂಗತಿಯಲ್ಲಿ ಬದುಕುವುದರ ಕುರಿತು ಬೋಧಿಸುತ್ತಾರೆ. ಜೋಸಿಯ ಕಥೆ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಸಾಮಾನ್ಯ ಜೀವನಗಳನ್ನು ಕೃಪೆ, ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಅತೀಂದ್ರಿಯ ಅನುಕೂಲಗಳಿಗೆ ದಾರಿತೊಡಗಿಸುವ ಮೂಲಕ ಹೇಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ.\\n\\nಜೋಮೋಲ್ ಕಂತಿನ ಅಂತ್ಯದಲ್ಲಿ ಎಲ್ಲಾ ಪ್ರೇಕ್ಷಕರನ್ನು ನಂಬಿಕೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕತೆಯಿಂದ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಲು ಪ್ರೋತ್ಸಾಹಿಸಿ, ಕೃಪಾಸನಂ ಮಿಷನ್ ಮೂಲಕ ತಮ್ಮದೇ ಜೀವನದಲ್ಲಿ ದೇವರ ಪ್ರೀತಿಯ ಸನ್ನಿಧಿ ಮತ್ತು ಅದ್ಭುತಗಳನ್ನು ಅನುಭವಿಸಲು ಆಹ್ವಾನಿಸುತ್ತಾರೆ.","hi":"लिविंग ओराकल्स के दूसरे एपिसोड में, जोमोल दर्शकों का गर्मजोशी से स्वागत करते हैं और मरियाई संधि के माध्यम से विश्वास और दिव्य प्रकाश की यात्रा जारी रखने का निमंत्रण देते हैं। इस एपिसोड में कोझिकोड के 55 वर्षीय भाई जोसी की शक्तिशाली गवाही पर ध्यान केंद्रित किया गया है, जो कृपासनाम में मरियाई संधि लेने के बाद अपने चमत्कारी अनुभव साझा करते हैं।\\n\\nजोसी बताते हैं कि सीमित शिक्षा और योग्यताओं के बावजूद, उन्हें अप्रत्याशित दिव्य आशीषें प्राप्त हुईं, जिनमें यूरोप में नौकरी का अवसर, यात्रा के लिए वित्तीय सहायता, और महत्वपूर्ण दस्तावेजों का समय पर नवीनीकरण शामिल है — और ये सभी पारंपरिक तरीकों के बिना ही संभव हुआ। इन घटनाओं ने उनके लिए संधि को विश्वासपूर्वक निभाने के ठोस भौतिक और आध्यात्मिक लाभों की पुष्टि की।\\n\\nवे एक गहरे आध्यात्मिक अनुभव को भी साझा करते हैं जो पवित्र मिस्सा से जुड़ा है, जहां यीशु मरी को हमारी आध्यात्मिक माता के रूप में अपनाने और विश्वास में गहरी एकता के महत्व को सिखाते हैं। जोसी की कहानी बताती है कि मरियाई संधि कैसे सामान्य जीवन को कृपा, मार्गदर्शन और अलौकिक कृपा के द्वार खोलकर बदल देती है।\\n\\nजोमोल एपिसोड को समाप्त करते हुए सभी दर्शकों को मरियाई संधि को विश्वास और ईमानदारी के साथ अपनाने के लिए प्रोत्साहित करते हैं, ताकि वे कृपासनाम मिशन के माध्यम से ईश्वर की प्रेमपूर्ण उपस्थिति और चमत्कारों का अनुभव कर सकें।","ta":"லிவிங் ஓரகில்ஸ் இரண்டாம் எபிசோட்டில், ஜோமோல் பார்வையாளர்களை நெகிழ்ச்சி மிகுந்த வரவேற்புடன் மீண்டும் வரவேற்கிறார் மற்றும் மரியன் உடன்படிக்கையின் வழியாக நம்பிக்கை மற்றும் தெய்வீக வெளிப்பாட்டின் பயணத்தை தொடர்வதற்கான அழைப்பை வழங்குகிறார். இந்த எபிசோட்டில் கோழிக்கோட்டின் 55 வயது சகோதரர் ஜோஸியின் வலுவான சாட்சி கவனிக்கப்பட்டுள்ளது, அவர் கிருபாசனம் என்ற இடத்தில் மரியன் உடன்படிக்கையை ஏற்றுக்கொண்ட பிறகு அனுபவித்த அதிசய அனுபவங்களை பகிர்கிறார்.\\n\\nகல்வி மற்றும் தகுதிகள் குறைந்தபோதும், ஜோசி எதிர்பாராத தெய்வீக ஆசீர்வாதங்களைப் பெற்றார், அதில் ஐரோப்பாவில் வேலை வாய்ப்பு, பயணத்திற்கு நிதியுதவி மற்றும் முக்கிய ஆவணங்களின் நேரத்துக்கு முன்பான புதுப்பிப்பு போன்றவை உள்ளன — இவை அனைத்தும் பாரம்பரிய முறைகள் இல்லாமல் நடந்தன. இந்த நிகழ்வுகள் உடன்படிக்கையை விசுவாசமாக வாழுவதன் மூலம் கிடைக்கும் பொருளாதார மற்றும் ஆன்மீக நன்மைகளை அவர் உறுதிப்படுத்துகின்றன.\\n\\nஅவர் ஒரு ஆழமான ஆன்மீக சந்திப்பையும் பகிர்கிறார், இது பவுத்தர பரிசுத்த மன்னிப்புடன் தொடர்புடையது, இதில் இயேசு மரியாவை நம் ஆன்மீக தாயாக ஏற்றுக்கொள்வது மற்றும் நம்பிக்கையில் ஆழ்ந்த சேர்க்கையைப் பெறுவதின் முக்கியத்துவத்தை கற்பிக்கிறார். ஜோசியின் கதை மரியன் உடன்படிக்கை எப்படி சாதாரண வாழ்க்கையை கிருபை, வழிகாட்டுதல் மற்றும் அதிசய அனுகூலத்தால் மாற்றுகிறது என்பதைக் காட்டுகிறது.\\n\\nஜோமோல் எபிசோட்டை முடிக்கையில், பார்வையாளர்களை எல்லாம் நம்பிக்கையுடனும் உண்மையுடனும் மரியன் உடன்படிக்கையை ஏற்றுக்கொள்ள ஊக்குவிக்கிறார், அவர்கள் கிருபாசனம் மிஷனின் மூலம் தங்களுடைய வாழ்க்கையில் கடவுளின் அன்பான இருப்பும் அதிசயங்களும் அனுபவிக்க முடியும்.","te":"లివింగ్ ఓరాకిల్స్ రెండవ ఎపిసోడ్‌లో, జోమోల్ ప్రేక్షకులను హృదయపూర్వకంగా స్వాగతించి, మరియాన్ ఒప్పందం ద్వారా విశ్వాసం మరియు దివ్య ప్రకటన ప్రయాణాన్ని కొనసాగించాలని ఆహ్వానిస్తారు. ఈ ఎపిసోడ్‌లో కోజికోడు నుండి 55 ఏళ్ల భ్రాత జోసీ యొక్క శక్తివంతమైన సాక్ష్యం ఫోకస్ చేయబడింది, అతను క్రుపాసనంలో మరియాన్ ఒప్పందాన్ని తీసుకున్న తర్వాత తన అద్భుతమైన అనుభవాలను పంచుకుంటాడు.\\n\\nఅతని పరిమిత విద్య మరియు అర్హతలు ఉన్నప్పటికీ, జోసీ యూరోప్లో ఉద్యోగ అవకాశాన్ని, ప్రయాణానికి ఆర్థిక సాయం మరియు ముఖ్యమైన పత్రాలను సమయానికి పునరుద్ధరించుకోవడం వంటి అనుకోని దివ్య ఆశీర్వాదాలను పొందాడు — ఇవన్నీ సంప్రదాయ మార్గాల లేని విధంగా జరిగినవి. ఈ సంఘటనలు అతనికి ఒప్పందాన్ని విశ్వాసంతో జీవించడం వల్ల శారీరక మరియు ఆధ్యాత్మిక లాభాలు దృఢంగా నిరూపించాయి.\\n\\nఆయన పవిత్ర మిస్సాతో సంబంధం ఉన్న లోతైన ఆధ్యాత్మిక అనుభవాన్ని కూడా పంచుకుంటాడు, ఇక్కడ యేసు మన ఆధ్యాత్మిక తల్లి అయిన మేరీలీని ఆలింగనం చేయడం మరియు విశ్వాసంలో లోతైన సంఘటనా జీవితం గౌరవించడం ముఖ్యతను బోధిస్తాడు. జోసీ కథ మరియాన్ ఒప్పందం ఎలా సాధారణ జీవితాలను కృప, మార్గదర్శనం మరియు అద్భుత కృపలకు ద్వారాలు తెరుస్తుంది అనేది చూపిస్తుంది.\\n\\nజోమోల్ ఎపిసోడ్ ముగింపులో, Kreupasanam మిషన్ ద్వారా దేవుని ప్రేమాత్మక ఉనికి మరియు అద్భుతాలను తమ జీవితాలలో అనుభవించేందుకు అందరినీ విశ్వాసంతో మరియాన్ ఒప్పందాన్ని స్వీకరించాలని ప్రోత్సహిస్తారు.","fr":"Dans le 2ème épisode de Living Oracles, Jomol accueille chaleureusement les spectateurs pour poursuivre le chemin de la foi et de la révélation divine à travers l'Alliance Mariale. Cet épisode se concentre sur le témoignage puissant de Josy, un frère de 55 ans de Kozhikode, qui partage ses expériences miraculeuses après avoir pris l'Alliance Mariale à Kreupasanam.\\n\\nJosy raconte comment, malgré une éducation et des qualifications limitées, il a reçu des bénédictions divines inattendues, notamment une opportunité d'emploi en Europe, un soutien financier pour le voyage, et le renouvellement en temps voulu de documents importants — le tout sans moyens conventionnels. Ces événements lui ont confirmé les bienfaits tangibles physiques et spirituels de vivre fidèlement l'Alliance.\\n\\nIl partage également une rencontre spirituelle profonde liée à la Sainte Messe, où Jésus enseigne l'importance d'embrasser Marie comme notre mère spirituelle et de vivre en profonde communion dans la foi. L'histoire de Josy révèle comment l'Alliance Mariale transforme les vies ordinaires en ouvrant les portes de la grâce, de la guidance et de la faveur surnaturelle.\\n\\nJomol conclut l'épisode en encourageant tous les spectateurs à embrasser l'Alliance Mariale avec confiance et sincérité, afin d'expérimenter la présence aimante de Dieu et des miracles dans leur propre vie à travers la mission Kreupasanam.","es":"En el segundo episodio de Living Oracles, Jomol da una cálida bienvenida a los espectadores para continuar el viaje de fe y revelación divina a través del Pacto Mariano. Este episodio se centra en el poderoso testimonio de Josy, un hermano de 55 años de Kozhikode, quien comparte sus experiencias milagrosas después de tomar el Pacto Mariano en Kreupasanam.\\n\\nJosy relata cómo, a pesar de su educación y calificaciones limitadas, recibió bendiciones divinas inesperadas, incluyendo una oportunidad de trabajo en Europa, provisión financiera para viajar y la renovación oportuna de documentos importantes, todo sin medios convencionales. Estos eventos confirmaron para él los beneficios físicos y espirituales tangibles de vivir fielmente el Pacto.\\n\\nTambién comparte un profundo encuentro espiritual relacionado con la Santa Misa, donde Jesús enseña la importancia de abrazar a María como nuestra madre espiritual y vivir en profunda comunión en la fe. La historia de Josy revela cómo el Pacto Mariano transforma vidas ordinarias al abrir puertas a la gracia, la guía y el favor sobrenatural.\\n\\nJomol cierra el episodio animando a todos los espectadores a abrazar el Pacto Mariano con confianza y sinceridad, para experimentar la amorosa presencia y los milagros de Dios en sus propias vidas a través de la misión Kreupasanam.","mr":"लिव्हिंग ओरॅकल्सच्या दुसऱ्या भागात, जोमोल प्रेक्षकांचे मनापासून स्वागत करतो आणि मेरीअन कराराद्वारे श्रद्धा आणि दैवी प्रकटीकरणाच्या प्रवासास सुरू ठेवण्याचे आमंत्रण देतो. या भागात कोझिकोडमधील ५५ वर्षांच्या जोसी नावाच्या भावाच्या शक्तिशाली साक्षीवर लक्ष केंद्रित केले आहे, ज्याने कृपासनाममध्ये मेरीअन करार घेतल्यानंतर त्याच्या अद्भुत अनुभवांची शेअरिंग केली.\\n\\nजोसी सांगतो की, मर्यादित शिक्षण आणि पात्रता असूनही त्याला अनपेक्षित दैवी आशीर्वाद मिळाले, ज्यात युरोपमध्ये नोकरीची संधी, प्रवासासाठी आर्थिक मदत आणि महत्त्वाच्या दस्तऐवजांचे वेळेवर नूतनीकरण यांचा समावेश आहे — हे सगळं पारंपरिक मार्गांशिवाय घडले. या घटनांनी त्याला करार प्रामाणिकपणे पाळल्यामुळे शारीरिक आणि आध्यात्मिक फायद्यांची पुष्टी केली.\\n\\nतो पवित्र मिस्साशी संबंधित खोल आध्यात्मिक अनुभवही शेअर करतो, जिथे येशू मरीला आपल्या आध्यात्मिक आई म्हणून स्वीकारण्याचे आणि श्रद्धेमध्ये खोल सामंजस्याने जगण्याचे महत्त्व शिकवतो. जोसीची कथा मेरीअन करार कसा सामान्य जीवनाला कृपा, मार्गदर्शन आणि अलौकिक कृपेचे दरवाजे उघडून बदलतो हे दर्शवते.\\n\\nजोमोल एपिसोडचा समारोप करताना सर्व प्रेक्षकांना विश्वासाने आणि प्रामाणिकपणे मेरीअन करार स्वीकारण्याचे प्रोत्साहन देतो, जेणेकरून ते कृपासनाम मिशनद्वारे देवाच्या प्रेमळ उपस्थिती आणि चमत्कारांचा अनुभव घेऊ शकतील."},"subtitles":"/assets/oracles/oracles2.json"},{"id":3,"title":{"zh":"活的神谕 - 第3集","bn":"লিভিং ওরাকলস - পর্ব ৩","en":"Living ORACLES - Episode 3","hi":"लिविंग ओराकल्स - एपिसोड 3","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 3","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 3","fr":"Oracles Vivants - Épisode 3","es":"Oráculos Vivientes - Episodio 3","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೩","mr":"लिव्हिंग ओरॅकल्स - भाग 3"},"date":"May 18, 2025","video":"https://youtu.be/bOyHLCK2H-U?si=ZpvcWL-RFJ6R4kkC","content":{"en":"In this third episode of Living Oracles, Shalini from Thrissur shares her testimony of divine healing and the power of the Marian Covenant. Her child was born with a severe breathing issue that remained undiagnosed despite multiple tests and doctor visits. After much prayer and a personal revelation from Jesus, she learned that the healing would come when the child turned one and a half. Her husband visited Kreupasanam and took the Marian Covenant, and just as revealed, the child was completely healed within a month.\\n\\nShalini describes profound spiritual experiences, including a dream of reaching the Second Heaven, a vision of St. Joseph, and the Blessed Mother appearing in radiant blue light. The Blessed Mother expressed a desire for the anointing of Kreupasanam to spread to the whole world. Shalini also discovered biblical confirmation of her vision through Exodus 24:10, recognizing that those who live the Marian Covenant are part of a second heavenly state. Her journey deepened her understanding of divine grace and covenantal life.\\n\\nShe also shares moments of divine protection, including being alerted to a snake near her child and during her stay at Kreupasanam. Through trials like her child’s critical illness and hospital stay, she heard God’s comforting voice. Shalini testifies that the Marian Covenant brings renewal to the Church, inspires repentance, and strengthens faith. She encourages everyone to hold firmly to God and the Blessed Mother and to become witnesses of God’s great plan through the Marian Covenant.","hi":"लिविंग ओराकल्स के इस तीसरे एपिसोड में त्रिशूर की शालिनी अपने बच्चे की दिव्य चंगाई और मरियन वाचा की शक्ति की गवाही देती हैं। बच्चे को गंभीर सांस की समस्या थी जो कई परीक्षणों और डॉक्टरों से मिलने के बाद भी नहीं पहचानी गई। प्रार्थना और यीशु से निजी प्रकाशन के बाद, उन्हें पता चला कि चंगाई डेढ़ साल की उम्र में होगी। उनके पति ने क्रेउपासानम जाकर मरियन वाचा स्वीकार की, और जैसा प्रकट हुआ था, बच्चा एक महीने के भीतर पूरी तरह से चंगा हो गया।\\n\\nशालिनी गहरे आध्यात्मिक अनुभव साझा करती हैं जैसे कि दूसरे स्वर्ग तक पहुँचने का सपना, संत जोसेफ का दर्शन, और नीली ज्योति में प्रकट हुई धन्य माता की उपस्थिति। धन्य माता चाहती थीं कि क्रेउपासानम का अभिषेक पूरी दुनिया में फैले। शालिनी को अपने दर्शन की बाइबिल पुष्टि निर्गमन 24:10 में मिली और उन्होंने महसूस किया कि जो मरियन वाचा में जीवन जीते हैं, वे दूसरे स्वर्गीय राज्य का हिस्सा हैं। यह यात्रा उनके लिए अनुग्रह और वाचा के जीवन की गहरी समझ लेकर आई।\\n\\nवह ईश्वर की सुरक्षा के क्षणों को भी साझा करती हैं, जैसे अपने बच्चे के पास एक साँप की चेतावनी मिलना और क्रेउपासानम में रहने के दौरान दिव्य हस्तक्षेप। जब उनका बच्चा गंभीर रूप से बीमार था, तब उन्होंने ईश्वर की सांत्वना देने वाली आवाज़ सुनी। शालिनी गवाही देती हैं कि मरियन वाचा चर्च में नवजागरण लाती है, पश्चाताप को प्रेरित करती है और विश्वास को मजबूत करती है। वह सभी को परमेश्वर और धन्य माता को थामे रहने और ईश्वर की महान योजना के साक्षी बनने के लिए प्रोत्साहित करती हैं।","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 3-இல், திருச்சூரை சேர்ந்த ஷாலினி தன்னுடைய பிள்ளையின் தெய்வீக குணமடைதல் மற்றும் மரிய வாக்குறுதியின் சக்தியைப் பகிர்ந்து கொள்கிறார். பிறந்ததிலிருந்து பல சோதனைகள் மற்றும் மருத்துவரை சந்தித்தும் பிள்ளையின் கடுமையான சுவாச பிரச்சனை கண்டறியப்படவில்லை. ஜெபத்திற்குப் பிறகு, யேசுவிடமிருந்து ஒரு தனிப்பட்ட வெளிச்சத்திலிருந்து, பிள்ளை ஒன்பது மாதங்கள் ஆனபிறகு குணமாகும் என்று தெரிந்தது. அவருடைய கணவர் கிரெபுசனத்தில் மரிய வாக்குறுதியை எடுத்தார். மேலும் மாதத்திற்குள் பிள்ளை முழுமையாக குணமடைந்தது.\\n\\nஷாலினி ஒரு கனவில் இரண்டாவது பரலோகத்தை அடைந்த அனுபவம், புனித யோசேப்பின் தரிசனம் மற்றும் நீல ஒளியில் தோன்றிய தாயின் அபாரமான தோற்றம் உள்ளிட்ட ஆழமான ஆன்மீக அனுபவங்களை பகிர்கிறார். தாயார் கிரெபுசனம் ஆசீர்வாதம் உலகமெங்கும் பரவவேண்டும் என்று கூறினார். ஷாலினி வெளியீட்டு 24:10 வசனத்தின் மூலம் தனது தரிசனத்திற்கான திருவிவிலிய உறுதியை கண்டறிந்தார். மரிய வாக்குறுதியை வாழும் நபர்கள் இரண்டாவது பரலோக நிலையின் ஒரு பகுதியாக இருப்பதாக அவர் உணர்ந்தார்.\\n\\nபிள்ளையின் அருகே பாம்பு இருப்பதற்கான எச்சரிக்கை மற்றும் கிரெபுசனத்தில் தங்கியிருக்கும் போது ஏற்பட்ட பாதுகாப்பு அனுபவங்களை அவரும் பகிர்ந்துள்ளார். அவரது பிள்ளை மிகவும் மோசமாக இருந்தபோது, கடவுளின் ஆறுதல் குரலை அவர் கேட்டார். மரிய வாக்குறுதி திருச்சில் புதுப்பிப்பை கொண்டு வருகிறது, மனந்திரும்புவதை ஊக்குவிக்கிறது மற்றும் நம்பிக்கையை வலுப்படுத்துகிறது என அவர் கூறுகிறார். கடவுளையும், தாயாரையும் பற்றிக் கொள்வதன் மூலம் தேவ பாதையை அனைவரும் பின்பற்ற வேண்டும் என்று அவர் ஊக்குவிக்கிறார்.","te":"లివింగ్ ఓరాకిల్స్ యొక్క మూడవ ఎపిసోడ్‌లో త్రిశూర్‌కు చెందిన శాలిని తన బిడ్డకు జరిగిన దైవీయ స్వస్థత మరియు మరియన్ ఒడంబడిక శక్తి గురించి తన సాక్ష్యాన్ని పంచుకుంటుంది. పుట్టినప్పటి నుండే తీవ్రమైన శ్వాస సమస్యతో బాధపడుతున్న పిల్లకు అనేక పరీక్షలకైనా కూడా కారణం తేలలేదు. యేసు ద్వారా వచ్చిన వ్యక్తిగత ప్రకటనలతో, బిడ్డకు ఒకన్నర సంవత్సరాలు వచ్చినప్పుడు స్వస్థత కలుగుతుందని తెలుసుకున్నారు. ఆమె భర్త క్రెయుపాసనం వెళ్లి మరియన్ ఒడంబడిక తీసుకున్నారు. తరువాత నెలలో బిడ్డ పూర్తిగా కోలిపోయింది.\\n\\nశాలిని రెండవ పరలోకానికి చేరుకున్న కల, సెంట్ జోసెఫ్ దర్శనం మరియు నీలి కాంతిలో దర్శనమిచ్చిన మరిఅమ్మ గురించి చెప్పింది. మరిఅమ్మ కోరింది క్రమంగా ఈ అనుగ్రహం ప్రపంచం అంతటా వ్యాపించాలి. ఎగ్జోడస్ 24:10 ద్వారా శాలిని తన దర్శనానికి బైబిలు ఆధారం కనుగొంది మరియు మరియన్ ఒడంబడికలో జీవించే వారు రెండవ పరలోక స్థితికి చెందుతారని అర్థం చేసుకుంది.\\n\\nతన బిడ్డ పక్కన పాము ఉందని హెచ్చరిక మరియు క్రెయుపాసనంలో దివ్య రక్షణ అనుభవాలను ఆమె పంచుకుంది. తీవ్రమైన అనారోగ్యం సమయంలో దేవుని ఓదార్పు వాణిని ఆమె అనుభవించింది. శాలిని గూర్చి చెబుతుంది మరియన్ ఒడంబడిక చర్చి పునరుత్థానానికి, పశ్చాత్తాపానికి, విశ్వాస బలానికి మార్గం అని. ఆమె ప్రతి ఒక్కరినీ దేవుని మరియు మరిఅమ్మపై గట్టి పట్టుదలతో ఉండాలని మరియు దేవుని గొప్ప ప్రణాళికకు సాక్షులవ్వాలని ప్రోత్సహిస్తుంది.","mr":"लिव्हिंग ओरॅकल्सच्या या तिसऱ्या भागात, त्रिशूरच्या शालिनी तिच्या मुलाच्या चमत्कारी बरे होण्याची आणि मरियन कराराच्या शक्तीची साक्ष देते. तिच्या मुलाला जन्मताच गंभीर श्वसनाचा त्रास होता, जो अनेक वैद्यकीय तपासण्या करूनही निदान होऊ शकला नाही. प्रार्थनेनंतर आणि येशूकडून आलेल्या एक खास प्रकाशनातून, तिला कळले की मुलाचे बरे होणे त्याच्या दीड वर्षाचे वय झाल्यावर होईल. तिच्या पतीने क्रेउपासानाम येथे जाऊन मरियन करार घेतला आणि अगदी तसेच, महिन्याभरात मुलगा पूर्णपणे बरा झाला.\\n\\nशालिनीने तिचे अनेक आध्यात्मिक अनुभव शेअर केले — दुसऱ्या स्वर्गात पोहोचण्याचे स्वप्न, संत जोसेफचे दर्शन, आणि निळ्या प्रकाशात प्रकटलेली धन्य माता. धन्य माता म्हणाल्या की क्रेउपासानामचा अभिषेक संपूर्ण जगात पसरावा. शालिनीला तिच्या दर्शनाची पुष्टी निर्गम 24:10 मधून मिळाली आणि तिला समजले की मरियन करार जगणारे लोक दुसऱ्या स्वर्गीय अवस्थेचा भाग आहेत.\\n\\nतिने तिच्या मुलाजवळ साप दिसण्याबाबत देवाने दिलेली सूचना आणि क्रेउपासानाममधील सुरक्षा यांचे अनुभव शेअर केले. मुलाच्या आजारात देवाची आश्वासक वाणी तिने ऐकली. शालिनी सांगते की मरियन करार चर्चमध्ये नवजीवन आणतो, पश्चात्तापास प्रेरणा देतो, आणि श्रद्धा बळकट करतो. ती सर्वांना देव व धन्य मातेस घट्ट धरून राहण्याचे आणि देवाच्या महान योजनेचे साक्षीदार होण्याचे आवाहन करते.","bn":"লিভিং ওরাকলসের তৃতীয় পর্বে, ত্রিশূরের শালিনী তার সন্তানের অলৌকিক আরোগ্য এবং মারিয়ান চুক্তির শক্তি সম্পর্কে সাক্ষ্য দেন। তার সন্তান জন্মের পর থেকেই একটি গুরুতর শ্বাস-প্রশ্বাসজনিত সমস্যায় ভুগছিল, যা বহু পরীক্ষার পরও ধরা পড়েনি। প্রার্থনার মাধ্যমে এবং যীশুর কাছ থেকে একটি ব্যক্তিগত বার্তা পেয়ে, তিনি জানেন যে তার সন্তান দেড় বছর বয়সে সুস্থ হয়ে উঠবে। তার স্বামী ক্রেউপাসানামে গিয়ে মারিয়ান চুক্তি গ্রহণ করেন এবং এক মাসের মধ্যেই শিশু সম্পূর্ণরূপে সুস্থ হয়ে যায়।\\n\\nশালিনী বিভিন্ন আধ্যাত্মিক অভিজ্ঞতার বর্ণনা দেন, যেমন দ্বিতীয় স্বর্গে যাওয়ার স্বপ্ন, সেন্ট জোসেফের দর্শন এবং একটি উজ্জ্বল নীল আলোতে মাতার আবির্ভাব। মা চান যে ক্রেউপাসানামের এই আশীর্বাদ বিশ্বের মাঝে ছড়িয়ে পড়ুক। এক্সোডাস ২৪:১০ শাস্ত্রাংশের মাধ্যমে শালিনী তার দর্শনের পক্ষে বাইবেলিক প্রমাণ পান এবং উপলব্ধি করেন যে যারা মারিয়ান চুক্তিতে জীবনযাপন করেন তারা দ্বিতীয় স্বর্গীয় অবস্থার অংশ।\\n\\nতিনি আরও শেয়ার করেন কিভাবে ঈশ্বর তার সন্তানের কাছে একটি সাপ থাকার বিষয়ে সতর্ক করেছিলেন এবং কিভাবে ক্রেউপাসানামে ঈশ্বর তার পরিবারকে রক্ষা করেছিলেন। তার সন্তানের অসুস্থতার সময় ঈশ্বরের সান্ত্বনার কণ্ঠস্বর তিনি শুনেছিলেন। শালিনী সাক্ষ্য দেন যে মারিয়ান চুক্তি গির্জাকে নতুন করে জাগ্রত করে, পাপবোধে প্রেরণা জোগায় এবং বিশ্বাসকে শক্তিশালী করে। তিনি সবাইকে ঈশ্বর ও মাতার প্রতি দৃঢ় বিশ্বাস রাখতে এবং ঈশ্বরের মহাপরিকল্পনার সাক্ষী হতে উৎসাহিত করেন।","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಭಾಗ 3 ರಲ್ಲಿ ತ್ರಿಶೂರ್‌ನ ಶಾಲಿನಿ ತನ್ನ ಮಗುವಿನ ದೈವಿಕ ಗುಣಮುಖತೆ ಮತ್ತು ಮೆರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಶಕ್ತಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಜನನವಾಗುತ್ತಿದ್ದಂತೆ ಮಗುವಿಗೆ ತೀವ್ರ ಉಸಿರಾಟದ ಸಮಸ್ಯೆ ಇತ್ತು ಮತ್ತು ಹಲವು ವೈದ್ಯಕೀಯ ಪರೀಕ್ಷೆಗಳ ನಂತರವೂ ಕಾರಣ ಪತ್ತೆಯಾಗಲಿಲ್ಲ. ಪ್ರಾರ್ಥನೆಯ ನಂತರ ಯೇಸು ಅವರೊಂದಿಗೆ ವ್ಯಕ್ತಿಗತವಾಗಿ ಮಾತನಾಡಿದಂತೆ ಅವರು ತಿಳಿದುಕೊಂಡರು - ಮಗುವಿಗೆ ಒಂದು ಮತ್ತು ಅರ್ಧ ವರ್ಷವಾದಾಗ ಗುಣಮುಖತೆ ಸಂಭವಿಸುತ್ತದೆ. ಅವರ ಗಂಡನು ಕ್ರೆಉಪಾಸನಂಗೆ ಹೋಗಿ ಮೆರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ತೆಗೆದುಕೊಂಡರು. ಆವಿಷ್ಕಾರದಂತೆ, ಒಂದು ತಿಂಗಳೊಳಗೆ ಮಗುವು ಸಂಪೂರ್ಣವಾಗಿ ಗುಣಮುಖವಾಯಿತು.\\n\\nಶಾಲಿನಿಯವರು, ಎರಡನೇ ಸ್ವರ್ಗವನ್ನು ತಲುಪಿದ ಕನಸು, ಸಂತ ಯೋಸೇಫನ ದರ್ಶನ ಮತ್ತು ನೀಲ ಬೆಳಕಿನಲ್ಲಿ ಕಾಣಿಸಿಕೊಂಡ ಧನ್ಯ ಮಾತೆಯು ಸೇರಿದಂತೆ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವಗಳನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ. ಧನ್ಯ ತಾಯಿ ಈ ಕ್ರೆಉಪಾಸನಂ ಅನುಗ್ರಹವು ಜಗತ್ತಿನಾದ್ಯಂತ ಹರಡಬೇಕೆಂದು ಇಚ್ಛಿಸಿದರು. ಶಾಲಿನಿಯವರು ನಿರ್ಗಮನಾ 24:10ನ ಮೂಲಕ ತಮ್ಮ ದರ್ಶನಕ್ಕೆ ಬೈಬಲ್ ದೃಢೀಕರಣ ಕಂಡುಹಿಡಿದರು ಮತ್ತು ಮೆರಿಯನ್ ಒಡಂಬಡಿಕೆಯಲ್ಲಿ ಬದುಕುವವರು ಎರಡನೇ ಸ್ವರ್ಗದ ಸ್ಥಿತಿಗೆ ಸೇರಿದ್ದಾರೆ ಎಂಬ ಅರಿವು ಪಡೆದರು.\\n\\nಮಗುವಿನ ಬಳಿ ಹಾವು ಇರುವುದು ಎಂದು ದೇವರು ಎಚ್ಚರಿಸಿದ ಕ್ಷಣ ಮತ್ತು ಕ್ರೆಉಪಾಸನಂನಲ್ಲಿ ಅವರ ಸಮಯದಲ್ಲಿ ದೇವರ ರಕ್ಷಣೆದಾಯಕ ಅನುಭವವನ್ನು ಅವರು ಹಂಚಿಕೊಂಡಿದ್ದಾರೆ. ಮಗುವು ತೀವ್ರ ಅಸ್ವಸ್ಥವಾಗಿದ್ದಾಗ, ದೇವರ ಆರೈಕೆಯ ಧ್ವನಿ ಅವರು ಕೇಳಿದರು. ಮೆರಿಯನ್ ಒಡಂಬಡಿಕೆ ಚರ್ಚಿಗೆ ನವೀಕರಣವನ್ನು ತರುತ್ತದೆ, ಪಶ್ಚಾತ್ತಾಪಕ್ಕೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ ಮತ್ತು ನಂಬಿಕೆಯನ್ನು ಬಲಪಡಿಸುತ್ತದೆ ಎಂದು ಶಾಲಿನಿ ಹೇಳುತ್ತಾರೆ. ಎಲ್ಲರಿಗೂ ದೇವರನ್ನೂ, ಧನ್ಯ ಮಾತೆಯನ್ನೂ ಬಲವಾಗಿ ಹಿಡಿದಿಟ್ಟುಕೊಳ್ಳಿ ಮತ್ತು ಈ ಮಹಾ ಯೋಜನೆಗೆ ಸಾಕ್ಷಿಗಳಾಗಿ ನಿಲ್ಲಿ ಎಂಬುದಾಗಿ ಅವರು ಪ್ರೇರೇಪಿಸುತ್ತಾರೆ.","zh":"在《活的神谕》第三集中，来自特里苏尔的 Shalini 分享了她孩子被神奇治愈的见证，以及玛利亚圣约的力量。她的孩子出生后有严重的呼吸问题，尽管多次检查和就医仍未确诊。经过多次祈祷并从耶稣那里获得个人启示，她得知孩子将在一岁半时痊愈。她的丈夫前往克勒帕萨南并接受了玛利亚圣约，正如启示中所说，孩子在一个月内完全康复。\\n\\nShalini 描述了深刻的属灵经历，包括梦见进入第二天堂、看见圣若瑟，以及圣母以闪耀蓝光显现。圣母表达了希望克勒帕萨南的恩膏传播到全世界的愿望。Shalini 也通过出埃及记 24:10 找到她异象的圣经依据，意识到活出玛利亚圣约的人正生活在第二重天堂的状态中。\\n\\n她还分享了神的保护时刻，包括有人提醒她孩子身边有蛇，以及她在克勒帕萨南停留期间的神圣保护。在孩子生病住院的痛苦时期，她听到了神安慰的声音。Shalini 见证玛利亚圣约为教会带来复兴、激发悔改并加强信仰。她鼓励所有人坚守上主和圣母，成为神圣计划的见证人。"},"subtitles":"/assets/oracles/oracles3.json"},{"id":4,"title":{"zh":"活的神谕 - 第4集","bn":"লিভিং ওরাকলস - পর্ব ৪","en":"Living ORACLES - Episode 4","hi":"लिविंग ओराकल्स - एपिसोड 4","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 4","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 4","fr":"Oracles Vivants - Épisode 4","es":"Oráculos Vivientes - Episodio 4","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೪","mr":"लिव्हिंग ओरॅकल्स - भाग 4"},"date":"May 25, 2025","video":"https://youtu.be/dB32mq5gsbo?si=uz6Iyxmq6_kwR9Yd","content":{"zh":"在《活的神谕》第四集中，主持人Jomol热情欢迎观众进入一个充满恩典的事工，分享强有力的真实见证。本集中重点介绍了来自Wayanad的Sujatha Lobo的见证，她接受了克鲁帕萨南的圣母盟约，经历了深刻的灵性祝福。通过信心和承诺，她获得了奇迹般的治愈、神圣的指引，并被召唤携带象征圣母邀请的特别玫瑰经参加阿坎达珠宝玛拉集会。\\n\\n本集还展示了Sujatha关于在自然灾害袭击她所在地区前收到的神圣警告和紧急祈祷呼召的叙述。强调悔改和代祷，她的见证包括与克鲁帕萨南圣母显现相关的异象，强调通过个人见证和在克鲁帕萨南祝福的圣物传播福音的重要性。\\n\\n最后，本集反思了圣母盟约作为成为基督新娘的圣洁之路的深层灵性意义。鼓励信徒通过慈善行为和传教工作忠实生活，接受新的恩膏和恩典，成为天堂的器皿。节目以为持续忠诚、天上的奥秘和顺服神旨的祈祷结束。","bn":"লিভিং ওরাকলসের চতুর্থ পর্বে, মঞ্চস্থকারী জোমল দর্শকদের আন্তরিকভাবে স্বাগত জানান এক অনুগ্রহপূর্ণ মন্ত্রণায়, যেখানে শক্তিশালী জীবন্ত সাক্ষ্যবাণী শেয়ার করা হয়। এই পর্বে ওয়ায়ানাদের সুজাতা লোবোর সাক্ষ্য তুলে ধরা হয়েছে, যিনি ক্রেপাসানামে মারিয়ান কভেন্যান্ট গ্রহণ করেছেন এবং গভীর আধ্যাত্মিক আশীর্বাদ পেয়েছেন। তাঁর বিশ্বাস ও অঙ্গীকারের মাধ্যমে, তিনি অলৌকিক সেবন, ঐশ্বরিক নির্দেশনা লাভ করেন এবং বিশেষ একটি রোজারি নিয়ে আখন্ড জপমালা র‌্যালিতে অংশগ্রহণের আহ্বান পান, যা বর্বর মা’র নিমন্ত্রণের প্রতীক।\\n\\nএই পর্বে সুজাতার বর্ণনা আছে প্রাকৃতিক দুর্যোগের আগে প্রাপ্ত ঐশ্বরিক সতর্কতা ও প্রার্থনার আহ্বান সম্পর্কে। তোপ-তাপা ও আন্তরিক প্রার্থনার গুরুত্ব জোর দেয়া হয়েছে। তাঁর সাক্ষ্য ক্রেপাসানামের মারিয়ান অভিষেকের সাথে সংযুক্ত দর্শন অন্তর্ভুক্ত করে এবং ব্যক্তিগত সাক্ষ্য ও ক্রেপাসানামে আশীর্বাদপ্রাপ্ত পবিত্র বস্তুসমূহের মাধ্যমে গসপেল প্রচারের গুরুত্ব তুলে ধরে।\\n\\nপরিশেষে, এই পর্ব মারিয়ান কভেন্যান্টের গভীর আধ্যাত্মিক অর্থ সম্পর্কে আলোচনা করে, যা খ্রিষ্টের বর্বর হতে যাওয়ার পথ। বিশ্বাসীদের করুণা ও মিশনারি কর্মের মাধ্যমে বিশ্বস্ত জীবন যাপনের জন্য উৎসাহিত করা হয়েছে, নতুন অনয়ন এবং অনুগ্রহ গ্রহণের জন্য যাতে তাঁরা স্বর্গীয় হাতিয়ার হয়ে উঠতে পারেন। পর্বটি অবিরত বিশ্বস্ততা, স্বর্গীয় রহস্য এবং ঈশ্বরের ইচ্ছার প্রতি খোলা মন রাখার জন্য প্রার্থনা দিয়ে শেষ হয়।","en":"In the fourth episode of Living Oracles, host Jomol warmly welcomes viewers to a grace-filled ministry sharing powerful living testimonies. This episode highlights the testimony of Sujatha Lobo from Wayanad, who embraced the Marian Covenant at Kreupasanam and experienced profound spiritual blessings. Through her faith and commitment, she received miraculous healing, divine guidance, and was called to participate in the Akhanda Japamala Rally with a special rosary symbolizing the Blessed Mother’s invitation.\\n\\nThe episode also presents Sujatha’s account of a divine warning and urgent call to prayer before devastating natural disasters struck her region. Emphasizing repentance and intercession, her testimony includes visions connected to the Marian apparitions at Kreupasanam and underlines the importance of evangelization through personal witness and sacred objects blessed at Kreupasanam.\\n\\nFinally, the episode reflects on the deeper spiritual significance of the Marian Covenant as a path to becoming worthy of the Bride of Christ. It encourages believers to live faithfully with works of mercy and missionary outreach, receiving a fresh anointing and grace to become instruments of Heaven. The episode closes with prayers for continued faithfulness, heavenly mysteries, and openness to God’s will.","hi":"लिविंग ओराकल्स के चौथे एपिसोड में, होस्ट जोमोल दर्शकों का हार्दिक स्वागत करते हैं एक कृपा से परिपूर्ण मंत्रालय में, जहां शक्तिशाली जीवंत गवाहियाँ साझा की जाती हैं। इस एपिसोड में वायनाड की सुजाता लोबो की गवाही को उजागर किया गया है, जिन्होंने क्रेपासनम में मेरीअन कॉवेनेंट को अपनाया और गहरे आध्यात्मिक आशीर्वाद प्राप्त किए। अपनी आस्था और प्रतिबद्धता के माध्यम से, उन्होंने चमत्कारिक उपचार, दैवीय मार्गदर्शन प्राप्त किया और आखंड जपमाला रैली में भाग लेने के लिए बुलाए गए, जहाँ विशेष माला पवित्र माता के निमंत्रण का प्रतीक थी।\\n\\nयह एपिसोड प्राकृतिक आपदाओं के आने से पहले सुजाता द्वारा प्राप्त दिव्य चेतावनी और प्रार्थना के तत्काल आह्वान को भी प्रस्तुत करता है। पश्चाताप और मध्यस्थता पर जोर देते हुए, उनकी गवाही में क्रेपासनम में मेरीअन अपीयरेंस से जुड़े दृष्टांत शामिल हैं और व्यक्तिगत गवाही और पवित्र वस्तुओं के माध्यम से सुसमाचार प्रचार के महत्व को रेखांकित किया गया है।\\n\\nअंत में, यह एपिसोड मेरीअन कॉवेनेंट के गहरे आध्यात्मिक महत्व पर विचार करता है, जो मसीह की दुल्हन बनने के मार्ग के रूप में है। यह विश्वासी लोगों को दया के कार्यों और मिशनरी सेवा के साथ निष्ठापूर्वक जीवन जीने, नई अभिषेक और कृपा प्राप्त करने के लिए प्रोत्साहित करता है ताकि वे स्वर्ग के उपकरण बन सकें। एपिसोड प्रार्थनाओं के साथ समाप्त होता है, जो निरंतर निष्ठा, स्वर्गीय रहस्यों और ईश्वर की इच्छा के प्रति खुलेपन के लिए हैं।","ta":"லிவிங் ஓரகில்ஸ் நான்காவது எபிசோட்டில், தொகுப்பாளரான ஜோமோல் பார்வையாளர்களை பரிசுத்தமான மற்றும் கிருபை நிறைந்த சேவையில் அன்புடன் வரவேற்கிறார். இந்த எபிசோட்டில், வையாநாடு வாழ்ந்த ஸுஜாதா லோபோவின் சாட்சி காணப்படுகின்றது, அவர் கிரேபசானத்தில் மரியன் உடன்படிக்கையை ஏற்றுக் கொண்டு ஆழமான ஆன்மீக ஆசீர்வாதங்களை அனுபவித்தார். அவரது விசுவாசம் மற்றும் அர்ப்பணிப்பின் மூலம், அவர் அதிசயமான குணமடைதல், தெய்வீக வழிகாட்டல் பெற்றார் மற்றும் சிறப்பு ரோஜரி கொண்டு அக்கண்ட ஜபமாலா பேரணியில் கலந்து கொள்வதற்கு அழைக்கப்பட்டார், இது பார்வதியின் அழைப்பின் அடையாளமாகும்.\\n\\nஇந்த எபிசோட், இயற்கை பேரழிவுகளுக்கு முன்பு ஸுஜாதா பெற்ற தெய்வீக எச்சரிக்கை மற்றும் ஆழ்ந்த பிரார்த்தனை அழைப்பை வெளிப்படுத்துகிறது. பாவமீட்பு மற்றும் மத்தியில் நிற்குதலின் முக்கியத்துவத்தை வலியுறுத்தி, அவரது சாட்சி கிரேபசானத்தில் மரியன் தோற்றங்களுடன் தொடர்புடைய காட்சி அனுபவங்களை உள்ளடக்கியது மற்றும் தனிப்பட்ட சாட்சியமும் கிரேபசானத்தில் ஆசீர்வதிக்கப்பட்ட புனித பொருட்களும் மூலம் நற்செய்தி பரப்பலின் அவசியத்தை வலியுறுத்துகிறது.\\n\\nஇறுதியில், இந்த எபிசோட் மரியன் உடன்படிக்கை ஆழமான ஆன்மீக பொருளை, கிறிஸ்துவின் மணப்பெண்ணாக ஆகும் பாதையாகக் குறிக்கிறது. அதுவே விசுவாசிகளை கருணையின் செயல்கள் மற்றும் பண்பாடு பரப்பலுடன் ஒத்துழைத்து, புதிய அர்ப்பணிப்பையும் கிருபையையும் பெறும் வகையில் ஊக்குவிக்கிறது, மேலும் அவர்கள் சொர்க்கத்தின் கருவிகளாக மாறலாம். இந்த எபிசோட் தொடர்ந்த விசுவாசத்திற்கும் சொர்க்க ரகசியங்களுக்கும் மற்றும் கடவுளின் விருப்பத்திற்கு திறந்த உள்ளத்திற்கும் பிரார்த்தனையுடன் நிறைவடைகிறது.","te":"లివింగ్ ఓరాకిల్స్ నాలుగవ ఎపిసోడ్‌లో, ఆతిథ్యుడు జొమోల్ దర్శకులను దయతో నిండిన మంత్రిత్వక కార్యానికి హృదయపూర్వకంగా స్వాగతిస్తారు, ఇక్కడ శక్తివంతమైన ప్రత్యక్ష సాక్ష్యాలు పంచబడుతున్నాయి. ఈ ఎపిసోడ్‌లో, వయనాడ్ నుంచి సుజాతా లోబో గారి సాక్ష్యాన్ని హైలైట్ చేస్తారు, ఆమె క్రేపసనంలో మారియన్ ఒప్పందాన్ని ఆమోదించి లోతైన ఆధ్యాత్మిక ఆశీర్వాదాలను పొందారు. తన విశ్వాసం మరియు కట్టుబాటుతో, ఆమె అద్భుతమైన స్వస్థత, దివ్య మార్గదర్శనం పొందారు మరియు బహుమానమైన రోసరీతో అఖండ జపమాల ర్యాలీలో పాల్గొనమని పిలవబడారు, ఇది ఆశీర్వచించిన తల్లి దేవి ఆహ్వానాన్ని సూచిస్తుంది.\\n\\nఈ ఎపిసోడ్ కూడా వందనాలు మరియు మద్ధతు మీద దృష్టి పెట్టి, ప్రళయకాల మునుపు సుజాతా స్వీకరించిన దివ్య హెచ్చరిక మరియు అత్యవసర ప్రార్థన ఆహ్వానాన్ని అందిస్తుంది. ఆమె సాక్ష్యంలో క్రేపసనంలో మారియన్ ప్రత్యక్షదృశ్యాలకు సంబంధించిన దృశ్యాలు ఉంటాయి మరియు వ్యక్తిగత సాక్ష్యం మరియు క్రేపసనంలో ఆశీర్వచించబడిన పవిత్ర వస్తువుల ద్వారా సువార్త ప్రచార మహత్యాన్ని పేర్కొంటుంది.\\n\\nచివరగా, ఈ ఎపిసోడ్ మారియన్ ఒప్పందం లోతైన ఆధ్యాత్మిక ప్రాధాన్యతను ప్రతిబింబిస్తుంది, ఇది క్రీస్తు దంపతులైన సన్నద్ధతకు మార్గం. ఇది విశ్వాసులను దయాసహిత కార్యాలు మరియు మిషనరీ పనులతో విశ్వాసపూర్వకంగా జీవించమని ప్రోత్సహిస్తుంది, కొత్త అనయనం మరియు కృపను పొంది స్వర్గీయ పరికరాలుగా మారటానికి. ఈ ఎపిసోడ్ నిరంతర విశ్వాసం, ఆకాశ రహస్యాలు, మరియు దేవుని ఇష్టానికి తెరవెనుకగా ఉండేందుకు ప్రార్థనలతో ముగుస్తుంది.","fr":"Dans le quatrième épisode de Living Oracles, l’animatrice Jomol accueille chaleureusement les spectateurs dans un ministère rempli de grâce, partageant de puissants témoignages vivants. Cet épisode met en lumière le témoignage de Sujatha Lobo de Wayanad, qui a embrassé l’Alliance Mariale à Kreupasanam et a vécu de profondes bénédictions spirituelles. Par sa foi et son engagement, elle a reçu une guérison miraculeuse, une guidance divine, et a été appelée à participer au Rallye Akhanda Japamala avec un chapelet spécial symbolisant l’invitation de la Sainte Mère.\\n\\nL’épisode présente également le récit de Sujatha concernant un avertissement divin et un appel urgent à la prière avant que des catastrophes naturelles dévastatrices ne frappent sa région. En insistant sur la repentance et l’intercession, son témoignage inclut des visions liées aux apparitions mariales à Kreupasanam et souligne l’importance de l’évangélisation à travers le témoignage personnel et les objets sacrés bénis à Kreupasanam.\\n\\nEnfin, l’épisode réfléchit à la signification spirituelle profonde de l’Alliance Mariale comme chemin pour devenir digne de la Mariée du Christ. Il encourage les croyants à vivre fidèlement avec des œuvres de miséricorde et un engagement missionnaire, recevant une nouvelle onction et grâce pour devenir des instruments du Ciel. L’épisode se termine par des prières pour une fidélité continue, des mystères célestes, et une ouverture à la volonté de Dieu.","es":"En el cuarto episodio de Living Oracles, la anfitriona Jomol da una cálida bienvenida a los espectadores a un ministerio lleno de gracia que comparte poderosos testimonios vivos. Este episodio destaca el testimonio de Sujatha Lobo de Wayanad, quien abrazó el Pacto Mariano en Kreupasanam y experimentó profundas bendiciones espirituales. A través de su fe y compromiso, recibió sanación milagrosa, guía divina y fue llamada a participar en el Rally Akhanda Japamala con un rosario especial que simbolizaba la invitación de la Santísima Madre.\\n\\nEl episodio también presenta el relato de Sujatha sobre una advertencia divina y un llamado urgente a la oración antes de que desastres naturales devastadores azotaran su región. Enfatizando el arrepentimiento y la intercesión, su testimonio incluye visiones conectadas con las apariciones marianas en Kreupasanam y subraya la importancia de la evangelización a través del testimonio personal y los objetos sagrados bendecidos en Kreupasanam.\\n\\nFinalmente, el episodio reflexiona sobre el significado espiritual más profundo del Pacto Mariano como camino para volverse digno de la Novia de Cristo. Anima a los creyentes a vivir fielmente con obras de misericordia y trabajo misionero, recibiendo una unción fresca y gracia para convertirse en instrumentos del Cielo. El episodio cierra con oraciones por la fidelidad continua, los misterios celestiales y la apertura a la voluntad de Dios.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್‌ನ ನಾಲ್ಕನೇ ಕಂತಿನಲ್ಲಿ, ನಿರೂಪಕ ಜೋಮೋಲ್ ದೃಶಕರನ್ನು ಕೃಪೆಯಿಂದ ತುಂಬಿದ ಸೇವೆಗೆ ಹೃತ್ಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತಾರೆ, ಇಲ್ಲಿ ಶಕ್ತಿ ಪೂರಿತ ಜೀವಂತ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ. ಈ ಕಂತುದಲ್ಲಿ ವ್ಯಾನಾಡ್‌ನ ಸುಜತಾ ಲೋಬೋ ಅವರ ಸಾಕ್ಷ್ಯವನ್ನು ಹೈಲೈಟ್ ಮಾಡಲಾಗಿದೆ, ಅವರು ಕ್ರೇಪಸನಂನಲ್ಲಿ ಮರಿಯನ್ ಒಪ್ಪಂದವನ್ನು ಸ್ವೀಕರಿಸಿ ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಆಶೀರ್ವಾದಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ. ತಮ್ಮ ನಂಬಿಕೆ ಮತ್ತು ಬದ್ಧತೆಯಿಂದ, ಅವರು ಅದ್ಭುತ ಆರೋಗ್ಯ, ದಿವ್ಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ಪಡೆದಿದ್ದಾರೆ ಮತ್ತು ಆಶೀರ್ವಚಿಸಿದ ತಾಯಿಯ ಆಹ್ವಾನವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ವಿಶೇಷ ರೋಜರಿೊಂದಿಗೆ ಅಖಂಡ ಜಪಮಾಲಾ ರ್ಯಾಲಿಯಲ್ಲಿ ಭಾಗವಹಿಸಲು ಕರೆದಿದ್ದಾರೆ.\\n\\nಈ ಕಂತು ಕೂಡಾ ಸುಜತಾದ ದಿವ್ಯ ಎಚ್ಚರಿಕೆ ಮತ್ತು ಪ್ರಾರ್ಥನೆಗಾಗಿ ತುರ್ತು ಆಹ್ವಾನವನ್ನು ನೀಡುತ್ತದೆ, ಇದು ಅವಳ ಪ್ರದೇಶಕ್ಕೆ ಹಾನಿಕಾರಕ ಪ್ರಾಕೃತಿಕ ವಿಪತ್ತುಗಳಾದ ಮುನ್ನಾಗಿಯೇ ಬಂದಿತು. ಪಶ್ಚಾತ್ತಾಪ ಮತ್ತು ಮಧ್ಯಸ್ಥಿಕೆ ಮೇಲೆ ಒತ್ತು ನೀಡುತ್ತ, ಅವಳ ಸಾಕ್ಷ್ಯವು ಕ್ರೇಪಸನಂನಲ್ಲಿ ಮರಿಯನ್ ದರ್ಶನಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ದೃಶ್ಯಗಳನ್ನು ಒಳಗೊಂಡಿದೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸಾಕ್ಷ್ಯ ಮತ್ತು ಕ್ರೇಪಸನಂನಲ್ಲಿ ಆಶೀರ್ವಚಿಸಿದ ಪವಿತ್ರ ವಸ್ತುಗಳ ಮೂಲಕ ಸುಸಂವರ್ತನೆಯ ಮಹತ್ವವನ್ನು ಒತ್ತಿಹೇಳುತ್ತದೆ.\\n\\nಕೊನೆಯದಾಗಿ, ಈ ಕಂತು ಮರಿಯನ್ ಒಪ್ಪಂದದ ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವವನ್ನು ಪರಿಗಣಿಸುತ್ತದೆ, ಇದು ಕ್ರಿಸ್ತನ ವರನಾಗುವ ಮಾರ್ಗವಾಗಿದೆ. ಇದು ನಂಬಿಕಸ್ಥರನ್ನು ಕರುಣೆಯ ಕಾರ್ಯಗಳು ಮತ್ತು ಮಿಷನರಿ ಸೇವೆಗಳಲ್ಲಿ ನಿಷ್ಠೆಯಿಂದ ಬದುಕಲು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತದೆ, ಹೊಸ ಆಶೀರ್ವಾದ ಮತ್ತು ಕೃಪೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ಸ್ವರ್ಗದ ಉಪಕರಣಗಳಾಗಿ ಆಗಲು. ಕಂತು ನಿರಂತರ ನಿಷ್ಠೆ, ಸ್ವರ್ಗೀಯ ರಹಸ್ಯಗಳು ಮತ್ತು ದೇವರ ಇಚ್ಛೆಗೆ ತೆರೆಯಲಾದ ಮನಸ್ಸಿಗಾಗಿ ಪ್ರಾರ್ಥನೆಗಳೊಂದಿಗೆ ಮುಕ್ತಾಯಗೊಳ್ಳುತ್ತದೆ.","mr":"लिव्हिंग ओरॅकल्सच्या चौथ्या भागात, होस्ट जोमोल प्रेक्षकांचे मनापासून स्वागत करतात एका कृपेने परिपूर्ण मंत्रालयात, जेथे शक्तिशाली जीवंत साक्ष्ये शेअर केली जातात. या भागात वायनाडच्या सुजाता लोबो यांचे साक्षात्कार अधोरेखित केले गेले आहेत, ज्यांनी क्रेपसणाम येथे मेरीअन करार स्वीकारला आणि गहन आध्यात्मिक आशीर्वाद अनुभवले. त्यांच्या श्रद्धा आणि बांधिलकीमुळे, त्यांना चमत्कारी उपचार, दैवी मार्गदर्शन मिळाले आणि त्यांना खास रोजरीसह अखंड जपमाळा रॅलीमध्ये सहभागी होण्यासाठी बोलावण्यात आले, ज्यामुळे पवित्र आईच्या आमंत्रणाचा प्रतीक दर्शविला जातो.\\n\\nहा भाग सुजाताच्या दैवी इशाऱ्यांचा आणि प्रार्थनेसाठी तातडीच्या आवाहनाचा देखील आढावा घेतो, ज्यामुळे तिच्या भागावर प्रचंड नैसर्गिक आपत्ती येण्यापूर्वीचा काळ सूचित होतो. पश्चात्ताप आणि मध्यस्थतेवर भर देत, तिच्या साक्ष्यामध्ये क्रेपसणाममधील मेरीअन दर्शनाशी संबंधित दृष्टींना समाविष्ट केले आहे आणि वैयक्तिक साक्षी आणि क्रेपसणाममध्ये आशीर्वादित पवित्र वस्तूंच्या माध्यमातून सुसमाचार प्रचाराचे महत्त्व अधोरेखित केले आहे.\\n\\nशेवटी, हा भाग मेरीअन कराराच्या खोल आध्यात्मिक अर्थावर विचार करतो, जो ख्रिस्ताच्या नवरी होण्याच्या मार्गावर आहे. तो श्रद्धाळूंना करुणेच्या कार्यांनी आणि मिशनरी कामांनी निष्ठेने जीवन जगण्यास प्रोत्साहित करतो, नवीन अभिषेक आणि कृपा मिळवून स्वर्गाचे साधन बनण्यासाठी. हा भाग सातत्यपूर्ण निष्ठा, स्वर्गीय रहस्ये आणि देवाच्या इच्छेसाठी खुलेपणासाठी प्रार्थनांनी समाप्त होतो."},"subtitles":"/assets/oracles/oracles4.json"},{"id":5,"title":{"zh":"活的神谕 - 第5集","bn":"লিভিং ওরাকলস - পর্ব ৫","en":"Living ORACLES - Episode 5","hi":"लिविंग ओराकल्स - एपिसोड 5","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 5","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 5","fr":"Oracles Vivants - Épisode 5","es":"Oráculos Vivientes - Episodio 5","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೫","mr":"लिव्हिंग ओरॅकल्स - भाग 5"},"date":"June 1, 2025","video":"https://youtu.be/MetSbV5wToM?si=XYhW6m4qxI084MMs","content":{"zh":"在《活的神谕》第五集中，乔莫尔热情欢迎观众进入一个以玛利亚盟约和神圣恩典为中心的祷告与反思空间。\\n\\n本集重点讲述了来自美国休斯顿的拉莉·约瑟夫的感人见证，她分享了签订玛利亚盟约后生活的深刻转变。她讲述了两个重要经历：签约后90天内解决了一个棘手的地产纠纷，以及关于她姐姐神秘去世的故事，经过坚持祈祷，得到了姐姐平安升天的神圣确认。\\n\\n拉莉描述了坚定祈祷的力量，活人和逝者代祷的重要性，以及圣母慈悲的中保如何在试炼中带来医治与安慰。\\n\\n乔莫尔反思了圣经中关于天国荣耀与代祷的教导，强调我们在世上获得的恩典决定了我们在天上的影响力。本集鼓励信徒坚持祷告，加深对玛利亚盟约的承诺，并信赖圣母慈爱的引导，为基督的再来做好准备。","bn":"লিভিং ওরাকলস-এর পঞ্চম পর্বে, জোমল দর্শকদের আন্তরিক আমন্ত্রণ জানাচ্ছেন একটি পবিত্র প্রার্থনা এবং প্রতিফলনের স্থানে, যেখানে মেরিয়ান চুক্তি এবং ঈশ্বরের করুণা কেন্দ্রীয় বিষয়।\\n\\nএই পর্বে যুক্তরাষ্ট্রের হিউস্টন থেকে লালি জোসেফের শক্তিশালী সাক্ষ্য উপস্থাপন করা হয়েছে, যিনি তার জীবন কীভাবে মেরিয়ান চুক্তি নেওয়ার পর পরিবর্তিত হয়েছে তা শেয়ার করেছেন। তিনি দুটি গুরুত্বপূর্ণ অভিজ্ঞতার কথা জানান: চুক্তি নেওয়ার ৯০ দিনের মধ্যে একটি সম্পত্তি বিরোধ সমাধান এবং তার বোনের রহস্যময় মৃত্যুর ঘটনা, যা ধৈর্যশীল প্রার্থনার মাধ্যমে বোনের শান্তিপূর্ণ স্বর্গारोहনের নিশ্চিতকরণ পায়।\\n\\nলালি দৃঢ় প্রার্থনার শক্তি, জীবিত ও মৃতের জন্য মধ্যস্থতা এবং দয়ালু মারিয়ার মধ্যস্থতার মাধ্যমে চিকিৎসা ও সান্ত্বনার কথা বর্ণনা করেছেন।\\n\\nজোমল বাইবেলের শিক্ষাগুলো প্রতিফলিত করেছেন যেখানে স্বর্গীয় গৌরব এবং মধ্যস্থতা নিয়ে কথা বলা হয়েছে, এবং জোর দিয়েছেন যে পৃথিবীতে প্রাপ্ত করুণা আমাদের স্বর্গীয় প্রভাব নির্ধারণ করে। পর্বটি বিশ্বাসীদের উৎসাহ দেয় প্রার্থনায় স্থির থাকার, মেরিয়ান চুক্তিতে আরও নিবেদন বাড়ানোর এবং মেরিয়ের দয়ালু পথনির্দেশনায় বিশ্বাস রাখার জন্য যেন তারা খ্রিষ্টের প্রত্যাবর্তনের জন্য প্রস্তুত হতে পারে।","en":"In the 5th episode of Living Oracles, Jomol warmly welcomes viewers into a sacred space of prayer and reflection centered on the Marian Covenant and the profound testimonies of divine grace and protection.\\n\\nThe episode features the moving testimony of Lali Joseph from Houston, USA, who shares how her life was deeply transformed after taking the Marian Covenant. She recounts two significant experiences: the resolution of a difficult property dispute within 90 days of the covenant, and a heartfelt story about her sister’s mysterious passing, followed by persistent prayer and a divine message confirming her sister’s peaceful transition to heaven.\\n\\nLali describes the power of steadfast prayer, the importance of interceding for both the living and the departed, and the Blessed Mother’s compassionate mediation that brought healing and reassurance during times of trial.\\n\\nJomol reflects on scriptural teachings about heavenly glory and intercession, emphasizing that the grace we earn on earth determines our influence in heaven. The episode encourages believers to remain faithful in prayer, deepen their commitment to the Marian Covenant, and trust in the Blessed Mother’s loving guidance as they prepare for Christ’s return.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಐದನೇ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತು ದೈವಿಕ ಕೃಪೆ ಮತ್ತು ರಕ್ಷಣೆಯ ಪ್ರಬಲ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಕೇಂದ್ರೀಕರಿಸಿದ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಚಿಂತನೆಯ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತಾರೆ.\\n\\nಈ ಕಂತು ಯುಎಸ್‌ಎ‌ನ ಹ್ಯೂಸ್ಟನ್‌ನಿಂದ ಲಾಲಿ ಜೋಸೆಫ್ ಅವರ ಪ್ರೇರಣಾದಾಯಕ ಸಾಕ್ಷ್ಯವನ್ನು ಒಳಗೊಂಡಿದೆ, ಅವರು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ತೆಗೆದುಕೊಂಡ ನಂತರ ತಮ್ಮ ಜೀವನ ಹೇಗೆ ಆಳವಾಗಿ ಪರಿವರ್ತಿತವಾಯಿತು ಎಂದು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಒಡಂಬಡಿಕೆಯಿಂದ ೯೦ ದಿನಗಳಲ್ಲಿ ಕಠಿಣ ಆಸ್ತಿ ವಿವಾದದ ಪರಿಹಾರ ಮತ್ತು ಅವರ ಸಹೋದರಿಯ ರಹಸ್ಯಮಯ ಸಾವಿನ ಕುರಿತ ಹೃದಯಸ್ಪರ್ಶಿ ಕಥೆಯನ್ನು ವಿವರಿಸುತ್ತಾರೆ, ಅದರ ನಂತರ ನಿರಂತರ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಸಹೋದರಿಯ ಶಾಂತಿಕರ ಪರಲೋಕ ಪ್ರವೇಶವನ್ನು ದೃಢೀಕರಿಸುವ ದೈವಿಕ ಸಂದೇಶ ದೊರಕಿತು.\\n\\nಲಾಲಿ ಸ್ಥಿರವಾದ ಪ್ರಾರ್ಥನೆಯ ಶಕ್ತಿ, ಜೀವಂತ ಮತ್ತು ಪಾರಲೋಕಸ್ಥರಿಗಾಗಿ ಮಧ್ಯಸ್ಥಿತೆಯ ಮಹತ್ವ ಮತ್ತು ತೊಂದರೆ ಸಮಯದಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಭರವಸೆ ತಂದುಕೊಟ್ಟ ಆಶೀರ್ವದಿತ ತಾಯಿಯ ದಯಾಳು ಮಧ್ಯಸ್ಥಿಕೆಯನ್ನು ವರ್ಣಿಸುತ್ತಾರೆ.\\n\\nಜೋಮೋಲ್ ಸ್ವರ್ಗೀಯ ಮಹಿಮೆ ಮತ್ತು ಮಧ್ಯಸ್ಥಿಕೆಯ ಕುರಿತು ಧಾರ್ಮಿಕ ಬೋಧನೆಗಳನ್ನು ಚಿಂತಿಸುತ್ತಾರೆ, ಭೂಮಿಯಲ್ಲಿ ಪಡೆಯುವ ಕೃಪೆ ನಮಗೆ ಸ್ವರ್ಗದಲ್ಲಿ ಇರುವ ಪ್ರಭಾವವನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ ಎಂದು ಒತ್ತಿ ಹೇಳುತ್ತಾರೆ. ಈ ಕಂತು ನಂಬಿಕಸ್ಥರನ್ನು ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ನಿಷ್ಠಾವಂತರಾಗಲು, ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಗೆ ತಮ್ಮ ಬದ್ಧತೆಯನ್ನು ಗಾಢಗೊಳಿಸಲು ಮತ್ತು ಕ್ರಿಸ್ತನ ಪುನರಾವೃತಿಗೆ ತಯಾರಾಗುತ್ತಾ ಆಶೀರ್ವದಿತ ತಾಯಿಯ ಪ್ರೀತಿಪೂರ್ಣ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ನಂಬಿಕೆ ಇಡುವಂತೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ.","hi":"लिविंग ओराकल्स के पांचवें एपिसोड में, जोमोल दर्शकों का हार्दिक स्वागत करते हैं एक पवित्र प्रार्थना और चिंतन के स्थान में, जो मैरीयन संधि और दैवीय कृपा तथा सुरक्षा की गहरी गवाही पर केंद्रित है।\\n\\nइस एपिसोड में अमेरिका के ह्यूस्टन से लाली जोसेफ की भावुक गवाही है, जो साझा करती हैं कि मैरीयन संधि लेने के बाद उनका जीवन कैसे गहराई से बदल गया। वह दो महत्वपूर्ण अनुभव बताती हैं: संधि लेने के 90 दिनों के भीतर एक जटिल संपत्ति विवाद का समाधान, और अपनी बहन के रहस्यमय निधन की एक हार्दिक कहानी, जो लगातार प्रार्थना और एक दैवीय संदेश के बाद उनकी बहन के स्वर्ग में शांति से जाने की पुष्टि करती है।\\n\\nलाली निरंतर प्रार्थना की शक्ति, जीवित और मृत दोनों के लिए मध्यस्थता के महत्व, और कष्ट के समय में उपचार और आश्वासन लाने वाली धन्य मां की दयालु मध्यस्थता का वर्णन करती हैं।\\n\\nजोमोल स्वर्गीय महिमा और मध्यस्थता के बारे में शास्त्रों की शिक्षाओं पर विचार करते हैं, और इस बात पर जोर देते हैं कि हम पृथ्वी पर जो कृपा प्राप्त करते हैं वही हमारे स्वर्ग में प्रभाव निर्धारित करती है। यह एपिसोड विश्वासियों को प्रार्थना में स्थिर रहने, मैरीयन संधि के प्रति अपनी प्रतिबद्धता को गहरा करने, और मसीह की वापसी की तैयारी में धन्य मां की प्रेमपूर्ण मार्गदर्शन पर भरोसा करने के लिए प्रोत्साहित करता है।","ta":"லிவிங் ஓரகில்ஸ் ஐந்தாவது எபிசோட்டில், ஜொமோல் பார்வையாளர்களுக்கு மெரியன் உடன்படிக்கை மற்றும் தெய்வ அருள் மற்றும் பாதுகாப்பின் ஆழ்ந்த சாட்சி மையமாக்கப்பட்டுள்ள ஒரு புனித பிரார்த்தனை மற்றும் சிந்தனை இடத்தில் இரக்கமிகு வரவேற்பை அளிக்கிறார்.\\n\\nஇந்த எபிசோட்டில் அமெரிக்காவின் ஹூஸ்டன் இருந்து லாலி ஜோசப் என்பவரின் மனம் திறந்த சாட்சியத்தை காணலாம், அவர் மெரியன் உடன்படிக்கை எடுத்த பிறகு தனது வாழ்க்கை எப்படி ஆழமாக மாறியது என்பதையும் பகிர்கிறார். அவர் இரண்டு முக்கியமான அனுபவங்களை விவரிக்கிறார்: உடன்படிக்கை எடுத்த 90 நாட்களில் ஒரு கடுமையான சொத்து பிரச்சினையின் தீர்வு மற்றும் அவரது சகோதரியின் மர்மமான மரணத்திற்குப் பிறகு தொடர்ந்து பிரார்த்தனை மற்றும் தெய்வீக செய்தி மூலம் அவரது சகோதரி சாந்தியான வானகம் சென்றது என உறுதிப்படுத்தப்பட்ட கதையை பகிர்கிறார்.\\n\\nலாலி நிலையான பிரார்த்தனை சக்தியை, உயிரோடும் இறந்தோடும் பிரார்த்தனை செய்வதின் முக்கியத்துவத்தை, மற்றும் சிரமகாலங்களில் குணப்படுத்தலும் உறுதிப்படுத்தலும் தரும் பரிசுத்த தாயின் கருணையுள்ள இடையிலான நடுவடிக்கையைக் குறிப்பிடுகிறார்.\\n\\nஜொமோல் வானவில் மகிமை மற்றும் இடையிலான பிரார்த்தனை பற்றி வேதாகமப் போதனைகளை பிரதிபலிப்பார், பூமியில் நாம் பெற்ற கிருபை வானவில் எங்கேயும் நம் தாக்கத்தை தீர்மானிக்கும் என்பதை வலியுறுத்துகிறார். இந்த எபிசோட் விசுவாசிகளுக்கு பிரார்த்தனையில் விசுவாசமாக இருக்கவும், மெரியன் உடன்படிக்கையை ஆழப்படுத்தவும், மற்றும் கிறிஸ்துவின் திரும்ப வருவதைத் தயார் செய்ய பரிசுத்த தாயின் அன்பான வழிகாட்டுதலை நம்புமாறு ஊக்குவிக்கிறது.","te":"లివింగ్ ఓరాకిల్స్ ఐదవ ఎపిసోడ్‌లో, జొమోల్ వీక్షకులను ప్రార్థన మరియు ఆలోచనకు సంబంధించిన పవిత్ర స్థలంలో హృదయపూర్వకంగా ఆహ్వానిస్తారు, ఇది మేరియన్ ఒప్పందం మరియు దివ్య కృప మరియు రక్షణ యొక్క లోతైన సాక్ష్యాలపై కేంద్రీకృతమై ఉంది.\\n\\nఈ ఎపిసోడ్‌లో యుఎస్ఏ హ్యూస్టన్ నుండి లాలి జోసెఫ్ యొక్క కదిలించే సాక్ష్యం ఉంటుంది, ఆమె తన జీవితం ఎలా మేరియన్ ఒప్పందం తీసుకున్న తర్వాత లోతుగా మారిందో పంచుకుంటుంది. ఆమె రెండు ముఖ్యమైన అనుభవాలను వివరిస్తుంది: ఒప్పందం తీసుకున్న 90 రోజులలోపల ఒక కఠినమైన ఆస్తి వివాదం పరిష్కారం, మరియు తన అక్క చుట్టూ జరిగిన రహస్య మరణం, నిరంతర ప్రార్థన మరియు దివ్య సందేశం ద్వారా తన అక్క శాంతియుత స్వర్గయాత్రను నిర్ధారించింది.\\n\\nలాలి స్థిరమైన ప్రార్థన శక్తిని, ప్రాణంతరమైనవారికి మరియు మరణించినవారికి మధ్యస్థత అవసరాన్ని, మరియు పరీక్షల సమయంలో ఉపశమనం మరియు హామీ అందించే దివ్య తల్లి కరుణామయ మధ్యస్థతను వివరిస్తుంది.\\n\\nజొమోల్ ఆకాశ మహిమ మరియు మధ్యస్థత గురించి బైబిల్ బోధనలను ప్రతిబింబిస్తారు, భూమిపై మనం పొందిన కృప మన ప్రభావాన్ని ఆకాశంలో నిర్ణయిస్తుందని గట్టిగా చెప్పటం. ఈ ఎపిసోడ్ విశ్వాసులకు ప్రార్థనలో నిబద్ధత ఉండటానికి, మేరియన్ ఒప్పందానికి తమ ప్రతిబద్ధతను లోతుగా చేసుకోవడానికి, మరియు క్రీస్తు తిరిగి రాకానికి సిద్ధమవ్వడానికి దివ్య తల్లి ప్రేమ మార్గనిర్దేశాన్ని నమ్మటానికి ప్రోత్సహిస్తుంది.","fr":"Dans le cinquième épisode de Living Oracles, Jomol accueille chaleureusement les spectateurs dans un espace sacré de prière et de réflexion centré sur la Alliance Mariale et les témoignages profonds de la grâce divine et de la protection.\\n\\nL’épisode présente le témoignage émouvant de Lali Joseph de Houston, aux États-Unis, qui partage comment sa vie a été profondément transformée après avoir pris l’Alliance Mariale. Elle raconte deux expériences importantes : la résolution d’un litige foncier difficile dans les 90 jours suivant l’alliance, et une histoire touchante sur le décès mystérieux de sa sœur, suivie d’une prière persistante et d’un message divin confirmant la transition paisible de sa sœur au ciel.\\n\\nLali décrit la puissance de la prière ferme, l’importance d’intercéder pour les vivants et les défunts, et la médiation compatissante de la Sainte Mère qui apporte guérison et réconfort en temps d’épreuve.\\n\\nJomol réfléchit aux enseignements scripturaires sur la gloire céleste et l’intercession, soulignant que la grâce que nous gagnons sur terre détermine notre influence au ciel. L’épisode encourage les croyants à rester fidèles dans la prière, à approfondir leur engagement envers l’Alliance Mariale, et à faire confiance à la guidance aimante de la Sainte Mère alors qu’ils se préparent au retour du Christ.","es":"En el quinto episodio de Living Oracles, Jomol da una cálida bienvenida a los espectadores a un espacio sagrado de oración y reflexión centrado en el Pacto Mariano y los profundos testimonios de la gracia y protección divinas.\\n\\nEl episodio presenta el conmovedor testimonio de Lali Joseph de Houston, EE. UU., quien comparte cómo su vida se transformó profundamente después de tomar el Pacto Mariano. Relata dos experiencias significativas: la resolución de una disputa de propiedad difícil dentro de los 90 días del pacto, y una historia conmovedora sobre el misterioso fallecimiento de su hermana, seguida de una oración persistente y un mensaje divino que confirma la transición pacífica de su hermana al cielo.\\n\\nLali describe el poder de la oración firme, la importancia de interceder tanto por los vivos como por los difuntos, y la compasiva mediación de la Madre Bendita que brindó sanación y consuelo durante tiempos de prueba.\\n\\nJomol reflexiona sobre las enseñanzas escriturales acerca de la gloria celestial y la intercesión, enfatizando que la gracia que ganamos en la tierra determina nuestra influencia en el cielo. El episodio anima a los creyentes a permanecer fieles en la oración, profundizar su compromiso con el Pacto Mariano y confiar en la guía amorosa de la Madre Bendita mientras se preparan para el regreso de Cristo.","mr":"लिव्हिंग ओरॅकल्सच्या पाचव्या भागात, जोमोल प्रेक्षकांचे हार्दिक स्वागत करतो एका पवित्र प्रार्थना आणि चिंतनाच्या जागेत, जी मेरीयन करार आणि दैवी कृपा व संरक्षणाच्या सखोल साक्षींवर केंद्रित आहे.\\n\\nया भागात अमेरिकेच्या ह्यूस्टनमधील लाली जोसेफ यांची हृदयस्पर्शी साक्ष आहे, जिने मेरीयन करार घेतल्यानंतर तिचे जीवन कसे खोलवर बदलले याबद्दल सांगितले आहे. ती दोन महत्त्वाच्या अनुभवांची सांगते: करारानंतर ९० दिवसांत एका कठीण मालमत्ता वादाचा तोडगा, आणि तिच्या बहिणीच्या रहस्यमय निधनाची एक हृदयस्पर्शी गोष्ट, जी सातत्याने प्रार्थना आणि दैवी संदेशानंतर तिच्या बहिणीच्या शांततेच्या स्वर्गीय संक्रमणाची पुष्टी करते.\\n\\nलाली ठाम प्रार्थनेची शक्ती, जिवंत आणि मृत दोघांसाठी मध्यस्थीचे महत्त्व, आणि कठीण काळात उपचार आणि आश्वासन देणाऱ्या धन्य आईच्या दयाळू मध्यस्थीचे वर्णन करते.\\n\\nजोमोल स्वर्गीय महिमा आणि मध्यस्थीबाबत शास्त्रीय शिक्षणांवर विचार करतो, आणि पृथ्वीवर आपण मिळवलेली कृपा आपल्या स्वर्गातील प्रभाव ठरवते यावर भर देतो. हा भाग श्रद्धाळूंना प्रार्थनेत निष्ठावंत राहण्यासाठी, मेरीयन करारातील आपली बांधिलकी खोल करण्यासाठी, आणि ख्रिस्ताच्या पुनरागमनासाठी तयारी करताना धन्य आईच्या प्रेमळ मार्गदर्शनावर विश्वास ठेवण्यासाठी प्रोत्साहित करतो."},"subtitles":"/assets/oracles/oracles5.json"},{"id":6,"title":{"zh":"活的神谕 - 第6集","bn":"লিভিং ওরাকলস - পর্ব ৬","en":"Living ORACLES - Episode 6","hi":"लिविंग ओराकल्स - एपिसोड 6","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 6","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 6","fr":"Oracles Vivants - Épisode 6","es":"Oráculos Vivientes - Episodio 6","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೬","mr":"लिव्हिंग ओरॅकल्स - भाग 6"},"date":"June 8, 2025","video":"https://youtu.be/g4QDY8kg0zI?si=gCemwxazFuYx8yVV","content":{"en":"In the sixth episode of Living Oracles, host Jomol warmly welcomes viewers to a heartfelt testimony of faith and perseverance. This episode features Thresiyamma, a housewife from Irinjalakuda, who endured years of debilitating illness and suffering but found healing and spiritual renewal through the Marian Covenant at Kreupasanam. Her story highlights the power of surrendering to God's will and the transformative grace that flows when holding the hand of the Holy Mother.\\n\\nThresiyamma’s journey is marked by divine interventions, including a dream of Our Lady of Velankanni and a profound biblical revelation guiding her to Kreupasanam, where she received the sacred anointing oil. Despite physical hardships and financial struggles, her faith strengthened as she participated actively in prayer rallies, daily Mass, and the continuous rosary prayer, witnessing miraculous improvements in her health and spirit.\\n\\nThe episode reflects on the spiritual lessons drawn from her experience—embracing suffering as a channel of grace, growing in spiritual courage like the Holy Mother at the foot of the cross, and maintaining steadfast faith amidst trials. Host Jomol invites viewers to renew their commitment to the Marian Covenant, surrender fully to Jesus’ will, and draw strength from the living mission of Kreupasanam.","zh":"在《活的神谕》第六集中，主持人乔莫尔热情欢迎观众，分享一段关于信仰与坚持的感人见证。本集聚焦来自伊林贾拉库达的家庭主妇特雷西娅玛，她经历了多年的严重疾病和苦难，但通过在克鲁帕萨南接受圣母盟约，获得了康复和精神上的重生。她的故事彰显了顺服上帝旨意的力量，以及当握住圣母之手时流淌的变革恩典。\\n\\n特雷西娅玛的旅程中充满了神圣的介入，包括她梦见维兰卡尼圣母和来自圣经的深刻启示，指引她前往克鲁帕萨南，在那里她接受了神圣的膏油。尽管身体和经济上都遭遇困难，她的信仰却因积极参与祈祷集会、每日弥撒和持续的玫瑰经祈祷而日益坚固，见证了健康和精神的奇迹改善。\\n\\n本集反思她经历中获得的属灵教训——将苦难视为恩典的渠道，如圣母在十字架脚下般增长属灵勇气，以及在试炼中保持坚定的信仰。主持人乔莫尔邀请观众更新他们对圣母盟约的承诺，全心顺服耶稣的旨意，并从克鲁帕萨南的活使命中汲取力量。","bn":"লিভিং ওরাকলস - পর্ব ৬-এ, উপস্থাপক জোমল দর্শকদের আন্তরিক স্বাগত জানান এবং বিশ্বাস ও অধ্যবসায়ের একটি স্পর্শকাতর সাক্ষ্য শেয়ার করেন। এই পর্বে ইরিঞ্জালাকুডার গৃহিণী থ্রেসিয়াম্মার গল্প তুলে ধরা হয়েছে, যিনি বহু বছরের গুরুতর অসুস্থতা ও কষ্টের পর মারিয়ান কভেন্যান্ট গ্রহণের মাধ্যমে আরোগ্য এবং আত্মিক নবজীবন লাভ করেন। তাঁর গল্প ঈশ্বরের ইচ্ছায় আত্মসমর্পণের শক্তি এবং পবিত্র মাতার হাতে হাত রাখার মাধ্যমে পরিবর্তনশীল অনুগ্রহের প্রবাহকে প্রদর্শন করে।\\n\\nথ্রেসিয়াম্মার যাত্রাপথে দেবীয় হস্তক্ষেপ ঘটেছে, যার মধ্যে রয়েছে ভেলানকানি মাদার অফ আ ড্রিম এবং বাইবেলের গভীর আধ্যাত্মিক প্রকাশ যা তাঁকে ক্রেপুসানামের দিকে পরিচালিত করে, যেখানে তিনি পবিত্র অনাবৃত তেল গ্রহণ করেন। শারীরিক ও আর্থিক কষ্টের মধ্যেও, তিনি প্রার্থনা সমাবেশ, দৈনিক মিসা ও ধারাবাহিক রোজারির মাধ্যমে তাঁর বিশ্বাসকে দৃঢ় করেন এবং সুস্থতা ও আত্মার অদ্ভুত উন্নতি প্রত্যক্ষ করেন।\\n\\nএই পর্বটি তাঁর অভিজ্ঞতা থেকে আধ্যাত্মিক শিক্ষা তুলে ধরে—কষ্টকে অনুগ্রহের একটি মাধ্যম হিসেবে গ্রহণ করা, পবিত্র মাতার মত ক্রুশের পাদদেশে আধ্যাত্মিক সাহস বৃদ্ধি করা এবং পরীক্ষার মাঝে দৃঢ় বিশ্বাস বজায় রাখা। উপস্থাপক জোমল দর্শকদের মারিয়ান কভেন্যান্টের প্রতি তাদের অঙ্গীকার পুনর্নবীকরণ করার জন্য, যিশুর ইচ্ছায় সম্পূর্ণ আত্মসমর্পণ করার জন্য এবং ক্রেপুসানামের জীবন্ত মিশন থেকে শক্তি গ্রহণ করার জন্য আমন্ত্রণ জানান।","hi":"लिविंग ओराकल्स के छठे एपिसोड में, होस्ट जोमोल दर्शकों का हार्दिक स्वागत करते हैं और विश्वास एवं धैर्य की एक मार्मिक गवाही साझा करते हैं। इस एपिसोड में इरिंजलाकुडा की गृहिणी थ्रेसियम्मा की कहानी है, जिन्होंने वर्षों तक गंभीर बीमारी और कष्टों का सामना किया, लेकिन क्रीउपासनम में मैरियन कवरनेंट के माध्यम से स्वास्थ्य और आध्यात्मिक नवीनीकरण पाया। उनकी कहानी परमेश्वर की इच्छा के प्रति समर्पण की शक्ति और पवित्र माता के हाथ थामने से मिलने वाली परिवर्तनकारी कृपा को दर्शाती है।\\n\\nथ्रेसियम्मा की यात्रा में दिव्य हस्तक्षेप शामिल हैं, जिनमें वेलानकन्नी की माता का सपना और बाइबिल की गहन शिक्षाएं शामिल हैं, जिन्होंने उन्हें क्रीउपासनम की ओर मार्गदर्शन किया, जहां उन्होंने पवित्र अभिषेक तेल प्राप्त किया। शारीरिक और वित्तीय कठिनाइयों के बावजूद, उन्होंने प्रार्थना रैलियों, दैनिक मिस्सा, और लगातार रोज़री प्रार्थना में सक्रिय भाग लेकर अपने विश्वास को मजबूत किया और स्वास्थ्य और आत्मा में चमत्कारिक सुधार देखा।\\n\\nयह एपिसोड उनके अनुभव से आध्यात्मिक शिक्षा पर प्रकाश डालता है—कष्टों को अनुग्रह के माध्यम के रूप में स्वीकार करना, पवित्र माता की तरह क्रूस के पैर के पास आध्यात्मिक साहस बढ़ाना, और परीक्षाओं के बीच अडिग विश्वास बनाए रखना। होस्ट जोमोल दर्शकों को मैरियन कवरनेंट के प्रति अपनी प्रतिबद्धता को नवीनीकृत करने, पूरी तरह से यीशु की इच्छा को समर्पित करने, और क्रीउपासनम के जीवित मिशन से शक्ति लेने के लिए आमंत्रित करते हैं।","ta":"லிவிங் ஓரகில்ஸ் - ஆறாம் எபிசோட்டில், தொகுப்பாளர் ஜோமோல் பார்வையாளர்களுக்கு அன்புடன் வரவேற்கிறார் மற்றும் நம்பிக்கை மற்றும் பொறுமையின் ஆழ்ந்த சாட்சியத்தை பகிர்கிறார். இந்த எபிசோட்டில், இரிஞ்ஜலகுடாவில் உள்ள ஒரு இல்லமகள் திரெசியம்மாவின் வாழ்க்கைக் கதை வெளிப்படுகிறது, அவர் பல ஆண்டுகள் தீவிரமான நோய்களையும் சிரமங்களையும் எதிர்கொண்டு, கிருபாசனம் பகுதியில் உள்ள மரியன் உடன்படிக்கையின் மூலம் ஆரோக்கியம் மற்றும் ஆன்மிக புதுப்பிப்பை அனுபவிக்கிறார். அவரது கதை கடவுளின் விருப்பத்தை ஒப்புக்கொள்ளும் சக்தியையும் புனித தாயின் கையை பிடித்து மாற்றும் அருளையும் வெளிப்படுத்துகிறது.\\n\\nதிரெசியம்மாவின் பயணத்தில் தெய்வீக தலையீடுகள் பல உள்ளன, அவற்றில் வெலங்கண்ணியின் தாயார் குறித்து ஒரு கனவு மற்றும் பைபிள் வசனங்கள் அடங்கும், அவை அவரை கிருபாசனம் நோக்கி வழிநடத்துகின்றன, அங்கு அவர் புனித அசைவ எண்ணெயைப் பெற்றார். உடல் மற்றும் நிதி சிரமங்கள் இருந்தபோதிலும், அவர் பிரார்த்தனை பேரவை, தினசரி மிசா மற்றும் தொடர்ச்சியான ரோசரி பிரார்த்தனையில் செயலில் ஈடுபட்டு தன்னம்பிக்கை வளர்த்தார் மற்றும் ஆரோக்கியமும் ஆன்மாவும் அதிசயமாக மேம்பட்டன.\\n\\nஇந்த எபிசோடு அவரது அனுபவங்களில் இருந்து ஆன்மிகக் கற்றல்களை பிரதிபலிக்கிறது—சிரமங்களை அருளின் வழியாக ஏற்றுக்கொள்வது, புனித தாய் போல صلیப்பின் அடியில் ஆன்மிக தைரியம் வளர்ப்பது மற்றும் சோதனைகளுக்கு மத்தியில் நிலையான நம்பிக்கையை பேணுவது. தொகுப்பாளர் ஜோமோல் பார்வையாளர்களை மரியன் உடன்படிக்கையுடன் அவர்களது அர்ப்பணிப்பை புதுப்பிக்கவும், இயேசுவின் விருப்பத்திற்கு முழுமையாக ஒப்படைக்கவும் மற்றும் கிருபாசனத்தின் உயிர் மிஷனிலிருந்து சக்தியை பெற்றுக்கொள்ளவும் அழைக்கிறார்.","te":"లివింగ్ ఓరాకిల్స్ - ఆరవ ఎపిసోడ్‌లో, హోస్ట్ జోమోల్ ప్రేక్షకులను హృదయపూర్వకంగా స్వాగతిస్తారు మరియు విశ్వాసం మరియు సహనంపై ఒక స్ఫూర్తిదాయకమైన సాక్ష్యాన్ని పంచుకుంటారు. ఈ ఎపిసోడ్‌లో ఇరింజలకుడా నుండి త్రేసియమ్మ అనే గృహిణి కథ ఉంటుంది, ఆమె అనేక సంవత్సరాల తీవ్ర అనారోగ్యం మరియు కష్టాలను ఎదుర్కొని, కృపాసనం వద్ద మ్యారియన్ కవెనంట్ ద్వారా ఆరోగ్య మరియు ఆధ్యాత్మిక పునరుజ్జీవనాన్ని పొందింది. ఆమె కథ దేవుని ఇష్టానికి అంకితమై, పవిత్ర తల్లి చేతిని పట్టుకుని మార్పును తీసుకొచ్చే కృపను అనుభవించడాన్ని చూపిస్తుంది.\\n\\nత్రేసియమ్మ యొక్క ప్రయాణంలో దివ్య జోక్యాలు ఉన్నాయి, అందులో వేలంకన్నీ తల్లి యొక్క కల మరియు బైబిల్ వచనాలు ఉన్నాయి, ఇవి ఆమెను కృపాసనం వైపు దారి చూపించాయి, అక్కడ ఆమె పవిత్ర అబ్బిణీ నూనెని అందుకుంది. శారీరక మరియు ఆర్థిక కష్టాలను ఎదుర్కొన్నప్పటికీ, ఆమె ప్రార్థనా సమారాధనలు, రోజువారీ మిస్సా, మరియు నిరంతర రోజరీ ప్రార్థనలో చురుకుగా పాల్గొనడం ద్వారా తన విశ్వాసాన్ని బలోపేతం చేసుకుంది మరియు ఆరోగ్య మరియు ఆత్మలో అద్భుతమైన మెరుగుదలలను అనుభవించింది.\\n\\nఈ ఎపిసోడ్ ఆమె అనుభవాల నుండి ఆధ్యాత్మిక పాఠాలను ప్రతిబింబిస్తుంది—వేదనలను కృప యొక్క మార్గంగా అంగీకరించడం, పవిత్ర తల్లి లాగా క్రైస్తవ క్రాస్ అడుగున ఆధ్యాత్మిక ధైర్యాన్ని పెంపొందించడం, మరియు పరీక్షల మధ్యలో నిలకడైన విశ్వాసాన్ని కొనసాగించడం. హోస్ట్ జోమాల్ ప్రేక్షకులను మ్యారియన్ కవెనంట్ పట్ల వారి కట్టుబాటును నవీకరించడానికి, యేసు ఇష్టానికి పూర్తిగా అంకితం కావడానికి, మరియు కృపాసనం జీవిస్తూ కొనసాగుతున్న మిషన్ నుండి శక్తిని పొందడానికి ఆహ్వానిస్తున్నారు.","fr":"Dans le sixième épisode des Oracles Vivants, l'animatrice Jomol accueille chaleureusement les spectateurs pour partager un témoignage profond de foi et de persévérance. Cet épisode met en lumière Thresiyamma, une femme au foyer d'Irinjalakuda, qui a traversé des années de maladie et de souffrance avant de trouver guérison et renouveau spirituel grâce à l'Alliance Mariale à Kreupasanam. Son histoire illustre la puissance de la soumission à la volonté de Dieu et la grâce transformatrice qui coule lorsqu'on tient la main de la Sainte Mère.\\n\\nLe parcours de Thresiyamma est marqué par des interventions divines, notamment un rêve de Notre-Dame de Velankanni et une révélation biblique profonde qui l'ont guidée vers Kreupasanam, où elle a reçu l'huile d'onction sacrée. Malgré les difficultés physiques et financières, sa foi s'est renforcée grâce à sa participation active aux rassemblements de prière, à la messe quotidienne et à la prière continue du rosaire, témoignant d'améliorations miraculeuses de sa santé et de son esprit.\\n\\nL'épisode réfléchit aux leçons spirituelles tirées de son expérience : accueillir la souffrance comme un canal de grâce, croître en courage spirituel comme la Sainte Mère au pied de la croix, et maintenir une foi ferme au milieu des épreuves. L'animatrice Jomol invite les spectateurs à renouveler leur engagement envers l'Alliance Mariale, à se remettre entièrement à la volonté de Jésus et à puiser force dans la mission vivante de Kreupasanam.","es":"En el sexto episodio de Oráculos Vivientes, la presentadora Jomol da una cálida bienvenida a los espectadores y comparte un testimonio conmovedor de fe y perseverancia. Este episodio presenta a Thresiyamma, una ama de casa de Irinjalakuda, quien soportó años de enfermedad debilitante y sufrimiento antes de encontrar sanación y renovación espiritual a través del Pacto Mariano en Kreupasanam. Su historia destaca el poder de entregarse a la voluntad de Dios y la gracia transformadora que fluye al tomar la mano de la Santa Madre.\\n\\nEl viaje de Thresiyamma está marcado por intervenciones divinas, incluyendo un sueño de Nuestra Señora de Velankanni y una profunda revelación bíblica que la guiaron hacia Kreupasanam, donde recibió el aceite sagrado de unción. A pesar de las dificultades físicas y financieras, fortaleció su fe participando activamente en oraciones, misas diarias y el rezo continuo del rosario, siendo testigo de mejoras milagrosas en su salud y espíritu.\\n\\nEl episodio reflexiona sobre las lecciones espirituales derivadas de su experiencia: aceptar el sufrimiento como un canal de gracia, crecer en valor espiritual como la Santa Madre al pie de la cruz y mantener una fe firme en medio de las pruebas. La presentadora Jomol invita a los espectadores a renovar su compromiso con el Pacto Mariano, entregarse plenamente a la voluntad de Jesús y obtener fuerza de la misión viva de Kreupasanam.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಆರುನೇಡೆ ಕಂತಿನಲ್ಲಿ, ನಿರೂಪಕಿ ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃತ್ಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ, ನಂಬಿಕೆ ಮತ್ತು ಸಹನಶೀಲತೆಯ ದೃಢ ಸಾಕ್ಷಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಈ ಕಂತಿನಲ್ಲಿ ಇರಿಂಜಲಕೂಡದ ಗೃಹಿಣಿ ಥ್ರೆಸಿಯಮ್ಮ ಅವರ ಕಥೆಯನ್ನು ವಿವರಿಸಲಾಗಿದೆ, ಅವರು ಹಲವು ವರ್ಷಗಳ ಭಾರೀ ರೋಗ ಮತ್ತು ದುಃಖವನ್ನು ಅನುಭವಿಸಿ, ಕೃಪಾಸನಂ ನಲ್ಲಿ ಮರಿಯನ್ ಒಪ್ಪಂದವನ್ನು ಸ್ವೀಕರಿಸುವ ಮೂಲಕ ಆರೈಕೆ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಪುನರುಜ್ಜೀವನವನ್ನು ಹೊಂದಿದ್ದಾರೆ. ಅವರ ಕಥೆ ದೇವರ ಇಚ್ಛೆಗೆ ಸಮರ್ಪಣೆ ಮತ್ತು ಪವಿತ್ರ ತಾಯಿ ಹಸ್ತವನ್ನು ಹಿಡಿದು ಪರಿವರ್ತನೆಯ ಅನುಗ್ರಹವನ್ನು ಅನುಭವಿಸುವ ಸಾಮರ್ಥ್ಯವನ್ನು ತೋರಿಸುತ್ತದೆ.\\n\\nಥ್ರೆಸಿಯಮ್ಮ ಅವರ ಪ್ರಯಾಣದಲ್ಲಿ ದಿವ್ಯ ಹಸ್ತಕ್ಷೇಪಗಳು ಕಂಡುಬರುತ್ತವೆ, ಅದರಲ್ಲಿ ವೆಲಂಕಾಣಿ ತಾಯಿಯ ಕನಸು ಮತ್ತು ಬೈಬಲ್ ವಚನಗಳ ಆಳವಾದ ಪ್ರಕಟನೆಗಳಿವೆ, ಅವುಗಳು ಅವರನ್ನು ಕೃಪಾಸನಂ ಕಡೆಗೆ ನಡೆಸಿವೆ, ಅಲ್ಲಿ ಅವರು ಪವಿತ್ರ ಅಭಿಷೇಕ ತೈಲವನ್ನು ಪಡೆದರು. ದೈಹಿಕ ಮತ್ತು ಆರ್ಥಿಕ ಕಷ್ಟಗಳಿದ್ದರೂ ಸಹ, ಅವರು ಪ್ರಾರ್ಥನೆ ಸಮಾರಂಭಗಳು, ದೈನಂದಿನ ಮಿಸ್ಸಾ ಮತ್ತು ನಿರಂತರ ರೋಸರಿ ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿ ಪಾಲ್ಗೊಳ್ಳುವ ಮೂಲಕ ತಮ್ಮ ನಂಬಿಕೆಯನ್ನು ಬಲಪಡಿಸಿದರು ಮತ್ತು ಆರೋಗ್ಯ ಮತ್ತು ಆತ್ಮದಲ್ಲಿ ಅದ್ಭುತ ಸುಧಾರಣೆಗಳನ್ನು ಅನುಭವಿಸಿದರು.\\n\\nಈ ಕಂತು ಅವರ ಅನುಭವಗಳಿಂದ ಆಧ್ಯಾತ್ಮಿಕ ಪಾಠಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ—ದುಃಖವನ್ನು ಅನುಗ್ರಹದ ಒಂದು ಮಾರ್ಗವಾಗಿ ಸ್ವೀಕರಿಸುವುದು, ಪವಿತ್ರ ತಾಯಿಯಂತೆ ಕ್ರೂಸಿನ ಕಡೆಯಿಂದ ಆಧ್ಯಾತ್ಮಿಕ ಧೈರ್ಯವನ್ನು ಬೆಳೆಯಿಸುವುದು ಮತ್ತು ಪರೀಕ್ಷೆಗಳ ಮಧ್ಯೆ ಸ್ಥಿರ ನಂಬಿಕೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳುವುದು. ನಿರೂಪಕಿ ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರಿಗೆ ಮರಿಯನ್ ಒಪ್ಪಂದದ ಕಡೆಗೆ ಅವರ ಬದ್ಧತೆಯನ್ನು ನವೀಕರಿಸಲು, ಯೇಸುವಿನ ಇಚ್ಛೆಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಪಿಸಲು ಮತ್ತು ಕೃಪಾಸನಂನ ಜೀವಂತ ಮಿಷನ್ ನಿಂದ ಶಕ್ತಿ ಪಡೆಯಲು ಆಹ್ವಾನಿಸುತ್ತಾರೆ.","mr":"लिव्हिंग ओरॅकल्स - भाग 6 मध्ये, होस्ट जोमोल प्रेक्षकांचे हार्दिक स्वागत करतात आणि श्रद्धा आणि संयम यांचे एक प्रेरणादायी साक्षात्कार शेअर करतात. या भागात इरिंजलाकूड येथील गृहिणी थ्रेसियम्मा यांची कहाणी आहे, जिने अनेक वर्षे गंभीर आजार आणि वेदना सहन केल्या, पण क्रीउपासनम येथे मरीअन कुव्हनंट स्वीकारून आरोग्य आणि आध्यात्मिक नूतनीकरण अनुभवले. त्यांची कथा देवाच्या इच्छेचे समर्पण आणि पवित्र मातेस हात धरून बदलणारी कृपा याचे दर्शन घडवते.\\n\\nथ्रेसियम्माच्या प्रवासात दैवी हस्तक्षेप होते, ज्यामध्ये वेलन्कन्नी माता यांचे स्वप्न आणि बायबलमधील खोल शिकवणूका समाविष्ट आहेत, ज्यांनी तिला क्रीउपासनमकडे नेले, जिथे तिने पवित्र अभिषेक तेल प्राप्त केले. शारीरिक आणि आर्थिक अडचणी असूनही, तिने प्रार्थना संमेलने, दैनंदिन मिस्सा आणि सततच्या रोजरी प्रार्थनेत सक्रिय सहभाग घेतला आणि तिच्या आरोग्य व आत्म्यात चमत्कारिक सुधारणा पाहिल्या.\\n\\nहा भाग तिच्या अनुभवातून घेतलेल्या आध्यात्मिक धडे यावर विचार करतो—दु:खाला कृपेचा मार्ग मानणे, पवित्र मातेसारखे खांद्यावर क्रॉस ठेवून आध्यात्मिक धैर्य वाढवणे आणि परीक्षांमध्ये दृढ श्रद्धा राखणे. होस्ट जोमोल प्रेक्षकांना मरीअन कुव्हनंटबद्दलची बांधिलकी नूतनीकरण करण्यासाठी, येशूच्या इच्छेला पूर्णपणे समर्पित होण्यासाठी आणि क्रीउपासनमच्या जिवंत मिशनमधून शक्ती मिळवण्यासाठी आवाहन करतात."},"subtitles":"/assets/oracles/oracles6.json"},{"id":7,"title":{"zh":"活的神谕 - 第7集","bn":"লিভিং ওরাকলস - পর্ব ৭","en":"Living ORACLES - Episode 7","hi":"लिविंग ओराकल्स - एपिसोड 7","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 7","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 7","fr":"Oracles Vivants - Épisode 7","es":"Oráculos Vivientes - Episodio 7","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೭","mr":"लिव्हिंग ओरॅकल्स - भाग 7"},"date":"June 15, 2025","video":"https://youtu.be/K_5sJuLwz8M?si=CtoMXeuISFPnFGJC","content":{"en":"In the 7th episode of Living Oracles, Jomol warmly welcomes viewers into a sacred space of prayer and reflection centered on the Marian Covenant and the grace-filled place of Kreupasanam, which prepares believers for the second coming of Jesus Christ.\\n\\nThe episode features the powerful testimony of Thresyakutty, a mother from Wayanad, who shares how her life was transformed through the Marian Covenant taken at Kreupasanam. Amidst severe trials—including the loss of her husband to motor neuron disease, health struggles with kidney problems, and the burden of raising her children alone—Thresyakutty found strength and healing by embracing the covenant and holding firmly to God’s promises.\\n\\nShe recounts how Father V.P. Joseph, the revered spiritual leader at Kreupasanam, provided crucial support through prayer, spiritual counsel, and the laying on of hands, helping her receive divine healing and peace. Thresyakutty describes miraculous breakthroughs—both physical and emotional—that sustained her through financial hardships, community opposition, and family challenges.\\n\\nJomol reflects on how the Marian Covenant and Kreupasanam serve as a powerful spiritual school and channel of grace, equipping believers to endure life’s difficulties and grow in faith as they await Christ’s return. The episode encourages viewers to deepen their commitment to the covenant and trust in God’s timing, knowing that the Blessed Mother intercedes powerfully for all who seek her through Kreupasanam.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಏಳನೇ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಕೃಪಾಸನಮ್ ಎಂಬ ಕೃಪೆಯಿಂದ ತುಂಬಿದ ಸ್ಥಳದ ಪ್ರಾರ್ಥನೆ ಹಾಗೂ ಚಿಂತನೆಯ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತಾರೆ, ಇದು ವಿಶ್ವಾಸಿಗಳನ್ನು ಯೇಸು ಕ್ರಿಸ್ತನ ಎರಡನೇ ಬಾರಿಗೆ ಬರುವಿಕೆಗೆ ಸಜ್ಜುಗೊಳಿಸುತ್ತದೆ.\\n\\nಈ ಕಂತು ವಾಯನಾಡಿನ ತಾಯಿಯಾದ ತ್ರೇಸ്യಕുട്ടಿಯ ಶಕ್ತಿಶಾಲಿ ಸಾಕ್ಷ್ಯವನ್ನು ಒಳಗೊಂಡಿದೆ. ಅವಳು ಕೃಪಾಸನಮಿನಲ್ಲಿ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ತನ್ನ ಜೀವನವನ್ನು ಹೇಗೆ ಪರಿವರ್ತಿಸಿದ್ದಾಳೆ ಎಂದು ಹಂಚಿಕೊಳ್ಳುತ್ತಾಳೆ. ಗಂಭೀರ ಸವಾಲುಗಳ ನಡುವೆ—ತಂಡದ ನರ್ಸ್ ರೋಗದಿಂದ ಪತಿಯ ಸಾವಿನದು, ಮೂತ್ರಪಿಂಡ ಸಮಸ್ಯೆಗಳ ಆರೋಗ್ಯ ಹೋರಾಟಗಳು, ಮತ್ತು ಮಕ್ಕಳನ್ನು ಒಬ್ಬಳು ಏರ್ಪಡಿಸುವ ಭಾರ—ತ್ರೇಸ್ಯಕುತ್ತಿ ಒಡಂಬಡಿಕೆಯನ್ನು ಹಿಡಿದುಕೊಂಡು ದೇವರ ವಾಗ್ದಾನಗಳನ್ನು ಬಲವಾಗಿ ನಂಬಿ ಶಕ್ತಿ ಮತ್ತು ಗುಣಮುಖತೆ ಕಂಡುಕೊಂಡಳು.\\n\\nಅವಳು ಹೇಗೆ ಕೃಪಾಸನಮ್‌ನ ಗೌರವಾನ್ವಿತ ಆತ್ಮಿಕ ನಾಯಕ ಫಾದರ್ ವಿ.ಪಿ. ಜೋಸೆಫ್ ಪ್ರಾರ್ಥನೆ, ಆತ್ಮಿಕ ಸಲಹೆ ಮತ್ತು ಕೈ ಹಚ್ಚುವ ಮೂಲಕ ಅವಳಿಗೆ ದೇವೀಯ ಗುಣಮುಖತೆ ಮತ್ತು ಶಾಂತಿ ದೊರಕಲು ಮಹತ್ವದ ಬೆಂಬಲ ನೀಡಿದನೋ ಅದನ್ನು ವಿವರಿಸುತ್ತಾಳೆ. ತ್ರೇಸ್ಯಕುತ್ತಿ ಹಣಕಾಸು ಕಷ್ಟಗಳು, ಸಮುದಾಯ ವಿರೋಧ ಮತ್ತು ಕುಟುಂಬ ಸವಾಲುಗಳನ್ನು ಸಹಿಸುವಲ್ಲಿ ಅದ್ಭುತ ಮುನ್ನಡೆಗಳನ್ನು ವಿವರಿಸುತ್ತಾಳೆ.\\n\\nಜೋಮೋಲ್ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಮತ್ತು ಕೃಪಾಸನಮ್ ಭಕ್ತರನ್ನು ಜೀವನದ ಕಷ್ಟಗಳನ್ನು ಸಹಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ನಂಬಿಕೆಯಲ್ಲಿ ಬೆಳವಣಿಗೆ ಮಾಡಲು ಶಕ್ತಿಶಾಲಿ ಆತ್ಮಿಕ ಶಾಲೆ ಮತ್ತು ಕೃಪೆಯ ಚಾನಲ್ ಆಗಿರುವುದಾಗಿ ಚಿಂತಿಸುತ್ತಾರೆ. ಈ ಕಂತು ಪ್ರೇಕ್ಷಕರನ್ನು ಒಡಂಬಡಿಕೆಗೆ ಆಳವಾದ ಬದ್ಧತೆ ತೋರಿಸಲು ಮತ್ತು ದೇವರ ಸಮಯಕ್ಕೆ ನಂಬಿಕೆ ಇಡಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ, ಏಕೆಂದರೆ ಆಶೀರ್ವದಿತ ತಾಯಿ ಕೃಪಾಸನಮಿನ ಮೂಲಕ ಅವಳನ್ನು ಹುಡುಕುವ ಎಲ್ಲರಿಗೂ ಶಕ್ತಿಶಾಲಿಯಾಗಿ ಮಧ್ಯಸ್ಥಿಕೆ ಮಾಡುತ್ತಾಳೆ ಎಂದು ತಿಳಿದುಕೊಳ್ಳಲು.","zh":"在《活的神谕》第七集中，Jomol热情地欢迎观众进入一个以圣母盟约和恩典之地克鲁帕萨南为中心的祈祷与反思的圣地，准备信徒迎接耶稣基督的第二次降临。\\n\\n本集展示了来自瓦亚纳德的母亲Thresyakutty的感人见证，她讲述了如何通过在克鲁帕萨南接受圣母盟约，生命得到了改变。在经历了严重的考验——包括失去患运动神经元疾病的丈夫、肾脏健康问题以及独自抚养子女的重担——中，Thresyakutty通过拥抱盟约并坚守上帝的应许，获得了力量和医治。\\n\\n她回忆了尊敬的灵性领袖Father V.P. Joseph在克鲁帕萨南通过祈祷、属灵辅导及按手帮助她获得神圣的医治与平安。Thresyakutty描述了在财政困难、社区反对和家庭挑战中支持她的神迹般的突破——身心皆然。\\n\\nJomol反思圣母盟约与克鲁帕萨南如何作为强大的属灵学堂与恩典渠道，装备信徒忍受生活的艰难，并在等待基督再来时增长信心。本集鼓励观众深化对盟约的承诺，信赖上帝的时间安排，并相信圣母会为所有通过克鲁帕萨南寻求她的人强力代祷。","bn":"লাইভিং ওরাকলসের সপ্তম পর্বে, জোমল দর্শকদের একটি পবিত্র প্রার্থনা ও প্রতিফলনের স্থানেও আন্তরিকভাবে স্বাগত জানান, যেখানে মারিয়ান চুক্তি এবং কৃপাসনাম নামে অনুগ্রহপূর্ণ স্থানটি বিশ্বাসীদের যিশুর দ্বিতীয় আগমনের জন্য প্রস্তুত করে।\\n\\nএই পর্বে, ওয়ায়ানাডের মা থ্রেস্যাকুটি তার শক্তিশালী সাক্ষ্য শেয়ার করেন, যিনি কৃপাসনামে মারিয়ান চুক্তি গ্রহণের মাধ্যমে তার জীবন কিভাবে রূপান্তরিত হয়েছে তা বর্ণনা করেন। কঠিন পরীক্ষার মধ্যে—যেখানে তার স্বামী মোটর নিউরন ডিজিজে মারা যান, কিডনি সমস্যার সাথে লড়াই করেন, এবং এককভাবে তার সন্তানদের বড় করেন—থ্রেস্যাকুটি চুক্তি গ্রহণ করে এবং ঈশ্বরের প্রতিশ্রুতির উপর দৃঢ় থাকার মাধ্যমে শক্তি ও সুস্থতা পেয়েছেন।\\n\\nতিনি বর্ণনা করেন কিভাবে পাদ্রি ভি.পি. জোসেফ, কৃপাসনামের মান্যতা পাওয়া আধ্যাত্মিক নেতা, প্রার্থনা, আধ্যাত্মিক পরামর্শ এবং হাত বসিয়ে তাঁর জন্য ঐশ্বরিক নিরাময় এবং শান্তি পেতে সাহায্য করেছিলেন। থ্রেস্যাকুটি বিস্ময়কর উন্নতি, শারীরিক এবং মানসিক উভয় ক্ষেত্রেই, যা তাঁকে আর্থিক কষ্ট, সম্প্রদায়ের বিরোধিতা এবং পারিবারিক চ্যালেঞ্জ মোকাবেলায় টিকে থাকতে সহায়তা করেছে, বর্ণনা করেন।\\n\\nজোমল প্রতিফলিত করেন যে কিভাবে মারিয়ান চুক্তি এবং কৃপাসনাম শক্তিশালী আধ্যাত্মিক বিদ্যালয় এবং অনুগ্রহের মাধ্যমে বিশ্বাসীদের জীবনযাত্রার কঠিন সময়গুলো সহ্য করতে এবং খ্রিস্টের প্রত্যাবর্তনের জন্য বিশ্বাস বাড়াতে সাহায্য করে। এই পর্বটি দর্শকদের চুক্তিতে গভীর প্রতিশ্রুতি নেওয়ার এবং ঈশ্বরের সময়ে বিশ্বাস রাখার জন্য উৎসাহিত করে, জানিয়ে যে বরকতময় মাতা কৃপাসনামের মাধ্যমে তাঁকে যারা খুঁজছেন তাদের জন্য শক্তিশালীভাবে মধ্যস্থতা করেন।","hi":"लिविंग ओराकल्स के सातवें एपिसोड में, जोमोल दर्शकों का हार्दिक स्वागत करते हुए उन्हें प्रार्थना और चिंतन के एक पवित्र स्थान में आमंत्रित करती हैं, जो मरियाई संधि और कृपासनम की कृपा से भरी जगह पर केंद्रित है, जो विश्वासियों को यीशु मसीह की दूसरी पुनरागमन के लिए तैयार करती है।\\n\\nइस एपिसोड में, वायनाड की एक माता थ्रेस्याकुट्टी की शक्तिशाली गवाही है, जो बताती हैं कि कैसे उनके जीवन को कृपासनम में ली गई मरियाई संधि के माध्यम से बदल दिया गया। गंभीर परीक्षाओं के बीच—जिसमें उनके पति का मोटर न्यूरॉन रोग से निधन, गुर्दे की समस्याएं और अपने बच्चों को अकेले पालने का बोझ शामिल है—थ्रेस्याकुट्टी ने संधि को अपनाकर और ईश्वर के वादों पर दृढ़ रहकर शक्ति और उपचार पाया।\\n\\nवे बताती हैं कि कैसे पिता वी.पी. जोसेफ, कृपासनम के सम्मानित आध्यात्मिक नेता, ने प्रार्थना, आध्यात्मिक परामर्श और हाथ रखकर उन्हें दिव्य उपचार और शांति पाने में मदद की। थ्रेस्याकुट्टी चमत्कारी सफलताओं का वर्णन करती हैं—शारीरिक और भावनात्मक दोनों ही—जो उन्हें वित्तीय कठिनाइयों, समुदाय विरोध और पारिवारिक चुनौतियों के बीच टिके रहने में सहायक हुई।\\n\\nजोमोल इस बात पर विचार करती हैं कि मरियाई संधि और कृपासनम एक शक्तिशाली आध्यात्मिक विद्यालय और कृपा का माध्यम कैसे हैं, जो विश्वासियों को जीवन की कठिनाइयों का सामना करने और मसीह की वापसी का इंतजार करते हुए विश्वास में बढ़ने के लिए तैयार करते हैं। यह एपिसोड दर्शकों को संधि के प्रति अपनी प्रतिबद्धता को गहरा करने और परमेश्वर के समय पर विश्वास करने के लिए प्रोत्साहित करता है, यह जानते हुए कि धन्य माता कृपासनम के माध्यम से उनके लिए शक्तिशाली मध्यस्थता करती हैं।","ta":"லிவிங் ஓரகில்ஸ் நிகழ்ச்சி 7வது அத்தியாயத்தில், ஜொமோல் பார்வையாளர்களுக்கு ஒரு புனித பிரார்த்தனை மற்றும் சிந்தனைப் பரப்பில் அன்புடன் வரவேற்கிறார், இது மரியன் உடன்படிக்கையும் கிருபாசனம் என்ற ஆசீர்வதிக்கப்பட்ட இடமும் குறித்தது, இது விசுவாசிகளைக் கிறிஸ்துவின் இரண்டாவது வருகைக்கு தயாராக செய்யும்.\\n\\nஇந்த அத்தியாயத்தில், வையானாட்டில் இருந்து வந்த த்ரேசியக்குட்டி என்ற தாய் தனது வாழ்க்கை கிருபாசனத்தில் எடுக்கப்பட்ட மரியன் உடன்படிக்கையால் எப்படி மாற்றப்பட்டது என்பதை பகிர்கிறார். கடுமையான சோதனைகள் — அவரது கணவர் மோட்டார் நியூரான் நோயால் இறந்தது, சிறுநீரக பிரச்சினைகள் மற்றும் தனக்கே பிள்ளைகளை வளர்க்கும் சுமை — நடுவில், த்ரேசியக்குட்டி உடன்படிக்கையை ஏற்று கடவுளின் வாக்குறுதிகளுக்கு உறுதியாக ஒப்படைத்தார் மற்றும் பலம் மற்றும் குணம் பெற்றார்.\\n\\nகிருபாசனத்தின் மதிப்பிற்குரிய ஆன்மீக தலைவர் பாரதி வி.பி. ஜோசப் பிரார்த்தனை, ஆன்மீக ஆலோசனை மற்றும் கைகள் வைக்கும் மூலம் அவளுக்கு இறை சிகிச்சை மற்றும் அமைதியை பெற உதவினார் என்பதை அவர் விவரிக்கிறார். த்ரேசியக்குட்டி நிதி சிக்கல்கள், சமுதாய எதிர்ப்புகள் மற்றும் குடும்ப சவால்களைக் கடக்க சிறந்த அதிசய முன்னேற்றங்களை விவரிக்கிறார்.\\n\\nஜொமோல் மரியன் உடன்படிக்கை மற்றும் கிருபாசனம் எப்படி விசுவாசிகளுக்கு வாழ்க்கையின் கடினங்களைத் தாங்கும் வலிமையும், நம்பிக்கை வளர்ச்சிக்கும் உதவுகின்றன என்பதை பிரதிபலிக்கிறார். இந்த அத்தியாயம் பார்வையாளர்களை உடன்படிக்கையின்படி தங்களின் அர்ப்பணிப்பை ஆழப்படுத்தவும், கடவுளின் நேரத்தில் நம்பிக்கையுடன் இருக்கவும் ஊக்குவிக்கிறது, கிருபாசனத்தின் மூலம் ஆசீர்வதிக்கப்பட்ட மாதா பலவீனமானவர்களுக்கு வலுவான இடைமுகமாக இருப்பதாக நம்பிக்கையுடன்.","te":"లివింగ్ ఓరాకిల్స్ ఏపిసోడ్ 7 లో, జొమోల్ వీక్షకులను ప్రార్థన మరియు ప్రతిబింబానికి ఒక పవిత్ర స్థలానికి హృదయపూర్వకంగా స్వాగతిస్తారు, ఇది మరియాన్ ఒప్పందం మరియు కృపాసనం అనే అనుగ్రహభరితమైన స్థలాన్ని కేంద్రబిందువుగా చేసుకుంది, ఇది విశ్వాసులను యేసు క్రీస్తు రెండవ రాబుక్కు సిద్ధం చేస్తుంది.\\n\\nఈ ఎపిసోడ్ లో, వయనాడ్ నుండి త్రేస్యకుట్టి అనే తల్లి తన జీవితం కృపాసనంలో తీసుకున్న మరియాన్ ఒప్పందం ద్వారా ఎలా మార్చుకుంది అనే శక్తివంతమైన సాక్ష్యం చెప్తుంది. తీవ్రమైన పరీక్షల మధ్యలో—తన భర్త మోటార్ న్యూరాన్ వ్యాధితో మరణించడం, మోస్తరు సమస్యలు మరియు తన పిల్లలను ఒంటరిగా పెంచుకోవడం—త్రేస్యకుట్టి ఒప్పందాన్ని ఆచరించి దేవుని వాగ్దానాలను దృఢంగా పట్టుకుంది మరియు బలం మరియు శాంతిని పొందింది.\\n\\nఆమె క్రూఫాసనం వద్ద గౌరవనీయ పాత్రి వి.పి. జోసెఫ్ ప్రార్థనలు, ఆధ్యాత్మిక సలహాలు మరియు చేతులు పెట్టి దేవుని సర్వశక్తిమంతమైన చేర్పుని అందించడంలో కీలక మద్దతు ఇచ్చారని వివరిస్తుంది. త్రేస్యకుట్టి ఆర్థిక కష్టాలు, సమాజ నిరసనలు మరియు కుటుంబ సమస్యల మధ్యలో తనను నిలబెట్టుకున్న అద్భుతమైన భౌతిక, భావోద్వేగ విజయాలను వివరిస్తుంది.\\n\\nజొమోల్ మరియాన్ ఒప్పందం మరియు కృపాసనం ఎలా ఒక శక్తివంతమైన ఆధ్యాత్మిక పాఠశాల మరియు కృపాశ్రవంతమైన ఛానెల్ గా పనిచేస్తున్నాయి, విశ్వాసులను జీవితం లో ఎదురయ్యే కష్టాలను అధిగమించి క్రీస్తు రాబుక్కు ఎదురు చూస్తూ విశ్వాసాన్ని పెంచుకునేలా చేయుతాయో పరిశీలిస్తారు. ఈ ఎపిసోడ్ వీక్షకులను ఒప్పందం పట్ల తమ కట్టుబాటును గాఢం చేసుకోవాలని మరియు దేవుని సమయంపై నమ్మకంతో ఉండాలని ప్రోత్సహిస్తుంది, కృపాసనం ద్వారా ఆశీర్వదించబడిన దివ్యమాత స్వయంగా వారి కోసం శక్తివంతమైన మధ్యవర్తిగా ఉంటారని నమ్ముతూ.","fr":"Dans le 7ème épisode de Living Oracles, Jomol accueille chaleureusement les spectateurs dans un espace sacré de prière et de réflexion centré sur l'Alliance Mariale et le lieu plein de grâce de Kreupasanam, qui prépare les croyants au second avènement de Jésus-Christ.\\n\\nL'épisode présente le témoignage puissant de Thresyakutty, une mère originaire de Wayanad, qui partage comment sa vie a été transformée grâce à l'Alliance Mariale prise à Kreupasanam. Au milieu d'épreuves sévères — y compris la perte de son mari à cause de la maladie du motoneurone, des problèmes de santé rénaux, et la lourde charge d'élever seule ses enfants — Thresyakutty a trouvé force et guérison en embrassant l'alliance et en s'accrochant fermement aux promesses de Dieu.\\n\\nElle raconte comment le Père V.P. Joseph, le leader spirituel respecté de Kreupasanam, lui a apporté un soutien crucial par la prière, le conseil spirituel et l'imposition des mains, l'aidant à recevoir la guérison divine et la paix. Thresyakutty décrit des percées miraculeuses — tant physiques qu'émotionnelles — qui l'ont soutenue face à des difficultés financières, une opposition communautaire et des défis familiaux.\\n\\nJomol réfléchit à la manière dont l'Alliance Mariale et Kreupasanam servent d'école spirituelle puissante et de canal de grâce, équipant les croyants pour endurer les difficultés de la vie et grandir dans la foi en attendant le retour du Christ. L'épisode encourage les spectateurs à approfondir leur engagement envers l'alliance et à faire confiance au temps de Dieu, sachant que la Sainte Mère intercède puissamment pour tous ceux qui la cherchent à travers Kreupasanam.","es":"En el séptimo episodio de Living Oracles, Jomol da una cálida bienvenida a los espectadores a un espacio sagrado de oración y reflexión centrado en el Pacto Mariano y el lugar lleno de gracia de Kreupasanam, que prepara a los creyentes para la segunda venida de Jesucristo.\\n\\nEl episodio presenta el poderoso testimonio de Thresyakutty, una madre de Wayanad, que comparte cómo su vida se transformó a través del Pacto Mariano tomado en Kreupasanam. En medio de graves pruebas, que incluyen la pérdida de su esposo por enfermedad de neurona motora, problemas de salud renal y la carga de criar a sus hijos sola, Thresyakutty encontró fortaleza y sanación al abrazar el pacto y aferrarse firmemente a las promesas de Dios.\\n\\nElla relata cómo el Padre V.P. Joseph, el respetado líder espiritual en Kreupasanam, le brindó apoyo crucial a través de la oración, el consejo espiritual y la imposición de manos, ayudándola a recibir sanación divina y paz. Thresyakutty describe avances milagrosos, tanto físicos como emocionales, que la sostuvieron en medio de dificultades financieras, oposición comunitaria y desafíos familiares.\\n\\nJomol reflexiona sobre cómo el Pacto Mariano y Kreupasanam sirven como una poderosa escuela espiritual y canal de gracia, equipando a los creyentes para soportar las dificultades de la vida y crecer en la fe mientras esperan el regreso de Cristo. El episodio anima a los espectadores a profundizar su compromiso con el pacto y confiar en el tiempo de Dios, sabiendo que la Santísima Madre intercede poderosamente por todos los que la buscan a través de Kreupasanam.","mr":"लिव्हिंग ओरॅकल्सच्या सातव्या भागात, जोमोल प्रेक्षकांचे हार्दिक स्वागत करतात आणि त्यांना प्रार्थना आणि चिंतनाच्या पवित्र स्थळी आमंत्रित करतात, जे मारीयन करार आणि कृपासनम नावाच्या कृपेने परिपूर्ण स्थळी केंद्रित आहे, जे विश्वस्तांना येशू ख्रिस्ताच्या दुसऱ्या येण्याची तयारी करते.\\n\\nया भागात, वयनाडच्या थ्रेस्याकुट्टी नावाच्या आईने आपले जीवन कसे मारीयन कराराद्वारे बदलले ते सांगणारा शक्तिशाली साक्षात्कार सादर केला आहे. कठीण परीक्षांमध्ये—ज्यात तिच्या पतीचा मोटर न्यूरॉन रोगामुळे मृत्यू, किडनीच्या समस्या आणि मुलांना एकट्याने वाढवण्याचा भार यांचा समावेश आहे—थ्रेस्याकुट्टीने करार स्वीकारला आणि देवाच्या वचनांवर दृढ राहून ताकद आणि उपचार प्राप्त केले.\\n\\nती सांगते की कसे फादर व्ही.पी. जोसेफ, कृपासनम येथील सन्माननीय आध्यात्मिक नेते, प्रार्थना, आध्यात्मिक सल्ला आणि हस्तस्पर्शाद्वारे तिला दैवी उपचार आणि शांतता मिळवून देण्यात महत्त्वपूर्ण मदत केली. थ्रेस्याकुट्टी आर्थिक अडचणी, समुदायातील विरोध आणि कुटुंबातील आव्हानांमध्ये तिला आधार देणाऱ्या चमत्कारिक प्रगतींचे वर्णन करते.\\n\\nजोमोल प्रतिबिंबित करतात की मारीयन करार आणि कृपासनम कसे एक शक्तिशाली आध्यात्मिक शाळा आणि कृपेचा मार्ग म्हणून कार्य करतात, ज्यामुळे विश्वस्तांना जीवनातील कठीणाई सहन करण्यासाठी आणि ख्रिस्ताच्या परत येण्याची वाट पाहत श्रद्धेत वाढ करण्यासाठी सज्ज करतात. हा भाग प्रेक्षकांना करारातील आपली बांधिलकी खोल करण्यासाठी आणि देवाच्या वेळेवर विश्वास ठेवण्यासाठी प्रोत्साहित करतो, हे जाणून की धन्य माता कृपासनमच्या माध्यमातून जे त्यांना शोधतात त्यांच्यासाठी शक्तिशाली मध्यस्थ ठरते."},"subtitles":"/assets/oracles/oracles7.json"},{"id":8,"title":{"zh":"活的神谕 - 第8集","bn":"লিভিং ওরাকলস - পর্ব ৮","en":"Living ORACLES - Episode 8","hi":"लिविंग ओराकल्स - एपिसोड 8","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 8","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 8","fr":"Oracles Vivants - Épisode 8","es":"Oráculos Vivientes - Episodio 8","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೮","mr":"लिव्हिंग ओरॅकल्स - भाग 8"},"date":"June 22, 2025","video":"https://youtu.be/9f2t6mt-qRU?si=Get00zin4uEnoD4a","content":{"en":"In the 8th episode of Living Oracles, Jomol warmly welcomes viewers and invites them to enter a sacred space of prayer and reflection focused on the power and promise of the Marian Covenant. She shares the heartfelt testimony of Sheethal, a devoted young woman from Mukkom, Kozhikode, who recounts her journey of faith through intense prayer, Marian devotion, and divine intervention.\\n\\nSheethal speaks of receiving a powerful message from Psalm 103, promising forgiveness and healing, which she embraced deeply during her 90-day Marian Covenant. Her faith was tested when she was diagnosed with a brain tumor, and despite medical warnings of possible complications and limited surgery success, she clung to prayer and the intercession of the Blessed Mother.\\n\\nThrough steadfast trust and spiritual support, including the laying on of hands by Father V.P. Joseph, Sheethal experienced a miraculous healing. Her surgery was successful without complications, defying all odds. She emphasizes how the Marian Covenant was a living channel of divine grace and healing throughout her ordeal.\\n\\nJomol reflects on the biblical themes of forgiveness, healing, and the power of intercession, connecting Sheethal’s testimony with scriptures from the Gospels and Psalms that affirm God’s mercy and healing power.\\n\\nThe episode encourages viewers to hold firm in faith during trials, trusting in God’s timing and the potent spiritual presence of the Marian Covenant. Jomol invites all to experience this living grace as a source of hope, strength, and breakthrough in their own lives.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಎಂಟನೇ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃತ್ಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಶಕ್ತಿ ಮತ್ತು ಭರವಸೆಯ ಮೇಲೆ ಗಮನಹರಿಸಿ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಚಿಂತನೆಗಾಗಿ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಆಹ್ವಾನಿಸುತ್ತಾರೆ.\\n\\nಮುಗಕೋಮ್, ಕೊഴിക്കೋಡ್‌ನ ಸಮರ್ಪಿತ ಯುವತಿ ಶೀತಲ್ ಅವರ ಹೃದಯಸ್ಪರ್ಶಿ ಸಾಕ್ಷ್ಯವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ, ಆತ್ಮದ ಬಲವಾದ ಪ್ರಾರ್ಥನೆ, ಮರಿಯನ್ ಭಕ್ತಿ ಮತ್ತು ದೇವದೂತನ ಹಸ್ತಕ್ಷೇಪದ ಮೂಲಕ ಅವರ ನಂಬಿಕೆಯ ಪಯಣವನ್ನು ವಿವರಿಸುತ್ತಾರೆ.\\n\\nಶೀತಲ್ 103ನೇ ಸಾಂತ್ವನದ ಪ್ರಭಾವಶಾಲಿ ಸಂದೇಶವನ್ನು ಪಡೆದರು, ಕ್ಷಮೆ ಮತ್ತು ಗುಣಮುಖತೆಯನ್ನು ಭರವಸೆ ನೀಡುವ ಈ ಸಂದೇಶವನ್ನು ಅವರು ೯೦ ದಿನಗಳ ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಅವಧಿಯಲ್ಲಿ ಆಳವಾಗಿ ಸ್ವೀಕರಿಸಿದರು. ತಲೆಮೇಲೆ ಟ್ಯೂಮರ್ ಅನ್ನು ನಿರ್ಣಯಿಸಿದಾಗ ಅವರ ನಂಬಿಕೆ ಪರೀಕ್ಷೆಗೆ ಒಳಗಾಯಿತು ಮತ್ತು ವೈದ್ಯಕೀಯ ಎಚ್ಚರಿಕೆಗಳಿಗೆ, ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯ ಸೀಮಿತ ಯಶಸ್ಸಿಗೆ ಸತ್ಯವಾಗಿ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಆಶೀರ್ವದಿತ ತಾಯಿಯ ಮಧ್ಯಸ್ಥಿಕೆಯನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಂಡರು.\\n\\nಅದೃಷ್ಟವೆಂದರೆ ಫಾದರ್ ವಿ.ಪಿ. ಜೋಸೆಫ್ ಅವರ ಕೈ ಹಚ್ಚುವ ಮೂಲಕ ಸ್ಥಿರವಾದ ನಂಬಿಕೆ ಮತ್ತು ಆತ್ಮಿಕ ಬೆಂಬಲದಿಂದ ಶೀತಲ್ ಅದ್ಭುತ ಗುಣಮುಖತೆಯನ್ನು ಅನುಭವಿಸಿದರು. ಅವರ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ಯಾವುದೇ ಸಂಕೀರ್ಣತೆಗಳಿಲ್ಲದೆ ಯಶಸ್ವಿಯಾಯಿತು, ಎಲ್ಲ ಸಾಧ್ಯತೆಗಳನ್ನು ಮೀರಿ. ಮರಿಯನ್ ಒಡಂಬಡಿಕೆ ಅವರ ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ದೇವೀಯ ಕೃಪೆಯ ಮತ್ತು ಗುಣಮುಖತೆಯ ಜೀವಂತ ಚಾನೆಲ್ ಆಗಿದ್ದನ್ನು ಅವರು ಹೆಚ್ಚಾಗಿ ಒತ್ತಿಕೊಂಡರು.\\n\\nಜೋಮೋಲ್ ಕ್ಷಮೆ, ಗುಣಮುಖತೆ ಮತ್ತು ಮಧ್ಯಸ್ಥಿಕೆಯ ಶಕ್ತಿಯ ಬೈಬಲ್ ವಿಷಯಗಳನ್ನು ಆಲೋಚಿಸಿ, ಶೀತಲ್ ಅವರ ಸಾಕ್ಷ್ಯವನ್ನು ಸುವಾರ್ತೆಗಳು ಮತ್ತು ಸಾಂತ್ವನಗಳಿಂದ ದೇವರ ಕೃಪೆ ಮತ್ತು ಗುಣಮುಖತೆಯ ಶಕ್ತಿಯನ್ನು ದೃಢಪಡಿಸುವ ಶಾಶ್ವತ ಗ್ರಂಥಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.\\n\\nಈ ಕಂತು ಪ್ರೇಕ್ಷಕರನ್ನು ಸಂಕಷ್ಟದ ಸಮಯದಲ್ಲಿ ನಂಬಿಕೆಯನ್ನು ಬಿಗಿಗೊಳಿಸಲು, ದೇವರ ಸಮಯ ಮತ್ತು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯ ಶಕ್ತಿಶಾಲಿ ಆತ್ಮಿಕ ಹಾಜರತೆಯನ್ನು ನಂಬಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ. ಜೋಮೋಲ್ ಈ ಜೀವಂತ ಕೃಪೆಯನ್ನು ತಮ್ಮ ಜೀವನದಲ್ಲಿ ಆಶೆ, ಶಕ್ತಿ ಮತ್ತು ಮುನ್ನಡೆಗೆ ಮೂಲವಾಗಿ ಅನುಭವಿಸಲು ಎಲ್ಲರನ್ನು ಆಹ್ವಾನಿಸುತ್ತಾರೆ.","zh":"在《活的神谕》第八集中，乔莫尔热情欢迎观众，邀请他们进入一个以圣母盟约的力量与承诺为核心的祈祷与反思的神圣空间。她分享了来自科泽科德穆科姆的虔诚年轻女子希塔尔的真挚见证，讲述了她通过热切祈祷、圣母奉献和神圣干预的信仰旅程。\\n\\n希塔尔谈到她从诗篇103篇收到的强烈信息，承诺宽恕与医治，她在为期90天的圣母盟约中深切接受了这一信息。她的信仰经受了考验，当她被诊断出脑肿瘤，尽管医生警告可能出现并发症且手术成功率有限，她依然坚持祈祷和圣母的代祷。\\n\\n通过坚定的信任和精神支持，包括主教V.P. 约瑟夫的按手，希塔尔经历了奇迹般的康复。她的手术顺利，没有并发症，打破了所有困难。她强调圣母盟约是神圣恩典与治愈的活渠道，贯穿了她的整个过程。\\n\\n乔莫尔反思了圣经中关于宽恕、治愈和代祷力量的主题，将希塔尔的见证与福音书和诗篇中的经文联系起来，这些经文肯定了上帝的慈悲与医治能力。\\n\\n本集鼓励观众在试炼中坚定信仰，相信上帝的时间安排和圣母盟约强大的灵性存在。乔莫尔邀请所有人体验这活的恩典，作为希望、力量和突破的源泉。","bn":"লাইভিং ওরাকলস-এর অষ্টম পর্বে, জোমল উষ্ণ অভ্যর্থনা জানিয়ে দর্শকদের প্রার্থনা ও চিন্তার একটি পবিত্র স্থানে আমন্ত্রণ জানান যা মেরিয়ান উদামপাদির শক্তি এবং প্রতিশ্রুতির উপর কেন্দ্রীভূত। তিনি মুক্কম, কোঝিকোড থেকে আসা নিবেদিত যুবতী শীতলের হৃদয়স্পর্শী সাক্ষ্য শেয়ার করেন, যিনি তার গভীর প্রার্থনা, মেরিয়ান ভক্তি এবং ঐশ্বরিক হস্তক্ষেপের মাধ্যমে বিশ্বাসের যাত্রা বর্ণনা করেন।\\n\\nশীতল ১০৩ নম্বর সঙ্গীত থেকে একটি শক্তিশালী বার্তা পেয়েছিলেন, যা ক্ষমা ও নিরাময়ের প্রতিশ্রুতি দেয়, যা তিনি ৯০ দিনের মেরিয়ান উদামপাদির সময় গভীরভাবে গ্রহণ করেছিলেন। ব্রেন টিউমার নির্ণয়ের সময় তার বিশ্বাস পরীক্ষিত হয়, এবং চিকিৎসকদের সতর্কবার্তার পরেও তিনি প্রার্থনা ও ধন্য মাতার মধ্যস্থতার ওপর নির্ভর করেছিলেন।\\n\\nবিশ্বস্ততা ও আধ্যাত্মিক সমর্থনের মাধ্যমে, যার মধ্যে বিশপ ভি.পি. জোসেফের হাত রাখাও ছিল, শীতল একটি অলৌকিক নিরাময় অনুভব করেন। তার অস্ত্রোপচার সফল হয় এবং কোন জটিলতা ছাড়াই সম্পন্ন হয়, সমস্ত প্রতিবন্ধকতা অতিক্রম করে। তিনি জোর দিয়ে বলেন যে মেরিয়ান উদামপাদি তার দুঃসময়ে ঐশ্বরিক করুণা এবং নিরাময়ের একটি জীবন্ত মাধ্যম ছিল।\\n\\nজোমল বাইবেলের ক্ষমা, নিরাময় এবং মধ্যস্থতার শক্তির বিষয়গুলো নিয়ে প্রতিফলন করেন, শীতলের সাক্ষ্যকে সুশিক্ষা এবং সঙ্গীত থেকে সংগৃহীত বাইবেলের বাণীর সঙ্গে যুক্ত করেন, যা ঈশ্বরের করুণা এবং নিরাময়ের ক্ষমতাকে নিশ্চিত করে।\\n\\nপর্বটি দর্শকদের পরীক্ষার সময় তাদের বিশ্বাস দৃঢ় রাখতে উৎসাহিত করে, ঈশ্বরের সময়ের প্রতি বিশ্বাস রাখতে এবং মেরিয়ান উদামপাদির শক্তিশালী আধ্যাত্মিক উপস্থিতিকে গ্রহণ করতে আহ্বান জানায়। জোমল সবাইকে এই জীবন্ত অনুগ্রহকে তাদের জীবনের আশা, শক্তি এবং সাফল্যের উৎস হিসেবে গ্রহণ করার জন্য আমন্ত্রণ জানান।","hi":"लिविंग ओराकल्स के आठवें एपिसोड में, जोमोल दर्शकों का गर्मजोशी से स्वागत करती हैं और उन्हें प्रार्थना और चिंतन के एक पवित्र स्थान में आमंत्रित करती हैं जो मैरीअन उदामपादी की शक्ति और वादे पर केंद्रित है। वह मक्कम, कोझिकोड की समर्पित युवती शीथल की हार्दिक गवाही साझा करती हैं, जो तीव्र प्रार्थना, मैरीअन भक्ति और दिव्य हस्तक्षेप के माध्यम से अपने विश्वास की यात्रा बताती हैं।\\n\\nशीथल भजन संहिता 103 से एक शक्तिशाली संदेश प्राप्त करती हैं, जो क्षमा और चिकित्सा का वादा करता है, जिसे उन्होंने 90-दिन के मैरीअन उदामपादी के दौरान गहराई से अपनाया। जब उन्हें मस्तिष्क ट्यूमर का निदान हुआ, तब उनका विश्वास परीक्षण में पड़ा, और चिकित्सा चेतावनियों के बावजूद, उन्होंने प्रार्थना और धन्य माता के मध्यस्थता पर भरोसा बनाए रखा।\\n\\nदृढ़ विश्वास और आध्यात्मिक समर्थन के माध्यम से, जिसमें बिशप वी.पी. जोसेफ के हाथ रखने सहित, शीथल ने एक चमत्कारी चिकित्सा का अनुभव किया। उनकी सर्जरी बिना किसी जटिलता के सफल रही, सभी बाधाओं को पार करते हुए। वह जोर देती हैं कि मैरीअन उदामपादी उनके कष्टों के दौरान दिव्य कृपा और चिकित्सा का एक जीवंत माध्यम था।\\n\\nजोमोल क्षमा, चिकित्सा, और मध्यस्थता की शक्ति के बाइबिल विषयों पर चिंतन करती हैं, शीथल की गवाही को सुसमाचार और भजन संहिता की शास्त्रीय व्याख्याओं से जोड़ती हैं, जो परमेश्वर की दया और चिकित्सा शक्ति की पुष्टि करती हैं।\\n\\nएपिसोड दर्शकों को परीक्षणों के दौरान विश्वास दृढ़ रखने, परमेश्वर के समय पर भरोसा करने, और मैरीअन उदामपादी की शक्तिशाली आध्यात्मिक उपस्थिति को स्वीकार करने के लिए प्रोत्साहित करता है। जोमोल सभी को इस जीवित कृपा को अपने जीवन में आशा, शक्ति और सफलता के स्रोत के रूप में अनुभव करने का निमंत्रण देती हैं।","ta":"லிவிங் ஓரகில்ஸ் 8வது தொகுப்பில், ஜோமால் பார்வையாளர்களுக்கு இனிமையாக வரவேற்பு அளித்து, மரியன் உடம்படியின் சக்தி மற்றும் வாக்குறுதியை மையமாகக் கொண்டு பிரார்த்தனை மற்றும் கவனிப்பு என்ற புனித இடத்திற்கு அழைக்கிறார். மூக்கோம், கோழிக்கோடு சேர்ந்த நம்பிக்கை மிகுந்த இளம் பெண் சீதலை அவருடைய தீவிர பிரார்த்தனை, மரியன் பக்தி மற்றும் தெய்வீக இடையூறு வழியாக தனது விசுவாசப் பயணத்தை பகிர்கிறார்.\\n\\nசீதல் 103வது சங்கீதம் மூலம் ஒரு சக்திவாய்ந்த செய்தியைப் பெற்றார், அதில் மன்னிப்பு மற்றும் குணமாக்கல் வாக்குறுதி உள்ளது, இது 90 நாள் மரியன் உடம்படியில் ஆழமாக ஏற்றுக்கொள்ளப்பட்டது. மூளை கட்டி என்று கண்டறியப்பட்டபோது அவருடைய விசுவாசம் சோதனைக்கு உள்ளானது, மருத்துவ எச்சரிக்கைகளுக்கு பின் அவரால் பிரார்த்தனை மற்றும் புனித தாயார் இடையூறில் நம்பிக்கை வைக்கப்பட்டது.\\n\\nவிசுவாசத்துடன் மற்றும் ஆவியரின் ஆதரவுடன், பிஷப் வி.பி. ஜோசப் அவர்களின் கைகளை வைத்தல் உட்பட, சீதல் அற்புத குணமடைந்தார். அறுவை சிகிச்சை எந்தவிதமான சிக்கல்களும் இல்லாமல் வெற்றிகரமாக முடிந்தது, எல்லா தடைகளையும் மீறி. மரியன் உடம்படி அவளது போராட்டத்தின் போது தெய்வீக கிருபை மற்றும் குணப்படுத்தலுக்கான உயிர்வாழும் ஊடாக இருந்தது என்பதை அவர் வலியுறுத்துகிறார்.\\n\\nஜோமால் மன்னிப்பு, குணமடைதல் மற்றும் இடையூறின் சக்தி ஆகிய பைபிள் தீமைகளைப் பற்றி சிந்திக்கிறார், சீதலின் சாட்சி மற்றும் பரிசுத்த வேதாகமத்தின் வசனங்களுடன் இணைத்து, கடவுளின் கருணை மற்றும் குணமடைதல் சக்தியை உறுதிப்படுத்துகிறார்.\\n\\nஇந்தத் தொகுப்பு பார்வையாளர்களை சோதனைகளின் போது விசுவாசத்தை வலுப்படுத்தவும், கடவுளின் நேரத்திற்கு நம்பிக்கை வைக்கவும், மரியன் உடம்படியின் ஆவியரின் சக்திவாய்ந்த இருப்பை ஏற்கவும் ஊக்குவிக்கிறது. ஜோமால் அனைவரையும் இந்த உயிர்வாழும் கிருபையை தங்கள் வாழ்க்கையில் நம்பிக்கை, பலம் மற்றும் வெற்றிக்கான மூலமாக அனுபவிக்க அழைக்கிறார்.","te":"లివింగ్ ఓరాకిల్స్ 8వ ఎపిసోడ్ లో, జోమోల్ ప్రేక్షకులను సాదరంగా స్వాగతించి, మరియాన్ உடంబడి శక్తి మరియు వాగ్దానం పై దృష్టి పెట్టి ప్రార్థన మరియు ప్రతిబింబం యొక్క పవిత్ర స్థలంలో ప్రవేశించమని ఆహ్వానిస్తున్నారు. కోజికోడు ముక్కం నుండి వచ్చిన విశ్వాసం గల యువతి శీతల్ తన తీవ్రమైన ప్రార్థన, మరియాన్ భక్తి మరియు దివ్య మధ్యస్థత ద్వారా తన విశ్వాస ప్రయాణాన్ని పంచుకున్నారు.\\n\\nశీతల్ భజన 103 నుండి శక్తివంతమైన సందేశం అందుకున్నది, ఇది క్షమాపణ మరియు ఆరోగ్యపరచడం వాగ్దానం చేస్తుంది, ఆమె 90 రోజుల మరియాన్ உடம்படி లో దీన్ని లోతుగా అంగీకరించింది. ఆమెకు మెదడు ట్యూమర్ ఉన్నట్లు నిర్ధారించబడినప్పుడు ఆమె విశ్వాసం పరీక్షకు లోనైంది, వైద్య సూచనలు ఉన్నప్పటికీ ఆమె ప్రార్థన మరియు ఆశీస్సులతో కూడిన తల్లి మధ్యస్థత పై దృఢంగా నిలిచింది.\\n\\nబిషప్ వి.పి. జోసెఫ్ చేతుల మీదుగా ఆశీర్వదించడం సహా, స్థిరమైన విశ్వాసం మరియు ఆధ్యాత్మిక మద్దతుతో, శీతల్ అద్భుతమైన ఆరోగ్యాన్ని పొందింది. ఆమె శస్త్రచికిత్స క్రమంలో ఎటువంటి క్లిష్టతలు లేకుండా విజయవంతంగా జరిగింది, అన్ని అడ్డంకులను అధిగమించి. మరియాన్ உடம்படி ఆమె కష్టకాలంలో దైవ కృప మరియు ఆరోగ్యానికి జీవిస్తూనే మార్గం అన్నదే ఆమె ప్రధానమైన విషయం.\\n\\nజోమోల్ క్షమాపణ, ఆరోగ్యం మరియు మధ్యస్థత శక్తుల గురించి బైబిల్ లోని విషయాలపై ఆలోచించి, శీతల్ సాక్ష్యాన్ని సువార్త మరియు భజనాలలోని వచనాలతో అనుసంధానం చేస్తూ దేవుని దయ మరియు ఆరోగ్య శక్తిని ధృవీకరిస్తారు.\\n\\nఈ ఎపిసోడ్ ప్రేక్షకులను పరీక్షల సమయంలో విశ్వాసం నిలబెట్టుకోవడానికి, దేవుని సమయాన్ని నమ్మడానికి మరియు మరియాన్ உடம்பడి శక్తివంతమైన ఆధ్యాత్మిక ఉనికిని అంగీకరించడానికి ప్రేరేపిస్తుంది. జోమోల్ అందరికీ ఈ జీవించే కృపను వారి జీవితాలలో ఆశ, బలం మరియు విజయానికి మూలంగా అనుభవించాలని ఆహ్వానిస్తున్నారు.","fr":"Dans le 8e épisode de Living Oracles, Jomol accueille chaleureusement les téléspectateurs et les invite à entrer dans un espace sacré de prière et de réflexion centré sur la puissance et la promesse de l’Alliance Mariale. Elle partage le témoignage émouvant de Sheethal, une jeune femme dévouée de Mukkom, Kozhikode, qui raconte son parcours de foi à travers une prière intense, une dévotion mariale et une intervention divine.\\n\\nSheethal parle avoir reçu un message puissant du Psaume 103, promettant pardon et guérison, qu’elle a profondément embrassé lors de sa Convention Mariale de 90 jours. Sa foi a été mise à l’épreuve lorsqu’elle a été diagnostiquée d’une tumeur au cerveau, et malgré les avertissements médicaux sur les complications possibles et la réussite limitée de la chirurgie, elle s’est accrochée à la prière et à l’intercession de la Bienheureuse Mère.\\n\\nGrâce à une confiance ferme et un soutien spirituel, y compris la pose des mains par l’évêque V.P. Joseph, Sheethal a vécu une guérison miraculeuse. Sa chirurgie a réussi sans complications, défiant tous les pronostics. Elle souligne comment l’Alliance Mariale a été un canal vivant de grâce divine et de guérison tout au long de son épreuve.\\n\\nJomol réfléchit aux thèmes bibliques du pardon, de la guérison et du pouvoir de l’intercession, reliant le témoignage de Sheethal aux Écritures des Évangiles et des Psaumes qui affirment la miséricorde et la puissance de guérison de Dieu.\\n\\nL’épisode encourage les spectateurs à garder la foi pendant les épreuves, à faire confiance au timing de Dieu et à embrasser la présence spirituelle puissante de l’Alliance Mariale. Jomol invite tous à expérimenter cette grâce vivante comme source d’espoir, de force et de percée dans leur propre vie.","es":"En el octavo episodio de Living Oracles, Jomol da una cálida bienvenida a los espectadores e invita a entrar en un espacio sagrado de oración y reflexión centrado en el poder y la promesa del Pacto Mariano. Ella comparte el testimonio sincero de Sheethal, una joven devota de Mukkom, Kozhikode, que narra su camino de fe a través de la intensa oración, la devoción mariana y la intervención divina.\\n\\nSheethal habla de haber recibido un poderoso mensaje del Salmo 103, que promete perdón y sanación, mensaje que abrazó profundamente durante su Pacto Mariano de 90 días. Su fe fue puesta a prueba cuando le diagnosticaron un tumor cerebral y, a pesar de las advertencias médicas sobre posibles complicaciones y el éxito limitado de la cirugía, se aferró a la oración y la intercesión de la Madre Bendita.\\n\\nA través de una confianza firme y apoyo espiritual, incluyendo la imposición de manos del obispo V.P. Joseph, Sheethal experimentó una sanación milagrosa. Su cirugía fue exitosa sin complicaciones, desafiando todas las probabilidades. Ella enfatiza cómo el Pacto Mariano fue un canal vivo de gracia divina y sanación durante toda su prueba.\\n\\nJomol reflexiona sobre los temas bíblicos del perdón, la sanación y el poder de la intercesión, conectando el testimonio de Sheethal con las Escrituras de los Evangelios y Salmos que afirman la misericordia y el poder sanador de Dios.\\n\\nEl episodio anima a los espectadores a mantener firme la fe durante las pruebas, confiar en el tiempo de Dios y abrazar la poderosa presencia espiritual del Pacto Mariano. Jomol invita a todos a experimentar esta gracia viviente como fuente de esperanza, fortaleza y avance en sus propias vidas.","mr":"लिव्हिंग ओरॅकल्सच्या आठव्या भागात, जोमोल प्रेक्षकांचे हार्दिक स्वागत करते आणि त्यांना प्रार्थना आणि चिंतनाच्या पवित्र ठिकाणी आमंत्रित करते जे मॅरियन उदंपादीच्या शक्ती आणि वचनावर केंद्रित आहे. ती मक्कम, कोझिकोड येथील समर्पित तरुणी शीथलचा हृदयस्पर्शी साक्षात्कार शेअर करते, जिने तीव्र प्रार्थना, मॅरियन भक्ती आणि दैवी हस्तक्षेपाद्वारे तिच्या विश्वासाच्या प्रवासाचे वर्णन केले.\\n\\nशीथलने भजन १०३ मधून एक शक्तिशाली संदेश प्राप्त केला, ज्यात क्षमा आणि आरोग्याचे वचन आहे, जे तिने ९० दिवसांच्या मॅरियन उदंपादीदरम्यान खोलवर स्वीकारले. तिचा विश्वास चाचणीला आला जेव्हा तिला मेंदू ट्यूमरचा निदान झाला, आणि वैद्यकीय इशाऱ्यांनंतरही तिने प्रार्थना आणि धन्य आईच्या मध्यस्थतेवर विश्वास ठेवला.\\n\\nठाम विश्वास आणि आध्यात्मिक समर्थनाद्वारे, ज्यात बिशप व्ही.पी. जोसेफ यांचे हस्तांदोलन देखील होते, शीथलने एक चमत्कारिक बरेपण अनुभवले. तिचे शस्त्रक्रिया कोणत्याही गुंतागुंतशिवाय यशस्वी झाले, सर्व अडथळ्यांना पार करून. ती जोर देते की मॅरियन उदंपादी हा तिच्या त्रासात दैवी कृपा आणि आरोग्याचा एक जिवंत वाहक होता.\\n\\nजोमोल क्षमा, आरोग्य आणि मध्यस्थतेच्या बायबलीय विषयांवर विचार करते, शीथलच्या साक्ष्याला सुसमाचार आणि भजनातून घेतलेल्या शास्त्रांसह जोडते, जे देवाच्या दया आणि आरोग्य शक्तीची पुष्टी करतात.\\n\\nहा भाग प्रेक्षकांना त्यांच्या परीक्षांदरम्यान विश्वास ठाम ठेवण्यास, देवाच्या वेळेवर विश्वास ठेवण्यास आणि मॅरियन उदंपादीच्या सामर्थ्यवान आध्यात्मिक उपस्थितीला स्वीकारण्यास प्रोत्साहित करतो. जोमोल सर्वांना ही जिवंत कृपा त्यांच्या जीवनात आशा, शक्ती आणि यश यासाठी अनुभवण्याचं आमंत्रण देते."},"subtitles":"/assets/oracles/oracles8.json"},{"id":9,"title":{"zh":"活的神谕 - 第9集","bn":"লিভিং ওরাকলস - পর্ব ৯","en":"Living ORACLES - Episode 9","hi":"लिविंग ओराकल्स - एपिसोड 9","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 9","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 9","fr":"Oracles Vivants - Épisode 9","es":"Oráculos Vivientes - Episodio 9","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೯","mr":"लिव्हिंग ओरॅकल्स - भाग 9"},"date":"June 29, 2025","video":"https://youtu.be/j0AIWNoAnI0?si=4KhpVBjcxpp4CXJs","content":{"en":"In the 9th episode of Living Oracles, Jomol warmly welcomes viewers and invites them into a sacred space of prayer and reflection centered on the power of the Marian Udampadi. She introduces the heartfelt testimony of Davis, a humble newspaper agent from kalathode, Thrissur, who shares his profound experience of divine intervention through faith and Marian devotion.\\n\\nDavis recounts his long struggle to receive a rightful payment of 75,000 rupees from the bank, a sum delayed for over ten years despite his honest work. Feeling discouraged and helpless, Davis sought comfort and guidance through prayer at Kreupasanam Church. There, through Marian Udampadi worship and the intercession of the Blessed Mother, his circumstances began to change in miraculous ways.\\n\\nHe vividly describes a vision of the Holy Mother appearing to him, encouraging him to take his plea to the authorities. This spiritual encounter gave Davis the strength to persevere. Miraculously, within a short time, the bank manager was moved to approve and release the funds, validating the power of faith and prayer. Davis emphasizes how the Marian Udampadi acted as a powerful channel for divine justice and mercy.\\n\\nThroughout the episode, Jomol interweaves biblical reflections, highlighting scriptural promises such as those from the Psalms and prophetic books, illustrating how God sends His angels to stand by and fight on behalf of the faithful. She emphasizes the transformative power of Marian intercession and the living presence of God’s spirit guiding believers through trials.\\n\\nJomol concludes the episode by encouraging viewers to trust in God’s timing and to embrace the Marian Udampadi devotion as a source of hope and strength, reminding all that even in prolonged struggles, divine grace is at work preparing a path toward breakthrough and blessing.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ತೊಂಬತ್ತನೇ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃತ್ಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ ಮರಿಯನ್ ಉದಂಪಾಡಿ ಶಕ್ತಿಯನ್ನು ಕೇಂದ್ರಿತವಾಗಿ ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಚಿಂತನೆಗಾಗಿ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಆಹ್ವಾನಿಸುತ್ತಾರೆ. ಅವರು ಕಲത്തೋಡೆ, ತ್ರಿಶೂರುನ ಉದಾರ ನ್ಯೂಸ್ ಏಜೆಂಟ್ ಡೇವಿಸ್ ಅವರ ಹೃದಯಸ್ಪರ್ಶಿ ಸಾಕ್ಷ್ಯವನ್ನು ಪರಿಚಯಿಸುತ್ತಾರೆ, ಯಾರು ನಂಬಿಕೆ ಮತ್ತು ಮರಿಯನ್ ಭಕ್ತಿಯಿಂದ ದೇವದೂತನ ಹಸ್ತಕ್ಷೇಪದ ಗಾಢ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ.\\n\\nಡೇವಿಸ್ ಬ್ಯಾಂಕಿನಿಂದ ೭೫,೦೦೦ ರೂಪಾಯಿಯ ನಿಷ್ಪಕ್ಷಪಾತ ಪಾವತಿಗಾಗಿ ದೀರ್ಘ ಕಾಲ ಹೋರಾಟ ನಡೆಸಿದ ಅನುಭವವನ್ನು ವಿವರಿಸುತ್ತಾರೆ, ಒಳ್ಳೆಯ ಕೆಲಸ ಮಾಡಿದರೂ ಹತ್ತು ವರ್ಷಗಳಿಗಿಂತ ಹೆಚ್ಚು ತಡವಾಯಿತು. ನಿರಾಸೆಯಾಗಿದ್ದಾಗ, ಡೇವಿಸ್ ಕ್ರೆಉಪಾಸನಂ ಚರ್ಚಿನಲ್ಲಿ ಪ್ರಾರ್ಥನೆ ಮೂಲಕ ಆರಾಮ ಮತ್ತು ಮಾರ್ಗದರ್ಶನವನ್ನು ಹುಡುಕಿದರು. ಅಲ್ಲಿ ಮರಿಯನ್ ಉದಂಪಾಡಿ ಆರಾಧನೆ ಮತ್ತು ಆಶೀರ್ವದಿತ ತಾಯಿಯ ಮಧ್ಯಸ್ಥಿಕೆ ಮೂಲಕ ಅವರ ಪರಿಸ್ಥಿತಿಗಳು ಅದ್ಭುತ ರೀತಿಯಲ್ಲಿ ಬದಲಾಯಿತು.\\n\\nಅವರು ಪವಿತ್ರ ತಾಯಿಯ ದರ್ಶನವನ್ನು ಪ್ರತ್ಯಕ್ಷವಾಗಿ ವಿವರಿಸುತ್ತಾರೆ, ಪ್ರಾಧಿಕಾರಿಗಳಿಗೆ ತಮ್ಮ ಮನವಿಯನ್ನು ಮುಟ್ಟಿಸಲು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಾರೆ. ಈ ಆತ್ಮಿಕ ಸನ್ನಿವೇಶ ಡೇವಿಸ್ ಅವರಿಗೆ ಸಹನೆ ತೋರಲು ಶಕ್ತಿ ನೀಡಿತು. ಅದ್ಭುತವಾಗಿ, ಕಡಿಮೆ ಸಮಯದಲ್ಲಿ ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅನುಮೋದಿಸಿ ಹಣ ಬಿಡುಗಡೆ ಮಾಡಿದರು, ನಂಬಿಕೆ ಮತ್ತು ಪ್ರಾರ್ಥನೆಯ ಶಕ್ತಿಯನ್ನು ಸಾಬೀತುಪಡಿಸಿದರು. ಡೇವಿಸ್ ಮರಿಯನ್ ಉದಂಪಾಡಿ ದೇವರ ನ್ಯಾಯ ಮತ್ತು ಕೃಪೆಯ ಶಕ್ತಿಶಾಲಿ ಚಾನೆಲ್ ಆಗಿದ್ದನ್ನು ಒತ್ತಿಪಡಿಸುತ್ತಾರೆ.\\n\\nಈ ಕಂತಿನಾದ್ಯಂತ, ಜೋಮೋಲ್ ಬೈಬಲ್ ಚಿಂತನೆಗಳನ್ನು ಒಳಗೊಂಡು ಸಾಂತ್ವನಗಳ ಮತ್ತು ಭವಿಷ್ಯವಾಣಿಗಳ ಗ್ರಂಥಗಳಿಂದ ಬರುವ ದೇವರ ದೇವದೂತರು ನಂಬಿಕೆಯಿಂದಲೂ ಹೋರಾಡುತ್ತಾರೆ ಎಂಬ ಭರವಸೆಗಳನ್ನು ಹೈಲೈಟ್ ಮಾಡುತ್ತಾರೆ. ಅವರು ಮರಿಯನ್ ಮಧ್ಯಸ್ಥಿಕೆಯ ಪರಿವರ್ತನೆಯ ಶಕ್ತಿಯನ್ನೂ ದೇವರ ಆತ್ಮದ ಜೀವಂತ ಹಾಜರತೆಯನ್ನೂ ದೃಢಪಡಿಸುತ್ತಾರೆ, ಅದು ಸಂಕಷ್ಟಗಳಲ್ಲೂ ನಂಬಿಕೆಯನ್ನು ಮುನ್ನಡೆಸುತ್ತದೆ.\\n\\nಜೋಮೋಲ್ ದೇವರ ಸಮಯದ ಮೇಲಿನ ನಂಬಿಕೆಯನ್ನು ಉತ್ತೇಜಿಸುತ್ತಾರೆ ಮತ್ತು ಮರಿಯನ್ ಉದಂಪಾಡಿ ಭಕ್ತಿಯನ್ನು ಆಶೆ ಮತ್ತು ಶಕ್ತಿಯ ಮೂಲವಾಗಿ ಅಪ್ಪಿಕೊಳ್ಳಲು ಪ್ರೇಕ್ಷಕರನ್ನು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಾರೆ, ದೀರ್ಘಕಾಲ ಹೋರಾಟಗಳಲ್ಲಿಯೂ ಕೂಡ, ದೇವರ ಕೃಪೆಯು ಮುನ್ನಡೆಗಾಗಿ ದಾರಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ ಎಂಬುದನ್ನು ಸ್ಮರಿಸುತ್ತಾರೆ.","zh":"在《活着的神谕》第九集，乔莫尔热情地欢迎观众，邀请他们进入一个以玛利亚乌丹帕迪力量为中心的祈祷与反思的神圣空间。她介绍了来自特里苏尔卡拉托德的一位谦逊报刊代理戴维斯的真挚见证，他分享了通过信仰和玛利亚奉献经历的深刻神圣干预。\\n\\n戴维斯回忆了他为从银行获得应得的75,000卢比支付所经历的长时间斗争，尽管他诚实工作，但这笔款项被拖延了十多年。感到沮丧和无助，戴维斯通过在克鲁帕萨南教堂的祈祷寻求安慰和指引。在那里，通过玛利亚乌丹帕迪的崇拜和圣母的代祷，他的境况开始以奇迹般的方式改变。\\n\\n他生动地描述了圣母显现的异象，鼓励他向有关当局提出请求。这次灵性经历给予了戴维斯坚持的力量。奇迹般地，在短时间内，银行经理被感动批准并释放了资金，验证了信仰和祈祷的力量。戴维斯强调玛利亚乌丹帕迪作为神圣公正与慈悲强大渠道的作用。\\n\\n在整个节目中，乔莫尔穿插了圣经反思，强调诗篇和先知书中的经文承诺，说明上帝如何派遣天使站在信徒一方并为其战斗。她强调了玛利亚代祷的变革力量以及上帝圣灵在试炼中引导信徒的活生生的存在。\\n\\n乔莫尔总结时鼓励观众信靠上帝的时机，接受玛利亚乌丹帕迪的奉献作为希望与力量的源泉，并提醒大家即使在漫长的挣扎中，神的恩典也在为突破和祝福铺路。","bn":"লিভিং ওরাকলসের নবম পর্বে, জোমল দর্শকদের উষ্ণ অভ্যর্থনা জানান এবং মারিয়ান উদমপদীর শক্তির কেন্দ্রবিন্দুতে প্রার্থনা এবং প্রতিফলনের পবিত্র স্থানে আমন্ত্রণ জানান। তিনি ত্রিশুর কাল্লাথোডের একজন বিনম্র সংবাদপত্র এজেন্ট ডেভিসের হৃদয়স্পর্শী সাক্ষ্যের পরিচয় করান, যিনি বিশ্বাস এবং মারিয়ান ভক্তির মাধ্যমে ঐশ্বরিক হস্তক্ষেপের গভীর অভিজ্ঞতা শেয়ার করেন।\\n\\nডেভিস তার সৎ কাজের পরও দশ বছরের বেশি সময় ধরে বিলম্বিত ৭৫,০০০ রুপির প্রকৃত অর্থপ্রদানের দীর্ঘ সংগ্রামের কথা স্মরণ করেন। হতাশ এবং অসহায় বোধ করে, ডেভিস ক্রেউপাসনম চার্চে প্রার্থনার মাধ্যমে সান্ত্বনা এবং পথপ্রদর্শনের সন্ধান করেন। সেখানে, মারিয়ান উদমপদী উপাসনা এবং ধন্য মাতার মধ্যস্থতার মাধ্যমে, তাঁর পরিস্থিতি অলৌকিকভাবে পরিবর্তিত হতে শুরু করে।\\n\\nতিনি পবিত্র মাতার এক দৃষ্টান্তমূলক দর্শনের কথা জীবন্তভাবে বর্ণনা করেন, যিনি তাঁকে কর্তৃপক্ষের কাছে তাঁর অনুনয়ের বিষয়টি নিতে উৎসাহিত করেন। এই আধ্যাত্মিক সাক্ষাৎ ডেভিসকে সহিষ্ণু হওয়ার শক্তি দেয়। অলৌকিকভাবে, অল্প সময়ের মধ্যে, ব্যাংক ম্যানেজার অনুদানটি অনুমোদন এবং মুক্তি দেওয়ার জন্য প্ররোচিত হন, যা বিশ্বাস এবং প্রার্থনার শক্তিকে প্রমাণ করে। ডেভিস জোর দিয়ে বলেন কীভাবে মারিয়ান উদমপদী ঐশ্বরিক ন্যায় এবং করুণার জন্য একটি শক্তিশালী মাধ্যম হিসেবে কাজ করেছে।\\n\\nপর্বজুড়ে, জোমল বাইবেলের প্রতিফলন একত্রিত করেন, যেখানে স্তবক এবং ভবিষ্যদ্বাণীমূলক গ্রন্থের বাণীগুলি তুলে ধরা হয়, যা দেখায় কীভাবে ঈশ্বর তাঁর দেবদূতদের বিশ্বাসীদের পক্ষে দাঁড়াতে এবং লড়াই করতে পাঠান। তিনি মারিয়ানের মধ্যস্থতার রূপান্তরকারী শক্তি এবং পরীক্ষার মধ্য দিয়ে বিশ্বাসীদের পরিচালনা করা ঈশ্বরের আত্মার জীবন্ত উপস্থিতি জোর দেন।\\n\\nজোমল পর্বটি শেষ করেন দর্শকদের ঈশ্বরের সময়ের উপর বিশ্বাস রাখতে এবং মারিয়ান উদমপদী ভক্তিকে আশা এবং শক্তির উৎস হিসেবে গ্রহণ করতে উত্সাহিত করে, সবাইকে স্মরণ করিয়ে দেয় যে দীর্ঘ সংগ্রামের মধ্যেও ঐশ্বরিক অনুগ্রহ কাজ করছে যা সাফল্য এবং আশীর্বাদের পথে প্রস্তুতি নিচ্ছে।","hi":"लिविंग ऑरेकल्स के नौवें एपिसोड में, जोमोल दर्शकों का गर्मजोशी से स्वागत करती हैं और उन्हें मरियन उदंपदी की शक्ति के केंद्र में प्रार्थना और चिंतन के पवित्र स्थान में आमंत्रित करती हैं। वह त्रिशूर के कलाथोडे से एक विनम्र समाचार पत्र एजेंट डेविस की हार्दिक गवाही प्रस्तुत करती हैं, जो विश्वास और मरियन भक्ति के माध्यम से दिव्य हस्तक्षेप के अपने गहरे अनुभव को साझा करते हैं।\\n\\nडेविस अपने लंबे संघर्ष का वर्णन करते हैं जिसमें उन्हें बैंक से 75,000 रुपये की सही भुगतान राशि मिलने में देरी हुई, जो उनके ईमानदार काम के बावजूद दस वर्षों से अधिक समय से लंबित थी। निराश और असहाय महसूस करते हुए, डेविस ने क्रेपसनम चर्च में प्रार्थना के माध्यम से सांत्वना और मार्गदर्शन खोजा। वहाँ, मरियन उदंपदी पूजा और धन्य माता की मध्यस्थता के माध्यम से, उनकी परिस्थितियाँ चमत्कारी ढंग से बदलने लगीं।\\n\\nवे स्पष्ट रूप से पवित्र माता के दर्शन का वर्णन करते हैं जिन्होंने उन्हें अधिकारियों के पास अपनी याचिका ले जाने के लिए प्रोत्साहित किया। इस आध्यात्मिक अनुभव ने डेविस को दृढ़ बने रहने की शक्ति दी। चमत्कारिक रूप से, थोड़े ही समय में बैंक प्रबंधक को निधि जारी करने और मंजूरी देने के लिए प्रेरित किया गया, जो विश्वास और प्रार्थना की शक्ति को प्रमाणित करता है। डेविस इस बात पर जोर देते हैं कि मरियन उदंपदी ने दिव्य न्याय और दया के लिए एक शक्तिशाली माध्यम के रूप में काम किया।\\n\\nपूरे एपिसोड में, जोमोल बाइबिलीय प्रतिबिंबों को जोड़ती हैं, जिनमें भजनसंग्रह और भविष्यवक्ता पुस्तकों के शास्त्रीय वादों को उजागर किया जाता है, जो दिखाते हैं कि कैसे परमेश्वर अपने स्वर्गदूतों को विश्वासियों के पक्ष में खड़ा होकर लड़ने के लिए भेजता है। वह मरियन मध्यस्थता की परिवर्तनकारी शक्ति और आस्था की परीक्षा में विश्वासियों का मार्गदर्शन करने वाली परमेश्वर की आत्मा की जीवंत उपस्थिति पर जोर देती हैं।\\n\\nजोमोल एपिसोड को समाप्त करते हुए दर्शकों को परमेश्वर के समय पर भरोसा करने और मरियन उदंपदी भक्ति को आशा और शक्ति के स्रोत के रूप में अपनाने के लिए प्रोत्साहित करती हैं, और सभी को याद दिलाती हैं कि लंबी संघर्षों में भी, दिव्य कृपा एक मार्ग तैयार कर रही है जो सफलता और आशीर्वाद की ओर ले जाती है।","mr":"लिव्हिंग ओरॅकल्सच्या नऊव्या भागात, जोमोल प्रेक्षकांचे मनापासून स्वागत करते आणि त्यांना मारियन उदंपदीच्या शक्तीभोवती प्रार्थना आणि चिंतनाच्या पवित्र जागेत आमंत्रित करते. ती त्रिशूरच्या कलाथोडे येथील एक नम्र वृत्तपत्र एजंट डेविस यांचे मनापासूनचे साक्षात्कार सादर करते, ज्यांनी श्रद्धा आणि मारियन भक्तीद्वारे दैवी हस्तक्षेपाचा सखोल अनुभव शेअर केला.\\n\\nडेव्हिस त्याच्या दीर्घ संघर्षाचा आढावा घेतो ज्यामध्ये त्याला बँकेतून ७५,००० रुपये योग्य वेळी मिळण्यास विलंब झाला, जरी त्याने प्रामाणिकपणे काम केले तरी दहा वर्षांहून अधिक काळ ही रक्कम थांबवली गेली. निराश आणि असहाय वाटत, डेव्हिसने क्रेउपासनम चर्चमध्ये प्रार्थनेतून सांत्वना आणि मार्गदर्शन शोधले. तिथे, मारियन उदंपदी उपासनेत आणि धन्य मातेमधील मध्यस्थीमुळे त्याच्या परिस्थिती चमत्कारिक रीतीने बदलू लागल्या.\\n\\nतो पवित्र माता त्याच्यासमोर दिसल्याचे दृष्य स्पष्ट करतो, ज्यांनी त्याला अधिकाऱ्यांकडे आपली विनंती नेण्याचा साहस दिला. या आध्यात्मिक भेटीने डेव्हिसला चिकाटीने पुढे जाण्याची शक्ती दिली. चमत्काराने, अल्प वेळात बँक व्यवस्थापक निधी मंजूर करून सोडण्यास उद्युक्त झाला, ज्यामुळे श्रद्धा आणि प्रार्थनेची शक्ती सिद्ध झाली. डेव्हिस जोर देतो की मारियन उदंपदी दैवी न्याय आणि करुणेसाठी एक शक्तिशाली माध्यम म्हणून कार्य करत आहे.\\n\\nपरतावा, जोमोल बायबलमधील प्रतिबिंब एकत्र करतो, ज्यामध्ये भजनसंग्रह आणि भविष्यवाणी पुस्तके यांसारख्या शास्त्रीय आश्वासनांचे प्रकाश टाकतो, ज्यात परमेश्वर आपल्या देवदूतांना विश्वासूंसाठी उभे राहून लढण्यासाठी पाठवतो असे दाखवले आहे. तो मारियन मध्यस्थीच्या परिवर्तनकारी शक्तीवर आणि परीक्षांमध्ये विश्वासूंना मार्गदर्शन करणाऱ्या देवाच्या आत्म्याच्या सजीव उपस्थितीवर भर देतो.\\n\\nजोमोल हा भाग संपवताना प्रेक्षकांना देवाच्या वेळेवर विश्वास ठेवण्याचे आणि आशा व शक्तीच्या स्रोत म्हणून मारियन उदंपदी भक्तीला स्वीकारण्याचे आवाहन करतो, आणि लांबणाऱ्या संघर्षांमध्येही दैवी कृपा काम करत आहे जेणेकरून यश आणि आशीर्वादाच्या दिशेने मार्ग तयार होईल हे सर्वांना स्मरण करून देतो.","ta":"லிவிங் ஆரக்கிள்ஸ் 9வது எபிசோடில், ஜோமோல் பார்வையாளர்களை அன்புடன் வரவேற்று, மரியன் உடம்பாடியின் சக்தியை மையமாக கொண்ட பிரார்த்தனை மற்றும் தியானத்தின் புனித இடத்திற்கு அழைக்கிறார். அவர் திருச்சூர் கலாத்தோடில் இருந்து வந்த ஒரு வெறுமனே செய்தித்தாள் முகவர் டேவிஸ் அவர்களின் உணர்ச்சி மிக்க சாட்சியத்தை அறிமுகப்படுத்துகிறார், இவர் நம்பிக்கை மற்றும் மரியன் பக்தியின் மூலம் கடவுளின் தலையீட்டை ஆழமாக அனுபவித்துள்ளார்.\\n\\nடேவிஸ் தனது நீண்ட போராட்டத்தை பகிர்கிறார், எவ்வாறு அவருடைய நேர்மையான பணிக்காக வங்கியில் ரூ.75,000 பெறுவது மிகவும் நீடித்தது என்பதை, பத்து ஆண்டுகளுக்கும் மேலாக தாமதமான பணம். துன்பப்பட்டு உதவியற்ற நிலையில், டேவிஸ் கிருபாசனம் தேவாலயத்தில் பிரார்த்தனை மூலம் ஆறுதல் மற்றும் வழிகாட்டல் நாடினார். அங்கே, மரியன் உடம்பாடி வழிபாடு மற்றும் ஆசீர்வதிக்கப்பட்ட தாயின் இடைக்கால நட்பால், அவரது சூழல் அதிசயமாக மாறத் தொடங்கியது.\\n\\nஅவர் பवிதர் தாய் அவரிடம் தோன்றிய ஒரு தெளிவான காட்சியை விவரிக்கிறார், அதிகாரிகளிடம் அவரது மனுவை எடுத்துச் செல்ல ஊக்குவிக்கிறார். இந்த ஆன்மீக சந்திப்பு டேவிஸுக்கு முயற்சி செய்யும் சக்தியை அளித்தது. அதிசயமாக, குறுகிய காலத்தில், வங்கி மேலாளர் நிதியை அனுமதி அளித்து விடுவிப்பதில் மாற்றமடைந்தார், நம்பிக்கையும் பிரார்த்தனையும் சக்தி என்பதை உறுதிப்படுத்தியது. டேவிஸ் மரியன் உடம்பாடி கடவுளின் நீதியும் இரக்கமும் வெளிப்படும் சக்திவாய்ந்த ஊடகமாக செயல்பட்டது என்பதை வலியுறுத்துகிறார்.\\n\\nஎபிசோடு முழுவதும், ஜோமோல் பைபிள் சிந்தனைகளை இணைக்கிறார், சாம்வேதங்களிலிருந்து மற்றும் முன்கூட்டிய நூல்களிலிருந்து உள்ள வசனங்களை வெளிப்படுத்துகிறார், தேவன் தனது தூதர்களை நம்பிக்கையுள்ளவர்களுக்கு அருகில் நின்று போராட அனுப்புவதை விளக்குகிறார். அவர் மரியன் இடைக்கால நட்பின் மாற்றத்தன்மை மற்றும் கடுமைகளின் வழியாக நம்பிக்கையாளர்களை வழிநடத்தும் கடவுளின் ஆவியின் உயிருள்ள இருப்பை வலியுறுத்துகிறார்.\\n\\nஜோமோல் எபிசோடு முடிவில், பார்வையாளர்களை கடவுளின் நேரத்தைக் கையொப்பமிட நம்ப வைக்கிறார் மற்றும் மரியன் உடம்பாடி பக்தியை நம்பிக்கை மற்றும் சக்தியின் மூலமாக ஏற்றுக்கொள்ளுமாறு ஊக்குவிக்கிறார், நீண்ட போராட்டங்களிலும் கடவுளின் கிருபை வெற்றி மற்றும் ஆசீர்வாதத்திற்கான பாதையைத் தயாரிக்கிறது என்பதை நினைவூட்டுகிறார்.","te":"లివింగ్ ఆరకిల్స్ 9వ ఎపిసోడ్‌లో, యాంకర్ జోమోల్ ప్రేక్షకులను హృదయపూర్వకంగా స్వాగతించి, మరియన్ ఉదంపాడి శక్తి మ Mittelpunkt గా ఉన్న ప్రార్థనా మరియు ధ్యానానికి పవిత్ర స్థలానికి ఆహ్వానిస్తారు. ఆమె త్రిశూర్ కల్లతోడే నుండి వచ్చిన ఒక నిర్లిప్తమైన పత్రిక ఏజెంట్ డేవిస్ యొక్క హృదయ స్పర్శైన సాక్ష్యాన్ని పరిచయం చేస్తుంది, అతను విశ్వాసం మరియు మరియన్ భక్తి ద్వారా దివ్య జోక్యం యొక్క లోతైన అనుభవాన్ని పంచుకుంటాడు.\\n\\nడేవిస్ తన నిజమైన వేతనం 75,000 రూపాయల కోసం అనేక సంవత్సరాలుగా ఉన్న దీర్ఘ పోరాటాన్ని వివరించాడు, అతని నిజాయితీ పనికి అనుగుణంగా కూడా ఈ సొమ్ము పది సంవత్సరాలు ఆలస్యమైంది. నిరాశగా, అసహాయం గా, డేవిస్ క్రూపాసనం చర్చ్ లో ప్రార్థన ద్వారా సౌఖ్యం మరియు మార్గదర్శకత్వం కోసం వెతికారు. అక్కడ, మరియన్ ఉదంపాడి పూజ మరియు ధన్య తల్లి మద్దతుతో అతని పరిస్థితులు ఆశ్చర్యకరంగా మారిపోవడం ప్రారంభమయ్యాయి.\\n\\nఅతను పవిత్ర తల్లి తనకు కనిపించి, తన పిటిషన్ అధికారులకు తీసుకెళ్లమని ప్రోత్సహించిన ఒక స్పష్టమైన దృష్టిని వివరించాడు. ఈ ఆధ్యాత్మిక సమావేశం డేవిస్‌కు సహనం పడేందుకు బలాన్ని ఇచ్చింది. ఆశ్చర్యకరంగా, తక్కువ సమయంలో, బ్యాంకు మేనేజర్ నిధులను విడుదల చేయడానికి మోషన్ అయ్యాడు, ఇది విశ్వాసం మరియు ప్రార్థన యొక్క శక్తిని నిరూపించింది. డేవిస్ మరియన్ ఉదంపాడి దైవ న్యాయం మరియు దయకి శక్తివంతమైన చానెల్‌గా పనిచేసిందని బలంగా పేర్కొన్నారు.\\n\\nఎపిసోడ్ మొత్తం boyunca, జోమోల్ బైబిల్ ప్రతిబింబాలను చేర్చాడు, ప్సాల్మ్స్ మరియు ప్రవక్తల పుస్తకాల వంటి శాస్త్రీయ వాగ్దానాలను వెలుగులోకి తెచ్చాడు, దేవుడు తన దేవదూతలను విశ్వాసుల పక్షంలో నిలబెట్టి పోరాడేందుకు పంపుతాడని చూపించాడు. అతను మరియన్ మధ్యవర్తిత్వం యొక్క మార్పు శక్తి మరియు ప్రయోగాలలో విశ్వాసులను మార్గనిర్దేశం చేసే దేవుని ఆత్మ యొక్క ప్రత్యక్షమైన ఉనికిపై జోరు పెడుతాడు.\\n\\nజోమోల్ ఎపిసోడ్ ముగింపులో ప్రేక్షకులను దేవుని సమయంపై నమ్మకాన్ని ఉంచమని, మరియన్ ఉదంపాడి భక్తిని ఆశ మరియు శక్తి మూలంగా ఆమోదించమని ప్రేరేపిస్తాడు, దీర్ఘకాల పోరాటాలలో కూడా దైవ కృప విజయానికి మరియు ఆశీర్వాదానికి దారి సిద్ధం చేస్తున్నట్లు అందరికీ గుర్తు చేస్తాడు.","fr":"Dans le 9e épisode de Living Oracles, Jomol accueille chaleureusement les téléspectateurs et les invite dans un espace sacré de prière et de réflexion centré sur la puissance de la dévotion mariale Udampadi. Elle présente le témoignage émouvant de Davis, un humble agent de presse de kalathode, Thrissur, qui partage sa profonde expérience d'intervention divine à travers la foi et la dévotion mariale.\\n\\nDavis raconte sa longue lutte pour obtenir un paiement légitime de 75 000 roupies de la banque, une somme retardée pendant plus de dix ans malgré son travail honnête. Se sentant découragé et impuissant, Davis a cherché réconfort et guidance par la prière à l'église Kreupasanam. Là, grâce au culte marial Udampadi et à l'intercession de la Sainte Mère, sa situation a commencé à changer de manière miraculeuse.\\n\\nIl décrit avec vivacité une vision de la Sainte Mère lui apparaissant, l'encourageant à présenter sa requête aux autorités. Cette rencontre spirituelle a donné à Davis la force de persévérer. Miraculeusement, en peu de temps, le directeur de la banque a été ému à approuver et à libérer les fonds, validant ainsi le pouvoir de la foi et de la prière. Davis souligne comment le culte marial Udampadi a agi comme un canal puissant pour la justice divine et la miséricorde.\\n\\nTout au long de l'épisode, Jomol entrelace des réflexions bibliques, mettant en lumière des promesses scripturaires telles que celles des Psaumes et des livres prophétiques, illustrant comment Dieu envoie ses anges pour se tenir aux côtés et combattre pour les fidèles. Elle insiste sur le pouvoir transformateur de l'intercession mariale et sur la présence vivante de l'Esprit de Dieu guidant les croyants à travers les épreuves.\\n\\nJomol conclut l'épisode en encourageant les téléspectateurs à faire confiance au temps de Dieu et à embrasser la dévotion mariale Udampadi comme source d'espoir et de force, rappelant à tous que même dans les luttes prolongées, la grâce divine œuvre pour préparer un chemin vers la percée et la bénédiction.","es":"En el noveno episodio de Oráculos Vivientes, Jomol da una cálida bienvenida a los espectadores y los invita a un espacio sagrado de oración y reflexión centrado en el poder de la devoción mariana Udampadi. Presenta el sincero testimonio de Davis, un humilde agente de periódicos de kalathode, Thrissur, quien comparte su profunda experiencia de intervención divina a través de la fe y la devoción mariana.\\n\\nDavis relata su larga lucha por recibir un pago legítimo de 75,000 rupias del banco, una suma retrasada durante más de diez años a pesar de su trabajo honesto. Sintiendo desaliento y desesperanza, Davis buscó consuelo y guía a través de la oración en la iglesia Kreupasanam. Allí, mediante la adoración mariana Udampadi y la intercesión de la Bendita Madre, sus circunstancias comenzaron a cambiar de manera milagrosa.\\n\\nDescribe vívidamente una visión de la Santa Madre apareciéndole, alentándolo a llevar su súplica a las autoridades. Este encuentro espiritual le dio a Davis la fuerza para perseverar. Milagrosamente, en poco tiempo, el gerente del banco se conmovió para aprobar y liberar los fondos, validando el poder de la fe y la oración. Davis enfatiza cómo la devoción mariana Udampadi actuó como un canal poderoso para la justicia divina y la misericordia.\\n\\nA lo largo del episodio, Jomol entrelaza reflexiones bíblicas, destacando promesas escriturales como las de los Salmos y los libros proféticos, ilustrando cómo Dios envía a sus ángeles para estar al lado y luchar en nombre de los fieles. Ella enfatiza el poder transformador de la intercesión mariana y la presencia viva del espíritu de Dios que guía a los creyentes a través de las pruebas.\\n\\nJomol concluye el episodio alentando a los espectadores a confiar en el tiempo de Dios y a abrazar la devoción mariana Udampadi como fuente de esperanza y fortaleza, recordándoles a todos que incluso en luchas prolongadas, la gracia divina está trabajando para preparar un camino hacia el avance y la bendición."},"subtitles":"/assets/oracles/oracles9.json"},{"id":10,"title":{"zh":"活的神谕 - 第10集","bn":"লিভিং ওরাকলস - পর্ব ১০","en":"Living ORACLES - Episode 10","hi":"लिविंग ओराकल्स - एपिसोड 10","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 10","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 10","fr":"Oracles Vivants - Épisode 10","es":"Oráculos Vivientes - Episodio 10","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೧೦","mr":"लिव्हिंग ओरॅकल्स - भाग 10"},"date":"July 6, 2025","video":"https://youtu.be/xwU9UT_ceRw?si=ND8bzYfCNTnIetOR","content":{"en":"In the 10th episode of Living Oracles, Jomol, the anchor, warmly welcomes viewers and sets a prayerful atmosphere, inviting all to hold the hand of the Blessed Mother and embrace the Marian Udampadi worship. She introduces the testimony of Treesa Sebastian from Kottayam, a nurse and mother of four.\\n\\nTreesa shares her spiritual journey, revealing how a troll video led her to discover the Kreupasanam Marian Udampadi Aradhana. During prayer, she experienced vivid visions of golden doves and a mysterious blue thread, which deepened her faith. Treesa recounts how, despite challenges like a crucial language exam and immigration delays caused by administrative errors, divine support through dreams and prayers helped her persevere. She also shares how V.P. Joseph Achan, her spiritual father, appeared in dreams offering encouragement and intercession.\\n\\nThroughout, Jomol narrates and reflects on Treesa’s experiences, drawing connections to biblical passages such as Haggai 2:23 and Zechariah 4:6, which speak of divine choosing and elevation—symbolized by a golden ring seen in visions. Jomol explains the significance of Mary’s intercession through the Marian Udampadi worship, emphasizing that sincere prayer invites God’s spirit to guide and uplift believers.\\n\\nJomol further recounts Treesa’s continued spiritual growth, the divine signs she received, and the obstacles she overcame, reinforcing that these miracles illustrate God’s hand in her life. She concludes by urging viewers to embrace this special way of devotion, trusting in the Holy Mother’s powerful intercession to build God’s temple on earth and lead souls toward eternal glory.\\n\\nThis episode beautifully intertwines Treesa’s personal testimony with Jomol’s insightful reflections, inspiring all to deepen their faith and trust in divine grace.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಹತ್ತನೇ ಕಂತಿನಲ್ಲಿ, ಆಂಕರ್ ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ ಪ್ರಾರ್ಥನೆಯ ವಾತಾವರಣವನ್ನು ಸೃಷ್ಟಿಸುತ್ತಾರೆ, ಎಲ್ಲರನ್ನು ಆಶೀರ್ವದಿತ ತಾಯಿಯ ಕೈ ಹಿಡಿದು ಮರಿಯನ್ ಉದಂಪಾಡಿ ಆರಾಧನೆಯನ್ನು ಅಂಗೀಕರಿಸಲು ಆಹ್ವಾನಿಸುತ್ತಾರೆ. ಅವರು കോട്ടയംನ ನರ್ಸ್ ಹಾಗೂ ನಾಲ್ಕು ಮಕ್ಕಳ ತಾಯಿ ಟ್ರೀಸಾ ಸೆಬಾಸ್ಟಿಯನ್ ಅವರ ಸಾಕ್ಷ್ಯವನ್ನು ಪರಿಚಯಿಸುತ್ತಾರೆ.\\n\\nಟ್ರೀಸಾ ತಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ, ಹೇಗೆ ಒಂದು ಟ್ರೋಲ್ ವಿಡಿಯೋ ಅವರು ಕ್ರೆಉಪಾಸನಂ ಮರಿಯನ್ ಉದಂಪಾಡಿ ಆರಾಧನೆಯನ್ನು ಕಂಡುಹಿಡಿಯಲು ಕಾರಣವಾಯಿತು ಎಂಬುದನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತಾರೆ. ಪ್ರಾರ್ಥನೆಯ ಸಮಯದಲ್ಲಿ, ಅವರು ಚಿನ್ನದ ಕಾಗೆಗಳು ಮತ್ತು ರಹಸ್ಯಮಯ ನೀಲಿ ಥ್ರೆಡ್‌ನ ಸ್ಪಷ್ಟ ದೃಶ್ಯಗಳನ್ನು ಅನುಭವಿಸಿದರು, ಇದು ಅವರ ನಂಬಿಕೆಯನ್ನು ಆಳಗೊಳಿಸಿತು. ಟ್ರೀಸಾ ಪ್ರಮುಖ ಭಾಷಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಆಡಳಿತ ದೋಷಗಳಿಂದ ಉಂಟಾದ ವಲಸೆ ವಿಳಂಬಗಳಂತಹ ಸವಾಲುಗಳ ನಡುವೆಯೂ ಕನಸುಗಳು ಮತ್ತು ಪ್ರಾರ್ಥನೆಯ ಮೂಲಕ ದಿವ್ಯ ಸಹಾಯದಿಂದ ಅವರು ಧೈರ್ಯದಿಂದ ಮುಂದುವರಿದರು ಎಂದು ವಿವರಿಸುತ್ತಾರೆ. ಅವರು ತಮ್ಮ ಆಧ್ಯಾತ್ಮಿಕ ತಂದೆ ವಿ.ಪಿ. ಜೋಸೆಫ್ ಅಚನ್ ಕನಸುಗಳಲ್ಲಿ ಪ್ರೋತ್ಸಾಹ ಮತ್ತು ಮಧ್ಯಸ್ಥಿಕೆ ನೀಡಿದಂತೆ ಕಾಣಿಸಿಕೊಂಡುದನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ.\\n\\nಇಡೀಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಟ್ರೀಸಾ ಅನುಭವಗಳನ್ನು ಕಥನ ಮಾಡಿ, ಹಗ್ಗೈ ೨:೨೩ ಮತ್ತು ಜೆಕೆರಿಯಾ ೪:೬ ಮುಂತಾದ ಬೈಬಲ್ ಪಾಸೇಜ್‌ಗಳೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿಸಿ ವಿವರಿಸುತ್ತಾರೆ, ಅವು ದಿವ್ಯ ಆಯ್ಕೆ ಮತ್ತು ಉತ್ತುನತೆಗೆ ಸಂಬಂಧಿಸಿದವು — ದೃಶ್ಯಗಳಲ್ಲಿ ಕಾಣಿಸಬಹುದಾದ ಚಿನ್ನದ ಉಂಗುರದಿಂದ ಸಂಕೇತಗೊಳ್ಳುತ್ತದೆ. ಜೋಮೋಲ್ ಮರಿಯ ಮಧ್ಯಸ್ಥಿಕೆಯ ಮಹತ್ವವನ್ನು ಮರಿಯನ್ ಉದಂಪಾಡಿ ಆರಾಧನೆಯ ಮೂಲಕ ವಿವರಿಸುತ್ತಾರೆ, ಸತ್ಯಪ್ರಾರ್ಥನೆ ದೇವರ ಆತ್ಮವನ್ನು ನಂಬಿಕೆಯಿಂದ ನಡೆಸಲು ಮತ್ತು ಪ್ರೇರಣೆಗೆ ಆಹ್ವಾನಿಸುವುದೆಂಬುದನ್ನು ಒತ್ತಿ ಹೇಳುತ್ತಾರೆ.\\n\\nಜೋಮೋಲ್ ಟ್ರೀಸಾ ಮುಂದುವರಿದ ಆಧ್ಯಾತ್ಮಿಕ ಬೆಳವಣಿಗೆ, ಅವರು ಪಡೆದ ದಿವ್ಯ ಸಂಕೇತಗಳು ಮತ್ತು ಅವರು ಜಯಿಸಿದ ಅಡಚಣೆಗಳನ್ನು ವಿವರಿಸುತ್ತಾರೆ, ಈ ಅದ್ಭುತಗಳು ಅವರ ಜೀವನದಲ್ಲಿ ದೇವರ ಕೈ ಇರುವುದನ್ನು ದೃಢಪಡಿಸುತ್ತವೆ ಎಂದು ಪ್ರತ್ಯೇಕಿಸುತ್ತಾರೆ. ಅವರು ಪ್ರೇಕ್ಷಕರನ್ನು ಈ ವಿಶೇಷ ಭಕ್ತಿಯನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಲು ಮತ್ತು ಪವಿತ್ರ ತಾಯಿಯ ಶಕ್ತಿಶಾಲಿ ಮಧ್ಯಸ್ಥಿಕೆಯ ಮೇಲೆ ನಂಬಿಕೆ ಇಡುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಾರೆ, ಭೂಮಿಯಲ್ಲಿ ದೇವರ ಮಂದಿರವನ್ನು ನಿರ್ಮಿಸಲು ಮತ್ತು ಆತ್ಮಗಳನ್ನು ಶಾಶ್ವತ ಘನತೆಯ ಕಡೆಗೆ ನಡೆಸಲು.\\n\\nಈ ಕಂತು ಟ್ರೀಸಾ ವೈಯಕ್ತಿಕ ಸಾಕ್ಷ್ಯವನ್ನು ಜೋಮೋಲ್ ನುಡಿಗಳೊಂದಿಗೆ ಚೆನ್ನಾಗಿ ಸಂಯೋಜಿಸುತ್ತಿದ್ದು, ಎಲ್ಲರಿಗೂ ಆಧ್ಯಾತ್ಮಿಕ ನಂಬಿಕೆಯನ್ನು ಗಾಢಗೊಳಿಸಿ ದಿವ್ಯ ಕೃಪೆಯಲ್ಲಿ ವಿಶ್ವಾಸ ಇಡುವಂತೆ ಪ್ರೇರೇಪಿಸುತ್ತದೆ.","zh":"在《活着的神谕》第十期节目中，主持人乔莫尔热情地欢迎观众，营造了虔诚的祈祷氛围，邀请大家握住圣母的手，共同参与玛利亚乌丹帕迪敬拜。她介绍了来自科塔亚姆的特里萨·塞巴斯蒂安的见证，她是一名护士，也是四个孩子的母亲。特里萨分享了她的灵性之旅，讲述了一段网络喷子视频如何让她发现了“克鲁帕萨南玛利亚乌丹帕迪阿拉达纳”（Kreupasanam Marian Udampadi Aradhana）。在祈祷期间，她清晰地看到了金色羽毛和神秘蓝线的景象，这加深了她的信仰。特里萨讲述了她如何克服了诸如关键的语言考试和行政失误导致的移民延误等挑战，但通过梦境和祈祷获得的神圣支持帮助她坚持了下来。她还分享了副总统如何……特里萨的属灵父亲约瑟·亚干（Joseph Achan）出现在她的梦中，给予她鼓励和代祷。\\n\\n乔莫尔（Jomol）自始至终叙述并反思了特里萨的经历，并结合哈该书2:23和撒迦利亚书4:6等圣经章节，这些章节讲述了神的拣选和提升——以在异象中看到的金戒指为象征。乔莫尔通过对玛利亚乌丹帕迪（Marian Udampadi）的崇拜解释了玛利亚代祷的意义，强调真诚的祈祷能邀请上帝的灵来引导和提升信徒。\\n\\n乔莫尔进一步讲述了特里萨持续的灵性成长、她所得到的神圣迹象以及她克服的障碍，强调这些奇迹体现了上帝在她生命中的手。最后，她呼吁观众接受这种特殊的奉献方式，相信圣母强大的代祷，在地球上建立上帝的殿堂，引领灵魂走向永恒的荣耀。\\n\\n这一集将 Treesa 的个人证词与 Jomol 的深刻反思完美地交织在一起，激励所有人加深对神圣恩典的信仰和信任。","bn":"লিভিং ওরাকলসের দশম পর্বে, উপস্থাপক জোমল দর্শকদের উষ্ণ অভ্যর্থনা জানান এবং প্রার্থনাপূর্ণ পরিবেশ তৈরি করেন, সকলকে ধন্য মাতার হাত ধরে মারিয়ান উদমপদী উপাসনাকে আলিঙ্গন করার জন্য আমন্ত্রণ জানান। তিনি কোট্টায়ামের ত্রিসা সেবাস্তিয়ানের সাক্ষ্যের সাথে পরিচয় করিয়ে দেন, যিনি একজন নার্স এবং চার সন্তানের মা।\\n\\nত্রিসা তার আধ্যাত্মিক যাত্রা ভাগ করে নেন, প্রকাশ করেন যে কীভাবে একটি ট্রল ভিডিও তাকে ক্রেউপাসনম মারিয়ান উদমপদী আরাধনা আবিষ্কার করতে পরিচালিত করেছিল। প্রার্থনার সময়, তিনি সোনালী পালক এবং একটি রহস্যময় নীল সুতার স্পষ্ট দর্শন অনুভব করেন, যা তার বিশ্বাসকে আরও গভীর করে তোলে। ত্রিসা বর্ণনা করেন যে কীভাবে, প্রশাসনিক ত্রুটির কারণে গুরুত্বপূর্ণ ভাষা পরীক্ষা এবং অভিবাসন বিলম্বের মতো চ্যালেঞ্জ সত্ত্বেও, স্বপ্ন এবং প্রার্থনার মাধ্যমে ঐশ্বরিক সহায়তা তাকে অধ্যবসায় বজায় রাখতে সাহায্য করেছিল। তিনি আরও শেয়ার করেন যে কীভাবে ভি.পি. তার আধ্যাত্মিক পিতা জোসেফ আখান স্বপ্নে এসে উৎসাহ এবং মধ্যস্থতা প্রদান করেন।\\n\\nসমগ্র পর্বে, জোমল ত্রিসার অভিজ্ঞতা বর্ণনা করেন এবং তার প্রতিফলন করেন, হাগয় ২:২৩ এবং জাকারিয়া ৪:৬ এর মতো বাইবেলের অনুচ্ছেদের সাথে সংযোগ স্থাপন করেন, যা ঐশ্বরিক পছন্দ এবং উচ্চতার কথা বলে - দর্শনে দেখা একটি সোনার আংটি দ্বারা প্রতীকী। জোমল মারিয়ান উদমপাদি উপাসনার মাধ্যমে মেরির মধ্যস্থতার তাৎপর্য ব্যাখ্যা করেন, জোর দিয়ে বলেন যে আন্তরিক প্রার্থনা বিশ্বাসীদের নির্দেশনা এবং উত্থাপনের জন্য ঈশ্বরের আত্মাকে আমন্ত্রণ জানায়।\\n\\nজোমল ত্রিসার অব্যাহত আধ্যাত্মিক বৃদ্ধি, তিনি যে ঐশ্বরিক লক্ষণগুলি পেয়েছিলেন এবং তিনি যে বাধাগুলি অতিক্রম করেছিলেন তা আরও বর্ণনা করেন, এই অলৌকিক ঘটনাগুলি তার জীবনে ঈশ্বরের হাতকে চিত্রিত করে তা আরও জোরদার করে। তিনি দর্শকদের ভক্তির এই বিশেষ উপায়কে গ্রহণ করার আহ্বান জানিয়ে শেষ করেন, পৃথিবীতে ঈশ্বরের মন্দির নির্মাণ এবং আত্মাদের অনন্ত গৌরবের দিকে পরিচালিত করার জন্য পবিত্র মায়ের শক্তিশালী মধ্যস্থতার উপর আস্থা রাখুন।\\n\\nএই পর্বটি ত্রিসার ব্যক্তিগত সাক্ষ্যকে জোমলের অন্তর্দৃষ্টিপূর্ণ প্রতিফলনের সাথে সুন্দরভাবে মিশে যায়, সকলকে ঐশ্বরিক অনুগ্রহের প্রতি তাদের বিশ্বাস এবং আস্থাকে আরও গভীর করতে অনুপ্রাণিত করে।","hi":"लिविंग ऑरेकल्स के 10वें एपिसोड में, एंकर जोमोल, दर्शकों का गर्मजोशी से स्वागत करती हैं और एक प्रार्थनापूर्ण माहौल बनाती हैं, सभी को धन्य माता का हाथ थामने और मरियन उदंपदी आराधना में शामिल होने के लिए आमंत्रित करती हैं। वह कोट्टायम की एक नर्स और चार बच्चों की माँ, त्रिसा सेबेस्टियन की गवाही का परिचय देती हैं। त्रिसा अपनी आध्यात्मिक यात्रा साझा करती हैं, यह बताते हुए कि कैसे एक ट्रोल वीडियो ने उन्हें कृपसनम मरियन उदंपदी आराधना की खोज करने के लिए प्रेरित किया। प्रार्थना के दौरान, उन्हें सुनहरे पंखों और एक रहस्यमय नीले धागे के स्पष्ट दर्शन हुए, जिससे उनकी आस्था और गहरी हो गई। त्रिसा बताती हैं कि कैसे एक महत्वपूर्ण भाषा परीक्षा और प्रशासनिक त्रुटियों के कारण आव्रजन में देरी जैसी चुनौतियों के बावजूद, सपनों और प्रार्थनाओं के माध्यम से दिव्य समर्थन ने उन्हें दृढ़ रहने में मदद की। वह यह भी बताती हैं कि कैसे वी.पी. उसके आध्यात्मिक पिता, जोसेफ अचन, सपनों में प्रकट हुए और प्रोत्साहन और मध्यस्थता की पेशकश की।\\n\\nपूरी किताब में, जोमोल त्रिसा के अनुभवों का वर्णन और चिंतन करते हैं, और हाग्गै 2:23 और जकर्याह 4:6 जैसे बाइबिल के अंशों से संबंध जोड़ते हैं, जो दिव्य चयन और उत्थान की बात करते हैं—जिसका प्रतीक दर्शन में दिखाई देने वाली एक सुनहरी अंगूठी है। जोमोल, मरियम की उदंपदी आराधना के माध्यम से मरियम की मध्यस्थता के महत्व की व्याख्या करते हैं, और इस बात पर ज़ोर देते हैं कि सच्ची प्रार्थना ईश्वर की आत्मा को विश्वासियों का मार्गदर्शन और उत्थान करने के लिए आमंत्रित करती है।\\n\\nजोमोल आगे त्रिसा के निरंतर आध्यात्मिक विकास, उसे प्राप्त दिव्य संकेतों और उसके द्वारा पार की गई बाधाओं का वर्णन करते हैं, और इस बात पर बल देते हैं कि ये चमत्कार उसके जीवन में ईश्वर के हाथ को दर्शाते हैं। वह दर्शकों से भक्ति के इस विशेष तरीके को अपनाने, पृथ्वी पर ईश्वर के मंदिर का निर्माण करने और आत्माओं को अनंत महिमा की ओर ले जाने के लिए पवित्र माता की शक्तिशाली मध्यस्थता पर भरोसा करने का आग्रह करते हुए समापन करती हैं।\\n\\nयह एपिसोड ट्रिसा की व्यक्तिगत गवाही को जोमोल के व्यावहारिक विचारों के साथ खूबसूरती से जोड़ता है, जो सभी को ईश्वरीय अनुग्रह में अपने विश्वास और भरोसे को गहरा करने के लिए प्रेरित करता है।","ta":"லிவிங் ஆரக்கிள்ஸின் 10வது எபிசோடில், தொகுப்பாளினி ஜோமோல், பார்வையாளர்களை அன்புடன் வரவேற்று, பிரார்த்தனை நிறைந்த சூழ்நிலையை அமைத்து, அனைவரையும் ஆசீர்வதிக்கப்பட்ட தாயின் கையைப் பிடித்து மரியன் உடம்பாடி வழிபாட்டை ஏற்றுக்கொள்ள அழைக்கிறார். நான்கு குழந்தைகளின் தாயும் செவிலியருமான கோட்டயத்தைச் சேர்ந்த ட்ரிசா செபாஸ்டியனின் சாட்சியத்தை அவர் அறிமுகப்படுத்துகிறார்.\\n\\nட்ரிசா தனது ஆன்மீக பயணத்தைப் பகிர்ந்து கொள்கிறார், ஒரு ட்ரோல் வீடியோ எவ்வாறு க்ருபாசனம் மரியன் உடம்பாடி ஆராதனையைக் கண்டறிய வழிவகுத்தது என்பதை வெளிப்படுத்துகிறார். பிரார்த்தனையின் போது, ​​தங்க இறகுகள் மற்றும் ஒரு மர்மமான நீல நூலின் தெளிவான காட்சிகளை அவர் அனுபவித்தார், இது அவரது நம்பிக்கையை ஆழப்படுத்தியது. நிர்வாகப் பிழைகள் காரணமாக ஏற்பட்ட முக்கியமான மொழித் தேர்வு மற்றும் குடியேற்ற தாமதங்கள் போன்ற சவால்கள் இருந்தபோதிலும், கனவுகள் மற்றும் பிரார்த்தனைகள் மூலம் தெய்வீக ஆதரவு தனக்கு எவ்வாறு விடாமுயற்சியுடன் உதவியது என்பதை ட்ரிசா விவரிக்கிறார். வி.பி. அவளுடைய ஆன்மீகத் தந்தையான ஜோசப் அச்சன், கனவுகளில் தோன்றி ஊக்கத்தையும் பரிந்துரையையும் வழங்குகிறார்.\\n\\nஇந்த நிகழ்ச்சி முழுவதும், ஜோமோல், திரிசாவின் அனுபவங்களை விவரிக்கிறார் மற்றும் பிரதிபலிக்கிறார், ஆகாய் 2:23 மற்றும் சகரியா 4:6 போன்ற பைபிள் பகுதிகளுடன் தொடர்புகளை வரைகிறார், அவை தெய்வீகத் தேர்வு மற்றும் உயர்வு பற்றிப் பேசுகின்றன - தரிசனங்களில் காணப்படும் தங்க மோதிரத்தால் குறிக்கப்படுகிறது. மரியன் உடம்பாடி வழிபாட்டின் மூலம் மரியாளின் பரிந்துரையின் முக்கியத்துவத்தை ஜோமோல் விளக்குகிறார், உண்மையான ஜெபம் விசுவாசிகளை வழிநடத்தவும் உயர்த்தவும் கடவுளின் ஆவியை அழைக்கிறது என்பதை வலியுறுத்துகிறார்.\\n\\nஜோமோல், திரிசாவின் தொடர்ச்சியான ஆன்மீக வளர்ச்சி, அவள் பெற்ற தெய்வீக அடையாளங்கள் மற்றும் அவள் கடந்து வந்த தடைகளை மேலும் விவரிக்கிறார், இந்த அற்புதங்கள் அவளுடைய வாழ்க்கையில் கடவுளின் கையை விளக்குகின்றன என்பதை வலுப்படுத்துகிறார். இந்த சிறப்பு பக்தி வழியைத் தழுவி, பூமியில் கடவுளின் ஆலயத்தைக் கட்டவும், ஆன்மாக்களை நித்திய மகிமைக்கு இட்டுச் செல்லவும் பரிசுத்த தாயின் சக்திவாய்ந்த பரிந்துரையை நம்பும்படி பார்வையாளர்களை வலியுறுத்துவதன் மூலம் அவர் முடிக்கிறார்.\\n\\nஇந்த அத்தியாயம், திரிசாவின் தனிப்பட்ட சாட்சியத்தை ஜோமோலின் நுண்ணறிவு பிரதிபலிப்புகளுடன் அழகாகப் பின்னிப் பிணைக்கிறது, தெய்வீக கிருபையில் அவர்களின் நம்பிக்கையையும் நம்பிக்கையையும் ஆழப்படுத்த அனைவரையும் தூண்டுகிறது.","te":"లివింగ్ ఆరకిల్స్ 10వ ఎపిసోడ్‌లో, యాంకర్ అయిన జోమోల్ ప్రేక్షకులను హృదయపూర్వకంగా స్వాగతించి, ప్రార్థనా వాతావరణాన్ని ఏర్పరుస్తుంది, అందరినీ బ్లెస్డ్ మదర్ చేయి పట్టుకుని మరియన్ ఉదంపాడి ఆరాధనను స్వీకరించమని ఆహ్వానిస్తుంది. ఆమె కొట్టాయం నుండి నర్సు మరియు నలుగురు పిల్లల తల్లి అయిన త్రిసా సెబాస్టియన్ సాక్ష్యాన్ని పరిచయం చేస్తుంది.\\n\\nత్రిసా తన ఆధ్యాత్మిక ప్రయాణాన్ని పంచుకుంటుంది, ఒక ట్రోల్ వీడియో తనను క్రూపాసనం మరియన్ ఉదంపాడి ఆరాధనను కనుగొనేలా ఎలా నడిపించిందో వెల్లడిస్తుంది. ప్రార్థన సమయంలో, ఆమె బంగారు ఈకలు మరియు మర్మమైన నీలిరంగు దారం యొక్క స్పష్టమైన దర్శనాలను అనుభవించింది, ఇది ఆమె విశ్వాసాన్ని మరింతగా పెంచింది. కీలకమైన భాషా పరీక్ష మరియు పరిపాలనా లోపాల వల్ల వలస ఆలస్యం వంటి సవాళ్లు ఉన్నప్పటికీ, కలలు మరియు ప్రార్థనల ద్వారా దైవిక మద్దతు తనకు పట్టుదలతో ఎలా సహాయపడిందో త్రిసా వివరిస్తుంది. వి.పి. ఆమె ఆధ్యాత్మిక తండ్రి అయిన జోసెఫ్ ఆచన్ కలలలో కనిపించి ప్రోత్సాహం మరియు మధ్యవర్తిత్వం అందిస్తాడు.\\n\\nఈ మొత్తం ఎపిసోడ్‌లో, జోమోల్ త్రిసా అనుభవాలను వివరిస్తూ, ప్రతిబింబిస్తూ, హగ్గయి 2:23 మరియు జెకర్యా 4:6 వంటి బైబిల్ భాగాలకు సంబంధాలను ఏర్పరుచుకుంటాడు, ఇవి దైవిక ఎంపిక మరియు ఉన్నతీకరణ గురించి మాట్లాడుతాయి - దర్శనాలలో కనిపించే బంగారు ఉంగరం ద్వారా సూచించబడుతుంది. మరియన్ ఉదంపాడి ఆరాధన ద్వారా మేరీ మధ్యవర్తిత్వం యొక్క ప్రాముఖ్యతను జోమోల్ వివరిస్తుంది, హృదయపూర్వక ప్రార్థన విశ్వాసులను నడిపించడానికి మరియు ఉద్ధరించడానికి దేవుని ఆత్మను ఆహ్వానిస్తుందని నొక్కి చెబుతుంది.\\n\\nత్రిసా యొక్క నిరంతర ఆధ్యాత్మిక వృద్ధిని, ఆమె పొందిన దైవిక సంకేతాలను మరియు ఆమె అధిగమించిన అడ్డంకులను జోమోల్ మరింత వివరిస్తుంది, ఈ అద్భుతాలు ఆమె జీవితంలో దేవుని హస్తాన్ని వివరిస్తాయని బలోపేతం చేస్తుంది. ఈ ప్రత్యేక భక్తి మార్గాన్ని స్వీకరించమని, భూమిపై దేవుని ఆలయాన్ని నిర్మించడానికి మరియు ఆత్మలను శాశ్వత మహిమ వైపు నడిపించడానికి పవిత్ర తల్లి యొక్క శక్తివంతమైన మధ్యవర్తిత్వంపై నమ్మకం ఉంచాలని ప్రేక్షకులను కోరుతూ ఆమె ముగించింది.\\n\\nఈ ఎపిసోడ్ త్రిసా యొక్క వ్యక్తిగత సాక్ష్యాన్ని జోమోల్ యొక్క అంతర్దృష్టి ప్రతిబింబాలతో అందంగా పెనవేసుకుంటుంది, దైవిక కృపపై వారి విశ్వాసాన్ని మరియు నమ్మకాన్ని పెంచుకోవడానికి అందరినీ ప్రేరేపిస్తుంది.","fr":"Dans le 10e épisode de Living Oracles, Jomol, la présentatrice, accueille chaleureusement les téléspectateurs et instaure une atmosphère de prière, invitant chacun à prendre la main de la Sainte Mère et à embrasser le culte marial Udampadi. ​​Elle présente le témoignage de Treesa Sebastian de Kottayam, infirmière et mère de quatre enfants. Treesa partage son cheminement spirituel et révèle comment une vidéo de troll l'a amenée à découvrir le Kreupasanam Marian Udampadi Aradhana. Pendant la prière, elle a eu des visions saisissantes de plumes dorées et d'un mystérieux fil bleu, ce qui a approfondi sa foi. Treesa raconte comment, malgré des difficultés telles qu'un examen de langue crucial et des retards à l'immigration causés par des erreurs administratives, le soutien divin par les rêves et les prières l'a aidée à persévérer. Elle raconte également comment V.P. Joseph Acan, son père spirituel, lui apparut en rêve, lui offrant encouragement et intercession. Jomol raconte et médite sur les expériences de Treesa, établissant des liens avec des passages bibliques tels qu'Aggée 2:23 et Zacharie 4:6, qui parlent du choix et de l'élévation divine, symbolisés par un anneau d'or aperçu en vision. Jomol explique l'importance de l'intercession de Marie à travers le culte marial Udampadi, soulignant que la prière sincère invite l'esprit de Dieu à guider et à élever les croyants. Jomol relate ensuite la croissance spirituelle continue de Treesa, les signes divins qu'elle a reçus et les obstacles qu'elle a surmontés, confirmant que ces miracles illustrent la main de Dieu dans sa vie. Elle conclut en exhortant les téléspectateurs à adopter cette manière particulière de dévotion, en faisant confiance à la puissante intercession de la Sainte Mère pour construire le temple de Dieu sur terre et conduire les âmes vers la gloire éternelle.\\n\\nCet épisode entremêle magnifiquement le témoignage personnel de Treesa avec les réflexions perspicaces de Jomol, inspirant chacun à approfondir sa foi et sa confiance dans la grâce divine.","es":"En el décimo episodio de Oráculos Vivientes, Jomol, la presentadora, da una cálida bienvenida a los espectadores y crea un ambiente de oración, invitando a todos a tomar la mano de la Santísima Madre y abrazar la adoración mariana Udampadi. ​​Presenta el testimonio de Treesa Sebastian, de Kottayam, enfermera y madre de cuatro hijos. Treesa comparte su viaje espiritual y revela cómo un video de un troll la llevó a descubrir el Kreupasanam Marian Udampadi Aradhana. Durante la oración, tuvo vívidas visiones de plumas doradas y un misterioso hilo azul, lo que profundizó su fe. Treesa relata cómo, a pesar de desafíos como un examen crucial de idioma y retrasos en inmigración causados ​​por errores administrativos, el apoyo divino a través de sueños y oraciones la ayudó a perseverar. También comparte cómo el vicepresidente... Joseph Achan, su padre espiritual, se apareció en sueños ofreciéndole aliento e intercesión. A lo largo del libro, Jomol narra y reflexiona sobre las experiencias de Treesa, estableciendo conexiones con pasajes bíblicos como Hageo 2:23 y Zacarías 4:6, que hablan de la elección y elevación divinas, simbolizadas por un anillo de oro visto en visiones. Jomol explica la importancia de la intercesión de María a través del culto mariano Udampadi, enfatizando que la oración sincera invita al espíritu de Dios a guiar y elevar a los creyentes. Jomol relata además el continuo crecimiento espiritual de Treesa, las señales divinas que recibió y los obstáculos que superó, reforzando que estos milagros ilustran la mano de Dios en su vida. Concluye instando a los espectadores a abrazar esta forma especial de devoción, confiando en la poderosa intercesión de la Santa Madre para construir el templo de Dios en la tierra y guiar a las almas hacia la gloria eterna.\\n\\nEste episodio entrelaza hermosamente el testimonio personal de Treesa con las perspicaces reflexiones de Jomol, inspirando a todos a profundizar su fe y confianza en la gracia divina.","mr":"लिव्हिंग ओरॅकल्सच्या १० व्या भागात, सूत्रसंचालक जोमोल प्रेक्षकांचे मनापासून स्वागत करते आणि प्रार्थनामय वातावरण निर्माण करते, सर्वांना धन्य मातेचा हात धरून मारियन उदमपदी उपासनेला आलिंगन देण्याचे आमंत्रण देते. ती कोट्टायम येथील त्रिसा सेबॅस्टियनची साक्ष सादर करते, जी एक परिचारिका आणि चार मुलांची आई आहे.\\n\\nत्रिसा तिचा आध्यात्मिक प्रवास शेअर करते, एका ट्रोल व्हिडिओने तिला क्रेउपासनम मरियन उदमपदी आराधना कशी शोधून काढली हे उघड करते. प्रार्थनेदरम्यान, तिला सोनेरी पंख आणि एक गूढ निळ्या धाग्याचे स्पष्ट दर्शन अनुभवले, ज्यामुळे तिचा विश्वास आणखी दृढ झाला. त्रिसा सांगते की, प्रशासकीय चुकांमुळे निर्माण झालेल्या महत्त्वाच्या भाषा परीक्षा आणि इमिग्रेशन विलंब यासारख्या आव्हानांना न जुमानता, स्वप्ने आणि प्रार्थनांद्वारे दैवी पाठिंब्याने तिला कसे टिकून राहण्यास मदत केली. ती हे देखील शेअर करते की व्ही.पी. तिचे आध्यात्मिक वडील जोसेफ अचन, स्वप्नांमध्ये दिसले आणि प्रोत्साहन आणि मध्यस्थी देत ​​होते.\\n\\nसंपूर्ण काळात, जोमोल त्रिसाच्या अनुभवांचे वर्णन करते आणि त्यावर चिंतन करते, हाग्गय २:२३ आणि जखऱ्या ४:६ सारख्या बायबलमधील उताऱ्यांशी संबंध जोडते, जे दैवी निवड आणि उन्नतीबद्दल बोलतात—दृष्टान्तांमध्ये दिसणाऱ्या सोन्याच्या अंगठीचे प्रतीक आहे. जोमोल मरीयन उदमपादी उपासनेद्वारे मरीयाच्या मध्यस्थीचे महत्त्व स्पष्ट करते, यावर भर देते की प्रामाणिक प्रार्थना देवाच्या आत्म्याला विश्वासणाऱ्यांना मार्गदर्शन आणि उन्नती करण्यासाठी आमंत्रित करते.\\n\\nजोमोल पुढे त्रिसाची सतत आध्यात्मिक वाढ, तिला मिळालेले दैवी चिन्हे आणि तिने पार केलेले अडथळे यांचे वर्णन करते, हे चमत्कार तिच्या जीवनात देवाचा हात दर्शवितात हे बळकट करते. ती प्रेक्षकांना भक्तीचा हा विशेष मार्ग स्वीकारण्याचे आवाहन करून, पृथ्वीवर देवाचे मंदिर बांधण्यासाठी आणि आत्म्यांना शाश्वत वैभवाकडे नेण्यासाठी पवित्र आईच्या शक्तिशाली मध्यस्थीवर विश्वास ठेवण्याचे आवाहन करून समाप्त करते.\\n\\nहा भाग त्रिसाच्या वैयक्तिक साक्षीला जोमोलच्या अंतर्दृष्टीपूर्ण चिंतनाशी सुंदरपणे जोडतो, सर्वांना दैवी कृपेवर त्यांचा विश्वास आणि विश्वास वाढवण्यास प्रेरित करतो."},"subtitles":"/assets/oracles/oracles10.json"},{"id":11,"title":{"zh":"活的神谕 - 第11集","bn":"লিভিং ওরাকলস - পর্ব ১১","en":"Living ORACLES - Episode 11","hi":"लिविंग ओराक्ल्स - एपिसोड 11","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 11","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 11","fr":"Oracles Vivants - Épisode 11","es":"Oráculos Vivientes - Episodio 11","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೧೧","mr":"लिव्हिंग ओरॅकल्स - भाग 11"},"date":"July 13, 2025","video":"https://youtu.be/XQb6VBvYg1Q?si=cBlmhhknHwrqZZUF","content":{"en":"In the 11th episode of Living Oracles, Jomol, the anchor, warmly welcomes everyone into a sacred space of prayer and reflection centered on the Marian Udampadi and the power of steadfast faith. She introduces the profound testimony of Manish and his family from Adoor, who share their life experiences rooted in the Marian Covenant.\\n\\nThe testimony is divided into two parts, with Manish and his wife along with their twin daughters who are tenth-grade students and active participants in the Marian Udampadi prayer. Jomol highlights how their family’s unwavering commitment to the Marian Covenant has brought them closer to God through prayer, sacrifice, and divine encounters.\\n\\nJomol narrates the twins’ extraordinary spiritual experiences, tying them to Joel 2:28 where God promises to pour His Spirit on all people, giving visions and dreams to sons and daughters. The first daughter recounts a moment when their living room was filled with the fragrance of jasmine, a sign of the Holy Mother’s presence comforting their family during a time of waiting for exam results. She also describes a vision of the Blessed Mother’s statue emitting a sweet scent and a cold breeze as a sign of divine closeness.\\n\\nThe second daughter, Rovena, shares her vivid dreams and visions including a white cloth adorned with roses and a cross, symbolizing her spiritual journey and God’s calling. Jomol reflects on the scriptural significance of these visions, referencing John 17:10 where Jesus speaks of the glory shared between the Father and the Son, and the sacred trust bestowed upon the believers.\\n\\nDespite academic and personal challenges, including anxieties over examination results and the pressure to choose science as a study group, the daughters’ faith and perseverance shine through. Jomol recounts how divine messages came through teachers, scriptures, and spiritual leaders like V.P. Joseph Achan, guiding the family through difficult times and encouraging trust in God’s greater plan.\\n\\nThroughout the episode, Jomol emphasizes that unanswered prayers are acts of surrender and investment in heavenly treasure, drawing from Apostle Paul’s letters to affirm that faith, hope, and love remain eternal even amid trials. She encourages viewers to see challenges as part of God’s refining process to elevate His children to greater spiritual heights.\\n\\nThe episode closes with a heartfelt prayer of thanksgiving for God’s sustaining grace and Mary’s powerful intercession, inspiring all to deepen their Marian devotion and to trust in God’s providence as they walk the path of faith.","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ ಹನ್ನೊಂದನೇ ಕಂತಿನಲ್ಲಿ, ಆಂಕರ್ ಜೋಮೋಲ್ ಪ್ರೇಕ್ಷಕರನ್ನು ಹೃದಯಪೂರ್ವಕವಾಗಿ ಸ್ವಾಗತಿಸಿ, ಮರಿಯನ್ ಉದಂಪಾಡಿ ಮತ್ತು ದೃಢ ನಂಬಿಕೆಯಿಂದ ತುಂಬಿದ ಪ್ರಾರ್ಥನೆ ಹಾಗೂ ವಿಚಾರಣೆಯ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಕರೆತರುತ್ತಾರೆ. ಅವರು ಆದൂരಿನ ಮನೀಷ್ ಮತ್ತು ಅವರ ಕುಟುಂಬದ ಆಳವಾದ ಸಾಕ್ಷ್ಯವನ್ನು ಪರಿಚಯಿಸುತ್ತಾರೆ, ಅವರು ಮರಿಯನ್ ಒಡಂಬಡಿಕೆಯಲ್ಲಿ ಆಧಾರಿತ ತಮ್ಮ ಜೀವನ ಅನುಭವಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ.\\n\\nಸಾಕ್ಷ್ಯವು ಎರಡು ಭಾಗಗಳಾಗಿ ವಿಭಜಿಸಲ್ಪಟ್ಟಿದ್ದು, ಮನೀಷ್ ಮತ್ತು ಅವರ ಪತ್ನಿ ಹಾಗೂ ಹತ್ತನೇ ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳಾದ ಜೋಡಿ ಮಗಳು ಮತ್ತು ಮರಿಯನ್ ಉದಂಪಾಡಿ ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಸಕ್ರಿಯ ಭಾಗವಹಿಸುವವರು. ಜೋಮೋಲ್ ಅವರ ಕುಟುಂಬದ ಅಚಲ ನಿಷ್ಠೆಯು ಪ್ರಾರ್ಥನೆ, ಬಲಿದಾನ ಮತ್ತು ದಿವ್ಯ ಅನುಭವಗಳ ಮೂಲಕ ದೇವರ ಸಮೀಪಕ್ಕೆ ತೆಗೆದುಕೊಂಡು ಬಂದಿದೆ ಎಂದು ಒತ್ತಿ ಹೇಳುತ್ತಾರೆ.\\n\\nಜೋಮೋಲ್ ಜೋಡಿ ಮಗಳ ವಿಶೇಷ ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವಗಳನ್ನು ವರ್ಣಿಸಿ, ಅದನ್ನು ಜೋಯೆಲ್ ೨:೨೮ಕ್ಕೆ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ, ಅಲ್ಲಿ ದೇವರು ಎಲ್ಲಾ ಜನರಿಗೆ ತನ್ನ ಆತ್ಮವನ್ನು ಸುರಿದು ಮಗುವಿಗೆ ಮತ್ತು ಮಗಳಿಗೆ ದೃಶ್ಯಗಳು ಮತ್ತು ಕನಸುಗಳನ್ನು ನೀಡುವ ಭರವಸೆ ನೀಡಿದ್ದಾನೆ. ಮೊದಲ ಮಗಳು, ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳ ನಿರೀಕ್ಷೆಯ ಸಮಯದಲ್ಲಿ ಅವರ ಜೀವಂತ ಕೊಠಡಿ ಜಾಸ್ಮಿನ್ ಗಂಧದಿಂದ ತುಂಬಿಕೊಂಡಿರುವ ಕ್ಷಣವನ್ನು ಸ್ಮರಿಸುತ್ತಾಳೆ, ಇದು ಪವಿತ್ರ ತಾಯಿಯ ಹಾಜರಾತಿಯ ಸಂಕೇತವಾಗಿದೆ. ಅವಳು ಬಲ್ಲಿದ್ದಾಳೆ ಹಳುವಾದ ಸುಗಂಧ ಮತ್ತು ತಂಪಾದ ಗಾಳಿಯೊಂದಿಗೆ ಆಶೀರ್ವದಿತ ತಾಯಿಯ ಪ್ರತಿಮೆಯ ದೃಶ್ಯವನ್ನು ವಿವರಿಸುತ್ತಾಳೆ, ಇದು ದಿವ್ಯ ಸಮೀಪತೆಯ ಸಂಕೇತವಾಗಿದೆ.\\n\\nಎರಡನೆಯ ಮಗಳು ರೊವೆನಾ ತನ್ನ ಜೀವಂತ ಕನಸುಗಳು ಮತ್ತು ದೃಶ್ಯಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾಳೆ, ಅವುಗಳಲ್ಲಿ ಗಲ್ಲಿಗಳಿಂದ ಅಲಂಕರಿಸಲ್ಪಟ್ಟ ಬಿಳಿ ಬಟ್ಟೆ ಮತ್ತು ಕ್ರಾಸ್ ಕೂಡಿವೆ, ಅವಳ ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರಯಾಣ ಮತ್ತು ದೇವರ ಕರೆಯ ಸಂಕೇತವನ್ನು ಸೂಚಿಸುತ್ತವೆ. ಜೋಮೋಲ್ ಈ ದೃಶ್ಯಗಳ ಬೈಬಲ್ ಮಹತ್ವವನ್ನು ಚಿಂತಿಸಿ, ಯೋಹಾನ ೧೭:೧೦ ಅನ್ನು ಉಲ್ಲೇಖಿಸುತ್ತಾರೆ, ಅಲ್ಲಿ ಯೇಸು ತಂದೆ ಮತ್ತು ಮಗನ ನಡುವೆ ಹಂಚಿಕೊಂಡ ಮಹಿಮೆ ಮತ್ತು ನಂಬಿಕಸ್ಥರಿಗೆ ನೀಡಲಾದ ಪವಿತ್ರ ನಂಬಿಕೆಯನ್ನು ವಿವರಿಸುತ್ತಾರೆ.\\n\\nಅಕಾಡೆಮಿಕ್ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸವಾಲುಗಳು, ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳ ಬಗ್ಗೆ ಆತಂಕಗಳು ಮತ್ತು ವಿಜ್ಞಾನ ಅಧ್ಯಯನ ಗುಂಪನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ಒತ್ತಡದ ನಡುವೆ, ಮಗಳುಗಳ ನಂಬಿಕೆ ಮತ್ತು ಶ್ರಮ ಯಶಸ್ವಿಯಾಗುತ್ತವೆ. ಜೋಮೋಲ್ ಈepisode ಸಮಯದಲ್ಲಿ ಗುರುಗಳು, ಶಾಸ್ತ್ರಗಳು ಮತ್ತು ವಿ.ಪಿ. ಜೋಸೆಫ್ ಅಚನ್ ಅವರಂತಹ ಆಧ್ಯಾತ್ಮಿಕ ನಾಯಕರಿಂದ ಬರುವ ದಿವ್ಯ ಸಂದೇಶಗಳು ಕುಟುಂಬವನ್ನು ಕಷ್ಟಕರ ಸಂದರ್ಭಗಳಲ್ಲಿ ಮಾರ್ಗದರ್ಶನಮಾಡಿದ್ದು ದೇವರ ಮಹತ್ತ್ವದ ಯೋಜನೆ ಮೇಲೆ ನಂಬಿಕೆ ಇಡುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸುವುದನ್ನು ವರ್ಣಿಸುತ್ತಾರೆ.\\n\\nಇಡೀ ಕಂತಿನಲ್ಲಿ, ಜೋಮೋಲ್ ಉತ್ತರಿಸದ ಪ್ರಾರ್ಥನೆಗಳು ಸಮರ್ಪಣೆ ಮತ್ತು ಸ್ವರ್ಗೀಯ ಧನದ ಹೂಡಿಕೆಯಾಗಿವೆ ಎಂದು ಒತ್ತಿಹೇಳುತ್ತಾನೆ, ಅಪೋಸ್ತಲ ಪೌಲನ ಪತ್ರಗಳಿಂದ ಪ್ರೇರಿತವಾಗಿ, ನಂಬಿಕೆ, ನಿರೀಕ್ಷೆ ಮತ್ತು ಪ್ರೀತಿ ಪರಿಕ್ಷೆ ನಡುವೆಯೂ ಶಾಶ್ವತವಾಗಿರುತ್ತವೆ ಎಂದು ದೃಢಪಡಿಸುತ್ತಾರೆ. ಅವರು ಸವಾಲುಗಳನ್ನು ದೇವರ ಶೋಧನೆಯ ಭಾಗವೆಂದು ನೋಡಲು ಮತ್ತು ತನ್ನ ಮಕ್ಕಳನ್ನು ಆಧ್ಯಾತ್ಮಿಕ ಎತ್ತರಗಳಿಗೆ ಎತ್ತಲು ಪ್ರೋತ್ಸಾಹಿಸುತ್ತಾರೆ.\\n\\nಕಂತು ದೇವರ ಸ್ಥಿರ ಕೃಪೆ ಮತ್ತು ಮರಿಯ ಶಕ್ತಿಶಾಲಿ ಮಧ್ಯಸ್ಥಿಕೆಯಿಗಾಗಿ ಹೃದಯಪೂರ್ವಕ ಕೃತಜ್ಞತೆ ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ ಮುಕ್ತಾಯವಾಗುತ್ತದೆ, ಎಲ್ಲರನ್ನು ತಮ್ಮ ಮರಿಯನ್ ಭಕ್ತಿಯನ್ನು ಆಳಗೊಳಿಸಲು ಮತ್ತು ನಂಬಿಕೆಯ ಮಾರ್ಗದಲ್ಲಿ ದೇವರ ಕೃಪೆಯನ್ನು ನಂಬಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ.","zh":"在《活的神谕》第十一集中，主持人乔莫尔热情欢迎大家进入一个以玛利亚契约和坚定信仰力量为中心的神圣祈祷与反思空间。她介绍了来自阿杜尔的马尼什一家深刻的见证，他们分享了扎根于玛利亚契约的生活经历。\\n\\n见证分为两部分，马尼什与妻子及他们的双胞胎女儿，这对女儿是十年级学生，也是玛利亚契约祈祷的积极参与者。乔莫尔强调他们家庭对玛利亚契约的坚定承诺通过祈祷、牺牲和神圣经历将他们更紧密地带向上帝。\\n\\n乔莫尔讲述了双胞胎女儿非凡的属灵体验，将其与《约珥书》2:28中上帝将他的灵浇灌众人、赐儿女异象和梦境的应许联系起来。大女儿回忆了客厅充满茉莉花香的时刻，这标志着圣母的临在，在等待考试成绩期间给予家庭安慰。她还描述了圣母像散发着芳香和冷风的异象，象征神的临近。\\n\\n二女儿罗维娜分享了她生动的梦境和异象，包括一块饰有玫瑰和十字架的白布，象征她的属灵旅程和上帝的呼召。乔莫尔反思了这些异象的经文意义，引用了《约翰福音》17:10，耶稣谈到父与子之间共享的荣耀和赋予信徒的神圣托付。\\n\\n尽管面临学业和个人挑战，包括对考试成绩的焦虑以及选择理科组的压力，女儿们的信心和坚持依然闪耀。乔莫尔叙述了通过老师、经文和灵性领袖如V.P.约瑟夫阿昌传达的神圣信息，指引这个家庭渡过难关并鼓励他们信靠上帝的伟大计划。\\n\\n整集强调未被应允的祷告是顺服的行为，是对天国宝藏的投资，引用保罗使徒的书信确认信心、希望和爱在试炼中永存。她鼓励观众将挑战视为上帝炼净子女、提升属灵高度的一部分。\\n\\n节目以衷心的感恩祷告结束，感谢上帝的持续恩典和玛利亚的强大代祷，激励所有人深化玛利亚的虔诚，信赖上帝的供应，在信仰的道路上前行。","bn":"‘লিভিং ওরাকলস’ এর ১১তম পর্বে, উপস্থাপক জোমল সবাইকে মারিয়ান উদমপাদি এবং দৃঢ় বিশ্বাসের শক্তির কেন্দ্রবিন্দুতে প্রার্থনা ও প্রতিফলনের একটি পবিত্র স্থানে স্বাগত জানান। তিনি আদুর থেকে মনীশ এবং তার পরিবারের গভীর সাক্ষ্য উপস্থাপন করেন, যারা মারিয়ান কভেন্যান্টে ভিত্তি করে তাদের জীবন অভিজ্ঞতা ভাগ করে নেন।\\n\\nসাক্ষ্য দুটি অংশে বিভক্ত, মনীশ, তার স্ত্রী এবং তাদের যমজ মেয়েরা, যারা দশম শ্রেণির ছাত্র এবং মারিয়ান উদমপাদি প্রার্থনায় সক্রিয় অংশগ্রহণকারী। জোমল তুলে ধরেন কিভাবে তাদের পরিবারের অবিচল সংকল্প তাদের প্রার্থনা, আত্মত্যাগ এবং ঐশ্বরিক অভিজ্ঞতার মাধ্যমে ঈশ্বরের কাছে আরও ঘনিষ্ঠ করেছে।\\n\\nজোমল যমজ মেয়েদের অসাধারণ আধ্যাত্মিক অভিজ্ঞতা বর্ণনা করেন, যা যোয়েল ২:২৮ এর সঙ্গে যুক্ত, যেখানে ঈশ্বর তাঁর আত্মা সকলের উপরে ঢালবেন, পুত্র-পুত্রীদেরকে দর্শন এবং স্বপ্ন দেবেন। বড় মেয়ে স্মরণ করেন যখন তাদের বসার ঘরটি জুঁই ফুলের সুবাসে ভরে ওঠে, যা পবিত্র মায়ের উপস্থিতি এবং পরীক্ষার ফলাফলের জন্য অপেক্ষার সময় পরিবারের সান্ত্বনার চিহ্ন ছিল। তিনি পবিত্র মায়ের মূর্তির থেকে আসা মিষ্টি সুবাস এবং ঠান্ডা হাওয়ার একটি দৃষ্টান্ত বর্ণনা করেন, যা ঐশ্বরিক নিকটতার প্রতীক।\\n\\nদ্বিতীয় মেয়ে, রোয়েনা, তার জীবন্ত স্বপ্ন এবং দর্শনের কথা শেয়ার করেন, যার মধ্যে রয়েছে গোলাপ ও ক্রস দ্বারা সজ্জিত সাদা কাপড়, যা তার আধ্যাত্মিক যাত্রা এবং ঈশ্বরের ডাকের প্রতীক। জোমল এই দর্শনের বাইবেলগত তাৎপর্য ব্যাখ্যা করেন, জন ১৭:১০ উদ্ধৃত করে যেখানে যীশু পিতা ও পুত্রের মাঝে ভাগ করা মহিমা এবং বিশ্বাসীদের প্রতি দেয়া পবিত্র দায়িত্বের কথা বলেন।\\n\\nশিক্ষাগত ও ব্যক্তিগত চ্যালেঞ্জের মুখেও, যেমন পরীক্ষার ফলাফলের উদ্বেগ এবং বিজ্ঞান গ্রুপ বেছে নেয়ার চাপ, মেয়েদের বিশ্বাস ও ধৈর্য্য উজ্জ্বল হয়। জোমল উল্লেখ করেন কীভাবে শিক্ষক, বাইবেল, এবং আধ্যাত্মিক নেতৃবৃন্দ যেমন ভি.পি. জোসেফ আচানের মাধ্যমে ঈশ্বরের বার্তা পরিবারকে কঠিন সময়ে পথ দেখিয়েছে এবং ঈশ্বরের বৃহত্তর পরিকল্পনায় বিশ্বাস রাখতে উৎসাহিত করেছে।\\n\\nপর্বটি জোর দিয়ে বলে যে, প্রত্যুত্তরহীন প্রার্থনা আত্মসমর্পণের কাজ এবং স্বর্গীয় ধনসম্পদের বিনিয়োগ, পল Apostল এর চিঠি থেকে উদ্ধৃতি দিয়ে বিশ্বাস, আশা ও ভালোবাসা সংকটেও চিরন্তন থাকে তা নিশ্চিত করে। তিনি দর্শকদের উৎসাহিত করেন চ্যালেঞ্জগুলোকে ঈশ্বরের সন্তানদের পরিশোধন ও আধ্যাত্মিক উচ্চতর করার অংশ হিসেবে দেখতে।\\n\\nপর্বটি কৃতজ্ঞতাপূর্ণ প্রার্থনায় শেষ হয়, ঈশ্বরের অব্যাহত অনুগ্রহ এবং মারিয়ার শক্তিশালী মধ্যস্থতায় ধন্যবাদ জ্ঞাপন করে, সবাইকে মারিয়ান ভক্তি গভীর করার এবং ঈশ্বরের রProvision্বার বিশ্বাস করতে উৎসাহিত করে।","hi":"‘लिविंग ओराकल्स’ के 11वें एपिसोड में, एंकर जोमोल सभी का हार्दिक स्वागत करती हैं, एक पवित्र प्रार्थना और चिंतन के स्थान में जहां मरियन उदमपदी और अडिग विश्वास की शक्ति पर ध्यान केंद्रित किया जाता है। वह अदूर के मनीष और उनके परिवार की गहन गवाही प्रस्तुत करती हैं, जो मरियन क़वेनेंट में गहरे अनुभव साझा करते हैं।\\n\\nगवाही दो भागों में है, मनीष, उनकी पत्नी और उनकी जुड़वां बेटियां जो दसवीं कक्षा की छात्राएं हैं और मरियन उदमपदी प्रार्थना में सक्रिय भागीदार हैं। जोमोल बताती हैं कि कैसे उनके परिवार की अटल प्रतिबद्धता ने प्रार्थना, त्याग और दिव्य अनुभवों के माध्यम से उन्हें ईश्वर के करीब ला दिया है।\\n\\nजोमोल जुड़वां बेटियों के असाधारण आध्यात्मिक अनुभवों का वर्णन करती हैं, जो योएल 2:28 से जुड़ी हैं, जहां ईश्वर अपने आत्मा को सब पर उंडेलेंगे, पुत्र-पुत्रियों को दर्शन और सपने देंगे। बड़ी बेटी बताती है कि कैसे उनके लिविंग रूम में चमेली की खुशबू भरी हुई थी, जो पवित्र माँ की उपस्थिति और परीक्षा के परिणामों की प्रतीक्षा के समय परिवार को सांत्वना देती है। वह पवित्र माँ की मूर्ति से आती हुई मीठी खुशबू और ठंडी हवा का दृश्य भी साझा करती है, जो दिव्य निकटता का प्रतीक है।\\n\\nदूसरी बेटी रोवेना अपने जीवंत सपनों और दर्शन को साझा करती है, जिसमें सफेद कपड़ा है जिसमें गुलाब और क्रॉस सजे हुए हैं, जो उसकी आध्यात्मिक यात्रा और ईश्वर के बुलावे का प्रतीक है। जोमोल इन दर्शनाओं के धार्मिक महत्व पर प्रकाश डालती हैं, यूहन्ना 17:10 का उल्लेख करते हुए, जहां यीशु पिता और पुत्र के बीच साझा की गई महिमा और विश्वासियों को सौंपी गई पवित्र जिम्मेदारी की बात करते हैं।\\n\\nशैक्षिक और व्यक्तिगत चुनौतियों के बावजूद, जैसे परीक्षा परिणामों की चिंता और विज्ञान समूह चुनने का दबाव, बेटियों का विश्वास और धैर्य चमकता है। जोमोल बताती हैं कि कैसे शिक्षक, शास्त्र और आध्यात्मिक नेता जैसे वी.पी. जोसेफ आचन ने परिवार को कठिन समय में मार्गदर्शन दिया और ईश्वर की महान योजना में विश्वास बनाए रखने के लिए प्रोत्साहित किया।\\n\\nपूरे एपिसोड में यह बताया गया है कि अनसुनी प्रार्थनाएं समर्पण के कार्य हैं और स्वर्गीय खजाने में निवेश हैं, पौलुस के पत्रों से उद्धृत करते हुए यह पुष्टि की गई है कि विश्वास, आशा और प्रेम संकटों के बीच भी स्थायी हैं। वह दर्शकों को चुनौतियों को ईश्वर द्वारा अपने बच्चों को परिष्कृत करने और आध्यात्मिक ऊंचाईयों पर ले जाने की प्रक्रिया के रूप में देखने के लिए प्रेरित करती हैं।\\n\\nएपिसोड एक हार्दिक कृतज्ञता प्रार्थना के साथ समाप्त होता है, जिसमें ईश्वर की निरंतर कृपा और मरियम की शक्तिशाली मध्यस्थता के लिए धन्यवाद दिया जाता है, सभी को अपनी मरियन भक्ति को गहरा करने और विश्वास की राह पर चलने में ईश्वर की व्यवस्था पर भरोसा करने के लिए प्रेरित किया जाता है।","ta":"‘லிவிங் ஓரகில்ஸ்’ 11வது எபிசோடில், தொகுப்பாளர் ஜொமோல் அனைவரையும் மரியன் உடம்பாடியும் உறுதியான நம்பிக்கையின் சக்தியும் கொண்ட ஒரு புனித பிரார்த்தனை மற்றும் கவனிப்புக் கூடத்தில் அன்புடன் வரவேற்கிறார். அவர் ஆதூர் வந்த மணீஷ் மற்றும் அவரது குடும்பத்தின் ஆழ்ந்த சாட்சியத்தை அறிமுகப்படுத்துகிறார், அவர்கள் மரியன் உடன்படிக்கையில் அடிப்படையிலான வாழ்க்கைப் பயணத்தை பகிர்ந்துகொள்கிறார்கள்.\\n\\nசாட்சி இரண்டு பகுதிகளாக பிரிக்கப்பட்டுள்ளது, மணீஷ் மற்றும் அவரது மனைவி, மற்றும் பத்தாம் வகுப்பில் படிக்கும் இரட்டையர் மகள்கள், அவர்கள் மரியன் உடம்பாடி பிரார்த்தனையில் செயல்படுபவர்கள். ஜொமோல் அவர்கள் குடும்பத்தின் உறுதியான அர்ப்பணிப்பு மூலம் பிரார்த்தனை, தியாகம் மற்றும் தெய்வீக அனுபவங்களின் மூலம் கடவுளை நெருக்கமாக அணுகியதை வலியுறுத்துகிறார்.\\n\\nஇரட்டையர் மகள்களின் அதிசய ஆன்மீக அனுபவங்களை ஜொமோல் விவரிக்கிறார், இது யோயேல் 2:28 இன் வசனத்துடன் தொடர்பு கொண்டுள்ளது, அங்கு கடவுள் தன் ஆவியினை அனைவருக்கும் கொடுப்பதாக, மகளிருக்கும் மகன்களுக்கும் கனவுகள் மற்றும் காணொளிகள் வழங்குவதாக கூறப்படுகிறது. முதன்மை மகள், அவர்களின் வாழும் அறை முல்லைப்பூ வாசனையால் நிரம்பியதையும், அது பரீட்சை முடிவுக்காக காத்திருக்கையில் குடும்பத்திற்கு ஆறுதலானது என்பதையும் நினைவுகூர்கிறாள். அவர் புனித தாயின் சிலை இனிமையான வாசனை மற்றும் குளிர்ந்த காற்றின் ஒரு காட்சி பற்றியும் விவரிக்கிறார், இது தெய்வீக நெருக்கத்தை குறிக்கிறது.\\n\\nஇரண்டாம் மகள் ரோவினா, தனது தெளிவான கனவுகள் மற்றும் காணொளிகளை பகிர்கிறாள், இதில் ரோஜாக்கள் மற்றும் குறுக்கு அடங்கிய வெள்ளை துணி உள்ளது, இது அவரது ஆன்மீக பயணத்தையும் கடவுளின் அழைப்பையும் குறிக்கிறது. ஜொமோல் இந்த காணொளிகளின் வேத செய்திகளைப் பற்றி விவரிக்கிறார், யோவான் 17:10-ஐ மேற்கோள் காட்டி, இயேசு தந்தை மற்றும் மகன் பகிர்ந்த மகிமை மற்றும் விசுவாசிகளுக்கு வழங்கப்பட்ட புனித நம்பிக்கையை பேசுகிறார்.\\n\\nகல்வி மற்றும் தனிப்பட்ட சவால்களை சமாளித்தும், பரீட்சை முடிவுகள் பற்றிய கவலை மற்றும் அறிவியல் குழுவைத் தேர்ந்தெடுக்கும் அழுத்தம் உட்பட, மகள்களின் நம்பிக்கை மற்றும் பொறுமை வெளிப்படுகிறது. ஜொமோல் ஆசிரியர்கள், வேதாகமங்கள் மற்றும் ஆவியுத்வேதர்களான V.P. ஜோசப் ஆச்சனை போன்றவர்கள் வழியாக இறைவனின் செய்தி குடும்பத்தை கடுமையான நேரங்களில் வழிநடத்தி, கடவுளின் பெரிய திட்டத்தில் நம்பிக்கை வைக்க ஊக்குவித்ததை விவரிக்கிறார்.\\n\\nஎpisodes முழுவதும், பதில் கிடைக்காத பிரார்த்தனைகள் சமர்ப்பணத்தின் செயல்களாகும் என்றும், ஆಕಾಶ சுங்கத்திற்கான முதலீடாகும் என்றும், பவுலோசின் கடிதங்களை மேற்கோள் காட்டி, நம்பிக்கை, நம்பிக்கை மற்றும் அன்பு சோதனைகளின் மத்தியில் நிரந்தரமாக இருக்கின்றன என்றும் வலியுறுத்தப்படுகிறது. அவர் பார்வையாளர்களை சவால்களை கடவுளின் குழந்தைகளை சுத்திகரிக்கும் மற்றும் ஆன்மீக உயர்வுக்கு கொண்டு செல்லும் ஒரு பகுதியாக பார்க்க ஊக்குவிக்கிறார்.\\n\\nஇந்த எபிசோடு இறுதியில் இறைவனின் நிலைத்த கிருபைக்கும் மரியாவின் வலுவான நடுச்செல்வத்திற்குமான மனமார்ந்த நன்றிப்பிரார்த்தனையுடன் முடிகிறது, அனைவரும் மரியன் பக்தியை ஆழமாக்கி, நம்பிக்கையின் பாதையில் நடந்துகொள்ள கடவுளின் பரிபாலனத்தில் நம்பிக்கை வைக்க உத்வேகம் பெறுகின்றனர்.","te":"‘లివింగ్ ఓరాకిల్స్’ 11వ ఎపిసోడ్‌లో, యాంకర్ జోమోల్ అందరినీ మరియాన్ కవెనెంట్ మరియు స్థిరమైన విశ్వాస శక్తిపై కేంద్రీకరించిన పవిత్ర ప్రార్థన మరియు ఆలోచనా స్థలంలో హృదయపూర్వకంగా ఆహ్వానిస్తారు. ఆయన ఆదూర్ నుండి మనీష్ మరియు అతని కుటుంబం యొక్క లోతైన సాక్ష్యాన్ని పరిచయం చేస్తారు, వారు మరియాన్ కవెనెంట్‌లో వారి జీవిత అనుభవాలను పంచుకుంటారు.\\n\\nసాక్ష్యం రెండు భాగాలుగా విభజించబడింది, మనీష్, అతని భార్య మరియు వారి ద్వైగ పిల్లలు, వీరు పదో తరగతి విద్యార్థులు మరియు మరియాన్ ప్రార్థనలో సక్రియంగా పాల్గొంటున్నారు. జోమల్ వారి కుటుంబం మరియాన్ కవెనెంట్ పట్ల స్థిరమైన అంకితభావం ద్వారా ప్రార్థన, త్యాగం మరియు దైవ అనుభవాల ద్వారా దేవుడికి మరింత సమీపమయ్యారని వివరించారు.\\n\\nజోమల్ ద్వైగ పిల్లల అసాధారణ ఆధ్యాత్మిక అనుభవాలను వివరిస్తారు, ఇవి జోయెల్ 2:28కు అనుసరించి, దేవుడు తన ఆత్మను అందరిపై పోస్తాడు, కుమారులు కుమార్తెలకు దృష్టులు మరియు కలలు ఇస్తాడు. పెద్ద కుమార్తె వారి లివింగ్ రూమ్ మల్లెపువ్వుల సువాసనతో నిండిపోయినప్పుడని గుర్తు చేసుకుంటుంది, ఇది పవిత్ర తల్లి యొక్క ఉనికి మరియు పరీక్ష ఫలితాల కోసం ఎదురుచూస్తున్న సమయంలో కుటుంబానికి సాంత్వన సూచనగా ఉంది. ఆమె పవిత్ర తల్లి విగ్రహం నుంచి మధురమైన సువాసన మరియు చల్లని గాలి ఒక దృశ్యాన్ని కూడా వివరిస్తుంది, ఇది దైవ సన్నిహితతకు సంకేతం.\\n\\nరెండో కుమార్తె రోవీనా తన స్పష్టమైన కలలు మరియు దృశ్యాలను పంచుకుంటుంది, అందులో రోజాలు మరియు క్రాస్‌తో అలంకరించిన తెల్లటి బట్ట ఉంది, ఇది ఆమె ఆధ్యాత్మిక ప్రయాణం మరియు దేవుని పిలుపుకు సంకేతం. జోమల్ ఈ దృశ్యాల బైబిలియన్ ప్రాముఖ్యతను, యోహాను 17:10ను సూచిస్తూ వివరిస్తారు, ఇక్కడ యేసు తండ్రి మరియు కుమారుడి మధ్య పంచుకున్న మహిమను మరియు విశ్వాసులకు ఇచ్చిన పవిత్ర నమ్మకాన్ని ప్రస్తావిస్తారు.\\n\\nపాఠశాల మరియు వ్యక్తిగత సవాళ్లను ఎదుర్కొన్నప్పటికీ, పరీక్ష ఫలితాలపై ఉత్కంఠ మరియు సైన్స్ గ్రూప్ ఎంచుకోవడంలో ఒత్తిడి సహా, కుమార్తెల విశ్వాసం మరియు సహనం ప్రకాశిస్తోంది. జోమల్ ఉపాధ్యాయులు, వేదాలు మరియు ఆధ్యాత్మిక నాయకులు వంటి V.P. జోసెఫ్ ఆచన్ ద్వారా దైవ సందేశాలు కుటుంబాన్ని కఠిన సమయాల్లో మార్గనిర్దేశం చేశాయని మరియు దేవుని పెద్ద ప్రణాళికపై విశ్వాసం ఉంచడానికి ప్రేరేపించినట్లు వివరిస్తారు.\\n\\nమొత్తం ఎపిసోడ్‌లో జవాబు రాలేని ప్రార్థనలు సమర్పణ చర్యలు మరియు స్వర్గీయ ధనసంపదలో పెట్టుబడులుగా ఉంటాయని, అపోస్టల్ పౌలు యొక్క లేఖల నుండి ఇది నిర్ధారించబడిన విశ్వాసం, ఆశ మరియు ప్రేమ కష్టకాలాల్లో కూడా శాశ్వతమని ఎత్తి చూపబడింది. జోమల్ వీక్షకులను సవాళ్లను దేవుని పిల్లలను శుద్ధి చేయడం మరియు ఆధ్యాత్మిక ఎత్తులకు తీసుకెళుతుందని చూడమని ప్రోత్సహిస్తారు.\\n\\nఎపిసోడ్ దేవుని నిలకడైన కృపకు మరియు మరియాని శక్తివంతమైన మధ్యస్తతకు కృతజ్ఞతలు తెలుపుతూ హృదయపూర్వక ప్రార్థనతో ముగుస్తుంది, అందరికీ మరియాన్ భక్తిని లోతుగా చేయమని, విశ్వాస మార్గంలో నడవడానికి దేవుని ఆహ్వానంలో విశ్వాసం కలిగి ఉండమని ప్రేరేపిస్తుంది.","fr":"Dans le 11e épisode de Living Oracles, Jomol, l'animatrice, accueille chaleureusement tout le monde dans un espace sacré de prière et de réflexion centré sur l'Alliance mariale et la puissance de la foi inébranlable. Elle présente le témoignage profond de Manish et de sa famille d'Adoor, qui partagent leurs expériences de vie enracinées dans l'Alliance mariale.\\n\\nLe témoignage est divisé en deux parties, avec Manish, sa femme et leurs filles jumelles, élèves en classe de 10e, actives dans la prière de l'Udampadi marial. Jomol souligne comment l'engagement inébranlable de leur famille les a rapprochés de Dieu à travers la prière, le sacrifice et les expériences divines.\\n\\nJomol relate les expériences spirituelles extraordinaires des jumelles, les reliant à Joël 2:28 où Dieu promet de répandre son Esprit sur tous, donnant visions et rêves aux fils et filles. La première fille se souvient d’un moment où leur salon fut rempli du parfum de jasmin, signe de la présence de la Sainte Mère, réconfortant la famille durant l’attente des résultats d’examen. Elle décrit aussi une vision d’une statue de la Vierge exhalant parfum et brise fraîche, symbole de la proximité divine.\\n\\nLa seconde fille, Rovena, partage ses rêves vifs et ses visions, dont un tissu blanc orné de roses et d’une croix, symbolisant son parcours spirituel et l’appel de Dieu. Jomol explique la signification biblique de ces visions, citant Jean 17:10 où Jésus parle de la gloire partagée entre le Père et le Fils et de la responsabilité sacrée confiée aux croyants.\\n\\nMalgré les défis académiques et personnels, notamment l’anxiété liée aux résultats et la pression du choix du groupe scientifique, la foi et la persévérance des filles brillent. Jomol raconte comment les messages divins, transmis via enseignants, Écritures et guides spirituels comme V.P. Joseph Achan, ont aidé la famille à traverser ces épreuves et à faire confiance au grand plan de Dieu.\\n\\nL’épisode souligne que les prières non exaucées sont des actes de soumission et un investissement dans les trésors célestes, citant les lettres de Paul qui affirment que foi, espérance et amour persistent à travers les épreuves. Elle encourage les spectateurs à voir les défis comme une part du processus par lequel Dieu affine ses enfants et élève leur spiritualité.\\n\\nLe programme se conclut par une prière de gratitude sincère, remerciant Dieu pour sa grâce continue et la puissante intercession de Marie, inspirant chacun à approfondir sa dévotion mariale et à avoir confiance en la providence divine sur le chemin de la foi.","es":"En el episodio 11 de Living Oracles, Jomol, la presentadora, da una cálida bienvenida a todos en un espacio sagrado de oración y reflexión centrado en el Pacto Mariano y el poder de la fe inquebrantable. Presenta el profundo testimonio de Manish y su familia de Adoor, quienes comparten sus experiencias de vida arraigadas en el Pacto Mariano.\\n\\nEl testimonio se divide en dos partes, con Manish, su esposa y sus hijas gemelas, estudiantes de décimo grado, activas en la oración del Udampadi Mariano. Jomol destaca cómo el compromiso inquebrantable de su familia los acercó a Dios a través de la oración, el sacrificio y experiencias divinas.\\n\\nJomol relata las extraordinarias experiencias espirituales de las gemelas, vinculándolas a Joel 2:28 donde Dios promete derramar su Espíritu sobre todos, dando visiones y sueños a hijos e hijas. La primera hija recuerda un momento en que su sala se llenó del aroma de jazmín, señal de la presencia de la Santa Madre, que consoló a la familia mientras esperaban los resultados del examen. También describe una visión de una estatua de la Virgen exhalando perfume y brisa fresca, símbolo de la cercanía divina.\\n\\nLa segunda hija, Rovena, comparte sus vívidos sueños y visiones, incluyendo un paño blanco adornado con rosas y una cruz, simbolizando su viaje espiritual y el llamado de Dios. Jomol explica el significado bíblico de estas visiones, citando Juan 17:10, donde Jesús habla de la gloria compartida entre el Padre y el Hijo y la responsabilidad sagrada confiada a los creyentes.\\n\\nA pesar de los desafíos académicos y personales, incluida la ansiedad por los resultados del examen y la presión para elegir el grupo de ciencias, la fe y la perseverancia de las niñas brillan. Jomol narra cómo los mensajes divinos transmitidos a través de maestros, escrituras y líderes espirituales como V.P. Joseph Achan ayudaron a la familia a superar estas pruebas y confiar en el gran plan de Dios.\\n\\nEl episodio enfatiza que las oraciones no respondidas son actos de sumisión y una inversión en los tesoros celestiales, citando las cartas de Pablo que aseguran que la fe, la esperanza y el amor perduran a través de las pruebas. Ella anima a los espectadores a ver los desafíos como parte del proceso mediante el cual Dios refina a sus hijos y eleva su espiritualidad.\\n\\nEl programa concluye con una oración sincera de gratitud, agradeciendo a Dios por su gracia continua y la poderosa intercesión de María, inspirando a todos a profundizar su devoción mariana y confiar en la providencia divina en el camino de la fe.","mr":"‘लिव्हिंग ओरॅकल्स’ च्या ११व्या भागात, होस्ट जोमोल सर्वांचे हार्दिक स्वागत करतात, ज्यामध्ये मरियन करार आणि दृढ श्रद्धेच्या शक्तीवर लक्ष केंद्रित केलेले पवित्र प्रार्थना आणि चिंतनाचे वातावरण तयार केले जाते. ते आदूर येथील मनीष आणि त्यांच्या कुटुंबाचा सखोल साक्षात्कार सादर करतात, जे मरियन करारात मूळ अनुभव शेअर करतात.\\n\\nसाक्ष दोन भागांत विभागलेली आहे, मनीष, त्यांची पत्नी आणि त्यांची जुळी मुली, त्या दहावीत शिकत आहेत आणि मरियन उदमपदी प्रार्थनेत सक्रिय आहेत. जोमोल सांगतात की त्यांच्या कुटुंबाचा अढळ समर्पण प्रार्थना, त्याग आणि दैवी अनुभवांद्वारे त्यांना देवाजवळ आणतो.\\n\\nजुळी मुलींचे असामान्य आध्यात्मिक अनुभव जोमोल सांगतात, जे योएल २:२८ शी जोडलेले आहेत, जिथे देव आपला आत्मा सर्वांवर ओतेल, मुलगा-मुलींना दर्शनं आणि स्वप्ने देईल. मोठी मुलगी आठवण करतात की त्यांच्या लिव्हिंग रूममध्ये जॅस्मीनच्या सुगंधाने भरले होते, जे पवित्र मातेमुळे उपस्थितीचे चिन्ह होते आणि परीक्षेच्या निकालाच्या प्रतीक्षेत कुटुंबाला दिलासा दिला. ती पवित्र मातेलाचं मूर्ती मधून सुगंध आणि थंडी हवा येण्याचं दृष्यही वर्णन करते, जे दैवी सान्निध्याचं प्रतीक आहे.\\n\\nदुसरी मुलगी रोविना तिच्या जिवंत स्वप्नांची आणि दर्शनांची वाटाघाटा करते, ज्यात गुलाब आणि क्रॉसने सजलेलं पांढरं कापड आहे, जे तिच्या आध्यात्मिक प्रवासाचं आणि देवाच्या बोलावणाचं प्रतीक आहे. जोमोल या दर्शनांच्या बायबलीय महत्त्वावर प्रकाश टाकतात, जॉहन १७:१० चे उल्लेख करताना, जिथे येशू वडील आणि पुत्र यांच्यात सामायिक केलेली महती आणि श्रद्धाळूंना दिलेली पवित्र जबाबदारी सांगतो.\\n\\nअकादमिक आणि वैयक्तिक अडचणी असूनही, परीक्षेच्या निकालाची काळजी आणि विज्ञान गट निवडण्याच्या ताणासह, मुलींचा विश्वास आणि संयम चमकतो. जोमोल सांगतात की शिक्षक, शास्त्र आणि आध्यात्मिक नेते जसे की व्ही.पी. जोसेफ आचन यांनी देवाचा संदेश कुटुंबाला कठीण काळात मार्गदर्शन केले आणि देवाच्या मोठ्या योजनेवर विश्वास ठेवण्यास प्रोत्साहित केले.\\n\\nपूर्ण भागात असे सांगितले जाते की न ऐकलेल्या प्रार्थना हा समर्पणाचा कृत्य आहे आणि स्वर्गीय खजिन्यात गुंतवणूक आहे, पौलुसच्या पत्रांतून उद्धृत करताना विश्वास, आशा आणि प्रेम संकटांमध्येही कायम राहतात. तो प्रेक्षकांना आवाहन करतो की आव्हाने देवाच्या मुलांना शुद्ध करणं आणि आध्यात्मिक उंचीवर नेण्याचा भाग म्हणून पाहावीत.\\n\\nकार्यक्रम अंतःकरणातून कृतज्ञतेच्या प्रार्थनेने संपतो, देवाच्या सतत कृपेची आणि मरीयाच्या शक्तिशाली मध्यस्थतेची आभार मानतो, सर्वांना मरीय भक्ती अधिक खोलवर करण्यास आणि श्रद्धेच्या मार्गावर चालण्यासाठी देवाच्या व्यवस्थेवर विश्वास ठेवण्यास प्रेरित करतो."},"subtitles":"/assets/oracles/oracles11.json"},{"id":12,"title":{"zh":"活的神谕 - 第12集","bn":"লিভিং ওরাকলস - পর্ব ১২","en":"Living ORACLES - Episode 12","hi":"लिविंग ओराक्ल्स - एपिसोड 12","ta":"லிவிங் ஓரகில்ஸ் - எபிசோட் 12","te":"లివింగ్ ఓరాకిల్స్ - ఎపిసోడ్ 12","fr":"Oracles Vivants - Épisode 12","es":"Oráculos Vivientes - Episodio 12","kn":"ಲಿವಿಂಗ್ ಒರಾಕಲ್ಸ್ - ಕಂತು ೧೨","mr":"लिव्हिंग ओरॅकल्स - भाग 12"},"date":"July 20, 2025","video":"https://youtu.be/ieiTlVIDX70?si=exxK2-AxSml0moS1","content":{"zh":"在《活的神谕》第12集中，Jomol分享了来自Chelur的Lijitha Thomas的动人见证。她的女儿遭受了五年强烈而未确诊的腿痛。一次在医院就诊时，一位神秘的修女走近女儿，温柔地保证九天后将会痊愈。Lijitha坚信那位修女化身为巡礼圣母（Sanchari Mathavu）。如所承诺，女儿在涂抹了Kreupasanam祝福油并以祈祷交托后获得了痊愈。\\n\\n不久之后，Lijitha自己患上了严重的胃病。在痛苦中，她的丈夫——曾远离信仰——目睹了她的神迹疗愈，因而被玛利亚之约深深吸引。Jomol将此与《使徒行传》27:24联系起来，强调上帝的恩典不仅赐予信徒，也赐予陪伴他们的人。\\n\\nJomol鼓励观众将苦难视作信靠与转化的神圣邀请。通过玛利亚之约，她解释道，上帝使家庭得以成圣，引导他们进入更深的信仰。节目以一则深情祷告结束，祈求圣母代祷，赐予医治、力量与坚定的盼望。","bn":"তৃপ্তিকর ‘লিভিং ওরাকলস’ পর্ব ১২-এ, জোমল উপস্থাপন করেছেন চেলুরের লিজিথা থমাসের হৃদয় ছুঁয়ে যাওয়া সাক্ষ্য। তাঁর কন্যা পাঁচ বছর ধরে তীব্র অথচ নির্ণয়হীন পায়ের ব্যথায় কষ্ট পেয়েছে। হাসপাতালে একবার, একজন রহস্যময়ী সিস্টার তাঁর মেয়ের কাছে গিয়ে কোমলভাবে আশ্বাস দিয়েছিলেন, নয় দিনের মধ্যে সেরে উঠবে। লিজিথা দৃঢ়ভাবে বিশ্বাস করেন, সেই সিস্টার ছিলেন তীর্থ মাতৃ, অর্থাৎ সাঞ্চারি মাতাভু। প্রতিশ্রুতি অনুযায়ী, মেয়ে ক্রেপুসানামের আশীর্বাদিত তেল লাগিয়ে প্রার্থনায় আত্মসমর্পণের পর সুস্থ হয়ে উঠেছেন।\\n\\nতৎপরবর্তী সময়ে, লিজিথার নিজেই এক গুরুতর পেটের সমস্যার মুখোমুখি হন। কষ্টের মধ্যে, তাঁর স্বামী—যিনি আগে বিশ্বাস থেকে দূরে ছিলেন—অন্যান্যদের পাশে থাকা মানুষদের মধ্যেও ঈশ্বরের অনুগ্রহ প্রসারি‍ত হয়, এমন বার্তায় মুগ্ধ হয়ে মারিয়ান চুক্তিতে নাম লেখান। জোমল বিষয়টি অ্যাক্টস 27:24-র সাথে সংযোজিত করেন, যেখানে প্রচার করা হয় ঈশ্বরের অনুগ্রহ শুধু বিশ্বাসীদের জন্য নয়, তাদের সঙ্গে থাকা সবার জন্যই।\\n\\nজোমল দর্শকদের উৎসাহিত করেন দুঃখকে বিশ্বাস ও রূপান্তরের ঐশ্বরিক আহ্বান হিসেবে দেখতে। মারিয়ান চুক্তির মাধ্যমে তিনি ব্যাখ্যা করেন, ঈশ্বর পরিবারকে পবিত্র করেন এবং গভীর বিশ্বাসের পথে পরিচালিত করেন। অনুষ্ঠানটি একটি আন্তরিক প্রার্থনায় শেষ হয়, যেখানে চিরন্তন ​​আশার জন্য শফা ও শক্তি কামনা করা হয়।","en":"In Episode 12 of Living Oracles, Jomol presents the moving testimony of Lijitha Thomas from Chelur. Her daughter endured five years of intense, undiagnosed leg pain. During a hospital visit, a mysterious sister approached the daughter and gently assured that healing would come in nine days. Lijitha firmly believes this sister was the Pilgrim Mother (Sanchari Mathavu) in disguise. True to the promise, her daughter was healed after applying blessed oil from Kreupasanam and surrendering in prayer.\\n\\nSoon after, Lijitha herself faced a serious stomach condition. Amid her suffering, her husband—previously distant from faith—was drawn to the Marian Covenant after witnessing her miraculous healing. Jomol ties this to Acts 27:24, highlighting that God’s grace extends not just to the faithful, but to all who are with them.\\n\\nJomol encourages viewers to see suffering as a divine invitation to trust and transformation. Through the Marian Covenant, she explains, God sanctifies families and leads them into deeper faith. The episode concludes with a heartfelt prayer, invoking the intercession of the Blessed Mother for healing, strength, and unwavering hope.","hi":"‘लिविंग ओराकल्स’ के एपिसोड 12 में, जोमोल ने चेलूर की लिजिथा थॉमस की मार्मिक गवाही पेश की। उनकी बेटी को पांच वर्षों से तीव्र लेकिन अज्ञात पैर दर्द से पीड़ित रहना पड़ा। अस्पताल की एक यात्रा के दौरान, एक रहस्यमयी सिस्टर उनकी बेटी के पास आईं और धीरे से आश्वासन दिया कि नौ दिन में चंगा हो जाएगी। लिजिथा दृढ़ता से विश्वास करती हैं कि वह सिस्टर तीर्थ माता (सांचारी माताभु) थी। वादा सच साबित हुआ जब Kreupasanam से आशीर्वादित तेल लगाने और प्रार्थना के साथ समर्पण करने के बाद उनकी बेटी स्वस्थ हो गई।\\n\\nकुछ समय बाद, लिजिथा स्वयं एक गंभीर पेट की समस्या का सामना करती हैं। अपने कष्टों के बीच, उनके पति—जो पहले विश्वास से दूर थे—उनकी चमत्कारिक उपचार देख इनके साथ एहसान महसूस करते हैं और मरियन संधि की ओर आकर्षित होते हैं। जोमोल इसे प्रेरित रूप से प्रेरित करते हैं और मत्ती 27:24 को उद्धृत करते हुए स्पष्ट करती हैं कि ईश्वर की कृपा न केवल विश्वासी लोगों पर, बल्कि उनके साथ रहने वालों पर भी फैली होती है।\\n\\nजोमोल दर्शकों को सिखाती हैं कि कष्ट को विश्वास और परिवर्तन का दिव्य निमंत्रण समझें। मरियन संधि के माध्यम से वह बताती हैं कि परमेश्वर परिवारों को पवित्र करता है और उन्हें गहरी आस्था की ओर ले जाता है। यह एपिसोड एक दिल को छू लेने वाली प्रार्थना के साथ समाप्त होता है, जिसमें चंगाई, शक्ति और अटूट आशा के लिए बिनती की जाती है।","ta":"Living Oracles - 12 ஆவது அத்தியாயத்தில், Kelu வட்டாரத்திலிருந்து வந்த Lijitha Thomas என்பவரின் உணர்ச்சிப் பயணக் காட்சி Jomol மூலம் அழகாக முன்வைக்கப்பட்டது. அவரது மகள் ஐந்து ஆண்டுகளாக தீவிரமான, கண்டறியப்பட்டால் பற்றற்ற கால்ப் வலியால் கலங்கியிருந்தாள். மருத்துவமனை வந்தபோது, ஒரு மர்மமான அன்னை (சிஸ்டர்) அவரது மகளிடம் வந்து, 9 நாட்களில் குணமாகும் என்று மெதுவாக உறுதி செய்தார். Lijitha உறுதியாக நம்புகிறாள் அந்த சிஸ்டர் என்பது “Sanchari Mathavu” என்ற புனித தரிசனை பெற்ற தாய் என. Kreupasanam ஆராதனை எண்ணெய் பூசியதும், பிரார்த்தனையினால் அதன் பின் அவர்களின் மகள் குணமடைந்தாள்.\\n\\nஉடன் Lijitha தானே ஆழமான வயிற்று உடல் பிரச்னையை எதிர்கொண்டார். அவளது துன்பத்தின் மத்தியில், விசுவாசத்திலிருந்து தள்ளப்பட்டிருந்த அவரது கணவர், அவரது பரிகாரக் குணங்களை கண்டு மேரியன் உடன்படிக்கையின்படி விசுவாசத்தில் ஈடுபட்டார். Jomol இதை Acts 27:24 உடன் இணைத்து, கடவுளின் கிருபை ஒன்றுபோல விசுவாசிகளுக்கு மட்டுமல்ல, அவர்களுடன் இருக்கும் அனைவருக்கும் பரவுகிறது என்பதைக் காட்டுகிறார்.\\n\\nJomol பார்வையாளர்களை வலியைக் கடவுளின் விசுவாசத்திற்கும் மாற்றத்திற்குமான ஒரு தெய்வீக அழைப்பாகக் கண்டு கொள்ள تشحفительதி. மேரியன் உடன்படிக்கையாக, கடவுள் குடும்பங்களை புனிதப்படுத்துகிறார் என்றும் ஆழமான விசுவாச நோக்கிலும் அவர்களை வழிநடத்துகிறார் என்றும் விளக்குகிறார். தொடர் இறுதியில், குணமடைவு, வலிமை மற்றும் உறுதியான நம்பிக்கைக்காக பரிசுத்த தாயின் தலாπோம் வழிபாட்டு பிரார்த்தனையுடன் நிறைவடைகிறதே.","te":"లివింగ్ ఓరా‌కిల్స్ - Episode 12 లో, జోమోల్ చేల్‌యూర్‌ నుంచి వచ్చిన లిజిత థామస్ మనో‌భావాలను పంచుకుంటారు. ఆమె కుమార్తె ఐదు సంవత్సరాలుగా తీవ్రమైన, నిర్ధారించని కొడుకు నొప్పితో బాధపడింది. ఒకసారి హాస్పిటల్‌కి వెళ్లినప్పుడు, ఒక మిస్టరీ భోన్స్టర్ వచ్చి ఆ కుమార్తెని కోపంగా ఆస్వాసించింది, తొమ్మిదు రోజుల్లో కోలుకుంటుందని. లిజిత ఈ భోన్స్టర్ శంచారి మాతావుగా (Pilgrim Mother) నమ్ముతారు. Kreupasanam నుండి ఆశీర్వదించిన నూనెను ఉపయోగించి ప్రార్థనతో సమర్పించిన తరువాత, ఆమె కుమార్తె నిజంగా ఆరోగ్యంగా మారింది.\\n\\nతర్వాత, లిజిత కూడా తీవ్ర ఉద్ధరం సమస్యకు బలవంతమైంది. ఆమె బాధలో, విశ్వాసానికి దూరంగా ఉన్న ఆమె భర్త, ఆమె ఆశ్చర్యకరమైన నయం చూసి మేలారియాన్ ఒందుబడి (Marian Covenant) కోసం ఆకర్షితులయ్యారు. జోమోల్ దీనిని యాక్ట్స్ 27:24 తో అనుసంధానిస్తున్నారు, దేవుని అనుగ్రహం కేవలం విశ్వాసులకు కాదు, వారి తోడుగా ఉన్నవారికీ లభిస్తుంది అని హైలెట్ చేస్తున్నారు.\\n\\nజోమోల్ ప్రేక్షకులను బాధను భక్తి మరియు మార్పుకు ఒక దివ్య ఆహ్వానంగా చూడమని ప్రేరేపిస్తున్నారు. మేలారియాన్ ఒందుబడి ద్వారా, దేవుడు కుటుంబాలను పవిత్రంగా చేస్తాడు, వారిని లోతైన విశ్వాసంలో నడిపిస్తాడు అని వివరించాలి. ఈ ఎపిసోడ్ పరభూత ప్రార్థనతో ముగుస్తుంది, దివ్యజీవితం కోసం, బలానికి, మార్చని నమ్మకానికి పరితపించేరు.","fr":"Dans l’épisode 12 de Living Oracles, Jomol présente le témoignage poignant de Lijitha Thomas, originaire de Chelur. Sa fille a souffert de douleurs intenses à la jambe pendant cinq ans sans diagnostic. Lors d’une visite à l’hôpital, une mystérieuse sœur s’est approchée de la fillette et l’a assuré doucement qu’elle serait guérie dans neuf jours. Lijitha est convaincue que cette sœur était la Mère Pèlerine (Sanchari Mathavu) déguisée. Fidèle à sa promesse, la fillette a été guérie après l’application de l’huile bénite de Kreupasanam et une prière de soumission.\\n\\nPeu après, Lijitha elle-même a été confrontée à une grave affection de l’estomac. Au milieu de sa souffrance, son mari — jusqu’alors éloigné de la foi — a été attiré par l’Alliance Mariale après avoir été témoin de sa guérison miraculeuse. Jomol relie cela à Actes 27:24, soulignant que la grâce de Dieu s’étend non seulement aux croyants, mais aussi à ceux qui les accompagnent.\\n\\nJomol encourage les téléspectateurs à percevoir la souffrance comme une invitation divine à la confiance et à la transformation. Par l’Alliance Mariale, elle explique que Dieu sanctifie les familles et les conduit à une foi plus profonde. L’épisode se conclut par une prière sincère, invoquant l’intercession de la Sainte Mère pour la guérison, la force et l’espérance inébranlable.","es":"En el episodio 12 de Living Oracles, Jomol presenta el conmovedor testimonio de Lijitha Thomas, de Chelur. Su hija soportó durante cinco años un dolor intenso e indeterminado en la pierna. Durante una visita al hospital, una misteriosa hermana se acercó a la hija y le aseguró con dulzura que sanaría en nueve días. Lijitha está convencida de que esa hermana era la Madre Peregrina (Sanchari Mathavu) disfrazada. Fiel a su promesa, la hija fue sanada tras aplicar aceite bendecido de Kreupasanam y entregarse en oración.\\n\\nPoco después, la propia Lijitha enfrentó una grave afección estomacal. En medio de su sufrimiento, su esposo —anteriormente alejado de la fe— fue atraído hacia el Pacto Mariano después de presenciar su sanación milagrosa. Jomol relaciona esto con Hechos 27:24, recalcando que la gracia de Dios no solo alcanza a los creyentes, sino también a quienes están con ellos.\\n\\nJomol anima a los espectadores a ver el sufrimiento como una invitación divina a la confianza y transformación. A través del Pacto Mariano, explica que Dios santifica a las familias y las conduce a una fe más profunda. El episodio concluye con una oración sentida, invocando la intercesión de la Santísima Madre para la sanación, fortaleza y esperanza inquebrantable.","kn":"Living Oracles – Episoqe 12 ನಲ್ಲಿ, ಜೊಮೋಲ್ ಚೆಲುರ್‌ನ ಲಿಜಿತಾ ಥಾಮಸ್ ಅವರ ಮನಸ್ಸನ್ನು ಸ್ಪರ್ಶಿಸುವ ಪ್ರಮಾಣವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ. ಅವರ ಮಗಳು ಐದು ವರ್ಷಗಳ ಕಾಲ ನಿರ್ದಿಷ್ಠವಲ್ಲದ ಕಠಿಣ ಕಾಲು ನೋವಿನಿಂದ ಬಳಲುತ್ತಿದ್ದಳು. ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡುವಾಗ, ಒಂದು ರಹಸ್ಯದ ಸಿಸ್ಟರ್ ಅವರ ಮಗಳಿಗೆ ಹತ್ತಿರ ಬಂದಿದ್ದು, ಮುಕ್ತವಾಗಿ ಒಪ್ಪಂದಿಸಿ, ಒಂಬತ್ತೇ ದಿನಗಳಲ್ಲಿ ಗುಣಪಡಿಸುವುದಾಗಿ ನಂಬಿಕೆ ನೀಡಿದರು. ಲಿಜಿತಾ ವಿಶ್ವಾಸಿಸಿಕೊಳ್ಳುತ್ತಾಳೆ ಆ ಸಿಸ್ಟರ್ ಯಾತ್ರಿಕ ತಾಯಿ (ಸಾಂಚಾರೀ ಮಾತಾವು) disguise ಆಗಿದ್ದಾಳೆ. ಊರಿನಲ್ಲಿ ನಿಯೋಜಿತ ಬೆಳ್ಳಿಯ ಎಣ್ಣೆ ಬಳಸಿ, ಭಕ್ತಿಯಿಂದ ಅರ್ಪಣೆಯಿಂದ ಯಸಂತು ಮಗಳು ಚೇತರಿಸಿಕೊಂಡಳು.\\n\\nಆ ಬಳಿಕಲೇ, ಲಿಜಿತಾ ತನ್ನೂ ತೀವ್ರ ಹೊಟ್ಟೆ ಸಮಸ್ಯೆ ಎದುರಿಸಿದರು. ಅವಳ ಭೀಕರ ನೋವಿನ ಮಧ್ಯೆ, ವಿಶ್ವಾಸದಿಂದ ದೂರಗಿದ್ದ ಅವರ ಗಂಡ, ಅವರ ಅದ್ಭುತ ಚೇತರಿಕೆಯನ್ನು ಕಂಡು, ಮರಿಯನ್ ಒಪ್ಪಂದದ ಕಡೆಗೆ ಸೆಳೆಯಲ್ಪಟ್ಟರು. ಜೊಮೋಲ್ ಇದನ್ನು ಕ್ರಿಯೆಗಳು 27:24 ಕ್ಕೆ ಸಂಬಂಧಿಸುತ್ತಾರೆ, ದೇವರ ಅನುಗ್ರಹವು ವಿಶ್ವಾಸಿಗಳಿಗೂ, ಅವರನ್ನು ಅನುಬಂಧಿಸುವವರಿಗೂ ವಿಸ್ತರಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಒತ್ತಿಡುತ್ತಾರೆ.\\n\\nಜೊಮೋಲ್ ಶ್ರೋತೃಗಳನ್ನು ನೋವನ್ನು ಭಕ್ತಿಯ ಹಾಗೂ ಪರಿವರ್ತನೆಯ ದಿವ್ಯ ಆಮಂತ್ರಣವೆಂದು ನೋಡಿ ಪರಿಗಣಿಸಲು ಪ್ರೇರೇಪಿಸುತ್ತಾರೆ. ಮರಿಯನ್ ಒಪ್ಪಂದದ ಮೂಲಕ ಅವರು, ದೇವರು ಕುಟುಂಬಗಳನ್ನು ಪವಿತ್ರಗೊಳಿಸುತ್ತಾನೆ ಮತ್ತು ಅವರನ್ನು ಆಳವಾದ ನಂಬಿಕೆಯ ಕಡೆಗೆ ನೇರಿಸುತ್ತಾನೆ ಎಂದು ವಿವರಿಸುತ್ತಾರೆ. ಪ್ರकरणವು ಸಮಾಪ್ತಿಯಲ್ಲಿ ಪ್ರಾರ್ಥನೆಯೊಂದಿಗೆ, ಗುಣಮುಖತೆ, ಶಕ್ತಿ ಮತ್ತು ಅಚಲನವಾದ ಭರವಸೆಗಾಗಿ ಪವಿತ್ರ ಮಾತೃಮಾತೆಯ ಮಧ್ಯಸ್ಥತೆಯನ್ನು ಸಂತೋಷಪೂರ್ವಕವಾಗಿ ವಿನಂತಿಸುತ್ತವೆ.","mr":"लिव्हिंग ओरॅकल्स - भाग 12 मध्ये, जोमोलने चेलूरच्या लिजिथा थॉमसचे हृद्यस्पर्शी साक्षात्कार मांडले. तिच्या मुलीला पाच वर्षे तीव्र, अनिर्णित पायदुखीने त्रास सहन करावा लागला. रुग्णालय दौऱ्यादरम्यान, एका गूढ बहिणीने तिच्या पोराजवळ येऊन सौम्यपणे आश्वासित केले की नऊ दिवसांत ती बरे होईल. लिजिथा ठामपणे विश्वास ठेवते की ती बहिण तीर्थयात्री माता (सांचारी माथावु) च्या रूपात आली होती. Kreupasanam मधील आशीर्वादित तेल लावून तसेच प्रार्थनेच्या आत्मसमर्पणानंतर तिची मुलगी खरोखर बरे झाली.\\n\\nलवकरच, लिजिथा स्वतः गंभीर पोटाच्या आजाराचा सामना करते. तिच्या वेदनांच्या दरम्यान, तिचा नवरा—जो पूर्वी श्रद्धा पासून दूर होता—तिच्या चमत्कारिक उपचाराचे साक्षीदार होऊन मरियन कराराकडे आकर्षित होतो. जोमोल हे Acts 27:24 शी जोडते, हे अधोरेखित करून की परमेश्वराची कृपा केवळ श्रद्धाळूंना नाही, तर त्यांच्याबरोबर असलेल्या सर्वांना देण्यात येते.\\n\\nजोमोल प्रेक्षकांना वेदना हा विश्वास आणि परिवर्तनाचे दैवी निमंत्रण म्हणून पाहण्यासाठी प्रोत्साहित करते. मरियन कराराद्वारे ती स्पष्ट करते की देव कुटुंबांना पवित्र करतो आणि त्यांना अधिक खोल श्रद्धेच्या दिशेकडे नेतो. हे भाग अंततः उपचार, ताकद, आणि अटूट आशेसाठी पवित्र मातांचे मध्यस्थत्व घेऊन हृदयविश्वासपूर्ण प्रार्थनेने समाप्त होते."},"subtitles":"/assets/oracles/oracles12.json"}]`);
const languageMap = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  fr: "Français",
  es: "Español",
  mr: "मराठी",
  kn: "ಕನ್ನಡ"
};
function Oracles({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLang(initialLang);
    }
  }, [initialLang]);
  const getYouTubeThumbnail2 = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };
  const thumbnails = oracles.map(({ video }) => getYouTubeThumbnail2(video)).filter(Boolean);
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  useEffect(() => {
    if (thumbnails.length > 0 && imagesLoaded === thumbnails.length) {
      setAllImagesLoaded(true);
    }
    if (thumbnails.length === 0) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: styles$5.testimoniesSection,
      style: { marginTop: "0", backgroundColor: window.innerWidth <= 768 ? "#fff" : "transparent" },
      children: /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesSectionContainer, style: { margin: "0 1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesHeader, children: [
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", textAlign: "center" }, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: styles$3.backButton,
                onClick: () => window.history.back(),
                style: {
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: window.innerWidth <= 768 ? "none" : "block"
                },
                children: [
                  "← ",
                  /* @__PURE__ */ jsx("span", { children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: styles$5.testimoniesTitle, style: { margin: 0 }, children: "Oracles" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles$5.testimoniesSubtitle, children: "Stories of healing, grace..." }),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem"
              },
              children: /* @__PURE__ */ jsxs(Dropdown, { onSelect: (e) => setLang(e), children: [
                /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-lang", children: languageMap[lang] ?? languageMap["en"] }),
                /* @__PURE__ */ jsx(Dropdown.Menu, { children: Object.entries(languageMap).map(([key, label]) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: key, children: label }, key)) })
              ] })
            }
          )
        ] }),
        !allImagesLoaded && /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#246bfd",
              fontSize: "1.2rem"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: "40px",
                    height: "40px",
                    border: "4px solid #d3e3ff",
                    borderTop: "4px solid #246bfd",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginBottom: "1rem"
                  }
                }
              ),
              "Loading Oracles...",
              /* @__PURE__ */ jsx("style", { children: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            ` })
            ]
          }
        ),
        allImagesLoaded && /* @__PURE__ */ jsx("div", { className: styles$5.testimoniesGrid, children: oracles.length > 0 ? oracles.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map(({ id, title, video, date }) => {
          const thumbnail = getYouTubeThumbnail2(video);
          return /* @__PURE__ */ jsx(
            TestimonyCard,
            {
              id,
              title,
              image: thumbnail || "",
              date,
              lang,
              path: `${lang}/oracles`,
              onImageLoad: handleImageLoad
            },
            id
          );
        }) : /* @__PURE__ */ jsxs(
          "div",
          {
            className: styles$5.testimoniesCard,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 1rem",
              border: "2px dashed #a2c4ff",
              borderRadius: "20px",
              backgroundColor: "rgba(240, 245, 255, 0.5)",
              maxWidth: "600px",
              margin: "3rem auto",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(36, 107, 253, 0.08)",
              backdropFilter: "blur(8px)"
            },
            children: [
              /* @__PURE__ */ jsx(HiOutlineEmojiSad, { size: 50, color: "#246bfd", style: { marginBottom: "1rem" } }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#246bfd", fontWeight: "600", fontSize: "1.4rem" }, children: "No Oracles Available" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: thumbnails.map((src, idx) => /* @__PURE__ */ jsx("img", { src, alt: "", onLoad: handleImageLoad }, idx)) })
      ] })
    }
  );
}
function OraclesPage({ lang: initialLang }) {
  const { id } = useParams();
  const oracle = oracles.find((item) => item.id === parseInt(id));
  const [lang, setLang] = useState(initialLang || "en");
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [shareText, setShareText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  if (!oracle) {
    return /* @__PURE__ */ jsx("div", { className: styles$3.notFoundPage, children: /* @__PURE__ */ jsxs("div", { className: styles$3.notFoundContainer, children: [
      /* @__PURE__ */ jsx("h1", { className: styles$3.notFoundCode, children: "404" }),
      /* @__PURE__ */ jsx("h2", { className: styles$3.notFoundTitle, children: "ORACLE Not Found" }),
      /* @__PURE__ */ jsx("p", { className: styles$3.notFoundText, children: "The episode you’re looking for doesn’t exist or has been removed." }),
      /* @__PURE__ */ jsx(Link, { to: `/${lang || "en"}/oracles`, className: styles$3.notFoundButton, children: "Browse Oracles" })
    ] }) });
  }
  const { title, date, content, video, subtitles: subtitlesUrl } = oracle;
  const cssBackgroundImages = [
    "/assets/angel3.webp",
    "/assets/angel3.webp",
    "/assets/cloud.webp"
  ];
  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);
  useEffect(() => {
    if (lang === "other") {
      setShowLangHelp(true);
    } else {
      setShowLangHelp(false);
    }
  }, [lang]);
  useEffect(() => {
    setShareText(generateShareText(oracle, lang, window.location.href, "A Spiritual Oracle", includeSummary, video));
  }, [lang, oracle, includeSummary]);
  const { currentTime, playerRef } = useYouTubePlayer(videoId, showVideo);
  const {
    subtitles,
    // With end times
    currentSubtitle
    // Filtered for time/lang
  } = useSubtitles(subtitlesUrl, lang, currentTime);
  const {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange
  } = useSpeechSync({ playerRef, showVideo, subtitles, currentSubtitle, currentTime, lang });
  useEffect(() => {
    if (!showVideo && isSpeaking) {
      window.speechSynthesis.cancel();
    }
  }, [showVideo, isSpeaking]);
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title["en"])}&body=${encodeURIComponent(shareText)}`;
  if (!allAssetsLoaded) {
    return /* @__PURE__ */ jsxs("div", { className: styles$3.loadingOverlay, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.spinner }),
      /* @__PURE__ */ jsx("p", { children: "Loading visuals..." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyPage, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyHeader, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyLeft, children: /* @__PURE__ */ jsxs("button", { className: styles$3.backButton, onClick: () => window.history.back(), children: [
        "← ",
        /* @__PURE__ */ jsx("span", { className: styles$3.backText, children: "Back" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyCenter, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineLeft }),
        /* @__PURE__ */ jsx("h2", { className: styles$3.testimonyHeading, children: "Living ORACLES" }),
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineRight })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyRight, children: /* @__PURE__ */ jsx(LanguageDropdown, { lang, onSelect: setLang }) })
    ] }),
    showLangHelp && /* @__PURE__ */ jsx(LangHelpOverlay, { onClose: () => {
      setLang("en");
      setShowLangHelp(false);
    } }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.left}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.right}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingCloud} ${styles$3.bottom}` }),
    /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContainer, children: /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyInner, children: [
      videoId && !showVideo ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: styles$3.thumbnailWrapper,
          onClick: () => setShowVideo(true),
          style: { cursor: "pointer" },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: thumbnailUrl,
                alt: "Video Thumbnail",
                className: styles$3.thumbnailImage
              }
            ),
            /* @__PURE__ */ jsx("div", { className: styles$3.smallPlayIcon, children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "#ff0000",
                width: "60%",
                height: "60%",
                children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: styles$3.thumbnailWrapper, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: thumbnailUrl,
          alt: "Video Thumbnail",
          className: styles$3.thumbnailImage
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyText, children: [
        /* @__PURE__ */ jsx("h1", { className: styles$3.testimonyTitle, children: title[lang] || title["en"] }),
        /* @__PURE__ */ jsx("p", { className: styles$3.testimonyDate, children: date }),
        /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContent, children: content[lang] || content["en"] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.shareSection, children: [
        /* @__PURE__ */ jsx("p", { style: { fontWeight: "600" }, children: "Share this Oracle:" }),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: "2rem" }, children: /* @__PURE__ */ jsx("button", { className: styles$3.shareMainButton, onClick: () => setShowShareModal(true), children: "🔗 Share" }) }),
        /* @__PURE__ */ jsx(
          ShareModal,
          {
            show: showShareModal,
            onHide: () => setShowShareModal(false),
            title: "Oracle",
            shareText,
            setShareText,
            fbShareUrl,
            waShareUrl,
            telegramShareUrl,
            emailShareUrl,
            styles: styles$3,
            includeSummary,
            setIncludeSummary
          }
        )
      ] })
    ] }) }),
    showVideo && /* @__PURE__ */ jsx(
      FloatingVideoPlayer,
      {
        isSpeaking,
        volume,
        toggleSpeaking,
        handleVolumeChange,
        playerRef,
        currentSubtitle,
        onClose: () => setShowVideo(false)
      }
    )
  ] });
}
const dhyanam = /* @__PURE__ */ JSON.parse(`[{"id":1,"title":{"zh":"盟约敬拜 - 2025年7月8日","bn":"চুক্তির উপাসনা - ৮/০৭/২০২৫","en":"Covenant Worship - 8/07/2025","hi":"वाचा आराधना - 8/07/2025","ta":"உடன்படிக்கை礼拜ம் - 8/07/2025","te":"ఒడంబడిక ఆరాధన - 8/07/2025","fr":"Adoration de l'Alliance - 08/07/2025","es":"Adoración del Pacto - 8/07/2025","mr":"करार उपासना - ८/०७/२०२५","kn":"ಒಡಂಬಡಿಕೆಯ ಆರಾಧನೆ - ೮/೦೭/೨೦೨೫"},"date":"July 8, 2025","video":"https://youtu.be/um9lQfw_7a4","content":{"en":"Fr. V.P. Joseph opened the July 8, 2025, Marian Covenant Worship with an earnest prayer for the lost, the jobless, those anxious about the future of their children, and those who feel directionless in life. He invoked the powerful intercession of the Holy Mother, asking her to bring miracles and new light into the lives of those struggling with uncertainty, fear, and despair.\\n\\nHe then spoke about the importance of yearning for the needs of others, emphasizing that such compassion sparks joy in God’s eyes. Quoting John 13:35, he reminded the faithful that love for one another is the true mark of discipleship. Fr. Joseph stressed that outward religious traditions alone are not enough for salvation—what matters is the personal, individual journey of faith.\\n\\nFr. shared the moving testimony of Jeromin, a software developer who lost his job and came to realize that he had lost his merit. Through the grace of the Marian Covenant, his life was restored—he found a new job and his daughter was miraculously healed. Fr. concluded by affirming that when we shift our focus from earthly needs to eternal life, the grace of the covenant leads us back to God’s path.","zh":"2025年7月8日，V.P. 约瑟神父在圣母盟约敬拜中，为迷失者、失业者、对孩子未来感到焦虑者以及生活中迷失方向者诚心祈祷。他祈求圣母大能的代祷，愿她为挣扎于不确定、恐惧与绝望中的人们带来奇迹和新光明。\\n\\n随后，他讲述了对他人需求渴望的重要性，强调这种怜悯在上帝眼中点燃喜悦之火。他引用约翰福音13:35，提醒信徒彼此相爱才是真正门徒的标志。约瑟神父强调，单靠外在宗教传统不足以得救，关键是个人的信仰之旅。\\n\\n神父分享了软件开发者Jeromin的感人见证，他失去了工作，后来意识到自己失去了功德。藉着圣母盟约的恩典，他的生活得以恢复——找到了新工作，女儿也得到了奇迹般的医治。神父总结道，当我们将注意力从世俗需求转向永恒生命时，盟约的恩典引领我们回到神的道路。","bn":"২০২৫ সালের ৮ই জুলাই, ফাদার ভি.পি. জোসেফ মারিয়ান কভেন্যান্ট উপাসনা শুরু করেন হারানো মানুষ, বেকার, তাদের সন্তানের ভবিষ্যত নিয়ে উদ্বিগ্ন এবং জীবনে পথহারা মানুষের জন্য আন্তরিক প্রার্থনা দিয়ে। তিনি পবিত্র মাতার শক্তিশালী মধ্যস্থতায় আবেদন জানান, যেন তিনি অনিশ্চয়তা, ভয় এবং হতাশায় ভোগা মানুষের জীবনে আশ্চর্য এবং নতুন আলো আনেন।\\n\\nএরপর তিনি অন্যদের প্রয়োজনের জন্য তৃষ্ণার গুরুত্ব নিয়ে কথা বলেন, এ ধরনের করুণা ঈশ্বরের চোখে আনন্দের স্ফুলিঙ্গ সৃষ্টি করে। যোহন ১৩:৩৫ উদ্ধৃত করে তিনি বিশ্বাসীদের মনে করিয়ে দেন যে একে অপরকে ভালোবাসাই প্রকৃত শিষ্যের চিহ্ন। ফাদার জোসেফ জোর দিয়ে বলেন যে শুধু বাহ্যিক ধর্মীয় রীতি আরামদায়ক নয়—যা গুরুত্বপূর্ণ তা হল ব্যক্তিগত, স্বতন্ত্র বিশ্বাসের যাত্রা।\\n\\nতিনি জেরোমিন নামের একজন সফটওয়্যার ডেভেলপারের হৃদয়গ্রাহী সাক্ষ্য ভাগ করেন, যিনি তার চাকরি হারিয়েছিলেন এবং বুঝতে পেরেছিলেন যে তিনি তার গুণ হারিয়েছেন। মারিয়ান কভেন্যান্টের করুণায় তার জীবন পুনরুদ্ধার হয়—সে একটি নতুন চাকরি পায় এবং তার মেয়ের আশ্চর্যজনকভাবে সুস্থ হয়। ফাদার উপসংহারে বলেন, যখন আমরা পার্থিব চাহিদা থেকে চিরন্তন জীবনের দিকে মনোযোগ ঘুরিয়ে দিই, তখন এই কভেন্যান্টের করুণা আমাদের ঈশ্বরের পথে ফিরিয়ে আনে।","hi":"8 जुलाई 2025 को फ्र. वी.पी. जोसेफ ने मारियन् कैवेनेंट आराधना की शुरुआत खोए हुए, बेरोज़गार, अपने बच्चों के भविष्य को लेकर चिंतित और जीवन में दिशाहीन महसूस करने वालों के लिए गंभीर प्रार्थना से की। उन्होंने पवित्र माता की शक्तिशाली मध्यस्थता मांगी, जिससे अनिश्चितता, भय और निराशा से जूझ रहे लोगों के जीवन में चमत्कार और नई ज्योति आए।\\n\\nफिर उन्होंने दूसरों की जरूरतों के लिए तृष्णा के महत्व पर बात की, यह बताते हुए कि ऐसी करुणा ईश्वर की नजर में आनंद की चिंगारी जलाती है। उन्होंने यूहन्ना 13:35 का उल्लेख करते हुए विश्वासी को याद दिलाया कि एक-दूसरे से प्रेम करना सच्चे शिष्य की निशानी है। फ्र. जोसेफ ने जोर देकर कहा कि केवल बाहरी धार्मिक परंपराएं मोक्ष के लिए पर्याप्त नहीं हैं—जो मायने रखता है वह व्यक्तिगत, व्यक्तिगत विश्वास की यात्रा है।\\n\\nफ्र. ने जेरोमिन नामक एक सॉफ्टवेयर डेवलपर की प्रेरणादायक गवाही साझा की, जो अपनी नौकरी खो चुके थे और बाद में समझे कि उन्होंने अपनी योग्यता खो दी है। मारियन् कैवेनेंट की कृपा से उनका जीवन पुनर्स्थापित हुआ—उन्हें नई नौकरी मिली और उनकी बेटी चमत्कारिक रूप से ठीक हो गई। फ्र. ने निष्कर्ष निकाला कि जब हम अपना ध्यान सांसारिक जरूरतों से शाश्वत जीवन की ओर मोड़ते हैं, तो कैवेनेंट की कृपा हमें परमेश्वर के मार्ग पर वापस ले आती है।","ta":"2025 ஜூலை 8 அன்று Fr. V.P. Joseph மரியன் ஒப்பந்த வழிபாட்டை துவங்கி, இழந்தவர்கள், வேலை இழந்தவர்கள், அவர்களது பிள்ளைகளின் எதிர்காலத்தைப் பற்றி கவலைப்படுபவர்கள் மற்றும் வாழ்வில் திசையில்லாதவர்கள் ஆகியோருக்காக ஆவலுடன் பிரார்த்தனை செய்தார். அவர் தூய மாதாவின் சக்தி வாய்ந்த இடைமுகத்தைக் கேட்டுக் கொண்டு, சந்தேகம், பயம் மற்றும் மனச்சோர்வில் போராடும் அவர்களின் வாழ்வில் அற்புதங்கள் மற்றும் புதிய ஒளியை கொடுக்கச் சொல்லினார்.\\n\\nபிறகு, பிறரின் தேவைகளுக்காக கனிந்த விருப்பம் வைத்திருப்பதின் முக்கியத்துவத்தைப் பற்றி பேசினார், அத்தகைய கருணை கடவுளின் கண்களில் மகிழ்ச்சியை ஏற்படுத்துகிறது என்று வலியுறுத்தினார். யோவான் 13:35 ஐ மேற்கோள் காட்டி, ஒருவருக்கொருவர் காதல் காட்டுவது உண்மையான சீடனுக்கான அடையாளம் என நினைவூட்டினார். Fr. Joseph வெளிப்புற மத மரபுகள் மட்டும் தம்மை ரட்சிக்க முடியாது என்று வலியுறுத்தினார்; முக்கியமானது தனிப்பட்ட நம்பிக்கை பயணம் தான்.\\n\\nFr. Jeromin என்ற மென்பொருள் அபிவிருத்தி தொழிலாளரின் அன்பான சாட்சி பகிர்ந்தார், இவர் தனது வேலை இழந்தார் மற்றும் தன்னுடைய தரத்தை இழந்ததாக உணர்ந்தார். மரியன் ஒப்பந்தத்தின் கிருபையால், அவரது வாழ்க்கை மீண்டும் உருவானது—புதிய வேலை கிடைத்தது மற்றும் அவரது மகளுக்கு அற்புதமாக குணம் காணப்பட்டது. Fr. முடிவில், நாம் நமது கவனத்தை பூமியில் உள்ள தேவைகளில் இருந்து நித்திய வாழ்வுக்கு மாற்றினால், ஒப்பந்தத்தின் கிருபை எங்களை கடவுளின் பாதையில் திருப்பும் என உறுதியளித்தார்.","te":"2025 జూలై 8 న Fr. V.P. Joseph మరియాన్ ఒప్పంద పూజను ప్రారంభించి, జీవితంలో దారితప్పినవారు, నిరుద్యోగులు, వారి పిల్లల భవిష్యత్తు గురించి ఆందోళన చెందేవారు మరియు జీవితంలో దిశ లేకపోవడం వల్ల బాధపడేవారు కోసం గాఢమైన ప్రార్థన చేశారు. ఆయన పవిత్ర తల్లి ప్రాభవశాలి మధ్యస్థతను కోరుతూ, అనిశ్చితి, భయం మరియు నిరాశతో బాధపడుతున్న వారి జీవితాలలో అద్భుతాలు మరియు కొత్త వెలుగులు రావాలని ప్రార్థించారు.\\n\\nతర్వాత ఆయన ఇతరుల అవసరాలకు తీవ్రంగా ఆకాంక్షించటం ముఖ్యమని చెప్పి, ఇలాంటి సహానుభూతి దేవుని కళ్లలో సంతోషాన్ని కలిగిస్తుందని గుర్తు చేశారు. యోహాను 13:35 ని పునరుద్ధరించి, పరస్పరం ప్రేమించడం నిజమైన శిష్యత్వానికి గుర్తుగా ఉంటుందని ఆయన స్మరించారు. Fr. Joseph బయట ప్రదర్శించే మత పరంపరలు మాత్రమే రక్షణకు తగని వంటివి అని, వ్యక్తిగత విశ్వాస ప్రయాణమే ముఖ్యమని చెప్పాడు.\\n\\nFr. Jeromin అనే ఒక సాఫ్ట్‌వేర్ డెవలపర్ తన ఉద్యోగాన్ని కోల్పోయి తన ఆధ్యాత్మిక కీर्तनను కోల్పోయాడని తెలుసుకున్న సంఘటనను పంచుకున్నారు. మరియాన్ ఒప్పంద కృపతో అతని జీవితం తిరిగి నిలబడింది—తనకు కొత్త ఉద్యోగం దొరికింది మరియు అతని కుమార్తె అద్భుతంగా కోలుకుంది. Fr. ముగింపులో, మన దృష్టిని భౌతిక అవసరాల నుంచి శాశ్వత జీవితం వైపు తిప్పితే, ఒప్పంద కృప మనలను దేవుని మార్గానికి దారితీస్తుందని చెప్పారు.","fr":"Le 8 juillet 2025, lors de l’Adoration de l’Alliance mariale, le père V.P. Joseph a commencé par une prière sincère pour les âmes perdues, les chômeurs, ceux qui s’inquiètent de l’avenir de leurs enfants et ceux qui se sentent sans direction dans la vie. Il a invoqué l’intercession puissante de la Sainte Mère, demandant qu’elle apporte des miracles et une lumière nouvelle dans la vie de ceux qui luttent contre l’incertitude, la peur et le désespoir.\\n\\nIl a ensuite parlé de l’importance de ressentir un désir pour les besoins des autres, insistant sur le fait que cette compassion suscite une étincelle de joie dans les yeux de Dieu. Citant Jean 13:35, il a rappelé aux fidèles que l’amour les uns pour les autres est la véritable marque du disciple. Le père Joseph a souligné que les traditions religieuses extérieures ne suffisent pas au salut—ce qui compte, c’est le parcours de foi personnel et individuel.\\n\\nIl a partagé le témoignage émouvant de Jeromin, un développeur logiciel qui a perdu son emploi puis compris qu’il avait perdu son mérite. Par la grâce de l’Alliance mariale, sa vie a été restaurée : il a trouvé un nouvel emploi et sa fille a été miraculeusement guérie. Le père a conclu en affirmant que lorsque nous orientons notre regard des besoins terrestres vers la vie éternelle, la grâce de l’Alliance nous ramène sur le chemin de Dieu.","es":"El 8 de julio de 2025, durante la Adoración del Pacto Mariano, el padre V.P. Joseph inició con una oración sincera por los perdidos, los desempleados, aquellos preocupados por el futuro de sus hijos y quienes se sienten sin dirección en la vida. Invocó la poderosa intercesión de la Santísima Madre, pidiendo que introduzca milagros y nueva luz en la vida de quienes luchan con la incertidumbre, el miedo y la desesperación.\\n\\nLuego habló sobre la importancia de anhelar satisfacer las necesidades de los demás, enfatizando que dicha compasión enciende una chispa de alegría en los ojos de Dios. Citando Juan 13:35, recordó a los fieles que el amor mutuo es la verdadera señal del discípulo. El padre Joseph subrayó que las tradiciones religiosas externas por sí solas no bastan para la salvación—lo que importa es el trayecto de fe personal e individual.\\n\\nCompartió el conmovedor testimonio de Jeromin, un desarrollador de software que perdió su trabajo y luego comprendió que había perdido el mérito espiritual. Por la gracia del Pacto Mariano, su vida fue restaurada: consiguió un nuevo empleo y su hija fue sanada milagrosamente. El padre concluyó afirmando que cuando cambiamos nuestro enfoque de las necesidades terrenales hacia la vida eterna, la gracia del pacto nos guía de regreso al camino de Dios.","mr":"8 जुलै 2025 रोजी फ्र. V.P. Joseph यांनी मारियन करार उपासनेची सुरुवात हरवलेल्या, बेरोजगार, आपल्या मुलांच्या भविष्याबद्दल चिंतित आणि दिशा हरवलेल्या लोकांसाठी मनापासून प्रार्थनेने केली. त्यांनी पवित्र मातेसाठी सामर्थ्यवान मध्यस्थता मागितली, जी अनिश्चितता, भीती आणि निराशेत अडकलेल्या लोकांच्या आयुष्यात चमत्कार आणि नवीन प्रकाश आणेल.\\n\\nयानंतर त्यांनी इतरांच्या गरजांसाठी तृष्णा ठेवण्याचे महत्त्व सांगितले, असे करुणा देवाच्या डोळ्यात आनंद निर्माण करते. युहन्ना 13:35 उद्धृत करताना त्यांनी विश्वस्तांना आठवण करून दिली की एकमेकांवर प्रेम करणे म्हणजे खरे शिष्यत्व. फ्र. जोसेफ यांनी जोर देऊन सांगितले की फक्त बाह्य धार्मिक परंपरांनी मोक्ष मिळत नाही—महत्त्वाचे म्हणजे वैयक्तिक, स्वतंत्र श्रद्धेचा प्रवास.\\n\\nत्यांनी जेरोमिन नावाच्या सॉफ्टवेअर डेव्हलपरचा भावनिक साक्षात्कार शेअर केला, ज्यांनी आपली नोकरी गमावली आणि नंतर समजले की त्यांना आध्यात्मिक गुण गमावले आहेत. मारियन कराराच्या कृपेने, त्यांचे जीवन पुनर्स्थापित झाले—त्यांना नवीन नोकरी मिळाली आणि त्यांची मुलगी चमत्कारिकपणे बरी झाली. फ्र. यांनी निष्कर्ष काढला की जेव्हा आपण आपले लक्ष सांसारिक गरजांपासून शाश्वत जीवनाकडे वळवतो, तेव्हा कराराची कृपा आपल्याला परमेश्वराच्या मार्गावर परत नेते.","kn":"2025 ರ ಜುಲೈ 8 ರಂದು ಮಾರಿಯನ್ ಒಪ್ಪಂದ ಪೂಜೆಯನ್ನು Fr. V.P. Joseph ಪ್ರಾರಂಭಿಸಿದರು, ಅವರು ಕಳೆದುಹೋದವರು, ಉದ್ಯೋಗಾರಹಿತರು, ತಮ್ಮ ಮಕ್ಕಳ ಭವಿಷ್ಯದ ಬಗ್ಗೆ ಆತಂಕಪಡುತ್ತಿರುವವರು ಮತ್ತು ದಿಕ್ಕು ತಪ್ಪಿರುವವರು ಯಾರು ಅವರಿಗಾಗಿ ಹೃದಯಪೂರ್ವಕ ಪ್ರಾರ್ಥನೆ ಸಲ್ಲಿಸಿದರು. ಅವರು ಪವಿತ್ರ ತಾಯಿಯ ಶಕ್ತಿಶಾಲಿ ಮಧ್ಯಸ್ಥತೆಯನ್ನು ಕೋರಿಕೊಂಡು, ಅನುಮಾನ, ಭಯ ಮತ್ತು ನಿರಾಶೆಯಿಂದ ಬಳಲುತ್ತಿರುವವರ ಜೀವನದಲ್ಲಿ ಅದ್ಭುತಗಳು ಮತ್ತು ಹೊಸ ಬೆಳಕು ಬರಲಿ ಎಂದು ಪ್ರಾರ್ಥಿಸಿದರು.\\n\\nನಂತರ ಅವರು ಇತರರ ಅಗತ್ಯಗಳಿಗೆ ಕಾತರತೆ ಹೊಂದಿರುವ ಮಹತ್ವವನ್ನು ಕುರಿತು ಮಾತನಾಡಿದರು, ಇಂತಹ ಸಹಾನುಭೂತಿ ದೇವರ ಕಣ್ಣಿನಲ್ಲಿ ಸಂತೋಷದ ಸ್ಫೂರ್ತಿಯನ್ನು ಹುಟ್ಟಿಸುತ್ತದೆ ಎಂದು ತಿಳಿಸಿದರು. ಯೋಹಾನ್ 13:35 ನ್ನು ಉಲ್ಲೇಖಿಸಿ, ಒಬ್ಬರು ಮತ್ತೊಬ್ಬರನ್ನು ಪ್ರೀತಿಸುವುದು ಸತ್ಯವಾದ ಶಿಷ್ಯತ್ವದ ಗುರುತು ಎಂದು ನಂಬಿಗಸ್ಥರಿಗೆ ನೆನಪಿಸಿದರು. Fr. Joseph ಅವರು ಹೊರಗಿನ ಧಾರ್ಮಿಕ ಸಂಪ್ರದಾಯಗಳು ಮಾತ್ರ ರಕ್ಷಣೆಗೆ ಸಾಕಾಗುವುದಿಲ್ಲ ಎಂದು ಒತ್ತಿಹೊಡಗಿಸಿದರು—ಮುಖ್ಯವಾದುದು ವೈಯಕ್ತಿಕ, ಸ್ವತಂತ್ರ ನಂಬಿಕೆಯ ಪಯಣ.\\n\\nFr. Jeromin ಎಂಬ ಸಾಫ್ಟ್‌ವೇರ್ ಡೆವಲಪರ್ ಕೆಲಸ ಕಳೆದುಕೊಂಡಿದ್ದ, ನಂತರ ಆತ್ಮೀಯತೆ ಕಳೆದುಕೊಂಡಿದ್ದ ಎಂಬುದನ್ನು ಅರಿತುಕೊಂಡ ದೃಶ್ಯಾಂತವನ್ನು ಹಂಚಿಕೊಂಡರು. ಮಾರಿಯನ್ ಒಪ್ಪಂದದ ಕೃಪೆಯಿಂದ, ಅವರ ಜೀವನ ಪುನರುತ್ಥಾನಗೊಂಡಿತು—ಅವರಿಗೆ ಹೊಸ ಕೆಲಸ ದೊರಕಿತು ಮತ್ತು ಅವರ ಮಗಳು ಅದ್ಭುತವಾಗಿ ಗುಣಮುಖಳಾಯಿತು. Fr. ಅವರು ಅಂತ್ಯದಲ್ಲಿ, ನಾವು ಭೌತಿಕ ಅಗತ್ಯಗಳಿಂದ ಶಾಶ್ವತ ಜೀವನದ ಕಡೆ ಗಮನ ಹರಿಸಿದಾಗ, ಒಪ್ಪಂದದ ಕೃಪೆ ನಮಗೆ ದೇವರ ಮಾರ್ಗವನ್ನು ತೋರಿಸುತ್ತದೆ ಎಂದು ನಿರ್ಧರಿಸಿದರು."},"subtitles":"/assets/dhyanam/d8jul.json"},{"id":2,"title":{"zh":"盟约敬拜 - 2025年7月15日","bn":"চুক্তির উপাসনা - ১৫/০৭/২০২৫","en":"Covenant Worship - 15/07/2025","hi":"वाचा आराधना - 15/07/2025","ta":"உடன்படிக்கை礼拜ம் - 15/07/2025","te":"ఒడంబడిక ఆరాధన - 15/07/2025","fr":"Adoration de l'Alliance - 15/07/2025","es":"Adoración del Pacto - 15/07/2025","mr":"करार उपासना - १५/०७/२०२५","kn":"ಒಡಂಬಡಿಕೆಯ ಆರಾಧನೆ - ೧೫/೦೭/೨೦೨೫"},"date":"July 15, 2025","video":"https://youtu.be/2IaF_zoMP70","content":{"en":"On 15 July 2025, during the Marian Covenant worship at Kreupasanam, Fr. V.P. Joseph offered heartfelt prayers for those suffering from severe illnesses and life struggles. He emphasized the importance of uniting personal hardships with the mission entrusted to Jesus by the Father — a mission fulfilled through complete surrender on the Cross. Fr. Joseph encouraged the faithful not merely to observe the Marian Covenant as a routine, but to embody it as a way of life that reflects trust, sacrifice, and purpose.\\n\\nHe shared the inspiring testimony of Tiji and her husband Justo from Canada. Rather than treating the covenant as a ritual, they lived it authentically through unwavering faith. Even when Justo was rejected by his company, Tiji confidently proclaimed that Jesus had the final word, placing divine authority above all worldly decisions. Their faith extended to their family — Justo’s younger brother and his wife, both deaf and mute, had been childless for years. Tiji and Justo kept a prayerful intention for them, and miraculously, they conceived a child — a powerful sign of God’s grace in response to covenantal faith.\\n\\nFr. Joseph concluded by urging the faithful to live the covenant with integrity, prioritizing the Kingdom of God above all. He reminded listeners that miracles follow genuine surrender and trust, not mere words or rituals. Citing verses like Romans 10:9, Matthew 5:47, and Luke 10:8, he illustrated how Scripture calls us to a life of faith in action, mercy in truth, and trust that God's promises will be fulfilled in His time.","zh":"2025年7月15日，在Kreupasanam的圣母盟约敬拜中，V.P.约瑟神父为那些身患重病和生活困苦的人献上了衷心的祈祷。他强调将个人的苦难与天父托付给耶稣的使命相结合的重要性——这一使命通过在十字架上的完全降服得以完成。约瑟神父鼓励信徒们不仅仅将圣母盟约视为一种例行公事，而应将其作为一种体现信任、牺牲和目标的生活方式。\\n\\n他分享了来自加拿大的Tiji和她丈夫Justo的鼓舞人心的见证。他们没有把盟约当作仪式，而是通过坚定不移的信仰真实地生活着。即使当Justo被他的公司拒绝时，Tiji也自信地宣称耶稣拥有最终的决定权，将神圣的权威置于所有世俗决定之上。他们的信仰延伸到他们的家庭——Justo的弟弟和他的妻子，两人都是聋哑人，多年来一直没有孩子。Tiji和Justo为他们虔诚祈祷，奇迹般地，他们怀上了孩子——这是神恩回应盟约信仰的强有力标志。\\n\\n约瑟神父总结时敦促信徒们诚信地活出盟约，将神的国度置于首位。他提醒听众，奇迹伴随着真正的降服和信任，而非仅仅是言语或仪式。他引用了《罗马书》10:9、《马太福音》5:47和《路加福音》10:8，说明圣经如何呼召我们过一种有行动的信仰生活、以真理施慈悲，并信靠神的应许必将在他的时刻实现。","bn":"১৫ জুলাই ২০২৫, Kreupasanam-এ ম্যারিয়ান চুক্তির উপাসনার সময়, Fr. V.P. Joseph হৃদয়স্পর্শী প্রার্থনা করেন যারা গুরুতর অসুস্থতা এবং জীবনের সংগ্রামে ভুগছেন তাদের জন্য। তিনি ব্যক্তিগত কষ্টকে পিতার দ্বারা যীশুর প্রতি অর্পিত মিশনের সঙ্গে যুক্ত করার গুরুত্ব জোর দেন — একটি মিশন যা ক্রুশে সম্পূর্ণ আত্মসমর্পণের মাধ্যমে পূর্ণ হয়। Fr. Joseph বিশ্বাসীদের উৎসাহিত করেন শুধুমাত্র ম্যারিয়ান চুক্তিকে রুটিন হিসেবে পালন না করে বরং এটিকে এমন একটি জীবনযাপন হিসেবে গ্রহণ করতে যা বিশ্বাস, ত্যাগ এবং উদ্দেশ্যকে প্রতিফলিত করে।\\n\\nতিনি কানাডার Tiji এবং তার স্বামী Justo-এর অনুপ্রেরণামূলক সাক্ষ্য শেয়ার করেন। চুক্তিকে একটি রীতিনীতি হিসেবে না দেখে, তারা অটুট বিশ্বাসের মাধ্যমে এটি প্রকৃতপক্ষে পালন করেছেন। এমনকি যখন Justo তার কোম্পানির দ্বারা প্রত্যাখ্যাত হন, Tiji আত্মবিশ্বাসের সঙ্গে ঘোষণা করেন যে যীশুরই শেষ কথা রয়েছে, সমস্ত পার্থিব সিদ্ধান্তের উপরে ঐশ্বরিক কর্তৃত্ব স্থাপন করেন। তাদের বিশ্বাস তাদের পরিবারেও ছড়িয়ে পড়ে — Justo-এর ছোট ভাই এবং তার স্ত্রী, যারা দুজনেই বধির এবং বাকশক্তিহীন, বহু বছর ধরে সন্তানের অভাবে ভুগছিলেন। Tiji এবং Justo তাদের জন্য প্রার্থনামূলক উদ্দেশ্য রাখেন এবং আশ্চর্যজনকভাবে তারা একটি সন্তান ধারণ করেন — যা চুক্তির বিশ্বাসের প্রতিফলনে ঈশ্বরের করুণার একটি শক্তিশালী নিদর্শন।\\n\\nFr. Joseph শেষ করেন বিশ্বাসীদের সততার সঙ্গে চুক্তি পালন করতে, ঈশ্বরের রাজ্যকে সর্বোচ্চ অগ্রাধিকার দিতে উৎসাহিত করে। তিনি শ্রোতাদের স্মরণ করিয়ে দেন যে মিরাকল আসতে সৎ আত্মসমর্পণ এবং বিশ্বাসের প্রয়োজন, শুধুমাত্র শব্দ বা রীতিনীতি নয়। রোমীয় ১০:৯, মথি ৫:৪৭, এবং লূক ১০:৮ এর মতো শ্লোক উল্লেখ করে তিনি ব্যাখ্যা করেন কিভাবে শাস্ত্র আমাদেরকে কর্মে বিশ্বাস, সত্যে দয়া এবং ঈশ্বরের প্রতিশ্রুতি বিশ্বাসের জীবন যাপনের আহ্বান জানায়।","hi":"15 जुलाई 2025 को, Kreupasanam में मैरियन कॉवेनेंट पूजा के दौरान, फ्र. V.P. जोसेफ ने उन लोगों के लिए दिल से प्रार्थना की जो गंभीर बीमारियों और जीवन की कठिनाइयों से जूझ रहे हैं। उन्होंने व्यक्तिगत कठिनाइयों को उस मिशन के साथ जोड़ने के महत्व पर जोर दिया जो पिता द्वारा यीशु को सौंपा गया है — एक मिशन जो क्रॉस पर पूर्ण समर्पण के माध्यम से पूरा होता है। फ्र. जोसेफ ने विश्वासियों को केवल मैरियन कॉवेनेंट को एक रूटीन के रूप में नहीं बल्कि एक जीवन शैली के रूप में अपनाने के लिए प्रोत्साहित किया जो विश्वास, बलिदान और उद्देश्य को दर्शाता है।\\n\\nउन्होंने कनाडा के Tiji और उनके पति Justo की प्रेरणादायक गवाही साझा की। उन्होंने इसे केवल एक अनुष्ठान के रूप में नहीं माना, बल्कि अडिग विश्वास के माध्यम से इसे सच्चाई से जिया। जब Justo को उनकी कंपनी ने अस्वीकार कर दिया, तब भी Tiji ने आत्मविश्वास से कहा कि यीशु के पास अंतिम शब्द है, जो सभी सांसारिक निर्णयों से ऊपर दैवीय अधिकार रखता है। उनका विश्वास उनके परिवार तक भी फैला — Justo के छोटे भाई और उनकी पत्नी, जो दोनों बहरे और मूक हैं, वर्षों से निःसंतान थे। Tiji और Justo उनके लिए प्रार्थनात्मक इच्छा रखते थे, और चमत्कारिक रूप से, वे गर्भवती हो गईं — यह कॉवेनेंटल विश्वास के प्रति परमेश्वर की कृपा का एक शक्तिशाली संकेत है।\\n\\nफ्र. जोसेफ ने निष्कर्ष निकाला कि विश्वासियों को ईमानदारी से कॉवेनेंट का पालन करना चाहिए, परमेश्वर के राज्य को सर्वोपरि रखना चाहिए। उन्होंने श्रोताओं को याद दिलाया कि चमत्कार सच्चे समर्पण और विश्वास के बाद आते हैं, केवल शब्दों या अनुष्ठानों के नहीं। रोमियों 10:9, मत्ती 5:47, और लूका 10:8 जैसे श्लोकों का उल्लेख करते हुए उन्होंने दिखाया कि कैसे शास्त्र हमें कर्म में विश्वास, सत्य में दया, और परमेश्वर के वादों पर भरोसा करने के लिए बुलाता है।","ta":"2025 ஜூலை 15 ஆம் தேதி, கிருபாசனத்தில் நடைபெற்ற மரியன் உடன்படிக்கை வழிபாட்டில், ஆர். வி.பி. ஜோசப் கடுமையான நோய்கள் மற்றும் வாழ்க்கை சிக்கல்களில் சிக்கியவர்களுக்கு உணர்வுப்பூர்வமான பிரார்த்தனைகளை அர்ப்பணித்தார். அவர், தனிப்பட்ட சிரமங்களை, பிதாவால் இயேசுவுக்கு நம்பிக்கை வைக்கப்பட்ட பணி உடன் இணைப்பது முக்கியம் என்று வலியுறுத்தினார் — அந்த பணி, குருத்தின் முழுமையான அடிமைப்படுத்தலின் மூலம் நிறைவேற்றப்பட்டது. ஜோசப் ஆசான், மரியன் உடன்படிக்கையை ஒரு சீரான பழக்கமாக அல்லாமல், நம்பிக்கை, தியாகம் மற்றும் நோக்கத்தை பிரதிபலிக்கும் வாழ்வுத் தத்துவமாக வாழ வேண்டும் என்று அன்பர்களை ஊக்குவித்தார்.\\n\\nகனடாவில் இருந்து வந்த Tiji மற்றும் அவரது கணவர் Justo ஆகியோரின் ஊக்கமளிக்கும் சாட்சி பகிர்ந்துகொண்டார். உடன்படிக்கையை ஒரு ஊர்வலம் போல அணுகாமல், அவர்கள் உறுதியான நம்பிக்கையால் அதை உண்மையுடன் வாழ்ந்தனர். Justo தனது நிறுவனத்தால் நிராகரிக்கப்பட்ட போதும், Tiji நம்பிக்கையுடன், இயேசுவுக்கு இறுதி வார்த்தை உண்டு என்று அறிவித்தார், அனைத்து உலகியலான தீர்மானங்களுக்கும் மேலாக தெய்வீக அதிகாரத்தை வைக்கிறார். அவர்களின் நம்பிக்கை குடும்பத்திற்கும் பரவியது — Justo-வின் இளைய சகோதரர் மற்றும் அவரது மனைவி இருவரும் முதுகால் மூடப்பட்டவர்களும், பல ஆண்டுகளாக குழந்தை பெற்றவர்களல்ல. Tiji மற்றும் Justo அவர்களுக்காக பிரார்த்தனையுடன் இருந்தனர், அதிசயமாக அவர்கள் குழந்தை பெற்றனர் — உடன்படிக்கை நம்பிக்கைக்கு எதிர்வினையாக கடவுளின் அருளின் வலுவான அடையாளம்.\\n\\nஜோசப் ஆசான் இறுதியில், உண்மைத்தன்மையுடன் உடன்படிக்கையை வாழ்ந்து, கடவுளின் ராஜ்யத்தை முதன்மையாக வைக்க நம்புவர்களை வலியுறுத்தினார். அதுவே, அதிசயங்கள் உண்மையான அடிமைப்படுத்தலும் நம்பிக்கையும் பின்பற்றுவதாகவும், வெறும் வார்த்தைகள் அல்லது ஊர்வலங்கள் அல்ல என அவருக்கு நினைவூட்டினார். ரோமர் 10:9, மத்தேயு 5:47 மற்றும் லூக்கா 10:8 போன்ற வசனங்களை மேற்கோள் காட்டி, வேதாகமம் எப்படிப் பணி நம்பிக்கை, உண்மையில் கருணை மற்றும் கடவுளின் வாக்குறுதிகள் அவருடைய நேரத்தில் நிறைவேறுவதை நம்புவதை வாழ்வாக அழைக்கிறது என்பதை எடுத்துரைத்தார்.","te":"2025 జూలై 15న, క్రెఉపాసనంలో జరిగిన మారియన్ ఒడంబడిక ఆరాధన సమయంలో, ఫాదర్ వి.పి. జోసెఫ్ తీవ్రమైన అనారోగ్యాలు మరియు జీవనసమస్యలతో బాధపడుతున్న వార కోసం హృదయపూర్వకమైన ప్రార్థనలు చేయగా, తండ్రి ద్వారా యేసుకి అప్పగించబడిన మిషన్‌తో వ్యక్తిగత కష్టాలను ఏకీకృతం చేయడం ముఖ్యం అని పునరావృతం చేశారు — ఈ మిషన్ క్రూసుపై పూర్తి సమర్పణ ద్వారా పూర్తి అవుతుంది. ఫాదర్ జోసెఫ్ విశ్వాసులను మారియన్ ఒడంబడికను ఒక పద్దతిగా కాకుండా విశ్వాసం, త్యాగం మరియు ఉద్దేశ్యాన్ని ప్రతిబింబించే జీవనశైలిగా ఆచరించమని ప్రేరేపించారు.\\n\\nకెనడా నుండి వచ్చిన టిజి మరియు ఆమె భర్త జస్టో యొక్క ప్రేరణాత్మక సాక్ష్యాన్ని పంచుకున్నారు. ఒడంబడికను ఒక ఆచారంగా కాకుండా వారు అబద్ధరహితమైన విశ్వాసంతో నిజమైన జీవితం గడిపారు. జస్టో తన కంపెనీ చేత నిరాకరించబడినప్పటికీ, టిజి ధైర్యంగా యేసుకి చివరి మాట ఉందని ప్రకటించింది, అన్ని భౌతిక నిర్ణయాలపై దివ్య అధికారాన్ని పెడుతుంది. వారి విశ్వాసం వారి కుటుంబానికి వ్యాప్తిచేసింది — జస్టో యొక్క తమ్ముడు మరియు అతని భార్య, ఇద్దరు గుణపాఠులు మరియు మౌనంగా ఉండేవారు, సంవత్సరాలుగా పిల్లలేకపోయారు. టిజి మరియు జస్టో వారికి ప్రార్థనాత్మకమైన ఉద్దేశ్యాన్ని ఉంచారు, ఆశ్చర్యకరంగా వారు ఒక పిల్లవాడు conception చేసుకున్నారు — ఒడంబడిక విశ్వాసానికి దేవుని కృప యొక్క శక్తివంతమైన సంకేతం.\\n\\nఫాదర్ జోసెఫ్ విశ్వాసులను ఒడంబడికను సద్భావంతో జీవించాలని, దేవుని రాజ్యాన్ని అత్యంత ప్రాధాన్యతగా పెట్టాలని సారాంశం చేశారు. అంగీకారం, నిజమైన సమర్పణ మరియు విశ్వాసం తర్వాత అద్భుతాలు వస్తాయని, కేవలం మాటలు లేదా ఆచారాలు కాదు అని విన్నవాదులకు గుర్తుచేశారు. రోమానియన్లు 10:9, మత్తయి 5:47, లూకా 10:8 వచనాలను ఉదాహరించి, వేదగ్రంథం మనల్ని కార్యంలో విశ్వాసంతో, సత్యంలో దయతో జీవించమని మరియు దేవుని వాగ్దానాలు తన సమయములో నెరవేరతాయని విశ్వసించమని పిలుస్తుందన్న విషయం వివరించారు.","fr":"Le 15 juillet 2025, lors du culte de l'Alliance mariale à Kreupasanam, le Père V.P. Joseph a offert des prières sincères pour ceux qui souffrent de maladies graves et de difficultés dans la vie. Il a souligné l'importance d'unir les difficultés personnelles à la mission confiée à Jésus par le Père — une mission accomplie par un abandon total sur la Croix. Le Père Joseph a encouragé les fidèles à ne pas simplement observer l'Alliance mariale comme une routine, mais à l'incarner comme un mode de vie reflétant la confiance, le sacrifice et le but.\\n\\nIl a partagé le témoignage inspirant de Tiji et de son mari Justo, venus du Canada. Plutôt que de traiter l'alliance comme un rituel, ils l'ont vécue authentiquement à travers une foi inébranlable. Même lorsque Justo a été rejeté par son entreprise, Tiji a proclamé avec confiance que Jésus avait le dernier mot, plaçant l'autorité divine au-dessus de toutes les décisions mondaines. Leur foi s'est étendue à leur famille — le frère cadet de Justo et sa femme, tous deux sourds et muets, étaient sans enfant depuis des années. Tiji et Justo ont gardé une intention de prière pour eux, et miraculeusement, ils ont conçu un enfant — un signe puissant de la grâce de Dieu en réponse à la foi de l'alliance.\\n\\nLe Père Joseph a conclu en exhortant les fidèles à vivre l'alliance avec intégrité, en donnant la priorité au Royaume de Dieu par-dessus tout. Il a rappelé aux auditeurs que les miracles suivent une véritable reddition et confiance, et non de simples paroles ou rituels. En citant des versets tels que Romains 10:9, Matthieu 5:47 et Luc 10:8, il a illustré comment l'Écriture nous appelle à une vie de foi en action, de miséricorde en vérité, et de confiance que les promesses de Dieu s'accompliront en son temps.","es":"El 15 de julio de 2025, durante el culto del Pacto Mariano en Kreupasanam, el padre V.P. Joseph ofreció oraciones sentidas por aquellos que sufren enfermedades graves y dificultades en la vida. Él enfatizó la importancia de unir las dificultades personales con la misión confiada a Jesús por el Padre, una misión cumplida a través de la entrega total en la Cruz. El padre Joseph animó a los fieles a no simplemente observar el Pacto Mariano como una rutina, sino a encarnarlo como una forma de vida que refleje confianza, sacrificio y propósito.\\n\\nCompartió el inspirador testimonio de Tiji y su esposo Justo, de Canadá. En lugar de tratar el pacto como un ritual, lo vivieron auténticamente con una fe inquebrantable. Incluso cuando Justo fue rechazado por su empresa, Tiji proclamó con confianza que Jesús tenía la última palabra, colocando la autoridad divina por encima de todas las decisiones mundanas. Su fe se extendió a su familia: el hermano menor de Justo y su esposa, ambos sordos y mudos, habían estado sin hijos durante años. Tiji y Justo mantuvieron una intención de oración por ellos y, milagrosamente, concibieron un hijo, una poderosa señal de la gracia de Dios en respuesta a la fe del pacto.\\n\\nEl padre Joseph concluyó instando a los fieles a vivir el pacto con integridad, priorizando el Reino de Dios sobre todo. Recordó a los oyentes que los milagros siguen a la entrega y confianza genuinas, no a meras palabras o rituales. Citando versículos como Romanos 10:9, Mateo 5:47 y Lucas 10:8, ilustró cómo las Escrituras nos llaman a una vida de fe en acción, misericordia en verdad y confianza en que las promesas de Dios se cumplirán en Su tiempo.","mr":"१५ जुलै २०२५ रोजी, क्रूपासनम येथे मॅरियन करार पूजा दरम्यान, फादर व्ही.पी. जोसेफ यांनी गंभीर आजारांनी आणि जीवनातील संघर्षांनी त्रस्त असणाऱ्यांसाठी मनापासून प्रार्थना केली. त्यांनी वैयक्तिक अडचणींना पित्याने येशूला दिलेल्या कार्याशी एकत्र करण्याचे महत्त्व अधोरेखित केले — हे कार्य क्रूसावर पूर्ण समर्पणाद्वारे पूर्ण होते. फादर जोसेफ यांनी विश्वासींना फक्त मॅरियन कराराला एक नियमित कार्यक्रम म्हणून पाहू नये, तर त्याला विश्वास, बलिदान आणि उद्दिष्ट प्रतिबिंबित करणाऱ्या जीवनशैलीप्रमाणे जपावे असे प्रोत्साहन दिले.\\n\\nत्यांनी कॅनडातील टिजी आणि तिच्या नवऱ्याचे, जस्टो यांचे प्रेरणादायी साक्षात्कार सांगितले. कराराला एक विधी म्हणून न पाहता, त्यांनी तो प्रामाणिकपणे दृढ विश्वासाने जगला. जस्टोला त्याच्या कंपनीने नाकारले तरी, टिजी आत्मविश्वासाने जाहीर केले की येशूच अंतिम निर्णय घेणारा आहे, जो सर्व सांसारिक निर्णयांपेक्षा उच्च अधिकारी आहे. त्यांचा विश्वास त्यांच्या कुटुंबापर्यंत पसरला — जस्टोचा लहान भाऊ आणि त्याची पत्नी, जे दोघेही बधिर आणि म्हणू शकत नव्हते, ते वर्षांपासून निरारोप होते. टिजी आणि जस्टो यांनी त्यांच्यासाठी प्रार्थनात्मक इच्छा ठेवल्या आणि चमत्काराने त्यांनी एक मूल जन्माला आणले — करारातील विश्वासाला देवाच्या कृपेचा एक शक्तिशाली चिन्ह.\\n\\nफादर जोसेफ यांनी निष्कर्ष काढला की विश्वासींनी प्रामाणिकपणे करार जपावा आणि देवाच्या राज्याला सर्वोच्च प्राधान्य द्यावे. त्यांनी श्रोत्यांना स्मरण करून दिले की चमत्कार खरे समर्पण आणि विश्वासानंतर येतात, फक्त शब्द किंवा विधींनंतर नाहीत. रोमकरांस १०:९, मत्ती ५:४७, आणि लूक १०:८ या श्लोकांचा उल्लेख करताना त्यांनी दाखवले की शास्त्र आपल्याला कर्मामध्ये विश्वास, सत्यामध्ये दया, आणि देवाच्या वचनांवर विश्वास ठेवण्याचे जीवन जगण्यास आवाहन करते.","kn":"2025ರ ಜುಲೈ 15 ರಂದು, ಕ್ರೂಪಸನಂನಲ್ಲಿ ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆ ಆರಾಧನೆಯ ವೇಳೆ, ಫಾದರ್ ವಿ.ಪಿ. ಜೋಸೆಫ್ ಗಂಭೀರ ರೋಗಗಳಿಂದ ಮತ್ತು ಜೀವನದ ಸಂಕಷ್ಟಗಳಿಂದ ಬಳಲುತ್ತಿರುವವರಿಗಾಗಿ ಹೃದಯಪೂರ್ವಕ ಪ್ರಾರ್ಥನೆ ಸಲ್ಲಿಸಿದರು. ತಂದೆಯಿಂದ ಯೇಸುವಿಗೆ ನೀಡಲಾದ ಕಾರ್ಯವನ್ನು ವೈಯಕ್ತಿಕ ಕಷ್ಟಗಳೊಂದಿಗೆ ಏಕತಗೊಳಿಸುವ ಮಹತ್ವವನ್ನು ಅವರು ಒತ್ತಿಹೇಳಿದರು — ಇದು ಕ್ರೂರ ಕ್ರಾಸ್ ಮೇಲೆ ಸಂಪೂರ್ಣ ಸಮರ್ಪಣೆಯಿಂದ ಪೂರೈಸಲ್ಪಟ್ಟ ಕಾರ್ಯ. ಫಾದರ್ ಜೋಸೆಫ್ ಶ್ರದ್ಧಾಳುಗಳನ್ನು ಮಾರಿಯನ್ ಒಡಂಬಡಿಕೆಯನ್ನು ಕೇವಲ ನಿತ್ಯಕ್ರಮವಾಗಿ ಪಾಲಿಸುವುದಲ್ಲದೆ, ನಂಬಿಕೆ, ತ್ಯಾಗ ಮತ್ತು ಉದ್ದೇಶವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಜೀವನಶೈಲಿಯಾಗಿ ಅದನ್ನು ಅನುಭವಿಸುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸಿದರು.\\n\\nಅವರು ಕೆನಡಾದಿಂದ ಬಂದ ಟಿಜಿ ಮತ್ತು ಅವರ ಗಂಡ ಜಸ್ಟ್ ಅವರ ಪ್ರೇರಣಾದಾಯಕ ಸಾಕ್ಷ್ಯವನ್ನು ಹಂಚಿಕೊಂಡರು. ಒಡಂಬಡಿಕೆಯನ್ನು ಕೇವಲ ವಿಧಿಯಾಗಿ ಪರಿಗಣಿಸುವ ಬದಲು, ಅವರು ದೃಢ ನಂಬಿಕೆಯಿಂದ ಅದನ್ನು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಬಾಳಿದರು. ಜಸ್ಟ್ ಅವರ ಕಂಪನಿಯಿಂದ ನಿರಾಕರಿಸಲ್ಪಟ್ಟಾಗಲೂ, ಟಿಜಿ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಯೇಸುವಿಗೆ ಅಂತಿಮ ಮಾತು ಇದೆ ಎಂದು ಘೋಷಿಸಿದರು, ಎಲ್ಲಾ ಲೋಕಿಕ ನಿರ್ಣಯಗಳ ಮೇಲೆಯೂ ದೈವಿಕ ಅಧಿಕಾರವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಅವರ ನಂಬಿಕೆ ಅವರ ಕುಟುಂಬಕ್ಕೆ ಹರಡಿತು — ಜಸ್ಟ್ ಅವರ ಸಣ್ಣ ಸಹೋದರ ಮತ್ತು ಅವನ ಪತ್ನಿ, ಇಬ್ಬರೂ ಮೊರಗೆಯುಳ್ಳವರಾಗಿದ್ದು, ಹಲವು ವರ್ಷಗಳಿಂದ ಮಕ್ಕಳು ಇಲ್ಲದವರಾಗಿದ್ದರು. ಟಿಜಿ ಮತ್ತು ಜಸ್ಟ್ ಅವರಿಗಾಗಿ ಪ್ರಾರ್ಥನೆಯ ಉದ್ದೇಶವನ್ನು ಇಟ್ಟುಕೊಂಡಿದ್ದರು, ಮತ್ತು ಅದ್ಭುತವಾಗಿ, ಅವರು ಮಗುವನ್ನು conceiveಮಾಡಿದರು — ಒಡಂಬಡಿಕೆ ನಂಬಿಕೆಗೆ ದೇವರ ಕೃಪೆಯ ಶಕ್ತಿಶಾಲಿ ಸಂಕೇತ.\\n\\nಫಾದರ್ ಜೋಸೆಫ್ ಅವರು ಶ್ರದ್ಧಾಳುಗಳನ್ನು ಸತ್ಯನಿಷ್ಠೆಯಿಂದ ಒಡಂಬಡಿಕೆಯನ್ನು ಅನುಸರಿಸುವಂತೆ ಪ್ರೋತ್ಸಾಹಿಸಿ, ದೇವರ ರಾಜ್ಯವನ್ನು ಎಲ್ಲಕ್ಕಿಂತ ಮೇಲುಗೈ ನೀಡುವಂತೆ ಕರೆದರು. ಅವರು ಶ್ರೋತೃಗಳಿಗೆ ಸ್ಮರಿಸಿದರು, ಅದ್ಭುತಗಳು ನಿಜವಾದ ಸಮರ್ಪಣೆ ಮತ್ತು ನಂಬಿಕೆಯ ನಂತರ ಬರುತ್ತವೆ, ಕೇವಲ ಮಾತುಗಳು ಅಥವಾ ವಿಧಿಗಳ ನಂತರವಲ್ಲ. ರೋಮಾಪುತ್ರರು 10:9, ಮತ್ 5:47 ಮತ್ತು ಲೂಕ 10:8 ಮುಂತಾದ ನೊಂದಣಿಗಳನ್ನು ಉಲ್ಲೇಖಿಸಿ, ಬೃಹತ್ ಗ್ರಂಥವು ನಮ್ಮನ್ನು ನಂಬಿಕೆಯಿಂದ ಕ್ರಿಯೆಯಲ್ಲಿ, ಸತ್ಯದಲ್ಲಿ ಕರುಣೆಯಿಂದ ಬದುಕಲು ಮತ್ತು ದೇವರ ವಾಗ್ದಾನಗಳು ಅವನ ಕಾಲದಲ್ಲಿ ನೆರವೇರಲಿದೆ ಎಂದು ನಂಬಲು ಕರೆದಿದೆ ಎಂದು ವಿವರಿಸಿದರು."},"subtitles":"/assets/dhyanam/d15jul.json"}]`);
function Dhyanam({ lang: initialLang }) {
  const [lang, setLang] = useState(initialLang || "en");
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const languageMap2 = {
    en: "English",
    hi: "हिन्दी",
    zh: "中文",
    bn: "বাংলা",
    ta: "தமிழ்",
    te: "తెలుగు",
    fr: "Français",
    es: "Español",
    mr: "मराठी",
    kn: "ಕನ್ನಡ"
  };
  const getYouTubeThumbnail2 = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
      return null;
    } catch {
      return null;
    }
  };
  const thumbnails = dhyanam.map(({ video }) => getYouTubeThumbnail2(video)).filter(Boolean);
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  useEffect(() => {
    if (thumbnails.length > 0 && imagesLoaded === thumbnails.length) {
      setAllImagesLoaded(true);
    }
    if (thumbnails.length === 0) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded, thumbnails.length]);
  return /* @__PURE__ */ jsx(
    "section",
    {
      className: styles$5.testimoniesSection,
      style: { marginTop: 0, backgroundColor: window.innerWidth <= 768 ? "#fff" : "transparent" },
      children: /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesSectionContainer, style: { margin: "0 1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$5.testimoniesHeader, children: [
          /* @__PURE__ */ jsxs("div", { style: { position: "relative", textAlign: "center" }, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: styles$3.backButton,
                onClick: () => window.history.back(),
                style: {
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: window.innerWidth <= 768 ? "none" : "block"
                },
                children: [
                  "← ",
                  /* @__PURE__ */ jsx("span", { children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: styles$5.testimoniesTitle, style: { margin: 0 }, children: "Dhyanam" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles$5.testimoniesSubtitle, children: "Stories of healing, grace..." }),
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem"
              },
              children: /* @__PURE__ */ jsxs(Dropdown, { onSelect: (e) => setLang(e), children: [
                /* @__PURE__ */ jsx(Dropdown.Toggle, { variant: "outline-secondary", id: "dropdown-lang", children: languageMap2[lang] || lang }),
                /* @__PURE__ */ jsx(Dropdown.Menu, { children: Object.entries(languageMap2).map(([key, label]) => /* @__PURE__ */ jsx(Dropdown.Item, { eventKey: key, children: label }, key)) })
              ] })
            }
          )
        ] }),
        !allImagesLoaded && /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#246bfd",
              fontSize: "1.2rem"
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: 40,
                    height: 40,
                    border: "4px solid #d3e3ff",
                    borderTop: "4px solid #246bfd",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginBottom: 16
                  }
                }
              ),
              "Loading Dhyanam...",
              /* @__PURE__ */ jsx("style", { children: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            ` })
            ]
          }
        ),
        allImagesLoaded && /* @__PURE__ */ jsx("div", { className: styles$5.testimoniesGrid, children: dhyanam.length > 0 ? dhyanam.map(({ id, title, video, date }) => {
          const thumbnail = getYouTubeThumbnail2(video);
          return /* @__PURE__ */ jsx(
            TestimonyCard,
            {
              id,
              title,
              image: thumbnail || "",
              date,
              lang,
              path: `${lang}/dhyanam`
            },
            id
          );
        }) : /* @__PURE__ */ jsxs(
          "div",
          {
            className: styles$5.testimoniesCard,
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 1rem",
              border: "2px dashed #a2c4ff",
              borderRadius: 20,
              backgroundColor: "rgba(240, 245, 255, 0.5)",
              maxWidth: 600,
              margin: "3rem auto",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(36, 107, 253, 0.08)",
              backdropFilter: "blur(8px)"
            },
            children: [
              /* @__PURE__ */ jsx(HiOutlineEmojiSad, { size: 50, color: "#246bfd", style: { marginBottom: 16 } }),
              /* @__PURE__ */ jsx("h3", { style: { color: "#246bfd", fontWeight: 600, fontSize: "1.4rem" }, children: "No dhyanam Available" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: thumbnails.map((src, idx) => /* @__PURE__ */ jsx("img", { src, alt: "", onLoad: handleImageLoad }, idx)) })
      ] })
    }
  );
}
function DhyanamPage({ lang: initialLang }) {
  const { id } = useParams();
  const dhyanamItem = dhyanam.find((item) => item.id === parseInt(id));
  const [lang, setLang] = useState(initialLang || "en");
  const [showVideo, setShowVideo] = useState(false);
  const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);
  const [shareText, setShareText] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLangHelp, setShowLangHelp] = useState(false);
  const [includeSummary, setIncludeSummary] = useState(false);
  if (!dhyanamItem) {
    return /* @__PURE__ */ jsx("div", { className: styles$3.notFoundPage, children: /* @__PURE__ */ jsxs("div", { className: styles$3.notFoundContainer, children: [
      /* @__PURE__ */ jsx("span", { className: styles$3.notFoundCode, children: "404" }),
      /* @__PURE__ */ jsx("h1", { className: styles$3.notFoundTitle, children: "Dhyanam Not Found" }),
      /* @__PURE__ */ jsx("p", { className: styles$3.notFoundText, children: "The episode you’re looking for doesn’t exist or may have been removed." }),
      /* @__PURE__ */ jsx(Link, { to: `/${lang || "en"}/dhyanam`, className: styles$3.notFoundButton, children: "Browse More" })
    ] }) });
  }
  const { title, date, content, video, subtitles: subtitlesUrl } = dhyanamItem;
  const cssBackgroundImages = [
    "/assets/angel3.webp",
    "/assets/angel3.webp",
    "/assets/cloud.webp"
  ];
  const videoId = getYouTubeVideoID(video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  useEffect(() => {
    const allImages = [...cssBackgroundImages];
    if (thumbnailUrl) allImages.push(thumbnailUrl);
    preloadImages(allImages, () => setAllAssetsLoaded(true));
  }, [thumbnailUrl]);
  useEffect(() => {
    if (lang === "other") {
      setShowLangHelp(true);
    } else {
      setShowLangHelp(false);
    }
  }, [lang]);
  useEffect(() => {
    setShareText(generateShareText(dhyanamItem, lang, window.location.href, "Dhyanam meditation", includeSummary, video));
  }, [lang, dhyanamItem, includeSummary]);
  const { currentTime, playerRef } = useYouTubePlayer(videoId, showVideo);
  const {
    subtitles,
    // With end times
    currentSubtitle
    // Filtered for time/lang
  } = useSubtitles(subtitlesUrl, lang, currentTime);
  const {
    isSpeaking,
    toggleSpeaking,
    volume,
    handleVolumeChange
  } = useSpeechSync({ playerRef, showVideo, subtitles, currentSubtitle, currentTime, lang });
  useEffect(() => {
    if (!showVideo && isSpeaking) {
      window.speechSynthesis.cancel();
    }
  }, [showVideo, isSpeaking]);
  const shareUrl = window.location.href;
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title[lang] || title["en"])}&body=${encodeURIComponent(shareText)}`;
  if (!allAssetsLoaded) {
    return /* @__PURE__ */ jsxs("div", { className: styles$3.loadingOverlay, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.spinner }),
      /* @__PURE__ */ jsx("p", { children: "Loading visuals..." })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyPage, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyHeader, children: [
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyLeft, children: /* @__PURE__ */ jsxs("button", { className: styles$3.backButton, onClick: () => window.history.back(), children: [
        "← ",
        /* @__PURE__ */ jsx("span", { className: styles$3.backText, children: "Back" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyCenter, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineLeft }),
        /* @__PURE__ */ jsx("h2", { className: styles$3.testimonyHeading, children: "Dhyanam" }),
        /* @__PURE__ */ jsx("div", { className: styles$3.animatedLineRight })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$3.testimonyRight, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center" }, children: /* @__PURE__ */ jsx(LanguageDropdown, { lang, onSelect: setLang }) }) })
    ] }),
    showLangHelp && /* @__PURE__ */ jsx(LangHelpOverlay, { onClose: () => {
      setLang("en");
      setShowLangHelp(false);
    } }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.left}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingImage} ${styles$3.right}` }),
    /* @__PURE__ */ jsx("div", { className: `${styles$3.floatingCloud} ${styles$3.bottom}` }),
    /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContainer, children: /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyInner, children: [
      videoId && !showVideo ? /* @__PURE__ */ jsxs(
        "div",
        {
          className: styles$3.thumbnailWrapper,
          onClick: () => setShowVideo(true),
          style: { cursor: "pointer" },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: thumbnailUrl,
                alt: "Video Thumbnail",
                className: styles$3.thumbnailImage
              }
            ),
            /* @__PURE__ */ jsx("div", { className: styles$3.smallPlayIcon, children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "#ff0000",
                width: "60%",
                height: "60%",
                children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" })
              }
            ) })
          ]
        }
      ) : /* @__PURE__ */ jsx("div", { className: styles$3.thumbnailWrapper, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: thumbnailUrl,
          alt: "Video Thumbnail",
          className: styles$3.thumbnailImage
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.testimonyText, children: [
        /* @__PURE__ */ jsx("h1", { className: styles$3.testimonyTitle, children: title[lang] || title["en"] }),
        /* @__PURE__ */ jsx("p", { className: styles$3.testimonyDate, children: date }),
        /* @__PURE__ */ jsx("div", { className: styles$3.testimonyContent, children: content[lang] || content["en"] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.shareSection, children: [
        /* @__PURE__ */ jsx("p", { style: { fontWeight: "600" }, children: "Share this meditation:" }),
        /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: "2rem" }, children: /* @__PURE__ */ jsx("button", { className: styles$3.shareMainButton, onClick: () => setShowShareModal(true), children: "🔗 Share" }) }),
        /* @__PURE__ */ jsx(
          ShareModal,
          {
            show: showShareModal,
            onHide: () => setShowShareModal(false),
            title: "Dhyanam",
            shareText,
            setShareText,
            fbShareUrl,
            waShareUrl,
            telegramShareUrl,
            emailShareUrl,
            styles: styles$3,
            includeSummary,
            setIncludeSummary
          }
        )
      ] })
    ] }) }),
    showVideo && /* @__PURE__ */ jsx(
      FloatingVideoPlayer,
      {
        isSpeaking,
        volume,
        toggleSpeaking,
        handleVolumeChange,
        playerRef,
        currentSubtitle,
        onClose: () => setShowVideo(false)
      }
    )
  ] });
}
const LANGUAGES = {
  en: "English",
  hi: "हिन्दी",
  zh: "中文",
  bn: "বাংলা",
  ta: "தமிழ்",
  te: "తెలుగు",
  fr: "Français",
  es: "Español",
  mr: "मराठी",
  kn: "ಕನ್ನಡ"
};
function LangSelectorPage({ setLang }) {
  const navigate = useNavigate();
  const handleSelect = (code) => {
    setLang(code);
    navigate(`/${code}/home`);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #e0eafc, #cfdef3)",
        padding: "1rem",
        fontFamily: `'Poppins', sans-serif`
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "2rem",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "#333"
                },
                children: "🌐 Choose Your Language"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "1rem"
                },
                children: Object.entries(LANGUAGES).map(([code, label]) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleSelect(code),
                    style: {
                      padding: "0.75rem 1rem",
                      fontSize: "1rem",
                      borderRadius: "12px",
                      border: "none",
                      backgroundColor: "#f0f4f8",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)"
                    },
                    onMouseOver: (e) => e.currentTarget.style.backgroundColor = "#dbeafe",
                    onMouseOut: (e) => e.currentTarget.style.backgroundColor = "#f0f4f8",
                    onFocus: (e) => e.currentTarget.style.outline = "2px solid #60a5fa",
                    onBlur: (e) => e.currentTarget.style.outline = "none",
                    children: label
                  },
                  code
                ))
              }
            )
          ]
        }
      )
    }
  );
}
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
  kn: `ಕೆಲವು ಅನುವಾದಗಳು ಅಥವಾ ವ್ಯಕ್ತಿಗಳು, ಸ್ಥಳಗಳು ಅಥವಾ ಸಾಂಸ್ಕೃತಿಕವಾಗಿ ಮಹತ್ವಪೂರ್ಣ ಪದಗಳ ಹೆಸರುಗಳು ಸಂಪೂರ್ಣವಾಗಿ ನಿಖರವಾಗಿರದೇ ಇರಬಹುದು. ಯಾವುದೇ ಗೊಂದಲ ಅಥವಾ ಅಸೌಕರ್ಯಕ್ಕೆ ನಾವು ಕ್ಷಮೆಯಾಚಿಸುತ್ತೇವೆ।`
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
  kn: "ಅನುವಾದ ಸೂಚನೆ"
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
  kn: "ಸರಿ"
};
function TranslationDisclaimer({ lang = "en" }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenTranslationDisclaimer");
    if (!hasSeen) {
      setShow(true);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    }
    return () => {
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
  const message = TRANSLATION_MESSAGES[lang] || TRANSLATION_MESSAGES.en;
  const title = TRANSLATION_TITLES[lang] || TRANSLATION_TITLES.en;
  const buttonLabel = BUTTON_TEXT[lang] || BUTTON_TEXT.en;
  return /* @__PURE__ */ jsx("div", { style: styles$2.overlay, children: /* @__PURE__ */ jsxs("div", { style: styles$2.modal, children: [
    /* @__PURE__ */ jsx("h2", { style: styles$2.title, children: title }),
    /* @__PURE__ */ jsx("p", { style: styles$2.message, children: message }),
    /* @__PURE__ */ jsx("button", { onClick: handleClose, style: styles$2.button, children: buttonLabel })
  ] }) });
}
const styles$2 = {
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
    padding: "1rem"
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "90vw",
    width: "100%",
    maxHeight: "85vh",
    overflowY: "auto",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
    animation: "fadeInScale 0.4s ease-out"
  },
  title: {
    fontSize: "clamp(1.2rem, 2vw, 1.75rem)",
    marginBottom: "1rem",
    color: "#333"
  },
  message: {
    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
    lineHeight: 1.6,
    color: "#555",
    textAlign: "justify"
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
    transition: "background-color 0.3s"
  }
};
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { style: styles$1.container, children: [
    /* @__PURE__ */ jsx("h1", { style: styles$1.title, children: "404" }),
    /* @__PURE__ */ jsx("p", { style: styles$1.subtitle, children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("p", { style: styles$1.message, children: "The page you’re looking for doesn’t exist or has been moved." }),
    /* @__PURE__ */ jsx(Link, { to: "/", style: styles$1.button, children: "Go to Home" })
  ] });
}
const styles$1 = {
  container: {
    height: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: "#1a1a1a",
    textAlign: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: "7rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    letterSpacing: "-3px"
  },
  subtitle: {
    fontSize: "2rem",
    marginBottom: "1rem"
  },
  message: {
    fontSize: "1rem",
    maxWidth: "400px",
    marginBottom: "2rem",
    color: "#555"
  },
  button: {
    textDecoration: "none",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "8px",
    transition: "background-color 0.3s ease"
  }
};
const wrapper = "_wrapper_1gww0_3";
const container = "_container_1gww0_41";
const gridWrapper = "_gridWrapper_1gww0_57";
const card = "_card_1gww0_71";
const faqItem = "_faqItem_1gww0_71";
const sectionWrapper = "_sectionWrapper_1gww0_97";
const heading = "_heading_1gww0_133";
const faqList = "_faqList_1gww0_275";
const faqAnswer = "_faqAnswer_1gww0_393";
const faqQuestion = "_faqQuestion_1gww0_405";
const list = "_list_1gww0_499";
const headerWrapper = "_headerWrapper_1gww0_511";
const backButton = "_backButton_1gww0_523";
const styles = {
  wrapper,
  container,
  gridWrapper,
  card,
  faqItem,
  sectionWrapper,
  heading,
  faqList,
  faqAnswer,
  faqQuestion,
  list,
  headerWrapper,
  backButton
};
const translations = {
  hi: {
    heading: "परिचय",
    introheading: "मेरे बारे में",
    intro: "मैं क्रेउपासानम में एक वाचा धारक हूँ। यह ",
    note: "आधिकारिक पृष्ठ नहीं है",
    description: ", बल्कि गैर-मलयाली बोलने वालों की मदद के लिए बनाया गया एक सरल वेबसाइट है।",
    contact: "यदि आपके पास कोई सुझाव, प्रतिक्रिया या समस्या है, तो कृपया मुझसे संपर्क करें।",
    missionHeading: "उद्देश्य",
    mission: "उद्देश्य यह है कि गैर-मलयाली लोग क्रेउपासानम की सामग्री को आसानी से समझ सकें।",
    howItWorksHeading: "कैसे उपयोग करें?",
    howItWorksItems: [
      "वह वीडियो ढूंढें जिसे आप देखना चाहते हैं।",
      "आपके लिए उपयुक्त उपशीर्षक भाषा चुनें।",
      "यदि चाहें तो आपका डिवाइस उपशीर्षकों को पढ़ सकता है।",
      "आप प्रत्येक वीडियो के नीचे दिए गए सारांश को भी पढ़ सकते हैं।"
    ],
    contentheading: "सामग्री",
    acknowledgements: "अनुवाद AI, Google और मैनुअल इनपुट्स के माध्यम से किए गए हैं।",
    privacy: "हम आपकी गोपनीयता का सम्मान करते हैं। केवल स्वैच्छिक प्रतिक्रिया सबमिशन के अलावा कोई व्यक्तिगत डेटा एकत्र नहीं किया जाता है।",
    faqHeading: "सामान्य प्रश्न",
    faq: [
      {
        question: "क्या यह एक आधिकारिक साइट है?",
        answer: "नहीं, यह एक अनौपचारिक वेबसाइट है जो अनुवाद में मदद करती है।"
      },
      {
        question: "क्या अनुवाद सटीक हैं?",
        answer: "कुछ शब्दों, स्थानों या वाचा से संबंधित शब्दों में त्रुटियाँ हो सकती हैं, जैसा कि अस्वीकरण में बताया गया है।"
      }
    ]
  },
  en: {
    heading: "About",
    introheading: "About Me",
    intro: "I am a covenant taker in Kreupasanam. This is ",
    note: "not an official page",
    description: ", but a simple website created to help non-Malayalam speakers understand the language.",
    contact: "If you have any feedback, suggestions, or notice any issues, please feel free to contact me",
    missionHeading: "Intention",
    mission: "The intention is to help non-Malayalees understand Kreupasanam content easily.",
    howItWorksHeading: "How to Use?",
    howItWorksItems: [
      "Find the video you want to watch.",
      "Choose the subtitle language that suits you.",
      "If you want, your device’s text-to-speech feature can read out the subtitles.",
      "You can also read the summary below each video to understand better."
    ],
    contentheading: "Content",
    acknowledgements: "Translations were done using AI, Google, and manual inputs.",
    privacy: "We respect your privacy. No personal data is collected through this site except for voluntary feedback submissions.",
    faqHeading: "FAQ",
    faq: [
      {
        question: "Is this an official site?",
        answer: "No, this is an unofficial website to help with translations."
      },
      {
        question: "Are the translations accurate?",
        answer: "Some inaccuracies may exist, especially with names, places, or covenant-related terms, as mentioned in the disclaimer."
      }
    ]
  },
  zh: {
    heading: "关于",
    introheading: "关于我",
    intro: "我是Kreupasanam的契约承诺者。这是一个",
    note: "非官方网站",
    description: "，只是一个帮助非马拉雅拉姆语使用者理解语言的简单网站。",
    contact: "如果您有任何反馈、建议或发现任何问题，请随时与我联系。",
    missionHeading: "意图",
    mission: "我们的意图是帮助非马拉雅拉姆语者轻松理解Kreupasanam的内容。",
    howItWorksHeading: "如何使用？",
    howItWorksItems: [
      "找到您想观看的视频。",
      "选择适合您的字幕语言。",
      "如果您愿意，设备的文本转语音功能可以朗读字幕。",
      "您还可以阅读每个视频下面的摘要以更好地理解。"
    ],
    contentheading: "内容",
    acknowledgements: "翻译由AI、Google和人工输入完成。",
    privacy: "我们尊重您的隐私。除自愿反馈提交外，本网站不收集任何个人数据。",
    faqHeading: "常见问题",
    faq: [
      {
        question: "这是官方网站吗？",
        answer: "不是，这是一个帮助翻译的非官方网页。"
      },
      {
        question: "翻译准确吗？",
        answer: "可能存在一些不准确，特别是一些名称、地点或契约相关的词汇，如免责声明中所述。"
      }
    ]
  },
  bn: {
    heading: "পরিচিতি",
    introheading: "আমার সম্পর্কে",
    intro: "আমি ক্রেউপাসানামে একটি কর্নার্ট গ্রহণকারী। এটি একটি ",
    note: "সরকারি পৃষ্ঠা নয়",
    description: ", তবে একটি সাধারণ ওয়েবসাইট যা মালয়ালম ভাষাভাষী নয় এমনদের সাহায্যের জন্য তৈরি করা হয়েছে।",
    contact: "আপনার কোন প্রতিক্রিয়া, পরামর্শ বা সমস্যা থাকলে দয়া করে আমার সাথে যোগাযোগ করুন।",
    missionHeading: "উদ্দেশ্য",
    mission: "উদ্দেশ্য হল মালয়ালম ভাষাভাষী নয় এমন লোকেদের ক্রেউপাসানাম বিষয়বস্তু সহজে বোঝার জন্য সাহায্য করা।",
    howItWorksHeading: "কিভাবে ব্যবহার করবেন?",
    howItWorksItems: [
      "আপনি যে ভিডিওটি দেখতে চান তা খুঁজুন।",
      "আপনার জন্য উপযুক্ত সাবটাইটেল ভাষা নির্বাচন করুন।",
      "আপনার ডিভাইসের টেক্সট-টু-স্পিচ ফিচার সাবটাইটেল পড়তে পারে।",
      "আপনি প্রতিটি ভিডিওর নিচে দেওয়া সারাংশ পড়েও ভালোভাবে বুঝতে পারেন।"
    ],
    contentheading: "বিষয়বস্তু",
    acknowledgements: "অনুবাদগুলি AI, Google, এবং ম্যানুয়াল ইনপুট দিয়ে করা হয়েছে।",
    privacy: "আমরা আপনার গোপনীয়তার সম্মান করি। স্বেচ্ছাসেবী প্রতিক্রিয়া জমা ছাড়া কোনও ব্যক্তিগত তথ্য সংগ্রহ করা হয় না।",
    faqHeading: "সাধারণ প্রশ্ন",
    faq: [
      {
        question: "এটি কি একটি সরকারি সাইট?",
        answer: "না, এটি একটি অনানুষ্ঠানিক ওয়েবসাইট যা অনুবাদে সাহায্য করে।"
      },
      {
        question: "অনুবাদগুলি সঠিক?",
        answer: "কিছু অনির্দিষ্টতা থাকতে পারে, বিশেষ করে নাম, স্থান বা কর্নার্ট সম্পর্কিত শব্দাবলীতে, যেমন ডিসক্লেমারে উল্লেখ করা হয়েছে।"
      }
    ]
  },
  ta: {
    heading: "குறித்தாக",
    introheading: "என்னை பற்றி",
    intro: "நான் கிரூபாசனம் என்ற உடன்படிக்கையாளர். இது ஒரு ",
    note: "அதிகாரப்பூர்வமான பக்கம் அல்ல",
    description: "மற்றும் மலையாளம் பேசாதவர்கள் மொழியை புரிந்துகொள்ள உதவும் ஒரு எளிய வலைத்தளம்.",
    contact: "உங்களுக்கு ஏதேனும் கருத்துகள், பரிந்துரைகள் அல்லது பிரச்சனைகள் இருந்தால், தயவுசெய்து என்னை தொடர்பு கொள்ளுங்கள்.",
    missionHeading: "நோக்கம்",
    mission: "மலையாளத்திலிருந்து தாராளமில்லாதவர்கள் கிரூபாசனம் உள்ளடக்கத்தை எளிதாக புரிந்து கொள்ள உதவுவது நோக்கம்.",
    howItWorksHeading: "எப்படிப் பயன்படுத்துவது?",
    howItWorksItems: [
      "நீங்கள் பார்க்க விரும்பும் வீடியோவைத் தேர்ந்தெடுக்கவும்.",
      "உங்களுக்கு பொருத்தமான உபதலை மொழியைத் தேர்ந்தெடுக்கவும்.",
      "உங்கள் சாதனத்தின் உரை-மொழி மாற்றுதல் அம்சம் உபதலை வாசிக்க முடியும்.",
      "ஒவ்வொரு வீடியோவிற்கும் கீழே உள்ள சுருக்கத்தை வாசித்து மேலும் புரிந்துகொள்ளலாம்."
    ],
    contentheading: "உள்ளடக்கம்",
    acknowledgements: "மொழிபெயர்ப்புகள் AI, Google மற்றும் கையேடு உள்ளீடுகள் மூலம் செய்யப்பட்டவை.",
    privacy: "நாங்கள் உங்கள் தனியுரிமையை மதிக்கின்றோம். தன்னிச்சையான கருத்துப்பதிவுகளை தவிர வேறு எந்த தனிப்பட்ட தரவையும் சேகரிக்கவில்லை.",
    faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq: [
      {
        question: "இது அதிகாரப்பூர்வமான தளமா?",
        answer: "இல்லை, இது மொழிபெயர்ப்பில் உதவும் ஒரு அதிகாரப்பூர்வமற்ற இணையதளம்."
      },
      {
        question: "மொழிபெயர்ப்புகள் துல்லியமாக உள்ளதா?",
        answer: "சில பெயர்கள், இடங்கள் அல்லது உடன்படிக்கை தொடர்பான சொற்களில் தவறுகள் இருக்கலாம், தயவுசெய்து மறுப்பு அறிக்கையை பார்க்கவும்."
      }
    ]
  },
  te: {
    heading: "గురించి",
    introheading: "నా గురించి",
    intro: "నేను క్రెఉపసనం లో ఒక కవరెనెంట్ తీసుకున్నవాణ్ని. ఇది ఒక ",
    note: "అధికారిక పేజీ కాదు",
    description: "కానీ మలయాళం మాట్లాడని వారికి భాషను అర్థం చేసుకోవడానికి సులభం చేయడానికి సాదారణ వెబ్‌సైట్.",
    contact: "మీకు ఏవైనా అభిప్రాయాలు, సూచనలు లేదా సమస్యలు ఉంటే దయచేసి నాకు సంప్రదించండి.",
    missionHeading: "ప్రయోజనం",
    mission: "మలయాళం మాట్లాడని వారు క్రెఉపసనం విషయాలను సులభంగా అర్థం చేసుకునేందుకు ఈ ప్రయత్నం.",
    howItWorksHeading: "ఎలా ఉపయోగించాలి?",
    howItWorksItems: [
      "మీరు చూడాలనుకునే వీడియోను కనుగొనండి.",
      "మీకు సరిపోయే సబ్‌టైటిల్ భాషను ఎంచుకోండి.",
      "మీ పరికరం సబ్‌టైటిల్స్‌ను చదవగలదు.",
      "ప్రతి వీడియో కింద ఇచ్చిన సారాంశాన్ని చదవండి."
    ],
    contentheading: "విషయం",
    acknowledgements: "అనువాదాలు AI, Google మరియు మాన్యువల్ ఇన్పుట్‌ల ద్వారా చేయబడినవి.",
    privacy: "మేము మీ గోప్యతను గౌరవిస్తాము. స్వచ్ఛంద అభిప్రాయం సమర్పణలను తప్పించి వ్యక్తిగత డేటా సేకరించము.",
    faqHeading: "తీసుకున్న ప్రశ్నలు",
    faq: [
      {
        question: "ఇది అధికారిక సైట్嗎?",
        answer: "కాదు, ఇది అనువాదాల్లో సహాయంగా ఉండే అప్రామాణిక వెబ్‌సైట్."
      },
      {
        question: "అనువాదాలు ఖచ్చితంగా ఉన్నాయా?",
        answer: "కొన్ని పేర్లు, ప్రదేశాలు లేదా కవరెనెంట్ సంబంధిత పదాలలో పొరపాట్లు ఉండవచ్చు, మినహాయింపు ప్రకటనలో చెప్పినట్లుగా."
      }
    ]
  },
  fr: {
    heading: "À propos",
    introheading: "À propos de moi",
    intro: "Je suis un contractant dans Kreupasanam. Ceci est une ",
    note: "page non officielle",
    description: ", mais un site simple créé pour aider les non-malayalamophones à comprendre la langue.",
    contact: "Si vous avez des commentaires, des suggestions ou si vous constatez des problèmes, n’hésitez pas à me contacter.",
    missionHeading: "Intention",
    mission: "L’intention est d’aider les non-malayalais à comprendre facilement le contenu de Kreupasanam.",
    howItWorksHeading: "Comment utiliser?",
    howItWorksItems: [
      "Trouvez la vidéo que vous souhaitez regarder.",
      "Choisissez la langue des sous-titres qui vous convient.",
      "Si vous le souhaitez, la fonction de synthèse vocale de votre appareil peut lire les sous-titres.",
      "Vous pouvez également lire le résumé sous chaque vidéo pour mieux comprendre."
    ],
    contentheading: "Contenu",
    acknowledgements: "Les traductions ont été réalisées à l’aide de l’IA, de Google et d’entrées manuelles.",
    privacy: "Nous respectons votre vie privée. Aucune donnée personnelle n’est collectée via ce site, sauf pour les retours volontaires.",
    faqHeading: "FAQ",
    faq: [
      {
        question: "Est-ce un site officiel?",
        answer: "Non, il s’agit d’un site non officiel destiné à aider à la traduction."
      },
      {
        question: "Les traductions sont-elles précises?",
        answer: "Il peut exister quelques inexactitudes, en particulier avec les noms, les lieux ou les termes liés au contrat, comme mentionné dans la clause de non-responsabilité."
      }
    ]
  },
  es: {
    heading: "Acerca de",
    introheading: "Sobre mí",
    intro: "Soy un tomador de pacto en Kreupasanam. Esto es ",
    note: "no es una página oficial",
    description: ", sino un sitio web simple creado para ayudar a quienes no hablan malayalam a entender el idioma.",
    contact: "Si tiene algún comentario, sugerencia o nota algún problema, no dude en contactarme.",
    missionHeading: "Intención",
    mission: "La intención es ayudar a quienes no hablan malayalam a entender fácilmente el contenido de Kreupasanam.",
    howItWorksHeading: "¿Cómo usar?",
    howItWorksItems: [
      "Encuentra el video que quieres ver.",
      "Elige el idioma de los subtítulos que prefieras.",
      "Si quieres, la función de texto a voz de tu dispositivo puede leer los subtítulos.",
      "También puedes leer el resumen debajo de cada video para entender mejor."
    ],
    contentheading: "Contenido",
    acknowledgements: "Las traducciones se realizaron con IA, Google e insumos manuales.",
    privacy: "Respetamos su privacidad. No se recopilan datos personales a través de este sitio, excepto por envíos voluntarios.",
    faqHeading: "Preguntas frecuentes",
    faq: [
      {
        question: "¿Es este un sitio oficial?",
        answer: "No, este es un sitio no oficial para ayudar con las traducciones."
      },
      {
        question: "¿Son precisas las traducciones?",
        answer: "Puede haber algunas imprecisiones, especialmente con nombres, lugares o términos relacionados con el pacto, como se menciona en el descargo de responsabilidad."
      }
    ]
  },
  mr: {
    heading: "आमच्याबद्दल",
    introheading: "माझ्याबद्दल",
    intro: "मी क्रेउपासनाममधील एक करारधारक आहे. हे ",
    note: "अधिकृत पृष्ठ नाही",
    description: ", परंतु हे एक साधे संकेतस्थळ आहे जे गैर-मलयाळी बोलणाऱ्यांना भाषा समजून घेण्यासाठी तयार केले आहे.",
    contact: "आपल्याला काही अभिप्राय, सूचना किंवा समस्या असल्यास कृपया मला संपर्क करा.",
    missionHeading: "उद्दिष्ट",
    mission: "उद्दिष्ट आहे की गैर-मलयाळी लोक Kreupasanam सामग्री सहज समजू शकतील.",
    howItWorksHeading: "कसे वापरावे?",
    howItWorksItems: [
      "आपण पाहू इच्छित व्हिडिओ शोधा.",
      "आपल्यासाठी योग्य असलेली उपशीर्षक भाषा निवडा.",
      "आपल्या उपकरणाचा मजकूर-ते-आवाज वैशिष्ट्य उपशीर्षक वाचू शकतो.",
      "प्रत्येक व्हिडिओखाली दिलेल्या सारांशाला वाचा जेणेकरून चांगले समजता येईल."
    ],
    contentheading: "सामग्री",
    acknowledgements: "अनुवाद AI, Google आणि मॅन्युअल इनपुट्सद्वारे केले गेले आहेत.",
    privacy: "आम्ही आपल्या गोपनीयतेचा आदर करतो. स्वैच्छिक अभिप्राय सादरीकरणांशिवाय कोणताही वैयक्तिक डेटा गोळा केला जात नाही.",
    faqHeading: "सामान्य प्रश्न",
    faq: [
      {
        question: "हे अधिकृत साइट आहे का?",
        answer: "नाही, हे अनधिकृत संकेतस्थळ आहे जे अनुवादात मदत करते."
      },
      {
        question: "अनुवाद अचूक आहेत का?",
        answer: "काही नाम, ठिकाणे किंवा कराराशी संबंधित शब्दांमध्ये त्रुटी असू शकतात, जसे की अस्वीकरणात नमूद आहे."
      }
    ]
  },
  kn: {
    heading: "ಬಗ್ಗೆ",
    introheading: "ನನ್ನ ಬಗ್ಗೆ",
    intro: "ನಾನು ಕ್ರೆಯುಪಸನಮ್‌ನಲ್ಲಿ ಒಪ್ಪಂದಗಾರನಾಗಿದ್ದೇನೆ. ಇದು ಒಂದು ",
    note: "ಅಧಿಕೃತ ಪುಟವಲ್ಲ",
    description: "ಆದರೆ ಇದು ಮಲಯಾಳಂ ಮಾತಾಡದವರಿಗೆ ಭಾಷೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವ ಸರಳ ವೆಬ್‌ಸೈಟ್.",
    contact: "ನಿಮ್ಮ ಬಳಿ ಯಾವುದೇ ಪ್ರತಿಕ್ರಿಯೆ, ಸಲಹೆ ಅಥವಾ ಸಮಸ್ಯೆಗಳಿದ್ದರೆ ದಯವಿಟ್ಟು ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    missionHeading: "ಉದ್ದೇಶ",
    mission: "ಮಲಯಾಳಂ ಅಲ್ಲದವರು ಕ್ರೆಯುಪಸನಮ್ ವಿಷಯವನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವುದು ಉದ್ದೇಶವಾಗಿದೆ.",
    howItWorksHeading: "ಹೆಗೆ ಬಳಸುವುದು?",
    howItWorksItems: [
      "ನೀವು ನೋಡಲು ಬಯಸುವ ವೀಡಿಯೋವನ್ನು ಹುಡುಕಿ.",
      "ನಿಮಗೆ ಸೂಕ್ತವಾದ ಸಬ್‌ಟೈಟಲ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      "ನಿಮ್ಮ ಸಾಧನದ ಪಠ್ಯ-ಧ್ವನಿ ವೈಶಿಷ್ಟ್ಯವು ಸಬ್‌ಟೈಟಲ್ಗಳನ್ನು ಓದಬಹುದು.",
      "ಪ್ರತಿ ವೀಡಿಯೋ ಕೆಳಗೆ ನೀಡಲಾದ ಸಾರಾಂಶವನ್ನು ಓದಿ ಹೆಚ್ಚಿನ ವಿವರಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ."
    ],
    contentheading: "ವಿಷಯ",
    acknowledgements: "ಅನುವಾದಗಳು AI, Google ಮತ್ತು ಕೈಯಿಂದ ಮಾಡಿದ ಇನ್ಪುಟ್‌ಗಳ ಮೂಲಕ ನಡೆದಿವೆ.",
    privacy: "ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತೇವೆ. ಸ್ವಯಂಸೇವಕ ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಕೆಯನ್ನು ಹೊರತುಪಡಿಸಿ ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
    faqHeading: "ಅಕಸ್ಮಾತ್ ಪ್ರಶ್ನೆಗಳು",
    faq: [
      {
        question: "ಇದು ಅಧಿಕೃತ ತಾಣವೇ?",
        answer: "ಇಲ್ಲ, ಇದು ಅನೌಪಚಾರಿಕ ವೆಬ್‌ಸೈಟ್ ಆಗಿದ್ದು, ಅನುವಾದಗಳಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ."
      },
      {
        question: "ಅನುವಾದಗಳು ನಿಖರವಾಗಿವೆಯೇ?",
        answer: "ಹೆಸರುಗಳು, ಸ್ಥಳಗಳು ಅಥವಾ ಒಪ್ಪಂದ ಸಂಬಂಧಿತ ಪದಗಳಲ್ಲಿ ಕೆಲವು ತಪ್ಪುಗಳಿರಬಹುದು, ಈ ನಿರಾಕರಣೆಯಲ್ಲಿ ಸೂಚಿಸಲಾಗಿದೆ."
      }
    ]
  }
};
function ScrollHoverCard({ children, className }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "-30% 0px -30% 0px"
    // wider margin, less frequent triggers
  });
  const debounceRef = useRef(null);
  useEffect(() => {
    if (window.innerWidth >= 768) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.3 } });
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (inView) {
        controls.start({
          opacity: 1,
          y: -3,
          // smaller movement for less work
          transition: { duration: 0.3, ease: "easeOut" }
        });
      } else {
        controls.start({
          opacity: 0.7,
          // less opacity change for smoother look
          y: 5,
          transition: { duration: 0.3, ease: "easeOut" }
        });
      }
    }, 100);
    return () => clearTimeout(debounceRef.current);
  }, [inView, controls]);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      className,
      initial: { opacity: 0.7, y: 5 },
      animate: controls,
      style: { willChange: "transform, opacity" },
      children
    }
  );
}
function About({ lang = "en" }) {
  const t = translations[lang] || translations["en"];
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev === idx ? null : idx);
  };
  return /* @__PURE__ */ jsx("div", { className: styles.wrapper, children: /* @__PURE__ */ jsx("section", { className: styles.sectionWrapper, children: /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles.headerWrapper, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: styles.backButton,
          onClick: () => window.history.back(),
          style: { display: window.innerWidth <= 768 ? "none" : "block" },
          children: [
            "← ",
            /* @__PURE__ */ jsx("span", { children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("h1", { className: styles.heading, children: t.heading })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles.gridWrapper, children: [
      /* @__PURE__ */ jsxs(ScrollHoverCard, { className: `${styles.card} ${styles.featuredCard}`, children: [
        /* @__PURE__ */ jsx("h2", { children: t.introheading }),
        /* @__PURE__ */ jsxs("p", { children: [
          t.intro,
          /* @__PURE__ */ jsx("strong", { children: t.note }),
          t.description
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          t.contact,
          " "
        ] })
      ] }),
      /* @__PURE__ */ jsxs(ScrollHoverCard, { className: styles.card, children: [
        /* @__PURE__ */ jsx("h2", { children: t.missionHeading }),
        /* @__PURE__ */ jsx("p", { children: t.mission })
      ] }),
      /* @__PURE__ */ jsxs(ScrollHoverCard, { className: styles.card, children: [
        /* @__PURE__ */ jsx("h2", { children: t.howItWorksHeading }),
        /* @__PURE__ */ jsx("ul", { className: styles.list, children: t.howItWorksItems.map((item, idx) => /* @__PURE__ */ jsx("li", { children: item }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs(ScrollHoverCard, { className: styles.card, children: [
        /* @__PURE__ */ jsx("h2", { children: t.contentheading }),
        /* @__PURE__ */ jsx("p", { children: t.acknowledgements }),
        /* @__PURE__ */ jsx("p", { children: t.privacy })
      ] }),
      /* @__PURE__ */ jsxs(ScrollHoverCard, { className: styles.card, children: [
        /* @__PURE__ */ jsx("h2", { children: t.faqHeading }),
        /* @__PURE__ */ jsx("div", { className: styles.faqList, children: t.faq.map(({ question, answer }, idx) => /* @__PURE__ */ jsxs("div", { className: styles.faqItem, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: styles.faqQuestion,
              onClick: () => toggleFAQ(idx),
              children: question
            }
          ),
          openFAQ === idx && /* @__PURE__ */ jsx("div", { className: styles.faqAnswer, children: answer })
        ] }, idx)) })
      ] })
    ] })
  ] }) }) });
}
const supportedLangs = ["en", "hi", "zh", "bn", "ta", "te", "fr", "es", "mr", "kn"];
function LangRoute({ element: Element }) {
  const { lang } = useParams();
  if (!supportedLangs.includes(lang)) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/invalid", replace: true });
  }
  return /* @__PURE__ */ jsx(Element, { lang });
}
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function App() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentLang = supportedLangs.includes(pathSegments[0]) ? pathSegments[0] : null;
  const [lang, setLang] = useState(null);
  const isLangSelectorPage = location.pathname === "/";
  const isInvalidPage = location.pathname === "/invalid";
  const showDisclaimer = !isLangSelectorPage && !isInvalidPage;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    showDisclaimer && /* @__PURE__ */ jsx(TranslationDisclaimer, { lang: currentLang || "en" }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(LangSelectorPage, { setLang }) }),
      /* @__PURE__ */ jsx(Route, { path: "/invalid", element: /* @__PURE__ */ jsx(NotFoundPage, {}) }),
      /* @__PURE__ */ jsxs(Route, { path: ":lang", children: [
        /* @__PURE__ */ jsx(Route, { path: "about", element: /* @__PURE__ */ jsx(LangRoute, { element: About }) }),
        /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Navigate, { to: "home", replace: true }) }),
        /* @__PURE__ */ jsx(Route, { path: "home", element: /* @__PURE__ */ jsx(LangRoute, { element: Home }) }),
        /* @__PURE__ */ jsx(Route, { path: "testimony/:id", element: /* @__PURE__ */ jsx(LangRoute, { element: TestimonyPage }) }),
        /* @__PURE__ */ jsx(Route, { path: "testimonies", element: /* @__PURE__ */ jsx(LangRoute, { element: MonthlyTestimonies }) }),
        /* @__PURE__ */ jsx(Route, { path: "oracles", element: /* @__PURE__ */ jsx(LangRoute, { element: Oracles }) }),
        /* @__PURE__ */ jsx(Route, { path: "oracles/:id", element: /* @__PURE__ */ jsx(LangRoute, { element: OraclesPage }) }),
        /* @__PURE__ */ jsx(Route, { path: "dhyanam", element: /* @__PURE__ */ jsx(LangRoute, { element: Dhyanam }) }),
        /* @__PURE__ */ jsx(Route, { path: "dhyanam/:id", element: /* @__PURE__ */ jsx(LangRoute, { element: DhyanamPage }) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFoundPage, {}) })
      ] }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Navigate, { to: "/invalid", replace: true }) })
    ] })
  ] });
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(App, {}),
    getStaticPaths: () => {
      return [
        { params: { lang: "en" } },
        { params: { lang: "hi" } },
        { params: { lang: "zh" } },
        { params: { lang: "bn" } },
        { params: { lang: "ta" } },
        { params: { lang: "te" } },
        { params: { lang: "fr" } },
        { params: { lang: "es" } },
        { params: { lang: "mr" } },
        { params: { lang: "kn" } }
      ];
    }
  }
];
const createApp = ViteReactSSG(routes);
export {
  createApp
};
