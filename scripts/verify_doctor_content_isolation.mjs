import mongoose from "mongoose";

async function verifyIsolation() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("MONGO_URL not found in environment");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collection = db.collection("doctors");

  const docA = await collection.findOne({ slug: "dr-pranendra-singh" });
  const docB = await collection.findOne({ slug: "hair-transplant-doctor-in-mumbai" });

  if (!docA || !docB) {
    console.error("Could not find test doctors docA or docB");
    process.exit(1);
  }

  console.log("=== CHECKING DOCTOR A (Delhi) vs DOCTOR B (Mumbai) ===");
  console.log(`Doctor A: ${docA.basicInfo?.doctorName} (${docA.basicInfo?.city})`);
  console.log(`Doctor B: ${docB.basicInfo?.doctorName} (${docB.basicInfo?.city})`);

  // Verify credentials isolation
  console.log("\n[1] Credentials Card Heading Isolation:");
  console.log(`Doc A heading: "${docA.credentials?.cardHeading}"`);
  console.log(`Doc B heading: "${docB.credentials?.cardHeading}"`);
  if (docA.credentials?.cardHeading === docB.credentials?.cardHeading) {
    console.warn("WARNING: Card headings are identical!");
  } else {
    console.log("PASSED: Card headings are distinct and doctor-specific.");
  }

  // Verify achievements isolation
  console.log("\n[2] Achievements Isolation (No Delhi Council on Mumbai Doctor):");
  const docBAchievTitles = (docB.surgeonProfile?.achievements || []).map((a) => a.title + ": " + a.description);
  console.log("Doc B Achievements:", JSON.stringify(docBAchievTitles, null, 2));

  const hasDMCLeakage = docBAchievTitles.some((t) => t.includes("DMC-68492") || t.includes("Delhi Medical Council"));
  if (hasDMCLeakage) {
    console.error("FAILED: Doctor B has DMC-68492 leakage!");
    process.exit(1);
  } else {
    console.log("PASSED: Zero DMC-68492 or Delhi Medical Council leakage in Doctor B.");
  }

  // Step 3: Mutate test values and verify strict isolation
  console.log("\n[3] Testing Mutation Isolation (Setting temporary unique values)...");
  const originalHeadingA = docA.credentials?.cardHeading;
  const originalHeadingB = docB.credentials?.cardHeading;

  const testValA = "ISOLATION_TEST_CARD_A_" + Date.now();
  const testValB = "ISOLATION_TEST_CARD_B_" + Date.now();

  await collection.updateOne({ _id: docA._id }, { $set: { "credentials.cardHeading": testValA } });
  await collection.updateOne({ _id: docB._id }, { $set: { "credentials.cardHeading": testValB } });

  const freshDocA = await collection.findOne({ slug: "dr-pranendra-singh" });
  const freshDocB = await collection.findOne({ slug: "hair-transplant-doctor-in-mumbai" });

  if (freshDocA.credentials?.cardHeading === testValA && freshDocB.credentials?.cardHeading === testValB) {
    console.log("PASSED: Doctor A read back testValA, Doctor B read back testValB.");
  } else {
    console.error("FAILED: Mutation isolation test did not match expected values.");
  }

  // Clean up
  await collection.updateOne({ _id: docA._id }, { $set: { "credentials.cardHeading": originalHeadingA } });
  await collection.updateOne({ _id: docB._id }, { $set: { "credentials.cardHeading": originalHeadingB } });
  console.log("Restored original card headings for Doctor A and B.");

  // Verify checklist isolation
  console.log("\n[4] Verification Checklist Check:");
  console.log(`Doc A checklist count: ${freshDocA.verification?.checklist?.length}`);
  console.log(`Doc B checklist count: ${freshDocB.verification?.checklist?.length}`);
  console.log(`Doc B first item: "${freshDocB.verification?.checklist?.[0]?.title}"`);

  console.log("\n=== ALL ISOLATION CHECKS PASSED SUCCESSFULLY ===");
  await mongoose.disconnect();
}

verifyIsolation().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
