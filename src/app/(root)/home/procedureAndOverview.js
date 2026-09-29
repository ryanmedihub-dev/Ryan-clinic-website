import Link from "next/link";

export default function ProcedureAndOverview() {
  return (
    <section className="bg-white py-14 md:py-20 border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ── Section 10: What Is a Hair Transplant? ── */}
          <div className="bg-[#fff5ec] rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f3e3d3] flex flex-col justify-between">
            <div>
              {/* Top Label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-[#D32F2F]" />
                <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
                  Understanding Hair Restoration
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                What Is a Hair Transplant?
              </h2>

              {/* Marketing Paragraph */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                A hair transplant is a procedure in which hair follicles are moved from a donor area, usually the back or sides of the scalp, to areas affected by thinning or pattern hair loss. FUE-based techniques extract follicular units individually and place them into planned recipient areas. The number of grafts and treatment design depend on the patient&apos;s hair-loss pattern, donor density and desired coverage.
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D32F2F] tracking-wide uppercase">
                Individual Follicular Unit Extraction (FUE) &amp; Sapphire Precision
              </span>
            </div>
          </div>

          {/* ── Section 11: Hair Transplant Procedure at Ryan Clinic ── */}
          <div className="bg-gray-900 text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D32F2F]/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Top Label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-[#FFC107]" />
                <span className="text-[#FFC107] text-[11px] font-semibold tracking-[0.22em] uppercase">
                  Clinical Step-by-Step
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Hair Transplant Procedure at Ryan Clinic
              </h2>

              {/* Marketing Paragraph */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                A typical hair transplant journey includes: (1) consultation and scalp assessment, (2) donor-area and graft evaluation, (3) hairline and recipient-area planning, (4) graft extraction, (5) channel creation and implantation, and (6) post-procedure care and follow-up. The exact process, session length and recovery guidance vary according to the technique and individual treatment plan.
              </p>
            </div>

            {/* CTA */}
            <div className="relative z-10 pt-2">
              <Link
                href="/surgery/hair-transplant-surgery-in-delhi"
                className="inline-flex items-center gap-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl text-sm tracking-wide transition-all shadow-md"
              >
                Learn About Hair Transplant Surgery in Delhi
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
