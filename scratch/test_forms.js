const http = require('http');

function postForm(urlPath, payload) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(payload);
        const req = http.request(`http://localhost:3000${urlPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, res => {
            let resData = '';
            res.on('data', chunk => resData += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: resData }));
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function testLeadForms() {
    console.log('====================================================');
    console.log('TESTING PUBLIC LEAD FORM POST SUBMISSIONS');
    console.log('====================================================\n');

    // Test 1: /api/leads
    console.log('1. Posting test submission to /api/leads...');
    const leadsRes = await postForm('/api/leads', {
        name: 'QA Test Visitor',
        phone: '9898989898',
        email: 'testingproplus3@gmail.com',
        service: 'Hair Transplant (Sapphire FUE)',
        message: 'QA Form Submission Test'
    });
    console.log(' -> Status:', leadsRes.statusCode);
    console.log(' -> Body:', leadsRes.body);
    console.log(' -> Result:', leadsRes.statusCode === 200 ? 'PASS ✅ (No 401 Unauthorized)' : 'FAIL ❌');

    // Test 2: /api/book-consult
    console.log('\n2. Posting test submission to /api/book-consult...');
    const consultRes = await postForm('/api/book-consult', {
        name: 'QA Test Visitor',
        phone: '9898989898',
        email: 'testingproplus3@gmail.com',
        city: 'Delhi',
        notes: 'QA Book Consult Test'
    });
    console.log(' -> Status:', consultRes.statusCode);
    console.log(' -> Body:', consultRes.body);
    console.log(' -> Result:', consultRes.statusCode === 200 ? 'PASS ✅ (No 401 Unauthorized)' : 'FAIL ❌');

    // Test 3: Unauthenticated Admin write attempt should STILL return 401
    console.log('\n3. Testing unauthenticated POST to /api/surgery/create (Admin API)...');
    const adminRes = await postForm('/api/surgery/create', { title: 'Unauthorized Test' });
    console.log(' -> Status:', adminRes.statusCode);
    console.log(' -> Body:', adminRes.body);
    console.log(' -> Result:', adminRes.statusCode === 401 ? 'PASS ✅ (Admin API safely blocked with 401)' : 'FAIL ❌');

    console.log('\n====================================================');
    console.log('FORM SUBMISSION INTEGRITY TEST COMPLETE');
    console.log('====================================================');
}

testLeadForms().catch(console.error);
