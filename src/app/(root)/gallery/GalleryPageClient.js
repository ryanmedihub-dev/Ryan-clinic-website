"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/layouts/pageBanner";
import useTrackCTA from "@/lib/useTrackCTA";
import {
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Maximize2,
  MessageSquare,
  Users,
  Camera,
} from "lucide-react";

import ImageOne from '../../../../public/uploads/images/image1.jpg';
import GalleryBanner from "../../../../public/uploads/gallery.jpg";



// Interactive Hover-to-Reveal Before/After Image Slider
function BeforeAfterSlider({ src, afterSrc, alt, className = "" }) {
  const [sliderVal, setSliderVal] = useState(50);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const containerRef = useRef(null);

  const getPercentage = (clientX) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = (x / rect.width) * 100;
    return Math.min(100, Math.max(0, pct));
  };

  // Mouse: update on every move — no click required
  const handleMouseMove = (e) => {
    setSliderVal(getPercentage(e.clientX));
  };

  // Touch: require touch-start then move (standard drag UX on mobile)
  const handleTouchStart = () => setIsTouchDragging(true);

  useEffect(() => {
    const handleTouchEnd = () => setIsTouchDragging(false);
    const handleTouchMove = (e) => {
      if (!isTouchDragging) return;
      if (e.touches && e.touches[0]) {
        setSliderVal(getPercentage(e.touches[0].clientX));
      }
    };

    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isTouchDragging]);

  const beforeSrc = src;
  const resolvedAfterSrc = afterSrc || src;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-ew-resize bg-stone-950 ${className}`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
    >
      {/* Before Layer — left half */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src={beforeSrc}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            unoptimized={typeof beforeSrc === "string"}
          />
        </div>
      </div>

      {/* After Layer — right half, revealed by clip-path */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{
          clipPath: `polygon(${sliderVal}% 0, 100% 0, 100% 100%, ${sliderVal}% 100%)`
        }}
      >
        <div className="absolute top-0 right-0 w-full h-full">
          <Image
            src={resolvedAfterSrc}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            unoptimized={typeof resolvedAfterSrc === "string"}
          />
        </div>
      </div>

      {/* Divider bar + handle */}
      <div
        className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] z-20 pointer-events-none transition-none"
        style={{ left: `${sliderVal}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] border-[3px] border-white pointer-events-none">
          <span className="text-[14px] font-extrabold">↔</span>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="block w-8 h-px bg-red-600" />
      <span className="text-red-600 text-[11px] font-bold tracking-[0.25em] uppercase">{label}</span>
    </div>
  );
}

function ImageCard({ src, alt, caption, onClick }) {
  const isUrl = typeof src === "string";
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-red-200 hover:border-[#D32F2F] hover:bg-[#D32F2F] transition-all duration-400 group cursor-pointer relative flex flex-col"
    >
      <div className="relative w-full h-52 sm:h-64 md:h-72 overflow-hidden bg-stone-900">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          unoptimized={isUrl}
        />
        <div className="absolute inset-0 bg-black/20 opacity-10 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/40 shadow-md text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Interactive Slider</span>
          </div>
        </div>
      </div>
      <div className="p-3.5 sm:p-5 border-t border-red-100 bg-white group-hover:bg-transparent transition-colors duration-400 flex-1">
        <p className="text-[11px] sm:text-xs text-gray-700 font-semibold leading-relaxed group-hover:text-white transition-colors duration-400">
          {caption}
        </p>
      </div>
    </div>
  );
}

export function LeadForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const trackCTA = useTrackCTA();

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneClean = (formData.phone || "").replace(/[\s-]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formtype: "Gallery Page", source: "Before & After Page Booking" }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        // Fire tracking BEFORE navigation — sendBeacon/fetch keepalive is queued instantly
        trackCTA({
          type: "form",
          ctaName: "Gallery Lead Form Submission",
          buttonLocation: "Gallery Page Lead Form",
        });
        // Redirect current tab to WhatsApp after a brief timeout to avoid popup blockers
        setTimeout(() => {
          window.location.href = "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20scalp%20analysis";
        }, 100);
      } else {
        alert("⚠️ " + (data.message || "Something went wrong. Please call us directly."));
      }
    } catch {
      alert("❌ Server error. Please call +91-9911111247.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <input
          name="name" value={formData.name} onChange={handleChange} required
          placeholder="Your Name *"
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-stone-50"
        />
        <input
          name="phone" value={formData.phone} onChange={handleChange} required type="tel"
          minLength={10} maxLength={15} pattern="[0-9+\s-]{10,15}"
          placeholder="Phone Number *"
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-stone-50"
        />
      </div>
      <input
        name="email" value={formData.email} onChange={handleChange} type="email"
        placeholder="Email Address"
        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-stone-50"
      />
      <button
        type="submit" disabled={loading}
        className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-60 bg-[#D32F2F] shadow-md cursor-pointer"
      >
        {loading ? "Submitting…" : "Book My Free Analysis"}
      </button>
      <p className="text-[10px] text-gray-400 text-center">No obligation. 18 months free follow-up included.</p>
    </form>
  );
}

export default function GalleryPageClient() {
  const trackCTA = useTrackCTA();
  const [selectedCity, setSelectedCity] = useState("All");
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery/get");
        const data = await response.json();
        if (response.ok && data.gallery) {
          setGallery(data.gallery);
        } else {
          setGalleryError(true);
        }
      } catch {
        setGalleryError(true);
      } finally {
        setGalleryLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Build flat case list and city list dynamically from MongoDB data
  const allDynamicCases = gallery?.gallerySection
    ? gallery.gallerySection.flatMap((section, sIdx) =>
      (section.cases || []).map((patient, pIdx) => ({
        id: `${sIdx}-${pIdx}`,
        src: patient.cardImage || patient.beforeImage,
        beforeImage: patient.beforeImage,
        afterImage: patient.afterImage,
        alt: patient.altImage || section.title,
        caption: [patient.techniqueUsed, patient.graftCount ? `${patient.graftCount} grafts` : null, patient.timeline].filter(Boolean).join(" · "),
        title: section.title,
        grafts: patient.graftCount ? `${patient.graftCount} Grafts` : "",
        technique: patient.techniqueUsed || "",
        timeline: patient.timeline || "",
        category: patient.clinicLocation || "",
      }))
    )
    : [];

  const dynamicCities = ["All", ...Array.from(new Set(allDynamicCases.map((c) => c.category).filter(Boolean)))];

  const filteredCityImages =
    selectedCity === "All"
      ? allDynamicCases
      : allDynamicCases.filter((img) => img.category === selectedCity);

  const handleOpenLightbox = (list, index) => {
    setLightboxImages(list);
    setLightboxIndex(index);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
  };

  const activeCase = lightboxIndex !== null ? lightboxImages[lightboxIndex] : null;

  const getWhatsAppLink = (c) => {
    if (!c) return "https://api.whatsapp.com/send?phone=+919217958539";
    const titleText = c.title || c.caption || "Case Detail";
    const text = `Hi, I am viewing Case #${c.id || "N/A"} (${titleText} - ${c.grafts || ""}, ${c.technique || ""}) in the Before & After gallery. I would like a free scalp analysis for similar results.`;
    return `https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(text)}`;
  };

  if (galleryLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen">
        <div className="h-64 bg-stone-200 animate-pulse" />
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-stone-200 animate-pulse rounded-2xl h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (galleryError || !gallery) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Gallery content is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#D32F2F]">

      <PageBanner
        title={gallery.banner?.title || "Our Gallery"}
        description={gallery.banner?.description || ""}
        bgImage={gallery.banner?.bannerImage || GalleryBanner}
        bgImageAlt={gallery.banner?.bannerAltImage || "Gallery banner"}
        hideBadge={true}
        breadcrumb="Gallery"
      />

      {/* Trust & Methodology Strip */}
      <section className="bg-white border-y border-stone-200/80 py-6 md:py-8 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-[10px] sm:text-sm uppercase tracking-widest text-[#D32F2F] font-bold">100% Authentic</p>
              <p className="text-[11px] md:text-[14px] text-gray-500 mt-1 leading-snug">Real patient transformations</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-[10px] sm:text-sm uppercase tracking-widest text-[#D32F2F] font-bold">No Retouching</p>
              <p className="text-[11px] md:text-[14px] text-gray-500 mt-1 leading-snug">Consistent lighting & background</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Layers className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-[10px] sm:text-sm uppercase tracking-widest text-[#D32F2F] font-bold">Turkey Sapphire</p>
              <p className="text-[11px] md:text-[14px] text-gray-500 mt-1 leading-snug">Maximum density techniques</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <p className="text-[10px] sm:text-sm uppercase tracking-widest text-[#D32F2F] font-bold">Dr. Pranendra led</p>
              <p className="text-[11px] md:text-[14px] text-gray-500 mt-1 leading-snug">Personalized hairline design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <SectionLabel label="Real Patient Results" />
              <h1 className="text-2xl  sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4 md:mb-6 break-words">
                {gallery.heroSection?.title || (
                  <>
                    Hair Transplant Before &amp; After —{" "}
                    <span className="text-[#D32F2F]">Real Patient Results Gallery</span>
                  </>
                )}
              </h1>
              <p className="text-gray-600  text-sm sm:text-base leading-relaxed mb-3 md:mb-4">
                {gallery.heroSection?.description || "Real, unedited hair transplant before and after results from patients at Ryan Clinic."}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 md:mb-6">
                These are doctor-led Sapphire FUE and FUE hair transplants, shown across a range of graft counts and hair-loss grades. Results develop gradually — most patients see early growth at 3–4 months and final density at 12–18 months.
              </p>

              {/* Badges list */}
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                {["Doctor-led", "90%+ Graft Survival", "Natural Hairlines", "Real Consented Results"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20scalp%20analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 bg-[#D32F2F] shadow-md"
                  onClick={() => trackCTA({ type: "whatsapp", ctaName: "Gallery Hero WA Free Analysis", buttonLocation: "Gallery Hero Section" })}
                >
                  Get Your Free Scalp Analysis
                </a>
                <a
                  href="tel:+919911111247"
                  className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl border border-red-600/30 hover:border-red-600 text-red-600 font-bold text-sm bg-white hover:bg-red-50/30 transition-colors"
                  onClick={() => trackCTA({ type: "call", ctaName: "Gallery Hero Call Now", buttonLocation: "Gallery Hero Section" })}
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Featured drag-to-reveal slider panel */}
            <div className="bg-white rounded-3xl p-4 md:p-5 border border-stone-200/60 shadow-sm">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded inline-block mb-3">Interactive Compare</span>
              <BeforeAfterSlider
                src={gallery.heroSection?.beforeImage || ImageOne}
                afterSrc={gallery.heroSection?.afterImage || null}
                alt={gallery.heroSection?.altImage || "Hair transplant before and after results gallery — Ryan Clinic"}
                className="w-full h-64 sm:h-80 md:h-96 rounded-2xl"
              />
              <p className="text-xs text-gray-500 mt-3 text-center">Case #1: Hover/drag to compare Before vs 12 Months post-op FUE results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Our Before & After Photos Are Real */}
      <section className="bg-stone-100/60 border-y border-stone-200/80 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <SectionLabel label="Authenticity Guarantee" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
              Why Our Before & After Photos Are Real — Not Edited
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3">
              When you research hair transplants, fake or heavily edited before/after photos are a genuine problem. We do the opposite. Every result on this page is:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Real, Consented Patients", desc: "No stock images, no AI, no purchased photos. Every case is a real patient treated at Ryan Clinic." },
              { title: "Photographed Honestly", desc: "Consistent lighting, angle, and styling in before and after shots, so density isn't exaggerated by light or wet/dry hair." },
              { title: "Documented with Details", desc: "Every image is clearly labelled with the transplant technique, graft count, and exact timeline post-surgery." },
              { title: "Showing Donor Area", desc: "Where relevant, we show the donor extraction zone too — proof extraction was done conservatively." },
              { title: "Natural Hairlines Focus", desc: "A natural, age-appropriate hairline matters more than an artificially low or over-dense one. What you see is realistic." }
            ].map((pt, i) => (
              <div key={i} className="group bg-white p-6 rounded-2xl border border-red-200 hover:border-[#D32F2F] hover:bg-[#D32F2F] transition-all duration-400 flex flex-col cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-red-50 text-[#D32F2F] group-hover:bg-white/15 group-hover:text-white flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300">
                  ✓
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-white text-[16px] mb-2 transition-colors duration-400">{pt.title}</h3>
                <p className="text-[14px] text-gray-500 group-hover:text-red-100 leading-relaxed transition-colors duration-400">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Hair Transplant Before & After — By Graft Count / Dynamic Gallery Sections */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel label="Case Portfolios" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              Hair Transplant Before & After — By Graft Count
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3">
              Browse our clinical portfolio categorized by graft size so you can look at cases representing your level of hair loss.
            </p>
          </div>

          {gallery.gallerySection && gallery.gallerySection.length > 0 ? (
            <div className="space-y-16">
              {gallery.gallerySection.map((section, sIdx) => {
                const sectionCases = (section.cases || []).map((patient, pIdx) => ({
                  id: `${sIdx}-${pIdx}`,
                  src: patient.cardImage || patient.beforeImage,
                  beforeImage: patient.beforeImage,
                  afterImage: patient.afterImage,
                  alt: patient.altImage || section.title,
                  caption: [
                    patient.techniqueUsed,
                    patient.graftCount ? `${patient.graftCount} grafts` : null,
                    patient.timeline,
                  ].filter(Boolean).join(" · "),
                  title: section.title,
                  grafts: patient.graftCount ? `${patient.graftCount} Grafts` : "",
                  technique: patient.techniqueUsed || "",
                  timeline: patient.timeline || "",
                  category: patient.clinicLocation || "",
                }));
                return (
                  <div key={sIdx} className="border-b border-stone-200/60 pb-12 last:border-0 last:pb-0">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                      {section.subTitle && (
                        <p className="text-xs text-red-600 font-semibold tracking-wider uppercase mt-1">({section.subTitle})</p>
                      )}
                    </div>
                    {sectionCases.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {sectionCases.map((img, index) => (
                          <ImageCard
                            key={img.id}
                            src={img.src}
                            alt={img.alt}
                            caption={img.caption}
                            onClick={() => handleOpenLightbox(sectionCases, index)}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">No cases in this section yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">No gallery sections have been added yet.</p>
          )}
        </div>
      </section>

      {/* Section: CTA Strip */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* CTA Strip */}
          <div className="bg-[#D32F2F] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 md:gap-6 mt-0 text-white">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold">See What's Possible for You — Free Analysis</h3>
              <p className="text-xs text-white/70 mt-1">Get an expert medical evaluation on your required graft count based on your photos.</p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20scalp%20analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3.5 bg-white text-[#8B1414] hover:bg-stone-100 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-colors"
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "Gallery Bottom WA Free Analysis", buttonLocation: "Gallery Bottom Section" })}
            >
              WhatsApp Us Now →
            </a>
          </div>
        </div>
      </section>

      {/* Section: Complete Gallery Grid by Cities */}
      <section className="py-12 md:py-20 bg-white border-y border-stone-200/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <SectionLabel label="City Wise Results" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
              Before &amp; After Results by City
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3">
              View hair transplant success stories across our prime clinic locations. Filter results by city to see local patient transformations.
            </p>

            {/* City Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {dynamicCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all duration-300 ${selectedCity === city
                      ? "bg-[#D32F2F] border-[#D32F2F] text-white shadow-md scale-105"
                      : "bg-stone-50 border-stone-200 text-gray-700 hover:bg-red-50 hover:text-[#D32F2F] hover:border-red-200"
                    }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {filteredCityImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredCityImages.map((img, index) => (
                <ImageCard
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                  onClick={() => handleOpenLightbox(filteredCityImages, index)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-12">No patient cases found for the selected city.</p>
          )}
        </div>
      </section>


      {/* Section: The Hair Transplant Growth Timeline — What to Expect */}
      <section className="bg-gradient-to-br from-[#2b0b0b] via-[#8B1414] to-[#D32F2F] py-12 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }} />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-white/80 text-xs font-bold uppercase tracking-[0.25em] bg-white/10 px-4 py-1.5 rounded-full border border-white/15">
              Recovery Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-4 px-2">
              The Hair Transplant Growth Timeline — What to Expect
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              Results don't appear overnight. Understanding the timeline prevents disappointment and explains what each stage of these before/after photos shows.
            </p>
            <p className="text-[11px] text-white/50 mt-2">
              Link: see our{" "}
              <Link href="/hair-transplant-growth-timeline" className="text-white underline font-semibold">
                full hair transplant recovery timeline
              </Link>{" "}
              when live.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { period: "Days 1–10", title: "Healing Grafts", desc: "Tiny grafts and mild redness; scabs form and fall away by around day 10. Avoid picking." },
              { period: "2–4 Weeks", title: "Shock Shedding", desc: "Transplanted hairs shed. This is normal and expected; the follicles stay healthy beneath the skin." },
              { period: "3–4 Months", title: "New growth begins", desc: "Early fine hairs emerge. Patience is key during this initial sprouting stage." },
              { period: "6–9 Months", title: "Noticeable density", desc: "Significant volume and structure begins showing, framing the face naturally." },
              { period: "12–18 Months", title: "Final mature results", desc: "Full thickness, texture maturation, and permanent natural growth results." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl md:rounded-3xl p-4 md:p-6 hover:bg-white/15 transition-all">
                <span className="text-[10px] font-bold text-red-300 uppercase tracking-widest">Stage 0{idx + 1}</span>
                <p className="text-base font-extrabold mt-1">{step.period}</p>
                <h4 className="text-xs font-semibold text-white/75 uppercase tracking-wider mt-1">{step.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed mt-3">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Want Results Like These? */}
      <section className="bg-stone-100/50 border-b border-stone-200/80 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="lg:col-span-7">
              <SectionLabel label="Start Your Recovery" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Want Results Like These?
              </h2>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                Every transformation here started with a free scalp analysis. Book yours to get your exact graft count, a natural hairline plan, and an honest hair transplant cost estimate — no obligation.
              </p>

              <div className="bg-white p-4 md:p-5 rounded-2xl border border-stone-200/60 shadow-sm mt-5 md:mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Dr. Pranendra Singh leading</h4>
                <p className="text-xs text-gray-500 mt-1">Istanbul-trained chief surgeon personally performs every critical surgical incision. Supported by 18 months of free postoperative checkups.</p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-stone-200/60">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Book My Free Analysis</h3>
              <p className="text-xs text-gray-400 mb-5 md:mb-6">Dr. Pranendra Singh personally reviews every case.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section: Frequently Asked Questions — Hair Transplant Results */}
      <section className="bg-white py-12 md:py-20 border-b border-stone-200/80">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 md:mb-16">
            <SectionLabel label="FAQ" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Frequently Asked Questions — Hair Transplant Results
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Answers to what you should realistically expect from our surgical results.
            </p>
          </div>

          <div className="space-y-4">
            {(gallery.faqSection || []).map((faq, i) => (
              <div key={i} className="border border-stone-200/80 rounded-2xl overflow-hidden bg-[#FAF9F6]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between px-4 py-4 md:px-6 md:py-5 bg-white hover:bg-stone-50 transition-colors font-bold text-gray-900 text-sm md:text-base cursor-pointer gap-3"
                >
                  <h3>{faq.question}</h3>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold transition-transform duration-300"
                    style={{ background: "#D32F2F", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 bg-white">
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20have%20a%20question%20about%20hair%20transplant%20results"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm bg-[#D32F2F] hover:bg-red-700 shadow-md transition-colors"
              onClick={() => trackCTA({ type: "whatsapp", ctaName: "Gallery FAQ WhatsApp", buttonLocation: "Gallery FAQ Section" })}
            >
              Have a question about results? Chat on WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* Styled Footer Disclaimer */}
      <div className="bg-stone-100/80 py-12">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
            <strong className="text-gray-700">Medical disclaimer:</strong> Results shown are real, consented patient cases. Individual results vary based on graft count, scalp condition, hair characteristics, and healing response. These photos do not guarantee a specific outcome. This page is for general information and does not replace a personal medical consultation.{" "}
            <Link href="/privacy-policy" className="underline hover:text-red-600 font-semibold">
              Link to full medical disclaimer + privacy policy.
            </Link>
          </p>
        </div>
      </div>

      {/* Elegant Immersive Lightbox Modal with Interactive Comparison Slider */}
      {lightboxIndex !== null && activeCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 transition-all duration-300">

          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/75 hover:text-white bg-white/15 hover:bg-white/25 p-2.5 rounded-full z-50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous image arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/15 hover:bg-white/25 p-3 rounded-full z-40 transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next image arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/15 hover:bg-white/25 p-3 rounded-full z-40 transition-all hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Inner Container */}
          <div className="max-w-5xl w-full bg-stone-900 border border-stone-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl z-40 grid grid-cols-1 md:grid-cols-12 max-h-[92vh] md:max-h-[85vh]">

            {/* Interactive Before/After slider inside Lightbox */}
            <div className="md:col-span-8 bg-stone-950 flex items-stretch justify-center relative min-h-[200px] md:min-h-0 h-[42vh] md:h-auto">

              <BeforeAfterSlider
                src={activeCase.beforeImage || activeCase.src}
                afterSrc={activeCase.afterImage || null}
                alt={activeCase.title || activeCase.alt}
                className="w-full h-full"
              />
            </div>

            {/* Case details panel */}
            <div className="md:col-span-4 bg-stone-900 p-3 sm:p-6 md:p-8 flex flex-col justify-between md:overflow-y-auto overflow-hidden text-white">
              <div>
                <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.25em] bg-red-950/60 border border-red-900/60 px-3 py-1 rounded-full inline-block mb-4">
                  Case Study Details
                </span>

                <h3 className="text-base sm:text-2xl font-extrabold text-white tracking-tight mb-2 md:mb-4">
                  {activeCase.title || "Patient Case"}
                </h3>

                {/* Stats Table */}
                <div className="space-y-2 md:space-y-3.5 border-y border-stone-800 py-3 md:py-6 mb-3 md:mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 font-medium">Clinic Location</span>
                    <span className="font-bold flex items-center gap-1.5 text-white">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {activeCase.category || "Delhi"} Clinic
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 font-medium">Graft Count</span>
                    <span className="font-bold text-white">{activeCase.grafts || "View details"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 font-medium">Technique Used</span>
                    <span className="font-bold text-red-400">{activeCase.technique || "Sapphire FUE / FUE"}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-stone-400 font-medium">Growth Timeline</span>
                    <span className="font-bold text-white">{activeCase.timeline || "Complete"}</span>
                  </div>
                </div>

                {/* Shield info — hidden on mobile to save space */}
                <div className="hidden md:flex items-center gap-3 bg-stone-950/40 border border-stone-800/80 p-4 rounded-2xl mb-6">
                  <ShieldCheck className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <p className="text-[11px] text-stone-400 leading-relaxed font-medium">
                    This slider compares the exact same coordinates. Move the white bar to reveal the hair restoration difference.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                <a
                  href={getWhatsAppLink(activeCase)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold py-3 md:py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all duration-300 shadow-md active:scale-98"
                  onClick={() => trackCTA({ type: "whatsapp", ctaName: `Gallery Inquire Case Result #${activeCase?.id}`, buttonLocation: "Gallery Lightbox Modal" })}
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire About This Result
                </a>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-full border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 font-semibold py-2.5 sm:py-3 px-6 rounded-2xl text-xs transition-colors"
                >
                  Return to Gallery
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
