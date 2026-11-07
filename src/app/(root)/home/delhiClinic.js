"use client";

import { useState, useEffect, useRef } from "react";

export default function DelhiClinicSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (isMapLoaded) return;
    const container = mapContainerRef.current;
    if (!container) return;

    if (!("IntersectionObserver" in window)) {
      setIsMapLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMapLoaded]);

  return (
    <section className="bg-white py-14 md:py-20 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clinic Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Top Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-[#D32F2F]" />
              <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                Pitampura Centre
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Our Hair Transplant Clinic in Delhi
            </h2>

            {/* Approved Marketing Paragraph */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Ryan Clinic&apos;s Delhi centre is located in Pitampura, New Delhi. Patients can book a consultation for scalp assessment, graft estimation, treatment planning and cost guidance.
            </p>

            {/* Address, Phone, Opening Hours Cards */}
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#fff5ec] border border-[#f3e3d3]">
                <div className="w-9 h-9 rounded-lg bg-[#D32F2F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  {/* MapPin icon */}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                    Address
                  </span>
                  <p className="text-sm sm:text-[15px] font-medium text-gray-900 mt-0.5 leading-snug">
                    CD - 163, Block CD, Dakshini Pitampura, Pitampura, Delhi, 110034
                  </p>
                </div>
              </div>

              {/* Phone & Hours Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#fff5ec] border border-[#f3e3d3]">
                  <div className="w-9 h-9 rounded-lg bg-[#D32F2F] text-white flex items-center justify-center shrink-0 mt-0.5">
                    {/* Phone icon */}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Phone Number
                    </span>
                    <a
                      href="tel:+919911111247"
                      className="text-sm sm:text-[15px] font-semibold text-gray-900 hover:text-[#D32F2F] transition-colors mt-0.5 block"
                    >
                      099111 11247
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#fff5ec] border border-[#f3e3d3]">
                  <div className="w-9 h-9 rounded-lg bg-[#D32F2F] text-white flex items-center justify-center shrink-0 mt-0.5">
                    {/* Clock icon */}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Opening Hours
                    </span>
                    <p className="text-sm sm:text-[15px] font-semibold text-gray-900 mt-0.5">
                      9 am – 11 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20visit%20Ryan%20Clinic%20in%20Pitampura,%20Delhi."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors shadow-md"
              >
                Book Delhi Visit
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a
                href="tel:+919911111247"
                className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#D32F2F] text-gray-700 hover:text-[#D32F2F] font-semibold py-3 px-6 rounded-xl text-sm transition-all bg-white"
              >
                Call Clinic Now
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map / Responsive Facade */}
          <div className="lg:col-span-6">
            <div
              ref={mapContainerRef}
              className="w-full h-80 sm:h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]"
            >
              {isMapLoaded ? (
                <iframe
                  title="Ryan Clinic Delhi - Pitampura"
                  src="https://maps.google.com/maps?q=Ryan+Clinic+CD+163+Block+CD+Dakshini+Pitampura+Delhi+110034&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
                  {/* Decorative location badge / pin */}
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#D32F2F] text-white flex items-center justify-center shadow-lg shadow-red-500/25">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D32F2F]" />
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                    Ryan Clinic Delhi — Pitampura
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mb-5 leading-relaxed">
                    CD - 163, Block CD, Dakshini Pitampura, Pitampura, Delhi, 110034
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMapLoaded(true)}
                      className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label="Load interactive Google Map for Ryan Clinic Delhi"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934a1.12 1.12 0 01-1.006 0L9.503 3.814a1.12 1.12 0 00-1.006 0L3.622 6.25A1.125 1.125 0 003 7.256v12.01c0 .836.88 1.38 1.628 1.006l3.869-1.934a1.12 1.12 0 011.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                      </svg>
                      Load Interactive Map
                    </button>

                    <a
                      href="https://maps.google.com/?q=Ryan+Clinic+CD+163+Block+CD+Dakshini+Pitampura+Delhi+110034"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-sm"
                    >
                      Open in Maps
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
