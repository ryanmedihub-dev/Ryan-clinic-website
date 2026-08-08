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
    Clock,
    FileText,
    Layers,
    BadgeCheck,
    PenTool,
    Search,
    UserCheck,
    Calendar,
    Star,
    TrendingUp,
    CreditCard,
} from "lucide-react";

const WA = "https://api.whatsapp.com/send?phone=+919217958539&text=Hi%2C%20I%20want%20a%20free%20hair%20transplant%20consultation";
const TEL = "tel:+919911111247";


/* ─── Image Helper ────────────────────────────────────────────────────────── */
function getImageSrc(img, fallback = "/uploads/gallery.jpg") {
    if (!img) return fallback;
    if (typeof img === "string") {
        const trimmed = img.trim();
        return trimmed !== "" ? trimmed : fallback;
    }
    if (typeof img === "object") {
        if (typeof img.url === "string" && img.url.trim() !== "") return img.url.trim();
        if (typeof img.image === "string" && img.image.trim() !== "") return img.image.trim();
        if (typeof img.src === "string" && img.src.trim() !== "") return img.src.trim();
    }
    return fallback;
}

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

/* ─── Static Data ─────────────────────────────────────────────────────────── */
const defaultSurgicalJourney = [
    { num: "01", title: "Consultation & Hairline Design", body: "The surgeon assesses donor density, facial symmetry, and future loss patterns. A soft, micro-irregular hairline is drafted to frame your face naturally for life." },
    { num: "02", title: "Graft Extraction (FUE)", body: "The surgeon extracts individual follicular units from the donor area using fine micro-punches, carefully controlling spacing, depth, and direction to protect graft quality and preserve the appearance of the donor zone." },
    { num: "03", title: "Recipient-Site Creation (Sapphire)", body: "The surgeon creates each recipient site with precise control over angle, direction, depth, and distribution. This stage determines how naturally the transplanted hair will grow and how effectively the available grafts create visual density." },
    { num: "04", title: "Direct Implantation (Turkish Technique)", body: "The surgeon places the prepared grafts according to the planned hairline, growth direction, and density pattern, handling each follicular unit carefully to protect graft viability and achieve a natural-looking result." },
    { num: "05", title: "18-Month Growth & Follow-Up", body: "The surgeon monitors healing and hair-growth progress during follow-up, reviews the development of the transplanted area, and provides post-operative guidance as the final result gradually develops." },
];

/* whyItems / questionsList / faqList are defined inside the component so they
   can reference the CMS-driven leadSurgeonName and cityName variables. */

function buildWhyItems(surgeonName) {
    return [
        { title: "100% Doctor-Led Surgery — Never Technicians", body: `This is the most important thing to verify at any Ryan Clinic. Every surgical step — extraction, channel creation, and implantation — is performed personally by a certified hair transplant surgeon. We never hand any part of your surgery to a technician.` },
        { title: "95%+ Graft Survival Rate", body: "Using the original Choi Pen and a careful graft-preservation protocol, our grafts spend minimal time outside the body. The result is a graft survival rate of 95%+ — well above the Indian industry average of roughly 60–70%." },
        { title: "Sterile, Surgical-Grade Operating Theatre", body: "Every procedure is performed in a sterile operating theatre with single-use, surgical-grade instruments while following recognised safety standards. Patient safety, hygiene, and precision remain at the heart of every procedure." },
        { title: "Transparent Pricing & 0% EMI", body: "Your complete cost — based on your exact graft count after a free scalp analysis — is confirmed before you commit. No hidden charges. Hair transplant surgery starts from ₹40,000, with 0% EMI available on 6 and 12-month plans." },
        { title: "18-Month Follow-Up Support", body: "Ryan Clinic provides free follow-up consultations for 18 months after your procedure. Our WhatsApp support team is available 7 days a week to answer your questions and monitor progress." },
        { title: "Fastest Recovery — Back to Work in 5–7 Days", body: "Our Sapphire FUE technique creates smaller, more precise recipient channels — resulting in less tissue trauma, less swelling, and faster scalp healing. Most patients return to desk work within 5–7 days." },
        { title: "Completely Pain-Free Procedure", body: "Ryan Clinic's Sapphire FUE uses micro-instruments of just 0.7–0.9mm under premium local anaesthesia. The procedure is virtually pain-free throughout. Most patients watch movies or nap comfortably during the 6–8 hour surgery." },
        { title: "Trusted by Celebrities, Influencers & NRI Patients", body: `Ryan Clinic has been trusted by Bollywood actors, Instagram influencers, and NRI patients from the UK, Dubai, USA, and Canada. Thousands of successful procedures with ${surgeonName} speak for themselves.` },
        { title: "Surgeon With a Verifiable Portfolio", body: "We share clear, unedited before-and-after photo portfolios of the surgeon's own patients — particularly hairlines and cases matching your Norwood hair loss stage and scalp type." },
    ];
}

function buildQuestionsList(surgeonName) {
    return [
        { q: "Will you personally perform my extraction and implantation, or will technicians?", ans: "In many high-volume clinics, technicians extract and implant while doctors only drop in. Unskilled technician handling damages graft roots.", std: `At Ryan Clinic, ${surgeonName} personally performs extraction, site creation, and implantation.` },
        { q: "How many hair transplant cases like mine have you done — can I see your own results?", ans: "Generic stock photos mean nothing. You need to verify past cases matching your Norwood hair loss stage and scalp type.", std: "We share clear, unedited before-and-after photo portfolios of the surgeon's own patients." },
        { q: "How long have you focused on hair restoration?", ans: "Hair transplantation is an artistic surgical discipline. An occasional provider lacks the refined technique of a dedicated specialist.", std: `${surgeonName} has 15+ years of dedicated hair restoration focus and 5,000+ completed procedures.` },
        { q: "Which technique do you recommend for me, and why?", ans: "Clinics that push one technique for everyone are prioritizing speed over your optimal outcome.", std: "We evaluate your scalp and offer Sapphire FUE or Turkish Technique Choi Pen based on your graft density needs." },
        { q: "How will you design my hairline for a natural result now and in the future?", ans: "A straight, low hairline looks fake as you age. The surgeon must plan for future natural hair recession.", std: "We build a soft, multi-layered hairline gradient that suits your facial structure for life." },
        { q: "Am I a good candidate, or should I consider medical therapy first?", ans: "Unethical clinics sell surgery to patients with active diffuse thinning or poor donor supply.", std: "We conduct a thorough trichological scalp analysis first and recommend medical management if surgery is premature." },
        { q: "What's the total per-graft cost, and what does aftercare include?", ans: "Hidden charges for anesthesia, post-op wash kits, or follow-ups create unpleasant surprises.", std: "Transparent written per-graft pricing starting at ₹40,000 with 0% EMI and 18 months free follow-up." },
    ];
}

function buildFaqList(surgeonName, cityName) {
    return [
        { q: `How do I find the best hair transplant surgeon in ${cityName}?`, a: "Study the surgeon's own before-and-afters (especially hairlines and cases like yours), confirm the surgeon personally performs the surgery, check years and case volume in hair restoration, verify credentials and registration, and read genuine reviews." },
        { q: "What makes a great hair transplant surgeon?", a: "A combination of surgical precision and aesthetic judgement — clean extraction, natural hairline design, well-distributed density, careful donor management — backed by focused experience and a real portfolio." },
        { q: "What's the difference between a hair transplant surgeon and a technician?", a: "A qualified surgeon should perform the skilled steps — design, extraction, recipient-site creation, and implantation. In many clinics, technicians do much of this, which is a common cause of poor survival and unnatural results. At Ryan Clinic, the surgeon performs every step." },
        { q: "How much experience should a hair transplant surgeon have?", a: "Look for documented years focused on hair restoration and real case volume — and, most importantly, a portfolio of the surgeon's own results with patients similar to you." },
        { q: "Does the surgeon design my hairline?", a: `Yes — at Ryan Clinic the surgeon personally designs your hairline. Hairline design is the most artistic, result-defining part of the surgery and should never be left to a technician.` },
        { q: "Why does surgical skill affect graft survival and how natural the result looks?", a: "Gentle, precise extraction protects follicle viability, and correct angle, depth, and density at implantation create natural growth. Both depend directly on the surgeon's skill; rushed, delegated work puts them at risk." },
        { q: "Should one surgeon perform the whole procedure?", a: "The surgeon should perform all the skilled surgical steps. Consistent, hands-on involvement is what produces a natural, lasting result." },
        { q: `How can I judge a surgeon's skill before booking?`, a: `Ask to see the surgeon's own before-and-afters — particularly hairlines — and cases similar to yours. A skilled hair transplant surgeon in ${cityName} will gladly show their portfolio.` },
        { q: "Who is the hair transplant surgeon at Ryan Clinic?", a: `${surgeonName} is our lead surgeon with extensive experience and thousands of successful hair transplants to their name.` },
        { q: "Is a hair transplant surgeon the same as a dermatologist or plastic surgeon?", a: "A hair transplant surgeon may come from different backgrounds. What matters most is genuine hair-restoration training, real surgical experience, and a portfolio that proves the skill — not one specific specialty." },
        { q: "Can a skilled hair transplant surgeon repair a previous bad transplant?", a: "Often, yes. An experienced surgeon can refine an unnatural hairline, add density, or improve an over-harvested donor area. Revision work demands strong surgical judgement, so it's a good marker of skill." },
        { q: `How much does a hair transplant surgeon in ${cityName} charge?`, a: `It's priced per graft and depends mainly on graft count and technique. At Ryan Clinic the surgeon provides an exact, transparent quote after a free scalp analysis, starting from ₹40,000, with 0% EMI.` },
        { q: `Where can I meet the hair transplant surgeon in ${cityName}?`, a: `Visit our Ryan Clinic centre in ${cityName} to meet the surgeon in person. Check our clinic location details below for the full address, phone, and opening hours.` },
        { q: "How do I book a consultation with the surgeon?", a: "Call or WhatsApp +91-9911111247, or use the booking form. You'll get a scalp analysis, graft count, and cost breakdown with no obligation." },
    ];
}

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
export default function SurgeonPageClient({ pageData, slug }) {
    const trackCTA = useTrackCTA();
    const [open, setOpen] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [openQuestion, setOpenQuestion] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    // Resolve city first so heroTitle fallback can reference it
    const cityFromSlug = (slug || pageData?.slug || "").split("-in-").pop()?.replace(/-/g, " ") || "";
    const rawCityName = pageData?.general?.city || pageData?.city || cityFromSlug;
    // Capitalise each word (e.g. "new delhi" → "New Delhi")
    const cityName = rawCityName
        ? rawCityName.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")
        : "Delhi";

    // Dynamic CMS Data bindings with fallbacks
    const heroTitle = pageData?.hero?.title || pageData?.title || `Best Hair Transplant Surgeon in ${cityName}`;
    const heroDesc = pageData?.hero?.description || "Your result depends less on the clinic name or machine used, and more on the hands and artistic eye of your surgeon. At Ryan Clinic, your hair transplant is 100% surgeon-led from start to finish — never delegated to technicians.";
    const heroBadgeText = pageData?.hero?.badge?.text || "Ryan Clinic · Surgical Excellence";

    const doctorCard = pageData?.hero?.doctorCard || {};
    const doctorName = doctorCard.doctorName || pageData?.leadSurgeon?.doctorName || pageData?.doctorName || "Dr. Pranendra Singh";
    const doctorQual = doctorCard.qualification || "MBBS (AIIMS) · MS (PGIMER) · Turkey FUE Specialist";
    const doctorImg = getImageSrc(doctorCard.image || pageData?.leadSurgeon?.doctorImage, "/uploads/turkey-doctor.jpg");
    const doctorImgAlt = doctorCard.image?.alt || `${doctorName} Hair Transplant Surgeon ${cityName}`;

    const leadSurgeonName = doctorName;
    const leadSurgeonDesc = pageData?.leadSurgeon?.description || `${leadSurgeonName} is India's foremost authority on Turkey's Sapphire FUE technique. With 15+ years and 5,000+ procedures, the surgeon personally performs every hairline design, graft extraction, and implantation step for ${cityName} patients.`;
    const leadSurgeonImg = getImageSrc(pageData?.leadSurgeon?.doctorImage, doctorImg);

    // Dynamic lists — built using CMS-resolved surgeon name and city
    const cmsSteps = pageData?.surgeonRole?.steps;
    const surgicalJourney = (cmsSteps && cmsSteps.length > 0)
        ? cmsSteps.map((s, idx) => ({
            num: s.num || String(s.stepNumber || idx + 1).padStart(2, "0"),
            title: s.title || defaultSurgicalJourney[idx]?.title || "",
            body: s.body || s.description || defaultSurgicalJourney[idx]?.body || "",
        }))
        : defaultSurgicalJourney;

    const whyItems = buildWhyItems(leadSurgeonName);
    const questionsList = buildQuestionsList(leadSurgeonName);

    const activeFaqs = (pageData?.faq?.faqs?.length
        ? pageData.faq.faqs.map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
        : (pageData?.faq?.items?.length
            ? pageData.faq.items.map(f => ({ q: f.question || f.q, a: f.answer || f.a }))
            : buildFaqList(leadSurgeonName, cityName)));

    return (
        <div className="bg-white text-gray-900 font-sans selection:bg-[#D32F2F] selection:text-white">

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1: OUR LEAD SURGEON (Top Hero)
                Mandatory SEO Heading 1: "Best Hair Transplant Surgeon in Delhi"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-12 md:py-20 bg-[#fff5ec] relative overflow-hidden border-b border-orange-100/60">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.leadSurgeon?.badge?.text || "OUR LEAD SURGEON"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                        {/* ── Left — Image Card */}
                        <div className="relative">
                            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 border-white/80">
                                <Image
                                    src={leadSurgeonImg}
                                    alt={`${leadSurgeonName} Hair Transplant Surgeon ${cityName}`}
                                    width={640}
                                    height={480}
                                    className="w-full h-80 md:h-[480px] object-cover object-top"
                                    priority
                                    unoptimized
                                />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                                <div className="absolute bottom-5 left-5 right-5 z-10">
                                    <span className="block w-8 h-0.5 mb-2 rounded-full bg-[#FFC107]" />
                                    <p className="text-white font-bold text-lg sm:text-xl leading-snug">
                                        {leadSurgeonName} — Hair Transplant Surgeon
                                    </p>
                                    <p className="text-xs mt-1 text-[#FFC107] font-medium">{doctorQual}</p>
                                </div>
                            </div>

                            {/* Floating secondary collage image */}
                            <div className="hidden md:block absolute -bottom-6 -right-6 w-52 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white z-20">
                                <Image src="/uploads/about-one.jpg" alt="Ryan Clinic Surgery" fill className="object-cover" unoptimized />
                            </div>

                            {/* Red accent bar on top left */}
                            <div className="absolute top-0 left-0 w-1.5 h-24 rounded-r-full bg-[#D32F2F] z-10" />
                        </div>

                        {/* ── Right — Content */}
                        <div className="lg:pl-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-5 text-gray-900">
                                {pageData?.leadSurgeon?.heading || `Best Hair Transplant Surgeon in ${cityName}`}
                            </h1>

                            <p className="text-sm md:text-[15px] leading-relaxed mb-8 text-gray-600 font-normal">
                                {leadSurgeonDesc}
                            </p>

                            {/* Highlight list */}
                            <ul className="space-y-3 mb-8">
                                {(pageData?.leadSurgeon?.qualifications?.length
                                    ? pageData.leadSurgeon.qualifications.map(q => q.text)
                                    : [
                                        "MBBS — All India Institute of Medical Sciences (AIIMS)",
                                        "MS — Post Graduate Institute of Medical Education and Research (PGIMER)",
                                        "Turkey FUE Fellowship — Istanbul Hair Restoration Centre",
                                        "Member — International Society of Hair Restoration Surgery (ISHRS)",
                                    ]).map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#D32F2F]">
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">{item}</span>
                                        </li>
                                    ))}
                            </ul>

                            {/* Stats row (4 cards) */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                                {(pageData?.leadSurgeon?.stats?.length
                                    ? pageData.leadSurgeon.stats.map(s => ({ num: s.value, label: s.label }))
                                    : [
                                        { num: "15+", label: "Years Experience" },
                                        { num: "5,000+", label: "Procedures" },
                                        { num: "AIIMS", label: "MBBS" },
                                        { num: "Turkey", label: "FUE Certified" },
                                    ]).map((s, idx) => (
                                        <div key={idx} className="rounded-xl p-3.5 sm:p-4 text-center bg-white border border-gray-100 shadow-2xs">
                                            <p className="text-xl sm:text-2xl font-black text-gray-900">{s.num}</p>
                                            <p className="text-[11px] font-medium mt-0.5 text-gray-500">{s.label}</p>
                                        </div>
                                    ))}
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={WA}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2.5 font-bold text-xs sm:text-sm py-4 px-6 sm:px-7 rounded-xl text-white transition-all hover:bg-red-700 bg-[#D32F2F] shadow-md shadow-red-700/20 hover:-translate-y-0.5"
                                    onClick={() => trackCTA({ type: "whatsapp", ctaName: "Lead Surgeon Hero Book", buttonLocation: "Hero Section" })}
                                >
                                    Book Consultation with {leadSurgeonName} — Hair Transplant Surgeon
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <a
                                    href={TEL}
                                    className="inline-flex items-center gap-2.5 font-bold text-xs sm:text-sm py-4 px-6 rounded-xl border border-gray-300 text-gray-700 bg-white hover:border-[#D32F2F] hover:text-[#D32F2F] transition-all shadow-2xs"
                                    onClick={() => trackCTA({ type: "call", ctaName: "Lead Surgeon Hero Call", buttonLocation: "Hero Section" })}
                                >
                                    <Phone className="w-4 h-4 text-[#D32F2F]" />
                                    Call Now
                                </a>
                            </div>

                            <p className="text-[11px] sm:text-xs mt-3.5 text-gray-500 font-medium">
                                Free scalp analysis — Graft count — Full cost breakdown — zero obligation.
                            </p>
                        </div>

                    </div>
                </div>
            </section>



            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2: WHY SURGICAL SKILL MATTERS
                Mandatory SEO Heading 2: "Why Surgical Skill Matters for Your Hair Transplant"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header row — title left, styled lead text right */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            {pageData?.whySkill?.badge?.text || "Why Surgical Skill Matters"}
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight max-w-2xl">
                            {pageData?.whySkill?.heading || `Why a skilled hair transplant surgeon in ${cityName} matters more than anything else`}
                        </h2>

                        {/* Enhanced right text block */}
                        <div className="max-w-md border-l-4 border-[#D32F2F] pl-5 py-2 bg-white/70 rounded-r-2xl border border-y-0 border-r-0 border-red-100 shadow-2xs">
                            <p className="text-gray-800 text-sm md:text-[15px] leading-relaxed font-medium">
                                {pageData?.whySkill?.description || (
                                    <>At Ryan Clinic, <span className="text-[#D32F2F] font-bold">excellence is not a promise — it's our track record</span>. From Turkey's finest techniques to 5,000+ successful patient outcomes, here is why patients trust our surgical leadership.</>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Dynamic skill-reason cards — sourced from pageData.whySkill.cards (MongoDB) */}
                    {(() => {
                        const defaultCards = [
                            { num: "01", title: "Graft Survival", body: "Careful extraction, minimal handling, correct preservation, and precise implantation all protect follicle viability. Each of these steps is a direct reflection of surgical skill and directly influences how many grafts survive and grow.", image: "/uploads/turkey-doctor.jpg", gradient: "from-[#D32F2F]/90 via-[#D32F2F]/50", showCta: true },
                            { num: "02", title: "Hairline Artistry", body: "The surgeon determines the shape, irregularity, direction and angle of each graft at the frontal edge — creating an aesthetic design that complements your facial proportions and looks completely natural.", image: "/uploads/1752734248947-Hair Transplant 1.jpg", gradient: "from-black/85 via-black/30" },
                            { num: "03", title: "Density & Coverage", body: "A limited donor supply must be strategically distributed across the scalp. Surgical planning determines how grafts are placed to achieve the most visually effective density and coverage for your pattern of loss.", image: "/uploads/about-one.jpg", gradient: "from-[#D32F2F]/85 via-black/30" },
                            { num: "04", title: "Donor Management", body: "Donor hair is finite and cannot be replaced. A skilled surgeon extracts strategically — protecting the donor area from over-harvesting while ensuring enough grafts are available for both current and any future restoration.", image: "/uploads/service-two.jpg", gradient: "from-black/85 via-black/30" },
                            { num: "05", title: "Patient Safety", body: "Qualified surgical oversight, sterile protocols, sound patient selection and careful planning protect safety throughout the procedure. Good surgical judgement — not just equipment — is what keeps patients safe.", image: "/uploads/gallery.jpg", gradient: "from-black/85 via-black/30" },
                        ];
                        const cards = pageData?.whySkill?.cards?.length ? pageData.whySkill.cards : defaultCards;
                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {cards.map((card, i) => (
                                    <div key={i} className="relative rounded-2xl overflow-hidden h-80 group shadow-sm">
                                        <Image
                                            src={getImageSrc(card.image || card.image?.url, defaultCards[i % defaultCards.length]?.image || "/uploads/gallery.jpg")}
                                            alt={card.title || "Surgical skill"}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                            unoptimized
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient || defaultCards[i % defaultCards.length]?.gradient || "from-black/85 via-black/30"} to-transparent`} />
                                        <div className="absolute bottom-5 left-5 right-5 text-white">
                                            <span className="text-4xl font-bold text-[#FFC107] block mb-1">{card.num || String(i + 1).padStart(2, "0")}</span>
                                            <h3 className="text-base font-bold text-white mb-1">{card.title}</h3>
                                            <p className="text-xs text-white/80 leading-relaxed" style={{ marginBottom: card.showCta ? "1rem" : undefined }}>{card.body}</p>
                                            {(card.showCta || i === 0) && (
                                                <a href={WA} className="inline-flex items-center gap-1.5 bg-[#FFC107] hover:bg-amber-400 text-black font-bold text-[11px] px-4 py-2 rounded-lg transition-all">
                                                    BOOK FREE CONSULT →
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3: WHAT MAKES A QUALIFIED SURGEON
                Mandatory SEO Heading 3: "What Makes a Qualified Hair Transplant Surgeon?"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Top label */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            {pageData?.benefits?.badge?.text || "Trusted by 5,000+ Patients"}
                        </span>
                    </div>

                    {/* Heading + intro */}
                    <div className="max-w-3xl mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.2] tracking-tight">
                            {pageData?.benefits?.heading || `What makes the best hair transplant surgeon in ${cityName}`}
                        </h2>
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed my-4 font-normal">
                            {pageData?.benefits?.description || "Ryan Clinic's surgeon combines Turkey's most advanced Sapphire FUE technique with 15+ years of dedicated hair restoration experience — delivering results that last a lifetime with precision that sets a new standard."}
                        </p>
                    </div>

                    {/* Dynamic surgeon-quality cards — sourced from pageData.benefits.items (MongoDB) */}
                    {(() => {
                        const defaultItems = [
                            { number: "01", title: "Hands-On Mastery", text: "The surgeon personally performs or directly controls every critical surgical stage — extraction, recipient-site creation, and implantation — rather than delegating essential surgical work to technicians.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg> },
                            { number: "02", title: "Aesthetic Judgement", text: "The surgeon understands facial proportions, age, natural growth direction and long-term hair-loss patterns — and applies that understanding when designing the hairline and distributing grafts for a result that looks natural.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
                            { number: "03", title: "Deep Focused Experience", text: "Meaningful experience comes from sustained focus on hair restoration and real exposure to a wide range of hair-loss patterns and case types — not occasional procedures performed alongside unrelated treatments.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
                            { number: "04", title: "Technical Range", text: "A skilled surgeon understands multiple hair restoration techniques — FUE, Sapphire FUE, DHI — and selects the most appropriate method based on your individual scalp, graft count, and density needs, rather than applying one approach to every patient.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                            { number: "05", title: "Honesty & Patient Selection", text: "A responsible surgeon assesses whether each patient is a suitable surgical candidate, sets realistic expectations, explains limitations honestly, and recommends non-surgical management when surgery is not yet appropriate — without applying pressure to proceed.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
                            { number: "06", title: "Real Patient Portfolio", text: "Patients should be able to review genuine before-and-after cases showing hairline design, density distribution, donor zone management, and natural results across a range of hair-loss patterns — not stock imagery or unverifiable claims.", icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
                        ];
                        const items = pageData?.benefits?.items?.length
                            ? pageData.benefits.items.map((item, i) => ({ ...defaultItems[i], ...item, icon: defaultItems[i]?.icon }))
                            : defaultItems;
                        const rows = [items.slice(0, 3), items.slice(3, 6)];
                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-3 border border-red-200 rounded-2xl overflow-hidden divide-y divide-red-200">
                                {rows.map((row, ri) => (
                                    <div key={ri} className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 divide-y sm:divide-y-0 sm:divide-x divide-red-200">
                                        {row.map((f, i) => (
                                            <div key={i} className="group bg-white hover:bg-[#D32F2F] transition-all duration-400 p-8 flex flex-col gap-5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-3xl font-light text-red-300 group-hover:text-white/30 transition-colors tracking-tight">{f.number || f.num || String(ri * 3 + i + 1).padStart(2, "0")}</span>
                                                    <div className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-white/15 flex items-center justify-center text-[#D32F2F] group-hover:text-white transition-all duration-300">{f.icon}</div>
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-white mb-2 transition-colors leading-snug">{f.title}</h3>
                                                    <p className="text-xs text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors">{f.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4: WHY CHOOSE LEAD SURGEON
                Mandatory SEO Heading 4: "Why Choose Dr. Pranendra Singh as Your Hair Transplant Surgeon in Delhi?"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section top label */}
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            {pageData?.whyClinic?.badge?.text || "Why Choose Ryan Clinic"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* ── Left panel (sticky) */}
                        <div className="lg:sticky lg:top-28">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
                                {pageData?.whyClinic?.heading || `Why Choose ${leadSurgeonName} as Your Hair Transplant Surgeon in ${cityName}?`}
                            </h2>

                            <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed mb-6 max-w-md">
                                {pageData?.whyClinic?.description || `Among the many options for a hair transplant surgeon in ${cityName}, here's what makes ${leadSurgeonName} at Ryan Clinic the choice of 5,000+ patients.`}
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

                            {/* Clinic image */}
                            <div className="relative rounded-2xl overflow-hidden h-80 sm:h-96 lg:h-[400px] shadow-md border border-gray-100">
                                <img
                                    src="/uploads/gallery.jpg"
                                    alt={`${leadSurgeonName} Hair Transplant Surgeon ${cityName}`}
                                    className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
                                <div className="absolute inset-y-0 left-0 w-1 bg-[#D32F2F]" />
                                <div className="absolute bottom-0 inset-x-0 p-5">
                                    <span className="block w-6 h-0.5 mb-2 rounded-full bg-yellow-400/80" />
                                    <p className="text-base font-extrabold text-white leading-snug">Trusted By 5,000+ Patients</p>
                                    <p className="text-xs text-white/70 mt-0.5">{cityName} Hair Transplant Specialists</p>
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
                SECTION 5: THE SURGICAL JOURNEY
                Mandatory SEO Heading 5: "The Role of the Surgeon in Every Step of Your Hair Transplant"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec] border-y border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Section Label + Header */}
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 bg-white border border-red-200 px-4 py-1.5 rounded-full mb-5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                            <span className="text-[#D32F2F] text-xs font-extrabold tracking-widest uppercase">
                                {pageData?.surgeonRole?.badge?.text || "Step-By-Step Surgical Excellence"}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.surgeonRole?.heading || `The hair transplant surgeon's role at every step in ${cityName}`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mt-5">
                            {pageData?.surgeonRole?.description || "A great hair transplant surgeon is hands-on at every stage because each step directly shapes your final hairline and graft survival rate."}
                        </p>
                    </div>

                    {/* ── Stepper Container ── */}
                    <div className="bg-white rounded-xl overflow-hidden">

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
                                                    ${isActive
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
                SECTION 6: SURGEON VS TECHNICIAN
                Mandatory SEO Heading 6: "Hair Transplant Surgeon vs Technician: Why Doctor-Led Surgery Matters"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="bg-white py-16 md:py-24">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.comparison?.badge?.text || "The Critical Difference"}
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-14">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.comparison?.heading || `Hair transplant surgeon vs technician in ${cityName}: the difference that defines your result`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-6 font-normal">
                            {pageData?.comparison?.description || "In high-volume 'graft mills,' technicians perform extraction and implantation. At Ryan Clinic, every skilled surgical step is performed by a qualified surgeon — protecting your graft survival and natural hairline."}
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
                SECTION 7 (NEW): EXPERIENCE & SPECIALIZATION
                Mandatory SEO Heading 7: "Experience and Specialization: What to Look for in a Hair Transplant Doctor"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec] border-t border-red-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.experienceSpecialization?.badge?.text || "SURGEON CREDENTIALS"}
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.experienceSpecialization?.heading || `Experience and specialization to look for in a hair transplant surgeon in ${cityName}`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-4">
                            {pageData?.experienceSpecialization?.description || "Evaluating surgical credentials, case volume, and sub-specialty fellowship training ensures you select a doctor who delivers safe, natural, and long-lasting hair restoration."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(pageData?.experienceSpecialization?.items?.length
                            ? pageData.experienceSpecialization.items
                            : [
                                { title: "15+ Years Dedicated Focus", description: "Exclusive focus on hair restoration surgery rather than general plastic procedures." },
                                { title: "Turkey Fellowship Training", description: "Advanced specialization in Sapphire FUE and direct graft implantation methods." },
                                { title: "5,000+ Verifiable Cases", description: "A proven track record covering Norwood stages 2 to 7 with high density outcomes." }
                            ]).map((item, i) => {
                                const specIcons = [
                                    <Clock key="1" className="w-5 h-5 text-[#D32F2F]" />,
                                    <FileText key="2" className="w-5 h-5 text-[#D32F2F]" />,
                                    <Layers key="3" className="w-5 h-5 text-[#D32F2F]" />,
                                    <BadgeCheck key="4" className="w-5 h-5 text-[#D32F2F]" />,
                                    <PenTool key="5" className="w-5 h-5 text-[#D32F2F]" />,
                                    <Sparkles key="6" className="w-5 h-5 text-[#D32F2F]" />
                                ];
                                return (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-red-100 shadow-2xs">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4 border border-red-100 shadow-2xs">
                                            {specIcons[i % specIcons.length]}
                                        </div>
                                        <h3 className="text-lg font-extrabold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 8 (NEW): SKILL EVALUATION & METRICS
                Mandatory SEO Heading 8: "How to Evaluate a Surgeon's Hair Transplant Skill and Results"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white border-t border-red-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.skillEvaluation?.badge?.text || "SKILL ASSESSMENT"}
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.skillEvaluation?.heading || `How to judge a hair transplant surgeon's skill in ${cityName} before booking`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-4">
                            {pageData?.skillEvaluation?.description || "Key metrics to review when assessing a hair transplant surgeon's craftsmanship include graft survival rates, hairline naturalness, and donor zone preservation."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {(() => {
                            const skillEvalIcons = [
                                <Search key="0" className="w-5 h-5 text-[#D32F2F]" />,
                                <UserCheck key="1" className="w-5 h-5 text-[#D32F2F]" />,
                                <Calendar key="2" className="w-5 h-5 text-[#D32F2F]" />,
                                <BadgeCheck key="3" className="w-5 h-5 text-[#D32F2F]" />,
                                <Star key="4" className="w-5 h-5 text-[#D32F2F]" />,
                            ];
                            const defaultSkillItems = [
                                { title: "Review Before-and-After Photos", description: "Examine unedited high-resolution photos of past patients, paying close attention to hairline irregularity, natural swirl, and donor area appearance." },
                                { title: "Ask Who Performs Each Step", description: "Ask directly whether the surgeon performs graft extraction and channel creation personally, or delegates them to technicians." },
                                { title: "Verify Case Volume", description: "Ask how many years the surgeon has focused on hair transplantation and how many procedures they perform." },
                                { title: "Check Medical Registration", description: "Verify the doctor's full name, qualifications (e.g. MBBS, MS, Fellowship), and medical council registration number on the official register." },
                                { title: "Read Verified Patient Reviews", description: "Read verified patient reviews on Google and independent medical portals to judge patient care, transparency, and post-op support." },
                            ];
                            const items = pageData?.skillEvaluation?.items?.length
                                ? pageData.skillEvaluation.items
                                : defaultSkillItems;
                            return items.map((item, i) => (
                                <div key={i} className="bg-[#fff5ec] p-6 rounded-2xl border border-red-100 flex flex-col gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-red-100 flex items-center justify-center shrink-0 shadow-2xs">
                                        {skillEvalIcons[i % skillEvalIcons.length]}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-extrabold text-gray-900 mb-1.5 leading-snug">{item.title || item.label}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </section>


<section className="py-16 md:py-24 bg-[#fff5ec] border-t border-red-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.hairlineArtistry?.badge?.text || "AESTHETIC DESIGN"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                        <div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-5">
                                {pageData?.hairlineArtistry?.heading || `The artistry of hairline design: what surgical skill looks like in ${cityName}`}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
                                {pageData?.hairlineArtistry?.description || "A natural hairline requires artistic vision, taking into consideration your facial proportions, temporal angles, and long-term age progression."}
                            </p>

                            <div className="space-y-4">
                                {(pageData?.hairlineArtistry?.items?.length
                                    ? pageData.hairlineArtistry.items
                                    : [
                                        { title: "Soft, Irregular Front Edge", description: "Builds a soft, irregular front edge rather than a straight, 'pluggy' line." },
                                        { title: "Natural Micro Gradient", description: "Sets fine single-hair grafts at the hairline and denser units behind for a natural gradient." },
                                        { title: "Facial Proportion Matching", description: "Matches the hairline to your face shape, age, and natural growth direction." },
                                        { title: "Future Loss Planning", description: "Plans for future hair loss, so the result still looks natural years later." },
                                        { title: "Donor Area Protection", description: "Manages the donor area so it never looks over-harvested." },
                                    ]).map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white p-4.5 rounded-xl border border-red-100 shadow-2xs">
                                            <div className="w-7 h-7 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Sticky right image container */}
                        <div className="lg:sticky lg:top-28">
                            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white h-80 sm:h-96 lg:h-[480px]">
                                <Image
                                    src={getImageSrc(pageData?.hairlineArtistry?.image, "/uploads/gallery.jpg")}
                                    alt={pageData?.hairlineArtistry?.image?.alt || "Hairline Artistry Design"}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 10 (NEW): REVISION & REPAIR SURGERY
                Mandatory SEO Heading 10: "Revision and Repair Hair Transplants by an Experienced Surgeon"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white border-t border-red-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                            {pageData?.revisionRepair?.badge?.text || "CORRECTIVE SURGERY"}
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.revisionRepair?.heading || `Revision and repair work by a hair transplant surgeon in ${cityName}`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-4">
                            {pageData?.revisionRepair?.description || "Repairing botched hair transplants from technician-led clinics requires advanced surgical expertise to soften plugs, refine unnatural hairlines, and restore depleted donor areas."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {(pageData?.revisionRepair?.items?.length
                            ? pageData.revisionRepair.items
                            : [
                                { title: "Plug Graft Extraction", description: "Removing large, unnatural plug grafts and re-implanting them as soft singles." },
                                { title: "Hairline Softening & Lowering", description: "Re-establishing natural temporal peaks and soft transition zones." },
                                { title: "Donor Scar Camouflage", description: "FUE harvesting and SMP repair for depleted or scarred donor areas." }
                            ]).map((item, i) => (
                                <div key={i} className="bg-[#fff5ec] p-6 rounded-2xl border border-red-100">
                                    <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 11 (NEW): COST & CONSULTATION
                Mandatory SEO Heading 11: "Hair Transplant Surgeon Consultation and Cost in Delhi"
            ═══════════════════════════════════════════════════════════════ */}
            
            {/* ═══════════════════════════════════════════════════════════════
                SECTION 12: DOCTOR INTRO SPOTLIGHT
                Mandatory SEO Heading 1 (Alternate placement): Best Hair Transplant Surgeon
            ═══════════════════════════════════════════════════════════════ */}
            
            {/* ═══════════════════════════════════════════════════════════════
                SECTION 13: QUESTIONS TO ASK & RED FLAGS
                Mandatory SEO Headings 12 & 13:
                12: "Questions to Ask Your Hair Transplant Surgeon Before Booking"
                13: "Red Flags When Choosing a Hair Transplant Surgeon in Delhi"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            {pageData?.bookingChecklist?.badge?.text || "Due Diligence Checklist"}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* Questions accordion */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-8">
                                {pageData?.bookingChecklist?.questionsHeading || `Questions to ask a hair transplant surgeon in ${cityName} before booking`}
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

                        {/* Red Flags card */}
                        <div className="lg:sticky lg:top-28">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-8">
                                {pageData?.bookingChecklist?.redFlagsHeading || `Red flags when choosing a hair transplant surgeon in ${cityName}`}
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
                SECTION 14 & 15: PROCEDURES & VISIT SURGEON LOCATION
                Mandatory SEO Headings 14 & 15:
                14: "Procedures Offered by Our Lead Hair Transplant Surgeon"
                15: "Visit Our Hair Transplant Surgeon in Delhi"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec]">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-3 mb-4 md:mb-8">
                        <span className="block w-8 h-px bg-[#D32F2F]" />
                        <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                            {pageData?.procedures?.badge?.text || "Procedures & Location"}
                        </span>
                    </div>

                    <div className="max-w-3xl mb-8 md:mb-14">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                            {pageData?.procedures?.heading || `Procedures performed by our hair transplant surgeon in ${cityName}`}
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed my-6">
                            {pageData?.procedures?.description || "Free scalp analysis included. Transparent per-graft pricing confirmed after your consultation — before you commit. 0% EMI available."}
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

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 13: COST & CONSULTATION
                Mandatory SEO Heading 13: "Cost of consulting a hair transplant surgeon in Mumbai"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-[#fff5ec] border-t border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Centered Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
                            <span className="text-[#D32F2F] text-[11px] font-bold tracking-[0.22em] uppercase">
                                {pageData?.costConsultation?.badge?.text || "PRICING & CONSULTATION"}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-3">
                            {pageData?.costConsultation?.heading || `Cost of consulting a hair transplant surgeon in ${cityName}`}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                            {pageData?.costConsultation?.description || "Per-graft pricing — confirmed in writing at your free consultation. Zero hidden charges."}
                        </p>
                    </div>

                    {/* 3 Vertical Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-10">
                        
                        {/* Card 1: Free Consultation */}
                        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Free Consultation</h3>
                                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                                    SCALP ANALYSIS & HONEST ASSESSMENT
                                </span>
                                
                                <div className="mb-6">
                                    <div className="text-3xl sm:text-4xl font-bold text-[#D32F2F] leading-none mb-1">₹0</div>
                                    <p className="text-xs font-medium text-gray-400">No charge</p>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {[
                                        `Donor density & pattern analysis by ${doctorName}`,
                                        "Exact graft count recommendation",
                                        "Technique suitability assessment",
                                        "Transparent per-graft cost breakdown",
                                        "0% EMI options discussed",
                                    ].map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-xs text-gray-700 font-medium leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#D32F2F] text-gray-800 hover:text-[#D32F2F] font-bold py-3.5 px-5 rounded-2xl text-xs transition-all bg-white shadow-2xs"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Pricing Card: Free Consult", buttonLocation: "Pricing 3-Cards" })}
                            >
                                Book Free Consult <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Card 2: Sapphire FUE (Featured / Popular) */}
                        <div className="relative bg-white rounded-3xl border-2 border-[#D32F2F] shadow-xl ring-4 ring-red-500/10 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            {/* Floating Badge */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                                <span className="bg-[#D32F2F] text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                                    MOST POPULAR — NATURAL, DOCTOR-LED RESULT
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2">Sapphire FUE</h3>
                                <span className="inline-block bg-red-50 text-[#D32F2F] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                                    SAPPHIRE MICRO-BLADE EXTRACTION
                                </span>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-bold text-[#D32F2F] leading-none">₹35</span>
                                        <span className="text-xs font-semibold text-gray-500">per graft onwards</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {[
                                        "Doctor performs every surgical step",
                                        "Sapphire micro-blade extraction",
                                        "Custom hairline design",
                                        "Sterile OT suite",
                                        "12–18 month structured follow-up",
                                        "0% EMI available",
                                    ].map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-xs text-gray-700 font-medium leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold py-3.5 px-5 rounded-2xl text-xs transition-all shadow-md shadow-red-700/20"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Pricing Card: Sapphire FUE", buttonLocation: "Pricing 3-Cards" })}
                            >
                                Get Exact Quote <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Card 3: THI Technique / Turkish Choi Pen */}
                        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">THI Technique</h3>
                                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                                    CHOI PEN IMPLANTATION — HIGHEST PRECISION
                                </span>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-bold text-[#D32F2F] leading-none">₹40</span>
                                        <span className="text-xs font-semibold text-gray-500">per graft onwards</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    {[
                                        "Original Turkish Choi Pen technique",
                                        "No-shave option available",
                                        "Maximum density in single session",
                                        "Doctor-performed end-to-end",
                                        "Structured aftercare included",
                                        "0% EMI available",
                                    ].map((feat, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span className="text-xs text-gray-700 font-medium leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a
                                href={WA}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#D32F2F] text-gray-800 hover:text-[#D32F2F] font-bold py-3.5 px-5 rounded-2xl text-xs transition-all bg-white shadow-2xs"
                                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Pricing Card: THI Technique", buttonLocation: "Pricing 3-Cards" })}
                            >
                                Get Exact Quote <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* Bottom Disclaimer Note */}
                    <p className="text-center text-xs text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        Prices are per-graft starting rates. Your exact cost depends on graft count determined at consultation. All prices include anaesthesia, OT charges, post-op kit, and first follow-up visit. 0% EMI available on all packages.
                    </p>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 14: LOCATION & RELATED PAGES
                Mandatory SEO Heading 14: "Visiting our hair transplant surgeon in Mumbai"
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-12 bg-white border-t border-gray-100">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Visit Card */}
                        <div className="bg-[#fff5ec] p-6 rounded-2xl border border-red-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                    <span className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-widest">Clinic Location</span>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 mb-2">
                                    {pageData?.visitSurgeon?.heading || `Visiting our hair transplant surgeon in ${cityName}`}
                                </h2>
                                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                    {pageData?.visitSurgeon?.address || `Visit our ${cityName} Ryan Clinic centre to meet the surgeon in person. Full address and directions available below.`}
                                </p>
                            </div>
                            <p className="text-xs font-bold text-[#D32F2F]">
                                {pageData?.visitSurgeon?.phone || "+91-9217958539"} · {pageData?.visitSurgeon?.hours || "Mon–Sat, 9 AM – 7 PM"}
                            </p>
                        </div>

                        {/* Related Pages Card */}
                        <div className="bg-[#fff5ec] p-6 rounded-2xl border border-red-100 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                                    <span className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-widest">Explore More</span>
                                </div>
                                <p className="text-lg font-bold text-gray-900 mb-2">Related Pages</p>
                                <p className="text-xs text-gray-500 mb-4">Quick links to treatment guides and cost breakdowns in {cityName}:</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {(pageData?.procedures?.relatedLinks?.length
                                    ? pageData.procedures.relatedLinks
                                    : pageData?.relatedLinks?.length
                                        ? pageData.relatedLinks
                                        : [
                                            { label: `Hair Transplant Surgery in ${cityName}`, href: `/surgery/hair-transplant-surgery-in-${(rawCityName || "delhi").toLowerCase().replace(/\s+/g, "-")}` },
                                            { label: `Hair Transplant Cost in ${cityName}`, href: `/cost/hair-transplant-cost-in-${(rawCityName || "delhi").toLowerCase().replace(/\s+/g, "-")}` },
                                            { label: `PRP Treatment in ${cityName}`, href: `/prp-hair-loss-treatment-in-${(rawCityName || "delhi").toLowerCase().replace(/\s+/g, "-")}` },
                                        ]
                                ).map((link, li) => (
                                    <span key={li} className="inline-flex items-center gap-1.5">
                                        {li > 0 && <span className="text-gray-300">·</span>}
                                        <Link href={link.href || link.link || "#"} className="text-[#D32F2F] hover:underline font-semibold text-xs">{link.label || link.text}</Link>
                                    </span>
                                ))}
                            </div>
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
                                    {pageData?.ctaSection?.heading || `Book a consultation with a hair transplant surgeon in ${cityName}`}
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
                                    3,200 grafts · Sapphire FUE · 14 months · {cityName}
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
                                href="/gallery"
                                className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-[#FFC107] text-gray-300 hover:text-[#FFC107] font-semibold py-3.5 px-5 text-sm tracking-wide transition-all rounded-xl w-full"
                            >
                                View All Patient Results →
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 16: FAQ
                Mandatory SEO Heading 16: "Frequently Asked Questions About Hair Transplant Surgeons in Delhi"
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
                                    {pageData?.faq?.badge?.text || "Got Questions?"}
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5 text-gray-900">
                                {pageData?.faq?.heading || `Hair transplant surgeon in ${cityName} — frequently asked questions`}
                            </h2>

                            <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-500">
                                {pageData?.faq?.description || `Everything you need to know about choosing the right hair transplant surgeon in ${cityName} — credentials, technique, cost, and results. Still have a question? Our surgeon answers within 24 hours.`}
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


