"use client";

import { useState } from "react";
import Image from "next/image";
import Faq from "../../../../public/uploads/faq.jpg";

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-light py-16">
      <div className="containerFull px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 underline underline-offset-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 md:p-6 rounded-xl shadow-sm cursor-pointer transition-all duration-300"
                    onClick={() => toggle(index)}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <h3 className="font-semibold text-sm md:text-base">
                        {faq.question}
                      </h3>
                      <span className="text-lg md:text-xl shrink-0">
                        {openIndex === index ? "▾" : "▸"}
                      </span>
                    </div>

                    {openIndex === index && (
                      <p className="text-gray-600 mt-3 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No FAQs available.</p>
              )}
            </div>
          </div>

          {/* Sticky Image — right col */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-40">
              {!imgError && (
                <Image
                  src={Faq}
                  width={800}
                  height={1200}
                  alt="FAQ Illustration"
                  className="w-full h-250 md:h-162.5 lg:h-[95vh] object-cover rounded-2xl shadow-lg"
                  onError={() => setImgError(true)}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
