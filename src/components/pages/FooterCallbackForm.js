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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold underline text-center mb-4">
        Request a Callback
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name*"
          required
          className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number*"
        required
        className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 px-4 text-sm rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Hyderabad">Hyderabad</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-300 text-black cursor-pointer font-semibold py-2 rounded hover:bg-gray-200 transition duration-300 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
