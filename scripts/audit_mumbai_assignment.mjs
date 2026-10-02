import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('=================================================');
  console.log('AUDIT — Mumbai Branch Doctor Assignment');
  console.log('=================================================\n');

  // --- 1. Find the Mumbai branch service record ---
  const service = await db.collection('services').findOne({
    $or: [
      { slug: 'hair-transplant-in-mumbai' },
      { pageName: { $regex: /mumbai/i } },
      { 'basicInfo.city': { $regex: /mumbai/i } },
    ]
  });

  if (!service) {
    console.log('❌ Mumbai service record NOT FOUND');
    process.exit(1);
  }

  console.log('--- Mumbai Branch Service Record ---');
  console.log('_id          :', service._id?.toString());
  console.log('pageName     :', service.pageName);
  console.log('slug         :', service.slug);
  console.log('assignedDoctor (raw):', service.assignedDoctor?.toString() || 'null/undefined');
  console.log('meetYourSurgeon.enabled:', service.meetYourSurgeon?.enabled);
  console.log('meetYourSurgeon settings:', JSON.stringify(service.meetYourSurgeon, null, 2));

  // --- 2. Resolve the currently assigned doctor ---
  const assignedId = service.assignedDoctor;
  let assignedDoctor = null;
  if (assignedId) {
    assignedDoctor = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(assignedId.toString()) });
  }

  console.log('\n--- Currently Assigned Doctor (via assignedDoctor) ---');
  if (assignedDoctor) {
    console.log('_id        :', assignedDoctor._id?.toString());
    console.log('pageName   :', assignedDoctor.pageName);
    console.log('slug       :', assignedDoctor.slug);
    console.log('doctorName :', assignedDoctor.basicInfo?.doctorName);
    console.log('status     :', assignedDoctor.status);
    console.log('deletedAt  :', assignedDoctor.deletedAt);
    console.log('isActive   :', assignedDoctor.isActive);
  } else {
    console.log('assignedDoctor: null (no doctor assigned or ObjectId not found)');
  }

  // --- 3. Find the ACTUAL Mumbai Doctor CMS record ---
  const realDoctor = await db.collection('doctors').findOne({ slug: 'hair-transplant-doctor-in-mumbai' });

  console.log('\n--- Actual Mumbai Doctor CMS Record (hair-transplant-doctor-in-mumbai) ---');
  if (realDoctor) {
    console.log('_id        :', realDoctor._id?.toString());
    console.log('pageName   :', realDoctor.pageName);
    console.log('slug       :', realDoctor.slug);
    console.log('doctorName :', realDoctor.basicInfo?.doctorName);
    console.log('designation:', realDoctor.basicInfo?.designation);
    console.log('status     :', realDoctor.status);
    console.log('deletedAt  :', realDoctor.deletedAt);
    console.log('isActive   :', realDoctor.isActive);
    console.log('qualifications:', JSON.stringify(realDoctor.sections?.qualifications));
    console.log('certifications:', JSON.stringify(realDoctor.sections?.certifications));
    console.log('bio (first 120 chars):', realDoctor.sections?.about?.substring(0, 120));
  } else {
    console.log('❌ hair-transplant-doctor-in-mumbai NOT FOUND in Doctor collection');
  }

  // --- 4. Verdict ---
  console.log('\n--- VERDICT ---');
  if (!assignedDoctor) {
    console.log('Mumbai branch has NO assigned doctor.');
  } else if (assignedDoctor.slug?.includes('demo-doctor')) {
    console.log('⚠️  Mumbai branch is STILL assigned to DEMO DOCTOR:', assignedDoctor.slug);
    console.log('   This must be updated to point to hair-transplant-doctor-in-mumbai.');
  } else if (realDoctor && assignedDoctor._id?.toString() === realDoctor._id?.toString()) {
    console.log('✅ Mumbai branch is ALREADY assigned to the real Doctor CMS record.');
  } else {
    console.log('⚠️  Mumbai branch is assigned to an UNEXPECTED doctor:', assignedDoctor.slug);
  }

  if (realDoctor && assignedDoctor) {
    const same = assignedDoctor._id?.toString() === realDoctor._id?.toString();
    console.log('\nAssigned _id  :', assignedDoctor._id?.toString());
    console.log('Real Doctor _id:', realDoctor._id?.toString());
    console.log('Are they the SAME record?', same ? '✅ YES' : '❌ NO — reassignment required');
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
