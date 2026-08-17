"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  ArrowRight,
  Shield,
  CheckCircle2,
  Star,
  Loader2,
  ChevronDown,
  Sparkles,
  Lock,
  Award,
} from "lucide-react";
import AppointmentFormField from "@/components/pages/AppointmentFormField";

const indianCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal",
  "Indore", "Nagpur", "Surat", "Patna", "Ranchi", "Guwahati",
  "Bhubaneswar", "Kochi", "Thiruvananthapuram", "Coimbatore", "Mysuru",
  "Mangalore", "Visakhapatnam", "Vijayawada", "Raipur", "Dehradun",
  "Shimla", "Jammu", "Srinagar", "Amritsar", "Ludhiana", "Agra",
  "Varanasi", "Kanpur", "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
  "Udaipur", "Jodhpur", "Kota", "Gwalior", "Jabalpur", "Nashik",
  "Aurangabad", "Kolhapur", "Solapur", "Vadodara", "Rajkot",
];

const inputCls =
  "w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-gray-900 text-[13px] sm:text-sm placeholder-slate-400 " +
  "focus:outline-none focus:border-[#c0020e] focus:bg-white focus:ring-4 focus:ring-[#c0020e]/10 " +
  "hover:bg-slate-50 transition-all duration-200 shadow-xs";

const selectCls =
  "w-full pl-10 pr-9 py-3 rounded-xl border border-slate-200/90 bg-slate-50/70 text-gray-900 text-[13px] sm:text-sm " +
  "focus:outline-none focus:border-[#c0020e] focus:bg-white focus:ring-4 focus:ring-[#c0020e]/10 " +
  "hover:bg-slate-50 appearance-none transition-all duration-200 cursor-pointer shadow-xs";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  visit: "",
  city: "",
  notes: "",
};

export default function BookConsult() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneClean = (formData.phone || "").replace(/[\s-]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/book-consult", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData(emptyForm);
      } else {
        alert("Failed to book. Please try again.");
      }
    } catch {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up            { animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-d1         { animation-delay: 0.06s; }
        .fade-up-d2         { animation-delay: 0.12s; }
        .fade-up-d3         { animation-delay: 0.18s; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ════════════════════════════════════════════
          MOBILE  (< lg): stacked hero + form card
          DESKTOP (≥ lg): side-by-side split layout
          ════════════════════════════════════════════ */}

      {/* ── MOBILE layout ── */}
      <div
        className="lg:hidden min-h-screen flex flex-col !p-0 !m-0"
        style={{ background: "#f8f9fc", padding: 0, margin: 0 }}
      >
        {/* Mobile hero */}
        <div
          className="relative overflow-hidden px-5 pt-9 pb-16 text-white text-center"
          style={{
            background: "linear-gradient(150deg, #420008 0%, #7d000b 35%, #c0020e 75%, #e30a17 100%)",
          }}
        >
          {/* Subtle background glow circles */}
          <span
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #ff6b6b, transparent)" }}
          />
          <span
            className="absolute bottom-0 -left-10 w-40 h-40 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #ffa8a8, transparent)" }}
          />

          <h1
            className="fade-up fade-up-d1 text-[25px] sm:text-3xl font-extrabold leading-tight font-outfit"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
          >
            Book Your Free Consult
          </h1>
          <p className="fade-up fade-up-d2 text-xs sm:text-sm text-white/85 mt-1.5 font-medium max-w-xs mx-auto leading-relaxed">
            Doctor-led hair assessment &amp; transparent graft estimate
          </p>

          {/* Clean 3-pill trust row */}
          <div className="fade-up fade-up-d3 flex items-center justify-center gap-2 mt-3.5 mb-2">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/95"
              style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(6px)" }}
            >
              <Star className="w-2.5 h-2.5 fill-[#FFD700] text-[#FFD700]" />
              2,000+ Happy
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/95"
              style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(6px)" }}
            >
              <CheckCircle2 className="w-2.5 h-2.5 text-[#FFD700]" />
              100% Free
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/95"
              style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(6px)" }}
            >
              <Shield className="w-2.5 h-2.5 text-[#FFD700]" />
              Certified
            </span>
          </div>

          {/* Smooth bottom curve */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6"
            style={{ background: "#f8f9fc", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", marginBottom: "-1px" }}
          />
        </div>

        {/* Mobile form card */}
        <div className="flex-1 flex items-start justify-center px-4 pt-5 pb-28 sm:pb-12">
          <div
            className="w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100"
            style={{ boxShadow: "0 12px 40px -8px rgba(0,0,0,0.12)" }}
          >
            {/* Top card banner */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">
                  Patient Information
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">Quick 30-sec form</p>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-50 text-[#c0020e] border border-rose-100">
                <Sparkles className="w-3 h-3" />
                ₹0 Fee
              </span>
            </div>

            <MobileFormBody
              submitted={submitted} setSubmitted={setSubmitted}
              formData={formData} loading={loading}
              handleChange={handleChange} handleSubmit={handleSubmit}
              inputCls={inputCls} selectCls={selectCls}
              indianCities={indianCities}
            />
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (Full Height, Seamless from Navbar) ── */}
      <div
        className="hidden lg:flex min-h-[calc(100vh-5rem)] w-full !p-0 !m-0"
        style={{ padding: 0, margin: 0 }}
      >

        {/* Left — crimson brand panel */}
        <div
          className="relative w-[42%] xl:w-[38%] min-h-[calc(100vh-5rem)] flex flex-col justify-between p-10 xl:p-14 text-white overflow-hidden shrink-0"
          style={{ background: "linear-gradient(160deg, #420008 0%, #7d000b 35%, #c0020e 70%, #e30a17 100%)" }}
        >
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #fff, transparent)", transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #fff, transparent)", transform: "translate(-30%,30%)" }} />

          {/* Brand */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase mb-6 shadow-sm"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
              India&apos;s #1 Hair Transplant Clinic
            </span>

            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-[1.15] font-outfit"
              style={{ textShadow: "0 3px 20px rgba(0,0,0,0.35)" }}>
              Book Your<br />
              <span style={{ color: "#FFD700" }}>Free</span> Consult
            </h1>
            <p className="mt-3 text-sm xl:text-base text-white/85 leading-relaxed max-w-sm font-medium">
              Fill in your details and our Turkish-certified specialists will confirm your appointment within 24 hours.
            </p>
          </div>

          {/* Benefits */}
          <div className="relative z-10 space-y-4 my-8">
            {[
              { icon: CheckCircle2, title: "100% Free Hair Analysis", desc: "Comprehensive scalp & graft assessment worth ₹5,000" },
              { icon: Award,        title: "Certified Turkish Surgeons", desc: "Advanced Turkey Sapphire FUE expertise, in India" },
              { icon: Shield,       title: "Zero Obligation", desc: "Consult first, decide freely — 100% transparent" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3.5">
                <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}>
                  <Icon className="w-4.5 h-4.5 text-[#FFD700]" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-snug">{title}</p>
                  <p className="text-xs text-white/75 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="relative z-10">
            <div className="h-px bg-white/20 mb-5" />
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["2,000+", "Happy Patients"], ["95%+", "Graft Survival"], ["10+", "Years of Trust"]].map(([num, lbl]) => (
                <div key={lbl}>
                  <p className="text-xl xl:text-2xl font-extrabold font-outfit" style={{ color: "#FFD700" }}>{num}</p>
                  <p className="text-[10px] text-white/70 mt-0.5 leading-tight">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div className="flex-1 min-h-[calc(100vh-5rem)] overflow-y-auto no-scrollbar flex items-center justify-center bg-slate-50 px-6 xl:px-14 py-8">
          <div className="w-full max-w-xl">

            {/* Section header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl xl:text-3xl font-extrabold text-gray-900 font-outfit">
                  Appointment Details
                </h2>
                <p className="text-xs xl:text-sm text-slate-500 mt-0.5">
                  All fields marked <span className="text-[#c0020e] font-bold">*</span> are required
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Slots Available Today
              </span>
            </div>

            {submitted ? (
              <div className="bg-white rounded-3xl p-10 flex flex-col items-center text-center gap-5 fade-up"
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 8px 28px rgba(34,197,94,0.35)" }}>
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 font-outfit">Booking Confirmed!</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-sm">
                    Our team will reach out within 24 hours to confirm your appointment slot.
                  </p>
                </div>
                <button onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold underline" style={{ color: "#c0020e" }}>
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 xl:p-9 flex flex-col gap-4 shadow-xl border border-slate-100"
                style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}>

                {/* Full Name */}
                <AppointmentFormField label="Full Name" required icon={User}>
                  <input type="text" name="name" value={formData.name}
                    onChange={handleChange} required placeholder="e.g. Rahul Sharma"
                    className={inputCls} />
                </AppointmentFormField>

                {/* Phone + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <AppointmentFormField label="Phone Number" required icon={Phone}>
                    <input type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} required minLength={10} maxLength={15}
                      pattern="[0-9+\s-]{10,15}" placeholder="+91 98765 43210"
                      className={inputCls} />
                  </AppointmentFormField>
                  <AppointmentFormField label="Email Address" icon={Mail}>
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="you@example.com"
                      className={inputCls} />
                  </AppointmentFormField>
                </div>

                {/* Date + Timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <AppointmentFormField label="Preferred Date" icon={Calendar}>
                    <input type="date" name="date" value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={inputCls} />
                  </AppointmentFormField>
                  <AppointmentFormField label="Plan Timeline" icon={Clock}>
                    <div className="relative">
                      <select name="visit" value={formData.visit}
                        onChange={handleChange} className={selectCls}>
                        <option value="">When are you planning?</option>
                        <option value="within week">Within a week</option>
                        <option value="within month">Within a month</option>
                        <option value="next 2-3 month">Next 2–3 months</option>
                        <option value="not sure">Not Sure</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
                    </div>
                  </AppointmentFormField>
                </div>

                {/* City */}
                <AppointmentFormField label="Select City" required icon={MapPin}>
                  <div className="relative">
                    <select name="city" value={formData.city}
                      onChange={handleChange} required className={selectCls}>
                      <option value="">Choose a city</option>
                      {indianCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
                  </div>
                </AppointmentFormField>

                {/* Notes */}
                <AppointmentFormField label="Notes / Concerns" icon={MessageSquare} isTextarea>
                  <textarea name="notes" value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific concerns or hair loss stage..."
                    rows="2" className={inputCls + " resize-none"}
                    style={{ paddingTop: "10px" }} />
                </AppointmentFormField>

                {/* CTA */}
                <button type="submit" disabled={loading}
                  className="w-full mt-1 flex items-center justify-center gap-2.5 py-3.5 xl:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-lg hover:shadow-red-500/25"
                  style={{
                    background: loading ? "#9b000a" : "linear-gradient(135deg, #e30a17 0%, #b80712 50%, #96040d 100%)",
                    boxShadow: loading ? "none" : "0 10px 28px rgba(227,10,23,0.32)",
                  }}>
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Securing Your Slot…</>
                  ) : (
                    <>Confirm &amp; Book Free Consult<ArrowRight className="w-4.5 h-4.5" /></>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 -mt-1 font-medium">
                  <Lock className="w-3 h-3 text-slate-400" />
                  100% Confidential • Zero Spam Guarantee
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Shared mobile form body ── */
function MobileFormBody({ submitted, setSubmitted, formData, loading, handleChange, handleSubmit, inputCls, selectCls, indianCities }) {
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-6 gap-3 fade-up">
        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 8px 24px rgba(34,197,94,0.35)" }}>
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 font-outfit">Booking Confirmed!</h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Our medical team will reach out to you within 24 hours to confirm your appointment slot.
          </p>
        </div>
        <button onClick={() => setSubmitted(false)}
          className="mt-1 text-xs font-bold underline" style={{ color: "#c0020e" }}>
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      <AppointmentFormField label="Full Name" required icon={User}>
        <input type="text" name="name" value={formData.name} onChange={handleChange}
          required placeholder="e.g. Rahul Sharma" className={inputCls} />
      </AppointmentFormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <AppointmentFormField label="Phone Number" required icon={Phone}>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
            required minLength={10} maxLength={15} pattern="[0-9+\s-]{10,15}"
            placeholder="+91 98765 43210" className={inputCls} />
        </AppointmentFormField>
        <AppointmentFormField label="Email Address" icon={Mail}>
          <input type="email" name="email" value={formData.email} onChange={handleChange}
            placeholder="you@example.com" className={inputCls} />
        </AppointmentFormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <AppointmentFormField label="Preferred Date" icon={Calendar}>
          <input type="date" name="date" value={formData.date} onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} className={inputCls} />
        </AppointmentFormField>
        <AppointmentFormField label="Plan Timeline" icon={Clock}>
          <div className="relative">
            <select name="visit" value={formData.visit} onChange={handleChange} className={selectCls}>
              <option value="">When are you planning?</option>
              <option value="within week">Within a week</option>
              <option value="within month">Within a month</option>
              <option value="next 2-3 month">Next 2–3 months</option>
              <option value="not sure">Not Sure</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
          </div>
        </AppointmentFormField>
      </div>

      <AppointmentFormField label="Select City" required icon={MapPin}>
        <div className="relative">
          <select name="city" value={formData.city} onChange={handleChange} required className={selectCls}>
            <option value="">Choose a city</option>
            {indianCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
        </div>
      </AppointmentFormField>

      <AppointmentFormField label="Notes / Concerns" icon={MessageSquare} isTextarea>
        <textarea name="notes" value={formData.notes} onChange={handleChange}
          placeholder="Any specific concerns or hair loss stage..."
          rows="2" className={inputCls + " resize-none"} style={{ paddingTop: "10px" }} />
      </AppointmentFormField>

      <button type="submit" disabled={loading}
        className="w-full mt-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-lg hover:shadow-red-500/25"
        style={{
          background: loading ? "#9b000a" : "linear-gradient(135deg, #e30a17 0%, #b80712 50%, #96040d 100%)",
          boxShadow: loading ? "none" : "0 10px 28px rgba(227,10,23,0.32)",
        }}>
        {loading ? (
          <><Loader2 className="w-4.5 h-4.5 animate-spin" />Securing Your Slot…</>
        ) : (
          <>Confirm &amp; Book Free Consult<ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-medium text-center">
        <Lock className="w-3 h-3 text-slate-400 shrink-0" />
        100% Confidential • Zero Spam Guarantee
      </p>
    </form>
  );
}




