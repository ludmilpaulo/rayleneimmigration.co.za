'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const services: Record<string, any> = {
    'study-visa': {
      title: 'Study Visa Services for South Africa',
      description: 'Complete study visa support for international students pursuing education in South Africa. Expert guidance from application to arrival.',
      icon: '🎓',
      price: 'From R2,500',
      duration: '3-6 months',
      process: [
        {
          step: 1,
          title: 'University Acceptance',
          description: 'Assistance with institution applications and acceptance letter procurement',
        },
        {
          step: 2,
          title: 'Document Preparation',
          description: 'Comprehensive document checklist, verification, and authentication services',
        },
        {
          step: 3,
          title: 'Visa Application',
          description: 'Professional application submission with DHA liaising and follow-up',
        },
        {
          step: 4,
          title: 'Status Tracking',
          description: 'Real-time updates and proactive monitoring of application progress',
        },
        {
          step: 5,
          title: 'Arrival Support',
          description: 'Post-arrival assistance with registration, extensions, and integration',
        },
      ],
      requirements: [
        'Valid passport (6+ months validity)',
        'University acceptance letter',
        'Proof of financial means',
        'Medical clearance certificate',
        'Police clearance certificate',
        'Proof of accommodation',
        'Health insurance coverage',
      ],
      benefits: [
        'Access to world-class South African universities',
        'Work rights during studies',
        'Dependents permitted to join',
        'Pathway to work visa after graduation',
        'Beautiful, affordable study destination',
      ],
      eligibility: 'International students accepted by recognized South African educational institutions',
    },
    'work-visa': {
      title: 'Work Visa Services for Skilled Professionals',
      description: 'Expert work visa assistance for professionals seeking employment opportunities in South Africa. Navigate the process with confidence.',
      icon: '💼',
      price: 'From R3,500',
      duration: '4-8 months',
      process: [
        {
          step: 1,
          title: 'Skills Assessment',
          description: 'Evaluation of qualifications and professional credentials',
        },
        {
          step: 2,
          title: 'Job Offer',
          description: 'Assistance with finding employers and securing job offers',
        },
        {
          step: 3,
          title: 'Labour Market Test',
          description: 'Support with DAFF registration and local market testing requirements',
        },
        {
          step: 4,
          title: 'Application Submission',
          description: 'Complete visa application with all supporting documents',
        },
        {
          step: 5,
          title: 'Approval & Immigration',
          description: 'Post-approval support and integration assistance',
        },
      ],
      requirements: [
        'Valid passport',
        'Recognized qualifications',
        'Job offer from South African employer',
        'Skills assessment certificate',
        'Medical and police clearance',
        'Proof of experience',
        'Letter of motivation',
      ],
      benefits: [
        'Permanent residency pathway',
        'Tax benefits for qualifying skills',
        'Quality healthcare access',
        'Excellent work-life balance',
        'Beautiful diverse culture',
      ],
      eligibility: 'Skilled professionals with in-demand qualifications and job offers',
    },
    'permanent-residence': {
      title: 'Permanent Residence in South Africa',
      description: 'Secure your future with permanent residency in South Africa. Complete support for all residency pathways and applications.',
      icon: '🏠',
      price: 'From R5,000',
      duration: '12-18 months',
      process: [
        {
          step: 1,
          title: 'Eligibility Assessment',
          description: 'Comprehensive evaluation of your residency eligibility',
        },
        {
          step: 2,
          title: 'Document Compilation',
          description: 'Complete document gathering, certification, and verification',
        },
        {
          step: 3,
          title: 'Application Filing',
          description: 'Professional application with DHA submission',
        },
        {
          step: 4,
          title: 'Processing Support',
          description: 'Active monitoring and response to DHA queries',
        },
        {
          step: 5,
          title: 'Approval & Settlement',
          description: 'Residency card assistance and integration support',
        },
      ],
      requirements: [
        'Valid temporary residence status',
        '5 years continuous residence',
        'Proof of financial independence',
        'Clean criminal record',
        'Medical clearance',
        'Comprehensive documentation',
        'Character references',
      ],
      benefits: [
        'Live, work, study anywhere in SA',
        'Access to citizenship after 5 years',
        'Tax benefits',
        'Quality public services',
        'Family sponsorship rights',
      ],
      eligibility: 'Temporary residents with qualifying residence history and clean records',
    },
    'document-legalization': {
      title: 'Document Legalization Services',
      description: 'Professional document certification, authentication, and legalization for South African immigration and official purposes.',
      icon: '📄',
      price: 'From R800',
      duration: '1-2 weeks',
    },
    'visa-appeals': {
      title: 'Visa Appeal Services',
      description: 'Expert representation for visa rejections and appeals with proven success rate.',
      icon: '⚖️',
      price: 'From R4,500',
      duration: '6-9 months',
    },
    'corporate': {
      title: 'Corporate Immigration Services',
      description: 'Comprehensive immigration solutions for businesses and corporate clients in South Africa.',
      icon: '🏢',
      price: 'Custom',
      duration: 'Variable',
    },
  }

  const service = services[params.slug]

  useEffect(() => {
    // Update page title for SEO
    if (service) {
      document.title = `${service.title} - Raylene Immigration Solutions`
    }
  }, [service])

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-navy">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Starting From</div>
                <div className="text-3xl font-bold text-primary-gold">{service.price}</div>
              </div>
              <div className="text-center border-l border-r border-gray-300">
                <div className="text-sm text-gray-600 mb-2">Processing Time</div>
                <div className="text-3xl font-bold text-primary-royal">{service.duration}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Success Rate</div>
                <div className="text-3xl font-bold text-primary-emerald">98%</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consultation"
                className="flex-1 bg-primary-gold text-primary-navy px-8 py-4 rounded-lg font-bold text-center hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/start"
                className="flex-1 bg-primary-navy text-white px-8 py-4 rounded-lg font-bold text-center hover:bg-primary-royal transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Application
              </Link>
            </div>
          </div>

          {/* Process */}
          {service.process && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold mb-8 text-primary-navy">
                Our 5-Step Process
              </h2>
              <div className="space-y-8">
                {service.process.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center text-primary-navy font-bold text-xl">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold mb-2 text-primary-navy">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {service.requirements && (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold mb-8 text-primary-navy">
                Required Documents
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.requirements.map((req: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-primary-emerald font-bold text-xl mt-1">✓</span>
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits & Eligibility */}
          {service.benefits && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-primary-emerald to-primary-gold text-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {service.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-bold text-2xl">✓</span>
                      <span className="leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-primary-navy">Eligibility</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{service.eligibility}</p>
                
                <div className="bg-primary-navy text-white p-6 rounded-xl">
                  <div className="text-sm mb-2 opacity-90">Want to check your eligibility?</div>
                  <Link
                    href="/consultation"
                    className="text-primary-gold font-bold text-lg hover:underline inline-block"
                  >
                    Book Free Assessment →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary-navy">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: 'How long does the process take?',
                  answer: `Average processing time is ${service.duration}, though this can vary based on DHA workload and individual circumstances.`,
                },
                {
                  question: 'What are the total costs involved?',
                  answer: `${service.price} covers our professional services. Additional costs include DHA fees, medical tests, and document certification.`,
                },
                {
                  question: 'Do you guarantee approval?',
                  answer: 'While we maintain a 98% success rate, we cannot guarantee approval as final decisions rest with the Department of Home Affairs.',
                },
                {
                  question: 'What if my visa is rejected?',
                  answer: 'We offer comprehensive appeal services with expert representation to challenge rejections.',
                },
              ].map((faq, idx) => (
                <details key={idx} className="border-b border-gray-200 pb-6 cursor-pointer group">
                  <summary className="font-bold text-lg text-primary-navy flex justify-between items-center group-open:text-primary-royal">
                    {faq.question}
                    <span className="text-2xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-primary-navy via-primary-royal to-primary-navy rounded-2xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Book a free consultation and let our experts guide you through every step of your visa journey
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
          </div>
        </div>
      </div>
    </main>
  )
}
