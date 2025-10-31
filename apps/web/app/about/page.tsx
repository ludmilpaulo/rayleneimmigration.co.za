'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-5xl font-bold mb-6 text-primary-navy">About Raylene Immigration Solutions</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Raylene Immigration Solutions is a leading immigration consultancy firm specializing in South African 
                visa applications, permanent residency, and immigration services. With over 15 years of experience, 
                we have successfully helped over 500 families and individuals realize their dreams of living, working, 
                and studying in South Africa.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-primary-navy">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                To provide professional, transparent, and reliable immigration services that make the visa journey 
                smooth and stress-free for every client. We believe in personalized service, attention to detail, 
                and building long-term relationships based on trust and success.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-primary-navy">Why Choose Us</h2>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {[
                  {
                    title: 'Licensed Professionals',
                    desc: 'All our consultants are registered immigration practitioners with in-depth knowledge of South African immigration law.',
                  },
                  {
                    title: '98% Success Rate',
                    desc: 'Proven track record with hundreds of successful applications across all visa categories.',
                  },
                  {
                    title: 'Personalized Service',
                    desc: 'Dedicated case manager for each application ensures personalized attention and communication.',
                  },
                  {
                    title: 'Transparent Pricing',
                    desc: 'Clear, upfront pricing with no hidden fees. Competitive rates matched with exceptional value.',
                  },
                  {
                    title: 'Fast Processing',
                    desc: 'Efficient workflows and DHA liaising to minimize processing times where possible.',
                  },
                  {
                    title: 'Ongoing Support',
                    desc: 'Comprehensive support from application to arrival, including post-arrival integration assistance.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-primary-emerald pl-6">
                    <h3 className="text-xl font-bold mb-2 text-primary-navy">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 bg-gradient-to-r from-primary-navy to-primary-royal text-white p-12 rounded-2xl text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
                <p className="text-xl mb-8 text-blue-100">Book a free consultation with our experienced team</p>
                <Link
                  href="/consultation"
                  className="inline-block bg-primary-gold text-primary-navy px-10 py-4 rounded-lg font-bold text-lg hover:bg-white transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

