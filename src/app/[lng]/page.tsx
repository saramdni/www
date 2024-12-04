import Link from 'next/link'
import { useTranslation } from '../i18n'
import Header from '@/components/common/header'

type HomeProps = {
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  const supportedLanguages = ['en', 'fa']
  return supportedLanguages.map((lng) => ({ lng }))
}

export default async function Home({ params }: HomeProps) {
  const lng = params?.lng // Destructure params synchronously
  const { t } = await useTranslation(lng)

  return (
    <div className="grid mt-8 grid-rows-[16px_1fr_16px] justify-items-center min-h-screen gap-16">
      <Header params={{ lng }} />
      <h1>Hi, I am Sara</h1>
      <h1>{t('title')}</h1>
      <Link href={`/${lng}/about`}>{t('to-second-page')}</Link>
    </div>
  )
}
