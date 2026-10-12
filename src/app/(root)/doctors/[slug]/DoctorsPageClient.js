"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useTrackCTA from "@/lib/useTrackCTA";
import { getValidImageSrc } from "@/lib/utils";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "@/components/surgery/FAQSection";
import {
    ShieldCheck,
    CheckCircle2,
    Award,
    AlertTriangle,
    X,
    Check,
    ChevronDown,
    MapPin,
    Phone,
    Clock,
    MessageCircle,
    Scissors,
    ArrowRight,
    GraduationCap,
    Globe,
    Users,
    Sparkles,
    Compass,
    Eye,
    Flower2,
    Droplet,
    Stethoscope,
    Star,
    Play,
} from "lucide-react";
const GENERIC_CLINIC_PHONE = "+91-9911111247";
const GENERIC_CLINIC_WA = "919217958539";

function formatTelHref(phone) {
    if (!phone) return "tel:+919911111247";
    const cleaned = String(phone).trim().replace(/[^\d+]/g, "");
    return cleaned ? `tel:${cleaned}` : "tel:+919911111247";
}

function formatWhatsAppLink(phone, message = "Hi, I want a free hair transplant consultation") {
    const raw = String(phone || "").trim();
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
        return raw;
    }
    const digits = raw.replace(/\D/g, "");
    let targetPhone = GENERIC_CLINIC_WA;
    if (digits.length === 10) {
        targetPhone = `91${digits}`;
    } else if (digits.length > 10) {
        targetPhone = digits;
    }
    const encoded = encodeURIComponent(message);
    return `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encoded}`;
}

function getGoogleMapsEmbedUrl({ mapUrl, clinicAddress, city }) {
    if (mapUrl && (mapUrl.includes("/maps/embed") || mapUrl.includes("output=embed"))) {
        return mapUrl;
    }
    if (mapUrl) {
        const atCoordsMatch = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (atCoordsMatch) {
            const lat = atCoordsMatch[1];
            const lng = atCoordsMatch[2];
            return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
        }
        const dataCoordsMatch = mapUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
        if (dataCoordsMatch) {
            const lat = dataCoordsMatch[1];
            const lng = dataCoordsMatch[2];
            return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
        }
        const qMatch = mapUrl.match(/[?&]q=([^&]+)/);
        if (qMatch) {
            const decodedQ = decodeURIComponent(qMatch[1]);
            return `https://maps.google.com/maps?q=${encodeURIComponent(decodedQ)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
        }
    }
    if (clinicAddress && clinicAddress.trim()) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(clinicAddress.trim())}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }
    const query = city ? `Ryan Clinic, ${city}` : "Ryan Clinic Delhi";
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}

function getGoogleMapsDirectUrl({ mapUrl, clinicAddress, city }) {
    if (mapUrl && (mapUrl.startsWith("http://") || mapUrl.startsWith("https://")) && !mapUrl.includes("output=embed")) {
        return mapUrl;
    }
    const query = clinicAddress?.trim() || (city ? `Ryan Clinic ${city}` : "Ryan Clinic");
    return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

/* ─── Scroll Reveal Hook and Component ───────────────────────────────────── */
function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            {
                threshold: options.threshold ?? 0.1,
                rootMargin: options.rootMargin ?? "0px 0px -40px 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref, isVisible };
}

function RevealSection({ children, className = "", delay = 0 }) {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div
            ref={ref}
            className={className}
            suppressHydrationWarning
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : "translateY(28px)",
                transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function SectionLabel({ text, dark = false }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-red-400" : "bg-[#D32F2F]"}`} />
            <span className={`text-[11px] font-semibold tracking-[0.18em] uppercase ${dark ? "text-red-400" : "text-[#D32F2F]"}`}>
                {text}
            </span>
        </div>
    );
}

function CTAButtons({ primary = "Book Free Consultation", center = false, doctorName = "", whatsappNumber = "", phoneNumber = "" }) {
    const trackCTA = useTrackCTA();
    const waLink = formatWhatsAppLink(
        whatsappNumber,
        `Hi, I want a free hair transplant consultation${doctorName ? ` with ${doctorName}` : ""}`
    );
    const telHref = formatTelHref(phoneNumber);
    const displayPhone = phoneNumber || GENERIC_CLINIC_PHONE;
    return (
        <div className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
            <a
                href={waLink}
                className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl"
                onClick={() => trackCTA({ type: "whatsapp", ctaName: `Doctor Page: ${primary}`, buttonLocation: "Doctor Page Content" })}
            >
                {primary}
            </a>
            <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
                onClick={() => trackCTA({ type: "call", ctaName: "Doctor Page Call", buttonLocation: "Doctor Page Content" })}
            >
                Call {displayPhone}
            </a>
        </div>
    );
}

const FALLBACK_CRED_TABS = [
    {
        title: "Medical Degree & Specialisation",
        hint: "MBBS + MS / Dermatology",
        desc: "Recognised MBBS and postgraduate training in surgery, dermatology, or dedicated hair-transplant specialisation.",
        icon: "GraduationCap",
        image: "/uploads/turkey-doctor.jpg",
        ctaText: "Verify doctor credentials",
        ctaLink: "#credentials",
    },
    {
        title: "Medical Board Registration",
        hint: "Verifiable via State Medical Council / NMC",
        desc: "Active and verifiable registration with the state or national medical council with an official registration number.",
        icon: "ShieldCheck",
        image: "/uploads/about-one.jpg",
        ctaText: "Verify doctor credentials",
        ctaLink: "#credentials",
    },
    {
        title: "Technique Certification",
        hint: "Sapphire FUE & Turkish Technique Choi Pen",
        desc: "Specific advanced certification in Sapphire FUE and Turkish Technique techniques personally performed by the doctor.",
        icon: "Award",
        image: "/uploads/service-two.jpg",
        ctaText: "Verify doctor credentials",
        ctaLink: "#credentials",
    },
    {
        title: "Surgical Case Volume",
        hint: "1,000+ documented procedures",
        desc: "Years of active surgical practice with a high count of personally completed hair restoration procedures.",
        icon: "Users",
        image: "/uploads/service-three.jpg",
        ctaText: "Verify doctor credentials",
        ctaLink: "#credentials",
    },
    {
        title: "Professional Memberships",
        hint: "ISHRS / ABHRS Accredited",
        desc: "Memberships in globally respected bodies like ISHRS — guaranteeing ongoing surgical education and ethics.",
        icon: "Globe",
        image: "/uploads/gallery.jpg",
        ctaText: "Verify doctor credentials",
        ctaLink: "#credentials",
    },
];

const FALLBACK_CHECKLIST = [
    "Requested doctor's full name & medical council registration number",
    "Verify active registration through the relevant State Medical Council / NMC portal",
    "Confirmed doctor personally performs extraction & implantation",
    "Reviewed before/after portfolio of doctor's own real patients",
    "Checked verified reviews on Google or independent platforms",
];

const FALLBACK_RED_FLAGS = [
    {
        title: "No Named Doctor",
        desc: "No named, credentialed doctor anywhere on the website.",
        icon: "AlertTriangle",
    },
    {
        title: "Technician Delegation",
        desc: "No doctor present during the actual surgical procedure.",
        icon: "X",
    },
    {
        title: "Fake Credentials",
        desc: "Guaranteeing impossible hair density or 100% graft survival.",
        icon: "ShieldCheck",
    },
    {
        title: "High-Pressure Booking",
        desc: "Guaranteed results or pressure to book or pay immediately.",
        icon: "AlertTriangle",
    },
    {
        title: "Zero Patient Portfolio",
        desc: "No real before-and-afters of the doctor's own patients.",
        icon: "Scissors",
    },
    {
        title: "Inconsistent Information",
        desc: "Inconsistent claims across the website and advertisements.",
        icon: "X",
    },
];

const FALLBACK_SURGICAL_STEPS = [
    { num: "01", title: "Consultation & Hairline Design", body: "The doctor personally maps your new hairline according to facial symmetry and marks donor and recipient zones for lifetime natural framing." },
    { num: "02", title: "Graft Extraction (FUE)", body: "Follicular units are harvested one by one from the safe donor area using precision micro-punches (0.7–0.9mm) to protect viability." },
    { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "Microscopic channels are opened using sharp gemstone sapphire blades, setting exact direction, angle, and radial depth." },
    { num: "04", title: "Direct Implantation (Turkish Technique)", body: "Using original Choi implanter pens, sorted grafts are loaded and placed directly into channels for maximum density without scalp trauma." },
    { num: "05", title: "18-Month Growth & Follow-Up", body: "Free structured follow-up check-ups at months 1, 3, 6, 12, and 18 ensure your hair growth progress is fully tracked." },
];

function getCredIconElement(name, idx) {
    const defaultIcons = [
        <GraduationCap key="0" className="w-4 h-4 text-[#D32F2F]" />,
        <ShieldCheck key="1" className="w-4 h-4 text-[#D32F2F]" />,
        <Award key="2" className="w-4 h-4 text-[#D32F2F]" />,
        <Users key="3" className="w-4 h-4 text-[#D32F2F]" />,
        <Globe key="4" className="w-4 h-4 text-[#D32F2F]" />,
    ];
    if (!name) return defaultIcons[idx % defaultIcons.length];
    const lower = String(name).toLowerCase();
    if (lower.includes("grad") || lower.includes("degree")) return <GraduationCap className="w-4 h-4 text-[#D32F2F]" />;
    if (lower.includes("shield") || lower.includes("board")) return <ShieldCheck className="w-4 h-4 text-[#D32F2F]" />;
    if (lower.includes("award") || lower.includes("cert")) return <Award className="w-4 h-4 text-[#D32F2F]" />;
    if (lower.includes("user") || lower.includes("case") || lower.includes("vol")) return <Users className="w-4 h-4 text-[#D32F2F]" />;
    if (lower.includes("globe") || lower.includes("member")) return <Globe className="w-4 h-4 text-[#D32F2F]" />;
    return defaultIcons[idx % defaultIcons.length];
}

function getRedFlagIconElement(name, idx) {
    const defaultIcons = [
        <AlertTriangle key="0" className="w-5 h-5" />,
        <X key="1" className="w-5 h-5" />,
        <ShieldCheck key="2" className="w-5 h-5" />,
        <AlertTriangle key="3" className="w-5 h-5" />,
        <Scissors key="4" className="w-5 h-5" />,
        <X key="5" className="w-5 h-5" />,
    ];
    if (!name) return defaultIcons[idx % defaultIcons.length];
    const lower = String(name).toLowerCase();
    if (lower.includes("alert") || lower.includes("warn")) return <AlertTriangle className="w-5 h-5" />;
    if (lower.includes("x") || lower.includes("close") || lower.includes("cancel")) return <X className="w-5 h-5" />;
    if (lower.includes("shield")) return <ShieldCheck className="w-5 h-5" />;
    if (lower.includes("scissor")) return <Scissors className="w-5 h-5" />;
    return defaultIcons[idx % defaultIcons.length];
}

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default function DoctorPageClient({ data }) {
    const trackCTA = useTrackCTA();
    const [openFaq, setOpenFaq] = useState(null);
    const [activeCred, setActiveCred] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const {
        goodDoctorTraits,
        comparisonRows,
        greatDoctorTraits,
        nearbyAreas,
        faqs,
        doctor,
        whyItMatters,
        surgeonProfile,
        pricingPackages,
        pricingDisclaimer,
        proceduresPerformed,
        doctorStandards,
        credentials,
        verification,
        comparison,
        surgicalProcess,
        questionsToAskSection,
        greatDoctorQualities,
        warningSigns,
        pricing,
        visitClinic,
        consultation,
        faqSection,
        keyFacts,
        medicalReviewer,
    } = data;

    const checklistItems = (verification?.checklist && verification.checklist.length > 0 && verification.checklist.some(c => (typeof c === "string" ? c.trim() : c.title?.trim())))
        ? verification.checklist.map(c => (typeof c === "string" ? c : c.title || "")).filter(Boolean)
        : FALLBACK_CHECKLIST;

    const [checkedSteps, setCheckedSteps] = useState(() => checklistItems.map(() => false));
    const progressPercent = checklistItems.length > 0
        ? Math.round((checkedSteps.filter(Boolean).length / checklistItems.length) * 100)
        : 0;

    const resolvedCredTabs = (credentials?.tabs && credentials.tabs.length > 0 && credentials.tabs.some(t => t.title?.trim()))
        ? credentials.tabs.map((tab, idx) => ({
            title: tab.title || `Credential 0${idx + 1}`,
            hint: tab.hint || "",
            desc: tab.description || tab.desc || "",
            icon: getCredIconElement(tab.icon, idx),
            image: tab.image?.image || tab.image || "/uploads/turkey-doctor.jpg",
            ctaText: tab.ctaText || "Verify doctor credentials",
            ctaLink: tab.ctaLink || "#credentials",
        }))
        : FALLBACK_CRED_TABS.map((tab, idx) => ({
            ...tab,
            icon: getCredIconElement(tab.icon, idx),
        }));

    const resolvedRedFlags = (warningSigns?.cards && warningSigns.cards.length > 0 && warningSigns.cards.some(c => c.title?.trim()))
        ? warningSigns.cards.map((c, i) => ({
            num: String(i + 1).padStart(2, "0"),
            title: c.title || `Warning Sign 0${i + 1}`,
            desc: c.description || "",
            icon: getRedFlagIconElement(c.icon, i),
        }))
        : FALLBACK_RED_FLAGS.map((f, i) => ({
            ...f,
            num: String(i + 1).padStart(2, "0"),
            icon: getRedFlagIconElement(f.icon, i),
        }));

    const resolvedProcessSteps = (surgicalProcess?.steps && surgicalProcess.steps.length > 0 && surgicalProcess.steps.some(s => s.title?.trim()))
        ? surgicalProcess.steps.map((s, idx) => ({
            num: String(s.stepNumber || s.number || idx + 1).padStart(2, "0"),
            title: s.title || `Step ${idx + 1}`,
            body: s.description || s.body || "",
        }))
        : (doctor.surgeryTimeline?.steps && doctor.surgeryTimeline.steps.length > 0 && doctor.surgeryTimeline.steps.some(s => s.title?.trim()))
            ? doctor.surgeryTimeline.steps.map((s, idx) => ({
                num: String(s.stepNumber || s.number || idx + 1).padStart(2, "0"),
                title: s.title || `Step ${idx + 1}`,
                body: s.description || s.body || "",
            }))
            : FALLBACK_SURGICAL_STEPS;

    const doctorCity = (doctor.location || doctor.city || "").trim();
    const citySlug = doctorCity.toLowerCase().replace(/\s+/g, "-");
    const resolvedNearbyAreas = (visitClinic?.nearbyLocations && visitClinic.nearbyLocations.length > 0)
        ? visitClinic.nearbyLocations
        : (nearbyAreas || []);

    const doctorWhatsApp = doctor.basicInfo?.whatsappNumber || doctor.whatsapp || "";
    const doctorPhone = doctor.basicInfo?.phoneNumber || doctor.phone || "";
    const docTelHref = formatTelHref(doctorPhone);
    const docDisplayPhone = doctorPhone || GENERIC_CLINIC_PHONE;
    const waDoctorLink = formatWhatsAppLink(
        doctorWhatsApp,
        `Hi, I want a free hair transplant consultation${doctor.name ? ` with ${doctor.name}` : ""}`
    );

    const compLeftCard = comparison?.leftCard || {};
    const compRightCard = comparison?.rightCard || {};

    const defaultSurgeryComparisonRows = [
        {
            parameter: "Consultation & Scalp Analysis",
            doctorValue: "Doctor-Led",
            technicianValue: "Ask if doctor conducts evaluation",
        },
        {
            parameter: "Hairline Design & Planning",
            doctorValue: "Doctor-Led",
            technicianValue: "Confirm doctor plans hairline",
        },
        {
            parameter: "Graft Extraction (FUE)",
            doctorValue: "Doctor-Led",
            technicianValue: "Ensure surgeon harvests grafts",
        },
        {
            parameter: "Direct Graft Implantation",
            doctorValue: "Doctor-Led",
            technicianValue: "Verify doctor places grafts",
        },
    ];

    const resolvedComparisonRows = (comparison?.rows && comparison.rows.length > 0)
        ? comparison.rows.map((r, idx) => ({
            parameter: r.parameter || r[0] || defaultSurgeryComparisonRows[idx]?.parameter || `Step ${idx + 1}`,
            doctorValue: r.doctorValue || r[1] || "Doctor-Led",
            technicianValue: r.technicianValue || r[2] || "Technician / Assistant",
        }))
        : defaultSurgeryComparisonRows;

    const leftCardImage = getValidImageSrc(
        compLeftCard.image,
        getValidImageSrc(doctor.image, "/uploads/turkey-doctor.jpg")
    );
    const leftCardImageAlt = compLeftCard.image?.alt || `${doctor.name || "Doctor"} — doctor-led hair transplant surgeon`;

    const canonicalYearsExp = (typeof doctor.basicInfo?.yearsExperience === "number" && doctor.basicInfo.yearsExperience > 0)
        ? doctor.basicInfo.yearsExperience
        : (typeof doctor.yearsExperience === "number" && doctor.yearsExperience > 0)
            ? doctor.yearsExperience
            : (parseInt(doctor.experience) || 15);

    const canonicalCasesDone = (typeof doctor.basicInfo?.proceduresCount === "number" && doctor.basicInfo.proceduresCount > 0)
        ? doctor.basicInfo.proceduresCount
        : (typeof doctor.proceduresCountNum === "number" && doctor.proceduresCountNum > 0)
            ? doctor.proceduresCountNum
            : (parseInt(String(doctor.proceduresCount || doctor.procedures || "").replace(/,/g, "")) || 5000);

    const leftTrustPills = [
        {
            v: `${canonicalYearsExp}+ Yrs`,
            l: compLeftCard.experienceLabel || "Exp",
        },
        {
            v: `${canonicalCasesDone.toLocaleString()}+`,
            l: compLeftCard.casesLabel || "Cases Done",
        },
        {
            v: compLeftCard.councilValue || "Medical Council",
            l: compLeftCard.councilLabel || "Registered",
        },
    ];

    const rightChecklistPills = [
        {
            v: compRightCard.checklistPill1Value || "Confirm",
            l: compRightCard.checklistPill1Label || "Doctor Presence",
        },
        {
            v: compRightCard.checklistPill2Value || "Ask",
            l: compRightCard.checklistPill2Label || "Surgical Role",
        },
        {
            v: compRightCard.checklistPill3Value || "Verify",
            l: compRightCard.checklistPill3Label || "Registration",
        },
    ];

    const leftCtaUrl = compLeftCard.buttonUrl || waDoctorLink;
    const leftCtaText = compLeftCard.buttonText || "Book with Ryan Clinic";

    const rightSafetyNotice = compRightCard.safetyNotice || compRightCard.disclaimer || "Always ask who conducts each step of your procedure before booking.";

    const rightRiskBadge = compRightCard.badge || "Technician-Led";
    const rightRiskHeading = compRightCard.riskHeading || "Technician-Led Risk";
    const rightRiskDesc = compRightCard.riskDescription || "Uncertified technicians performing surgical extractions risk permanent donor damage.";
    const rightRiskStatValue = compRightCard.riskStatValue || "High Risk";
    const rightRiskStatLabel = compRightCard.riskStatLabel || "Poor Outcomes";

    const comparisonBottomCaption = comparison?.bottomCaption || (`When you choose the best hair transplant doctor${doctorCity ? ` in ${doctorCity}` : ""}, you're really choosing who does each of these steps.`);

    return (
        <>
            {/* ═════════════════════════════════════════════════════════════════
                SECTION 1 (HERO): Two-Column Surgeon Profile Hero (Image 2 Reference)
            ═════════════════════════════════════════════════════════════════ */}
            <section className="bg-[#FAF7F4] py-12 md:py-16 lg:py-20 border-b border-[#EAE5DF] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

                        {/* LEFT COLUMN: Eyebrow + Dynamic Heading + Bio + Philosophy Card + Achievements Card + Buttons + Rating */}
                        <div className="lg:col-span-7 flex flex-col justify-start">
                            {/* 1. Small eyebrow label */}
                            <SectionLabel text={surgeonProfile?.sectionLabel || "YOUR SURGEON"} />

                            {/* 2. Dynamic heading using doctor's name and relevant designation/location */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.18] tracking-tight mt-1 mb-5">
                                {surgeonProfile?.heading || `Meet ${doctor.name} — Hair Restoration Specialist${doctorCity ? ` in ${doctorCity}` : ""}`}
                            </h2>

                            {/* Medical Reviewer Byline (Only if explicitly verified in CMS) */}
                            {medicalReviewer?.isVerified && medicalReviewer?.reviewerName && (
                                <div className="mb-5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-1.5 rounded-lg font-sans self-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>
                                        Medically reviewed by <strong>{medicalReviewer.reviewerName}</strong>
                                        {medicalReviewer.qualifications ? `, ${medicalReviewer.qualifications}` : ""}
                                        {doctor.updatedAt ? ` · Updated ${new Date(doctor.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}` : ""}
                                    </span>
                                </div>
                            )}

                            {/* 3. Existing CMS biography */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                {surgeonProfile?.about || doctor.about || doctor.bio || (
                                    <>
                                        <strong>{doctor.name}</strong> is dedicated to providing exceptional hair restoration and surgical precision you can trust with a patient-first approach{doctorCity ? ` in ${doctorCity}` : ""}.
                                    </>
                                )}
                            </p>

                            {/* 4. Is Hair Transplant Right for You? Card (populated from CMS data when available) */}
                            {surgeonProfile?.philosophy && (
                                <div className="bg-white rounded-2xl border border-[#E8E4DF] p-5 sm:p-6 mb-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0 mt-0.5">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-widest mb-1.5">
                                            {surgeonProfile?.philosophyHeading || "Is Hair Transplant Right for You?"}
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed font-sans">
                                            {surgeonProfile.philosophy}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* 5. Key Surgical Achievements & Accreditations Card (populated from CMS data when available) */}
                            {surgeonProfile?.achievements && surgeonProfile.achievements.length > 0 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E4DF] p-6 sm:p-7 shadow-sm mb-6">
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-[#D32F2F]" />
                                        {surgeonProfile.achievementsHeading || "Key Surgical Achievements & Accreditations"}
                                    </h2>
                                    <div className="space-y-3">
                                        {surgeonProfile.achievements.map((ach, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                                                </div>
                                                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                    {typeof ach === "string" ? ach : (
                                                        <>
                                                            {ach.title && <strong className="text-gray-900 font-semibold">{ach.title}{ach.description ? ": " : ""}</strong>}
                                                            {ach.description || ""}
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 6. Action Row: Schedule Appointment + Surgical Process button */}
                            <div className="flex flex-wrap items-center gap-4 mb-5">
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-3.5 px-7 text-sm rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                                    onClick={() => {
                                        trackCTA({ type: "whatsapp", ctaName: "Doctor Page Schedule Appointment", buttonLocation: "Hero Section" });
                                        if (typeof window !== "undefined") {
                                            window.dispatchEvent(new CustomEvent("open-appointment-popup"));
                                        }
                                    }}
                                >
                                    Schedule Appointment <ArrowRight className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                                </button>

                                <a
                                    href={`/surgery/hair-transplant-surgery-in-${citySlug}`}
                                    className="inline-flex items-center gap-3 text-gray-900 hover:text-[#D32F2F] font-bold text-sm py-2.5 px-3 transition-colors group"
                                    onClick={() => trackCTA({ type: "navigation", ctaName: "Doctor Page How We Work", buttonLocation: "Hero Section" })}
                                >
                                    <span className="w-9 h-9 rounded-full bg-[#D32F2F] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shrink-0">
                                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                    </span>
                                    <span className="underline underline-offset-4 decoration-red-300 font-bold">Surgical Process</span>
                                </a>
                            </div>

                            {/* 7. Verified doctor rating section (aligned beneath button row) */}
                            {doctor.rating ? (
                                <div className="flex items-center gap-3 pt-4 border-t border-[#EAE5DF] max-w-lg">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-700 font-sans">
                                        <strong className="text-gray-900 font-bold">{doctor.rating}★</strong> Verified Doctor Rating
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        {/* RIGHT COLUMN: Doctor Profile Card */}
                        <div className="lg:col-span-5 sticky top-24 self-start">
                            <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black border-4 border-white shadow-2xl group">
                                
                                {/* Verification Badge (only if supported by existing verified CMS data) */}
                                {Boolean(
                                    doctor.isVerified ||
                                    doctor.basicInfo?.isVerified ||
                                    doctor.medicalReviewer?.isVerified ||
                                    medicalReviewer?.isVerified
                                ) && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Verified Lead Surgeon
                                        </span>
                                    </div>
                                )}

                                {/* Main Doctor Image */}
                                <div className="relative w-full h-[450px] sm:h-[520px]">
                                    <Image
                                        src={getValidImageSrc(doctor.image, "/uploads/turkey-doctor.jpg")}
                                        alt={`${doctor.name} — Hair Transplant Surgeon`}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 440px"
                                    />
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                                </div>

                                {/* Overlay Content & Compact Stats at bottom of card */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white space-y-4">
                                    <div>
                                        <p className="text-2xl font-black leading-tight text-white">{doctor.name}</p>
                                        <p className="text-red-300 text-xs font-semibold mt-0.5">
                                            {doctor.designation || "Chief Hair Restoration Surgeon"}
                                        </p>
                                    </div>

                                    {/* Compact Statistics Panel */}
                                    {(() => {
                                        const statsList = [
                                            { label: "Exp.", value: `${canonicalYearsExp}+ Yrs`, color: "text-amber-400" },
                                            { label: "Surgeries", value: `${canonicalCasesDone.toLocaleString()}+`, color: "text-white" },
                                            doctor.successRate ? { label: "Graft Survival", value: doctor.successRate, color: "text-emerald-400" } : null,
                                        ].filter(Boolean);

                                        if (statsList.length === 0) return null;

                                        return (
                                            <div className={`grid gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 ${
                                                statsList.length === 1 ? "grid-cols-1" : statsList.length === 2 ? "grid-cols-2" : "grid-cols-3"
                                            }`}>
                                                {statsList.map((stat, idx) => (
                                                    <div key={idx} className={`text-center ${idx > 0 ? "border-l border-white/15" : ""}`}>
                                                        <p className={`text-base font-black ${stat.color} leading-none`}>{stat.value}</p>
                                                        <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    })()}

                                    {/* Quick Action Button */}
                                    <a
                                        href={waDoctorLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-3 px-5 rounded-xl text-xs transition-all shadow-lg shadow-red-900/40 hover:-translate-y-0.5"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Consult Doctor Directly Profile Card", buttonLocation: "Hero Profile Card" })}
                                    >
                                        Consult {doctor.name} Directly <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 1C: Verified Key Facts Grid (Dynamic CMS Data)
                6 cards only — 3 × 2 desktop grid
                Medical Registration & Council/Memberships removed from PUBLIC display.
                CMS fields (keyFacts.registration, keyFacts.memberships) are preserved in DB.
            ═════════════════════════════════════════════════════════════════ */}
            {keyFacts && (keyFacts.qualifications || keyFacts.specialisation || keyFacts.experience || keyFacts.procedures || keyFacts.location || keyFacts.consultation) && (
                <section className="bg-white py-14 border-b border-gray-100">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Outer container — warm off-white, soft border, generous padding */}
                        <div className="bg-[#FAF7F4] rounded-[26px] border border-[#EAE5DF] shadow-sm px-6 py-8 sm:px-10 sm:py-10">

                            {/* Section header */}
                            <div className="flex items-center gap-2.5 mb-8">
                                <span className="w-[7px] h-[7px] rounded-full bg-[#C62828] flex-shrink-0" aria-hidden="true" />
                                <h3 className="text-[13px] font-bold uppercase tracking-[0.15em] text-gray-900 leading-none">
                                    {keyFacts.heading || "Verified Doctor & Clinic Key Facts"}
                                </h3>
                            </div>

                            {/* 3 × 2 grid — 6 cards only (no registration, no memberships) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                {/* 1 — Qualifications */}
                                {keyFacts.qualifications && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <GraduationCap className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Qualifications</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">{keyFacts.qualifications}</p>
                                    </div>
                                )}

                                {/* 2 — Specialisation */}
                                {keyFacts.specialisation && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <Stethoscope className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Specialisation</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">{keyFacts.specialisation}</p>
                                    </div>
                                )}

                                {/* 3 — Surgical Experience */}
                                {(keyFacts.experience || canonicalYearsExp) && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <Award className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Surgical Experience</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">
                                            {canonicalYearsExp ? `${canonicalYearsExp}+ Years` : (keyFacts.experience || "15+ Years")}
                                        </p>
                                    </div>
                                )}

                                {/* 4 — Case Volume */}
                                {(keyFacts.procedures || canonicalCasesDone) && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <Users className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Case Volume</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">
                                            {canonicalCasesDone ? `${canonicalCasesDone.toLocaleString()}+ Surgeries` : (keyFacts.procedures || "5,000+ Surgeries")}
                                        </p>
                                    </div>
                                )}

                                {/* 5 — Clinic Location */}
                                {keyFacts.location && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Clinic Location</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">{keyFacts.location}</p>
                                    </div>
                                )}

                                {/* 6 — Consultation */}
                                {keyFacts.consultation && (
                                    <div className="bg-white rounded-[18px] border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 min-h-[120px] flex flex-col justify-start">
                                        <div className="flex items-center gap-1.5 mb-2.5">
                                            <MessageCircle className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" aria-hidden="true" />
                                            <p className="text-[10.5px] font-bold text-[#7B8FA1] uppercase tracking-[0.12em] leading-none">Consultation</p>
                                        </div>
                                        <p className="text-[15px] font-bold text-[#0F1E2D] leading-[1.45]">{keyFacts.consultation}</p>
                                    </div>
                                )}

                                {/* NOTE: keyFacts.registration (Medical Registration) and
                                    keyFacts.memberships (Council/Memberships) are intentionally
                                    NOT rendered here. The underlying CMS fields are preserved
                                    in the Doctor schema and remain editable in /admin/doctors/edit/[slug]. */}

                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 1B: Why Doctor-Led Hair Transplant Matters
            ═════════════════════════════════════════════════════════════════ */}
            {whyItMatters?.heading && (
            <section className="bg-white py-16 md:py-24 border-b border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/40 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/4" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* LEFT: Sticky Image */}
                        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
                            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] bg-gray-100">
                                {(() => {
                                    const whyItMattersImgRaw = getValidImageSrc(whyItMatters?.image);
                                    const whyItMattersImg = (whyItMattersImgRaw && !whyItMattersImgRaw.includes("turkey-doctor"))
                                        ? whyItMattersImgRaw
                                        : getValidImageSrc(doctor.image, "/uploads/1752667815707-fue-banner_ro9ae6.webp");
                                    return (
                                        <Image
                                            src={whyItMattersImg}
                                            alt={whyItMatters.imageAlt || whyItMatters.image?.alt || `${doctor.name} — doctor-led hair transplant`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    );
                                })()}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                {whyItMatters.floatingStats?.length > 0 && (
                                    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                                        {whyItMatters.floatingStats.map((s, i) => (
                                            <div key={i} className="bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-md border border-white/60">
                                                <p className="text-[#D32F2F] font-black text-base leading-none">{s.value}</p>
                                                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Scrolling Content */}
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <RevealSection>
                                {whyItMatters.sectionLabel && <SectionLabel text={whyItMatters.sectionLabel} />}
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mt-1 mb-4">
                                    {whyItMatters.heading}
                                </h2>
                                {whyItMatters.description && (
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans">
                                        {whyItMatters.description}
                                    </p>
                                )}
                            </RevealSection>

                            {whyItMatters.secondaryDescription && (
                                <RevealSection delay={80}>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans border-l-4 border-[#D32F2F] pl-5">
                                        {whyItMatters.secondaryDescription}
                                    </p>
                                </RevealSection>
                            )}

                            {whyItMatters.highlightBox && (
                                <RevealSection delay={120}>
                                    <div className="bg-gradient-to-br from-[#D32F2F] to-red-700 text-white rounded-2xl p-6 shadow-lg shadow-red-700/20">
                                        <p className="text-sm md:text-base font-bold leading-relaxed">
                                            {whyItMatters.highlightBox}
                                        </p>
                                    </div>
                                </RevealSection>
                            )}

                            {(whyItMatters.primaryCTA?.text || whyItMatters.secondaryCTA?.text) && (
                                <RevealSection delay={160}>
                                    <div className="flex flex-wrap gap-3">
                                        {whyItMatters.primaryCTA?.text && (
                                            <a
                                                href={whyItMatters.primaryCTA.url || waDoctorLink}
                                                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-7 rounded-xl text-sm shadow-md hover:-translate-y-0.5 transition-all duration-200"
                                                onClick={() => trackCTA({ type: "whatsapp", ctaName: whyItMatters.primaryCTA.text, buttonLocation: "Why It Matters" })}
                                            >
                                                {whyItMatters.primaryCTA.text} <ArrowRight className="w-4 h-4" />
                                            </a>
                                        )}
                                        {whyItMatters.secondaryCTA?.text && (
                                            <a
                                                href={whyItMatters.secondaryCTA.url || docTelHref}
                                                className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-bold py-3.5 px-7 rounded-xl text-sm transition-all duration-200"
                                                onClick={() => trackCTA({ type: "call", ctaName: whyItMatters.secondaryCTA.text, buttonLocation: "Why It Matters" })}
                                            >
                                                {whyItMatters.secondaryCTA.text}
                                            </a>
                                        )}
                                    </div>
                                </RevealSection>
                            )}
                        </div>

                    </div>
                </div>
            </section>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 2: Credentials & Verification — REMOVED from public UI.
                CMS fields (credentials, verification) are PRESERVED in the DB schema
                and admin editor (/admin/doctors/edit/[slug]). Only the public rendering
                has been removed per product requirement.
            ═════════════════════════════════════════════════════════════════ */}

            {/* The "Credentials Check" dark banner that was at the bottom of Section 2
                is also removed here. No DB fields or admin features were changed. */}



            {/* ═════════════════════════════════════════════════════════════════
                SECTION 3: Image 5 — What Makes a Good Hair Transplant Doctor
                User requested: Place Image 5 after all the above sections with
                "These are the non-negotiables. Every box must be ticked before you consider booking."
            ═════════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text={doctorStandards?.sectionLabel || "The Standard"} />
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight max-w-2xl">
                            {doctorStandards?.heading || `What makes a good hair transplant doctor${doctorCity ? ` in ${doctorCity}` : ""}?`}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 max-w-xs font-sans text-right md:text-right">
                            {doctorStandards?.description || "These are the non-negotiables. Every box must be ticked before you consider booking."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goodDoctorTraits.map((t, i) => (
                            <div
                                key={i}
                                className="bg-[#F7F5F2] rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden cursor-default"
                            >
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">0{i + 1}</span>
                                        <h3 className="font-bold text-gray-900 text-sm leading-tight mt-0.5">{t.title}</h3>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed font-sans">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. Comparison — Horizontal Split Cards ─────────────────── */}
            <section className="bg-[#F7F5F2] py-20 md:py-28 overflow-hidden relative">
                {/* Background glows */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="mb-12">
                        <SectionLabel text={comparison?.sectionLabel || "The Critical Difference"} />
                        <div className="flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-2xl">
                                {comparison?.heading || `Doctor-led vs technician-led surgery${doctorCity ? ` in ${doctorCity}` : ""}: the difference that defines your result`}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm md:text-right font-sans">
                                {comparison?.description || "The person performing each step is what determines your result."}
                            </p>
                        </div>
                    </div>

                    {/* Card stack (Zig-Zag pattern) */}
                    <div className="flex flex-col gap-8">

                        {/* ── Card 1: Doctor-Led (Image LEFT, Content RIGHT) ─────────────── */}
                        <div
                            className="group bg-white rounded-3xl overflow-hidden shadow-md border border-emerald-100/80 hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row"
                            style={{ animation: "slideInLeft 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
                        >
                            {/* Left Image */}
                            <div className="relative lg:w-[38%] shrink-0 h-52 lg:h-auto min-h-[220px] overflow-hidden">
                                <Image
                                    src={leftCardImage}
                                    alt={leftCardImageAlt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                    sizes="38vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 hidden lg:block" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 lg:bg-none" />

                                {/* Floating badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        {compLeftCard.badge || "Doctor-Led"}
                                    </span>
                                </div>

                                {/* Floating stat */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-white">
                                    <p className="text-xl font-black text-emerald-600 leading-none">{compLeftCard.statValue || doctor.successRate || "95%+"}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{compLeftCard.statLabel || "Graft Survival"}</p>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-1 rounded-full bg-emerald-500 mb-3 group-hover:w-16 transition-all duration-500" />
                                    <div className="mb-4">
                                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-0.5">{compLeftCard.title || doctor.basicInfo?.clinicName || "Ryan Clinic"}</h3>
                                        <p className="text-xs text-gray-500 font-sans">{compLeftCard.subtitle || `Every step personally performed by ${doctor.name}`}</p>

                                        {/* Trust pills */}
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {leftTrustPills.map((s, i) => (
                                                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
                                                    <span className="text-emerald-700 font-black text-[11px] leading-none">{s.v}</span>
                                                    <span className="text-emerald-600/70 text-[9px] font-semibold">{s.l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comparison rows */}
                                    <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50/40">
                                        {resolvedComparisonRows.map((r, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between px-3.5 py-2 hover:bg-emerald-50/50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[9px] font-black text-emerald-600 shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-800 font-sans">{r.parameter}</span>
                                                </div>
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[11px] shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-500 shrink-0" /> {r.doctorValue || "Doctor-Led"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href={leftCtaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="self-start inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Book with Ryan Clinic - Doctor-Led Card", buttonLocation: "Doctor-Led Comparison Section" })}
                                >
                                    {leftCtaText} <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* ── Card 2: What to Confirm (Content LEFT, Image RIGHT - Zig-Zag) ──────────── */}
                        <div
                            className="group bg-white rounded-3xl overflow-hidden shadow-md border border-rose-100/80 hover:shadow-xl transition-all duration-500 flex flex-col lg:flex-row"
                            style={{ animation: "slideInRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s both" }}
                        >
                            {/* Left Content (Zig-Zag order 1 on lg screens) */}
                            <div className="lg:order-1 flex-1 p-5 md:p-6 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-1 rounded-full bg-[#D32F2F] mb-3 group-hover:w-16 transition-all duration-500" />
                                    <div className="mb-4">
                                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-0.5">{compRightCard.title || "What to Confirm Before You Book"}</h3>
                                        <p className="text-xs text-gray-500 font-sans">{compRightCard.subtitle || "Verify doctor involvement across key surgical steps"}</p>

                                        {/* Checklist pills */}
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {rightChecklistPills.map((s, i) => (
                                                <div key={i} className="bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
                                                    <span className="text-rose-600 font-black text-[11px] leading-none">{s.v}</span>
                                                    <span className="text-rose-500/70 text-[9px] font-semibold">{s.l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Comparison rows */}
                                    <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50/40">
                                        {resolvedComparisonRows.map((r, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between px-3.5 py-2 hover:bg-rose-50/40 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4.5 h-4.5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[9px] font-black text-rose-500 shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-800 font-sans">{r.parameter}</span>
                                                </div>
                                                <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-600 font-bold px-2.5 py-0.5 rounded-full text-[11px] shrink-0">
                                                    <CheckCircle2 className="w-3 h-3 text-rose-400 shrink-0" /> {r.technicianValue || "Ask if doctor conducts evaluation"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="flex items-start gap-2 bg-rose-50/70 border border-rose-100 rounded-xl p-3 font-sans">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-rose-700 leading-relaxed">
                                        {rightSafetyNotice}
                                    </p>
                                </div>
                            </div>

                            <div className="lg:order-2 relative lg:w-[38%] shrink-0 h-52 lg:h-auto min-h-[220px] overflow-hidden bg-gradient-to-br from-gray-900 via-rose-950 to-gray-950 flex flex-col items-center justify-center p-6 text-center">
                                {(() => {
                                    const rightCardImgSrc = getValidImageSrc(compRightCard?.image);
                                    if (!rightCardImgSrc) return null;
                                    return (
                                        <>
                                            <Image
                                                src={rightCardImgSrc}
                                                alt={compRightCard.imageAlt || compRightCard.image?.alt || rightRiskHeading}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                                sizes="38vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/70 to-gray-950/50" />
                                        </>
                                    );
                                })()}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-3">
                                        <AlertTriangle className="w-6 h-6 text-rose-400" />
                                    </div>
                                    <p className="text-white font-extrabold text-sm mb-1">{rightRiskHeading}</p>
                                    <p className="text-xs text-rose-200/80 font-sans max-w-xs">{rightRiskDesc}</p>
                                </div>

                                {/* Floating badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                        <X className="w-3 h-3" />
                                        {rightRiskBadge}
                                    </span>
                                </div>

                                {/* Floating warning */}
                                <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-white">
                                    <p className="text-xl font-black text-rose-600 leading-none">{rightRiskStatValue}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{rightRiskStatLabel}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom caption */}
                    <div className="mt-8 flex items-center gap-3 text-gray-400 text-xs font-sans">
                        <span className="w-8 h-px bg-gray-300 shrink-0" />
                        {comparisonBottomCaption}
                    </div>
                </div>

                {/* Keyframe animations */}
                <style>{`
                    @keyframes slideInLeft {
                        from { opacity: 0; transform: translateX(-50px); }
                        to   { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes slideInRight {
                        from { opacity: 0; transform: translateX(50px); }
                        to   { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes fadeSlideUp {
                        from { opacity: 0; transform: translateY(14px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </section>



            {/* ── 9. Warning Signs & Red Flags ── */}
            <section className="bg-[#fff5ec]/50 py-16 md:py-24 border-t border-b border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* PART 2: Red Flags When Choosing a Doctor */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="block w-8 h-px bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase">
                                {warningSigns?.sectionLabel || "Warning Signs"}
                            </span>
                        </div>
                        <div className="max-w-3xl mb-8 md:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                                {warningSigns?.heading || `Red flags when choosing a hair transplant doctor${doctorCity ? ` in ${doctorCity}` : ""}`}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 font-sans">
                                {warningSigns?.description || "If you encounter any of the following at a clinic, walk away. Corrective surgery after a poor procedure costs far more than getting it right the first time."}
                            </p>
                        </div>

                        {/* 6-Grid Box (Red Theme matching Image 1 layout) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 border border-red-200 rounded-3xl overflow-hidden bg-red-200/60 gap-px mb-8 shadow-sm">
                            {resolvedRedFlags.map((flag, i) => (
                                <div
                                    key={i}
                                    className="group bg-white hover:bg-[#D32F2F] transition-all duration-300 p-7 md:p-8 flex flex-col gap-4 justify-between"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight font-sans">
                                            {flag.num}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">
                                            {flag.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-1.5 transition-colors leading-snug">
                                            {flag.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors font-sans">
                                            {flag.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom row matching Image 1 layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#D32F2F] shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 mb-0.5">Doctor-Led Surgery Standard</p>
                                    <p className="text-xs text-gray-500 font-sans leading-relaxed">
                                        {doctor.name || "Our lead surgeon"} personally designs every hairline & performs key extraction and incision steps.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-900 mb-0.5">Clear Your Doubts Before Booking</p>
                                    <p className="text-xs text-gray-500 font-sans">{docDisplayPhone} · Direct Scalp & Case Consultation</p>
                                </div>
                                <a
                                    href={waDoctorLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-xs transition-all shrink-0 shadow-sm"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Speak to Doctor Red Flags", buttonLocation: "Merged Red Flags Section" })}
                                >
                                    Speak to Doctor <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── 11. Procedures Our Hair Transplant Doctors Perform ── */}
            <section className="bg-white py-16 md:py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text={proceduresPerformed?.sectionLabel || "Procedures Offered"} />
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                        {proceduresPerformed?.heading || `Procedures our hair transplant doctors${doctorCity ? ` in ${doctorCity}` : ""} perform`}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-sans mb-12">
                        {proceduresPerformed?.description || "Advanced surgical hair restoration and non-surgical therapies personally performed by certified doctors."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(proceduresPerformed?.cards?.length > 0 ? proceduresPerformed.cards : [
                            { title: "Sapphire FUE Hair Transplant", description: "Microscopic Sapphire blades creating dense, natural recipient channels.", url: citySlug ? `/surgery/hair-transplant-surgery-in-${citySlug}` : "/surgery" },
                            { title: "Turkish Technique (THI) Direct Implantation", description: "Direct Choi implanter pen insertion with zero channel pre-cutting.", url: citySlug ? `/surgery/hair-transplant-surgery-in-${citySlug}` : "/surgery" },
                            { title: "Hairline Design & Micro-Dense Packing", description: "Artistic single-hair front rank feathering tailored to facial symmetry.", url: citySlug ? `/surgery/hair-transplant-surgery-in-${citySlug}` : "/surgery" },
                            { title: "Beard & Moustache Transplant", description: "Precision facial hair extraction and high-angle density restoration.", url: "/beard-transplant" },
                            { title: "PRP Hair Loss Therapy", description: "Doctor-administered platelet-rich plasma growth factor injections.", url: citySlug ? `/prp-hair-loss-treatment-in-${citySlug}` : "/prp-treatment" },
                            { title: "Revision Hair Transplant Repair", description: "Correcting pluggy hairlines, misdirected grafts, and depleted donor zones.", url: citySlug ? `/surgery/hair-transplant-surgery-in-${citySlug}` : "/surgery" },
                        ]).map((p, i) => {
                            const getProcedureUrl = (title) => {
                                const t = (title || "").toLowerCase();
                                if (t.includes("beard")) return "/beard-transplant";
                                if (t.includes("prp")) return citySlug ? `/prp-hair-loss-treatment-in-${citySlug}` : "/prp-treatment";
                                return citySlug ? `/surgery/hair-transplant-surgery-in-${citySlug}` : "/surgery";
                            };
                            const href = p.url || getProcedureUrl(p.title);
                            return (
                                <div key={i} className="bg-[#FAF6F3] rounded-3xl p-6 border border-[#E8E4DF] hover:border-red-200 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center mb-4">
                                        <Scissors className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                                    <p className="text-xs text-gray-600 font-sans leading-relaxed mb-4">{p.desc || p.description}</p>
                                    <a href={href} className="inline-flex items-center gap-1.5 text-[#D32F2F] text-xs font-bold hover:underline">
                                        Explore Procedure <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>



            {/* ── 11. Procedures Step-by-Step — Interactive Stepper ───────── */}
            <section className="py-16 md:py-24 bg-[#fff5ec] border-y border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-white border border-red-200 px-4 py-1.5 rounded-full mb-5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-xs font-extrabold tracking-widest uppercase">
                                {surgicalProcess?.sectionLabel || "Surgical Process"}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            {surgicalProcess?.heading || `What your hair transplant doctor${doctorCity ? ` in ${doctorCity}` : ""} does at every stage`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5 font-sans">
                            {surgicalProcess?.description || `Every stage of your hair restoration procedure is personally performed by ${doctor.name || "our lead surgeon"} to ensure ${doctor.successRate ? `${doctor.successRate} ` : ""}graft survival and natural hairline aesthetics.`}
                        </p>
                    </div>

                    {/* ── Stepper Container ── */}
                    <div className="bg-white rounded-xl overflow-hidden">

                        {/* ── Step Progress Bar (top row) ── */}
                        <div className="px-8 pt-10 pb-8 border-b border-gray-100">
                            <div className="flex items-start justify-between relative">

                                {/* connecting line track — behind everything */}
                                <div className="absolute left-5 right-5 top-5 h-0.5 flex" style={{ zIndex: 0 }}>
                                    {resolvedProcessSteps.map((_, idx, arr) => {
                                        if (idx === arr.length - 1) return null;
                                        return (
                                            <div
                                                key={idx}
                                                className="flex-1 h-full transition-all duration-500"
                                                style={{ backgroundColor: activeStep > idx ? "#D32F2F" : "#e5e7eb" }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Step circles + labels */}
                                {resolvedProcessSteps.map((step, idx) => {
                                    const isActive = activeStep === idx;
                                    const isCompleted = activeStep > idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveStep(idx)}
                                            className="flex flex-col items-center gap-3 relative z-10 group flex-1"
                                        >
                                            {/* Circle */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 shadow-sm
                                            ${isActive
                                                        ? "bg-[#D32F2F] border-[#D32F2F] text-white scale-110 ring-4 ring-red-100 shadow-red-200 shadow-md"
                                                        : isCompleted
                                                            ? "bg-[#D32F2F] border-[#D32F2F] text-white"
                                                            : "bg-white border-gray-200 text-gray-400 group-hover:border-[#D32F2F] group-hover:text-[#D32F2F]"
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <Check className="w-4 h-4 text-white stroke-[3]" />
                                                ) : (
                                                    <span className="text-xs">{step.num}</span>
                                                )}
                                            </div>
                                            {/* Label */}
                                            <span
                                                className={`text-[10px] sm:text-xs font-semibold text-center leading-snug hidden sm:block px-1 transition-colors duration-200
                                            ${isActive ? "text-[#D32F2F]" : "text-gray-400 group-hover:text-gray-600"}`}
                                            >
                                                {step.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Step Content Cards Row ── */}
                        <div className="grid grid-cols-1 sm:grid-cols-5 border-b border-gray-100">
                            {resolvedProcessSteps.map((step, idx) => {
                                const isActive = activeStep === idx;
                                const isCompleted = activeStep > idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveStep(idx)}
                                        className={`text-left p-6 flex flex-col gap-2.5 transition-all duration-300 group border-r border-gray-100 last:border-r-0 relative
                                    ${isActive
                                                ? "bg-red-50"
                                                : "bg-white hover:bg-gray-50"
                                            }`}
                                    >
                                        {/* Active top accent */}
                                        {isActive && (
                                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#D32F2F]" />
                                        )}

                                        {/* Step number badge */}
                                        <div className="flex items-center justify-between mb-1" aria-hidden="true">
                                            <span className={`text-xs font-black tracking-widest
                                        ${isActive ? "text-[#D32F2F]" : isCompleted ? "text-gray-300" : "text-gray-300 group-hover:text-gray-400"}`}>
                                                {step.num}
                                            </span>
                                            <span className={`text-[9px] font-bold uppercase tracking-widest
                                        ${isActive ? "text-[#D32F2F]" : "text-gray-300"}`}>
                                                STEP {idx + 1}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-sm font-extrabold leading-snug transition-colors duration-200
                                    ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-800"}`}>
                                            {step.title}
                                        </h3>

                                        {/* Body — only visible on active */}
                                        <p className={`text-xs leading-relaxed transition-all duration-300 overflow-hidden font-sans
                                    ${isActive ? "text-gray-500 max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                            {step.body}
                                        </p>

                                        {/* Doctor-Led tag */}
                                        <div className={`flex items-center gap-1 text-[10px] font-bold pt-2 mt-auto border-t transition-colors duration-200
                                    ${isActive ? "border-red-100 text-[#D32F2F]" : "border-gray-100 text-gray-300 group-hover:text-gray-400"}`}>
                                            <span>Doctor-Led Step</span>
                                            <ArrowRight className={`w-3 h-3 transition-transform duration-200 ${isActive ? "translate-x-0.5" : ""}`} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Bottom CTA strip ── */}
                        <div className="bg-[#D32F2F] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                                <p className="text-white text-sm font-semibold">
                                    Ready to discuss your hairline design directly with {doctor.name || "our surgeon"}?
                                </p>
                            </div>
                            <a
                                href={waDoctorLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-[#D32F2F] font-bold py-3 px-6 rounded-xl text-xs hover:bg-red-50 transition-colors shrink-0"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Step Process Book", buttonLocation: "Doctor Step Process" })}
                            >
                                Book Surgical Scalp Analysis <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                    </div>

                    {/* Internal links */}
                    <div className="flex flex-wrap gap-2.5 items-center text-sm text-gray-500 mt-8">
                        <span>Learn more:</span>
                        <a
                            href={`/hair-transplant-in-${citySlug || "delhi"}`}
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            hair transplant in {doctorCity || "Delhi"}
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href={`/surgery/hair-transplant-surgery-in-${citySlug || "delhi"}`}
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            hair transplant surgery in {doctorCity || "Delhi"}
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href={`/surgeon/hair-transplant-surgeon-in-${citySlug || "delhi"}`}
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            best hair transplant surgeon in {doctorCity || "Delhi"}
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href={`/treatments/hair-fall-loss-treatment-in-${citySlug || "delhi"}`}
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            Hair Fall & Hair Loss Treatment in {doctorCity || "Delhi"}
                        </a>
                    </div>
                </div>
            </section>



            {/* ── 13. Location ─────────────────────────────────────────── */}
            <section className="bg-white py-16 md:py-24 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase">
                            {visitClinic?.sectionLabel || "Visit Us"}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-12">
                        {visitClinic?.heading || (doctorCity ? `Visiting Ryan Clinic in ${doctorCity}` : "Visit Ryan Clinic")}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* Left Column: Address, Phone, Hours & Service Tags */}
                        <div className="space-y-6">
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-sans">
                                {visitClinic?.description || (doctorCity ? `Our centre is convenient for patients across ${doctorCity}.` : "Our centre is convenient for patients across the region.")}
                                {resolvedNearbyAreas.length > 0 ? ` Serving patients from ${resolvedNearbyAreas.slice(0, 6).join(", ")}.` : ""}
                            </p>

                            {/* Address Box */}
                            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                                <div className="bg-[#1a1430] px-6 py-3.5 flex items-center justify-between">
                                    <p className="text-white font-bold text-sm">
                                        {visitClinic?.heading || (doctorCity ? `Ryan Clinic — ${doctorCity}` : "Ryan Clinic")}
                                    </p>
                                    <span className="inline-flex items-center gap-1 bg-[#D32F2F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        Open Daily
                                    </span>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0 mt-0.5">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-400 mb-0.5 font-sans">Clinic Address</p>
                                            <p className="text-gray-700 text-xs font-semibold leading-relaxed">
                                                {visitClinic?.address?.streetAddress || doctor.basicInfo?.clinicAddress || (doctorCity ? `Ryan Clinic, ${doctorCity}` : "Contact clinic for address")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3.5 border-t border-gray-100 pt-3.5">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-0.5 font-sans">Phone / Appointments</p>
                                            <a
                                                href={docTelHref}
                                                className="text-[#D32F2F] text-sm hover:underline font-extrabold"
                                            >
                                                {docDisplayPhone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3.5 border-t border-gray-100 pt-3.5">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-0.5 font-sans">Consultation Hours</p>
                                            <p className="text-gray-700 text-xs font-semibold">Monday – Sunday, 9:00 AM – 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nearby areas tags */}
                            {resolvedNearbyAreas.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                                        Serving Patients From All Areas
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {resolvedNearbyAreas.map((area, i) => (
                                            <span
                                                key={i}
                                                className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full cursor-default"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Normal Sized Clean Map Card */}
                        {(() => {
                            const rawMapUrl = visitClinic?.mapUrl || "";
                            const clinicAddress = visitClinic?.address?.address || doctor.basicInfo?.clinicAddress || "";
                            const embedSrc = getGoogleMapsEmbedUrl({ mapUrl: rawMapUrl, clinicAddress, city: doctorCity });
                            const directLink = getGoogleMapsDirectUrl({ mapUrl: rawMapUrl, clinicAddress, city: doctorCity });

                            return (
                                <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
                                    <iframe
                                        src={embedSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Ryan Clinic${doctorCity ? ` ${doctorCity}` : ""} location map`}
                                        className="w-full h-full"
                                    />

                                    {/* Action Badge */}
                                    <a
                                        href={directLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-gray-200 shadow-md text-xs font-bold text-gray-800 hover:text-[#D32F2F] px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-[#D32F2F]" />
                                        Open in Google Maps
                                    </a>
                                </div>
                            );
                        })()}

                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 13B: Split CTA 3-Card Section (Home Page Style)
                Replaces the old dark consultation banner with the exact 3-card layout matching Image 1
            ═════════════════════════════════════════════════════════════════ */}
            {(() => {
                const verifiedPatientCase = Array.isArray(doctor.patientResults?.cases)
                    ? doctor.patientResults.cases.find((c) => (c.isPublic || c.isVerified) && (c.afterImage || c.image || c.beforeImage))
                    : null;

                return (
                    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <RevealSection>
                                <div className={`grid grid-cols-1 ${verifiedPatientCase ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6 items-stretch`}>
                                    
                                    {/* ── Left Card: Main CTA Copy ── */}
                                    <div className="flex flex-col justify-between bg-[#FAF6F3] rounded-3xl p-7 md:p-8 border border-[#E8E4DF] shadow-md">
                                        <div>
                                            <div className="flex items-center gap-2 mb-5">
                                                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                                <span className="text-[11px] font-extrabold text-[#D32F2F] uppercase tracking-[0.18em]">
                                                    Ryan Clinic
                                                </span>
                                            </div>

                                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-[1.2] tracking-tight mb-4">
                                                {consultation?.heading || `Book a consultation with our hair transplant doctor${doctorCity ? ` in ${doctorCity}` : ""}`}
                                            </h2>

                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                                                {consultation?.description || "Doctor-led Sapphire FUE & Turkish Technique hair restoration. Get your free scalp analysis, exact graft count & cost breakdown — zero obligation."}
                                            </p>

                                            {/* Mini Stats (Only show verified metrics) */}
                                            {(canonicalYearsExp || doctor.experience || doctor.rating) && (
                                                <div className="flex gap-6 mb-8">
                                                    {(canonicalYearsExp || doctor.experience) && (
                                                        <div>
                                                            <p className="text-2xl font-black text-[#D32F2F] leading-none">{canonicalYearsExp ? `${canonicalYearsExp}+ Yrs` : doctor.experience}</p>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Exp.</p>
                                                        </div>
                                                    )}
                                                    {doctor.rating && (
                                                        <div className={(canonicalYearsExp || doctor.experience) ? "border-l border-gray-200 pl-6" : ""}>
                                                            <p className="text-2xl font-black text-gray-900 leading-none">{doctor.rating}★</p>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Rating</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <a
                                                href={waDoctorLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-5 text-xs tracking-wide transition-all rounded-xl shadow-md hover:-translate-y-0.5 flex-1"
                                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Split CTA Book Consultation", buttonLocation: "Split CTA Section" })}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                Book Free Consultation
                                            </a>
                                            <a
                                                href={docTelHref}
                                                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-800 hover:text-[#D32F2F] font-bold py-3.5 px-5 text-xs tracking-wide transition-all rounded-xl"
                                                onClick={() => trackCTA({ type: "call", ctaName: "Split CTA Call Now", buttonLocation: "Split CTA Section" })}
                                            >
                                                <Phone className="w-4 h-4" />
                                                Call Now
                                            </a>
                                        </div>
                                    </div>

                                    {/* ── Center Card: Real Patient Result Image (Only if verified in CMS) ── */}
                                    {(() => {
                                        const verifiedCaseImgSrc = verifiedPatientCase
                                            ? (getValidImageSrc(verifiedPatientCase.afterImage) ||
                                               getValidImageSrc(verifiedPatientCase.image) ||
                                               getValidImageSrc(verifiedPatientCase.beforeImage))
                                            : null;
                                        if (!verifiedPatientCase || !verifiedCaseImgSrc) return null;
                                        return (
                                            <div className="relative rounded-3xl overflow-hidden min-h-[380px] bg-red-950 border border-red-900 shadow-lg group">
                                                <Image
                                                    src={verifiedCaseImgSrc}
                                                    alt={verifiedPatientCase.title || "Real patient hair transplant result at Ryan Clinic"}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    unoptimized
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-[#FFC107] text-black text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-md shadow-md">
                                                    OUR SPECIALIST
                                                </span>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                                <p className="text-white text-xs font-black uppercase tracking-wider">
                                                    REAL PATIENT RESULT
                                                </p>
                                                <p className="text-gray-300 text-[11px] font-sans mt-1">
                                                    {verifiedPatientCase.graftsCount ? `${verifiedPatientCase.graftsCount} grafts · ` : ""}
                                                    {verifiedPatientCase.technique || "Sapphire FUE"}{doctorCity ? ` · ${doctorCity}` : ""}
                                                </p>
                                            </div>
                                            </div>
                                        );
                                    })()}

                                    {/* ── Right Card: Why Ryan Clinic Feature Highlight ── */}
                                    <div className="flex flex-col justify-between bg-gradient-to-br from-[#D32F2F] to-red-700 rounded-3xl p-7 md:p-8 text-white shadow-xl">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-[11px] font-extrabold text-[#FFC107] uppercase tracking-[0.18em]">
                                                    {consultation?.rightCardBadge || "WHY RYAN CLINIC?"}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                    <ArrowRight className="w-4 h-4 text-white -rotate-45" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3">
                                                {consultation?.rightCardHeading || "Results So Natural — Nobody Will Know"}
                                            </h3>

                                            <p className="text-xs text-white/80 leading-relaxed mb-6 font-sans">
                                                {consultation?.rightCardDescription || "Every graft is placed with precise control over angle, depth & direction — mimicking your natural hair growth pattern exactly."}
                                            </p>

                                            <ul className="space-y-3 mb-8">
                                                {[
                                                    "Doctor-led Sapphire FUE & THI",
                                                    `${doctor.successRate || "High"} graft survival rate`,
                                                    "Natural hairline design matching facial symmetry",
                                                    "Structured post-operative care",
                                                ].map((item) => (
                                                    <li key={item} className="flex items-center gap-2.5 text-xs text-white font-semibold font-sans">
                                                        <span className="w-4.5 h-4.5 rounded-full bg-[#FFC107] flex items-center justify-center shrink-0">
                                                            <Check className="w-3 h-3 text-black stroke-[3]" />
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a
                                            href="/gallery"
                                            className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs transition-all border border-white/30 text-center"
                                            onClick={() => trackCTA({ type: "navigation", ctaName: "View All Patient Results", buttonLocation: "Split CTA Right Card" })}
                                        >
                                            View All Patient Results →
                                        </a>
                                    </div>

                                </div>
                            </RevealSection>
                        </div>
                    </section>
                );
            })()}

            {/* ── 14. FAQ ──────────────────────────────────────────────── */}
            <FAQSection
                faqs={faqs}
                heading={faqSection?.heading || `Frequently asked questions about hair transplant doctors${doctorCity ? ` in ${doctorCity}` : ""}`}
                sectionLabel={faqSection?.sectionLabel || "Got Questions?"}
                description={faqSection?.description || "Everything you need to know about hair transplant surgery at Ryan Clinic — costs, procedure, recovery and results. Still have a question? Our doctors answer within 24 hours."}
            />
        </>
    );
}







