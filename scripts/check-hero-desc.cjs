// scripts/check-hero-desc.cjs
// Check hero.description and leadSurgeon.description for ALL docs
const fs = require('fs');
const docs = JSON.parse(fs.readFileSync('scripts/surgeon-full-dump.json','utf8'));

for (const doc of docs) {
  const city = (doc.general && doc.general.city) || 'Gurgaon(NULL)';
  if (city === 'Delhi' || city === 'Mumbai') continue;
  
  const heroDesc = doc.hero && doc.hero.description;
  const leadDesc = doc.leadSurgeon && doc.leadSurgeon.description;
  
  // Check if hero.description actually contains Pitampura
  const heroPit = heroDesc && /pitampura/i.test(heroDesc);
  const heroDelhi = heroDesc && /new delhi/i.test(heroDesc);
  const leadPit = leadDesc && /pitampura/i.test(leadDesc);
  const leadDelhi = leadDesc && /new delhi/i.test(leadDesc);
  
  if (heroPit || heroDelhi || leadPit || leadDelhi) {
    console.log(`\n${city}`);
    if (heroPit || heroDelhi) {
      console.log(`  hero.description FULL: "${heroDesc}"`);
    }
    if (leadPit || leadDelhi) {
      console.log(`  leadSurgeon.description FULL: "${leadDesc}"`);
    }
  } else {
    console.log(`${city}: hero/lead descriptions are CLEAN (no Pitampura/New Delhi)`);
  }
}
