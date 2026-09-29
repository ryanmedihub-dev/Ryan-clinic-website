"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import useTrackCTA from "@/lib/useTrackCTA";

import DelhiImg from "../../../../public/uploads/Delhi.webp";
import MumbaiImg from "../../../../public/uploads/Mumbai.webp";
import HyderabadImg from "../../../../public/uploads/Hyderabad.webp";

const locations = [
  { name: "Delhi", image: DelhiImg, link: "/hair-transplant-in-delhi" },
  { name: "Mumbai", image: MumbaiImg, link: "/hair-transplant-in-mumbai" },
  { name: "Hyderabad", image: HyderabadImg, link: "/hair-transplant-in-hyderabad" },
  { name: "Gurgaon", image: DelhiImg, link: "/hair-transplant-in-gurgaon" },
  { name: "Noida", image: DelhiImg, link: "/hair-transplant-in-noida" },
  { name: "Pune", image: MumbaiImg, link: "/hair-transplant-in-pune" },
  { name: "Patna", image: DelhiImg, link: "/hair-transplant-in-patna" },
  { name: "Ahmedabad", image: MumbaiImg, link: "/hair-transplant-in-ahmedabad" },
  { name: "Bangalore", image: HyderabadImg, link: "/hair-transplant-in-banglore" },
  { name: "Jammu", image: DelhiImg, link: "/hair-transplant-in-jammu" },
  { name: "Lucknow", image: DelhiImg, link: "/hair-transplant-in-lucknow" },
  { name: "Kolkata", image: DelhiImg, link: "/hair-transplant-in-kolkata" },
  { name: "Chennai", image: HyderabadImg, link: "/hair-transplant-in-chennai" },
  { name: "Indore", image: MumbaiImg, link: "/hair-transplant-in-indore" },
  { name: "Bhopal", image: MumbaiImg, link: "/hair-transplant-in-bhopal" },
  { name: "Chandigarh", image: DelhiImg, link: "/hair-transplant-in-chandigarh" },
  { name: "Rachi", image: DelhiImg, link: "/hair-transplant-in-rachi" },
  { name: "Dehradun", image: DelhiImg, link: "/hair-transplant-in-dehradun" },
  { name: "Nagpur", image: MumbaiImg, link: "/hair-transplant-in-nagpur" },
  { name: "Jaipur", image: DelhiImg, link: "/hair-transplant-in-jaipur" },
];

export default function OurBranches() {
  const trackCTA = useTrackCTA();
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(rgb(0 0 0 / 82%), rgb(0 0 0 / 82%))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Subtle red top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "var(--primary-red)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* ── Left Text ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="block w-8 h-px"
                style={{ background: "var(--accent-gold)" }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: "var(--accent-gold)" }}
              >
                Pan-India Presence
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: "#ffffff" }}
            >
              Ryan Clinic{" "}
              <span style={{ color: "var(--accent-gold)" }}>Locations</span>
              <br />
              Across India
            </h2>

            <p
              className="leading-relaxed text-base md:text-lg mb-4"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Ryan Clinic leads India&apos;s No.1 hair transplant space with branches equipped for advanced Turkey Sapphire FUE. Skilled doctors, modern OT infrastructure and per-graft transparent pricing — available across India.
            </p>

            <p
              className="text-sm mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              The best hair restoration clinic is closer than you think.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-8">
              {[
                { num: "20", label: "Cities" },
                { num: "10K+", label: "Patients" },
                { num: "95%+", label: "Graft Survival" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {s.num}
                  </p>
                  <p
                    className="text-[11px] font-medium tracking-wide mt-0.5"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I visited your website. Please guide me with the best treatment."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl justify-center text-white transition-colors"
                style={{ background: "var(--primary-red)" }}
                onClick={() => trackCTA({ type: "whatsapp", ctaName: "Branches Visit Consultation", buttonLocation: "Our Branches Section" })}
              >
                Visit a Branch Near You
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a
                href="tel:+919911111247"
                className="inline-flex items-center gap-2 font-semibold text-sm py-3.5 px-7 rounded-xl justify-center transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)" }}
                onClick={() => trackCTA({ type: "call", ctaName: "Branches Call Now", buttonLocation: "Our Branches Section" })}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* ── Right Swiper ── */}
          <div className="order-1 lg:order-2">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".branch-swiper-button-next",
                prevEl: ".branch-swiper-button-prev",
              }}
              loop
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 1.5, spaceBetween: 16 },
                768: { slidesPerView: 1.8, spaceBetween: 20 },
                1024: { slidesPerView: 2, spaceBetween: 20 },
                1280: { slidesPerView: 2, spaceBetween: 24 },
              }}
              className="rounded-2xl relative"
            >
              {locations.map((item, index) => (
                <SwiperSlide key={index} className="relative">
                  <a href={item.link}>
                    <div className="branch-slide relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl group">
                      {/* Image */}
                      <Image
                        src={item.image}
                        alt={`${item.name} Branch`}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-400 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Overlay gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                        }}
                      />

                      {/* City badge */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span
                            className="block text-xs font-semibold uppercase tracking-widest mb-1"
                            style={{ color: "var(--accent-gold)" }}
                          >
                            Ryan Clinic
                          </span>
                          <h3 className="text-white font-bold text-xl md:text-2xl">
                            {item.name}
                          </h3>
                        </div>
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "var(--primary-red)" }}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <div className="flex justify-center mt-6 space-x-3">
              <div
                className="branch-swiper-button-prev cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary-red)";
                  e.currentTarget.style.borderColor = "var(--primary-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </div>
              <div
                className="branch-swiper-button-next cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary-red)";
                  e.currentTarget.style.borderColor = "var(--primary-red)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom red accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: "var(--primary-red)" }}
      />

      <style jsx global>{`
        .branch-slide {
          transition: transform 0.3s ease;
        }
        .branch-slide:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
}
