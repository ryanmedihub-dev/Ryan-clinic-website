const fs = require('fs');
const txt = fs.readFileSync('src/models/Surgeon.js', 'utf8');
const m = txt.match(/model\s*\(\s*['"](\w+)['"]/);
console.log('Model name:', m ? m[1] : 'NOT FOUND');

// Also show the last few lines to see the export
const lines = txt.split('\n');
lines.slice(-10).forEach((l, i) => console.log((lines.length - 10 + i + 1) + ': ' + l));
