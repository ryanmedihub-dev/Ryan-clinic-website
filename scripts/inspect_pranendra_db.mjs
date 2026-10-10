import mongoose from 'mongoose';
import fs from 'fs';

const uri = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const allDocs = await db.collection('doctors').find({}).toArray();
  console.log(`Total doctors: ${allDocs.length}`);
  
  const pranendraDocs = allDocs.filter(d => 
    JSON.stringify(d).toLowerCase().includes('pranendra')
  );
  
  console.log(`Found ${pranendraDocs.length} docs matching Pranendra`);
  
  for (let i = 0; i < pranendraDocs.length; i++) {
    const doc = pranendraDocs[i];
    console.log(`Doc ${i}: id=${doc._id}, slug=${doc.slug}, name=${doc.basicInfo?.doctorName || doc.name}`);
    fs.writeFileSync(`pranendra_raw_${i}.json`, JSON.stringify(doc, null, 2));
  }
  
  // Also check branch page for Delhi to see what doctor is assigned
  const surgeryPages = await db.collection('surgerypages').find({ 'general.city': /delhi/i }).toArray();
  console.log(`Delhi surgerypages: ${surgeryPages.length}`);
  if (surgeryPages.length > 0) {
    console.log('Delhi assignedDoctor:', surgeryPages[0].assignedDoctor);
    console.log('Delhi meetYourSurgeon settings:', JSON.stringify(surgeryPages[0].sections?.meetYourSurgeon || surgeryPages[0].meetYourSurgeon, null, 2));
  }

  // Also check other collections
  const surgeonPages = await db.collection('surgeonpages').find({}).toArray();
  console.log(`Total surgeonpages: ${surgeonPages.length}`);
  for (const sp of surgeonPages) {
    if (JSON.stringify(sp).toLowerCase().includes('pranendra')) {
      console.log(`surgeonpages match: id=${sp._id}, slug=${sp.slug}, title=${sp.title}`);
      fs.writeFileSync(`surgeonpage_pranendra_${sp._id}.json`, JSON.stringify(sp, null, 2));
    }
  }

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
