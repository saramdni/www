'use client'
import { useTranslation } from 'react-i18next'
import { experiences } from '@/data/experience'

export default function Experience() {
  const { t } = useTranslation()
  return (
    <section id="experience" className="section">
      <h3 className="section-title mb-10">{t('experience.title')}</h3>
      <div className="relative border-s-2 border-gray-200 ps-6 space-y-10">
        {experiences.map((e, i) => (
          <div key={i} className="relative">
            <span className="absolute -start-3 top-1 w-5 h-5 rounded-full bg-black" />
            <h4 className="font-semibold">{e.company}</h4>
            <p className="text-xs text-gray-500">{e.date}</p>
            <p className="section-sub mt-2">
              <b>{t('experience.position')}:</b> {e.position}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
