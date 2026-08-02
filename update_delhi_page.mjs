import mongoose from "mongoose";
import SurgeryPageModel from "./src/models/surgeryPage.js";

const MONGO_URL = "mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services";

const payload = {
  pageName: "Hair Transplant Surgery in Delhi",
  city: "Delhi",
  slug: "hair-transplant-surgery-in-delhi",
  status: "published",
  seo: {
    metaTitle: "Best Hair Transplant Surgery in Delhi | Ryan Clinic",
    metaDescription: "Hair transplant surgery in Delhi at Ryan Clinic — doctor-led FUE & THI in a sterile OT, local anaesthesia, same-day discharge. Free consult. Book your surgery.",
    keywords: "hair transplant surgery in Delhi, best hair transplant surgery in Delhi, fue hair transplant delhi, dhi hair transplant delhi",
    canonicalUrl: "https://www.clinicryan.com/hair-transplant-surgery-in-delhi",
    robots: "index,follow",
    openGraphImage: {
      image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp",
      imageAlt: "Hair Transplant Surgery in Delhi — Doctor-Led FUE & THI | Ryan Clinic"
    }
  },
  hero: {
    breadcrumb: "Home > Hair Transplant Surgery > Delhi",
    title: "Best Hair Transplant Surgery in Delhi",
    description: "Hair transplant surgery in Delhi is a minor, minimally-invasive outpatient surgical procedure performed under local anaesthesia — no general anaesthesia and no hospital stay for a standard case. A surgeon moves your own DHT-resistant follicles from the back and sides of your scalp to thinning areas, where they grow permanently. At Ryan Clinic in Pitampura, every step of the hair transplant surgery is doctor-led and carried out in a sterile operating theatre, with a free scalp analysis, an exact graft count, and transparent pricing before you commit.",
    heroImage: {
      image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223123/service-one_jrbcub.webp",
      imageAlt: "Hair Transplant Surgery in Delhi Banner"
    },
    stats: [
      { value: "10,000+", label: "Procedures Done" },
      { value: "98%", label: "Patient Satisfaction" },
      { value: "Doctor-Led", label: "Every Procedure" },
      { value: "Sterile OT", label: "Class 100 Clean-Room" }
    ],
    whatsappText: {
      text: "WhatsApp Us",
      link: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20consultation%20for%20hair%20transplant%20surgery%20in%20Delhi",
      external: true
    },
    callText: {
      text: "Call Now",
      link: "tel:+919217958539",
      external: false
    }
  },
  introduction: {
    smallHeading: "Hair Transplant Surgery in Delhi",
    title: "What is hair transplant surgery?",
    description: "<p>Hair transplant surgery is a surgical procedure that relocates your own hair follicles from a \"donor\" zone — usually the back and sides of the scalp — to areas that are bald or thinning. It works because of biology: follicles at the back of the scalp resist DHT (dihydrotestosterone), the hormone behind androgenetic alopecia (pattern hair loss). Those follicles keep their DHT-resistance after being moved, so the transplanted hair keeps growing in its new home — generally for life.</p><p>Although it's genuine surgery, a modern hair transplant in Delhi is minimally invasive: it's performed under local anaesthesia, on an outpatient basis, with tiny extraction points rather than large incisions. You stay awake and comfortable, and you go home the same day.</p>",
    highlightBoxText: "<p><strong>Ryan Guarantee:</strong> Undetectable, natural results — or we make it right. Every procedure is doctor-performed and backed by our written warranty.</p>",
    honestPoints: [
      "1. The transplanted hair is permanent, but your native hair can keep thinning. Surgery restores grafted areas; it doesn't freeze pattern loss elsewhere. Many patients pair surgery with medical therapy (minoxidil and/or finasteride, where appropriate and prescribed) to protect native hair, and some plan a future session.",
      "2. You have a finite donor supply. Surgery redistributes hair; it can't create new follicles. Conservative, well-planned design — not the maximum grafts in one sitting — is the mark of a skilled surgeon."
    ],
    mainImage: {
      image: "/uploads/about-one.jpg",
      imageAlt: "What is Hair Transplant Surgery"
    },
    floatingImage: {
      image: "/uploads/service-two.jpg",
      imageAlt: "Surgeon Performing Hair Transplant"
    },
    bottomStats: [
      { value: "Sapphire FUE", label: "Primary Technique" },
      { value: "THI", label: "Implantation Method" },
      { value: "0%", label: "EMI Available" },
      { value: "12 Months", label: "Follow-Up Care" }
    ],
    primaryCTA: { text: "Book Free Consultation", link: "/book-consult", external: false },
    secondaryCTA: { text: "View Results Gallery", link: "/hair-transplant-results-before-after-gallery", external: false }
  },
  safetyInfo: {
    badge: "Clinically Safe",
    heading: "Is hair transplant surgery in Delhi safe?",
    description: "For suitable candidates, hair transplant surgery in Delhi is considered a low-risk, outpatient procedure when it's performed by qualified doctors in a sterile facility. Several things make it safer than people expect:\n\nThe two biggest factors in how safe and how good your result is are who performs the surgery and where. Surgery led entirely by a qualified doctor, in a proper sterile OT, is far safer and more reliable than rushed, technician-heavy work in a high-volume 'graft mill.' That single distinction is what separates safe, natural-looking hair transplant surgery in Delhi from the cautionary tales.\n\nHonest note: 'safe' doesn't mean 'zero risk.' Like any surgery, there are minor, mostly temporary risks (covered below). A good clinic discusses them openly — that transparency is itself a sign of quality.",
    safetyPoints: [
      "Local anaesthesia only — no general anaesthesia, so the systemic risks of being 'put under' are avoided.",
      "Outpatient, same-day discharge — no hospital admission for a standard case.",
      "Minimal wounds — tiny extraction points and fine recipient channels, which heal quickly.",
      "Sterile operating theatre and single-use instruments — reducing infection risk."
    ],
    safetyCard: {
      title: "Doctor-Led Safety",
      description: "Surgery led entirely by a qualified doctor in a sterile OT is far safer and more reliable than rushed, technician-heavy work.",
      icon: "ShieldCheck"
    },
    metrics: [
      { value: "Local Anaesthesia", label: "No Systemic Risk" },
      { value: "Same-Day", label: "Discharge" },
      { value: "Sterile OT", label: "Single-Use Tools" }
    ]
  },
  bestSurgeryChecklist: {
    heading: "What makes the best hair transplant surgery in Delhi?",
    description: "'Best' should mean things you can verify, not slogans. The best hair transplant surgery in Delhi is defined by:",
    checklistItems: [
      { title: "Qualified Doctor Performing Every Step", description: "A qualified doctor performing every surgical step — extraction, channel creation, and implantation — never technicians." },
      { title: "Matched Surgical Technique", description: "A surgical technique matched to your case (Sapphire FUE/THI), not a fixed package." },
      { title: "Sterile Operating Theatre", description: "A sterile, properly-equipped operating theatre with single-use instruments." },
      { title: "Natural Hairline Design", description: "Natural hairline design — soft and irregular at the front, denser behind, matched to your face and age." },
      { title: "Real Results & Genuine Reviews", description: "Real before-and-afters and genuine reviews from comparable patients." },
      { title: "Transparent Pricing", description: "Transparent, per-graft pricing with no day-of surprises." },
      { title: "Honest Candidacy Assessment", description: "Honest candidacy — being told clearly if surgery isn't right for you." },
      { title: "Structured Aftercare", description: "Structured aftercare and follow-up through the full growth cycle." }
    ]
  },
  candidateSuitability: {
    heading: "Who needs hair transplant surgery in Delhi — and who doesn't?",
    description: "Surgery tends to be the right step when you have pattern loss and sufficient donor area. A free scalp analysis confirms whether surgery suits you.",
    suitableList: [
      "Your loss is stable and pattern-based (androgenetic alopecia).",
      "You have enough donor density to cover the area you want restored.",
      "You have realistic expectations about what a finite donor supply can achieve.",
      "You're in reasonable general health and can follow aftercare."
    ],
    notSuitableList: [
      "Very early or rapidly progressing loss (medical therapy may be better first).",
      "Active or unstable alopecia areata.",
      "Insufficient donor supply.",
      "Unmanaged scalp disease or expectations the donor area can't support."
    ],
    norwoodTable: [
      { stage: "Norwood 2–3", description: "Hairline/temple recession", grafts: "~1,000–2,000" },
      { stage: "Norwood 4–5", description: "Larger frontal + crown", grafts: "~2,000–3,500" },
      { stage: "Norwood 6–7", description: "Extensive loss", grafts: "~4,000+ (often staged)" }
    ]
  },
  beforeSurgeryTimeline: {
    heading: "Before your hair transplant surgery in Delhi",
    description: "Good outcomes start before the operating theatre:",
    timelineItems: [
      { stepNumber: "01", badge: "Step 1", title: "Consultation + Free Scalp Analysis", description: "A doctor assesses your donor density, pattern, and goals, recommends a technique and graft count, and gives a transparent cost breakdown — with no obligation." },
      { stepNumber: "02", badge: "Step 2", title: "Hairline Design", description: "Your new hairline is mapped to your facial proportions and age for a natural result." },
      { stepNumber: "03", badge: "Step 3", title: "Pre-Op Instructions Checklist", description: "Following your exact pre-op checklist — avoiding blood-thinners as medically directed, plus alcohol and smoking for a set period, and arranging the day off." }
    ]
  },
  procedureScience: {
    mainHeading: "Types of hair transplant surgery in Delhi",
    description: "<p>Modern hair transplant surgery uses follicular-unit techniques, which leave only tiny dot-like marks rather than a long scar:</p>",
    cards: [
      {
        icon: "Scissors",
        title: "FUE (Follicular Unit Extraction)",
        description: "Follicular units are removed individually with a micro-punch, then implanted. No linear scar; donor hair can be kept short. Suits most patients.",
        badge: "No Linear Scar",
        bulletPoints: ["No linear scar", "Donor hair can be kept short", "Suits most patients"],
        cardImage: { image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785222482/service-one_ybz5rj.webp", imageAlt: "FUE Extraction" }
      },
      {
        icon: "Dna",
        title: "Sapphire FUE",
        description: "An FUE refinement where recipient channels are created with sapphire-tipped blades instead of steel — finer, smoother sites that support dense, precise placement and clean healing.",
        badge: "Finer Channels",
        bulletPoints: ["Sapphire-tipped blades", "Finer, smoother channels", "Dense, precise placement", "Clean & fast healing"],
        cardImage: { image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785222517/IMG_5470.JPG_ln4wu3.jpg", imageAlt: "Sapphire FUE" }
      },
      {
        icon: "Syringe",
        title: "THI (Turkey Hair Implantation)",
        description: "A Choi implanter pen creates the site and places the graft in one motion, giving the surgeon fine control over angle, depth, and direction, and enabling no-shave or partial-shave surgery.",
        badge: "Choi Implanter Pen",
        bulletPoints: ["Choi implanter pen", "Fine control over angle, depth & direction", "Enables no-shave or partial-shave surgery"],
        cardImage: { image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785222901/service-one_zl5dc9.webp", imageAlt: "THI Choi Implanter Pen" }
      }
    ]
  },
  safety: {
    heading: "Safety Standards at Ryan Clinic Delhi",
    description: "<p>Our Delhi clinic adheres to the highest surgical safety protocols, ensuring every procedure is performed in a sterile, hospital-grade environment with zero compromise.</p>",
    safetyCards: [
      { icon: "ShieldCheck", title: "Sterile OT Environment", description: "Class 100 clean-room standards with HEPA-filtered air, preventing any risk of infection during surgery." },
      { icon: "Home", title: "Hospital-Grade Facility", description: "Our Delhi OT is equipped with crash cart, pulse oximeter, BP monitoring and full emergency protocols." },
      { icon: "Activity", title: "Vitals Monitored Throughout", description: "Patient oxygen, BP, and pulse are continuously monitored by trained nursing staff during the entire procedure." },
      { icon: "Award", title: "ISO-Compliant Instruments", description: "We use only CE-marked, single-use blades and Choi pens — no reuse, no compromise on patient safety." }
    ],
    rightSideHighlightBox: {
      smallHeading: "Our Safety Commitment",
      title: "Zero Compromise on Patient Safety",
      description: "Every Ryan Clinic procedure is backed by a comprehensive safety checklist, informed consent process, and post-operative care protocol.",
      metrics: [
        { value: "0%", label: "Infection Rate" },
        { value: "100%", label: "Sterile Instruments" },
        { value: "24/7", label: "Doctor Availability" }
      ],
      bottomNotice: "All procedures follow ISHRS (International Society of Hair Restoration Surgery) safety guidelines."
    }
  },
  techniques: {
    heading: "Types of hair transplant surgery in Delhi",
    description: "Modern hair transplant surgery uses follicular-unit techniques, which leave only tiny dot-like marks rather than a long scar:",
    techniques: [
      {
        name: "FUE (Follicular Unit Extraction)",
        subtitle: "No Linear Scar",
        description: "<p>Follicular units are removed individually with a micro-punch, then implanted. No linear scar; donor hair can be kept short. Suits most patients.</p>",
        badge: "Popular",
        featured: false,
        bulletPoints: ["No linear scar", "Donor hair can be kept short", "Suits most patients"]
      },
      {
        name: "Sapphire FUE",
        subtitle: "Fine & Precise",
        description: "<p>An FUE refinement where recipient channels are created with sapphire-tipped blades instead of steel — finer, smoother sites that support dense, precise placement and clean healing.</p>",
        badge: "Gold Standard",
        featured: true,
        bulletPoints: ["Sapphire-tipped blades", "Finer, smoother channels", "Dense, precise placement", "Clean & fast healing"]
      },
      {
        name: "THI (Turkey Hair Implantation)",
        subtitle: "Choi Implanter Pen",
        description: "<p>A Choi implanter pen creates the site and places the graft in one motion, giving the surgeon fine control over angle, depth, and direction, and enabling no-shave or partial-shave surgery.</p>",
        badge: "Turkish Method",
        featured: false,
        bulletPoints: ["Choi implanter pen", "Fine control over angle, depth & direction", "Enables no-shave or partial-shave surgery"]
      }
    ],
    bottomCTABlock: {
      heading: "Want the full technical breakdown of FUE vs THI and recovery?",
      description: "Ryan Clinic focuses on Sapphire FUE and THI. The right surgical technique for you depends on your pattern, donor area, and goals — decided at consultation.",
      primaryCTA: { text: "Book Free Consultation", link: "/book-consult", external: false },
      secondaryCTA: { text: "WhatsApp Us", link: "https://api.whatsapp.com/send?phone=+919217958539", external: true }
    }
  },
  qualityBenchmarks: {
    heading: "What makes the best hair transplant surgery in Delhi?",
    description: "'Best' should mean things you can verify, not slogans. The best hair transplant surgery in Delhi is defined by:",
    benchmarkCards: [
      { number: "100%", description: "A qualified doctor performing every surgical step — extraction, channel creation, and implantation — never technicians." },
      { number: "Custom", description: "A surgical technique matched to your case (Sapphire FUE/THI), not a fixed package." },
      { number: "Sterile OT", description: "A sterile, properly-equipped operating theatre with single-use instruments." },
      { number: "Natural", description: "Natural hairline design — soft and irregular at the front, denser behind, matched to your face and age." }
    ]
  },
  procedureTimeline: {
    heading: "During the hair transplant surgery in Delhi: step by step",
    description: "A typical hair transplant surgery in Delhi at Ryan Clinic runs from a few hours to a full day depending on graft count. Throughout, you're awake and comfortable — most patients listen to music, watch something, or rest.",
    timelineSteps: [
      { num: "1", title: "Preparation & Local Anaesthesia", tag: "Step 1", desc: "The donor (and recipient, for THI) areas are cleaned and numbed. Only the initial injections sting briefly; the surgery itself is largely painless.", image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785222989/service-one_e7she0.webp" },
      { num: "2", title: "Graft Extraction", tag: "Step 2", desc: "Follicular units are extracted from the DHT-resistant donor zone with a micro-punch, then sorted and preserved. Careful, unhurried extraction protects graft quality.", image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223003/service-one_qe8nlo.webp" },
      { num: "3", title: "Implantation", tag: "Step 3", desc: "Grafts are placed at the correct angle, depth, and direction — by Choi pen (THI) or into sapphire-created channels (Sapphire FUE) — building density from the hairline back. Minimising grafts' time outside the body supports survival.", image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223013/service-one_vzwknk.webp" },
      { num: "4", title: "Same-Day Discharge", tag: "Step 4", desc: "You go home the same day with written aftercare, medication, and a follow-up plan.", image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223017/service-one_a2ld7p.webp" }
    ],
    bottomHighlightMessage: "Throughout, you're awake and comfortable — most patients listen to music, watch something, or rest."
  },
  recoveryTimeline: {
    heading: "After your surgery in Delhi: recovery and results",
    description: "Because the wounds are tiny, surgical recovery is generally quick. Strenuous activity typically resumes around week 3.",
    leftHighlightCard: {
      icon: "Calendar",
      title: "Recovery Overview",
      description: "Surgical recovery timeline for hair transplant in Delhi.",
      statistics: [
        { value: "Days 1–3", label: "Mild soreness, sleep semi-upright" },
        { value: "Days 4–7", label: "Return to desk work" },
        { value: "Days 7–14", label: "Crusts flake off" },
        { value: "Weeks 3–6", label: "Normal shock shedding" },
        { value: "Months 12–18", label: "Final result" }
      ]
    },
    recoveryStages: [
      { time: "Days 1–3", label: "Immediate Recovery", desc: "Mild soreness, possible forehead swelling, small crusts forming. Sleep semi-upright." },
      { time: "Days 4–7", label: "Early Healing", desc: "Most people return to desk work. Gentle washing per instructions." },
      { time: "Days 7–14", label: "Crust Shedding", desc: "Crusts flake off; redness fades." },
      { time: "Weeks 3–6", label: "Shock Shedding Phase", desc: "Transplanted hairs fall out. Normal; the follicle stays and regrows." },
      { time: "Months 3–4", label: "New Growth Begins", desc: "New growth begins." },
      { time: "Months 6–9", label: "Noticeable Density", desc: "Noticeable density visible." },
      { time: "Months 12–18", label: "Final Result", desc: "Final full result achieved." }
    ]
  },
  surgicalRisks: {
    heading: "Surgical risks, and how a good Delhi clinic minimises them",
    description: "Every responsible clinic lists these transparently:",
    risks: [
      { riskTitle: "Temporary Side Effects", riskDescription: "Temporary swelling, numbness, redness, or minor folliculitis.", severity: "Temporary" },
      { riskTitle: "Infection or Bleeding", riskDescription: "Small risk of infection or bleeding (low with sterile technique and aftercare).", severity: "Low" },
      { riskTitle: "Shock Shedding", riskDescription: "Shock shedding before regrowth (temporary).", severity: "Temporary" },
      { riskTitle: "Variable Yield", riskDescription: "Results depend on biology, surgical skill, and aftercare.", severity: "Variable" },
      { riskTitle: "Continued Native Loss", riskDescription: "Continued native hair loss, which may need maintenance therapy or a future session.", severity: "Ongoing" },
      { riskTitle: "Technician-Led Risks", riskDescription: "Poor results from inexperienced or technician-led surgery — which is exactly why operator skill, design, and a sterile OT matter most.", severity: "Avoidable" }
    ],
    preventionPoints: [
      { title: "Doctor-Led Approach", description: "Extraction, channel creation, and implantation by a qualified doctor" },
      { title: "Sterile OT Facility", description: "Sterile operating theatre with clean-room standards" },
      { title: "Single-Use Instruments", description: "100% single-use surgical-grade instruments" },
      { title: "Careful Graft Handling", description: "Immediate preservation in HypoThermosol chilled solution" }
    ]
  },
  pricing: {
    heading: "Cost of hair transplant surgery in Delhi",
    description: "<p>Hair transplant surgery in Delhi is priced per graft, so your total depends mostly on how many grafts you need and the technique. At Ryan Clinic, your exact, all-inclusive price is confirmed after a free scalp analysis, starting from ₹40,000, with 0% EMI available.</p><p>A note worth keeping on the page: the cheapest surgery is rarely the best value — very low per-graft prices often signal high-volume, technician-led work where graft survival suffers.</p>",
    warningText: "The cheapest surgery is rarely the best value — very low per-graft prices often signal high-volume, technician-led work where graft survival suffers.",
    pricingFactors: [
      "Sapphire FUE: ₹40 – ₹80 per graft",
      "THI (Choi Pen): ₹60 – ₹100 per graft",
      "Minimum Session (1,000 grafts): Starting ₹40,000",
      "Mega Session (3,500+ grafts): Starting ₹1,40,000"
    ],
    notes: "All packages include: pre-op consultation, post-op medications, saline spray kit, cap, and 12-month follow-up.",
    pricingStats: [
      { value: "Starting ₹40,000", label: "Minimum Session" },
      { value: "0% EMI", label: "Payment Plans Available" },
      { value: "Per Graft", label: "Transparent Pricing" }
    ],
    ctaTextWhatsApp: { text: "Get Quote on WhatsApp", link: "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20need%20a%20price%20quote%20for%20hair%20transplant%20surgery%20in%20Delhi", external: true },
    ctaTextCall: { text: "Call for Pricing", link: "tel:+919217958539", external: false },
    ctaTextGuide: { text: "Download Cost Guide", link: "/cost/hair-transplant-cost-in-delhi", external: false }
  },
  doctors: {
    heading: "Our Delhi surgeons and credentials",
    description: "Lead surgeon & operating team credentials for Hair Transplant Surgery in Delhi:",
    topButtonText: "View All Doctors",
    doctors: [
      {
        name: "Dr. Pranendra Singh",
        role: "Lead Hair Transplant Surgeon",
        bio: "Dr. Pranendra Singh is a lead plastic & reconstructive surgeon specializing in Sapphire FUE & THI techniques with over 12 years of surgical experience in hair restoration. Registered with Delhi Medical Council (Reg No: DMC-68492).",
        exp: "12+ Years",
        procedures: "6,500+",
        survivalRate: "98.4%",
        rating: "4.9 ★",
        quals: [
          "MBBS, MS (General Surgery)",
          "MCh (Plastic & Reconstructive Surgery)",
          "Delhi Medical Council Registered (Reg No: DMC-68492)",
          "Member, International Society of Hair Restoration Surgery (ISHRS)"
        ],
        slug: "dr-pranendra-singh",
        image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223025/service-one_qccxft.webp",
        location: "Delhi Clinic (Pitampura)"
      }
    ]
  },
  patientResults: {
    heading: "Real surgical results in Delhi",
    description: "Consented before-and-afters with case details (grafts, technique, time elapsed) — real patients only.",
    cases: [
      {
        patientName: "Rahul M., Delhi",
        technique: "Sapphire FUE",
        graftCount: "2,800 grafts",
        recoveryTime: "12 months",
        description: "Norwood Grade IV patient with strong donor density. Achieved natural hairline and mid-scalp coverage in a single session.",
        beforeImage: { image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp", imageAlt: "Before hair transplant" },
        afterImage: { image: "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223123/service-one_jrbcub.webp", imageAlt: "After hair transplant" }
      }
    ]
  },
  visitClinic: {
    heading: "Visiting Ryan Clinic in Delhi",
    description: "Our Delhi centre is in Pitampura (North-West Delhi), convenient from across the city and NCR including Rohini, Shalimar Bagh, Ashok Vihar, Model Town, Punjabi Bagh, Paschim Vihar. Nearest Metro station: Pitampura Metro Station (Red Line).",
    address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
    contactPhone: "+91-9217958539",
    mapEmbedUrl: "https://maps.google.com/maps?q=CD+163+Block+CD+Pitampura+New+Delhi&output=embed",
    nearbyLocations: ["Rohini", "Shalimar Bagh", "Ashok Vihar", "Model Town", "Punjabi Bagh", "Paschim Vihar"],
    informationCards: [
      { icon: "MapPin", title: "Address", description: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034" },
      { icon: "Clock", title: "Clinic Hours", description: "Mon–Sat, 9:00 AM – 7:00 PM" },
      { icon: "Phone", title: "Contact", description: "+91-9217958539\ninfo@clinicryan.com" }
    ],
    buttonText: { text: "Get Directions", link: "https://maps.google.com", external: true }
  },
  faq: {
    heading: "Frequently asked questions – Hair Transplant Surgery in Delhi",
    description: "Frequently asked questions about hair transplant surgery in Delhi:",
    stats: [
      { value: "Same-Day", label: "Outpatient" },
      { value: "Local", label: "Anaesthesia" },
      { value: "12–18 Mo", label: "Final Result" }
    ],
    faqs: [
      { question: "Is hair transplant surgery safe?", answer: "For suitable candidates, it's a low-risk outpatient procedure when performed by qualified doctors in a sterile facility under local anaesthesia. Minor, temporary side effects can occur; serious complications are uncommon." },
      { question: "Is a hair transplant a major surgery?", answer: "No. It's a minor, minimally-invasive procedure done under local anaesthesia with no general anaesthesia and no hospital stay for a standard case. The wounds are tiny and heal quickly." },
      { question: "Does hair transplant surgery hurt?", answer: "The numbing injections sting briefly; after that the surgery is largely painless. You stay awake and comfortable throughout." },
      { question: "Will I be awake during the surgery?", answer: "Yes — it's done under local anaesthesia, so you're awake and comfortable. Most patients listen to music, watch something, or rest." },
      { question: "How long does the surgery take?", answer: "A few hours to a full day depending on the number of grafts. You're discharged the same day." },
      { question: "How long is recovery after the surgery?", answer: "Most people return to desk work in about 5–7 days. Crusts fall off by around day 10, shock shedding happens at 3–6 weeks, and final results show at 12–18 months." },
      { question: "Are the results of the surgery permanent?", answer: "The transplanted hair is generally permanent because the donor follicles resist DHT. Native hair can still thin, so some patients use maintenance therapy or a future session." },
      { question: "Will the surgery leave scars?", answer: "With FUE/THI there's no linear scar — only tiny dot marks that fade and hide under surrounding hair." },
      { question: "Who is a good candidate for hair transplant surgery?", answer: "Adults with stable, pattern-type loss, adequate donor density, and realistic expectations. A free scalp analysis confirms whether surgery suits you." },
      { question: "What makes the best hair transplant surgery in Delhi?", answer: "Doctor-led surgery, a technique matched to your case, a sterile OT, natural hairline design, real results and reviews, transparent pricing, and proper aftercare." },
      { question: "What are the risks of hair transplant surgery?", answer: "Mostly temporary: swelling, numbness, redness, minor folliculitis, and shock shedding. Small risks of infection or bleeding are kept low with sterile technique and aftercare." },
      { question: "Can women have hair transplant surgery?", answer: "Yes — suitable women with pattern thinning, a high hairline, or traction alopecia, with no-shave options. A careful diagnosis comes first." },
      { question: "How much does hair transplant surgery cost in Delhi?", answer: "It's priced per graft and depends mainly on graft count and technique. Ryan Clinic's pricing starts from ₹40,000, with 0% EMI; your exact price is confirmed after a free scalp analysis." },
      { question: "Do I need to shave my head for the surgery?", answer: "Not always — THI enables no-shave or partial-shave surgery. Your surgeon advises based on the area and graft count." },
      { question: "How do I book my surgery consultation?", answer: "Call or WhatsApp +91-9217958539, or use the booking form. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." }
    ],
    ctaButtonText: { text: "Book Consultation", link: "/book-consult", external: false }
  },
  whyChooseUs: {
    heading: "Why choose Ryan Clinic for hair transplant surgery in Delhi",
    description: "Honest note: we've avoided unverifiable absolutes. For a surgical/health page, defensible, transparent claims build more trust — and rank better — than hype.",
    points: [
      { title: "Doctor-Led at Every Step", description: "Extraction, channel creation, and implantation by a qualified doctor, never a technician." },
      { title: "Sapphire FUE & THI Techniques", description: "Sapphire FUE & THI with the Choi pen, matched to your case." },
      { title: "Sterile Operating Theatre", description: "Sterile operating theatre, single-use surgical-grade instruments." },
      { title: "Natural-First Hairline Design", description: "Natural-first hairline design for undetectable results." },
      { title: "Free Scalp Analysis & 0% EMI", description: "Free scalp analysis + transparent per-graft pricing, confirmed before you commit; 0% EMI available." },
      { title: "Follow-Up Through Growth Cycle", description: "Follow-up through your growth cycle, with WhatsApp support." },
      { title: "Centres in Major Cities", description: "Centres in Delhi, Mumbai, and Hyderabad with 10,000+ successful procedures." }
    ]
  }
};

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGO_URL);
  console.log("Connected!");

  const doc = await SurgeryPageModel.findOneAndUpdate(
    { slug: payload.slug },
    payload,
    { upsert: true, new: true }
  );

  console.log("Successfully updated Delhi Surgery Page in database!");
  console.log("ID:", doc._id);
  console.log("Page Name:", doc.pageName);
  console.log("Slug:", doc.slug);

  await mongoose.disconnect();
}

main().catch(console.error);
