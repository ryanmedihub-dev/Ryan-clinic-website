"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useTrackCTA from "@/lib/useTrackCTA";
import {
    Scissors,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
    Award,
    AlertTriangle,
    X,
    Check,
    ChevronDown,
    ArrowRight,
    Eye,
    MessageCircle,
    Phone,
    Compass,
    Plus,
    Minus,
} from "lucide-react";

const WA = "https://api.whatsapp.com/send?phone=919217958539&text=Hi%2C%20I%20want%20to%20book%20a%20consultation%20with%20the%20best%20hair%20transplant%20surgeon%20in%20Delhi";
const TEL = "tel:+919217958539";

/* ─── Scroll Animation Hook ──────────────────────────────────────────────── */
function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); }
            },
            { threshold: options.threshold ?? 0.08, rootMargin: options.rootMargin ?? "0px 0px -40px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);
    return { ref, isVisible };
}

function Reveal({ children, className = "", delay = 0, dir = "up" }) {
    const { ref, isVisible } = useScrollReveal();
    const transforms = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)", fade: "scale(0.97)" };
    return (
        <div
            ref={ref}
            className={className}
            suppressHydrationWarning
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "none" : transforms[dir],
                transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─── Data ─────────────────────────────────────────────────────────────── */
const surgicalJourney = [
    { num: "01", title: "Consultation & Hairline Design", body: "The surgeon assesses donor density, facial symmetry, and future loss patterns. A soft, micro-irregular hairline is drafted to frame your face naturally for life." },
    { num: "02", title: "Graft Extraction (FUE)", body: "The surgeon personally extracts follicular units using 0.7–0.9mm micro-punches. Proper punch depth and angle protect graft viability and prevent donor over-harvesting." },
    { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "Using sharp gemstone sapphire blades, the surgeon opens microscopic channels — setting exact radial direction, depth, and angle for photorealistic growth." },
    { num: "04", title: "Direct Implantation (Choi Pen / DHI)", body: "Single-hair grafts are positioned at the soft front edge and dense multi-hair units behind — achieving maximum density without scalp trauma." },
    { num: "05", title: "18-Month Growth & Follow-Up", body: "Free follow-up check-ups at months 1, 3, 6, 12, and 18 ensure your hair growth progress is tracked through full maturation." },
];

const whyItems = [
    { title: "100% Doctor-Led Surgery — Never Technicians", body: "This is the most important thing to verify at any Delhi clinic. At Ryan Clinic, every surgical step — extraction, channel creation, and implantation — is performed by a certified hair transplant surgeon in Delhi. We never hand any part of your surgery to a technician." },
    { title: "95%+ Graft Survival Rate", body: "Using the original Choi Pen and a careful graft-preservation protocol, our grafts spend minimal time outside the body. The result is a graft survival rate of 95%+ — well above the Indian industry average of roughly 60–70%." },
    { title: "Sterile, Surgical-Grade Operating Theatre", body: "Every procedure is performed in a sterile operating theatre with single-use, surgical-grade instruments while following recognised safety standards. Patient safety, hygiene, and precision remain at the heart of every procedure." },
    { title: "Transparent Pricing & 0% EMI", body: "Your complete cost — based on your exact graft count after a free scalp analysis — is confirmed before you commit. No hidden charges. Hair transplant surgery starts from ₹40,000, with 0% EMI available on 6 and 12-month plans." },
    { title: "18-Month Follow-Up Support", body: "Ryan Clinic provides free follow-up consultations for 18 months after your procedure. Our WhatsApp support team is available 7 days a week to answer your questions and monitor progress." },
    { title: "Fastest Recovery — Back to Work in 5–7 Days", body: "Our Sapphire FUE technique creates smaller, more precise recipient channels — resulting in less tissue trauma, less swelling, and faster scalp healing. Most patients return to desk work within 5–7 days." },
    { title: "Completely Pain-Free Procedure", body: "Ryan Clinic's Sapphire FUE uses micro-instruments of just 0.7–0.9mm under premium local anaesthesia. The procedure is virtually pain-free throughout. Most patients watch movies or nap comfortably during the 6–8 hour surgery." },
    { title: "Trusted by Celebrities, Influencers & NRI Patients", body: "Ryan Clinic has been trusted by Bollywood actors, Instagram influencers, and NRI patients from the UK, Dubai, USA, and Canada. Over 5,000 successful procedures with Dr. Pranendra Singh speak for themselves." },
    { title: "Surgeon With a Verifiable Portfolio", body: "We share clear, unedited before-and-after photo portfolios of the surgeon's own patients — particularly hairlines and cases matching your Norwood hair loss stage and scalp type." },
];

const questionsList = [
    { q: "Will you personally perform my extraction and implantation, or will technicians?", ans: "In many high-volume clinics, technicians extract and implant while doctors only drop in. Unskilled technician handling damages graft roots.", std: "At Ryan Clinic, Dr. Pranendra Singh personally performs extraction, site creation, and implantation." },
    { q: "How many hair transplant cases like mine have you done — can I see your own results?", ans: "Generic stock photos mean nothing. You need to verify past cases matching your Norwood hair loss stage and scalp type.", std: "We share clear, unedited before-and-after photo portfolios of the surgeon's own patients." },
    { q: "How long have you focused on hair restoration?", ans: "Hair transplantation is an artistic surgical discipline. An occasional provider lacks the refined technique of a dedicated specialist.", std: "Dr. Pranendra Singh has 15+ years of dedicated hair restoration focus and 5,000+ completed procedures." },
    { q: "Which technique do you recommend for me, and why?", ans: "Clinics that push one technique for everyone are prioritizing speed over your optimal outcome.", std: "We evaluate your scalp and offer Sapphire FUE or Turkish Technique Choi Pen based on your graft density needs." },
    { q: "How will you design my hairline for a natural result now and in the future?", ans: "A straight, low hairline looks fake as you age. The surgeon must plan for future natural hair recession.", std: "We build a soft, multi-layered hairline gradient that suits your facial structure for life." },
    { q: "Am I a good candidate, or should I consider medical therapy first?", ans: "Unethical clinics sell surgery to patients with active diffuse thinning or poor donor supply.", std: "We conduct a thorough trichological scalp analysis first and recommend medical management if surgery is premature." },
    { q: "What's the total per-graft cost, and what does aftercare include?", ans: "Hidden charges for anesthesia, post-op wash kits, or follow-ups create unpleasant surprises.", std: "Transparent written per-graft pricing starting at ₹40,000 with 0% EMI and 18 months free follow-up." },
];

const faqList = [
    { q: "How do I find the best hair transplant surgeon in Delhi?", a: "Study the surgeon's own before-and-afters (especially hairlines and cases like yours), confirm the surgeon personally performs the surgery, check years and case volume in hair restoration, verify credentials and registration, and read genuine reviews." },
    { q: "What makes a great hair transplant surgeon?", a: "A combination of surgical precision and aesthetic judgement — clean extraction, natural hairline design, well-distributed density, careful donor management — backed by focused experience and a real portfolio." },
    { q: "What's the difference between a hair transplant surgeon and a technician?", a: "A qualified surgeon should perform the skilled steps — design, extraction, recipient-site creation, and implantation. In many clinics, technicians do much of this, which is a common cause of poor survival and unnatural results. At Ryan Clinic, the surgeon performs every step." },
    { q: "How much experience should a hair transplant surgeon have?", a: "Look for documented years focused on hair restoration and real case volume — and, most importantly, a portfolio of the surgeon's own results with patients similar to you." },
    { q: "Does the surgeon design my hairline?", a: "Yes — at Ryan Clinic the surgeon personally designs your hairline. Hairline design is the most artistic, result-defining part of the surgery and should never be left to a technician." },
    { q: "Why does surgical skill affect graft survival and how natural the result looks?", a: "Gentle, precise extraction protects follicle viability, and correct angle, depth, and density at implantation create natural growth. Both depend directly on the surgeon's skill; rushed, delegated work puts them at risk." },
    { q: "Should one surgeon perform the whole procedure?", a: "The surgeon should perform all the skilled surgical steps. Consistent, hands-on involvement is what produces a natural, lasting result." },
    { q: "How can I judge a surgeon's skill before booking?", a: "Ask to see the surgeon's own before-and-afters — particularly hairlines — and cases similar to yours. A skilled hair transplant surgeon in Delhi will gladly show their portfolio." },
    { q: "Who is the hair transplant surgeon at Ryan Clinic?", a: "Dr. Pranendra Singh (MBBS AIIMS, MS PGIMER, Turkey FUE Fellowship) is our lead surgeon with 15+ years experience and 5,000+ successful hair transplants." },
    { q: "Is a hair transplant surgeon the same as a dermatologist or plastic surgeon?", a: "A hair transplant surgeon may come from different backgrounds. What matters most is genuine hair-restoration training, real surgical experience, and a portfolio that proves the skill — not one specific specialty." },
    { q: "Can a skilled hair transplant surgeon repair a previous bad transplant?", a: "Often, yes. An experienced surgeon can refine an unnatural hairline, add density, or improve an over-harvested donor area. Revision work demands strong surgical judgement, so it's a good marker of skill." },
    { q: "How much does a hair transplant surgeon in Delhi charge?", a: "It's priced per graft and depends mainly on graft count and technique. At Ryan Clinic the surgeon provides an exact, transparent quote after a free scalp analysis, starting from ₹40,000, with 0% EMI." },
    { q: "Where can I meet the hair transplant surgeon in Delhi?", a: "At our Pitampura centre (CD 163, Block CD, Dakshini Pitampura, 110034), Mon–Sat, 9 AM–7 PM. Accessible via Pitampura Metro Station (Red Line)." },
    { q: "How do I book a consultation with the surgeon?", a: "Call or WhatsApp +91-9217958539, or use the booking form. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." },
];

/* ─── Feature cards (matching featuresOverview.js 9-cell grid) ──────────── */
const surgeonFeatures = [
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>, number: "01", title: "Hands-On Mastery", text: "Performs extraction, recipient-site creation, and implantation personally — never delegating surgical steps to technicians at any stage." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>, number: "02", title: "Aesthetic Judgement", text: "Designs hairlines tailored to your facial structure, age progression, and long-term hair loss pattern for a result that looks natural for life." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>, number: "03", title: "Transparent Pricing & 0% EMI", text: "Surgery starts from ₹40,000. Your complete cost is confirmed after free scalp analysis — before you commit. No hidden charges. 0% EMI via HDFC, ICICI & Axis Bank." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, number: "04", title: "95%+ Graft Survival Rate", text: "The original Choi Pen minimises graft time outside the body. Combined with our preservation protocol, Ryan Clinic consistently achieves 95%+ graft survival — far above the 60–70% industry average." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>, number: "05", title: "Completely Pain-Free Procedure", text: "Sapphire FUE uses micro-instruments of 0.7–0.9mm under premium local anaesthesia. Most patients watch movies or nap during the 6–8 hour surgery. No general anaesthesia. No hospital admission." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>, number: "06", title: "Back to Work in 5–7 Days", text: "Sapphire blades create smaller, more precise recipient channels — less tissue trauma, less swelling, faster healing. Most patients return to desk work within 5–7 days." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, number: "07", title: "Natural-Looking, Undetectable Results", text: "Every graft is placed with precise control over angle, depth, and direction — mimicking your natural hair growth pattern exactly. After a Ryan Clinic transplant, even your barber won't know." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>, number: "08", title: "18-Month Free Follow-Up Support", text: "Our relationship with you does not end at discharge. Ryan Clinic provides free follow-up consultations for 18 months post-procedure. Dedicated WhatsApp support 7 days a week." },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>, number: "09", title: "Trusted by 5,000+ Patients Across India", text: "Ryan Clinic has performed over 5,000 successful hair transplant procedures in Delhi. Trusted by Bollywood actors, Instagram influencers, and NRI patients — Turkey-quality results at Indian prices." },
];

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function SurgeonPageClient({ pageData }) {
    const trackCTA = useTrackCTA();
    const [open, setOpen] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [openQuestion, setOpenQuestion] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    // Dynamic CMS Data bindings with fallbacks
    const heroTitle = pageData?.hero?.title || pageData?.title || "Best Hair Transplant Surgeon in Delhi";
    const heroDesc = pageData?.hero?.description || "Your result depends less on the clinic name or machine used, and more on the hands and artistic eye of your surgeon. At Ryan Clinic in Pitampura, your hair transplant is 100% surgeon-led from start to finish — never delegated to technicians.";
    const heroBadgeText = pageData?.hero?.badge?.text || "Ryan Clinic · Surgical Excellence";

    const doctorCard = pageData?.hero?.doctorCard || {};
    const doctorName = doctorCard.doctorName || pageData?.leadSurgeon?.heading || "Dr. Pranendra Singh";
    const doctorQual = doctorCard.qualification || "MBBS (AIIMS) · MS (PGIMER) · Turkey FUE Specialist";
    const doctorImg = doctorCard.image?.url || pageData?.leadSurgeon?.doctorImage?.url || "/uploads/turkey-doctor.jpg";
    const doctorImgAlt = doctorCard.image?.alt || `${doctorName} Hair Transplant Surgeon Delhi`;

    const leadSurgeonName = pageData?.leadSurgeon?.heading || doctorName;
    const leadSurgeonDesc = pageData?.leadSurgeon?.description || `Dr. ${doctorName} is the founder of Ryan Clinic and India's foremost authority on Turkey's Sapphire FUE technique. Trained directly under Turkey's leading specialists in Istanbul, with 15+ years and 5,000+ procedures — personally performing every hairline design, graft extraction, and implantation step.`;
    const leadSurgeonImg = pageData?.leadSurgeon?.doctorImage?.url || doctorImg;

    const activeFaqs = (pageData?.faq?.faqs?.length
        ? pageData.faq.faqs.map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
        : (pageData?.faq?.items?.length
            ? pageData.faq.items.map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
            : faqList));

    return (
        <div className="bg-white text-gray-900 font-sans selection:bg-[#D32F2F] selection:text-white">

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1: HERO — Enhanced Doctor Intro Hero
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-gradient-to-br from-red-50/60 via-white to-[#fff5ec] py-16 md:py-24 relative overflow-hidden border-b border-red-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                        {/* Left Content */}
                        <div className="lg:col-span-7">
                            <Reveal>
                                <div className="flex flex-wrap items-center gap-2 mb-6">
                                    <div className="inline-flex items-center gap-2 bg-[#D32F2F] text-white px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-sm">
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        {heroBadgeText}
                                    </div>
                                    <span className="text-gray-400 text-xs hidden sm:inline">•</span>
                                    <span className="text-xs font-bold text-gray-600 bg-white border border-red-100 px-3 py-1 rounded-full shadow-xs">
                                        {doctorQual.split("·")[0] || "Certified Specialist"}
                                    </span>
                                </div>
                            </Reveal>

                            <Reveal delay={70}>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.12] tracking-tight mb-6">
                                    {heroTitle}
                                </h1>
                            </Reveal>

                            <Reveal delay={130}>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-normal">
                                    {heroDesc}
                                </p>
                            </Reveal>

                            {/* Credentials Badges Bar */}
                            <Reveal delay={160}>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {[
                                        `${doctorName} (Lead Surgeon)`,
                                        doctorCard.experience || "15+ Yrs Specialization",
                                        "5,000+ Completed Surgeries",
                                        "Turkey Sapphire FUE Certified",
                                    ].map((badge, idx) => (
                                        <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D32F2F]" />
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>

                            <Reveal delay={190}>
                                <div className="flex flex-wrap items-center gap-4 mb-10">
                                    <a
                                        href={WA}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-sm transition-all shadow-md shadow-red-700/20 hover:-translate-y-0.5"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Surgeon Hero Book", buttonLocation: "Surgeon Hero" })}
                                    >
                                        <MessageCircle className="w-4.5 h-4.5" /> Book Direct Surgical Assessment
                                    </a>
                                    <a
                                        href={TEL}
                                        className="inline-flex items-center gap-3 border-2 border-gray-200 hover:border-[#D32F2F] text-gray-800 hover:text-[#D32F2F] font-bold py-4 px-7 rounded-xl text-sm transition-all bg-white"
                                        onClick={() => trackCTA({ type: "call", ctaName: "Surgeon Hero Call", buttonLocation: "Surgeon Hero" })}
                                    >
                                        <Phone className="w-4 h-4 text-[#D32F2F]" /> Call +91-9217958539
                                    </a>
                                </div>
                            </Reveal>

                            <Reveal delay={250}>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {(pageData?.hero?.stats?.length
                                        ? pageData.hero.stats.map(s => ({ num: s.value, label: s.label }))
                                        : [
                                            { num: "15+", label: "Years Exp." },
                                            { num: "5,000+", label: "Surgeries" },
                                            { num: "95%+", label: "Graft Survival" },
                                            { num: "4.9★", label: "Google Rating" },
                                        ]).map((s, i) => (
                                        <div key={i} className="bg-white border border-red-100 rounded-xl p-3.5 flex flex-col gap-0.5 shadow-2xs">
                                            <span className="text-2xl font-black text-gray-900">{s.num}</span>
                                            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        {/* Right Surgeon Image Box (Enhanced Doctor Portrait) */}
                        <div className="lg:col-span-5">
                            <Reveal dir="right">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-red-100 group">
                                    <Image
                                        src={doctorImg}
                                        alt={doctorImgAlt}
                                        width={640}
                                        height={520}
                                        className="w-full h-96 md:h-[520px] object-cover object-top group-hover:scale-103 transition-transform duration-700"
                                        unoptimized
                                        priority
                                    />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)" }} />
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-1.5 shadow-md border border-white/50">
                                        <span className="text-[#D32F2F] font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
                                            <ShieldCheck className="w-4 h-4 text-[#D32F2F]" /> 100% Doctor Performed
                                        </span>
                                    </div>
                                    <div className="absolute bottom-5 left-5 right-5 text-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="w-6 h-0.5 rounded-full bg-[#FFC107]" />
                                            <span className="text-[11px] font-bold text-[#FFC107] uppercase tracking-widest">{doctorCard.designation || "Lead Surgeon"}</span>
                                        </div>
                                        <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{doctorName}</p>
                                        <p className="text-xs text-red-100 font-medium mt-1">{doctorQual}</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2: WHY SURGICAL SKILL MATTERS
                → Swapped Card 1 and Card 2 images
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header row — title left, styled lead text right */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Why Surgical Skill Matters
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-lg">
                            What Makes Us<br />The Best
                        </h2>
                        
                        {/* Enhanced right text block */}
                        <div className="max-w-md border-l-4 border-[#D32F2F] pl-5 py-2 bg-white/70 rounded-r-2xl border border-y-0 border-r-0 border-red-100 shadow-2xs">
                            <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed font-medium">
                                At Ryan Clinic, <span className="text-[#D32F2F] font-bold">excellence is not a promise — it's our track record</span>. From Turkey's finest techniques to 5,000+ successful patient outcomes, here is why patients trust our surgical leadership.
                            </p>
                        </div>
                    </div>

                    {/* 4-card horizontal image track */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* Card 1: Wide featured card (Image swapped to turkey-doctor.jpg) */}
                        <div className="relative rounded-2xl overflow-hidden h-80 group shadow-sm sm:col-span-2 lg:col-span-1">
                            <Image src="/uploads/turkey-doctor.jpg" alt="Turkey's Best Technique" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#D32F2F]/90 via-[#D32F2F]/50 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <span className="text-4xl font-bold text-[#FFC107] block mb-1">01</span>
                                <h3 className="text-base font-bold text-white mb-1">Turkey's Best Technique</h3>
                                <p className="text-xs text-white/80 leading-relaxed mb-4">
                                    We bring Turkey's most advanced hair restoration methods to India, delivering precise, natural-looking results that set us apart.
                                </p>
                                <a href={WA} className="inline-flex items-center gap-1.5 bg-[#FFC107] hover:bg-amber-400 text-black font-bold text-[11px] px-4 py-2 rounded-lg transition-all">
                                    BOOK FREE CONSULT →
                                </a>
                            </div>
                        </div>

                        {/* Card 2 (Image swapped to 1752734248947-Hair Transplant 1.jpg) */}
                        <div className="relative rounded-2xl overflow-hidden h-80 group shadow-sm">
                            <Image src="/uploads/1752734248947-Hair Transplant 1.jpg" alt="95% Graft Survival" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <span className="text-4xl font-bold text-[#FFC107] block mb-1">02</span>
                                <h3 className="text-base font-bold text-white">95% Graft Survival</h3>
                                <p className="text-xs text-gray-300 mt-1">Gentle, precise extraction protects follicle viability.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative rounded-2xl overflow-hidden h-80 group shadow-sm">
                            <Image src="/uploads/about-one.jpg" alt="Completely Pain-Free" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#D32F2F]/85 via-black/30 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <span className="text-4xl font-bold text-[#FFC107] block mb-1">03</span>
                                <h3 className="text-base font-bold text-white">Completely Pain-Free</h3>
                                <p className="text-xs text-gray-300 mt-1">Premium local anaesthesia throughout your procedure.</p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="relative rounded-2xl overflow-hidden h-80 group shadow-sm">
                            <Image src="/uploads/service-two.jpg" alt="12 Years Strong" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <span className="text-4xl font-bold text-[#FFC107] block mb-1">04</span>
                                <h3 className="text-base font-bold text-white">12 Years Strong</h3>
                                <p className="text-xs text-gray-300 mt-1">Delhi's most experienced surgeon-led hair clinic.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3: WHAT MAKES A GREAT SURGEON
                → Adjusted heading size to text-2xl sm:text-3xl md:text-4xl font-bold
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Top label */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Trusted by 5,000+ Patients
                        </span>
                    </div>

                    {/* Heading + intro */}
                    <div className="max-w-3xl mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.2] tracking-tight">
                            What Makes a Great Surgeon.{" "}
                            <span className="text-[#D32F2F]">
                                India's Only Turkey Technique.
                            </span>
                        </h2>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed my-4 font-normal">
                            Ryan Clinic's surgeon combines Turkey's most advanced Sapphire FUE technique with 15+ years of dedicated hair restoration experience — delivering results that last a lifetime with precision that sets a new standard.
                        </p>
                    </div>

                    {/* 9-cell bordered grid with BOTH Column and Row lines */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 border border-red-200 rounded-2xl overflow-hidden divide-y divide-red-200">
                        {/* Row 1 (Items 0, 1, 2) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 divide-y sm:divide-y-0 sm:divide-x divide-red-200">
                            {surgeonFeatures.slice(0, 3).map((f, i) => (
                                <div key={i} className="group bg-white hover:bg-[#D32F2F] transition-all duration-400 p-8 flex flex-col gap-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight">{f.number}</span>
                                        <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">{f.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors leading-snug">{f.title}</h3>
                                        <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 2 (Items 3, 4, 5) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 divide-y sm:divide-y-0 sm:divide-x divide-red-200">
                            {surgeonFeatures.slice(3, 6).map((f, i) => (
                                <div key={i} className="group bg-white hover:bg-[#D32F2F] transition-all duration-400 p-8 flex flex-col gap-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight">{f.number}</span>
                                        <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">{f.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors leading-snug">{f.title}</h3>
                                        <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 3 (Items 6, 7, 8) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 divide-y sm:divide-y-0 sm:divide-x divide-red-200">
                            {surgeonFeatures.slice(6, 9).map((f, i) => (
                                <div key={i} className="group bg-white hover:bg-[#D32F2F] transition-all duration-400 p-8 flex flex-col gap-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight">{f.number}</span>
                                        <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">{f.icon}</div>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors leading-snug">{f.title}</h3>
                                        <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{f.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4: WHY RYAN CLINIC (Smaller stat cards + Increased image height)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section top label */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Why Choose Ryan Clinic
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* ── Left panel (sticky) — Smaller stat cards & Increased image height */}
                        <div className="lg:sticky lg:top-28">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
                                Why Ryan Clinic Is
                                <br />
                                <span className="text-[#D32F2F]">
                                    The Best Hair Transplant
                                    <br />
                                </span>
                                Surgeon In Delhi
                            </h2>

                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6 max-w-md">
                                Among the many options for a hair transplant surgeon in Delhi, here's what makes Ryan Clinic the choice of 5,000+ patients.
                            </p>

                            {/* Smaller, compact stat cards */}
                            <div className="grid grid-cols-2 gap-2.5 mb-6">
                                {[
                                    { num: "5,000+", label: "Patients Treated" },
                                    { num: "95%+", label: "Graft Survival Rate" },
                                    { num: "₹40,000", label: "Starting Price" },
                                    { num: "18 Months", label: "Follow-Up Support" },
                                ].map((s) => (
                                    <div key={s.label} className="bg-white border border-gray-100 rounded-lg p-2.5 flex flex-col gap-0.5 shadow-2xs">
                                        <span className="text-lg font-extrabold text-gray-900">{s.num}</span>
                                        <span className="text-[10px] text-gray-400 font-bold tracking-wide uppercase">{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Increased clinic image height (h-80 sm:h-96 lg:h-[400px]) */}
                            <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96 lg:h-[400px] shadow-md border border-gray-100">
                                <img
                                    src="/uploads/gallery.jpg"
                                    alt="Ryan Clinic Hair Transplant Surgeon Delhi"
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                                <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />
                                <div className="absolute bottom-0 inset-x-0 p-5">
                                    <span className="block w-6 h-0.5 mb-2 rounded-full bg-yellow-400/80" />
                                    <p className="text-base font-extrabold text-white leading-snug">Trusted By 5,000+ Patients</p>
                                    <p className="text-xs text-white/70 mt-0.5">Delhi Hair Transplant Specialists</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Right panel accordion */}
                        <div>
                            <div className="divide-y divide-gray-100">
                                {whyItems.map((item, i) => (
                                    <div key={i}>
                                        <button
                                            onClick={() => setOpen(open === i ? null : i)}
                                            className="w-full flex items-start gap-5 py-6 text-left group"
                                        >
                                            <span className={`text-xs font-semibold tracking-[0.15em] shrink-0 pt-0.5 transition-colors duration-200 ${open === i ? "text-[#D32F2F]" : "text-gray-600 group-hover:text-[#D32F2F]"}`}>
                                                0{i + 1}
                                            </span>
                                            <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                                                <span className={`font-semibold text-sm md:text-base leading-snug tracking-tight transition-colors duration-200 ${open === i ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                                                    {item.title}
                                                </span>
                                                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${open === i ? "bg-[#D32F2F] border-[#D32F2F] text-white" : "border-gray-200 text-gray-400 group-hover:border-gray-400"}`}>
                                                    <svg className="w-3 h-3 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <p className="pl-10 pb-6 text-xs md:text-sm text-gray-500 leading-relaxed">
                                                {item.body}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={WA}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-4 px-7 text-sm tracking-wide transition-colors rounded-xl justify-center"
                                        onClick={() => trackCTA({ type: "whatsapp", ctaName: "Why Choose Book", buttonLocation: "Why Choose Section" })}
                                    >
                                        Book Your Free Scalp Analysis
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </a>
                                    <a
                                        href={TEL}
                                        className="inline-flex items-center gap-3 border border-gray-200 hover:border-[#D32F2F] text-gray-600 hover:text-[#D32F2F] font-semibold py-4 px-7 text-sm tracking-wide transition-all rounded-xl justify-center"
                                        onClick={() => trackCTA({ type: "call", ctaName: "Why Choose Call", buttonLocation: "Why Choose Section" })}
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                        Call Now
                                    </a>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-3">
                                    Free scalp analysis · Personalized graft count · Transparent pricing · No obligation.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5: THE SURGICAL JOURNEY — Interactive Stepper
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec] border-y border-red-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Label + Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-white border border-red-200 px-4 py-1.5 rounded-full mb-5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-xs font-extrabold tracking-widest uppercase">
                                Step-By-Step Surgical Excellence
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            The Surgeon's Role At <br />
                            <span className="text-[#D32F2F]">Every Step Of Your Procedure</span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5">
                            A great hair transplant surgeon is hands-on at every stage because each step directly shapes your final hairline and graft survival rate.
                        </p>
                    </div>

                    {/* ── Stepper Container ── */}
                    <div className="bg-white rounded-3xl shadow-lg border border-red-100 overflow-hidden">

                        {/* ── Step Progress Bar (top row) ── */}
                        <div className="px-8 pt-10 pb-8 border-b border-gray-100">
                            <div className="flex items-start justify-between relative">

                                {/* connecting line track — behind everything */}
                                <div className="absolute left-5 right-5 top-5 h-0.5 flex" style={{ zIndex: 0 }}>
                                    {surgicalJourney.map((_, idx) => {
                                        if (idx === surgicalJourney.length - 1) return null;
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
                                {surgicalJourney.map((step, idx) => {
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
                                                    ${
                                                        isActive
                                                            ? "bg-[#D32F2F] border-[#D32F2F] text-white scale-110 ring-4 ring-red-100 shadow-red-200 shadow-md"
                                                            : isCompleted
                                                            ? "bg-[#D32F2F] border-[#D32F2F] text-white"
                                                            : "bg-white border-gray-200 text-gray-400 group-hover:border-[#D32F2F] group-hover:text-[#D32F2F]"
                                                    }`}
                                            >
                                                {isCompleted ? (
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
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
                            {surgicalJourney.map((step, idx) => {
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
                                        <div className="flex items-center justify-between mb-1">
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
                                        <p className={`text-xs leading-relaxed transition-all duration-300 overflow-hidden
                                            ${isActive ? "text-gray-500 max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                                            {step.body}
                                        </p>

                                        {/* Surgeon-Led tag */}
                                        <div className={`flex items-center gap-1 text-[10px] font-bold pt-2 mt-auto border-t transition-colors duration-200
                                            ${isActive ? "border-red-100 text-[#D32F2F]" : "border-gray-100 text-gray-300 group-hover:text-gray-400"}`}>
                                            <span>Surgeon-Led Step</span>
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
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-white text-sm font-semibold">
                                    Ready to discuss your hairline design directly with our surgeon?
                                </p>
                            </div>
                            <a
                                href={WA}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-[#D32F2F] font-bold py-3 px-6 rounded-xl text-xs hover:bg-red-50 transition-colors shrink-0"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Step Process Book", buttonLocation: "Surgical Journey Process" })}
                            >
                                Book Surgical Scalp Analysis <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                    </div>
                </div>
            </section>



            {/* ═══════════════════════════════════════════════════════════════
                SECTION 7: SURGEON VS TECHNICIAN (Dual Compare Cards)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            The Critical Difference
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-14">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            Hair Transplant Surgeon vs Technician.{" "}
                            <span className="text-[#D32F2F]">
                                Why It Matters for Your Result.
                            </span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-6 font-normal">
                            In high-volume "graft mills," technicians perform extraction and implantation. At Ryan Clinic, every skilled surgical step is performed by a qualified surgeon — protecting your graft survival and natural hairline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                        {/* Surgeon column — Ryan Clinic */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-red-100 shadow-xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#D32F2F] transition-all duration-300">
                            <div className="absolute top-0 left-0 right-0 h-2 bg-[#D32F2F]" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center font-black text-base shadow-xs">
                                            RC
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-[#D32F2F] uppercase tracking-widest block">Gold Standard</span>
                                            <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                                                Ryan Clinic — 100% Surgeon-Led
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        Certified Precision
                                    </span>
                                </div>

                                <ul className="space-y-3.5 my-6">
                                    {[
                                        "Surgeon personally drafts natural hairline",
                                        "Surgeon extracts grafts with 0.7mm micro-punch",
                                        "Surgeon creates recipient channels (depth & angle)",
                                        "Surgeon implants grafts directly with Choi pen",
                                        "Surgeon monitors 18-month follow-up growth",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 font-semibold">
                                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 stroke-[3]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
                                <p className="text-xs text-gray-500 font-medium">
                                    Zero technicians handling surgical steps. Guaranteed.
                                </p>
                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-xs transition-colors shrink-0 shadow-md"
                                >
                                    Book Direct Surgeon Assessment <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>

                        {/* Technician column — Other Clinics */}
                        <div className="lg:col-span-5 bg-gray-50/80 rounded-3xl border border-gray-200 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-300" />
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-gray-200 text-gray-600 flex items-center justify-center font-black text-base">
                                            OC
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Graft Mills</span>
                                            <h3 className="text-lg font-bold text-gray-800 leading-snug">
                                                Typical Clinics — Technician-Led
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-100 flex items-center gap-1 shrink-0">
                                        <X className="w-4 h-4 text-red-500" /> High Risk
                                    </span>
                                </div>

                                <ul className="space-y-3.5 my-6">
                                    {[
                                        "Hairline drafted by non-medical sales staff",
                                        "Extraction performed by unlicensed assistants",
                                        "Channels opened quickly by technicians",
                                        "Grafts implanted in rushed group shifts",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                                            <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                                <X className="w-3 h-3 stroke-[3]" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-gray-200 mt-4">
                                <p className="text-xs text-red-600 font-semibold flex items-center gap-1.5">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    Technician handling is the #1 cause of graft damage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 8: MEET THE SURGEON (TurkeySpecialists layout)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Our Lead Surgeon
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* ── Left — image (exact pattern from turkeySpecialists.js) */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src={leadSurgeonImg}
                                    alt={`${leadSurgeonName} Lead Hair Transplant Surgeon Delhi`}
                                    width={640}
                                    height={480}
                                    className="w-full h-80 md:h-[480px] object-cover object-top"
                                    loading="lazy"
                                    unoptimized
                                />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                                <div className="absolute bottom-5 left-5 right-5">
                                    <span className="block w-8 h-0.5 mb-2 rounded-full bg-[#FFC107]" />
                                    <p className="text-white font-bold text-lg leading-snug">{leadSurgeonName}</p>
                                    <p className="text-xs mt-1 text-[#FFC107]">{doctorQual}</p>
                                </div>
                            </div>

                            {/* Floating secondary image */}
                            <div className="hidden md:block absolute -bottom-6 -right-6 w-52 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                <Image src="/uploads/about-one.jpg" alt="Ryan Clinic Surgery" fill className="object-cover" unoptimized />
                            </div>

                            {/* Red accent bar */}
                            <div className="absolute top-0 left-0 w-1 h-24 rounded-r-full bg-[#D32F2F]" />
                        </div>

                        {/* ── Right — content */}
                        <div className="lg:pl-4">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-5 text-gray-900">
                                {pageData?.leadSurgeon?.badge?.text || "India's Only"}
                                <br />
                                <span className="text-[#D32F2F]">{leadSurgeonName}</span>
                            </h2>

                            <p className="text-sm md:text-[15px] leading-relaxed mb-8 text-gray-500">
                                {leadSurgeonDesc}
                            </p>

                            {/* Highlight list */}
                            <ul className="space-y-3 mb-8">
                                {(pageData?.leadSurgeon?.qualifications?.length
                                    ? pageData.leadSurgeon.qualifications.map(q => q.text)
                                    : [
                                        "15+ Years Dedicated Hair Restoration Experience",
                                        "5,000+ Completed Hair Transplant Surgeries",
                                        "MBBS (AIIMS) & MS (PGIMER) Qualified",
                                        "Turkey Sapphire FUE Fellowship Certified",
                                    ]).map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#D32F2F]">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-sm leading-snug text-gray-600">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                                {(pageData?.leadSurgeon?.stats?.length
                                    ? pageData.leadSurgeon.stats.map(s => ({ num: s.value, label: s.label }))
                                    : [
                                        { num: "15+", label: "Years of Excellence" },
                                        { num: "5K+", label: "Successful Surgeries" },
                                        { num: "95%+", label: "Graft Survival Rate" },
                                        { num: "4.9★", label: "Google Rating" },
                                    ]).map((s) => (
                                    <div key={s.label} className="rounded-xl p-4 text-center bg-white border border-gray-100">
                                        <p className="text-xl font-bold text-gray-900">{s.num}</p>
                                        <p className="text-[10px] font-medium mt-0.5 text-gray-400">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2.5 font-semibold text-sm py-4 px-7 rounded-xl text-white transition-opacity hover:opacity-90 bg-[#D32F2F] shadow-md"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Meet Surgeon Book", buttonLocation: "Meet Surgeon Section" })}
                                >
                                    Book Consultation with {leadSurgeonName}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </a>
                                <a
                                    href={TEL}
                                    className="inline-flex items-center gap-2.5 font-semibold text-sm py-4 px-7 rounded-xl border border-gray-200 text-gray-600 hover:border-[#D32F2F] hover:text-[#D32F2F] transition-all"
                                    onClick={() => trackCTA({ type: "call", ctaName: "Meet Surgeon Call", buttonLocation: "Meet Surgeon Section" })}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    Call Now
                                </a>
                            </div>
                            <p className="text-[11px] mt-3 text-gray-400">
                                Free scalp analysis · Graft count · Full cost breakdown — zero obligation.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 9: QUESTIONS TO ASK & RED FLAGS
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Due Diligence Checklist
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* Questions accordion */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-8">
                                Questions To Ask A Surgeon
                                <br />
                                <span className="text-[#D32F2F]">Before Booking</span>
                            </h2>

                            <div className="divide-y divide-gray-100">
                                {questionsList.map((item, i) => (
                                    <div key={i}>
                                        <button
                                            onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                                            className="w-full flex items-start gap-5 py-6 text-left group"
                                        >
                                            <span className={`text-xs font-bold tracking-[0.15em] shrink-0 pt-0.5 transition-colors duration-200 ${openQuestion === i ? "text-[#D32F2F]" : "text-gray-600 group-hover:text-[#D32F2F]"}`}>
                                                0{i + 1}
                                            </span>
                                            <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                                                <span className={`font-bold text-sm leading-snug tracking-tight transition-colors duration-200 ${openQuestion === i ? "text-gray-900" : "text-gray-700 group-hover:text-gray-900"}`}>
                                                    {item.q}
                                                </span>
                                                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${openQuestion === i ? "bg-[#D32F2F] border-[#D32F2F] text-white" : "border-gray-200 text-gray-400 group-hover:border-gray-400"}`}>
                                                    <svg className="w-3 h-3 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ transform: openQuestion === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openQuestion === i ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
                                            <div className="pl-10 pb-6">
                                                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                                    <strong className="text-gray-700">Why this matters: </strong>{item.ans}
                                                </p>
                                                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-xs text-[#D32F2F] font-bold leading-relaxed">
                                                    ✓ Ryan Clinic: {item.std}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Red Flags card — right side sticky solid red */}
                        <div className="lg:sticky lg:top-28">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-8">
                                Red Flags To Avoid
                                <br />
                                <span className="text-[#D32F2F]">When Choosing a Surgeon</span>
                            </h2>

                            <div className="flex flex-col justify-between bg-red-700 rounded-2xl p-7 md:p-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <AlertTriangle className="w-5 h-5 text-[#FFC107]" />
                                        <span className="text-[11px] font-semibold text-[#FFC107] uppercase tracking-[0.18em]">
                                            Avoid These Warning Signs
                                        </span>
                                    </div>

                                    <ul className="space-y-2.5 mb-7">
                                        {[
                                            "No named, credentialed surgeon on website",
                                            "Vagueness about surgeon vs technician role",
                                            "No real before-and-afters of surgeon's patients",
                                            "Unverifiable or exaggerated experience claims",
                                            "High pressure to book or pay immediately",
                                            "Inconsistent claims across site & advertisements",
                                        ].map((item) => (
                                            <li key={item} className="flex items-center gap-2.5 text-xs text-gray-300">
                                                <span className="w-4 h-4 rounded-full bg-[#FFC107] flex items-center justify-center shrink-0">
                                                    <AlertTriangle className="w-2.5 h-2.5 text-black" />
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#FFC107] text-gray-300 hover:text-[#FFC107] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl w-full"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Red Flags Book", buttonLocation: "Red Flags Section" })}
                                >
                                    Book Verified Consultation →
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 10: PROCEDURES, COST & LOCATION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            Procedures & Location
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-14">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            Procedures Performed By Our Surgeon.{" "}
                            <span className="text-[#D32F2F]">Starting From ₹40,000.</span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-6">
                            Free scalp analysis included. Transparent per-graft pricing confirmed after your consultation — before you commit. 0% EMI available.
                        </p>
                    </div>

                    {/* Procedures grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-red-200 border border-red-200 rounded-2xl overflow-hidden mb-10">
                        {[
                            { icon: <Scissors className="w-5 h-5" />, num: "01", title: "Sapphire FUE Hair Transplant", text: "Turkey's authentic Sapphire FUE with original Choi Pen. Sharper blades, less trauma, 95%+ graft survival." },
                            { icon: <Sparkles className="w-5 h-5" />, num: "02", title: "Turkish Technique Choi Pen Implantation", text: "Direct hair implantation using Choi Pen — no channel pre-opening, maximum density with minimal trauma." },
                            { icon: <Compass className="w-5 h-5" />, num: "03", title: "Natural Hairline Design", text: "Soft, micro-irregular hairline design tailored to facial structure, age, and long-term loss patterns." },
                            { icon: <ShieldCheck className="w-5 h-5" />, num: "04", title: "Beard & Moustache Restoration", text: "Precise beard and moustache transplant using FUE — natural angle, direction, and density." },
                            { icon: <Award className="w-5 h-5" />, num: "05", title: "Female Hair Transplant", text: "Specialist female hairline and density restoration — delicate extraction to protect existing hair." },
                            { icon: <Eye className="w-5 h-5" />, num: "06", title: "PRP & Medical Hair Therapy", text: "Platelet-Rich Plasma therapy and medically guided treatment plans for early hair loss management." },
                        ].map((f, i) => (
                            <div key={i} className="group bg-white hover:bg-[#D32F2F] transition-all duration-400 p-8 flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight">{f.num}</span>
                                    <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">{f.icon}</div>
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors leading-snug">{f.title}</h3>
                                    <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{f.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Internal links + Location */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-700 mb-3">Related Pages</p>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/hair-transplant-surgery-in-delhi" className="text-[#D32F2F] hover:underline font-semibold text-xs">Hair Transplant Surgery in Delhi</Link>
                                <span className="text-gray-300">·</span>
                                <Link href="/cost/hair-transplant-cost-in-delhi" className="text-[#D32F2F] hover:underline font-semibold text-xs">Hair Transplant Cost in Delhi</Link>
                                <span className="text-gray-300">·</span>
                                <Link href="/prp-hair-loss-treatment-in-delhi" className="text-[#D32F2F] hover:underline font-semibold text-xs">PRP Treatment in Delhi</Link>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100">
                            <p className="text-xs font-bold text-gray-900 mb-1">Visit Our Surgeon In Delhi</p>
                            <p className="text-xs text-gray-500 mb-2">CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034. Accessible via Pitampura Metro Station (Red Line).</p>
                            <p className="text-xs font-bold text-[#D32F2F]">+91-9217958539 · Mon–Sat, 9 AM – 7 PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SPLIT CTA — Just above FAQ
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">

                        {/* ── Left card — main CTA copy */}
                        <div className="flex flex-col justify-between rounded-2xl p-2 md:p-8">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                                    <span className="text-[11px] font-semibold text-[#D32F2F] uppercase tracking-[0.18em]">
                                        Ryan Clinic
                                    </span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-[1.2] tracking-tight mb-4">
                                    Start Your Hair
                                    <br />
                                    Transplant Journey
                                    <br />
                                    <span className="text-[#D32F2F]">Today — Free Consult</span>
                                </h2>

                                <p className="text-sm text-gray-500 leading-relaxed mb-7">
                                    Turkey's exclusive Sapphire FUE, 5,000+ patients, 4.9★ Google rating. Get your free scalp analysis, exact graft count &amp; cost breakdown — zero obligation.
                                </p>

                                <div className="flex gap-6 mb-7">
                                    {[
                                        { num: "15+", label: "Years" },
                                        { num: "4.9★", label: "Rating" },
                                    ].map((s) => (
                                        <div key={s.label}>
                                            <p className="text-xl font-bold text-[#D32F2F]">{s.num}</p>
                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-5 text-sm tracking-wide transition-colors rounded-xl flex-1"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Split CTA Book", buttonLocation: "Surgeon Split CTA" })}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.847L.057 23.12a.75.75 0 00.92.92l5.273-1.463A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.523-5.18-1.43l-.372-.223-3.857 1.072 1.072-3.857-.223-.372A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                    </svg>
                                    Book Free Consultation
                                </a>
                                <a
                                    href={TEL}
                                    className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl"
                                    onClick={() => trackCTA({ type: "call", ctaName: "Split CTA Call", buttonLocation: "Surgeon Split CTA" })}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                    Call Now
                                </a>
                            </div>
                        </div>

                        {/* ── Center — large patient result image */}
                        <div className="relative rounded-2xl overflow-hidden min-h-[360px] bg-red-900">
                            <div className="absolute inset-0 bg-linear-to-b from-red-500 to-red-900" />
                            <div
                                className="absolute inset-0 opacity-50"
                                style={{
                                    backgroundImage: 'url("/uploads/images/image2.jpg")',
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <div className="absolute top-4 left-4 z-10">
                                <span className="bg-[#FFC107] text-black text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest rounded-md">
                                    Our Specialist
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent pt-16 pb-5 px-5 z-10">
                                <p className="text-white text-xs font-semibold uppercase tracking-wider">
                                    Real Patient Result
                                </p>
                                <p className="text-gray-400 text-[10px] mt-1">
                                    3,200 grafts · Sapphire FUE · 14 months · Delhi
                                </p>
                            </div>
                        </div>

                        {/* ── Right card — solid red highlight */}
                        <div className="flex flex-col justify-between bg-red-700 rounded-2xl p-7 md:p-8">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-[11px] font-semibold text-[#FFC107] uppercase tracking-[0.18em]">
                                        Why Ryan Clinic?
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                                    Results So Natural —<br />
                                    <span className="text-[#FFC107]">Nobody Will Know</span>
                                </h3>

                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                    Every graft is placed with precise control over angle, depth &amp; direction — mimicking your natural hair growth pattern exactly.
                                </p>

                                <ul className="space-y-2.5 mb-7">
                                    {[
                                        "Original Turkey Choi Pen",
                                        "95%+ graft survival rate",
                                        "Zero visible scarring",
                                        "Permanent for life",
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-2.5 text-xs text-gray-300">
                                            <span className="w-4 h-4 rounded-full bg-[#FFC107] flex items-center justify-center shrink-0">
                                                <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/hair-transplant-results-before-after-gallery"
                                className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#FFC107] text-gray-300 hover:text-[#FFC107] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl w-full"
                            >
                                View All Patient Results →
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 11: FAQ — Exact Homepage faqSection.js Design
                2-col: Left sticky panel (label + h2 + desc + stats + CTA)
                Right: Bordered accordion (numbered, red toggle, red accent rule)
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

                        {/* ── Left sticky panel ── */}
                        <div className="lg:col-span-2 lg:sticky lg:top-28">
                            {/* Section label */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className="block w-8 h-px bg-[#D32F2F]" />
                                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D32F2F]">
                                    Got Questions?
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 text-gray-900">
                                Frequently
                                <br />
                                Asked{" "}
                                <span className="text-[#D32F2F]">Questions</span>
                            </h2>

                            <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-500">
                                Everything you need to know about choosing the right hair transplant surgeon in Delhi — credentials, technique, cost, and results. Still have a question? Our surgeon answers within 24 hours.
                            </p>

                            {/* Stats card */}
                            <div className="rounded-2xl p-6 mb-6 bg-white border border-gray-100">
                                <div className="grid grid-cols-2 gap-5">
                                    {[
                                        { num: "95%+", label: "Graft Survival Rate" },
                                        { num: "4.9★", label: "Google Rating" },
                                        { num: "5K+", label: "Happy Patients" },
                                        { num: "0%", label: "EMI Available" },
                                    ].map((s) => (
                                        <div key={s.label}>
                                            <p className="text-2xl font-bold text-gray-900">{s.num}</p>
                                            <p className="text-[11px] font-medium mt-0.5 text-gray-400">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA button */}
                            <a
                                href={WA}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl text-white w-full justify-center transition-opacity hover:opacity-90 bg-[#D32F2F]"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Ask A Surgeon", buttonLocation: "Surgeon FAQ Section" })}
                            >
                                Ask a Surgeon — Free
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>

                        {/* ── Right accordion ── */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl overflow-hidden border border-gray-100">
                                {activeFaqs.map((faq, i) => {
                                    const isOpen = openFaq === i;
                                    return (
                                        <div
                                            key={i}
                                            style={{ borderBottom: i < activeFaqs.length - 1 ? "1px solid #f3f4f6" : "none" }}
                                        >
                                            <button
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                                                style={{ background: isOpen ? "#f9fafb" : "#ffffff" }}
                                            >
                                                {/* Number + question */}
                                                <div className="flex items-start gap-4 min-w-0">
                                                    <span
                                                        className="text-[11px] font-semibold tracking-[0.12em] shrink-0 pt-0.5"
                                                        style={{ color: isOpen ? "#D32F2F" : "#d1d5db" }}
                                                    >
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <span
                                                        className="font-semibold text-sm md:text-[15px] leading-snug"
                                                        style={{ color: isOpen ? "#111827" : "#374151" }}
                                                    >
                                                        {faq.q}
                                                    </span>
                                                </div>

                                                {/* Toggle icon */}
                                                <span
                                                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200"
                                                    style={{
                                                        background: isOpen ? "#D32F2F" : "transparent",
                                                        borderColor: isOpen ? "#D32F2F" : "#d1d5db",
                                                        color: isOpen ? "#fff" : "#9ca3af",
                                                    }}
                                                >
                                                    <svg
                                                        className="w-3 h-3 transition-transform duration-200"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2.5}
                                                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </span>
                                            </button>

                                            {/* Answer */}
                                            <div
                                                className="overflow-hidden transition-all duration-300 ease-in-out"
                                                style={{
                                                    maxHeight: isOpen ? "300px" : "0",
                                                    opacity: isOpen ? 1 : 0,
                                                    background: "#f9fafb",
                                                }}
                                            >
                                                <div className="px-6 pb-5 pl-14">
                                                    {/* Red accent rule */}
                                                    <span className="block w-6 h-0.5 mb-3 rounded-full bg-[#D32F2F]" />
                                                    <p className="text-sm leading-relaxed text-gray-500">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom note */}
                            <p className="text-xs mt-5 text-center text-gray-400">
                                Can't find your answer?{" "}
                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-semibold underline text-[#D32F2F]"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "FAQ Chat With Surgeon", buttonLocation: "Surgeon FAQ Section" })}
                                >
                                    Chat with our surgeon on WhatsApp →
                                </a>
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* MEDICAL DISCLAIMER */}
            <section className="py-6 bg-gray-50 border-t border-gray-200">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-4 rounded-xl bg-white border border-gray-200 text-[11px] text-gray-500 leading-relaxed">
                        <strong className="text-gray-700">Medical Disclaimer:</strong> Suitability and hair transplant results vary by individual based on donor density, scalp physiology, and post-operative care compliance. A personal scalp consultation with our surgeon determines your candidacy.
                    </div>
                </div>
            </section>

        </div>
    );
}
