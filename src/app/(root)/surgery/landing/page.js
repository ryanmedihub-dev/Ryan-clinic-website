import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors, Stethoscope, HeartPulse, IndianRupee, Camera, HelpCircle, Microscope } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export const metadata = {
  title: "Hair Transplant Surgery Types – Explore All Procedures | Ryan Clinic",
  description: "Discover the full range of hair transplant surgery types we offer – FUE, Turkish Technique, Beard, Crown, Women, and more. Detailed guides for each procedure.",
  keywords: ["hair transplant surgery types", "FUE", "Turkish Technique", "beard transplant", "crown transplant", "women hair transplant"],
  alternates: { canonical: "https://www.clinicryan.com/surgery" },
  openGraph: {
    title: "Hair Transplant Surgery Types – Ryan Clinic",
    description: "Explore every hair transplant surgery type we perform, with expert guides for each procedure.",
    url: "https://www.clinicryan.com/surgery",
    siteName: "Ryan Clinic",
    locale: "en_IN",
    type: "website",
    images: [{ url: "https://www.clinicryan.com/uploads/1752734248947-Hair Transplant 1.jpg", alt: "Ryan Clinic Hair Transplant" }],
  },
};

/* ─── Static Surgery Types ──────────────────────────────────────────────── */
const SURGERY_TYPES = [
  {
    id: "fue",
    name: "Sapphire FUE",
    icon: Scissors,
    img: "/uploads/surgery-fue.jpg",
    desc: "Micro‑blade extraction (0.7‑0.9 mm) with minimal scarring and rapid recovery.",
    href: "/surgery/fue",
  },
  {
    id: "dhi",
    name: "Turkish Technique",
    icon: Stethoscope,
    img: "/uploads/surgery-dhi.jpg",
    desc: "Implantation without pre‑made slits – maximum density, zero graft drying.",
    href: "/surgery/dhi",
  },
  {
    id: "beard",
    name: "Beard Transplant",
    icon: HeartPulse,
    img: "/uploads/surgery-beard.jpg",
    desc: "Full‑face restoration using the same doctor‑led technique as scalp FUE.",
    href: "/surgery/beard",
  },
  {
    id: "crown",
    name: "Crown Restoration",
    icon: IndianRupee,
    img: "/uploads/surgery-crown.jpg",
    desc: "Specialised approach for dense crown coverage with natural direction.",
    href: "/surgery/crown",
  },
  {
    id: "women",
    name: "Women’s Hair Restoration",
    icon: Camera,
    img: "/uploads/surgery-women.jpg",
    desc: "Gentle FUE tailored for female pattern hair loss and finer grafts.",
    href: "/surgery/women",
  },
  {
    id: "faq",
    name: "Surgery FAQs",
    icon: HelpCircle,
    img: "/uploads/surgery-faq.jpg",
    desc: "All common questions about procedures, recovery and costs answered.",
    href: "/surgery/faq",
  },
];

export default function SurgeryLandingPage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-[420px] bg-gray-900/60">
        <Image
          src="/uploads/hero-surgery.jpg"
          alt="Hair transplant surgery"
          fill
          className="object-cover object-center opacity-40"
          priority
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
            <ArrowRight className="w-4 h-4 text-[#D32F2F]" />
            <span className="text-sm font-semibold uppercase text-white tracking-wider">
              Explore Our Surgery Portfolio
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] mb-4 font-sans">
            Hair Transplant <span className="text-[#D32F2F]">Surgery Types</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto font-sans">
            From Sapphire FUE to Turkish Technique, Beard & Crown, and specialized women’s procedures – discover the full spectrum of our doctor‑led surgical solutions.
          </p>
        </div>
      </section>

      {/* ─── GRID OF SURGERY TYPES ─────────────────────────────────── */}
      <section className="bg-[#FAF6F3] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="flex-1 h-px bg-[#D32F2F]/30" />
              <span className="text-[#D32F2F] text-[11px] font-extrabold uppercase tracking-wider">
                Our Expertise
              </span>
              <span className="flex-1 h-px bg-[#D32F2F]/30" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 font-sans">
              Detailed Guides for Every Procedure
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3 font-sans">
              Click any card to read the full guide – technique, recovery timeline, pricing and after‑care tips.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SURGERY_TYPES.map((type) => (
              <Link
                key={type.id}
                href={type.href}
                className="group relative block rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={type.img}
                    alt={type.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <type.icon className="w-6 h-6 text-[#D32F2F]" />
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-[#D32F2F] transition-colors font-sans">
                      {type.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm flex-1 mb-4 font-sans">
                    {type.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[#D32F2F] font-medium group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALL‑TO‑ACTION BANNER ─────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#D32F2F]/10 border border-[#D32F2F]/30 text-[#D32F2F] text-xs font-bold uppercase px-3 py-1 rounded-full mb-6">
            <ArrowRight className="w-3 h-3" />
            Ready for your transformation?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-5 font-sans">
            Book a <span className="text-[#D32F2F]">Free Surgery Consultation</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mb-8 font-sans">
            Talk directly with our board‑certified surgeons, get a personalized graft count and an exact cost estimate – no obligations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-800 text-white font-bold py-3 px-8 rounded-xl text-sm transition-colors"
          >
            Schedule Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
