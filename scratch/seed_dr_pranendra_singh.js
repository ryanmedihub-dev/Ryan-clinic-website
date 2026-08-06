/**
 * Seed script: Create Dr. Pranendra Singh doctor page
 * Slug: hair-transplant-doctor-in-delhi
 * Target URL: /doctors/hair-transplant-doctor-in-delhi
 */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    for (const line of envConfig.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
            const [key, ...vals] = trimmed.split("=");
            process.env[key.trim()] = vals.join("=").replace(/^["']|["']$/g, "").trim();
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;

// ─── Doctor Document ─────────────────────────────────────────────────────────

const doctorData = {
    slug: "hair-transplant-doctor-in-delhi",
    pageName: "Hair Transplant Doctor in Delhi",
    status: "published",
    isActive: true,
    deletedAt: null,
    schemaVersion: 1,
    displayOrder: 1,
    featured: true,

    /* ── 1. Basic Info ── */
    basicInfo: {
        doctorName: "Dr. Pranendra Singh",
        designation: "Medical Director & Chief Hair Transplant Surgeon",
        city: "Delhi",
        yearsExperience: 15,
        proceduresCount: 5000,
        successRate: "97%+",
        rating: 4.9,
        phoneNumber: "+91-9217958539",
        whatsappNumber: "+91-9217958539",
        email: "info@clinicryan.com",
        clinicName: "Ryan Skin & Hair Transplant Clinic",
        clinicAddress: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
        languages: ["Hindi", "English", "Punjabi"],
        profileImage: {
            image: "/uploads/turkey-doctor.jpg",
            alt: "Dr. Pranendra Singh — Hair Transplant Doctor in Delhi"
        }
    },

    /* ── 2. SEO ── */
    seo: {
        metaTitle: "Best Hair Transplant Doctor in Delhi | Ryan Clinic",
        metaDescription: "Looking for the best hair transplant doctor in Delhi? Meet Ryan Clinic's certified surgeons who perform every step of your FUE/THI personally. Book a free consult.",
        keywords: "hair transplant doctor in Delhi, best hair transplant doctor in Delhi, hair transplant surgeon Delhi, FUE doctor Delhi, Sapphire FUE doctor Delhi",
        canonicalUrl: "https://www.clinicryan.com/hair-transplant-doctor-in-delhi",
        robots: "index, follow",
        openGraphImage: {
            image: "/uploads/turkey-doctor.jpg",
            alt: "Best Hair Transplant Doctor in Delhi — Ryan Clinic"
        }
    },

    /* ── 3. Hero ── */
    hero: {
        title: "Best Hair Transplant Doctor in Delhi",
        description: "The most important decision in a hair transplant isn't the clinic's brand or even the technique — it's the doctor who actually performs the surgery. At Ryan Clinic in Pitampura, Dr. Pranendra Singh personally handles every step — extraction, recipient-site creation, and implantation — never delegated to technicians. Book a free scalp analysis today.",
        heroImage: {
            image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
            alt: "Dr. Pranendra Singh — Best Hair Transplant Doctor in Delhi"
        },
        breadcrumbs: [
            { label: "Home", url: "/" },
            { label: "Doctors", url: "/doctors" },
            { label: "Hair Transplant Doctor in Delhi", url: "/doctors/hair-transplant-doctor-in-delhi" }
        ],
        whatsappCTA: {
            text: "WhatsApp Us",
            url: "https://wa.me/919217958539",
            type: "whatsapp"
        },
        callCTA: {
            text: "Call +91-9217958539",
            url: "tel:+919217958539",
            type: "call"
        },
        stats: [
            { value: "15+", label: "Years Experience" },
            { value: "5,000+", label: "Procedures Done" },
            { value: "97%+", label: "Success Rate" },
            { value: "4.9★", label: "Google Rating" }
        ]
    },

    /* ── 4. Why It Matters ── */
    whyItMatters: {
        sectionLabel: "Why Your Doctor Matters",
        heading: "Why your hair transplant doctor in Delhi matters more than anything else",
        description: "A hair transplant is a one-time redistribution of a limited donor supply. Done by a skilled doctor, it lasts a lifetime and looks completely natural. Done poorly, it wastes follicles you can never recover and can leave an unnatural result.",
        secondaryDescription: "That outcome is decided almost entirely by the hands performing the surgery — which is why choosing the right hair transplant doctor in Delhi is the decision that matters most. A great surgeon influences graft survival, natural hairline design, candidacy judgement, and surgical safety. No technique, blade, or brand name compensates for an inexperienced or absent surgeon.",
        highlightBox: "No technique, blade, or brand name compensates for an inexperienced or absent surgeon. The doctor is the procedure.",
        image: {
            image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
            alt: "Doctor-led hair transplant at Ryan Clinic, Delhi"
        },
        floatingStats: [
            { value: "5,000+", label: "Procedures by Dr. Singh" },
            { value: "Doctor-led", label: "Every surgical step" }
        ],
        primaryCTA: { text: "Book Free Consultation", url: "tel:+919217958539" },
        secondaryCTA: { text: "WhatsApp Us", url: "https://wa.me/919217958539" }
    },

    /* ── 5. Doctor Standards ── */
    doctorStandards: {
        sectionLabel: "What Makes a Great Doctor",
        heading: "What makes a good hair transplant doctor in Delhi?",
        description: "The best hair transplant doctor in Delhi combines verified qualifications, real surgical experience, an aesthetic eye, and absolute hands-on involvement.",
        cards: [
            {
                title: "Proper medical qualifications and registration",
                description: "Verifiable credentials — MBBS and relevant postgraduate training or fellowship, with a medical-council registration number you can check."
            },
            {
                title: "Real, focused experience in hair restoration",
                description: "Years in practice and case volume specifically in hair transplantation, with cases similar to yours."
            },
            {
                title: "An aesthetic eye",
                description: "Hairline design is as much art as surgery — the best doctors understand facial proportions, natural growth patterns, and age-appropriate design."
            },
            {
                title: "Hands-on involvement",
                description: "The doctor performs the surgery personally, including extraction and implantation — not just a brief appearance at consultation."
            },
            {
                title: "Honesty about candidacy and expectations",
                description: "A willingness to tell you the truth about expectations, maintenance, and candidacy — including saying no when surgery isn't right for you."
            },
            {
                title: "A real portfolio of results",
                description: "Before-and-afters of their own patients (not stock photos), plus genuine verified reviews from real cases."
            }
        ]
    },

    /* ── 6. Credentials ── */
    credentials: {
        sectionLabel: "Credentials to Look For",
        heading: "Credentials to look for in a hair transplant doctor in Delhi",
        description: "A qualified hair transplant doctor in Delhi should have verifiable medical qualifications, registration, and specific hair-transplant training.",
        tabs: [
            {
                title: "Medical Degree",
                content: "A recognised medical degree (MBBS) and relevant postgraduate training or fellowship in dermatology, plastic/cosmetic surgery, or dedicated hair-transplant training."
            },
            {
                title: "Council Registration",
                content: "Active registration with the Delhi Medical Council or Medical Council of India, with a registration number you can check online."
            },
            {
                title: "Hair Transplant Certification",
                content: "Specific hair-transplant training or certification in the techniques they perform — FUE, Sapphire FUE, THI — from a recognised training centre or institution."
            },
            {
                title: "Experience & Case Volume",
                content: "Documented years in hair restoration and real case volume — and a portfolio of their own before-and-afters with patients similar to yours."
            },
            {
                title: "Professional Memberships",
                content: "Memberships in recognised professional bodies such as ISHRS (International Society of Hair Restoration Surgery) or similar national bodies."
            }
        ],
        bottomCTA: {
            heading: "Not sure what to verify?",
            description: "Call us — our team will walk you through Dr. Singh's credentials before you commit to a consultation.",
            primaryCTA: { text: "Call +91-9217958539", url: "tel:+919217958539" },
            secondaryCTA: { text: "WhatsApp", url: "https://wa.me/919217958539" }
        }
    },

    /* ── 7. Verification Steps ── */
    verification: {
        sectionLabel: "Verify Before You Book",
        heading: "How to verify a hair transplant doctor's credentials in Delhi",
        description: "Don't take claims at face value — a confident, transparent clinic will welcome these questions. Evasiveness is your answer.",
        steps: [
            {
                title: "Ask for name, qualifications & registration number",
                description: "Request the doctor's full name, qualifications, and medical-council registration number upfront."
            },
            {
                title: "Check the medical council register",
                description: "Verify the registration on the relevant state or national medical council register online."
            },
            {
                title: "Ask about personal case volume",
                description: "Ask how many hair transplant cases they have personally performed, and request to see those before-and-afters."
            },
            {
                title: "Confirm who does the surgery",
                description: "Confirm the doctor performs the surgery themselves — extraction and implantation — not technicians."
            },
            {
                title: "Read genuine, recent reviews",
                description: "Check Google reviews and independent platforms for recent, genuine patient feedback."
            }
        ],
        checklist: [
            { label: "MBBS + postgraduate training verified", checked: true },
            { label: "Medical council registration confirmed", checked: true },
            { label: "Hair transplant certification checked", checked: true },
            { label: "Personal before-and-afters reviewed", checked: true },
            { label: "Doctor personally performs surgery confirmed", checked: true }
        ]
    },

    /* ── 8. Comparison ── */
    comparison: {
        sectionLabel: "The Critical Difference",
        heading: "Doctor-led vs technician-led surgery in Delhi",
        description: "This is the single most important thing to verify at any clinic in Delhi. In many high-volume 'graft mills,' technicians perform large parts of the surgery — a leading cause of poor graft survival and unnatural hairlines.",
        leftCard: {
            title: "Doctor-Led (Ryan Clinic)",
            description: "Every surgical step performed by a qualified, Turkey-certified doctor."
        },
        rightCard: {
            title: "Technician-Led 'Graft Mill'",
            description: "Doctor may appear briefly; technicians do the bulk of the procedure."
        },
        rows: [
            {
                parameter: "Consultation & Scalp Analysis",
                doctorValue: "Dr. Pranendra Singh",
                technicianValue: "Often a salesperson / counsellor"
            },
            {
                parameter: "Hairline Design & Planning",
                doctorValue: "Doctor — personalised to your face",
                technicianValue: "Variable / generic template"
            },
            {
                parameter: "Local Anaesthesia Administration",
                doctorValue: "Doctor",
                technicianValue: "Assistant / Technician"
            },
            {
                parameter: "Graft Extraction (FUE / Sapphire)",
                doctorValue: "Doctor",
                technicianValue: "Often technicians"
            },
            {
                parameter: "Recipient Site Creation",
                doctorValue: "Doctor",
                technicianValue: "Often technicians"
            },
            {
                parameter: "Graft Implantation",
                doctorValue: "Doctor",
                technicianValue: "Often technicians"
            },
            {
                parameter: "Post-Op Inspection & Care Plan",
                doctorValue: "Doctor — structured 12-18 month follow-up",
                technicianValue: "Often ends at discharge"
            }
        ]
    },

    /* ── 9. Surgeon Profile ── */
    surgeonProfile: {
        sectionLabel: "Meet Your Surgeon",
        heading: "Dr. Pranendra Singh — Lead Hair Transplant Doctor in Delhi",
        about: "Dr. Pranendra Singh is the founder and Medical Director of Ryan Skin & Hair Transplant Clinic, and India's foremost authority on Turkey's Sapphire FUE technique. He trained directly under Turkey's leading hair restoration specialists in Istanbul and brings 15+ years and over 5,000 successful procedures to every patient. Dr. Singh is the reason Ryan Clinic is one of India's only clinics certified to perform authentic Sapphire FUE using the original Choi Pen implanter — a technique he personally brought back from Istanbul.",
        philosophy: "Every patient is a once-in-a-lifetime case — their donor supply is finite, and the result they carry for the rest of their life depends on the decisions we make together at consultation. I operate personally, design every hairline myself, and stay involved through your entire 18-month growth cycle. That's not a promise; it's how I practice.",
        whyChooseDoctor: [
            {
                title: "Turkey-Certified Sapphire FUE",
                description: "Personally trained under Istanbul's leading hair specialists — the only doctor in North Delhi with direct Turkey technique certification."
            },
            {
                title: "Performs Every Step Himself",
                description: "Extraction, channel creation, and implantation are all done by Dr. Singh — never delegated to technicians."
            },
            {
                title: "Natural Hairline Design",
                description: "Designs each hairline individually, accounting for age, facial geometry, and long-term hair loss progression."
            }
        ],
        achievements: [
            {
                title: "15+ Years in Hair Restoration",
                description: "Dedicated exclusively to hair transplant surgery since 2009 with over 5,000 successful procedures."
            },
            {
                title: "Turkey Sapphire FUE Certification",
                description: "Certified directly by Istanbul Hair Institute — authentic Sapphire FUE with original Choi Pen technique."
            },
            {
                title: "ISHRS Member",
                description: "Member of the International Society of Hair Restoration Surgery."
            },
            {
                title: "Featured in National Media",
                description: "Featured in Times of India, NDTV Health, and Hindustan Times for expertise in hair restoration."
            },
            {
                title: "200+ NRI Patients",
                description: "Patients from UK, USA, UAE, and Australia travel specifically for Dr. Singh's technique."
            }
        ],
        consultationIncludes: [
            { title: "Free scalp & donor density analysis" },
            { title: "Exact graft count & technique recommendation" },
            { title: "Honest candidacy assessment" },
            { title: "Transparent per-graft cost breakdown" },
            { title: "0% EMI options discussed" }
        ],
        primaryCTA: { text: "Book Free Consultation", url: "tel:+919217958539" },
        secondaryCTA: { text: "WhatsApp Dr. Singh's Team", url: "https://wa.me/919217958539" }
    },

    /* ── 10. Surgery Timeline ── */
    surgeryTimeline: {
        sectionLabel: "What Your Doctor Does",
        heading: "What your hair transplant doctor in Delhi does at every stage",
        description: "A good hair transplant doctor in Delhi is involved throughout — not just on the day of surgery.",
        steps: [
            {
                stepNumber: 1,
                title: "Free Consultation & Scalp Analysis",
                description: "Dr. Singh examines your donor density and hair loss pattern, discusses your goals and history, and gives an honest plan — technique, graft count, and transparent cost."
            },
            {
                stepNumber: 2,
                title: "Personalised Hairline Design",
                description: "The doctor maps a natural, age-appropriate hairline to your facial proportions — accounting for future hair loss so the result looks right for decades."
            },
            {
                stepNumber: 3,
                title: "Doctor-Performed Surgery",
                description: "Dr. Singh personally performs extraction, channel creation, and implantation under local anaesthesia in a sterile operating theatre — no technician hands on your grafts."
            },
            {
                stepNumber: 4,
                title: "Structured 12–18 Month Follow-Up",
                description: "The doctor monitors your healing and growth through your full growth cycle, with scheduled review visits and direct access to his team."
            }
        ]
    },

    /* ── 11. Consultation ── */
    consultation: {
        sectionLabel: "Book a Consultation",
        heading: "Book a consultation with our hair transplant doctor in Delhi",
        description: "Get a free scalp analysis, your exact graft count, and a transparent cost breakdown — no obligation, no pressure.",
        contactCards: [
            {
                icon: "phone",
                title: "Call Us",
                value: "+91-9217958539",
                link: "tel:+919217958539",
                description: "Mon–Sat, 9 AM – 7 PM"
            },
            {
                icon: "whatsapp",
                title: "WhatsApp",
                value: "+91-9217958539",
                link: "https://wa.me/919217958539",
                description: "Fastest response — reply within minutes"
            },
            {
                icon: "location",
                title: "Visit the Clinic",
                value: "Pitampura, New Delhi",
                link: "https://maps.google.com/?q=Ryan+Clinic+Pitampura",
                description: "CD 163, Block CD, Dakshini Pitampura, Delhi 110034"
            }
        ],
        form: {
            title: "Request a Callback",
            services: ["FUE Hair Transplant", "Sapphire FUE", "THI Technique", "Beard Transplant", "Eyebrow Transplant", "PRP Therapy", "Female Hair Transplant"],
            submitButtonText: "Request Free Consultation"
        }
    },

    /* ── 12. Questions to Ask ── */
    questionsToAsk: {
        sectionLabel: "Questions to Ask",
        heading: "Questions to ask your hair transplant doctor in Delhi before booking",
        description: "The quality of a doctor's answers tells you almost everything. Ask these before you commit.",
        questions: [
            {
                question: "Will you personally perform my extraction and implantation, or will technicians?",
                answer: "At Ryan Clinic, Dr. Singh performs every step personally. Always confirm this at any clinic."
            },
            {
                question: "What are your qualifications and medical-council registration number?",
                answer: "Ask for the exact registration number and verify it on the Delhi Medical Council register."
            },
            {
                question: "How many hair transplant cases like mine have you done — can I see them?",
                answer: "Ask for unedited before-and-afters of the doctor's own patients, not stock photos."
            },
            {
                question: "Which technique do you recommend for me, and why?",
                answer: "A good doctor tailors the technique to your case — not a one-size-fits-all recommendation."
            },
            {
                question: "Am I a good candidate, or should I consider medical therapy first?",
                answer: "Honest doctors will tell you when surgery is not the right step yet."
            },
            {
                question: "What result is realistic for my donor supply — will I need a future session?",
                answer: "Understand graft budgeting and long-term planning before committing."
            },
            {
                question: "What's the total per-graft cost, and what does aftercare include?",
                answer: "Get a transparent, all-inclusive cost breakdown with no hidden fees."
            }
        ],
        ctaCard: {
            heading: "Ready to ask these questions?",
            description: "Book a free consultation with Dr. Singh — he welcomes every question.",
            primaryCTA: { text: "Call +91-9217958539", url: "tel:+919217958539" },
            secondaryCTA: { text: "WhatsApp Now", url: "https://wa.me/919217958539" }
        }
    },

    /* ── 13. Great Doctor Qualities ── */
    greatDoctorQualities: {
        sectionLabel: "What Great Doctors Do Differently",
        heading: "What a great hair transplant doctor in Delhi does differently",
        description: "The difference between a good result and a great one comes down to these practices.",
        cards: [
            {
                title: "Honest Candidacy Assessment",
                description: "Recommends surgery only when it's genuinely right for you — and says clearly when it isn't, even if it means losing a booking."
            },
            {
                title: "Conservative, Natural Hairline Design",
                description: "Plans for your future hair loss progression, not just today's — so the result looks right at 30, 45, and 60."
            },
            {
                title: "Realistic Expectations, No Guarantees",
                description: "No promised impossible density or 100% graft survival — honest about what your donor supply can achieve."
            },
            {
                title: "Full Personal Involvement",
                description: "Performs the surgery himself rather than delegating it — every extraction, channel, and implantation."
            },
            {
                title: "Transparent Pricing & Structured Aftercare",
                description: "No surprise fees; a clear per-graft cost and a structured 12–18 month follow-up plan included."
            }
        ]
    },

    /* ── 14. Warning Signs ── */
    warningSigns: {
        sectionLabel: "Red Flags",
        heading: "Red flags when choosing a hair transplant doctor in Delhi",
        description: "Protect yourself — these are the warning signs of a clinic you should avoid.",
        image: {
            image: "/uploads/1752667815707-fue-banner_ro9ae6.webp",
            alt: "Red flags in hair transplant clinics Delhi"
        },
        cards: [
            {
                title: "No named, credentialed doctor on the website",
                description: "If you can't find the doctor's full name, qualifications, and registration number publicly listed, walk away."
            },
            {
                title: "Vagueness about who actually operates",
                description: "If the clinic is evasive about whether the doctor or technicians perform extraction and implantation, that tells you the answer."
            },
            {
                title: "Unverifiable or exaggerated credentials",
                description: "Credentials that can't be checked on a medical council register, or claims that sound too impressive to be real."
            },
            {
                title: "Guaranteed results or pressure tactics",
                description: "No ethical doctor guarantees hair density or graft survival. High-pressure booking or immediate payment demands are a warning sign."
            },
            {
                title: "No real before-and-afters of the doctor's own patients",
                description: "Stock photos or generic results that don't belong to the specific doctor you'll be seeing."
            },
            {
                title: "Inconsistent claims across the site and ads",
                description: "Wildly different graft counts, prices, or technique descriptions across different pages or ads indicate unreliable communication."
            }
        ],
        bottomCTA: {
            heading: "Not sure about a claim you've seen?",
            description: "Call our team — we'll answer every question transparently, including our own credentials.",
            primaryCTA: { text: "Call +91-9217958539", url: "tel:+919217958539" },
            secondaryCTA: { text: "WhatsApp Us", url: "https://wa.me/919217958539" }
        }
    },

    /* ── 14B. Procedures Performed ── */
    proceduresPerformed: {
        sectionLabel: "Procedures We Perform",
        heading: "Procedures our hair transplant doctors in Delhi perform",
        description: "Ryan Clinic's doctors personally perform all of the following — every step, every time.",
        cards: [
            { title: "FUE & Sapphire FUE", description: "Follicular unit extraction with Sapphire micro-blades for minimal trauma and maximum density." },
            { title: "THI / Hairline Design", description: "Turkish technique implantation with custom hairline design for natural-looking, age-appropriate results." },
            { title: "Beard & Moustache Transplant", description: "Precise facial hair restoration for beard gaps, patchy growth, and post-scar coverage." },
            { title: "Eyebrow Transplant", description: "Natural eyebrow restoration with careful angle and direction control by the doctor." },
            { title: "Hair Transplant for Women", description: "Case-specific female hair loss assessment and doctor-performed transplant surgery." },
            { title: "PRP Therapy", description: "Platelet-rich plasma treatment to support hair growth and complement transplant results." },
            { title: "Medical Management of Hair Loss", description: "Evidence-based medical therapy for early hair loss — recommended when surgery isn't the right step yet." }
        ]
    },

    /* ── 16. Pricing ── */
    pricing: {
        sectionLabel: "Transparent Pricing",
        heading: "Cost of consulting a hair transplant doctor in Delhi",
        description: "Consultation at Ryan Clinic is free — your doctor assesses your case and gives you an exact graft count and transparent per-graft cost with no obligation.",
        packages: [
            {
                title: "Free Consultation",
                price: "₹0",
                priceNote: "No charge",
                subtitle: "Scalp analysis & honest assessment",
                isFeatured: false,
                features: [
                    "Donor density & pattern analysis by Dr. Singh",
                    "Exact graft count recommendation",
                    "Technique suitability assessment",
                    "Transparent per-graft cost breakdown",
                    "0% EMI options discussed"
                ],
                buttonText: "Book Free Consult"
            },
            {
                title: "Sapphire FUE",
                price: "₹35",
                priceNote: "per graft onwards",
                subtitle: "Most popular — natural, doctor-led result",
                isFeatured: true,
                features: [
                    "Doctor performs every surgical step",
                    "Sapphire micro-blade extraction",
                    "Custom hairline design",
                    "Sterile OT suite",
                    "12–18 month structured follow-up",
                    "0% EMI available"
                ],
                buttonText: "Get Exact Quote"
            },
            {
                title: "THI Technique",
                price: "₹40",
                priceNote: "per graft onwards",
                subtitle: "Choi Pen implantation — highest precision",
                isFeatured: false,
                features: [
                    "Original Turkish Choi Pen technique",
                    "No-shave option available",
                    "Maximum density in single session",
                    "Doctor-performed end-to-end",
                    "Structured aftercare included",
                    "0% EMI available"
                ],
                buttonText: "Get Exact Quote"
            }
        ],
        disclaimer: "Prices are per-graft starting rates. Your exact cost depends on graft count determined at consultation. All prices include anaesthesia, OT charges, post-op kit, and first follow-up visit. 0% EMI available on all packages."
    },

    /* ── 17. Visit Clinic ── */
    visitClinic: {
        sectionLabel: "Find Us",
        heading: "Visiting Ryan Clinic in Pitampura, Delhi",
        description: "Our Delhi centre is in Pitampura (North-West Delhi), easily accessible from across the city and NCR via Metro, road, and major arterials.",
        address: {
            line1: "CD 163, Block CD, Dakshini Pitampura",
            city: "Pitampura, New Delhi",
            pincode: "110034",
            landmark: "Near Pitampura Metro Station (Red Line)"
        },
        timings: [
            { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
            { day: "Sunday", time: "By appointment only" }
        ],
        mapUrl: "https://maps.google.com/?q=CD+163+Block+CD+Dakshini+Pitampura+New+Delhi+110034",
        contact: {
            phone: "+91-9217958539",
            whatsapp: "+91-9217958539",
            email: "info@clinicryan.com"
        },
        gallery: []
    },

    /* ── 18. FAQ ── */
    faq: {
        sectionLabel: "Frequently Asked Questions",
        heading: "Frequently asked questions about hair transplant doctors in Delhi",
        description: "Everything you need to know before choosing a hair transplant doctor in Delhi.",
        faqs: [
            {
                question: "How do I choose the best hair transplant doctor in Delhi?",
                answer: "Verify that a qualified doctor personally performs the whole surgery, check their credentials and medical-council registration, review real before-and-afters of their own patients and genuine reviews, and judge how honestly they discuss candidacy and expectations."
            },
            {
                question: "What qualifications should a hair transplant doctor have?",
                answer: "A recognised medical degree (MBBS), relevant postgraduate training or fellowship, registration with the medical council, specific hair-transplant training in the techniques they use, and documented hair-restoration experience."
            },
            {
                question: "Should a hair transplant doctor be a dermatologist or a plastic surgeon?",
                answer: "Either background can produce an excellent hair transplant surgeon. What matters most is genuine hair-restoration training, real case experience, and verifiable qualifications — not one specific specialty."
            },
            {
                question: "How can I verify a hair transplant doctor's credentials?",
                answer: "Ask for their full name, qualifications, and registration number, then check it on the relevant medical council register. Also ask how many cases like yours they've personally done and to see those results."
            },
            {
                question: "Does the doctor or a technician perform the surgery?",
                answer: "At Ryan Clinic, Dr. Pranendra Singh performs every step — extraction, channel creation, and implantation. Always confirm this at any clinic, because technician-led surgery is a common cause of poor results."
            },
            {
                question: "Why does a doctor-led hair transplant matter?",
                answer: "Graft survival and a natural hairline depend on precise extraction, design, and implantation. A skilled, hands-on doctor directly determines those outcomes; delegated, rushed work puts them at risk."
            },
            {
                question: "How experienced should my hair transplant doctor be?",
                answer: "Look for documented years in hair restoration and real case volume — and, most importantly, a portfolio of their own before-and-afters with patients similar to you."
            },
            {
                question: "Who is the lead hair transplant doctor at Ryan Clinic?",
                answer: "Dr. Pranendra Singh — Medical Director and Chief Surgeon, with 15+ years and 5,000+ procedures. Turkey-certified in Sapphire FUE. ISHRS member. Full credentials available at the clinic."
            },
            {
                question: "What questions should I ask the doctor before booking?",
                answer: "Will you personally perform my surgery? What are your credentials and registration number? Can I see your own results for cases like mine? Which technique do you recommend and why? Am I a good candidate? What's the realistic outcome and total cost?"
            },
            {
                question: "Can a hair transplant doctor tell me I'm not a good candidate?",
                answer: "Yes — and a good one will. If your loss is very early, rapidly progressing, or your donor supply is limited, the doctor may recommend medical therapy or staging instead of immediate surgery."
            },
            {
                question: "Do the same doctors treat women and facial-hair cases?",
                answer: "Yes — our doctors perform female hair transplants and beard/eyebrow restoration, each requiring careful, case-specific design and dedicated surgical technique."
            },
            {
                question: "How much does it cost to consult a hair transplant doctor in Delhi?",
                answer: "Ryan Clinic offers a free scalp analysis; Dr. Singh provides an exact graft count and transparent per-graft cost. Surgery starts from ₹35 per graft, with 0% EMI available."
            },
            {
                question: "Where can I meet the doctor in Delhi?",
                answer: "At our Pitampura centre — CD 163, Block CD, Dakshini Pitampura, New Delhi 110034 — Mon–Sat, 9 AM–7 PM. Nearest Metro: Pitampura Station (Red Line)."
            },
            {
                question: "How do I book a consultation with the doctor?",
                answer: "Call or WhatsApp +91-9217958539, or use our booking form. You'll get a free scalp analysis, exact graft count, and cost breakdown with no obligation."
            }
        ]
    }
};

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
    if (!MONGODB_URI) {
        console.error("ERROR: MONGODB_URI not found in .env.local");
        process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;

    // Check if slug already exists
    const existing = await db.collection("doctors").findOne({
        slug: doctorData.slug
    });

    if (existing) {
        console.log(`⚠️  Doctor with slug "${doctorData.slug}" already exists (ID: ${existing._id})`);
        console.log("   Updating existing document...");
        
        const result = await db.collection("doctors").updateOne(
            { slug: doctorData.slug },
            {
                $set: {
                    ...doctorData,
                    updatedAt: new Date()
                }
            }
        );
        console.log(`✅ Updated: ${result.modifiedCount} document(s) modified`);
    } else {
        const result = await db.collection("doctors").insertOne({
            ...doctorData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        console.log(`✅ Created new doctor page with ID: ${result.insertedId}`);
    }

    console.log(`\n🌐 Page URL: http://localhost:3000/doctors/${doctorData.slug}`);
    console.log(`📋 Admin edit: http://localhost:3000/admin/doctors/edit?slug=${doctorData.slug}`);

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
