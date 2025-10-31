'use client'

import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-navy to-primary-royal text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Expert Immigration Solutions for South Africa
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Navigate your visa journey with confidence. Professional, reliable, and dedicated to your success in South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-primary-gold text-primary-navy px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book Free Consultation →
              </Link>
              <Link
                href="/start"
                className="bg-white text-primary-navy px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Application →
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold">500+</div>
                <div className="text-sm text-blue-200 mt-1">Successful Cases</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold">98%</div>
                <div className="text-sm text-blue-200 mt-1">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-gold">15+</div>
                <div className="text-sm text-blue-200 mt-1">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-navy">
              Our Immigration Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive visa and immigration support for every stage of your journey to South Africa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎓',
                title: 'Study Visa',
                description: 'Complete support for international students pursuing education at South African universities and institutions.',
                features: ['University applications', 'Document preparation', 'Visa processing', 'Student support'],
                href: '/services/study-visa',
              },
              {
                icon: '💼',
                title: 'Work Visa',
                description: 'Expert guidance for skilled professionals and workers seeking employment opportunities in South Africa.',
                features: ['Job search assistance', 'Skills assessment', 'Employer liaison', 'Visa applications'],
                href: '/services/work-visa',
              },
              {
                icon: '🏠',
                title: 'Permanent Residence',
                description: 'Secure your future with permanent residency status in beautiful South Africa.',
                features: ['Eligibility assessment', 'Application management', 'Compliance support', 'Pathway planning'],
                href: '/services/permanent-residence',
              },
              {
                icon: '📄',
                title: 'Document Legalization',
                description: 'Professional document verification and legalization services for all official paperwork.',
                features: ['Certification', 'Apostille services', 'Translation', 'Authentication'],
                href: '/services/document-legalization',
              },
              {
                icon: '⚖️',
                title: 'Visa Appeals',
                description: 'Expert representation for visa rejections and appeals with high success rate.',
                features: ['Case review', 'Legal representation', 'Document amendments', 'Appeal filing'],
                href: '/services/visa-appeals',
              },
              {
                icon: '🏢',
                title: 'Corporate Services',
                description: 'Comprehensive immigration solutions for businesses and corporate clients.',
                features: ['Bulk applications', 'Compliance management', 'Corporate visa support', 'Team relocation'],
                href: '/services/corporate',
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border-t-4 border-primary-emerald"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-primary-navy group-hover:text-primary-royal transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-primary-emerald mr-2 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-primary-royal font-semibold group-hover:text-primary-navy transition">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-navy">
              Why Choose Raylene Immigration Solutions?
            </h2>
            <p className="text-xl text-gray-600 mb-16">
              Trusted by thousands of clients across the globe
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: '🔒',
                  title: 'Expert Team',
                  description: 'Licensed immigration consultants with 15+ years of experience and 98% success rate',
                  color: 'text-primary-emerald',
                },
                {
                  icon: '📊',
                  title: 'Transparent Process',
                  description: 'Clear communication, regular updates, and real-time status tracking through our secure portal',
                  color: 'text-primary-royal',
                },
                {
                  icon: '⭐',
                  title: 'Proven Results',
                  description: 'Over 500 successful cases with documented testimonials and satisfied clients worldwide',
                  color: 'text-primary-gold',
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center group">
                  <div className={`text-6xl mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-primary-navy">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* Additional Benefits */}
            <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-primary-navy to-primary-royal text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold mb-3">Fast Processing</h3>
                <p className="text-blue-100">Average 2-3 months processing time with priority support available</p>
              </div>
              <div className="bg-gradient-to-br from-primary-emerald to-primary-gold text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-2xl font-bold mb-3">Competitive Pricing</h3>
                <p className="text-white">Transparent fees with no hidden charges and flexible payment plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary-navy">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maria Santos',
                  country: 'Brazil',
                  visa: 'Study Visa',
                  quote: 'Professional service from start to finish. They made the entire process stress-free and kept me informed every step of the way.',
                  rating: 5,
                },
                {
                  name: 'Ahmed Hassan',
                  country: 'Egypt',
                  visa: 'Work Visa',
                  quote: 'Exceeded my expectations. Got my work visa approved in record time. Highly recommended for any immigration needs.',
                  rating: 5,
                },
                {
                  name: 'Jennifer Chen',
                  country: 'China',
                  visa: 'Permanent Residence',
                  quote: 'Three years of support and I finally received my PR! The team&apos;s dedication and expertise made all the difference.',
                  rating: 5,
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-primary-gold text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-primary-navy">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.visa} - {testimonial.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-navy via-primary-royal to-primary-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-10 text-blue-100">
              Book a free consultation today and let our experts guide you through your immigration process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="bg-primary-gold text-primary-navy px-10 py-4 rounded-lg font-bold text-lg hover:bg-white transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/start"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-navy transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-2"
              >
                Start Application Now
              </Link>
            </div>
            <div className="mt-12 text-blue-200">
              <p className="text-lg">📞 Call us: <a href="tel:+27123456789" className="text-white font-semibold hover:underline">+27 12 345 6789</a></p>
              <p className="text-lg">📧 Email: <a href="mailto:info@rayleneimmigration.co.za" className="text-white font-semibold hover:underline">info@rayleneimmigration.co.za</a></p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
