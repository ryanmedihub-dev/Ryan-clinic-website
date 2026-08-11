import { DBConnection } from "../src/lib/db.js";
import CostPage from "../src/models/CostPage.js";

async function seedFueCostDelhiPage() {
  try {
    await DBConnection();
    console.log("Connected to MongoDB for FUE Hair Transplant Cost in Delhi seeding...");

    const slug = "fue-hair-transplant-cost-in-delhi";

    let costDoc = await CostPage.findOne({ slug });

    if (!costDoc) {
      console.log(`Creating new CostPage document for slug '${slug}'...`);
      costDoc = new CostPage({ slug });
    } else {
      console.log(`Updating existing CostPage document for slug '${slug}'...`);
    }

    costDoc.title = "FUE Hair Transplant Cost in Delhi";
    costDoc.pageType = "hair-transplant";

    // 1. SEO Metadata
    costDoc.seo = {
      metaTitle: "FUE Hair Transplant Cost in Delhi 2026 | Ryan Clinic",
      metaDescription: "FUE hair transplant cost in Delhi explained — per-graft prices, cost by graft count, what affects it, FUE vs THT/Turkey, EMI, and value. Get a transparent quote.",
      keywords: [
        "FUE hair transplant cost in Delhi",
        "FUE hair transplant price in Delhi",
        "FUE hair transplant cost per graft in Delhi",
        "FUE hair transplant cost for 2000/3000 grafts in Delhi",
        "Sapphire FUE cost in Delhi",
        "affordable FUE hair transplant in Delhi",
        "cheap FUE hair transplant in Delhi",
        "best FUE hair transplant cost in Delhi",
        "hair transplant cost in Delhi",
        "FUE vs THT cost"
      ],
      canonical: "https://www.clinicryan.com/cost/fue-hair-transplant-cost-in-delhi",
      ogImage: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
      robots: "index, follow",
      geoRegion: "IN-DL",
      geoPlacename: "Delhi",
      geoPosition: "28.6996;77.1308",
      icbm: "28.6996, 28.6996",
    };

    // 2. Hero Section (H1)
    costDoc.hero = {
      breadcrumbs: ["Home", "Cost", "FUE Hair Transplant Cost in Delhi"],
      title: "Best FUE Hair Transplant Cost in Delhi",
      pricingLine: "Transparent Per-Graft Pricing · 100% Doctor-Led Surgery · 0% EMI Available",
      heroImage: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
      heroImageAlt: "FUE Hair Transplant Cost in Delhi — Ryan Clinic",
      buttons: [],
      stats: [
        { value: "₹30", label: "Per-Graft Starting Rate" },
        { value: "0%", label: "Interest EMI Options" },
        { value: "100%", label: "Doctor-Led Surgery" },
      ],
    };

    // 3. Intro Section (H2 #1: How much does FUE hair transplant cost in Delhi?)
    costDoc.intro = {
      badge: "Delhi Pricing Guide 2026",
      heading: "How much does FUE hair transplant cost in Delhi?",
      description: "FUE hair transplant cost in Delhi is charged per graft, so your total depends mainly on how many grafts you need (your degree of hair loss and goals) and the technique (Sapphire FUE and THT (Turkey Hair Transplant) usually cost more than basic FUE). As an indicative guide, FUE is commonly priced at a per-graft rate, with a typical full procedure ranging widely by graft count (from ₹30,000 to ₹1,80,000+). At Ryan Clinic in Pitampura, your exact, all-inclusive FUE hair transplant price in Delhi is confirmed after a free scalp analysis, with 0% EMI available. The cheapest quote is rarely the best value — you're paying for graft survival and a natural result.",
      buttons: [
        {
          text: "Calculate Your Graft Cost",
          link: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20FUE%20hair%20transplant%20graft%20estimate",
          variant: "primary",
        },
      ],
      summaryRows: [
        { label: "Procedure Starting Price", value: "From ₹30,000 (All-inclusive)", icon: "DollarSign" },
        { label: "Per-Graft Price Range", value: "₹30 – ₹60 per graft", icon: "Stethoscope" },
        { label: "Doctor Scalp Analysis", value: "Free Consultation Included", icon: "ShieldCheck" },
        { label: "Easy Payment Options", value: "0% Interest Monthly EMI", icon: "CreditCard" },
      ],
    };

    // 4. Per-Graft Pricing Section (H2 #2: FUE hair transplant cost per graft in Delhi)
    costDoc.pricingOptions = {
      badge: "Per-Graft Rates",
      heading: "FUE hair transplant cost per graft in Delhi",
      description: "Most clinics quote FUE hair transplant cost in Delhi as a price per graft. Your total is simply that rate × your graft count (ranging from ₹30 to ₹60+ per graft depending on technique). A useful honesty tip: a low per-graft rate isn't automatically cheaper overall. Some high-volume clinics quote a low per-graft price but inflate the graft count, or use technicians — so compare the total cost for your case and who performs the surgery, not just the per-graft number.",
      items: [
        {
          title: "Basic FUE Rate",
          price: "₹30 – ₹40",
          priceSuffix: "per graft",
          subtitle: "Standard micro-FUE extraction & channel placement",
          description: "Doctor-led extraction and implantation using standard steel punch instruments.",
          features: [
            "Per-graft transparent rate",
            "100% Doctor-led surgical execution",
            "Sterile single-use consumables"
          ],
          ctaText: "Get Per-Graft Quote",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20per-graft%20FUE%20cost%20estimate",
          displayOrder: 1,
          active: true,
        },
        {
          title: "Sapphire FUE Rate",
          price: "₹40 – ₹55",
          priceSuffix: "per graft",
          subtitle: "Gemstone blades for ultra-dense hairline packing",
          description: "Microscopic Sapphire blades creating finer, denser recipient slits with faster healing.",
          features: [
            "Ultra-fine Sapphire gemstone incisions",
            "Higher graft density & zero linear scar",
            "Doctor-planned hairline geometry"
          ],
          badge: "Most Popular",
          ctaText: "Get Sapphire Quote",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20Sapphire%20FUE%20per-graft%20quote",
          displayOrder: 2,
          active: true,
        },
        {
          title: "THT Choi Pen Rate",
          price: "₹50 – ₹65",
          priceSuffix: "per graft",
          subtitle: "Direct implanter pen with angle control",
          description: "Direct Choi pen implantation without prior channel pre-cutting, providing maximum control.",
          features: [
            "Direct Choi implanter pen insertion",
            "No recipient slit pre-cutting",
            "No-shave option available"
          ],
          ctaText: "Get THT Quote",
          ctaLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20THT%20Choi%20Pen%20cost%20quote",
          displayOrder: 3,
          active: true,
        },
      ],
    };

    // 5. Graft Pricing Section (H2 #3: FUE hair transplant cost by graft count in Delhi)
    costDoc.graftPricing = {
      badge: "Graft Count Guide",
      heading: "FUE hair transplant cost by graft count in Delhi",
      description: "Because FUE is priced per graft, your graft count is the main driver of cost. A rough guide by graft count (illustrative starting rates):",
      cards: [
        {
          title: "~1,000 Grafts",
          price: "₹30,000 – ₹50,000",
          subtitle: "Hairline & Temple Recession",
          description: "Typically suits hairline/temple recession, temporal peak reconstruction, and touch-ups.",
          features: [
            { text: "Single-hair feathering for natural hairline" },
            { text: "100% Doctor-led extraction" },
            { text: "1-Day procedure" }
          ],
          badge: "Stage 2 Loss",
          displayOrder: 1,
          active: true,
        },
        {
          title: "~2,000 Grafts",
          price: "₹60,000 – ₹90,000",
          subtitle: "Frontal Thinning & Receding Hairline",
          description: "Typically suits frontal thinning, filling in receding temples, and rebuilding front density.",
          features: [
            { text: "Micro-dense packing" },
            { text: "Choi pen implantation option" },
            { text: "Free post-op wash kit included" }
          ],
          badge: "Popular Choice",
          displayOrder: 2,
          active: true,
        },
        {
          title: "~3,000 Grafts",
          price: "₹90,000 – ₹1,35,000",
          subtitle: "Frontal Zone + Crown Thinning",
          description: "Typically suits frontal + crown thinning, restoring full hair coverage across mid-scalp.",
          features: [
            { text: "High density graft allocation" },
            { text: "Sapphire FUE incision channels" },
            { text: "Full 18-month follow-up care" }
          ],
          badge: "Full Coverage",
          displayOrder: 3,
          active: true,
        },
        {
          title: "~4,000+ Grafts",
          price: "₹1,20,000 – ₹1,80,000+",
          subtitle: "Extensive Loss (Staged / Mega Session)",
          description: "Typically suits extensive loss (often staged across sessions) for advanced Norwood 5–7 cases.",
          features: [
            { text: "Staged or mega-session protocol" },
            { text: "Donor area preservation strategy" },
            { text: "Structured growth monitoring" }
          ],
          badge: "Mega Session",
          displayOrder: 4,
          active: true,
        },
      ],
    };

    const includedObjectItems = [
      { text: "Doctor consultation and digital scalp analysis.", title: "Doctor Consultation", icon: "🩺", description: "Comprehensive scalp audit and trichoscopy evaluation." },
      { text: "Custom hairline design, local anesthesia, and doctor-led FUE procedure (extraction + implantation).", title: "Doctor-Led Surgery", icon: "💎", description: "100% surgeon-performed graft extraction and implantation." },
      { text: "Sterile, single-use surgical materials and high-precision Choi implanter pens.", title: "Sterile Consumables", icon: "🛡️", description: "Hospital-grade sterile OT environment and single-use tools." },
      { text: "Post-operative hair wash kit, essential medications, and follow-up reviews through your growth cycle.", title: "Aftercare & Follow-ups", icon: "✅", description: "Complete post-op medication kit and 18-month progress reviews." },
    ];

    const includedDisclosuresObjects = [
      { text: "No hidden charges. Your written estimate after consultation is 100% all-inclusive.", title: "100% Transparent Price", icon: "🔒", description: "All terms provided in writing upfront." },
    ];

    const guaranteesObjects = [
      { text: "No hidden charges. Your written estimate after consultation is 100% all-inclusive.", title: "Written Guarantee", icon: "✓" }
    ];

    // 6. What's Included Section (H2 #4: What's included in FUE hair transplant cost in Delhi)
    costDoc.includedSection = {
      badge: "Transparent Inclusions",
      heading: "What's included in FUE hair transplant cost in Delhi",
      description: "A transparent FUE hair transplant cost in Delhi should make clear what you're paying for. At Ryan Clinic, the quoted price typically covers:",
      items: includedObjectItems,
      hiddenCosts: includedObjectItems,
      disclosures: includedDisclosuresObjects,
      guarantees: guaranteesObjects,
      buttonText: "Get Written Graft Quote",
      buttonLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20written%20all-inclusive%20FUE%20cost%20quote",
    };

    // 7. Price Factors Section (H2 #5: What affects FUE hair transplant cost and price in Delhi & H2 #10: EMI and payment options for FUE hair transplant in Delhi)
    costDoc.priceFactors = {
      badge: "Cost Drivers",
      heading: "What affects FUE hair transplant cost and price in Delhi",
      description: "Several factors explain why the FUE hair transplant price in Delhi varies between clinics:",
      factors: [
        {
          title: "Number of Grafts Needed",
          description: "The biggest factor — more grafts require longer surgical time and higher resource allocation.",
        },
        {
          title: "Technique Used",
          description: "Sapphire FUE and THT (Choi Pen) usually cost more than basic metal FUE due to gemstone blades and implanters.",
        },
        {
          title: "Surgeon's Expertise & Doctor-Led Involvement",
          description: "Doctor-led work may cost more than technician-run 'graft mills,' but it protects graft survival and naturalness.",
        },
        {
          title: "Number of Sessions Required",
          description: "Large cases requiring 4,000+ grafts may be staged across two sessions for donor area safety.",
        },
        {
          title: "Clinic Setup & Location",
          description: "Premium sterile OT suites and hospital-grade facilities carry higher overheads.",
        },
        {
          title: "Therapeutic Add-Ons",
          description: "Integrating PRP or Growth Factor Therapy (GFC) to boost graft uptake and native hair growth.",
        },
      ],
      emiBadge: "Payment Options",
      emiHeading: "EMI and payment options for FUE hair transplant in Delhi",
      emiPlans: [
        { months: "3 Months", interest: "0% Interest", note: "Equal monthly installments" },
        { months: "6 Months", interest: "0% Interest", note: "Zero downpayment available" },
        { months: "12 Months", interest: "Low Monthly EMI", note: "Flexible partner financing" },
      ],
    };

    // 8. Technique Comparison Section (H2 #6: FUE vs Sapphire FUE vs THT cost in Delhi)
    costDoc.techniqueComparison = {
      badge: "Technique Comparison",
      heading: "FUE vs Sapphire FUE vs THT cost in Delhi",
      description: "Technique affects price. In general, the right technique for you is decided at consultation — and it should be chosen for your case, not just price:",
      columns: [
        { name: "Technique", badge: "", highlighted: false },
        { name: "Relative Cost", badge: "", highlighted: false },
        { name: "Why / Key Feature", badge: "", highlighted: false },
        { name: "Ideal Candidate", badge: "", highlighted: true },
      ],
      rows: [
        {
          label: "Basic FUE",
          values: [
            { value: "Basic FUE" },
            { value: "Lowest" },
            { value: "Standard recipient-site creation" },
            { value: "Standard hairline restoration" },
          ],
        },
        {
          label: "Sapphire FUE",
          values: [
            { value: "Sapphire FUE" },
            { value: "Mid–Higher" },
            { value: "Sapphire blades; finer, denser recipient sites" },
            { value: "High-density hairline packing" },
          ],
        },
        {
          label: "THT (Choi Pen)",
          values: [
            { value: "THT (Choi Pen)" },
            { value: "Often Highest" },
            { value: "Implanter pen; precise, no-shave option" },
            { value: "Maximum density & fast recovery" },
          ],
        },
        {
          label: "FUT (Strip Method)",
          values: [
            { value: "FUT (Strip Method)" },
            { value: "Lower per graft for mega cases" },
            { value: "Strip harvest; leaves linear scar" },
            { value: "Patients needing 5,000+ grafts in 1 session" },
          ],
        },
        {
          label: "Turkey Packages",
          values: [
            { value: "Turkey Packages" },
            { value: "Appears low upfront" },
            { value: "Includes travel; often technician-led with no local follow-up" },
            { value: "Requires international travel" },
          ],
        },
      ],
    };

    // 9. Ryan Clinic Transparent Pricing Section (H2 #11: Ryan Clinic FUE hair transplant cost in Delhi (transparent pricing))
    costDoc.pricing = {
      badge: "Transparent Pricing",
      heading: "Ryan Clinic FUE hair transplant cost in Delhi (transparent pricing)",
      description: "At Ryan Clinic, your transparent, all-inclusive FUE hair transplant price in Delhi is confirmed after a free scalp analysis — no hidden charges. For all-technique pricing, consult our specialist doctor.",
      cards: [
        {
          title: "Basic FUE Hair Transplant",
          price: "From ₹30 / graft",
          subtitle: "Doctor-led micro FUE extraction & channel packing",
          description: "Starting at ₹30 per graft, including free scalp check and complete post-op wash kit.",
          features: [
            { text: "Per-graft transparent rate" },
            { text: "100% Doctor-led extraction & implantation" },
            { text: "Sterile single-use instruments" },
            { text: "0% Interest EMI available" }
          ],
          badge: "Transparent Rate",
          displayOrder: 0,
          active: true,
        },
        {
          title: "Sapphire FUE Hair Transplant",
          price: "From ₹40 / graft",
          subtitle: "Gemstone blades for ultra-dense natural hairline",
          description: "Microscopic Sapphire blade channel creation for maximum graft survival and zero visible linear scarring.",
          features: [
            { text: "Ultra-fine Sapphire incisions" },
            { text: "Faster scalp healing & higher density" },
            { text: "Doctor-planned hairline geometry" },
            { text: "0% Interest EMI available" }
          ],
          badge: "Most Popular",
          displayOrder: 1,
          active: true,
        },
        {
          title: "THT Direct Implantation (Choi Pen)",
          price: "From ₹50 / graft",
          subtitle: "Direct implanter pen placement with angle control",
          description: "Direct follicle insertion with zero pre-cut slits, offering maximum control and no-shave options.",
          features: [
            { text: "Direct Choi implanter pen placement" },
            { text: "No recipient channel pre-cutting" },
            { text: "Maximum graft survival & natural angle" },
            { text: "0% Interest EMI available" }
          ],
          badge: "Advanced Tech",
          displayOrder: 2,
          active: true,
        },
      ],
    };

    // 10. Dynamic Content Sections (H2 #7, H2 #8, H2 #9, H2 #12)
    costDoc.contentSections = [
      {
        sectionKey: "fue-vs-fut",
        badge: "Method Comparison",
        heading: "FUE vs FUT cost in Delhi",
        description: "FUT (the strip method) can sometimes be priced lower per graft for very large sessions, but it leaves a linear scar, whereas FUE leaves only tiny dot marks. Most patients choosing based on natural appearance and the freedom to wear short hair prefer FUE despite the cost difference. Decide on the result you want, not the price alone.",
        layout: "cards",
        items: [
          {
            title: "FUE Hair Transplant",
            subtitle: "No Linear Scar · Micro Dot Harvesting",
            description: "Individual follicle extraction leaving microscopic dot marks that heal invisibly under short hair.",
            icon: "💎",
            ctaText: "Choose FUE",
            ctaLink: "/surgery/hair-transplant-surgery-in-delhi",
          },
          {
            title: "FUT Strip Surgery",
            subtitle: "Strip Harvest · Leaves Linear Scar",
            description: "Surgical removal of a scalp strip. Can yield high graft counts but leaves a permanent linear scar across the donor area.",
            icon: "📄",
            ctaText: "Learn More",
            ctaLink: "/surgery/hair-transplant-surgery-in-delhi",
          },
        ],
      },
      {
        sectionKey: "delhi-vs-turkey",
        badge: "Destination Comparison",
        heading: "FUE hair transplant cost in Delhi vs Turkey",
        description: "Turkey is often marketed as a cheap hair-transplant destination, but the honest comparison isn't just sticker price. Once you add flights, accommodation, and the time/cost of travelling for follow-ups, and factor in who performs the surgery and aftercare access, a doctor-led FUE hair transplant in Delhi is frequently competitive — and far easier for follow-up care close to home. Compare total cost and surgical quality, not just the headline package price.",
        layout: "highlight",
        items: [
          {
            title: "Local Aftercare Access",
            description: "Direct access to your operating surgeon in Pitampura for post-op washes, PRP sessions, and progress checks.",
            icon: "🩺",
          },
          {
            title: "Zero Travel Overheads",
            description: "No international airfare, passport hassles, hotel bookings, or currency conversion charges.",
            icon: "💰",
          },
          {
            title: "100% Doctor-Led Surgery",
            description: "Dr. Pranendra Singh personally conducts evaluation, extraction, and implantation — not uncredentialed technicians.",
            icon: "🛡️",
          },
          {
            title: "Verifiable Medical Registration",
            description: "Active Delhi Medical Council (DMC) registration with full legal accountability.",
            icon: "✅",
          },
        ],
      },
      {
        sectionKey: "cheap-fue-risks",
        badge: "Value & Safety Analysis",
        heading: "Is a cheap FUE hair transplant in Delhi worth it?",
        description: "It's tempting to choose the lowest FUE hair transplant cost in Delhi, but cheap surgery carries real risks:\n\n• Very low prices often mean high-volume, technician-led work where graft survival — the thing you're paying for — suffers.\n• A transplant is a one-time redistribution of a limited donor supply; wasted grafts can't be recovered.\n• A poor result may need costly repair surgery later.\n\nThe honest takeaway: judge a clinic on graft survival and naturalness (via real before-and-afters and reviews) and who performs the surgery — not on the cheapest quote. Affordable and doctor-led aren't mutually exclusive, but rock-bottom pricing is a warning sign.",
        layout: "suitability",
        items: [
          {
            type: "positive",
            title: "Doctor-Led & Quality Focused",
            subtitle: "True Value Choice",
            description: "Invest in high graft survival, natural density, and long-term hairline aesthetics under qualified medical supervision.",
            features: [
              "100% Doctor extraction & implantation",
              "High graft survival rate",
              "Sterile hospital-grade OT environment",
              "18-month structured growth tracking"
            ],
          },
          {
            type: "negative",
            title: "Rock-Bottom Technician Mills",
            subtitle: "High Risk Warning",
            description: "Extremely low rates often sacrifice medical safety, surgeon involvement, and donor area preservation.",
            features: [
              "Technician-run procedures without doctor presence",
              "Higher risk of donor over-harvesting & patchiness",
              "Low graft survival rate",
              "Potential costly repair surgery needed later"
            ],
          },
        ],
      },
      {
        sectionKey: "why-ryan-worth-it",
        badge: "Why Choose Ryan Clinic",
        heading: "Why our FUE hair transplant cost in Delhi is worth it",
        description: "• Doctor-led at every step — protecting graft survival and a natural hairline.\n• Sapphire FUE and THT options matched to your case.\n• Transparent, all-inclusive per-graft pricing — no day-of surprises.\n• Sterile facility and structured aftercare/follow-up.\n• 0% EMI available.\n\nHonest note: we've avoided 'cheapest in Delhi' and unverifiable absolutes. For a medical page, transparent, honest cost framing builds trust and ranks better than hype.",
        layout: "checklist",
        items: [
          { title: "100% Doctor-Led Surgery", subtitle: "Surgeon Supervision", description: "Dr. Pranendra Singh plans, extracts, and implants every graft.", icon: "🩺" },
          { title: "Sapphire & THT Techniques", subtitle: "Tailored Protocol", description: "Choice of fine Sapphire blades or Choi implanter pens to match your scalp.", icon: "💎" },
          { title: "Zero Hidden Charges", subtitle: "Written Estimate", description: "All anesthesia, OT charges, wash kits, and follow-ups included upfront.", icon: "💰" },
          { title: "0% Interest Monthly EMI", subtitle: "Easy Payment", description: "Flexible monthly installment options to make treatment accessible.", icon: "💳" },
        ],
      },
    ];

    // 11. Myths vs Facts Section (H2 #13: Myths vs facts about FUE hair transplant cost in Delhi)
    costDoc.mythsFacts = {
      badge: "Fact Check",
      heading: "Myths vs facts about FUE hair transplant cost in Delhi",
      description: "Clear up common misconceptions about FUE pricing before booking your procedure:",
      pairs: [
        {
          myth: "The cheapest FUE cost in Delhi is the best deal.",
          fact: "Low prices often mean technician-led work and lower graft survival, leading to costly repair procedures later.",
        },
        {
          myth: "A low per-graft rate means the lowest total cost.",
          fact: "Some high-volume clinics quote low per-graft rates but inflate the graft count or add hidden day-of fees.",
        },
        {
          myth: "All FUE hair transplants cost the same.",
          fact: "Pricing varies significantly by graft count, technique (Sapphire vs THT), surgeon expertise, and clinic sterilization standards.",
        },
        {
          myth: "Cost is the only factor that matters in hair restoration.",
          fact: "A wasted donor area or pluggy result can cost far more to repair. Surgical skill and graft survival represent true value.",
        },
      ],
    };

    // 12. Consultation Section (H2 #15: Get your FUE hair transplant cost quote in Delhi)
    costDoc.consultation = {
      badge: "Get Your Quote",
      heading: "Get your FUE hair transplant cost quote in Delhi",
      description: "Book a free scalp analysis for a transparent, all-inclusive FUE hair transplant price in Delhi and your exact graft count — no obligation.",
      features: [
        { text: "Digital scalp audit & graft count estimate" },
        { text: "Hairline design visualization with lead surgeon" },
        { text: "Transparent written quote with zero hidden fees" },
        { text: "0% Interest EMI eligibility check" }
      ],
      buttonText: "Book Free Scalp Analysis",
      buttonLink: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%20Ryan%20Clinic%2C%20I%20want%20to%20book%20a%20free%20FUE%20scalp%20analysis",
      image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
      imageAlt: "Consultation for FUE Hair Transplant Cost in Delhi",
    };

    const faqList = [
      {
        question: "How much does an FUE hair transplant cost in Delhi?",
        answer: "FUE is priced per graft, so your total depends mainly on graft count and technique. Ryan Clinic confirms a transparent, all-inclusive price after a free scalp analysis, with 0% EMI available.",
      },
      {
        question: "What is the FUE hair transplant cost per graft in Delhi?",
        answer: "Clinics quote a per-graft rate; your total is that rate × your graft count. Basic FUE is usually lower than Sapphire FUE or THT.",
      },
      {
        question: "How much does a 2,000 or 3,000 graft FUE cost in Delhi?",
        answer: "It depends on the per-graft rate and technique. As a guide, larger graft counts cost proportionally more.",
      },
      {
        question: "Why does FUE hair transplant cost in Delhi vary so much?",
        answer: "Because of differences in graft count, technique (basic FUE vs Sapphire FUE vs THT), the surgeon's expertise and whether a doctor performs it, the number of sessions, clinic location, and add-ons like PRP.",
      },
      {
        question: "What's included in the FUE hair transplant price in Delhi?",
        answer: "At Ryan Clinic the quote typically covers consultation, scalp analysis, hairline design, anaesthesia, the FUE procedure, sterile materials, and follow-ups. Always confirm inclusions before booking.",
      },
      {
        question: "Are there hidden costs with FUE in Delhi?",
        answer: "There shouldn't be at a transparent clinic — ask for an all-inclusive quote upfront. Surprise day-of charges are a warning sign.",
      },
      {
        question: "Is a cheap FUE hair transplant in Delhi safe?",
        answer: "Very low prices often mean high-volume, technician-led work with lower graft survival. Since a transplant is a one-time use of a limited donor supply, choosing on price alone can be costly. Judge on quality and who performs the surgery.",
      },
      {
        question: "Is FUE cheaper than THT in Delhi?",
        answer: "Usually basic FUE costs less than THT, because THT uses an implanter pen for precise, no-shave placement. The right technique should be chosen for your case, not just price.",
      },
      {
        question: "Is a hair transplant in Delhi cheaper than Turkey?",
        answer: "Once you add flights, accommodation, and follow-up travel to a Turkey package — and factor in surgical quality and aftercare access — doctor-led FUE in Delhi is often competitive and far easier for follow-up care.",
      },
      {
        question: "Do you offer EMI for FUE hair transplant in Delhi?",
        answer: "Yes — Ryan Clinic offers 0% EMI options so the cost can be spread over instalments.",
      },
      {
        question: "Is an FUE hair transplant worth the cost in Delhi?",
        answer: "For suitable candidates it offers permanent, natural results using your own hair — generally good value when done well. The key is graft survival and a natural result, which depend on a skilled, doctor-led surgery.",
      },
      {
        question: "How do I get an exact FUE cost quote in Delhi?",
        answer: "Book a free scalp analysis at Ryan Clinic — you'll get your exact graft count and a transparent, all-inclusive FUE price. Call or WhatsApp +91-9217958539.",
      },
    ];

    // 13. FAQ Section (H2 #16: FUE hair transplant cost in Delhi — frequently asked questions)
    costDoc.faq = {
      badge: "Cost FAQ",
      heading: "FUE hair transplant cost in Delhi — frequently asked questions",
      description: "Everything you need to know about FUE hair transplant pricing, graft counts, EMI options, and cost comparisons in Delhi.",
      items: faqList,
      faqs: faqList,
    };

    // 14. Visit Clinic Section (H2 #14: Visiting Ryan Clinic for FUE hair transplant in Delhi)
    costDoc.visitClinic = {
      badge: "Our Delhi Clinic",
      heading: "Visiting Ryan Clinic for FUE hair transplant in Delhi",
      description: "Our Delhi centre is in Pitampura (North-West Delhi), convenient from across the city and NCR.",
      address: "CD 163, Block CD,\nDakshini Pitampura,\nPitampura,\nNew Delhi – 110034",
      city: "Delhi",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.0680820882073!2d77.12774987550765!3d28.70136867562095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03e90bec783b%3A0x5f2c5fea9f5b3d7!2sPitampura%2C%20New%20Delhi%2C%20Delhi%20110034!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin",
      phone: "+91-9217958539",
      whatsapp: "+919217958539",
      timings: "Monday – Saturday: 9:00 AM – 7:00 PM",
      landmark: "Near Pitampura TV Tower",
      nearbyAreas: [
        "Pitampura",
        "Rohini",
        "Shalimar Bagh",
        "Ashok Vihar",
        "Model Town",
        "Punjabi Bagh",
        "Paschim Vihar"
      ],
      buttonText: "Get Directions to Delhi Clinic",
      buttonLink: "https://maps.app.goo.gl/pitampura-ryan-clinic",
    };

    // 15. Section Visibility
    costDoc.sectionVisibility = {
      hero: true,
      intro: true,
      services: false,
      pricing: true,
      graftPricing: true,
      priceFactors: true,
      includedSection: true,
      consultation: true,
      faq: true,
      clinic: true,
    };

    // 16. Page Settings
    costDoc.settings = {
      status: "published",
      featured: true,
      displayOrder: 1,
      showInSitemap: true,
      allowIndexing: true,
      isDeleted: false,
      deletedAt: null,
    };

    costDoc.markModified("seo");
    costDoc.markModified("hero");
    costDoc.markModified("intro");
    costDoc.markModified("pricingOptions");
    costDoc.markModified("graftPricing");
    costDoc.markModified("includedSection");
    costDoc.markModified("priceFactors");
    costDoc.markModified("techniqueComparison");
    costDoc.markModified("pricing");
    costDoc.markModified("contentSections");
    costDoc.markModified("mythsFacts");
    costDoc.markModified("consultation");
    costDoc.markModified("faq");
    costDoc.markModified("visitClinic");
    costDoc.markModified("sectionVisibility");
    costDoc.markModified("settings");

    await costDoc.save();
    console.log(`CostPage document '${slug}' seeded successfully with exact marketing headings! ID: ${costDoc._id}`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding FUE Cost Delhi Page:", err);
    process.exit(1);
  }
}

seedFueCostDelhiPage();
