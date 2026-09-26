'use client'

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import {
  downloadResumePdf,
  getResumeHtmlHref,
  getResumePdf,
  openResumeHtml,
} from '@/lib/resume'
import { useTheme } from '@/components/theme/ThemeProvider'
import type { ColorMode } from '@/lib/theme'

export interface CommandAction {
  id: string
  label: string
  hint: string
  keywords?: string[]
  run: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function buildActions(colorMode: ColorMode): CommandAction[] {
  const pdf = getResumePdf(colorMode)
  return [
    {
      id: 'email',
      label: 'Send Email',
      hint: 'mailto:madanisara30@gmail.com',
      keywords: ['mail', 'contact', 'gmail'],
      run: () => {
        window.location.href = 'mailto:madanisara30@gmail.com'
      },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      hint: 'linkedin.com/sara-madani',
      keywords: ['social', 'profile'],
      run: () => {
        window.open('https://linkedin.com/sara-madani', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'portfolio',
      label: 'View Portfolio Site',
      hint: 'saramadani.io',
      keywords: ['site', 'home', 'web'],
      run: () => {
        window.open('https://saramadani.io/', '_blank', 'noopener,noreferrer')
      },
    },
    {
      id: 'resume-view',
      label: 'View Resume',
      hint: getResumeHtmlHref(colorMode),
      keywords: ['cv', 'html', 'preview', 'view'],
      run: () => openResumeHtml(colorMode),
    },
    {
      id: 'resume-download',
      label: 'Download Resume PDF',
      hint: pdf.downloadName,
      keywords: ['cv', 'pdf', 'download'],
      run: () => downloadResumePdf(colorMode),
    },
  ]
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const { colorMode } = useTheme()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const titleId = useId()
  const actions = useMemo(() => buildActions(colorMode), [colorMode])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter((action) => {
      const haystack = [action.label, action.hint, ...(action.keywords ?? [])]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [actions, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const runAction = useCallback(
    (action: CommandAction) => {
      onOpenChange(false)
      action.run()
    },
    [onOpenChange],
  )

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => (filtered.length === 0 ? 0 : (i + 1) % filtered.length))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) =>
        filtered.length === 0 ? 0 : (i - 1 + filtered.length) % filtered.length,
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const action = filtered[activeIndex]
      if (action) runAction(action)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-elevated-panel shadow-[0_24px_80px_rgba(0,0,0,0.35)] ring-1 ring-[color:var(--accent)]/20"
      >
        <div className="border-b border-line px-4 py-3">
          <p id={titleId} className="sr-only">
            Command palette
          </p>
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--accent)]"
              aria-hidden
            >
              ⌘K
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search actions…"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={
                filtered[activeIndex] ? `${listId}-${filtered[activeIndex].id}` : undefined
              }
              className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-subtle outline-none"
            />
          </div>
        </div>

        <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center font-mono text-xs text-ink-subtle">
              No matching actions
            </li>
          ) : (
            filtered.map((action, index) => {
              const active = index === activeIndex
              return (
                <li key={action.id} role="option" aria-selected={active} id={`${listId}-${action.id}`}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'bg-[color:var(--accent)]/15 text-ink'
                        : 'text-ink-soft hover:bg-hover'
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runAction(action)}
                  >
                    <span className="text-sm font-medium">{action.label}</span>
                    <span className="truncate font-mono text-[11px] text-ink-subtle">
                      {action.hint}
                    </span>
                  </button>
                </li>
              )
            })
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          <span>↑↓ Navigate</span>
          <span>↵ Run · Esc Close</span>
        </div>
      </div>
    </div>
  )
}
