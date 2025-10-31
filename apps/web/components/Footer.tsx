'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-primary-navy text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Raylene Immigration"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-blue-100 leading-relaxed mb-4">
              Professional immigration services for South Africa. Helping you navigate your visa journey with confidence.
            </p>
            <div className="space-y-2 text-sm">
              <p>📞 021 023 1389</p>
              <p>📧 info@rayleneimmigration.co.za</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-gold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/study-visa" className="text-blue-100 hover:text-white transition">
                  Study Visa
                </Link>
              </li>
              <li>
                <Link href="/services/work-visa" className="text-blue-100 hover:text-white transition">
                  Work Visa
                </Link>
              </li>
              <li>
                <Link href="/services/permanent-residence" className="text-blue-100 hover:text-white transition">
                  Permanent Residence
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-100 hover:text-white transition">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-blue-100 hover:text-white transition">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary-gold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-blue-100 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/app" className="text-blue-100 hover:text-white transition">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-100 text-sm">
            © 2024 Raylene Immigration Solutions. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-blue-100 hover:text-white transition text-2xl">
              <span className="sr-only">Facebook</span>📘
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition text-2xl">
              <span className="sr-only">LinkedIn</span>💼
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition text-2xl">
              <span className="sr-only">Twitter</span>🐦
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

