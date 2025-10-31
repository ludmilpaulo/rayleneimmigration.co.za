import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getMessages } from 'next-intl'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Raylene Immigration Solutions',
  description: 'Professional immigration services for South Africa',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

