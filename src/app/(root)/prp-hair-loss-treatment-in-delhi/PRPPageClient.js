"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/layouts/pageBanner";
import ContactForm from "@/components/pages/contactForm";
import useTrackCTA from "@/lib/useTrackCTA";

const WA_URL =
  "https://api.whatsapp.com/send?phone=+919911111247&text=Hi,%20I%20want%20to%20know%20more%20about%20PRP%20hair%20loss%20treatment%20in%20Delhi%20at%20Ryan%20Clinic";
const TEL_URL = "tel:+919911111247";

/* Helper Section Badge */
function SectionBadge({ text }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F] shrink-0" />
      <span className="text-[#D32F2F] text-[11px] font-extrabold tracking-[0.22em] uppercase">
        {text}
      </span>
    </div>
  );
}

export default function PRPPageClient() {
  const trackCTA = useTrackCTA();
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  /* FAQs list */
  const faqs = [
    {
      q: "1. What is PRP hair loss treatment?",
      a: "PRP (Platelet-Rich Plasma) is a non-surgical therapy that concentrates platelets and growth factors from your own blood and injects them into the scalp to support thinning hair and slow loss. It's used mainly for early-to-moderate pattern hair loss.",
    },
    {
      q: "2. Does PRP actually work for hair loss?",
      a: "Research suggests PRP can help improve density and slow loss in pattern hair loss, but evidence quality varies and results differ between people. It works best for early-to-moderate thinning, as part of a plan, with maintenance sessions — it's not a guaranteed cure.",
    },
    {
      q: "3. Is PRP painful?",
      a: "Most people tolerate it well. The scalp can be numbed with a topical anaesthetic, and you may feel a brief stinging or tingling during injections. Any tenderness usually settles within a day or two.",
    },
    {
      q: "4. How many PRP sessions will I need?",
      a: "Usually a course of several sessions spaced a few weeks apart, followed by periodic maintenance. Your exact plan depends on your hair loss and response.",
    },
    {
      q: "5. How long until I see results from PRP?",
      a: "Results are gradual and build over months. Most people need a full course before noticeable change, with maintenance to sustain it.",
    },
    {
      q: "6. Are PRP results permanent?",
      a: "No. PRP supports and maintains hair rather than permanently curing pattern loss, so benefits are kept up with ongoing maintenance sessions.",
    },
    {
      q: "7. Is PRP safe?",
      a: "Yes — it has a strong safety profile because it uses your own blood, so allergic reactions are very unlikely. Side effects are usually mild and temporary, such as tenderness, redness, or minor swelling.",
    },
    {
      q: "8. Can PRP regrow hair on completely bald areas?",
      a: "No. PRP supports existing follicles, so it can't grow hair where follicles are gone. A hair transplant is the option for fully bald areas.",
    },
    {
      q: "9. Who is a good candidate for PRP?",
      a: "People with early-to-moderate thinning and living follicles — men and women — especially those wanting a non-surgical option or an adjunct to other treatments. A diagnosis confirms suitability.",
    },
    {
      q: "10. PRP vs hair transplant — which do I need?",
      a: "They do different jobs. PRP supports thinning hair; a transplant restores density in bald areas. Many patients use PRP alongside medical therapy or a transplant. A doctor will advise what fits your case.",
    },
    {
      q: "11. How much does PRP hair loss treatment cost in Delhi?",
      a: "It's usually priced per session, often with package discounts for a course. Your total depends on the number of sessions. Ryan Clinic gives a transparent plan and cost after assessment.",
    },
    {
      q: "12. Is there any downtime after PRP?",
      a: "Little to none — most people return to normal activities the same day, following any aftercare advice (e.g., avoiding vigorous washing or sweating briefly).",
    },
    {
      q: "13. Who is the best doctor for PRP treatment in Delhi?",
      a: "A doctor who diagnoses the cause first, has verifiable qualifications, offers the full range of treatments, sets honest expectations, and shows real results.",
    },
    {
      q: "14. Where can I get PRP in Delhi?",
      a: "At Ryan Clinic's Pitampura centre (CD 163, Block CD, Dakshini Pitampura, 110034), Mon–Sat, 9 AM–7 PM. Call or WhatsApp +91-9911111247 to book.",
    },
    {
      q: "15. Is 'PRP hair treatment' the same as 'PRP hair loss treatment' in Delhi?",
      a: "Yes — 'PRP hair treatment in Delhi' and 'PRP hair loss treatment in Delhi' refer to the same procedure: injecting platelet-rich plasma made from your own blood into the scalp to support thinning hair and slow loss. The two terms are used interchangeably.",
    },
  ];

  /* Myths vs Facts */
  const mythsVsFacts = [
    {
      myth: "PRP regrows hair on completely bald patches.",
      fact: "PRP supports existing, living follicles. It cannot grow hair in areas where follicles are completely inactive or absent.",
    },
    {
      myth: "A single PRP session is enough for full results.",
      fact: "PRP requires an initial course of several sessions spaced weeks apart, followed by periodic maintenance.",
    },
    {
      myth: "PRP results are 100% permanent forever.",
      fact: "Benefits are sustained through periodic maintenance sessions because pattern hair loss is an ongoing genetic process.",
    },
    {
      myth: "PRP works identically for every single patient.",
      fact: "Individual outcomes vary based on underlying hair loss causes, age, follicle health, and stage of thinning.",
    },
    {
      myth: "PRP completely replaces surgical hair transplants.",
      fact: "PRP and transplants perform distinct roles. PRP nourishes existing hair, while transplants relocate donor hair to bald zones.",
    },
  ];

  /* Step by step timeline data for Step 2 */
  const procedureStepsData = [
    {
      num: "01",
      tag: "Diagnosis & Check",
      title: "Consultation & diagnosis",
      desc: "A certified doctor confirms the cause of your hair loss, evaluates scalp density, and verifies whether PRP is appropriate for your scalp.",
      image: "/uploads/turkey-doctor.jpg",
      alt: "Doctor consultation for PRP hair loss treatment in Delhi",
    },
    {
      num: "02",
      tag: "Blood Draw",
      title: "Blood collection",
      desc: "A small blood sample (~10–20 ml) is drawn quickly and comfortably using sterile single-use equipment in an OT environment.",
      image: "/uploads/1752746168716-PRP 1.jpg",
      alt: "Sterile blood draw for PRP plasma preparation",
    },
    {
      num: "03",
      tag: "Centrifugation",
      title: "Plasma preparation",
      desc: "The sample is spun in a medical-grade centrifuge to isolate and concentrate growth factor-rich platelet plasma.",
      image: "/uploads/1752731223556-FUE 1.jpg",
      alt: "Centrifugation plasma isolation",
    },
    {
      num: "04",
      tag: "Scalp Numbing",
      title: "Numbing (optional)",
      desc: "The scalp may be gently numbed with a topical anaesthetic cream for maximum comfort during micro-injection.",
      image: "/uploads/service-one.jpg",
      alt: "Topical numbing for scalp injection comfort",
    },
    {
      num: "05",
      tag: "Micro-Injection",
      title: "Injection",
      desc: "Concentrated PRP is precisely injected across targeted thinning areas at the follicle level — usually taking only 10–15 minutes.",
      image: "/uploads/1752734248947-Hair Transplant 1.jpg",
      alt: "Micro-dose PRP injection into scalp follicles",
    },
    {
      num: "06",
      tag: "Completion",
      title: "Done & Resume Day",
      desc: "The entire session takes 30–60 minutes. You receive aftercare instructions and can immediately return to work or daily activities.",
      image: "/uploads/about-one.jpg",
      alt: "Post-op completion and same day return to routine",
    },
  ];

  return (
    <div className="bg-[#FAF9F6] text-gray-900 overflow-hidden">
      {/* ── 1. SHARED PAGE BANNER ───────────────────────────────────── */}
      <PageBanner
        breadcrumb="PRP Hair Loss Treatment in Delhi"
        title="Best PRP Hair Treatment in Delhi"
        description="PRP hair treatment in Delhi — also called PRP hair loss treatment — is a safe, minimally-invasive, non-surgical injection therapy that uses a concentrate from your own blood to support thinning hair. A small blood sample is spun in a centrifuge to concentrate platelets and growth factors, which are then injected into the scalp to help nourish follicles and slow shedding. PRP works best for early-to-moderate pattern hair loss where follicles still exist — it supports and preserves hair rather than regrowing it on fully bald areas, and benefits are maintained with periodic sessions. At Ryan Clinic in Pitampura, PRP is doctor-led, after a proper diagnosis of your hair loss. PRP isn't right for everyone — a consultation decides if it suits you."
        bgImage="/uploads/1752746168716-PRP 1.jpg"
        alt="Best PRP Hair Treatment in Delhi — Ryan Clinic"
      />

      {/* ── 2. TRUST STATS STRIP ───────────────────────────────────── */}
      <section className="bg-white border-b border-gray-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-5 text-center hover:border-[#D32F2F]/40 transition-all">
              <span className="text-3xl font-extrabold text-[#D32F2F] block mb-1">
                100%
              </span>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Autologous &amp; Safe
              </span>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Your own blood plasma
              </span>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-5 text-center hover:border-[#D32F2F]/40 transition-all">
              <span className="text-3xl font-extrabold text-[#D32F2F] block mb-1">
                30–60
              </span>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Minutes Session
              </span>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Quick outpatient procedure
              </span>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-5 text-center hover:border-[#D32F2F]/40 transition-all">
              <span className="text-3xl font-extrabold text-[#D32F2F] block mb-1">
                10,000+
              </span>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Procedures Done
              </span>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Doctor-led clinical care
              </span>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-5 text-center hover:border-[#D32F2F]/40 transition-all">
              <span className="text-3xl font-extrabold text-[#D32F2F] block mb-1">
                0% EMI
              </span>
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">
                Flexible Plans
              </span>
              <span className="text-[11px] text-gray-500 mt-1 block">
                Easy monthly payments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT IS PRP SECTION ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7">
              <SectionBadge text="Medical Overview" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                What is PRP hair loss treatment in Delhi?
              </h2>

              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                PRP hair loss treatment in Delhi is a procedure that uses Platelet-Rich Plasma — a part of your own blood that&apos;s rich in platelets and growth factors — to support hair follicles. Because the plasma comes from your own body (it&apos;s &quot;autologous&quot;), there&apos;s no foreign substance and a very low risk of allergic reaction.
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                The idea is straightforward: platelets release growth factors that play a role in tissue repair and cell activity. When concentrated and injected into a thinning scalp, PRP aims to improve the follicle environment, help move follicles toward a healthier growth phase, and slow hair loss while supporting the hair you still have. It&apos;s a treatment, not a cure — and it works alongside, not instead of, a proper diagnosis of why your hair is thinning.
              </p>

              {/* Information pill cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FAF9F6] border-l-4 border-[#D32F2F] p-4 rounded-r-xl shadow-2xs">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Autologous Plasma</h4>
                  <p className="text-xs text-gray-600">Derived 100% from your own blood with zero risk of rejection or foreign reactions.</p>
                </div>

                <div className="bg-[#FAF9F6] border-l-4 border-gray-800 p-4 rounded-r-xl shadow-2xs">
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Growth Factor Rich</h4>
                  <p className="text-xs text-gray-600">Delivers concentrated healing platelets directly to dormant hair roots.</p>
                </div>
              </div>
            </div>

            {/* Right visual card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#D32F2F]/20 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                    Clinical Science
                  </span>

                  <h3 className="text-2xl font-bold mb-4 leading-snug">
                    How Autologous Platelets Stimulate Follicles
                  </h3>

                  <div className="space-y-4 text-xs md:text-sm text-gray-300">
                    <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                      <span className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                      <p><strong className="text-white">PDGF &amp; VEGF Release:</strong> Growth factors trigger micro-vascular development around blood vessels.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                      <span className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                      <p><strong className="text-white">Anagen Phase Extension:</strong> Helps push miniaturizing hair roots into active growth.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                      <span className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                      <p><strong className="text-white">Shedding Reduction:</strong> Strengthens existing shaft attachment to lower daily hair fall.</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Doctor-Led Diagnosis</span>
                    <a
                      href={WA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#D32F2F] bg-white hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
                      onClick={() =>
                        trackCTA({
                          type: "whatsapp",
                          ctaName: "PRP Page Overview CTA",
                          buttonLocation: "What is PRP Section",
                        })
                      }
                    >
                      Ask Doctor on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. STEP 1 REDESIGN: HOW PRP WORKS (BIOLOGICAL MECHANISM) ── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Biological Mechanism" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              How does PRP hair treatment in Delhi work?
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              PRP hair treatment in Delhi works in three simple steps designed to deliver maximum growth factors directly to your thinning follicles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752746168716-PRP 1.jpg"
                    alt="Blood Draw Step for PRP Therapy in Delhi"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      Step 01
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Blood Draw
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    A small sample of your blood is taken, much like a routine blood test, in a sterile clinical environment using single-use vacuum tubes.
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
                    Sample Volume:
                  </span>
                  <strong className="text-[#D32F2F]">~10–20 ml</strong>
                </div>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752731223556-FUE 1.jpg"
                    alt="Centrifugation Step for PRP Therapy in Delhi"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      Step 02
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Centrifugation
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    The sample is spun in a medical-grade centrifuge to separate and concentrate the platelet-rich plasma from red blood cells and poor serum.
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
                    Process:
                  </span>
                  <strong className="text-[#D32F2F]">Double Spin Isolation</strong>
                </div>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752734248947-Hair Transplant 1.jpg"
                    alt="Scalp Injection Step for PRP Therapy in Delhi"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                      Step 03
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D32F2F] transition-colors">
                    Scalp Injection
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    The concentrated PRP is injected into the thinning areas of your scalp at the exact level of hair follicles to stimulate cellular repair.
                  </p>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D32F2F]" />
                    Technique:
                  </span>
                  <strong className="text-[#D32F2F]">Micro-Dose Precision</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-8 text-center max-w-4xl mx-auto shadow-sm">
            <p className="text-xs md:text-sm text-amber-950 font-medium leading-relaxed">
              <strong className="font-bold text-amber-950 text-base block mb-1">Important Clinical Note:</strong> The concentrated growth factors are intended to stimulate and nourish the follicles in areas where hair is thinning but still present. PRP cannot create new follicles, so it can&apos;t grow hair on areas that are completely bald — that&apos;s where a hair transplant comes in.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. STEP 2 REDESIGN: PROCEDURE TIMELINE (DOCTORS PAGE STYLE) ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="In-Clinic Workflow" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The PRP procedure step by step in Delhi
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              A PRP session in Delhi is quick and done as an outpatient (&quot;lunchtime&quot;) procedure. The whole session typically takes around 30–60 minutes, and you can return to your daily activities immediately.
            </p>
          </div>

          {/* Quick specs banner */}
          <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 mb-16 shadow-2xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Duration</span>
                <strong className="text-sm font-bold text-[#D32F2F]">30–60 Minutes</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Anaesthesia</span>
                <strong className="text-sm font-bold text-gray-900">Optional Topical</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Downtime</span>
                <strong className="text-sm font-bold text-emerald-600">Zero (Same-Day)</strong>
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Setting</span>
                <strong className="text-sm font-bold text-gray-900">NABH Sterile OT</strong>
              </div>
            </div>
          </div>

          {/* Vertical Alternating Timeline with Connecting Line & Nodes */}
          <div className="relative">
            {/* Red Vertical Bounded Center Line */}
            <div className="absolute left-1/2 -translate-x-px top-6 bottom-6 w-1 bg-[#D32F2F] hidden md:block rounded-full" />

            <div className="space-y-12">
              {procedureStepsData.map((step, i) => {
                const isRight = i % 2 !== 0;
                return (
                  <div
                    key={step.num}
                    className={`flex flex-col md:flex-row gap-8 items-center ${isRight ? "md:flex-row-reverse" : ""
                      }`}
                  >
                    {/* Image card */}
                    <div className="w-full md:w-[45%]">
                      <div
                        className={`relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 group hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 ${isRight ? "md:ml-6" : "md:mr-6"
                          }`}
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={step.image}
                            alt={step.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                              {step.tag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center Circular Node */}
                    <div className="hidden md:flex flex-col items-center z-10 shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-[#D32F2F] flex items-center justify-center text-[#D32F2F] font-black text-sm shadow-xl hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-[45%]">
                      <div
                        className={`bg-[#FAF9F6] rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:bg-white hover:border-[#D32F2F]/40 transition-all duration-300 ${isRight ? "md:mr-6" : "md:ml-6"
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="w-7 h-7 rounded-lg bg-red-100 text-[#D32F2F] font-bold text-xs flex items-center justify-center">
                            {step.num}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#D32F2F] uppercase tracking-widest">
                            Step {step.num} of 06
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. STEP 3 REDESIGN: EVIDENCE SECTION (RED/WHITE COLOR THEME WITH RESULTS IMAGES) ── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionBadge text="Honest Clinical Transparency" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Does PRP work for hair loss? The evidence (Delhi)
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              Here&apos;s the honest picture, because it matters: research suggests PRP can help improve hair density and slow loss in androgenetic alopecia (pattern hair loss), and it&apos;s widely used for this.
            </p>
          </div>

          {/* 3 Result-Driven Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300">
              <div className="relative h-52 w-full">
                <Image
                  src="/uploads/1752733322451-Hair Transplant 4.jpg"
                  alt="Early-to-Moderate Thinning Follicle Evidence"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                    Clinical Finding 01
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Early-to-Moderate Thinning</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Works best in areas where hair follicles are still living and present, helping reverse miniaturization and strengthening root anchor.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300">
              <div className="relative h-52 w-full">
                <Image
                  src="/uploads/1752731427318-FUE 3.jpg"
                  alt="Comprehensive Treatment Plan with PRP"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                    Clinical Finding 02
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Part of a Comprehensive Plan</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Often combined with medical therapy (e.g., minoxidil) or used alongside a surgical transplant for enhanced density.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300">
              <div className="relative h-52 w-full">
                <Image
                  src="/uploads/gallery.jpg"
                  alt="Ongoing Maintenance Sessions Progress"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                    Clinical Finding 03
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Ongoing Maintenance Sessions</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Given as a course of sessions with periodic maintenance, rather than a single one-off miracle cure to sustain long-term density.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50/80 border-2 border-[#D32F2F] rounded-3xl p-8 text-center max-w-3xl mx-auto shadow-sm">
            <p className="text-xs md:text-sm text-[#D32F2F] font-bold leading-relaxed">
              A good clinic in Delhi will tell you this openly and set realistic expectations — rather than promising dramatic regrowth. That honesty is part of choosing well.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. STEP 4 REDESIGN: CANDIDATE SECTION (ENHANCED CONTENT & HEIGHT) ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Candidacy Assessment" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Who is a good candidate for PRP in Delhi?
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              A proper diagnosis by a certified doctor is essential to determine whether PRP is right for your unique pattern of hair thinning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch">
            {/* Ideal Candidates Card (Increased Height & Rich Content) */}
            <div className="bg-[#FAF9F6] border-2 border-emerald-500/40 rounded-3xl p-8 md:p-10 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-200/60">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Ideal Candidates for PRP
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                        Recommended Profile
                      </span>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-200">
                    High Success Rate
                  </span>
                </div>

                <div className="space-y-6 text-xs md:text-sm text-gray-700">
                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Norwood Grade 1–3 Thinning:</strong>
                      <span>People with early-to-moderate pattern hair loss and thinning where active hair roots still exist across the crown or hairline.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Active Living Follicles:</strong>
                      <span>Those who still have living, miniaturizing follicles in the treatment area capable of absorbing concentrated platelet growth factors.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Diffuse Thinning in Men &amp; Women:</strong>
                      <span>Men and women experiencing progressive diffuse thinning or early androgenetic alopecia who want non-surgical preservation.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Adjunct or Non-Surgical Preference:</strong>
                      <span>Patients wanting a non-surgical therapy, or an adjunct to enhance medical therapy (minoxidil/finasteride) or a surgical hair transplant.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-200/60 bg-emerald-50/50 -mx-8 -mb-8 p-6 rounded-b-3xl">
                <p className="text-xs text-emerald-900 font-medium">
                  <strong>Clinical Criteria:</strong> Best results observed when initiated within 1–3 years of initial hair thinning onset.
                </p>
              </div>
            </div>

            {/* When PRP May Not Suit Card (Increased Height & Rich Content) */}
            <div className="bg-[#FAF9F6] border-2 border-amber-500/40 rounded-3xl p-8 md:p-10 shadow-md flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-200/60">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                      !
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        When PRP May Not Suit
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                        Special Evaluation
                      </span>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-200">
                    Transplant Advised
                  </span>
                </div>

                <div className="space-y-6 text-xs md:text-sm text-gray-700">
                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      !
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Completely Bald Areas:</strong>
                      <span>PRP is generally not the right answer for fully bald areas where hair follicles are completely absent — surgical transplant is required.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      !
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Untreated Underlying Causes:</strong>
                      <span>Less suitable if hair loss stems from untreated systemic issues (such as severe thyroid dysfunction, anemia, or autoimmune alopecia).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      !
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Expectation of Instant 1-Session Cures:</strong>
                      <span>Patients seeking immediate 100% permanent hair density without undergoing periodic maintenance sessions.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      !
                    </span>
                    <div>
                      <strong className="text-gray-900 font-bold block mb-1">Diagnosis First Protocol:</strong>
                      <span>Our doctors perform a thorough dermoscopic scalp analysis first to confirm whether PRP or a hair transplant fits your exact needs.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-200/60 bg-amber-50/50 -mx-8 -mb-8 p-6 rounded-b-3xl">
                <p className="text-xs text-amber-900 font-medium">
                  <strong>Alternative Recommendation:</strong> If baldness is Grade 4–7, a doctor-led Sapphire FUE hair transplant is recommended.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. STEP 5 REDESIGN: BENEFITS SECTION WITH RELATABLE IMAGES ── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Treatment Advantages" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Benefits of PRP hair loss treatment in Delhi
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              Explore why doctor-led autologous PRP therapy is one of India&apos;s most trusted non-surgical hair restoration procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752746168716-PRP 1.jpg"
                    alt="100% Autologous PRP Blood Plasma"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Safety Advantage
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    100% Autologous
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Uses your own blood — autologous, with a very low risk of allergic reaction, foreign rejection, or side effects.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ Zero Foreign Additives
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/service-one.jpg"
                    alt="Minimally Invasive Scalp Micro Injection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Procedure Type
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    Minimally Invasive
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Non-surgical and minimally invasive — no surgical incisions, minimal discomfort, and zero linear donor scarring.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ No Surgical Cut or Stitches
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/turkey-doctor.jpg"
                    alt="Quick Outpatient Session at Ryan Clinic"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Time Efficiency
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    Quick &amp; Convenient
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Quick outpatient procedure — a typical treatment session takes around 30–60 minutes in a comfortable setting.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ 30–60 Minute Session
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752733322451-Hair Transplant 4.jpg"
                    alt="Preserves Existing Hair Density"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Follicle Preservation
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    Preserves Existing Hair
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Can support and preserve existing hair follicles, improve shaft thickness, and slow down active hair shedding.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ Slows Active Hair Fall
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/1752734248947-Hair Transplant 1.jpg"
                    alt="Synergistic Treatment Combination"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Combination Therapy
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    Synergistic Therapy
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Pairs exceptionally well with medical therapy (minoxidil/finasteride) and alongside surgical hair transplants.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ Enhances Transplant Results
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl hover:border-[#D32F2F]/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/uploads/about-one.jpg"
                    alt="Zero Downtime Post PRP"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                      Lifestyle Friendly
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#D32F2F] transition-colors">
                    Zero Downtime
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    Little to no downtime — most people resume normal daily activities, office work, or routine the exact same day.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 text-xs font-semibold text-[#D32F2F]">
                ✓ Immediate Return to Work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. RESULTS TIMELINE ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Expected Progress" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              PRP results and timeline in Delhi
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              Realistic expectations matter: steady support of your existing hair is the honest goal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 text-center">
              <span className="text-xs font-extrabold text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider block w-fit mx-auto mb-3">
                Month 1
              </span>
              <h3 className="font-bold text-gray-900 text-base mb-2">Initial Session</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                First blood draw &amp; plasma injection. Scalp begins absorbing growth factor concentrate.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 text-center">
              <span className="text-xs font-extrabold text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider block w-fit mx-auto mb-3">
                Months 2–3
              </span>
              <h3 className="font-bold text-gray-900 text-base mb-2">Shedding Slows</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Reduces excessive hair fall. Follicles move toward a healthier, nourished growth phase.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 text-center">
              <span className="text-xs font-extrabold text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider block w-fit mx-auto mb-3">
                Months 4–6
              </span>
              <h3 className="font-bold text-gray-900 text-base mb-2">Density Support</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Noticeable improvement in hair shaft thickness, overall texture, and scalp coverage.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 text-center">
              <span className="text-xs font-extrabold text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider block w-fit mx-auto mb-3">
                Ongoing
              </span>
              <h3 className="font-bold text-gray-900 text-base mb-2">Maintenance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Periodic booster sessions every few months sustain long-term follicle strength and density.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. SAFETY & SIDE EFFECTS ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <SectionBadge text="Medical Safety Profile" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Is PRP safe? Side effects in Delhi
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                PRP has a strong safety profile because it uses your own blood, so allergic reactions are very unlikely. Side effects are usually mild and temporary, and may include:
              </p>

              <ul className="space-y-3 text-xs md:text-sm text-gray-700 mb-8">
                <li className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                  <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                  Scalp tenderness, redness, or mild swelling at injection sites.
                </li>
                <li className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                  <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                  Minor pain or a tingling sensation during/after injections.
                </li>
                <li className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-gray-200">
                  <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                  Occasional slight bruising that resolves within 24–48 hours.
                </li>
              </ul>

              <p className="text-xs md:text-sm text-gray-600">
                These typically settle within a day or two. As with any injection, there&apos;s a small risk of infection, which a sterile, doctor-led setting minimises.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-[#D32F2F]">🏥</span> NABH Sterile OT Setting
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
                  At Ryan Clinic, all blood collection, centrifugation, and scalp injections take place in sterile operating rooms supervised by certified doctors.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 flex items-center justify-between">
                    <span>Single-use sterile syringes &amp; needles</span>
                    <span className="text-emerald-600">Verified</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 flex items-center justify-between">
                    <span>Doctor-performed micro-injections</span>
                    <span className="text-emerald-600">Verified</span>
                  </div>
                  <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 flex items-center justify-between">
                    <span>Comprehensive post-procedure aftercare</span>
                    <span className="text-emerald-600">Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. COMPARISON MATRIX ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Treatment Options" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              PRP vs other hair loss treatments in Delhi
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              PRP is one tool among several — the best choice depends on your diagnosis.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-md bg-white mb-8">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-4 md:p-5 font-bold uppercase tracking-wider">Treatment</th>
                  <th className="p-4 md:p-5 font-bold uppercase tracking-wider">What it does</th>
                  <th className="p-4 md:p-5 font-bold uppercase tracking-wider">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-red-50/40">
                  <td className="p-4 md:p-5 font-bold text-[#D32F2F]">PRP</td>
                  <td className="p-4 md:p-5 text-gray-700">Supports existing follicles using your own growth factors</td>
                  <td className="p-4 md:p-5 text-gray-900 font-semibold">Early-to-moderate thinning; adjunct therapy</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-bold text-gray-900">Minoxidil (topical)</td>
                  <td className="p-4 md:p-5 text-gray-700">Slows loss, supports regrowth</td>
                  <td className="p-4 md:p-5 text-gray-700">Pattern loss; ongoing daily use</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="p-4 md:p-5 font-bold text-gray-900">Finasteride (oral, men)</td>
                  <td className="p-4 md:p-5 text-gray-700">Reduces DHT (prescription)</td>
                  <td className="p-4 md:p-5 text-gray-700">Male pattern baldness, under medical care</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-5 font-bold text-gray-900">Hair transplant</td>
                  <td className="p-4 md:p-5 text-gray-700">Permanently restores density in bald areas</td>
                  <td className="p-4 md:p-5 text-gray-700">Suitable pattern-baldness cases</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-gray-600">
            <span>Explore Related Treatments:</span>
            <Link
              href="/prp-hair-loss-treatment-in-delhi"
              className="text-[#D32F2F] hover:underline"
            >
              PRP &amp; Hair Loss Treatment in Delhi
            </Link>
            <span>•</span>
            <Link
              href="/hair-transplant-surgery-in-delhi"
              className="text-[#D32F2F] hover:underline"
            >
              Hair Transplant Surgery in Delhi
            </Link>
          </div>
        </div>
      </section>

      {/* ── 12. PRP WITH HAIR TRANSPLANT ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-[#8B1414] text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <span className="inline-block bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Synergistic Protocol
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                PRP with a hair transplant in Delhi
              </h2>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8">
                PRP is commonly used alongside a hair transplant in Delhi — to support the scalp environment and the existing native hair around the transplanted area. It doesn&apos;t replace the surgery; it complements it for suitable patients.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/hair-transplant-surgery-in-delhi"
                  className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
                  onClick={() =>
                    trackCTA({
                      type: "link",
                      ctaName: "PRP + Transplant Combo Link",
                      buttonLocation: "PRP with Hair Transplant Section",
                    })
                  }
                >
                  Explore Hair Transplant Surgery →
                </Link>

                <Link
                  href="/cost"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
                >
                  View Surgery &amp; PRP Cost Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. SESSION PLAN ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <SectionBadge text="Protocol &amp; Frequency" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                How many PRP sessions will I need in Delhi?
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Most people need a course of sessions rather than a single treatment. A typical plan involves an initial series (commonly a few sessions spaced a few weeks apart), then periodic maintenance to sustain results. Your exact plan depends on your hair loss and response.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 text-base mb-1">Initial Series Course</h4>
                <p className="text-xs text-gray-600">3 to 4 sessions spaced 3–4 weeks apart to kickstart scalp follicle nourishment.</p>
              </div>

              <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 text-base mb-1">Maintenance Booster Phase</h4>
                <p className="text-xs text-gray-600">1 session every 3 to 6 months to maintain active density and prevent progressive shedding.</p>
              </div>

              <div className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 text-base mb-1">Doctor Tailored Strategy</h4>
                <p className="text-xs text-gray-600">Your treating doctor evaluates density milestones at every visit and adjusts protocol accordingly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. COST & PRICING SECTION ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Transparent Pricing" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Cost of PRP hair loss treatment in Delhi
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
              PRP hair treatment in Delhi is usually priced per session, and often offered as a discounted package for a course of sessions. Your total depends on the number of sessions you need. At Ryan Clinic, your doctor explains the recommended plan and transparent cost after assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Single session card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Single Session
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Individual Session</h3>
                <p className="text-xs text-gray-600 mb-6">Ideal for periodic maintenance or single booster treatment.</p>
                <div className="text-3xl font-extrabold text-[#D32F2F] mb-6">
                  Transparent Quote
                </div>
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all block text-center"
              >
                Get Per-Session Price →
              </a>
            </div>

            {/* Package card */}
            <div className="bg-white border-2 border-[#D32F2F] rounded-3xl p-8 shadow-xl text-center flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D32F2F] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full">
                  Full Package Course
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Multi-Session Package</h3>
                <p className="text-xs text-gray-600 mb-6">Discounted package rate for complete initial treatment course.</p>
                <div className="text-3xl font-extrabold text-[#D32F2F] mb-6">
                  Package Discount
                </div>
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all block text-center"
              >
                Get Package Discount →
              </a>
            </div>

            {/* EMI card */}
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm text-center flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  0% EMI Financing
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Easy Installments</h3>
                <p className="text-xs text-gray-600 mb-6">0% interest monthly payment options available on packages.</p>
                <div className="text-3xl font-extrabold text-gray-900 mb-6">
                  0% Interest
                </div>
              </div>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all block text-center"
              >
                Check EMI Eligibility →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. WHY CHOOSE RYAN CLINIC ───────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Clinical Excellence" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Why choose Ryan Clinic for PRP in Delhi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">🩺</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Diagnosis-First Approach</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The cause of your hair loss is confirmed before treatment, ensuring PRP is performed only when clinically appropriate.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">👨‍⚕️</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Doctor-Led PRP</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All blood draws, centrifugation isolation, and scalp injections are performed or directly supervised by qualified doctors.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">💬</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Honest Guidance</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Clear advice on whether PRP will help you, with realistic expectations and no overpromising.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">🏥</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Full Range of Options</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                PRP, medical therapy, and hair transplants under one roof, so the recommendation truly fits your needs.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">✨</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Sterile Setting &amp; Care</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                NABH-standard sterile operating environment with dedicated post-procedure aftercare support.
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-gray-200 rounded-3xl p-6">
              <div className="text-2xl mb-3">🏷️</div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Transparent Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Clear pricing quotes with 0% EMI available. Centres in Delhi (Pitampura), Mumbai, and Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 16. BEST DOCTOR FOR PRP ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto border-4 border-[#D32F2F] shadow-lg mb-4">
                  <Image
                    src="/uploads/turkey-doctor.jpg"
                    alt="Dr. Himanshu Jawla - Best PRP Doctor in Delhi"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-900">Dr. Himanshu Jawla</h3>
                <p className="text-xs text-[#D32F2F] font-bold uppercase tracking-wider">
                  Lead Hair Restoration Specialist
                </p>
                <p className="text-xs text-gray-500 mt-1">DMC Reg. No. Verified</p>
              </div>

              <div className="lg:col-span-8">
                <SectionBadge text="Expert Medical Leadership" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Best doctor for PRP treatment in Delhi
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  The best doctor for PRP treatment in Delhi diagnoses the cause of your hair loss first, has verifiable qualifications and registration, offers the full range of treatments (so PRP is recommended only when appropriate), sets honest expectations, and shows genuine results.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <span className="block font-extrabold text-[#D32F2F] text-xl">15+</span>
                    <span className="text-xs text-gray-600">Years Experience</span>
                  </div>
                  <div>
                    <span className="block font-extrabold text-[#D32F2F] text-xl">10,000+</span>
                    <span className="text-xs text-gray-600">Surgeries &amp; PRP</span>
                  </div>
                  <div>
                    <span className="block font-extrabold text-[#D32F2F] text-xl">100%</span>
                    <span className="text-xs text-gray-600">Doctor Performed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 17. MYTHS VS FACTS ────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionBadge text="Fact Check" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Myths vs facts about PRP in Delhi
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {mythsVsFacts.map((mf, i) => (
              <div
                key={i}
                className="bg-[#FAF9F6] border border-gray-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center shadow-2xs"
              >
                <div className="bg-red-50/60 border-l-4 border-[#D32F2F] p-4 rounded-r-xl">
                  <span className="text-[10px] font-extrabold text-[#D32F2F] uppercase tracking-wider block mb-1">
                    Myth
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">
                    &quot;{mf.myth}&quot;
                  </p>
                </div>

                <div className="bg-emerald-50/60 border-l-4 border-emerald-600 p-4 rounded-r-xl">
                  <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">
                    Fact
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">
                    {mf.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 18. CLINIC LOCATION ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <SectionBadge text="Delhi Centre" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Visiting Ryan Clinic for PRP in Delhi
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Our Delhi centre is in Pitampura (North-West Delhi), convenient from across the city and NCR including Rohini, Shalimar Bagh, Ashok Vihar, Model Town, Punjabi Bagh, and Paschim Vihar.
              </p>

              <div className="space-y-4 text-xs md:text-sm text-gray-700 mb-8">
                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200">
                  <span className="text-lg">📍</span>
                  <div>
                    <strong className="text-gray-900 block font-bold mb-0.5">Address:</strong>
                    CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FAF9F6] border border-gray-200 p-4 rounded-2xl">
                  <span className="text-lg">📞</span>
                  <div>
                    <strong className="text-gray-900 block font-bold mb-0.5">Phone / WhatsApp:</strong>
                    +91-9911111247
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-200">
                  <span className="text-lg">🕒</span>
                  <div>
                    <strong className="text-gray-900 block font-bold mb-0.5">Working Hours:</strong>
                    Mon–Sat, 9:00 AM – 7:00 PM
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full">Rohini</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full">Shalimar Bagh</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full">Ashok Vihar</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full">Model Town</span>
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full">Punjabi Bagh</span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-[380px] relative bg-gray-200">
                <iframe
                  title="Ryan Clinic Pitampura Delhi Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.782485514652!2d77.1352!3d28.6963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8NDEnNDYuNyJOIDc3wrAwOCcwNi43IkU!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 19. CTA & BOOKING FORM ─────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <SectionBadge text="Book Appointment" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Book your PRP hair loss treatment consultation in Delhi
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
                Get a doctor consultation and scalp analysis to find out if PRP is right for you — no obligation.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={TEL_URL}
                  className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
                  onClick={() =>
                    trackCTA({
                      type: "call",
                      ctaName: "PRP Consultation Call",
                      buttonLocation: "CTA Section",
                    })
                  }
                >
                  📞 Call: +91-9911111247
                </a>

                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md"
                  onClick={() =>
                    trackCTA({
                      type: "whatsapp",
                      ctaName: "PRP Consultation WhatsApp",
                      buttonLocation: "CTA Section",
                    })
                  }
                >
                  💬 WhatsApp Us
                </a>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed italic border-t border-gray-100 pt-4">
                This page provides general information and does not replace a personal medical consultation or diagnosis. PRP outcomes vary between individuals, and PRP should be performed under medical guidance. Last medically reviewed by Dr. Himanshu Jawla (Lead Specialist).
              </p>
            </div>

            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── 20. FAQ ACCORDION ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SectionBadge text="Got Questions?" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              PRP hair loss treatment in Delhi — frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-bold text-gray-900 text-sm md:text-base flex items-center justify-between gap-4 focus:outline-none hover:text-[#D32F2F] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-bold text-[#D32F2F] shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 21. MEDICAL DISCLAIMER ─────────────────────────────────── */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-gray-700">Medical Notice:</strong> Information on this page is for educational purposes regarding PRP Hair Treatment in Delhi at Ryan Clinic. Individual hair loss diagnosis and treatment outcomes vary. Consult a qualified dermatologist or hair restoration doctor prior to starting therapy.
          </p>
        </div>
      </footer>
    </div>
  );
}
