// scripts/analyze-surgeon-artifacts.cjs
// READ-ONLY: Analyze surgeon documents to produce a proposed change report
const fs = require('fs');
const path = require('path');

const docs = JSON.parse(fs.readFileSync('scripts/surgeon-full-dump.json','utf8'));

// ─── Helper to get nested value ─────────────────────────────────────────────
function getVal(obj, dotPath) {
  return dotPath.split('.').reduce((o, k) => {
    if (!o) return undefined;
    const arrMatch = k.match(/^(.+)\[(\d+)\]$/);
    if (arrMatch) {
      const key = arrMatch[1];
      const idx = parseInt(arrMatch[2], 10);
      return o[key] && o[key][idx];
    }
    return o[k];
  }, obj);
}

// ─── Analysis logic ──────────────────────────────────────────────────────────
const report = [];

for (const doc of docs) {
  const city = (doc.general && doc.general.city) || null;
  const id = (doc._id && doc._id.$oid) ? doc._id.$oid : String(doc._id);
  const slug = doc.slug;
  const status = doc.settings && doc.settings.status;

  // Skip Delhi and Mumbai published pages (they are the source of truth, not affected)
  if (city === 'Delhi' || city === 'Mumbai') {
    console.log(`SKIP: ${city} (${status} - source of truth)`);
    continue;
  }

  const changes = [];

  // ─── 1. general.city for Gurgaon (city field is NULL) ──────────────────────
  if (!city && slug === 'hair-transplant-surgeon-in-gurgaon') {
    changes.push({
      field: 'general.city',
      current: null,
      proposed: 'Gurgaon',
      reason: 'general.city is NULL; page is the Gurgaon surgeon page per slug'
    });
  }

  const effectiveCity = city || 'Gurgaon'; // for Gurgaon doc

  // ─── 2. whyClinic.description — "Located in Pitampura, New {City}" ─────────
  const whyClinicDesc = doc.whyClinic && doc.whyClinic.description;
  if (typeof whyClinicDesc === 'string') {
    // Pattern: "Located in Pitampura, New {City}..." — malformed, remove city reference
    const malformedPattern = /located in pitampura,?\s*new\s+\S+/i;
    if (malformedPattern.test(whyClinicDesc)) {
      const proposed = whyClinicDesc.replace(
        /Located in Pitampura,?\s*New\s+\S+/gi,
        'Located in New Delhi (Pitampura)'
      );
      changes.push({
        field: 'whyClinic.description',
        current: whyClinicDesc.substring(0, 200),
        proposed: proposed.substring(0, 200),
        reason: `Malformed "Located in Pitampura, New ${effectiveCity}" — clinic is in Delhi (Pitampura), not ${effectiveCity}. Corrected to factual Delhi location.`
      });
    }
  }

  // ─── 3. hero.description — contains city name naturally (OK if correct) ────
  // These contain "the best hair transplant surgeon in {City}" which is correct
  // Only flag if they contain Delhi/Pitampura artifacts
  const heroDesc = doc.hero && doc.hero.description;
  if (typeof heroDesc === 'string') {
    if (/pitampura/i.test(heroDesc) || /new delhi/i.test(heroDesc)) {
      changes.push({
        field: 'hero.description',
        current: heroDesc.substring(0, 200),
        proposed: heroDesc.substring(0, 200).replace(/Pitampura|New Delhi/gi, effectiveCity),
        reason: `Contains Delhi/Pitampura reference inside city-targeted hero copy`
      });
    }
  }

  // ─── 4. leadSurgeon.description — same as hero description (duplicated) ────
  const leadDesc = doc.leadSurgeon && doc.leadSurgeon.description;
  if (typeof leadDesc === 'string') {
    if (/pitampura/i.test(leadDesc) || (/new delhi/i.test(leadDesc) && effectiveCity !== 'Delhi')) {
      changes.push({
        field: 'leadSurgeon.description',
        current: leadDesc.substring(0, 200),
        proposed: 'REMOVE Delhi/Pitampura references — this field should not contain address info',
        reason: 'leadSurgeon.description contains Delhi/Pitampura geography — NOT appropriate for non-Delhi pages'
      });
    }
  }

  // ─── 5. faq.faqs[12].answer — the most malformed field ───────────────────
  const faqs = doc.faq && doc.faq.faqs;
  if (Array.isArray(faqs)) {
    faqs.forEach((faq, idx) => {
      const a = faq.answer;
      if (typeof a === 'string') {
        // Pattern: "At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, New {City} – 110034)"
        const malformedFaq = /at our pitampura centre.*new\s+\S+.*110034/i.test(a);
        const pitampuraInFaq = /pitampura/i.test(a);
        if (malformedFaq || pitampuraInFaq) {
          // Correct: replace the whole address artifact with the real Delhi clinic address
          // Don't invent a city-specific address
          const corrected = a.replace(
            /At our Pitampura centre \([^)]+New\s+\S+[^)]*\)/gi,
            'At our Pitampura clinic (CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034)'
          );
          changes.push({
            field: `faq.faqs[${idx}].answer`,
            current: a.substring(0, 300),
            proposed: corrected.substring(0, 300),
            reason: `Malformed "New ${effectiveCity}" artifact in address — corrected to actual Delhi clinic address`
          });
        }
      }
    });
  }

  // ─── 6. visitSurgeon.address — always Delhi clinic address ───────────────
  const vsAddr = doc.visitSurgeon && doc.visitSurgeon.address;
  if (typeof vsAddr === 'string' && /pitampura|new delhi/i.test(vsAddr) && effectiveCity !== 'Delhi') {
    // This is actually the real clinic address — it should NOT be changed to a fake city address
    // But we should note it is a Delhi address on a non-Delhi page
    // For non-Delhi pages: This field represents the actual physical clinic.
    // Per instructions: DO NOT invent addresses. Preserve verified clinic info.
    changes.push({
      field: 'visitSurgeon.address',
      current: vsAddr,
      proposed: vsAddr, // KEEP — it's the real address
      reason: `KEEP AS-IS — this is the actual verified clinic address (Delhi/Pitampura). Per instructions, do NOT invent a fake ${effectiveCity} address. Will retain verified address.`
    });
  }

  // ─── 7. visitSurgeon.nearestMetro — Delhi metro info ─────────────────────
  const vsMet = doc.visitSurgeon && doc.visitSurgeon.nearestMetro;
  if (typeof vsMet === 'string' && /pitampura metro/i.test(vsMet) && effectiveCity !== 'Delhi') {
    changes.push({
      field: 'visitSurgeon.nearestMetro',
      current: vsMet,
      proposed: vsMet, // KEEP — tied to the real clinic location
      reason: `KEEP AS-IS — tied to the real Delhi clinic address. Per instructions, do NOT invent metro for ${effectiveCity} without verified data.`
    });
  }

  // ─── 8. Gurgaon-specific: check for "New Gurgaon" string ─────────────────
  function scanForMalformed(obj, parentPath) {
    if (!obj || typeof obj !== 'object') return;
    for (const [k, v] of Object.entries(obj)) {
      const p = parentPath ? `${parentPath}.${k}` : k;
      if (typeof v === 'string') {
        const lv = v.toLowerCase();
        const malformed = [
          'new gurgaon','new hyderabad','new chennai','new banglore','new bangalore',
          'new mumbai','new pune','new jaipur','new lucknow','new kolkata',
          'new ahmedabad','new surat','new nagpur','new raipur','new bhopal','new patna',
          'new chandigarh','new indore','new agra','new meerut','new rachi','new ranchi',
          'new kochi','new vadodara','new coimbatore','new visakhapatnam','new vizag',
          'new amritsar','new faridabad','new noida'
        ];
        for (const m of malformed) {
          if (lv.includes(m)) {
            // Only push if not already captured above
            const alreadyCaptured = changes.some(c => c.field === p);
            if (!alreadyCaptured) {
              const cityName = m.replace('new ','');
              const corrected = v.replace(new RegExp('New ' + cityName, 'gi'), 'New Delhi');
              changes.push({
                field: p,
                current: v.substring(0, 300),
                proposed: corrected.substring(0, 300),
                reason: `Malformed "${m}" — should be "New Delhi" (this is a city-name substitution artifact from page generation)`
              });
            }
          }
        }
      } else if (Array.isArray(v)) {
        v.forEach((item, i) => scanForMalformed(item, `${p}[${i}]`));
      } else if (typeof v === 'object') {
        scanForMalformed(v, p);
      }
    }
  }
  scanForMalformed(doc, '');

  if (changes.length > 0) {
    report.push({
      city: effectiveCity,
      id,
      slug,
      status,
      changes
    });
  }
}

// ─── Write report ────────────────────────────────────────────────────────────
const outPath = 'scripts/surgeon-change-report.json';
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`Report written to ${outPath}`);
console.log(`Total documents with proposed changes: ${report.length}`);

// Print human-readable summary
for (const r of report) {
  console.log('\n' + '='.repeat(70));
  console.log(`CITY: ${r.city}  |  STATUS: ${r.status}  |  SLUG: ${r.slug}`);
  console.log(`_id: ${r.id}`);
  for (const c of r.changes) {
    console.log(`\n  FIELD: ${c.field}`);
    console.log(`  REASON: ${c.reason}`);
    console.log(`  CURRENT:  "${c.current}"`);
    console.log(`  PROPOSED: "${c.proposed}"`);
  }
}
