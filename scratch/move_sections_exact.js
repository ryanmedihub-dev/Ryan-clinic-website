const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(root)/surgeon/[slug]/SurgeonPageClient.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Locate Spotlight block using pageData?.spotlightTitle
const spotlightAnchor = 'pageData?.spotlightTitle';
const spotlightAnchorIdx = content.indexOf(spotlightAnchor);

if (spotlightAnchorIdx === -1) {
    console.error('Could not find spotlightAnchor');
    process.exit(1);
}

// Search backwards for <section className="bg-gradient-to-br
const spotlightStart = content.lastIndexOf('<section className="bg-gradient-to-br', spotlightAnchorIdx);
// Search forwards for </section>
const spotlightEnd = content.indexOf('</section>', spotlightAnchorIdx) + '</section>\n\n'.length;

const spotlightBlock = content.substring(spotlightStart, spotlightEnd);

// Remove spotlight block
content = content.substring(0, spotlightStart) + content.substring(spotlightEnd);

// 2. Locate Cost block using pageData?.costConsultation?.heading
const costAnchor = 'pageData?.costConsultation?.heading';
const costAnchorIdx = content.indexOf(costAnchor);

if (costAnchorIdx === -1) {
    console.error('Could not find costAnchor');
    process.exit(1);
}

// Search backwards for <section className="py-16 md:py-24 bg-[#fff5ec]
const costStart = content.lastIndexOf('<section className="py-16 md:py-24 bg-[#fff5ec]', costAnchorIdx);
// Search forwards for </section>
const costEnd = content.indexOf('</section>', costAnchorIdx) + '</section>\n\n'.length;

const costBlock = content.substring(costStart, costEnd);

// Remove cost block
content = content.substring(0, costStart) + content.substring(costEnd);

// 3. Insert Spotlight Block right before HAIRLINE ARTISTRY section
const hairlineAnchor = 'pageData?.hairlineArtistry?.heading';
const hairlineAnchorIdx = content.indexOf(hairlineAnchor);
const hairlineStart = content.lastIndexOf('<section className="py-16 md:py-24 bg-[#fff5ec]', hairlineAnchorIdx);

content = content.substring(0, hairlineStart) + spotlightBlock + content.substring(hairlineStart);

// 4. Insert Cost Block right after PROCEDURES section
const proceduresAnchor = 'pageData?.procedures?.heading';
const proceduresAnchorIdx = content.indexOf(proceduresAnchor);
const proceduresEnd = content.indexOf('</section>', proceduresAnchorIdx) + '</section>\n\n'.length;

content = content.substring(0, proceduresEnd) + costBlock + content.substring(proceduresEnd);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully reordered Spotlight (H2 07) and Cost (H2 13) blocks in SurgeonPageClient.js');
