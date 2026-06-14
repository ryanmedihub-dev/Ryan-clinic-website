"use client";

import { useState } from "react";

export default function FooterCallbackForm() {
  const [formData, setFormData] = useState({
    formtype: "Footer Callback",
    name: "",
    email: "",
    phone: "",
    location: "Delhi",
    source: "Main Website",
  });
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("We'll call you back shortly!");
        setFormData((prev) => ({ ...prev, name: "", email: "", phone: "" }));
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e5e5e5",
    borderRadius: "10px",
    padding: "11px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Form header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="block w-1 h-5 rounded-full"
            style={{ background: "var(--primary-red)" }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--primary-red)" }}
          >
            Free Consultation
          </span>
        </div>
        <h5 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          Request a Callback
        </h5>
        <p className="text-xs mt-1.5" style={{ color: "#6b7280" }}>
          Our hair restoration expert will call you within 24 hours.
        </p>
      </div>

      {/* Name + Email row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="w-full">
          <label
            className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "#6b7280" }}
          >
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary-red)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
        </div>
        <div className="w-full">
          <label
            className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "#6b7280" }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary-red)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: "#6b7280" }}
        >
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          required
          style={inputStyle}
          onFocus={(e) =>
            (e.target.style.borderColor = "var(--primary-red)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,0.08)")
          }
        />
      </div>

      {/* Location */}
      <div>
        <label
          className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
          style={{ color: "#6b7280" }}
        >
          Nearest Branch
        </label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) =>
            (e.target.style.borderColor = "var(--primary-red)")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(255,255,255,0.08)")
          }
        >
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl text-white transition-opacity disabled:opacity-60"
        style={{ background: "var(--primary-red)", cursor: "pointer" }}
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Submitting…
          </>
        ) : (
          <>
            Book Free Consultation
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </>
        )}
      </button>

      <p className="text-[11px] text-center" style={{ color: "#4b5563" }}>
        Free scalp analysis · Graft count · Full cost breakdown — zero
        obligation.
      </p>
    </form>
  );
}
