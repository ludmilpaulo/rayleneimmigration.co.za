'use client'

import { useEffect, useState } from 'react'
import { locales, localeNames, type Locale } from '@/i18n'
import { getLocaleClient, setLocale } from '@/lib/i18n'

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Locale>('en')

  useEffect(() => {
    setCurrentLang(getLocaleClient())
  }, [])

  const handleLanguageChange = (locale: Locale) => {
    setLocale(locale)
    setCurrentLang(locale)
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
          {localeNames[locale]}
        </button>
      ))}
    </div>
  )
}

