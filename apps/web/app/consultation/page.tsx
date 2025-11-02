'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    alert('Consultation request submitted! We will contact you soon.')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-navy">
              Book Your Free Consultation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Speak with our immigration experts today and get personalized advice for your visa journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                    placeholder="021 023 1389"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="study-visa">Study Visa</option>
                    <option value="work-visa">Work Visa</option>
                    <option value="permanent-residence">Permanent Residence</option>
                    <option value="document-legalization">Document Legalization</option>
                    <option value="visa-appeals">Visa Appeals</option>
                    <option value="corporate">Corporate Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell Us About Your Case *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent"
                    placeholder="Provide details about your immigration needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-navy text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-royal transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Request Free Consultation
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-primary-navy">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-semibold text-gray-700">Phone</p>
                      <a href="tel:+27210231389" className="text-primary-royal hover:underline">
                        021 023 1389
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-semibold text-gray-700">Email</p>
                      <a href="mailto:info@rayleneimmigration.co.za" className="text-primary-royal hover:underline">
                        info@rayleneimmigration.co.za
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-700">Office</p>
                      <p className="text-gray-600">Cape Town, Western Cape, South Africa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-gradient-to-br from-primary-emerald to-primary-gold text-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>30-minute consultation call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>Personalized assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>Detailed quote provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>No obligation, completely free</span>
                  </li>
                </ul>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-primary-navy">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

