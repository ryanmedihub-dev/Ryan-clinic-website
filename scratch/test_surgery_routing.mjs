import mongoose from 'mongoose';

const mongoUrl = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function runTests() {
  console.log('=== STARTING SURGERY ROUTING REGRESSION TESTS ===\n');

  // 1. Check Mumbai Root URL
  const mumbaiRes = await fetch('http://localhost:3000/hair-transplant-surgery-in-mumbai', { redirect: 'manual' });
  console.log('1. /hair-transplant-surgery-in-mumbai status:', mumbaiRes.status);
  const mumbaiHtml = await mumbaiRes.text();
  console.log('   Contains Mumbai content:', mumbaiHtml.includes('Best Hair Transplant Surgery in Mumbai') || mumbaiHtml.includes('Mumbai'));

  // 2. Check Delhi Root URL
  const delhiRes = await fetch('http://localhost:3000/hair-transplant-surgery-in-delhi', { redirect: 'manual' });
  console.log('2. /hair-transplant-surgery-in-delhi status:', delhiRes.status);

  // 3. Check Direct /surgery/hair-transplant-surgery-in-mumbai Request (Should 301 Redirect)
  const directSurgeryRes = await fetch('http://localhost:3000/surgery/hair-transplant-surgery-in-mumbai', { redirect: 'manual' });
  console.log('3. /surgery/hair-transplant-surgery-in-mumbai status:', directSurgeryRes.status);
  console.log('   Redirect location header:', directSurgeryRes.headers.get('location'));

  // 4. Check Invalid Root Surgery Slug (Should 404)
  const invalidRes = await fetch('http://localhost:3000/hair-transplant-surgery-in-nonexistent-city-999', { redirect: 'manual' });
  console.log('4. /hair-transplant-surgery-in-nonexistent-city-999 status:', invalidRes.status);

  // 5. Future City Test
  await mongoose.connect(mongoUrl);
  const db = mongoose.connection.db;

  const testSlug = 'hair-transplant-surgery-in-test-city';
  await db.collection('surgerypages').updateOne(
    { slug: testSlug },
    {
      $set: {
        pageName: 'Best Hair Transplant Surgery in Test City',
        city: 'Test City',
        slug: testSlug,
        status: 'published',
        isDeleted: false,
        seo: { metaTitle: 'Hair Surgery in Test City' },
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  const testCityRes = await fetch(`http://localhost:3000/${testSlug}`, { redirect: 'manual' });
  console.log('5. Future city test (/hair-transplant-surgery-in-test-city) status:', testCityRes.status);

  // Cleanup test record
  await db.collection('surgerypages').deleteOne({ slug: testSlug });
  console.log('   Cleaned up test city record from MongoDB.');

  // 6. Test Draft Document (Should 404)
  const draftSlug = 'hair-transplant-surgery-in-draft-test';
  await db.collection('surgerypages').updateOne(
    { slug: draftSlug },
    {
      $set: {
        pageName: 'Draft Surgery Page',
        city: 'Draft City',
        slug: draftSlug,
        status: 'draft',
        isDeleted: false,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  const draftRes = await fetch(`http://localhost:3000/${draftSlug}`, { redirect: 'manual' });
  console.log('6. Draft page protection (status draft) status:', draftRes.status);

  // Cleanup draft test record
  await db.collection('surgerypages').deleteOne({ slug: draftSlug });
  console.log('   Cleaned up draft test record from MongoDB.\n');

  console.log('=== REGRESSION TESTS COMPLETE ===');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Test script error:', err);
  process.exit(1);
});
