import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const docs = await db.collection('doctors').find({}).toArray();

  for (const d of docs) {
    console.log(`\n=== DOCTOR: ${d.basicInfo?.doctorName} (${d.slug}) [${d._id}] ===`);
    console.log('City:', d.city || d.basicInfo?.city);
    console.log('Designation:', d.basicInfo?.designation);
    console.log('Badge:', d.badge);
    console.log('Stats:', d.stats);
    console.log('KeyFacts:', d.keyFacts);
    console.log('DoctorCard:', d.doctorCard);
    console.log('SurgeonProfile (about snippet):', (d.surgeonProfile?.about || '').substring(0, 150));
    console.log('SurgeonProfile achievements:', d.surgeonProfile?.achievements);
    console.log('Credentials tabs:', d.credentials?.tabs?.map(t => `${t.title} / ${t.hint}`));
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
