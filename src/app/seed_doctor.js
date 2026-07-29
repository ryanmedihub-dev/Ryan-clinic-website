import mongoose from "mongoose";

const MONGO_URL = "mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services";

const drHimanshuJawla = {
  pageName: "Dr. Himanshu Jawla - Senior Hair Transplant & Cosmetic Surgeon",
  slug: "dr-himanshu-jawla",
  status: "published",
  featured: true,
  displayOrder: 1,
  isActive: true,
  basicInfo: {
    doctorName: "Dr. Himanshu Jawla",
    designation: "Senior Hair Transplant & Aesthetic Surgeon",
    city: "New Delhi",
    yearsExperience: 14,
    proceduresCount: 4800,
    rating: 4.9,
    phoneNumber: "+91-9911111247",
    whatsappNumber: "+91-9911111247",
    email: "info@clinicryan.com",
    clinicName: "Ryan Skin & Hair Transplant Clinic",
    clinicAddress: "CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034",
    languages: ["English", "Hindi"],
    profileImage: { image: "/uploads/turkey-doctor.jpg", alt: "Dr. Himanshu Jawla - Hair Transplant Surgeon" },
  },
  seo: {
    metaTitle: "Best Hair Transplant Doctor in Delhi | Dr. Himanshu Jawla | Ryan Clinic",
    metaDescription: "Consult Dr. Himanshu Jawla, top Turkey-trained hair transplant surgeon in Delhi. 14+ years experience, 4800+ successful Sapphire FUE procedures at Ryan Clinic.",
    keywords: "hair transplant doctor delhi, dr himanshu jawla, sapphire fue surgeon india, best hair clinic pitampura",
    canonicalUrl: "https://www.clinicryan.com/doctors/dr-himanshu-jawla",
    robots: "index, follow",
    openGraphImage: { image: "/uploads/turkey-doctor.jpg", alt: "Dr. Himanshu Jawla - Ryan Clinic" },
    useGlobalSEO: false,
  },
  hero: {
    description: "100% Doctor-Led Sapphire FUE & Turkish Technique Hair Restoration performed personally by Dr. Himanshu Jawla with high-density natural hairline design.",
    heroImage: { image: "/uploads/turkey-doctor.jpg", alt: "Dr. Himanshu Jawla Hero" },
    breadcrumbs: [
      { title: "Home", url: "/" },
      { title: "Doctors", url: "/doctors" },
      { title: "Dr. Himanshu Jawla", url: "/doctors/dr-himanshu-jawla" },
    ],
    stats: [
      { value: "14+", suffix: "Years", label: "Clinical Experience" },
      { value: "4800+", suffix: "Cases", label: "Successful Surgeries" },
      { value: "99.1%", suffix: "Graft", label: "Survival Rate" },
    ],
    whatsappCTA: { text: "WhatsApp Dr. Jawla's Team", url: "https://wa.me/919911111247" },
    callCTA: { text: "Book Free Consultation", url: "tel:+919911111247" },
  },
  whyItMatters: {
    sectionLabel: "Why Doctor-Led Surgery Matters",
    heading: "Why Choose a Certified Surgeon Over Technicians?",
    description: "Hair transplantation requires delicate micro-surgical skill. At Ryan Clinic, Dr. Himanshu Jawla personally handles graft extraction, channel creation, and density planning.",
    secondaryDescription: "Technician-operated clinics often risk permanent donor depletion, unnatural hair angles, and low graft survival.",
    highlightBox: "100% Performed By Dr. Himanshu Jawla — Zero Technician Handover",
    image: { image: "/uploads/turkey-doctor.jpg", alt: "Doctor Led Hair Transplant" },
    floatingStats: [{ value: "100%", suffix: "Doctor", label: "Executed Procedures" }],
    bottomCard: { number: "01", icon: "ShieldCheck", title: "Sterile OT Environment", description: "All surgeries are conducted under strict surgical sterile protocols." },
    primaryCTA: { text: "Book Consultation", url: "#consultation" },
    secondaryCTA: { text: "View Surgery Steps", url: "#timeline" },
  },
  doctorStandards: {
    sectionLabel: "Excellence Standards",
    heading: "Dr. Jawla's 4 Standards of Surgical Precision",
    description: "Every follicle is treated with extreme care to maximize density and natural flow.",
    cards: [
      { number: "01", icon: "Award", title: "Micro-Punch Extraction", description: "Using ultra-fine 0.75mm punches to leave minimal donor micro-scarring." },
      { number: "02", icon: "CheckCircle", title: "Sapphire Blade Angulation", description: "Incisions matched precisely to your natural native hair growth direction." },
      { number: "03", icon: "Shield", title: "Feathered Anterior Hairline", description: "Single-graft placement at the hairline for soft, natural aesthetic transition." },
      { number: "04", icon: "HeartPulse", title: "Chilled Solution Storage", description: "Grafts preserved in specialized ATP & HypoThermosol solution during procedure." },
    ],
  },
  credentials: {
    sectionLabel: "Qualifications",
    heading: "Credentials & Training",
    description: "Verified medical degrees and advanced aesthetic surgery certifications.",
    tabs: [
      { title: "MBBS & Post Graduate Surgery", icon: "GraduationCap", description: "Registered medical doctor with extensive surgical training.", ctaText: "Verify Medical Registration", ctaLink: "https://www.nmc.org.in/" },
      { title: "Advanced FUE & Turkish Technique Fellowship", icon: "Award", description: "Specialized hands-on fellowship in Istanbul, Turkey for Sapphire micro-slit technique.", ctaText: "View Fellowship Info", ctaLink: "#" },
      { title: "Cosmetic & Hair Restoration Association", icon: "Globe", description: "Active participant in national and international hair restoration symposia.", ctaText: "Verify Credentials", ctaLink: "#" },
    ],
    bottomCTA: { badge: "Certified Hair Surgeon", heading: "Get Expert Hair Advice", description: "Consult Dr. Himanshu Jawla for a comprehensive scalp analysis.", buttonText: "Schedule Consultation", buttonLink: "#consultation" },
  },
  verification: {
    sectionLabel: "Verification Steps",
    heading: "How to Verify Your Doctor Before Booking",
    description: "4 essential checks to ensure a safe, legitimate hair restoration surgery.",
    steps: [
      { title: "Check Registration Number", description: "Verify active doctor license on the official Medical Council website." },
      { title: "Confirm Doctor-Led Slit Creation", description: "Ensure the surgeon personally designs and creates all graft recipient sites." },
      { title: "Inspect Real Patient Results", description: "Review unedited before & after photos of actual patients treated by the doctor." },
    ],
    checklist: [
      { title: "100% Doctor-Led Surgery", checked: true },
      { title: "Registered Medical Council Doctor", checked: true },
      { title: "Autoclaved Medical Instruments", checked: true },
    ],
    progressCard: { title: "Safety Protocol Rating", description: "Grade A+ Sterile Operating Standard" },
  },
  comparison: {
    sectionLabel: "Comparison Matrix",
    heading: "Dr. Jawla at Ryan Clinic vs Commercial Clinics",
    description: "Compare doctor-led care with technician-run commercial hair mills.",
    leftCard: { title: "Ryan Clinic (Dr. Himanshu Jawla)", badge: "Verified Doctor", image: { image: "/uploads/turkey-doctor.jpg", alt: "Doctor Led" } },
    rightCard: { title: "Commercial Technician Clinics", badge: "Uncertified Staff", image: { image: "/uploads/turkey-doctor.jpg", alt: "Technician Led" } },
    rows: [
      { parameter: "Scalp Assessment & Diagnosis", doctorValue: "Personally by Dr. Jawla", technicianValue: "Sales Rep / Assistant" },
      { parameter: "Hairline Design & Graft Count", doctorValue: "Customized by Dr. Jawla", technicianValue: "Generic Template" },
      { parameter: "Anaesthesia Administration", doctorValue: "Qualified Surgeon", technicianValue: "Technician" },
      { parameter: "Donor Graft Harvesting", doctorValue: "Micro-punches by Dr. Jawla", technicianValue: "Technician" },
      { parameter: "Recipient Channel Creation", doctorValue: "Personally by Dr. Jawla", technicianValue: "Technician" },
      { parameter: "Post-Op Follow-Up Care", doctorValue: "Direct Doctor Access", technicianValue: "Call Center Staff" },
    ],
  },
  surgeonProfile: {
    sectionLabel: "Surgeon Profile",
    heading: "About Dr. Himanshu Jawla",
    about: "Dr. Himanshu Jawla is a distinguished hair transplant and cosmetic surgeon with over 14 years of clinical experience. Specializing in Sapphire FUE and Turkish Technique hair restoration, Dr. Jawla has successfully performed over 4,800 hair restoration procedures for patients from India and abroad.",
    philosophy: "Hair restoration must balance surgical density with natural aesthetic harmony. Every hairline should be custom-designed to match the patient's facial geometry and age profile.",
    whyChooseDoctor: [
      { icon: "UserCheck", title: "Direct Doctor Care", description: "Consultation and procedure handled personally by Dr. Jawla." },
      { icon: "Sparkles", title: "Natural Lateral-Slit Technique", description: "Incisions made at exact natural hair growth angles." },
    ],
    achievements: [
      { title: "4,800+ Successful Surgeries", description: "Consistently delivering high graft retention rates." },
      { title: "Turkey-Trained Specialist", description: "Mastered European Sapphire FUE micro-slit protocols." },
    ],
    consultationIncludes: ["Digital Trichoscopy Scalp Analysis", "Donor Area Density Evaluation", "Personalized Graft Calculation", "Transparent Cost Estimate"],
    primaryCTA: { text: "Book Free Consultation", url: "#consultation" },
    secondaryCTA: { text: "Call Doctor Direct", url: "tel:+919911111247" },
  },
  surgeryTimeline: {
    sectionLabel: "Procedure Timeline",
    heading: "Your Surgery Day Breakdown",
    description: "What to expect on your hair transplant day at Ryan Clinic.",
    steps: [
      { stepNumber: "01", number: "1", badge: "08:30 AM", icon: "Clock", title: "Hairline Marking & Planning", description: "Dr. Jawla designs your hairline and agrees on the graft distribution plan.", image: { image: "", alt: "" } },
      { stepNumber: "02", number: "2", badge: "09:30 AM", icon: "Syringe", title: "Local Numbing", description: "Gentle local anesthesia to ensure a completely painless experience.", image: { image: "", alt: "" } },
      { stepNumber: "03", number: "3", badge: "10:30 AM", icon: "Scissors", title: "Follicular Unit Extraction", description: "Micro-punch extraction of healthy donor grafts.", image: { image: "", alt: "" } },
      { stepNumber: "04", number: "4", badge: "01:30 PM", icon: "Sparkles", title: "Sapphire Slits & Implantation", description: "Dr. Jawla creates recipient micro-channels and implants grafts.", image: { image: "", alt: "" } },
    ],
  },
  consultation: {
    sectionLabel: "Book Consultation",
    heading: "Schedule Your Hair Evaluation with Dr. Jawla",
    description: "Get an honest, expert assessment of your hair loss condition.",
    contactCards: [
      { icon: "Phone", title: "Direct Phone", value: "+91-9911111247", link: "tel:+919911111247" },
      { icon: "MessageSquare", title: "WhatsApp Direct", value: "+91-9911111247", link: "https://wa.me/919911111247" },
      { icon: "Mail", title: "Email Us", value: "info@clinicryan.com", link: "mailto:info@clinicryan.com" },
    ],
    form: { title: "Book Appointment with Dr. Jawla", services: ["Sapphire FUE Hair Transplant", "Turkish Technique Direct Implantation", "Beard Transplant", "PRP Hair Loss Therapy"], submitButtonText: "Book Appointment Now" },
  },
  questionsToAsk: {
    sectionLabel: "Questions to Ask",
    heading: "Key Questions to Ask Your Surgeon",
    description: "Questions every patient should ask before committing to hair surgery.",
    questions: [
      { question: "Will Dr. Himanshu Jawla perform the surgery personally?", answer: "Yes, Dr. Jawla personally performs graft extraction and channel creation for every single patient." },
      { question: "How do you protect the donor area from thinning?", answer: "We calculate the exact safe extraction density to ensure your donor area remains full and natural." },
    ],
    ctaCard: { badge: "Free Checklist", heading: "Patient Guide & Checklist", description: "Download our 10-point checklist before booking.", buttonText: "Get Free Advice", buttonLink: "tel:+919911111247" },
  },
  greatDoctorQualities: {
    sectionLabel: "Doctor Traits",
    heading: "Hallmarks of an Exceptional Hair Surgeon",
    description: "Why patients trust Dr. Himanshu Jawla.",
    cards: [
      { icon: "Sparkles", title: "Artistic Hairline Design", description: "Crafting natural temporal angles and irregular hair placement for seamless results." },
      { icon: "Shield", title: "Micro-Punch Accuracy", description: "Minimizing trauma to surrounding follicles during extraction." },
    ],
  },
  warningSigns: {
    sectionLabel: "Red Flags",
    heading: "Red Flags to Avoid in Hair Clinics",
    description: "Protect your scalp from uncertified commercial operations.",
    image: { image: "/uploads/turkey-doctor.jpg", alt: "Warning Signs" },
    cards: [
      { icon: "AlertTriangle", title: "Suspiciously Cheap Rates", description: "Often means technician-only execution with zero doctor involvement." },
      { icon: "XCircle", title: "Unrealistic Unlimited Graft Promises", description: "Over-harvesting destroys your donor area permanently." },
    ],
    bottomCTA: { badge: "Patient Protection", heading: "Ensure Your Surgery is Safe", description: "Choose a qualified surgeon for lifelong natural hair.", buttonText: "Talk to Dr. Jawla", buttonLink: "#consultation" },
  },
  surgicalProcess: {
    sectionLabel: "Surgical Process",
    heading: "5-Step Sapphire FUE Process",
    description: "How Dr. Jawla performs your hair transplant.",
    steps: [
      { number: "01", icon: "UserCheck", title: "Personal Consultation & Design", description: "Mapping recipient zones and hairline angles." },
      { number: "02", icon: "Syringe", title: "Targeted Local Anaesthesia", description: "Numbing the donor and recipient areas comfortably." },
      { number: "03", icon: "Scissors", title: "Micro-Punch Harvesting", description: "Extracting healthy single and multi-hair follicular units." },
      { number: "04", icon: "Sparkles", title: "Sapphire Micro-Slit Creation", description: "Creating dense, angled canals for graft insertion." },
      { number: "05", icon: "CheckCircle", title: "Graft Placement & Wash", description: "Carefully implanting grafts and providing post-op kit." },
    ],
  },
  pricing: {
    sectionLabel: "Pricing",
    heading: "Transparent All-Inclusive Packages",
    description: "No hidden costs. Full medical care and post-op package included.",
    packages: [
      { title: "Sapphire FUE Package", subtitle: "Most Popular", price: "₹45,000", features: ["Up to 2,500 Grafts", "100% Performed by Dr. Jawla", "Sapphire Blade Canals", "1 Free PRP Session", "Complete Post-Op Kit"], buttonText: "Choose Package", buttonLink: "#consultation" },
      { title: "High-Density Mega Session", subtitle: "Maximum Density", price: "₹75,000", features: ["Up to 4,000 Grafts", "100% Performed by Dr. Jawla", "HypoThermosol Graft Storage", "3 Free PRP Sessions", "Lifetime Care Guarantee"], buttonText: "Book Mega Session", buttonLink: "#consultation" },
    ],
    disclaimer: "*Final pricing determined after in-person or online graft assessment.",
  },
  visitClinic: {
    sectionLabel: "Visit Clinic",
    heading: "Visit Ryan Clinic in Delhi",
    description: "State-of-the-art clinic located in Pitampura, New Delhi.",
    clinicImage: { image: "/uploads/turkey-doctor.jpg", alt: "Ryan Clinic Building" },
    gallery: [{ image: "/uploads/turkey-doctor.jpg", alt: "Surgical OT Room" }],
    address: { clinicName: "Ryan Skin & Hair Transplant Clinic", address: "CD 163, Block CD, Dakshini Pitampura", city: "New Delhi", state: "Delhi", pincode: "110034" },
    timings: [
      { day: "Monday - Saturday", time: "10:00 AM - 7:00 PM" },
      { day: "Sunday", time: "By Appointment" },
    ],
    mapUrl: "https://maps.google.com",
    contact: { phone: "+91-9911111247", whatsapp: "+91-9911111247", email: "info@clinicryan.com" },
  },
  faq: {
    sectionLabel: "Frequently Asked Questions",
    heading: "Frequently Asked Questions",
    description: "Answers to common questions about hair restoration with Dr. Himanshu Jawla.",
    faqs: [
      {
        question: "Is the hair transplant procedure painful?",
        answer: "No, local anesthesia is administered before the surgery begins, ensuring you remain completely comfortable throughout the procedure.",
      },
      {
        question: "When will I see final results after surgery with Dr. Jawla?",
        answer: "Initial new growth begins at 3-4 months, noticeable density appears by 6 months, and full final results are achieved at 10-12 months.",
      },
    ],
  },
};

async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URL);
    const db = mongoose.connection.db;
    const doctorsCol = db.collection("doctors");

    await doctorsCol.updateOne(
      { slug: "dr-himanshu-jawla" },
      { $set: drHimanshuJawla },
      { upsert: true }
    );

    console.log("SUCCESSFULLY_SEEDED_HIMANSHU_JAWLA: Dr. Himanshu Jawla saved into MongoDB Atlas!");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
