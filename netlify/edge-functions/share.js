export default async (request) => {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); // ["en","share","testimony","123-title"]
    if (parts.length < 4) return new Response("Invalid URL", { status: 404 });

    const lang = parts[0];          // language for content
    const type = parts[2];          // testimony | dhyanam | oracles
    const idSlug = parts[3];        // "123-title"
    const [id, ...slugParts] = idSlug.split("-");
    const urlTitleSlug = slugParts.join("-"); // slug from URL

    // Map type to JSON file
    const jsonMap = {
      "testimony": "/assets/testimony-content.json",
      "dhyanam": "/assets/dhyanam-content.json",
      "oracles": "/assets/oracles-content.json"
    };
    const jsonPath = jsonMap[type];
    if (!jsonPath) return new Response("Not found", { status: 404 });

    const siteOrigin = 'https://kreupasanamtestimonies.com';
    const res = await fetch(`${siteOrigin}${jsonPath}`);
    if (!res.ok) return new Response("Content not found", { status: 404 });

    const data = await res.json();
    const item = data.find(d => String(d.id) === id);
    if (!item) return new Response("Item not found", { status: 404 });

    // English title used to verify slug
    const englishTitle = item.title?.en || "Video";

    // Convert English title into URL-safe slug
    const slugify = text => text.toLowerCase().trim()
      .replace(/\s+/g, '-')       
      .replace(/[^\w\-]+/g, '')   
      .replace(/\-\-+/g, '-');

    const correctSlug = slugify(englishTitle);

    // Only preview if URL slug matches English title slug
    if (urlTitleSlug !== correctSlug) {
      return new Response("Invalid URL title", { status: 404 });
    }

    // Content can be in requested language
    const title = item.title?.[lang] || item.title?.en || "Video";
    const description = item.content?.[lang]?.slice(0,200) || item.content?.en?.slice(0,200) || "Watch this video";

    const videoUrl = item.video || "";
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    const ogImage = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
    const ogVideo = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

    const csrUrl = `/${lang}/${type}/${id}-${encodeURIComponent(correctSlug)}`;

    const html = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="${siteOrigin}${csrUrl}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:video" content="${ogVideo}" />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="560" />
        <meta property="og:video:height" content="315" />

        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:url" content="${siteOrigin}${csrUrl}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${ogImage}" />
        <meta name="twitter:player" content="${ogVideo}" />
        <meta name="twitter:player:width" content="560" />
        <meta name="twitter:player:height" content="315" />

        <title>${title}</title>
      </head>
      
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <p><a href="${csrUrl}">Go to site</a></p>

         <script>
      // Redirect humans after OG bots finish reading
      if (!/bot|crawl|spider|slurp|facebook|twitter|whatsapp/i.test(navigator.userAgent)) {
        window.location.replace("${csrUrl}");
      }
    </script>
      </body>
      </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
