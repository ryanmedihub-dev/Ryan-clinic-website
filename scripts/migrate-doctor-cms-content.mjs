import mongoose from "mongoose";

async function runMigration() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    console.error("MONGO_URL not found in environment");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collection = db.collection("doctors");

  const doctors = await collection.find({}).toArray();
  console.log(`Found ${doctors.length} doctor documents to audit and migrate.\n`);

  let updatedCount = 0;

  for (const doc of doctors) {
    const slug = doc.slug;
    const docName = doc.basicInfo?.doctorName || "Doctor";
    const city = doc.basicInfo?.city || "Delhi";
    const isDelhiOrPranendra = city.toLowerCase() === "delhi" || docName.toLowerCase().includes("pranendra");

    console.log(`--- Processing: [${slug}] (${docName} in ${city}) ---`);

    const updateFields = {};

    // 1. Credentials Card Heading
    if (!doc.credentials?.cardHeading || doc.credentials.cardHeading.trim() === "") {
      updateFields["credentials.cardHeading"] = isDelhiOrPranendra
        ? `Credentials & Medical Registrations — ${docName}`
        : `Credentials & Professional Qualifications — ${docName}`;
    }

    // 2. Credentials Bottom Note
    if (!doc.credentials?.bottomNote || doc.credentials.bottomNote.trim() === "") {
      updateFields["credentials.bottomNote"] =
        "All qualifications, medical council registrations, and board certifications can be independently verified through respective state medical councils prior to any procedure.";
    }

    // 3. Credentials Tabs
    const existingTabs = doc.credentials?.tabs || [];
    let tabsModified = false;
    const newTabs = existingTabs.map((tab) => {
      const updatedTab = { ...tab };
      const titleLower = (tab.title || "").toLowerCase();

      if (!updatedTab.hint || updatedTab.hint.trim() === "") {
        if (titleLower.includes("degree")) updatedTab.hint = "Primary Medical Degree";
        else if (titleLower.includes("council") || titleLower.includes("registration")) updatedTab.hint = "Statutory Medical License";
        else if (titleLower.includes("certif")) updatedTab.hint = "Specialized Training";
        else if (titleLower.includes("experience") || titleLower.includes("volume")) updatedTab.hint = "Surgical Track Record";
        else if (titleLower.includes("member")) updatedTab.hint = "Professional Affiliation";
        else updatedTab.hint = "Accredited Qualification";
        tabsModified = true;
      }

      if (!updatedTab.icon || updatedTab.icon.trim() === "") {
        if (titleLower.includes("degree")) updatedTab.icon = "GraduationCap";
        else if (titleLower.includes("council") || titleLower.includes("registration")) updatedTab.icon = "ShieldCheck";
        else if (titleLower.includes("certif")) updatedTab.icon = "Award";
        else if (titleLower.includes("experience") || titleLower.includes("volume")) updatedTab.icon = "Building2";
        else if (titleLower.includes("member")) updatedTab.icon = "BadgeCheck";
        else updatedTab.icon = "CheckCircle";
        tabsModified = true;
      }

      if (!updatedTab.description || updatedTab.description.trim() === "") {
        if (titleLower.includes("degree")) {
          updatedTab.description = `Recognized medical and surgical qualification accredited by the National Medical Commission (NMC).`;
        } else if (titleLower.includes("council") || titleLower.includes("registration")) {
          updatedTab.description = isDelhiOrPranendra
            ? "Active registration with Delhi Medical Council (DMC-68492) verifying legal license to perform surgical procedures."
            : `Active statutory registration with state medical council verifying legal practice and surgical licensure in ${city}.`;
        } else if (titleLower.includes("certif")) {
          updatedTab.description = "Hands-on specialized training and certification in advanced FUE, Sapphire Micro-FUE, and aesthetic hairline reconstruction.";
        } else if (titleLower.includes("experience") || titleLower.includes("volume")) {
          updatedTab.description = "Proven surgical track record performing high-density graft extractions, natural hairline design, and corrective revision cases.";
        } else if (titleLower.includes("member")) {
          updatedTab.description = "Affiliated with recognized surgical and aesthetic restoration bodies, adhering strictly to global patient safety protocols.";
        } else {
          updatedTab.description = "Comprehensive certified medical credential meeting clinical excellence standards.";
        }
        tabsModified = true;
      }

      if (!updatedTab.ctaText || updatedTab.ctaText.trim() === "") {
        if (titleLower.includes("council") || titleLower.includes("registration")) {
          updatedTab.ctaText = "Verify Registration";
          updatedTab.ctaLink = "https://www.nmc.org.in";
          tabsModified = true;
        } else if (titleLower.includes("certif")) {
          updatedTab.ctaText = "Our Techniques";
          updatedTab.ctaLink = "#why-us";
          tabsModified = true;
        } else if (titleLower.includes("experience")) {
          updatedTab.ctaText = "Book Consultation";
          updatedTab.ctaLink = "#contact";
          tabsModified = true;
        }
      }

      return updatedTab;
    });

    if (tabsModified) {
      updateFields["credentials.tabs"] = newTabs;
    }

    // 4. Verification Checklist (populate if empty or all titles empty)
    const existingChecklist = doc.verification?.checklist || [];
    const hasValidChecklist = existingChecklist.some((item) => item && item.title && item.title.trim().length > 0);
    if (!hasValidChecklist) {
      updateFields["verification.checklist"] = [
        {
          key: "reg-online",
          title: `Verify ${city} state medical council registration on official online register`,
          checked: true,
          displayOrder: 1,
        },
        {
          key: "pg-qualification",
          title: "Confirm post-graduate surgical qualification and documented hair restoration experience",
          checked: true,
          displayOrder: 2,
        },
        {
          key: "doc-led",
          title: "Ensure operating doctor personally designs hairline and performs graft recipient incisions",
          checked: true,
          displayOrder: 3,
        },
        {
          key: "ot-safety",
          title: "Inspect clinic OT sterilization protocols and emergency medical backup infrastructure",
          checked: true,
          displayOrder: 4,
        },
        {
          key: "transparent-pricing",
          title: "Demand transparent per-graft pricing with complete written post-op guarantee",
          checked: true,
          displayOrder: 5,
        },
      ];
    }

    // 5. Surgeon Profile Headings
    if (!doc.surgeonProfile?.achievementsHeading || doc.surgeonProfile.achievementsHeading.trim() === "") {
      updateFields["surgeonProfile.achievementsHeading"] = "Key Surgical Achievements & Accreditations";
    }
    if (!doc.surgeonProfile?.consultationHeading || doc.surgeonProfile.consultationHeading.trim() === "") {
      updateFields["surgeonProfile.consultationHeading"] = "What Your Consultation Includes";
    }

    // 6. Surgeon Profile Achievements isolation (no Dr. Pranendra DMC-68492 leakage on non-Delhi doctors)
    if (!isDelhiOrPranendra && doc.surgeonProfile?.achievements?.length > 0) {
      let achModified = false;
      const cleanedAchievements = doc.surgeonProfile.achievements.map((ach) => {
        const title = (ach.title || "").toLowerCase();
        const desc = (ach.description || "").toLowerCase();
        if (title.includes("delhi medical council") || desc.includes("dmc-68492") || desc.includes("delhi medical council")) {
          achModified = true;
          return {
            key: "council-reg",
            title: "State Medical Council",
            description: `Active state medical council registration verifying credentials and surgical licensure in ${city}.`,
            displayOrder: ach.displayOrder || 0,
          };
        }
        return ach;
      });
      if (achModified) {
        updateFields["surgeonProfile.achievements"] = cleanedAchievements;
      }
    }

    // 7. KeyFacts isolation (clean up copied DMC-68492 on non-Delhi doctors)
    if (!isDelhiOrPranendra && doc.keyFacts) {
      if (doc.keyFacts.registration === "DMC-68492") {
        updateFields["keyFacts.registration"] = `Registered Medical Council (${city})`;
      }
      if (doc.keyFacts.memberships === "Delhi Medical Council Registered") {
        updateFields["keyFacts.memberships"] = `${city} Medical Council Registered`;
      }
      if (doc.keyFacts.qualifications && doc.keyFacts.qualifications.includes("DMC-68492")) {
        updateFields["keyFacts.qualifications"] = doc.keyFacts.qualifications.replace(/,?\s*DMC-68492/g, "").trim();
      }
    }

    if (Object.keys(updateFields).length > 0) {
      await collection.updateOne({ _id: doc._id }, { $set: updateFields });
      console.log(`Updated fields: ${Object.keys(updateFields).join(", ")}`);
      updatedCount++;
    } else {
      console.log("No changes needed.");
    }
  }

  console.log(`\nMigration complete! Updated ${updatedCount} of ${doctors.length} documents.`);
  await mongoose.disconnect();
}

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
