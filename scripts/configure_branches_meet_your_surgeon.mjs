import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

function getCityFromSlug(slug) {
  const match = slug.match(/hair-transplant-in-([a-z-]+)/i);
  if (!match) return 'Your City';
  const raw = match[1].replace(/-copy(-\d+)?$/i, '');
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const branches = await db.collection('services').find({
    $or: [
      { 'metadata.pageType': 'branch' },
      { pageType: 'branch' }
    ]
  }).toArray();

  console.log(`Processing ${branches.length} branch services...\n`);

  for (const b of branches) {
    const slug = b.metadata?.pageurl || b.pageurl || b.slug;
    const city = getCityFromSlug(slug);

    if (slug === 'hair-transplant-in-delhi') {
      // Delhi branch has verified Dr. Pranendra Singh assigned
      const currentMys = b.meetYourSurgeon || {};
      const updatedMys = {
        enabled: true,
        eyebrow: currentMys.eyebrow?.trim() || `YOUR SURGEON IN ${city.toUpperCase()}`,
        heading: currentMys.heading?.trim() || "Meet Your Hair Transplant Surgeon",
        badgeText: currentMys.badgeText?.trim() || "Turkey Certified",
        consultationButtonLabel: currentMys.consultationButtonLabel?.trim() || "Book Consultation",
        profileButtonLabel: currentMys.profileButtonLabel?.trim() || "View Full Profile"
      };

      await db.collection('services').updateOne(
        { _id: b._id },
        { 
          $set: { 
            meetYourSurgeon: updatedMys,
            updatedAt: new Date()
          } 
        }
      );
      console.log(`✅ Configured Delhi branch (${slug}): meetYourSurgeon.enabled = true, doctor preserved (${b.assignedDoctor})`);
    } else {
      // Unassigned branches: assignedDoctor remains null, enabled = false, pre-populate default presentation settings
      const currentMys = b.meetYourSurgeon || {};
      const updatedMys = {
        enabled: false,
        eyebrow: currentMys.eyebrow?.trim() || `YOUR SURGEON IN ${city.toUpperCase()}`,
        heading: currentMys.heading?.trim() || "Meet Your Hair Transplant Surgeon",
        badgeText: currentMys.badgeText?.trim() || "",
        consultationButtonLabel: currentMys.consultationButtonLabel?.trim() || "Book Consultation",
        profileButtonLabel: currentMys.profileButtonLabel?.trim() || "View Full Profile"
      };

      await db.collection('services').updateOne(
        { _id: b._id },
        { 
          $set: { 
            assignedDoctor: null,
            meetYourSurgeon: updatedMys,
            updatedAt: new Date()
          } 
        }
      );
      console.log(`🔒 Secured branch (${slug}): assignedDoctor = null, meetYourSurgeon.enabled = false [Doctor assignment required]`);
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
