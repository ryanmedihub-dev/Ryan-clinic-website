import mongoose from 'mongoose';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

const DEMO_CONFIG = [
  { city: 'Mumbai', slugPattern: /mumbai/i, doctorSlug: 'demo-doctor-mumbai' },
  { city: 'Hyderabad', slugPattern: /hyderabad/i, doctorSlug: 'demo-doctor-hyderabad' },
  { city: 'Bangalore', slugPattern: /bangalore/i, doctorSlug: 'demo-doctor-bangalore' },
  { city: 'Chennai', slugPattern: /chennai/i, doctorSlug: 'demo-doctor-chennai' },
  { city: 'Pune', slugPattern: /pune/i, doctorSlug: 'demo-doctor-pune' },
  { city: 'Kolkata', slugPattern: /kolkata/i, doctorSlug: 'demo-doctor-kolkata' },
  { city: 'Ahmedabad', slugPattern: /ahmedabad/i, doctorSlug: 'demo-doctor-ahmedabad' },
  { city: 'Lucknow', slugPattern: /lucknow/i, doctorSlug: 'demo-doctor-lucknow' },
  { city: 'Jammu', slugPattern: /jammu/i, doctorSlug: 'demo-doctor-jammu' },
  { city: 'Patna', slugPattern: /patna/i, doctorSlug: 'demo-doctor-patna' },
  { city: 'Gurgaon', slugPattern: /gurgaon/i, doctorSlug: 'demo-doctor-gurgaon' },
  { city: 'Noida', slugPattern: /noida/i, doctorSlug: 'demo-doctor-noida' },
  { city: 'Bhopal', slugPattern: /bhopal/i, doctorSlug: 'demo-doctor-bhopal' },
  { city: 'Indore', slugPattern: /indore/i, doctorSlug: 'demo-doctor-indore' },
  { city: 'Chandigarh', slugPattern: /chandigarh/i, doctorSlug: 'demo-doctor-chandigarh' },
  { city: 'Ranchi', slugPattern: /rach|ranchi/i, doctorSlug: 'demo-doctor-ranchi' },
  { city: 'Dehradun', slugPattern: /dehradun/i, doctorSlug: 'demo-doctor-dehradun' },
  { city: 'Jaipur', slugPattern: /jaipur/i, doctorSlug: 'demo-doctor-jaipur' },
  { city: 'Nagpur', slugPattern: /nagpur/i, doctorSlug: 'demo-doctor-nagpur' },
];

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  console.log('Connected to MongoDB.');

  // Find all branch services
  const branchServices = await db.collection('services').find({
    $or: [
      { 'metadata.pageType': 'branch' },
      { pageType: 'branch' },
      { 'metadata.pageurl': /hair-transplant-in-/i }
    ]
  }).toArray();

  console.log(`Found ${branchServices.length} total branch services in database.\n`);

  for (const item of DEMO_CONFIG) {
    const { city, slugPattern, doctorSlug } = item;

    // Find the corresponding service
    const service = branchServices.find(s => {
      const url = s.metadata?.pageurl || s.pageurl || s.slug || '';
      return slugPattern.test(url) && !/delhi/i.test(url);
    });

    if (!service) {
      console.error(`❌ Could not find service matching city: ${city} (pattern: ${slugPattern})`);
      continue;
    }

    const branchSlug = service.metadata?.pageurl || service.pageurl || service.slug;

    // Safety checks: Never touch Delhi or duplicate copies
    if (/delhi/i.test(branchSlug)) {
      console.log(`⚠️ Skipping Delhi branch: ${branchSlug}`);
      continue;
    }

    // 1. Create or update Demo Doctor profile in Doctor CMS
    const demoDoctorName = `Demo Doctor — ${city}`;
    const demoDoctorData = {
      slug: doctorSlug,
      pageName: demoDoctorName,
      schemaVersion: 1,
      isActive: true,
      deletedAt: null,
      status: 'published',
      displayOrder: 99,
      featured: false,
      basicInfo: {
        doctorName: demoDoctorName,
        designation: 'Doctor Profile Pending',
        city: city,
        yearsExperience: 0,
        proceduresCount: 0,
        successRate: '',
        rating: 0,
        phoneNumber: '',
        whatsappNumber: '',
        email: '',
        clinicName: '',
        clinicAddress: '',
        languages: [],
        profileImage: {}
      },
      doctorCard: {
        shortQualification: '',
        cardDescription: 'Doctor profile information will be added by the clinic administrator.',
        qualifications: [],
        certifications: [],
        specializations: []
      },
      hero: {
        title: '',
        description: '',
        stats: []
      },
      credentials: {
        tabs: []
      },
      surgeonProfile: {
        about: '',
        achievements: [],
        specializations: []
      },
      updatedAt: new Date()
    };

    let doctorId;
    const existingDoc = await db.collection('doctors').findOne({ slug: doctorSlug });
    if (existingDoc) {
      await db.collection('doctors').updateOne(
        { _id: existingDoc._id },
        { $set: demoDoctorData }
      );
      doctorId = existingDoc._id;
      console.log(`[Doctor CMS] Updated existing demo doctor: ${demoDoctorName} (${doctorSlug}) -> _id: ${doctorId}`);
    } else {
      demoDoctorData.createdAt = new Date();
      const insertRes = await db.collection('doctors').insertOne(demoDoctorData);
      doctorId = insertRes.insertedId;
      console.log(`[Doctor CMS] Created new demo doctor: ${demoDoctorName} (${doctorSlug}) -> _id: ${doctorId}`);
    }

    // 2. Assign to Branch and Enable meetYourSurgeon
    const currentMys = service.meetYourSurgeon || {};
    const updatedMys = {
      enabled: true,
      eyebrow: currentMys.eyebrow?.trim() || `YOUR SURGEON IN ${city.toUpperCase()}`,
      heading: currentMys.heading?.trim() || 'Meet Your Hair Transplant Surgeon',
      badgeText: '', // Explicitly empty — DO NOT USE "Board Certified" or "Turkey Certified"
      consultationButtonLabel: currentMys.consultationButtonLabel?.trim() || 'Book Consultation',
      profileButtonLabel: currentMys.profileButtonLabel?.trim() || 'View Full Profile'
    };

    await db.collection('services').updateOne(
      { _id: service._id },
      {
        $set: {
          assignedDoctor: doctorId,
          meetYourSurgeon: updatedMys,
          updatedAt: new Date()
        }
      }
    );

    console.log(`[Branch Assigned] ${branchSlug} -> Doctor: ${demoDoctorName}, meetYourSurgeon.enabled = true\n`);
  }

  console.log('Finished creating demo doctors and assigning to all 19 branches.');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error in main:', err);
  process.exit(1);
});
