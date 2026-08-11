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
      doctor = new Doctor({
        slug,
        pageName: "Best Hair Transplant Doctor in Delhi | Ryan Clinic",
        basicInfo: {
          doctorName: "Dr. Pranendra Singh",
          designation: "Lead Hair Transplant Surgeon",
          city: "Delhi",
          phoneNumber: "+919911111247",
          whatsappNumber: "+919217958539",
          clinicName: "Ryan Clinic",
          clinicAddress: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
          languages: ["English", "Hindi"],
          profileImage: { image: "/uploads/turkey-doctor.jpg", alt: "Dr. Pranendra Singh — Lead Hair Transplant Surgeon" },
        },
        status: "published",
      });
    }

    // Update Questions to Ask Section (Sole Source of Truth from MongoDB)
    doctor.questionsToAsk = {
      sectionLabel: "Questions to Ask",
      heading: "Questions to ask your hair transplant doctor in Delhi before booking",
      description: "The quality of a doctor's answers tells you almost everything.",
      questions: [
        {
          tag: "SURGICAL ROLE",
          question: "Will the doctor personally perform graft extraction and channel creation?",
          answer: "Uncredentialed technicians performing extraction risk permanent follicle damage and over-harvesting donor areas. Always demand written confirmation that your surgeon conducts all major surgical phases.",
          ryanStandard: "100% Doctor-Led: Dr. Pranendra Singh personally extracts and implants every graft.",
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
          ryanStandard: "Active registration details provided for verification upon consultation.",
          displayOrder: 3,
        },
        {
          tag: "TRANSPARENT PRICING",
          question: "Is the per-graft cost fixed with zero hidden post-op fees?",
          answer: "Ensure the estimate includes full anesthesia, sterile OT charges, post-op wash kits, and post-surgery medications without surprise extra billing.",
          ryanStandard: "Transparent written per-graft estimate with zero hidden extras and 0% EMI available.",
          displayOrder: 4,
        },
        {
          tag: "LONG-TERM CARE",
          question: "What is your post-operative review and growth monitoring protocol?",
          answer: "Hair transplant results mature over 12 to 14 months. Your clinic should offer structured follow-up checkups at months 1, 3, 6, and 12.",
          ryanStandard: "Full 18-month post-op follow-up care and progress tracking included free.",
          displayOrder: 5,
        },
      ],
    };

    // Update FAQ section subtitle
    if (!doctor.faq) doctor.faq = {};
    doctor.faq.description = "Everything you need to know about choosing, verifying and consulting a hair transplant doctor in Delhi.";

    // Update Item 06 in Great Doctor Qualities if present
    if (doctor.greatDoctorQualities?.cards?.length >= 6) {
      doctor.greatDoctorQualities.cards[5].title = "Stays Involved Through the Full Growth Cycle";
    }

    // Key Facts (Only verified fields; leave unverified as empty strings)
    doctor.keyFacts = {
      specialisation: "Sapphire FUE & Direct Implantation Hair Restoration",
      memberships: "Medical Council Registered",
      location: "Pitampura, New Delhi",
      consultation: "Free Scalp Analysis & Custom Hairline Design",
    };

    doctor.markModified("questionsToAsk");
    doctor.markModified("faq");
    doctor.markModified("greatDoctorQualities");
    doctor.markModified("keyFacts");

    await doctor.save();
    console.log(`Doctor document '${slug}' updated successfully!`);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding Doctor audit data:", err);
    process.exit(1);
  }
}

seedDoctorAuditData();
