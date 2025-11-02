import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Raylene Immigration Solutions | Professional Immigration Services South Africa',
  description: 'Expert immigration services for South Africa. Study visas, work visas, permanent residence, and more. Professional, reliable, trusted.',
  keywords: 'immigration, visa, South Africa, study visa, work visa, permanent residence, immigration consultant',
  authors: [{ name: 'Raylene Immigration Solutions' }],
  openGraph: {
    title: 'Raylene Immigration Solutions',
    description: 'Professional immigration services for South Africa',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raylene Immigration Solutions',
    description: 'Professional immigration services for South Africa',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B1B3B" />
      </head>
      <body className={inter.className}>
      <Navigation />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

