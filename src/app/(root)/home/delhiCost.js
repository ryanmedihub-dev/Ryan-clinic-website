import Link from "next/link";

export default function DelhiCostSection() {
  return (
    <section className="bg-white py-14 md:py-20 border-t border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fff5ec] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#f3e3d3] relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="max-w-3xl relative z-10">
            {/* Top Label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-[#D32F2F]" />
              <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                Pricing & Graft Estimation
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Hair Transplant Cost in Delhi
            </h2>

            {/* Approved Marketing Paragraph */}
            <p className="text-gray-600 text-sm sm:text-base md:text-[16px] leading-relaxed mb-8">
              Hair transplant cost in Delhi depends on factors such as the number of grafts required, the extent of hair loss, donor-area quality, the technique used and the complexity of the procedure. Ryan Clinic provides an individual graft and treatment assessment before confirming the final price. For detailed pricing, graft-based estimates and factors that affect cost, visit our Hair Transplant Cost in Delhi guide.
            </p>

            {/* CTA */}
            <div>
              <Link
                href="/cost/fue-hair-transplant-cost-in-delhi"
                className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3.5 px-6 sm:px-7 rounded-xl text-sm tracking-wide transition-all shadow-md hover:shadow-lg"
              >
                Check Hair Transplant Cost in Delhi
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
