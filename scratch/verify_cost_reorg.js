const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ryan-clinic";

async function verifyHeadings() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const CostPage = mongoose.connection.collection("costpages");
  const doc = await CostPage.findOne({ slug: "fue-hair-transplant-cost-in-delhi" });

  if (!doc) {
    console.error("ERROR: fue-hair-transplant-cost-in-delhi page not found!");
    process.exit(1);
  }

  console.log("Found page:", doc.title);
  console.log("Section Visibility Keys:", Object.keys(doc.sectionVisibility || {}));

  // List of required FUE Delhi marketing headings
  const requiredHeadings = [
    "Best FUE Hair Transplant Cost in Delhi",
    "How much does FUE hair transplant cost in Delhi?",
    "FUE hair transplant cost per graft in Delhi",
    "FUE hair transplant cost by graft count in Delhi",
    "What's included in FUE hair transplant cost in Delhi",
    "What affects FUE hair transplant cost and price in Delhi",
    "FUE vs Sapphire FUE vs THT cost in Delhi",
    "FUE vs FUT cost in Delhi",
    "FUE hair transplant cost in Delhi vs Turkey",
    "Is a cheap FUE hair transplant in Delhi worth it?",
    "EMI and payment options for FUE hair transplant in Delhi",
    "Ryan Clinic FUE hair transplant cost in Delhi (transparent pricing)",
    "Why our FUE hair transplant cost in Delhi is worth it",
    "Myths vs facts about FUE hair transplant cost in Delhi",
    "Visiting Ryan Clinic for FUE hair transplant in Delhi",
    "Get your FUE hair transplant cost quote in Delhi",
    "FUE hair transplant cost in Delhi — frequently asked questions",
  ];

  console.log("\n--- Verification Result ---");
  console.log(`Title: ${doc.title}`);
  console.log(`PageType: ${doc.pageType}`);

  await mongoose.disconnect();
}

verifyHeadings().catch(console.error);
