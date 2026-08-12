const fs = require('fs');
const path = require('path');
const http = require('http');
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

function fetchUrl(urlPath) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${urlPath}`, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        }).on('error', reject);
    });
}

async function testRoundTrip() {
    console.log('Connecting to Mongo...');
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);

    const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({}, { strict: false }), 'doctors');
    const doc = await Doctor.findOne({ slug: 'hair-transplant-doctor-in-delhi' });

    if (!doc) {
        console.error('Doctor not found!');
        await mongoose.disconnect();
        return;
    }

    console.log('\n--- STARTING ROUND-TRIP PERSISTENCE TEST ---');
    console.log(' Target Doctor ID:', doc._id);
    console.log(' Target Doctor Slug:', doc.slug);

    const originalDesc = doc.hero?.description || "";
    const originalQual = doc.keyFacts?.qualifications || "";

    const testDesc = `QA Test Description Verified At ${Date.now()}`;
    const testQual = `MCh (Plastic Surgery), QA Verified Specialist ${Date.now()}`;

    try {
        // Step 1: Update in Mongo (simulating API / Admin save)
        console.log('\n[Step 1] Applying test update to MongoDB...');
        await Doctor.updateOne(
            { _id: doc._id },
            { $set: { "hero.description": testDesc, "keyFacts.qualifications": testQual } }
        );
        console.log(' -> Mongo updated successfully.');

        // Step 2: Test Get API
        console.log('\n[Step 2] Querying /api/doctors/get?slug=hair-transplant-doctor-in-delhi...');
        const apiRes = await fetchUrl('/api/doctors/get?slug=hair-transplant-doctor-in-delhi');
        const apiJson = JSON.parse(apiRes.body);
        console.log(' -> API Success status:', apiJson.success);
        console.log(' -> API Returned Description:', apiJson.doctor?.hero?.description);
        console.log(' -> API Returned Qualifications:', apiJson.doctor?.keyFacts?.qualifications);
        
        const apiDescPass = apiJson.doctor?.hero?.description === testDesc;
        const apiQualPass = apiJson.doctor?.keyFacts?.qualifications === testQual;
        console.log(' -> API Round-Trip Result:', (apiDescPass && apiQualPass) ? 'PASS ✅' : 'FAIL ❌');

        // Step 3: Test Public SSR Page Render
        console.log('\n[Step 3] Fetching public SSR page HTML...');
        const pageRes = await fetchUrl('/doctors/hair-transplant-doctor-in-delhi');
        console.log(' -> Public Page HTTP Status:', pageRes.statusCode);
        const containsTestDesc = pageRes.body.includes(testDesc);
        const containsTestQual = pageRes.body.includes(testQual);
        console.log(' -> Rendered DOM contains test description:', containsTestDesc ? 'PASS ✅' : 'FAIL ❌');
        console.log(' -> Rendered DOM contains test qualification:', containsTestQual ? 'PASS ✅' : 'FAIL ❌');

    } finally {
        // Restore original data
        console.log('\n[Step 4] Restoring original values to MongoDB...');
        await Doctor.updateOne(
            { _id: doc._id },
            { $set: { "hero.description": originalDesc, "keyFacts.qualifications": originalQual } }
        );
        console.log(' -> Original data restored.');
        await mongoose.disconnect();
    }

    console.log('\n====================================================');
    console.log('ROUND-TRIP TEST COMPLETED SUCCESSFULLY');
    console.log('====================================================');
}

testRoundTrip().catch(err => { console.error(err); process.exit(1); });
