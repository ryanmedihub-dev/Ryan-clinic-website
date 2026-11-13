import mongoose from 'mongoose';
await mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection.db;

const ids = [
  new mongoose.Types.ObjectId('6a43b46fc0b91e7042a967a1'),
  new mongoose.Types.ObjectId('6ab76a00ec199976d0bcd596'),
  new mongoose.Types.ObjectId('6ab765dcec199976d0bcd49a')
];

const services = await db.collection('services').find({ _id: { $in: ids } }).toArray();

services.forEach(s => {
  console.log('--- Service Document ---');
  console.log('ID:', s._id.toString());
  console.log('URL:', s.metadata?.pageurl);
  console.log('PageName:', s.metadata?.pageName);
  console.log('Top-level status:', s.status);
  console.log('metadata.status:', s.metadata?.status);
  console.log('isDeleted:', s.isDeleted);
  console.log('deletedAt:', s.deletedAt);
  console.log('extraFields:', s.extraFields);
  console.log('createdAt:', s.createdAt);
  console.log('updatedAt:', s.updatedAt);
});

// Also check all 26 services to see if any other document is draft or deleted or duplicate
const all26Ids = JSON.parse(await import('fs').then(f => f.readFileSync('scratch/db_graft_candidates.json', 'utf8')))
  .filter(d => d.collection === 'services')
  .map(d => new mongoose.Types.ObjectId(d.id));

const allServices = await db.collection('services').find({ _id: { $in: all26Ids } }).project({
  _id: 1,
  'metadata.pageurl': 1,
  'metadata.pageName': 1,
  status: 1,
  'metadata.status': 1,
  isDeleted: 1,
  deletedAt: 1
}).toArray();

console.log('\n--- All 26 Services Status Check ---');
allServices.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s._id}] ${s.metadata?.pageurl} | status: ${s.status || s.metadata?.status || 'N/A'} | deleted: ${s.deletedAt || s.isDeleted || false}`);
});

// Check doctors collection for copies or drafts
const all14DocIds = JSON.parse(await import('fs').then(f => f.readFileSync('scratch/db_graft_candidates.json', 'utf8')))
  .filter(d => d.collection === 'doctors')
  .map(d => new mongoose.Types.ObjectId(d.id));

const allDocs = await db.collection('doctors').find({ _id: { $in: all14DocIds } }).project({
  _id: 1,
  slug: 1,
  status: 1,
  deletedAt: 1,
  isDeleted: 1,
  'basicInfo.doctorName': 1
}).toArray();

console.log('\n--- All 14 Doctors Status Check ---');
allDocs.forEach((d, idx) => {
  console.log(`${idx + 1}. [${d._id}] ${d.slug} | status: ${d.status} | deleted: ${d.deletedAt || d.isDeleted || false}`);
});

await mongoose.disconnect();

