const fs = require("fs");

const html = fs.readFileSync("scratch/err.html", "utf8");

// Search for h1 and h2 tags in the rendered HTML
const hRegex = /<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi;
let match;
console.log("=== RENDERED H1 / H2 TAGS IN HTML ===");
let idx = 1;
while ((match = hRegex.exec(html)) !== null) {
    const raw = match[1];
    const clean = raw.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    console.log(`${idx++}. RAW: "${raw.trim()}"`);
    console.log(`   CLEAN: "${clean}"\n`);
}
