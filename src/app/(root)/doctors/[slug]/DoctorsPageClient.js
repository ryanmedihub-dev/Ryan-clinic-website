"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useTrackCTA from "@/lib/useTrackCTA";
import ContactForm from "@/components/pages/contactForm";
import FAQSection from "@/app/(root)/hair-transplant-surgery-in-delhi/FAQSection";
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
} from "lucide-react";

const WA =
    "https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20the%20best%20hair%20transplant%20doctor%20in%20Delhi";
const TEL = "tel:+919217958539";

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
                transform: isVisible ? "translateY(0)" : "translateY(28px)",
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
        ? `https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20${encodeURIComponent(doctorName)}`
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
                Call +91-9217958539
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
    } = data;

    const activeBranch = branchData[doctor.location] || branchData.Delhi;
    const waDoctorLink = doctor
        ? `https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20a%20free%20consultation%20with%20${encodeURIComponent(doctor.name)}`
        : WA;

    return (
        <>
            {/* ── 1. Why Doctor Matters ─────────────────────────────────── */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionLabel text="Why It Matters" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                                Why your hair transplant doctor in Delhi matters{" "}
                                <span className="text-[#D32F2F]">more than anything else</span>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-4">
                                A hair transplant is a one-time redistribution of a limited donor supply. Done by a
                                skilled doctor, it lasts a lifetime and looks completely natural. Done poorly, it wastes
                                follicles you can never recover and can leave an unnatural result.
                            </p>
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
                                That outcome is decided almost entirely by the hands performing the surgery — which is
                                why choosing the right hair transplant doctor in Delhi is the decision that matters most.
                            </p>
                            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl mb-6">
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                                    No technique, blade, or brand name compensates for an inexperienced or absent surgeon.
                                </p>
                            </div>
                            <CTAButtons primary="Book Free Scalp Analysis" doctorName={doctor.name} />
                        </div>

                        {/* Expert doctor image */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                                <Image
                                    src={doctor.image}
                                    alt={`Expert hair transplant doctor ${doctor.name} at Ryan Clinic`}
                                    fill
                                    className="object-cover object-top"
                                    unoptimized
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 flex items-center gap-4 shadow-lg">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">100% Doctor-Led Surgery</p>
                                            <p className="text-xs text-gray-500">
                                                Every extraction, incision {"&"} implantation personally done
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating stat cards */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10">
                                <p className="font-black text-[#D32F2F] text-xl leading-none">{doctor.experience}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Years Experience</p>
                            </div>
                            <div className="absolute top-1/3 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100 z-10">
                                <p className="font-black text-[#D32F2F] text-xl leading-none">{doctor.successRate || "95%"}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Graft Survival</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. What Makes a Good Doctor ───────────────────────────── */}
            <section className="bg-[#F7F5F2] py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="The Standard" />
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight max-w-2xl">
                            What makes a good hair transplant doctor in {doctor.location || "Delhi"}?
                        </h2>
                        <p className="text-sm text-gray-400 max-w-sm">
                            These are the non-negotiables. Every box must be ticked before you consider booking.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goodDoctorTraits.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden cursor-default"
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
                                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. Credentials to Look For (Interactive Tabbed Layout) ── */}
            <section className="bg-[#F7F5F2] py-20 md:py-24 border-t border-gray-200/60">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mb-12">
                        <SectionLabel text="Credentials" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                            Credentials to look for in a{" "}
                            <span className="text-[#D32F2F]">
                                hair transplant doctor in {doctor.location || "Delhi"}
                            </span>
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed">
                            What matters is genuine hair-restoration training, real experience, and verifiable
                            qualifications — not a single &quot;right&quot; degree.
                        </p>
                    </div>

                    {/* Interactive Tabbed Interface */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                        
                        {/* Left Column — Navigation Menu (lg:col-span-5) */}
                        <div className="lg:col-span-5 flex flex-col gap-2.5 justify-center">
                            {[
                                { title: "Medical Degree" },
                                { title: "Board Registration" },
                                { title: "Technique Certification" },
                                { title: "Case Volume" },
                                { title: "Professional Memberships" }
                            ].map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveCred(i)}
                                    className={`w-full text-left flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 ${
                                        activeCred === i
                                            ? "bg-white border-red-200/80 border-l-4 border-l-[#D32F2F] shadow-md translate-x-2"
                                            : "bg-transparent border-transparent hover:bg-white/40 border-l-4 border-l-transparent text-gray-600"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-black ${activeCred === i ? "text-[#D32F2F]" : "text-gray-400"}`}>
                                            0{i + 1}
                                        </span>
                                        <span className={`text-sm font-extrabold ${activeCred === i ? "text-gray-900" : "text-gray-600"}`}>
                                            {tab.title}
                                        </span>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 text-[#D32F2F] transition-all ${
                                        activeCred === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                    }`} />
                                </button>
                            ))}
                        </div>

                        {/* Right Column — Focus Details Card (lg:col-span-7) */}
                        <div className="lg:col-span-7 flex">
                            {[
                                {
                                    num: "01",
                                    title: "Medical Degree",
                                    desc: "Recognised MBBS and postgraduate training in dermatology, plastic surgery, or dedicated hair-transplant specialisation.",
                                    icon: <GraduationCap className="w-6 h-6 text-[#D32F2F]" />,
                                    image: "/uploads/turkey-doctor.jpg",
                                },
                                {
                                    num: "02",
                                    title: "Board Registration",
                                    desc: "Active and verifiable registration with the state or national medical council, with a registration number you can check online.",
                                    icon: <ShieldCheck className="w-6 h-6 text-[#D32F2F]" />,
                                    image: "/uploads/about-one.jpg",
                                },
                                {
                                    num: "03",
                                    title: "Technique Certification",
                                    desc: "Specific, advanced training in Sapphire FUE, THI, or other techniques they personally perform on patients.",
                                    icon: <Award className="w-6 h-6 text-[#D32F2F]" />,
                                    image: "/uploads/service-two.jpg",
                                },
                                {
                                    num: "04",
                                    title: "Case Volume",
                                    desc: "Documented years of active practice with a verified high count of personally completed hair restoration surgeries.",
                                    icon: <Users className="w-6 h-6 text-[#D32F2F]" />,
                                    image: "/uploads/service-three.jpg",
                                },
                                {
                                    num: "05",
                                    title: "Professional Memberships",
                                    desc: "Memberships in globally respected organisations like ISHRS — a strong indicator of ongoing professional education.",
                                    icon: <Globe className="w-6 h-6 text-[#D32F2F]" />,
                                    image: "/uploads/gallery.jpg",
                                },
                            ].map((card, i) => {
                                if (activeCred !== i) return null;
                                return (
                                    <div
                                        key={i}
                                        className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200/60 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-6 items-center w-full animate-fadeIn min-h-[360px] md:min-h-[380px]"
                                    >
                                        {/* Background Watermark Number */}
                                        <div className="absolute top-4 right-6 text-7xl font-black text-gray-50 select-none pointer-events-none">
                                            {card.num}
                                        </div>

                                        {/* Image Showcase */}
                                        <div className="relative w-full md:w-[42%] aspect-[4/5] md:h-[300px] rounded-2xl overflow-hidden shadow-sm shrink-0">
                                            <Image
                                                src={card.image}
                                                alt={card.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                                sizes="(max-width: 768px) 100vw, 250px"
                                            />
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-1 z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 mb-4">
                                                {card.icon}
                                            </div>
                                            <h4 className="font-extrabold text-gray-900 text-lg md:text-xl mb-2">{card.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                                            <a
                                                href="#appointment-form"
                                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D32F2F] hover:underline"
                                            >
                                                Need help checking this? Let us assist <ArrowRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Call to Action Row below the tabs */}
                    <div className="mt-12 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1a1430] to-[#302658] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#D32F2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="relative z-10">
                            <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                                Credentials Check
                            </span>
                            <h4 className="font-extrabold text-white text-lg md:text-xl leading-tight">
                                Want to check doctor credentials yourself?
                            </h4>
                            <p className="text-white/70 text-xs md:text-sm mt-1 max-w-xl">
                                We assist you in verifying registration numbers and sharing genuine ISHRS portfolio links.
                            </p>
                        </div>
                        <div className="shrink-0 relative z-10 w-full md:w-auto">
                            <a
                                href={waDoctorLink}
                                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-colors w-full justify-center shadow-lg hover:shadow-red-900/20"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Verify Surgeon", buttonLocation: "Doctor Credentials Section" })}
                            >
                                Verify a Surgeon <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. How to Verify ──────────────────────────────────────── */}
            {/* STEP 2: Both columns wrapped in matching cards, equal height */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="Verification" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-2 max-w-2xl">
                        How to verify a hair transplant doctor&apos;s credentials in {doctor.location || "Delhi"}
                    </h2>
                    <p className="text-sm text-gray-400 mb-10 max-w-xl">
                        Don&apos;t take claims at face value — verify. A confident, transparent clinic will welcome
                        these questions. Evasiveness is your answer.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {/* Left: Steps — in a matching card */}
                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-7 shadow-sm flex flex-col">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-6">
                                Step by step
                            </p>
                            <div className="relative flex-1">
                                <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
                                <div className="space-y-6">
                                    {verifySteps.map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 z-10">
                                                {s.step}
                                            </div>
                                            <div className="flex-1 pb-6 border-b border-gray-200 last:border-0">
                                                <h3 className="font-bold text-gray-900 text-base mb-1">{s.heading}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Interactive Verification Checklist */}
                        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-7 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 text-base">Verification Checklist</h3>
                            </div>
                            <p className="text-xs text-gray-500 mb-5 mt-1">
                                Tick each box as you verify the doctor before booking. A trustworthy clinic passes every
                                check.
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
                                    <span>Progress</span>
                                    <span className={progressPercent === 100 ? "text-green-600" : "text-gray-500"}>
                                        {progressPercent}% Verified
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-500 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            {/* Checklist items */}
                            <div className="space-y-3 flex-1">
                                {[
                                    "Requested doctor's full name, degree & medical council registration number",
                                    "Verified registration on the DMC / NMC official government website",
                                    "Confirmed the doctor personally performs extraction & implantation",
                                    "Reviewed a before/after portfolio of the doctor's own patients",
                                    "Read verified reviews on Google or independent third-party platforms",
                                ].map((task, i) => (
                                    <label
                                        key={i}
                                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 ${checkedSteps[i]
                                                ? "bg-green-50 border-green-200"
                                                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                            }`}
                                        onClick={() => {
                                            const n = [...checkedSteps];
                                            n[i] = !n[i];
                                            setCheckedSteps(n);
                                        }}
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checkedSteps[i]
                                                    ? "bg-green-500 border-green-500"
                                                    : "border-gray-300 bg-white"
                                                }`}
                                        >
                                            {checkedSteps[i] && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span
                                            className={`text-xs leading-relaxed transition-colors ${checkedSteps[i] ? "text-gray-400 line-through" : "text-gray-700"
                                                }`}
                                        >
                                            {task}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {progressPercent === 100 && (
                                <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-2xl text-center">
                                    <p className="text-green-700 font-bold text-sm">✓ All checks passed!</p>
                                    <p className="text-green-600 text-xs mt-1">
                                        This doctor meets all standard verification criteria.
                                    </p>
                                </div>
                            )}

                            <a
                                href={waDoctorLink}
                                className="mt-5 block text-center bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 text-sm tracking-wide transition-colors rounded-xl w-full"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Book Consultation", buttonLocation: "Doctor Verify Section" })}
                            >
                                Book a Consultation at Ryan Clinic
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 5. Comparison — Image Cards ───────────────────────────── */}
            {/* STEP 3: Table replaced with two image-header cards side-by-side */}
            <section className="bg-[#F7F5F2] py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="The Critical Difference" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                        Doctor-led vs technician-led surgery in {doctor.location || "Delhi"}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-10 max-w-2xl">
                        The difference that defines your result. In many high-volume &quot;graft mills,&quot; technicians
                        perform large parts of the surgery while the doctor&apos;s involvement is minimal.
                        Technician-heavy, rushed work is a leading cause of poor graft survival and unnatural hairlines.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Ryan Clinic Card */}
                        <div className="rounded-3xl overflow-hidden border border-green-100 shadow-xl bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-56">
                                <Image
                                    src="/uploads/turkey-doctor.jpg"
                                    alt="Doctor-led hair transplant at Ryan Clinic"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    sizes="50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Doctor-Led
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Ryan Clinic</h3>
                                    <p className="text-white/70 text-xs mt-0.5">
                                        Every step personally performed by the doctor
                                    </p>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {comparisonRows.map(([step, drCol], i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between px-6 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-emerald-50/25 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                            }`}
                                    >
                                        <span className="text-sm font-semibold text-gray-800">{step}</span>
                                        <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs shrink-0">
                                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {drCol}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Graft Mill Card */}
                        <div className="rounded-3xl overflow-hidden border border-rose-100 shadow-xl bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-56">
                                <Image
                                    src="/uploads/service-one.jpg"
                                    alt="Technician-led graft mill hair transplant"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                    sizes="50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="inline-flex items-center gap-1 bg-rose-500/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                                        <X className="w-3.5 h-3.5 text-white" /> Technician-Led
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Typical &quot;Graft Mill&quot;</h3>
                                    <p className="text-white/70 text-xs mt-0.5">
                                        Doctor involvement is minimal or absent
                                    </p>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {comparisonRows.map(([step, , techCol], i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between px-6 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors hover:bg-rose-50/25 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                            }`}
                                    >
                                        <span className="text-sm font-semibold text-gray-800">{step}</span>
                                        <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200/50 text-rose-600 font-bold px-3 py-1 rounded-full text-xs shrink-0">
                                            <X className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {techCol}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400 text-xs mt-6">
                        <span className="w-6 h-px bg-gray-300 shrink-0" />
                        When you choose the best hair transplant doctor in {doctor.location || "Delhi"}, you&apos;re
                        really choosing who does each of these steps.
                    </div>
                </div>
            </section>

            {/* ── 6. Meet Your Surgeon ───────────────────────────────────── */}
            {/* STEP 4: Dark-navy icon header → doctor photo with gradient overlay */}
            <section className="bg-white py-16 md:py-24 border-t border-gray-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="Your Surgeon" />
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-12">
                        Meet Your Surgeon at{" "}
                        <span className="text-[#D32F2F]">Ryan Clinic, {doctor.location || "Delhi"}</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                        {/* Doctor profile card (Left column, 5 spans) */}
                        <div className="lg:col-span-5 rounded-3xl border border-gray-200 overflow-hidden shadow-xl bg-white flex flex-col justify-between h-full">
                            {/* Header — Doctor Photo */}
                            <div className="relative h-[340px] w-full shrink-0">
                                <Image
                                    src={doctor.image}
                                    alt={`${doctor.name} — Hair Transplant Surgeon at Ryan Clinic`}
                                    fill
                                    className="object-cover object-top"
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                {/* Name overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <span className="bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block shadow-sm">
                                        {doctor.specialtyBadge || "Expert Surgeon"}
                                    </span>
                                    <h3 className="text-2xl font-black">{doctor.name}</h3>
                                    <p className="text-white/80 text-sm mt-0.5">
                                        {doctor.designation}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-3.5">
                                        <span className="bg-white/20 border border-white/30 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                                            NABH Certified
                                        </span>
                                        <span className="bg-white/20 border border-white/30 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                                            Doctor-Led
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Credentials grid */}
                            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/60 flex-1">
                                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3.5">
                                    Qualifications & Credentials
                                </p>
                                <div className="space-y-3">
                                    {doctorCredentials.map((c, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <Award className="w-4 h-4 text-[#D32F2F]" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-xs">{c.label}</p>
                                                <p className="text-gray-500 text-[10px] leading-tight mt-0.5">{c.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bio & Details (Right column, 7 spans) */}
                        <div className="lg:col-span-7 flex flex-col h-full">
                            {/* Stats bar */}
                            <div className="border border-gray-200/60 rounded-2xl p-5 mb-6 grid grid-cols-3 divide-x divide-gray-100 bg-white shadow-sm">
                                {[
                                    { val: doctor.experience, label: "Years Exp." },
                                    { val: doctor.procedures, label: "Procedures" },
                                    { val: doctor.successRate || "95%+", label: "Graft Survival" },
                                ].map((s, i) => (
                                    <div key={i} className="text-center px-2">
                                        <p className="font-black text-[#D32F2F] text-xl leading-none">{s.val}</p>
                                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mt-2">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white border border-gray-200/60 rounded-2xl p-5 mb-4 shadow-sm">
                                <h3 className="text-xl font-extrabold text-gray-900 mb-3">About Dr. {doctor.name.split(" ").slice(-1)[0]}</h3>
                                <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                                    {doctor.about}
                                </p>
                            </div>

                            {/* Core Specializations */}
                            {doctor.specializations && doctor.specializations.length > 0 && (
                                <div className="bg-white border border-gray-200/60 rounded-2xl p-5 mb-4 shadow-sm">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-[#D32F2F] mb-3">
                                        Clinical Focus &amp; Specialty
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.specializations.map((spec, i) => (
                                            <span
                                                key={i}
                                                className="bg-red-50 text-[#D32F2F] border border-red-100/50 rounded-xl px-3 py-1.5 text-xs font-semibold"
                                            >
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {doctor.achievements && doctor.achievements.length > 0 && (
                                <div className="bg-white border border-gray-200/60 rounded-2xl p-5 mb-4 shadow-sm">
                                    <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">
                                        Key Achievements &amp; Recognitions
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {doctor.achievements.map((ach, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all duration-200"
                                            >
                                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                                                    ★
                                                </span>
                                                <p className="text-xs text-gray-700 font-medium leading-relaxed">
                                                    {ach}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Why Patients Choose */}
                            <div className="bg-gradient-to-br from-[#1a1430] to-[#302658] rounded-2xl p-5 mb-4 shadow-sm">
                                <p className="text-[11px] font-black uppercase tracking-wider text-red-400 mb-3">
                                    Why Patients Choose {doctor.name.split(" ").slice(-1)[0]}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[
                                        { icon: <ShieldCheck className="w-4 h-4 text-red-400" />, label: "100% Doctor-Led", sub: "Every step personally performed" },
                                        { icon: <Award className="w-4 h-4 text-red-400" />, label: "NABH Certified", sub: "Internationally accredited clinic" },
                                        { icon: <Globe className="w-4 h-4 text-red-400" />, label: "ISHRS Member", sub: "Global hair restoration body" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-1.5 bg-white/10 rounded-xl p-3 border border-white/10">
                                            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                                {item.icon}
                                            </div>
                                            <p className="text-white font-bold text-xs leading-tight">{item.label}</p>
                                            <p className="text-white/55 text-[10px] leading-snug">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Free Consultation Includes */}
                            <div className="bg-white border border-gray-200/60 rounded-2xl p-5 mb-4 shadow-sm">
                                <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">
                                    Free Consultation Includes
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {[
                                        "Scalp & donor density analysis",
                                        "Personalised graft estimate",
                                        "Technique recommendation (FUE / THI)",
                                        "Hairline design preview",
                                        "Cost & timeline breakdown",
                                        "No obligation — 100% free",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                                <Check className="w-2.5 h-2.5 text-green-600" />
                                            </span>
                                            <span className="text-xs text-gray-600 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA — pinned to bottom of column */}
                            <div className="border-t border-gray-100 pt-5 mt-auto">
                                <CTAButtons primary={`Book Consultation with ${doctor.name}`} doctorName={doctor.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. What Doctor Does at Each Stage ────────────────────── */}
            <section className="bg-[#F7F5F2] py-20 md:py-24 border-t border-b border-gray-200/60 relative overflow-hidden">
                {/* Subtle backgrounds or decorations */}
                <div className="absolute top-20 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#1a1430]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel text="The Process" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                            What your hair transplant doctor in {doctor.location || "Delhi"}{" "}
                            <span className="text-[#D32F2F]">does at every stage</span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                            A successful hair transplant is defined by precision and control. Here is how your surgeon personally leads and executes your treatment at each milestone.
                        </p>
                    </div>

                    {/* Vertical timeline */}
                    <div className="relative">
                        {/* Timeline vertical line */}
                        <div className="absolute left-1/2 -translate-x-px top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#D32F2F] via-[#302658] to-gray-300 hidden md:block" />

                        <div className="space-y-12">
                            {doctorStages.map((s, i) => {
                                const isRight = i % 2 !== 0;
                                const stageIcons = [
                                    <MessageCircle key="1" className="w-7 h-7 text-white" />,
                                    <Scissors key="2" className="w-7 h-7 text-white" />,
                                    <ShieldCheck key="3" className="w-7 h-7 text-white" />,
                                    <Clock key="4" className="w-7 h-7 text-white" />
                                ];
                                const icon = stageIcons[i] || <ShieldCheck key={i} className="w-7 h-7 text-white" />;

                                return (
                                    <RevealSection key={i} delay={50}>
                                        <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                                            {/* Visual / Icon card */}
                                            <div className="w-full md:w-[45%]">
                                                <div className="relative rounded-3xl overflow-hidden shadow-md p-6 md:p-8 bg-gradient-to-br from-[#1a1430] to-[#302658] text-white flex flex-col justify-between aspect-[16/10] group border border-white/5">
                                                    {/* Background light glow on hover */}
                                                    <div className="absolute inset-0 bg-[#D32F2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                    <div className="flex justify-between items-start z-10">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            {icon}
                                                        </div>
                                                        <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                                                            {s.num}
                                                        </span>
                                                    </div>

                                                    <div className="z-10 mt-6">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D32F2F]">
                                                            Stage {s.num}
                                                        </span>
                                                        <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                                                            {s.heading}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Central node circle */}
                                            <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-white border-4 border-[#D32F2F] flex items-center justify-center text-[#302658] font-bold text-xs shadow-md">
                                                    {s.num}
                                                </div>
                                            </div>

                                            {/* Content explanation card */}
                                            <div className="w-full md:w-[45%]">
                                                <div className={`bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${isRight ? "md:mr-4" : "md:ml-4"}`}>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            Detailed Process
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                                                        {s.heading}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                                        {s.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </RevealSection>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7b. Surgery-Style Split-Panel CTA + Form ──────────────── */}
            {/* STEP 5: Premium unified dark booking section                 */}
            <section id="appointment-form" className="relative overflow-hidden bg-white py-12 md:py-16 border-t border-b border-gray-100">
                {/* Subtle backgrounds or decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#D32F2F]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D32F2F]/3 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Left — credentials panel (compact layout) */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-2 bg-[#D32F2F]/10 border border-[#D32F2F]/20 rounded-full px-3.5 py-1 text-[10px] font-bold text-[#D32F2F] uppercase tracking-widest">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] animate-pulse" />
                                    Consultation Booking
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">
                                Book a free consultation with <span className="text-[#D32F2F]">{doctor.name}</span>
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                Free scalp analysis · Exact graft count · Transparent cost breakdown · No obligation
                            </p>

                            {/* Stats list with neat borders (drastically reduces height) */}
                            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-200 py-4 my-5">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xl md:text-2xl font-black text-[#D32F2F]">{doctor.experience}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Years Exp.</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xl md:text-2xl font-black text-[#D32F2F]">{doctor.procedures}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Procedures</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xl md:text-2xl font-black text-[#D32F2F]">{doctor.successRate || "95%+"}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Graft Rate</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <span className="text-xl md:text-2xl font-black text-[#D32F2F]">4.9 ★</span>
                                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Reviews</span>
                                </div>
                            </div>

                            {/* Direct Contact links (streamlined layout) */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block w-full mb-1">Or contact us directly</span>
                                <a
                                    href={waDoctorLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-green-100"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Message WhatsApp", buttonLocation: "Doctor Contact Section" })}
                                >
                                    <MessageCircle className="w-4 h-4" /> Message WhatsApp
                                </a>
                                <a
                                    href={TEL}
                                    className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#D32F2F] hover:bg-red-50/50 text-[#D32F2F] text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                                    onClick={() => trackCTA({ type: "call", ctaName: "Doctor Page Call Clinic", buttonLocation: "Doctor Contact Section" })}
                                >
                                    <Phone className="w-4 h-4" /> Call Clinic
                                </a>
                            </div>
                        </div>

                        {/* Right — Form panel */}
                        <div className="lg:col-span-7 flex flex-col justify-center bg-transparent">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-extrabold text-gray-900">Get a Free Scalp Analysis</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">Takes less than 60 seconds</p>
                                </div>
                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5 shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-bold text-green-700 tracking-wider uppercase">
                                        Secure
                                    </span>
                                </div>
                            </div>

                            <div className="w-full">
                                <ContactForm />
                            </div>

                            <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 leading-snug">
                                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                                <p>
                                    Your personal & medical details are fully encrypted. We never share your contact
                                    info with third parties.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 8. Questions to Ask ───────────────────────────────────── */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-7">
                            <SectionLabel text="Questions to Ask" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                                Questions to ask your hair transplant doctor in {doctor.location || "Delhi"}{" "}
                                <span className="text-[#D32F2F]">before booking</span>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-8">
                                The quality of a doctor&apos;s answers tells you almost everything.
                            </p>
                            <div className="space-y-4">
                                {questionsToAsk.map((q, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 items-start p-5 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/20 transition-colors"
                                    >
                                        <span className="w-7 h-7 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                            {i + 1}
                                        </span>
                                        <p className="text-gray-700 text-sm leading-relaxed">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28">
                            <div className="rounded-3xl bg-[#1a1430] p-8 md:p-10 shadow-lg border border-white/5 relative overflow-hidden group">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D32F2F]/10 rounded-full blur-3xl group-hover:bg-[#D32F2F]/20 transition-colors duration-500 pointer-events-none" />
                                <p className="text-[11px] font-bold uppercase tracking-widest text-[#D32F2F] mb-4">
                                    Ryan Clinic Guarantee
                                </p>
                                <h3 className="text-white font-extrabold text-2xl mb-6 leading-tight">
                                    We answer every one of these questions at your consultation
                                </h3>
                                <div className="space-y-4 mb-8">
                                    {[
                                        "Doctor performs every step personally",
                                        "Verifiable credentials & ISHRS membership",
                                        "10,000+ documented cases to show",
                                        "Transparent per-graft pricing",
                                        "Free 18-month follow-up",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                            <p className="text-white/80 text-sm font-medium">{item}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3">
                                    <a
                                        href={waDoctorLink}
                                        className="block text-center bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold py-4 px-6 text-sm tracking-wide transition-all rounded-2xl w-full shadow-lg hover:shadow-red-900/30"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Doctor Page Book Free Consultation", buttonLocation: "Doctor Stage Section" })}
                                    >
                                        Book Free Consultation
                                    </a>
                                    <a
                                        href={TEL}
                                        className="block text-center border border-white/20 hover:bg-white/10 hover:border-white/40 text-white/90 font-extrabold py-4 px-6 text-sm tracking-wide transition-all rounded-2xl w-full"
                                        onClick={() => trackCTA({ type: "call", ctaName: "Doctor Page Call", buttonLocation: "Doctor Stage Section" })}
                                    >
                                        Call +91-9217958539
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 9. What Great Doctors Do Differently ─────────────────── */}
            <section className="bg-[#F7F5F2] py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="Excellence" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-10">
                        What a great hair transplant doctor in {doctor.location || "Delhi"} does{" "}
                        <span className="text-[#D32F2F]">differently</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {greatDoctorTraits.map((t, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start"
                            >
                                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-1.5">{t.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 10. Red Flags ────────────────────────────────────────── */}
            <section className="bg-white py-16 md:py-24 border-t border-b border-gray-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Left Column — Header, Subtext, & Image Collage */}
                        <div className="lg:col-span-5">
                            <SectionLabel text="Warning Signs" />
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                                Red flags when choosing a hair transplant doctor{" "}
                                <span className="text-[#D32F2F]">in {doctor.location || "Delhi"}</span>
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                If you encounter any of the following at a clinic, walk away. Corrective surgery after a
                                poor procedure costs far more than getting it right the first time.
                            </p>
                            
                            <div className="mb-8">
                                <CTAButtons primary="Speak to Our Doctor Instead" doctorName={doctor.name} />
                            </div>

                            {/* Dual-Image Collage (Safe vs Warning) */}
                            <div className="relative h-[340px] w-full max-w-md hidden sm:block">
                                {/* Background glow */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                                {/* Primary Image: Professional clinical standard */}
                                <div className="absolute left-0 top-0 w-[68%] h-[270px] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-0">
                                    <Image
                                        src="/uploads/1752734248947-Hair Transplant 1.jpg"
                                        alt="Safe clinical standard Ryan Clinic"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <div className="absolute top-3 left-3 bg-emerald-500/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                        ✓ Safe Standard
                                    </div>
                                </div>

                                {/* Secondary Image: Technician-led environment */}
                                <div className="absolute right-0 bottom-4 w-[50%] h-[180px] rounded-2xl overflow-hidden shadow-lg border-4 border-white z-10 translate-x-2 translate-y-2">
                                    <Image
                                        src="/uploads/service-one.jpg"
                                        alt="Technician risk environment"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-red-950/15" />
                                    <div className="absolute top-3 left-3 bg-[#D32F2F] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                        <AlertTriangle className="w-3 h-3" /> Red Flag Risk
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column — Red Flag Grid */}
                        <div className="lg:col-span-7">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "No Named Doctor",
                                        desc: redFlags[0] || "No named, credentialed doctor anywhere on the website.",
                                    },
                                    {
                                        title: "Technician Delegation",
                                        desc: redFlags[1] || "Vagueness about who actually operates (doctor vs. technicians).",
                                    },
                                    {
                                        title: "Fake Credentials",
                                        desc: redFlags[2] || "Unverifiable or exaggerated credentials.",
                                    },
                                    {
                                        title: "High-Pressure Booking",
                                        desc: redFlags[3] || "Guaranteed results or pressure to book or pay immediately.",
                                    },
                                    {
                                        title: "Zero Patient Portfolio",
                                        desc: redFlags[4] || "No real before-and-afters of the doctor's own patients.",
                                    },
                                    {
                                        title: "Inconsistent Information",
                                        desc: redFlags[5] || "Inconsistent claims across the website and advertisements.",
                                    },
                                ].map((flag, i) => (
                                    <div
                                        key={i}
                                        className="group p-5 rounded-2xl bg-red-50/20 hover:bg-red-50 border border-red-100/50 hover:border-red-150 transition-all duration-300 shadow-sm flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mb-3 group-hover:bg-[#D32F2F] group-hover:border-[#D32F2F] transition-all">
                                                <AlertTriangle className="w-4 h-4 text-[#D32F2F] group-hover:text-white transition-colors" />
                                            </div>
                                            <h4 className="font-extrabold text-gray-900 text-sm mb-1.5">{flag.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{flag.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 11. Procedures Step-by-Step (Vertical Timeline) ───────── */}
            <section className="bg-[#F7F5F2]/45 py-20 md:py-24 border-t border-b border-gray-200/40 relative overflow-hidden">
                {/* Subtle backgrounds or decorations */}
                <div className="absolute top-20 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#1a1430]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <SectionLabel text="Surgical Process" />
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
                            Hair transplant surgery procedure: step-by-step
                        </h2>
                    </div>

                    {/* Vertical timeline */}
                    <div className="relative">
                        {/* Timeline vertical line */}
                        <div className="absolute left-1/2 -translate-x-px top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#D32F2F] via-[#302658] to-gray-300 hidden md:block" />

                        <div className="space-y-12">
                            {[
                                {
                                    num: "01",
                                    title: "Hairline Mapping & Design",
                                    desc: "The doctor personally maps your new hairline according to facial symmetry and marks the donor and recipient zones.",
                                    icon: <Compass className="w-7 h-7 text-white" />,
                                },
                                {
                                    num: "02",
                                    title: "Local Anesthesia",
                                    desc: "Local numbing is gently administered to both the donor and recipient areas to ensure total comfort throughout the day.",
                                    icon: <ShieldCheck className="w-7 h-7 text-white" />,
                                },
                                {
                                    num: "03",
                                    title: "Follicular Unit Extraction",
                                    desc: "Grafts are harvested one by one from the safe donor zone at the back of the scalp using precision micro-punches.",
                                    icon: <Scissors className="w-7 h-7 text-white" />,
                                },
                                {
                                    num: "04",
                                    title: "Graft Sorting & Holding",
                                    desc: "Extracted grafts are sorted by follicle count (singles for hairline, multiples for density) and preserved in a chilled nutrient solution.",
                                    icon: <Award className="w-7 h-7 text-white" />,
                                },
                                {
                                    num: "05",
                                    title: "Sapphire Channel Creation",
                                    desc: "The surgeon makes microscopic slits using gemstone sapphire blades, setting the precise angle, direction, and density of your new hair.",
                                    icon: <Sparkles className="w-7 h-7 text-white" />,
                                },
                                {
                                    num: "06",
                                    title: "Direct Choi Pen Implantation",
                                    desc: "Using the Turkey Choi implanter pens, sorted grafts are loaded and placed directly into channels for maximum follicle survival.",
                                    icon: <GraduationCap className="w-7 h-7 text-white" />,
                                },
                            ].map((step, i) => {
                                const isRight = i % 2 !== 0;
                                return (
                                    <RevealSection key={i} delay={50}>
                                        <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                                            {/* Visual / Icon card */}
                                            <div className="w-full md:w-[45%]">
                                                <div className="relative rounded-3xl overflow-hidden shadow-md p-6 md:p-8 bg-gradient-to-br from-[#1a1430] to-[#302658] text-white flex flex-col justify-between aspect-[16/10] group border border-white/5">
                                                    {/* Background light glow on hover */}
                                                    <div className="absolute inset-0 bg-[#D32F2F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                                    <div className="flex justify-between items-start z-10">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                            {step.icon}
                                                        </div>
                                                        <span className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                                                            {step.num}
                                                        </span>
                                                    </div>

                                                    <div className="z-10 mt-6">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#D32F2F]">
                                                            Step {step.num}
                                                        </span>
                                                        <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                                                            {step.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Central node circle */}
                                            <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                                                <div className="w-10 h-10 rounded-full bg-white border-4 border-[#D32F2F] flex items-center justify-center text-[#302658] font-bold text-xs shadow-md">
                                                    {step.num}
                                                </div>
                                            </div>

                                            {/* Content explanation card */}
                                            <div className="w-full md:w-[45%]">
                                                <div className={`bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${isRight ? "md:mr-4" : "md:ml-4"}`}>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            Surgical Phase
                                                        </span>
                                                    </div>
                                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </RevealSection>
                                );
                            })}
                        </div>
                    </div>

                    {/* Internal links */}
                    <div className="flex flex-wrap gap-2.5 items-center text-sm text-gray-500">
                        <span>Learn more:</span>
                        <a
                            href="/hair-transplant-in-delhi"
                            className="text-[#D32F2F] hover:text-red-700 font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-[#D32F2F] transition-all"
                        >
                            hair transplant in Delhi
                        </a>
                        <span className="text-gray-300">·</span>
                        <a
                            href="/hair-transplant-surgery-in-delhi"
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

            {/* ── 12. Cost Section ─────────────────────────────────────── */}
            <section className="bg-white py-16 md:py-20">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionLabel text="Cost & Consultation" />
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-5">
                                Cost of consulting a hair transplant doctor in Delhi
                            </h2>
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6">
                                Consultation at Ryan Clinic includes a free scalp analysis — your doctor assesses your
                                case and gives an exact graft count and transparent, per-graft cost. Surgery pricing
                                starts from ₹40,000, with 0% EMI available.
                            </p>
                            <a
                                href="/hair-transplant-cost-in-delhi"
                                className="inline-flex items-center gap-2 text-[#D32F2F] font-semibold text-sm hover:underline mb-8"
                            >
                                Full cost breakdown <ArrowRight className="w-4 h-4" />
                            </a>
                            <CTAButtons primary="Get Free Cost Estimate" doctorName={doctor.name} />
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
                            <table className="w-full text-sm">
                                <tbody>
                                    {[
                                        ["Consultation", "Free scalp analysis — no obligation"],
                                        ["Surgery starting from", "₹40,000"],
                                        ["Per-graft rate", "₹40–₹120 (doctor-led Sapphire FUE)"],
                                        ["0% EMI", "6 & 12-month plans via leading banks"],
                                        ["Follow-up", "18 months included free"],
                                        ["Pricing method", "Per graft — confirmed in writing"],
                                    ].map(([label, value], i) => (
                                        <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-5 py-3.5 font-semibold text-gray-800 w-[45%] text-[13px]">
                                                {label}
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-600 text-[13px]">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 13. Location ─────────────────────────────────────────── */}
            <section className="bg-[#F7F5F2]/45 py-16 md:py-20 border-t border-b border-gray-200/40">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionLabel text="Visit Us" />
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-10">
                        Visiting Ryan Clinic in {doctor.location || "Delhi"}
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Address card */}
                        <div className="space-y-5">
                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed">
                                Our {doctor.location || "Delhi"} centre is convenient from across the city. Accessible
                                from{" "}
                                <strong className="text-gray-700">{activeBranch.metro}</strong>, serving patients from{" "}
                                {activeBranch.areas}
                            </p>

                            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                <div className="bg-[#1a1430] px-6 py-4">
                                    <p className="text-white font-bold text-base">{activeBranch.addressTitle}</p>
                                </div>
                                <div className="px-6 py-5 space-y-4 bg-white">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-[#D32F2F] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Address</p>
                                            <p className="text-gray-500 text-sm">
                                                {activeBranch.addressLine1}
                                                <br />
                                                {activeBranch.addressLine2}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-[#D32F2F] shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Phone</p>
                                            <a
                                                href="tel:+919217958539"
                                                className="text-[#D32F2F] text-sm hover:underline font-semibold"
                                            >
                                                +91-9217958539
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-[#D32F2F] shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">Hours</p>
                                            <p className="text-gray-500 text-sm">Mon–Sat, 9:00 AM – 7:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nearby areas */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                    Serving patients from
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {nearbyAreas.map((area, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 h-80 bg-gray-50 flex items-center justify-center">
                            <div className="text-center p-6">
                                <MapPin className="w-10 h-10 text-[#D32F2F] mx-auto mb-3" />
                                <p className="font-semibold text-gray-800 text-sm">
                                    Ryan Clinic, {doctor.location || "Delhi"}
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                    {activeBranch.addressLine1} {activeBranch.addressLine2}
                                </p>
                                <a
                                    href={`https://maps.google.com/?q=${activeBranch.mapQuery}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 bg-[#D32F2F] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Open in Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 14. FAQ ──────────────────────────────────────────────── */}
            {/* ── 14. FAQ ──────────────────────────────────────────────── */}
            <FAQSection faqs={faqs} />
        </>
    );
}
