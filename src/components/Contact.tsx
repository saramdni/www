'use client'
import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="section text-center">
      <h3 className="section-title">{t('contact.title')}</h3>
      <p className="section-sub mt-4 max-w-3xl mx-auto">{t('contact.desc')}</p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <a className="btn" href="https://linkedin.com" target="_blank" rel="noreferrer">{t('contact.linkedin')}</a>
        <a className="btn" href="https://github.com" target="_blank" rel="noreferrer">{t('contact.github')}</a>
      </div>
    </section>
  )
}
