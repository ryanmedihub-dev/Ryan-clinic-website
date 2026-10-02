import mongoose from 'mongoose';
import fs from 'fs';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const service = await db.collection('services').findOne({
    'metadata.pageurl': 'hair-transplant-in-delhi'
  });

  if (!service) {
    console.log('Service hair-transplant-in-delhi not found in services collection!');
    // search regex
    const allServices = await db.collection('services').find({}).toArray();
    console.log('Total services:', allServices.length);
    const matched = allServices.filter(s => s.metadata?.pageurl?.includes('delhi'));
    console.log('Matched services for delhi:', matched.map(m => ({ id: m._id, pageurl: m.metadata?.pageurl, assignedDoctor: m.assignedDoctor })));
  } else {
    console.log('Found service for hair-transplant-in-delhi:');
    console.log('Service ID:', service._id);
    console.log('assignedDoctor ID:', service.assignedDoctor);
    console.log('meetYourSurgeon settings:', JSON.stringify(service.meetYourSurgeon, null, 2));

    const doctorId = service.assignedDoctor;
    const doctorObjId = typeof doctorId === 'string' ? new mongoose.Types.ObjectId(doctorId) : doctorId;
    const doctor = await db.collection('doctors').findOne({ _id: doctorObjId });

    if (doctor) {
      console.log('Found assigned Doctor in doctors collection!');
      console.log('Doctor _id:', doctor._id);
      console.log('Doctor slug:', doctor.slug);
      console.log('Doctor name:', doctor.basicInfo?.doctorName);
      fs.writeFileSync('delhi_assigned_doctor.json', JSON.stringify(doctor, null, 2));
      console.log('Wrote delhi_assigned_doctor.json');
    } else {
      console.log('Doctor not found in doctors collection with id:', doctorId);
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
