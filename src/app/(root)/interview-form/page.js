"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AUTHORITATIVE_ACTIVE_HR_LIST } from "@/lib/hrEmployees";

function InterviewFormContent() {
  const searchParams = useSearchParams();
  const rawSource = (searchParams.get("source") || "direct").trim();
  const isQr = rawSource.toLowerCase() === "qr";

  const [hrList, setHrList] = useState(AUTHORITATIVE_ACTIVE_HR_LIST);
  const [loadingHr, setLoadingHr] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    position: "",
    address: "",
    phone: "",
    email: "",
    expectedSalary: "",
    experienceType: "Fresher",
    yearsOfExperience: "",
    previousCompany: "",
    previousCompanyContact: "",
    previousPosition: "",
    previousSalary: "",
    reasonForLeaving: "",
    reference: "", // stores HR _id (ObjectId string)
    source: isQr ? "qr" : rawSource,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  // ── Unified Submission State (Zero Assessment Flow) ──────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedCandidate, setSubmittedCandidate] = useState({ name: "", position: "" });

  const jobProfiles = [
    "Telecaller",
    "Team Leader",
    "Manager",
    "HR Recruiter",
    "Receptionist",
    "Counsellor",
    "Trainer",
    "Stock Manager",
    "MIS Executive",
    "Medicine Sales Executive",
    "Pharmacy Executive",
    "Nursing Staff",
    "Nursing Staff / OT Staff",
    "Doctor",
    "Transplant Technician",
    "Software Developer",
    "Other",
  ];

  // ── HR Reference dropdown: filter + display-name formatting ───────────────
  // Names to hide from the public reference list (case-insensitive, trimmed).
  function isExcludedHr(hr) {
    if (!hr) return false;
    const name = hr.name || "";
    const lower = name.trim().toLowerCase();
    const stripped = lower
      .replace(/^hr[\s._-]+/i, "")
      .replace(/[\s._-]+hr$/i, "")
      .trim();

    const excludedNames = ["shubham chitransh", "anamta", "muskan"];
    if (excludedNames.includes(stripped) || excludedNames.includes(lower)) {
      return true;
    }

    // Safety fallback: exact CRM ObjectIds for the three excluded records
    const excludedIds = [
      "6a8c1c9f4b81eed5d782715a", // Anamta
      "69bd264a9777c5b4424121d9", // Muskan
      "6a8842144f9e384454479956", // Shubham Chitransh
    ];
    if (hr._id && excludedIds.includes(String(hr._id))) {
      return true;
    }

    return false;
  }

  /**
   * Returns the display label for an HR entry.
   * - Trims surrounding whitespace.
   * - If the name already starts with "HR ", "Hr ", "hr " (case-insensitive),
   *   normalizes the prefix to uppercase "HR " to avoid duplicates like "HR HR Tulsi".
   * - Otherwise, prepends "HR ".
   */
  function formatHrDisplayName(rawName) {
    const trimmed = (rawName || "").trim();
    if (/^hr\s+/i.test(trimmed)) {
      return trimmed.replace(/^hr\s+/i, "HR ");
    }
    return `HR ${trimmed}`;
  }

  // Filtered + formatted list — value (_id) is never modified.
  const displayHrList = hrList
    .filter((hr) => !isExcludedHr(hr))
    .map((hr) => ({ _id: hr._id, displayName: formatHrDisplayName(hr.name) }));

  useEffect(() => {
    const rawSrc = (searchParams.get("source") || "direct").trim();
    const normalized = rawSrc.toLowerCase() === "qr" ? "qr" : rawSrc;
    setFormData((prev) => ({ ...prev, source: normalized }));
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function fetchHrList() {
      try {
        const res = await fetch("/api/hr-list");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.employees)) {
            if (isMounted) {
              setHrList(data.employees);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load HR list:", err);
      } finally {
        if (isMounted) setLoadingHr(false);
      }
    }
    fetchHrList();
    return () => {
      isMounted = false;
    };
  }, []);

  const experienceYears = Array.from({ length: 21 }, (_, i) => i);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationErrors[e.target.name]) {
      setValidationErrors({ ...validationErrors, [e.target.name]: null });
    }
  };

  const validateStep1 = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.position) errors.position = "Position is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, "")))
      errors.phone = "Please enter a valid 10-digit phone number";
    if (!formData.address.trim()) errors.address = "Address is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};
    if (formData.experienceType === "Experienced") {
      if (!formData.yearsOfExperience) errors.yearsOfExperience = "Years of experience is required";
      if (!formData.previousCompany.trim()) errors.previousCompany = "Previous company is required";
      if (!formData.previousPosition.trim()) errors.previousPosition = "Previous position is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Unified Direct Form Submission (No Assessment, Direct to RyanCRM API) ────
  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        ...formData,
        source: formData.source || (isQr ? "qr" : "direct"),
      };

      const res = await fetch("/api/submitInterviewForm/online-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSubmittedCandidate({
          name: formData.name,
          position: formData.position,
        });
        setIsSubmitted(true);
        setFormData({
          name: "",
          date: "",
          position: "",
          address: "",
          phone: "",
          email: "",
          expectedSalary: "",
          experienceType: "Fresher",
          yearsOfExperience: "",
          previousCompany: "",
          previousCompanyContact: "",
          previousPosition: "",
          previousSalary: "",
          reasonForLeaving: "",
          reference: "",
          source: isQr ? "qr" : rawSource,
        });
        window.scrollTo(0, 0);
      } else {
        setSubmitError(data.message || "Submission failed. Please check your details and try again.");
      }
    } catch (err) {
      setSubmitError("Network error while submitting. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 suppressHydrationWarning className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 bg-clip-text bg-linear-to-r from-blue-600 to-indigo-700">
            Candidate Application Form
          </h1>
          <p suppressHydrationWarning className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {isSubmitted
              ? "Your application has been received successfully."
              : "Complete your application in a few simple steps. We're excited to learn more about you!"}
          </p>
        </div>

        {/* Progress Bar (2 Steps) — hidden after submission */}
        {!isSubmitted && (
          <div className="mb-8 sm:mb-10 px-2">
            <div className="flex items-center justify-between mb-3">
              {["Personal Info", "Experience & Reference"].map((label, i) => (
                <div
                  key={label}
                  className={`text-xs sm:text-sm font-medium ${
                    currentStep >= i + 1 ? "text-blue-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  Step {i + 1}: {label}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* ── Submission Confirmation Card ─────────────────────────────────── */}
          {isSubmitted && (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Application Submitted Successfully
              </h2>

              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you{submittedCandidate.name ? `, ${submittedCandidate.name}` : ""}. Your application
                {submittedCandidate.position ? ` for the ${submittedCandidate.position} role` : ""} has been
                received and recorded in our recruitment system.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left mb-6 space-y-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">What happens next?</h4>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <span>Our recruitment team will review your application details.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <span>Shortlisted candidates will be contacted directly for the next steps.</span>
                </div>
              </div>

              <div className="text-xs text-gray-400">
                Clinic Ryan Recruitment Operations &bull; All submissions are strictly confidential.
              </div>
            </div>
          )}

          {/* ── STEP 1: Personal Information ───────────────────────────────── */}
          {!isSubmitted && currentStep === 1 && (
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      required
                    />
                  </div>
                  {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                </div>

                {/* Interview Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Interview Date *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      required
                    />
                  </div>
                  {validationErrors.date && <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>}
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Position Applied For *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.position ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none`}
                      required
                    >
                      <option value="">Select a position</option>
                      {jobProfiles.map((role, i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  {validationErrors.position && <p className="text-red-500 text-xs mt-1">{validationErrors.position}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      minLength={10}
                      maxLength={15}
                      pattern="[0-9+\s-]{10,15}"
                      className={`w-full pl-10 pr-4 py-3 border ${validationErrors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      required
                    />
                  </div>
                  {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Expected Salary */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expected Salary (₹ / month)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="expectedSalary"
                      placeholder="e.g. 25000"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2 mb-8">
                <label className="block text-sm font-medium text-gray-700">Permanent Address *</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <textarea
                    name="address"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${validationErrors.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    rows="3"
                    required
                  />
                </div>
                {validationErrors.address && <p className="text-red-500 text-xs mt-1">{validationErrors.address}</p>}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-xs cursor-pointer"
                >
                  Next: Experience Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Experience & Reference ─────────────────────────────── */}
          {!isSubmitted && currentStep === 2 && (
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Professional Experience</h2>
              </div>

              {/* Experience Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Fresher", "Experienced"].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                        formData.experienceType === type ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experienceType"
                        value={type}
                        checked={formData.experienceType === type}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <span className="block text-sm font-medium text-gray-900">{type}</span>
                        <span className="block text-xs text-gray-500">
                          {type === "Fresher" ? "No prior work experience" : "Prior work experience"}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experienced fields */}
              {formData.experienceType === "Experienced" && (
                <div className="grid grid-cols-1 gap-5 mb-8 bg-blue-50 p-5 rounded-xl border border-blue-100">
                  {/* Years of Experience */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Years of Experience *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <select
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${validationErrors.yearsOfExperience ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none`}
                      >
                        <option value="">Select years of experience</option>
                        {experienceYears.map((y) => (
                          <option key={y} value={y}>{y} {y === 1 ? "Year" : "Years"}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {validationErrors.yearsOfExperience && <p className="text-red-500 text-xs mt-1">{validationErrors.yearsOfExperience}</p>}
                  </div>

                  {/* Previous Company */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Previous Company *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="previousCompany"
                        placeholder="Company name"
                        value={formData.previousCompany}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${validationErrors.previousCompany ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                    {validationErrors.previousCompany && <p className="text-red-500 text-xs mt-1">{validationErrors.previousCompany}</p>}
                  </div>

                  {/* Previous Position */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Previous Position *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="previousPosition"
                        placeholder="Your previous job position"
                        value={formData.previousPosition}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border ${validationErrors.previousPosition ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                      />
                    </div>
                    {validationErrors.previousPosition && <p className="text-red-500 text-xs mt-1">{validationErrors.previousPosition}</p>}
                  </div>

                  {/* Previous Company Contact */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Previous Company Contact</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="previousCompanyContact"
                        placeholder="Company phone number"
                        value={formData.previousCompanyContact}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Previous Salary */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Previous Salary (₹ / month)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="previousSalary"
                        placeholder="e.g. 20000"
                        value={formData.previousSalary}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                    </div>
                  </div>

                  {/* Reason for Leaving */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Reason for Leaving</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <textarea
                        name="reasonForLeaving"
                        placeholder="Reason for leaving previous company"
                        value={formData.reasonForLeaving}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HR Reference — Value is HR _id */}
              <div className="space-y-2 mb-8">
                <label className="block text-sm font-medium text-gray-700">HR Reference (if any)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <select
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                  >
                    <option value="">{loadingHr ? "Loading references..." : "Select an HR reference"}</option>
                    {displayHrList.map((hr) => (
                      <option key={hr._id} value={hr._id}>
                        {hr.displayName}
                      </option>
                    ))}
                    {!displayHrList.some((hr) => hr._id === "69bd3e186706eb9cf318ffc9") && (
                      <option value="69bd3e186706eb9cf318ffc9">Other</option>
                    )}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center cursor-pointer disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-xs cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {submitError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm text-center">
                  {submitError}
                </div>
              )}
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>All information provided will be kept confidential and used solely for recruitment purposes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InterviewForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <InterviewFormContent />
    </Suspense>
  );
}
