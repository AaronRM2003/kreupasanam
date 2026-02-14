export default async (request) => {
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
      history:"/assets/history-content.json"
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

    if (isBot && item) {
      // Only serve OG HTML for valid URL
      const title = item.title?.[lang] || item.title?.en || "Video";
      const fullContent = item.content?.[lang] || item.content?.en || "Watch this video";
      const maxLength = 150; // characters
      let description = fullContent.slice(0, maxLength);
      description = description.slice(0, description.lastIndexOf(" ")); // avoid cutting mid-word
      description = description.replace(/\n/g, ' '); // replace newlines with space
      description = escapeHtml(description);

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
