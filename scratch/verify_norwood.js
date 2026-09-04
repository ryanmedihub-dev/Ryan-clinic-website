const fs = require('fs');

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

async function test() {
  await mongoose.connect(process.env.MONGO_URL);
  const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({}, { strict: false }));

  const blog = await Blog.findOne({ pageUrl: 'norwood-2-grafts-cost-india' }).lean();
  console.log('Found by clean slug:', !!blog);
  if (blog) {
    console.log('ID:', blog._id);
    console.log('pageUrl:', blog.pageUrl);
    console.log('pageTitle:', blog.pageTitle);
    console.log('blogTitle:', blog.blogTitle);
    console.log('metaTitle:', blog.metaTitle);
    console.log('Content length:', blog.blogContent.length);
  }
  await mongoose.disconnect();
}

test().catch(console.error);
