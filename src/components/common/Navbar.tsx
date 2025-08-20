'use client'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation()
  const other = lng === 'fa' ? 'en' : 'fa'

  const nav = [
    { href: `/${lng}#about`, label: t('navbar.about') },
    { href: `/${lng}#experience`, label: t('navbar.experience') },
    { href: `/${lng}#services`, label: t('navbar.services') },
    { href: `/${lng}#projects`, label: t('navbar.projects') },
    { href: `/${lng}#contact`, label: t('navbar.contact') }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${lng}`} className="text-lg md:text-xl font-extrabold">{t('brand')}</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hover:underline">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="/resume.pdf" className="btn btn-primary text-sm">{t('navbar.cv')}</a>
          <Link className="btn text-sm" href={`/${other}`}>{t('navbar.lang')}</Link>
        </div>
      </div>
    </header>
  )
}
