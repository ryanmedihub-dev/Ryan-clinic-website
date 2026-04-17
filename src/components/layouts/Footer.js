import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/uploads/logo-2.png";
import FooterCallbackForm from "@/components/pages/FooterCallbackForm";

const services = [
  { label: "Turkey Sapphire FUE", href: "/hairline-transplant" },
  { label: "Beard Transplant", href: "/beard-transplant" },
  { label: "FUE Hair Transplant", href: "/fue-hair-transplant" },
  { label: "Hairline Transplant", href: "/hairline-transplant" },
  { label: "Female Hair Transplant", href: "/female-hair-transplant" },
  { label: "Eyebrow Transplant", href: "/eyebrow-transplant" },
  { label: "PRP Treatment", href: "/prp-treatment" },
  { label: "Chemical Skin Peels", href: "/chemical-skin-peels" },
  { label: "Alopecia Treatment", href: "/alopecia-treatments" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Gallery", href: "/gallery/images" },
  { label: "Our Videos", href: "/gallery/images" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const branches = [
  {
    city: "Delhi",
    address: "CD 163, Block CD, Dakshini Pitampura, Pitampura, New Delhi – 110034",
    phone: "+91-9217958539",
  },
  {
    city: "Mumbai",
    address:
      "MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053",
    phone: "+91-9217958539",
  },
  {
    city: "Hyderabad",
    address:
      "2nd Floor, 8-2, 316/A/6/A, Road No. 14, Above SBI Bank, Banjara Hills, Hyderabad – 500034",
    phone: "+91-9217958539",
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0d0d0d", color: "#e5e5e5" }}>
      {/* ── Trust bar ── */}
      <div
        style={{
          background: "var(--primary-red)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <span style={{ color: "#FFD700", fontSize: "1rem" }}>★★★★★</span>
            <span>4.9 Google Rating</span>
            <span className="hidden sm:block opacity-40">·</span>
            <span className="hidden sm:block">Based on 1,000+ Reviews</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.youtube.com/@RyanTranplant"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-red-200 transition"
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-pink-200 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/RyanClinic3210"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-blue-200 transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want a free hair transplant consultation"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-green-200 transition"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main upper section ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Brand block */}
          <div>
            <div className="flex justify-start mt-22 mb-6">
              <Image
                src={Logo}
                alt="Ryan Clinic"
                width={220}
                height={80}
                className="h-auto object-contain"
                unoptimized
              />
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#9ca3af" }}>
              Ryan Clinic is India's premier hair transplant centre, exclusively
              specialising in Turkey Sapphire FUE — the same technique that made
              Turkey the world's hair transplant capital. Certified doctors, 95%+
              graft survival, and transparent pricing across Delhi, Mumbai &amp;
              Hyderabad.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { num: "95%+", label: "Graft Survival" },
                { num: "10K+", label: "Patients" },
                { num: "12+", label: "Years" },
                { num: "4.9★", label: "Google Rating" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center justify-center py-3 px-2 rounded-xl text-center"
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {s.num}
                  </span>
                  <span className="text-[10px] mt-0.5" style={{ color: "#6b7280" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: "https://www.youtube.com/@RyanTranplant",
                  icon: <FaYoutube size={14} />,
                  label: "@RyanTranplant",
                  hoverColor: "#ef4444",
                },
                {
                  href: "https://www.instagram.com/ryan_clinic?igsh=MTVjbHJja2xpMGxrdg%3D%3D",
                  icon: <FaInstagram size={14} />,
                  label: "@ryan_clinic",
                  hoverColor: "#ec4899",
                },
                {
                  href: "https://www.facebook.com/RyanClinic3210",
                  icon: <FaFacebookF size={14} />,
                  label: "RyanClinic3210",
                  hoverColor: "#3b82f6",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#9ca3af",
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Callback form */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <FooterCallbackForm />
          </div>
        </div>
      </div>

      {/* ── Links + Services grid ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Services */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-1 h-5 rounded-full"
                style={{ background: "var(--primary-red)" }}
              />
              <h4 className="font-bold text-white text-base uppercase tracking-wider">
                Our Services
              </h4>
            </div>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-sm transition-colors group"
                    style={{ color: "#6b7280" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 transition-colors group-hover:bg-red-500"
                      style={{ background: "#374151" }}
                    />
                    <span className="group-hover:text-white transition-colors">
                      {s.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-1 h-5 rounded-full"
                style={{ background: "var(--primary-red)" }}
              />
              <h4 className="font-bold text-white text-base uppercase tracking-wider">
                Quick Links
              </h4>
            </div>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm transition-colors group"
                    style={{ color: "#6b7280" }}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 transition-colors group-hover:bg-red-500"
                      style={{ background: "#374151" }}
                    />
                    <span className="group-hover:text-white transition-colors">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-1 h-5 rounded-full"
                style={{ background: "var(--primary-red)" }}
              />
              <h4 className="font-bold text-white text-base uppercase tracking-wider">
                Contact Us
              </h4>
            </div>
            <ul className="space-y-4">
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>
                  Phone
                </p>
                <a
                  href="tel:+919217958539"
                  className="text-sm font-medium text-white hover:underline"
                  style={{ color: "var(--accent-gold)" }}
                >
                  +91-9217958539
                </a>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>
                  Email
                </p>
                <a
                  href="mailto:clinicryanofficial@gmail.com"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#9ca3af" }}
                >
                  clinicryanofficial@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#6b7280" }}>
                  Hours
                </p>
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
              </li>
              <li className="pt-2">
                <a
                  href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I want a free hair transplant consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-xl text-white transition-colors"
                  style={{ background: "#16a34a" }}
                >
                  <FaWhatsapp size={15} />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Branch addresses ── */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span
            className="block w-1 h-5 rounded-full"
            style={{ background: "var(--primary-red)" }}
          />
          <h4 className="font-bold text-white text-base uppercase tracking-wider">
            Our Branches
          </h4>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.map((b) => (
            <div
              key={b.city}
              className="rounded-xl p-5"
              style={{
                background: "#161616",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "3px solid var(--primary-red)",
              }}
            >
              {/* City header */}
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  style={{ color: "var(--accent-gold)" }}
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
                <h5 className="font-bold text-white text-sm">{b.city}</h5>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#6b7280" }}>
                {b.address}
              </p>
              <a
                href={`tel:${b.phone}`}
                className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                style={{ color: "var(--accent-gold)" }}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                {b.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div style={{ background: "#080808" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left" style={{ color: "#4b5563" }}>
            © 2025 Ryan Clinic — All Rights Reserved.{" "}
            <span style={{ color: "#6b7280" }}>clinicryan.com</span>
          </p>
          <p className="text-xs text-center sm:text-right" style={{ color: "#4b5563" }}>
            India's only Turkey Sapphire FUE Hair Transplant Clinic
          </p>
        </div>
      </div>
    </footer>
  );
}
