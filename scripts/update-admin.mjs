/**
 * Update Admin Credentials Script
 * Run: node --env-file=.env.local scripts/update-admin.mjs
 *
 * What this does:
 *  1. Updates the admin email + password in MongoDB (bcrypt hashed)
 *  2. Rotates NEXTAUTH_SECRET in .env.local
 *     → All existing JWT sessions are instantly invalidated (everyone is logged out)
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFileSync, writeFileSync } from "fs";
import { randomBytes } from "crypto";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH  = resolve(__dirname, "../.env.local");

// ── New credentials ──────────────────────────────────────────
const NEW_EMAIL    = "sachin8287037611@gmail.com";
const NEW_PASSWORD = "Dashzer@1503";
const NEW_NAME     = "Admin";
// ─────────────────────────────────────────────────────────────

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.error("❌  MONGO_URL not found in .env.local");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  name:     String,
  email:    { type: String, unique: true },
  password: String,
  role:     { type: String, default: "user" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// ── Rotate NEXTAUTH_SECRET in .env.local ─────────────────────
function rotateNextAuthSecret() {
  const newSecret = randomBytes(32).toString("hex");

  let envContent = readFileSync(ENV_PATH, "utf8");

  if (/^NEXTAUTH_SECRET\s*=/m.test(envContent)) {
    // Replace existing value
    envContent = envContent.replace(
      /^NEXTAUTH_SECRET\s*=.*/m,
      `NEXTAUTH_SECRET=${newSecret}`
    );
  } else {
    // Append if missing
    envContent += `\nNEXTAUTH_SECRET=${newSecret}\n`;
  }

  writeFileSync(ENV_PATH, envContent, "utf8");
  return newSecret;
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  // Step 1: Update credentials in DB
  console.log("\n🔗  Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL, { bufferCommands: false });
  console.log("✅  Connected\n");

  const hashed   = await bcrypt.hash(NEW_PASSWORD, 10);
  const existing = await User.findOne({ role: "admin" });

  if (existing) {
    existing.email    = NEW_EMAIL;
    existing.password = hashed;
    existing.name     = NEW_NAME;
    await existing.save();
    console.log("✅  Admin credentials updated in DB");
  } else {
    await User.create({
      name:     NEW_NAME,
      email:    NEW_EMAIL,
      password: hashed,
      role:     "admin",
    });
    console.log("✅  New admin user created in DB");
  }

  console.log(`   Email    → ${NEW_EMAIL}`);
  console.log(`   Password → ${NEW_PASSWORD}`);

  await mongoose.disconnect();
  console.log("🔌  DB disconnected\n");

  // Step 2: Rotate NEXTAUTH_SECRET → invalidates ALL existing JWT sessions
  const newSecret = rotateNextAuthSecret();
  console.log("🔑  NEXTAUTH_SECRET rotated in .env.local");
  console.log(`   New secret → ${newSecret}`);
  console.log("\n⚠️   Restart the Next.js server to apply the new secret.");
  console.log("    All users currently logged in will be signed out.\n");
  console.log("🎉  Done.\n");
}

main().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
