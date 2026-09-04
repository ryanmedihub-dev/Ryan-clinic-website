async function testRoutes() {
  const routes = [
    '/surgeon/hair-transplant-surgeon-in-delhi',
    '/blog/norwood-2-grafts-cost-india',
    '/admin/blogs',
    '/admin/blogs/edit/norwood-2-grafts-cost-india'
  ];

  for (const r of routes) {
    const url = 'http://localhost:3000' + r;
    try {
      const res = await fetch(url);
      console.log(`[${res.status}] ${r}`);
      if (!res.ok) {
        const txt = await res.text();
        console.log('   Error body preview:', txt.substring(0, 300));
      } else {
        const txt = await res.text();
        console.log(`   OK length: ${txt.length} bytes`);
      }
    } catch (err) {
      console.error(`FAILED ${r}:`, err.message);
    }
  }
}

testRoutes();
