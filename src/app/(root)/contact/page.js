// pages/contact.js
"use client";

import Head from "next/head";
import { MapPin, PhoneCall, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AboutBanner from "../../../../public/uploads/about-banner.webp"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PageBanner from "@/components/layouts/pageBanner";

export default function ContactUs() {
  // ✅ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Ryan Clinic</title>
        <meta
          name="description"
          content="Contact our clinic for appointments and inquiries"
        />
      </Head>

      <main>
        {/* ✅ Banner */}
        <PageBanner
          title="Contact Us"
          description="Regain your confidence with world-class Turkey's Technique hair restoration at Turkey's top-rated Ryan Clinic!"
          url={AboutBanner}
        />

        {/* ✅ Contact Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Left Side - Contact Info */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                  Get in Touch
                </h2>

                {/* Address 1 */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Delhi Clinic
                    </h3>
                    <p className="text-gray-600 text-sm">
                      CD 163, Block CD, Dakshin Pisanpura, Delhi, 110034
                    </p>
                  </div>
                </div>

                {/* Address 2 */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Mumbai Clinic
                    </h3>
                    <p className="text-gray-600 text-sm">
                      45 Marine Drive, Churchgate, Mumbai, 400020
                    </p>
                  </div>
                </div>

                {/* Address 3 */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Hyderabad Clinic
                    </h3>
                    <p className="text-gray-600 text-sm">
                      12 Banjara Hills, Road No. 3, Hyderabad, 500034
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 mb-6">
                  <PhoneCall className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Mobile No.
                    </h3>
                    <p className="text-gray-600 text-sm">+91 9911111247</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="w-6 h-6 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Email
                    </h3>
                    <p className="text-gray-600 text-sm break-all">
                      Clinicryanofficial@gmail.com
                    </p>
                  </div>
                </div>

                {/* Google Map */}
               
              </div>

              {/* Right Side - Custom Contact Form */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">
                  Book Your Free Consult Now!
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name*"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      placeholder="Your Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <Input
                    placeholder="Contact Number*"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    value={formData.serviceType}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="What do you want?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">
                        Free Consultation
                      </SelectItem>
                      <SelectItem value="hair-transplant">
                        Hair Transplant
                      </SelectItem>
                      <SelectItem value="beard-transplant">
                        Beard Transplant
                      </SelectItem>
                      <SelectItem value="pricing">
                        Pricing Information
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="h-24"
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 text-white bg-gray-800 hover:bg-gray-900"
                  >
                    Get a Free Consult
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
