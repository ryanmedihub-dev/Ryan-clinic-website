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
    metaDescription: "PRP hair treatment cost in Delhi explained – per-session and package pricing, what affects cost, EMI options, and whether PRP is worth it. Doctor-led, transparent quote.",
    canonical: "https://www.clinicryan.com/cost/prp-hair-treatment-cost-in-delhi",
    ogImage: "/uploads/1752746168716-PRP 1.jpg",
    robots: "index, follow",
  },

  hero: {
    title: "PRP Hair Treatment Cost in Delhi",
    pricingLine: "Transparent, doctor-led PRP pricing in Delhi — per-session and package options for every hair loss stage.",
    heroImage: "/uploads/1752746168716-PRP 1.jpg",
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
    description: "PRP (Platelet-Rich Plasma) treatment cost in Delhi depends on the number of sessions, the quality of the PRP kit and process, and whether you opt for a single session or a structured initial course. At Ryan Clinic, treatment is doctor-administered and exact pricing is confirmed after doctor consultation. Learn more about our full <a href='/prp-hair-loss-treatment-in-delhi' class='text-[#e30a17] font-semibold underline'>PRP hair treatment in Delhi</a> options.",
    summaryRows: [
      { label: "Pricing Basis", value: "Per session / per package", icon: "💳" },
      { label: "Single Session", value: "Confirmed after consultation", icon: "📋" },
      { label: "Initial Package", value: "Confirmed after consultation", icon: "📦" },
      { label: "Maintenance", value: "Confirmed after consultation", icon: "🔄" },
      { label: "Price Set By", value: "Sessions, doctor expertise, kit quality, add-ons", icon: "⚙️" },
      { label: "Consultation", value: "Call or WhatsApp for a free consultation", icon: "📞" },
    ],
  },

  services: { badge: "", heading: "", description: "", cards: [] },
  graftPricing: { badge: "", heading: "", description: "", cards: [] },

  techniqueComparison: {
    badge: "Treatment Comparison",
    heading: "PRP price in Delhi vs other hair loss treatments",
    description: "Understanding how PRP pricing compares to alternatives helps you make an informed decision for your hair loss stage. Indicative market ranges below are for orientation only; your exact Ryan Clinic pricing is confirmed after doctor consultation.",
    columns: [
      { name: "Treatment", highlighted: false },
      { name: "How It's Priced", highlighted: false },
      { name: "Indicative Delhi Cost", highlighted: false },
      { name: "Cost Nature", highlighted: true, badge: "" },
    ],
    rows: [
      { label: "PRP", values: [{ value: "PRP" }, { value: "Per session or course" }, { value: "₹3,000–₹15,000 per session" }, { value: "Recurring — maintenance needed" }] },
      { label: "Minoxidil (topical)", values: [{ value: "Minoxidil (topical)" }, { value: "Monthly purchase" }, { value: "₹500–₹1,500 per month" }, { value: "Ongoing — stops working if discontinued" }] },
      { label: "Finasteride (oral, men)", values: [{ value: "Finasteride (oral, men)" }, { value: "Monthly prescription" }, { value: "₹300–₹900 per month" }, { value: "Ongoing — stops working if discontinued" }] },
      { label: "GFC", values: [{ value: "GFC" }, { value: "Per session" }, { value: "₹10,000–₹15,000 per session" }, { value: "Recurring" }] },
      { label: "Hair Transplant", values: [{ value: "Hair Transplant" }, { value: "Per graft" }, { value: "From ₹40,000" }, { value: "One-time — permanent, higher upfront" }] },
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
    description: "PRP cost in Delhi varies between clinics based on kit quality, doctor involvement, and procedure protocol. For context, indicative market rates in Delhi generally range between ₹3,000 and ₹15,000 per session. Exact Ryan Clinic pricing is confirmed after doctor consultation.",
    factors: [
      { number: "01", title: "Number of sessions", description: "The number of sessions required for your hair loss stage affects total cost. A full initial course typically requires multiple sessions." },
      { number: "02", title: "Single session vs package", description: "Package options may reduce the per-session cost when purchased as a course compared to single sessions." },
      { number: "03", title: "Doctor's expertise and doctor-led treatment", description: "Experienced hair specialists and surgeon-led PRP commands higher fees than technician-administered sessions. At Ryan Clinic, PRP is doctor-led." },
      { number: "04", title: "Quality of PRP kit and process", description: "Higher-quality PRP kits and centrifugation protocols affect both cost and treatment experience." },
      { number: "05", title: "Clinic location and setup", description: "Central Delhi clinics and premium medical setups reflect different overheads. Visit <a href='/contact' class='text-[#e30a17] font-semibold underline'>our Pitampura clinic</a> in Delhi." },
      { number: "06", title: "Add-ons", description: "Some clinics bundle additional services. Add-ons are priced separately at Ryan Clinic — nothing hidden." },
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
    buttonLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20PRP%20consultation%20in%20Delhi",
    image: "",
    imageAlt: "PRP Consultation at Ryan Clinic Delhi",
  },

  faq: {
    badge: "Common Questions",
    heading: "PRP hair treatment cost in Delhi — frequently asked questions",
    description: "Everything you need to know about PRP hair treatment costs in Delhi — session pricing, packages, what affects cost, and whether PRP is worth it.",
    items: [
      { question: "How much does PRP hair treatment cost in Delhi?", answer: "Indicative market rates for PRP hair treatment in Delhi typically range from ₹3,000 to ₹15,000 per session depending on kit quality, doctor involvement, and clinic setup. At Ryan Clinic, your exact treatment plan and pricing are confirmed after doctor consultation." },
      { question: "Is it cheaper to pay per session or buy a PRP package?", answer: "In most cases, committing to a structured course (e.g., 3–4 sessions) follows the recommended treatment interval and may reduce the per-session cost when purchased as a package." },
      { question: "How many PRP sessions will I need?", answer: "Most patients begin with an initial course of 3–4 sessions spaced 4–6 weeks apart. After the initial course, maintenance sessions (typically every 4–6 months) may help sustain results. Your exact plan depends on doctor assessment." },
      { question: "What is the total cost of a full PRP treatment plan in Delhi?", answer: "The total cost includes the initial course plus ongoing maintenance sessions. Because PRP requires continued treatment to maintain its effects, factoring in maintenance costs gives a realistic picture of the annual investment." },
      { question: "What's included in the PRP session price?", answer: "At Ryan Clinic, the standard session price covers doctor consultation and scalp assessment, blood draw, PRP preparation and centrifugation, scalp injections, quality PRP kit, sterile single-use materials, aftercare guidance, and follow-up within the course." },
      { question: "Why do PRP prices vary so much between Delhi clinics?", answer: "PRP pricing differences reflect differences in kit quality, concentration technique, who performs the treatment (doctor vs. technician), clinic overhead, and what is included in the price." },
      { question: "Does Ryan Clinic offer EMI for PRP treatment in Delhi?", answer: "EMI and payment plan options are available for some treatments at Ryan Clinic. Whether PRP packages currently qualify and which finance partners are available is subject to verification. Please contact the clinic directly to confirm current EMI options." },
      { question: "Is PRP worth the cost?", answer: "PRP may support hair density and reduce shedding for patients with early-to-moderate hair thinning where viable hair follicles remain. Results vary between individuals. A doctor consultation is the best way to assess suitability." },
      { question: "Can I combine PRP with a hair transplant in Delhi?", answer: "Yes. PRP may be used as part of a doctor-guided post-transplant recovery protocol. For detailed surgical pricing, see our <a href='/cost/hair-transplant-cost-in-delhi' class='text-[#e30a17] font-semibold underline'>hair transplant cost in Delhi</a> page." },
      { question: "Are there any hidden costs in PRP treatment?", answer: "At Ryan Clinic, standard inclusions are covered in the quoted price. If add-ons are recommended, they are disclosed upfront before treatment." },
      { question: "Does cheaper PRP mean lower quality in Delhi?", answer: "Not always, but very low prices are often associated with lower-grade PRP kits or technician-administered treatment. Ask what the price covers before comparing figures." },
      { question: "How do I get a transparent PRP cost quote in Delhi?", answer: "The most accurate way to get a cost estimate is a free doctor consultation. At Ryan Clinic, <a href='/doctors/hair-transplant-doctor-in-delhi' class='text-[#e30a17] font-semibold underline'>Dr. Pranendra Singh</a> or our senior doctors assess your scalp condition and provide a written price breakdown." },
    ],
  },

  pricingOptions: {
    badge: "Transparent Pricing",
    heading: "Ryan Clinic PRP hair treatment cost in Delhi",
    description: "Our pricing is confirmed by the doctor after assessing your scalp. All costs are disclosed upfront in writing.",
    items: [
      {
        title: "Single PRP Session",
        subtitle: "Doctor consultation + complete treatment",
        price: "",
        priceSuffix: "per session (Indicative Market Range: ₹3,000–₹6,000)",
        description: "Includes: doctor scalp assessment, blood draw, PRP preparation, centrifugation, scalp injections, quality PRP kit, sterile materials, and aftercare guidance. Exact Ryan Clinic price confirmed after consultation.",
        badge: "",
        features: [
          "Doctor-administered — not technician-led",
          "Quality PRP kit",
          "Sterile single-use materials",
          "Aftercare guidance included",
        ],
        ctaText: "Get Session Price",
        ctaLink: "/contact",
        displayOrder: 0,
        active: true,
      },
      {
        title: "Initial Course (3–4 Sessions)",
        subtitle: "Structured hair restoration programme",
        price: "",
        priceSuffix: "for full course (Indicative Market Range: ₹10,000–₹20,000)",
        description: "A structured initial course is the recommended starting point for most patients. Package options may reduce per-session cost when purchased as a course.",
        badge: "Recommended",
        features: [
          "Structured treatment plan",
          "4–6 weeks between sessions",
          "Doctor review after each session",
          "Designed for recommended growth cycle",
        ],
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
        description: "After completing the initial course, maintenance sessions every 4–6 months help maintain results achieved during the initial treatment course.",
        badge: "",
        features: [
          "Every 4–6 months typically",
          "Helps maintain initial results",
          "Doctor assessment before each session",
        ],
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
      heading: "PRP Cost Per Session vs Package Price in Delhi",
      description: "Paying for a single PRP session is straightforward, but committing to a structured course follows the recommended treatment interval and may reduce per-session cost.\n\nFor most patients, starting with a structured package delivers a clearer treatment path. Exact pricing for your condition is confirmed after doctor consultation.",
      layout: "comparison",
      items: [
        {
          title: "Single PRP Session",
          subtitle: "Flexible Trial Option",
          badge: "Pay-As-You-Go",
          icon: "🧪",
          value: "₹3,000 – ₹6,000",
          label: "per session (Indicative Market Range)",
          highlight: false,
          description: "Ideal if you want to test scalp tolerance or assess treatment comfort before committing to a full multi-session course.",
          features: [
            "Single centrifuge blood preparation",
            "Specialist scalp micro-injections",
            "Pay-as-you-go flexibility",
            "No long-term commitment",
          ],
          ctaText: "Ask About Single Session",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20to%20know%20single%20PRP%20session%20cost%20in%20Delhi",
          displayOrder: 0,
          active: true,
        },
        {
          title: "Structured PRP Course (3–4 Sessions)",
          subtitle: "Complete Initial Protocol",
          badge: "Recommended Course",
          icon: "⭐",
          value: "₹10,000 – ₹20,000",
          label: "initial course (Indicative Market Range)",
          secondaryValue: "Recommended Protocol",
          highlight: true,
          description: "Committing to a structured course follows the recommended treatment interval and provides a systematic treatment plan.",
          features: [
            "Complete 3–4 session initial protocol",
            "Sessions spaced 4–6 weeks apart",
            "Doctor review after every session",
            "Digital trichoscopy density tracking",
          ],
          ctaText: "Book Free Package Assessment",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20to%20book%20a%20PRP%20package%20consultation%20in%20Delhi",
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
      heading: "How Many Sessions & Total PRP Cost in Delhi",
      description: "The total cost of PRP treatment in Delhi is not just the price of one session — it is the combined cost of your initial course plus ongoing maintenance sessions to sustain hair density.",
      layout: "timeline",
      items: [
        {
          icon: "🌱",
          title: "Phase 1: Initial Growth Course",
          subtitle: "Months 1 to 4",
          badge: "Step 01",
          value: "3 – 4 Sessions",
          label: "Required Sessions",
          secondaryLabel: "Interval",
          secondaryValue: "Every 4–6 Weeks",
          description: "May help support follicles where viable hair remains, reduce early shedding, and support thinning hair shafts.",
          displayOrder: 0,
          active: true,
        },
        {
          icon: "📊",
          title: "Phase 2: Density Audit & Review",
          subtitle: "Month 5",
          badge: "Step 02",
          value: "Doctor Evaluation",
          label: "Progress Audit",
          secondaryLabel: "Assessment",
          secondaryValue: "Trichoscopy Check",
          description: "Digital trichoscopy scalp audit to assess density progress, hair count, and thickness changes.",
          displayOrder: 1,
          active: true,
        },
        {
          icon: "🔄",
          title: "Phase 3: Sustained Maintenance",
          subtitle: "Ongoing Care",
          badge: "Step 03",
          value: "1 Session",
          label: "Maintenance Session",
          secondaryLabel: "Interval",
          secondaryValue: "Every 4–6 Months",
          description: "Helps maintain results achieved during the initial treatment course.",
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
      description: "PRP is not a one-time permanent treatment. Its effects are sustained by ongoing maintenance sessions.\n\nPatients who complete the initial course but skip maintenance sessions may see a gradual regression of results over 6–12 months. This is simply the biology of PRP, which works by supporting existing follicles.\n\nWhen evaluating whether PRP is affordable for you, factor in the maintenance sessions required annually. This gives an honest annual cost of sustaining your results.",
      layout: "highlight",
      items: [
        {
          icon: "🔄",
          title: "Maintenance is required",
          description: "Helps maintain results achieved during the initial treatment course",
          displayOrder: 0,
          active: true,
        },
        {
          icon: "📅",
          title: "Every 4–6 months",
          description: "Typical maintenance interval after the initial course",
          displayOrder: 1,
          active: true,
        },
        {
          icon: "💰",
          title: "Factor total annual cost",
          description: "Include maintenance when budgeting for hair care",
          displayOrder: 2,
          active: true,
        },
        {
          icon: "🩺",
          title: "Doctor-assessed timing",
          description: "Your doctor recommends the interval based on individual response",
          displayOrder: 3,
          active: true,
        },
      ],
      displayOrder: 2,
      enabled: true,
    },
    {
      sectionKey: "worth-it",
      badge: "Is PRP Worth It?",
      heading: "Is PRP worth the cost in Delhi?",
      description: "PRP is worth considering when you have active follicles and realistic expectations. Evaluating your candidacy early prevents wasted investment.",
      layout: "suitability",
      items: [
        {
          type: "positive",
          icon: "✓",
          title: "When PRP May Be Worth the Investment",
          subtitle: "Best Candidates for Recommended Treatment",
          description: "PRP is generally most suitable for patients in early to moderate stages of hair thinning where viable hair follicles remain.",
          features: [
            "Early to moderate thinning with active, miniaturised follicles",
            "Looking to support hair density & reduce early shedding",
            "Committed to 3–4 session initial course + maintenance",
            "Seeking doctor-led non-surgical scalp rejuvenation",
          ],
          displayOrder: 0,
          active: true,
        },
        {
          type: "negative",
          icon: "!",
          title: "When PRP May Not Be Suitable",
          subtitle: "Limitations & Expectations",
          description: "PRP cannot revive completely dormant hair follicles in fully bald scalp zones.",
          features: [
            "Completely smooth, bald areas with zero follicles",
            "Expecting permanent 1-time results without maintenance",
            "Untreated underlying medical or hormonal conditions",
            "Expecting surgical graft density in bald patches",
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
      heading: "EMI and Payment Options for PRP Treatment in Delhi",
      description: "Ryan Clinic offers payment flexibility for structured hair treatment packages. Confirming your eligibility early helps you budget your hair restoration with total peace of mind.",
      layout: "checklist",
      items: [
        {
          icon: "💳",
          title: "0% Interest EMI Plans",
          subtitle: "Subject to Verification",
          description: "Option to split structured PRP packages into monthly installments. Subject to partner approval.",
          displayOrder: 0,
          active: true,
        },
        {
          icon: "📅",
          title: "Flexible Package Installments",
          subtitle: "Pay Per Session or Course",
          description: "Choose between single-session pay-as-you-go or multi-session course payment plans.",
          displayOrder: 1,
          active: true,
        },
        {
          icon: "🛡️",
          title: "Verified Finance Partners",
          subtitle: "Instant Digital Verification",
          description: "Quick digital eligibility check with our healthcare financing partners.",
          displayOrder: 2,
          active: true,
        },
        {
          icon: "📄",
          title: "100% Written Price Transparency",
          subtitle: "Zero Hidden Charges",
          description: "All cost terms, session counts, and inclusions are documented upfront in writing.",
          displayOrder: 3,
          active: true,
        },
      ],
      displayOrder: 4,
      enabled: true,
    },
    {
      sectionKey: "prp-with-transplant",
      badge: "Combined Treatment",
      heading: "Cost of PRP with a Hair Transplant in Delhi",
      description: "PRP may be considered as part of a doctor-guided post-transplant recovery protocol to support graft recovery and nourish newly transplanted follicles.\n\nExplore full surgical graft options: <a href='/cost/hair-transplant-cost-in-delhi'>hair transplant cost in Delhi</a>.",
      layout: "highlight",
      items: [
        {
          icon: "⚡",
          title: "Graft Recovery Support",
          description: "PRP may be used as part of a doctor-guided post-transplant care plan",
          displayOrder: 0,
          active: true,
        },
        {
          icon: "🌱",
          title: "Follicle Recovery Protocol",
          description: "PRP may be considered as part of a doctor-guided recovery protocol",
          displayOrder: 1,
          active: true,
        },
        {
          icon: "💎",
          title: "Surgical Bundle Packages",
          description: "Ask your doctor if PRP sessions are included in your FUE or DHI package",
          displayOrder: 2,
          active: true,
        },
        {
          icon: "🩺",
          title: "Doctor-Led Protocol",
          description: "Surgeon-administered PRP injections aligned with your surgical timeline",
          displayOrder: 3,
          active: true,
        },
      ],
      displayOrder: 5,
      enabled: true,
    },
  ],

  mythsFacts: {
    badge: "Common Misconceptions",
    heading: "Myths vs facts about PRP cost in Delhi",
    description: "There is a lot of misinformation about PRP pricing in Delhi. Here are four common myths and facts.",
    pairs: [
      {
        myth: "The cheapest PRP in Delhi is the best deal.",
        fact: "Price can vary based on kit quality, treatment protocol, doctor involvement, and what is included in the quoted price. Ask what the price covers before comparing figures.",
        displayOrder: 0,
        active: true,
      },
      {
        myth: "One session's price is the full cost.",
        fact: "PRP works as a course, not a single treatment. Budget for an initial course of 3–4 sessions plus maintenance every 4–6 months. Stopping after one session rarely produces expected results.",
        displayOrder: 1,
        active: true,
      },
      {
        myth: "PRP costs the same at every clinic in Delhi.",
        fact: "Rates across Delhi range roughly from ₹3,000 to ₹15,000 per session. The spread reflects kit quality, doctor involvement, clinic overheads, and what's bundled into the price.",
        displayOrder: 2,
        active: true,
      },
      {
        myth: "Paying more guarantees regrowth.",
        fact: "No price guarantees a result. PRP supports follicles where viable hair remains. A proper doctor scalp diagnosis matters more than the amount spent.",
        displayOrder: 3,
        active: true,
      },
    ],
  },

  visitClinic: {
    badge: "Our Delhi Clinic",
    heading: "Visiting Ryan Clinic for PRP in Delhi",
    description: "Ryan Clinic is based in Pitampura, Delhi. You can visit us for a free doctor consultation to discuss PRP treatment cost and suitability for your hair loss condition.",
    address: "CD 163, Block CD,\nDakshini Pitampura,\nPitampura,\nNew Delhi – 110034",
    city: "Delhi",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.0680820882073!2d77.12774987550765!3d28.70136867562095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e90bec783b%3A0x5f2c5fea9f5b3d7!2sPitampura%2C%20New%20Delhi%2C%20Delhi%20110034!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin",
    phone: "+91-9911111247",
    whatsapp: "+919217958539",
    timings: "Monday – Saturday: 10:00 AM – 7:00 PM",
    landmark: "Near Pitampura TV Tower",
    nearbyAreas: ["Pitampura", "Rohini", "Shalimar Bagh", "Kohat Enclave", "Shakurpur"],
    buttonText: "Get Directions",
    buttonLink: "https://maps.app.goo.gl/pitampura-ryan-clinic",
  },

  settings: {
    status: "published",
    featured: false,
    displayOrder: 10,
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
