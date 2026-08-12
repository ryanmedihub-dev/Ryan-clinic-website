import { DBConnection } from "../src/lib/db.js";
import SurgeryPageModel from "../src/models/surgeryPage.js";

async function verifySurgeryHeadings() {
  await DBConnection();

  // 1. Test Delhi Headings
  const delhiDoc = await SurgeryPageModel.findOne({ slug: 'hair-transplant-surgery-in-delhi' }).lean();

  const delhiExpected = [
    { type: 'H1', text: 'Best Hair Transplant Surgery in Delhi' },
    { type: 'H2 #1', text: 'What is hair transplant surgery?' },
    { type: 'H2 #2', text: 'Is hair transplant surgery in Delhi safe?' },
    { type: 'H2 #3', text: 'Types of hair transplant surgery in Delhi' },
    { type: 'H2 #4', text: 'What makes the best hair transplant surgery in Delhi?' },
    { type: 'H2 #5', text: 'Who needs hair transplant surgery in Delhi — and who doesn\'t?' },
    { type: 'H2 #6', text: 'Before your hair transplant surgery in Delhi' },
    { type: 'H2 #7', text: 'During the hair transplant surgery in Delhi: step by step' },
    { type: 'H2 #8', text: 'After your surgery in Delhi: recovery and results' },
    { type: 'H2 #9', text: 'Surgical risks, and how a good Delhi clinic minimises them' },
    { type: 'H2 #10', text: 'Cost of hair transplant surgery in Delhi' },
    { type: 'H2 #11', text: 'Why choose Ryan Clinic for hair transplant surgery in Delhi' },
    { type: 'H2 #12', text: 'Our Delhi surgeons and credentials' },
    { type: 'H2 #13', text: 'Real surgical results in Delhi' },
    { type: 'H2 #14', text: 'Visiting Ryan Clinic in Delhi' },
    { type: 'H2 #15', text: 'Book your hair transplant surgery consultation in Delhi' },
    { type: 'H2 #16', text: 'Frequently asked questions – Hair Transplant Surgery in Delhi' },
  ];

  const delhiActual = [
    delhiDoc.hero?.title || delhiDoc.pageName,
    delhiDoc.introduction?.title,
    delhiDoc.safetyInfo?.heading,
    delhiDoc.procedureScience?.mainHeading,
    delhiDoc.qualityBenchmarks?.heading,
    delhiDoc.candidateSuitability?.heading,
    delhiDoc.beforeSurgeryTimeline?.heading,
    delhiDoc.procedureTimeline?.heading,
    delhiDoc.recoveryTimeline?.heading,
    delhiDoc.surgicalRisks?.heading,
    delhiDoc.pricing?.heading,
    delhiDoc.whyChooseUs?.heading,
    delhiDoc.doctors?.heading,
    delhiDoc.patientResults?.heading,
    delhiDoc.visitClinic?.heading,
    delhiDoc.consultation?.leftSide?.heading,
    delhiDoc.faq?.heading,
  ];

  let delhiPass = true;
  console.log("==================================================");
  console.log("DELHI SURGERY HEADING ALIGNMENT AUDIT");
  console.log("==================================================");
  for (let i = 0; i < delhiExpected.length; i++) {
    const exp = delhiExpected[i];
    const got = delhiActual[i];
    const pass = exp.text === got;
    if (!pass) delhiPass = false;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${exp.type}:\n  Expected: "${exp.text}"\n  Got:      "${got}"`);
  }

  // 2. Test Mumbai Headings
  const mumbaiDoc = await SurgeryPageModel.findOne({ slug: 'hair-transplant-surgery-in-mumbai' }).lean();

  const mumbaiExpected = [
    { type: 'H1', text: 'Best Hair Transplant Surgery in Mumbai' },
    { type: 'H2 #1', text: 'What is hair transplant surgery?' },
    { type: 'H2 #2', text: 'Is hair transplant surgery in Mumbai safe?' },
    { type: 'H2 #3', text: 'Types of hair transplant surgery in Mumbai' },
    { type: 'H2 #4', text: 'What makes the best hair transplant surgery in Mumbai?' },
    { type: 'H2 #5', text: 'Who needs hair transplant surgery in Mumbai — and who doesn\'t?' },
    { type: 'H2 #6', text: 'Before your hair transplant surgery in Mumbai' },
    { type: 'H2 #7', text: 'During the hair transplant surgery in Mumbai: step by step' },
    { type: 'H2 #8', text: 'After your surgery in Mumbai: recovery and results' },
    { type: 'H2 #9', text: 'Surgical risks, and how a good Mumbai clinic minimises them' },
    { type: 'H2 #10', text: 'Cost of hair transplant surgery in Mumbai' },
    { type: 'H2 #11', text: 'Why choose Ryan Clinic for hair transplant surgery in Mumbai' },
    { type: 'H2 #12', text: 'Our Mumbai surgeons and credentials' },
    { type: 'H2 #13', text: 'Real surgical results in Mumbai' },
    { type: 'H2 #14', text: 'Visiting Ryan Clinic in Mumbai' },
    { type: 'H2 #15', text: 'Book your hair transplant surgery consultation in Mumbai' },
    { type: 'H2 #16', text: 'Frequently asked questions – Hair Transplant Surgery in Mumbai' },
  ];

  const mumbaiActual = [
    mumbaiDoc.hero?.title || mumbaiDoc.pageName,
    mumbaiDoc.introduction?.title,
    mumbaiDoc.safetyInfo?.heading,
    mumbaiDoc.procedureScience?.mainHeading,
    mumbaiDoc.qualityBenchmarks?.heading,
    mumbaiDoc.candidateSuitability?.heading,
    mumbaiDoc.beforeSurgeryTimeline?.heading,
    mumbaiDoc.procedureTimeline?.heading,
    mumbaiDoc.recoveryTimeline?.heading,
    mumbaiDoc.surgicalRisks?.heading,
    mumbaiDoc.pricing?.heading,
    mumbaiDoc.whyChooseUs?.heading,
    mumbaiDoc.doctors?.heading,
    mumbaiDoc.patientResults?.heading,
    mumbaiDoc.visitClinic?.heading,
    mumbaiDoc.consultation?.leftSide?.heading,
    mumbaiDoc.faq?.heading,
  ];

  let mumbaiPass = true;
  console.log("\n==================================================");
  console.log("MUMBAI SURGERY HEADING ALIGNMENT AUDIT");
  console.log("==================================================");
  for (let i = 0; i < mumbaiExpected.length; i++) {
    const exp = mumbaiExpected[i];
    const got = mumbaiActual[i];
    const pass = exp.text === got;
    if (!pass) mumbaiPass = false;
    console.log(`[${pass ? 'PASS' : 'FAIL'}] ${exp.type}:\n  Expected: "${exp.text}"\n  Got:      "${got}"`);
  }

  console.log("\n==================================================");
  console.log('DELHI AUDIT RESULT:', delhiPass ? 'PASS - ALL 17 HEADINGS MATCH VERBATIM' : 'FAIL');
  console.log('MUMBAI AUDIT RESULT:', mumbaiPass ? 'PASS - ALL 17 HEADINGS MATCH VERBATIM' : 'FAIL');
  console.log("==================================================");

  process.exit(delhiPass && mumbaiPass ? 0 : 1);
}

verifySurgeryHeadings();
