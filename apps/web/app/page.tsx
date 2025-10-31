'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Navigation } from '@/components/Navigation'

export default function Home() {
  const t = useTranslations('home')
  return (
    <main className="min-h-screen">
      <Navigation />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-navy to-primary-royal text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              {t('title')}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t('subtitle')}
            </p>
            <div className="flex gap-4">
              <Link
                href="/consultation"
                className="bg-primary-gold text-primary-navy px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                {t('bookConsultation')}
              </Link>
              <Link
                href="/start"
                className="bg-white text-primary-navy px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                {t('startApplication')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary-navy">
            {t('ourServices')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Study Visa',
                description: 'Comprehensive support for students pursuing education in South Africa.',
                href: '/services/study-visa',
              },
              {
                title: 'Work Visa',
                description: 'Navigate the work visa process with expert guidance.',
                href: '/services/work-visa',
              },
              {
                title: 'Permanent Residence',
                description: 'Pathway to permanent residency in South Africa.',
                href: '/services/permanent-residence',
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-semibold mb-3 text-primary-navy">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-primary-navy">
              {t('whyChoose')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: '✓',
                  title: t('expertTeam'),
                  description: t('expertTeamDesc'),
                },
                {
                  icon: '✓',
                  title: t('transparentProcess'),
                  description: t('transparentProcessDesc'),
                },
                {
                  icon: '✓',
                  title: t('provenResults'),
                  description: t('provenResultsDesc'),
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="text-4xl mb-4 text-primary-emerald">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary-navy">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

