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
  
  const samples = await Blog.find({}).select('pageUrl pageTitle').limit(5).lean();
  console.log('Sample blogs:');
  samples.forEach(s => console.log('  pageUrl:', s.pageUrl, '| title:', s.pageTitle));

  await mongoose.disconnect();
}

run().catch(console.error);
