export default async (request) => {
  try {
    const url = new URL(request.url);
    const ua = request.headers.get("user-agent") || "";
    console.log("🔍 Request received:", { path: url.pathname, ua });

    const parts = url.pathname.split("/").filter(Boolean);
    console.log("🔍 Path parts:", parts);

    if (parts.length < 4) {
      console.log("❌ Invalid path:", parts);
      return new Response("Invalid URL", { status: 404 });
    }

    const lang = parts[0];
    const type = parts[2];
    const idSlug = parts[3];
    const [id, ...slugParts] = idSlug.split("-");
    const urlTitleSlug = slugParts.join("-");
    console.log("🔍 Parsed:", { lang, type, id, urlTitleSlug });

    const jsonMap = {
      testimony: "/assets/testimony-content.json",
      dhyanam: "/assets/dhyanam-content.json",
      oracles: "/assets/oracles-content.json",
    };
    const jsonPath = jsonMap[type];
    if (!jsonPath) {
      console.log("❌ Unknown type:", type);
      return new Response("Not found", { status: 404 });
    }

    const siteOrigin = "https://kreupasanamtestimonies.com";
    console.log("🔍 Fetching JSON:", `${siteOrigin}${jsonPath}`);
    const res = await fetch(`${siteOrigin}${jsonPath}`);
    if (!res.ok) {
      console.log("❌ Failed to fetch JSON:", res.status);
      return new Response("Content not found", { status: 404 });
    }

    const data = await res.json();
    const item = data.find((d) => String(d.id) === id);
    if (!item) {
      console.log("❌ No item found for ID:", id);
      return new Response("Item not found", { status: 404 });
    }
    console.log("🔍 Found item:", { id, title: item.title?.en });

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
    console.log("🔍 Slug check:", { urlTitleSlug, correctSlug, csrPath });

    if (urlTitleSlug !== correctSlug) {
      console.log("⚠️ Slug mismatch → redirecting 301:", csrUrl);
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

    const isBot = /(facebookexternalhit|Facebot|facebookcatalog|Twitterbot|WhatsApp|Slackbot|LinkedInBot|Discordbot|TelegramBot|googlebot|bingbot)/i.test(
      ua
    );
    console.log("🔍 Bot detection:", { ua, isBot });

    if (isBot) {
      console.log("✅ Serving OG HTML for bot");
      const html = `<!DOCTYPE html> ...`; // trimmed
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    if (url.pathname !== csrPath) {
      console.log("➡️ Human redirect (302) to:", csrUrl);
      return Response.redirect(csrUrl, 302);
    }

    console.log("➡️ Human fallback redirect (302) to:", csrUrl);
    return Response.redirect(csrUrl, 302);

  } catch (err) {
    console.error("💥 Error in share.js:", err);
    return new Response("Server error", { status: 500 });
  }
};
