const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(root)/surgeon/[slug]/SurgeonPageClient.js');
let content = fs.readFileSync(filePath, 'utf8');

// Locate Cost section
const costAnchor = 'pageData?.costConsultation?.heading';
const costAnchorIdx = content.indexOf(costAnchor);

const costStart = content.lastIndexOf('<section className="py-16 md:py-24 bg-[#fff5ec]', costAnchorIdx);
const costEnd = content.indexOf('</section>', costAnchorIdx) + '</section>\n\n'.length;

const costBlock = content.substring(costStart, costEnd);

// Remove cost section
content = content.substring(0, costStart) + content.substring(costEnd);

// Locate Visit section
const visitAnchor = 'pageData?.visitSurgeon?.heading';
const visitAnchorIdx = content.indexOf(visitAnchor);

const visitStart = content.lastIndexOf('<div className="bg-white p-6 rounded-2xl border border-gray-100">', visitAnchorIdx);

// Insert costBlock BEFORE visit section area inside procedures or before visit
content = content.substring(0, visitStart) + costBlock + content.substring(visitStart);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully placed Cost (H2 13) before Visit (H2 14)');
