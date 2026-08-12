const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Load Env
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
        const req = http.get(`http://localhost:3000${urlPath}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        });
        req.on('error', reject);
    });
}

async function runFullAudit() {
    console.log('====================================================');
    console.log('STARTING AUTOMATED DOCTORS MODULE QA & DOM AUDIT');
    console.log('====================================================\n');

    // 1. Fetch Delhi Page HTML
    console.log('1. Fetching /doctors/hair-transplant-doctor-in-delhi...');
    const delhiRes = await fetchUrl('/doctors/hair-transplant-doctor-in-delhi');
    console.log(' - Status:', delhiRes.statusCode);

    const html = delhiRes.body;

    // Heading Extract
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h4Matches = [...html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    console.log('\n--- DOM HEADING AUDIT ---');
    console.log('H1 Count:', h1Matches.length);
    console.log('H1 Text:', h1Matches);
    console.log('\nH2 Headings (Total:', h2Matches.length, '):');
    h2Matches.forEach((h, i) => console.log(`  [H2-${i+1}] ${h}`));
    console.log('\nH3 Headings (Total:', h3Matches.length, '):');
    h3Matches.slice(0, 10).forEach((h, i) => console.log(`  [H3-${i+1}] ${h}`));

    // SEO Metadata Extract
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["']/i);
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([\s\S]*?)["']/i);

    console.log('\n--- SEO METADATA ---');
    console.log(' Title:', titleMatch ? titleMatch[1].trim() : 'NOT FOUND');
    console.log(' Meta Description:', descMatch ? descMatch[1].trim() : 'NOT FOUND');
    console.log(' Canonical URL:', canonicalMatch ? canonicalMatch[1].trim() : 'NOT FOUND');
    console.log(' Robots:', robotsMatch ? robotsMatch[1].trim() : 'NOT FOUND');

    // JSON-LD Extract
    const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    console.log('\n--- JSON-LD STRUCTURED DATA ---');
    console.log(' Total JSON-LD Script Blocks:', jsonLdMatches.length);
    jsonLdMatches.forEach((m, i) => {
        try {
            const parsed = JSON.parse(m[1]);
            if (Array.isArray(parsed)) {
                console.log(` Block #${i+1}: Array containing types ->`, parsed.map(p => p['@type']));
            } else {
                console.log(` Block #${i+1}: Type ->`, parsed['@type']);
            }
        } catch (e) {
            console.log(` Block #${i+1}: Raw Text (Parse Error)`);
        }
    });

    // 2. City Isolation Checks
    console.log('\n--- CITY ISOLATION TESTS ---');
    const mumbaiRes = await fetchUrl('/doctors/hair-transplant-doctor-in-mumbai');
    console.log(' Mumbai Page Status:', mumbaiRes.statusCode);
    const hydRes = await fetchUrl('/doctors/hair-transplant-doctor-in-hyderabad');
    console.log(' Hyderabad Page Status:', hydRes.statusCode);

    // 3. Legacy Redirect Checks
    console.log('\n--- LEGACY REDIRECT CHECKS ---');
    const legacyDelhi = await fetchUrl('/hair-transplant-doctor-in-delhi');
    console.log(' /hair-transplant-doctor-in-delhi Status:', legacyDelhi.statusCode, '| Location:', legacyDelhi.headers.location);
    
    // 4. Invalid Slug Check
    console.log('\n--- INVALID SLUG TEST ---');
    const invalidRes = await fetchUrl('/doctors/invalid-doctor-slug-check');
    console.log(' /doctors/invalid-doctor-slug-check Status:', invalidRes.statusCode);

    // 5. Unsupported Claims Audit
    console.log('\n--- HARDCODED / UNSUPPORTED CLAIMS CHECK ---');
    const claimsToSearch = ['₹40,000', '₹50,000', '0% EMI', '10,000+ patients', '7,500+', '100% graft survival', '98.4%', '95%', '0% infection', 'guaranteed density'];
    claimsToSearch.forEach(claim => {
        const found = html.includes(claim);
        console.log(` Claim "${claim}":`, found ? 'FOUND IN DOM (Check if CMS or Hardcoded)' : 'CLEAN (Not found in DOM)');
    });

    console.log('\n====================================================');
    console.log('AUTOMATED CHECK COMPLETED');
    console.log('====================================================');
}

runFullAudit().catch(err => { console.error(err); process.exit(1); });
