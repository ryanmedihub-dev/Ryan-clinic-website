"use client";
import { useState, useRef } from "react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CRta9DmKthK0EAE/review";

const SESSION_OPTIONS = Array.from({ length: 5 }, (_, i) => i + 1);
const COMPLETED_OPTIONS = Array.from({ length: 5 }, (_, i) => i);

// ── Icon helpers (same SVG style as interview-form) ────────────────────────
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

// ── Reusable field wrapper ────────────────────────────────────────────────
function FieldError({ msg }) {
  if (!msg) return null;
  return <p className="text-red-500 text-xs mt-1">{msg}</p>;
}

function InputWrapper({ icon, error, children }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── Main form component ────────────────────────────────────────────────────
export default function PRPForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    city: "",
    currentSessionNumber: "",
    totalSessionsCompleted: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Ref-based guard: prevents double-click racing
  const isSubmittingRef = useRef(false);

  // ── Field change handler ───────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    // Auto-correct totalSessionsCompleted when currentSessionNumber changes
    if (name === "currentSessionNumber" && formData.totalSessionsCompleted !== "") {
      // Re-validate consistency silently; will be caught on submit
    }
  };

  // ── Client-side validation ─────────────────────────────────────────────
  const validate = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    }

    const phoneClean = formData.phone.replace(/[\s-]/g, "");
    if (!phoneClean) {
      errs.phone = "Phone number is required.";
    } else if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }

    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
    }

    const ageNum = Number(formData.age);
    if (!formData.age) {
      errs.age = "Age is required.";
    } else if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      errs.age = "Please enter a valid age (1–120).";
    }

    if (!formData.gender) {
      errs.gender = "Please select your gender.";
    }

    if (!formData.city.trim()) {
      errs.city = "City is required.";
    }

    const sessionNum = Number(formData.currentSessionNumber);
    if (!formData.currentSessionNumber) {
      errs.currentSessionNumber = "Please select your current session number.";
    } else if (sessionNum < 1 || sessionNum > 5) {
      errs.currentSessionNumber = "Session number must be between 1 and 5.";
    }

    const completedNum = Number(formData.totalSessionsCompleted);
    if (formData.totalSessionsCompleted === "") {
      errs.totalSessionsCompleted = "Please select total sessions completed.";
    } else if (completedNum < 0) {
      errs.totalSessionsCompleted = "Cannot be negative.";
    } else if (completedNum >= sessionNum) {
      errs.totalSessionsCompleted =
        "Total completed must be less than the current session number.";
    }

    return errs;
  };

  // ── Submit handler ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double-submit guard
    if (isSubmittingRef.current) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(`prp-field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/prp-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          age: Number(formData.age),
          gender: formData.gender,
          city: formData.city.trim(),
          currentSessionNumber: Number(formData.currentSessionNumber),
          totalSessionsCompleted: Number(formData.totalSessionsCompleted),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setIsSuccess(true);
        // Redirect ONLY after confirmed DB persistence
        setTimeout(() => {
          window.location.assign(GOOGLE_REVIEW_URL);
        }, 1200);
      } else {
        // Map server validation errors back to fields if available
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitError(
          data.message || "Submission failed. Please check your details and try again."
        );
      }
    } catch {
      setSubmitError(
        "Network error. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your PRP session details have been recorded successfully. Redirecting you to share your experience…
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-lg">
            <span>✅ Form submitted</span>
            <span className="text-xs text-green-600">(Redirecting…)</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">
            PRP Session Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Please fill in your details below. This helps us track your PRP treatment progress accurately.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* ── Section 1: Patient Details ─────────────────────────────── */}
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Patient Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="prp-field-fullName" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    id="prp-field-fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    required
                    autoComplete="name"
                  />
                </div>
                <FieldError msg={errors.fullName} />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="prp-field-phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon />
                  </div>
                  <input
                    id="prp-field-phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={15}
                    pattern="[0-9+\s\-]{10,15}"
                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    required
                    autoComplete="tel"
                  />
                </div>
                <FieldError msg={errors.phone} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="prp-field-email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EmailIcon />
                  </div>
                  <input
                    id="prp-field-email"
                    type="email"
                    name="email"
                    placeholder="Enter email address (optional)"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    autoComplete="email"
                  />
                </div>
                <FieldError msg={errors.email} />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label htmlFor="prp-field-age" className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="prp-field-age"
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleChange}
                    min={1}
                    max={120}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.age ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    required
                  />
                </div>
                <FieldError msg={errors.age} />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Gender *
                </label>
                <div id="prp-field-gender" className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <label
                      key={g}
                      className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition text-sm font-medium ${
                        formData.gender === g
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      } ${errors.gender ? "border-red-300" : ""}`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {g}
                    </label>
                  ))}
                </div>
                <FieldError msg={errors.gender} />
              </div>

              {/* City */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="prp-field-city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon />
                  </div>
                  <input
                    id="prp-field-city"
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    required
                    autoComplete="address-level2"
                  />
                </div>
                <FieldError msg={errors.city} />
              </div>

            </div>
          </div>

          {/* ── Divider ──────────────────────────────────────────────────── */}
          <div className="border-t border-gray-100 mx-6 md:mx-8" />

          {/* ── Section 2: PRP Session Details ───────────────────────────── */}
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-2xl mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">PRP Session Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Current Session Number */}
              <div className="space-y-2">
                <label htmlFor="prp-field-currentSessionNumber" className="block text-sm font-medium text-gray-700">
                  Current PRP Session Number *
                </label>
                <p className="text-xs text-gray-500 -mt-1">Which PRP session are you attending today?</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <select
                    id="prp-field-currentSessionNumber"
                    name="currentSessionNumber"
                    value={formData.currentSessionNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-8 py-3 border ${errors.currentSessionNumber ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none`}
                    required
                  >
                    <option value="">Select session number</option>
                    {SESSION_OPTIONS.map((n) => (
                      <option key={n} value={n}>Session {n}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon />
                  </div>
                </div>
                <FieldError msg={errors.currentSessionNumber} />
              </div>

              {/* Total Sessions Completed */}
              <div className="space-y-2">
                <label htmlFor="prp-field-totalSessionsCompleted" className="block text-sm font-medium text-gray-700">
                  Total PRP Sessions Completed *
                </label>
                <p className="text-xs text-gray-500 -mt-1">How many PRP sessions have you completed before today?</p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <select
                    id="prp-field-totalSessionsCompleted"
                    name="totalSessionsCompleted"
                    value={formData.totalSessionsCompleted}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-8 py-3 border ${errors.totalSessionsCompleted ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none`}
                    required
                  >
                    <option value="">Select completed sessions</option>
                    {COMPLETED_OPTIONS.map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "session" : "sessions"} completed</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon />
                  </div>
                </div>
                <FieldError msg={errors.totalSessionsCompleted} />
              </div>

            </div>

            {/* Helper note */}
            <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
              <strong>Example:</strong> If you are attending Session 3 today, select &quot;Session 3&quot; and &quot;2 sessions completed&quot; (Sessions 1 &amp; 2 are already done).
            </div>
          </div>

          {/* ── Global error banner ───────────────────────────────────────── */}
          {submitError && (
            <div className="mx-6 md:mx-8 mb-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {submitError}
            </div>
          )}

          {/* ── Submit ────────────────────────────────────────────────────── */}
          <div className="px-6 md:px-8 pb-8">
            <button
              type="submit"
              id="prp-submit-btn"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit PRP Form
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Your information is kept private and used only for treatment tracking.
            </p>
          </div>

        </form>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Clinic Ryan · PRP Treatment Programme
        </p>
      </div>
    </div>
  );
}
