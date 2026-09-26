import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--surface)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
        elevated: 'var(--surface-elevated)',
        panel: 'var(--surface-panel)',
        glass: 'var(--glass)',
        'glass-soft': 'var(--glass-soft)',
        hover: 'var(--hover)',
        overlay: 'var(--overlay)',
        ink: {
          DEFAULT: 'var(--fg)',
          soft: 'var(--fg-soft)',
          muted: 'var(--fg-muted)',
          subtle: 'var(--fg-subtle)',
          faint: 'var(--fg-faint)',
        },
        line: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          hover: 'var(--border-hover)',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px var(--accent-glow)',
      },
    },
  },
  plugins: [],
}

export default config
