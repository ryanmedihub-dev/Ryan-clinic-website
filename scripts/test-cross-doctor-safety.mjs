import mongoose from "mongoose";

async function runSafetyTest() {
  await mongoose.connect(process.env.MONGO_URL);
  const collection = mongoose.connection.db.collection("doctors");

  const delhiDoc = await collection.findOne({ slug: "dr-pranendra-singh" });
  const mumbaiDoc = await collection.findOne({ slug: "hair-transplant-doctor-in-mumbai" });
  const puneDoc = await collection.findOne({ slug: "hair-transplant-doctor-in-pune" });

  let allPassed = true;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAILED: ${message}`);
      allPassed = false;
    } else {
      console.log(`✅ PASSED: ${message}`);
    }
  }

  console.log("=== CROSS-DOCTOR SAFETY VERIFICATION ===\n");

  // 1. Delhi credentials preserved on Delhi doctor
  assert(delhiDoc.keyFacts?.registration === "DMC-68492", "Delhi Doctor preserves DMC-68492 registration");
  assert(delhiDoc.keyFacts?.memberships === "Delhi Medical Council Registered", "Delhi Doctor preserves Delhi Medical Council membership");

  // 2. Non-Delhi doctor has no DMC-68492 or Delhi Medical Council
  const mumbaiStr = JSON.stringify(mumbaiDoc);
  assert(!mumbaiStr.includes("DMC-68492"), "Mumbai Doctor has NO DMC-68492 leakage");
  assert(!mumbaiStr.includes("Delhi Medical Council"), "Mumbai Doctor has NO Delhi Medical Council leakage");

  const puneStr = JSON.stringify(puneDoc);
  assert(!puneStr.includes("DMC-68492"), "Pune Doctor has NO DMC-68492 leakage");
  assert(!puneStr.includes("Delhi Medical Council"), "Pune Doctor has NO Delhi Medical Council leakage");

  // 3. No unverified city registration claimed
  assert(mumbaiDoc.keyFacts?.registration === "Verification pending", "Mumbai Doctor registration is 'Verification pending'");
  assert(puneDoc.keyFacts?.registration === "Verification pending", "Pune Doctor registration is 'Verification pending'");
  assert(mumbaiDoc.keyFacts?.memberships === "Verification pending", "Mumbai Doctor membership is 'Verification pending'");
  assert(puneDoc.keyFacts?.memberships === "Verification pending", "Pune Doctor membership is 'Verification pending'");

  // 4. Cloned MCh qualification cleared from Pune doctor, legitimate MDS preserved on Mumbai doctor
  assert(puneDoc.keyFacts?.qualifications === "", "Pune Doctor cloned qualification cleared to blank");
  assert(mumbaiDoc.keyFacts?.qualifications === "MDS (Surgeon)", "Mumbai Doctor authentic MDS preserved");

  // 5. Inferred council achievements removed from non-Delhi doctors
  const mumbaiAch = (mumbaiDoc.surgeonProfile?.achievements || []).map(a => a.title);
  assert(!mumbaiAch.includes("State Medical Council"), "Mumbai Doctor does not have unverified State Medical Council achievement");
  assert(!mumbaiAch.includes("MCh (Plastic Surgery)"), "Mumbai Doctor does not have cloned MCh Plastic Surgery achievement");

  // 6. Credentials tab neutralized
  const mumbaiCouncilTab = (mumbaiDoc.credentials?.tabs || []).find(t => (t.title||"").toLowerCase().includes("council"));
  assert(mumbaiCouncilTab?.description === "Registration details available upon request. Verification pending official council records.",
    "Mumbai Doctor council tab description is neutralized");

  // 7. No Pitampura or Delhi address fallback on Mumbai or Pune
  assert(!mumbaiStr.includes("Pitampura") && !puneStr.includes("Pitampura"), "No Pitampura Delhi address in Mumbai or Pune doctor records");

  console.log("\n========================================");
  console.log(`FINAL RESULT: ${allPassed ? "PASS" : "FAIL"}`);
  console.log("========================================");

  await mongoose.disconnect();
  if (!allPassed) process.exit(1);
}

runSafetyTest().catch(e => {
  console.error("Test error:", e);
  process.exit(1);
});
