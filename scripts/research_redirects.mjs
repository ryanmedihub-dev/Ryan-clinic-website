import mongoose from 'mongoose';
import Blog from '../src/models/blog.js';

await mongoose.connect(process.env.MONGO_URL);

// Check doctor-led vs technician article
const doctorLed = await Blog.findOne({ pageUrl: 'doctor-led-vs-technician-hair-transplant' }).select('_id blogTitle pageUrl createdAt').lean();
const turkey = await Blog.findOne({ pageUrl: 'turkey-india-which-is-best' }).select('_id blogTitle pageUrl createdAt').lean();

const citySlugs = [
  'hair-transplant-in-patna', 'hair-transplant-in-ahmedabad', 'hair-transplant-in-lucknow',
  'hair-transplant-in-chennai', 'hair-transplant-in-bangalore', 'hair-transplant-in-kolkata',
  'hair-transplant-in-jammu', 'hair-transplant-in-pune'
];
const cityBlogs = await Blog.find({ pageUrl: { $in: citySlugs } }).select('_id blogTitle pageUrl blogContent createdAt metaDiscription').lean();

// Also check FUT/PRP
const fut = await Blog.findOne({ $or: [
  { pageUrl: { $regex: /fut/i } },
  { blogTitle: { $regex: /fut/i } }
]}).select('_id blogTitle pageUrl').lean();

const prpMumbai = await Blog.findOne({ pageUrl: { $regex: /prp.*mumbai/i } }).select('_id blogTitle pageUrl').lean();

console.log('=== doctor-led article in DB ===');
console.log(JSON.stringify(doctorLed, null, 2));
console.log('=== turkey-india article ===');
console.log(JSON.stringify(turkey, null, 2));
console.log('=== city blog articles FOUND in DB ===');
cityBlogs.forEach(b => console.log(` FOUND: pageUrl=${b.pageUrl} | title=${b.blogTitle} | contentLen=${(b.blogContent||'').length}`));
console.log('=== city blog slugs NOT found in DB ===');
const found = cityBlogs.map(b => b.pageUrl);
citySlugs.filter(s => !found.includes(s)).forEach(s => console.log(` MISSING: ${s}`));
console.log('=== FUT blog ===');
console.log(JSON.stringify(fut, null, 2));
console.log('=== PRP Mumbai blog ===');
console.log(JSON.stringify(prpMumbai, null, 2));

await mongoose.disconnect();
