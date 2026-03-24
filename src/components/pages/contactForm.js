"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const emptyForm = {
  formtype: "Website Form",
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  location: "India",
  source: "Main Website",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
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
        alert("✅ Form submitted successfully!");

        window.location.href =
          "https://wa.me/919217958539?text=Hi, I have submitted the Google form.";
        setFormData(emptyForm);
      } else {
        alert("⚠️ " + (data.message || data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:bg-white md:rounded-lg shadow-new stickyItem">
      <div className="md:p-6 p-3 md:py-8">
        <h2 className="md:text-[24px] text-xl font-semibold underline mb-5 text-center">
          Book Your Free Consult Now!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div className="grid grid-flow-col gap-4">
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
            value={formData.service}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="What do you want?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Free Consultation</SelectItem>
              <SelectItem value="hair-transplant">Hair Transplant</SelectItem>
              <SelectItem value="beard-transplant">Beard Transplant</SelectItem>
              <SelectItem value="pricing">Pricing Information</SelectItem>
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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Get a Free Consult"}
          </Button>
        </form>
      </div>
    </div>
  );
}
