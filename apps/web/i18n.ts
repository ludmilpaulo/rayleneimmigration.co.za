// i18n configuration
export const locales = ['en', 'pt', 'fr'] as const
export const defaultLocale = 'en' as const
export type Locale = typeof locales[number]

// Locale names for display
export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  fr: 'Français',
}

