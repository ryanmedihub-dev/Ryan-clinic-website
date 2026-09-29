const testUrls = [
  { name: '1. Published Delhi', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-delhi', expectStatus: 200 },
  { name: '2. Published Mumbai', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-mumbai', expectStatus: 200 },
  { name: '3. Published Gurgaon', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-gurgaon', expectStatus: 200 },
  { name: '4. Draft Hyderabad', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-hyderabad', expectStatus: 404 },
  { name: '5. Draft Bangalore', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-banglore', expectStatus: 404 },
  { name: '6. Draft Chennai', url: 'http://localhost:3000/surgeon/hair-transplant-surgeon-in-chennai', expectStatus: 404 }
];

async function run() {
  console.log('Testing Surgeon URLs:');
  for (const t of testUrls) {
    const res = await fetch(t.url);
    const html = await res.text();
    const hasRobotsIndexFollow = html.includes('content="index, follow"') || html.includes('content="index,follow"');
    const hasDraftTitle = html.includes('Best Hair Transplant Surgeon in Hyderabad') || 
                          html.includes('Best Hair Transplant Surgeon in Bangalore') || 
                          html.includes('Best Hair Transplant Surgeon in Chennai');
    const isNotFoundPage = html.includes('404') || html.includes('could not be found') || res.status === 404;
    console.log(`${t.name}:`);
    console.log(`  HTTP Status: ${res.status} (Expected: ${t.expectStatus})`);
    console.log(`  Is 404/Not-Found: ${isNotFoundPage}`);
    console.log(`  Emits 'robots: index, follow': ${hasRobotsIndexFollow}`);
    console.log(`  Leaks Draft Content/Title: ${hasDraftTitle}`);
    console.log('---');
  }
}

run().catch(console.error);
