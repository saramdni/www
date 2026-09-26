'use client'

import { ACCENT_THEMES, type AccentTheme } from '@/lib/theme'
import { useTheme } from '@/components/theme/ThemeProvider'
import ColorModeToggle from '@/components/ColorModeToggle'
import NavbarLogo from '@/components/NavbarLogo'

interface StudioBarProps {
  onOpenCommands: () => void
}

const SWATCHES = Object.values(ACCENT_THEMES)

export default function StudioBar({ onOpenCommands }: StudioBarProps) {
  const { accent, setAccent } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface-nav backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <NavbarLogo />

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Accent theme"
          >
            {SWATCHES.map((swatch) => {
              const selected = accent === swatch.id
              return (
                <button
                  key={swatch.id}
                  type="button"
                  aria-label={`${swatch.label} accent`}
                  aria-pressed={selected}
                  title={swatch.label}
                  onClick={() => setAccent(swatch.id as AccentTheme)}
                  className={`relative h-3.5 w-3.5 rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-[color:var(--accent)] ${
                    selected
                      ? 'scale-110 ring-2 ring-ink/25'
                      : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: swatch.accent }}
                />
              )
            })}
          </div>

          <ColorModeToggle />

          <button
            type="button"
            onClick={onOpenCommands}
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-glass px-2.5 py-1.5 text-xs text-ink-muted transition hover:border-line-hover hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            <kbd className="hidden font-mono text-[10px] text-ink-faint sm:inline">⌘K</kbd>
            <span className="font-medium">Actions</span>
          </button>
        </div>
      </div>
    </header>
  )
}
