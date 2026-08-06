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

async function updateCards() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const whySkillCards = [
        { num: "01", title: "Graft Survival", body: "Careful extraction, minimal handling, correct preservation, and precise implantation all protect follicle viability. Each of these steps is a direct reflection of surgical skill and directly influences how many grafts survive and grow.", image: "/uploads/turkey-doctor.jpg", gradient: "from-[#D32F2F]/90 via-[#D32F2F]/50", showCta: true },
        { num: "02", title: "Hairline Artistry", body: "The surgeon determines the shape, irregularity, direction and angle of each graft at the frontal edge — creating an aesthetic design that complements your facial proportions and looks completely natural.", image: "/uploads/1752734248947-Hair Transplant 1.jpg", gradient: "from-black/85 via-black/30" },
        { num: "03", title: "Density & Coverage", body: "A limited donor supply must be strategically distributed across the scalp. Surgical planning determines how grafts are placed to achieve the most visually effective density and coverage for your pattern of loss.", image: "/uploads/about-one.jpg", gradient: "from-[#D32F2F]/85 via-black/30" },
        { num: "04", title: "Donor Management", body: "Donor hair is finite and cannot be replaced. A skilled surgeon extracts strategically — protecting the donor area from over-harvesting while ensuring enough grafts are available for both current and any future restoration.", image: "/uploads/service-two.jpg", gradient: "from-black/85 via-black/30" },
        { num: "05", title: "Patient Safety", body: "Qualified surgical oversight, sterile protocols, sound patient selection and careful planning protect safety throughout the procedure. Good surgical judgement — not just equipment — is what keeps patients safe.", image: "/uploads/gallery.jpg", gradient: "from-black/85 via-black/30" },
    ];

    const benefitsItems = [
        { number: "01", title: "Hands-On Mastery", text: "The surgeon personally performs or directly controls every critical surgical stage — extraction, recipient-site creation, and implantation — rather than delegating essential surgical work to technicians." },
        { number: "02", title: "Aesthetic Judgement", text: "The surgeon understands facial proportions, age, natural growth direction and long-term hair-loss patterns — and applies that understanding when designing the hairline and distributing grafts for a result that looks natural." },
        { number: "03", title: "Deep Focused Experience", text: "Meaningful experience comes from sustained focus on hair restoration and real exposure to a wide range of hair-loss patterns and case types — not occasional procedures performed alongside unrelated treatments." },
        { number: "04", title: "Technical Range", text: "A skilled surgeon understands multiple hair restoration techniques — FUE, Sapphire FUE, DHI — and selects the most appropriate method based on your individual scalp, graft count, and density needs, rather than applying one approach to every patient." },
        { number: "05", title: "Honesty & Patient Selection", text: "A responsible surgeon assesses whether each patient is a suitable surgical candidate, sets realistic expectations, explains limitations honestly, and recommends non-surgical management when surgery is not yet appropriate — without applying pressure to proceed." },
        { number: "06", title: "Real Patient Portfolio", text: "Patients should be able to review genuine before-and-after cases showing hairline design, density distribution, donor zone management, and natural results across a range of hair-loss patterns — not stock imagery or unverifiable claims." },
    ];

    for (const col of ["surgeonpages", "surgeons"]) {
        const r = await db.collection(col).updateOne(
            { slug: "hair-transplant-surgeon-in-delhi" },
            { $set: { "whySkill.cards": whySkillCards, "benefits.items": benefitsItems } }
        );
        console.log(`${col}: matched=${r.matchedCount} modified=${r.modifiedCount}`);
    }

    // Verify
    const doc = await db.collection("surgeonpages").findOne({ slug: "hair-transplant-surgeon-in-delhi" });
    console.log("\nSection 1 whySkill.cards titles:", doc.whySkill.cards.map(c => c.title).join(", "));
    console.log("Section 2 benefits.items titles:", doc.benefits.items.map(c => c.title).join(", "));

    await mongoose.disconnect();
    console.log("Done.");
}

updateCards().catch(console.error);
