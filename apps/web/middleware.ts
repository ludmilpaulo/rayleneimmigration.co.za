import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, type Locale } from './i18n'

function getLocale(request: NextRequest): Locale {
  // Check cookie first
  const cookieLocale = request.cookies.get('locale')?.value as Locale
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Check Accept-Language header
  const headerLocale = request.headers.get('accept-language')
  if (headerLocale) {
    for (const locale of locales) {
      if (headerLocale.includes(locale)) {
        return locale as Locale
      }
    }
  }

  // Default to defaultLocale
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and _next paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const locale = getLocale(request)
  const response = NextResponse.next()
  
  // Set locale in response header and cookie if not already set
  if (!request.cookies.get('locale')) {
    response.cookies.set('locale', locale, { 
      path: '/',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
  }
  
  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
