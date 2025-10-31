'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Raylene Immigration Solutions"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition ${
                isActive('/')
                  ? 'text-primary-navy border-b-2 border-primary-navy'
                  : 'text-gray-600 hover:text-primary-navy'
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition ${
                isActive('/services')
                  ? 'text-primary-navy border-b-2 border-primary-navy'
                  : 'text-gray-600 hover:text-primary-navy'
              }`}
            >
              Services
            </Link>
            <Link
              href="/consultation"
              className={`text-sm font-medium transition ${
                isActive('/consultation')
                  ? 'text-primary-navy border-b-2 border-primary-navy'
                  : 'text-gray-600 hover:text-primary-navy'
              }`}
            >
              Consultation
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition ${
                isActive('/about')
                  ? 'text-primary-navy border-b-2 border-primary-navy'
                  : 'text-gray-600 hover:text-primary-navy'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition ${
                isActive('/contact')
                  ? 'text-primary-navy border-b-2 border-primary-navy'
                  : 'text-gray-600 hover:text-primary-navy'
              }`}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-primary-navy transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary-navy"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/consultation"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Consultation
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-gray-600 hover:text-primary-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

