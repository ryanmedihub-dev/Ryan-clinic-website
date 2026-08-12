const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

let envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) envPath = path.join(process.cwd(), '.env');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
            process.env[key] = val;
        }
    });
}

async function verifyAll() {
    console.log('Connecting to Mongo...');
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    
    const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({}, { strict: false }), 'doctors');
    const docs = await Doctor.find({});
    console.log(`\n========================================`);
    console.log(`FOUND ${docs.length} DOCTOR DOCUMENTS IN MONGODB`);
    console.log(`========================================\n`);
    
    for (const doc of docs) {
        console.log(`Doctor ID: ${doc._id}`);
        console.log(` - Slug: ${doc.slug}`);
        console.log(` - Page Name: ${doc.pageName}`);
        console.log(` - Doctor Name: ${doc.basicInfo?.doctorName}`);
        console.log(` - Designation: ${doc.basicInfo?.designation}`);
        console.log(` - City: ${doc.basicInfo?.city}`);
        console.log(` - Experience: ${doc.basicInfo?.yearsExperience}`);
        console.log(` - Procedures: ${doc.basicInfo?.proceduresCount}`);
        console.log(` - Rating: ${doc.basicInfo?.rating}`);
        console.log(` - Profile Image: ${doc.basicInfo?.profileImage?.image}`);
        console.log(` - SEO Title: ${doc.seo?.metaTitle}`);
        console.log(` - SEO Desc: ${doc.seo?.metaDescription}`);
        console.log(`----------------------------------------`);
    }
    
    await mongoose.disconnect();
}

verifyAll().catch(err => { console.error(err); process.exit(1); });
