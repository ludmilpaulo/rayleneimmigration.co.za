'use client'

import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      slug: 'study-visa',
      title: 'Study Visa',
      description: 'Complete immigration support for international students pursuing education in South Africa',
      price: 'R2,500',
      duration: '3-6 months',
      icon: '🎓',
      highlights: [
        'University acceptance assistance',
        'Complete document preparation',
        'Visa application submission',
        'Post-arrival support',
        'Extension services available',
      ],
    },
    {
      slug: 'work-visa',
      title: 'Work Visa',
      description: 'Expert guidance for skilled professionals seeking employment opportunities',
      price: 'R3,500',
      duration: '4-8 months',
      icon: '💼',
      highlights: [
        'Job search assistance',
        'Skills assessment guidance',
        'Employer liaison services',
        'Critical skills visa support',
        'Corporate relocation packages',
      ],
    },
    {
      slug: 'permanent-residence',
      title: 'Permanent Residence',
      description: 'Secure your future with permanent residency status in beautiful South Africa',
      price: 'R5,000',
      duration: '12-18 months',
      icon: '🏠',
      highlights: [
        'Eligibility assessment',
        'Application management',
        'Compliance support',
        'Family inclusion',
        'Citizenship pathway guidance',
      ],
    },
    {
      slug: 'document-legalization',
      title: 'Document Legalization',
      description: 'Professional document verification and legalization for all official paperwork',
      price: 'R800',
      duration: '1-2 weeks',
      icon: '📄',
      highlights: [
        'Certification services',
        'Apostille authentication',
        'Professional translation',
        'Embassy legalization',
        'Express processing available',
      ],
    },
    {
      slug: 'visa-appeals',
      title: 'Visa Appeals',
      description: 'Expert representation for visa rejections with high success rate',
      price: 'R4,500',
      duration: '6-9 months',
      icon: '⚖️',
      highlights: [
        'Comprehensive case review',
        'Legal representation',
        'Document amendments',
        'Appeal filing',
        'Court proceedings support',
      ],
    },
    {
      slug: 'corporate',
      title: 'Corporate Services',
      description: 'Immigration solutions for businesses and corporate clients',
      price: 'Custom',
      duration: 'Variable',
      icon: '🏢',
      highlights: [
        'Bulk visa applications',
        'Compliance management',
        'Corporate visa support',
        'Team relocation services',
        'Dedicated account manager',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 pt-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-navy">
              Our Immigration Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive visa and immigration support for every stage of your journey to South Africa. 
              Trust our expertise to make your immigration process smooth and successful.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-primary-emerald group"
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-5xl group-hover:scale-110 transition-transform">{service.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2 text-primary-navy group-hover:text-primary-royal transition">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                    </div>
                  </div>

                  <div className="mb-6 border-y py-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary-gold">
                        {service.price}
                      </span>
                      {service.price !== 'Custom' && (
                        <span className="text-gray-600">starting</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        ⏱️ Avg: {service.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-3 text-primary-navy text-sm uppercase tracking-wide">
                      Service Includes:
                    </h3>
                    <ul className="space-y-3">
                      {service.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-primary-emerald font-bold mt-1">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="block w-full bg-primary-navy text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-royal transition shadow-md hover:shadow-lg"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-primary-navy to-primary-royal rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Not Sure Which Service You Need?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Book a free consultation and let our experts guide you
            </p>
            <Link
              href="/consultation"
              className="inline-block bg-primary-gold text-primary-navy px-10 py-4 rounded-lg font-bold text-lg hover:bg-white transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
