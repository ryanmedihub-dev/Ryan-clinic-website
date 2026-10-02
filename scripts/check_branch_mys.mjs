import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const branches = await db.collection('services').find({
    $or: [
      { 'metadata.pageType': 'branch' },
      { pageType: 'branch' }
    ]
  }).toArray();

  for (const b of branches) {
    const slug = b.metadata?.pageurl || b.pageurl || b.slug;
    console.log(`[${slug}]`);
    console.log(`  assignedDoctor: ${b.assignedDoctor || 'null'}`);
    console.log(`  meetYourSurgeon: ${JSON.stringify(b.meetYourSurgeon)}`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
