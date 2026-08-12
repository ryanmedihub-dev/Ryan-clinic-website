const http = require('http');
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

function fetchUrl(urlPath) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${urlPath}`, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        }).on('error', reject);
    });
}

async function runNestedCrudAndCityTests() {
    console.log('Connecting to Mongo...');
    const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);

    const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', new mongoose.Schema({}, { strict: false }), 'doctors');

    console.log('\n====================================================');
    console.log('1. CREATING/VERIFYING MUMBAI AND HYDERABAD TEST DOCTORS');
    console.log('====================================================');

    // Mumbai Doctor
    let mumbaiDoc = await Doctor.findOne({ slug: 'hair-transplant-doctor-in-mumbai' });
    if (!mumbaiDoc) {
        mumbaiDoc = new Doctor({
            pageName: 'Hair Transplant Doctor in Mumbai — Dr. Aman Singh Gosain',
            slug: 'hair-transplant-doctor-in-mumbai',
            status: 'published',
            basicInfo: {
                doctorName: 'Dr. Aman Singh Gosain',
                designation: 'Senior Hair Restoration Surgeon',
                city: 'Mumbai',
                yearsExperience: 15,
                proceduresCount: 5000,
                rating: 4.9,
                clinicAddress: 'MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053',
            },
            seo: {
                metaTitle: 'Hair Transplant Doctor in Mumbai | Ryan Clinic',
                metaDescription: 'Top Hair Transplant Doctor in Mumbai at Ryan Clinic.',
                canonicalUrl: 'https://www.clinicryan.com/doctors/hair-transplant-doctor-in-mumbai'
            },
            visitClinic: {
                heading: 'Visiting Ryan Clinic in Andheri West, Mumbai',
                nearbyLocations: ['Andheri', 'Juhu', 'Lokhandwala', 'Bandra', 'Goregaon', 'Borivali'],
                informationCards: [{ title: 'Nearest Metro', description: 'Versova Metro Station', subtext: 'Line 1 (5 mins)' }]
            }
        });
        await mumbaiDoc.save();
        console.log(' Created Mumbai Doctor document: hair-transplant-doctor-in-mumbai');
    }

    // Hyderabad Doctor
    let hydDoc = await Doctor.findOne({ slug: 'hair-transplant-doctor-in-hyderabad' });
    if (!hydDoc) {
        hydDoc = new Doctor({
            pageName: 'Hair Transplant Doctor in Hyderabad — Dr. Himanshu Jawla',
            slug: 'hair-transplant-doctor-in-hyderabad',
            status: 'published',
            basicInfo: {
                doctorName: 'Dr. Himanshu Jawla',
                designation: 'Chief Hair Transplant Specialist',
                city: 'Hyderabad',
                yearsExperience: 12,
                proceduresCount: 4500,
                rating: 4.9,
                clinicAddress: '2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034',
            },
            seo: {
                metaTitle: 'Hair Transplant Doctor in Hyderabad | Ryan Clinic',
                metaDescription: 'Top Hair Transplant Doctor in Hyderabad at Ryan Clinic.',
                canonicalUrl: 'https://www.clinicryan.com/doctors/hair-transplant-doctor-in-hyderabad'
            },
            visitClinic: {
                heading: 'Visiting Ryan Clinic in Banjara Hills, Hyderabad',
                nearbyLocations: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Madhapur', 'Hitec City', 'Secunderabad'],
                informationCards: [{ title: 'Nearest Metro', description: 'Jubilee Hills Check Post Metro Station', subtext: 'Blue Line (3 mins)' }]
            }
        });
        await hydDoc.save();
        console.log(' Created Hyderabad Doctor document: hair-transplant-doctor-in-hyderabad');
    }

    console.log('\n====================================================');
    console.log('2. TESTING NESTED CMS STRUCTURE CRUD PERSISTENCE');
    console.log('====================================================');

    const testDoctor = await Doctor.findOne({ slug: 'hair-transplant-doctor-in-delhi' });

    // A. FAQ Array Test
    console.log('\nA. Testing FAQ Array CRUD...');
    const originalFaqs = testDoctor.faq?.faqs || [];
    const testFaq = { question: 'QA Test Question Unique ' + Date.now(), answer: 'QA Test Answer Verified' };
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "faq.faqs": [...originalFaqs, testFaq] } });
    let updatedDoc = await Doctor.findById(testDoctor._id);
    const faqFound = updatedDoc.faq?.faqs?.some(f => f.question === testFaq.question);
    console.log(' FAQ Added & Persisted in MongoDB:', faqFound ? 'PASS ✅' : 'FAIL ❌');
    // Restore
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "faq.faqs": originalFaqs } });

    // B. Pricing Packages Array Test
    console.log('\nB. Testing Pricing Packages Array CRUD...');
    const originalPackages = testDoctor.pricing?.packages || [];
    const testPkg = { title: 'QA Test Package ' + Date.now(), price: '₹55,000', subtitle: 'QA Premium' };
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "pricing.packages": [...originalPackages, testPkg] } });
    updatedDoc = await Doctor.findById(testDoctor._id);
    const pkgFound = updatedDoc.pricing?.packages?.some(p => p.title === testPkg.title);
    console.log(' Pricing Package Added & Persisted in MongoDB:', pkgFound ? 'PASS ✅' : 'FAIL ❌');
    // Restore
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "pricing.packages": originalPackages } });

    // C. Education / Credentials Tab Array Test
    console.log('\nC. Testing Credentials Tabs Array CRUD...');
    const originalTabs = testDoctor.credentials?.tabs || [];
    const testTab = { title: 'QA Fellowship Degree', hint: 'Verified', description: 'QA Description' };
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "credentials.tabs": [...originalTabs, testTab] } });
    updatedDoc = await Doctor.findById(testDoctor._id);
    const tabFound = updatedDoc.credentials?.tabs?.some(t => t.title === testTab.title);
    console.log(' Credentials Tab Added & Persisted in MongoDB:', tabFound ? 'PASS ✅' : 'FAIL ❌');
    // Restore
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "credentials.tabs": originalTabs } });

    // D. Information Cards Array Test
    console.log('\nD. Testing Visit Clinic Information Cards Array CRUD...');
    const originalCards = testDoctor.visitClinic?.informationCards || [];
    const testCard = { title: 'QA Metro Line', description: 'QA Station', subtext: '2 mins' };
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "visitClinic.informationCards": [...originalCards, testCard] } });
    updatedDoc = await Doctor.findById(testDoctor._id);
    const cardFound = updatedDoc.visitClinic?.informationCards?.some(c => c.title === testCard.title);
    console.log(' Information Card Added & Persisted in MongoDB:', cardFound ? 'PASS ✅' : 'FAIL ❌');
    // Restore
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "visitClinic.informationCards": originalCards } });

    // E. Nearby Locations Array Test
    console.log('\nE. Testing Nearby Locations Array CRUD...');
    const originalLocs = testDoctor.visitClinic?.nearbyLocations || [];
    const testLoc = 'QA Test Area ' + Date.now();
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "visitClinic.nearbyLocations": [...originalLocs, testLoc] } });
    updatedDoc = await Doctor.findById(testDoctor._id);
    const locFound = updatedDoc.visitClinic?.nearbyLocations?.includes(testLoc);
    console.log(' Nearby Location Added & Persisted in MongoDB:', locFound ? 'PASS ✅' : 'FAIL ❌');
    // Restore
    await Doctor.updateOne({ _id: testDoctor._id }, { $set: { "visitClinic.nearbyLocations": originalLocs } });

    console.log('\n====================================================');
    console.log('3. TESTING CITY ISOLATION (DELHI vs MUMBAI vs HYDERABAD)');
    console.log('====================================================');

    const delhiPage = await fetchUrl('/doctors/hair-transplant-doctor-in-delhi');
    const mumbaiPage = await fetchUrl('/doctors/hair-transplant-doctor-in-mumbai');
    const hydPage = await fetchUrl('/doctors/hair-transplant-doctor-in-hyderabad');

    console.log('\n--- DELHI PAGE VERIFICATION ---');
    console.log(' Status:', delhiPage.statusCode);
    console.log(' Contains "Pitampura" or "Delhi":', delhiPage.body.includes('Delhi') ? 'PASS ✅' : 'FAIL ❌');
    console.log(' Does NOT contain "Mumbai":', !delhiPage.body.includes('Mumbai') ? 'PASS ✅' : 'FAIL ❌');

    console.log('\n--- MUMBAI PAGE VERIFICATION ---');
    console.log(' Status:', mumbaiPage.statusCode);
    console.log(' Contains "Mumbai" or "Andheri":', (mumbaiPage.body.includes('Mumbai') || mumbaiPage.body.includes('Andheri')) ? 'PASS ✅' : 'FAIL ❌');
    console.log(' Does NOT contain "Pitampura":', !mumbaiPage.body.includes('Pitampura') ? 'PASS ✅' : 'FAIL ❌');
    console.log(' Cost Link Format:', mumbaiPage.body.includes('/cost/hair-transplant-cost-in-mumbai') ? 'PASS ✅' : 'FAIL ❌');

    console.log('\n--- HYDERABAD PAGE VERIFICATION ---');
    console.log(' Status:', hydPage.statusCode);
    console.log(' Contains "Hyderabad" or "Banjara Hills":', (hydPage.body.includes('Hyderabad') || hydPage.body.includes('Banjara Hills')) ? 'PASS ✅' : 'FAIL ❌');
    console.log(' Does NOT contain "Pitampura":', !hydPage.body.includes('Pitampura') ? 'PASS ✅' : 'FAIL ❌');
    console.log(' Cost Link Format:', hydPage.body.includes('/cost/hair-transplant-cost-in-hyderabad') ? 'PASS ✅' : 'FAIL ❌');

    await mongoose.disconnect();
    console.log('\n====================================================');
    console.log('ALL NESTED CRUD AND CITY ISOLATION TESTS COMPLETE');
    console.log('====================================================');
}

runNestedCrudAndCityTests().catch(err => { console.error(err); process.exit(1); });
