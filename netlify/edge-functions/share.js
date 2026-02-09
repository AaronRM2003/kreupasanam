export default async (request) => {
  const languageNames = {
  en: "English",
  hi: "Hindi",
  mr: "Marathi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  es: "Spanish",
  fr: "French",
  zh: "Chinese",
  bn: "Bengali"
};

  try {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    console.log("[share] 🔍 Request received:", { path: url.pathname, ua });

    const parts = url.pathname.split("/").filter(Boolean);
    console.log("[share] 🔍 Path parts:", parts);

    // Expecting: /:lang/:type/:id-title
    const lang = parts[0];
    const type = parts[1];
    const idSlug = parts[2] || "";
    const escapeHtml = (str) =>
      str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");


    const slugify = (text) =>
      text.toLowerCase().trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

    const siteOrigin = "https://kreupasanamtestimonies.com";

    // Map type → content JSON
    const jsonMap = {
      testimony: "/assets/testimony-content.json",
      dhyanam: "/assets/dhyanam-content.json",
      oracles: "/assets/oracles-content.json",
      prayers:"/assets/prayers-content.json",
    };
    const jsonPath = jsonMap[type];

    let item;
    if (jsonPath && idSlug.includes("-")) {
      const [id, ...slugParts] = idSlug.split("-");
      const urlTitleSlug = slugParts.join("-");

      const res = await fetch(`${siteOrigin}${jsonPath}`);
      if (res.ok) {
        const data = await res.json();
        item = data.find((d) => String(d.id) === id);

        // If slug mismatch, ignore OG (React will handle 404)
        if (item) {
          const correctSlug = slugify(item.title?.en || "Video");
          if (urlTitleSlug !== correctSlug) item = null;
        }
      }
    }

    const isBot = /(facebookexternalhit|Facebot|facebookcatalog|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|googlebot|bingbot)/i.test(
      ua
    );
    const homeDescriptions = {
  en: "Here you can watch Kreupasanam content in English, including Our Daily Bread, Dhyanam, Testimonies, and Living Oracles.",

  hi: "यहाँ आप हिंदी में कृपासानम की सामग्री देख सकते हैं, जिसमें हमारी दैनिक रोटी, ध्यान, साक्ष्य और जीवित वचन शामिल हैं।",

  mr: "येथे तुम्ही मराठीत कृपासानमची सामग्री पाहू शकता, ज्यामध्ये आमची रोजची भाकर, ध्यान, साक्षी आणि जिवंत वचन समाविष्ट आहेत.",

  ta: "இங்கே நீங்கள் தமிழில் க்ருபாசனம் உள்ளடக்கங்களை பார்க்கலாம். இதில் எங்கள் தினசரி அப்பம், தியானம், சாட்சியங்கள் மற்றும் உயிருள்ள வாக்குத்தத்தங்கள் அடங்கும்.",

  te: "ఇక్కడ మీరు తెలుగులో కృపాసనం విషయాలను వీక్షించవచ్చు. ఇందులో మా దినసరి ఆహారం, ధ్యానం, సాక్ష్యాలు మరియు జీవంత వాక్యాలు ఉన్నాయి.",

  kn: "ಇಲ್ಲಿ ನೀವು ಕನ್ನಡದಲ್ಲಿ ಕೃಪಾಸನಂ ವಿಷಯಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು. ಇದರಲ್ಲಿ ನಮ್ಮ ದೈನಂದಿನ ಅನ್ನ, ಧ್ಯಾನ, ಸಾಕ್ಷ್ಯಗಳು ಮತ್ತು ಜೀವಂತ ವಚನಗಳು ಒಳಗೊಂಡಿವೆ.",

  es: "Aquí puedes ver contenido de Kreupasanam en español, incluyendo Nuestro Pan Diario, Meditación, Testimonios y Oráculos Vivos.",

  fr: "Ici, vous pouvez regarder le contenu de Kreupasanam en français, y compris Notre Pain Quotidien, Méditation, Témoignages et Oracles Vivants.",

  zh: "在这里，您可以观看中文的克鲁帕萨南内容，包括每日之粮、默想、见证和活的圣言。",

  bn: "এখানে আপনি বাংলায় ক্রুপাসনামের বিষয়বস্তু দেখতে পারেন, যার মধ্যে রয়েছে আমাদের দৈনন্দিন রুটি, ধ্যান, সাক্ষ্য এবং জীবন্ত বাণী।"
};

    const sectionTitles = {
  prayers: {
  en: "Kreupasanam Our Daily Bread",
  hi: "कृपासानम आवर डेली ब्रेड",
  mr: "कृपासानम आवर डेली ब्रेड",
  ta: "க்ருபாசனம் அவர் டெய்லி பிரெட்",
  te: "కృపాసనం అవర్ డైలీ బ్రెడ్",
  kn: "ಕೃಪಾಸನಂ ಅವರ್ ಡೈಲಿ ಬ್ರೆಡ್",
  es: "Kreupasanam Our Daily Bread",
  fr: "Kreupasanam Our Daily Bread",
  zh: "克鲁帕萨南 Our Daily Bread",
  bn: "ক্রুপাসনাম আওয়ার ডেইলি ব্রেড"
  },

  testimonies: {
    en: "Kreupasanam Testimonies",
    hi: "कृपासानम साक्ष्य",
    mr: "कृपासानम साक्षी",
    ta: "க்ருபாசனம் சாட்சியங்கள்",
    te: "కృపాసనం సాక్ష్యాలు",
    kn: "ಕೃಪಾಸನಂ ಸಾಕ್ಷ್ಯಗಳು",
    es: "Testimonios de Kreupasanam",
    fr: "Témoignages de Kreupasanam",
    zh: "克鲁帕萨南 见证",
    bn: "ক্রুপাসনাম সাক্ষ্যসমূহ"
  },

  dhyanam: {
    en: "Kreupasanam Dhyanam",
    hi: "कृपासानम ध्यान",
    mr: "कृपासानम ध्यान",
    ta: "க்ருபாசனம் தியானம்",
    te: "కృపాసనం ధ్యానం",
    kn: "ಕೃಪಾಸನಂ ಧ್ಯಾನ",
    es: "Meditación Kreupasanam",
    fr: "Méditation Kreupasanam",
    zh: "克鲁帕萨南 默想",
    bn: "ক্রুপাসনাম ধ্যান"
  },

  oracles: {
    en: "Living Oracles",
    hi: "जीवित वचन",
    mr: "जिवंत वचन",
    ta: "உயிருள்ள வாக்குத்தத்தங்கள்",
    te: "జీవంత వాక్యాలు",
    kn: "ಜೀವಂತ ವಚನಗಳು",
    es: "Oráculos Vivos",
    fr: "Oracles Vivants",
    zh: "活的圣言",
    bn: "জীবন্ত বাণী"
  }
};

if (isBot && isSectionPage && jsonPath) {
  const res = await fetch(`${siteOrigin}${jsonPath}`);
  if (res.ok) {
    const data = await res.json();
    const firstItem = data[0];

    if (firstItem) {
      const title =
        sectionTitles[type]?.[lang] ||
        sectionTitles[type]?.en ||
        "Kreupasanam";

      const fullContent =
        firstItem.content?.[lang] ||
        firstItem.content?.en ||
        "Explore Kreupasanam content";

      let description = fullContent
        .replace(/\n/g, " ")
        .slice(0, 150);
      description = description.slice(0, description.lastIndexOf(" "));
      description = escapeHtml(description);

      // Thumbnail (YouTube or image)
      let ogImage = firstItem.thumbnail || "";
      if (!ogImage && firstItem.video) {
        const match = firstItem.video.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
        );
        if (match) {
          ogImage = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }
      }

      const canonicalUrl = `${siteOrigin}${url.pathname}`;

      const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonicalUrl}" />

<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:image" content="${ogImage}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${ogImage}" />
</head>
<body>
<h1>${title}</h1>
<p>${description}</p>
</body>
</html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html" }
      });
    }
  }
}

    if (isBot && item) {
      // Only serve OG HTML for valid URL
      const title = item.title?.[lang] || item.title?.en || "Video";
      const fullContent = item.content?.[lang] || item.content?.en || "Watch this video";
      const maxLength = 150; // characters
      // let description = fullContent.slice(0, maxLength);
      // description = description.slice(0, description.lastIndexOf(" ")); // avoid cutting mid-word
      // description = description.replace(/\n/g, ' '); // replace newlines with space
      // description = escapeHtml(description);
      const description = escapeHtml(homeDescriptions[lang] || homeDescriptions.en);


      const videoUrl = item.video || "";
      const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      const ogImage = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
      const canonicalUrl = `${siteOrigin}${url.pathname}`;

      const html = `<!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <link rel="canonical" href="${canonicalUrl}" />
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:image:alt" content="${title}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${ogImage}" />
      </head>
      <body>
       <h1>${title}</h1>
  <p>${description}</p>
      </body>
      </html>`;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    // For humans or bots with invalid URL → serve React app
    console.log("[share] ✅ Serving React app (index.html)");
    if (url.pathname.startsWith("/assets") || url.pathname === "/sitemap.xml" || url.pathname === "/robots.txt") {
      return fetch(`${siteOrigin}${url.pathname}`);
    }

    return fetch(`${siteOrigin}/index.html`, {
      headers: { "Content-Type": "text/html" },
    });

  } catch (err) {
    console.error("[share] 💥 Error in share.js:", err);
    return new Response("Server error", { status: 500 });
  }
};
