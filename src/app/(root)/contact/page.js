"use client";

import { MapPin, PhoneCall, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AboutBanner from "../../../../public/uploads/about-banner.webp";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PageBanner from "@/components/layouts/pageBanner";

const emptyForm = { name: "", email: "", phone: "", serviceType: "", message: "" };

export default function ContactUs() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Form submitted successfully!");
        setFormData(emptyForm);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
        {/* ✅ Banner */}
        <PageBanner
          title="Contact Us"
          description="Regain your confidence with world-class Turkey's Technique hair restoration at Turkey's top-rated Ryan Clinic!"
          bgImage={AboutBanner}
        />

        {/* ✅ Contact Section */}
        <section className="py-16 md:py-24" style={{ background: "var(--bg-soft)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px" style={{ background: "var(--primary-red)" }} />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--primary-red)" }}>
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10" style={{ color: "var(--text-primary)" }}>
              Contact <span style={{ color: "var(--primary-red)" }}>Ryan Clinic</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Side - Contact Info */}
              <div
                className="rounded-2xl p-8"
                style={{ background: "var(--bg-main)", border: "1px solid var(--border-light)" }}
              >
                <h3 className="text-xl font-bold mb-6 pb-3" style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)" }}>
                  Our Branches
                </h3>

                {/* Address 1 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(227,10,23,0.08)" }}>
                    <MapPin className="w-4 h-4" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Delhi Clinic</h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      CD 163, Block CD, Dakshini Pitampura, New Delhi – 110034
                    </p>
                  </div>
                </div>

                {/* Address 2 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(227,10,23,0.08)" }}>
                    <MapPin className="w-4 h-4" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Mumbai Clinic</h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      MHADA 4 Bungalow, 168, Phase D, SV Patel Nagar, Andheri West, Mumbai – 400053
                    </p>
                  </div>
                </div>

                {/* Address 3 */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(227,10,23,0.08)" }}>
                    <MapPin className="w-4 h-4" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Hyderabad Clinic</h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      2nd Floor, 8-2, 316/A/6/A, Road No. 14, Banjara Hills, Hyderabad – 500034
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(227,10,23,0.08)" }}>
                    <PhoneCall className="w-4 h-4" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Phone</h4>
                    <a href="tel:+919217958539" className="text-sm font-semibold" style={{ color: "var(--accent-gold)" }}>+91-9217958539</a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(227,10,23,0.08)" }}>
                    <Mail className="w-4 h-4" style={{ color: "var(--primary-red)" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>Email</h4>
                    <a href="mailto:clinicryanofficial@gmail.com" className="text-sm break-all" style={{ color: "var(--text-muted)" }}>
                      clinicryanofficial@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div
                className="rounded-2xl p-8"
                style={{ background: "var(--bg-main)", border: "1px solid var(--border-light)" }}
              >
                {/* Form header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="block w-1 h-5 rounded-full" style={{ background: "var(--primary-red)" }} />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: "var(--primary-red)" }}>
                    Free Consultation
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Book Your Free Consult</h3>
                <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Our hair restoration expert will respond within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name*"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      placeholder="Your Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    placeholder="Contact Number*"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    value={formData.serviceType}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="What do you want?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                      <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
                      <SelectItem value="beard-transplant">Beard Transplant</SelectItem>
                      <SelectItem value="pricing">Pricing Information</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="h-24"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl text-white transition-opacity disabled:opacity-60"
                    style={{ background: "var(--primary-red)", cursor: "pointer" }}
                  >
                    {loading ? "Submitting…" : "Get a Free Consult"}
                    {!loading && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    )}
                  </button>
                  <p className="text-[11px] text-center" style={{ color: "var(--text-muted)" }}>
                    Free scalp analysis · Graft count · Full cost breakdown — zero obligation.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
