'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-5xl font-bold mb-6 text-primary-navy">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: October 2024</p>
            
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">Introduction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Raylene Immigration Solutions (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy 
                and personal information. This privacy policy explains how we collect, use, disclose, and safeguard 
                your information when you use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Personal identification information (name, email, phone, address)</li>
                <li>Passport and visa-related documentation</li>
                <li>Financial information for payment processing</li>
                <li>Communication records and correspondence</li>
                <li>Technical data (IP address, browser type, device information)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Process visa applications and immigration services</li>
                <li>Communicate with you about your case</li>
                <li>Process payments and manage invoices</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and user experience</li>
                <li>Send important updates and notifications</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures including encryption, secure storage, 
                and access controls to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Under POPIA and GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Lodge complaints with regulatory authorities</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary-navy">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For privacy inquiries or to exercise your rights, please contact us:
              </p>
              <p className="text-gray-600">
                Email: <a href="mailto:privacy@rayleneimmigration.co.za" className="text-primary-royal hover:underline">privacy@rayleneimmigration.co.za</a><br />
                Phone: <a href="tel:+27210231389" className="text-primary-royal hover:underline">021 023 1389</a>
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

