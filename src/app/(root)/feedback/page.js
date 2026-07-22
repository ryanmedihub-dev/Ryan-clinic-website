'use client'

import { useState } from 'react'
import { User, Phone, Calendar, MapPin, MessageSquare } from 'lucide-react'

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    visitDate: '',
    branch: '',
    consultRating: '',
    doctorRating: '',
    doctorExplanation: '',
    staffRating: '',
    hygieneRating: '',
    overallRating: '',
    recommend: '',
    likedMost: '',
    improvements: '',
    additionalComments: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const phoneClean = (formData.phone || "").replace(/[\s-]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(phoneClean)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        // Check if user gave 5 stars before resetting form
        const isFiveStar = parseInt(formData.overallRating) === 5;
        
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          visitDate: '',
          branch: '',
          consultRating: '',
          doctorRating: '',
          doctorExplanation: '',
          staffRating: '',
          hygieneRating: '',
          overallRating: '',
          recommend: '',
          likedMost: '',
          improvements: '',
          additionalComments: ''
        })

        // Show message and redirect for 5 stars
        if (isFiveStar) {
          alert('✅ Thanks for your feedback! Would you please rate us on Google?')
          setTimeout(() => {
            window.location.href = 'https://shorturl.at/0QdEW'
          }, 1000)
        } else {
          alert('✅ Thank you so much! Your feedback means a lot to us! 💙')
        }
      } else {
        alert('❌ Oops! Something went wrong. Please try again.')
        console.error('Error:', result)
      }
    } catch (error) {
      alert('⚠️ Connection error. Please try again later.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const RatingGroup = ({ label, name, required = false }) => {
    const ratings = [
      { value: 1, emoji: '😞', label: 'Poor' },
      { value: 2, emoji: '😐', label: 'Fair' },
      { value: 3, emoji: '🙂', label: 'Good' },
      { value: 4, emoji: '😊', label: 'Great' },
      { value: 5, emoji: '😍', label: 'Excellent' }
    ]

    return (
      <div className="mb-8">
        <label className="block font-semibold text-gray-800 mb-4 text-lg">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex justify-between gap-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex-1">
              <input
                type="radio"
                id={`${name}-${rating.value}`}
                name={name}
                value={rating.value}
                checked={formData[name] === String(rating.value)}
                onChange={handleChange}
                className="hidden peer"
                required={required}
              />
              <label
                htmlFor={`${name}-${rating.value}`}
                className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl cursor-pointer transition-all duration-200 peer-checked:bg-blue-500 peer-checked:scale-110 active:scale-95"
              >
                <div className=" mb-2">{rating.emoji}</div>
                <div className="text-xs font-medium text-gray-600 peer-checked:text-white">
                  {rating.label}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-8 text-center">
        <div className="text-5xl mb-3">⭐</div>
        <h1 className="text-3xl font-bold mb-2">
          Share Your Experience
        </h1>
        <p className="text-blue-100 text-base">
          We'd love to hear from you!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-8">
        
        {/* Step 1: Personal Info */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              1
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Your Details
            </h2>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                👤 Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 placeholder-gray-400 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                📱 Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={15}
                pattern="[0-9+\s-]{10,15}"
                placeholder="9876543210"
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 placeholder-gray-400 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                📅 Visit Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                📍 Branch <span className="text-red-500">*</span>
              </label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none appearance-none"
              >
                <option value="">Select your branch</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200"></div>

        {/* Step 2: Rate Your Visit */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              2
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Rate Your Visit
            </h2>
          </div>

          <RatingGroup
            label="🏥 First Visit Experience"
            name="consultRating"
            required
          />

          <RatingGroup
            label="👨‍⚕️ Doctor's Consultation"
            name="doctorRating"
            required
          />

          {/* Doctor Explanation */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-800 mb-4 text-lg">
              💬 Did doctor explain clearly?
            </label>
            <div className="space-y-3">
              {[
                { value: 'yes', emoji: '✅', label: 'Yes, very clear' },
                { value: 'partial', emoji: '🤔', label: 'Had some doubts' },
                { value: 'no', emoji: '❌', label: 'Not clear' }
              ].map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={`explain-${option.value}`}
                    name="doctorExplanation"
                    value={option.value}
                    checked={formData.doctorExplanation === option.value}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`explain-${option.value}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl cursor-pointer transition-all peer-checked:bg-blue-500 peer-checked:scale-105 active:scale-95 shadow-sm"
                  >
                    <span>{option.emoji}</span>
                    <span className="text-base font-medium text-gray-700 peer-checked:text-white">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <RatingGroup
            label="👥 Staff Behavior"
            name="staffRating"
            required
          />

          <RatingGroup
            label="✨ Cleanliness"
            name="hygieneRating"
            required
          />
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200"></div>

        {/* Step 3: Overall */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              3
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Overall Experience
            </h2>
          </div>

          <RatingGroup
            label="🌟 Overall Rating"
            name="overallRating"
            required
          />

          {/* Recommendation */}
          <div className="mb-8">
            <label className="block font-semibold text-gray-800 mb-4 text-lg">
              💙 Would you recommend us?
            </label>
            <div className="space-y-3">
              {[
                { value: 'yes', emoji: '👍', label: 'Yes, definitely!' },
                { value: 'maybe', emoji: '🤷', label: 'Maybe' },
                { value: 'no', emoji: '👎', label: 'No' }
              ].map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    id={`recommend-${option.value}`}
                    name="recommend"
                    value={option.value}
                    checked={formData.recommend === option.value}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`recommend-${option.value}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl cursor-pointer transition-all peer-checked:bg-green-500 peer-checked:scale-105 active:scale-95 shadow-sm"
                  >
                    <span>{option.emoji}</span>
                    <span className="text-base font-medium text-gray-700 peer-checked:text-white">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                💚 What did you like?
              </label>
              <textarea
                name="likedMost"
                value={formData.likedMost}
                onChange={handleChange}
                rows="3"
                placeholder="Tell us what made you happy..."
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 placeholder-gray-400 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                💡 How can we improve?
              </label>
              <textarea
                name="improvements"
                value={formData.improvements}
                onChange={handleChange}
                rows="3"
                placeholder="Your suggestions help us..."
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 placeholder-gray-400 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-base">
                💬 Anything else?
              </label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                rows="3"
                placeholder="Share any other thoughts..."
                className="w-full px-4 py-4 bg-white rounded-xl text-base text-gray-900 placeholder-gray-400 border-0 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 rounded-2xl font-bold text-white text-lg transition-all duration-300 shadow-lg ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 active:scale-95"
          }`}
        >
          {isSubmitting ? '✨ Sending...' : '🚀 Submit Feedback'}
        </button>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 text-center px-4">
          🔒 Your feedback helps us serve you better
        </p>
      </form>
    </div>
  )
}