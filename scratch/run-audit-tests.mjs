import mongoose from "mongoose";
import Doctor from "../src/models/Doctors.js";
import { DBConnection } from "../src/lib/db.js";

async function main() {
  await DBConnection();

  console.log("=== STARTING STRICT AUDIT TESTS ===");

  // 1. Fetch current states of Doctor A (Delhi) and Doctor B (Mumbai)
  const docAOriginal = await Doctor.findOne({ slug: "hair-transplant-doctor-in-delhi" }).lean();
  const docBOriginal = await Doctor.findOne({ slug: "hair-transplant-doctor-in-mumbai" }).lean();

  if (!docAOriginal || !docBOriginal) {
    throw new Error("Could not find test doctors in database!");
  }

  const originalCardA = docAOriginal.doctorCard || {};
  const originalCardB = docBOriginal.doctorCard || {};

  console.log("Original Doctor A:", docAOriginal.basicInfo?.doctorName, "(City:", docAOriginal.basicInfo?.city, ")");
  console.log("Original Doctor B:", docBOriginal.basicInfo?.doctorName, "(City:", docBOriginal.basicInfo?.city, ")");

  const TEST_QUAL_A = "SHORT_QUAL_TEST_A_UNIQUE_999";
  const TEST_DESC_A = "CARD_ISOLATION_A_123 - Unique Bio for Doctor A verification test.";
  const TEST_DEGREE_A = "DEGREE_TEST_A_AIIMS";
  const TEST_INSTITUTE_A = "INSTITUTE_TEST_A_DELHI";

  const TEST_QUAL_B = "SHORT_QUAL_TEST_B_UNIQUE_888";
  const TEST_DESC_B = "CARD_ISOLATION_B_456 - Unique Bio for Doctor B verification test.";
  const TEST_DEGREE_B = "DEGREE_TEST_B_KEM";
  const TEST_INSTITUTE_B = "INSTITUTE_TEST_B_MUMBAI";

  try {
    // --- REQUIREMENT 5 & 6: Set unique values in DB via Mongoose & save ---
    console.log("\n--- Testing Round-Trip and Isolation updates ---");
    
    // Update Doctor A
    await Doctor.updateOne(
      { _id: docAOriginal._id },
      {
        $set: {
          doctorCard: {
            shortQualification: TEST_QUAL_A,
            cardDescription: TEST_DESC_A,
            qualifications: [{ degree: TEST_DEGREE_A, institute: TEST_INSTITUTE_A }],
            certifications: ["CERT_A_1"],
            specializations: ["SPEC_A_1"],
          },
        },
      }
    );

    // Update Doctor B
    await Doctor.updateOne(
      { _id: docBOriginal._id },
      {
        $set: {
          doctorCard: {
            shortQualification: TEST_QUAL_B,
            cardDescription: TEST_DESC_B,
            qualifications: [{ degree: TEST_DEGREE_B, institute: TEST_INSTITUTE_B }],
            certifications: ["CERT_B_1"],
            specializations: ["SPEC_B_1"],
          },
        },
      }
    );

    // Verify MongoDB state
    const savedA = await Doctor.findById(docAOriginal._id).lean();
    const savedB = await Doctor.findById(docBOriginal._id).lean();
    console.log("DB check Doc A saved:", savedA.doctorCard?.shortQualification === TEST_QUAL_A);
    console.log("DB check Doc B saved:", savedB.doctorCard?.shortQualification === TEST_QUAL_B);

    // Test GET /api/doctors/get?slug=hair-transplant-doctor-in-delhi
    const apiResA = await fetch("http://localhost:3000/api/doctors/get?slug=hair-transplant-doctor-in-delhi");
    const apiDataA = await apiResA.json();
    console.log("API check Doc A shortQualification:", apiDataA.doctor?.doctorCard?.shortQualification === TEST_QUAL_A);
    console.log("API check Doc A cardDescription:", apiDataA.doctor?.doctorCard?.cardDescription === TEST_DESC_A);

    // Test /doctors directory page
    const doctorsPageRes = await fetch("http://localhost:3000/doctors");
    const doctorsHtml = await doctorsPageRes.text();
    const doctorsHasA = doctorsHtml.includes(TEST_QUAL_A) && doctorsHtml.includes(TEST_DESC_A);
    const doctorsHasB = doctorsHtml.includes(TEST_QUAL_B) && doctorsHtml.includes(TEST_DESC_B);
    console.log("/doctors page contains Doc A test values:", doctorsHasA);
    console.log("/doctors page contains Doc B test values:", doctorsHasB);

    // Test City Landing Page: Delhi
    const delhiRes = await fetch("http://localhost:3000/hair-transplant-in-delhi");
    const delhiHtml = await delhiRes.text();
    const delhiHasA = delhiHtml.includes("Dr. Pranendra Singh") && (delhiHtml.includes(TEST_DESC_A) || delhiHtml.includes(TEST_DEGREE_A));
    const delhiHasB = delhiHtml.includes("CARD_ISOLATION_B_456") || delhiHtml.includes(TEST_QUAL_B) || delhiHtml.includes(TEST_DEGREE_B) || delhiHtml.includes("Dr. Harshada Vijay Rakh");
    console.log("Delhi page renders Doc A values:", delhiHasA);
    console.log("Delhi page does NOT contain Doc B (isolation):", !delhiHasB);

    // Test City Landing Page: Mumbai
    const mumbaiRes = await fetch("http://localhost:3000/hair-transplant-in-mumbai");
    const mumbaiHtml = await mumbaiRes.text();
    const mumbaiHasB = mumbaiHtml.includes("Dr. Harshada Vijay Rakh") && (mumbaiHtml.includes(TEST_DESC_B) || mumbaiHtml.includes(TEST_DEGREE_B));
    const mumbaiHasA = mumbaiHtml.includes("CARD_ISOLATION_A_123") || mumbaiHtml.includes(TEST_QUAL_A) || mumbaiHtml.includes(TEST_DEGREE_A) || mumbaiHtml.includes("Dr. Pranendra Singh");
    console.log("Mumbai page renders Doc B values:", mumbaiHasB);
    console.log("Mumbai page does NOT contain Doc A (isolation):", !mumbaiHasA);

    // Test other cities: Hyderabad & Bangalore
    const hydRes = await fetch("http://localhost:3000/hair-transplant-in-hyderabad");
    const hydHtml = await hydRes.text();
    const hydHasAkhila = hydHtml.includes("Dr. Ede Akhila");
    const hydHasPranendra = hydHtml.includes("Dr. Pranendra Singh");
    console.log("Hyderabad page renders Dr. Ede Akhila:", hydHasAkhila);
    console.log("Hyderabad page does NOT render Dr. Pranendra Singh:", !hydHasPranendra);

    const blrRes = await fetch("http://localhost:3000/hair-transplant-in-bangalore");
    const blrHtml = await blrRes.text();
    const blrHasSaket = blrHtml.includes("Dr. Saket");
    const blrHasPranendra = blrHtml.includes("Dr. Pranendra Singh");
    console.log("Bangalore page renders Dr. Saket:", blrHasSaket);
    console.log("Bangalore page does NOT render Dr. Pranendra Singh:", !blrHasPranendra);

    // Test a non-existent city: e.g. /hair-transplant-in-shimla (city with no doctor)
    // Verify that NO doctor section or Dr. Pranendra Singh appears
    const shimlaRes = await fetch("http://localhost:3000/hair-transplant-in-shimla");
    if (shimlaRes.status === 200) {
      const shimlaHtml = await shimlaRes.text();
      const shimlaHasPranendra = shimlaHtml.includes("Dr. Pranendra Singh");
      console.log("Unconfigured city (Shimla) does NOT fall back to Dr. Pranendra Singh:", !shimlaHasPranendra);
    } else {
      console.log("Unconfigured city returns status:", shimlaRes.status);
    }

  } finally {
    // RESTORE ORIGINAL VALUES
    console.log("\n--- Restoring original doctor values ---");
    await Doctor.updateOne(
      { _id: docAOriginal._id },
      { $set: { doctorCard: originalCardA } }
    );
    await Doctor.updateOne(
      { _id: docBOriginal._id },
      { $set: { doctorCard: originalCardB } }
    );
    console.log("Restored original values for Doctor A and Doctor B successfully.");
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
