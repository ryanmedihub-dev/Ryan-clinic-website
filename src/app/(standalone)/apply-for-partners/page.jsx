"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 1,
    emoji: "🧩",
    label: "Basic Info",
    title: "Tell us about yourself",
    subtitle: "Let's start with the essentials.",
    fields: [
      { id: "fullName", label: "Full Name", type: "text", placeholder: "Your full name" },
      { id: "age", label: "Age", type: "number", placeholder: "Your age" },
      {
        id: "gender", label: "Gender", type: "radio",
        options: ["Male", "Female", "Other"],
      },
      { id: "city", label: "City", type: "text", placeholder: "Your city" },
      { id: "profession", label: "Profession", type: "text", placeholder: "Your profession" },
      {
        id: "income", label: "Monthly Income Range", type: "radio",
        options: ["Below ₹30k", "₹30k–₹60k", "₹60k–₹1L", "₹1L–₹2L", "₹2L+"],
      },
    ],
  },
  {
    id: 2,
    emoji: "❤️",
    label: "Intent",
    title: "Your intent & seriousness",
    subtitle: "We match only serious individuals.",
    fields: [
      {
        id: "lookingFor", label: "What are you looking for?", type: "radio",
        options: ["Serious relationship", "Marriage", "Not sure"],
      },
      {
        id: "marriageTimeline", label: "When do you want to get married?", type: "radio",
        options: ["Within 1 year", "1–2 years", "2+ years", "Not sure"],
      },
      {
        id: "seriousnessScore", label: "How serious are you? (1–10)", type: "scale",
        min: 1, max: 10,
      },
      {
        id: "whyNow", label: "Why do you want a serious relationship now?",
        type: "textarea", placeholder: "Share your thoughts honestly…",
      },
    ],
  },
  {
    id: 3,
    emoji: "🌿",
    label: "Lifestyle",
    title: "Your lifestyle",
    subtitle: "Compatibility starts with how you live.",
    fields: [
      {
        id: "smoke", label: "Do you smoke?", type: "radio",
        options: ["Yes", "No", "Occasionally"],
      },
      {
        id: "drink", label: "Do you drink?", type: "radio",
        options: ["Yes", "No", "Occasionally"],
      },
      {
        id: "lifestyle", label: "Your lifestyle?", type: "radio",
        options: ["Home person", "Balanced", "Party"],
      },
      {
        id: "weekend", label: "Weekend preference", type: "radio",
        options: ["Stay at home", "Go out occasionally", "Social / parties"],
      },
    ],
  },
  {
    id: 4,
    emoji: "🧬",
    label: "Physical",
    title: "Physical & health",
    subtitle: "Honest answers help us find the right match.",
    fields: [
      { id: "height", label: "Height", type: "text", placeholder: "e.g. 5'8\" or 172 cm" },
      {
        id: "bodyType", label: "Body type", type: "radio",
        options: ["Slim", "Average", "Fit", "Athletic", "Heavy"],
      },
      {
        id: "fitnessLevel", label: "Fitness level", type: "radio",
        options: ["Not active", "Occasionally active", "Regularly active"],
      },
      {
        id: "diet", label: "Diet preference", type: "radio",
        options: ["Vegetarian", "Non-vegetarian", "Eggetarian", "Vegan"],
      },
    ],
  },
  {
    id: 5,
    emoji: "🧠",
    label: "Personality",
    title: "Personality & energy",
    subtitle: "How you think, feel, and connect.",
    fields: [
      {
        id: "recharge", label: "How do you recharge?", type: "radio",
        options: ["Alone", "With close people", "Social gatherings"],
      },
      {
        id: "conflict", label: "How do you handle conflicts?", type: "radio",
        options: ["Talk immediately", "Take time, then talk", "Avoid conflict"],
      },
      {
        id: "relationshipPriority", label: "What matters most to you in a relationship?", type: "radio",
        options: ["Emotional connection", "Practical stability", "Physical attraction"],
      },
    ],
  },
  {
    id: 6,
    emoji: "💼",
    label: "Ambition",
    title: "Ambition & life goals",
    subtitle: "Where are you headed in life?",
    fields: [
      {
        id: "ambitionLevel", label: "Career ambition level", type: "radio",
        options: ["Stable / chill", "Growth-focused", "Highly ambitious"],
      },
      {
        id: "fiveYears", label: "Where do you see yourself in 5–10 years?", type: "radio",
        options: ["Stable settled life", "Career/business growth", "Travel/exploration"],
      },
    ],
  },
  {
    id: 7,
    emoji: "🏡",
    label: "Family",
    title: "Family & values",
    subtitle: "Shared values build lasting relationships.",
    fields: [
      { id: "familyImportance", label: "Family importance (1–5)", type: "scale", min: 1, max: 5 },
      { id: "religionImportance", label: "Religion importance (1–5)", type: "scale", min: 1, max: 5 },
      {
        id: "livingPreference", label: "Living preference after marriage", type: "radio",
        options: ["Nuclear", "Joint", "Flexible"],
      },
      {
        id: "familyInvolvement", label: "Family involvement in decisions", type: "radio",
        options: ["High", "Medium", "Low"],
      },
    ],
  },
  {
    id: 8,
    emoji: "❤️",
    label: "Preferences",
    title: "Partner preferences",
    subtitle: "Tell us what you're looking for.",
    fields: [
      { id: "preferredAge", label: "Preferred age range", type: "text", placeholder: "e.g. 24–28" },
      { id: "preferredCity", label: "Preferred city / location", type: "text", placeholder: "e.g. Delhi, Mumbai, or Any" },
      { id: "preferredHeight", label: "Preferred height range", type: "text", placeholder: "e.g. 5'4\" – 5'8\"" },
      {
        id: "partnerFitness", label: "Fitness preference in partner", type: "radio",
        options: ["Doesn't matter", "Somewhat fit", "Very fit"],
      },
      {
        id: "partnerDiet", label: "Diet preference in partner", type: "radio",
        options: ["Same as me", "Doesn't matter"],
      },
    ],
  },
  {
    id: 9,
    emoji: "🔥",
    label: "Attraction",
    title: "Attraction & filters",
    subtitle: "What draws you in and what's a dealbreaker?",
    fields: [
      {
        id: "attracts", label: "What attracts you most? (Select up to 2)", type: "multicheck",
        max: 2,
        options: ["Personality", "Looks", "Ambition", "Kindness"],
      },
      {
        id: "turnoffs", label: "Turn-offs (Select up to 3)", type: "multicheck",
        max: 3,
        options: ["Smoking", "Drinking", "Arrogance", "Lack of ambition", "Poor communication"],
      },
    ],
  },
  {
    id: 10,
    emoji: "🧠",
    label: "Deep Insights",
    title: "Deep insights",
    subtitle: "The most important section. Be honest.",
    fields: [
      {
        id: "whySingle", label: "Why are you still single?",
        type: "textarea", placeholder: "Be honest with yourself and us…",
      },
      {
        id: "idealPartner", label: "Describe your ideal partner",
        type: "textarea", placeholder: "Paint a picture of who you're looking for…",
      },
      {
        id: "noCompromise", label: "What are you NOT willing to compromise on?",
        type: "textarea", placeholder: "Your non-negotiables…",
      },
    ],
  },
  {
    id: 11,
    emoji: "🧬",
    label: "Compatibility",
    title: "Future compatibility",
    subtitle: "Planning ahead matters.",
    fields: [
      {
        id: "relocate", label: "Willing to relocate?", type: "radio",
        options: ["Yes", "No", "Depends"],
      },
      {
        id: "children", label: "Do you want children?", type: "radio",
        options: ["Yes", "No", "Not sure"],
      },
    ],
  },
  {
    id: 12,
    emoji: "📱",
    label: "Social",
    title: "Your social profile",
    subtitle: "Share your Instagram or Facebook ID so we can verify your profile.",
    fields: [
      { id: "instaId", label: "Instagram ID", type: "text", placeholder: "@your_instagram" },
      { id: "facebookId", label: "Facebook ID / Profile Name", type: "text", placeholder: "facebook.com/yourname" },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useFormData() {
  const [data, setData] = useState({});
  const set = (id, value) => setData((prev) => ({ ...prev, [id]: value }));
  return { data, set };
}

// ─── FIELD COMPONENTS ────────────────────────────────────────────────────────

function TextInput({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <input
        type={field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="field-input"
      />
    </div>
  );
}

function RadioGroup({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <div className="radio-grid">
        {field.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(field.id, opt)}
            className={`radio-btn ${value === opt ? "radio-btn-active" : ""}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiCheck({ field, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange(field.id, value.filter((v) => v !== opt));
    } else if (value.length < field.max) {
      onChange(field.id, [...value, opt]);
    }
  };
  return (
    <div className="field-group">
      <label className="field-label">
        {field.label}
        <span className="ml-2 text-xs text-rose-400/70">({value.length}/{field.max} selected)</span>
      </label>
      <div className="radio-grid">
        {field.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`radio-btn ${value.includes(opt) ? "radio-btn-active" : ""} ${
              !value.includes(opt) && value.length >= field.max ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScaleInput({ field, value, onChange }) {
  const nums = Array.from({ length: field.max - field.min + 1 }, (_, i) => i + field.min);
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <div className="flex gap-2 flex-wrap">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(field.id, n)}
            className={`scale-btn ${value === n ? "scale-btn-active" : ""}`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextareaInput({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <textarea
        placeholder={field.placeholder}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        rows={4}
        className="field-input resize-none"
      />
    </div>
  );
}


function renderField(field, value, set) {
  switch (field.type) {
    case "text":
    case "number":
      return <TextInput key={field.id} field={field} value={value} onChange={set} />;
    case "radio":
      return <RadioGroup key={field.id} field={field} value={value} onChange={set} />;
    case "multicheck":
      return <MultiCheck key={field.id} field={field} value={value} onChange={set} />;
    case "scale":
      return <ScaleInput key={field.id} field={field} value={value} onChange={set} />;
    case "textarea":
      return <TextareaInput key={field.id} field={field} value={value} onChange={set} />;
    default:
      return null;
  }
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">{pct}% complete</span>
    </div>
  );
}

// ─── STEP DOTS ───────────────────────────────────────────────────────────────

function StepDots({ sections, current }) {
  return (
    <div className="step-dots">
      {sections.map((s, i) => (
        <div
          key={s.id}
          title={s.label}
          className={`step-dot ${i < current ? "dot-done" : i === current ? "dot-active" : "dot-future"}`}
        />
      ))}
    </div>
  );
}

// ─── SUCCESS SCREEN ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="success-screen">
      <div className="success-ring">
        <span className="success-check">✅</span>
      </div>
      <h2 className="success-title">Application Received</h2>
      <p className="success-msg">
        If selected, we'll contact you on WhatsApp within <strong>24–48 hours</strong>.
      </p>
      <div className="success-badge">
        ⚠️ Only serious profiles are approved.
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function IntentDatingForm() {
  const [step, setStep] = useState(0); // 0 = landing
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [animDir, setAnimDir] = useState("forward");
  const [visible, setVisible] = useState(true);
  const { data, set } = useFormData();
  const containerRef = useRef();

  const goTo = (nextSection, dir = "forward") => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setSection(nextSection);
      setVisible(true);
    }, 280);
  };

  const handleNext = async () => {
    if (section < SECTIONS.length - 1) {
      goTo(section + 1, "forward");
    } else {
      // Last section — submit
      setSubmitting(true);
      setSubmitError("");
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        }
        const res = await fetch("/api/apply", { method: "POST", body: formData });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Submission failed");
        setSubmitted(true);
      } catch (err) {
        setSubmitError(err.message || "Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (section > 0) goTo(section - 1, "back");
  };

  const currentSection = SECTIONS[section];

  if (step === 0) {
    return (
      <>
        <Style />
        <div className="page-root">
          <div className="landing-card">
            <div className="landing-badge">Curated Matchmaking</div>
            <h1 className="landing-title">
              Intent Dating
              <br />
              <span className="landing-title-accent">Serious Only.</span>
            </h1>
            <ul className="landing-list">
              <li>✔ No timepass</li>
              <li>✔ No swiping</li>
              <li>✔ Curated matches only</li>
            </ul>
            <p className="landing-note">⚠️ We approve limited profiles each week.</p>
            <button onClick={() => setStep(1)} className="btn-primary w-full mt-8">
              Apply Now →
            </button>
          </div>
        </div>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Style />
        <div className="page-root">
          <SuccessScreen />
        </div>
      </>
    );
  }

  return (
    <>
      <Style />
      <div className="page-root">
        <div className="form-shell" ref={containerRef}>
          {/* Header */}
          <div className="form-header">
            <div className="form-logo">Intent Dating</div>
            <ProgressBar current={section + 1} total={SECTIONS.length} />
          </div>

          {/* Step Dots */}
          <StepDots sections={SECTIONS} current={section} />

          {/* Section Card */}
          <div
            className={`section-card ${visible ? "section-enter" : animDir === "forward" ? "section-exit-left" : "section-exit-right"}`}
          >
            <div className="section-emoji">{currentSection.emoji}</div>
            <h2 className="section-title">{currentSection.title}</h2>
            <p className="section-subtitle">{currentSection.subtitle}</p>

            <div className="fields-wrap">
              {currentSection.fields.map((field) =>
                renderField(field, data[field.id], set)
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="form-nav">
            {section > 0 && (
              <button onClick={handleBack} className="btn-ghost" disabled={submitting}>
                ← Back
              </button>
            )}
            <div className="ml-auto" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
              {submitError && (
                <p style={{ color: "#e07b64", fontSize: "13px", textAlign: "right" }}>{submitError}</p>
              )}
              <button onClick={handleNext} className="btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Submitting…" : section === SECTIONS.length - 1 ? "Submit Application ✓" : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

function Style() {
  return (
    <style href="intent-dating-form" precedence="default">{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg: #0d0a0b;
        --surface: #161113;
        --surface2: #1e181a;
        --border: rgba(220,160,140,0.12);
        --rose: #c9614a;
        --rose-light: #e07b64;
        --gold: #c8a96e;
        --text: #f0e8e2;
        --text-muted: #a09088;
        --input-bg: #1a1315;
        --radius: 14px;
      }

      html, body { height: 100%; background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); }

      /* Layout */
      .page-root {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 16px;
        background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,80,60,0.12) 0%, transparent 70%),
                    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(120,60,40,0.08) 0%, transparent 60%),
                    var(--bg);
      }

      /* LANDING */
      .landing-card {
        max-width: 440px;
        width: 100%;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 24px;
        padding: 52px 40px;
        text-align: center;
        box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,120,90,0.06);
      }
      .landing-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--gold);
        border: 1px solid rgba(200,169,110,0.3);
        padding: 4px 14px;
        border-radius: 100px;
        margin-bottom: 28px;
      }
      .landing-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 52px;
        font-weight: 600;
        line-height: 1.1;
        margin-bottom: 28px;
        color: var(--text);
      }
      .landing-title-accent { color: var(--rose-light); font-style: italic; }
      .landing-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 15px;
        color: var(--text-muted);
        margin-bottom: 4px;
      }
      .landing-list li { color: var(--text-muted); }
      .landing-note {
        font-size: 13px;
        color: rgba(200,169,110,0.7);
        margin-top: 20px;
      }

      /* FORM SHELL */
      .form-shell {
        max-width: 560px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      /* HEADER */
      .form-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .form-logo {
        font-family: 'Cormorant Garamond', serif;
        font-size: 22px;
        font-weight: 600;
        color: var(--rose-light);
        white-space: nowrap;
        letter-spacing: 0.3px;
      }

      /* PROGRESS */
      .progress-wrap { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
      .progress-track {
        flex: 1;
        height: 3px;
        background: var(--surface2);
        border-radius: 100px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--rose), var(--rose-light));
        border-radius: 100px;
        transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
      }
      .progress-label {
        font-size: 11px;
        color: var(--text-muted);
        white-space: nowrap;
      }

      /* STEP DOTS */
      .step-dots {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 8px;
      }
      .step-dot {
        width: 6px;
        height: 6px;
        border-radius: 100px;
        transition: all 0.3s ease;
      }
      .dot-done { background: var(--rose); width: 14px; }
      .dot-active { background: var(--rose-light); width: 20px; box-shadow: 0 0 8px rgba(201,97,74,0.5); }
      .dot-future { background: var(--surface2); }

      /* SECTION CARD */
      .section-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 36px 32px 28px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        transition: opacity 0.25s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1);
      }
      .section-enter { opacity: 1; transform: translateX(0) scale(1); }
      .section-exit-left { opacity: 0; transform: translateX(-24px) scale(0.98); }
      .section-exit-right { opacity: 0; transform: translateX(24px) scale(0.98); }

      .section-emoji { font-size: 32px; margin-bottom: 12px; }
      .section-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 32px;
        font-weight: 600;
        color: var(--text);
        line-height: 1.2;
        margin-bottom: 6px;
      }
      .section-subtitle {
        font-size: 14px;
        color: var(--text-muted);
        margin-bottom: 28px;
      }

      /* FIELDS */
      .fields-wrap { display: flex; flex-direction: column; gap: 24px; }
      .field-group { display: flex; flex-direction: column; gap: 8px; }
      .field-label {
        font-size: 13px;
        font-weight: 500;
        color: var(--text-muted);
        letter-spacing: 0.3px;
        text-transform: uppercase;
        font-size: 11.5px;
      }

      /* Text / Number / Textarea */
      .field-input {
        width: 100%;
        background: var(--input-bg);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 13px 16px;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        color: var(--text);
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .field-input::placeholder { color: rgba(160,144,136,0.5); }
      .field-input:focus {
        border-color: rgba(201,97,74,0.5);
        box-shadow: 0 0 0 3px rgba(201,97,74,0.1);
      }

      /* Radio Buttons */
      .radio-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .radio-btn {
        padding: 9px 18px;
        background: var(--input-bg);
        border: 1px solid var(--border);
        border-radius: 100px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.18s ease;
      }
      .radio-btn:hover { border-color: rgba(201,97,74,0.4); color: var(--text); }
      .radio-btn-active {
        background: rgba(201,97,74,0.15);
        border-color: var(--rose);
        color: var(--rose-light);
        font-weight: 500;
      }

      /* Scale Buttons */
      .scale-btn {
        width: 44px;
        height: 44px;
        background: var(--input-bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.18s ease;
      }
      .scale-btn:hover { border-color: rgba(201,97,74,0.4); color: var(--text); }
      .scale-btn-active {
        background: rgba(201,97,74,0.15);
        border-color: var(--rose);
        color: var(--rose-light);
        font-weight: 500;
      }

      /* File Drop Zone */
      .file-drop-zone {
        border: 2px dashed var(--border);
        border-radius: var(--radius);
        padding: 40px 20px;
        text-align: center;
        cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
      }
      .file-drop-zone:hover {
        border-color: rgba(201,97,74,0.4);
        background: rgba(201,97,74,0.04);
      }

      /* Navigation */
      .form-nav {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 2px;
      }

      /* Buttons */
      .btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        background: linear-gradient(135deg, var(--rose) 0%, var(--rose-light) 100%);
        border: none;
        border-radius: 100px;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.2s, transform 0.15s;
        box-shadow: 0 4px 24px rgba(201,97,74,0.3);
      }
      .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
      .btn-primary:active { transform: translateY(0); }

      .btn-ghost {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 20px;
        background: transparent;
        border: 1px solid var(--border);
        border-radius: 100px;
        font-family: 'DM Sans', sans-serif;
        font-size: 15px;
        color: var(--text-muted);
        cursor: pointer;
        transition: all 0.18s;
      }
      .btn-ghost:hover { border-color: rgba(201,97,74,0.3); color: var(--text); }

      .w-full { width: 100%; }
      .ml-auto { margin-left: auto; }
      .mt-8 { margin-top: 32px; }
      .ml-2 { margin-left: 8px; }
      .text-xs { font-size: 12px; }
      .text-rose-400\\/70 { color: rgba(201,97,74,0.7); }

      /* SUCCESS SCREEN */
      .success-screen {
        text-align: center;
        padding: 60px 32px;
        max-width: 440px;
        width: 100%;
      }
      .success-ring {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        background: rgba(201,97,74,0.1);
        border: 2px solid rgba(201,97,74,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 28px;
        font-size: 36px;
        animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes pop {
        0% { transform: scale(0); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .success-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 40px;
        font-weight: 600;
        margin-bottom: 16px;
        color: var(--text);
      }
      .success-msg {
        font-size: 15px;
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: 24px;
      }
      .success-msg strong { color: var(--rose-light); }
      .success-badge {
        display: inline-block;
        background: rgba(200,169,110,0.1);
        border: 1px solid rgba(200,169,110,0.25);
        color: var(--gold);
        font-size: 13px;
        padding: 10px 20px;
        border-radius: 100px;
      }

      @media (max-width: 480px) {
        .landing-card { padding: 40px 24px; }
        .landing-title { font-size: 40px; }
        .section-card { padding: 28px 20px 24px; }
        .section-title { font-size: 26px; }
        .scale-btn { width: 38px; height: 38px; font-size: 14px; }
      }
    `}</style>
  );
}