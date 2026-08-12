const http = require('http');

function getPage(urlPath) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:3000${urlPath}`, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => resolve(body));
        }).on('error', reject);
    });
}

async function findLeakage() {
    const mumbaiBody = await getPage('/doctors/hair-transplant-doctor-in-mumbai');
    console.log('--- Pitampura occurrences in Mumbai Page ---');
    mumbaiBody.split('<').forEach(tag => {
        if (tag.toLowerCase().includes('pitampura')) {
            console.log(' Tag:', tag.substring(0, 100).trim());
        }
    });

    const delhiBody = await getPage('/doctors/hair-transplant-doctor-in-delhi');
    console.log('\n--- Mumbai occurrences in Delhi Page ---');
    delhiBody.split('<').forEach(tag => {
        if (tag.toLowerCase().includes('mumbai')) {
            console.log(' Tag:', tag.substring(0, 100).trim());
        }
    });
}

findLeakage().catch(console.error);
