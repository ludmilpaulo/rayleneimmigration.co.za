import { cookies } from 'next/headers'
import { defaultLocale, type Locale } from '@/i18n'

/**
 * Get the current locale from cookies (server-side)
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale
  return locale || defaultLocale
}

