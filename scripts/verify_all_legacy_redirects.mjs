const ALL_REDIRECTS_AUDIT = [
  // ── 1. SAFE REDIRECTS ─────────────────────────────────────────────
  { url: "/Home", type: "REDIRECT", target: "/" },
  { url: "/&", type: "REDIRECT", target: "/" },
  { url: "/hair-transplant-results-before-after-gallery", type: "REDIRECT", target: "/gallery" },
  { url: "/results", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/images", type: "REDIRECT", target: "/gallery" },
  { url: "/about/dr-pranendra-singh", type: "REDIRECT", target: "/doctors" },
  { url: "/index.php", type: "REDIRECT", target: "/" },
  { url: "/index", type: "REDIRECT", target: "/" },
  { url: "/about.php", type: "REDIRECT", target: "/about" },
  { url: "/contact.php", type: "REDIRECT", target: "/contact" },
  { url: "/female-hair-transplant.php", type: "REDIRECT", target: "/female-hair-transplant" },
  { url: "/mumbai-branch.php", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },
  { url: "/book-appoinent", type: "REDIRECT", target: "/book-appointment" },
  { url: "/costCost", type: "REDIRECT", target: "/cost" },
  { url: "/blogBlog", type: "REDIRECT", target: "/blog" },
  { url: "/hair-transplant-in-banglore", type: "REDIRECT", target: "/hair-transplant-in-bangalore" },
  { url: "/blog/hair-trnasplant-in-patna", type: "REDIRECT", target: "/hair-transplant-in-patna" },
  { url: "/hair-transplant-in-india", type: "REDIRECT", target: "/" },
  { url: "/hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { url: "/fue-hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { url: "/cost/hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { url: "/doctors/hair-transplant-surgeon-in-delhi", type: "REDIRECT", target: "/surgeon/hair-transplant-surgeon-in-delhi" },
  { url: "/hair-transplant-surgeon-in-delhi", type: "REDIRECT", target: "/surgeon/hair-transplant-surgeon-in-delhi" },
  { url: "/hair-transplant-surgery-in-delhi", type: "REDIRECT", target: "/surgery/hair-transplant-surgery-in-delhi" },
  { url: "/blog/using-topical-minoxidil-benefits", type: "REDIRECT", target: "/blog/minoxidil-benefits-for-hair" },
  { url: "/fut-hair-transplant-delhi", type: "REDIRECT", target: "/hair-transplant-in-delhi" },
  { url: "/cost/hair-transplant-cost-in-mumbai", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },

  // ── 2. GALLERY CITY LEGACY URLS ───────────────────────────────────
  { url: "/gallery/hair-transplant-in-kolkata", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-pune", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-chennai", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-patna", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-jammu", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-bangalore", type: "REDIRECT", target: "/gallery" },
  { url: "/gallery/hair-transplant-in-lucknow", type: "REDIRECT", target: "/gallery" },

  // ── 3. OLD CITY BLOG URLS ─────────────────────────────────────────
  { url: "/blog/hair-transplant-in-bangalore", type: "REDIRECT", target: "/hair-transplant-in-bangalore" },
  { url: "/blog/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/hair-transplant-in-ahmedabad" },
  { url: "/blog/hair-transplant-in-patna", type: "REDIRECT", target: "/hair-transplant-in-patna" },
  { url: "/blog/hair-transplant-in-chennai", type: "REDIRECT", target: "/hair-transplant-in-chennai" },
  { url: "/blog/hair-transplant-in-pune", type: "REDIRECT", target: "/hair-transplant-in-pune" },
  { url: "/blog/hair-transplant-in-lucknow", type: "REDIRECT", target: "/hair-transplant-in-lucknow" },
  { url: "/blog/hair-transplant-in-jammu", type: "REDIRECT", target: "/hair-transplant-in-jammu" },
  { url: "/blog/hair-transplant-in-kolkata", type: "REDIRECT", target: "/hair-transplant-in-kolkata" },

  // ── 4. DO NOT REDIRECT (404) ──────────────────────────────────────
  { url: "/blog/doctor-led-vs-technician-hair-transplant", type: "404", target: null },

  // ── 5. SURGERY URL CLEANUP ────────────────────────────────────────
  { url: "/surgery/hair-transplant-surgery-in-hyderabad", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-chennai", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-kolkata", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-jammu", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-patna", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-pune", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-lucknow", type: "REDIRECT", target: "/surgery" },
  { url: "/surgery/hair-transplant-in-bangalore", type: "REDIRECT", target: "/surgery" },

  // ── 6. DOCTORS / SURGEON LEGACY URLS ──────────────────────────────
  { url: "/doctors/hair-transplant-in-jammu", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-kolkata", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-patna", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-chennai", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-bangalore", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-lucknow", type: "REDIRECT", target: "/doctors" },
  { url: "/doctors/hair-transplant-in-pune", type: "REDIRECT", target: "/doctors" },

  { url: "/surgeon/hair-transplant-in-jammu", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-kolkata", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-patna", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-chennai", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-bangalore", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-lucknow", type: "REDIRECT", target: "/surgeon" },
  { url: "/surgeon/hair-transplant-in-pune", type: "REDIRECT", target: "/surgeon" },

  // ── 7. BEST CLINIC LEGACY URLS ────────────────────────────────────
  { url: "/best-hair-transplant-clinic-in-delhi", type: "REDIRECT", target: "/hair-transplant-in-delhi" },
  { url: "/best-hair-transplant-clinic-in-mumbai", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },
  { url: "/best-hair-transplant-clinic-in-hyderabad", type: "REDIRECT", target: "/hair-transplant-in-hyderabad" },

  // ── 8. EXISTING LIVE PAGES (DIRECT 200) ───────────────────────────
  { url: "/hair-transplant-in-ahmedabad", type: "DIRECT_200", target: "/hair-transplant-in-ahmedabad" },
  { url: "/hair-transplant-in-bangalore", type: "DIRECT_200", target: "/hair-transplant-in-bangalore" },
  { url: "/hair-transplant-in-chennai", type: "DIRECT_200", target: "/hair-transplant-in-chennai" },
  { url: "/hair-transplant-in-kolkata", type: "DIRECT_200", target: "/hair-transplant-in-kolkata" },
  { url: "/hair-transplant-in-pune", type: "DIRECT_200", target: "/hair-transplant-in-pune" },
  { url: "/hair-transplant-in-lucknow", type: "DIRECT_200", target: "/hair-transplant-in-lucknow" },
  { url: "/hair-transplant-in-jammu", type: "DIRECT_200", target: "/hair-transplant-in-jammu" },
  { url: "/hair-transplant-in-patna", type: "DIRECT_200", target: "/hair-transplant-in-patna" },
  { url: "/blog/female-hair-transplant", type: "DIRECT_200", target: "/blog/female-hair-transplant" },
  { url: "/blog/minoxidil-benefits-for-hair", type: "DIRECT_200", target: "/blog/minoxidil-benefits-for-hair" },
  { url: "/blog/multivitamins-for-hair-growth", type: "DIRECT_200", target: "/blog/multivitamins-for-hair-growth" },
  { url: "/blog/after-hair-transplant-use-dermanoral", type: "DIRECT_200", target: "/blog/after-hair-transplant-use-dermanoral" },
  { url: "/blog/what-are-the-side-effects-of-hair-transplant-in-india", type: "DIRECT_200", target: "/blog/what-are-the-side-effects-of-hair-transplant-in-india" },
  { url: "/surgery/hair-transplant-surgery-in-delhi", type: "DIRECT_200", target: "/surgery/hair-transplant-surgery-in-delhi" },
  { url: "/surgery/hair-transplant-surgery-in-mumbai", type: "DIRECT_200", target: "/surgery/hair-transplant-surgery-in-mumbai" }
];

async function testItem(item, port = 3000) {
  const fullUrl = `http://localhost:${port}${item.url}`;
  try {
    const res = await fetch(fullUrl, { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    
    let finalStatus = res.status;
    let chainLength = 0;
    
    if (res.status >= 300 && res.status < 400 && location) {
      chainLength = 1;
      const destUrl = location.startsWith('http') ? location : `http://localhost:${port}${location}`;
      try {
        const destRes = await fetch(destUrl, { redirect: 'manual' });
        finalStatus = destRes.status;
        if (destRes.status >= 300 && destRes.status < 400) {
          chainLength = 2;
        }
      } catch (e) {
        finalStatus = 'DEST_ERR';
      }
    }

    let isPass = false;
    if (item.type === "404") {
      isPass = res.status === 404;
    } else if (item.type === "DIRECT_200") {
      isPass = res.status === 200;
    } else if (item.type === "REDIRECT") {
      isPass = (res.status === 301 || res.status === 308) && finalStatus === 200 && (location === item.target || location.endsWith(item.target));
    }

    return {
      ...item,
      httpStatus: res.status,
      destination: location || '-',
      finalStatus: finalStatus,
      chainLength: chainLength,
      isPass: isPass
    };
  } catch (err) {
    return {
      ...item,
      httpStatus: 'ERR',
      destination: '-',
      finalStatus: 'ERR',
      chainLength: 0,
      isPass: false,
      error: err.message
    };
  }
}

async function runAudit() {
  console.log(`Auditing ${ALL_REDIRECTS_AUDIT.length} URLs from user prompt against http://localhost:3000...\n`);
  
  const results = [];
  for (let i = 0; i < ALL_REDIRECTS_AUDIT.length; i++) {
    const r = await testItem(ALL_REDIRECTS_AUDIT[i]);
    results.push(r);
    const passTag = r.isPass ? "✓ PASS" : "✗ FAIL";
    console.log(`[${i+1}/${ALL_REDIRECTS_AUDIT.length}] ${passTag} | ${r.url} (Status: ${r.httpStatus} -> Dest: ${r.destination}, Final: ${r.finalStatus})`);
  }

  let passedCount = results.filter(r => r.isPass).length;
  let failedCount = results.filter(r => !r.isPass).length;

  console.log("\n" + "=".repeat(60));
  console.log(`AUDIT SUMMARY: Total: ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);
  console.log(`Success Rate: ${((passedCount / results.length) * 100).toFixed(1)}%`);
  console.log("=".repeat(60));

  if (failedCount > 0) {
    console.log("\nFailed Items:");
    results.filter(r => !r.isPass).forEach(f => {
      console.log(`- ${f.url}: Got status ${f.httpStatus} -> ${f.destination} (Final: ${f.finalStatus}), Expected ${f.type} -> ${f.target}`);
    });
    process.exit(1);
  } else {
    console.log("\nALL PROMPT URLS VERIFIED 100% PASSING!");
  }
}

runAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
