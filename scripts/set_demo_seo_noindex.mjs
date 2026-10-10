import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('Setting seo.robots = "noindex, nofollow" for all demo-doctor-* profiles...\n');

  const result = await db.collection('doctors').updateMany(
    { slug: /^demo-doctor-/i },
    {
      $set: {
        'seo.robots': 'noindex, nofollow',
        updatedAt: new Date()
      }
    }
  );

  console.log(`Updated ${result.modifiedCount} demo doctor records.`);

  // Verify
  const demoDocs = await db.collection('doctors').find({ slug: /^demo-doctor-/i }).project({ slug: 1, 'seo.robots': 1 }).toArray();
  console.log('\nVerification:');
  demoDocs.forEach(d => {
    const ok = d.seo?.robots === 'noindex, nofollow';
    console.log(`  [${ok ? 'OK' : 'FAIL'}] ${d.slug} -> seo.robots: ${d.seo?.robots}`);
  });

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
