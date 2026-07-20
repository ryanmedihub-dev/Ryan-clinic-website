"use client";

import { useState } from "react";
import useTrackCTA from "@/lib/useTrackCTA";

const emptyForm = { name: "", phone: "", city: "", concern: "" };

export default function DoctorsCTA() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const trackCTA = useTrackCTA();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "doctors-page" }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        trackCTA({
          type: "form",
          ctaName: "Doctors Consult Form Submission",
          buttonLocation: "Doctors Page CTA Form",
        });
        setFormData(emptyForm);
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2b0b0b 0%, #8B1414 40%, #D32F2F 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red accent left bar */}
      <div className="absolute left-0 top-0 w-1 h-full" style={{ background: "rgba(255,255,255,0.15)" }} />

      <div className="containerFull relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-white/40" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60">
                Free Consultation
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Book a Free
              <br />
              <span style={{ color: "rgba(212,169,55,0.95)" }}>Doctor Consultation</span>
              <br />
              Today
            </h2>

            <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-8 max-w-md">
              Get a free scalp analysis, exact graft count, and a complete cost breakdown with zero
              obligation — all from one of our certified hair restoration doctors.
            </p>

            {/* Trust points */}
            <ul className="space-y-3 mb-8">
              {[
                "Free scalp analysis — no charges",
                "Exact graft count & full cost breakdown",
                "Speak directly with a certified doctor",
                "Available across Delhi, Mumbai & Hyderabad",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-white/80">{point}</span>
                </li>
              ))}
            </ul>

            {/* Direct call */}
            <a
              href="tel:+919911111247"
              className="inline-flex items-center gap-3 font-semibold text-sm py-3.5 px-6 rounded-xl border border-white/25 text-white hover:bg-white/10 transition-all"
              onClick={() => trackCTA({ type: "call", ctaName: "Doctors Call CTA", buttonLocation: "Doctors Page CTA Box" })}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Call +91-9911111247
            </a>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.14)" }}
          >
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-white/70 text-sm">
                  Our team will call you within 24 hours to schedule your free doctor consultation.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                >
                  Submit another →
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="block w-1 h-5 rounded-full" style={{ background: "rgba(212,169,55,0.9)" }} />
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">
                    Book Your Free Slot
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Get a Free Doctor Consult</h3>
                <p className="text-xs text-white/50 mb-6">
                  Our hair restoration doctor will respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name*"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full text-sm px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full text-sm px-4 py-3 rounded-xl outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          border: "1px solid rgba(255,255,255,0.18)",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full text-sm px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: formData.city ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <option value="" style={{ color: "#333" }}>
                      Preferred City*
                    </option>
                    <option value="Delhi" style={{ color: "#333" }}>Delhi</option>
                    <option value="Mumbai" style={{ color: "#333" }}>Mumbai</option>
                    <option value="Hyderabad" style={{ color: "#333" }}>Hyderabad</option>
                    <option value="Online" style={{ color: "#333" }}>Online Consultation</option>
                  </select>

                  <select
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    className="w-full text-sm px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: formData.concern ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <option value="" style={{ color: "#333" }}>
                      Your Concern (Optional)
                    </option>
                    <option value="Hair Transplant" style={{ color: "#333" }}>Hair Transplant</option>
                    <option value="Beard Transplant" style={{ color: "#333" }}>Beard Transplant</option>
                    <option value="Eyebrow Transplant" style={{ color: "#333" }}>Eyebrow Transplant</option>
                    <option value="PRP Therapy" style={{ color: "#333" }}>PRP Therapy</option>
                    <option value="Female Hair Loss" style={{ color: "#333" }}>Female Hair Loss</option>
                    <option value="Scalp Analysis" style={{ color: "#333" }}>Scalp Analysis</option>
                  </select>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl transition-opacity disabled:opacity-60"
                    style={{
                      background: "var(--accent-gold)",
                      color: "#1a0a0a",
                      boxShadow: "0 4px 14px rgba(212,169,55,0.4)",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? (
                      "Submitting…"
                    ) : (
                      <>
                        Book Free Doctor Consultation
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-white/40">
                    Free scalp analysis · Graft count · Full cost breakdown — zero obligation.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
