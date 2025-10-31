'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! We\'ll get back to you within 24 hours.')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-navy">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team - we&apos;re here to answer your questions and support your immigration journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-primary-navy">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <textarea
                  rows={6}
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <button
                  type="submit"
                  className="w-full bg-primary-navy text-white py-4 rounded-lg font-bold hover:bg-primary-royal transition shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary-navy">Office Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-primary-navy mb-2">📍 Address</h3>
                    <p className="text-gray-600">
                      123 Immigration Boulevard<br />
                      Pretoria, 0001<br />
                      South Africa
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-navy mb-2">📞 Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+27123456789" className="text-primary-royal hover:underline">+27 12 345 6789</a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-navy mb-2">📧 Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@rayleneimmigration.co.za" className="text-primary-royal hover:underline">info@rayleneimmigration.co.za</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary-navy">Office Hours</h2>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Saturday', time: '9:00 AM - 2:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between border-b pb-3">
                      <span className="font-semibold text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-emerald to-primary-gold text-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
                <p className="mb-6 text-blue-50">Book a same-day consultation for urgent matters</p>
                <Link
                  href="/consultation"
                  className="inline-block bg-white text-primary-navy px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

