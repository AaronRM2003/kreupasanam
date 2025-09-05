export default async (request) => {
  try {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    console.log("[share] 🔍 Request received:", { path: url.pathname, ua });

    const parts = url.pathname.split("/").filter(Boolean);
    console.log("[share] 🔍 Path parts:", parts);

    // Ensure this only runs for `/share/...`
    if (parts[1] !== "share" || parts.length < 4) {
      console.log("[share] ❌ Not a /share/ URL:", parts);
      return new Response("Invalid URL", { status: 404 });
    }

    const lang = parts[0];
    const type = parts[2];
    const idSlug = parts[3];
    const [id, ...slugParts] = idSlug.split("-");
    const urlTitleSlug = slugParts.join("-");
    console.log("[share] 🔍 Parsed:", { lang, type, id, urlTitleSlug });

    // Map type → content JSON
    const jsonMap = {
      testimony: "/assets/testimony-content.json",
      dhyanam: "/assets/dhyanam-content.json",
      oracles: "/assets/oracles-content.json",
    };
    const jsonPath = jsonMap[type];
    if (!jsonPath) {
      console.log("[share] ❌ Unknown type:", type);
      return new Response("Not found", { status: 404 });
    }

    const siteOrigin = "https://kreupasanamtestimonies.com";
    const res = await fetch(`${siteOrigin}${jsonPath}`);
    if (!res.ok) {
      console.log("[share] ❌ Failed to fetch JSON:", res.status);
      return new Response("Content not found", { status: 404 });
    }

    const data = await res.json();
    const item = data.find((d) => String(d.id) === id);
    if (!item) {
      console.log("[share] ❌ No item found for ID:", id);
      return new Response("Item not found", { status: 404 });
    }
    console.log("[share] 🔍 Found item:", { id, title: item.title?.en });

    // Slugify
    const slugify = (text) =>
      text.toLowerCase().trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

    const englishTitle = item.title?.en || "Video";
    const correctSlug = slugify(englishTitle);
    const csrPath = `/${lang}/${type}/${id}-${correctSlug}`;
    const csrUrl = `${siteOrigin}${csrPath}`;

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

    const canonicalUrl = `${siteOrigin}${url.pathname}`;

    // Bot detection
    const isBot = /(facebookexternalhit|Facebot|facebookcatalog|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|googlebot|bingbot)/i.test(
      ua
    );
    console.log("[share] 🔍 Bot detection:", { ua, isBot });

    if (isBot) {
      console.log("[share] ✅ Serving OG HTML for bot");

      const html = `<!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <meta name="description" content="${description}" />

        <!-- Open Graph tags -->
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="${canonicalUrl}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:image:alt" content="${title}" />

        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${ogImage}" />
      </head>
      <body>
        <p>Sharing preview for <strong>${title}</strong></p>
      </body>
      </html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Humans → redirect to clean React route
    if (urlTitleSlug !== correctSlug) {
      console.log("[share] ⚠️ Slug mismatch → redirecting 301:", csrUrl);
      return Response.redirect(csrUrl, 301);
    }

    console.log("[share] ➡️ Human redirect (302) to:", csrUrl);
    return Response.redirect(csrUrl, 302);

  } catch (err) {
    console.error("[share] 💥 Error in share.js:", err);
    return new Response("Server error", { status: 500 });
  }
};
