export const fallbackLng = 'en' as const
export const languages = [fallbackLng, 'fa'] as const
export type AppLang = typeof languages[number]

export function getOptions(lng: AppLang = fallbackLng) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  }
}

export const isRTL = (lng: string) => lng === 'fa'
