import fs from 'fs';

async function testAll() {
  const xml = fs.readFileSync('marketing-sitemap.xml', 'utf8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());

  console.log(`Auditing ${urls.length} URLs from marketing-sitemap.xml against http://localhost:3000...\n`);

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const fullUrl = urls[i];
    const pathname = fullUrl.replace('https://www.clinicryan.com', '');
    const localUrl = `http://localhost:3000${pathname || '/'}`;

    try {
      const res = await fetch(localUrl, { redirect: 'manual' });
      const status = res.status;
      const location = res.headers.get('location') || '-';

      results.push({
        num: i + 1,
        url: pathname || '/',
        status,
        location,
        is200: status === 200,
        isRedirect: status >= 300 && status < 400
      });

      console.log(`[${i + 1}/${urls.length}] ${status === 200 ? '✓ 200' : status >= 300 && status < 400 ? '→ ' + status + ' (to ' + location + ')' : '✗ ' + status} | ${pathname || '/'}`);
    } catch (err) {
      results.push({
        num: i + 1,
        url: pathname || '/',
        status: 'ERR',
        location: '-',
        is200: false,
        isRedirect: false
      });
      console.log(`[${i + 1}/${urls.length}] ✗ ERR | ${pathname || '/'} (${err.message})`);
    }
  }

  const count200 = results.filter(r => r.is200).length;
  const countRedir = results.filter(r => r.isRedirect).length;
  const count404 = results.filter(r => r.status === 404).length;
  const countErr = results.filter(r => r.status === 'ERR' || (r.status >= 500)).length;

  console.log('\n' + '='.repeat(60));
  console.log(`SUMMARY: Total: ${urls.length} | 200 OK: ${count200} | Redirects: ${countRedir} | 404: ${count404} | Errors: ${countErr}`);
  console.log('='.repeat(60));

  if (count404 > 0 || countRedir > 0 || countErr > 0) {
    console.log('\nNon-200 URLs:');
    results.filter(r => !r.is200).forEach(r => {
      console.log(`- [${r.status}] ${r.url} ${r.location !== '-' ? '-> ' + r.location : ''}`);
    });
  }
}

testAll().catch(console.error);
