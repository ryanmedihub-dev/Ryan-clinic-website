import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const docs = await db.collection('doctors').find({}).toArray();
  const pranendraDocs = docs.filter(d => 
    (d.basicInfo?.doctorName && /Pranendra/i.test(d.basicInfo.doctorName)) ||
    (d.slug && /pranendra/i.test(d.slug)) ||
    (d.pageName && /Pranendra/i.test(d.pageName))
  );

  console.log(`Found ${pranendraDocs.length} doctor records for Dr. Pranendra Singh:\n`);

  for (const doc of pranendraDocs) {
    console.log(`=======================================================`);
    console.log(`DOCTOR ID: ${doc._id}`);
    console.log(`Slug: ${doc.slug}`);
    console.log(`Status: ${doc.status}, Deleted: ${doc.deletedAt}`);
    console.log(`Doctor Name: ${doc.basicInfo?.doctorName}`);
    console.log(`Designation: ${doc.basicInfo?.designation}`);
    console.log(`Profile Image:`, doc.basicInfo?.profileImage);
    console.log(`Badge: ${doc.badge}`);
    console.log(`Stats:`, {
      yearsExperience: doc.basicInfo?.yearsExperience,
      proceduresCount: doc.basicInfo?.proceduresCount,
      successRate: doc.basicInfo?.successRate,
      rating: doc.basicInfo?.rating
    });
    console.log(`Bio (doctorCard.cardDescription):`, doc.doctorCard?.cardDescription);
    console.log(`Bio (surgeonProfile.about):`, doc.surgeonProfile?.about);
    console.log(`doctorCard.qualifications:`, doc.doctorCard?.qualifications);
    console.log(`doctorCard.certifications:`, doc.doctorCard?.certifications);
    console.log(`doctorCard.specializations:`, doc.doctorCard?.specializations);
    console.log(`credentials.tabs (first 2):`, (doc.credentials?.tabs || []).slice(0, 2));
    console.log(`keyFacts:`, {
      qualifications: doc.keyFacts?.qualifications,
      registration: doc.keyFacts?.registration,
      specialisation: doc.keyFacts?.specialisation
    });
    console.log(`=======================================================\n`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
