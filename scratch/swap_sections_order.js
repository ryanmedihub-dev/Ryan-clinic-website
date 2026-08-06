const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/(root)/surgeon/[slug]/SurgeonPageClient.js');
let content = fs.readFileSync(filePath, 'utf8');

// Find boundaries of DOCTOR INTRO SPOTLIGHT section
const spotlightStartMarker = '{/* ═══════════════════════════════════════════════════════════════\n                SECTION 12: DOCTOR INTRO SPOTLIGHT';
const spotlightEndMarker = '            </section>\n\n            {/* ═══════════════════════════════════════════════════════════════\n                SECTION 13: QUESTIONS TO ASK';

const spotlightStartIndex = content.indexOf(spotlightStartMarker);
const spotlightEndIndex = content.indexOf(spotlightEndMarker) + '            </section>\n\n'.length;

if (spotlightStartIndex === -1 || spotlightEndIndex === -1) {
    console.error('Could not locate spotlight block boundaries');
    process.exit(1);
}

const spotlightBlock = content.substring(spotlightStartIndex, spotlightEndIndex);

// Remove spotlight block from its current location
content = content.substring(0, spotlightStartIndex) + content.substring(spotlightEndIndex);

// Find insertion point for Spotlight (between SECTION 8: SKILL EVALUATION and SECTION 9: HAIRLINE ARTISTRY)
const hairlineArtistryMarker = '{/* ═══════════════════════════════════════════════════════════════\n                SECTION 9 (NEW): HAIRLINE ARTISTRY';
const hairlineArtistryIndex = content.indexOf(hairlineArtistryMarker);

if (hairlineArtistryIndex === -1) {
    console.error('Could not locate hairlineArtistry marker');
    process.exit(1);
}

// Insert spotlightBlock before hairlineArtistry
content = content.substring(0, hairlineArtistryIndex) + spotlightBlock + content.substring(hairlineArtistryIndex);

// Now handle COST & CONSULTATION block movement
const costStartMarker = '{/* ═══════════════════════════════════════════════════════════════\n                SECTION 11 (NEW): COST & CONSULTATION';
const costEndMarker = '            </section>\n\n            {/* ═══════════════════════════════════════════════════════════════\n                SECTION 12: DOCTOR INTRO SPOTLIGHT';

let costStartIndex = content.indexOf(costStartMarker);
let costEndIndex = content.indexOf(costEndMarker) + '            </section>\n\n'.length;

if (costStartIndex === -1) {
    // If spotlight was moved, costEndMarker might now be hairlineArtistryMarker
    const costEndMarkerAlt = '{/* ═══════════════════════════════════════════════════════════════\n                SECTION 13: QUESTIONS TO ASK';
    costEndIndex = content.indexOf(costEndMarkerAlt);
}

const costBlock = content.substring(costStartIndex, costEndIndex);

// Remove cost block from its current location
content = content.substring(0, costStartIndex) + content.substring(costEndIndex);

// Find insertion point for Cost (between PROCEDURES and VISITING OUR SURGEON / RELATED PAGES)
const proceduresEndMarker = '{/* Internal links + Location */}';
const proceduresEndIndex = content.indexOf(proceduresEndMarker);

if (proceduresEndIndex === -1) {
    console.error('Could not locate procedures end marker');
    process.exit(1);
}

// Insert costBlock before internal links/location block inside procedures section area or right after procedures grid
const proceduresGridEnd = content.indexOf('</div>\n                    </div>\n                </div>\n            </section>', proceduresEndIndex);
const insertCostIndex = proceduresGridEnd + '</div>\n                    </div>\n                </div>\n            </section>\n\n'.length;

content = content.substring(0, insertCostIndex) + costBlock + content.substring(insertCostIndex);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Successfully reordered Spotlight (H2 07) and Cost (H2 13) sections in SurgeonPageClient.js');
