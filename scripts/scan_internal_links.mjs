import fs from 'fs';
import path from 'path';

const OLD_DEAD_PATTERNS = [
  "/cost/hair-transplant-cost-in-mumbai",
  "/blog/doctor-led-vs-technician-hair-transplant",
  "/about/dr-pranendra-singh",
  "/hair-transplant-results-before-after-gallery",
  "/results",
  "/fut-hair-transplant-delhi",
  "/prp-hair-loss-treatment-in-mumbai",
  "smoking-&-hair-transplant",
  "/hair-transplant-cost-in-delhi",
  "/fue-hair-transplant-cost-in-delhi",
  "/best-hair-transplant-clinic-in-delhi",
  "/best-hair-transplant-clinic-in-mumbai",
  "/best-hair-transplant-clinic-in-hyderabad"
];

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        scanDir(filePath, fileList);
      }
    } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".json")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = scanDir("./src");
console.log(`Scanning ${files.length} source files for outdated internal link patterns...\n`);

const occurrences = [];
for (const f of files) {
  const content = fs.readFileSync(f, "utf8");
  for (const pattern of OLD_DEAD_PATTERNS) {
    if (content.includes(pattern)) {
      occurrences.push({ file: f, pattern });
    }
  }
}

if (occurrences.length === 0) {
  console.log("✓ No internal links pointing to deprecated or dead URLs found in src/!");
} else {
  console.log(`Found ${occurrences.length} occurrences in src/:`);
  occurrences.forEach(o => console.log(`- [${o.pattern}] in ${o.file}`));
}
