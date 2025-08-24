export default async (request) => {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); 
    // Expected: ["en","share","testimony","123-title"]

    if (parts.length < 4) return new Response("Invalid URL", { status: 404 });

    const lang = parts[0];          // "en", "hi", etc.
    const type = parts[2];          // "testimony", "dhyanam", "oracles"
    const idSlug = parts[3];        // "123-title"

    const separatorIndex = idSlug.indexOf("-");
    const id = separatorIndex === -1 ? idSlug : idSlug.substring(0, separatorIndex);

    // Map type to JSON file
    const jsonMap = {
      "testimony": "/assets/testimony-content.json",
      "dhyanam": "/assets/dhyanam-content.json",
      "oracles": "/assets/oracles-content.json"
    };

    const jsonPath = jsonMap[type];
    if (!jsonPath) return new Response("Not found", { status: 404 });

    // Fetch JSON from public folder
    const res = await fetch(`${request.headers.get("origin")}${jsonPath}`);
    if (!res.ok) return new Response("Content not found", { status: 404 });

    const data = await res.json();
    const item = data.find(d => String(d.id) === id);
    if (!item) return new Response("Item not found", { status: 404 });

    // Get YouTube ID
    const videoUrl = item.video || "";
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    const ogTitle = item.title?.[lang] || item.title?.en || "Video";
    const ogDescription = item.content?.[lang]?.slice(0, 200) || item.content?.en?.slice(0, 200) || "Watch this video";
    const ogVideo = videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    const ogImage = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

    // Redirect path includes language
    const redirectPath = `/${lang}/${type}/${id}-${ogTitle.replace(/\s+/g,'-')}`;

    // Return HTML with OG tags and meta refresh for redirect
    const html = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />

        <!-- Open Graph -->
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content="${ogTitle}" />
        <meta property="og:description" content="${ogDescription}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:video" content="${ogVideo}" />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="560" />
        <meta property="og:video:height" content="315" />

        <!-- Twitter -->
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content="${ogTitle}" />
        <meta name="twitter:description" content="${ogDescription}" />
        <meta name="twitter:image" content="${ogImage}" />
        <meta name="twitter:player" content="${ogVideo}" />
        <meta name="twitter:player:width" content="560" />
        <meta name="twitter:player:height" content="315" />

        <!-- Redirect users to normal page -->
        <meta http-equiv="refresh" content="0; URL='${redirectPath}'" />
      </head>
      <body></body>
      </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
