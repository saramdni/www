'use client'
import { ReactNode, useEffect } from 'react'
import { initI18n } from '@/i18n'

export default function I18nProvider({ children, lng }: { children: ReactNode; lng: string }) {
  useEffect(() => {
    initI18n(lng).changeLanguage(lng)
  }, [lng])
  return <>{children}</>
}
