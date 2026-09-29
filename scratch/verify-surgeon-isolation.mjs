import Doctor from "../src/models/Doctors.js";
import { DBConnection } from "../src/lib/db.js";

async function main() {
  await DBConnection();

  console.log("=== STRICT SURGEON SECTION ISOLATION TEST ===");

  const docA = await Doctor.findOne({ slug: "hair-transplant-doctor-in-delhi" }).lean();
  const docB = await Doctor.findOne({ slug: "hair-transplant-doctor-in-mumbai" }).lean();
  const docHyd = await Doctor.findOne({ slug: "hair-transplant-doctor-in-hyderabad" }).lean();
  const docBlr = await Doctor.findOne({ slug: "hair-transplant-doctor-in-bangalore" }).lean();

  const originalCardA = docA.doctorCard || {};
  const originalCardB = docB.doctorCard || {};

  const TEST_A_DESC = "CARD_ISOLATION_A_123 - Unique Description for Doctor A";
  const TEST_A_QUAL = "SHORT_QUAL_A_123";
  const TEST_B_DESC = "CARD_ISOLATION_B_456 - Unique Description for Doctor B";
  const TEST_B_QUAL = "SHORT_QUAL_B_456";

  try {
    // Update Doctor A
    await Doctor.updateOne(
      { _id: docA._id },
      {
        $set: {
          doctorCard: {
            shortQualification: TEST_A_QUAL,
            cardDescription: TEST_A_DESC,
            qualifications: [{ degree: "MBBS_A", institute: "INST_A" }],
            certifications: ["CERT_A"],
            specializations: ["SPEC_A"],
          },
        },
      }
    );

    // Update Doctor B
    await Doctor.updateOne(
      { _id: docB._id },
      {
        $set: {
          doctorCard: {
            shortQualification: TEST_B_QUAL,
            cardDescription: TEST_B_DESC,
            qualifications: [{ degree: "MBBS_B", institute: "INST_B" }],
            certifications: ["CERT_B"],
            specializations: ["SPEC_B"],
          },
        },
      }
    );

    // 1. Check /doctors directory page
    const docRes = await fetch("http://localhost:3000/doctors");
    const docHtml = await docRes.text();
    console.log("[/doctors Directory Page]");
    console.log("  Contains Doctor A test tag (CARD_ISOLATION_A_123):", docHtml.includes("CARD_ISOLATION_A_123"));
    console.log("  Contains Doctor B test tag (CARD_ISOLATION_B_456):", docHtml.includes("CARD_ISOLATION_B_456"));
    console.log("  Contains Doctor A short qual:", docHtml.includes(TEST_A_QUAL));
    console.log("  Contains Doctor B short qual:", docHtml.includes(TEST_B_QUAL));

    // Helper to extract the surgeon section from HTML
    function getSurgeonSection(html) {
      const start = html.indexOf("Meet Your Hair Transplant");
      if (start === -1) return null;
      const end = html.indexOf("</section>", start);
      return html.slice(Math.max(0, start - 200), end !== -1 ? end + 10 : start + 3000);
    }

    // 2. Check Delhi Page
    const delhiRes = await fetch("http://localhost:3000/hair-transplant-in-delhi");
    const delhiHtml = await delhiRes.text();
    const delhiSurgeon = getSurgeonSection(delhiHtml);
    console.log("\n[Delhi City Landing Page - Surgeon Section]");
    console.log("  Surgeon section exists:", !!delhiSurgeon);
    console.log("  Displays Doctor A (Dr. Pranendra Singh):", delhiSurgeon?.includes("Dr. Pranendra Singh"));
    console.log("  Displays Doctor A Card Description:", delhiSurgeon?.includes(TEST_A_DESC));
    console.log("  Does NOT display Doctor B name:", !delhiSurgeon?.includes("Dr. Harshada Vijay Rakh"));
    console.log("  Does NOT display Doctor B tags (CARD_ISOLATION_B_456):", !delhiSurgeon?.includes("CARD_ISOLATION_B_456"));

    // 3. Check Mumbai Page
    const mumbaiRes = await fetch("http://localhost:3000/hair-transplant-in-mumbai");
    const mumbaiHtml = await mumbaiRes.text();
    const mumbaiSurgeon = getSurgeonSection(mumbaiHtml);
    console.log("\n[Mumbai City Landing Page - Surgeon Section]");
    console.log("  Surgeon section exists:", !!mumbaiSurgeon);
    console.log("  Displays Doctor B (Dr. Harshada Vijay Rakh):", mumbaiSurgeon?.includes("Dr. Harshada Vijay Rakh"));
    console.log("  Displays Doctor B Card Description:", mumbaiSurgeon?.includes(TEST_B_DESC));
    console.log("  Does NOT display Doctor A name in surgeon section:", !mumbaiSurgeon?.includes("Dr. Pranendra Singh"));
    console.log("  Does NOT display Doctor A tags (CARD_ISOLATION_A_123):", !mumbaiSurgeon?.includes("CARD_ISOLATION_A_123"));

    // 4. Check Hyderabad Page
    const hydRes = await fetch("http://localhost:3000/hair-transplant-in-hyderabad");
    const hydHtml = await hydRes.text();
    const hydSurgeon = getSurgeonSection(hydHtml);
    console.log("\n[Hyderabad City Landing Page - Surgeon Section]");
    console.log("  Surgeon section exists:", !!hydSurgeon);
    console.log("  Displays Dr. Ede Akhila:", hydSurgeon?.includes("Dr. Ede Akhila"));
    console.log("  Does NOT display Dr. Pranendra Singh:", !hydSurgeon?.includes("Dr. Pranendra Singh"));
    console.log("  Does NOT display Dr. Harshada Vijay Rakh:", !hydSurgeon?.includes("Dr. Harshada Vijay Rakh"));

    // 5. Check Bangalore Page
    const blrRes = await fetch("http://localhost:3000/hair-transplant-in-bangalore");
    const blrHtml = await blrRes.text();
    const blrSurgeon = getSurgeonSection(blrHtml);
    console.log("\n[Bangalore City Landing Page - Surgeon Section]");
    console.log("  Surgeon section exists:", !!blrSurgeon);
    console.log("  Displays Dr. Saket:", blrSurgeon?.includes("Dr. Saket"));
    console.log("  Does NOT display Dr. Pranendra Singh:", !blrSurgeon?.includes("Dr. Pranendra Singh"));
    console.log("  Does NOT display Dr. Harshada Vijay Rakh:", !blrSurgeon?.includes("Dr. Harshada Vijay Rakh"));

    // 6. Check City with NO doctor (e.g. mock non-existent or service without city doctor)
    const { getDoctorByCity } = await import("../src/lib/serviceData.js");
    const nonExistentDoc = await getDoctorByCity("NonExistentCity12345");
    console.log("\n[City with no doctor]");
    console.log("  getDoctorByCity('NonExistentCity12345') returns null:", nonExistentDoc === null);

  } finally {
    // Restore
    await Doctor.updateOne({ _id: docA._id }, { $set: { doctorCard: originalCardA } });
    await Doctor.updateOne({ _id: docB._id }, { $set: { doctorCard: originalCardB } });
    console.log("\nRestored original doctorCard values successfully.");
  }

  process.exit(0);
}

main().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
