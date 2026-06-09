/**
 * Export all branch service documents from MongoDB to a txt file.
 * Run: node --env-file=.env.local scripts/export-branches.mjs
 *
 * Output: scripts/branches-data.txt  (pretty-printed JSON array)
 *
 * Flags:
 *   --all    Export every service (not just branch pages)
 *   --out <path>  Custom output path (default: scripts/branches-data.txt)
 */

import mongoose from "mongoose";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Parse flags ───────────────────────────────────────────────────────────────
const ALL  = process.argv.includes("--all");
const outArgIdx = process.argv.indexOf("--out");
const OUT_PATH  = outArgIdx !== -1
  ? resolve(process.argv[outArgIdx + 1])
  : resolve(__dirname, "branches-data.txt");

// ── Minimal schema — strict:false so every field is preserved ─────────────────
const serviceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const Service = mongoose.models.Services || mongoose.model("Services", serviceSchema);

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    console.error("❌  MONGO_URL not found. Pass it via --env-file=.env.local");
    process.exit(1);
  }

  console.log("\n🔗  Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL, { bufferCommands: false });
  console.log("✅  Connected\n");

  const filter = ALL ? {} : { "metadata.pageType": "branch" };
  const label  = ALL ? "all services" : "branch services";

  const services = await Service.find(filter).lean();
  console.log(`📋  Found ${services.length} ${label}`);

  if (services.length === 0) {
    console.log("    Nothing to export.\n");
    await mongoose.disconnect();
    return;
  }

  // Pretty-print with 2-space indent so the file is human-editable
  const output = JSON.stringify(services, null, 2);
  writeFileSync(OUT_PATH, output, "utf8");

  console.log(`\n📄  Exported to: ${OUT_PATH}`);
  console.log(`    Total services: ${services.length}`);
  services.forEach((s, i) => {
    const name = s.metadata?.pageName || s.metadata?.pageurl || s._id;
    const type = s.metadata?.pageType || "unknown";
    console.log(`    ${String(i + 1).padStart(2, "0")}. [${type}] ${name}`);
  });

  await mongoose.disconnect();
  console.log("\n🔌  DB disconnected");
  console.log("🎉  Done.\n");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
