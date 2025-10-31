import { defaultLocale, type Locale } from '@/i18n'

/**
 * Get locale from cookies (client-side)
 */
export function getLocaleClient(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  
  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find(c => c.trim().startsWith('locale='))
  if (localeCookie) {
    const locale = localeCookie.split('=')[1].trim() as Locale
    if (['en', 'pt', 'fr'].includes(locale)) {
      return locale
    }
  }
  
  return defaultLocale
}

/**
 * Set locale cookie (client-side)
 */
export function setLocale(locale: Locale) {
  if (typeof window === 'undefined') return
  
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`
  // Reload the page to apply the new locale
  window.location.reload()
}
