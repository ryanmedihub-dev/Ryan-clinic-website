import fs from 'fs';

const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const matches = [...xml.matchAll(/<loc>(https:\/\/www\.clinicryan\.com)(.*?)<\/loc>/g)];
const urls = matches.map(m => m[2] || '/');

console.log(`Auditing ${urls.length} URLs in public/sitemap.xml against http://localhost:3000...\n`);

let pass = 0;
let fail = 0;
const failures = [];

for (let i = 0; i < urls.length; i++) {
  const path = urls[i];
  const localUrl = `http://localhost:3000${path}`;
  try {
    const res = await fetch(localUrl, { redirect: 'manual' });
    if (res.status === 200) {
      console.log(`✓ 200 DIRECT | [${i+1}/${urls.length}] ${path}`);
      pass++;
    } else {
      console.log(`✗ ${res.status} FAILED | [${i+1}/${urls.length}] ${path} (Location: ${res.headers.get('location')})`);
      fail++;
      failures.push({ path, status: res.status, location: res.headers.get('location') });
    }
  } catch (err) {
    console.log(`✗ ERROR | [${i+1}/${urls.length}] ${path} (${err.message})`);
    fail++;
    failures.push({ path, status: 'ERROR', error: err.message });
  }
}

console.log('\n' + '='.repeat(54));
console.log('SITEMAP AUDIT SUMMARY:');
console.log(`Total URLs Audited: ${urls.length}`);
console.log(`Passing (Direct 200): ${pass}`);
console.log(`Failing (Redirect / 404 / Error): ${fail}`);
console.log(`Success Rate: ${((pass / urls.length) * 100).toFixed(1)}%`);
console.log('='.repeat(54));

if (failures.length > 0) {
  console.log('\nFailures:', failures);
  process.exit(1);
} else {
  console.log('\nAll sitemap URLs return 200 OK directly with 0 redirects and 0 404s!');
}
