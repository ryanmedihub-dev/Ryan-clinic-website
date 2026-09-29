// scripts/run-surgeon-tests.mjs
// Quick smoke test: draft pages return 404, published Gurgaon is accessible
import http from "http";

const BASE = "http://localhost:3000";

function get(path) {
  return new Promise((resolve) => {
    const req = http.get(`${BASE}${path}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", (e) => resolve({ status: 0, error: e.message }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 0, error: "timeout" }); });
  });
}

async function main() {
  const tests = [
    // Draft pages — should return 404 (not found)
    { path: "/surgeon/hair-transplant-surgeon-in-jammu", expectedStatus: 404, desc: "Draft Jammu → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-dehradun", expectedStatus: 404, desc: "Draft Dehradun → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-ahmedabad", expectedStatus: 404, desc: "Draft Ahmedabad → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-banglore", expectedStatus: 404, desc: "Draft Bangalore → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-hyderabad", expectedStatus: 404, desc: "Draft Hyderabad → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-chennai", expectedStatus: 404, desc: "Draft Chennai → 404" },
    { path: "/surgeon/hair-transplant-surgeon-in-pune", expectedStatus: 404, desc: "Draft Pune → 404" },
    // Published pages — should be accessible (200)
    { path: "/surgeon/hair-transplant-surgeon-in-gurgaon", expectedStatus: 200, desc: "Published Gurgaon → 200" },
    { path: "/surgeon/hair-transplant-surgeon-in-delhi", expectedStatus: 200, desc: "Published Delhi → 200" },
    { path: "/surgeon/hair-transplant-surgeon-in-mumbai", expectedStatus: 200, desc: "Published Mumbai → 200" },
  ];

  let pass = 0, fail = 0;

  for (const t of tests) {
    const res = await get(t.path);
    const ok = res.status === t.expectedStatus;
    console.log(`${ok ? "✓ PASS" : "✗ FAIL"} [${res.status}] ${t.desc}`);
    if (!ok) {
      console.log(`       expected: ${t.expectedStatus}, got: ${res.status}`);
      if (res.error) console.log(`       error: ${res.error}`);
    }
    ok ? pass++ : fail++;
  }

  console.log(`\nResults: ${pass} PASS / ${fail} FAIL`);
  if (fail > 0) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
