import React from 'react'
import Link from 'next/link'
import { useTranslation } from '../../i18n'
import Header from '@/components/common/header'

type AboutProps = {
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  const supportedLanguages = ['en', 'fa']
  return supportedLanguages.map((lng) => ({ lng }))
}

export default async function About({ params }: AboutProps) {
  const { lng } = params // Destructure params synchronously
  const { t } = await useTranslation(lng, 'second-page')

  return (
    <div className="grid mt-8 justify-items-center">
      <Header params={{ lng }} />
      <h1>Hi, I am Sara</h1>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}`}>{t('back-to-home')}</Link>
      <h2>This is the About Me page</h2>
      <h2>We are going to learn about me on this page soon...</h2>
      <Link href={`/${lng}`}>Back</Link>
    </div>
  )
}
