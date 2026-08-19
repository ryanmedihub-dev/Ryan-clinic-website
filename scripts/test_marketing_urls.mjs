const MARKETING_URLS = [
  // BLOG
  "/blog/smoking-&-hair-transplant",
  "/blog/hair-transplant-in-patna",
  "/blog/hair-transplant-in-ahmedabad",
  "/blog/hair-transplant-in-lucknow",
  "/blog/hair-transplant-in-chennai",
  "/blog/hair-transplant-in-bangalore",
  "/blog/hair-transplant-in-kolkata",
  "/blog/hair-transplant-in-jammu",
  "/blog/hair-transplant-in-pune",
  "/blog/doctor-led-vs-technician-hair-transplant",

  // GALLERY
  "/hair-transplant-results-before-after-gallery",

  // GENERAL
  "/hair-transplant-in-india",
  "/fut-hair-transplant-delhi",
  "/prp-hair-loss-treatment-in-mumbai",

  // COST
  "/cost/hair-transplant-cost-in-hyderabad",
  "/cost/hair-transplant-cost-in-mumbai",
  "/cost/hair-transplant-cost-in-delhi",
  "/cost/hair-transplant-in-bangalore",
  "/cost/hair-transplant-in-lucknow",
  "/cost/hair-transplant-in-ahmedabad",
  "/cost/hair-transplant-in-pune",
  "/cost/hair-transplant-in-kolkata",
  "/cost/hair-transplant-in-chennai",
  "/cost/hair-transplant-in-jammu",
  "/cost/hair-transplant-in-patna",

  // SURGERY
  "/surgery/hair-transplant-surgery-in-hyderabad",
  "/surgery/hair-transplant-in-ahmedabad",
  "/surgery/hair-transplant-in-chennai",
  "/surgery/hair-transplant-in-kolkata",
  "/surgery/hair-transplant-in-jammu",
  "/surgery/hair-transplant-in-patna",
  "/surgery/hair-transplant-in-pune",
  "/surgery/hair-transplant-in-lucknow",
  "/surgery/hair-transplant-in-bangalore",

  // DOCTORS
  "/doctors/hair-transplant-in-jammu",
  "/doctors/hair-transplant-in-kolkata",
  "/doctors/hair-transplant-in-patna",
  "/doctors/hair-transplant-in-chennai",
  "/doctors/hair-transplant-in-ahmedabad",
  "/doctors/hair-transplant-in-bangalore",
  "/doctors/hair-transplant-in-lucknow",
  "/doctors/hair-transplant-in-pune",
  "/doctors/hair-transplant-surgeon-in-delhi",

  // SURGEON
  "/surgeon/hair-transplant-in-jammu",
  "/surgeon/hair-transplant-in-kolkata",
  "/surgeon/hair-transplant-in-patna",
  "/surgeon/hair-transplant-in-ahmedabad",
  "/surgeon/hair-transplant-in-chennai",
  "/surgeon/hair-transplant-in-bangalore",
  "/surgeon/hair-transplant-in-lucknow",
  "/surgeon/hair-transplant-in-pune",

  // BEST CLINIC
  "/best-hair-transplant-clinic-in-delhi",
  "/best-hair-transplant-clinic-in-mumbai",
  "/best-hair-transplant-clinic-in-hyderabad",

  // ABOUT
  "/about/dr-pranendra-singh"
];

async function testUrl(url) {
  const fullUrl = `http://localhost:3000${url}`;
  try {
    const res = await fetch(fullUrl, { redirect: 'manual' });
    let location = res.headers.get('location') || '';
    return {
      url,
      status: res.status,
      location,
      ok: res.status === 200 || (res.status >= 300 && res.status < 400)
    };
  } catch (err) {
    return { url, status: 'ERROR', error: err.message };
  }
}

async function run() {
  console.log(`Auditing ${MARKETING_URLS.length} Marketing URLs against http://localhost:3000...\n`);
  const results = [];
  for (const u of MARKETING_URLS) {
    const res = await testUrl(u);
    results.push(res);
    console.log(`${res.status.toString().padEnd(4)} | ${res.url} ${res.location ? '-> ' + res.location : ''}`);
  }
  
  const notFound = results.filter(r => r.status === 404);
  const ok200 = results.filter(r => r.status === 200);
  const redirects = results.filter(r => r.status >= 300 && r.status < 400);
  
  console.log(`\nSummary: Total: ${results.length}, 200 OK: ${ok200.length}, Redirects: ${redirects.length}, 404s: ${notFound.length}`);
}

run();
