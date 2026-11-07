"use client";

// AreasWeServe.js
// Location-specific coverage areas and clinic details for all Ryan Clinic branches.
import useTrackCTA from "@/lib/useTrackCTA";
import { BRANCHES, getBranchLocationData } from "@/lib/branchLocationData";

export { BRANCHES, getBranchLocationData };

export default function AreasWeServe({ city = "Delhi", branch = "Delhi", branchData }) {
  const trackCTA = useTrackCTA();

  const builtIn = getBranchLocationData(branch) || getBranchLocationData(city);
  const data = branchData || builtIn || {
    address: "",
    phone: "+91-9911111247",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    metro: "",
    mapUrl: "",
    areas: [],
  };

  const currentCity = city || data.city || branch;
  const currentBranch = branch || data.branch || city;
  const areasList = Array.isArray(data.areas) ? data.areas : [];

  const allBranchKeys = Object.keys(BRANCHES);
  const otherBranches = allBranchKeys.filter(
    (b) =>
      b.toLowerCase() !== String(currentBranch).toLowerCase() &&
      b.toLowerCase() !== String(currentCity).toLowerCase()
  );

  return (
    <section className="py-20 bg-white">
      <div className="containerFull px-4 md:px-6">
        {/* ── Header ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#D32F2F]" />
          <span className="text-[#D32F2F] text-[11px] font-semibold tracking-[0.22em] uppercase">
            Coverage Area
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
          Hair Transplant Across{" "}
          <span className="text-[#D32F2F]">{currentCity} & Beyond</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end my-10">
          <div>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
              Ryan Clinic's {currentBranch} branch welcomes patients from across the
              region. Wherever you are, our team makes your hair transplant
              journey simple — from free scalp analysis to 18-month follow-up.
            </p>
          </div>
          <div>
            <div
              className="rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1">
                  Pan-India Presence
                </p>
                <p className="text-sm font-semibold text-white">
                  Also in{" "}
                  {otherBranches.map((b, i) => {
                    const slugPart = b.toLowerCase() === "ranchi" ? "rachi" : b.toLowerCase();
                    return (
                      <span key={b}>
                        <a
                          href={`/hair-transplant-in-${slugPart}`}
                          className="text-white/75 hover:text-white underline underline-offset-2 transition-colors"
                        >
                          {b}
                        </a>
                        {i < otherBranches.length - 1 ? " & " : ""}
                      </span>
                    );
                  })}
                </p>
              </div>
              <a
                href="/"
                className="inline-flex items-center gap-2 text-[12px] font-semibold py-2 px-4 rounded-xl shrink-0 transition-opacity hover:opacity-90 bg-white/10 text-white border border-white/20"
              >
                All Locations →
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Coverage Area + Clinic Details Layout ── */}
        <div className={`grid grid-cols-1 ${data.address ? "lg:grid-cols-3" : ""} gap-8 lg:gap-10`}>
          {/* Areas grid */}
          <div className={data.address ? "lg:col-span-2" : "w-full"}>
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-full flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-[#D32F2F]">
                  <svg
                    className="w-4 h-4 text-white shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                    Areas Served — {currentBranch}
                  </span>
                </div>

                {/* Area chips */}
                {areasList.length > 0 ? (
                  <div className="p-4 md:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {areasList.map((area, i) => (
                      <div
                        key={area}
                        className={`flex items-center gap-2 px-3 py-3 rounded-lg border transition-colors ${
                          i % 5 === 0
                            ? "bg-red-50 border-red-100 text-[#D32F2F]"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-[#D32F2F]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${i % 5 === 0 ? "bg-[#D32F2F]" : "bg-gray-300"}`}
                        />
                        <span className="text-xs font-medium truncate">{area}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-gray-500">
                    Comprehensive doctor-led hair transplant services available across {currentCity} and nearby regions.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 flex items-start gap-2 border-t border-gray-100 bg-gray-50 mt-4">
                <svg
                  className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Don't see your area? Call us — we welcome patients from
                  anywhere across {currentCity} and surrounding regions.
                </p>
              </div>
            </div>
          </div>

          {/* ── Clinic Address & Contact Card (rendered when branch has verified address) ── */}
          {data.address && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#1a1430] text-white">
                    <svg
                      className="w-4 h-4 text-[#D32F2F] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                      />
                    </svg>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                      {currentBranch} Clinic Details
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                          Clinic Address
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed font-medium">
                          {data.address}
                        </p>
                      </div>
                    </div>

                    {/* Metro / Landmark */}
                    {data.metro && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                            Transit / Landmark
                          </p>
                          <p className="text-xs text-gray-700 leading-snug">
                            {data.metro}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Hours */}
                    {data.hours && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                            Consultation Hours
                          </p>
                          <p className="text-xs text-gray-700 leading-snug">
                            {data.hours}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {data.phone && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                            Direct Appointment Desk
                          </p>
                          <a
                            href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}
                            className="text-xs font-bold text-[#D32F2F] hover:underline"
                            onClick={() => trackCTA({
                              type: "call",
                              ctaName: `Areas We Serve ${currentBranch} Phone`,
                              buttonLocation: "Areas We Serve Section"
                            })}
                          >
                            {data.phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {data.mapUrl && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <a
                      href={data.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full text-xs font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 bg-[#D32F2F] text-white hover:bg-red-700 shadow-sm"
                      onClick={() => trackCTA({
                        type: "directions",
                        ctaName: `Areas We Serve ${currentBranch} Directions`,
                        buttonLocation: "Areas We Serve Section"
                      })}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      Get Directions to {currentBranch} Clinic →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
