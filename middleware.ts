import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, fallbackLng } from './src/i18n/settings'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hasLng = languages.some((l) => pathname.startsWith(`/${l}`))
  if (!hasLng) {
    const url = req.nextUrl.clone()
    url.pathname = `/${fallbackLng}${pathname}`
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|.*..*).*)'] }
