import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../app/i18n/settings'
import { useTranslation } from '../../app/i18n'

type HeaderProps = {
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  const supportedLanguages = ['en', 'fa']
  return supportedLanguages.map((lng) => ({ lng }))
}

export default async function Header({ params }: HeaderProps) {
  const { lng } = params // Destructure params synchronously
  const { t } = await useTranslation(lng, 'header')

  return (
    <header style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{lng}</strong> to:{' '}
      </Trans>
      {languages
        .filter((language) => language !== lng) // Clearer variable name
        .map((language, index) => (
          <span key={language}>
            {index > 0 && ' or '}
            <Link href={`/${language}`}>{language}</Link>
          </span>
        ))}
    </header>
  )
}
