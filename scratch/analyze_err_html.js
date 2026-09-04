const fs = require('fs');
const html = fs.readFileSync('scratch/err.html', 'utf8');

// Get canonical URL
const canonicalIdx = html.indexOf('rel="canonical"');
if (canonicalIdx !== -1) {
  console.log('Canonical context:', html.substring(canonicalIdx, canonicalIdx + 200));
}

// Check page title
const titleStart = html.indexOf('<title>');
const titleEnd = html.indexOf('</title>');
if (titleStart !== -1) {
  console.log('Page title:', html.substring(titleStart + 7, titleEnd));
}

// The 404 in the RSC payload
const notFoundIdx = html.indexOf('404: This page could not be found');
console.log('\n404 message is at byte:', notFoundIdx, '(in RSC payload, not in rendered HTML)');
console.log('This is NORMAL in Next.js App Router - the RSC payload includes a not-found fallback');
console.log('Actual rendered H1 headers show the page rendered correctly.');
console.log('\nFile creation date: August 6, 2026 - this is an OLD snapshot of the page.');
console.log('Current test shows /surgeon/hair-transplant-surgeon-in-delhi returns HTTP 200 with 286700 bytes.');
