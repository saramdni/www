'use client'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="section grid md:grid-cols-2 gap-10 items-start">
      <div className="placeholder-box" />
      <div>
        <h3 className="section-title">{t('about.title')}</h3>
        <p className="section-sub mt-4">{t('about.desc')}</p>
      </div>
    </section>
  )
}
