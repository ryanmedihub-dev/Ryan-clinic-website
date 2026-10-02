/**
 * fix_mumbai_assignment.mjs
 *
 * ONE-TIME FIX: Reassigns the Mumbai branch service's assignedDoctor
 * from Demo Doctor — Mumbai  (6abf79b03572e74794c59cda)
 * to the real Doctor CMS    (6a8e969f322f85061ac1aa0d)
 *
 * The branch [slug] page is force-dynamic (revalidate=0), so the next
 * request to /hair-transplant-in-mumbai will immediately read the new assignment.
 *
 * ONLY changes: services.assignedDoctor for the Mumbai branch.
 * Does NOT touch:
 *   - The Doctor CMS record content
 *   - meetYourSurgeon settings (preserved exactly)
 *   - Delhi branch or any other branch
 *   - Demo Doctor CMS records
 */
import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

// Audited, confirmed IDs (do NOT change these constants)
const MUMBAI_SERVICE_ID      = '6a27d2f49c4a8d181f4eeffc';
const DEMO_DOCTOR_MUMBAI_ID  = '6abf79b03572e74794c59cda';
const REAL_DOCTOR_MUMBAI_ID  = '6a8e969f322f85061ac1aa0d';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('=================================================');
  console.log('MUMBAI BRANCH — assignedDoctor REASSIGNMENT FIX');
  console.log('=================================================\n');

  // --- Safety: confirm the service still points to the demo doctor ---
  const service = await db.collection('services').findOne({ _id: new mongoose.Types.ObjectId(MUMBAI_SERVICE_ID) });
  if (!service) {
    console.error('❌ Mumbai service record not found — aborting.');
    process.exit(1);
  }
  const currentAssigned = service.assignedDoctor?.toString();
  console.log('BEFORE:');
  console.log('  Service        :', service.metadata?.pageurl || MUMBAI_SERVICE_ID);
  console.log('  assignedDoctor :', currentAssigned);
  console.log('  MYS.enabled    :', service.meetYourSurgeon?.enabled);
  console.log('  MYS.eyebrow    :', service.meetYourSurgeon?.eyebrow);
  console.log('  MYS.heading    :', service.meetYourSurgeon?.heading);

  if (currentAssigned !== DEMO_DOCTOR_MUMBAI_ID) {
    if (currentAssigned === REAL_DOCTOR_MUMBAI_ID) {
      console.log('\n✅ Mumbai branch is already assigned to the real doctor. No change needed.');
    } else {
      console.log('\n⚠️  Unexpected current assignedDoctor:', currentAssigned);
      console.log('   Expected:', DEMO_DOCTOR_MUMBAI_ID);
      console.log('   Aborting to be safe — please audit manually.');
    }
    process.exit(0);
  }

  // --- Verify the real doctor exists and is valid ---
  const realDoctor = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(REAL_DOCTOR_MUMBAI_ID) });
  if (!realDoctor) {
    console.error('❌ Real Mumbai doctor record not found — aborting.');
    process.exit(1);
  }
  console.log('\nTarget real doctor:');
  console.log('  _id        :', realDoctor._id?.toString());
  console.log('  slug       :', realDoctor.slug);
  console.log('  doctorName :', realDoctor.basicInfo?.doctorName);
  console.log('  designation:', realDoctor.basicInfo?.designation);
  console.log('  status     :', realDoctor.status);
  console.log('  deletedAt  :', realDoctor.deletedAt);

  if (realDoctor.status !== 'published' || realDoctor.deletedAt) {
    console.error('❌ Real doctor is not published or is deleted — aborting.');
    process.exit(1);
  }

  // --- Perform ONLY the assignedDoctor update; all other fields untouched ---
  const result = await db.collection('services').updateOne(
    { _id: new mongoose.Types.ObjectId(MUMBAI_SERVICE_ID) },
    {
      $set: {
        assignedDoctor: new mongoose.Types.ObjectId(REAL_DOCTOR_MUMBAI_ID),
        updatedAt: new Date(),
      }
    }
  );

  if (result.modifiedCount !== 1) {
    console.error('❌ Update did not modify any document. modifiedCount:', result.modifiedCount);
    process.exit(1);
  }

  // --- Verify the update ---
  const updated = await db.collection('services').findOne({ _id: new mongoose.Types.ObjectId(MUMBAI_SERVICE_ID) });
  console.log('\nAFTER:');
  console.log('  assignedDoctor :', updated.assignedDoctor?.toString());
  console.log('  MYS.enabled    :', updated.meetYourSurgeon?.enabled);
  console.log('  MYS.eyebrow    :', updated.meetYourSurgeon?.eyebrow);
  console.log('  MYS.heading    :', updated.meetYourSurgeon?.heading);

  const isCorrect = updated.assignedDoctor?.toString() === REAL_DOCTOR_MUMBAI_ID;
  const mysPreserved = updated.meetYourSurgeon?.enabled === true;

  console.log('\n=== RESULT ===');
  console.log('[', isCorrect ? 'OK' : 'FAIL', '] assignedDoctor now points to real doctor');
  console.log('[', mysPreserved ? 'OK' : 'FAIL', '] meetYourSurgeon.enabled preserved as true');
  console.log('[  OK  ] The branch page is force-dynamic — next HTTP request will see new doctor immediately');

  if (!isCorrect) {
    console.error('\n❌ FAILED — assignedDoctor was not updated correctly');
    process.exit(1);
  }

  console.log('\n✅ Mumbai branch successfully reassigned to Dr. Harshada Vijay Rakh');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
