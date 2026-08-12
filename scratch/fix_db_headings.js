const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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

async function updateHeadings() {
    await mongoose.connect(process.env.MONGO_URL || process.env.MONGODB_URI);
    const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({}, { strict: false }), 'doctors');
    await Doctor.updateOne(
        { slug: 'hair-transplant-doctor-in-delhi' },
        { $set: { 'surgeonProfile.heading': 'Meet Dr. Pranendra Singh — Hair Restoration Surgeon in Delhi' } }
    );
    console.log('Heading updated in DB');
    await mongoose.disconnect();
}

updateHeadings().catch(console.error);
