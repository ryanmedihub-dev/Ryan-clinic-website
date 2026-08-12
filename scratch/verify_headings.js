import { DBConnection } from "../src/lib/db.js";
import CostPage from "../src/models/CostPage.js";

async function verifyHeadings() {
  await DBConnection();
  const doc = await CostPage.findOne({ slug: 'fue-hair-transplant-cost-in-delhi' }).lean();

  const headingsToTest = [
    { type: 'H1', text: doc.hero?.title },
    { type: 'H2 #1', text: doc.intro?.heading },
    { type: 'H2 #2', text: doc.pricingOptions?.heading },
    { type: 'H2 #3', text: doc.graftPricing?.heading },
    { type: 'H2 #4', text: doc.includedSection?.heading },
    { type: 'H2 #5', text: doc.priceFactors?.heading },
    { type: 'H2 #6', text: doc.techniqueComparison?.heading },
    { type: 'H2 #7', text: doc.contentSections?.find(s => s.sectionKey === 'fue-vs-fut')?.heading },
    { type: 'H2 #8', text: doc.contentSections?.find(s => s.sectionKey === 'delhi-vs-turkey')?.heading },
    { type: 'H2 #9', text: doc.contentSections?.find(s => s.sectionKey === 'cheap-fue-risks')?.heading },
    { type: 'H2 #10', text: doc.priceFactors?.emiHeading },
    { type: 'H2 #11', text: doc.pricing?.heading },
    { type: 'H2 #12', text: doc.contentSections?.find(s => s.sectionKey === 'why-ryan-worth-it')?.heading },
    { type: 'H2 #13', text: doc.mythsFacts?.heading },
    { type: 'H2 #14', text: doc.visitClinic?.heading },
    { type: 'H2 #15', text: doc.consultation?.heading },
    { type: 'H2 #16', text: doc.faq?.heading },
  ];

  const expectedHeadings = [
    { type: 'H1', text: 'Best FUE Hair Transplant Cost in Delhi' },
    { type: 'H2 #1', text: 'How much does FUE hair transplant cost in Delhi?' },
    { type: 'H2 #2', text: 'FUE hair transplant cost per graft in Delhi' },
    { type: 'H2 #3', text: 'FUE hair transplant cost by graft count in Delhi' },
    { type: 'H2 #4', text: "What's included in FUE hair transplant cost in Delhi" },
    { type: 'H2 #5', text: 'What affects FUE hair transplant cost and price in Delhi' },
    { type: 'H2 #6', text: 'FUE vs Sapphire FUE vs THT cost in Delhi' },
    { type: 'H2 #7', text: 'FUE vs FUT cost in Delhi' },
    { type: 'H2 #8', text: 'FUE hair transplant cost in Delhi vs Turkey' },
    { type: 'H2 #9', text: 'Is a cheap FUE hair transplant in Delhi worth it?' },
    { type: 'H2 #10', text: 'EMI and payment options for FUE hair transplant in Delhi' },
    { type: 'H2 #11', text: 'Ryan Clinic FUE hair transplant cost in Delhi (transparent pricing)' },
    { type: 'H2 #12', text: 'Why our FUE hair transplant cost in Delhi is worth it' },
    { type: 'H2 #13', text: 'Myths vs facts about FUE hair transplant cost in Delhi' },
    { type: 'H2 #14', text: 'Visiting Ryan Clinic for FUE hair transplant in Delhi' },
    { type: 'H2 #15', text: 'Get your FUE hair transplant cost quote in Delhi' },
    { type: 'H2 #16', text: 'FUE hair transplant cost in Delhi — frequently asked questions' },
  ];

  let allPass = true;
  console.log("==================================================");
  console.log("HEADING ALIGNMENT AUDIT REPORT");
  console.log("==================================================");
  for (let i = 0; i < expectedHeadings.length; i++) {
    const exp = expectedHeadings[i];
    const got = headingsToTest[i]?.text;
    const pass = exp.text === got;
    if (!pass) allPass = false;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${exp.type}:\n  Expected: "${exp.text}"\n  Got:      "${got}"`);
  }

  console.log("==================================================");
  console.log('OVERALL RESULT:', allPass ? 'PASS - ALL 17 HEADINGS MATCH VERBATIM (1 H1 + 16 H2s)' : 'FAIL - MISMATCH FOUND');
  console.log("==================================================");
  process.exit(allPass ? 0 : 1);
}

verifyHeadings();
