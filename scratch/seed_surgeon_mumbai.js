/**
 * MUMBAI SURGEON PAGE — COMPLETE SEED SCRIPT
 * Seeds the MongoDB 'surgeons' collection with the complete
 * hair-transplant-surgeon-in-mumbai document.
 *
 * Run: node scratch/seed_surgeon_mumbai.js
 */
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (t && !t.startsWith('#') && t.includes('=')) {
      const idx = t.indexOf('=');
      const k = t.slice(0, idx).trim();
      const v = t.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      process.env[k] = v;
    }
  }
}

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

// ─── Mumbai Surgeon Document ─────────────────────────────────────────────────
const mumbaiDoc = {
  slug: 'hair-transplant-surgeon-in-mumbai',
  title: 'Best Hair Transplant Surgeon in Mumbai',

  // ── SEO ──────────────────────────────────────────────────────────────────
  seo: {
    metaTitle: 'Best Hair Transplant Surgeon in Mumbai | Ryan Clinic',
    metaDescription: 'Looking for the best hair transplant surgeon in Mumbai? Ryan Clinic\'s certified surgeon personally performs every FUE/DHI step with natural-hairline artistry. Book now.',
    keywords: [
      'hair transplant surgeon in Mumbai',
      'best hair transplant surgeon in Mumbai',
      'hair transplant surgeon Mumbai',
    ],
    canonical: 'https://www.clinicryan.com/surgeon/hair-transplant-surgeon-in-mumbai',
    ogTitle: 'Best Hair Transplant Surgeon in Mumbai — Doctor-Led FUE & DHI | Ryan Clinic',
    ogDescription: 'Ryan Clinic\'s certified hair transplant surgeon in Mumbai personally performs every surgical step. Doctor-led FUE & DHI, natural hairline artistry, 0% EMI.',
    ogImage: 'https://www.clinicryan.com/uploads/turkey-doctor.jpg',
    robots: 'index, follow',
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  settings: {
    status: 'published',
    featured: true,
    displayOrder: 2,
    showInSitemap: true,
    allowIndexing: true,
    isDeleted: false,
  },

  // ── General ───────────────────────────────────────────────────────────────
  general: {
    city: 'Mumbai',
    shortDescription: 'Meet Ryan Clinic\'s certified hair transplant surgeon in Mumbai. 100% doctor-led FUE & DHI procedures, natural hairline artistry, zero technician handover.',
    slugHistory: ['hair-transplant-surgeon-in-mumbai'],
  },

  // ── Hero Section ──────────────────────────────────────────────────────────
  hero: {
    badge: { text: 'Ryan Clinic · Surgical Leadership' },
    title: 'Best Hair Transplant Surgeon in Mumbai',
    description: 'Your result depends less on the clinic name or machine used, and more on the hands and artistic eye of your surgeon. At Ryan Clinic in Andheri West, your hair transplant is 100% surgeon-led from start to finish — never delegated to technicians.',
    featurePills: [
      '100% Doctor-Led',
      '15+ Years Experience',
      '5,000+ Procedures',
      'Turkey Sapphire FUE Certified',
    ],
    stats: [
      { value: '15+', label: 'Years Exp.' },
      { value: '5,000+', label: 'Surgeries' },
      { value: '95%+', label: 'Graft Survival' },
      { value: '4.9★', label: 'Google Rating' },
    ],
    doctorCard: {
      image: { url: '/uploads/turkey-doctor.jpg', alt: 'Dr. Pranendra Singh — Hair Transplant Surgeon in Mumbai' },
      doctorName: 'Dr. Pranendra Singh',
      qualification: 'MBBS (AIIMS) · MS (PGIMER) · Turkey FUE Certified',
      designation: 'Medical Director & Chief Surgeon',
      experience: '15+ Years Specialization',
    },
  },

  // ── H2 01 — Why Surgeon Skill Matters ─────────────────────────────────────
  whySkill: {
    badge: { text: 'SURGICAL IMPACT' },
    heading: 'Why a skilled hair transplant surgeon in Mumbai matters more than anything else',
    description: 'A hair transplant is a one-time redistribution of a finite donor supply. Done by a skilled doctor, it lasts a lifetime and looks completely natural. Done poorly, it wastes follicles you can never recover and leaves an unnatural result. That outcome is decided almost entirely by the hands performing the surgery — which is why choosing the right hair transplant surgeon in Mumbai is the decision that matters most.',
    highlightBox: {
      title: 'The Hands Behind the Blade Define the Outcome',
      description: 'No machine, blade, or clinic brand compensates for an absent or inexperienced surgeon. The hands performing the surgery determine graft viability, hairline aesthetics, and donor preservation for life.',
      icon: 'ShieldCheck',
    },
    cards: [
      {
        num: '01', title: 'Graft Survival',
        body: 'Careful, unhurried extraction, minimal handling, proper preservation in chilled solution, and precise depth at implantation protect follicle viability. Each step is a direct reflection of surgical skill.',
        image: '/uploads/turkey-doctor.jpg', gradient: 'from-[#D32F2F]/90 via-[#D32F2F]/50', showCta: true,
      },
      {
        num: '02', title: 'Hairline Artistry',
        body: 'The surgeon determines the shape, soft irregular front edge, single-hair placement, and natural growth angle matched to your facial proportions and age progression.',
        image: '/uploads/1752734248947-Hair Transplant 1.jpg', gradient: 'from-black/85 via-black/30',
      },
      {
        num: '03', title: 'Density & Coverage',
        body: 'A limited donor supply must be strategically distributed across bald and thinning areas to achieve maximum visual density without depleting future donor capacity.',
        image: '/uploads/about-one.jpg', gradient: 'from-[#D32F2F]/85 via-black/30',
      },
      {
        num: '04', title: 'Donor Management',
        body: 'Donor hair is finite and cannot be replaced. A skilled surgeon extracts strategically using 0.7–0.9mm punches, leaving the donor zone looking dense and unscarred.',
        image: '/uploads/service-two.jpg', gradient: 'from-black/85 via-black/30',
      },
      {
        num: '05', title: 'Patient Safety',
        body: 'Qualified surgical oversight, sterile operating protocols, careful patient screening, and proper medical management protect patient safety throughout.',
        image: '/uploads/gallery.jpg', gradient: 'from-black/85 via-black/30',
      },
    ],
  },

  // ── H2 02 — What Makes the Best Surgeon ───────────────────────────────────
  benefits: {
    badge: { text: 'SURGEON EXCELLENCE' },
    heading: 'What makes the best hair transplant surgeon in Mumbai',
    description: 'The best hair transplant surgeon in Mumbai combines verified medical credentials, dedicated hair restoration experience, aesthetic hairline design, and absolute hands-on involvement.',
    items: [
      {
        num: '01', title: 'Hands-On Mastery',
        text: 'Performs graft extraction, recipient channel creation, and graft placement personally — never handing surgical steps to technicians.',
      },
      {
        num: '02', title: 'Aesthetic Judgement',
        text: 'Designs a soft, age-appropriate hairline tailored to your unique facial geometry and future hair-loss pattern.',
      },
      {
        num: '03', title: 'Deep Focused Experience',
        text: 'Years of dedicated focus specifically in hair restoration surgery with thousands of completed procedures.',
      },
      {
        num: '04', title: 'Technical Range',
        text: 'Fluent in FUE, Sapphire FUE, and Turkish Technique Choi Pen (DHI) implantation — selecting the right technique for your scalp.',
      },
      {
        num: '05', title: 'Honesty & Patient Selection',
        text: 'Provides honest expectations on donor capacity, achievable density, and candidacy — recommending medical therapy when surgery is premature.',
      },
      {
        num: '06', title: 'A Real Portfolio of Results',
        text: 'Shares clear, unedited before-and-after portfolios of their own patients matching your Norwood stage and scalp type.',
      },
    ],
  },

  // ── H2 03 — Surgeon Role at Every Step ────────────────────────────────────
  surgeonRole: {
    badge: { text: 'SURGICAL TIMELINE' },
    heading: 'The hair transplant surgeon\'s role at every step in Mumbai',
    description: 'At Ryan Clinic, a qualified hair transplant surgeon is involved at every stage of your journey — not just for a brief consultation appearance.',
    steps: [
      {
        stepNumber: 1, num: '01', title: 'Consultation & Hairline Design',
        body: 'The surgeon personally examines donor density under digital trichoscopy, assesses hair loss progression, and drafts a custom, age-appropriate hairline matched to your facial symmetry.',
      },
      {
        stepNumber: 2, num: '02', title: 'Graft Extraction (FUE / Sapphire)',
        body: 'The surgeon personally extracts follicular units using precision micro-punches (0.7–0.9mm), controlling punch depth and angle to protect follicle roots and prevent donor over-harvesting.',
      },
      {
        stepNumber: 3, num: '03', title: 'Recipient-Site Creation',
        body: 'The surgeon opens microscopic channels using gemstone Sapphire blades, setting the precise angle, depth, and radial direction for every single graft to ensure natural growth direction.',
      },
      {
        stepNumber: 4, num: '04', title: 'Direct Implantation',
        body: 'The surgeon supervises and executes graft placement, positioning delicate single-hair grafts at the front edge and dense multi-hair units behind for maximum visual density.',
      },
      {
        stepNumber: 5, num: '05', title: '18-Month Follow-Up Support',
        body: 'The surgeon monitors your recovery, growth milestones, and hair maturation at months 1, 3, 6, 12, and 18 with dedicated follow-up care.',
      },
    ],
    bottomCTA: {
      title: 'Want a Doctor-Led Hair Transplant in Mumbai?',
      description: 'Speak directly with our lead surgeon for a free scalp analysis and personalized treatment plan.',
      button: { text: 'Book Free Consultation', link: 'https://wa.me/919217958539', variant: 'primary' },
    },
  },

  // ── H2 04 — Surgeon vs Technician ─────────────────────────────────────────
  comparison: {
    badge: { text: 'THE CRITICAL DIFFERENCE' },
    heading: 'Hair transplant surgeon vs technician in Mumbai: the difference that defines your result',
    description: 'This is the single most important thing to verify at any clinic in Mumbai. In many high-volume \'graft mills,\' technicians perform large parts of the surgery — leading to poor graft survival and unnatural hairlines.',
    surgeonCard: {
      badge: 'RYAN CLINIC (DOCTOR-LED)',
      title: 'Doctor-Led Precision',
      footer: '100% performed by certified hair transplant surgeons.',
      items: [
        'Consultation & Hairline Design: Surgeon personally assesses scalp and drafts custom hairline.',
        'Graft Extraction: Surgeon extracts using micro-punches with depth and angle control.',
        'Recipient-Site Creation: Surgeon opens Sapphire channels setting growth direction.',
        'Graft Implantation: Surgeon places micro-grafts for maximum density.',
        'Problem Solving & Safety: Surgeon manages medical decisions and sterile protocols.',
        'Follow-Up: Surgeon monitors healing through 18-month growth cycle.',
      ],
      button: { text: 'Book Doctor-Led Surgery', link: 'https://wa.me/919217958539', variant: 'primary' },
    },
    technicianCard: {
      badge: 'HIGH-VOLUME GRAFT MILLS',
      title: 'Technician-Led Assembly',
      footer: 'Rushed work by assistants leads to high graft failure.',
      items: [
        'Consultation: Often conducted by sales counselors or non-medical staff.',
        'Graft Extraction: Handed to technicians, risking transection and donor depletion.',
        'Recipient-Site Creation: Frequently delegated to inexperienced staff.',
        'Graft Implantation: Technicians implant quickly without angle precision.',
        'Problem Solving: Minimal medical oversight during the procedure.',
        'Follow-Up: Support often ends upon clinic discharge.',
      ],
      button: { text: 'Learn Why Doctor Matters', link: 'tel:+919217958539', variant: 'secondary' },
    },
  },

  // ── H2 05 — Experience & Specialization ───────────────────────────────────
  experienceSpecialization: {
    badge: { text: 'WHAT TO LOOK FOR' },
    heading: 'Experience and specialization to look for in a hair transplant surgeon in Mumbai',
    description: 'Educate yourself before booking. Look for verifiable markers of surgical skill, focused dedication, and technical mastery.',
    items: [
      {
        title: 'Years Focused on Hair Restoration',
        description: 'Hair transplantation is an artistic surgical discipline. Look for doctors who have dedicated years specifically to hair restoration rather than treating it as a side procedure.',
      },
      {
        title: 'Documented Case Volume',
        description: 'Review real surgical volume — thousands of completed cases indicate refined technique, quick graft handling, and consistent aesthetic outcomes.',
      },
      {
        title: 'Technique Fluency',
        description: 'A top surgeon is skilled in multiple modern techniques — Sapphire FUE, Turkish Choi Pen (DHI), and specialized hairline design — tailoring the approach to your scalp.',
      },
      {
        title: 'Verified Credentials & Council Registration',
        description: 'Confirm active registration with the Maharashtra Medical Council or Medical Council of India, alongside recognized fellowships or training.',
      },
      {
        title: 'Hairline Design Portfolio',
        description: 'Inspect before-and-after portfolios of real patients with hair loss patterns similar to your Norwood stage.',
      },
      {
        title: 'Revision & Repair Capability',
        description: 'Surgeons capable of repairing previous botched transplants demonstrate the highest level of surgical judgement and skill.',
      },
    ],
  },

  // ── H2 06 — Skill Evaluation ───────────────────────────────────────────────
  skillEvaluation: {
    badge: { text: 'SKILL ASSESSMENT' },
    heading: 'How to judge a hair transplant surgeon\'s skill in Mumbai before booking',
    description: 'Don\'t rely on promotional claims — use these five practical steps to evaluate a surgeon\'s skill objectively.',
    items: [
      {
        num: '1', title: 'Study Before-and-After Results',
        description: 'Examine unedited high-resolution photos of past patients, paying close attention to hairline irregularity, natural swirl, and donor area appearance.',
      },
      {
        num: '2', title: 'Confirm Surgeon\'s Personal Role',
        description: 'Ask directly whether the surgeon performs graft extraction and channel creation personally, or delegates them to technicians.',
      },
      {
        num: '3', title: 'Verify Case Volume & Experience',
        description: 'Ask how many years the surgeon has focused on hair transplantation and how many procedures they perform.',
      },
      {
        num: '4', title: 'Check Credentials & Medical Registration',
        description: 'Verify the doctor\'s full name, qualifications (e.g. MBBS, MS, Fellowship), and medical council registration number on the official register.',
      },
      {
        num: '5', title: 'Read Genuine Independent Reviews',
        description: 'Read verified patient reviews on Google and independent medical portals to judge patient care, transparency, and post-op support.',
      },
    ],
    footerNote: 'A confident, skilled hair transplant surgeon in Mumbai will happily share their portfolio and answer every question transparently. Evasiveness is your answer.',
  },

  // ── H2 07 — Lead Surgeon Spotlight ────────────────────────────────────────
  spotlightTitle: 'Meet the hair transplant surgeon at Ryan Clinic, Mumbai',
  leadSurgeon: {
    badge: { text: 'MEET OUR LEAD SURGEON' },
    heading: 'Meet the hair transplant surgeon at Ryan Clinic, Mumbai',
    description: 'Dr. Pranendra Singh is the Medical Director and Chief Surgeon at Ryan Clinic. Trained directly under Turkey\'s leading hair specialists in Istanbul, he brings 15+ years of dedicated surgical experience and over 5,000 successful procedures to every patient.',
    doctorName: 'Dr. Pranendra Singh',
    doctorImage: {
      url: '/uploads/turkey-doctor.jpg',
      alt: 'Dr. Pranendra Singh — Best Hair Transplant Surgeon in Mumbai',
    },
    qualifications: [
      { text: 'MBBS — All India Institute of Medical Sciences (AIIMS)' },
      { text: 'MS (General Surgery) — PGIMER, Chandigarh' },
      { text: 'Turkey FUE Fellowship — Istanbul Hair Restoration Centre' },
      { text: 'Member — International Society of Hair Restoration Surgery (ISHRS)' },
    ],
    stats: [
      { value: '15+', label: 'Years Exp.' },
      { value: '5,000+', label: 'Surgeries' },
      { value: '97%+', label: 'Success Rate' },
      { value: '4.9★', label: 'Google Rating' },
    ],
    buttons: [
      { text: 'Book Consultation', link: 'https://wa.me/919217958539', variant: 'primary' },
      { text: 'Call +91-9217958539', link: 'tel:+919217958539', variant: 'secondary' },
    ],
  },

  // ── H2 08 — Hairline Artistry ──────────────────────────────────────────────
  hairlineArtistry: {
    badge: { text: 'AESTHETIC DESIGN' },
    heading: 'The artistry of hairline design: what surgical skill looks like in Mumbai',
    description: 'Hairline design is where surgery meets art. A skilled surgeon crafts a soft, micro-irregular front edge that looks natural today and as you age.',
    image: { url: '/uploads/1752734248947-Hair Transplant 1.jpg', alt: 'Hairline Artistry Design — Ryan Clinic Mumbai' },
    items: [
      {
        title: 'Soft Micro-Irregular Front Edge',
        description: 'Natural hairlines are never straight or rule-drawn. The surgeon places delicate single-hair grafts in a soft, macro-irregular pattern.',
      },
      {
        title: 'Single-to-Multi Graft Gradient',
        description: 'Single hairs are placed at the very front row, transitioning into 2-hair and 3-hair grafts behind for natural visual density.',
      },
      {
        title: 'Facial Proportion Harmony',
        description: 'The hairline is mapped to match your forehead height, temporal angles, and facial bone structure.',
      },
      {
        title: 'Age-Appropriate Design',
        description: 'The surgeon plans for future hair loss progression so your hairline looks distinguished and natural at 30, 45, and 60.',
      },
      {
        title: 'Donor Area Conservation',
        description: 'Strategic graft extraction preserves donor density so the back of your scalp looks full and unscarred.',
      },
    ],
  },

  // ── H2 09 — Revision & Repair ─────────────────────────────────────────────
  revisionRepair: {
    badge: { text: 'CORRECTIVE SURGERY' },
    heading: 'Revision and repair work by a hair transplant surgeon in Mumbai',
    description: 'One of the clearest signs of an expert hair transplant surgeon in Mumbai is the ability to correct previous botched procedures from technician-led clinics — refining unnatural hairlines, adding density, or improving donor scar areas.',
    items: [
      {
        title: 'Plug Graft Extraction',
        description: 'Removing large, pluggy grafts placed by inexperienced hands and re-implanting them as soft single units.',
      },
      {
        title: 'Hairline Softening & Lowering',
        description: 'Re-establishing natural temporal peaks and soft transition zones over harsh, low artificial lines.',
      },
      {
        title: 'Donor Scar Camouflage',
        description: 'FUE harvesting and SMP repair to conceal over-harvesting or linear donor scars.',
      },
    ],
  },

  // ── H2 10 — Questions to Ask ──────────────────────────────────────────────
  bookingChecklist: {
    badge: { text: 'BEFORE YOU BOOK' },
    heading: 'Questions to ask a hair transplant surgeon in Mumbai before booking',
    description: 'Use these seven questions during your consultation. A transparent, skilled doctor will answer all of them clearly.',
    questionsHeading: 'Questions to ask a hair transplant surgeon in Mumbai before booking',
    redFlagsHeading: 'Red flags when choosing a hair transplant surgeon in Mumbai',
    questions: [
      {
        q: 'Will you personally perform my extraction and implantation, or will technicians?',
        ans: 'In many high-volume clinics, technicians extract and implant while doctors only drop in. Unskilled technician handling damages graft roots.',
        std: 'At Ryan Clinic, the surgeon personally performs extraction, site creation, and implantation.',
      },
      {
        q: 'How many hair transplant cases like mine have you done — can I see your own results?',
        ans: 'Generic stock photos mean nothing. You need to verify past cases matching your Norwood hair loss stage and scalp type.',
        std: 'We share clear, unedited before-and-after photo portfolios of the surgeon\'s own patients.',
      },
      {
        q: 'How long have you focused on hair restoration?',
        ans: 'Hair transplantation is an artistic surgical discipline requiring dedicated focus and technique refinement.',
        std: 'Our lead surgeon has 15+ years of dedicated hair restoration focus and 5,000+ completed procedures.',
      },
      {
        q: 'Which technique do you recommend for me, and why?',
        ans: 'Clinics that push one technique for everyone prioritize speed over your optimal outcome.',
        std: 'We evaluate your scalp and offer Sapphire FUE or Turkish Technique Choi Pen based on your graft density needs.',
      },
      {
        q: 'How will you design my hairline for a natural result now and in the future?',
        ans: 'A straight, low hairline looks fake as you age. The surgeon must plan for future natural hair recession.',
        std: 'We build a soft, multi-layered hairline gradient that suits your facial structure for life.',
      },
      {
        q: 'Am I a good candidate, or should I consider medical therapy first?',
        ans: 'Unethical clinics sell surgery to patients with active diffuse thinning or poor donor supply.',
        std: 'We conduct a thorough trichological scalp analysis first and recommend medical management if surgery is premature.',
      },
      {
        q: 'What\'s the total per-graft cost, and what does aftercare include?',
        ans: 'Hidden charges for anesthesia, post-op wash kits, or follow-ups create unpleasant surprises.',
        std: 'Transparent written per-graft pricing starting at ₹35/graft with 0% EMI and 18 months free follow-up.',
      },
    ],
    warningBox: {
      title: 'Red Flags to Watch For',
      description: 'Avoid clinics that refuse to name the surgeon, hide registration details, guarantee 100% survival, or pressure you to pay immediately.',
      icon: 'AlertTriangle',
    },
  },

  // ── H2 11 — Red Flags / Warning Signs ────────────────────────────────────
  warningSigns: {
    badge: { text: 'RED FLAGS' },
    heading: 'Red flags when choosing a hair transplant surgeon in Mumbai',
    description: 'Protect yourself from high-volume graft mills. These six red flags signal a clinic you should avoid.',
    cards: [
      {
        title: 'No Named, Credentialed Surgeon',
        description: 'If the clinic\'s website does not list the surgeon\'s full name, medical degree, and council registration number, walk away.',
      },
      {
        title: 'Vagueness About Surgeon Role',
        description: 'If staff cannot confirm whether the doctor or technicians perform extraction and implantation, technicians are doing the surgery.',
      },
      {
        title: 'No Real Patient Portfolio',
        description: 'Clinics relying on stock photos or generic results rather than the named doctor\'s own before-and-after cases.',
      },
      {
        title: 'Unverifiable Credentials',
        description: 'Exaggerated titles or degrees that cannot be verified on the Maharashtra Medical Council or MCI register.',
      },
      {
        title: 'Guaranteed Results & Pressure Tactics',
        description: 'No ethical surgeon guarantees 100% graft survival. High-pressure sales demands for immediate deposits are a warning sign.',
      },
      {
        title: 'Inconsistent Site & Ad Claims',
        description: 'Conflicting graft counts, pricing, or technique claims across ads, counselors, and website pages.',
      },
    ],
  },

  // ── H2 12 — Procedures ────────────────────────────────────────────────────
  procedures: {
    badge: { text: 'OUR PROCEDURES' },
    heading: 'Procedures performed by our hair transplant surgeon in Mumbai',
    description: 'Ryan Clinic\'s surgeons perform a comprehensive range of hair restoration procedures, tailored to your scalp condition and aesthetic goals.',
    cards: [
      {
        title: 'Sapphire FUE Hair Transplant',
        description: 'Follicular Unit Extraction performed with V-shaped gemstone Sapphire blades for minimal tissue trauma and high density.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
      {
        title: 'Turkish Technique Choi Pen (DHI)',
        description: 'Direct Hair Implantation using Choi implanter pens for maximum control over graft angle, direction, and depth.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
      {
        title: 'Beard & Moustache Restoration',
        description: 'Precision facial hair transplantation for patchy beards, moustache restoration, and scar coverage.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
      {
        title: 'Eyebrow Hair Transplant',
        description: 'Delicate single-hair transplantation to restore thin or sparse eyebrows with realistic growth direction.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
      {
        title: 'Female Hair Transplantation',
        description: 'Specialized non-shave and diffuse hair restoration for women experiencing hairline recession or thinning.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
      {
        title: 'PRP & Scalp Growth Therapy',
        description: 'Platelet-Rich Plasma therapy to strengthen existing hair, accelerate post-transplant recovery, and reduce hair shedding.',
        link: '/hair-fall',
      },
      {
        title: 'Medical Hair Loss Management',
        description: 'Evidence-based medical therapy (Finasteride, Minoxidil, peptides) recommended when surgery is premature or as post-op maintenance.',
        link: '/hair-fall',
      },
      {
        title: 'Revision & Corrective Surgery',
        description: 'Surgical repair for botched transplants, plug extraction, hairline refinement, and donor scar camouflage.',
        link: '/hair-transplant-surgery-in-mumbai',
      },
    ],
    relatedLinks: [
      { label: 'Hair Transplant Surgery in Mumbai', href: '/hair-transplant-surgery-in-mumbai' },
      { label: 'Hair Transplant Cost in Mumbai', href: '/cost/hair-transplant-cost-in-mumbai' },
      { label: 'PRP Treatment in Mumbai', href: '/prp-hair-loss-treatment-in-mumbai' },
    ],
  },

  // ── H2 13 — Cost & Consultation ────────────────────────────────────────────
  costConsultation: {
    badge: { text: 'PRICING & CONSULTATION' },
    heading: 'Cost of consulting a hair transplant surgeon in Mumbai',
    description: 'Consultation at Ryan Clinic includes a free scalp analysis — our surgeon assesses your donor density and provides an exact graft count and transparent per-graft cost in writing.',
    disclaimer: '* Exact per-graft pricing depends on graft count and technique selected at consultation. 0% EMI options available on 6 and 12-month plans.',
    items: [
      { label: 'Consultation & Scalp Analysis', value: 'FREE (₹0)' },
      { label: 'Sapphire FUE Package', value: 'From ₹35 / graft' },
      { label: 'Turkish Choi Pen (DHI)', value: 'From ₹40 / graft' },
    ],
  },

  // ── H2 14 — Visit Surgeon ─────────────────────────────────────────────────
  visitSurgeon: {
    badge: { text: 'VISIT OUR CLINIC' },
    heading: 'Visiting our hair transplant surgeon in Mumbai',
    description: 'Our Mumbai centre is located in Andheri West, convenient from Versova, Juhu, Lokhandwala, DN Nagar, and the Western Express Highway.',
    address: 'MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053',
    phone: '+91-9217958539',
    hours: 'Mon–Sat, 9:00 AM – 7:00 PM',
    metro: 'Versova Metro Station (Line 1, Orange Line)',
  },

  // ── H2 15 — Consultation CTA ───────────────────────────────────────────────
  consultationCTA: {
    badge: { text: 'BOOK CONSULTATION' },
    heading: 'Book a consultation with a hair transplant surgeon in Mumbai',
    description: 'Get a free scalp analysis, your exact graft count recommendation, and a transparent cost breakdown with no obligation.',
    image: { url: '/uploads/about-one.jpg', alt: 'Book consultation with hair transplant surgeon in Mumbai' },
    stats: [
      { value: 'FREE', label: 'Scalp Assessment' },
      { value: '0%', label: 'EMI Available' },
      { value: '100%', label: 'Doctor-Led' },
    ],
    buttons: [
      { text: 'WhatsApp Us', link: 'https://wa.me/919217958539', variant: 'primary' },
      { text: 'Call +91-9217958539', link: 'tel:+919217958539', variant: 'secondary' },
    ],
  },

  ctaSection: {
    heading: 'Book a consultation with a hair transplant surgeon in Mumbai',
    subtext: 'Get a free scalp analysis, your exact graft count, and a transparent cost breakdown — no obligation.',
    phone: '+91-9217958539',
  },

  // ── H2 16 — FAQ ───────────────────────────────────────────────────────────
  faq: {
    badge: { text: 'FREQUENTLY ASKED QUESTIONS' },
    heading: 'Hair transplant surgeon in Mumbai — frequently asked questions',
    description: 'Everything you need to know about choosing, verifying, and consulting a hair transplant surgeon in Mumbai.',
    faqs: [
      {
        question: 'How do I find the best hair transplant surgeon in Mumbai?',
        answer: 'Study the surgeon\'s own before-and-afters (especially hairlines and cases like yours), confirm the surgeon personally performs extraction and implantation, check years and case volume in hair restoration, verify credentials and medical council registration, and read genuine independent reviews.',
      },
      {
        question: 'What makes a great hair transplant surgeon?',
        answer: 'A combination of surgical precision and aesthetic judgement — clean extraction, natural hairline design, well-distributed density, and careful donor management — backed by focused experience and a verifiable portfolio of results.',
      },
      {
        question: 'What\'s the difference between a hair transplant surgeon and a technician?',
        answer: 'A qualified surgeon performs all skilled surgical steps — design, extraction, recipient-site creation, and implantation. In technician-heavy \'graft mills,\' assistants do much of this, which is a leading cause of poor graft survival and unnatural results. At Ryan Clinic, the surgeon performs every step.',
      },
      {
        question: 'How much experience should a hair transplant surgeon have?',
        answer: 'Look for documented years focused specifically on hair restoration and real case volume — and, most importantly, a portfolio of the surgeon\'s own results with patients similar to your Norwood stage.',
      },
      {
        question: 'Does the surgeon design my hairline?',
        answer: 'Yes — at Ryan Clinic the surgeon personally designs your hairline. Hairline design is the most artistic, result-defining part of the surgery and should never be left to a technician.',
      },
      {
        question: 'Why does surgical skill affect graft survival and how natural the result looks?',
        answer: 'Gentle, precise extraction protects follicle viability, and correct angle, depth, and density at implantation create natural growth. Both depend directly on the surgeon\'s skill; rushed, delegated work puts them at risk.',
      },
      {
        question: 'Should one surgeon perform the whole procedure?',
        answer: 'The surgeon should perform all skilled surgical steps. Consistent, hands-on involvement is what produces a natural, lasting result.',
      },
      {
        question: 'How can I judge a surgeon\'s skill before booking?',
        answer: 'Ask to see the surgeon\'s own before-and-afters — particularly hairlines — and cases similar to yours. A skilled hair transplant surgeon in Mumbai will gladly show their portfolio.',
      },
      {
        question: 'Who is the hair transplant surgeon at Ryan Clinic?',
        answer: 'Dr. Pranendra Singh is our lead surgeon, Medical Director, and Turkey-certified hair restoration specialist with 15+ years of experience and 5,000+ completed procedures.',
      },
      {
        question: 'Is a hair transplant surgeon the same as a dermatologist or plastic surgeon?',
        answer: 'A hair transplant surgeon may come from different medical backgrounds (dermatology, plastic surgery, general surgery). What matters most is genuine hair-restoration training, real surgical experience, and a portfolio that proves skill — not one specific specialty degree.',
      },
      {
        question: 'Can a skilled hair transplant surgeon repair a previous bad transplant?',
        answer: 'Often, yes. An experienced surgeon can refine an unnatural hairline, add density to thin areas, or camouflage donor scars. Revision work demands strong surgical judgement, so it\'s a good marker of skill.',
      },
      {
        question: 'How much does a hair transplant surgeon in Mumbai charge?',
        answer: 'It\'s priced per graft and depends on graft count and technique. At Ryan Clinic the surgeon provides an exact, transparent quote after a free scalp analysis, starting from ₹35 per graft, with 0% EMI.',
      },
      {
        question: 'Where can I meet the hair transplant surgeon in Mumbai?',
        answer: 'At our Andheri West centre (MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053), Mon–Sat, 9 AM–7 PM. Accessible via Versova Metro Station (Line 1, Orange Line).',
      },
      {
        question: 'How do I book a consultation with the surgeon?',
        answer: 'Call or WhatsApp +91-9217958539, or use our booking form. You\'ll get a scalp analysis, graft count, and cost breakdown with no obligation.',
      },
    ],
  },

  // ── Why Ryan Clinic (accordion items) ────────────────────────────────────
  whyClinic: {
    badge: { text: 'Why Choose Ryan Clinic' },
    heading: 'Why Choose Ryan Clinic for Your Hair Transplant in Mumbai?',
    description: 'Among the many options for a hair transplant surgeon in Mumbai, here\'s what makes Ryan Clinic the choice of thousands of patients.',
  },

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const existing = await db.collection('surgeons').findOne({ slug: 'hair-transplant-surgeon-in-mumbai' });
  if (existing) {
    const result = await db.collection('surgeons').replaceOne(
      { slug: 'hair-transplant-surgeon-in-mumbai' },
      { ...mumbaiDoc, _id: existing._id, updatedAt: new Date().toISOString() }
    );
    console.log('✅ Updated existing Mumbai surgeon doc. Modified:', result.modifiedCount);
  } else {
    const result = await db.collection('surgeons').insertOne(mumbaiDoc);
    console.log('✅ Inserted new Mumbai surgeon doc. ID:', result.insertedId.toString());
  }

  await mongoose.disconnect();
  console.log('✅ Done.');
}

main().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
