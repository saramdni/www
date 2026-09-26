export type AccentTheme = 'indigo' | 'emerald' | 'violet'

export interface AccentToken {
  id: AccentTheme
  label: string
  accent: string
  glow: string
}

export const ACCENT_THEMES: Record<AccentTheme, AccentToken> = {
  indigo: {
    id: 'indigo',
    label: 'Indigo',
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.35)',
  },
  emerald: {
    id: 'emerald',
    label: 'Emerald',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  violet: {
    id: 'violet',
    label: 'Violet',
    accent: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.35)',
  },
}

export const DEFAULT_ACCENT: AccentTheme = 'indigo'

export type ColorMode = 'light' | 'dark'

export const COLOR_MODE_STORAGE_KEY = 'sm-color-mode'
export const ACCENT_STORAGE_KEY = 'sm-accent-theme'

export function getSystemColorMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export function resolveColorMode(): ColorMode {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return getSystemColorMode()
}
