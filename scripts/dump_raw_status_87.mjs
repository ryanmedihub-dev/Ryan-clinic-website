const ALL_87_URLS = [
  // ── 1. SAFE REDIRECTS (27 URLs) ───────────────────────────────────
  { cat: "Safe Redirects", url: "/Home", type: "REDIRECT", target: "/" },
  { cat: "Safe Redirects", url: "/&", type: "REDIRECT", target: "/" },
  { cat: "Safe Redirects", url: "/hair-transplant-results-before-after-gallery", type: "REDIRECT", target: "/gallery" },
  { cat: "Safe Redirects", url: "/results", type: "REDIRECT", target: "/gallery" },
  { cat: "Safe Redirects", url: "/gallery/images", type: "REDIRECT", target: "/gallery" },
  { cat: "Safe Redirects", url: "/about/dr-pranendra-singh", type: "REDIRECT", target: "/doctors" },
  { cat: "Safe Redirects", url: "/index.php", type: "REDIRECT", target: "/" },
  { cat: "Safe Redirects", url: "/index", type: "REDIRECT", target: "/" },
  { cat: "Safe Redirects", url: "/about.php", type: "REDIRECT", target: "/about" },
  { cat: "Safe Redirects", url: "/contact.php", type: "REDIRECT", target: "/contact" },
  { cat: "Safe Redirects", url: "/female-hair-transplant.php", type: "REDIRECT", target: "/female-hair-transplant" },
  { cat: "Safe Redirects", url: "/mumbai-branch.php", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },
  { cat: "Safe Redirects", url: "/book-appoinent", type: "REDIRECT", target: "/book-appointment" },
  { cat: "Safe Redirects", url: "/costCost", type: "REDIRECT", target: "/cost" },
  { cat: "Safe Redirects", url: "/blogBlog", type: "REDIRECT", target: "/blog" },
  { cat: "Safe Redirects", url: "/hair-transplant-in-banglore", type: "REDIRECT", target: "/hair-transplant-in-bangalore" },
  { cat: "Safe Redirects", url: "/blog/hair-trnasplant-in-patna", type: "REDIRECT", target: "/hair-transplant-in-patna" },
  { cat: "Safe Redirects", url: "/hair-transplant-in-india", type: "REDIRECT", target: "/" },
  { cat: "Safe Redirects", url: "/hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { cat: "Safe Redirects", url: "/fue-hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { cat: "Safe Redirects", url: "/cost/hair-transplant-cost-in-delhi", type: "REDIRECT", target: "/cost/fue-hair-transplant-cost-in-delhi" },
  { cat: "Safe Redirects", url: "/doctors/hair-transplant-surgeon-in-delhi", type: "REDIRECT", target: "/surgeon/hair-transplant-surgeon-in-delhi" },
  { cat: "Safe Redirects", url: "/hair-transplant-surgeon-in-delhi", type: "REDIRECT", target: "/surgeon/hair-transplant-surgeon-in-delhi" },
  { cat: "Safe Redirects", url: "/hair-transplant-surgery-in-delhi", type: "REDIRECT", target: "/surgery/hair-transplant-surgery-in-delhi" },
  { cat: "Safe Redirects", url: "/blog/using-topical-minoxidil-benefits", type: "REDIRECT", target: "/blog/minoxidil-benefits-for-hair" },
  { cat: "Safe Redirects", url: "/fut-hair-transplant-delhi", type: "REDIRECT", target: "/hair-transplant-in-delhi" },
  { cat: "Safe Redirects", url: "/cost/hair-transplant-cost-in-mumbai", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },

  // ── 2. GALLERY CITY LEGACY URLS (8 URLs) ──────────────────────────
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-kolkata", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-pune", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-chennai", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-patna", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-jammu", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-bangalore", type: "REDIRECT", target: "/gallery" },
  { cat: "Gallery City Legacy", url: "/gallery/hair-transplant-in-lucknow", type: "REDIRECT", target: "/gallery" },

  // ── 3. OLD CITY BLOG URLS (8 URLs) ────────────────────────────────
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-bangalore", type: "REDIRECT", target: "/hair-transplant-in-bangalore" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/hair-transplant-in-ahmedabad" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-patna", type: "REDIRECT", target: "/hair-transplant-in-patna" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-chennai", type: "REDIRECT", target: "/hair-transplant-in-chennai" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-pune", type: "REDIRECT", target: "/hair-transplant-in-pune" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-lucknow", type: "REDIRECT", target: "/hair-transplant-in-lucknow" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-jammu", type: "REDIRECT", target: "/hair-transplant-in-jammu" },
  { cat: "Old City Blog URLs", url: "/blog/hair-transplant-in-kolkata", type: "REDIRECT", target: "/hair-transplant-in-kolkata" },

  // ── 4. DO NOT REDIRECT (1 URL) ────────────────────────────────────
  { cat: "Intentional 404", url: "/blog/doctor-led-vs-technician-hair-transplant", type: "404", target: null },

  // ── 5. SURGERY URL CLEANUP (9 URLs) ───────────────────────────────
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-surgery-in-hyderabad", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-chennai", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-kolkata", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-jammu", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-patna", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-pune", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-lucknow", type: "REDIRECT", target: "/surgery" },
  { cat: "Surgery Hub Cleanup", url: "/surgery/hair-transplant-in-bangalore", type: "REDIRECT", target: "/surgery" },

  // ── 6. DOCTORS / SURGEON LEGACY URLS (16 URLs) ────────────────────
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-jammu", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-kolkata", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-patna", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-chennai", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-bangalore", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-lucknow", type: "REDIRECT", target: "/doctors" },
  { cat: "Doctors Hub Cleanup", url: "/doctors/hair-transplant-in-pune", type: "REDIRECT", target: "/doctors" },

  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-jammu", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-kolkata", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-patna", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-ahmedabad", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-chennai", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-bangalore", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-lucknow", type: "REDIRECT", target: "/surgeon" },
  { cat: "Surgeon Hub Cleanup", url: "/surgeon/hair-transplant-in-pune", type: "REDIRECT", target: "/surgeon" },

  // ── 7. BEST CLINIC LEGACY URLS (3 URLs) ───────────────────────────
  { cat: "Best Clinic Legacy", url: "/best-hair-transplant-clinic-in-delhi", type: "REDIRECT", target: "/hair-transplant-in-delhi" },
  { cat: "Best Clinic Legacy", url: "/best-hair-transplant-clinic-in-mumbai", type: "REDIRECT", target: "/hair-transplant-in-mumbai" },
  { cat: "Best Clinic Legacy", url: "/best-hair-transplant-clinic-in-hyderabad", type: "REDIRECT", target: "/hair-transplant-in-hyderabad" },

  // ── 8. EXISTING LIVE PAGES (15 URLs) ──────────────────────────────
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-ahmedabad", type: "DIRECT_200", target: "/hair-transplant-in-ahmedabad" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-bangalore", type: "DIRECT_200", target: "/hair-transplant-in-bangalore" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-chennai", type: "DIRECT_200", target: "/hair-transplant-in-chennai" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-kolkata", type: "DIRECT_200", target: "/hair-transplant-in-kolkata" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-pune", type: "DIRECT_200", target: "/hair-transplant-in-pune" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-lucknow", type: "DIRECT_200", target: "/hair-transplant-in-lucknow" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-jammu", type: "DIRECT_200", target: "/hair-transplant-in-jammu" },
  { cat: "Live Canonical Pages", url: "/hair-transplant-in-patna", type: "DIRECT_200", target: "/hair-transplant-in-patna" },
  { cat: "Live Canonical Pages", url: "/blog/female-hair-transplant", type: "DIRECT_200", target: "/blog/female-hair-transplant" },
  { cat: "Live Canonical Pages", url: "/blog/minoxidil-benefits-for-hair", type: "DIRECT_200", target: "/blog/minoxidil-benefits-for-hair" },
  { cat: "Live Canonical Pages", url: "/blog/multivitamins-for-hair-growth", type: "DIRECT_200", target: "/blog/multivitamins-for-hair-growth" },
  { cat: "Live Canonical Pages", url: "/blog/after-hair-transplant-use-dermanoral", type: "DIRECT_200", target: "/blog/after-hair-transplant-use-dermanoral" },
  { cat: "Live Canonical Pages", url: "/blog/what-are-the-side-effects-of-hair-transplant-in-india", type: "DIRECT_200", target: "/blog/what-are-the-side-effects-of-hair-transplant-in-india" },
  { cat: "Live Canonical Pages", url: "/surgery/hair-transplant-surgery-in-delhi", type: "DIRECT_200", target: "/surgery/hair-transplant-surgery-in-delhi" },
  { cat: "Live Canonical Pages", url: "/surgery/hair-transplant-surgery-in-mumbai", type: "DIRECT_200", target: "/surgery/hair-transplant-surgery-in-mumbai" }
];

async function main() {
  console.log("| # | Category | Tested URL | Raw HTTP Status | Location Header | Final Status | Result |");
  console.log("|---|---|---|---|---|---|---|");

  for (let i = 0; i < ALL_87_URLS.length; i++) {
    const item = ALL_87_URLS[i];
    const fullUrl = `http://localhost:3000${item.url}`;
    try {
      const res = await fetch(fullUrl, { redirect: "manual" });
      const rawStatus = res.status;
      const location = res.headers.get("location") || "-";
      
      let finalStatus = rawStatus;
      if (rawStatus >= 300 && rawStatus < 400 && location !== "-") {
        const dest = location.startsWith("http") ? location : `http://localhost:3000${location}`;
        try {
          const destRes = await fetch(dest, { redirect: "manual" });
          finalStatus = destRes.status;
        } catch {
          finalStatus = "ERR";
        }
      }

      let isPass = false;
      if (item.type === "404") {
        isPass = rawStatus === 404;
      } else if (item.type === "DIRECT_200") {
        isPass = rawStatus === 200;
      } else if (item.type === "REDIRECT") {
        isPass = (rawStatus === 301 || rawStatus === 308) && finalStatus === 200 && (location === item.target || location.endsWith(item.target));
      }

      const passTag = isPass ? "**PASS**" : "**FAIL**";
      console.log(`| ${i + 1} | ${item.cat} | \`${item.url}\` | **${rawStatus}** | \`${location}\` | **${finalStatus}** | ${passTag} |`);
    } catch (err) {
      console.log(`| ${i + 1} | ${item.cat} | \`${item.url}\` | **ERR** | \`-\` | **ERR** | **FAIL** |`);
    }
  }
}

main();
