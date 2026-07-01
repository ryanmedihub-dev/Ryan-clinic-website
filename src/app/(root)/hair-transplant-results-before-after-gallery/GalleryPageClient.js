"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/layouts/pageBanner";
import {
  Sparkles,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Layers,
  Maximize2,
  MessageSquare,
  Users,
  Camera,
  Layers3,
  Flame,
  Info
} from "lucide-react";

// Import all images
import ImageOne from '../../../../public/uploads/images/image1.jpg';
import ImageTwo from '../../../../public/uploads/images/image2.jpg';
import ImageThree from '../../../../public/uploads/images/image3.jpg';
import ImageFour from '../../../../public/uploads/images/image4.jpg';
import ImageFive from '../../../../public/uploads/images/image5.jpg';
import ImageSix from '../../../../public/uploads/images/image6.jpg';
import ImageSeven from '../../../../public/uploads/images/image7.jpg';
import ImageEight from '../../../../public/uploads/images/image8.jpg';
import ImageNine from '../../../../public/uploads/images/image9.jpg';
import ImageTen from '../../../../public/uploads/images/image10.jpg';
import ImageEleven from '../../../../public/uploads/images/image11.jpg';
import ImageTwelve from '../../../../public/uploads/images/image12.jpg';
import ImageThirteen from '../../../../public/uploads/images/image13.jpg';
import ImageFourteen from '../../../../public/uploads/images/image14.jpg';
import ImageFifteen from '../../../../public/uploads/images/image15.jpg';
import ImageSixteen from '../../../../public/uploads/images/image16.jpg';
import ImageSeventeen from '../../../../public/uploads/images/image17.jpg';
import ImageEighteen from '../../../../public/uploads/images/image18.jpg';
import ImageNineteen from '../../../../public/uploads/images/image19.jpg';
import ImageTwenty from '../../../../public/uploads/images/image20.jpg';
import ImageTwentyOne from '../../../../public/uploads/images/image21.jpg';
import ImageTwentyTwo from '../../../../public/uploads/images/image22.jpg';
import ImageTwentyThree from '../../../../public/uploads/images/image23.jpg';
import ImageTwentyFour from '../../../../public/uploads/images/image24.jpg';
import ImageTwentyFive from '../../../../public/uploads/images/image25.jpg';
import ImageTwentySix from '../../../../public/uploads/images/image26.jpg';
import ImageTwentySeven from '../../../../public/uploads/images/image27.jpg';
import ImageTwentyEight from '../../../../public/uploads/images/image28.jpg';
import ImageTwentyNine from '../../../../public/uploads/images/image29.jpg';
import ImageThirty from '../../../../public/uploads/images/image30.jpg';
import GalleryBanner from "../../../../public/uploads/gallery.jpg";

// Detail mappings for 30 patient cases grouped exactly according to categories and requirements
const byGraftCount = [
  {
    group: "2000–2500 Grafts",
    subtitle: "Norwood 2–3 — hairline & temples",
    images: [
      { id: 1, src: ImageOne, caption: "Sapphire FUE · 2,200 grafts · Norwood 3 · 12 months post-procedure", alt: "2200 grafts Sapphire FUE hair transplant before and after, 12 months", category: "Delhi" },
      { id: 2, src: ImageTwo, caption: "FUE · 2,000 grafts · Norwood 2 · 10 months post-procedure", alt: "2000 grafts FUE hair transplant before and after, 10 months", category: "Delhi" },
      { id: 3, src: ImageThree, caption: "Sapphire FUE · 2,400 grafts · Norwood 3 · 14 months post-procedure", alt: "2400 grafts Sapphire FUE hair transplant before and after, 14 months", category: "Delhi" }
    ]
  },
  {
    group: "3000–3500 Grafts",
    subtitle: "Norwood 3–4 — frontal & mid-scalp",
    images: [
      { id: 4, src: ImageFour, caption: "Sapphire FUE · 3,200 grafts · Norwood 4 · 12 months post-procedure", alt: "3200 grafts Sapphire FUE hair transplant before and after, 12 months", category: "Delhi" },
      { id: 5, src: ImageFive, caption: "FUE · 3,000 grafts · Norwood 3 · 15 months post-procedure", alt: "3000 grafts FUE hair transplant before and after, 15 months", category: "Delhi" },
      { id: 6, src: ImageSix, caption: "Sapphire FUE · 3,500 grafts · Norwood 4 · 18 months post-procedure", alt: "3500 grafts Sapphire FUE hair transplant before and after, 18 months", category: "Delhi" }
    ]
  },
  {
    group: "4000+ Grafts",
    subtitle: "Norwood 4–6 — advanced / crown coverage",
    images: [
      { id: 7, src: ImageSeven, caption: "Sapphire FUE · 4,200 grafts · Norwood 5 · 18 months post-procedure", alt: "4200 grafts Sapphire FUE hair transplant before and after, 18 months", category: "Delhi" },
      { id: 8, src: ImageEight, caption: "FUE · 4,500 grafts · Norwood 6 · 2-Session · 18 months post-procedure", alt: "4500 grafts FUE hair transplant before and after advanced, 18 months", category: "Delhi" },
      { id: 9, src: ImageNine, caption: "Sapphire FUE · 4,000 grafts · Norwood 4 (Crown) · 14 months post-procedure", alt: "4000 grafts Sapphire FUE crown hair transplant before and after, 14 months", category: "Delhi" }
    ]
  }
];

const byTechnique = [
  {
    technique: "Sapphire FUE Before & After",
    images: [
      { id: 10, src: ImageTen, caption: "Sapphire FUE · 2,600 grafts · Norwood 3 · 11 months post-procedure", alt: "Sapphire FUE hair transplant before and after results", category: "Delhi" },
      { id: 11, src: ImageEleven, caption: "Sapphire FUE · 2,300 grafts · Norwood 2 · 12 months post-procedure", alt: "Sapphire FUE hair transplant before and after results", category: "Mumbai" }
    ]
  },
  {
    technique: "FUE Before & After",
    images: [
      { id: 12, src: ImageTwelve, caption: "FUE · 2,100 grafts · Norwood 2 · 12 months post-procedure", alt: "FUE hair transplant before and after results", category: "Mumbai" },
      { id: 13, src: ImageThirteen, caption: "FUE · 3,100 grafts · Norwood 3 · 15 months post-procedure", alt: "FUE hair transplant before and after results", category: "Mumbai" }
    ]
  },
  {
    technique: "Beard Transplant Before & After",
    images: [
      { id: 14, src: ImageFourteen, caption: "FUE Beard · 2,500 grafts · Beard Fill · 10 months post-procedure", alt: "beard transplant before and after results", category: "Mumbai" }
    ]
  },
  {
    technique: "Female Hair Transplant Before & After",
    images: [
      { id: 15, src: ImageFifteen, caption: "Female FUE · 2,200 grafts · Hairline Fill · 14 months post-procedure", alt: "female hair transplant before and after, hairline", category: "Mumbai" }
    ]
  }
];

// Flat array of all images (Delhi, Mumbai, Hyderabad cities) for the full search/filter gallery
const allCases = [
  { id: 1, src: ImageOne, category: "Delhi", grafts: "2,200 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "Frontal Hairline & Temples Restoration" },
  { id: 2, src: ImageTwo, category: "Delhi", grafts: "2,000 Grafts", technique: "FUE", timeline: "10 Months", title: "Symmetric Temple Reconstruction" },
  { id: 3, src: ImageThree, category: "Delhi", grafts: "2,400 Grafts", technique: "Sapphire FUE", timeline: "14 Months", title: "Norwood Grade 3 Recession Repair" },
  { id: 4, src: ImageFour, category: "Delhi", grafts: "3,200 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "Frontal Third Density Enhancement" },
  { id: 5, src: ImageFive, category: "Delhi", grafts: "3,000 Grafts", technique: "FUE", timeline: "15 Months", title: "Mid-Scalp & Crown Density Boost" },
  { id: 6, src: ImageSix, category: "Delhi", grafts: "3,500 Grafts", technique: "Sapphire FUE", timeline: "18 Months", title: "Advanced Frontal Recessional Fill" },
  { id: 7, src: ImageSeven, category: "Delhi", grafts: "4,200 Grafts", technique: "Sapphire FUE", timeline: "18 Months", title: "Norwood Grade 5 Mega-Graft Restoration" },
  { id: 8, src: ImageEight, category: "Delhi", grafts: "4,500 Grafts", technique: "FUE (2-Sessions)", timeline: "18 Months", title: "Extensive Crown & Hairline Coverage" },
  { id: 9, src: ImageNine, category: "Delhi", grafts: "4,000 Grafts", technique: "Sapphire FUE", timeline: "14 Months", title: "Complete Vertex & Crown Coverage" },
  { id: 10, src: ImageTen, category: "Delhi", grafts: "2,600 Grafts", technique: "Sapphire FUE", timeline: "11 Months", title: "Natural Hairline Lowering & Balancing" },
  { id: 11, src: ImageEleven, category: "Mumbai", grafts: "2,300 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "High Density Frontal Hairline Creation" },
  { id: 12, src: ImageTwelve, category: "Mumbai", grafts: "2,100 Grafts", technique: "FUE", timeline: "12 Months", title: "Symmetrical Receding Temples Fill" },
  { id: 13, src: ImageThirteen, category: "Mumbai", grafts: "3,100 Grafts", technique: "Sapphire FUE", timeline: "15 Months", title: "Norwood Grade 3a Frontal Reconstruction" },
  { id: 14, src: ImageFourteen, category: "Mumbai", grafts: "2,500 Grafts", technique: "FUE Beard", timeline: "10 Months", title: "Patchy Beard Reconstruction & Fill" },
  { id: 15, src: ImageFifteen, category: "Mumbai", grafts: "2,200 Grafts", technique: "Female FUE", timeline: "14 Months", title: "Female Pattern Hairline Correction" },
  { id: 16, src: ImageSixteen, category: "Mumbai", grafts: "3,300 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "Extended Frontal Zone Density Boost" },
  { id: 17, src: ImageSeventeen, category: "Mumbai", grafts: "2,800 Grafts", technique: "Sapphire FUE", timeline: "16 Months", title: "Asymmetrical Hairline Alignment" },
  { id: 18, src: ImageEighteen, category: "Mumbai", grafts: "3,400 Grafts", technique: "FUE", timeline: "18 Months", title: "Diffuse Mid-Scalp Thinning Density" },
  { id: 19, src: ImageNineteen, category: "Mumbai", grafts: "4,100 Grafts", technique: "Sapphire FUE", timeline: "14 Months", title: "Vertex & Crown Norwood Grade 4 Repair" },
  { id: 20, src: ImageTwenty, category: "Mumbai", grafts: "2,700 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "Dense Pack Hairline Reconstruction" },
  { id: 21, src: ImageTwentyOne, category: "Hyderabad", grafts: "2,200 Grafts", technique: "Sapphire FUE", timeline: "12 Months", title: "Slight Norwood Grade 2 Hairline Fix" },
  { id: 22, src: ImageTwentyTwo, category: "Hyderabad", grafts: "3,000 Grafts", technique: "FUE", timeline: "12 Months", title: "Frontal Recess Reconstruction & Fill" },
  { id: 23, src: ImageTwentyThree, category: "Hyderabad", grafts: "3,200 Grafts", technique: "Sapphire FUE", timeline: "14 Months", title: "Norwood 3 Frontal & Vertex Fill" },
  { id: 24, src: ImageTwentyFour, category: "Hyderabad", grafts: "2,400 Grafts", technique: "FUE", timeline: "10 Months", title: "Temples & Mid-Scalp Density Boost" },
  { id: 25, src: ImageTwentyFive, category: "Hyderabad", grafts: "4,300 Grafts", technique: "Sapphire FUE", timeline: "18 Months", title: "Severe Norwood 5 Mega-Graft Fill" },
  { id: 26, src: ImageTwentySix, category: "Hyderabad", grafts: "3,500 Grafts", technique: "Sapphire FUE", timeline: "15 Months", title: "Frontal Third Density Reconstruction" },
  { id: 27, src: ImageTwentySeven, category: "Hyderabad", grafts: "2,900 Grafts", technique: "FUE", timeline: "12 Months", title: "Natural Frontal Hairline Recess Fill" },
  { id: 28, src: ImageTwentyEight, category: "Hyderabad", grafts: "3,800 Grafts", technique: "Sapphire FUE", timeline: "16 Months", title: "Full Top & Crown Coverage Restoration" },
  { id: 29, src: ImageTwentyNine, category: "Hyderabad", grafts: "2,500 Grafts", technique: "Sapphire FUE", timeline: "13 Months", title: "Dense Pack Hairline Lowering Case" },
  { id: 30, src: ImageThirty, category: "Hyderabad", grafts: "4,500 Grafts", technique: "FUE", timeline: "18 Months", title: "Advanced Norwood 6 Crown & Hairline" }
];

const cities = ["All", "Delhi", "Mumbai", "Hyderabad"];

// Interactive Hover-to-Reveal Before/After Image Slider
function BeforeAfterSlider({ src, alt, className = "" }) {
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
        <div className="absolute top-0 left-0 w-[200%] h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-left"
            sizes="(max-width: 1024px) 100vw, 800px"
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
        <div className="absolute top-0 right-0 w-[200%] h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-right"
            sizes="(max-width: 1024px) 100vw, 800px"
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

  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        window.location.href = "https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20scalp%20analysis";
      } else {
        alert("⚠️ " + (data.message || "Something went wrong. Please call us directly."));
      }
    } catch {
      alert("❌ Server error. Please call +91-9217958539.");
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
  const [selectedCity, setSelectedCity] = useState("All");
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const filteredCityImages =
    selectedCity === "All"
      ? allCases
      : allCases.filter((img) => img.category === selectedCity);

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

  // Pre-filled WhatsApp link based on the selected case
  const getWhatsAppLink = (c) => {
    if (!c) return "https://api.whatsapp.com/send?phone=+919217958539";
    const titleText = c.title || c.caption || "Case Detail";
    const text = `Hi, I am viewing Case #${c.id || "N/A"} (${titleText} - ${c.grafts || ""}, ${c.technique || ""}) in the Before & After gallery. I would like a free scalp analysis for similar results.`;
    return `https://api.whatsapp.com/send?phone=+919217958539&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#D32F2F]">

      <PageBanner
        title="Our Gallery"
        description="Explore real hair transplant before and after results from Ryan Clinic and see how our doctor-led FUE and Sapphire FUE procedures have helped patients achieve natural-looking hairlines, improved density, and renewed confidence."
        bgImage={GalleryBanner}
        hideBadge={true}
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
                Hair Transplant Before & After —{" "}
                <span className="text-[#D32F2F]">Real Patient Results Gallery</span>
              </h1>
              <p className="text-gray-600  text-sm sm:text-base leading-relaxed mb-3 md:mb-4">
                Real, unedited hair transplant before and after results from patients at Ryan Clinic. Every transformation below is a genuine, consented case — photographed in consistent lighting, labelled with the technique, graft count, and timeline, so you can judge the results honestly.
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
                >
                  Get Your Free Scalp Analysis
                </a>
                <a
                  href="tel:+919217958539"
                  className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 rounded-xl border border-red-600/30 hover:border-red-600 text-red-600 font-bold text-sm bg-white hover:bg-red-50/30 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Featured drag-to-reveal slider panel */}
            <div className="bg-white rounded-3xl p-4 md:p-5 border border-stone-200/60 shadow-sm">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded inline-block mb-3">Interactive Compare</span>
              <BeforeAfterSlider
                src={ImageOne}
                alt="Hair transplant before and after results gallery — Ryan Clinic"
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

      {/* Section: Hair Transplant Before & After — By Graft Count */}
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

          <div className="space-y-16">
            {byGraftCount.map((graftSec) => (
              <div key={graftSec.group} className="border-b border-stone-200/60 pb-12 last:border-0 last:pb-0">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{graftSec.group}</h3>
                  <p className="text-xs text-red-600 font-semibold tracking-wider uppercase mt-1">({graftSec.subtitle})</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {graftSec.images.map((img, index) => (
                    <ImageCard
                      key={img.id}
                      src={img.src}
                      alt={img.alt}
                      caption={img.caption}
                      onClick={() => handleOpenLightbox(graftSec.images, index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="bg-[#D32F2F] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-5 md:gap-6 mt-10 md:mt-16 text-white">
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg md:text-xl font-extrabold">See What's Possible for You — Free Analysis</h3>
              <p className="text-xs text-white/70 mt-1">Get an expert medical evaluation on your required graft count based on your photos.</p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=+919217958539&text=Hi,%20I%20want%20a%20free%20hair%20transplant%20scalp%20analysis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3.5 bg-white text-[#8B1414] hover:bg-stone-100 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-colors"
            >
              WhatsApp Us Now →
            </a>
          </div>
        </div>
      </section>

      {/* Section: Before & After by Technique */}
      <section className="bg-stone-100/60 border-y border-stone-200/80 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <SectionLabel label="Surgery Methods" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
              Before & After by Technique
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-3">
              Explore how clinical results vary across Sapphire FUE, FUE, beard grafts, and female hairline restorations.
            </p>
          </div>

          <div className="space-y-16">
            {byTechnique.map((techSec) => (
              <div key={techSec.technique}>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{techSec.technique}</h3>
                  {techSec.technique.includes("FUE Before") && !techSec.technique.includes("Sapphire") && (
                    <p className="text-[11px] text-gray-500 mt-1">
                      Link: see our{" "}
                      <Link href="/fue-hair-transplant" className="text-red-600 underline font-semibold">
                        full FUE hair transplant page
                      </Link>{" "}
                      when live.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {techSec.images.map((img, index) => (
                    <ImageCard
                      key={img.id}
                      src={img.src}
                      alt={img.alt}
                      caption={img.caption}
                      onClick={() => handleOpenLightbox(techSec.images, index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Complete Gallery Grid by Cities */}


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
            {[
              {
                q: "Are these hair transplant before and after photos real?",
                a: "Yes. Every before and after photo in this gallery is a real, consented patient treated at Ryan Clinic — no stock images, AI, or edited photos. Each is shown in consistent lighting and labelled with the technique, graft count, and timeline."
              },
              {
                q: "When will I see my hair transplant results?",
                a: "New growth usually begins at 3–4 months, noticeable density develops by 6–9 months, and final mature results appear at 12–18 months. The \"after\" photos in this gallery mostly show results at 12 months or later."
              },
              {
                q: "Are hair transplant results permanent?",
                a: "Yes. Transplanted follicles are taken from the DHT-resistant donor area, so they resist pattern baldness and grow permanently. Existing native hair can still thin over time, so ongoing maintenance may be advised."
              },
              {
                q: "Do hair transplant results look natural?",
                a: "Yes, when the surgeon controls the angle, depth, direction, and density to match your natural growth pattern. A natural, age-appropriate hairline — rather than an artificially low one — is the goal, and is what these results demonstrate."
              },
              {
                q: "How many grafts will I need for results like these?",
                a: "Graft count depends on your degree of hair loss (Norwood grade): roughly 2,000–2,500 for hairline and temples, 3,000–3,500 for frontal and mid-scalp, and 4,000+ for advanced or crown coverage. A free scalp analysis confirms your exact number."
              },
              {
                q: "Can women achieve these hair transplant results?",
                a: "Yes. Women with female-pattern thinning, traction alopecia, or a high hairline can achieve natural results, with discreet no-shave options available. A scalp assessment confirms suitability and graft requirements."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-stone-200/80 rounded-2xl overflow-hidden bg-[#FAF9F6]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between px-4 py-4 md:px-6 md:py-5 bg-white hover:bg-stone-50 transition-colors font-bold text-gray-900 text-sm md:text-base cursor-pointer gap-3"
                >
                  <h3>{faq.q}</h3>
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-lg font-bold transition-transform duration-300"
                    style={{ background: "#D32F2F", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 bg-white">
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">{faq.a}</p>
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
                src={activeCase.src}
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
