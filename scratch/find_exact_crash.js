/**
 * Find which field in the doctor doc contains objects with displayOrder at the TOP LEVEL
 * (not inside nested sub-arrays) that would cause "Objects not valid as React child"
 */
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    for (const line of envConfig.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const [key, ...vals] = trimmed.split("=");
            const val = vals.join("=").replace(/^["']|["']$/g, "");
            process.env[key.trim()] = val.trim();
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

async function check() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const doc = await db.collection("doctors").findOne({ slug: "hair-transplant-doctor-in-delhi" });

    // Check pricing packages features AFTER my fix (what page.js would produce)
    if (doc.pricing?.packages) {
        const packages = doc.pricing.packages.map((p, i) => ({
            title: p.title || `Package ${i + 1}`,
            price: p.price || "",
            priceNote: p.priceNote || "onwards",
            subtitle: p.subtitle || "",
            isFeatured: !!p.isFeatured,
            features: Array.isArray(p.features)
                ? p.features.map((f) =>
                    typeof f === "string" ? f : f.title || f.text || f.description || ""
                ).filter(Boolean)
                : [],
            buttonText: p.buttonText || "Get Free Estimate",
        }));
        console.log("=== NORMALIZED PRICING PACKAGES ===");
        packages.forEach((pkg, i) => {
            console.log(`Pkg ${i}: title="${pkg.title}", features type:`, pkg.features.map(f => typeof f));
        });
    }

    // Check consultationIncludes 
    const sp = doc.surgeonProfile || {};
    if (sp.consultationIncludes?.length) {
        console.log("\n=== consultationIncludes ITEMS ===");
        sp.consultationIncludes.forEach((item, i) => {
            console.log(`  Item ${i}:`, typeof item, "=>", typeof item === "object" ? JSON.stringify(item) : item);
        });
    }

    // Check whyChooseDoctor (passed via surgeonProfile in page.js)
    if (sp.whyChooseDoctor?.length) {
        console.log("\n=== whyChooseDoctor ITEMS ===");
        sp.whyChooseDoctor.forEach((item, i) => {
            console.log(`  Item ${i}:`, typeof item, "=>", typeof item === "object" ? JSON.stringify(item) : item);
        });
    }

    // Check ALL arrays in doc for object items that could cause the issue
    function scanArrays(obj, path = "") {
        if (!obj || typeof obj !== "object") return;
        if (Array.isArray(obj)) {
            obj.forEach((item, idx) => {
                if (item && typeof item === "object" && !Array.isArray(item)) {
                    const keys = Object.keys(item);
                    if (keys.includes("displayOrder") && (keys.includes("title") || keys.includes("description"))) {
                        // This is a potentially problematic object
                        // Check if it's directly in a "features" array
                        if (path.endsWith("features") || path.endsWith("consultationIncludes") || path.endsWith("items")) {
                            console.log(`\n⚠️  OBJECT IN ARRAY AT: ${path}[${idx}] => keys: [${keys.join(", ")}]`);
                            console.log("   Sample:", JSON.stringify(item));
                        }
                    }
                }
                scanArrays(item, `${path}[${idx}]`);
            });
        } else {
            for (const k of Object.keys(obj)) {
                scanArrays(obj[k], path ? `${path}.${k}` : k);
            }
        }
    }
    
    console.log("\n=== SCANNING ALL ARRAYS WITH OBJECT ITEMS ===");
    scanArrays(doc);

    await mongoose.disconnect();
}

check().catch(console.error);
