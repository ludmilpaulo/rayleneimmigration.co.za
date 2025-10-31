'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { locales } from '@/i18n'

const languageNames: Record<string, string> = {
  en: 'English',
  pt: 'Português',
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [currentLang, setCurrentLang] = useState(
    pathname.split('/')[1] || 'en'
  )

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    setCurrentLang(locale)
    router.push(newPath)
  }

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLanguageChange(locale)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            currentLang === locale
              ? 'bg-primary-navy text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {languageNames[locale]}
        </button>
      ))}
    </div>
  )
}

