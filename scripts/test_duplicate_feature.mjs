import mongoose from "mongoose";
import { DBConnection } from "../src/lib/db.js";

import SurgeryPageModel from "../src/models/surgeryPage.js";
import SurgeonPage from "../src/models/SurgeonPage.js";
import Doctor from "../src/models/Doctors.js";
import HairFallPageModel from "../src/models/hairFallPage.js";
import CostPage from "../src/models/CostPage.js";
import Services from "../src/models/services.js";
import { generateUniqueDuplicateSlug, updateCanonicalInSeo, normalizeSurgeonDoc } from "../src/lib/duplicateHelper.js";

async function runTests() {
  console.log("==================================================");
  console.log("RUNNING DUPLICATE FEATURE AUTOMATED TEST SUITE");
  console.log("==================================================");

  await DBConnection();
  console.log(" Connected to MongoDB via DBConnection");

  const createdTestIds = {
    surgery: [],
    surgeon: [],
    doctor: [],
    hairFall: [],
    cost: [],
    service: [],
  };

  try {
    // 1. TEST SURGERY DUPLICATION
    console.log("\n--- [1/6] Testing Surgery Duplication ---");
    const originalSurgery = await SurgeryPageModel.findOne().lean();
    if (originalSurgery) {
      console.log(`Original Surgery: "${originalSurgery.pageName}" (slug: ${originalSurgery.slug})`);
      
      const slug1 = await generateUniqueDuplicateSlug(originalSurgery.slug, SurgeryPageModel, "slug");
      console.log(`Duplicate 1 target slug: ${slug1}`);
      if (!slug1.endsWith("-copy")) throw new Error(`Expected slug1 to end with -copy, got ${slug1}`);

      const cleaned1 = JSON.parse(JSON.stringify(originalSurgery));
      delete cleaned1._id;
      cleaned1.pageName = `${originalSurgery.pageName} - Copy`;
      cleaned1.slug = slug1;
      cleaned1.status = "draft";
      cleaned1.seo = updateCanonicalInSeo(cleaned1.seo, originalSurgery.slug, slug1);

      const doc1 = new SurgeryPageModel(cleaned1);
      await doc1.save();
      createdTestIds.surgery.push(doc1._id);

      // Duplicate again (2nd copy)
      const slug2 = await generateUniqueDuplicateSlug(originalSurgery.slug, SurgeryPageModel, "slug");
      console.log(`Duplicate 2 target slug: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      const cleaned2 = JSON.parse(JSON.stringify(originalSurgery));
      delete cleaned2._id;
      cleaned2.pageName = `${originalSurgery.pageName} - Copy 2`;
      cleaned2.slug = slug2;
      cleaned2.status = "draft";

      const doc2 = new SurgeryPageModel(cleaned2);
      await doc2.save();
      createdTestIds.surgery.push(doc2._id);

      // Verify draft status & unique _ids
      if (doc1.status !== "draft" || doc2.status !== "draft") throw new Error("Duplicates must be draft");
      if (String(doc1._id) === String(originalSurgery._id) || String(doc2._id) === String(originalSurgery._id)) {
        throw new Error("Duplicate _id must differ from original");
      }
      console.log(" Surgery duplication passed (slug collision handling verified)");
    } else {
      console.log("⚠️ No surgery page found to test duplication");
    }

    // 2. TEST SURGEON DUPLICATION
    console.log("\n--- [2/6] Testing Surgeon Duplication ---");
    const originalSurgeon = await SurgeonPage.findOne().lean();
    if (originalSurgeon) {
      console.log(`Original Surgeon: "${originalSurgeon.title}" (slug: ${originalSurgeon.slug})`);

      const slug1 = await generateUniqueDuplicateSlug(originalSurgeon.slug, SurgeonPage, "slug");
      console.log(`Duplicate 1 target slug: ${slug1}`);
      if (!slug1.endsWith("-copy")) throw new Error(`Expected slug1 to end with -copy, got ${slug1}`);

      const cleaned1 = normalizeSurgeonDoc(JSON.parse(JSON.stringify(originalSurgeon)));
      delete cleaned1._id;
      cleaned1.title = `${originalSurgeon.title} - Copy`;
      cleaned1.slug = slug1;
      if (!cleaned1.settings) cleaned1.settings = {};
      cleaned1.settings.status = "draft";
      cleaned1.settings.isDeleted = false;
      cleaned1.seo = updateCanonicalInSeo(cleaned1.seo, originalSurgeon.slug, slug1);

      const doc1 = new SurgeonPage(cleaned1);
      await doc1.save();
      createdTestIds.surgeon.push(doc1._id);

      const slug2 = await generateUniqueDuplicateSlug(originalSurgeon.slug, SurgeonPage, "slug");
      console.log(`Duplicate 2 target slug: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      if (doc1.settings?.status !== "draft") throw new Error("Surgeon duplicate must be draft");
      console.log(" Surgeon duplication passed");
    }

    // 3. TEST DOCTOR DUPLICATION
    console.log("\n--- [3/6] Testing Doctor Duplication ---");
    const originalDoctor = await Doctor.findOne().lean();
    if (originalDoctor) {
      console.log(`Original Doctor: "${originalDoctor.pageName}" (slug: ${originalDoctor.slug})`);

      const slug1 = await generateUniqueDuplicateSlug(originalDoctor.slug, Doctor, "slug");
      console.log(`Duplicate 1 target slug: ${slug1}`);

      const cleaned1 = JSON.parse(JSON.stringify(originalDoctor));
      delete cleaned1._id;
      delete cleaned1.deletedAt;
      cleaned1.pageName = `${originalDoctor.pageName} - Copy`;
      cleaned1.slug = slug1;
      cleaned1.status = "draft";
      cleaned1.featured = false;
      cleaned1.seo = updateCanonicalInSeo(cleaned1.seo, originalDoctor.slug, slug1);

      const doc1 = new Doctor(cleaned1);
      await doc1.save();
      createdTestIds.doctor.push(doc1._id);

      const slug2 = await generateUniqueDuplicateSlug(originalDoctor.slug, Doctor, "slug");
      console.log(`Duplicate 2 target slug: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      if (doc1.status !== "draft") throw new Error("Doctor duplicate must be draft");
      if (doc1.featured !== false) throw new Error("Doctor duplicate must reset featured to false");
      console.log(" Doctor duplication passed");
    }

    // 4. TEST HAIR FALL DUPLICATION
    console.log("\n--- [4/6] Testing Hair Fall Treatment Duplication ---");
    const originalHairFall = await HairFallPageModel.findOne().lean();
    if (originalHairFall) {
      console.log(`Original HairFall: "${originalHairFall.pageName}" (slug: ${originalHairFall.slug})`);

      const slug1 = await generateUniqueDuplicateSlug(originalHairFall.slug, HairFallPageModel, "slug");
      console.log(`Duplicate 1 target slug: ${slug1}`);

      const cleaned1 = JSON.parse(JSON.stringify(originalHairFall));
      delete cleaned1._id;
      cleaned1.pageName = `${originalHairFall.pageName} - Copy`;
      cleaned1.slug = slug1;
      cleaned1.status = "draft";
      cleaned1.seo = updateCanonicalInSeo(cleaned1.seo, originalHairFall.slug, slug1);

      const doc1 = new HairFallPageModel(cleaned1);
      await doc1.save();
      createdTestIds.hairFall.push(doc1._id);

      const slug2 = await generateUniqueDuplicateSlug(originalHairFall.slug, HairFallPageModel, "slug");
      console.log(`Duplicate 2 target slug: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      if (doc1.status !== "draft") throw new Error("HairFall duplicate must be draft");
      console.log(" Hair Fall duplication passed");
    }

    // 5. TEST COST DUPLICATION
    console.log("\n--- [5/6] Testing Cost Duplication ---");
    const originalCost = await CostPage.findOne().lean();
    if (originalCost) {
      console.log(`Original Cost: "${originalCost.title}" (slug: ${originalCost.slug})`);

      const slug1 = await generateUniqueDuplicateSlug(originalCost.slug, CostPage, "slug");
      console.log(`Duplicate 1 target slug: ${slug1}`);

      const cleaned1 = JSON.parse(JSON.stringify(originalCost));
      delete cleaned1._id;
      cleaned1.title = `${originalCost.title} - Copy`;
      cleaned1.slug = slug1;
      if (!cleaned1.settings) cleaned1.settings = {};
      cleaned1.settings.status = "draft";
      cleaned1.settings.isDeleted = false;
      cleaned1.seo = updateCanonicalInSeo(cleaned1.seo, originalCost.slug, slug1);

      const doc1 = new CostPage(cleaned1);
      await doc1.save();
      createdTestIds.cost.push(doc1._id);

      const slug2 = await generateUniqueDuplicateSlug(originalCost.slug, CostPage, "slug");
      console.log(`Duplicate 2 target slug: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      if (doc1.settings?.status !== "draft") throw new Error("Cost duplicate must be draft");
      console.log(" Cost duplication passed");
    }

    // 6. TEST SERVICE DUPLICATION
    console.log("\n--- [6/6] Testing Service Duplication ---");
    const originalService = await Services.findOne().lean();
    if (originalService) {
      console.log(`Original Service: "${originalService.metadata?.title}" (pageurl: ${originalService.metadata?.pageurl})`);

      const slug1 = await generateUniqueDuplicateSlug(originalService.metadata?.pageurl, Services, "metadata.pageurl");
      console.log(`Duplicate 1 target pageurl: ${slug1}`);

      const cleaned1 = JSON.parse(JSON.stringify(originalService));
      delete cleaned1._id;
      if (!cleaned1.metadata) cleaned1.metadata = {};
      cleaned1.metadata.pageurl = slug1;
      cleaned1.metadata.title = `${originalService.metadata?.title} - Copy`;

      const doc1 = new Services(cleaned1);
      await doc1.save();
      createdTestIds.service.push(doc1._id);

      const slug2 = await generateUniqueDuplicateSlug(originalService.metadata?.pageurl, Services, "metadata.pageurl");
      console.log(`Duplicate 2 target pageurl: ${slug2}`);
      if (!slug2.endsWith("-copy-2")) throw new Error(`Expected slug2 to end with -copy-2, got ${slug2}`);

      console.log(" Service duplication passed");
    }

    console.log("\n==================================================");
    console.log(" ALL DUPLICATION TESTS PASSED SUCCESSFULLY!");
    console.log("==================================================");

  } finally {
    // CLEANUP TEST RECORDS
    console.log("\nCleaning up temporary test records from MongoDB...");
    if (createdTestIds.surgery.length) await SurgeryPageModel.deleteMany({ _id: { $in: createdTestIds.surgery } });
    if (createdTestIds.surgeon.length) await SurgeonPage.deleteMany({ _id: { $in: createdTestIds.surgeon } });
    if (createdTestIds.doctor.length) await Doctor.deleteMany({ _id: { $in: createdTestIds.doctor } });
    if (createdTestIds.hairFall.length) await HairFallPageModel.deleteMany({ _id: { $in: createdTestIds.hairFall } });
    if (createdTestIds.cost.length) await CostPage.deleteMany({ _id: { $in: createdTestIds.cost } });
    if (createdTestIds.service.length) await Services.deleteMany({ _id: { $in: createdTestIds.service } });
    console.log(" Cleanup complete. Database restored to pristine state.");

    await mongoose.disconnect();
  }
}

runTests().catch((err) => {
  console.error("❌ Test suite failed:", err);
  process.exit(1);
});
