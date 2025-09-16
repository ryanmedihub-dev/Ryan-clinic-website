"use client";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  User,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Globe,
} from "lucide-react";

export default function InternationalAppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    branch: "Delhi",
    visit: "",
    notes: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Auto-detect country (preselect in dropdown)
  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setFormData((prev) => ({ ...prev, country: data.country_name || "" }));
      } catch (error) {
        console.error("Location fetch failed:", error);
      }
    }
    fetchLocation();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-international", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Appointment booked successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          branch: "",
          visit: "",
          notes: "",
          country: "",
        });
      } else {
        alert("❌ Failed to book. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong. Try again later.");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Book Your Appointment
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Fill in your details and we’ll confirm your appointment shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:bg-white rounded-2xl p-6 sm:p-8 md:border md:border-gray-200 md:shadow-md space-y-4 md:space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Preferred Date <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Preferred Time <span className="text-red-500"></span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min="09:00"
                  max="19:00"
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              When do you plan for hair transplant{" "}
              <span className="text-red-500"></span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="visit"
                value={formData.visit}
                onChange={handleChange}
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="within week">Within a week</option>
                <option value="within month">Within a month</option>
                <option value="next 2-3 month">Next 2-3 month</option>
                <option value="not sure">Not Sure</option>
              </select>
            </div>
          </div>

          {/* Branch */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Branch <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
              >
                <option value="">Choose a branch</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
          </div> */}

          {/* Country Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Which brach are you comfortable to visit <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900"
              >
                <option value="">Select Branch</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
              
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Notes / Concerns
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special concerns..."
                rows="3"
                className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 md:py-4 rounded-lg font-semibold text-white text-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}
