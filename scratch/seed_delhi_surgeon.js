const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Read .env.local manually
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

if (!MONGODB_URI) {
    console.error("MONGODB_URI missing from .env.local");
    process.exit(1);
}

const SurgeonSchema = new mongoose.Schema({
    title: String,
    slug: String,
    general: mongoose.Schema.Types.Mixed,
    seo: mongoose.Schema.Types.Mixed,
    hero: mongoose.Schema.Types.Mixed,
    whySkill: mongoose.Schema.Types.Mixed,
    benefits: mongoose.Schema.Types.Mixed,
    whyClinic: mongoose.Schema.Types.Mixed,
    surgeonRole: mongoose.Schema.Types.Mixed,
    comparison: mongoose.Schema.Types.Mixed,
    leadSurgeon: mongoose.Schema.Types.Mixed,
    bookingChecklist: mongoose.Schema.Types.Mixed,
    procedures: mongoose.Schema.Types.Mixed,
    consultationCTA: mongoose.Schema.Types.Mixed,
    faq: mongoose.Schema.Types.Mixed,
    experienceSpecialization: mongoose.Schema.Types.Mixed,
    skillEvaluation: mongoose.Schema.Types.Mixed,
    hairlineArtistry: mongoose.Schema.Types.Mixed,
    revisionRepair: mongoose.Schema.Types.Mixed,
    costConsultation: mongoose.Schema.Types.Mixed,
    visitSurgeon: mongoose.Schema.Types.Mixed,
    settings: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

const SurgeonPage = mongoose.models.SurgeonPage || mongoose.model("SurgeonPage", SurgeonSchema, "surgeons");

async function seed() {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const slug = "hair-transplant-surgeon-in-delhi";

    const data = {
        title: "Best Hair Transplant Surgeon in Delhi",
        spotlightTitle: "Meet the hair transplant surgeon at Ryan Clinic, Delhi",
        slug,

        general: {
            pageName: "Hair Transplant Surgeon in Delhi",
            city: "Delhi",
            shortDescription: "Book a consultation with Dr. Pranendra Singh, Delhi's leading 100% doctor-led hair transplant surgeon.",
            status: "published",
        },

        seo: {
            metaTitle: "Best Hair Transplant Surgeon in Delhi | Dr. Pranendra Singh | Ryan Clinic",
            metaDescription: "Book a consultation with Dr. Pranendra Singh, Delhi's leading 100% doctor-led hair transplant surgeon. AIIMS/PGIMER trained with 15+ years experience and 5,000+ surgeries.",
            keywords: ["best hair transplant surgeon in delhi", "hair transplant surgeon delhi", "dr pranendra singh"],
            canonical: "https://www.clinicryan.com/surgeon/hair-transplant-surgeon-in-delhi",
            robots: "index, follow",
        },

        hero: {
            badge: { text: "Ryan Clinic · Surgical Excellence" },
            title: "Best Hair Transplant Surgeon in Delhi",
            description: "Your result depends less on the clinic name or machine used, and more on the hands and artistic eye of your surgeon. At Ryan Clinic in Pitampura, your hair transplant is 100% surgeon-led from start to finish — never delegated to technicians.",
            doctorCard: {
                doctorName: "Dr. Pranendra Singh",
                qualification: "MBBS (AIIMS) · MS (PGIMER) · Turkey FUE Specialist",
                experience: "15+ Years Specialization",
                designation: "Lead Hair Transplant Surgeon",
                image: { url: "/uploads/turkey-doctor.jpg", alt: "Dr. Pranendra Singh Best Hair Transplant Surgeon in Delhi" },
            },
        },

        leadSurgeon: {
            badge: { text: "OUR LEAD SURGEON" },
            heading: "Best Hair Transplant Surgeon in Delhi",
            description: "Dr. Pranendra Singh (MBBS AIIMS, MS PGIMER, Turkey FUE Fellowship) is India's foremost authority on Turkey's Sapphire FUE technique. With 15+ years and 5,000+ procedures, he personally performs every hairline design, graft extraction, and implantation step for Delhi patients.",
            qualifications: [
                { text: "MBBS — All India Institute of Medical Sciences (AIIMS)" },
                { text: "MS — Post Graduate Institute of Medical Education and Research (PGIMER)" },
                { text: "Turkey FUE Fellowship — Istanbul Hair Restoration Centre" },
                { text: "Member — International Society of Hair Restoration Surgery (ISHRS)" },
            ],
            stats: [
                { value: "15+", label: "Years Experience" },
                { value: "5,000+", label: "Procedures" },
                { value: "AIIMS", label: "MBBS" },
                { value: "Turkey", label: "FUE Certified" },
            ],
        },

        whySkill: {
            badge: { text: "Surgical Excellence" },
            heading: "Why a skilled hair transplant surgeon in Delhi matters more than anything else",
            description: "At Ryan Clinic, excellence is not a promise — it's our track record. From Turkey's finest techniques to 5,000+ successful patient outcomes, here is why patients trust our surgical leadership.",
        },

        benefits: {
            badge: { text: "Trusted Qualifications" },
            heading: "What makes the best hair transplant surgeon in Delhi",
            description: "Ryan Clinic's surgeon combines Turkey's most advanced Sapphire FUE technique with 15+ years of dedicated hair restoration experience — delivering results that last a lifetime with precision that sets a new standard.",
        },

        whyClinic: {
            badge: { text: "Why Choose Ryan Clinic" },
            heading: "Why Choose Dr. Pranendra Singh as Your Hair Transplant Surgeon in Delhi?",
            description: "Among the many options for a hair transplant surgeon in Delhi, here's what makes Dr. Pranendra Singh at Ryan Clinic the choice of 5,000+ patients.",
        },

        surgeonRole: {
            badge: { text: "Step-By-Step Surgical Excellence" },
            heading: "The hair transplant surgeon's role at every step in Delhi",
            description: "A great hair transplant surgeon is hands-on at every stage because each step directly shapes your final hairline and graft survival rate.",
        },

        comparison: {
            badge: { text: "The Critical Difference" },
            heading: "Hair transplant surgeon vs technician in Delhi: the difference that defines your result",
            description: "In high-volume 'graft mills,' technicians perform extraction and implantation. At Ryan Clinic, every skilled surgical step is performed by a qualified surgeon — protecting your graft survival and natural hairline.",
        },

        experienceSpecialization: {
            badge: { text: "SURGEON CREDENTIALS" },
            heading: "Experience and specialization to look for in a hair transplant surgeon in Delhi",
            description: "Evaluating surgical credentials, case volume, and sub-specialty fellowship training ensures you select a doctor who delivers safe, natural, and long-lasting hair restoration.",
            items: [
                { title: "15+ Years Dedicated Focus", icon: "🏆", description: "Exclusive focus on hair restoration surgery rather than general plastic procedures." },
                { title: "Turkey Fellowship Training", icon: "🎓", description: "Advanced specialization in Sapphire FUE and direct graft implantation methods." },
                { title: "5,000+ Verifiable Cases", icon: "📋", description: "A proven track record covering Norwood stages 2 to 7 with high density outcomes." },
            ],
        },

        skillEvaluation: {
            badge: { text: "SKILL ASSESSMENT" },
            heading: "How to judge a hair transplant surgeon's skill in Delhi before booking",
            description: "Key metrics to review when assessing a hair transplant surgeon's craftsmanship include graft survival rates, hairline naturalness, and donor zone preservation.",
            items: [
                { label: "Graft Survival Rate", score: 95, description: "Minimal out-of-body time & Choi pen protection." },
                { label: "Donor Conservation", score: 98, description: "Micro-punch extraction avoiding over-harvesting." },
                { label: "Hairline Macro-Irregularity", score: 96, description: "Single graft feathering for natural framing." },
                { label: "Patient Satisfaction", score: 99, description: "Verified follow-up results across 18 months." },
            ],
        },

        hairlineArtistry: {
            badge: { text: "AESTHETIC DESIGN" },
            heading: "The artistry of hairline design: what surgical skill looks like in Delhi",
            description: "A natural hairline requires artistic vision, taking into consideration your facial proportions, temporal angles, and long-term age progression.",
            image: { url: "/uploads/gallery.jpg", alt: "Hairline Artistry Design" },
            items: [
                { title: "Micro-Irregular Patterning", description: "Avoiding harsh straight lines through soft single-follicle placement." },
                { title: "Natural Radial Direction", description: "Implanting at precise acute angles (10–15°) matching original hair growth." },
                { title: "Age-Appropriate Placement", description: "Designing a hairline that looks natural today and as you mature." },
            ],
        },

        revisionRepair: {
            badge: { text: "CORRECTIVE SURGERY" },
            heading: "Revision and repair work by a hair transplant surgeon in Delhi",
            description: "Repairing botched hair transplants from technician-led clinics requires advanced surgical expertise to soften plugs, refine unnatural hairlines, and restore depleted donor areas.",
            items: [
                { title: "Plug Graft Extraction", description: "Removing large, unnatural plug grafts and re-implanting them as soft singles." },
                { title: "Hairline Softening & Lowering", description: "Re-establishing natural temporal peaks and soft transition zones." },
                { title: "Donor Scar Camouflage", description: "FUE harvesting and SMP repair for depleted or scarred donor areas." },
            ],
        },

        costConsultation: {
            badge: { text: "TRANSPARENT PRICING" },
            heading: "Cost of consulting a hair transplant surgeon in Delhi",
            description: "Transparent per-graft pricing based on your exact scalp assessment, with zero hidden fees and flexible 0% EMI payment options.",
            disclaimer: "* Exact pricing is provided in writing following your in-person or online scalp consultation.",
            items: [
                { label: "1,500 – 2,000 Grafts (Norwood 2-3)", value: "Starting from ₹40,000" },
                { label: "2,500 – 3,500 Grafts (Norwood 4-5)", value: "Starting from ₹65,000" },
                { label: "4,000+ Grafts (Norwood 6-7)", value: "Custom Quote on Assessment" },
            ],
        },

        bookingChecklist: {
            badge: { text: "Due Diligence Checklist" },
            questionsHeading: "Questions to ask a hair transplant surgeon in Delhi before booking",
            redFlagsHeading: "Red flags when choosing a hair transplant surgeon in Delhi",
        },

        procedures: {
            badge: { text: "Procedures & Location" },
            heading: "Procedures performed by our hair transplant surgeon in Delhi",
            description: "Free scalp analysis included. Transparent per-graft pricing confirmed after your consultation — before you commit. 0% EMI available.",
        },

        visitSurgeon: {
            badge: { text: "VISIT OUR CLINIC" },
            heading: "Visiting our hair transplant surgeon in Delhi",
            address: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034. Accessible via Pitampura Metro Station (Red Line).",
            phone: "+91-9911111247",
            hours: "Mon–Sat, 9 AM – 7 PM",
        },

        ctaSection: {
            heading: "Book a consultation with a hair transplant surgeon in Delhi",
        },

        faq: {
            badge: { text: "Got Questions?" },
            heading: "Hair transplant surgeon in Delhi — frequently asked questions",
            description: "Everything you need to know about choosing the right hair transplant surgeon in Delhi — credentials, technique, cost, and results.",
        },

        settings: {
            status: "published",
            featured: true,
            displayOrder: 1,
            showInSitemap: true,
            allowIndexing: true,
        },
    };

    const doc = await SurgeonPage.findOneAndUpdate(
        { slug },
        { $set: data },
        { upsert: true, new: true }
    );

    console.log("Successfully seeded surgeon page:", doc.slug, "(ID:", doc._id, ")");
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error("Seed error:", err);
    process.exit(1);
});
