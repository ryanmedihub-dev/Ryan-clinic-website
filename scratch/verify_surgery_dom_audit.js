const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    }).on("error", reject);
  });
}

function decodeHtml(html) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .trim();
}

async function auditDOM() {
  console.log("Fetching http://localhost:3000/surgery/hair-transplant-surgery-in-delhi...");
  try {
    const res = await fetchUrl("http://localhost:3000/surgery/hair-transplant-surgery-in-delhi");
    console.log("HTTP Status:", res.status);
    if (res.status !== 200) {
      console.error("Failed to fetch page:", res.status);
      process.exit(1);
    }

    const html = res.body;

    // 1. Extract H1 tags
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => decodeHtml(m[1]));
    console.log("\n--- H1 TAGS (Found " + h1Matches.length + ") ---");
    h1Matches.forEach((h, i) => console.log(`H1 [${i+1}]: "${h}"`));

    // 2. Extract H2 tags
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => decodeHtml(m[1]));
    console.log("\n--- H2 TAGS (Found " + h2Matches.length + ") ---");
    h2Matches.forEach((h, i) => console.log(`H2 [${i+1}]: "${h}"`));

    // 3. Extract H3 tags
    const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => decodeHtml(m[1]));
    console.log("\n--- H3 TAGS (Found " + h3Matches.length + ") ---");
    h3Matches.forEach((h, i) => console.log(`H3 [${i+1}]: "${h}"`));

    // 4. Verify Old Headings Absence
    const oldHeadings = [
      "Meet Your Surgeons",
      "Real Patient Results",
      "Schedule Your Free Scalp Analysis",
      "Recovery & Growth Timeline",
      "Frequently Asked Questions",
      "Safety Protocols",
      "Procedure Science",
      "Risk Protocols",
      "Candidate Suitability",
      "Quality Benchmarks",
      "Transparent Pricing",
      "Visit Our Center"
    ];

    console.log("\n--- OLD HEADING ABSENCE AUDIT ---");
    let oldHeadingFailures = 0;
    const allHeadings = [...h1Matches, ...h2Matches, ...h3Matches];
    for (const oldH of oldHeadings) {
      const found = allHeadings.some(h => h.toLowerCase() === oldH.toLowerCase());
      if (found) {
        console.error(`❌ OLD HEADING STILL PRESENT AS H1/H2/H3: "${oldH}"`);
        oldHeadingFailures++;
      } else {
        console.log(`✓ Absent as H1/H2/H3: "${oldH}"`);
      }
    }

    // 5. Verify Required Headings
    const requiredH2s = [
      "What is hair transplant surgery?",
      "Is hair transplant surgery in Delhi safe?",
      "Who needs hair transplant surgery in Delhi — and who doesn't?",
      "Types of hair transplant surgery in Delhi",
      "Before your hair transplant surgery in Delhi",
      "During the hair transplant surgery in Delhi: step by step",
      "Hair transplant recovery in Delhi: what to expect week by week",
      "Surgical risks, and how a good Delhi clinic minimises them",
      "Hair transplant cost in Delhi",
      "Delhi vs Turkey: is it worth travelling for a hair transplant?",
      "Your surgeon: Dr. Pranendra Singh, hair transplant surgeon in Delhi",
      "What makes the best hair transplant surgery in Delhi?",
      "Why choose Ryan Clinic for hair transplant surgery in Delhi",
      "Visiting Ryan Clinic in Delhi",
      "Book your free consultation",
      "Frequently asked questions about hair transplant surgery in Delhi"
    ];

    console.log("\n--- REQUIRED H2 AUDIT ---");
    let reqH2Failures = 0;
    for (const reqH2 of requiredH2s) {
      const found = h2Matches.some(h => h.includes(reqH2) || reqH2.includes(h));
      if (found) {
        console.log(`✓ Found required H2: "${reqH2}"`);
      } else {
        console.error(`❌ MISSING required H2: "${reqH2}"`);
        reqH2Failures++;
      }
    }

    const requiredH3s = [
      "Safety standards in our Delhi operating theatre",
      "Local anaesthesia and same-day discharge",
      "How many grafts do you need? Norwood grade to graft count",
      "FUE (Follicular Unit Extraction)",
      "Sapphire FUE",
      "THI (Turkey Hair Implantation)",
      "FUE vs Sapphire FUE vs THI: which technique is right for you?",
      "Results at 6, 12 and 24 months",
      "Indicative pricing by session size",
      "What actually changes your price",
      "Hair transplant cost in Delhi: 2,000 vs 3,000 grafts"
    ];

    console.log("\n--- REQUIRED H3 AUDIT ---");
    let reqH3Failures = 0;
    for (const reqH3 of requiredH3s) {
      const found = h3Matches.some(h => h.includes(reqH3) || reqH3.includes(h));
      if (found) {
        console.log(`✓ Found required H3: "${reqH3}"`);
      } else {
        console.error(`❌ MISSING required H3: "${reqH3}"`);
        reqH3Failures++;
      }
    }

    // 6. Check keyboard-mash placeholders
    console.log("\n--- PLACEHOLDER / GIBBERISH AUDIT ---");
    const placeholders = ["asdf", "asdfdasf", "adfadsfsaf", "asdfdsa", "fasdfadsf", "asdfadsf"];
    let placeholderFailures = 0;
    for (const p of placeholders) {
      if (html.toLowerCase().includes(p)) {
        console.error(`❌ PLACEHOLDER FOUND IN RENDERED HTML: "${p}"`);
        placeholderFailures++;
      } else {
        console.log(`✓ No occurrences of: "${p}"`);
      }
    }

    console.log("\n================ SUMMARY ================");
    console.log(`H1 count: ${h1Matches.length} (Expected: 1)`);
    console.log(`Old Heading Failures: ${oldHeadingFailures}`);
    console.log(`Required H2 Failures: ${reqH2Failures}`);
    console.log(`Required H3 Failures: ${reqH3Failures}`);
    console.log(`Placeholder Failures: ${placeholderFailures}`);

    if (h1Matches.length === 1 && oldHeadingFailures === 0 && reqH2Failures === 0 && reqH3Failures === 0 && placeholderFailures === 0) {
      console.log("\n🎉 ALL DOM AUDIT CHECKS PASSED 100%!");
      process.exit(0);
    } else {
      console.error("\n❌ AUDIT FAILED!");
      process.exit(1);
    }
  } catch (err) {
    console.error("Error executing audit:", err);
    process.exit(1);
  }
}

auditDOM();
