"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { X, Check, User, Mail, Phone, HelpCircle, MessageSquare, Loader2 } from "lucide-react";
import { WHATSAPP_SUBMIT_URL } from "@/lib/constants";

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error" | null

  // Trigger popup 5 seconds (or configured delay) after landing or reloading any page
  useEffect(() => {
    // Do not show popup on admin pages
    if (pathname?.startsWith("/admin")) return;

    // Reset open state on page change
    setIsOpen(false);

    // Start timer for every page load, reload, and navigation
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Keyboard shortcut ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: `Website Popup (${pathname || "Page"})`,
          service: formData.service || "General Consultation",
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");

        // Exact WhatsApp URL matching home page form submission
        const whatsappUrl = WHATSAPP_SUBMIT_URL || "https://api.whatsapp.com/send/?phone=919911111247&text=Hi%2C+I+have+submitted+the+Google+form.&type=phone_number&app_absent=0";

        // Route user to WhatsApp
        setTimeout(() => {
          setIsOpen(false);
          window.location.href = whatsappUrl;
        }, 800);
      } else {
        throw new Error(data.error || "Failed to submit lead");
      }
    } catch (err) {
      console.error("Popup form submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
      onClick={handleClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-[860px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-transform duration-300 scale-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-30 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-9 h-9 flex items-center justify-center transition-all shadow-sm focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Visual Banner (First Image Design & Pattern) */}
        <div className="relative md:col-span-5 min-h-[220px] md:min-h-[520px] flex flex-col justify-between p-6 text-white overflow-hidden bg-gradient-to-br from-[#8B0000] to-[#e30a17]">
          {/* Background Surgeon Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/uploads/turkey-doctor.jpg"
              alt="Ryan Clinic Turkey Hair Specialists"
              fill
              className="object-cover object-center"
              priority
              onError={(e) => {
                e.currentTarget.srcset = "/uploads/turkey-1.jpeg";
              }}
            />
            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#70050c] via-[#70050c]/75 via-50% to-black/30" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFD700] text-black font-extrabold text-[11px] tracking-wider uppercase shadow-lg">
              ⚡ SPECIAL OFFER
            </span>
          </div>

          {/* Bottom Content Overlay */}
          <div className="relative z-10 mt-auto pt-8">
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-outfit drop-shadow-md">
              Welcome Gift!
            </h4>
            <p className="text-xs sm:text-sm text-white/95 mt-1.5 font-medium leading-relaxed drop-shadow">
              FREE Hair Analysis Worth ₹5,000 for First-Time Visitors
            </p>

            <hr className="border-t border-dashed border-white/40 my-3.5" />

            {/* Checkmark Bullets */}
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>100% Free Consultation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Expert Turkish Specialists</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white text-[#e30a17] flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>No Obligation Required</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Features (Second Image Fields) */}
        <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-center bg-white">
          {/* Tick Icon Header */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-rose-50 border border-rose-100 text-[#e30a17] flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-center text-[#302658] font-outfit">
            Book Your Free Consult Now!
          </h3>
          <p className="text-center text-xs text-gray-500 mt-0.5 mb-4">
            Limited time offer - Don't miss out
          </p>

          {submitStatus === "success" ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center my-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-lg font-bold font-outfit text-emerald-900">
                Consultation Request Received!
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                Connecting you to our WhatsApp consultation team...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {submitStatus === "error" && (
                <div className="p-2.5 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200 text-center font-medium">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              {/* Grid for Name & Email on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Your Name* */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#e30a17]" />
                    Your Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mr. Shivam"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#e30a17] focus:bg-white transition-all text-gray-800"
                  />
                </div>

                {/* 2. Your Email */}
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#e30a17]" />
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourmail@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#e30a17] focus:bg-white transition-all text-gray-800"
                  />
                </div>
              </div>

              {/* 3. Contact Number* */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#e30a17]" />
                  Contact Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9865838902"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#e30a17] focus:bg-white transition-all text-gray-800"
                />
              </div>

              {/* 4. What do you want? (Select dropdown) */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-[#e30a17]" />
                  What do you want?
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#e30a17] focus:bg-white transition-all text-gray-800"
                >
                  <option value="">What do you want?</option>
                  <option value="Hair Transplant (Sapphire FUE)">Hair Transplant (Sapphire FUE)</option>
                  <option value="Beard / Eyebrow Transplant">Beard & Eyebrow Transplant</option>
                  <option value="PRP / GFC Hair Loss Treatment">PRP / GFC Hair Loss Treatment</option>
                  <option value="Scalp Micropigmentation (SMP)">Scalp Micropigmentation (SMP)</option>
                  <option value="Female Hair Transplant">Female Hair Transplant</option>
                  <option value="General Consultation">Free Doctor Consultation</option>
                </select>
              </div>

              {/* 5. Your Message */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-[#e30a17]" />
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type Here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-xs sm:text-sm focus:outline-none focus:border-[#e30a17] focus:bg-white transition-all text-gray-800 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-5 bg-gradient-to-r from-[#e30a17] to-[#b80712] hover:from-[#c20814] hover:to-[#96040d] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    Get a Free Consult
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
