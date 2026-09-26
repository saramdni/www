'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ACCENT_STORAGE_KEY,
  ACCENT_THEMES,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_ACCENT,
  getSystemColorMode,
  resolveColorMode,
  type AccentTheme,
  type ColorMode,
} from '@/lib/theme'

interface ThemeContextValue {
  accent: AccentTheme
  setAccent: (theme: AccentTheme) => void
  colorMode: ColorMode
  setColorMode: (mode: ColorMode) => void
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyAccent(theme: AccentTheme) {
  const token = ACCENT_THEMES[theme]
  const root = document.documentElement
  root.style.setProperty('--accent', token.accent)
  root.style.setProperty('--accent-glow', token.glow)
  root.dataset.accent = theme
}

function applyColorMode(mode: ColorMode) {
  document.documentElement.dataset.colorMode = mode
  document.documentElement.style.colorScheme = mode
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentTheme>(DEFAULT_ACCENT)
  const [colorMode, setColorModeState] = useState<ColorMode>('dark')

  useEffect(() => {
    const storedAccent = window.localStorage.getItem(ACCENT_STORAGE_KEY) as AccentTheme | null
    const initialAccent =
      storedAccent && storedAccent in ACCENT_THEMES ? storedAccent : DEFAULT_ACCENT
    setAccentState(initialAccent)
    applyAccent(initialAccent)

    const fromDom = document.documentElement.dataset.colorMode
    const initialMode =
      fromDom === 'light' || fromDom === 'dark' ? fromDom : resolveColorMode()
    setColorModeState(initialMode)
    applyColorMode(initialMode)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      // Follow OS only until the user explicitly picks a mode.
      if (window.localStorage.getItem(COLOR_MODE_STORAGE_KEY)) return
      const next = getSystemColorMode()
      setColorModeState(next)
      applyColorMode(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const setAccent = useCallback((theme: AccentTheme) => {
    setAccentState(theme)
    applyAccent(theme)
    window.localStorage.setItem(ACCENT_STORAGE_KEY, theme)
  }, [])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    applyColorMode(mode)
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
  }, [])

  const toggleColorMode = useCallback(() => {
    setColorModeState((prev) => {
      const next: ColorMode = prev === 'dark' ? 'light' : 'dark'
      applyColorMode(next)
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ accent, setAccent, colorMode, setColorMode, toggleColorMode }),
    [accent, setAccent, colorMode, setColorMode, toggleColorMode],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
