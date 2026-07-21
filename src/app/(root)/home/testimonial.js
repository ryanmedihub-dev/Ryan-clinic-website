"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import useTrackCTA from "@/lib/useTrackCTA";

import Modi from "../../../../public/uploads/celebrity/modi.jpg";
import Paneer from "../../../../public/uploads/celebrity/paneer.jpg";
import Shyam from "../../../../public/uploads/celebrity/shyam.jpg";
import Mahesh from "../../../../public/uploads/celebrity/mahesh.jpg";
import Deepak from "../../../../public/uploads/celebrity/deepak.jpg";
import Joginder from "../../../../public/uploads/celebrity/joginder.jpg";
import Puneet from "../../../../public/uploads/celebrity/puneet.jpg";

const celebrities = [
  { name: "Instagram Influencer", image: Modi },
  { name: "Dil Se Paneer — Instagram Influencer", image: Paneer },
  { name: "Deepak Sharma — Jailor", image: Deepak },
  { name: "Puneet — Instagram Influencer", image: Puneet },
  { name: "Joginder — Instagram Influencer", image: Joginder },
  { name: "Shyam Mashalkar — Actor", image: Shyam },
  { name: "Mahesh Thakur — Actor", image: Mahesh },
];

const googleReviews = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    rating: 5,
    date: "2 weeks ago",
    review:
      "Absolutely amazing experience! The Turkey hair transplant results exceeded all my expectations. The team at Ryan Clinic is highly professional and made me feel comfortable throughout the process.",
  },
  {
    name: "Amit Verma",
    initials: "AV",
    rating: 5,
    date: "1 month ago",
    review:
      "Best decision of my life. 8 months post-op and my hair looks completely natural. Nobody can tell I had a transplant. Ryan Clinic's Turkey package was seamless from start to finish.",
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    rating: 5,
    date: "3 weeks ago",
    review:
      "I was skeptical at first but the before/after photos on the website convinced me. Now I'm one of those success stories! Excellent doctors, great facilities, and wonderful aftercare.",
  },
  {
    name: "Suresh Patel",
    initials: "SP",
    rating: 5,
    date: "2 months ago",
    review:
      "Ryan Clinic handled everything — flights, hotel, hospital. The Sapphire FUE technique gave me a completely natural hairline. Worth every rupee. Highly recommend!",
  },
  {
    name: "Manish Gupta",
    initials: "MG",
    rating: 5,
    date: "6 weeks ago",
    review:
      "From consultation to aftercare, the experience was flawless. The doctors in Turkey are world-class. My confidence is completely restored. Thank you Ryan Clinic!",
  },
  {
    name: "Deepak Joshi",
    initials: "DJ",
    rating: 5,
    date: "1 month ago",
    review:
      "I've been recommending Ryan Clinic to all my friends. The results at 10 months are incredible. Natural density, great hairline design. The team is always available for follow-up queries.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4"
          viewBox="0 0 20 20"
          fill={star <= rating ? "#FBBC04" : "#E0D8CF"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("celebrities");
  const trackCTA = useTrackCTA();

  return (
    <section
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: "var(--bg-soft)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="block w-10 h-px"
              style={{ background: "var(--accent-gold)" }}
            />
            <span
              className="text-[11px] font-semibold tracking-[0.22em] uppercase"
              style={{ color: "var(--primary-red)" }}
            >
              Patient Stories
            </span>
            <span
              className="block w-10 h-px"
              style={{ background: "var(--accent-gold)" }}
            />
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Celebrity Results & {" "}
            <span style={{ color: "var(--primary-red)" }}>Reviews</span>
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            From Bollywood celebrities to everyday heroes — real results that
            speak for themselves.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-10">
          <div
            className="flex rounded-2xl p-1 gap-1"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
          >
            <button
              onClick={() => setActiveTab("celebrities")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                activeTab === "celebrities"
                  ? {
                      background: "var(--primary-red)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(227,10,23,0.3)",
                    }
                  : { color: "var(--text-secondary)" }
              }
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Celebrity Patients
            </button>
            <button
              onClick={() => setActiveTab("google")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={
                activeTab === "google"
                  ? {
                      background: "var(--primary-red)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(227,10,23,0.3)",
                    }
                  : { color: "var(--text-secondary)" }
              }
            >
              <GoogleLogo />
              Google Reviews
            </button>
          </div>
        </div>

        {/* Celebrity Swiper */}
        {activeTab === "celebrities" && (
          <div>
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                560: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
            >
              {celebrities.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-md group"
                    style={{ height: "420px" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name || "Celebrity Patient"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Hover red tint */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(165,0,0,0.55) 0%, transparent 60%)",
                      }}
                    />

                    {/* Celebrity badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(0,0,0,0.55)",
                          color: "var(--accent-gold-light)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(212,169,55,0.4)",
                        }}
                      >
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Celebrity
                      </span>
                    </div>

                    {/* Bottom overlay */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-5 py-5"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)",
                      }}
                    >
                      <span
                        className="block w-8 h-0.5 mb-2"
                        style={{ background: "var(--accent-gold)" }}
                      />
                      <p className="text-white font-semibold text-sm leading-snug">
                        {item.name}
                      </p>
                      <p
                        className="text-xs mt-1 font-medium"
                        style={{ color: "var(--accent-gold-light)" }}
                      >
                        Ryan Clinic Patient
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Google Reviews Grid */}
        {activeTab === "google" && (
          <div>
            {/* Rating Summary Bar */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 rounded-2xl px-6 py-5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div className="flex items-center gap-4">
                <GoogleLogo />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      4.9
                    </span>
                    <StarRating rating={5} />
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    Based on 500+ Google Reviews
                  </p>
                </div>
              </div>
              <div
                className="hidden sm:block w-px h-12 self-center"
                style={{ background: "var(--border-soft)" }}
              />
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    10K+
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Happy Patients
                  </p>
                </div>
                <div
                  className="w-px h-10"
                  style={{ background: "var(--border-soft)" }}
                />
                <div className="text-center">
                  <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    98%
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Swiper */}
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1.5, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
              }}
            >
              {googleReviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="rounded-2xl p-6 h-full flex flex-col gap-4"
                    style={{
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-light)",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                      minHeight: "220px",
                    }}
                  >
                    {/* Top row: avatar + name + Google logo */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                          style={{ background: "var(--primary-red)" }}
                        >
                          {review.initials}
                        </div>
                        <div>
                          <p
                            className="font-semibold text-sm leading-tight"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {review.name}
                          </p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {review.date}
                          </p>
                        </div>
                      </div>
                      <GoogleLogo />
                    </div>

                    {/* Stars */}
                    <StarRating rating={review.rating} />

                    {/* Review Text */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Verified badge */}
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          stroke="#34A853"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: "#34A853" }}
                      >
                        Verified Google Review
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div
          className="mt-12 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
          }}
        >
          <p
            className="text-sm font-medium text-center sm:text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Join{" "}
            <strong style={{ color: "var(--text-primary)" }}>10,000+</strong>{" "}
            patients who chose Ryan Clinic for permanent, natural results.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi, I visited your website. I want a free consultation."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm py-3 px-6 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "var(--primary-red)", boxShadow: "0 4px 14px rgba(227,10,23,0.35)" }}
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "Testimonials Book Consultation", buttonLocation: "Testimonials Section" })}
            >
              Book Free Consultation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <a
              href="tel:+919911111247"
              className="inline-flex items-center gap-2 font-semibold text-sm py-3 px-6 rounded-xl transition-all"
              style={{ border: "1px solid var(--border-light)", color: "var(--text-secondary)" }}
              onClick={() => trackCTA({ type: "call", ctaName: "Testimonials Call Now", buttonLocation: "Testimonials Section" })}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
