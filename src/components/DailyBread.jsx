import React from "react";
import styles from "./DailyBread.module.css";

const translations = {
  en: {
    title: "Watch Fr. VP Joseph’s",
    highlight1: "Our Daily Bread",
    highlight2: "Marian Covenant Worship",
    subtitle: "Choose and watch in your language",
    button1: "Watch Daily Bread",
    button2: "Watch Marian Covenant",
  },
  // ---- (Add translations for each lang)
  bn: {
    title: "Глядзіце айца VP Joseph’s",
    highlight1: "Наш штодзённы хлеб",
    highlight2: "Марыйскі Запавет Пакланенне",
    subtitle: "Выберыце і глядзіце на вашай мове",
    button1: "Глядзець Хлеб",
    button2: "Глядзець Марыйскі",
  },
  zh: {
    title: "观看 维普·约瑟夫神父 的",
    highlight1: "我们每日的粮",
    highlight2: "玛利亚盟约敬拜",
    subtitle: "选择并以您的语言观看",
    button1: "观看每日粮",
    button2: "观看圣母盟约",
  },
  fr: {
    title: "Regardez Père VP Joseph’s",
    highlight1: "Notre Pain Quotidien",
    highlight2: "Alliance Mariale Adoration",
    subtitle: "Choisissez et regardez dans votre langue",
    button1: "Regarder Pain Quotidien",
    button2: "Regarder Alliance Mariale",
  },
  hi: {
    title: "देखें फादर वीपी जोसेफ़ का",
    highlight1: "हमारा दैनिक भोजन",
    highlight2: "मरियम वाचा उपासना",
    subtitle: "अपनी भाषा में चुनें और देखें",
    button1: "डेली ब्रेड देखें",
    button2: "मरियम वाचा देखें",
  },
  kn: {
    title: "ಫಾ. ವಿ.ಪಿ. ಜೋಸೆಫ್ ಅವರ",
    highlight1: "ನಮ್ಮ ದೈನಂದಿನ ಆಹಾರ",
    highlight2: "ಮರಿಯಮ್ಮ ಒಡಂಬಡಿಕೆ ಆರಾಧನೆ",
    subtitle: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಆಯ್ಕೆ ಮಾಡಿ ವೀಕ್ಷಿಸಿ",
    button1: "ಡೇಲಿ ಬ್ರೆಡ್ ವೀಕ್ಷಿಸಿ",
    button2: "ಮರಿಯಮ್ಮ ಆರಾಧನೆ ವೀಕ್ಷಿಸಿ",
  },
  mr: {
    title: "पहा फादर व्हीपी जोसेफ यांचे",
    highlight1: "आपला दैनंदिन भाकर",
    highlight2: "मरीया करार उपासना",
    subtitle: "आपल्या भाषेत निवडा आणि पहा",
    button1: "डेली ब्रेड पहा",
    button2: "मरीया करार पहा",
  },
  es: {
    title: "Mira del Padre VP Joseph",
    highlight1: "Nuestro Pan Diario",
    highlight2: "Alianza Mariana Adoración",
    subtitle: "Elige y mira en tu idioma",
    button1: "Ver Pan Diario",
    button2: "Ver Alianza Mariana",
  },
  ta: {
    title: "பர். வி.பி. ஜோசப் அவர்களின்",
    highlight1: "எங்கள் அன்றாட அப்பம்",
    highlight2: "மறையாள் ஏற்பாடு ஆராதனை",
    subtitle: "உங்கள் மொழியில் தேர்ந்தெடுத்து பார்க்கவும்",
    button1: "டெய்லி பிரெட் பார்க்க",
    button2: "மறையாள் ஆராதனை பார்க்க",
  },
  te: {
    title: "ఫా. వి.పి. జోసెఫ్ గారి",
    highlight1: "మన దైనందిన ఆహారం",
    highlight2: "మర్యు ఒడంబడిక ఆరాధన",
    subtitle: "మీ భాషలో ఎంపిక చేసి చూడండి",
    button1: "డైలీ బ్రెడ్ చూడండి",
    button2: "మర్యు ఆరాధన చూడండి",
  },
};

const DailyBread = ({ videoId = "dIK2G8JrF6w", lang = "en" }) => {
  const t = translations[lang] || translations.en;

  const dailyBreadUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const covenantUrl = `/${lang}/marian-covenant`; // <-- Change to actual link if different
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className={styles.container}>
      <div className={styles.right} onClick={() => window.open(dailyBreadUrl, "_blank")}>
        <div className={styles.thumbnailWrapper}>
          <img className={styles.thumbnail} src={thumbnailUrl} alt={t.highlight1} loading="lazy" />
          <div className={styles.playIcon}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <polygon points="20,15 45,28 20,41" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.left}>
        <h2 className={styles.title}>
          {t.title} <span>{t.highlight1}</span> & <span>{t.highlight2}</span>
        </h2>
        <p className={styles.subtitle}>{t.subtitle}</p>

        {/* BUTTONS */}
        <div className={styles.buttonsRow}>
          <button className={styles.button} onClick={() => window.open(dailyBreadUrl, "_blank")}>
            {t.button1}
          </button>
          <button className={styles.buttonSecondary} onClick={() => (window.location.href = covenantUrl)}>
            {t.button2}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DailyBread;
