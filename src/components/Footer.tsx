'use client'

import { getResumeHtmlHref, getResumePdf } from '@/lib/resume'
import { useTheme } from '@/components/theme/ThemeProvider'

export default function Footer() {
  const year = 2026
  const { colorMode } = useTheme()
  const pdf = getResumePdf(colorMode)
  const htmlHref = getResumeHtmlHref(colorMode)

  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-xs text-ink-subtle">
            © {year} Sara Madani · Design & Code
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Built with Next.js, TypeScript, and a zero-dependency design system.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href="mailto:madanisara30@gmail.com"
            className="text-ink-muted transition hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/sara-madani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted transition hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            LinkedIn
          </a>
          <a
            href={htmlHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted transition hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            Resume
          </a>
          <a
            href={pdf.href}
            download={pdf.downloadName}
            className="text-ink-muted transition hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
          >
            PDF
          </a>
        </nav>
      </div>
    </footer>
  )
}
