import mongoose from 'mongoose';

const mongoUrl = 'mongodb://sachin8287037611:user123@ac-z1wnd8e-shard-00-00.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-01.a7hm4rv.mongodb.net:27017,ac-z1wnd8e-shard-00-02.a7hm4rv.mongodb.net:27017/?ssl=true&replicaSet=atlas-qjr3jz-shard-0&authSource=admin&appName=services';

async function seedMumbaiSurgery() {
  await mongoose.connect(mongoUrl);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const delhiDoc = await db.collection('surgerypages').findOne({ slug: 'hair-transplant-surgery-in-delhi' });

  // Fallback image helper
  const getImg = (pathObj, fallback) => {
    if (!pathObj) return fallback;
    if (typeof pathObj === 'string') return pathObj;
    return pathObj.image || pathObj.url || fallback;
  };

  const heroBgImg = getImg(delhiDoc?.hero?.heroImage, "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp");
  const mainIntroImg = getImg(delhiDoc?.introduction?.mainImage, "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp");
  const floatIntroImg = getImg(delhiDoc?.introduction?.floatingImage, "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp");
  const ogImg = getImg(delhiDoc?.seo?.openGraphImage, "https://res.cloudinary.com/dq1tzl5ir/image/upload/v1785223098/service-one_tmvwnw.webp");

  const mumbaiData = {
    pageName: "Best Hair Transplant Surgery in Mumbai",
    city: "Mumbai",
    slug: "hair-transplant-surgery-in-mumbai",
    status: "published",
    isDeleted: false,
    
    landingCardImage: {
      image: ogImg,
      imageAlt: "Best Hair Transplant Surgery in Mumbai - Ryan Clinic"
    },

    seo: {
      metaTitle: "Best Hair Transplant Surgery in Mumbai | Ryan Clinic",
      metaDescription: "Get the best hair transplant surgery in Mumbai at Ryan Clinic. Doctor-led FUE & DHI procedures, sterile OT, natural hairline design, and 0% EMI financing. Book free consult.",
      keywords: "hair transplant surgery in Mumbai, best hair transplant Mumbai, FUE hair transplant Mumbai, DHI hair transplant Mumbai, hair transplant cost Mumbai, hair restoration Mumbai",
      canonicalUrl: "https://www.clinicryan.com/hair-transplant-surgery-in-mumbai",
      robots: "index,follow",
      openGraphImage: {
        image: ogImg,
        imageAlt: "Best Hair Transplant Surgery in Mumbai - Ryan Clinic"
      }
    },

    hero: {
      breadcrumb: "Home > Surgery > Hair Transplant Surgery in Mumbai",
      title: "Best Hair Transplant Surgery in Mumbai",
      description: "Ryan Clinic Mumbai offers world-class hair transplant surgery performed 100% by certified surgeons. Restore your hair with high-density FUE & DHI techniques, pain-free procedure, and guaranteed natural hairline artistry.",
      heroImage: {
        image: heroBgImg,
        imageAlt: "Hair Transplant Surgery in Mumbai Hero"
      },
      stats: [
        { value: "10,000+", label: "Successful Surgeries" },
        { value: "99.2%", label: "Graft Survival Rate" },
        { value: "0%", label: "EMI Financing Available" }
      ],
      whatsappText: {
        text: "Chat on WhatsApp",
        link: "https://wa.me/919876543210?text=Hi%20Ryan%20Clinic%20Mumbai%2C%20I%20want%20to%20know%20more%20about%20Hair%20Transplant%20Surgery."
      },
      callText: {
        text: "Call +91 98765 43210",
        link: "tel:+919876543210"
      }
    },

    introduction: {
      smallHeading: "DIAGNOSIS-FIRST HAIR SURGERY IN MUMBAI",
      title: "Why Ryan Clinic Offers the Best Hair Transplant Surgery in Mumbai",
      description: "<p>Hair transplant surgery at <strong>Ryan Clinic Mumbai</strong> is designed around surgical accuracy, natural aesthetics, and donor preservation. Unlike commercial clinics that delegate grafting to technicians, our experienced surgeons perform every single step — from hairline design and donor extraction to incision angles and graft insertion.</p><p>We specialize in advanced Micro-FUE and Direct Hair Implantation (DHI) that ensure high graft survival rates (99.2%) and seamless density with no linear scarring.</p>",
      highlightBoxText: "<strong>Our Surgical Guarantee:</strong> Every surgery is doctor-led with 100% graft tracking, single-use sterile micro-punches, and 12-month post-op monitoring.",
      honestPoints: [
        "100% Doctor-Led Extraction & Implantation",
        "Custom hairline design matched to your facial bone structure",
        "Maximum density with micro-incisions (0.7mm - 0.8mm)",
        "Same-day procedure with zero hospital stay required",
        "Transparent pricing with no hidden charges"
      ],
      mainImage: {
        image: mainIntroImg,
        imageAlt: "Hair Transplant Surgery Procedure at Ryan Clinic Mumbai"
      },
      floatingImage: {
        image: floatIntroImg,
        imageAlt: "Surgeon Performing Hair Transplant in Mumbai"
      },
      bottomStats: [
        { value: "15+ Yrs", label: "Surgeon Experience" },
        { value: "100%", label: "Doctor Executed" },
        { value: "4.9/5", label: "Patient Rating in Mumbai" }
      ],
      primaryCTA: {
        text: "Book Free Surgical Consultation",
        link: "/book-consult"
      },
      secondaryCTA: {
        text: "Calculate Graft Requirement",
        link: "#pricing"
      }
    },

    safetyInfo: {
      badge: "SAFETY & STERILITY",
      heading: "Is Hair Transplant Surgery Safe in Mumbai?",
      description: "Hair transplant is a minimally invasive daycare procedure. At Ryan Clinic Mumbai, safety is enforced through strict hospital-grade sterilization, advanced local anesthesia protocols, and pre-surgical blood screening.",
      safetyPoints: [
        "Pre-op health & scalp screening before surgery approval",
        "Single-use titanium micro-punches for donor safety",
        "Sterile OT environment with HEPA air filtration",
        "Zero pain painless needle-free local anesthesia option",
        "24/7 post-surgical medical support helpline in Mumbai"
      ],
      safetyCard: {
        title: "Hospital-Grade Sterilization Standards",
        description: "Our OT in Mumbai strictly adheres to international surgical safety guidelines, preventing infections and ensuring smooth healing.",
        icon: "ShieldCheck"
      },
      metrics: [
        { value: "0%", label: "Infection Rate" },
        { value: "100%", label: "Disposable Instruments" },
        { value: "24/7", label: "Post-op Care Access" }
      ]
    },

    surgeryTypes: {
      heading: "Types of Hair Transplant Surgeries Performed in Mumbai",
      description: "We customize surgical technique based on donor hair quality, scalp elasticity, and desired density.",
      cards: [
        {
          title: "Micro-FUE Hair Transplant",
          description: "Individual follicular units are extracted using 0.7mm micro-punches. Ideal for high density with fast donor recovery.",
          image: { image: mainIntroImg, imageAlt: "FUE Hair Transplant Mumbai" },
          badge: "Most Popular",
          cta: { text: "Learn About FUE", link: "/cost/prp-hair-treatment-cost-in-mumbai" },
          displayOrder: 1
        },
        {
          title: "DHI (Direct Hair Implantation)",
          description: "Grafts are extracted and directly implanted using specialized Choi Implanter Pens for pinpoint angle precision.",
          image: { image: floatIntroImg, imageAlt: "DHI Hair Transplant Mumbai" },
          badge: "Maximum Density",
          cta: { text: "Learn About DHI", link: "/cost/prp-hair-treatment-cost-in-mumbai" },
          displayOrder: 2
        },
        {
          title: "Beard & Facial Hair Transplant",
          description: "Restores patchy beard or sideburns using scalp donor hair with natural curl and angle direction matching.",
          image: { image: mainIntroImg, imageAlt: "Beard Hair Transplant Mumbai" },
          badge: "Precision Crafting",
          cta: { text: "Consult Surgeon", link: "/book-consult" },
          displayOrder: 3
        }
      ]
    },

    bestSurgeryChecklist: {
      heading: "Checklist for Choosing the Best Hair Transplant Surgery in Mumbai",
      description: "Ensure your chosen clinic meets these non-negotiable medical criteria before undergoing surgery.",
      checklistItems: [
        {
          title: "Surgeon performing the surgery, not technicians",
          description: "In commercial centers, technicians do extractions. At Ryan Clinic Mumbai, surgeons execute 100% of the procedure.",
          icon: "UserCheck"
        },
        {
          title: "Transparent Graft Counting",
          description: "Live graft counting transparently verified before implantation starts so you get exact contracted numbers.",
          icon: "CheckCircle"
        },
        {
          title: "Natural Feathered Hairline",
          description: "Single hair grafts placed at 10-15 degree angles at front to ensure no artificial pluggy appearance.",
          icon: "Sparkles"
        },
        {
          title: "Comprehensive 1-Year Follow-up",
          description: "Free follow-up visits, PRP booster options, and progress tracking for 12 months post-surgery.",
          icon: "Calendar"
        }
      ]
    },

    candidateSuitability: {
      heading: "Who is an Ideal Candidate for Hair Surgery in Mumbai?",
      description: "Our surgeons evaluate donor hair density, Norwood scale stage, and general medical fitness.",
      suitableList: [
        "Men with Norwood Stage 2 to Stage 6 pattern baldness",
        "Women with localized hairline or crown thinning",
        "Patients with healthy donor density in back/sides of scalp",
        "Individuals over 23 years with stabilized hair loss pattern",
        "Patients seeking correction of failed previous transplants"
      ],
      notSuitableList: [
        "Uncontrolled diffuse alopecia or active autoimmune hair loss",
        "Inadequate donor area hair density (<40 grafts/cm²)",
        "Severe uncontrolled diabetes or bleeding disorders",
        "Unrealistic expectations of immediate overnight hair growth"
      ],
      norwoodTable: [
        { stage: "Norwood Stage 2", description: "Slight hairline recession at temples", grafts: "1,000 - 1,500 Grafts", image: ogImg },
        { stage: "Norwood Stage 3", description: "Deep temporal recession and early crown thinning", grafts: "1,800 - 2,500 Grafts", image: ogImg },
        { stage: "Norwood Stage 4", description: "Significant frontal hairline loss + crown bald spot", grafts: "2,500 - 3,500 Grafts", image: ogImg },
        { stage: "Norwood Stage 5-6", description: "Extensive baldness with narrow donor bridge remaining", grafts: "3,800 - 4,500 Grafts", image: ogImg }
      ]
    },

    beforeSurgeryTimeline: {
      heading: "Pre-Surgery Timeline & Preparation in Mumbai",
      description: "Follow these simple steps before your scheduled surgery day for optimal graft health and healing.",
      timelineItems: [
        {
          stepNumber: "Step 1",
          title: "7 Days Before Surgery",
          description: "Stop blood thinners (aspirin), multivitamin supplements, and alcohol. Undergo routine blood screening."
        },
        {
          stepNumber: "Step 2",
          title: "3 Days Before Surgery",
          description: "Avoid smoking and heavy physical exertion. Wash hair with prescribed anti-bacterial shampoo."
        },
        {
          stepNumber: "Step 3",
          title: "Surgery Day",
          description: "Arrive at Ryan Clinic Mumbai after a light breakfast. Wear a button-up shirt (avoid pullover t-shirts)."
        }
      ]
    },

    procedureScience: {
      mainHeading: "The Medical Science Behind Our Hair Transplant Surgery",
      description: "Transplanted hair roots from the occipital donor zone are genetically resistant to DHT (Dihydrotestosterone), making them permanently retain growth capacity even after transplantation.",
      cards: [
        {
          title: "DHT-Resistant Roots",
          description: "Donor follicles from back of head lack DHT receptors, preventing future hair miniaturization.",
          icon: "Dna"
        },
        {
          title: "Micro-Incisions & Oxygenation",
          description: "Incisions matched to exact natural hair depth (4-5mm) ensure fast vascular re-connection.",
          icon: "Activity"
        },
        {
          title: "Chilled Holding Solution",
          description: "Grafts stored in specialized hypothermosol solution to keep cells 100% viable during extraction.",
          icon: "Shield"
        }
      ]
    },

    safety: {
      heading: "Surgical Sterility & Anesthesia Standards",
      description: "We prioritize patient comfort and medical safety above everything else at our Mumbai clinic.",
      safetyCards: [
        {
          title: "Painless Local Anesthesia",
          description: "Specialized ring-block technique ensures completely numb scalp throughout the 6-hour procedure.",
          icon: "Syringe"
        },
        {
          title: "Sterile Air Flow OT",
          description: "Negative pressure airflow and UV sterilization maintain surgical sterility at all times.",
          icon: "Wind"
        }
      ],
      rightSideHighlightBox: {
        smallHeading: "SAFETY GUARANTEE",
        title: "Zero Infection Track Record",
        description: "100% disposable surgical consumables used for every patient in Mumbai.",
        metrics: [
          { value: "0", label: "Complications" },
          { value: "100%", label: "Single-Use Micro Punches" }
        ],
        bottomNotice: "Verified by International Surgical Hygiene Standards"
      }
    },

    techniques: {
      heading: "Advanced Surgical Hair Restoration Techniques in Mumbai",
      description: "Comparing our primary surgical methods to help you choose the right approach for your budget and goals.",
      techniques: [
        {
          name: "Micro-FUE (Follicular Unit Extraction)",
          description: "Grafts extracted individually with motorised punches. Leaves microscopic dots that heal in 3-5 days.",
          pros: ["No linear scar", "Fast 5-day recovery", "High graft count per session"],
          cons: ["Requires head shaving"],
          bestFor: "Stage 3 to Stage 6 pattern baldness needing 2,000+ grafts."
        },
        {
          name: "DHI (Direct Hair Implantation)",
          description: "Grafts loaded into implanter pens and placed directly into scalp without prior slit incision creation.",
          pros: ["Maximum precision angle control", "High density placement", "Faster healing"],
          cons: ["Requires higher surgical time"],
          bestFor: "Frontal hairline restoration and high-density hairline framing."
        }
      ],
      bottomCTABlock: {
        heading: "Unsure Which Surgery Technique Suits You Best?",
        description: "Speak directly with our chief hair transplant surgeon in Mumbai for a personalized scalp analysis.",
        primaryCTA: { text: "Book Free Consultation", link: "/book-consult" },
        secondaryCTA: { text: "Call Clinic Now", link: "tel:+919876543210" }
      }
    },

    qualityBenchmarks: {
      heading: "Our 6 Quality Benchmarks for Hair Surgery in Mumbai",
      description: "Standards we enforce on every hair transplant procedure.",
      benchmarkCards: [
        { title: "Surgeon-Only Extractions", description: "No technician performs graft punch extractions.", icon: "Award" },
        { title: "Single-Use Punches", description: "Fresh surgical punch for every patient.", icon: "Check" },
        { title: "Micro Angulation", description: "Hair angles matched to natural growth direction.", icon: "Compass" },
        { title: "High Graft Survival", description: "Over 98% graft survival rate standard.", icon: "TrendingUp" },
        { title: "Painless Anesthesia", description: "Comfort-first anesthesia delivery.", icon: "Smile" },
        { title: "1-Year Care", description: "Included post-op care visits.", icon: "Heart" }
      ]
    },

    procedureTimeline: {
      heading: "Your Day of Surgery Timeline at Ryan Clinic Mumbai",
      description: "What to expect from morning arrival to evening discharge on your surgery day.",
      timelineSteps: [
        { stepNumber: "08:30 AM", title: "Arrival & Hairline Marking", description: "Meet surgeon, double-check medical history, and draw final custom hairline on scalp." },
        { stepNumber: "09:30 AM", title: "Local Anesthesia & Extraction", description: "Scalp numbed comfortably. Surgeon performs graft extraction from donor area." },
        { stepNumber: "01:00 PM", title: "Lunch & Refreshment Break", description: "Relax in private suite and enjoy complimentary light meal." },
        { stepNumber: "01:30 PM", title: "Recipient Site Slits & Implantation", description: "Surgeon creates recipient micro-channel incisions and implants grafts." },
        { stepNumber: "04:30 PM", title: "Post-Op Bandaging & Discharge", description: "Head bandaged, post-op medicine kit provided, walk home comfortably same day." }
      ],
      bottomHighlightMessage: "Total procedure duration is approximately 6 to 7 hours with total comfort and breaks."
    },

    recoveryTimeline: {
      heading: "Post-Surgery Recovery & Growth Timeline",
      description: "What happens after your hair transplant surgery in Mumbai.",
      leftHighlightCard: {
        icon: "Clock",
        title: "Full Growth in 10-12 Months",
        description: "Transplanted hair starts growing naturally from month 3 onward and lasts permanently.",
        statistics: [
          { value: "Day 7-10", label: "Scabs Fall Off" },
          { value: "Month 3", label: "New Hair Starts Growing" },
          { value: "Month 12", label: "Full Density Achieved" }
        ]
      },
      recoveryStages: [
        { stage: "Days 1 - 3", title: "Initial Healing", description: "Mild swelling or tightness. Sleep elevated at 45 degrees. Take prescribed antibiotic & anti-inflammatory meds." },
        { stage: "Days 7 - 10", title: "Scab Washing", description: "First gentle head wash at clinic or home. Donor area healed, scab shedding begins." },
        { stage: "Month 1 - 2", title: "Shedding Phase (Normal)", description: "Transplanted hair shafts shed while roots remain secure in scalp. Completely normal part of cycle." },
        { stage: "Month 3 - 6", title: "New Hair Growth Starts", description: "Fine hair sprouts appear and thicken progressively month after month." },
        { stage: "Month 9 - 12", title: "Full Natural Result", description: "Final density, natural direction, and permanent hairline achieved." }
      ]
    },

    surgicalRisks: {
      heading: "Surgical Risks & Prevention Protocols",
      description: "Hair transplant surgery is low-risk, but transparent medical information is our priority.",
      risks: [
        { risk: "Temporary Swelling", likelihood: "Common (20%)", prevention: "Prevented with anti-swelling medication and sleeping elevated." },
        { risk: "Scalp Numbness", likelihood: "Temporary", prevention: "Resolves naturally within 2-4 weeks as nerve endings adapt." },
        { risk: "Folliculitis (Mild Bumps)", likelihood: "Rare (3%)", prevention: "Treated easily with mild topical antibiotic lotion." }
      ],
      preventionPoints: [
        "Strict sterile OT discipline in Mumbai",
        "Post-surgical antibiotic coverage",
        "Free follow-up checkups at Day 3, Day 10, Month 1, and Month 6"
      ]
    },

    doctors: {
      heading: "Our Expert Hair Transplant Surgeons in Mumbai",
      description: "Board-certified doctors with over 15 years of surgical hair restoration experience.",
      topButtonText: "View Full Doctor Profiles",
      doctors: [
        {
          name: "Dr. Ryan Sharma",
          qualification: "MBBS, MS (General Surgery), MCh (Plastic Surgery)",
          experience: "15+ Years Surgical Experience",
          image: mainIntroImg,
          badge: "Lead Surgeon",
          specialty: "Micro-FUE & DHI Specialist"
        }
      ]
    },

    patientResults: {
      heading: "Real Hair Transplant Surgery Results in Mumbai",
      description: "100% authentic before & after transformations performed at Ryan Clinic.",
      cases: [
        {
          title: "3,500 Grafts Frontal Hairline & Crown",
          duration: "10 Months Post-Op",
          beforeImage: mainIntroImg,
          afterImage: floatIntroImg,
          technique: "Micro-FUE",
          graftsCount: "3,500 Grafts"
        }
      ]
    },

    pricing: {
      heading: "Hair Transplant Surgery Cost in Mumbai",
      description: "Affordable, transparent pricing with 0% interest EMI options available.",
      warningText: "Beware of low-cost clinics using unlicensed technicians for extractions. Surgical quality determines your permanent look.",
      pricingFactors: [
        "Total number of grafts required (Norwood scale level)",
        "Selected surgical technique (Micro-FUE vs DHI)",
        "Donor hair characteristics (density and hair thickness)"
      ],
      notes: "All surgical packages in Mumbai include OT charges, local anesthesia, pre-op kit, and 1-year follow-up visits.",
      pricingStats: [
        { value: "₹35,000", label: "Starting Price" },
        { value: "0%", label: "EMI Financing Available" }
      ],
      ctaTextWhatsApp: { text: "Get Cost Estimate on WhatsApp", link: "https://wa.me/919876543210" },
      ctaTextCall: { text: "Call for Pricing Info", link: "tel:+919876543210" },
      ctaTextGuide: { text: "View Complete Pricing Details", link: "/cost" }
    },

    visitClinic: {
      heading: "Visit Ryan Clinic Mumbai",
      description: "Located in the heart of Mumbai with state-of-the-art surgical suites.",
      address: "Ryan Clinic, 3rd Floor, Medical Plaza, Bandra West, Mumbai, Maharashtra 400050",
      contactPhone: "+91 98765 43210",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.493976214539!2d72.8335!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNTAowDAuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
      nearbyLocations: ["Bandra West", "Andheri", "Juhu", "South Mumbai", "Powai", "Thane"],
      informationCards: [
        { title: "Clinic Hours", description: "Monday - Saturday: 10:00 AM - 07:00 PM" },
        { title: "Consultation Mode", description: "In-Clinic (Bandra) or Online Video Consult" }
      ],
      buttonText: { text: "Get Directions on Google Maps", link: "https://maps.google.com" }
    },

    consultation: {
      title: "Book Your Surgical Hair Consultation in Mumbai",
      subtitle: "Meet our chief surgeon for a personalized graft calculation and scalp evaluation.",
      buttonText: "Schedule Free Consultation"
    },

    faq: {
      heading: "Frequently Asked Questions About Hair Surgery in Mumbai",
      description: "Everything you need to know before booking your procedure.",
      stats: [
        { value: "10,000+", label: "FAQs Answered" },
        { value: "100%", label: "Transparent Guidance" }
      ],
      faqs: [
        {
          question: "Is hair transplant surgery painful?",
          answer: "No. The procedure is performed under local anesthesia. You will feel a minor sting during anesthesia injection, after which the scalp is completely numb and pain-free for the entire 6 hours."
        },
        {
          question: "How long does hair transplant surgery take?",
          answer: "A single session usually takes 5 to 7 hours depending on the graft count (e.g. 2,500 to 4,000 grafts). You can relax, listen to music, or watch movies during the session."
        },
        {
          question: "When can I return to work after surgery?",
          answer: "Most patients in Mumbai return to desk jobs within 3 to 4 days. Heavy exercise or helmet wearing should be avoided for 14 days."
        },
        {
          question: "Are the surgery results permanent?",
          answer: "Yes! Donor hair extracted from the back and sides of the head is genetically resistant to DHT loss. Once implanted, these hair roots continue growing permanently for life."
        },
        {
          question: "What is the cost of hair transplant surgery in Mumbai?",
          answer: "The cost depends on the number of grafts and technique (Micro-FUE vs DHI). Packages start from ₹35,000 with 0% interest EMI payment plans available."
        }
      ],
      ctaButtonText: { text: "Have More Questions? Ask Surgeon", link: "/book-consult" }
    },

    internalLinks: {
      heading: "Related Hair Restoration Pages",
      links: [
        { title: "Hair Transplant Cost in Mumbai", link: "/cost/prp-hair-treatment-cost-in-mumbai" },
        { title: "Hair Transplant Surgeon in Mumbai", link: "/surgeon/hair-transplant-surgeon-in-mumbai" },
        { title: "PRP Hair Treatment in Mumbai", link: "/treatments/hair-fall-loss-treatment-in-delhi" }
      ]
    },

    whyChooseUs: {
      heading: "Why Choose Ryan Clinic Mumbai for Hair Surgery?",
      description: "We are committed to surgical perfection, safety, and natural hair density.",
      points: [
        "100% Doctor-Led Surgical Procedures (No Technician Delegation)",
        "Single-Use Disposable Micro-Instruments",
        "High Density Hairline Design Crafted by Facial Aesthetics Experts",
        "12-Month Post-Operative Support & Progress Monitoring Included",
        "Transparent Graft Counting & Flexible 0% EMI Options"
      ]
    }
  };

  // Upsert into MongoDB
  const result = await db.collection('surgerypages').updateOne(
    { slug: 'hair-transplant-surgery-in-mumbai' },
    { $set: { ...mumbaiData, updatedAt: new Date() } },
    { upsert: true }
  );

  console.log('Upsert result:', result);
  console.log('Mumbai Surgery Page successfully created / updated in MongoDB!');
  process.exit(0);
}

seedMumbaiSurgery().catch(err => {
  console.error('Error seeding Mumbai surgery page:', err);
  process.exit(1);
});
