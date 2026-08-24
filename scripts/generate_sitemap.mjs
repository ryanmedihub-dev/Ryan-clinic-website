import fs from "fs";

const SOURCE = "marketing-sitemap.xml";
const OUTPUT = "public/sitemap.xml";

if (!fs.existsSync(SOURCE)) {
  console.error(`❌ ${SOURCE} not found.`);
  process.exit(1);
}

const xml = fs.readFileSync(SOURCE, "utf8");

const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(match => match[1].trim())
  .filter(Boolean);

if (urls.length === 0) {
  console.error("❌ No URLs found in marketing sitemap.");
  process.exit(1);
}

// Remove duplicate URLs
const uniqueUrls = [...new Set(urls)];

if (uniqueUrls.length !== urls.length) {
  console.warn(
    `⚠️ Removed ${urls.length - uniqueUrls.length} duplicate URLs.`
  );
}

const today = new Date().toISOString().split("T")[0];

const entries = uniqueUrls.map((url) => {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

fs.writeFileSync(OUTPUT, sitemap, "utf8");

console.log(
  `✅ public/sitemap.xml generated successfully with ${uniqueUrls.length} URLs.`
);