import mongoose from 'mongoose';
import Services from '../src/models/services.js';
import Blog from '../src/models/blog.js';
import CostPage from '../src/models/CostPage.js';
import Doctors from '../src/models/Doctors.js';
import SurgeonPage from '../src/models/SurgeonPage.js';
import SurgeryPage from '../src/models/surgeryPage.js';
import HairFallPage from '../src/models/hairFallPage.js';
import Gallery from '../src/models/gallery.js';

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected to DB');
  
  const services = await Services.find({}, 'metadata.pageurl metadata.pageType metadata.pageName').lean();
  console.log('\n=== SERVICES (Count: ' + services.length + ') ===');
  services.forEach(s => console.log(`[${s.metadata?.pageType}] /${s.metadata?.pageurl} ("${s.metadata?.pageName}")`));
  
  const blogs = await Blog.find({}, 'pageUrl blogTitle pageTitle').lean();
  console.log('\n=== BLOGS (Count: ' + blogs.length + ') ===');
  blogs.forEach(b => console.log(`/blog/${b.pageUrl} ("${b.pageTitle || b.blogTitle}")`));
  
  const costs = await CostPage.find({ 'settings.isDeleted': { $ne: true } }, 'slug title pageType').lean();
  console.log('\n=== COST PAGES (Count: ' + costs.length + ') ===');
  costs.forEach(c => console.log(`/cost/${c.slug} ("${c.title}") [type: ${c.pageType}]`));
  
  const doctors = await Doctors.find({ 'settings.isDeleted': { $ne: true } }, 'slug title name').lean();
  console.log('\n=== DOCTORS (Count: ' + doctors.length + ') ===');
  doctors.forEach(d => console.log(`/doctors/${d.slug} ("${d.name || d.title}")`));
  
  const surgeons = await SurgeonPage.find({ 'settings.isDeleted': { $ne: true } }, 'slug title name').lean();
  console.log('\n=== SURGEONS (Count: ' + surgeons.length + ') ===');
  surgeons.forEach(s => console.log(`/surgeon/${s.slug} ("${s.name || s.title}")`));
  
  const surgeries = await SurgeryPage.find({ 'settings.isDeleted': { $ne: true } }, 'slug title').lean();
  console.log('\n=== SURGERIES (Count: ' + surgeries.length + ') ===');
  surgeries.forEach(s => console.log(`/surgery/${s.slug} ("${s.title}")`));

  const hairfall = await HairFallPage.find({ 'settings.isDeleted': { $ne: true } }, 'slug title').lean();
  console.log('\n=== HAIR FALL (Count: ' + hairfall.length + ') ===');
  hairfall.forEach(h => console.log(`/treatments/${h.slug} ("${h.title}")`));
  
  await mongoose.disconnect();
}
main().catch(err => console.error(err));
