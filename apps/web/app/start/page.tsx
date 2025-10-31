'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function StartPage() {
  const [step, setStep] = useState(1)

  const services = [
    {
      id: 'study-visa',
      title: 'Study Visa',
      icon: '🎓',
      description: 'For international students',
      price: 'From R2,500',
    },
    {
      id: 'work-visa',
      title: 'Work Visa',
      icon: '💼',
      description: 'For skilled professionals',
      price: 'From R3,500',
    },
    {
      id: 'permanent-residence',
      title: 'Permanent Residence',
      icon: '🏠',
      description: 'Long-term residency',
      price: 'From R5,000',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12 pt-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                    step >= s
                      ? 'bg-primary-royal text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Step {step} of 4
              </h2>
            </div>
          </div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h1 className="text-4xl font-bold mb-4 text-primary-navy text-center">
                Let&apos;s Get Started
              </h1>
              <p className="text-xl text-gray-600 text-center mb-12">
                Choose the immigration service you need
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setStep(2)}
                    className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:border-primary-royal hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left"
                  >
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-primary-navy">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <p className="text-primary-gold font-bold">{service.price}</p>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/consultation"
                  className="text-primary-royal hover:underline font-semibold"
                >
                  Need help choosing? Book a consultation →
                </Link>
              </div>
            </div>
          )}

          {/* Step 2: Create Account */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy text-center">
                Create Your Account
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Secure your application journey with a free account
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="password"
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-primary-navy text-white py-3 rounded-lg font-bold hover:bg-primary-royal transition"
                >
                  Create Account
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Already have an account? <Link href="/login" className="text-primary-royal hover:underline">Sign in</Link>
                </p>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-6 text-primary-navy hover:text-primary-royal"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 3: Basic Info */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy text-center">
                Basic Information
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Tell us a bit about yourself
              </p>

              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <input
                  type="text"
                  placeholder="Nationality"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy"
                />
                <button
                  onClick={() => setStep(4)}
                  className="w-full bg-primary-navy text-white py-3 rounded-lg font-bold hover:bg-primary-royal transition"
                >
                  Continue
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-6 text-primary-navy hover:text-primary-royal"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Step 4: Review & Complete */}
          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">
                You&apos;re All Set!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your application has been started. Check your email for next steps and access your portal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/app"
                  className="bg-primary-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-royal transition"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/services"
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

