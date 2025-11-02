'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getLocaleClient } from '@/lib/i18n'
import type { Locale } from '@/i18n'
import enMessages from '@/messages/en.json'
import ptMessages from '@/messages/pt.json'
import frMessages from '@/messages/fr.json'

type Messages = typeof enMessages

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  pt: ptMessages,
  fr: frMessages,
}

interface TranslationContextType {
  locale: Locale
  t: (key: string) => string
  setLocale: (locale: Locale) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState<Messages>(enMessages)

  useEffect(() => {
    const currentLocale = getLocaleClient()
    setLocaleState(currentLocale)
    setMessages(messagesMap[currentLocale])
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value]
      } else {
        return key // Return key if not found
      }
    }
    return typeof value === 'string' ? value : key
  }

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setMessages(messagesMap[newLocale])
  }

  return (
    <TranslationContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

