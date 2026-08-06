/**
 * seed_prp_cost_delhi.js
 * Safe one-off PRP seed script using findOneAndUpdate + upsert.
 * Run: node scripts/seed_prp_cost_delhi.js
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env.local manually
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const idx = t.indexOf("=");
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

const TARGET_SLUG = "prp-hair-treatment-cost-in-delhi";

const prpData = {
  title: "PRP Hair Treatment Cost in Delhi",
  slug: TARGET_SLUG,
  pageType: "prp",

  seo: {
    metaTitle: "PRP Hair Treatment Cost in Delhi 2026 | Ryan Clinic",
    metaDescription: "PRP hair treatment cost in Delhi explained – per-session and package prices, what affects cost, EMI options, and whether PRP is worth it. Get a transparent quote.",
    keywords: ["PRP hair treatment cost in Delhi", "PRP cost Delhi", "PRP hair treatment price Delhi", "PRP session cost", "PRP package price Delhi", "Ryan Clinic PRP Delhi"],
    canonical: "https://www.clinicryan.com/cost/prp-hair-treatment-cost-in-delhi",
    ogImage: "",
    robots: "index, follow",
  },

  hero: {
    title: "Best PRP Hair Treatment Cost in Delhi",
    pricingLine: "Transparent, doctor-led PRP pricing in Delhi — per-session and package options for every hair loss stage.",
    heroImage: "",
    heroImageAlt: "PRP Hair Treatment Cost in Delhi — Ryan Clinic",
    breadcrumbs: ["Home", "Cost", "PRP Hair Treatment Cost in Delhi"],
    buttons: [
      { text: "Book Free Consultation", link: "/contact", variant: "primary" },
      { text: "WhatsApp Us", link: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20the%20PRP%20hair%20treatment%20cost%20in%20Delhi", variant: "secondary" },
    ],
    stats: [
      { value: "Doctor-Led", label: "PRP Treatment" },
      { value: "Transparent", label: "Session Pricing" },
      { value: "Delhi", label: "Ryan Clinic" },
    ],
  },

  intro: {
    badge: "Cost Overview",
    heading: "PRP Hair Treatment Cost in Delhi at a Glance",
    description: "PRP (Platelet-Rich Plasma) treatment cost in Delhi depends on the number of sessions, the quality of the PRP kit and process, and whether you opt for a single session or a structured initial course. At Ryan Clinic, prices are set by our doctors and disclosed upfront.",
    summaryRows: [
      { label: "Pricing Basis", value: "Per session / per package", icon: "💳" },
      { label: "Single Session", value: "[Contact clinic for verified price]", icon: "📋" },
      { label: "Initial Package", value: "[Contact clinic for verified price]", icon: "📦" },
      { label: "Maintenance", value: "[Contact clinic for verified price]", icon: "🔄" },
      { label: "Price Set By", value: "Sessions, doctor expertise, kit quality, add-ons", icon: "⚙️" },
      { label: "Consultation", value: "Call or WhatsApp for a free consultation", icon: "📞" },
    ],
  },

  services: { badge: "", heading: "", description: "", cards: [] },
  graftPricing: { badge: "", heading: "", description: "", cards: [] },

  techniqueComparison: {
    badge: "Treatment Comparison",
    heading: "PRP price in Delhi vs other hair loss treatments",
    description: "Understanding how PRP pricing compares to alternatives helps you make an informed decision for your hair loss stage.",
    columns: [
      { name: "Treatment", highlighted: false },
      { name: "How It's Priced", highlighted: false },
      { name: "Cost Nature", highlighted: true, badge: "" },
    ],
    rows: [
      { label: "PRP", values: [{ value: "PRP" }, { value: "Per session or per package/course" }, { value: "Recurring — ongoing sessions needed" }] },
      { label: "Minoxidil (topical)", values: [{ value: "Minoxidil (topical)" }, { value: "Monthly purchase" }, { value: "Ongoing — must continue to maintain results" }] },
      { label: "Finasteride (oral, men)", values: [{ value: "Finasteride (oral, men)" }, { value: "Monthly prescription" }, { value: "Ongoing — must continue to maintain results" }] },
      { label: "Hair Transplant", values: [{ value: "Hair Transplant" }, { value: "Per graft / per procedure" }, { value: "One-time — permanent but higher upfront cost" }] },
    ],
  },

  includedSection: {
    badge: "What's Included",
    heading: "What's included in the PRP treatment cost in Delhi",
    description: "At Ryan Clinic, your PRP session cost covers the complete treatment process. There are no hidden add-on charges for standard inclusions.",
    items: [
      { icon: "🩺", title: "Doctor consultation and scalp assessment" },
      { icon: "🩸", title: "Blood draw" },
      { icon: "⚗️", title: "PRP preparation and centrifugation" },
      { icon: "💉", title: "Scalp injections" },
      { icon: "🔬", title: "Quality PRP kit" },
      { icon: "🧴", title: "Sterile single-use materials" },
      { icon: "🌿", title: "Aftercare guidance" },
      { icon: "📅", title: "Follow-up within the initial course" },
    ],
    hiddenCosts: [],
    disclosures: [
      { icon: "✓", text: "Doctor-confirmed pricing before treatment begins" },
      { icon: "✓", text: "No surprise charges added after the session" },
      { icon: "✓", text: "Quality PRP kit — not low-grade disposables" },
    ],
    guarantees: [],
    buttonText: "Check Pricing Eligibility",
    buttonLink: "/contact",
  },

  priceFactors: {
    badge: "What Affects Cost",
    heading: "What affects PRP hair treatment cost and price in Delhi",
    description: "PRP cost in Delhi varies significantly between clinics. Understanding what drives the price helps you evaluate quotes fairly.",
    factors: [
      { number: "01", title: "Number of sessions", description: "The more sessions required for your hair loss stage, the higher the total cost. A full initial course typically requires multiple sessions." },
      { number: "02", title: "Single session vs package", description: "Per-session pricing is higher than a pre-paid course. Clinics often discount when you commit to a structured package." },
      { number: "03", title: "Doctor's expertise and doctor-led treatment", description: "Experienced hair specialists and surgeon-led PRP commands higher fees than technician-administered sessions. At Ryan Clinic, PRP is doctor-led." },
      { number: "04", title: "Quality of PRP kit and process", description: "Higher-quality PRP kits, better centrifugation protocols, and concentration techniques affect both cost and treatment outcomes." },
      { number: "05", title: "Clinic location and setup", description: "Central Delhi clinics and premium medical setups typically charge more than peripheral locations. Ryan Clinic is based in Pitampura, Delhi." },
      { number: "06", title: "Add-ons", description: "Some clinics bundle additional services (mesotherapy, growth factor serums, laser cap sessions). Add-ons are priced separately at Ryan Clinic — nothing hidden." },
    ],
    emiPlans: [],
    emiBadge: "",
    emiHeading: "",
  },

  consultation: {
    badge: "Free Quote",
    heading: "Get your PRP treatment cost quote in Delhi",
    description: "Schedule a free consultation with our doctor to receive a personalised PRP cost estimate based on your scalp condition, hair loss stage, and treatment goals — no obligation.",
    features: [
      { text: "Free doctor scalp assessment" },
      { text: "Honest recommendation based on your hair loss stage" },
      { text: "Transparent pricing — no hidden charges" },
      { text: "Flexible session or package options" },
    ],
    buttonText: "Book Free Consultation",
    buttonLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20PRP%20cost%20quote",
    image: "",
    imageAlt: "PRP Consultation at Ryan Clinic Delhi",
  },

  faq: {
    badge: "Common Questions",
    heading: "PRP hair treatment cost in Delhi — frequently asked questions",
    description: "Everything you need to know about PRP hair treatment costs in Delhi — session pricing, packages, what affects cost, and whether PRP is worth it.",
    items: [
      { question: "How much does PRP hair treatment cost in Delhi?", answer: "PRP hair treatment cost in Delhi varies depending on the clinic, the quality of PRP kit used, and whether you opt for a single session or a structured package. At Ryan Clinic, pricing is confirmed after a doctor assessment. Contact us for a transparent quote." },
      { question: "Is it cheaper to pay per session or buy a PRP package?", answer: "In most cases, committing to a structured course (e.g., 3–4 sessions) works out less expensive per session than paying individually. Packages also provide a more systematic treatment plan aligned with your hair growth cycle." },
      { question: "How many PRP sessions will I need?", answer: "Most patients begin with an initial course of 3–4 sessions spaced 4–6 weeks apart. After the initial course, maintenance sessions (typically every 4–6 months) are recommended to sustain results. Your exact plan depends on your hair loss stage and response to treatment." },
      { question: "What is the total cost of a full PRP treatment plan in Delhi?", answer: "The total cost includes the initial course plus ongoing maintenance sessions. Because PRP requires continued treatment to maintain its effects, factoring in maintenance costs gives a more realistic picture of the annual investment. Ask our doctor for a personalised cost plan." },
      { question: "What's included in the PRP session price?", answer: "At Ryan Clinic, the standard session price includes doctor consultation and scalp assessment, blood draw, PRP preparation and centrifugation, scalp injections, quality PRP kit, sterile single-use materials, aftercare guidance, and follow-up within the course. There are no surprise charges for these standard inclusions." },
      { question: "Why do PRP prices vary so much between Delhi clinics?", answer: "PRP pricing differences reflect differences in kit quality, concentration technique, who performs the treatment (doctor vs. technician), clinic overhead, and what is included in the price. Very low prices often indicate lower-grade materials or technician-administered treatment rather than doctor-led PRP." },
      { question: "Does Ryan Clinic offer EMI for PRP treatment in Delhi?", answer: "EMI and payment plan options are available for some treatments at Ryan Clinic. Whether PRP packages currently qualify and which finance partners are available is subject to verification. Please contact the clinic directly to confirm current EMI options." },
      { question: "Is PRP worth the cost?", answer: "PRP is generally most effective for patients with early-to-moderate hair thinning where follicles are still active. It can slow hair loss, improve density, and support post-transplant recovery. It does not work for fully bald areas and requires ongoing maintenance. Whether it is worth it depends on your hair loss stage, expectations, and willingness to commit to a structured treatment plan. A doctor consultation is the best way to assess suitability." },
      { question: "Can I combine PRP with a hair transplant in Delhi?", answer: "Yes. PRP is commonly combined with hair transplant surgery to support graft survival and accelerate healing. Whether PRP is included in Ryan Clinic transplant packages is subject to confirmation at consultation. Ask us directly for package details." },
      { question: "Are there any hidden costs in PRP treatment?", answer: "At Ryan Clinic, the standard inclusions are covered in the quoted price. If add-ons (such as growth factor serums or additional sessions) are recommended, they are priced separately and disclosed upfront before you commit." },
      { question: "Does cheaper PRP mean lower quality in Delhi?", answer: "Not always, but very low prices are often associated with lower-grade PRP kits, less precise centrifugation, or technician-administered (not doctor-led) treatment. The concentration and purity of the PRP produced has a significant influence on outcomes. When comparing quotes, ask specifically about kit quality and who administers the injections." },
      { question: "How do I get a transparent PRP cost quote in Delhi?", answer: "The most accurate way to get a cost estimate is a free doctor consultation. At Ryan Clinic, the doctor assesses your scalp condition, recommends the appropriate number of sessions, and provides a written price breakdown. There is no obligation to proceed." },
    ],
  },

  pricingOptions: {
    badge: "Transparent Pricing",
    heading: "Ryan Clinic PRP hair treatment cost in Delhi",
    description: "Our pricing is set by the doctor after assessing your scalp. All costs are disclosed upfront. The figures below will be updated once verified by the clinic team.",
    items: [
      {
        title: "Single PRP Session",
        subtitle: "Doctor consultation + complete treatment",
        price: "",
        priceSuffix: "per session",
        description: "Includes: doctor scalp assessment, blood draw, PRP preparation, centrifugation, scalp injections, quality PRP kit, sterile materials, and aftercare guidance.",
        badge: "",
        features: ["Doctor-led — not technician-administered", "Quality PRP kit", "Sterile single-use materials", "Aftercare guidance included"],
        ctaText: "Get Session Price",
        ctaLink: "/contact",
        displayOrder: 0,
        active: true,
      },
      {
        title: "Initial Course (3–4 Sessions)",
        subtitle: "Structured hair restoration programme",
        price: "",
        priceSuffix: "for full course",
        description: "A structured initial course is the recommended starting point for most patients. Sessions are spaced 4–6 weeks apart to align with the hair growth cycle.",
        badge: "Recommended",
        features: ["Most cost-effective per session", "Structured treatment plan", "4–6 weeks between sessions", "Doctor review after each session"],
        ctaText: "Get Package Price",
        ctaLink: "/contact",
        displayOrder: 1,
        active: true,
      },
      {
        title: "Maintenance Session",
        subtitle: "Sustain results after initial course",
        price: "",
        priceSuffix: "per maintenance session",
        description: "After completing the initial course, maintenance sessions every 4–6 months help sustain the results. The real long-term cost of PRP includes these recurring sessions.",
        badge: "",
        features: ["Every 4–6 months typically", "Prevents regression of results", "Doctor assessment before each session"],
        ctaText: "Ask About Maintenance",
        ctaLink: "/contact",
        displayOrder: 2,
        active: true,
      },
    ],
  },

  contentSections: [
    {
      sectionKey: "session-vs-package",
      badge: "Session vs Package",
      heading: "PRP cost per session vs package price in Delhi",
      description: "Paying for a single PRP session is straightforward but typically more expensive per session than committing to a structured course. A package (or initial course) spreads the cost and ensures you complete the minimum number of sessions needed to see meaningful results.\n\nFor most patients, starting with a structured package is more cost-effective and more likely to deliver the expected outcome. If you are unsure whether PRP is right for you, a single trial session first is an option — but discuss this with the doctor, as incomplete courses rarely deliver full results.\n\nAt Ryan Clinic, both single-session and course pricing options are available. Discuss your budget and hair loss goals with the doctor at your free consultation.",
      layout: "comparison",
      items: [
        {
          title: "Single Session Option",
          subtitle: "Pay-as-you-go flexibility",
          value: "Per Session",
          label: "Pricing Basis",
          badge: "Flexible",
          icon: "📋",
          description: "Ideal if you wish to evaluate treatment comfort before committing to a full protocol.",
          features: [
            "Maximum booking flexibility",
            "Single blood draw & injection session",
            "Full doctor scalp consultation included"
          ],
          ctaText: "Book Single Session",
          ctaLink: "/contact",
          highlight: false,
          displayOrder: 0,
          active: true,
        },
        {
          title: "Initial Course Package (3-4 Sessions)",
          subtitle: "Complete initial protocol",
          value: "Package Rate",
          label: "Pricing Basis",
          badge: "Recommended Value",
          icon: "⭐",
          description: "Structured 3-4 session protocol spaced 4 weeks apart. Delivers optimal growth factor stimulation and maximum savings.",
          features: [
            "Most cost-effective per session rate",
            "Complete hair density growth protocol",
            "Physician density tracking after sessions"
          ],
          ctaText: "Book Package Plan",
          ctaLink: "/contact",
          highlight: true,
          displayOrder: 1,
          active: true,
        },
      ],
      displayOrder: 0,
      enabled: true,
    },
    {
      sectionKey: "total-sessions-cost",
      badge: "Treatment Planning",
      heading: "How many sessions, and the total PRP cost in Delhi",
      description: "The total cost of PRP treatment in Delhi is not just the price of one session — it is the combined cost of your initial course plus any ongoing maintenance.\n\nInitial Course: Most patients require 3–4 sessions in the first phase, spaced 4–6 weeks apart.\n\nMaintenance: After the initial course, maintenance sessions every 4–6 months are recommended to sustain results.\n\nThe doctor will assess your hair loss stage and recommend the right number of sessions. Looking at the total treatment-plan cost — rather than just the single-session price — gives a more realistic picture of your investment.",
      layout: "timeline",
      items: [
        {
          title: "Stage 1–2 Early Thinning",
          subtitle: "Mild hairline & crown thinning",
          value: "3 Initial Sessions",
          label: "Initial Protocol",
          secondaryValue: "1 Session / 6 Months",
          secondaryLabel: "Maintenance",
          badge: "Early Protocol",
          icon: "01",
          description: "Stops early shedding and thickens miniaturizing shafts before follicle dormant phase progresses.",
          displayOrder: 0,
          active: true,
        },
        {
          title: "Stage 3 Moderate Thinning",
          subtitle: "Noticeable scalp visibility & crown thinning",
          value: "4–5 Initial Sessions",
          label: "Initial Protocol",
          secondaryValue: "1 Session / 4 Months",
          secondaryLabel: "Maintenance",
          badge: "Restoration Plan",
          icon: "02",
          description: "Comprehensive multi-session stimulation to reactivate sluggish follicles and restore scalp coverage.",
          displayOrder: 1,
          active: true,
        },
        {
          title: "Post-Hair Transplant Support",
          subtitle: "Combined surgical boost",
          value: "3 Recommended Sessions",
          label: "Graft Activation",
          secondaryValue: "Fast Healing",
          secondaryLabel: "Surgical Benefit",
          badge: "Post-Op Boost",
          icon: "03",
          description: "Accelerates transplanted graft anchor, reduces post-operative redness, and nourishes non-transplanted existing hair.",
          displayOrder: 2,
          active: true,
        },
      ],
      displayOrder: 1,
      enabled: true,
    },
    {
      sectionKey: "maintenance-cost",
      badge: "Important",
      heading: "The real cost of PRP in Delhi: don't forget maintenance",
      description: "PRP is not a one-time permanent treatment. Its effects are sustained by ongoing maintenance sessions.\n\nPatients who complete the initial course but skip maintenance sessions often see a gradual regression of results over 6–12 months. This is not a treatment failure — it is simply the biology of PRP, which works by stimulating existing follicles rather than permanently restructuring hair growth.\n\nWhen evaluating whether PRP is affordable for you, factor in the maintenance sessions required annually. This gives you the honest annual cost of sustaining your results rather than just the introductory course price.",
      layout: "highlight",
      items: [
        { icon: "🔄", title: "Maintenance is required", description: "Results regress without regular maintenance sessions", displayOrder: 0, active: true },
        { icon: "📅", title: "Every 4–6 months", description: "Typical maintenance interval after the initial course", displayOrder: 1, active: true },
        { icon: "💰", title: "Factor total annual cost", description: "Not just the initial course — include maintenance when budgeting", displayOrder: 2, active: true },
        { icon: "🩺", title: "Doctor-assessed timing", description: "Your doctor recommends the interval based on your response", displayOrder: 3, active: true },
      ],
      displayOrder: 2,
      enabled: true,
    },
    {
      sectionKey: "worth-it",
      badge: "Is PRP Worth It?",
      heading: "Is PRP worth the cost in Delhi?",
      description: "PRP is worth considering when:\n\n• You have early-to-moderate hair thinning (not fully bald areas)\n• Your follicles are still active — PRP stimulates existing follicles, not dead ones\n• You understand that it requires ongoing maintenance\n• Your expectations are realistic — PRP can slow hair loss and improve density; it is not a hair transplant\n\nPRP is less likely to be worth the cost when:\n\n• You are expecting permanent results without maintenance\n• The affected area has no living follicles\n• You have not received a proper scalp diagnosis to confirm PRP suitability\n\nThe most important first step is an accurate diagnosis. Do not choose or reject PRP based solely on price — get a doctor assessment first.",
      layout: "suitability",
      items: [
        {
          title: "Good Candidate / High Value",
          subtitle: "PRP provides maximum efficacy",
          type: "positive",
          icon: "✓",
          description: "PRP delivers outstanding density improvement when active, living hair follicles exist on your scalp.",
          features: [
            "Early to moderate hair thinning (Grade 1-3)",
            "Living miniaturized hair follicles present",
            "Realistic goal: thickens hair & reduces shedding",
            "Committed to 3-4 starter sessions & maintenance"
          ],
          displayOrder: 0,
          active: true,
        },
        {
          title: "Limitations / When PRP Is Not Enough",
          subtitle: "Surgical alternatives recommended",
          type: "negative",
          icon: "•",
          description: "PRP has biological boundaries and cannot generate new hair on completely bald, shiny scalp areas.",
          features: [
            "Advanced baldness with completely dead follicles",
            "Expecting permanent hair without maintenance",
            "Seeking new hair growth on smooth bald scalp",
            "Requires surgical FUE/DHI transplant instead"
          ],
          displayOrder: 1,
          active: true,
        },
      ],
      displayOrder: 3,
      enabled: true,
    },
    {
      sectionKey: "emi-payment",
      badge: "Payment Options",
      heading: "EMI and payment options for PRP treatment in Delhi",
      description: "Ryan Clinic offers payment flexibility for some treatments. Whether PRP packages qualify for EMI or instalment plans and which finance partners are currently active is subject to verification.\n\nPlease contact the clinic directly to confirm:\n• Current EMI availability for PRP\n• Eligible package sizes\n• Finance partner options\n• Zero-interest vs. standard EMI plans\n\nDo not assume EMI is automatically available — confirm before planning your budget around it.",
      layout: "cards",
      items: [
        {
          title: "Multi-Session Package Savings",
          subtitle: "Upfront package discount",
          icon: "💳",
          description: "Pre-book a 3-4 session course to receive per-session price reduction.",
          ctaText: "Check Package Discount",
          ctaLink: "/contact",
          displayOrder: 0,
          active: true,
        },
        {
          title: "Flexible Consultation Terms",
          subtitle: "Customized clinic arrangements",
          icon: "🤝",
          description: "Discuss custom payment arrangements directly with clinic coordinators during your free consultation.",
          ctaText: "Book Free Consultation",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20discuss%20payment%20options%20for%20PRP",
          displayOrder: 1,
          active: true,
        },
      ],
      displayOrder: 4,
      enabled: true,
    },
    {
      sectionKey: "prp-with-transplant",
      badge: "Combined Treatment",
      heading: "Cost of PRP with a hair transplant in Delhi",
      description: "PRP is frequently combined with hair transplant surgery to support graft survival, reduce post-operative swelling, and accelerate the healing phase. It is also used to treat the existing thinning areas alongside a transplant.\n\nWhether Ryan Clinic includes PRP in its hair transplant packages or prices it as an add-on is subject to confirmation at consultation. If you are planning a hair transplant and want to understand the combined cost, ask at your free consultation.\n\nFor more information on hair transplant costs in Delhi, see our Hair Transplant Cost page.",
      layout: "cards",
      items: [
        {
          title: "Graft Anchor & Survival",
          icon: "🌱",
          description: "High platelet growth factor concentration accelerates revascularization of newly implanted hair grafts.",
          displayOrder: 0,
          active: true,
        },
        {
          title: "Accelerated Scalp Recovery",
          icon: "⚡",
          description: "Reduces post-operative crusting, swelling, and redness in donor and recipient scalp areas.",
          displayOrder: 1,
          active: true,
        },
        {
          title: "Native Hair Protection",
          icon: "🛡️",
          description: "Nourishes existing non-transplanted hair around surgical grafts to prevent shock loss.",
          displayOrder: 2,
          active: true,
        },
      ],
      displayOrder: 5,
      enabled: true,
    },
  ],

  visitClinic: {
    badge: "Our Delhi Clinic",
    heading: "Visiting Ryan Clinic for PRP in Delhi",
    description: "Ryan Clinic is based in Pitampura, Delhi. You can visit us for a free doctor consultation to discuss PRP treatment cost and suitability for your hair loss condition.",
    address: "CD 163, Block CD,\nDakshini Pitampura,\nPitampura,\nNew Delhi – 110034",
    city: "Delhi",
    mapEmbedUrl: "",
    phone: "",
    whatsapp: "",
    timings: "",
    landmark: "",
    nearbyAreas: [],
    buttonText: "Get Directions",
    buttonLink: "",
  },

  mythsFacts: {
    badge: "Common Misconceptions",
    heading: "Myths vs facts about PRP cost in Delhi",
    description: "There is a lot of misinformation about PRP pricing in Delhi. Here are some common myths and the facts.",
    pairs: [
      { myth: "Cheaper PRP is just as effective as expensive PRP.", fact: "PRP quality depends heavily on the kit used, centrifugation speed and duration, and concentration technique. Very cheap sessions often use low-grade kits or skip steps that affect platelet concentration. The final PRP quality — not just the session count — determines outcomes.", displayOrder: 0, active: true },
      { myth: "You only need one or two sessions to see permanent results.", fact: "PRP is not a permanent treatment. Results require a structured initial course (typically 3–4 sessions) and ongoing maintenance sessions every 4–6 months. Stopping after one or two sessions rarely delivers meaningful or lasting improvement.", displayOrder: 1, active: true },
      { myth: "PRP works for everyone, regardless of hair loss stage.", fact: "PRP works by stimulating existing, living follicles. It has limited effect in areas where follicles are completely dormant or absent. A proper scalp diagnosis is essential before committing to treatment. PRP is most effective in the early-to-moderate thinning stages.", displayOrder: 2, active: true },
      { myth: "The total PRP cost is just the price of one session.", fact: "The honest total cost of PRP includes the initial course plus ongoing maintenance sessions. A realistic annual PRP budget includes both phases. Ask your doctor for a complete treatment-plan cost estimate, not just the per-session price.", displayOrder: 3, active: true },
    ],
  },

  settings: {
    status: "draft",
    featured: false,
    displayOrder: 10,
    showInSitemap: false,
    allowIndexing: false,
  },

  updatedAt: new Date(),
};

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  const col = mongoose.connection.db.collection("costpages");

  const existing = await col.findOne({ slug: TARGET_SLUG });
  const result = await col.findOneAndUpdate(
    { slug: TARGET_SLUG },
    { $set: prpData, $setOnInsert: { createdAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  );

  console.log(existing
    ? "✅ Updated existing PRP Delhi cost page document"
    : "✅ Created new PRP Delhi cost page document"
  );

  await mongoose.disconnect();
  console.log("✅ Seed complete.");
}

run().catch((err) => { console.error("❌ Script failed:", err); process.exit(1); });
