const MARKETING_URLS_AUDIT = [
  // ── BLOG ──────────────────────────────────────────────────────────
  {
    url: "/blog/smoking-&-hair-transplant",
    expectedAction: "REDIRECT",
    canonical: "/blog/smoking-and-hair-transplant",
    semanticMatch: "YES",
    reason: "Exact slug rename (& -> and) for same DB blog article"
  },
  {
    url: "/blog/hair-transplant-in-patna",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-patna",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-ahmedabad",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-ahmedabad",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-lucknow",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-lucknow",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-chennai",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-chennai",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-bangalore",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-bangalore",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-kolkata",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-kolkata",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-jammu",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-jammu",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/hair-transplant-in-pune",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-pune",
    semanticMatch: "YES",
    reason: "Thin city landing page incorrectly under /blog -> canonical branch page"
  },
  {
    url: "/blog/doctor-led-vs-technician-hair-transplant",
    expectedAction: "404",
    canonical: null,
    semanticMatch: "INTENTIONAL_404",
    reason: "No equivalent DB article exists; turkey-india is a different article"
  },

  // ── GALLERY ───────────────────────────────────────────────────────
  {
    url: "/hair-transplant-results-before-after-gallery",
    expectedAction: "REDIRECT",
    canonical: "/gallery",
    semanticMatch: "YES",
    reason: "Old results gallery slug -> /gallery"
  },

  // ── GENERAL & TREATMENTS ──────────────────────────────────────────
  {
    url: "/hair-transplant-in-india",
    expectedAction: "REDIRECT",
    canonical: "/",
    semanticMatch: "YES",
    reason: "Generic India page -> homepage"
  },
  {
    url: "/fut-hair-transplant-delhi",
    expectedAction: "REDIRECT",
    canonical: "/fue-hair-transplant",
    semanticMatch: "YES",
    reason: "FUT technique variant -> canonical /fue-hair-transplant treatment page"
  },
  {
    url: "/prp-hair-loss-treatment-in-mumbai",
    expectedAction: "REDIRECT",
    canonical: "/prp-treatment",
    semanticMatch: "YES",
    reason: "PRP treatment intent -> canonical /prp-treatment service page"
  },

  // ── COST ──────────────────────────────────────────────────────────
  {
    url: "/cost/hair-transplant-cost-in-delhi",
    expectedAction: "REDIRECT",
    canonical: "/cost/fue-hair-transplant-cost-in-delhi",
    semanticMatch: "YES",
    reason: "Direct slug rename of existing Delhi CostPage"
  },
  {
    url: "/cost/hair-transplant-cost-in-mumbai",
    expectedAction: "404",
    canonical: null,
    semanticMatch: "INTENTIONAL_404",
    reason: "No hair transplant cost page for Mumbai exists; cannot substitute PRP cost"
  },
  {
    url: "/cost/hair-transplant-cost-in-hyderabad",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-bangalore",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-lucknow",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-ahmedabad",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-pune",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-kolkata",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-chennai",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-jammu",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },
  {
    url: "/cost/hair-transplant-in-patna",
    expectedAction: "REDIRECT",
    canonical: "/cost",
    semanticMatch: "YES",
    reason: "No city cost page in DB -> /cost listing"
  },

  // ── SURGERY ───────────────────────────────────────────────────────
  {
    url: "/surgery/hair-transplant-surgery-in-hyderabad",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-ahmedabad",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-chennai",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-kolkata",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-jammu",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-patna",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-pune",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-lucknow",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },
  {
    url: "/surgery/hair-transplant-in-bangalore",
    expectedAction: "REDIRECT",
    canonical: "/surgery",
    semanticMatch: "YES",
    reason: "No city surgery page in DB -> /surgery listing"
  },

  // ── DOCTORS ───────────────────────────────────────────────────────
  {
    url: "/doctors/hair-transplant-in-jammu",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-kolkata",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-patna",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-chennai",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-ahmedabad",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-bangalore",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-lucknow",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-in-pune",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "No city doctor page in DB -> /doctors listing"
  },
  {
    url: "/doctors/hair-transplant-surgeon-in-delhi",
    expectedAction: "REDIRECT",
    canonical: "/surgeon/hair-transplant-surgeon-in-delhi",
    semanticMatch: "YES",
    reason: "Namespace moved from /doctors to /surgeon"
  },

  // ── SURGEON ───────────────────────────────────────────────────────
  {
    url: "/surgeon/hair-transplant-in-jammu",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-kolkata",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-patna",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-ahmedabad",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-chennai",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-bangalore",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-lucknow",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },
  {
    url: "/surgeon/hair-transplant-in-pune",
    expectedAction: "REDIRECT",
    canonical: "/surgeon",
    semanticMatch: "YES",
    reason: "No city surgeon page in DB -> /surgeon listing"
  },

  // ── BEST CLINIC ───────────────────────────────────────────────────
  {
    url: "/best-hair-transplant-clinic-in-delhi",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-delhi",
    semanticMatch: "YES",
    reason: "Direct branch landing page"
  },
  {
    url: "/best-hair-transplant-clinic-in-mumbai",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-mumbai",
    semanticMatch: "YES",
    reason: "Direct branch landing page"
  },
  {
    url: "/best-hair-transplant-clinic-in-hyderabad",
    expectedAction: "REDIRECT",
    canonical: "/hair-transplant-in-hyderabad",
    semanticMatch: "YES",
    reason: "Direct branch landing page"
  },

  // ── ABOUT / DOCTORS ───────────────────────────────────────────────
  {
    url: "/about/dr-pranendra-singh",
    expectedAction: "REDIRECT",
    canonical: "/doctors",
    semanticMatch: "YES",
    reason: "Soft-deleted doctor -> /doctors active listing"
  }
];

async function testItem(item) {
  const fullUrl = `http://localhost:3000${item.url}`;
  try {
    const res = await fetch(fullUrl, { redirect: 'manual' });
    const location = res.headers.get('location') || '';
    
    let finalStatus = res.status;
    let chainLength = 0;
    
    if (res.status >= 300 && res.status < 400 && location) {
      chainLength = 1;
      const destUrl = location.startsWith('http') ? location : `http://localhost:3000${location}`;
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
    if (item.expectedAction === "404") {
      isPass = res.status === 404;
    } else if (item.expectedAction === "REDIRECT") {
      isPass = (res.status === 301 || res.status === 308) && finalStatus === 200 && location === item.canonical;
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
  console.log(`Auditing ${MARKETING_URLS_AUDIT.length} Marketing URLs against http://localhost:3000...\n`);
  
  const results = [];
  for (let i = 0; i < MARKETING_URLS_AUDIT.length; i += 5) {
    const chunk = MARKETING_URLS_AUDIT.slice(i, i + 5);
    const chunkResults = await Promise.all(chunk.map(testItem));
    results.push(...chunkResults);
  }

  console.log("| Source URL | HTTP Status | Destination | Final Status | Chain | Canonical URL | Semantic Match | PASS/FAIL |");
  console.log("|---|---|---|---|---|---|---|---|");
  
  let passedCount = 0;
  let failedCount = 0;

  for (const r of results) {
    const passTag = r.isPass ? "✓ PASS" : "✗ FAIL";
    if (r.isPass) passedCount++; else failedCount++;
    console.log(`| \`${r.url}\` | ${r.httpStatus} | \`${r.destination}\` | ${r.finalStatus} | ${r.chainLength} | \`${r.canonical || '-'}\` | ${r.semanticMatch} | **${passTag}** |`);
  }

  console.log("\n" + "=".repeat(60));
  console.log(`AUDIT RESULT: Total: ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);
  console.log(`Success Rate: ${((passedCount / results.length) * 100).toFixed(1)}%`);
  console.log("=".repeat(60));

  if (failedCount > 0) {
    console.log("\nFailed Items:");
    results.filter(r => !r.isPass).forEach(f => {
      console.log(`- ${f.url}: Got status ${f.httpStatus} -> ${f.destination} (Final: ${f.finalStatus}), Expected: ${f.expectedAction} -> ${f.canonical}`);
    });
    process.exit(1);
  } else {
    console.log("\nALL 55 MARKETING URLS VERIFIED AND COMPLIANT WITH STRICT SEMANTIC RULES!");
  }
}

runAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
