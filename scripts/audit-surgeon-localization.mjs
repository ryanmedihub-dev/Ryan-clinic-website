import mongoose from "mongoose";
import fs from "fs";

await mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection.db;
const docs = await db.collection("surgeonpages").find({}).sort({ _id: 1 }).toArray();

const ALL_CITIES = [
  "Delhi", "New Delhi", "Mumbai", "Hyderabad", "Gurgaon", "Gurugram", "Noida", "Pune",
  "Patna", "Ahmedabad", "Banglore", "Bangalore", "Bengaluru", "Jammu", "Lucknow", "Kolkata",
  "Chennai", "Indore", "Bhopal", "Chandigarh", "Rachi", "Ranchi", "Dehradun", "Nagpur",
  "Jaipur", "Surat", "Amritsar", "Faridabad"
];

function extractTextStrings(obj) {
  let strings = [];
  if (!obj) return strings;
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) {
    for (const item of obj) {
      strings.push(...extractTextStrings(item));
    }
  } else if (typeof obj === "object") {
    for (const [key, val] of Object.entries(obj)) {
      // ignore image urls or technical keys
      if (key === "_id" || key === "icon" || key === "image" || key === "url") continue;
      strings.push(...extractTextStrings(val));
    }
  }
  return strings;
}

const SECTION_KEYS = [
  "hero",
  "whySkill",
  "benefits",
  "whyClinic",
  "surgeonRole",
  "comparison",
  "leadSurgeon",
  "bookingChecklist",
  "procedures",
  "consultationCTA",
  "faq"
];

const localizationAudit = [];

for (const doc of docs) {
  const docCity = doc.general?.city || "";
  const title = doc.title || "";
  const slug = doc.slug || "";
  
  const suspiciousBySection = {};
  let totalForeignMentions = 0;

  for (const sKey of SECTION_KEYS) {
    const sContent = doc[sKey];
    if (!sContent) continue;

    const allStrings = extractTextStrings(sContent);
    const mentions = [];

    for (const str of allStrings) {
      for (const city of ALL_CITIES) {
        // Skip current city and its common aliases
        if (docCity && city.toLowerCase() === docCity.toLowerCase()) continue;
        if (docCity.toLowerCase() === "gurgaon" && city.toLowerCase() === "gurugram") continue;
        if (docCity.toLowerCase() === "banglore" && (city.toLowerCase() === "bangalore" || city.toLowerCase() === "bengaluru")) continue;
        if (docCity.toLowerCase() === "rachi" && city.toLowerCase() === "ranchi") continue;
        if (docCity.toLowerCase() === "delhi" && city.toLowerCase() === "new delhi") continue;

        const regex = new RegExp(`\\b${city}\\b`, "gi");
        if (regex.test(str)) {
          // Check if it's a generic reference e.g., "trained in Delhi" vs local copy e.g. "our clinic in Delhi"
          mentions.push({
            otherCity: city,
            snippet: str.length > 140 ? str.substring(0, 140) + "..." : str
          });
          totalForeignMentions++;
        }
      }
    }

    if (mentions.length > 0) {
      suspiciousBySection[sKey] = mentions;
    }
  }

  localizationAudit.push({
    slug,
    title,
    city: docCity,
    status: doc.settings?.status,
    totalForeignMentions,
    suspiciousBySection
  });
}

fs.writeFileSync("scripts/surgeon_localization_audit.json", JSON.stringify(localizationAudit, null, 2), "utf8");
console.log("Localization audit written. Summarizing foreign mentions:");
for (const item of localizationAudit) {
  const secKeys = Object.keys(item.suspiciousBySection);
  console.log(`- ${item.slug} (${item.city || "NO_CITY"}): ${item.totalForeignMentions} foreign mentions across sections [${secKeys.join(", ")}]`);
}

await mongoose.disconnect();
