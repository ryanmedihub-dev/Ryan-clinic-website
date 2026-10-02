import mongoose from 'mongoose';
import fs from 'fs';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const branchServices = await db.collection('services').find({
    $or: [
      { 'metadata.pageType': 'branch' },
      { pageType: 'branch' }
    ]
  }).toArray();

  const allDoctors = await db.collection('doctors').find({}).toArray();
  const docMapById = {};
  const docMapByCity = {};
  const docMapBySlug = {};

  for (const d of allDoctors) {
    docMapById[String(d._id)] = d;
    const city = (d.city || d.basicInfo?.city || d.location?.city || '').toLowerCase();
    if (city) {
      if (!docMapByCity[city]) docMapByCity[city] = [];
      docMapByCity[city].push(d);
    }
    if (d.slug) {
      docMapBySlug[d.slug] = d;
    }
  }

  console.log(`Auditing ${branchServices.length} branch services...\n`);

  const results = [];

  for (const b of branchServices) {
    const slug = b.metadata?.pageurl || b.pageurl || b.slug;
    const name = b.name || b.serviceName || b.pageName || slug;
    
    // Extract city name from slug or branch name
    // e.g. hair-transplant-in-delhi -> delhi
    const cityMatch = slug.match(/hair-transplant-in-([a-z-]+)/i);
    const rawCity = cityMatch ? cityMatch[1].replace(/-copy(-\d+)?$/i, '') : '';
    const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);

    const assignedId = b.assignedDoctor ? String(b.assignedDoctor) : null;
    const assignedDoc = assignedId ? docMapById[assignedId] : null;

    // Check meetYourSurgeon.enabled
    let enabled = false;
    if (b.meetYourSurgeon && typeof b.meetYourSurgeon.enabled === 'boolean') {
      enabled = b.meetYourSurgeon.enabled;
    }

    // Check if live page renders OurDoctorSection
    let rendersLive = false;
    try {
      const res = await fetch(`http://localhost:3000/${slug}`);
      if (res.ok) {
        const html = await res.text();
        rendersLive = html.includes('data-debug-section="meet-your-surgeon"') || html.includes('Meet Your Hair Transplant');
      }
    } catch (e) {
      rendersLive = false;
    }

    // Check if suitable published/active doctor exists in CMS
    // Look up by city in doctor CMS
    const matchingDocs = docMapByCity[rawCity.toLowerCase()] || [];
    // Also look for doctor with slug `hair-transplant-doctor-in-${rawCity}`
    const matchingSlugDoc = docMapBySlug[`hair-transplant-doctor-in-${rawCity.toLowerCase()}`];
    
    let suitableDoc = null;
    if (matchingSlugDoc && (matchingSlugDoc.status === 'published' || matchingSlugDoc.basicInfo?.status === 'published')) {
      suitableDoc = matchingSlugDoc;
    } else if (matchingDocs.length > 0) {
      suitableDoc = matchingDocs.find(d => d.status === 'published' || d.basicInfo?.status === 'published') || matchingDocs[0];
    }

    results.push({
      branchName: name,
      cityName,
      slug: `/${slug}`,
      assignedDoctorId: assignedId,
      assignedDoctorName: assignedDoc ? (assignedDoc.basicInfo?.doctorName || assignedDoc.name) : 'NONE',
      assignedDoctorSlug: assignedDoc?.slug || null,
      meetYourSurgeonEnabled: enabled,
      currentlyRendersOurDoctorSection: rendersLive,
      suitableDoctorInCMS: suitableDoc ? {
        id: String(suitableDoc._id),
        name: suitableDoc.basicInfo?.doctorName || suitableDoc.name,
        slug: suitableDoc.slug,
        city: suitableDoc.city || suitableDoc.basicInfo?.city,
        status: suitableDoc.status || suitableDoc.basicInfo?.status
      } : null,
      meetYourSurgeonConfig: b.meetYourSurgeon || null
    });
  }

  fs.writeFileSync('branch_audit_report.json', JSON.stringify(results, null, 2));

  console.log('=== BRANCH AUDIT SUMMARY TABLE ===\n');
  console.log('| Branch Name | Slug | Assigned Doctor | meetYourSurgeon.enabled | Renders Live? | Doctor in CMS? |');
  console.log('|---|---|---|---|---|---|');
  for (const r of results) {
    const docCMS = r.suitableDoctorInCMS ? `${r.suitableDoctorInCMS.name} (${r.suitableDoctorInCMS.slug})` : 'NONE';
    console.log(`| ${r.branchName} | ${r.slug} | ${r.assignedDoctorName} | ${r.meetYourSurgeonEnabled} | ${r.currentlyRendersOurDoctorSection} | ${docCMS} |`);
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
