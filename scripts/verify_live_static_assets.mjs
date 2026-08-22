async function testStaticAssets() {
  const res = await fetch("http://localhost:3000");
  const html = await res.text();
  const scriptMatches = [...html.matchAll(/src="(\/_next\/static\/[^"]+)"/g)].map(m => m[1]);
  const linkMatches = [...html.matchAll(/href="(\/_next\/static\/[^"]+)"/g)].map(m => m[1]);
  
  const allAssets = [...new Set([...scriptMatches, ...linkMatches])];
  console.log(`Found ${allAssets.length} active static JS/CSS assets linked on homepage HTML:\n`);

  let pass = 0;
  for (const asset of allAssets) {
    const assetRes = await fetch(`http://localhost:3000${asset}`);
    const status = assetRes.status;
    const ok = status === 200;
    if (ok) pass++;
    console.log(`${ok ? '✓' : '✗'} [${status}] ${asset.slice(0, 70)}... (${assetRes.headers.get('content-type')})`);
  }

  console.log(`\nStatic Asset Verification: ${pass}/${allAssets.length} passing directly with 200 OK.`);
}

testStaticAssets().catch(console.error);
