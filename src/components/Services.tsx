'use client'
import { useTranslation } from 'react-i18next'

export default function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className="section">
      <h3 className="section-title">{t('services.title')}</h3>
      <p className="section-sub mt-4 max-w-3xl">{t('services.desc')}</p>
    </section>
  )
}
