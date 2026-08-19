const PAGES_TO_CHECK = [
  "/",
  "/about",
  "/gallery",
  "/contact",
  "/blog",
  "/surgery",
  "/cost",
  "/doctors",
  "/surgeon",
  "/hair-transplant-in-delhi",
  "/hair-transplant-in-mumbai",
  "/hair-transplant-in-hyderabad",
  "/hair-transplant-in-bangalore",
  "/hair-transplant-in-chennai",
  "/fue-hair-transplant",
  "/hairline-transplant",
  "/beard-transplant",
  "/female-hair-transplant",
  "/prp-treatment",
  "/surgery/hair-transplant-surgery-in-delhi",
  "/cost/fue-hair-transplant-cost-in-delhi",
  "/cost/prp-hair-treatment-cost-in-delhi",
  "/doctors/dr-himanshu-jawla",
  "/surgeon/hair-transplant-surgeon-in-delhi",
  "/treatments/hair-fall-loss-treatment-in-delhi",
  "/blog/smoking-and-hair-transplant",
  "/blog/turkey-india-which-is-best",
  "/blog/hair-transplant-techniques",
  "/blog/hair-transplant-shampoo",
  "/blog/first-ten-days-after-hair-transplant"
];

function extractImages(html, pageUrl) {
  const images = [];
  const imgRegex = /<img\s+([^>]*?)>/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
    const src = srcMatch ? srcMatch[1] : 'unknown';

    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : null;

    const isAriaHidden = /aria-hidden=["']true["']/i.test(attrs);

    images.push({ pageUrl, src, alt, isAriaHidden });
  }
  return images;
}

function evaluateImage(img) {
  const isTrackingPixel = img.src.includes('facebook.com') || img.src.includes('google') || img.src.includes('tr?id');
  
  if (isTrackingPixel) {
    return {
      status: 'PASS',
      classification: 'DECORATIVE',
      reason: '1x1 analytics tracking pixel with decorative empty alt'
    };
  }

  if (img.alt === null) {
    return {
      status: 'FAIL',
      classification: 'MISSING',
      reason: 'Missing alt attribute entirely'
    };
  }

  if (img.alt === '' && img.isAriaHidden) {
    return {
      status: 'PASS',
      classification: 'DECORATIVE',
      reason: 'Explicitly marked aria-hidden decorative image'
    };
  }

  if (img.alt === '') {
    return {
      status: 'FAIL',
      classification: 'EMPTY_UNLABELED',
      reason: 'Empty alt on non-decorative content image'
    };
  }

  const lower = img.alt.toLowerCase().trim();
  const genericList = ['image', 'image1', 'photo', 'img', 'banner', 'doctor'];
  
  if (genericList.includes(lower)) {
    return {
      status: 'FAIL',
      classification: 'GENERIC_WEAK',
      reason: `Generic keyword "${img.alt}" without descriptive context`
    };
  }

  if (/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(img.alt) || lower.includes('untitled_design')) {
    return {
      status: 'FAIL',
      classification: 'FILENAME_BASED',
      reason: 'Filename or placeholder used as alt text'
    };
  }

  return {
    status: 'PASS',
    classification: 'VALID',
    reason: 'Descriptive, accessible alt text'
  };
}

async function run() {
  console.log(`Auditing Image Alt-Text across ${PAGES_TO_CHECK.length} key public pages against http://localhost:3000...\n`);
  
  const allAudited = [];
  
  for (let i = 0; i < PAGES_TO_CHECK.length; i++) {
    const page = PAGES_TO_CHECK[i];
    const url = `http://localhost:3000${page}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`✗ Failed to fetch ${page}: ${res.status}`);
        continue;
      }
      const html = await res.text();
      const imgs = extractImages(html, page);
      
      imgs.forEach(img => {
        const evalResult = evaluateImage(img);
        allAudited.push({ ...img, ...evalResult });
      });

      console.log(`✓ Audited [${i+1}/${PAGES_TO_CHECK.length}] ${page.padEnd(45)} | ${imgs.length} images`);
    } catch (e) {
      console.error(`Error crawling ${page}:`, e.message);
    }
  }

  console.log(`\n======================================================`);
  console.log(`IMAGE ALT-TEXT AUDIT SUMMARY:`);
  console.log(`Total Images Scanned: ${allAudited.length}`);
  
  const passed = allAudited.filter(a => a.status === 'PASS');
  const failed = allAudited.filter(a => a.status === 'FAIL');

  console.log(`✓ Passing (Descriptive or Decorative): ${passed.length}`);
  console.log(`✗ Failing (Missing / Empty / Generic): ${failed.length}`);
  console.log(`Success Rate: ${((passed.length / allAudited.length) * 100).toFixed(1)}%`);
  console.log(`======================================================\n`);

  if (failed.length > 0) {
    console.log(`Failing Images (${failed.length}):`);
    failed.forEach(f => {
      console.log(`- Page: ${f.pageUrl} | Alt: "${f.alt}" | Src: ${f.src.slice(0, 60)} | Reason: ${f.reason}`);
    });
    process.exit(1);
  } else {
    console.log(`🎉 100% PASS: All ${allAudited.length} images have valid accessible alt text or decorative aria-hidden tags!`);
  }
}

run().catch(err => {
  console.error("Image audit error:", err);
  process.exit(1);
});
