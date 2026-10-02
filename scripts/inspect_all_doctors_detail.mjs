import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const docs = await db.collection('doctors').find({}).toArray();
  console.log(`Found ${docs.length} doctors:\n`);

  for (const d of docs) {
    console.log({
      id: String(d._id),
      name: d.basicInfo?.doctorName || d.name,
      slug: d.slug,
      city: d.city || d.basicInfo?.city || d.location?.city,
      designation: d.basicInfo?.designation || d.designation,
      status: d.status || d.basicInfo?.status || 'active',
      isPublished: d.isPublished,
      image: d.basicInfo?.profileImage?.image || d.profileImage?.image || d.image,
      qualifications: d.doctorCard?.qualifications || d.qualifications || [],
      certifications: d.doctorCard?.certifications || d.certifications || [],
      specializations: d.doctorCard?.specializations || d.specializations || [],
      bioSnippet: (d.doctorCard?.cardDescription || d.surgeonProfile?.about || '').substring(0, 100),
      badge: d.badge
    });
    console.log('----------------------------------------------------');
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
