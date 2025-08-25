'use client'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions, AppLang } from './settings'

let inited = false

export function initI18n(lng: string) {
  if (inited && i18next.language === lng) return i18next
  if (!inited) {
    i18next
      .use(initReactI18next)
      .use(resourcesToBackend((lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)))
  }
  i18next.init(getOptions(lng as AppLang))
  inited = true
  return i18next
}
