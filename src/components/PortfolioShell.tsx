'use client'

import { useCallback, useEffect, useState } from 'react'
import StudioBar from '@/components/StudioBar'
import Hero from '@/components/Hero'
import MetricsGrid from '@/components/MetricsGrid'
import BentoShowcase from '@/components/BentoShowcase'
import Footer from '@/components/Footer'
import CommandPalette from '@/components/CommandPalette'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

export default function PortfolioShell() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const setOpen = useCallback((open: boolean) => setPaletteOpen(open), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey
      if (isMod && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <ThemeProvider>
      <div id="top" className="relative min-h-screen text-ink">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-obsidian" />
          <div className="absolute inset-0 bg-accent-glow" />
          <div className="absolute inset-0 bg-tech-grid opacity-[0.35]" />
        </div>

        <StudioBar onOpenCommands={openPalette} />
        <main>
          <Hero />
          <MetricsGrid />
          <BentoShowcase />
        </main>
        <Footer />
        <CommandPalette open={paletteOpen} onOpenChange={setOpen} />
      </div>
    </ThemeProvider>
  )
}
