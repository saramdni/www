'use client'
import { useTranslation } from 'react-i18next'
import { projects } from '@/data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { t } = useTranslation()
  const cats: { key: keyof typeof projects; title: string }[] = [
    { key: 'mobile', title: t('projects.mobile') },
    { key: 'website', title: t('projects.website') },
    { key: 'dashboard', title: t('projects.dashboard') },
  ]

  return (
    <section id="projects" className="section">
      <h3 className="section-title">{t('projects.title')}</h3>
      <p className="section-sub mt-2">{t('projects.subtitle')}</p>

      {cats.map((c) => (
        <div key={c.key} className="mt-10">
          <h4 className="text-lg font-semibold mb-4">{c.title}</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects[c.key].map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
