import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const allServices = await db.collection('services').find({}).toArray();
  console.log(`Total services: ${allServices.length}`);
  
  for (const s of allServices) {
    const slug = s.metadata?.pageurl || s.pageurl || s.slug;
    const pageType = s.metadata?.pageType || s.pageType;
    console.log(`ID: ${s._id} | Slug: ${slug} | pageType: ${pageType} | assignedDoctor: ${s.assignedDoctor || 'NONE'}`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
