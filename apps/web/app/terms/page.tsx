'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-5xl font-bold mb-6 text-primary-navy">Terms of Service</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: October 2024</p>
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Raylene Immigration Solutions services, you agree to be bound by these 
                Terms of Service and all applicable South African laws and regulations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">2. Our Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We provide immigration consulting and visa application services. Our role is to assist with 
                preparation, documentation, and submission. Final visa decisions are made solely by the 
                Department of Home Affairs.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">3. Client Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate and complete information</li>
                <li>Submit required documents in a timely manner</li>
                <li>Make payments as agreed</li>
                <li>Respond to queries promptly</li>
                <li>Comply with all legal requirements</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">4. Fees and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our fees cover consultation and application assistance services. Government fees, medical 
                tests, and other third-party costs are separate and outlined in your service agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">5. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                While we provide professional services with high success rates, we cannot guarantee visa 
                approval as decisions are made by immigration authorities. We are not liable for government 
                delays or policy changes.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t">
              <Link href="/" className="text-primary-royal hover:underline font-semibold">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

