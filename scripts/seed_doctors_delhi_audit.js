import { DBConnection } from "../src/lib/db.js";
import Doctor from "../src/models/Doctors.js";

async function seedDoctorAuditData() {
  try {
    await DBConnection();
    console.log("Connected to MongoDB for Doctor audit seeding...");

    const slug = "hair-transplant-doctor-in-delhi";

    let doctor = await Doctor.findOne({ slug });

    if (!doctor) {
      console.log(`Doctor document for slug '${slug}' not found, creating new one...`);
      doctor = new Doctor({ slug });
    }

    const titleStr = "Hair Transplant Doctor in Delhi — Dr. Pranendra Singh, MCh (Plastic Surgery)";
    const canonicalStr = "https://www.clinicryan.com/doctors/hair-transplant-doctor-in-delhi";

    doctor.pageName = titleStr;
    doctor.status = "published";

    doctor.basicInfo = {
      doctorName: "Dr. Pranendra Singh",
      designation: "Medical Director & Chief Hair Transplant Surgeon",
      city: "Delhi",
      yearsExperience: 15,
      proceduresCount: 5000,
      successRate: "97%+",
      rating: 4.9,
      phoneNumber: "+91-9911111247",
      whatsappNumber: "+91-9217958539",
      email: "info@clinicryan.com",
      clinicName: "Ryan Skin & Hair Transplant Clinic",
      clinicAddress: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
      languages: ["English", "Hindi"],
      profileImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: "Dr. Pranendra Singh — Hair Transplant Doctor in Delhi",
      },
    };

    doctor.seo = {
      metaTitle: titleStr,
      metaDescription: "Looking for a hair transplant doctor in Delhi? Meet Dr. Pranendra Singh, MCh (Plastic Surgery). Doctor-led Sapphire FUE & THI hair restoration at Ryan Clinic.",
      keywords: "hair transplant doctor in Delhi, best hair transplant doctor in Delhi, Dr. Pranendra Singh hair transplant, hair transplant surgeon Delhi",
      canonicalUrl: canonicalStr,
      robots: "index, follow",
      openGraphImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: titleStr,
      },
      useGlobalSEO: false,
    };

    doctor.hero = {
      title: titleStr,
      description: "Dr. Pranendra Singh is a hair transplant surgeon in Delhi with over 15 years of experience in Sapphire FUE and THI hair restoration.",
      heroImage: {
        image: "/uploads/turkey-doctor.jpg",
        alt: titleStr,
      },
      breadcrumbs: [
        { label: "Home", url: "/" },
        { label: "Doctors", url: "/doctors" },
        { label: "Hair Transplant Doctor in Delhi", url: canonicalStr },
      ],
    };

    doctor.keyFacts = {
      qualifications: "MBBS, MS, MCh (Plastic Surgery), DMC-68492",
      registration: "DMC-68492",
      specialisation: "Sapphire FUE & Direct Implantation Hair Restoration",
      experience: "15+ Years",
      procedures: "5,000+ Surgeries",
      memberships: "Delhi Medical Council Registered",
      location: "Pitampura, New Delhi",
      consultation: "Free Scalp Analysis & Custom Hairline Design",
    };

    doctor.surgeonProfile = {
      sectionLabel: "Your Surgeon",
      heading: "Meet Dr. Pranendra Singh",
      about: "Dr. Pranendra Singh (MBBS, MS, MCh Plastic Surgery) is a leading plastic and cosmetic surgeon specializing in advanced hair restoration procedures including Sapphire FUE and Turkish Technique (THI). With over 15 years of clinical surgical experience, he personally conducts key surgical steps for every patient.",
      philosophy: "Hair restoration is a combination of surgical precision and artistic hairline design tailored to facial proportions.",
      achievements: [
        { title: "MCh (Plastic Surgery)", description: "Advanced specialization in cosmetic & reconstructive surgery." },
        { title: "Delhi Medical Council", description: "Active registration (DMC-68492) verifying credentials." },
        { title: "5,000+ Procedures", description: "Extensive hands-on case volume in hair restoration." },
      ],
      consultationIncludes: [
        { number: 1, title: "Free scalp analysis & hair density assessment" },
        { number: 2, title: "Exact graft count with personalized hairline design" },
        { number: 3, title: "Transparent per-graft pricing — no hidden charges" },
        { number: 4, title: "Full treatment roadmap & post-op protocol" },
      ],
    };

    doctor.questionsToAsk = {
      sectionLabel: "Questions to Ask",
      heading: "Questions to ask your hair transplant doctor in Delhi before booking",
      description: "The quality of a doctor's answers tells you almost everything.",
      questions: [
        {
          tag: "SURGICAL ROLE",
          question: "Will the doctor personally perform graft extraction and channel creation?",
          answer: "Uncredentialed technicians performing extraction risk permanent follicle damage and over-harvesting donor areas. Always demand written confirmation that your surgeon conducts all major surgical phases.",
          ryanStandard: "Doctor-led at every stage: Dr. Pranendra Singh personally conducts key extraction and channel creation steps.",
          displayOrder: 1,
        },
        {
          tag: "TECHNIQUE & PLANNING",
          question: "Which hair restoration technique is recommended for my hairline, and why?",
          answer: "A genuine surgeon customises the technique (Sapphire FUE vs Turkish Technique) according to graft density needs, hairline aesthetics, and donor hair caliber rather than pushing a one-size-fits-all package.",
          ryanStandard: "Customised Sapphire FUE & Turkish Technique combined protocols tailored to your face structure.",
          displayOrder: 2,
        },
        {
          tag: "CREDENTIAL VERIFICATION",
          question: "Can I verify your DMC / NMC state medical council registration number?",
          answer: "Qualified hair restoration surgeons readily provide their medical council registration details. Unverifiable registration is a major red flag.",
          ryanStandard: "Active registration details (DMC-68492) provided for verification upon consultation.",
          displayOrder: 3,
        },
        {
          tag: "TRANSPARENT PRICING",
          question: "Is the per-graft cost fixed with zero hidden post-op fees?",
          answer: "Ensure the estimate includes full anesthesia, sterile OT charges, post-op wash kits, and post-surgery medications without surprise extra billing.",
          ryanStandard: "Transparent written per-graft estimate with zero hidden extras.",
          displayOrder: 4,
        },
        {
          tag: "LONG-TERM CARE",
          question: "What is your post-operative review and growth monitoring protocol?",
          answer: "Hair transplant results mature over 12 to 14 months. Your clinic should offer structured follow-up checkups at months 1, 3, 6, and 12.",
          ryanStandard: "Full post-op follow-up care and progress tracking included.",
          displayOrder: 5,
        },
      ],
    };

    doctor.pricing = {
      sectionLabel: "Transparent Pricing",
      heading: "Cost of consulting a hair transplant doctor in Delhi",
      description: "Consultation at Ryan Clinic includes a free scalp analysis — your doctor assesses your case and provides an exact graft count and transparent cost estimate.",
      packages: [
        {
          key: "consultation",
          title: "Free Consultation",
          subtitle: "Scalp analysis & honest assessment",
          price: "₹0",
          features: [
            "Donor density & pattern analysis by Dr. Singh",
            "Exact graft count recommendation",
            "Technique suitability assessment",
            "Transparent per-graft cost breakdown",
          ],
          buttonText: "Book Free Consult",
          buttonLink: "",
          displayOrder: 1,
          isFeatured: false,
          priceNote: "No charge",
        },
        {
          key: "sapphire-fue",
          title: "Sapphire FUE",
          subtitle: "Most popular — natural, doctor-led result",
          price: "Estimate",
          features: [
            "Doctor performs key surgical steps",
            "Sapphire micro-blade extraction",
            "Custom hairline design",
            "Sterile OT suite",
            "Structured follow-up care",
          ],
          buttonText: "Get Exact Quote",
          buttonLink: "",
          displayOrder: 2,
          isFeatured: true,
          priceNote: "per graft rate confirmed in consult",
        },
        {
          key: "thi-technique",
          title: "THI Technique",
          subtitle: "Choi Pen implantation — highest precision",
          price: "Estimate",
          features: [
            "Original Turkish Choi Pen technique",
            "No-shave option available",
            "Maximum density in single session",
            "Doctor-performed key steps",
            "Structured aftercare included",
          ],
          buttonText: "Get Exact Quote",
          buttonLink: "",
          displayOrder: 3,
          isFeatured: false,
          priceNote: "per graft rate confirmed in consult",
        },
      ],
      disclaimer: "Prices are determined per-graft. Your exact cost depends on graft count determined at consultation. All estimates include anaesthesia, OT charges, post-op kit, and follow-up visits.",
    };

    doctor.faq = {
      sectionLabel: "FAQ",
      heading: "Frequently asked questions about hair transplant doctors in Delhi",
      description: "Everything you need to know about choosing, verifying and consulting a hair transplant doctor in Delhi.",
      faqs: [
        {
          question: "How do I choose the best hair transplant doctor in Delhi?",
          answer: "Verify that a qualified surgeon (e.g. MCh Plastic Surgery / MS) personally conducts key surgical steps, check their medical council registration (DMC), review unedited patient case results, and ensure transparent written per-graft pricing.",
        },
        {
          question: "What qualifications should a hair transplant surgeon have?",
          answer: "Look for recognized postgraduate surgical qualifications such as MS or MCh (Plastic Surgery), active state medical council registration (such as DMC in Delhi), and specialized training in Sapphire FUE and direct implantation techniques.",
        },
        {
          question: "Will the doctor perform my hair transplant personally?",
          answer: "At Ryan Clinic, Dr. Pranendra Singh personally conducts hairline design, donor graft extraction, and recipient site channel creation for every patient.",
        },
        {
          question: "How is the cost of hair transplant determined in Delhi?",
          answer: "Consultation at Ryan Clinic includes a free scalp analysis — Dr. Singh assesses your donor density, calculates exact graft requirements, and provides a transparent per-graft written cost estimate.",
        },
        {
          question: "Where can I meet the doctor in Delhi?",
          answer: "Dr. Pranendra Singh consults at Ryan Clinic located at CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034.",
        },
      ],
    };

    doctor.markModified("basicInfo");
    doctor.markModified("seo");
    doctor.markModified("hero");
    doctor.markModified("keyFacts");
    doctor.markModified("surgeonProfile");
    doctor.markModified("questionsToAsk");
    doctor.markModified("pricing");
    doctor.markModified("faq");

    await doctor.save();
    console.log(`Doctor document '${slug}' updated successfully with clean audit data!`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding Doctor audit data:", err);
    process.exit(1);
  }
}

seedDoctorAuditData();

