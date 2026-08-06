/**
 * seed_prp_cost_mumbai.js
 *
 * Script to create/populate a complete "PRP Hair Treatment Cost in Mumbai" page
 * populating EVERY single section and field to verify admin & frontend rendering.
 *
 * Run: node scripts/seed_prp_cost_mumbai.js
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

const TARGET_SLUG = "prp-hair-treatment-cost-in-mumbai";

const prpMumbaiData = {
  title: "PRP Hair Treatment Cost in Mumbai",
  slug: TARGET_SLUG,
  pageType: "prp",

  /* ── SEO ── */
  seo: {
    metaTitle: "PRP Hair Treatment Cost in Mumbai 2026 | Ryan Clinic",
    metaDescription:
      "PRP hair treatment cost in Mumbai explained — per-session and package rates, inclusions, maintenance factors, and transparent doctor-led pricing at Ryan Clinic Andheri West.",
    keywords: [
      "PRP hair treatment cost in Mumbai",
      "PRP cost Mumbai",
      "PRP session price Mumbai",
      "PRP hair loss cost Andheri West",
      "Ryan Clinic PRP Mumbai",
      "PRP hair package cost Mumbai"
    ],
    canonical: "https://www.clinicryan.com/cost/prp-hair-treatment-cost-in-mumbai",
    ogImage: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
    robots: "index, follow",
  },

  /* ── Hero ── */
  hero: {
    title: "Best PRP Hair Treatment Cost in Mumbai",
    pricingLine:
      "Doctor-led, transparent PRP hair restoration pricing in Mumbai. Clear per-session & package rates with zero hidden fees.",
    heroImage: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
    heroImageAlt: "PRP Hair Treatment Cost in Mumbai — Ryan Clinic",
    breadcrumbs: ["Home", "Cost", "PRP Hair Treatment Cost in Mumbai"],
    buttons: [
      { text: "Book Consultation", link: "/contact", variant: "primary" },
      { text: "WhatsApp Us", link: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20know%20the%20PRP%20hair%20treatment%20cost%20in%20Mumbai", variant: "secondary" },
    ],
    stats: [
      { value: "Doctor-Led", label: "Medical PRP Protocol" },
      { value: "Transparent", label: "Per-Session Pricing" },
      { value: "Andheri West", label: "Mumbai Centre" },
    ],
  },

  /* ── Intro / Quick Summary ── */
  intro: {
    badge: "Cost Overview",
    heading: "PRP Hair Treatment Cost in Mumbai at a Glance",
    description:
      "PRP (Platelet-Rich Plasma) hair treatment cost in Mumbai typically varies depending on kit purity, centrifugation technology, physician oversight, and session count. At Ryan Clinic Mumbai, all treatment pricing is determined by senior doctors after thorough scalp assessment.",
    summaryRows: [
      { label: "Pricing Structure", value: "Per session or multi-session packages", icon: "💳" },
      { label: "Single Session", value: "Starting from ₹4,500 – ₹6,500 per session", icon: "📋" },
      { label: "Initial Package (3-4 Sessions)", value: "₹12,000 – ₹18,000 complete course", icon: "📦" },
      { label: "Maintenance", value: "₹4,000 – ₹5,500 per maintenance session", icon: "🔄" },
      { label: "Key Cost Drivers", value: "PRP kit grade, centrifugation, doctor expertise", icon: "⚙️" },
      { label: "Consultation Fee", value: "Complimentary scalp assessment upon booking", icon: "📞" },
    ],
  },

  services: { badge: "", heading: "", description: "", cards: [] },
  graftPricing: { badge: "", heading: "", description: "", cards: [] },

  /* ── Pricing Options Cards (Per-session / package pricing) ── */
  pricingOptions: {
    badge: "Transparent Pricing",
    heading: "Ryan Clinic PRP Hair Treatment Cost in Mumbai",
    description:
      "Doctor-administered PRP therapy utilizing sterile, medical-grade double-spin separation kits for maximum growth factor concentration.",
    items: [
      {
        title: "Single PRP Session",
        subtitle: "Individual scalp rejuvenation session",
        price: "₹4,500",
        priceSuffix: "per session",
        description:
          "Includes comprehensive scalp evaluation, sterile blood collection, high-yield double-spin centrifugation, local anaesthesia, and micro-injection therapy.",
        badge: "Basic Option",
        features: [
          "100% Doctor-administered injection protocol",
          "High-concentration double-spin PRP kit",
          "Sterile single-use closed vacuum tubes",
          "Post-session scalp recovery care guidance",
        ],
        ctaText: "Book Single Session",
        ctaLink: "/contact",
        displayOrder: 0,
        active: true,
      },
      {
        title: "Initial Course (3-4 Sessions)",
        subtitle: "Recommended full starter package",
        price: "₹13,500",
        priceSuffix: "for 4 sessions",
        description:
          "Structured 4-session protocol spaced 3 to 4 weeks apart. Designed to stimulate dormant hair follicles and reverse early thinning effectively.",
        badge: "Most Popular",
        features: [
          "Best per-session value (Save 25%)",
          "Comprehensive hair density tracking",
          "4 planned sessions over 3-4 months",
          "Doctor review & photographic audit after session 2 & 4",
        ],
        ctaText: "Book Package Plan",
        ctaLink: "/contact",
        displayOrder: 1,
        active: true,
      },
      {
        title: "Annual Maintenance Session",
        subtitle: "Sustain & protect hair density",
        price: "₹4,000",
        priceSuffix: "per session",
        description:
          "Maintenance session scheduled every 4 to 6 months to preserve follicular stimulation and sustain density gains achieved during initial course.",
        badge: "Long-term Care",
        features: [
          "Scheduled every 4-6 months",
          "Protects existing hair against progressive loss",
          "Ongoing physician scalp monitoring",
          "Customized topical serum guidance",
        ],
        ctaText: "Schedule Maintenance",
        ctaLink: "/contact",
        displayOrder: 2,
        active: true,
      },
    ],
  },

  /* ── Technique / Treatment Comparison Table ── */
  techniqueComparison: {
    badge: "Treatment Comparison",
    heading: "PRP Cost in Mumbai vs Other Hair Loss Solutions",
    description:
      "Compare PRP therapy pricing structure against non-surgical medical therapies and surgical hair restoration in Mumbai.",
    columns: [
      { name: "Treatment Type", highlighted: false, badge: "" },
      { name: "Pricing Mechanism", highlighted: false, badge: "" },
      { name: "Investment Nature", highlighted: true, badge: "Value Focus" },
    ],
    rows: [
      {
        label: "PRP Hair Therapy",
        values: [
          { value: "PRP Hair Therapy" },
          { value: "Per session (₹4,500) or package course" },
          { value: "Periodic recurring investment for hair density" },
        ],
      },
      {
        label: "Topical Minoxidil",
        values: [
          { value: "Topical Minoxidil" },
          { value: "Monthly bottle purchase (₹800 – ₹1,500/mo)" },
          { value: "Indefinite monthly expenditure" },
        ],
      },
      {
        label: "Oral Finasteride",
        values: [
          { value: "Oral Finasteride" },
          { value: "Monthly prescription (₹400 – ₹800/mo)" },
          { value: "Long-term daily medication management" },
        ],
      },
      {
        label: "Hair Transplant Surgery",
        values: [
          { value: "Hair Transplant Surgery" },
          { value: "Per graft (₹30 – ₹60/graft)" },
          { value: "One-time surgical investment for bald scalp areas" },
        ],
      },
    ],
  },

  /* ── Included Section ── */
  includedSection: {
    badge: "Full Inclusions",
    heading: "What is Included in Your PRP Treatment Cost in Mumbai",
    description:
      "At Ryan Clinic Mumbai, your quoted PRP fee includes the complete medical procedure from consultation to post-treatment follow-up.",
    items: [
      { icon: "🩺", title: "Senior Doctor Consultation & Trichoscopy Audit" },
      { icon: "🩸", title: "Pain-minimized blood extraction with sterile vacuum tubes" },
      { icon: "⚗️", title: "Double-spin centrifugation for high platelet yield" },
      { icon: "💉", title: "Scalp ring block / local numbing comfort protocol" },
      { icon: "🔬", title: "100% Doctor-led micro-injection administration" },
      { icon: "🧴", title: "Post-procedure soothing serum & scalp wash instructions" },
      { icon: "📅", title: "Follow-up trichoscopy consultation within 30 days" },
    ],
    disclosures: [
      { icon: "✓", text: "Written itemized quote provided before starting treatment" },
      { icon: "✓", text: "Zero unexpected fees or unannounced disposable charges" },
      { icon: "✓", text: "Medical-grade kits certified for bio-safety" },
    ],
    buttonText: "Get Transparent PRP Quote",
    buttonLink: "/contact",
  },

  /* ── Price Factors ── */
  priceFactors: {
    badge: "Cost Drivers",
    heading: "What Determines PRP Hair Treatment Cost in Mumbai",
    description:
      "Understanding why PRP costs vary across clinics in Mumbai helps you choose a safe, effective, doctor-led procedure.",
    factors: [
      {
        number: "01",
        title: "Total Session Requirement",
        description:
          "Patients with mild thinning require 3 sessions, while moderate hair loss stage requires 4-6 sessions for optimal follicular activation.",
      },
      {
        number: "02",
        title: "PRP Kit Quality & Tube Technology",
        description:
          "Standard laboratory tubes produce low platelet concentration. Medical-grade double-spin PRP tubes yield 4x-7x growth factor concentration.",
      },
      {
        number: "03",
        title: "Doctor Expertise vs Technician Execution",
        description:
          "At Ryan Clinic, PRP injections are performed exclusively by experienced medical doctors, ensuring proper depth and uniform distribution.",
      },
      {
        number: "04",
        title: "Package Discounting vs Single Session",
        description:
          "Pre-booking a 4-session course reduces per-session cost significantly compared to paying individually per visit.",
      },
      {
        number: "05",
        title: "Clinic Infrastructure & Hygenic Standards",
        description:
          "Fully equipped surgical-grade procedure suites in premier locations like Andheri West ensure infection-free treatment environment.",
      },
      {
        number: "06",
        title: "Combination Therapy Add-ons",
        description:
          "Optional growth factor concentrates (GFC) or microneedling combination protocols are clearly detailed before commencing therapy.",
      },
    ],
    emiPlans: [],
    emiBadge: "",
    emiHeading: "",
  },

  /* ── Content Sections (Generic Educational Blocks with Rich Presentational Cards) ── */
  contentSections: [
    {
      sectionKey: "session-vs-package",
      badge: "Package Comparison",
      heading: "PRP Cost Per Session vs Course Package in Mumbai",
      description:
        "Paying for a single PRP session is ideal if you wish to evaluate treatment comfort. However, hair growth cycles require consecutive treatments over 3 to 4 months to achieve visible hair shaft thickening.\n\nBooking a 4-session course at Ryan Clinic reduces the effective per-session cost from ₹4,500 to ₹3,375, providing a 25% cost saving while ensuring complete treatment compliance.",
      layout: "comparison",
      items: [
        {
          title: "Single Session Option",
          subtitle: "Pay-as-you-go flexibility",
          value: "₹4,500",
          label: "per individual session",
          badge: "Flexible",
          icon: "📋",
          description: "Ideal if you wish to evaluate treatment comfort before committing to a full protocol.",
          features: [
            "Maximum booking flexibility",
            "Single blood draw & injection session",
            "Full doctor scalp consultation included",
          ],
          ctaText: "Book Single Session",
          ctaLink: "/contact",
          highlight: false,
          displayOrder: 0,
          active: true,
        },
        {
          title: "4-Session Starter Package",
          subtitle: "Complete initial protocol",
          value: "₹13,500",
          label: "complete course",
          secondaryValue: "Save 25%",
          secondaryLabel: "₹3,375 / session",
          badge: "Best Value",
          icon: "⭐",
          description: "Structured 4-session protocol spaced 3-4 weeks apart. Ensures maximum growth factor stimulation and optimal savings.",
          features: [
            "25% per-session cost saving",
            "Complete 4-month hair growth protocol",
            "Physician density tracking after session 2 & 4",
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
      heading: "How Many PRP Sessions Will You Need in Mumbai?",
      description:
        "The total number of PRP sessions depends on your initial hair thinning grade and follicular vitality. Our doctors recommend personalized treatment timelines.",
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
      badge: "Long-term Budgeting",
      heading: "The Real Cost of PRP in Mumbai: Understanding Maintenance",
      description:
        "PRP therapy relies on biological stimulation of active hair follicles. Because androgenetic alopecia is ongoing, periodic maintenance sessions preserve density.",
      layout: "highlight",
      items: [
        { icon: "🔄", title: "Ongoing Follicular Support", description: "Maintenance sessions prevent miniaturization of hair shafts", displayOrder: 0, active: true },
        { icon: "📅", title: "4 to 6 Month Intervals", description: "Only 2 sessions per year required after initial starter course", displayOrder: 1, active: true },
        { icon: "💰", title: "Predictable Annual Budget", description: "Annual maintenance costs under ₹8,000 - ₹10,000 per year", displayOrder: 2, active: true },
        { icon: "🩺", title: "Doctor Re-Evaluation", description: "Trichoscopy check-up included during every maintenance visit", displayOrder: 3, active: true },
      ],
      displayOrder: 2,
      enabled: true,
    },
    {
      sectionKey: "worth-it",
      badge: "Value Analysis",
      heading: "Is PRP Hair Treatment Worth the Cost in Mumbai?",
      description:
        "Evaluating whether PRP therapy provides optimal value for your specific hair loss condition.",
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
      badge: "Financial Flexibility",
      heading: "Payment Plans & Payment Options in Mumbai",
      description:
        "At Ryan Clinic Mumbai, we offer transparent payment choices for multi-session packages to make treatment accessible.",
      layout: "cards",
      items: [
        {
          title: "Multi-Session Package Savings",
          subtitle: "Upfront package discount",
          icon: "💳",
          description: "Pre-book a 4-session course to receive an automatic 25% price reduction per session.",
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
          ctaLink: "https://api.whatsapp.com/send?phone=+919911111247&text=Hi,%20I%20want%20to%20discuss%20payment%20options%20for%20PRP",
          displayOrder: 1,
          active: true,
        },
      ],
      displayOrder: 4,
      enabled: true,
    },
    {
      sectionKey: "prp-with-transplant",
      badge: "Combination Therapy",
      heading: "PRP Combined with Hair Transplant in Mumbai",
      description:
        "Combining PRP with surgical FUE or DHI transplant accelerates recovery and improves graft anchorage.",
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

  /* ── Myths vs Facts ── */
  mythsFacts: {
    badge: "Facts & Misconceptions",
    heading: "Myths vs Facts About PRP Cost in Mumbai",
    description:
      "Clarifying common misconceptions regarding PRP hair therapy pricing and clinical efficacy.",
    pairs: [
      {
        myth: "All PRP treatments in Mumbai are identical regardless of price.",
        fact: "PRP effectiveness depends directly on platelet yield. Cheap single-spin test tube methods yield low growth factors compared to medical-grade double-spin centrifuge protocols.",
        displayOrder: 0,
        active: true,
      },
      {
        myth: "One PRP session is sufficient for permanent hair regrowth.",
        fact: "Single sessions provide temporary nourishment. Achieving dense, visible hair thickening requires a starter course of 3 to 4 sessions followed by maintenance.",
        displayOrder: 1,
        active: true,
      },
      {
        myth: "PRP can replace hair transplant surgery for bald scalps.",
        fact: "PRP works only on living, miniaturized follicles. Completely bald scalp areas require surgical hair transplantation for new follicle insertion.",
        displayOrder: 2,
        active: true,
      },
      {
        myth: "PRP injections are extremely painful and require hospital stay.",
        fact: "PRP is an outpatient 45-minute procedure performed under local numbing spray or ring block, causing minimal discomfort and zero downtime.",
        displayOrder: 3,
        active: true,
      },
    ],
  },

  /* ── Visit Clinic Location Block ── */
  visitClinic: {
    badge: "Mumbai Clinic Location",
    heading: "Visiting Ryan Clinic for PRP in Mumbai",
    description:
      "Visit our modern Mumbai clinic in Andheri West for a private trichoscopy examination and custom PRP treatment quote.",
    address: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053",
    city: "Mumbai",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.645739818816!2d72.8225!3d19.125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzMwLjAiTiA3MsKwNDknMjEuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
    phone: "+91-9911111247",
    whatsapp: "+919911111247",
    timings: "Monday – Saturday: 10:00 AM – 7:00 PM",
    landmark: "Near Four Bungalows Market, Andheri West",
    nearbyAreas: ["Andheri West", "Juhu", "Lokhandwala", "Bandra", "Goregaon", "Versova"],
    buttonText: "Get Directions to Mumbai Clinic",
    buttonLink: "https://maps.google.com/?q=MHADA+4+Bungalow+168+Phase+D+SV+Patel+Nagar+Andheri+West+Mumbai+400053",
  },

  /* ── Consultation Form Block ── */
  consultation: {
    badge: "Free Consultation",
    heading: "Get Your Custom PRP Treatment Quote in Mumbai",
    description:
      "Schedule your free scalp assessment with senior doctors at Ryan Clinic Andheri West. Get an honest diagnosis and transparent price estimate.",
    features: [
      { text: "Free Trichoscopy Scalp Audit" },
      { text: "100% Senior Doctor Consultation" },
      { text: "Transparent Per-Session & Package Quote" },
      { text: "Zero High-Pressure Sales Tactics" },
    ],
    buttonText: "Book Free Consultation",
    buttonLink: "https://api.whatsapp.com/send?phone=+919911111247&text=Hi,%20I%20want%20to%20book%20a%20PRP%20consultation%20in%20Mumbai",
    image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
    imageAlt: "PRP Consultation at Ryan Clinic Mumbai",
  },

  /* ── FAQs ── */
  faq: {
    badge: "Frequently Asked Questions",
    heading: "PRP Hair Treatment Cost in Mumbai — FAQs",
    description:
      "Answers to top queries about PRP pricing, procedure steps, and maintenance at our Mumbai center.",
    items: [
      {
        question: "How much does a single PRP session cost in Mumbai at Ryan Clinic?",
        answer:
          "A single doctor-administered PRP session at Ryan Clinic Mumbai starts at ₹4,500. This includes comprehensive scalp evaluation, double-spin PRP preparation, and post-session care instructions.",
      },
      {
        question: "Is package pricing available for PRP in Mumbai?",
        answer:
          "Yes, we offer a 4-session starter package for ₹13,500, offering a 25% discount compared to single per-session payments.",
      },
      {
        question: "How long does a PRP treatment session take?",
        answer:
          "Each session takes approximately 45 to 60 minutes from blood draw to completion of scalp injections.",
      },
      {
        question: "Are PRP injections painful?",
        answer:
          "We apply local numbing spray or micro-numbing injection protocols before treatment, making the procedure comfortable with minimal pinprick sensation.",
      },
      {
        question: "When can I expect results from PRP in Mumbai?",
        answer:
          "Reduced hair shedding is typically noticed after session 2. Visible density improvement and shaft thickening become apparent after session 3 or 4.",
      },
      {
        question: "Where is Ryan Clinic located in Mumbai?",
        answer:
          "Our clinic is conveniently located at MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053.",
      },
    ],
  },

  /* ── Settings ── */
  settings: {
    status: "published",
    featured: true,
    displayOrder: 1,
    showInSitemap: true,
    allowIndexing: true,
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
    { $set: prpMumbaiData, $setOnInsert: { createdAt: new Date() } },
    { upsert: true, returnDocument: "after" }
  );

  console.log(existing
    ? `✅ Updated existing PRP Mumbai cost page document (ID: ${result.value?._id || result._id})`
    : `✅ Created new PRP Mumbai cost page document (slug: ${TARGET_SLUG})`
  );

  await mongoose.disconnect();
  console.log("✅ Seed complete for PRP Hair Treatment Cost in Mumbai.");
}

run().catch((err) => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
