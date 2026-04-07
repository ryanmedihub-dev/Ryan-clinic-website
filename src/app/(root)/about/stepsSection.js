import {
  PhoneCall,
  CalendarCheck2,
  Scissors,
  Bandage,
  Droplet,
  Syringe,
} from "lucide-react";

const steps = [
  {
    id: 1,
    label: "Step 01",
    subtitle: "Free Consultation",
    tag: "Day 0",
    description:
      "Send photos of the affected area via WhatsApp. Our consultants evaluate your case and provide expert guidance — completely free.",
    icon: PhoneCall,
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 2,
    label: "Step 02",
    subtitle: "Pre-Surgery Appointment",
    tag: "1 Week Before",
    description:
      "We conduct a blood test and perform GFC therapy to fertilise the scalp, creating the perfect condition for healthy hair growth.",
    icon: CalendarCheck2,
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 3,
    label: "Step 03",
    subtitle: "Surgery Day",
    tag: "Day of Procedure",
    description:
      "Hairline design tailored to your facial structure. Donor area analysis completed. The procedure begins under expert hands.",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 4,
    label: "Step 04",
    subtitle: "Bandage Removal",
    tag: "Day 3",
    description:
      "Bandage gently removed. Betadine cream applied to the donor area to prevent infection and promote smooth healing.",
    icon: Bandage,
    image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 5,
    label: "Step 05",
    subtitle: "First Head‑Wash",
    tag: "Day 10",
    description:
      "Patient returns to clinic. Special shampoos gently cleanse the transplanted area, protecting against infection risks.",
    icon: Droplet,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop",
  },
  {
    id: 6,
    label: "Step 06",
    subtitle: "PRP Treatment",
    tag: "Day 21",
    description:
      "PRP therapy using your own plasma is injected to boost hair growth, thicken follicles, and improve density.",
    icon: Syringe,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&auto=format&fit=crop",
  },
];

const StepsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 newBackground overflow-hidden">
      {/* ── Section Header ── */}
      <div className="text-center mb-16 md:mb-20 px-4">
        <span className="inline-block text-[10px] font-semibold tracking-[3.5px] uppercase text-[#D32F2F] mb-4 px-4 py-1.5 rounded-full border border-[#D32F2F]/30 bg-[#D32F2F]/5">
          Hair Transplant Process
        </span>
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-[52px] font-bold leading-tight text-gray-900 mt-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Journey to{" "}
          <span className="relative inline-block text-[#D32F2F]">
            Fuller Hair
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 5.5 C40 2, 80 7, 120 4 S170 2, 198 5.5"
                stroke="#FFC107"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>
        <p className="mt-5 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          From your first message to a full recovery — every step is guided by
          our expert team.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">

        {/* Center spine — md+ */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #D32F2F 8%, #D32F2F 92%, transparent 100%)",
          }}
        />

        {/* Left spine — mobile */}
        <div
          className="absolute left-7 top-0 bottom-0 w-px md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #D32F2F 6%, #D32F2F 94%, transparent 100%)",
          }}
        />

        <div className="flex flex-col gap-10 md:gap-14">
          {steps.map(({ id, label, subtitle, tag, description, icon: Icon, image }, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={id}
                className={`relative flex items-center gap-4 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* ── Card ── */}
                <div
                  className={`
                    group relative w-full md:w-[calc(50%-36px)]
                    ml-12 md:ml-0
                    ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
                  `}
                >
                  <div
                    className="
                      relative bg-white rounded-2xl border border-gray-100
                      shadow-[0_2px_20px_rgba(0,0,0,0.06)]
                      hover:shadow-[0_8px_40px_rgba(211,47,47,0.12)]
                      transition-all duration-300 ease-out
                      hover:-translate-y-1
                      overflow-hidden
                    "
                  >
                    {/* Red top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D32F2F] via-[#ef5350] to-[#D32F2F] z-10" />

                    {/* ── Card Image ── */}
                    <div className="relative w-full h-44 overflow-hidden">
                      <img
                        src={image}
                        alt={subtitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Tag badge over image */}
                      <span className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-[2px] uppercase text-white bg-[#D32F2F] rounded-full px-3 py-1 shadow-sm">
                        {tag}
                      </span>

                      {/* Step number watermark over image */}
                      <span
                        className="absolute top-3 right-4 text-white/20 font-bold leading-none select-none pointer-events-none"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "64px",
                          lineHeight: 1,
                        }}
                        aria-hidden="true"
                      >
                        {String(id).padStart(2, "0")}
                      </span>
                    </div>

                    {/* ── Card Body ── */}
                    <div className="p-5 md:p-6">
                      {/* Icon + Step label row */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fff1f1] border border-[#D32F2F]/20 shrink-0">
                          <Icon size={16} strokeWidth={1.8} className="text-[#D32F2F]" />
                        </div>
                        <p className="text-[10px] font-semibold tracking-[2.5px] uppercase text-gray-400">
                          {label}
                        </p>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl font-bold text-gray-900 mb-2 leading-snug"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {subtitle}
                      </h3>

                      {/* Amber divider */}
                      <div className="w-8 h-[2px] bg-[#FFC107] rounded-full mb-3" />

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-gray-500">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Card → spine connector (md only) */}
                  <div
                    className={`
                      absolute top-1/2 hidden md:block
                      w-8 h-px bg-[#D32F2F]/25
                      ${isLeft ? "-right-8" : "-left-8"}
                    `}
                  />
                </div>

                {/* ── Spine Node — desktop ── */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#D32F2F] shadow-[0_0_0_5px_rgba(211,47,47,0.1)] flex items-center justify-center">
                    <span
                      className="text-[13px] font-bold text-[#D32F2F]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {String(id).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* ── Spine Node — mobile ── */}
                <div className="absolute left-7 -translate-x-1/2 z-10 md:hidden flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white border-2 border-[#D32F2F] shadow-[0_0_0_4px_rgba(211,47,47,0.1)] flex items-center justify-center">
                    <span className="text-[11px] font-bold text-[#D32F2F]">
                      {String(id).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── End cap ── */}
        <div className="relative flex justify-center mt-10 md:mt-14">
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#D32F2F] shadow-[0_0_0_6px_rgba(211,47,47,0.15)]" />
            <p
              className="text-sm font-semibold text-[#D32F2F] tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Full Recovery & Results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;