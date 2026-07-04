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
  "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20have%20a%20question%20about%20hair%20transplant%20surgery";

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
        className={`border rounded-2xl cursor-pointer transition-all duration-300 ${
          isOpen
            ? "border-red-100 bg-[#F7F5F2] shadow-sm"
            : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
        }`}
        onClick={() => setOpen(isOpen ? null : globalIndex)}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <h3
            className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-150 ${
              isOpen ? "text-[#e30a17]" : "text-[#302658]"
            }`}
          >
            {faq.q}
          </h3>
          <span
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen ? "bg-[#e30a17] text-white rotate-180" : "bg-gray-50 text-gray-500"
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"}
              ></path>
            </svg>
          </span>
        </div>
        {/* Smooth height transition */}
        <div
          ref={bodyRef}
          style={{
            maxHeight: isOpen ? `${bodyRef.current?.scrollHeight ?? 200}px` : "0px",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-6 pb-5 pt-1 border-t border-gray-100/50">
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{faq.a}</p>
          </div>
        </div>
      </div>
    );
  }

  const headerReveal = useScrollReveal(0.1);

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerReveal.ref}
          className="mb-12"
          style={{
            opacity: headerReveal.isVisible ? 1 : 0,
            transform: headerReveal.isVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e30a17]" />
            <span className="text-[#e30a17] text-[11px] font-bold tracking-[0.2em] uppercase">
              FAQS & HELP
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#302658] leading-tight tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                Everything you need to know about the surgery, recovery timeline, safety standards, and pricing.
              </p>
            </div>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#F7F5F2] hover:bg-gray-100 border border-gray-200/60 hover:border-gray-300 text-gray-700 font-semibold py-3 px-5 text-sm transition-all rounded-xl shadow-sm"
            >
              Ask on WhatsApp
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Two-column accordion on desktop — staggered reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
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
          <div className="space-y-4">
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
