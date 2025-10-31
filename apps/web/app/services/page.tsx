import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      slug: 'study-visa',
      title: 'Study Visa',
      description: 'Comprehensive support for students pursuing education in South Africa',
      price: 'R2,500',
      duration: '3-6 months',
      requirements: [
        'Letter of acceptance from institution',
        'Passport valid for 6+ months',
        'Proof of financial means',
        'Medical certificate',
        'Police clearance',
      ],
    },
    {
      slug: 'work-visa',
      title: 'Work Visa',
      description: 'Navigate the work visa process with expert guidance',
      price: 'R3,500',
      duration: '4-8 months',
      requirements: [
        'Job offer from SA employer',
        'Labour market test',
        'Qualifications verification',
        'Medical certificate',
        'Police clearance',
      ],
    },
    {
      slug: 'permanent-residence',
      title: 'Permanent Residence',
      description: 'Pathway to permanent residency in South Africa',
      price: 'R5,000',
      duration: '12-18 months',
      requirements: [
        'Valid temporary residence visa',
        'Proof of 5+ years continuous residence',
        'Financial means proof',
        'Medical certificate',
        'Police clearance',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-primary-navy">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our range of professional immigration services
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4 text-primary-navy">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary-gold">
                      {service.price}
                    </span>
                    <span className="text-gray-600">starting</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Processing: {service.duration}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-3 text-primary-navy">
                    Requirements:
                  </h3>
                  <ul className="space-y-2">
                    {service.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary-emerald mt-1">•</span>
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="block w-full bg-primary-navy text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-royal transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

