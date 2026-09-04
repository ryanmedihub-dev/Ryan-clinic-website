const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envFile = fs.existsSync('.env.local') ? '.env.local' : (fs.existsSync('.env') ? '.env' : null);
  if (!envFile) return;
  const content = fs.readFileSync(envFile, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

loadEnv();

const mongoose = require('mongoose');

async function run() {
  const url = process.env.MONGO_URL;
  if (!url) {
    console.error('No MONGO_URL found in env');
    process.exit(1);
  }
  await mongoose.connect(url);
  console.log('Connected to DB');

  const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));
  
  // Find the blog
  const targetId = '6a9967c31e7407ad02b30e0b';
  const blog = await Blog.findById(targetId);

  if (!blog) {
    console.error('Blog not found by ID:', targetId);
    process.exit(1);
  }

  console.log('BEFORE UPDATE:');
  console.log('  ID:', blog._id);
  console.log('  pageUrl:', blog.pageUrl);
  console.log('  pageTitle:', blog.pageTitle);
  console.log('  blogTitle:', blog.blogTitle);
  console.log('  content length:', blog.blogContent?.length);

  // Update pageUrl to clean slug using updateOne $set
  const cleanSlug = 'norwood-2-grafts-cost-india';
  
  const updateRes = await Blog.updateOne(
    { _id: new mongoose.Types.ObjectId(targetId) },
    { $set: { pageUrl: cleanSlug } }
  );
  console.log('Update result:', updateRes);

  console.log('\nAFTER UPDATE:');
  const updated = await Blog.findById(targetId).lean();
  console.log('  ID:', updated._id);
  console.log('  pageUrl:', updated.pageUrl);
  console.log('  pageTitle:', updated.pageTitle);
  console.log('  blogTitle:', updated.blogTitle);
  console.log('  content length:', updated.blogContent?.length);
  console.log('  SUCCESSFULLY UPDATED TO CLEAN SLUG!');

  await mongoose.disconnect();
}

run().catch(console.error);
