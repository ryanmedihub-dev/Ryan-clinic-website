"use client";
import { useState, useEffect, useRef, useCallback } from "react";

export default function InterviewForm() {
  const [hrList, setHrList] = useState([]);
  const [loadingHr, setLoadingHr] = useState(true);

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
    source: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});

  // ── AI Interview State ──────────────────────────────────────────────────────
  const [interviewLanguage, setInterviewLanguage] = useState("en"); // "en" | "hinglish"
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingText, setAiLoadingText] = useState("");
  const [aiError, setAiError] = useState("");
  const [sessionToken, setSessionToken] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  // MCQ: answers keyed by questionId → selectedOptionId
  const [answers, setAnswers] = useState({});
  const [currentAnswerError, setCurrentAnswerError] = useState("");
  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);

  // ── 4-Minute Countdown Timer State ─────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(240); // seconds (4 minutes)
  const [isTimedOut, setIsTimedOut] = useState(false);
  const timerRef = useRef(null);
  // Ref-based submission lock: prevents timer callback + manual Submit racing
  const isSubmittingRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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
  // Strips leading/trailing 'hr' to catch variants like 'anamta Hr' or 'Hr Muskan'.
  // This ONLY affects the dropdown labels — ObjectIds and API data are untouched.
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
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const src = url.searchParams.get("source") || "direct";
      setFormData((prev) => ({ ...prev, source: src }));
    }
  }, []);

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

  // ── Advance from Step 2 to Step 3 (Language Selection & Assessment Intro) ──
  const handleContinueToAssessment = () => {
    if (!validateStep2()) return;
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  // ── Initialize AI Interview in Selected Language ───────────────────────────
  const startAiInterview = async (langOverride) => {
    const langToUse = langOverride || interviewLanguage || "en";
    setAiLoading(true);
    setAiLoadingText(
      langToUse === "hinglish"
        ? "Preparing your personalized assessment in Hinglish..."
        : "Preparing your personalized interview assessment in English..."
    );
    setAiError("");
    setAnswers({});
    setCurrentQuestionIdx(0);
    setIsTimedOut(false);
    clearTimer();
    window.scrollTo(0, 0);

    try {
      // Send ONLY non-PII required for role MCQ generation + language preference
      const res = await fetch("/api/ai-interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: formData.position,
          experienceType: formData.experienceType,
          yearsOfExperience: formData.yearsOfExperience || 0,
          language: langToUse,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.questions)) {
        setQuestions(data.questions);
        setSessionToken(data.sessionToken);
        setCurrentQuestionIdx(0);
        // Start the 4-minute countdown
        const duration = data.durationSeconds || 240;
        setTimeLeft(duration);
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              setIsTimedOut(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setAiError(data.message || "Unable to start the assessment. Please try again.");
      }
    } catch (err) {
      setAiError("Network connection error. Please check your internet and try again.");
    } finally {
      setAiLoading(false);
    }
  };

  // ── Auto-Timeout: evaluate submitted answers, then show neutral Step 4 ──────
  // handleTimerExpiredSubmit is defined below after handleSubmitAssessment.
  // We use a ref so the effect closure always sees the latest version.
  const timerExpiredSubmitRef = useRef(null);

  useEffect(() => {
    if (isTimedOut && currentStep === 3) {
      clearTimer();
      window.scrollTo(0, 0);
      // Trigger auto-submit via ref so we always call the latest closure
      if (timerExpiredSubmitRef.current) {
        timerExpiredSubmitRef.current();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimedOut, currentStep]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // ── MCQ Option Selection Handler ────────────────────────────────────────────
  const handleOptionSelect = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    if (currentAnswerError) setCurrentAnswerError("");
  };

  const handleNextQuestion = () => {
    const currentQ = questions[currentQuestionIdx];
    if (!answers[currentQ?.id]) {
      setCurrentAnswerError("Please select an option before proceeding to the next question.");
      return;
    }
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setCurrentAnswerError("");
      window.scrollTo(0, 0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
      setCurrentAnswerError("");
      window.scrollTo(0, 0);
    }
  };

  // ── Final MCQ Evaluation Submission — Manual Path (all 7 answered) ───────────
  const handleSubmitAssessment = async () => {
    const currentQ = questions[currentQuestionIdx];
    if (!answers[currentQ?.id]) {
      setCurrentAnswerError("Please select an option before submitting your assessment.");
      return;
    }

    // Ref-based lock prevents racing with timer auto-submit
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmittingAssessment(true);
    clearTimer();
    setAiLoading(true);
    setAiLoadingText("Submitting and completing your interview assessment...");
    setAiError("");

    // Format answers as { questionId, selectedOptionId } — NO correct answer sent
    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: answers[q.id] || "",
    }));

    try {
      const res = await fetch("/api/ai-interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          candidateData: formData,
          answers: formattedAnswers,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Move to neutral completed screen
        setCurrentStep(4);
        window.scrollTo(0, 0);
      } else {
        setAiError(data.message || "We encountered an issue finalizing your interview. Please try again.");
      }
    } catch (err) {
      setAiError("Network error while submitting assessment. Please click retry.");
    } finally {
      setAiLoading(false);
      setIsSubmittingAssessment(false);
      isSubmittingRef.current = false;
    }
  };

  // ── Timer-Expiry Auto-Submit — Path B (partial answers OK) ───────────────────
  // Defined as a stable function stored in a ref so the isTimedOut effect
  // always invokes the latest closure without needing it as an effect dependency.
  const handleTimerExpiredSubmit = useCallback(async () => {
    // Ref-based lock: if manual submit already in flight, bail out
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmittingAssessment(true);
    setAiLoading(true);
    setAiLoadingText("Time's up! Submitting your assessment automatically...");
    setAiError("");

    // Capture whatever answers are in state RIGHT NOW (partial is fine)
    // Use a snapshot captured inside this call to avoid stale-closure issues.
    // answers state is read directly — React guarantees this is the latest
    // value because this function is recreated by useCallback when answers changes.
    const currentAnswers = answers; // stable reference captured at call time

    // Build the answer array — include every question; missing = empty string → incorrect
    const formattedAnswers = questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: currentAnswers[q.id] || "",
    })).filter((a) => a.selectedOptionId !== ""); // send only answered ones; server fills rest as incorrect

    try {
      const res = await fetch("/api/ai-interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          candidateData: formData,
          answers: formattedAnswers.length > 0 ? formattedAnswers : [
            // Edge: 0 answers answered — send a deliberately empty sentinel
            // The server will score 0/7 and skip CRM
            { questionId: questions[0]?.id || "q_1", selectedOptionId: "" },
          ],
          timedOut: true, // tells server this is a timer-expiry auto-submit
        }),
      });

      const data = await res.json();
      // Regardless of pass/fail (score is never revealed), move to neutral completion
      if (res.ok && data.success) {
        setCurrentStep(4);
        window.scrollTo(0, 0);
      } else {
        // Non-fatal: still show completion screen — candidate already can't answer more
        setCurrentStep(4);
        window.scrollTo(0, 0);
        console.warn("[AI-Interview] Timer-expiry auto-submit returned non-success:", data.message);
      }
    } catch (err) {
      // Network failure during auto-submit: still show completion screen
      setCurrentStep(4);
      window.scrollTo(0, 0);
      console.error("[AI-Interview] Timer-expiry auto-submit network error:", err.message);
    } finally {
      setAiLoading(false);
      setIsSubmittingAssessment(false);
      isSubmittingRef.current = false;
    }
  }, [answers, questions, sessionToken, formData]);

  // Keep the ref in sync with the latest closure on every render
  timerExpiredSubmitRef.current = handleTimerExpiredSubmit;

  const nextStep = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const currentQuestion = questions[currentQuestionIdx];
  const stepTitles = ["Personal Info", "Experience", "Assessment", "Completed"];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 bg-clip-text bg-linear-to-r from-blue-600 to-indigo-700">
            Candidate Pre-Screening & Interview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {currentStep === 3
              ? `Demonstrate your practical skills for the ${formData.position || "applied"} role.`
              : currentStep === 4
              ? "Your application has been received."
              : "Complete your candidate profile and role assessment in simple steps."}
          </p>
        </div>

        {/* Progress Bar (Visible on Steps 1, 2, 3) */}
        {currentStep <= 3 && (
          <div className="mb-8 sm:mb-10 px-2">
            <div className="flex items-center justify-between mb-3">
              {stepTitles.slice(0, 3).map((label, i) => (
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
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* ── STEP 1: Personal Information ───────────────────────────────── */}
          {currentStep === 1 && (
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
          {currentStep === 2 && (
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

              {/* HR Reference — Value is HR _id (Preserved for Phase 2 CRM integration) */}
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

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleContinueToAssessment}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-xs cursor-pointer"
                >
                  Continue to Pre-Screening Interview
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: AI Interview MCQ Assessment ─────────────────────────── */}
          {currentStep === 3 && (
            <div className="p-6 md:p-8">
              {aiLoading ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-5"></div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{aiLoadingText}</h3>
                  <p className="text-xs text-gray-500 max-w-sm">Please do not refresh or leave this page.</p>
                </div>
              ) : aiError ? (
                <div className="py-12 text-center max-w-md mx-auto">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Assessment Temporary Notice</h3>
                  <p className="text-sm text-gray-600 mb-6">{aiError}</p>
                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAiError("")}
                      className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition text-sm cursor-pointer"
                    >
                      Change Language
                    </button>
                    <button
                      type="button"
                      onClick={() => startAiInterview(interviewLanguage)}
                      className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-sm cursor-pointer"
                    >
                      Retry Assessment
                    </button>
                  </div>
                </div>
              ) : !sessionToken || questions.length === 0 ? (
                /* ── Language Selection & Assessment Introduction ── */
                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-2xl mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">Pre-Screening Assessment</h2>
                      <p className="text-sm text-gray-500">
                        Role: <span className="font-semibold text-blue-600">{formData.position || "Applied Role"}</span> • 7 Questions • 4 Minutes
                      </p>
                    </div>
                  </div>

                  {/* Language Selection Header */}
                  <div className="mb-6">
                    <label className="block text-base font-semibold text-gray-900 mb-1">
                      Choose your interview language
                    </label>
                    <p className="text-sm text-gray-500">
                      Choose the language you are most comfortable with.
                    </p>
                  </div>

                  {/* Language Option Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Option 1: English */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setInterviewLanguage("en")}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setInterviewLanguage("en"); }}
                      className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        interviewLanguage === "en"
                          ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                            interviewLanguage === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}>
                            EN
                          </span>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-base">English</h4>
                            <span className="text-xs text-gray-500 font-medium">Standard English</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          interviewLanguage === "en" ? "border-blue-600 bg-blue-600" : "border-gray-300"
                        }`}>
                          {interviewLanguage === "en" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Questions and multiple choice options will be presented entirely in clear, professional English.
                      </p>
                    </div>

                    {/* Option 2: Hinglish */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setInterviewLanguage("hinglish")}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setInterviewLanguage("hinglish"); }}
                      className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        interviewLanguage === "hinglish"
                          ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/30 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                            interviewLanguage === "hinglish" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}>
                            हि/EN
                          </span>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-base">Hinglish (Hindi + English)</h4>
                            <span className="text-xs text-blue-600 font-semibold bg-blue-100/70 px-2 py-0.5 rounded-full">Recommended</span>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          interviewLanguage === "hinglish" ? "border-blue-600 bg-blue-600" : "border-gray-300"
                        }`}>
                          {interviewLanguage === "hinglish" && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Questions will be in natural conversational Hinglish (Roman script Hindi + English) for easier understanding.
                      </p>
                    </div>
                  </div>

                  {/* Assessment Instructions Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Assessment Guidelines
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span><strong>7 Practical Questions:</strong> Scenario-based multiple-choice questions tailored to the <strong>{formData.position}</strong> position.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span><strong>4-Minute Timer:</strong> A countdown timer begins immediately after questions are loaded.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span><strong>No Negative Marking:</strong> Select the single best answer for each question before time runs out.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => { setCurrentStep(2); window.scrollTo(0, 0); }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center cursor-pointer text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back to Experience
                    </button>
                    <button
                      type="button"
                      onClick={() => startAiInterview(interviewLanguage)}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center shadow-md cursor-pointer text-sm font-semibold"
                    >
                      Start Assessment ({interviewLanguage === "hinglish" ? "Hinglish" : "English"})
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : questions.length > 0 && currentQuestion ? (
                <div>
                  {/* Header: Role badge + progress + countdown timer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                          {formData.position || "Candidate"} Assessment
                        </span>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {interviewLanguage === "hinglish" ? "Hinglish" : "English"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mt-2">
                        Question {currentQuestionIdx + 1} of {questions.length}
                      </h3>
                    </div>

                    {/* 4-Minute Countdown Timer */}
                    <div className="flex flex-col items-end gap-1.5">
                      <div
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
                          timeLeft <= 30
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : timeLeft <= 60
                            ? "bg-amber-50 text-amber-600 border border-amber-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
                      </div>
                      <span className="text-xs font-semibold text-gray-400">
                        {Math.round(((currentQuestionIdx + 1) / questions.length) * 100)}% Completed
                      </span>
                      <div className="w-32 sm:w-44 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 sm:p-6 mb-5">
                    <p className="text-base sm:text-lg font-semibold text-gray-900 leading-relaxed">
                      {currentQuestion.text}
                    </p>
                  </div>

                  {/* MCQ Options — Radio Card Selection */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select one answer:</p>
                    {(currentQuestion.options || []).map((opt, optIdx) => {
                      const isSelected = answers[currentQuestion.id] === opt.id;
                      const optionLabels = ["A", "B", "C", "D"];
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => !isTimedOut && handleOptionSelect(currentQuestion.id, opt.id)}
                          disabled={isTimedOut}
                          aria-disabled={isTimedOut}
                          className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-150 ${
                            isTimedOut
                              ? "opacity-60 cursor-not-allowed"
                              : "cursor-pointer"
                          } ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                          }`}
                        >
                          <span
                            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-gray-100 border-gray-300 text-gray-600"
                            }`}
                          >
                            {optionLabels[optIdx] || optIdx + 1}
                          </span>
                          <span className={`text-sm leading-snug ${
                            isSelected ? "text-blue-900 font-medium" : "text-gray-700"
                          }`}>
                            {opt.text}
                          </span>
                        </button>
                      );
                    })}
                    {currentAnswerError && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{currentAnswerError}</p>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIdx === 0}
                      className="px-5 py-2.5 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center cursor-pointer text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Previous
                    </button>

                    {currentQuestionIdx < questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        disabled={isTimedOut}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center cursor-pointer text-sm shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Next Question
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitAssessment}
                        disabled={isSubmittingAssessment || isTimedOut || !answers[currentQuestion.id]}
                        className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition flex items-center cursor-pointer text-sm shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        Submit Assessment
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* ── STEP 4: Application & Interview Completed ─────────────────── */}
          {currentStep === 4 && (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Interview Assessment Submitted
              </h2>

              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you, <span className="font-semibold text-gray-800">{formData.name}</span>. Your preliminary interview assessment for the{" "}
                <span className="font-semibold text-gray-800">{formData.position}</span> position has been successfully completed and recorded.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left mb-8 space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">What happens next?</h4>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <span>Our talent acquisition team will review your application and interview responses.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <span>Shortlisted applicants will receive a direct call or email regarding next round scheduling.</span>
                </div>
              </div>

              <div className="text-xs text-gray-400">
                Clinic Ryan Recruitment Operations &bull; All submissions are strictly confidential.
              </div>
            </div>
          )}
        </div>

        {currentStep < 4 && (
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>All information provided will be kept confidential and used solely for recruitment purposes.</p>
          </div>
        )}
      </div>
    </div>
  );
}