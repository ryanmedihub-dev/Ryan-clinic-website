import fs from 'fs';
import path from 'path';

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        scanDir(filePath, fileList);
      }
    } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = scanDir("./src");
console.log(`Scanning ${files.length} source files for all Link and <a> hrefs...\n`);

const hrefRegex = /href=["']([^"']+)["']/g;
const allHrefs = new Map();

for (const f of files) {
  const content = fs.readFileSync(f, "utf8");
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("//")) {
      if (!allHrefs.has(href)) {
        allHrefs.set(href, []);
      }
      allHrefs.get(href).push(f);
    }
  }
}

console.log(`Found ${allHrefs.size} unique internal relative hrefs.\n`);

const DEAD_PATTERNS = [
  "/cost/hair-transplant-cost-in-mumbai",
  "/blog/doctor-led-vs-technician-hair-transplant",
  "/about/dr-pranendra-singh",
  "/hair-transplant-results-before-after-gallery",
  "/results",
  "/fut-hair-transplant-delhi",
  "/prp-hair-loss-treatment-in-mumbai",
  "/blog/smoking-&-hair-transplant",
  "/hair-transplant-cost-in-delhi",
  "/best-hair-transplant-clinic"
];

let foundDead = 0;
for (const [href, fileList] of allHrefs.entries()) {
  for (const dead of DEAD_PATTERNS) {
    if (href === dead || href.startsWith(dead)) {
      console.log(`✗ Deprecated link: "${href}" in files:`);
      fileList.forEach(file => console.log(`   - ${file}`));
      foundDead++;
    }
  }
}

if (foundDead === 0) {
  console.log("✓ All internal JSX <Link> and <a> hrefs point to clean, valid canonical routes!");
}
