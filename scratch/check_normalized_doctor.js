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

    // Replicate normalizeDoctor from page.js
    const b = doc.basicInfo || {};
    const s = doc.surgeonProfile || {};
    const normalizedDoctor = {
        ...doc,
        name: b.doctorName || doc.pageName || "Dr. Specialist",
        image: b.profileImage?.image || "/uploads/turkey-doctor.jpg",
        designation: b.designation || "Hair Transplant Surgeon",
        location: b.city || "Delhi",
        city: b.city || "Delhi",
        experience: b.yearsExperience ? `${b.yearsExperience}+ Yrs` : "15+ Yrs",
        procedures: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "5,000+",
        proceduresCount: b.proceduresCount ? `${b.proceduresCount.toLocaleString()}+` : "7,500+",
        successRate: b.successRate || "95%+",
        rating: b.rating || 5.0,
        about: s.about || "",
        biography: s.biography || "",
        philosophy: s.philosophy || "",
        languages: b.languages?.length ? b.languages : ["English", "Hindi"],
        specialities: s.specialities?.length ? s.specialities : ["Sapphire FUE", "THI Hair Restoration", "Beard Transplant"],
        qualifications: s.qualifications?.length ? s.qualifications : [
            { degree: "MBBS", institute: "Recognized Medical Council" },
            { degree: "Turkey Certification", institute: "International Hair Restoration Association" },
        ],
        certifications: s.certifications?.length ? s.certifications : [],
        achievements: s.achievements?.length ? s.achievements.map(a => typeof a === "string" ? a : `${a.title || ""}: ${a.description || ""}`) : [],
        memberships: s.memberships?.length ? s.memberships : [],
    };

    // Check all fields on normalizedDoctor that are arrays
    console.log("=== CHECKING NORMALIZED DOCTOR FOR OBJECT ARRAYS ===\n");
    for (const [key, val] of Object.entries(normalizedDoctor)) {
        if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object" && val[0] !== null) {
            console.log(`⚠️  OBJECT ARRAY: doctor.${key} (${val.length} items, keys: [${Object.keys(val[0]).join(", ")}])`);
        }
    }

    await mongoose.disconnect();
}

check().catch(console.error);
