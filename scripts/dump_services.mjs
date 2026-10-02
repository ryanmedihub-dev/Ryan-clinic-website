import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('=== All documents in `services` collection ===\n');
  const all = await db.collection('services').find({}).project({
    _id: 1, pageName: 1, slug: 1, assignedDoctor: 1, 'meetYourSurgeon.enabled': 1,
    'basicInfo.city': 1
  }).toArray();

  for (const s of all) {
    const city = s.basicInfo?.city || '—';
    const ad = s.assignedDoctor?.toString() || 'null';
    const mys = s.meetYourSurgeon?.enabled ?? '—';
    console.log(`  slug: ${s.slug || '—'} | city: ${city} | assignedDoctor: ${ad} | MYS: ${mys}`);
    console.log(`    pageName: ${s.pageName || '—'}`);
  }

  // Also check if services uses a different field structure
  const sample = await db.collection('services').findOne({});
  if (sample) {
    console.log('\n=== Sample service document keys ===');
    console.log(Object.keys(sample).join(', '));
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
