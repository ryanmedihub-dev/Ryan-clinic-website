"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useTrackCTA from "@/lib/useTrackCTA";
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

const WA =
    "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation";
const TEL = "tel:+919911111247";

const branchData = {
    Delhi: {
        metro: "Pitampura Metro Station (Red Line)",
        areas: "Rohini, Shalimar Bagh, Ashok Vihar, Model Town, Punjabi Bagh, Paschim Vihar, and all of Delhi NCR.",
        addressTitle: "Ryan Clinic — Pitampura, New Delhi",
        addressLine1: "CD 163, Block CD, Dakshini Pitampura,",
        addressLine2: "Pitampura, New Delhi – 110034",
        mapQuery: "CD+163+Block+CD+Dakshini+Pitampura+New+Delhi+110034",
    },
    Mumbai: {
        metro: "Versova Metro Station (Line 1)",
        areas: "Andheri, Juhu, Lokhandwala, Bandra, Goregaon, Borivali, and all of Mumbai Suburban.",
        addressTitle: "Ryan Clinic — Andheri West, Mumbai",
        addressLine1: "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar,",
        addressLine2: "Andheri West, Mumbai – 400053",
        mapQuery: "MHADA+4+Bungalow+168+Phase+D+SV+Patel+Nagar+Andheri+West+Mumbai+400053",
    },
    Hyderabad: {
        metro: "Jubilee Hills Check Post Metro Station",
        areas: "Banjara Hills, Jubilee Hills, Gachibowli, Madhapur, Hitec City, Secunderabad, and all of Hyderabad.",
        addressTitle: "Ryan Clinic — Banjara Hills, Hyderabad",
        addressLine1: "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Above SBI Bank,",
        addressLine2: "Banjara Hills, Hyderabad – 500034",
        mapQuery: "2nd+Floor+8-2+316/A/6/A+Road+No+14+Banjara+Hills+Hyderabad+500034",
    },
};

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

function CTAButtons({ primary = "Book Free Consultation", center = false, doctorName = "" }) {
    const trackCTA = useTrackCTA();
    const waLink = doctorName
        ? `https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation`
        : WA;
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
                href={TEL}
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-6 text-sm tracking-wide transition-all rounded-xl"
                onClick={() => trackCTA({ type: "call", ctaName: "Doctor Page Call", buttonLocation: "Doctor Page Content" })}
            >
                Call +91-9911111247
            </a>
        </div>
    );
}

/* ─── Page Component ─────────────────────────────────────────────────────── */

export default function DoctorPageClient({ data }) {
    const trackCTA = useTrackCTA();
    const [openFaq, setOpenFaq] = useState(null);
    const [checkedSteps, setCheckedSteps] = useState([false, false, false, false, false]);
    const progressPercent = Math.round((checkedSteps.filter(Boolean).length / 5) * 100);
    const [activeCred, setActiveCred] = useState(0);
    const [openQuestion, setOpenQuestion] = useState(0);
    const [activeStep, setActiveStep] = useState(0);

    const {
        goodDoctorTraits,
        credentialsList,
        verifySteps,
        comparisonRows,
        doctorCredentials,
        doctorStages,
        questionsToAsk,
        greatDoctorTraits,
        redFlags,
        procedures,
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

    const activeBranch = branchData[doctor.location] || branchData.Delhi;
    const waDoctorLink = doctor
        ? `https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation`
        : WA;

    return (
        <>
            {/* ═════════════════════════════════════════════════════════════════
                SECTION 1 (HERO): Redesigned to match Image 2 with Red & White Brand Theme
            ═════════════════════════════════════════════════════════════════ */}
            <section className="bg-gradient-to-br from-red-50/40 via-white to-gray-50/60 py-16 md:py-24 relative overflow-hidden border-b border-red-100/60">
                {/* Background decorative ambient glows */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D32F2F]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                        {/* LEFT COLUMN: Badge + Big Title + Bio + Buttons + Review Stack */}
                        <div className="lg:col-span-6 flex flex-col justify-center lg:pr-10 xl:pr-14">

                            {/* Top Badge */}
                            <div className="self-start inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-red-200/80 rounded-full px-4 py-1.5 shadow-sm mb-6">
                                <span className="bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                    Ryan Clinic
                                </span>
                                <span className="text-xs font-extrabold text-gray-900">
                                    {doctor.designation || "Specialist Hair Restoration Surgeon"}
                                </span>
                            </div>

                            {/* Main Display Headline */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.15] tracking-tight mb-4">
                                Meet <span className="text-[#D32F2F]">{doctor.name}</span><br />
                                Hair Restoration <span className="text-[#D32F2F]">Specialist</span>
                            </h2>

                            {/* Medical Reviewer Byline (Only if explicitly verified in CMS) */}
                            {medicalReviewer?.isVerified && medicalReviewer?.reviewerName && (
                                <div className="mb-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-1.5 rounded-lg font-sans self-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>
                                        Medically reviewed by <strong>{medicalReviewer.reviewerName}</strong>
                                        {medicalReviewer.qualifications ? `, ${medicalReviewer.qualifications}` : ""}
                                        {doctor.updatedAt ? ` · Updated ${new Date(doctor.updatedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}` : ""}
                                    </span>
                                </div>
                            )}

                            {/* Bio Paragraph */}
                            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans">
                                {doctor.about ? (
                                    doctor.about
                                ) : (
                                    <>
                                        <strong>{doctor.name}</strong> is dedicated to providing exceptional hair restoration and surgical precision you can trust with a patient-first approach in {doctor.location || "New Delhi"}.
                                    </>
                                )}
                            </p>

                            {/* Action Row: Schedule Appointment + Surgical Process */}
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <a
                                    href={waDoctorLink}
                                    className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-4 px-8 text-sm rounded-full shadow-lg shadow-red-700/20 hover:shadow-red-700/30 hover:-translate-y-0.5 transition-all duration-300"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Schedule Appointment", buttonLocation: "Hero Section" })}
                                >
                                    Schedule Appointment <ArrowRight className="w-4 h-4 bg-white/20 rounded-full p-0.5" />
                                </a>

                                <a
                                    href="/surgery/hair-transplant-surgery-in-delhi"
                                    className="inline-flex items-center gap-3 text-gray-900 hover:text-[#D32F2F] font-extrabold text-sm py-3 px-4 transition-colors group"
                                    onClick={() => trackCTA({ type: "navigation", ctaName: "Doctor Page How We Work", buttonLocation: "Hero Section" })}
                                >
                                    <span className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shrink-0">
                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                    </span>
                                    <span className="underline underline-offset-4 decoration-red-300 font-bold">Surgical Process</span>
                                </a>
                            </div>

                            {/* Social Proof Stack (Star Rating) */}
                            {doctor.rating && (
                                <div className="flex items-center gap-3 pt-6 border-t border-red-100 max-w-lg">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-700 font-sans">
                                        <strong className="text-gray-900 font-bold">{doctor.rating}★</strong> Verified Doctor Rating
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Doctor Portrait with Card & Red/White Decorative Ring */}
                        <div className="lg:col-span-6 relative flex items-center justify-center pt-4 pb-8 lg:pl-6">

                            {/* Decorative Concentric Ring Artwork */}
                            <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full border-2 border-dashed border-red-200/80 pointer-events-none animate-[spin_60s_linear_infinite]" />
                            <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-red-100 pointer-events-none" />
                            <div className="absolute w-[380px] h-[380px] sm:w-[460px] sm:h-[460px] rounded-full bg-red-50/40 blur-2xl pointer-events-none" />

                            {/* Floating Badge 1: Top-Left Icon Badge */}
                            <div className="absolute top-2 left-0 sm:-left-2 z-20 w-13 h-13 rounded-full bg-[#D32F2F] text-white flex items-center justify-center shadow-xl border-2 border-white hover:scale-110 transition-transform">
                                <Stethoscope className="w-6 h-6" />
                            </div>

                            {/* Main Doctor Image Card — ENLARGED SIZE */}
                            <div className="relative z-10 w-[340px] h-[440px] sm:w-[410px] sm:h-[510px] rounded-[52px] overflow-hidden bg-gradient-to-b from-gray-100 via-red-50/30 to-red-100/60 border-4 border-white shadow-2xl group">
                                <Image
                                    src={doctor.image}
                                    alt={`Expert hair transplant doctor ${doctor.name}`}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    unoptimized
                                    priority
                                    sizes="(max-width: 640px) 340px, 410px"
                                />

                                {/* Subtle Overlay at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-5 left-5 right-5 text-center">
                                    <p className="text-white font-black text-xl md:text-2xl leading-tight">{doctor.name}</p>
                                    <p className="text-red-200 text-xs font-semibold mt-0.5">{doctor.designation || "Chief Hair Transplant Surgeon"}</p>
                                </div>
                            </div>

                            {/* Floating Stats Pill at Bottom — Only show non-null verified metrics */}
                            {(doctor.experience || doctor.proceduresCount || doctor.successRate) && (
                                <div className="absolute -bottom-4 z-20 bg-white/95 backdrop-blur-md border border-red-100 rounded-2xl p-3.5 px-6 shadow-xl flex items-center gap-5 text-center">
                                    {doctor.experience && (
                                        <div>
                                            <p className="text-lg font-black text-[#D32F2F] leading-none">{doctor.experience}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Exp.</p>
                                        </div>
                                    )}
                                    {doctor.experience && doctor.proceduresCount && <div className="w-px h-7 bg-gray-200" />}
                                    {doctor.proceduresCount && (
                                        <div>
                                            <p className="text-lg font-black text-gray-900 leading-none">{doctor.proceduresCount}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Surgeries</p>
                                        </div>
                                    )}
                                    {doctor.proceduresCount && doctor.successRate && <div className="w-px h-7 bg-gray-200" />}
                                    {doctor.successRate && (
                                        <div>
                                            <p className="text-lg font-black text-[#D32F2F] leading-none">{doctor.successRate}</p>
                                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Graft Survival</p>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 1C: Verified Key Facts Grid (Dynamic CMS Data)
            ═════════════════════════════════════════════════════════════════ */}
            {keyFacts && Object.values(keyFacts).some(Boolean) && (
                <section className="bg-white py-12 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#FAF6F3] rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-xs">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900">
                                    Verified Doctor &amp; Clinic Key Facts
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
                                {keyFacts.qualifications && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Qualifications</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.qualifications}</p>
                                    </div>
                                )}
                                {keyFacts.registration && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Medical Registration</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.registration}</p>
                                    </div>
                                )}
                                {keyFacts.specialisation && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Specialisation</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.specialisation}</p>
                                    </div>
                                )}
                                {keyFacts.experience && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Surgical Experience</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.experience}</p>
                                    </div>
                                )}
                                {keyFacts.procedures && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Case Volume</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.procedures}</p>
                                    </div>
                                )}
                                {keyFacts.memberships && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Council / Memberships</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.memberships}</p>
                                    </div>
                                )}
                                {keyFacts.location && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Clinic Location</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.location}</p>
                                    </div>
                                )}
                                {keyFacts.consultation && (
                                    <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-2xs">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Consultation</p>
                                        <p className="text-xs font-extrabold text-gray-900 leading-snug">{keyFacts.consultation}</p>
                                    </div>
                                )}
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
                                {whyItMatters.image ? (
                                    <Image
                                        src={whyItMatters.image}
                                        alt={whyItMatters.imageAlt || `${doctor.name} — doctor-led hair transplant`}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <Image
                                        src="/uploads/turkey-doctor.jpg"
                                        alt={`${doctor.name} — doctor-led hair transplant`}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                )}
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
                                                href={whyItMatters.secondaryCTA.url || TEL}
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
                SECTION 2: Credentials & Verification (Redesigned & Clean)
            ═════════════════════════════════════════════════════════════════ */}
            <section id="credentials" className="bg-[#FAF6F3] py-16 md:py-24 border-b border-gray-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Header (Left Aligned) */}
                    <div className="max-w-3xl mb-12 text-left">
                        <SectionLabel text="Verification & Credentials" />
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight mt-1 mb-3">
                            {credentials?.heading || "Credentials to look for in a hair transplant doctor in Delhi"}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base font-sans leading-relaxed">
                            What matters is genuine hair-restoration training, real surgical experience, and verifiable qualifications in {doctor.location || "New Delhi"}.
                        </p>
                    </div>

                    {/* 2-Column Layout (Equal Height Cards) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                        {/* LEFT COLUMN: 5 Essential Credentials Accordion */}
                        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-md flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                    <ShieldCheck className="w-5 h-5 text-[#D32F2F]" />
                                    <h3 className="text-lg font-bold text-gray-900">5 Must-Have Doctor Credentials</h3>
                                </div>

                                {/* Accordion list */}
                                <div className="flex flex-col gap-2.5 mb-6">
                                    {[
                                        {
                                            title: "Medical Degree & Specialisation",
                                            hint: "MBBS + MS / Dermatology",
                                            desc: "Recognised MBBS and postgraduate training in surgery, dermatology, or dedicated hair-transplant specialisation.",
                                            icon: <GraduationCap className="w-4 h-4 text-[#D32F2F]" />,
                                            image: "/uploads/turkey-doctor.jpg",
                                        },
                                        {
                                            title: "Medical Board Registration",
                                            hint: "Verifiable via DMC / NMC",
                                            desc: "Active and verifiable registration with the state or national medical council with an official registration number.",
                                            icon: <ShieldCheck className="w-4 h-4 text-[#D32F2F]" />,
                                            image: "/uploads/about-one.jpg",
                                        },
                                        {
                                            title: "Technique Certification",
                                            hint: "Sapphire FUE & Turkish Technique Choi Pen",
                                            desc: "Specific advanced certification in Sapphire FUE and Turkish Technique techniques personally performed by the doctor.",
                                            icon: <Award className="w-4 h-4 text-[#D32F2F]" />,
                                            image: "/uploads/service-two.jpg",
                                        },
                                        {
                                            title: "Surgical Case Volume",
                                            hint: "1,000+ documented procedures",
                                            desc: "Years of active surgical practice with a high count of personally completed hair restoration procedures.",
                                            icon: <Users className="w-4 h-4 text-[#D32F2F]" />,
                                            image: "/uploads/service-three.jpg",
                                        },
                                        {
                                            title: "Professional Memberships",
                                            hint: "ISHRS / ABHRS Accredited",
                                            desc: "Memberships in globally respected bodies like ISHRS — guaranteeing ongoing surgical education and ethics.",
                                            icon: <Globe className="w-4 h-4 text-[#D32F2F]" />,
                                            image: "/uploads/gallery.jpg",
                                        },
                                    ].map((tab, i) => (
                                        <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
                                            <button
                                                onClick={() => setActiveCred(activeCred === i ? -1 : i)}
                                                className={`w-full text-left flex items-center justify-between p-4 transition-all ${activeCred === i
                                                        ? "bg-red-50/50 text-gray-900 font-bold"
                                                        : "bg-gray-50/50 hover:bg-gray-50 text-gray-700"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-white text-[#D32F2F] flex items-center justify-center font-black text-xs shadow-xs border border-red-100 shrink-0">
                                                        0{i + 1}
                                                    </span>
                                                    <div>
                                                        <span className="text-sm font-bold block">{tab.title}</span>
                                                        <span className="text-[11px] text-gray-400 font-normal">{tab.hint}</span>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-4 h-4 text-[#D32F2F] transition-transform ${activeCred === i ? "rotate-180" : ""}`} />
                                            </button>

                                            {activeCred === i && (
                                                <div className="p-4 bg-white border-t border-red-100 flex flex-col sm:flex-row gap-4 items-center">
                                                    <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                                        <Image src={tab.image} alt={tab.title} fill className="object-cover" unoptimized />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600 leading-relaxed font-sans mb-2">{tab.desc}</p>
                                                        <a href="#credentials" className="text-[11px] font-bold text-[#D32F2F] hover:underline inline-flex items-center gap-1">
                                                            Verify doctor credentials <ArrowRight className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Why credentials matter note pinned to bottom */}
                            <div className="mt-auto pt-4 p-4 rounded-2xl bg-red-50/60 border border-red-100 text-xs text-gray-700 flex items-start gap-3 font-sans">
                                <AlertTriangle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
                                <span>
                                    <strong>Important Note:</strong> Uncredentialed technicians performing extraction risk permanent graft damage. Always confirm your procedure is 100% doctor-led.
                                </span>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Interactive Verification Checklist Card */}
                        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E4DF] shadow-md flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {verification?.heading || "How to verify a hair transplant doctor's credentials in Delhi"}
                                        </h2>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                                        {progressPercent}% Verified
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 mb-4 font-sans">
                                    Tick off each item before booking your hair transplant procedure:
                                </p>

                                {/* Progress bar */}
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-6">
                                    <div
                                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>

                                {/* Checkable List */}
                                <div className="space-y-2.5 mb-8">
                                    {[
                                        "Requested doctor's full name & medical council registration number",
                                        "Verified active registration on DMC / NMC government portal",
                                        "Confirmed doctor personally performs extraction & implantation",
                                        "Reviewed before/after portfolio of doctor's own real patients",
                                        "Checked verified reviews on Google or independent platforms",
                                    ].map((task, i) => (
                                        <label
                                            key={i}
                                            className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${checkedSteps[i]
                                                    ? "bg-emerald-50/60 border-emerald-200 text-gray-900"
                                                    : "bg-[#FAF6F3] border-[#EDE9E4] hover:border-gray-300 text-gray-700"
                                                }`}
                                            onClick={() => {
                                                const n = [...checkedSteps];
                                                n[i] = !n[i];
                                                setCheckedSteps(n);
                                            }}
                                        >
                                            <div
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checkedSteps[i]
                                                        ? "bg-emerald-600 border-emerald-600 text-white"
                                                        : "border-gray-300 bg-white"
                                                    }`}
                                            >
                                                {checkedSteps[i] && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-xs font-medium leading-relaxed font-sans ${checkedSteps[i] ? "line-through text-gray-400" : "text-gray-700"}`}>
                                                {task}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Action CTA pinned to bottom */}
                            <div className="mt-auto pt-4">
                                <a
                                    href={waDoctorLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md hover:-translate-y-0.5"
                                >
                                    Book Consultation with {doctor.name} <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Dark Banner End of Unit ── */}
                    <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a1430] to-[#302658] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#D32F2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="relative z-10">
                            <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                                Credentials Check
                            </span>
                            <h4 className="font-extrabold text-white text-lg md:text-xl leading-tight">
                                Want to check doctor credentials yourself?
                            </h4>
                            <p className="text-white/70 text-xs md:text-sm mt-1 max-w-xl font-sans">
                                We assist you in verifying registration numbers and sharing genuine ISHRS portfolio links.
                            </p>
                        </div>
                        <div className="shrink-0 relative z-10 w-full md:w-auto">
                            <a
                                href="#credentials"
                                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-colors w-full justify-center shadow-lg hover:shadow-red-900/20"
                                onClick={() => trackCTA({ type: "navigation", ctaName: "Doctor Page Verify Surgeon", buttonLocation: "Doctor Credentials Section" })}
                            >
                                Verify Doctor Credentials →
                            </a>
                        </div>
                    </div>
                </div>
            </section>



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
                            {doctorStandards?.heading || "What makes a good hair transplant doctor in Delhi?"}
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

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 3B: Surgeon Profile & Bio (Enhanced Layout)
                Left: All Content (About, Philosophy, Achievements, Consultation Includes)
                Right: Sticky Doctor Image Card with Achievements & Stats
            ═════════════════════════════════════════════════════════════════ */}
            {(surgeonProfile?.about || surgeonProfile?.achievements?.length > 0) && (
            <section className="bg-[#FAF6F3] py-16 md:py-24 border-b border-gray-200/80 relative" suppressHydrationWarning>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" suppressHydrationWarning>

                        {/* LEFT: All Content (About, Philosophy, Key Achievements, Consultation Includes) */}
                        <div className="lg:col-span-6 flex flex-col gap-6">
                            <RevealSection>
                                <SectionLabel text={surgeonProfile?.sectionLabel || "Your Surgeon"} />
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mt-1 mb-5">
                                    {surgeonProfile?.heading || "Meet the hair transplant doctors at Ryan Clinic, Delhi"}
                                </h2>
                                {surgeonProfile.about && (
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans mb-6">
                                        {surgeonProfile.about}
                                    </p>
                                )}
                                {surgeonProfile.philosophy && (
                                    <div className="bg-white rounded-2xl border border-[#E8E4DF] p-5.5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0 mt-0.5">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-widest mb-1">Surgical Philosophy</p>
                                            <p className="text-gray-700 text-sm leading-relaxed font-sans">{surgeonProfile.philosophy}</p>
                                        </div>
                                    </div>
                                )}
                            </RevealSection>

                            {/* Key Achievements */}
                            {surgeonProfile.achievements?.length > 0 && (
                                <RevealSection delay={80}>
                                    <div className="bg-white rounded-3xl border border-[#E8E4DF] p-6 sm:p-7 shadow-sm">
                                        <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                                            <Award className="w-5 h-5 text-[#D32F2F]" />
                                            Key Achievements
                                        </h3>
                                        <div className="space-y-3.5">
                                            {surgeonProfile.achievements.map((ach, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                                                    </div>
                                                    <p className="text-sm text-gray-700 font-sans leading-relaxed">
                                                        {typeof ach === "string" ? ach : `${ach.title || ""}${ach.description ? `: ${ach.description}` : ""}`}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </RevealSection>
                            )}

                            {/* Consultation Includes */}
                            <RevealSection delay={100}>
                                <div className="bg-white rounded-3xl border border-[#E8E4DF] shadow-sm p-6 sm:p-7">
                                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0">
                                            <Stethoscope className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Your Consultation Includes</h3>
                                    </div>
                                    {surgeonProfile.consultationIncludes?.length > 0 ? (
                                        <div className="space-y-3.5 mb-6">
                                            {surgeonProfile.consultationIncludes.map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <p className="text-sm text-gray-700 font-sans leading-snug">
                                                        {typeof item === "string" ? item : (item.title || "")}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-3.5 mb-6">
                                            {["Free scalp analysis & hair density assessment", "Exact graft count with personalized hairline design", "Transparent per-graft pricing — no hidden charges", "Full treatment roadmap & post-op protocol"].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                                                    <p className="text-sm text-gray-700 font-sans leading-snug">{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <a
                                        href={waDoctorLink}
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs transition-all shadow-md hover:-translate-y-0.5"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Book Free Consultation Surgeon Profile", buttonLocation: "Surgeon Profile Section" })}
                                    >
                                        Book Free Consultation <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </RevealSection>
                        </div>

                        {/* RIGHT: Enhanced Sticky Doctor Image Card with Achievements & Stats */}
                        <div className="lg:col-span-6 sticky top-28 self-start z-20">
                            <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black border-4 border-white shadow-2xl group">
                                
                                {/* Top Doctor Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified Lead Surgeon
                                    </span>
                                </div>

                                {/* Main Doctor Image */}
                                <div className="relative w-full h-[460px] sm:h-[520px]">
                                    <Image
                                        src={doctor.image || "/uploads/turkey-doctor.jpg"}
                                        alt={`${doctor.name} — Hair Transplant Surgeon`}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                </div>

                                {/* Overlay Content & Stats at Bottom of Image */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white space-y-4">
                                    <div>
                                        <h3 className="text-2xl font-black leading-tight text-white">{doctor.name}</h3>
                                        <p className="text-red-300 text-xs font-semibold mt-0.5">{doctor.designation || "Chief Hair Restoration Surgeon"}</p>
                                    </div>

                                    {/* Floating Doctor Stat Badges Grid */}
                                    <div className="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
                                        <div className="text-center">
                                            <p className="text-base font-black text-amber-400 leading-none">{doctor.experience || "—"}</p>
                                            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider mt-1">Exp.</p>
                                        </div>
                                        <div className="text-center border-x border-white/15">
                                            <p className="text-base font-black text-white leading-none">{doctor.proceduresCount || "—"}</p>
                                            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider mt-1">Surgeries</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-base font-black text-emerald-400 leading-none">{doctor.successRate || "—"}</p>
                                            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-wider mt-1">Survival</p>
                                        </div>
                                    </div>

                                    {/* Quick Action Button */}
                                    <a
                                        href={waDoctorLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 w-full bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-3 px-5 rounded-xl text-xs transition-all shadow-lg shadow-red-900/40 hover:-translate-y-0.5"
                                    >
                                        Consult {doctor.name} Directly <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            )}

            {/* ── 5. Comparison — Horizontal Split Cards ─────────────────── */}
            <section className="bg-[#F7F5F2] py-20 md:py-28 overflow-hidden relative">
                {/* Background glows */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header (Smaller Heading font size as requested) */}
                    <div className="mb-12">
                        <SectionLabel text="The Critical Difference" />
                        <div className="flex flex-col md:flex-row md:items-end gap-4 md:justify-between">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight max-w-2xl">
                                {comparison?.heading || "Doctor-led vs technician-led surgery in Delhi: the difference that defines your result"}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-sm md:text-right font-sans">
                                The person performing each step is what determines your result.
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
                                    src="/uploads/turkey-doctor.jpg"
                                    alt="Doctor-led hair transplant at Ryan Clinic"
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
                                        Doctor-Led
                                    </span>
                                </div>

                                {/* Floating stat */}
                                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-white">
                                    <p className="text-xl font-black text-emerald-600 leading-none">95%+</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Graft Survival</p>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-1 rounded-full bg-emerald-500 mb-3 group-hover:w-16 transition-all duration-500" />
                                    <div className="mb-4">
                                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-0.5">Ryan Clinic</h3>
                                        <p className="text-xs text-gray-500 font-sans">Every step personally performed by {doctor.name}</p>

                                        {/* Trust pills */}
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {[
                                                { v: doctor.experience || "—", l: "Exp" },
                                                { v: doctor.proceduresCount || "—", l: "Cases Done" },
                                                { v: "Medical Council", l: "Registered" },
                                            ].map((s, i) => (
                                                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
                                                    <span className="text-emerald-700 font-black text-[11px] leading-none">{s.v}</span>
                                                    <span className="text-emerald-600/70 text-[9px] font-semibold">{s.l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 4 Comparison rows */}
                                    <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50/40">
                                        {[
                                            ["Consultation & Scalp Analysis", "Doctor-Led"],
                                            ["Hairline Design & Planning", "Doctor-Led"],
                                            ["Graft Extraction (FUE)", "Doctor-Led"],
                                            ["Direct Graft Implantation", "Doctor-Led"],
                                        ].map(([step, drCol], i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between px-3.5 py-2 hover:bg-emerald-50/50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4.5 h-4.5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[9px] font-black text-emerald-600 shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-800 font-sans">{step}</span>
                                                </div>
                                                <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[11px] shrink-0">
                                                    <Check className="w-3 h-3 text-emerald-500 shrink-0" /> {drCol}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <a
                                    href={waDoctorLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="self-start inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Book with Ryan Clinic - Doctor-Led Card", buttonLocation: "Doctor-Led Comparison Section" })}
                                >
                                    Book with Ryan Clinic <ArrowRight className="w-3.5 h-3.5" />
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
                                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-0.5">What to Confirm Before You Book</h3>
                                        <p className="text-xs text-gray-500 font-sans">Verify doctor involvement across key surgical steps</p>

                                        {/* Checklist pills */}
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {[
                                                { v: "Confirm", l: "Doctor Presence" },
                                                { v: "Ask", l: "Surgical Role" },
                                                { v: "Verify", l: "Registration" },
                                            ].map((s, i) => (
                                                <div key={i} className="bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1 flex items-center gap-1">
                                                    <span className="text-rose-600 font-black text-[11px] leading-none">{s.v}</span>
                                                    <span className="text-rose-500/70 text-[9px] font-semibold">{s.l}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 4 Comparison rows */}
                                    <div className="divide-y divide-gray-100 rounded-xl overflow-hidden border border-gray-100 mb-4 bg-gray-50/40">
                                        {[
                                            ["Consultation & Scalp Analysis", "Ask if doctor conducts evaluation"],
                                            ["Hairline Design & Planning", "Confirm doctor plans hairline"],
                                            ["Graft Extraction (FUE)", "Ensure surgeon harvests grafts"],
                                            ["Direct Graft Implantation", "Verify doctor places grafts"],
                                        ].map(([step, techCol], i) => (
                                            <div
                                                key={i}
                                                className="flex items-center justify-between px-3.5 py-2 hover:bg-rose-50/40 transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-4.5 h-4.5 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[9px] font-black text-rose-500 shrink-0">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-800 font-sans">{step}</span>
                                                </div>
                                                <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-600 font-bold px-2 py-0.5 rounded-full text-[11px] shrink-0">
                                                    <CheckCircle2 className="w-3 h-3 text-rose-400 shrink-0" /> {techCol}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="flex items-start gap-2 bg-rose-50/70 border border-rose-100 rounded-xl p-3 font-sans">
                                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-rose-700 leading-relaxed">
                                        Always ask who conducts each step of your procedure before booking.
                                    </p>
                                </div>
                            </div>

                            {/* Right Image (Zig-Zag order 2 on lg screens) */}
                            <div className="lg:order-2 relative lg:w-[38%] shrink-0 h-52 lg:h-auto min-h-[220px] overflow-hidden">
                                <Image
                                    src="/uploads/service-one.jpg"
                                    alt="What to ask before choosing a hair transplant clinic"
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-[30%] group-hover:scale-105 transition-all duration-700"
                                    unoptimized
                                    sizes="38vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20 hidden lg:block" />
                                <div className="absolute inset-0 bg-rose-950/15" />

                                {/* Floating badge */}
                                <div className="absolute top-4 right-4 lg:left-auto lg:right-4">
                                    <span className="inline-flex items-center gap-1.5 bg-[#D32F2F] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                        <X className="w-3 h-3" />
                                        Technician-Led
                                    </span>
                                </div>

                                {/* Floating warning */}
                                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-white">
                                    <p className="text-xl font-black text-rose-600 leading-none">High Risk</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">Poor Outcomes</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom caption */}
                    <div className="mt-8 flex items-center gap-3 text-gray-400 text-xs font-sans">
                        <span className="w-8 h-px bg-gray-300 shrink-0" />
                        When you choose the best hair transplant doctor in {doctor.location || "Delhi"}, you&apos;re
                        really choosing who does each of these steps.
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



            {/* ── 8. Questions to Ask (Redesigned & Rich) ───────────────── */}
            <section className="bg-white py-16 md:py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* Left Column: Rich Interactive Questions Cards */}
                        <div className="lg:col-span-7">
                            <SectionLabel text={questionsToAskSection?.sectionLabel || "Questions to Ask"} />
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
                                {questionsToAskSection?.heading || "Questions to ask your hair transplant doctor in Delhi before booking"}
                            </h2>
                            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                                {questionsToAskSection?.description || "The quality of a doctor\u2019s answers tells you almost everything."}
                            </p>

                            {/* Question Cards List from CMS */}
                            <div className="space-y-4">
                                {(questionsToAskSection?.questions || []).length > 0 ? (
                                    (questionsToAskSection?.questions || []).map((q, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openQuestion === i
                                                    ? "bg-[#FAF6F3] border-red-200 shadow-md"
                                                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 shadow-xs"
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenQuestion(openQuestion === i ? -1 : i)}
                                                className="w-full text-left p-5 flex items-start justify-between gap-4 select-none"
                                            >
                                                <div className="flex items-start gap-3.5">
                                                    <span className="w-7 h-7 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-xs">
                                                        0{i + 1}
                                                    </span>
                                                    <div>
                                                        {q.tag && (
                                                            <span className="text-[10px] font-bold text-[#D32F2F] tracking-widest uppercase block mb-1">
                                                                {q.tag}
                                                            </span>
                                                        )}
                                                        <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug">
                                                            {q.question || q.q || ""}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-[#D32F2F] shrink-0 transition-transform duration-300 mt-1 ${openQuestion === i ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {openQuestion === i && (
                                                <div className="px-5 pb-5 pt-1 border-t border-red-100/80 font-sans space-y-3">
                                                    {q.answer && (
                                                        <p className="text-xs text-gray-600 leading-relaxed">
                                                            <strong className="text-gray-900 font-bold block mb-1">Why this matters:</strong>
                                                            {q.answer}
                                                        </p>
                                                    )}

                                                    {q.ryanStandard && (
                                                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                            <span className="text-xs font-semibold text-emerald-900 leading-tight">
                                                                {q.ryanStandard}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center text-xs text-gray-500 font-sans">
                                        No consultation questions configured in CMS.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar CTA (Right Column) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28">
                            <div className="rounded-3xl bg-[#1a1430] p-7 md:p-9 shadow-xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D32F2F]/10 rounded-full blur-3xl group-hover:bg-[#D32F2F]/20 transition-colors duration-500 pointer-events-none" />
                                <p className="text-[11px] font-bold uppercase tracking-widest text-[#D32F2F] mb-3">
                                    Ryan Clinic Guarantee
                                </p>
                                <h3 className="text-white font-extrabold text-2xl mb-6 leading-tight">
                                    We answer every one of these questions at your consultation
                                </h3>
                                <div className="space-y-3.5 mb-8">
                                    {[
                                        "Doctor performs every step personally",
                                        "Verifiable credentials & ISHRS membership",
                                        "10,000+ documented cases to show",
                                        "Transparent per-graft pricing",
                                        "Free 18-month follow-up",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                            <p className="text-white/90 text-xs sm:text-sm font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href={waDoctorLink}
                                        className="block text-center bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-3.5 px-6 text-xs sm:text-sm tracking-wide transition-all rounded-2xl w-full shadow-lg hover:shadow-red-900/30"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Book Free Consultation", buttonLocation: "Doctor Stage Section" })}
                                    >
                                        Book Free Consultation
                                    </a>
                                    <a
                                        href={TEL}
                                        className="block text-center border border-white/20 hover:bg-white/10 hover:border-white/40 text-white/90 font-extrabold py-3.5 px-6 text-xs sm:text-sm tracking-wide transition-all rounded-2xl w-full"
                                        onClick={() => trackCTA({ type: "call", ctaName: "Doctor Page Call", buttonLocation: "Doctor Stage Section" })}
                                    >
                                        Call +91-9911111247
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 9+10: MERGED — Doctor Excellence & Red Flags (Surgeon Page Grid Layout) ── */}
            <section className="bg-[#fff5ec]/50 py-16 md:py-24 border-t border-b border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">

                    {/* PART 1: What a Great Hair Transplant Doctor Does Differently */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="block w-8 h-px bg-emerald-600" />
                            <span className="text-emerald-600 text-[11px] font-extrabold tracking-[0.22em] uppercase">
                                Excellence Standard
                            </span>
                        </div>
                        <div className="max-w-3xl mb-8 md:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                                {greatDoctorQualities?.heading || "What a great hair transplant doctor in Delhi does differently"}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 font-sans">
                                Every stage of your treatment in {doctor.location || "New Delhi"} is personally performed with high medical rigor to optimize graft survival and natural hairline aesthetics.
                            </p>
                        </div>

                        {/* 6-Grid Box (Emerald Theme matching Image 1 layout) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 border border-emerald-200 rounded-3xl overflow-hidden bg-emerald-200/50 gap-px mb-6 shadow-sm">
                            {greatDoctorTraits.map((t, i) => (
                                <div
                                    key={i}
                                    className="group bg-white hover:bg-emerald-600 transition-all duration-300 p-7 md:p-8 flex flex-col gap-4 justify-between"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-light text-emerald-300 group-hover:text-white/30 transition-colors tracking-tight font-sans">
                                            0{i + 1}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 group-hover:bg-white/15 flex items-center justify-center text-emerald-600 group-hover:text-white transition-all duration-300">
                                            <Check className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-1.5 transition-colors leading-snug">
                                            {t.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 group-hover:text-emerald-50 leading-relaxed transition-colors font-sans">
                                            {t.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subtle Divider */}
                    <div className="border-t border-red-200/60" />

                    {/* PART 2: Red Flags When Choosing a Doctor */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="block w-8 h-px bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase">
                                Warning Signs
                            </span>
                        </div>
                        <div className="max-w-3xl mb-8 md:mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                                {warningSigns?.heading || "Red flags when choosing a hair transplant doctor in Delhi"}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-4 font-sans">
                                If you encounter any of the following at a clinic, walk away. Corrective surgery after a poor procedure costs far more than getting it right the first time.
                            </p>
                        </div>

                        {/* 6-Grid Box (Red Theme matching Image 1 layout) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 border border-red-200 rounded-3xl overflow-hidden bg-red-200/60 gap-px mb-8 shadow-sm">
                            {[
                                {
                                    num: "01",
                                    title: "No Named Doctor",
                                    desc: redFlags[0] || "No named, credentialed doctor anywhere on the website.",
                                    icon: <AlertTriangle className="w-5 h-5" />,
                                },
                                {
                                    num: "02",
                                    title: "Technician Delegation",
                                    desc: redFlags[1] || "No doctor present during the actual surgical procedure.",
                                    icon: <X className="w-5 h-5" />,
                                },
                                {
                                    num: "03",
                                    title: "Fake Credentials",
                                    desc: redFlags[2] || "Guaranteeing impossible hair density or 100% graft survival.",
                                    icon: <ShieldCheck className="w-5 h-5" />,
                                },
                                {
                                    num: "04",
                                    title: "High-Pressure Booking",
                                    desc: redFlags[3] || "Guaranteed results or pressure to book or pay immediately.",
                                    icon: <AlertTriangle className="w-5 h-5" />,
                                },
                                {
                                    num: "05",
                                    title: "Zero Patient Portfolio",
                                    desc: redFlags[4] || "No real before-and-afters of the doctor's own patients.",
                                    icon: <Scissors className="w-5 h-5" />,
                                },
                                {
                                    num: "06",
                                    title: "Inconsistent Information",
                                    desc: redFlags[5] || "Inconsistent claims across the website and advertisements.",
                                    icon: <X className="w-5 h-5" />,
                                },
                            ].map((flag, i) => (
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
                                    <p className="text-xs text-gray-500 font-sans">+91-9911111247 · Direct Scalp & Case Consultation</p>
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
                        {proceduresPerformed?.heading || "Procedures our hair transplant doctors in Delhi perform"}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-sans mb-12">
                        {proceduresPerformed?.description || "Advanced surgical hair restoration and non-surgical therapies personally performed by certified doctors."}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(proceduresPerformed?.cards?.length > 0 ? proceduresPerformed.cards : [
                            { title: "Sapphire FUE Hair Transplant", description: "Microscopic Sapphire blades creating dense, natural recipient channels.", url: "/surgery/hair-transplant-surgery-in-delhi" },
                            { title: "Turkish Technique (THI) Direct Implantation", description: "Direct Choi implanter pen insertion with zero channel pre-cutting.", url: "/surgery/hair-transplant-surgery-in-delhi" },
                            { title: "Hairline Design & Micro-Dense Packing", description: "Artistic single-hair front rank feathering tailored to facial symmetry.", url: "/surgery/hair-transplant-surgery-in-delhi" },
                            { title: "Beard & Moustache Transplant", description: "Precision facial hair extraction and high-angle density restoration.", url: "/beard-transplant" },
                            { title: "PRP Hair Loss Therapy", description: "Doctor-administered platelet-rich plasma growth factor injections.", url: "/prp-hair-loss-treatment-in-delhi" },
                            { title: "Revision Hair Transplant Repair", description: "Correcting pluggy hairlines, misdirected grafts, and depleted donor zones.", url: "/surgery/hair-transplant-surgery-in-delhi" },
                        ]).map((p, i) => {
                            const getProcedureUrl = (title) => {
                                const t = (title || "").toLowerCase();
                                if (t.includes("beard")) return "/beard-transplant";
                                if (t.includes("prp")) return "/prp-hair-loss-treatment-in-delhi";
                                return "/surgery/hair-transplant-surgery-in-delhi";
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

                    {/* Section Label + Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-white border border-red-200 px-4 py-1.5 rounded-full mb-5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-xs font-extrabold tracking-widest uppercase">
                                Surgical Process
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            {surgicalProcess?.heading || "What your hair transplant doctor in Delhi does at every stage"}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5 font-sans">
                            Every stage of your hair restoration procedure is personally performed by {doctor.name || "our lead surgeon"} to ensure 95%+ graft survival and natural hairline aesthetics.
                        </p>
                    </div>

                    {/* ── Stepper Container ── */}
                    <div className="bg-white rounded-xl overflow-hidden">

                        {/* ── Step Progress Bar (top row) ── */}
                        <div className="px-8 pt-10 pb-8 border-b border-gray-100">
                            <div className="flex items-start justify-between relative">

                                {/* connecting line track — behind everything */}
                                <div className="absolute left-5 right-5 top-5 h-0.5 flex" style={{ zIndex: 0 }}>
                                    {[
                                        { num: "01", title: "Consultation & Hairline Design", body: "The doctor personally maps your new hairline according to facial symmetry and marks donor and recipient zones for lifetime natural framing." },
                                        { num: "02", title: "Graft Extraction (FUE)", body: "Follicular units are harvested one by one from the safe donor area using precision micro-punches (0.7–0.9mm) to protect viability." },
                                        { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "Microscopic channels are opened using sharp gemstone sapphire blades, setting exact direction, angle, and radial depth." },
                                        { num: "04", title: "Direct Implantation (Turkish Technique)", body: "Using original Choi implanter pens, sorted grafts are loaded and placed directly into channels for maximum density without scalp trauma." },
                                        { num: "05", title: "18-Month Growth & Follow-Up", body: "Free structured follow-up check-ups at months 1, 3, 6, 12, and 18 ensure your hair growth progress is fully tracked." },
                                    ].map((_, idx, arr) => {
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
                                {[
                                    { num: "01", title: "Consultation & Hairline Design", body: "The doctor personally maps your new hairline according to facial symmetry and marks donor and recipient zones for lifetime natural framing." },
                                    { num: "02", title: "Graft Extraction (FUE)", body: "Follicular units are harvested one by one from the safe donor area using precision micro-punches (0.7–0.9mm) to protect viability." },
                                    { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "Microscopic channels are opened using sharp gemstone sapphire blades, setting exact direction, angle, and radial depth." },
                                    { num: "04", title: "Direct Implantation (Turkish Technique)", body: "Using original Choi implanter pens, sorted grafts are loaded and placed directly into channels for maximum density without scalp trauma." },
                                    { num: "05", title: "18-Month Growth & Follow-Up", body: "Free structured follow-up check-ups at months 1, 3, 6, 12, and 18 ensure your hair growth progress is fully tracked." },
                                ].map((step, idx) => {
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
                            {[
                                { num: "01", title: "Consultation & Hairline Design", body: "The doctor personally maps your new hairline according to facial symmetry and marks donor and recipient zones for lifetime natural framing." },
                                { num: "02", title: "Graft Extraction (FUE)", body: "Follicular units are harvested one by one from the safe donor area using precision micro-punches (0.7–0.9mm) to protect viability." },
                                { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "Microscopic channels are opened using sharp gemstone sapphire blades, setting exact direction, angle, and radial depth." },
                                { num: "04", title: "Direct Implantation (Turkish Technique)", body: "Using original Choi implanter pens, sorted grafts are loaded and placed directly into channels for maximum density without scalp trauma." },
                                { num: "05", title: "18-Month Growth & Follow-Up", body: "Free structured follow-up check-ups at months 1, 3, 6, 12, and 18 ensure your hair growth progress is fully tracked." },
                            ].map((step, idx) => {
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
                            href="/hair-transplant-in-delhi"
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            hair transplant in Delhi
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href="/surgery/hair-transplant-surgery-in-delhi"
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            hair transplant surgery in Delhi
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href="/best-hair-transplant-clinic-in-delhi"
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            best hair transplant clinic in Delhi
                        </a>
                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 12: Cost Section (Enhanced & Attractive Layout)
                Note: 100% of exact text and values are preserved.
            ═════════════════════════════════════════════════════════════════ */}
            <section id="pricing" className="bg-gradient-to-b from-gray-50/70 via-white to-red-50/20 py-16 md:py-24 relative overflow-hidden border-t border-gray-100">
                {/* Background decorative glow */}
                <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-red-100/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* LEFT: Text & CTAs */}
                        <div className="lg:col-span-6">
                            <RevealSection>
                                <SectionLabel text="Cost & Consultation" />
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                                    {pricing?.heading || "Cost of consulting a hair transplant doctor in Delhi"}
                                </h2>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 font-sans">
                                    {pricing?.description || "Consultation at Ryan Clinic includes a free scalp analysis — your doctor assesses your case and provides an exact graft count and transparent cost estimate."}
                                </p>
                                
                                {/* Micro trust pills */}
                                <div className="flex flex-wrap gap-2.5 mb-8">
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        Free Scalp Analysis
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                                        <ShieldCheck className="w-3.5 h-3.5 text-gray-600" />
                                        Written Cost Estimate
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href="/hair-transplant-cost-in-delhi"
                                        className="inline-flex items-center gap-2 text-[#D32F2F] font-bold text-sm hover:underline group"
                                    >
                                        Full cost breakdown <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <div>
                                        <CTAButtons primary="Get Free Cost Estimate" doctorName={doctor.name} />
                                    </div>
                                </div>
                            </RevealSection>
                        </div>

                        {/* RIGHT: Enhanced Pricing Breakdown Card */}
                        <div className="lg:col-span-6">
                            <RevealSection delay={80}>
                                <div className="rounded-3xl overflow-hidden border border-gray-200/90 shadow-xl bg-white p-2 md:p-3 hover:shadow-2xl transition-all duration-300">
                                    <div className="bg-[#1a1430] text-white px-6 py-4 rounded-2xl flex items-center justify-between mb-2">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-red-300 font-sans">Transparent Pricing Breakdown</p>
                                            <h3 className="text-lg font-extrabold text-white mt-0.5">Consultation & Surgery Rates</h3>
                                        </div>
                                        <span className="bg-[#D32F2F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                            Ryan Clinic
                                        </span>
                                    </div>

                                    <div className="divide-y divide-gray-100 font-sans">
                                        {[
                                            ["Consultation", "Free scalp analysis — no obligation"],
                                            ["Surgical Assessment", "Custom graft count & hairline planning"],
                                            ["Per-Graft Estimate", "Confirmed in writing at consultation"],
                                            ["Follow-Up Care", "Structured post-op follow-up included"],
                                            ["Pricing Transparency", "Fixed per-graft estimate with zero hidden extras"],
                                        ].map(([label, value], i) => (
                                            <div
                                                key={i}
                                                className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors ${
                                                    i % 2 === 0 ? "bg-gray-50/60 rounded-xl" : "bg-white"
                                                } hover:bg-red-50/30`}
                                            >
                                                <span className="font-bold text-gray-800 text-xs sm:text-sm w-full sm:w-[42%] flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                                                    {label}
                                                </span>
                                                <span className="text-xs sm:text-sm font-semibold text-gray-600">
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </RevealSection>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 12B: Pricing & Packages
            ═════════════════════════════════════════════════════════════════ */}
            {pricingPackages?.length > 0 && (
            <section className="bg-[#FAF6F3] py-16 md:py-24 border-t border-b border-gray-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealSection>
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <SectionLabel text="Transparent Pricing" />
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mt-1 mb-3">
                                Hair Transplant Cost in {doctor.location || "Delhi"}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base font-sans leading-relaxed">
                                Per-graft pricing — confirmed in writing at your free consultation. Zero hidden charges.
                            </p>
                        </div>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pricingPackages.map((pkg, i) => (
                            <RevealSection key={i} delay={i * 60}>
                                <div className={`relative bg-white rounded-3xl border shadow-md p-7 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                                    pkg.isFeatured ? "border-[#D32F2F] ring-2 ring-[#D32F2F]/20" : "border-[#E8E4DF]"
                                }`}>
                                    {pkg.isFeatured && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                                                {pkg.subtitle || "Most Popular"}
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{pkg.title}</h3>
                                        {pkg.subtitle && !pkg.isFeatured && (
                                            <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                                                {pkg.subtitle}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <p className="text-3xl font-black text-[#D32F2F] leading-none">{pkg.price}</p>
                                        <p className="text-xs text-gray-400 font-sans mt-1">{pkg.priceNote || "onwards"}</p>
                                    </div>
                                    {pkg.features?.length > 0 && (
                                        <div className="space-y-2 mb-6 flex-1">
                                            {pkg.features.map((f, j) => (
                                                <div key={j} className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <span className="text-xs text-gray-700 font-sans">
                                                        {typeof f === "string" ? f : (f.title || f.text || f.description || "")}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <a
                                        href={waDoctorLink}
                                        className={`mt-auto inline-flex items-center justify-center gap-2 font-bold py-3 px-5 rounded-xl text-xs transition-all ${
                                            pkg.isFeatured
                                                ? "bg-[#D32F2F] hover:bg-red-700 text-white shadow-md"
                                                : "border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F]"
                                        }`}
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: `Pricing: ${pkg.title}`, buttonLocation: "Pricing Section" })}
                                    >
                                        {pkg.buttonText || "Get Free Estimate"} <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </RevealSection>
                        ))}
                    </div>

                    {pricingDisclaimer && (
                        <p className="text-center text-xs text-gray-400 font-sans mt-8 max-w-2xl mx-auto">
                            {pricingDisclaimer}
                        </p>
                    )}
                </div>
            </section>
            )}

            {/* ── 13. Location ─────────────────────────────────────────── */}
            <section className="bg-white py-16 md:py-24 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase">
                            Visit Us
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-12">
                        {visitClinic?.heading || "Visiting Ryan Clinic in Delhi"}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* Left Column: Address, Phone, Hours & Service Tags */}
                        <div className="space-y-6">
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed font-sans">
                                Our {doctor.location || "Delhi"} centre is convenient from across the city. Accessible
                                from <strong className="text-gray-900 font-bold">{activeBranch.metro}</strong>, serving patients from{" "}
                                {activeBranch.areas}
                            </p>

                            {/* Address Box */}
                            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                                <div className="bg-[#1a1430] px-6 py-3.5 flex items-center justify-between">
                                    <p className="text-white font-bold text-sm">{activeBranch.addressTitle}</p>
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
                                                {activeBranch.addressLine1}
                                                <br />
                                                {activeBranch.addressLine2}
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
                                                href="tel:+919911111247"
                                                className="text-[#D32F2F] text-sm hover:underline font-extrabold"
                                            >
                                                +91-9911111247
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3.5 border-t border-gray-100 pt-3.5">
                                        <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#D32F2F] shrink-0">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-0.5 font-sans">Consultation Hours</p>
                                            <p className="text-gray-700 text-xs font-semibold">Monday – Saturday, 9:00 AM – 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nearby areas tags */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                                    Serving Patients From All Areas
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {nearbyAreas.map((area, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-gray-100 text-gray-600 font-medium px-3 py-1 rounded-full cursor-default"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Normal Sized Clean Map Card */}
                        <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative">
                            <iframe
                                src={`https://maps.google.com/maps?q=${activeBranch.mapQuery}&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Ryan Clinic ${doctor.location || "Delhi"} location map`}
                                className="w-full h-full"
                            />

                            {/* Action Badge */}
                            <a
                                href={`https://maps.google.com/?q=${activeBranch.mapQuery}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md border border-gray-200 shadow-md text-xs font-bold text-gray-800 hover:text-[#D32F2F] px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                            >
                                <MapPin className="w-3.5 h-3.5 text-[#D32F2F]" />
                                Open in Google Maps
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═════════════════════════════════════════════════════════════════
                SECTION 13B: Split CTA 3-Card Section (Home Page Style)
                Replaces the old dark consultation banner with the exact 3-card layout matching Image 1
            ═════════════════════════════════════════════════════════════════ */}
            {/* ═════════════════════════════════════════════════════════════════
                SECTION 13B: Split CTA Section (Home Page Style)
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
                                                {consultation?.heading || `Book a consultation with ${doctor.name}`}
                                            </h2>

                                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                                                Doctor-led Sapphire FUE &amp; Turkish Technique hair restoration. Get your free scalp analysis, exact graft count &amp; cost breakdown — zero obligation.
                                            </p>

                                            {/* Mini Stats (Only show verified metrics) */}
                                            {(doctor.experience || doctor.rating) && (
                                                <div className="flex gap-6 mb-8">
                                                    {doctor.experience && (
                                                        <div>
                                                            <p className="text-2xl font-black text-[#D32F2F] leading-none">{doctor.experience}</p>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Exp.</p>
                                                        </div>
                                                    )}
                                                    {doctor.rating && (
                                                        <div className={doctor.experience ? "border-l border-gray-200 pl-6" : ""}>
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
                                                href={TEL}
                                                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-800 hover:text-[#D32F2F] font-bold py-3.5 px-5 text-xs tracking-wide transition-all rounded-xl"
                                                onClick={() => trackCTA({ type: "call", ctaName: "Split CTA Call Now", buttonLocation: "Split CTA Section" })}
                                            >
                                                <Phone className="w-4 h-4" />
                                                Call Now
                                            </a>
                                        </div>
                                    </div>

                                    {/* ── Center Card: Real Patient Result Image (Only if verified in CMS) ── */}
                                    {verifiedPatientCase && (
                                        <div className="relative rounded-3xl overflow-hidden min-h-[380px] bg-red-950 border border-red-900 shadow-lg group">
                                            <Image
                                                src={verifiedPatientCase.afterImage || verifiedPatientCase.image || verifiedPatientCase.beforeImage}
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
                                                    {verifiedPatientCase.technique || "Sapphire FUE"} · {doctor.location || "Delhi"}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* ── Right Card: Why Ryan Clinic Feature Highlight ── */}
                                    <div className="flex flex-col justify-between bg-gradient-to-br from-[#D32F2F] to-red-700 rounded-3xl p-7 md:p-8 text-white shadow-xl">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="text-[11px] font-extrabold text-[#FFC107] uppercase tracking-[0.18em]">
                                                    WHY RYAN CLINIC?
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                    <ArrowRight className="w-4 h-4 text-white -rotate-45" />
                                                </div>
                                            </div>

                                            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3">
                                                Results So Natural —<br />
                                                <span className="text-[#FFC107]">Nobody Will Know</span>
                                            </h3>

                                            <p className="text-xs text-white/80 leading-relaxed mb-6 font-sans">
                                                Every graft is placed with precise control over angle, depth &amp; direction — mimicking your natural hair growth pattern exactly.
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
            <FAQSection faqs={faqs} heading={faqSection?.heading || "Frequently asked questions about hair transplant doctors in Delhi"} />
        </>
    );
}







