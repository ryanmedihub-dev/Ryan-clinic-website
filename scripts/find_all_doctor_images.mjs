import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const collections = ['doctors', 'surgeons', 'surgeonpages', 'services', 'users', 'gallery'];
  for (const c of collections) {
    try {
      const docs = await db.collection(c).find({}).toArray();
      console.log(`\n=== Collection: ${c} (${docs.length} docs) ===`);
      for (const d of docs) {
        const str = JSON.stringify(d);
        if (str.toLowerCase().includes('pranendra') || str.toLowerCase().includes('doctor') || str.toLowerCase().includes('profileimage')) {
          // Find all image urls in this doc
          const images = str.match(/["'](?:https?:\/\/[^"']+|\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi) || [];
          const uniqueImages = [...new Set(images)];
          console.log(`Doc ID: ${d._id}, Slug/Title: ${d.slug || d.title || d.pageName || d.name}, Name: ${d.basicInfo?.doctorName || d.name}`);
          console.log('  Images found:', uniqueImages);
          if (d.basicInfo?.profileImage) {
            console.log('  basicInfo.profileImage:', d.basicInfo.profileImage);
          }
          if (d.profileImage) {
            console.log('  profileImage:', d.profileImage);
          }
        }
      }
    } catch (e) {
      console.log(`Collection ${c} error:`, e.message);
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
