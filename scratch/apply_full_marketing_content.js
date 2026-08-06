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

async function updateFullContent() {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;

    const fullData = {
        title: "Best Hair Transplant Surgeon in Delhi",
        slug: "hair-transplant-surgeon-in-delhi",
        spotlightTitle: "Meet the hair transplant surgeon at Ryan Clinic, Delhi",

        general: {
            pageName: "Hair Transplant Surgeon in Delhi",
            city: "Delhi",
            shortDescription: "Looking for the best hair transplant surgeon in Delhi? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.",
            status: "published",
        },

        seo: {
            metaTitle: "Best Hair Transplant Surgeon in Delhi | Ryan Clinic",
            metaDescription: "Looking for the best hair transplant surgeon in Delhi? Meet Ryan Clinic's surgeon, who personally performs every FUE/DHI step with natural-hairline artistry. Book now.",
            keywords: ["hair transplant surgeon in Delhi", "best hair transplant surgeon in Delhi", "hair transplant surgeon Delhi", "best hair transplant surgeon Delhi"],
            canonical: "https://www.clinicryan.com/hair-transplant-surgeon-in-delhi",
            robots: "index, follow",
            ogTitle: "Best Hair Transplant Surgeon in Delhi — Doctor-Led FUE & DHI | Ryan Clinic",
            ogDescription: "Why surgical skill decides your result, what to look for, and the surgeon behind Ryan Clinic's natural, lasting hair transplants in Delhi.",
        },

        hero: {
            badge: { text: "Ryan Clinic · Surgical Excellence" },
            title: "Best Hair Transplant Surgeon in Delhi",
            description: "Your result depends less on the clinic's name or the machine used and more on the hands and eye of the surgeon. The best hair transplant surgeon in Delhi is a qualified, experienced surgeon who personally performs every step — designing a natural hairline, extracting follicles cleanly, and implanting each graft at the right angle, depth, and density. At Ryan Clinic in Pitampura, your hair transplant is surgeon-led from start to finish, never delegated to technicians. Suitability and results vary — a consultation decides what's right for you.",
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
            description: "Your result depends less on the clinic's name or the machine used and more on the hands and eye of the surgeon. The best hair transplant surgeon in Delhi is a qualified, experienced surgeon who personally performs every step — designing a natural hairline, extracting follicles cleanly, and implanting each graft at the right angle, depth, and density. At Ryan Clinic in Pitampura, your hair transplant is surgeon-led from start to finish, never delegated to technicians.",
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
            description: "A hair transplant is a one-time redistribution of a finite donor supply — and an aesthetic procedure on your face and scalp. Both facts point to the same conclusion: the surgeon's skill is the single biggest factor in your outcome. A gifted hair transplant surgeon in Delhi makes a result look completely natural; an inexperienced or absent one can waste follicles you can never recover and leave a result that looks \"off.\"",
            highlights: [
                "Graft survival — gentle, precise extraction and minimal handling keep follicles viable.",
                "Hairline artistry — angle, irregularity, and a soft-to-dense gradient that frames your face.",
                "Density and coverage — distributing a limited donor supply for the most natural impact.",
                "Donor management — harvesting without over-thinning the back and sides.",
                "Safety — clean technique and sound judgement throughout.",
            ],
            footerNote: "No blade, pen, or brand name compensates for a surgeon who lacks experience — or who isn't actually doing the surgery.",
        },

        benefits: {
            badge: { text: "Trusted Qualifications" },
            heading: "What makes the best hair transplant surgeon in Delhi",
            description: "The best hair transplant surgeon in Delhi combines surgical precision with an artist's eye:",
            items: [
                { title: "Hands-on mastery", text: "Performs extraction, recipient-site creation, and implantation personally." },
                { title: "Aesthetic judgement", text: "Designs hairlines that suit your age, face shape, and future hair loss." },
                { title: "Deep, focused experience", text: "A high volume of hair-transplant cases, including ones like yours." },
                { title: "Technical range", text: "Fluent in FUE, Sapphire FUE, and DHI, choosing the right one for your case." },
                { title: "Honesty", text: "Recommends surgery only when it's right, and sets realistic expectations." },
                { title: "A real portfolio", text: "Before-and-afters of the surgeon's own patients that prove the skill." },
            ],
            footerNote: "For this keyword, evidence of skill — the surgeon's own results — matters more than slogans or claimed statistics.",
        },

        surgeonRole: {
            badge: { text: "Step-By-Step Surgical Excellence" },
            heading: "The hair transplant surgeon's role at every step in Delhi",
            description: "A great hair transplant surgeon in Delhi is involved at every stage, because each one depends on surgical skill:",
            steps: [
                { num: "01", title: "Consultation & design", body: "The surgeon assesses your donor area and pattern, then designs a natural, age-appropriate hairline — the step that most defines how natural your result looks." },
                { num: "02", title: "Graft extraction", body: "The surgeon extracts follicular units precisely, protecting graft quality and the donor area." },
                { num: "03", title: "Recipient-site creation", body: "The surgeon sets the angle, depth, and direction of each site to mimic natural growth." },
                { num: "04", title: "Implantation", body: "Grafts are placed for natural density and flow — by Choi pen (DHI) or into sapphire channels (Sapphire FUE)." },
                { num: "05", title: "Follow-up", body: "The surgeon monitors healing and growth across your 12–18 month cycle." },
            ],
            footerNote: "When you choose a surgeon, you're choosing who performs each of these — which is exactly why a surgeon-led hair transplant in Delhi outperforms technician-led work.",
        },

        comparison: {
            badge: { text: "The Critical Difference" },
            heading: "Hair transplant surgeon vs technician in Delhi: the difference that defines your result",
            description: "This is the most important thing to verify at any clinic in Delhi. In many high-volume \"graft mills,\" technicians perform large parts of the surgery — including extraction and implantation — while the surgeon's role is minimal. Technician-heavy, rushed work is a leading cause of poor graft survival and unnatural hairlines.",
            table: [
                { step: "Hairline design", ryan: "Surgeon", competitor: "Variable" },
                { step: "Graft extraction", ryan: "Surgeon", competitor: "Often technicians" },
                { step: "Recipient-site creation", ryan: "Surgeon", competitor: "Often technicians" },
                { step: "Implantation", ryan: "Surgeon", competitor: "Often technicians" },
                { step: "Judgement & problem-solving", ryan: "Surgeon", competitor: "Limited" },
                { step: "Follow-up", ryan: "Surgeon", competitor: "Often ends at discharge" },
            ],
            footerNote: "Choosing the best hair transplant surgeon in Delhi means insisting the surgeon — not a technician — does the work that determines your result.",
        },

        experienceSpecialization: {
            badge: { text: "SURGEON CREDENTIALS" },
            heading: "Experience and specialization to look for in a hair transplant surgeon in Delhi",
            description: "When evaluating a hair transplant surgeon in Delhi, weigh:",
            items: [
                { title: "Years focused on hair restoration", icon: "🏆", description: "Documented years dedicated to hair restoration and approximate case volume." },
                { title: "Specialization", icon: "🎓", description: "A surgeon who concentrates on hair transplants, not an occasional add-on service." },
                { title: "Technique fluency", icon: "📋", description: "FUE, Sapphire FUE, and DHI, with a clear rationale for what they recommend for you." },
                { title: "Hairline-design portfolio", icon: "✒️", description: "Natural fronts across different ages and patterns." },
                { title: "Revision experience", icon: "🔄", description: "The skill to repair or improve previous unsatisfactory transplants (a strong marker of surgical ability)." },
            ],
            footerNote: "Note: different medical backgrounds can produce an excellent hair transplant surgeon. What matters is genuine hair-restoration training, real surgical experience, and a portfolio that proves the skill — not one specific specialty.",
        },

        skillEvaluation: {
            badge: { text: "SKILL ASSESSMENT" },
            heading: "How to judge a hair transplant surgeon's skill in Delhi before booking",
            description: "Don't rely on claims — look for evidence of skill:",
            items: [
                { num: "1", title: "Study before-and-afters", description: "Study the surgeon's own before-and-afters, especially hairlines and cases like yours." },
                { num: "2", title: "Confirm surgeon role", description: "Confirm the surgeon personally performs extraction and implantation — not technicians." },
                { num: "3", title: "Verify case volume", description: "Ask about case volume and years focused on hair transplants." },
                { num: "4", title: "Check credentials", description: "Check credentials and medical-council registration (verifiable)." },
                { num: "5", title: "Read genuine reviews", description: "Read genuine, recent reviews on Google and independent platforms." },
            ],
            footerNote: "A confident, skilled hair transplant surgeon in Delhi will happily show their work. Evasiveness is your answer.",
        },

        hairlineArtistry: {
            badge: { text: "AESTHETIC DESIGN" },
            heading: "The artistry of hairline design: what surgical skill looks like in Delhi",
            description: "The difference between a natural result and an obvious one is, above all, hairline design — the most artistic part of the surgery. A skilled hair transplant surgeon in Delhi:",
            items: [
                { title: "Soft, Irregular Front Edge", description: "Builds a soft, irregular front edge rather than a straight, 'pluggy' line." },
                { title: "Natural Micro Gradient", description: "Sets fine single-hair grafts at the hairline and denser units behind for a natural gradient." },
                { title: "Facial Proportion Matching", description: "Matches the hairline to your face shape, age, and natural growth direction." },
                { title: "Future Loss Planning", description: "Plans for future hair loss, so the result still looks natural years later." },
                { title: "Donor Area Protection", description: "Manages the donor area so it never looks over-harvested." },
            ],
            footerNote: "This is craftsmanship that no machine performs for the surgeon — and it's why surgical skill, not equipment, is what you're really choosing.",
        },

        revisionRepair: {
            badge: { text: "CORRECTIVE SURGERY" },
            heading: "Revision and repair work by a hair transplant surgeon in Delhi",
            description: "One of the clearest signs of an expert hair transplant surgeon in Delhi is the ability to correct previous work — refining an unnatural hairline, adding density to a thin result, or improving an over-harvested donor area. Revision cases demand even more surgical judgement and artistry than first-time surgery.",
            items: [
                { title: "Plug Graft Extraction", description: "Removing large, unnatural plug grafts and re-implanting them as soft singles." },
                { title: "Hairline Softening & Lowering", description: "Re-establishing natural temporal peaks and soft transition zones." },
                { title: "Donor Scar Camouflage", description: "FUE harvesting and SMP repair for depleted or scarred donor areas." },
            ],
        },

        costConsultation: {
            badge: { text: "TRANSPARENT PRICING" },
            heading: "Cost of consulting a hair transplant surgeon in Delhi",
            description: "A consultation with our hair transplant surgeon in Delhi includes a free scalp analysis — the surgeon assesses your case and gives an exact graft count and transparent, per-graft cost. Surgery pricing starts from ₹40,000, with 0% EMI available.",
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
            footerNote: "The quality of a surgeon's answers — and portfolio — tells you almost everything.",
        },

        procedures: {
            badge: { text: "Procedures & Location" },
            heading: "Procedures performed by our hair transplant surgeon in Delhi",
            description: "Ryan Clinic's surgeon performs FUE & Sapphire FUE, DHI / hairline design, beard & moustache transplant, eyebrow transplant, hair transplant for women, and supporting treatments like PRP therapy and medical management of hair loss.",
        },

        visitSurgeon: {
            badge: { text: "VISIT OUR CLINIC" },
            heading: "Visiting our hair transplant surgeon in Delhi",
            description: "Our Delhi centre is in Pitampura (North-West Delhi), convenient from across the city and NCR (Rohini, Shalimar Bagh, Ashok Vihar, Model Town, Punjabi Bagh, Paschim Vihar).",
            address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
            phone: "+91-9217958539",
            hours: "Mon–Sat, 9:00 AM – 7:00 PM",
            nearestMetro: "Pitampura Metro Station (Red Line)",
        },

        ctaSection: {
            heading: "Book a consultation with a hair transplant surgeon in Delhi",
            subtext: "Get a free scalp analysis, your exact graft count, and a transparent cost breakdown — no obligation.",
            phone: "+91-9217958539",
        },

        faq: {
            badge: { text: "Got Questions?" },
            heading: "Hair transplant surgeon in Delhi — frequently asked questions",
            faqs: [
                { question: "How do I find the best hair transplant surgeon in Delhi?", answer: "Study the surgeon's own before-and-afters (especially hairlines and cases like yours), confirm the surgeon personally performs the surgery, check years and case volume in hair restoration, verify credentials and registration, and read genuine reviews." },
                { question: "What makes a great hair transplant surgeon?", answer: "A combination of surgical precision and aesthetic judgement — clean extraction, natural hairline design, well-distributed density, careful donor management — backed by focused experience and a real portfolio." },
                { question: "What's the difference between a hair transplant surgeon and a technician?", answer: "A qualified surgeon should perform the skilled steps — design, extraction, recipient-site creation, and implantation. In many clinics, technicians do much of this, which is a common cause of poor survival and unnatural results. At Ryan Clinic, the surgeon performs every step." },
                { question: "How much experience should a hair transplant surgeon have?", answer: "Look for documented years focused on hair restoration and real case volume — and, most importantly, a portfolio of the surgeon's own results with patients similar to you." },
                { question: "Does the surgeon design my hairline?", answer: "Yes — at Ryan Clinic the surgeon personally designs your hairline. Hairline design is the most artistic, result-defining part of the surgery and should never be left to a technician." },
                { question: "Why does surgical skill affect graft survival and how natural the result looks?", answer: "Gentle, precise extraction protects follicle viability, and correct angle, depth, and density at implantation create natural growth. Both depend directly on the surgeon's skill; rushed, delegated work puts them at risk." },
                { question: "Should one surgeon perform the whole procedure?", answer: "The surgeon should perform all the skilled surgical steps. Consistent, hands-on involvement is what produces a natural, lasting result." },
                { question: "How can I judge a surgeon's skill before booking?", answer: "Ask to see the surgeon's own before-and-afters — particularly hairlines — and cases similar to yours. A skilled hair transplant surgeon in Delhi will gladly show their portfolio." },
                { question: "Who is the hair transplant surgeon at Ryan Clinic?", answer: "Dr. Pranendra Singh (MBBS AIIMS, MS PGIMER, Turkey FUE Fellowship) is our lead surgeon with 15+ years experience and 5,000+ successful hair transplants." },
                { question: "Is a hair transplant surgeon the same as a dermatologist or plastic surgeon?", answer: "A hair transplant surgeon may come from different backgrounds. What matters most is genuine hair-restoration training, real surgical experience, and a portfolio that proves the skill — not one specific specialty." },
                { question: "Can a skilled hair transplant surgeon repair a previous bad transplant?", answer: "Often, yes. An experienced surgeon can refine an unnatural hairline, add density, or improve an over-harvested donor area. Revision work demands strong surgical judgement, so it's a good marker of skill." },
                { question: "How much does a hair transplant surgeon in Delhi charge?", answer: "It's priced per graft and depends mainly on graft count and technique. At Ryan Clinic the surgeon provides an exact, transparent quote after a free scalp analysis, starting from ₹40,000, with 0% EMI." },
                { question: "Where can I meet the hair transplant surgeon in Delhi?", answer: "At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034), Mon–Sat, 9 AM–7 PM. Accessible via Pitampura Metro Station (Red Line)." },
                { question: "How do I book a consultation with the surgeon?", answer: "Call or WhatsApp +91-9217958539, or use the booking form. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." },
            ],
        },

        settings: {
            status: "published",
            featured: true,
            displayOrder: 1,
            showInSitemap: true,
            allowIndexing: true,
        },
    };

    console.log("Updating 'surgeonpages' collection with complete marketing data...");
    await db.collection("surgeonpages").updateOne(
        { slug: "hair-transplant-surgeon-in-delhi" },
        { $set: fullData },
        { upsert: true }
    );

    console.log("Updating 'surgeons' collection with complete marketing data...");
    await db.collection("surgeons").updateOne(
        { slug: "hair-transplant-surgeon-in-delhi" },
        { $set: fullData },
        { upsert: true }
    );

    console.log("Complete marketing data successfully applied to MongoDB!");
    await mongoose.disconnect();
}

updateFullContent().catch(console.error);
