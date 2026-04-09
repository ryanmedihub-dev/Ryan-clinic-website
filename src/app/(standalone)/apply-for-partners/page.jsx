"use client";
import { useState, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 1, emoji: "🌸", label: "Basic Info",
    title: "Tell us about yourself",
    subtitle: "Let's start with the essentials.",
    fields: [
      { id: "fullName",   label: "Full Name",            type: "text",   placeholder: "Your full name" },
      { id: "age",        label: "Age",                  type: "number", placeholder: "Your age" },
      { id: "gender",     label: "Gender",               type: "radio",  options: ["Male", "Female", "Other"] },
      { id: "city",       label: "City",                 type: "text",   placeholder: "Your city" },
      { id: "profession", label: "Profession",           type: "text",   placeholder: "Your profession" },
      { id: "income",     label: "Monthly Income Range", type: "radio",  options: ["Below ₹30k", "₹30k–₹60k", "₹60k–₹1L", "₹1L–₹2L", "₹2L+"] },
    ],
  },
  {
    id: 2, emoji: "💌", label: "Intent",
    title: "Your intent & seriousness",
    subtitle: "We match only serious individuals.",
    fields: [
      { id: "lookingFor",        label: "What are you looking for?",        type: "radio", options: ["Serious relationship", "Marriage", "Not sure"] },
      { id: "marriageTimeline",  label: "When do you want to get married?", type: "radio", options: ["Within 1 year", "1–2 years", "2+ years", "Not sure"] },
      { id: "seriousnessScore",  label: "How serious are you? (1–10)",      type: "scale", min: 1, max: 10 },
      { id: "whyNow",            label: "Why do you want a serious relationship now?", type: "textarea", placeholder: "Share your thoughts honestly…" },
    ],
  },
  {
    id: 3, emoji: "🌿", label: "Lifestyle",
    title: "Your lifestyle",
    subtitle: "Compatibility starts with how you live.",
    fields: [
      { id: "smoke",     label: "Do you smoke?",         type: "radio", options: ["Yes", "No", "Occasionally"] },
      { id: "drink",     label: "Do you drink?",         type: "radio", options: ["Yes", "No", "Occasionally"] },
      { id: "lifestyle", label: "Your lifestyle?",       type: "radio", options: ["Home person", "Balanced", "Party"] },
      { id: "weekend",   label: "Weekend preference",    type: "radio", options: ["Stay at home", "Go out occasionally", "Social / parties"] },
    ],
  },
  {
    id: 4, emoji: "✨", label: "Physical",
    title: "Physical & health",
    subtitle: "Honest answers help us find the right match.",
    fields: [
      { id: "height",       label: "Height",        type: "text",  placeholder: "e.g. 5'8\" or 172 cm" },
      { id: "bodyType",     label: "Body type",     type: "radio", options: ["Slim", "Average", "Fit", "Athletic", "Heavy"] },
      { id: "fitnessLevel", label: "Fitness level", type: "radio", options: ["Not active", "Occasionally active", "Regularly active"] },
      { id: "diet",         label: "Diet preference", type: "radio", options: ["Vegetarian", "Non-vegetarian", "Eggetarian", "Vegan"] },
    ],
  },
  {
    id: 5, emoji: "🦋", label: "Personality",
    title: "Personality & energy",
    subtitle: "How you think, feel, and connect.",
    fields: [
      { id: "recharge",             label: "How do you recharge?",                     type: "radio", options: ["Alone", "With close people", "Social gatherings"] },
      { id: "conflict",             label: "How do you handle conflicts?",             type: "radio", options: ["Talk immediately", "Take time, then talk", "Avoid conflict"] },
      { id: "relationshipPriority", label: "What matters most in a relationship?",    type: "radio", options: ["Emotional connection", "Practical stability", "Physical attraction"] },
    ],
  },
  {
    id: 6, emoji: "🚀", label: "Ambition",
    title: "Ambition & life goals",
    subtitle: "Where are you headed in life?",
    fields: [
      { id: "ambitionLevel", label: "Career ambition level",             type: "radio", options: ["Stable / chill", "Growth-focused", "Highly ambitious"] },
      { id: "fiveYears",     label: "Where do you see yourself in 5–10 years?", type: "radio", options: ["Stable settled life", "Career/business growth", "Travel/exploration"] },
    ],
  },
  {
    id: 7, emoji: "🏡", label: "Family",
    title: "Family & values",
    subtitle: "Shared values build lasting relationships.",
    fields: [
      { id: "familyImportance",   label: "Family importance (1–5)",             type: "scale", min: 1, max: 5 },
      { id: "religionImportance", label: "Religion importance (1–5)",           type: "scale", min: 1, max: 5 },
      { id: "livingPreference",   label: "Living preference after marriage",    type: "radio", options: ["Nuclear", "Joint", "Flexible"] },
      { id: "familyInvolvement",  label: "Family involvement in decisions",     type: "radio", options: ["High", "Medium", "Low"] },
    ],
  },
  {
    id: 8, emoji: "🌹", label: "Preferences",
    title: "Partner preferences",
    subtitle: "Tell us what you're looking for.",
    fields: [
      { id: "preferredAge",    label: "Preferred age range",      type: "text",  placeholder: "e.g. 24–28" },
      { id: "preferredCity",   label: "Preferred city / location", type: "text", placeholder: "e.g. Delhi, Mumbai, or Any" },
      { id: "preferredHeight", label: "Preferred height range",   type: "text",  placeholder: "e.g. 5'4\" – 5'8\"" },
      { id: "partnerFitness",  label: "Fitness preference in partner", type: "radio", options: ["Doesn't matter", "Somewhat fit", "Very fit"] },
      { id: "partnerDiet",     label: "Diet preference in partner",   type: "radio", options: ["Same as me", "Doesn't matter"] },
    ],
  },
  {
    id: 9, emoji: "🔥", label: "Attraction",
    title: "Attraction & filters",
    subtitle: "What draws you in and what's a dealbreaker?",
    fields: [
      { id: "attracts",  label: "What attracts you most? (up to 2)", type: "multicheck", max: 2, options: ["Personality", "Looks", "Ambition", "Kindness"] },
      { id: "turnoffs",  label: "Turn-offs (up to 3)",               type: "multicheck", max: 3, options: ["Smoking", "Drinking", "Arrogance", "Lack of ambition", "Poor communication"] },
    ],
  },
  {
    id: 10, emoji: "💭", label: "Deep Insights",
    title: "Deep insights",
    subtitle: "The most important section. Be honest.",
    fields: [
      { id: "whySingle",    label: "Why are you still single?",               type: "textarea", placeholder: "Be honest with yourself and us…" },
      { id: "idealPartner", label: "Describe your ideal partner",             type: "textarea", placeholder: "Paint a picture of who you're looking for…" },
      { id: "noCompromise", label: "What are you NOT willing to compromise on?", type: "textarea", placeholder: "Your non-negotiables…" },
    ],
  },
  {
    id: 11, emoji: "🌍", label: "Compatibility",
    title: "Future compatibility",
    subtitle: "Planning ahead matters.",
    fields: [
      { id: "relocate",  label: "Willing to relocate?",     type: "radio", options: ["Yes", "No", "Depends"] },
      { id: "children",  label: "Do you want children?",    type: "radio", options: ["Yes", "No", "Not sure"] },
    ],
  },
  {
    id: 12, emoji: "📱", label: "Social",
    title: "Your social profile",
    subtitle: "Share your Instagram or Facebook ID so we can verify your profile.",
    fields: [
      { id: "instaId",    label: "Instagram ID",           type: "text", placeholder: "@your_instagram" },
      { id: "facebookId", label: "Facebook ID / Profile Name", type: "text", placeholder: "facebook.com/yourname" },
    ],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useFormData() {
  const [data, setData] = useState({});
  const set = (id, value) => setData((p) => ({ ...p, [id]: value }));
  return { data, set };
}

// ─── FIELD COMPONENTS ────────────────────────────────────────────────────────

function TextInput({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <input type={field.type === "number" ? "number" : "text"} placeholder={field.placeholder}
        value={value || ""} onChange={(e) => onChange(field.id, e.target.value)} className="field-input" />
    </div>
  );
}

function RadioGroup({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <div className="radio-grid">
        {field.options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(field.id, opt)}
            className={`chip ${value === opt ? "chip-active" : ""}`}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

function MultiCheck({ field, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(field.id, value.filter((v) => v !== opt));
    else if (value.length < field.max) onChange(field.id, [...value, opt]);
  };
  return (
    <div className="field-group">
      <label className="field-label">
        {field.label}
        <span className="mc-count"> {value.length}/{field.max}</span>
      </label>
      <div className="radio-grid">
        {field.options.map((opt) => (
          <button key={opt} type="button" onClick={() => toggle(opt)}
            className={`chip ${value.includes(opt) ? "chip-active" : ""} ${!value.includes(opt) && value.length >= field.max ? "chip-disabled" : ""}`}>
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
      <div className="scale-row">
        {nums.map((n) => (
          <button key={n} type="button" onClick={() => onChange(field.id, n)}
            className={`scale-btn ${value === n ? "scale-btn-active" : ""}`}>{n}</button>
        ))}
      </div>
    </div>
  );
}

function TextareaInput({ field, value, onChange }) {
  return (
    <div className="field-group">
      <label className="field-label">{field.label}</label>
      <textarea placeholder={field.placeholder} value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        rows={4} className="field-input field-textarea" />
    </div>
  );
}

function renderField(field, value, set) {
  switch (field.type) {
    case "text":
    case "number":     return <TextInput key={field.id} field={field} value={value} onChange={set} />;
    case "radio":      return <RadioGroup key={field.id} field={field} value={value} onChange={set} />;
    case "multicheck": return <MultiCheck key={field.id} field={field} value={value} onChange={set} />;
    case "scale":      return <ScaleInput key={field.id} field={field} value={value} onChange={set} />;
    case "textarea":   return <TextareaInput key={field.id} field={field} value={value} onChange={set} />;
    default: return null;
  }
}

// ─── PROGRESS BAR ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-label">{pct}%</span>
    </div>
  );
}

// ─── STEP DOTS ───────────────────────────────────────────────────────────────

function StepDots({ sections, current }) {
  return (
    <div className="step-dots">
      {sections.map((s, i) => (
        <div key={s.id} title={s.label}
          className={`step-dot ${i < current ? "dot-done" : i === current ? "dot-active" : "dot-future"}`} />
      ))}
    </div>
  );
}

// ─── BACKGROUND ──────────────────────────────────────────────────────────────

// Soft sparkle & petal particles — no hearts
const SPARKLES = [
  { type: "star",   x: "6%",  y: "10%", size: 8,  delay: 0,    dur: 7,  op: 0.55 },
  { type: "dot",    x: "14%", y: "35%", size: 6,  delay: 1.2,  dur: 9,  op: 0.4  },
  { type: "star",   x: "25%", y: "78%", size: 10, delay: 3,    dur: 8,  op: 0.5  },
  { type: "dot",    x: "38%", y: "15%", size: 5,  delay: 5,    dur: 11, op: 0.35 },
  { type: "ring",   x: "50%", y: "60%", size: 22, delay: 2,    dur: 13, op: 0.22 },
  { type: "star",   x: "62%", y: "88%", size: 9,  delay: 6,    dur: 7,  op: 0.48 },
  { type: "dot",    x: "72%", y: "22%", size: 7,  delay: 0.5,  dur: 10, op: 0.38 },
  { type: "ring",   x: "82%", y: "55%", size: 18, delay: 4,    dur: 14, op: 0.20 },
  { type: "star",   x: "90%", y: "12%", size: 7,  delay: 7,    dur: 8,  op: 0.5  },
  { type: "dot",    x: "92%", y: "80%", size: 5,  delay: 2.5,  dur: 9,  op: 0.4  },
  { type: "star",   x: "32%", y: "48%", size: 6,  delay: 8,    dur: 12, op: 0.3  },
  { type: "ring",   x: "18%", y: "90%", size: 14, delay: 1,    dur: 15, op: 0.18 },
  { type: "dot",    x: "56%", y: "5%",  size: 4,  delay: 9,    dur: 8,  op: 0.45 },
  { type: "star",   x: "78%", y: "70%", size: 11, delay: 3.5,  dur: 9,  op: 0.42 },
];

function Background() {
  return (
    <div className="bg-wrap" aria-hidden="true">
      {/* Watercolour blobs */}
      <div className="blob b1" /><div className="blob b2" />
      <div className="blob b3" /><div className="blob b4" /><div className="blob b5" />
      {/* Sparkle particles */}
      {SPARKLES.map((p, i) => {
        if (p.type === "star") return (
          <svg key={i} className="sparkle sparkle-star" viewBox="0 0 20 20"
            style={{ left: p.x, top: p.y, width: p.size * 2.2, height: p.size * 2.2, opacity: p.op, animationDelay: p.delay + "s", animationDuration: p.dur + "s" }}>
            <path d="M10 1 L11.8 7.6 L18.5 7.6 L13.1 11.8 L15 18.4 L10 14.2 L5 18.4 L6.9 11.8 L1.5 7.6 L8.2 7.6 Z" fill="currentColor" />
          </svg>
        );
        if (p.type === "dot") return (
          <div key={i} className="sparkle sparkle-dot"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.op, animationDelay: p.delay + "s", animationDuration: p.dur + "s" }} />
        );
        return (
          <div key={i} className="sparkle sparkle-ring"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, opacity: p.op, animationDelay: p.delay + "s", animationDuration: p.dur + "s" }} />
        );
      })}
    </div>
  );
}

// ─── PAYMENT SCREEN ──────────────────────────────────────────────────────────

function PaymentScreen({ onPay, paying, error }) {
  return (
    <div className="payment-screen">
      <div className="payment-icon-wrap">
        <span className="payment-icon">🌹</span>
      </div>
      <h2 className="payment-title">One Last Step</h2>
      <p className="payment-subtitle">Complete your registration with a monthly membership.</p>
      <div className="payment-card">
        <div className="payment-plan-header">
          <span className="payment-plan-badge">Monthly Membership</span>
        </div>
        <div className="payment-amount">
          <span className="payment-currency">₹</span>
          <span className="payment-price">99</span>
          <span className="payment-period">/month</span>
        </div>
        <ul className="payment-features">
          <li><span className="feat-dot" />Curated match suggestions</li>
          <li><span className="feat-dot" />Priority profile review</li>
          <li><span className="feat-dot" />Auto-renewed monthly</li>
          <li><span className="feat-dot" />Cancel anytime</li>
        </ul>
        <p className="payment-autopay-note">
          ↻ <strong>Auto-pay enabled</strong> — ₹99 auto-deducted every month.
        </p>
      </div>
      {error && <p className="payment-error">{error}</p>}
      <button onClick={onPay} className="btn-primary w-full" disabled={paying}
        style={{ opacity: paying ? 0.65 : 1, marginTop: "22px" }}>
        {paying ? "Opening Payment…" : <>Subscribe ₹99/month &amp; Register <span className="btn-arrow">→</span></>}
      </button>
      <p className="payment-secure">🔒 Secured by Razorpay</p>
    </div>
  );
}

// ─── SUCCESS SCREEN ──────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="success-screen">
      <div className="success-ring">
        <span className="success-check">✓</span>
      </div>
      <h2 className="success-title">Application Received</h2>
      <p className="success-msg">
        If selected, we'll contact you on WhatsApp within <strong>24–48 hours</strong>.
      </p>
      <div className="success-badge">🌸 Only serious profiles are approved.</div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function IntentDatingForm() {
  const [step, setStep] = useState(0);
  const [section, setSection] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [animDir, setAnimDir] = useState("forward");
  const [visible, setVisible] = useState(true);
  const { data, set } = useFormData();
  const containerRef = useRef();

  const goTo = (next, dir = "forward") => {
    setAnimDir(dir); setVisible(false);
    setTimeout(() => { setSection(next); setVisible(true); }, 280);
  };

  const submitForm = async (paymentId, orderId) => {
    setSubmitting(true); setSubmitError("");
    try {
      const fd = new FormData();
      for (const [k, v] of Object.entries(data)) {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else if (v !== undefined && v !== null) fd.append(k, v);
      }
      fd.append("razorpayPaymentId", paymentId);
      fd.append("razorpaySubscriptionId", orderId);
      fd.append("paymentStatus", "paid");
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally { setSubmitting(false); }
  };

  const handlePay = async () => {
    setPaying(true); setPaymentError("");
    try {
      const subRes = await fetch("/api/razorpay/create-subscription", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.fullName || "Applicant" }),
      });
      const subJson = await subRes.json();
      if (!subJson.success) throw new Error(subJson.message || "Could not initiate payment");
      await new Promise((res, rej) => {
        if (window.Razorpay) return res();
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = res; s.onerror = () => rej(new Error("Failed to load Razorpay"));
        document.body.appendChild(s);
      });
      await new Promise((res, rej) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          subscription_id: subJson.subscriptionId,
          name: "Intent Dating", description: "Monthly Membership – ₹99/month",
          handler: async (r) => {
            try {
              const vr = await fetch("/api/razorpay/verify-payment", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ razorpay_payment_id: r.razorpay_payment_id, razorpay_subscription_id: r.razorpay_subscription_id, razorpay_signature: r.razorpay_signature }),
              });
              const vj = await vr.json();
              if (!vj.success) throw new Error("Payment verification failed");
              await submitForm(r.razorpay_payment_id, r.razorpay_subscription_id);
              res();
            } catch (e) { rej(e); }
          },
          prefill: { name: data.fullName || "" },
          theme: { color: "#D4607A" },
          modal: { ondismiss: () => rej(new Error("Payment cancelled. Please try again.")) },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (r) => rej(new Error(r.error?.description || "Payment failed")));
        rzp.open();
      });
    } catch (err) {
      setPaymentError(err.message || "Payment failed. Please try again.");
    } finally { setPaying(false); }
  };

  const handleNext = () => section < SECTIONS.length - 1 ? goTo(section + 1) : setShowPayment(true);
  const handleBack = () => section > 0 && goTo(section - 1, "back");
  const cur = SECTIONS[section];

  if (step === 0) return (
    <>
      <Style />
      <div className="page-root">
        <Background />
        <div className="landing-card">
          <div className="landing-eyebrow">✦ Curated Matchmaking ✦</div>
          <h1 className="landing-title">
            Find Your<br />
            <span className="landing-accent">Perfect Match</span>
          </h1>
          <div className="landing-tagline">Intent Dating — Serious Only.</div>
          <div className="landing-divider">
            <div className="divider-line" /><span className="divider-icon">🌸</span><div className="divider-line" />
          </div>
          <ul className="landing-list">
            <li><span className="list-icon">✦</span>No timepass</li>
            <li><span className="list-icon">✦</span>No swiping</li>
            <li><span className="list-icon">✦</span>Curated matches only</li>
          </ul>
          <p className="landing-note">
            <span className="note-pulse" />
            Limited profiles approved each week
          </p>
          <button onClick={() => setStep(1)} className="btn-primary w-full mt-8">
            Apply Now <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </>
  );

  if (submitted) return (<><Style /><div className="page-root"><Background /><SuccessScreen /></div></>);

  if (showPayment) return (
    <>
      <Style />
      <div className="page-root">
        <Background />
        {submitting ? (
          <div className="success-screen">
            <div className="success-ring" style={{ animation: "spin 1.2s linear infinite" }}>
              <span style={{ fontSize: "26px" }}>⏳</span>
            </div>
            <h2 className="success-title" style={{ fontSize: "26px" }}>Submitting your application…</h2>
          </div>
        ) : <PaymentScreen onPay={handlePay} paying={paying} error={paymentError || submitError} />}
      </div>
    </>
  );

  return (
    <>
      <Style />
      <div className="page-root">
        <Background />
        <div className="form-shell" ref={containerRef}>
          <div className="form-header">
            <div className="form-logo">🌸 Intent Dating</div>
            <ProgressBar current={section + 1} total={SECTIONS.length} />
          </div>
          <StepDots sections={SECTIONS} current={section} />
          <div className={`section-card ${visible ? "s-enter" : animDir === "forward" ? "s-exit-l" : "s-exit-r"}`}>
            <div className="section-emoji">{cur.emoji}</div>
            <h2 className="section-title">{cur.title}</h2>
            <p className="section-subtitle">{cur.subtitle}</p>
            <div className="fields-wrap">
              {cur.fields.map((f) => renderField(f, data[f.id], set))}
            </div>
          </div>
          <div className="form-nav">
            {section > 0 && (
              <button onClick={handleBack} className="btn-ghost" disabled={submitting}>← Back</button>
            )}
            <div className="nav-right">
              {submitError && <p className="submit-error">{submitError}</p>}
              <button onClick={handleNext} className="btn-primary" disabled={submitting}
                style={{ opacity: submitting ? 0.65 : 1 }}>
                {submitting ? "Submitting…" : section === SECTIONS.length - 1 ? "Submit Application" : "Continue"}
                {!submitting && <span className="btn-arrow">→</span>}
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
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Nunito:wght@300;400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        /* ── Sorbet Bloom palette ── */
        --bg:          #FFF6F2;
        --bg2:         #FFF0EC;

        /* Surfaces */
        --glass:       rgba(255, 252, 250, 0.82);
        --glass-2:     rgba(255, 242, 238, 0.75);
        --card-shadow: 0 8px 48px rgba(212,96,122,0.10), 0 2px 12px rgba(212,96,122,0.06), 0 0 0 1px rgba(255,255,255,0.7) inset;
        --card-shadow-sm: 0 4px 24px rgba(212,96,122,0.08), 0 1px 6px rgba(212,96,122,0.05);

        /* Primary rose-coral */
        --rose:        #D4607A;
        --rose-mid:    #E0748B;
        --rose-light:  #EDA0B0;
        --rose-pale:   rgba(212,96,122,0.08);
        --rose-pale2:  rgba(212,96,122,0.14);

        /* Apricot (warm secondary) */
        --apricot:     #F09060;
        --apricot-lt:  #F5B49A;

        /* Lilac (cool accent) */
        --lilac:       #B88EC8;
        --lilac-pale:  rgba(184,142,200,0.12);

        /* Sage (fresh accent) */
        --sage:        #7AB89A;
        --sage-pale:   rgba(122,184,154,0.12);

        /* Text */
        --text:        #1E0A14;
        --text-muted:  #8A5868;
        --text-dim:    #BCA0AC;

        /* Borders */
        --border:      rgba(212,96,122,0.14);
        --border-mid:  rgba(212,96,122,0.28);
        --border-hi:   rgba(212,96,122,0.52);

        --radius:      14px;
        --radius-lg:   22px;
        --radius-xl:   28px;
      }

      html, body { height: 100%; background: var(--bg); font-family: 'Nunito', sans-serif; color: var(--text); }

      /* ── PAGE ROOT ─────────────────────────────────────────── */
      .page-root {
        min-height: 100vh;
        display: flex; align-items: center; justify-content: center;
        padding: 28px 16px; position: relative; overflow: hidden;
        background:
          radial-gradient(ellipse 80% 50% at 10% 0%,   rgba(212,96,122,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 92% 100%,  rgba(240,144,96,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 55%,   rgba(184,142,200,0.08) 0%, transparent 55%),
          var(--bg);
      }

      /* ── BACKGROUND BLOBS ──────────────────────────────────── */
      .bg-wrap { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }

      .blob { position: absolute; border-radius: 50%; filter: blur(72px); }
      .b1 { width: 550px; height: 550px; background: radial-gradient(circle, rgba(212,96,122,0.18) 0%, transparent 65%);   top: -180px; left: -140px; animation: bf1 16s ease-in-out infinite; }
      .b2 { width: 460px; height: 460px; background: radial-gradient(circle, rgba(240,144,96,0.14) 0%, transparent 65%);   bottom: -120px; right: -110px; animation: bf2 20s ease-in-out infinite; }
      .b3 { width: 380px; height: 380px; background: radial-gradient(circle, rgba(184,142,200,0.12) 0%, transparent 65%);  top: 38%; left: 54%; animation: bf3 14s ease-in-out infinite; }
      .b4 { width: 300px; height: 300px; background: radial-gradient(circle, rgba(212,96,122,0.10) 0%, transparent 65%);   top: 12%; right: -70px; animation: bf4 18s ease-in-out infinite; }
      .b5 { width: 260px; height: 260px; background: radial-gradient(circle, rgba(122,184,154,0.10) 0%, transparent 65%);  bottom: 18%; left: 4%; animation: bf5 15s ease-in-out infinite; }
      @keyframes bf1 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(60px,70px)} 70%{transform:translate(-30px,80px)} }
      @keyframes bf2 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(-65px,-55px)} 70%{transform:translate(45px,-70px)} }
      @keyframes bf3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-70px,-45px) scale(1.1)} }
      @keyframes bf4 { 0%,100%{transform:translate(0,0)} 30%{transform:translate(-50px,38px)} 70%{transform:translate(28px,-48px)} }
      @keyframes bf5 { 0%,100%{transform:translate(0,0)} 45%{transform:translate(55px,-38px) scale(1.08)} }

      /* ── SPARKLE PARTICLES ─────────────────────────────────── */
      .sparkle { position: absolute; animation: sparkFloat ease-in-out infinite; color: var(--rose-mid); }
      .sparkle-dot { border-radius: 50%; background: var(--rose-light); }
      .sparkle-ring { border-radius: 50%; border: 1.5px solid var(--apricot-lt); background: transparent; }
      .sparkle-star { }
      @keyframes sparkFloat {
        0%,100% { transform: translate(0,0) scale(1) rotate(0deg);   opacity: inherit; }
        33%      { transform: translate(6px,-10px) scale(1.1) rotate(20deg); }
        66%      { transform: translate(-4px,7px) scale(0.9) rotate(-10deg); }
      }

      /* ── Z LAYER ───────────────────────────────────────────── */
      .form-shell, .landing-card, .success-screen, .payment-screen { position: relative; z-index: 2; }

      /* ── LANDING CARD ──────────────────────────────────────── */
      .landing-card {
        max-width: 430px; width: 100%;
        background: var(--glass);
        backdrop-filter: blur(28px) saturate(1.8);
        -webkit-backdrop-filter: blur(28px) saturate(1.8);
        border: 1px solid rgba(255,255,255,0.85);
        border-bottom: 1px solid rgba(212,96,122,0.12);
        border-radius: var(--radius-xl);
        padding: 52px 42px;
        text-align: center;
        box-shadow: var(--card-shadow);
      }

      .landing-eyebrow {
        display: inline-block;
        font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
        color: var(--rose); background: var(--rose-pale); border: 1px solid var(--border-mid);
        padding: 5px 18px; border-radius: 100px; margin-bottom: 30px;
      }

      .landing-title {
        font-family: 'Playfair Display', serif;
        font-size: 56px; font-weight: 500; line-height: 1.02;
        color: var(--text); letter-spacing: -0.5px; margin-bottom: 10px;
      }
      .landing-accent {
        font-style: italic;
        background: linear-gradient(130deg, var(--rose) 0%, var(--apricot) 60%, var(--lilac) 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .landing-tagline {
        font-size: 14px; font-weight: 400; color: var(--text-muted);
        letter-spacing: 0.8px; margin-bottom: 4px;
      }

      .landing-divider {
        display: flex; align-items: center; gap: 14px;
        margin: 24px 0;
      }
      .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--rose-light), transparent); }
      .divider-icon { font-size: 16px; }

      .landing-list {
        list-style: none; display: flex; flex-direction: column;
        gap: 10px; text-align: left;
      }
      .landing-list li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-muted); font-weight: 400; }
      .list-icon { font-size: 9px; color: var(--rose); }

      .landing-note {
        display: inline-flex; align-items: center; gap: 8px;
        font-size: 12px; color: rgba(212,96,122,0.8);
        background: rgba(212,96,122,0.06); border: 1px solid rgba(212,96,122,0.14);
        border-radius: 100px; padding: 7px 16px; margin-top: 20px;
      }
      .note-pulse {
        display: inline-block; width: 6px; height: 6px; border-radius: 50%;
        background: var(--rose); animation: pulse 2s ease-in-out infinite;
      }
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }

      /* ── FORM SHELL ────────────────────────────────────────── */
      .form-shell { max-width: 560px; width: 100%; display: flex; flex-direction: column; gap: 16px; }

      /* ── HEADER ────────────────────────────────────────────── */
      .form-header {
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        background: var(--glass); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.85); border-radius: 100px;
        padding: 11px 20px; box-shadow: var(--card-shadow-sm);
      }
      .form-logo {
        font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 500;
        background: linear-gradient(130deg, var(--rose), var(--apricot));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        white-space: nowrap; letter-spacing: 0.3px;
        display: flex; align-items: center; gap: 6px;
      }

      /* ── PROGRESS ──────────────────────────────────────────── */
      .progress-wrap { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
      .progress-track { flex: 1; height: 4px; background: rgba(212,96,122,0.1); border-radius: 100px; overflow: hidden; }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--rose), var(--rose-mid), var(--apricot));
        border-radius: 100px;
        transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 0 8px rgba(212,96,122,0.45);
      }
      .progress-label { font-size: 11px; font-weight: 700; color: var(--rose); white-space: nowrap; min-width: 26px; text-align: right; }

      /* ── STEP DOTS ─────────────────────────────────────────── */
      .step-dots { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; padding: 2px 8px; }
      .step-dot { height: 4px; border-radius: 100px; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
      .dot-done   { width: 14px; background: var(--rose-light); }
      .dot-active { width: 24px; background: linear-gradient(90deg, var(--rose), var(--apricot)); box-shadow: 0 0 10px rgba(212,96,122,0.5); }
      .dot-future { width: 6px; background: rgba(212,96,122,0.15); }

      /* ── SECTION CARD ──────────────────────────────────────── */
      .section-card {
        background: var(--glass);
        backdrop-filter: blur(28px) saturate(1.6);
        -webkit-backdrop-filter: blur(28px) saturate(1.6);
        border: 1px solid rgba(255,255,255,0.85);
        border-radius: var(--radius-xl);
        padding: 38px 32px 30px;
        box-shadow: var(--card-shadow);
        transition: opacity 0.24s ease, transform 0.28s cubic-bezier(0.4,0,0.2,1);
      }
      .s-enter  { opacity: 1; transform: translateX(0) scale(1); }
      .s-exit-l { opacity: 0; transform: translateX(-22px) scale(0.97); }
      .s-exit-r { opacity: 0; transform: translateX(22px) scale(0.97); }

      .section-emoji { font-size: 34px; margin-bottom: 14px; filter: drop-shadow(0 4px 10px rgba(212,96,122,0.2)); }
      .section-title {
        font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 500;
        color: var(--text); line-height: 1.12; margin-bottom: 6px; letter-spacing: -0.2px;
      }
      .section-subtitle { font-size: 14px; color: var(--text-muted); margin-bottom: 30px; line-height: 1.55; font-weight: 400; }

      /* ── FIELDS ────────────────────────────────────────────── */
      .fields-wrap { display: flex; flex-direction: column; gap: 24px; }
      .field-group { display: flex; flex-direction: column; gap: 9px; }
      .field-label {
        font-weight: 700; font-size: 10px; letter-spacing: 1.8px;
        text-transform: uppercase; color: var(--text-muted);
        display: flex; align-items: center;
      }
      .mc-count { font-size: 10px; color: var(--rose-light); margin-left: 8px; letter-spacing: 0; text-transform: none; font-weight: 500; }

      .field-input {
        width: 100%;
        background: rgba(255,255,255,0.92);
        border: 1.5px solid var(--border);
        border-radius: var(--radius);
        padding: 13px 16px;
        font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 400; color: var(--text);
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(212,96,122,0.04);
      }
      .field-input::placeholder { color: rgba(138,88,104,0.38); }
      .field-input:focus {
        border-color: var(--border-mid);
        box-shadow: 0 0 0 4px rgba(212,96,122,0.08), 0 2px 8px rgba(212,96,122,0.06);
      }
      .field-textarea { resize: none; line-height: 1.65; }

      /* ── CHIPS (radio) ─────────────────────────────────────── */
      .radio-grid { display: flex; flex-wrap: wrap; gap: 8px; }
      .chip {
        padding: 9px 18px;
        background: rgba(255,255,255,0.88);
        border: 1.5px solid var(--border);
        border-radius: 100px;
        font-family: 'Nunito', sans-serif; font-size: 13.5px; font-weight: 400;
        color: var(--text-muted); cursor: pointer;
        transition: all 0.18s ease;
        box-shadow: 0 2px 6px rgba(212,96,122,0.04);
      }
      .chip:hover {
        border-color: var(--border-mid); color: var(--rose);
        background: rgba(255,240,243,0.95);
        transform: translateY(-1px);
        box-shadow: 0 5px 14px rgba(212,96,122,0.12);
      }
      .chip-active {
        background: linear-gradient(135deg, rgba(212,96,122,0.10), rgba(240,144,96,0.08));
        border-color: var(--rose); color: var(--rose);
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(212,96,122,0.16), inset 0 1px 0 rgba(255,255,255,0.7);
      }
      .chip-disabled { opacity: 0.35; cursor: not-allowed; transform: none !important; }

      /* ── SCALE ─────────────────────────────────────────────── */
      .scale-row { display: flex; gap: 7px; flex-wrap: wrap; }
      .scale-btn {
        width: 44px; height: 44px;
        background: rgba(255,255,255,0.88); border: 1.5px solid var(--border);
        border-radius: 12px; font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 400;
        color: var(--text-muted); cursor: pointer; transition: all 0.18s ease;
        box-shadow: 0 2px 6px rgba(212,96,122,0.04);
      }
      .scale-btn:hover { border-color: var(--border-mid); color: var(--rose); transform: translateY(-2px); box-shadow: 0 7px 18px rgba(212,96,122,0.13); }
      .scale-btn-active {
        background: linear-gradient(135deg, var(--rose) 0%, var(--rose-mid) 50%, var(--apricot) 100%);
        border-color: transparent; color: #fff; font-weight: 700;
        box-shadow: 0 6px 22px rgba(212,96,122,0.38);
        transform: translateY(-1px);
      }

      /* ── NAV ───────────────────────────────────────────────── */
      .form-nav { display: flex; align-items: center; gap: 12px; padding: 0 2px; }
      .nav-right { margin-left: auto; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
      .submit-error { font-size: 12.5px; color: #C94A5E; text-align: right; font-weight: 500; }

      /* ── BUTTONS ───────────────────────────────────────────── */
      .btn-primary {
        display: inline-flex; align-items: center; justify-content: center; gap: 9px;
        padding: 14px 30px;
        background: linear-gradient(135deg, var(--rose) 0%, var(--rose-mid) 45%, var(--apricot) 100%);
        background-size: 200% 200%; animation: bgs 5s ease infinite;
        border: none; border-radius: 100px;
        font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 700; color: #fff;
        cursor: pointer; transition: transform 0.18s, box-shadow 0.18s;
        box-shadow: 0 8px 28px rgba(212,96,122,0.32), 0 2px 8px rgba(212,96,122,0.18);
        letter-spacing: 0.2px;
      }
      @keyframes bgs { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      .btn-primary:hover  { transform: translateY(-2px); box-shadow: 0 14px 38px rgba(212,96,122,0.40), 0 4px 12px rgba(240,144,96,0.2); }
      .btn-primary:active { transform: translateY(0); }
      .btn-arrow { font-size: 16px; display: inline-block; transition: transform 0.18s; }
      .btn-primary:hover .btn-arrow { transform: translateX(4px); }

      .btn-ghost {
        display: inline-flex; align-items: center; justify-content: center;
        padding: 14px 22px; background: rgba(255,255,255,0.7);
        border: 1.5px solid var(--border); border-radius: 100px;
        font-family: 'Nunito', sans-serif; font-size: 15px; font-weight: 500;
        color: var(--text-muted); cursor: pointer; transition: all 0.18s;
        box-shadow: 0 2px 8px rgba(212,96,122,0.04);
      }
      .btn-ghost:hover { border-color: var(--border-mid); color: var(--rose); background: rgba(255,240,243,0.9); }

      .w-full { width: 100%; }
      .mt-8   { margin-top: 32px; }

      /* ── SUCCESS ───────────────────────────────────────────── */
      .success-screen { text-align: center; padding: 64px 32px; max-width: 460px; width: 100%; }
      .success-ring {
        width: 96px; height: 96px; border-radius: 50%;
        background: linear-gradient(135deg, rgba(212,96,122,0.12), rgba(240,144,96,0.10));
        border: 2px solid rgba(212,96,122,0.22);
        display: flex; align-items: center; justify-content: center; margin: 0 auto 32px;
        animation: popIn 0.55s cubic-bezier(0.34,1.56,0.64,1);
        box-shadow: 0 12px 40px rgba(212,96,122,0.18), 0 0 0 8px rgba(212,96,122,0.05);
      }
      .success-check {
        font-size: 38px; font-weight: 300; font-family: 'Playfair Display', serif;
        background: linear-gradient(135deg, var(--rose), var(--apricot));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      @keyframes popIn { 0%{transform:scale(0);opacity:0} 100%{transform:scale(1);opacity:1} }
      .success-title {
        font-family: 'Playfair Display', serif; font-size: 44px; font-weight: 500;
        margin-bottom: 16px;
        background: linear-gradient(135deg, var(--text) 40%, var(--rose));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .success-msg { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 26px; }
      .success-msg strong { color: var(--rose); -webkit-text-fill-color: var(--rose); font-weight: 700; }
      .success-badge {
        display: inline-block; background: var(--rose-pale); border: 1px solid var(--border-mid);
        color: var(--rose); font-size: 13px; padding: 10px 24px; border-radius: 100px; font-weight: 600;
      }

      /* ── PAYMENT ───────────────────────────────────────────── */
      .payment-screen { max-width: 460px; width: 100%; display: flex; flex-direction: column; align-items: center; padding: 44px 24px; }
      .payment-icon-wrap {
        width: 76px; height: 76px; border-radius: 50%;
        background: linear-gradient(135deg, rgba(212,96,122,0.12), rgba(240,144,96,0.10));
        border: 1.5px solid rgba(212,96,122,0.22);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 20px; box-shadow: 0 8px 28px rgba(212,96,122,0.14);
      }
      .payment-icon { font-size: 32px; }
      .payment-title {
        font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 500;
        background: linear-gradient(135deg, var(--text) 40%, var(--rose));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        margin-bottom: 10px; text-align: center;
      }
      .payment-subtitle { font-size: 14px; color: var(--text-muted); text-align: center; margin-bottom: 28px; line-height: 1.65; }
      .payment-card {
        width: 100%; background: var(--glass); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
        border: 1px solid rgba(255,255,255,0.85); border-radius: var(--radius-xl); padding: 28px 24px;
        box-shadow: var(--card-shadow);
      }
      .payment-plan-header { margin-bottom: 18px; }
      .payment-plan-badge {
        font-size: 9.5px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
        color: var(--rose); border: 1px solid var(--border-mid); background: var(--rose-pale);
        padding: 5px 14px; border-radius: 100px; display: inline-block;
      }
      .payment-amount { display: flex; align-items: baseline; gap: 4px; margin-bottom: 22px; }
      .payment-currency {
        font-size: 24px; font-weight: 600;
        background: linear-gradient(135deg, var(--rose), var(--apricot));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .payment-price {
        font-family: 'Playfair Display', serif; font-size: 76px; font-weight: 500; line-height: 1;
        background: linear-gradient(135deg, var(--rose), var(--rose-mid), var(--apricot));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }
      .payment-period { font-size: 16px; color: var(--text-muted); font-weight: 400; }
      .payment-features { list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: var(--text-muted); margin-bottom: 22px; }
      .payment-features li { display: flex; align-items: center; gap: 10px; font-weight: 400; }
      .feat-dot { width: 7px; height: 7px; border-radius: 50%; background: linear-gradient(135deg, var(--rose), var(--apricot)); flex-shrink: 0; }
      .payment-autopay-note {
        font-size: 12.5px; color: rgba(212,96,122,0.85); background: rgba(212,96,122,0.06);
        border: 1px solid var(--border); border-radius: 12px; padding: 11px 15px; line-height: 1.65;
      }
      .payment-autopay-note strong { color: var(--rose); font-weight: 700; }
      .payment-error { color: #C94A5E; font-size: 13px; text-align: center; margin-top: 12px; font-weight: 600; }
      .payment-secure { font-size: 12px; color: var(--text-dim); margin-top: 16px; letter-spacing: 0.3px; }

      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

      @media (max-width: 480px) {
        .landing-card  { padding: 38px 22px; }
        .landing-title { font-size: 42px; }
        .section-card  { padding: 26px 18px 22px; }
        .section-title { font-size: 28px; }
        .scale-btn     { width: 38px; height: 38px; font-size: 13px; }
        .payment-price { font-size: 58px; }
        .form-header   { padding: 9px 14px; }
        .form-logo     { font-size: 14px; }
      }
    `}</style>
  );
}