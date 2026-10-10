import mongoose from 'mongoose';
import fs from 'fs';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const allServices = await db.collection('services').find({}).toArray();
  const branchServices = allServices.filter(s => 
    s.metadata?.pageType === 'branch' || 
    s.pageType === 'branch' ||
    (s.metadata?.pageurl && /hair-transplant-in-/i.test(s.metadata.pageurl))
  );

  const doctors = await db.collection('doctors').find({}).toArray();
  const docMap = {};
  for (const d of doctors) {
    docMap[String(d._id)] = d;
  }

  const report = [];
  for (const b of branchServices) {
    const slug = b.metadata?.pageurl || b.pageurl || b.slug;
    const assignedId = b.assignedDoctor ? String(b.assignedDoctor) : null;
    const doc = assignedId ? docMap[assignedId] : null;

    let sectionEnabled = false;
    if (b.meetYourSurgeon && typeof b.meetYourSurgeon.enabled === 'boolean') {
      sectionEnabled = b.meetYourSurgeon.enabled;
    } else if (b.pageSections) {
      const sections = Array.isArray(b.pageSections) ? b.pageSections : Object.values(b.pageSections);
      const doctorSec = sections.find(s => s?.sectionType === 'OurDoctorSection' || s?.id === 'our-doctor');
      if (doctorSec) {
        sectionEnabled = doctorSec.enabled !== false;
      }
    }

    report.push({
      id: String(b._id),
      branchName: b.name || b.serviceName || b.pageName || slug,
      slug: slug,
      pageType: b.metadata?.pageType || b.pageType || 'branch',
      assignedDoctorId: assignedId,
      assignedDoctorName: doc ? (doc.basicInfo?.doctorName || doc.name) : null,
      assignedDoctorSlug: doc ? doc.slug : null,
      meetYourSurgeon: b.meetYourSurgeon || null,
      meetYourSurgeonEnabled: sectionEnabled
    });
  }

  fs.writeFileSync('branch_audit_full.json', JSON.stringify(report, null, 2));
  console.log(`Saved branch_audit_full.json. Total branches: ${report.length}`);

  // Print a clean markdown-like table
  console.log('\n| Index | Branch Slug | Assigned Doctor ID | Assigned Doctor Name | meetYourSurgeon.enabled |');
  console.log('|---|---|---|---|---|');
  report.forEach((r, idx) => {
    console.log(`| ${idx + 1} | ${r.slug} | ${r.assignedDoctorId || 'NONE'} | ${r.assignedDoctorName || 'NONE'} | ${r.meetYourSurgeon?.enabled ?? r.meetYourSurgeonEnabled} |`);
  });

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
