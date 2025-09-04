export default async (request) => {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); // ["en","share","testimony","123-title"]

    if (parts.length < 4) return new Response("Invalid URL", { status: 404 });

    const lang = parts[0];
    const type = parts[2];
    const idSlug = parts[3];
    const [id, ...slugParts] = idSlug.split("-");
    const urlTitleSlug = slugParts.join("-");

    const jsonMap = {
      testimony: "/assets/testimony-content.json",
      dhyanam: "/assets/dhyanam-content.json",
      oracles: "/assets/oracles-content.json",
    };
    const jsonPath = jsonMap[type];
    if (!jsonPath) return new Response("Not found", { status: 404 });

    const siteOrigin = "https://kreupasanamtestimonies.com";
    const res = await fetch(`${siteOrigin}${jsonPath}`);
    if (!res.ok) return new Response("Content not found", { status: 404 });

    const data = await res.json();
    const item = data.find((d) => String(d.id) === id);
    if (!item) return new Response("Item not found", { status: 404 });

    const englishTitle = item.title?.en || "Video";
    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

    const correctSlug = slugify(englishTitle);
    const csrPath = `/${lang}/${type}/${id}-${correctSlug}`;
    const csrUrl = `${siteOrigin}${csrPath}`;

    // ✅ If slug mismatch → always 301 redirect to correct SPA route
    if (urlTitleSlug !== correctSlug) {
      return Response.redirect(csrUrl, 301);
    }

    const title = item.title?.[lang] || item.title?.en || "Video";
    const description = item.description?.[lang] || "Watch this video";

    const videoUrl = item.video || "";
    const videoIdMatch = videoUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    const ogImage = videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "";

    const canonicalUrl = csrUrl;

    // ✅ Bot detection (added Facebot!)
    const ua = request.headers.get("user-agent") || "";
    const isBot = /(facebookexternalhit|Facebot|facebookcatalog|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|googlebot|bingbot)/i.test(
      ua
    );

    if (isBot) {
      // Serve OG HTML directly
      const html = `
        <!DOCTYPE html>
        <html lang="${lang}">
        <head>
          <meta charset="UTF-8" />
          <title>${title}</title>

          <!-- Open Graph -->
          <meta property="og:type" content="website" />
          <meta property="og:url" content="${canonicalUrl}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${ogImage}" />

          <!-- Canonical -->
          <link rel="canonical" href="${canonicalUrl}" />

          <!-- Twitter -->
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:url" content="${canonicalUrl}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${ogImage}" />
        </head>
        <body>
          <h1>${title}</h1>
          <p>${description}</p>
          <p><a href="${canonicalUrl}">Go to site</a></p>
        </body>
        </html>
      `;
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    // ✅ Humans: redirect to SPA route
    if (url.pathname !== csrPath) {
      return Response.redirect(csrUrl, 302);
    }

    // Fallback: humans on correct path → still go SPA
    return Response.redirect(csrUrl, 302);

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
