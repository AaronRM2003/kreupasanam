import testimonyData from '../assets/testimony-content.json';
import dhyanamData from '../assets/dhyanam-content.json';
import oraclesData from '../assets/oracles-content.json';

export default async (request) => {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); // ["en","share","testimony","123-title"]
    if (parts.length < 4) return new Response("Invalid URL", { status: 404 });

    const lang = parts[0];
    const type = parts[2];
    const idSlug = parts[3];
    const id = idSlug.split("-")[0];

    // Map type to imported JSON
    const jsonMap = {
      testimony: testimonyData,
      dhyanam: dhyanamData,
      oracles: oraclesData,
    };

    const data = jsonMap[type];
    if (!data) return new Response("Not found", { status: 404 });

    const item = data.find(d => String(d.id) === id);
    if (!item) return new Response("Item not found", { status: 404 });

    // Extract YouTube video info
    const videoUrl = item.video || "";
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    const title = item.title?.[lang] || item.title?.en || "Video";
    const description = item.content?.[lang]?.slice(0, 200) || item.content?.en?.slice(0, 200) || "Watch this video";
    const ogImage = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
    const ogVideo = videoId ? `https://www.youtube.com/embed/${videoId}` : "";

    const csrUrl = `/${lang}/${type}/${id}-${title.replace(/\s+/g,'-')}`;

    // Return HTML with OG tags immediately
    const html = `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />

        <!-- Open Graph -->
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:video" content="${ogVideo}" />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="560" />
        <meta property="og:video:height" content="315" />

        <!-- Twitter -->
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${ogImage}" />
        <meta name="twitter:player" content="${ogVideo}" />
        <meta name="twitter:player:width" content="560" />
        <meta name="twitter:player:height" content="315" />

        <title>${title}</title>

        <!-- Redirect user to normal page -->
        <meta http-equiv="refresh" content="0; URL='${csrUrl}'" />
      </head>
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <p><a href="${csrUrl}">Go to site</a></p>
      </body>
      </html>
    `;

    return new Response(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
};
