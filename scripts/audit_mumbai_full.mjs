import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('=================================================');
  console.log('FULL AUDIT — Mumbai Branch Doctor Assignment');
  console.log('=================================================\n');

  // --- 1. Find the Mumbai branch by metadata.pageurl ---
  const service = await db.collection('services').findOne({
    'metadata.pageurl': 'hair-transplant-in-mumbai'
  });

  if (!service) {
    // Try a case-insensitive search
    const all = await db.collection('services').find({ 'metadata.pageurl': { $exists: true } }).project({ '_id': 1, 'metadata.pageurl': 1, 'assignedDoctor': 1, 'meetYourSurgeon': 1 }).toArray();
    console.log('All services with metadata.pageurl:');
    all.forEach(s => {
      const ad = s.assignedDoctor?.toString() || 'null';
      console.log(`  ${s.metadata?.pageurl} | assignedDoctor: ${ad} | MYS: ${s.meetYourSurgeon?.enabled}`);
    });
    console.log('\n❌ Could not find hair-transplant-in-mumbai directly');
    process.exit(1);
  }

  console.log('--- Mumbai Branch Service Record ---');
  console.log('_id              :', service._id?.toString());
  console.log('metadata.pageurl :', service.metadata?.pageurl);
  console.log('assignedDoctor   :', service.assignedDoctor?.toString() || 'null');
  console.log('MYS.enabled      :', service.meetYourSurgeon?.enabled);
  console.log('MYS settings     :', JSON.stringify(service.meetYourSurgeon, null, 2));

  // --- 2. Resolve currently assigned doctor ---
  const assignedId = service.assignedDoctor;
  let assignedDoctor = null;
  if (assignedId) {
    assignedDoctor = await db.collection('doctors').findOne({ _id: new mongoose.Types.ObjectId(assignedId.toString()) });
  }

  console.log('\n--- Currently Assigned Doctor ---');
  if (assignedDoctor) {
    console.log('_id        :', assignedDoctor._id?.toString());
    console.log('pageName   :', assignedDoctor.pageName);
    console.log('slug       :', assignedDoctor.slug);
    console.log('doctorName :', assignedDoctor.basicInfo?.doctorName);
    console.log('status     :', assignedDoctor.status);
    console.log('deletedAt  :', assignedDoctor.deletedAt);
    console.log('isActive   :', assignedDoctor.isActive);
  } else {
    console.log('null (no assigned doctor)');
  }

  // --- 3. Actual Mumbai Doctor CMS record ---
  const realDoctor = await db.collection('doctors').findOne({ slug: 'hair-transplant-doctor-in-mumbai' });

  console.log('\n--- Actual Mumbai Doctor CMS (hair-transplant-doctor-in-mumbai) ---');
  if (realDoctor) {
    console.log('_id        :', realDoctor._id?.toString());
    console.log('pageName   :', realDoctor.pageName);
    console.log('slug       :', realDoctor.slug);
    console.log('doctorName :', realDoctor.basicInfo?.doctorName);
    console.log('designation:', realDoctor.basicInfo?.designation);
    console.log('status     :', realDoctor.status);
    console.log('deletedAt  :', realDoctor.deletedAt);
    console.log('isActive   :', realDoctor.isActive);
    console.log('bio snippet:', realDoctor.sections?.about?.substring(0, 100) || realDoctor.doctorCard?.shortBio?.substring(0, 100) || '(empty)');
    console.log('qualifications:', JSON.stringify(realDoctor.sections?.qualifications || realDoctor.credentials?.qualifications));
    console.log('certifications:', JSON.stringify(realDoctor.sections?.certifications || realDoctor.credentials?.certifications));
  } else {
    console.log('❌ hair-transplant-doctor-in-mumbai NOT FOUND');
  }

  // --- 4. Cross-ref: is demo doctor involved? ---
  const demoDoctor = await db.collection('doctors').findOne({ slug: 'demo-doctor-mumbai' });
  console.log('\n--- Demo Doctor — Mumbai (for cross-check) ---');
  if (demoDoctor) {
    console.log('_id :', demoDoctor._id?.toString());
    console.log('slug:', demoDoctor.slug);
    console.log('name:', demoDoctor.basicInfo?.doctorName);
  }

  // --- 5. Verdict ---
  console.log('\n=== VERDICT ===');
  if (!assignedDoctor) {
    console.log('❌  Mumbai branch has NO assigned doctor');
  } else if (assignedDoctor.slug?.startsWith('demo-doctor')) {
    console.log('⚠️   Mumbai branch → STILL POINTING TO DEMO:', assignedDoctor.slug);
    if (realDoctor) {
      console.log('     Fix: update assignedDoctor from', assignedDoctor._id?.toString(), '→', realDoctor._id?.toString());
    }
  } else if (realDoctor && assignedDoctor._id?.toString() === realDoctor._id?.toString()) {
    console.log('✅  Mumbai branch already points to real Doctor CMS');
  } else {
    console.log('⚠️   Mumbai branch points to UNKNOWN doctor:', assignedDoctor.slug);
  }

  if (assignedDoctor && realDoctor) {
    console.log('\nAssigned ID :', assignedDoctor._id?.toString());
    console.log('Real Doc ID :', realDoctor._id?.toString());
    console.log('Same record?:', assignedDoctor._id?.toString() === realDoctor._id?.toString() ? 'YES ✅' : 'NO ❌ — REASSIGNMENT REQUIRED');
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
