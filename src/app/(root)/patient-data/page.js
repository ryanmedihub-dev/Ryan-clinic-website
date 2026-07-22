"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  User,
  Calendar,
  MessageSquare,
  Globe,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";

export default function InternationalAppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    notes: "",
    country: "",
    agentName: "",
    teamLeaderName: "",
    packageAmount: "",
    technique: "",
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

    const phoneClean = (formData.phone || "").replace(/[\s-]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    console.log(formData);

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
          date: "",
          notes: "",
          country: "",
          agentName: "",
          teamLeaderName: "",
          packageAmount: "",
          technique: "",
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Book Your International Appointment
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Fill in your details below and we'll confirm your appointment shortly.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg shadow-blue-100/50"
        >
          {/* Personal Information Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
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
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
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
                    minLength={10}
                    maxLength={15}
                    pattern="[0-9+\s-]{10,15}"
                    placeholder="+91 92179 58539"
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Branch Selection */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Preferred Branch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select Branch</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Guwahati">Guwahati</option>
                    <option value="Prayagraj">Prayagraj</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Calicut">Calicut</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Kochi">Kochi</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Jalandhar">Jalandhar</option>
                    <option value="Ludhiana">Ludhiana</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Pune">Pune</option>
                    <option value="Patna">Patna</option>
                    <option value="Himachal">Himachal</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Team Information Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Team Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Agent Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Agent Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="agentName"
                    value={formData.agentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter agent name"
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Team Leader Name */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Team Leader Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleChange}
                    required
                    placeholder="Enter team leader name"
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Service Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Package Amount */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Package Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="packageAmount"
                    value={formData.packageAmount}
                    onChange={handleChange}
                    required
                    placeholder="Enter package amount"
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Technique */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-medium">
                  Technique <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Settings className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <select
                    name="technique"
                    value={formData.technique}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Select Technique</option>
                    <option value="Turkish DHI">Turkish DHI</option>
                    <option value="FUE">FUE</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Indian DHI">Indian DHI</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Additional Information
            </h3>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">
                Notes / Concerns
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special concerns, medical history, or specific requirements you'd like to share..."
                  rows="4"
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-2/3 py-3 rounded-xl font-semibold text-white text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Book Appointment Now"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}