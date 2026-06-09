import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

const PRICING = [
  {
    num: "01",
    grafts: "Up to 1,000 Grafts",
    min: "Rs. 30,000/-",
    max: "Rs. 40,000/-",
    time: "4–5 hrs",
  },
  {
    num: "02",
    grafts: "1,000 – 1,500 Grafts",
    min: "Rs. 40,000/-",
    max: "Rs. 52,500/-",
    time: "5 hrs",
  },
  {
    num: "03",
    grafts: "1,500 – 2,000 Grafts",
    min: "Rs. 55,000/-",
    max: "Rs. 70,000/-",
    time: "6 hrs",
  },
  {
    num: "04",
    grafts: "2,000 – 2,500 Grafts",
    min: "Rs. 73,000/-",
    max: "Rs. 87,500/-",
    time: "7 hrs",
  },
  {
    num: "05",
    grafts: "2,500 – 3,000 Grafts",
    min: "Rs. 90,000/-",
    max: "Rs. 1,05,000/-",
    time: "8 hrs",
  },
  {
    num: "06",
    grafts: "3,000 – 3,500 Grafts",
    min: "Rs. 95,000/-",
    max: "Rs. 1,15,000/-",
    time: "9 hrs",
  },
  {
    num: "07",
    grafts: "3,500 – 4,000 Grafts",
    min: "Rs. 1,25,000/-",
    max: "Rs. 1,45,000/-",
    time: "9–10 hrs",
  },
];

function TimePill({ time, featured }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium ${
        featured ? "bg-white/10 text-white/70" : "bg-[#F2EDE7] text-[#5a4e44]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
          featured ? "bg-white/40" : "bg-[#c9b99f]"
        }`}
      />
      {time}
    </span>
  );
}

function PriceCard({ item }) {
  const { num, grafts, min, max, time, featured } = item;
  return (
    <div
      className="relative p-6 transition-colors hover:bg-[#1e1838] hover:text-white bg-red-50 ease-in-out duration-300"
    >
      {featured && (
        <span className="absolute top-4 right-4 bg-[#e30a17] text-white text-[8px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <p
        className={`text-[10px] font-medium tracking-[0.15em] mb-1.5 ${featured ? "text-white/35" : "text-[#c9b99f]"}`}
      >
        {num}
      </p>

      <p
        className={`font-semibold text-[15px] leading-snug mb-4 ${playfair.className} text-[#1a1430]}`}
      >
        {grafts}
      </p>

      <div className="flex items-end justify-between gap-3">
        <div>
          <p
            className={`text-[20px] font-bold leading-none ${playfair.className} ${featured ? "text-[#FFB3B3]" : "text-[#e30a17]"}`}
          >
            {max}
          </p>
          <p
            className={`text-[11px] mt-1 ${featured ? "text-white/30" : "text-[#c0b8b0]"}`}
          >
            from {min}
          </p>
        </div>
        <TimePill time={time} featured={featured} />
      </div>
    </div>
  );
}

export default function CostSection({ city = "Delhi", pricing, sectionTitle, sectionDescription }) {
  const PRICING_DATA = pricing?.length ? pricing : PRICING;
  const title = sectionTitle || "Hair Transplant Cost";
  const description = sectionDescription || `Hair transplant cost in ${city} at Ryan Clinic starts from ₹40,000 and typically ranges up to ₹3,50,000, depending on graft count and technique (about ₹40–₹120 per graft for doctor-led Sapphire FUE). Your exact cost is confirmed after a free scalp analysis. 0% EMI is available.`;
  return (
    <section className={` py-20 lg:py-24 ${dmSans.className}`}>
      <div className="containerFull px-6 md:px-8">
        <div className="max-w-full mx-auto">
          {/* Top strip */}
          <div className="flex items-center gap-0 mb-10">
            <span className="flex-1 h-px bg-linear-to-r from-[#e30a17] to-transparent" />
            <span className="text-[9.5px] font-semibold tracking-[0.35em] uppercase text-[#e30a17] px-5 whitespace-nowrap">
              Sapphire FUE &nbsp;·&nbsp; Original Choi Pen &nbsp;·&nbsp; Turkey
              Technique
            </span>
            <span className="flex-1 h-px bg-linear-to-l from-[#e30a17] to-transparent" />
          </div>

          {/* Hero row */}
          <div className="flex items-end justify-between gap-8 mb-12 flex-wrap">
            <div>
              <h2
                className={`${playfair.className} text-[clamp(2rem,4vw,2.8rem)] font-bold text-[#1a1430] leading-[1.15]`}
              >
                {title}
                <em className="text-[#e30a17]"> in {city}</em>
              </h2>
              <p className="text-[15px]  text-[#9a9287] leading-[1.8] mt-4">
                {description}
              </p>
            </div>
            {/* <div className="bg-[#1a1430] text-[#F4F1EC] text-center px-6 py-3 rounded-sm shrink-0">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase block">
                Free Consultation
              </span>
              <span
                className={`${playfair.className} text-white text-[22px] font-bold leading-tight block mt-0.5`}
              >
                ₹0
              </span>
            </div> */}
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-3 gap-0.5 bg-[#d8d1c7] rounded-2xl overflow-hidden mb-6">
            {PRICING_DATA.map((item) => (
              <PriceCard key={item.num} item={item} />
            ))}

            {/* PRP — full width */}
            <div className="col-span-2 bg-red-50  transition-colors p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[14px] font-medium tracking-[0.15em] text-[#c9b99f] mb-1">
                    Add-on Treatment
                  </p>
                  <p
                    className={`${playfair.className} text-[22px] font-semibold text-[#6b6059] italic`}
                  >
                    PRP Therapy per Session
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <p
                      className={`${playfair.className} text-[20px] font-bold text-[#b87d3a] leading-none`}
                    >
                      Rs. 8,000/-
                    </p>
                    <p className="text-[11px] text-[#c0b8b0] mt-1">
                      from Rs. 4,000/-
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#EDE9E3] rounded-full px-3 py-1.5 text-[11.5px] font-medium text-[#5a4e44]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9b99f] shrink-0" />
                    1 hr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex gap-4 items-start bg-white border border-[#f0d99a] border-l-[3px] border-l-[#f0a500] rounded-xl px-5 py-4">
            <span className="text-xl shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="text-[12.5px] font-semibold text-[#7a5c0a] mb-1">
                Beware of extremely cheap quotes
              </p>
              <p className="text-[12px] text-[#9c7a25] leading-[1.7] m-0">
                ₹15–25 per graft usually signals technician-led surgery. A hair transplant is permanent — and a poor one is very hard to fix. Always confirm a qualified doctor performs your surgery before booking on price alone.
              </p>
            </div>
          </div>

          {/* Footnote */}
          <div className="flex items-center gap-2.5 mt-5">
            <span className="w-6 h-px bg-[#c9b99f]" />
            <p className="text-[14px] text-[#b8b0a5] tracking-[0.02em]">
              Prices are indicative. Final cost confirmed after your free scalp
              assessment with our surgeon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
