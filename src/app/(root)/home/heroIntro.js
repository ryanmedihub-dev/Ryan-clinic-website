import Link from "next/link";

export default function HeroIntro() {
  return (
    <section className="bg-[#fff5ec] py-8 sm:py-10 md:py-12 border-b border-[#f3e3d3]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Label */}
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="block w-6 sm:w-8 h-px bg-[#D32F2F]" />
            <span className="text-[#D32F2F] text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase">
              Doctor-Led Hair Restoration in Delhi
            </span>
            <span className="block w-6 sm:w-8 h-px bg-[#D32F2F]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Expert Hair Transplant in Delhi with <br className="hidden sm:inline" />
            <span className="text-[#D32F2F]">Doctor-Led Treatment Planning</span>
          </h2>

          {/* Marketing Copy */}
          <p className="text-gray-600 text-sm sm:text-base md:text-[16px] leading-relaxed mb-6">
            Ryan Clinic offers advanced hair transplant in Delhi with doctor-led treatment planning and modern hair restoration techniques, including Sapphire FUE. Each treatment plan is based on your hair-loss pattern, donor-area quality, required graft count and desired hairline. Book a consultation to understand your suitability, expected graft requirement, recovery plan and estimated hair transplant cost in Delhi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20to%20book%20a%20hair%20transplant%20consultation%20in%20Delhi."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3 px-6 text-sm tracking-wide transition-colors rounded-xl shadow-md"
            >
              Book Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <Link
              href="/cost/fue-hair-transplant-cost-in-delhi"
              className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#D32F2F] bg-white hover:bg-red-50/50 text-gray-800 hover:text-[#D32F2F] font-semibold py-3 px-6 text-sm tracking-wide transition-all rounded-xl shadow-sm"
            >
              Check Estimated Cost
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
