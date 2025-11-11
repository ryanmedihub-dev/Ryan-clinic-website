'use client'

import { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, MessageSquare, Star } from 'lucide-react'

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
        alert('✅ Thank you for your valuable feedback! We appreciate you taking the time to share your experience with us.')
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
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
      } else {
        alert('❌ Error submitting feedback. Please try again.')
        console.error('Error:', result)
      }
    } catch (error) {
      alert('⚠️ Something went wrong. Try again later.')
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
      { value: 4, emoji: '😊', label: 'V.Good' },
      { value: 5, emoji: '😍', label: 'Excellent' }
    ]

    return (
      <div className="mb-4 md:mb-6">
        <label className="block font-medium text-gray-700 mb-3">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex flex-wrap gap-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex-1 min-w-[55px]">
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
                className="block text-center py-2.5 md:py-3 px-2 bg-white rounded-lg cursor-pointer transition-all duration-300 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-500"
              >
                <div className="text-2xl md:text-3xl mb-1">{rating.emoji}</div>
                <div className="text-xs md:text-sm font-medium">
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Patient Feedback Form
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Your feedback helps us serve you better
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:bg-white rounded-2xl p-6 sm:p-8 md:border md:border-gray-200 md:shadow-md space-y-4 md:space-y-6"
        >
          {/* Personal Information Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
              Personal Information
            </h3>

            <div className="space-y-4 md:space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
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
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Date of Visit <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Clinic Branch <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Choose a branch</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Experience Section */}
          <div className="pt-4 md:pt-6">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
              Consultation Experience
            </h3>

            <RatingGroup
              label="How would you rate your initial consultation experience?"
              name="consultRating"
              required
            />

            <RatingGroup
              label="How satisfied were you with the doctor's consultation?"
              name="doctorRating"
              required
            />

            <div className="mb-4 md:mb-6">
              <label className="block font-medium text-gray-700 mb-3">
                Did the doctor explain the procedure clearly and answer all your questions?
              </label>
              <div className="space-y-2 md:space-y-3">
                {[
                  { value: 'yes', label: 'Yes, very clearly' },
                  { value: 'partial', label: 'Somewhat, but had some doubts' },
                  { value: 'no', label: 'No, I had many unanswered questions' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`explain-${option.value}`}
                      name="doctorExplanation"
                      value={option.value}
                      checked={formData.doctorExplanation === option.value}
                      onChange={handleChange}
                      className="w-4 h-4 md:w-5 md:h-5 text-blue-600 cursor-pointer"
                    />
                    <label
                      htmlFor={`explain-${option.value}`}
                      className="ml-2 md:ml-3 text-gray-700 cursor-pointer text-sm md:text-base"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staff & Facility Section */}
          <div className="pt-4 md:pt-6">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
              Staff & Facility
            </h3>

            <RatingGroup
              label="How would you rate the behavior and professionalism of our staff?"
              name="staffRating"
              required
            />

            <RatingGroup
              label="How would you rate the cleanliness and hygiene of our clinic?"
              name="hygieneRating"
              required
            />
          </div>

          {/* Overall Experience Section */}
          <div className="pt-4 md:pt-6">
            <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 md:mb-6">
              Overall Experience
            </h3>

            <RatingGroup
              label="Overall, how satisfied are you with your experience at our clinic?"
              name="overallRating"
              required
            />

            <div className="mb-4 md:mb-6">
              <label className="block font-medium text-gray-700 mb-3">
                Would you recommend our clinic to friends and family?
              </label>
              <div className="space-y-2 md:space-y-3">
                {[
                  { value: 'yes', label: 'Yes, definitely' },
                  { value: 'maybe', label: 'Maybe' },
                  { value: 'no', label: 'No' }
                ].map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`recommend-${option.value}`}
                      name="recommend"
                      value={option.value}
                      checked={formData.recommend === option.value}
                      onChange={handleChange}
                      className="w-4 h-4 md:w-5 md:h-5 text-blue-600 cursor-pointer"
                    />
                    <label
                      htmlFor={`recommend-${option.value}`}
                      className="ml-2 md:ml-3 text-gray-700 cursor-pointer text-sm md:text-base"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Areas */}
            <div className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  What did you like most about your experience?
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <textarea
                    name="likedMost"
                    value={formData.likedMost}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Share what you enjoyed..."
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  What areas do you think we could improve?
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <textarea
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Your suggestions are valuable to us..."
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Any additional comments or feedback
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <textarea
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Please share any other thoughts..."
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 md:py-4 rounded-lg font-semibold text-white text-lg transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center">
            🔒 Your feedback is confidential and helps us improve our services.
          </p>
        </form>
      </div>
    </section>
  )
}