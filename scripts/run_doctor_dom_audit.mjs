async function runAudit() {
  try {
    // 1. Check redirect status
    const resRedir = await fetch('http://localhost:3000/hair-transplant-doctor-in-delhi', { redirect: 'manual' });
    console.log('Redirect Status Code:', resRedir.status);
    console.log('Redirect Location:', resRedir.headers.get('location'));

    // 2. Fetch target doctor page
    const resDoc = await fetch('http://localhost:3000/doctors/hair-transplant-doctor-in-delhi');
    console.log('Doctor Page Status Code:', resDoc.status);
    const html = await resDoc.text();

    // 3. H1 Audit
    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log('\nH1 Count:', h1Matches.length);
    if (h1Matches.length > 0) {
      console.log('H1 Text:', h1Matches[0].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
    }

    // 4. Metadata Audit
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('\nMeta Title Tag:', titleMatch ? titleMatch[1] : 'NONE');

    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || html.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/i);
    console.log('Canonical Link:', canonicalMatch ? canonicalMatch[1] : 'NONE');

    const ogUrlMatch = html.match(/<meta[^>]*property="og:url"[^>]*content="([^"]+)"/i);
    console.log('OG URL:', ogUrlMatch ? ogUrlMatch[1] : 'NONE');

    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
    console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'NONE');

    const twitterCardMatch = html.match(/<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/i);
    console.log('Twitter Card:', twitterCardMatch ? twitterCardMatch[1] : 'NONE');

    // 5. Check for bad/unsupported claims
    const badClaims = ['0% EMI', '₹40,000', '100% Doctor-Led', '10,000+ patients'];
    const foundBad = badClaims.filter(claim => html.includes(claim));
    console.log('\nUnapproved/Bad Claims Found in HTML:', foundBad);

    // 6. Key facts section check
    console.log('\nVerified Key Facts Grid Rendered:', html.includes('Verified Doctor') && html.includes('DMC-68492'));

    // 7. Patient result center card check
    console.log('Fake Patient Result Image Present:', html.includes('/uploads/images/image2.jpg'));

    // 8. JSON-LD check
    console.log('JSON-LD Schema Present:', html.includes('application/ld+json') && html.includes('Physician'));

    process.exit(0);
  } catch (err) {
    console.error('Audit error:', err);
    process.exit(1);
  }
}

runAudit();
