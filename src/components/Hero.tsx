'use client'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <section className="section grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-gray-700">{t('hero.hi')}</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-1">{t('hero.name')}</h1>
        <h2 className="text-xl md:text-2xl font-semibold mt-1">{t('hero.role')}</h2>
        <p className="section-sub mt-4">{t('hero.desc')}</p>
        <a href="/resume.pdf" className="btn btn-primary mt-6">{t('navbar.cv')}</a>
      </div>
      <div>
        <div className="placeholder-box" />
      </div>
    </section>
  )
}
