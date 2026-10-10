import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // List all collections
  const colls = await db.listCollections().toArray();
  console.log('All collections:', colls.map(c => c.name).join(', '));

  // Try to find Mumbai in any collection that might be "services"
  for (const coll of colls) {
    if (coll.name === 'services' || coll.name === 'pages' || coll.name.includes('service') || coll.name.includes('branch') || coll.name.includes('page')) {
      const count = await db.collection(coll.name).countDocuments();
      const sample = await db.collection(coll.name).findOne({ $or: [
        { slug: { $regex: /mumbai/i } },
        { pageName: { $regex: /mumbai/i } },
      ]});
      console.log(`\nCollection: ${coll.name} (${count} docs)`);
      if (sample) {
        console.log('  Found Mumbai record:', sample.pageName, '|', sample.slug);
        console.log('  assignedDoctor:', sample.assignedDoctor?.toString());
        console.log('  meetYourSurgeon:', JSON.stringify(sample.meetYourSurgeon));
      } else {
        console.log('  No Mumbai match');
      }
    }
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
