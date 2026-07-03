"use client";

import { useEffect, useRef, useState } from "react";

function useScrollReveal(threshold = 0.1) {
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
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

const WA =
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20have%20a%20question%20about%20hair%20transplant%20surgery%20in%20Delhi";

export default function FAQSection({ faqs = [] }) {
  const [open, setOpen] = useState(0);

  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  function AccordionItem({ faq, index, globalIndex }) {
    const isOpen = open === globalIndex;
    const bodyRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      if (bodyRef.current) {
        setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
      }
    }, [isOpen]);

    return (
      <div
        className={`border rounded-xl cursor-pointer transition-all duration-300 ${
          isOpen ? "border-[#D32F2F]/30 bg-red-50/40" : "border-gray-200 bg-white hover:border-gray-300"
        }`}
        onClick={() => setOpen(isOpen ? null : globalIndex)}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <h3
            className={`text-[13.5px] font-semibold leading-snug transition-colors duration-150 ${
              isOpen ? "text-[#D32F2F]" : "text-gray-800"
            }`}
          >
            {faq.q}
          </h3>
          <span
            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              isOpen ? "bg-[#D32F2F] text-white rotate-45" : "bg-gray-100 text-gray-500"
            }`}
          >
            +
          </span>
        </div>
        {/* Smooth height transition */}
        <div
          ref={bodyRef}
          style={{
            maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 200}px` : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-5 pb-4">
            <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        </div>
      </div>
    );
  }

  const headerReveal = useScrollReveal(0.1);

  return (
    <section className="bg-[#F7F5F2] py-16 md:py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          style={{
            opacity: headerReveal.isVisible ? 1 : 0,
            transform: headerReveal.isVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.18em] uppercase">
              FAQs
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions<br />
              <span className="text-[#D32F2F]">— Surgery &amp; Patient Guide</span>
            </h2>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3 px-5 text-sm transition-all rounded-xl"
            >
              Ask us on WhatsApp →
            </a>
          </div>
        </div>

        {/* Two-column accordion on desktop — staggered reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="space-y-3">
            {left.map((faq, i) => (
              <div
                key={i}
                style={{
                  opacity: headerReveal.isVisible ? 1 : 0,
                  transform: headerReveal.isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${100 + i * 60}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${100 + i * 60}ms`,
                }}
              >
                <AccordionItem faq={faq} index={i} globalIndex={i} />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {right.map((faq, i) => (
              <div
                key={i}
                style={{
                  opacity: headerReveal.isVisible ? 1 : 0,
                  transform: headerReveal.isVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${120 + i * 60}ms`,
                }}
              >
                <AccordionItem faq={faq} index={i} globalIndex={half + i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
