import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("No MONGO_URL found in environment");
  process.exit(1);
}

const candidateData = JSON.parse(
  fs.readFileSync("scratch/db_graft_candidates.json", "utf8")
);

console.log(`Loaded ${candidateData.length} candidate documents from audit.`);

await mongoose.connect(MONGO_URL);
const db = mongoose.connection.db;

const backup = {
  exportedAt: new Date().toISOString(),
  totalDocuments: candidateData.length,
  collections: {
    services: [],
    doctors: [],
    surgerypages: [],
    blogs: []
  }
};

const inspectionResults = [];

for (const item of candidateData) {
  const collectionName = item.collection;
  const col = db.collection(collectionName);
  const doc = await col.findOne({ _id: new mongoose.Types.ObjectId(item.id) });

  if (!doc) {
    console.warn(`[WARN] Document ${item.id} not found in ${collectionName}`);
    continue;
  }

  backup.collections[collectionName].push(doc);

  // Deep inspect string fields for graft survival / rate mentions
  function findGraftFields(obj, currentPath = "") {
    const found = [];
    if (!obj) return found;

    if (typeof obj === "string") {
      if (
        /(graft|follicle|survival|successRate|success\s*rate|viability)/i.test(obj) &&
        /(90%|95%|97%|98%|99%|90-95%|90\+|95\+|97\+|98\+)/i.test(obj)
      ) {
        found.push({ path: currentPath, value: obj });
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((elem, idx) => {
        found.push(...findGraftFields(elem, `${currentPath}[${idx}]`));
      });
    } else if (typeof obj === "object") {
      for (const key of Object.keys(obj)) {
        if (key === "_id" || key === "__v") continue;
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        found.push(...findGraftFields(obj[key], newPath));
      }
    }
    return found;
  }

  const matches = findGraftFields(doc);
  inspectionResults.push({
    collection: collectionName,
    id: doc._id.toString(),
    slug: doc.slug || doc.pageName || doc.title,
    title: doc.title || doc.pageName || doc.basicInfo?.doctorName || doc.name,
    matches,
    rawDoc: doc
  });
}

const backupDir = "C:\\Users\\patwa\\.gemini\\antigravity\\brain\\ce36b5e9-b464-410f-87d2-82a2e5196eb1\\scratch";
const backupPath = path.join(backupDir, "mongo_backup_before_graft_standardization.json");
fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2), "utf8");

// Also keep a copy in local scratch/
if (!fs.existsSync("scratch")) fs.mkdirSync("scratch");
fs.writeFileSync("scratch/mongo_backup_before_graft_standardization.json", JSON.stringify(backup, null, 2), "utf8");

const inspectionPath = path.join(backupDir, "mongo_field_inspection.json");
fs.writeFileSync(
  inspectionPath,
  JSON.stringify(
    inspectionResults.map(({ collection, id, slug, title, matches }) => ({
      collection,
      id,
      slug,
      title,
      matches
    })),
    null,
    2
  ),
  "utf8"
);
fs.writeFileSync(
  "scratch/mongo_field_inspection.json",
  JSON.stringify(
    inspectionResults.map(({ collection, id, slug, title, matches }) => ({
      collection,
      id,
      slug,
      title,
      matches
    })),
    null,
    2
  ),
  "utf8"
);

console.log(`Backup successfully written to: ${backupPath}`);
console.log(`Counts exported:
- services: ${backup.collections.services.length}
- doctors: ${backup.collections.doctors.length}
- surgerypages: ${backup.collections.surgerypages.length}
- blogs: ${backup.collections.blogs.length}`);

await mongoose.disconnect();

