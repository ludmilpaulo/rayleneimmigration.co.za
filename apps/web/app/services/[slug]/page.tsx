import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // This would normally fetch from API
  const service = {
    'study-visa': {
      title: 'Study Visa',
      description: 'Comprehensive support for students pursuing education in South Africa',
    },
    'work-visa': {
      title: 'Work Visa',
      description: 'Navigate the work visa process with expert guidance',
    },
    'permanent-residence': {
      title: 'Permanent Residence',
      description: 'Pathway to permanent residency in South Africa',
    },
  }[params.slug]

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-primary-navy">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600 mb-12">{service.description}</p>
          
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary-navy">
              Application Process
            </h2>
            <div className="space-y-4">
              {[
                'Initial consultation and eligibility assessment',
                'Document collection and verification',
                'Application preparation and submission',
                'Status tracking and updates',
                'Decision and follow-up support',
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-primary-navy font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-600 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              href="/consultation"
              className="flex-1 bg-primary-gold text-primary-navy px-8 py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition"
            >
              Book Consultation
            </Link>
            <Link
              href="/start"
              className="flex-1 bg-primary-navy text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-primary-royal transition"
            >
              Start Application
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

