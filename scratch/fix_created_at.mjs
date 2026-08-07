import mongoose from 'mongoose';

const mongoUrl = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function fixCreatedAt() {
  await mongoose.connect(mongoUrl);
  const db = mongoose.connection.db;

  const docs = await db.collection('surgerypages').find({}).toArray();
  for (const d of docs) {
    if (!d.createdAt) {
      const createdDate = d.updatedAt ? new Date(d.updatedAt) : new Date();
      await db.collection('surgerypages').updateOne(
        { _id: d._id },
        { $set: { createdAt: createdDate } }
      );
      console.log(`Updated createdAt for slug: ${d.slug} -> ${createdDate.toISOString()}`);
    }
  }

  process.exit(0);
}

fixCreatedAt().catch(err => {
  console.error(err);
  process.exit(1);
});
