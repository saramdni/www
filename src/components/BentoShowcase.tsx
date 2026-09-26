'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ShengTab = 'architecture' | 'design' | 'ai'

interface TabDef {
  id: ShengTab
  label: string
  body: string
}

const SHENG_TABS: TabDef[] = [
  {
    id: 'architecture',
    label: '01. Architecture',
    body:
      'Unified enterprise IT platform for Fakoor Sanat Tehran — Next.js App Router, TypeScript end-to-end, and a modular domain architecture spanning identity, operations, and realtime workflows.',
  },
  {
    id: 'design',
    label: '02. Design System',
    body:
      'Zero-dependency component kit with accessible primitives, strict tokens, and interaction patterns. Full UI/UX authored in Figma and implemented 1:1 without external UI libraries.',
  },
  {
    id: 'ai',
    label: '03. Enterprise AI',
    body:
      'Corporate AI platform integration featuring Porsa — a streaming assistant wired into enterprise surfaces for grounded answers, operator tooling, and low-latency token delivery.',
  },
]

const TECH_TAGS = [
  'Next.js 15',
  'TypeScript',
  'Zero External UI Libs',
  'Full UI/UX',
] as const

const STREAM_SCRIPT = [
  '> initializing Porsa agent runtime…',
  '> connecting to enterprise context graph',
  '> tools: search_docs · query_ops · summarize',
  '',
  'Porsa: Routing your request through the Sheng OS knowledge layer.',
  'Porsa: Synthesizing a grounded response with live telemetry…',
  '',
  'Latency budget: 40ms / token · stream: open',
  'Done. Ready for the next operator prompt.',
].join('\n')

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

const DEMO_TREE: TreeNode[] = [
  {
    id: 'org',
    label: 'Fakoor Sanat',
    children: [
      {
        id: 'platform',
        label: 'Sheng OS',
        children: [
          {
            id: 'identity',
            label: 'Identity & Access',
            children: [
              { id: 'rbac', label: 'RBAC Policies' },
              { id: 'sso', label: 'SSO Connectors' },
            ],
          },
          {
            id: 'ops',
            label: 'Operations',
            children: [
              { id: 'assets', label: 'Asset Registry' },
              { id: 'tickets', label: 'Service Tickets' },
              {
                id: 'telemetry',
                label: 'Telemetry',
                children: [
                  { id: 'metrics', label: 'Metrics Pipeline' },
                  { id: 'logs', label: 'Structured Logs' },
                ],
              },
            ],
          },
          {
            id: 'ai-layer',
            label: 'AI Layer',
            children: [
              { id: 'Porsa', label: 'Porsa Assistant' },
              { id: 'rag', label: 'RAG Index' },
            ],
          },
        ],
      },
      {
        id: 'mobile',
        label: 'React Native Clients',
        children: [
          { id: 'field', label: 'Field Ops App' },
          { id: 'admin', label: 'Admin Companion' },
        ],
      },
    ],
  },
]

interface TreeItemProps {
  node: TreeNode
  depth?: number
  expanded: Set<string>
  onToggle: (id: string) => void
}

function TreeItem({ node, depth = 0, expanded, onToggle }: TreeItemProps) {
  const hasChildren = Boolean(node.children?.length)
  const isOpen = expanded.has(node.id)

  return (
    <li>
      <div
        className="flex items-center gap-1.5 rounded-md py-1 pr-2 text-sm text-ink-soft transition hover:bg-hover"
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${node.label}`}
            onClick={() => onToggle(node.id)}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] text-ink-subtle transition hover:bg-hover hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--accent)]"
          >
            {isOpen ? '▾' : '▸'}
          </button>
        ) : (
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[10px] text-ink-faint" aria-hidden>
            ·
          </span>
        )}
        <span className={hasChildren ? 'font-medium text-ink-soft' : 'font-mono text-xs text-ink-muted'}>
          {node.label}
        </span>
      </div>
      {hasChildren && isOpen && node.children ? (
        <ul role="group">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function PorsaTerminal() {
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const timerRef = useRef<number | null>(null)
  const indexRef = useRef(0)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => () => clearTimer(), [clearTimer])

  const triggerStream = () => {
    clearTimer()
    indexRef.current = 0
    setOutput('')
    setStreaming(true)

    timerRef.current = window.setInterval(() => {
      const next = indexRef.current + 1
      indexRef.current = next
      setOutput(STREAM_SCRIPT.slice(0, next))
      if (next >= STREAM_SCRIPT.length) {
        clearTimer()
        setStreaming(false)
      }
    }, 40)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
            Interactive Live Lab
          </p>
          <h3 className="mt-1 text-base font-semibold text-ink">Porsa AI Agent</h3>
        </div>
        <button
          type="button"
          onClick={triggerStream}
          disabled={streaming}
          className="shrink-0 rounded-lg border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/15 px-3 py-1.5 font-mono text-[11px] font-medium text-[color:var(--accent)] transition hover:bg-[color:var(--accent)]/25 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
        >
          {streaming ? 'Streaming…' : 'Trigger Stream'}
        </button>
      </div>

      <div
        className="relative min-h-[220px] flex-1 overflow-hidden rounded-lg border border-line-strong bg-panel p-3 font-mono text-[11px] leading-relaxed text-ink-soft sm:text-xs"
        aria-live="polite"
        aria-relevant="additions"
      >
        <div className="mb-2 flex items-center gap-1.5 border-b border-line pb-2">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-[10px] text-ink-faint">Porsa@sheng-os — zsh</span>
        </div>
        <pre className="whitespace-pre-wrap break-words">
          {output || (
            <span className="text-ink-faint">
              Idle. Press “Trigger Stream” to simulate 40ms token delivery.
            </span>
          )}
          {streaming ? <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[color:var(--accent)] align-middle" /> : null}
        </pre>
      </div>
    </div>
  )
}

function TreeDemo() {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(['org', 'platform', 'ops']),
  )

  const onToggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
        Performance Case
      </p>
      <h3 className="mt-1 text-base font-semibold text-ink">
        50K+ Nodes Tree View
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Expandable recursive tree with typed interfaces — smooth toggles modeled after
        production hierarchical renderers.
      </p>
      <ul
        className="mt-4 max-h-[240px] flex-1 overflow-y-auto rounded-lg border border-line-strong bg-panel p-2"
        role="tree"
        aria-label="Enterprise hierarchy demo"
      >
        {DEMO_TREE.map((node) => (
          <TreeItem
            key={node.id}
            node={node}
            expanded={expanded}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  )
}

function ShengFlagship() {
  const [tab, setTab] = useState<ShengTab>('architecture')
  const tablistId = useId()
  const active = SHENG_TABS.find((t) => t.id === tab) ?? SHENG_TABS[0]

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
            Flagship System
          </p>
          <h3 className="mt-1 text-lg font-semibold text-ink">
            Sheng OS
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            Fakoor Sanat Tehran — enterprise IT platform
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {TECH_TAGS.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line-strong bg-glass px-2 py-0.5 font-mono text-[10px] text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div
        role="tablist"
        aria-label="Sheng OS topics"
        id={tablistId}
        className="mt-5 flex flex-wrap gap-1 border-b border-line pb-px"
      >
        {SHENG_TABS.map((item) => {
          const selected = item.id === tab
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${tablistId}-${item.id}`}
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              className={`rounded-t-md px-3 py-2 font-mono text-[11px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] ${
                selected
                  ? 'border-b-2 border-[color:var(--accent)] text-[color:var(--accent)]'
                  : 'text-ink-subtle hover:text-ink-soft'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-labelledby={`${tablistId}-${active.id}`}
        className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft"
      >
        {active.body}
      </div>
    </div>
  )
}

function DataLayerCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
          Data Layer Optimization
        </p>
        <h3 className="mt-1 text-lg font-semibold text-ink">
          Cache-tuned clients, leaner state, faster fetches
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          TanStack Query / React Query cache policies and Redux state boundaries cut
          redundant network work — measured{' '}
          <span className="font-mono text-[color:var(--accent)]">~40%</span> lower data
          fetch latency — with shared domain models shipping to React Native surfaces.
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:min-w-[220px]">
        {[
          { k: 'Stack', v: 'TanStack Query' },
          { k: 'State', v: 'Redux' },
          { k: 'Latency', v: '−40%' },
          { k: 'Mobile', v: 'React Native' },
        ].map((row) => (
          <div
            key={row.k}
            className="rounded-lg border border-line-strong bg-glass-soft px-3 py-2"
          >
            <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
              {row.k}
            </dt>
            <dd className="mt-0.5 font-mono text-sm text-ink-soft">{row.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function BentoCell({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <article
      className={`rounded-xl border border-line-strong bg-gradient-to-b from-glass to-transparent p-5 transition hover:border-line-hover sm:p-6 ${className ?? ''}`}
    >
      {children}
    </article>
  )
}

export default function BentoShowcase() {
  return (
    <section
      aria-labelledby="showcase-heading"
      className="border-b border-line py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
            02 // Engineering Showcase
          </p>
          <h2
            id="showcase-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Systems, agents, and performance in production
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <BentoCell className="md:col-span-8">
            <ShengFlagship />
          </BentoCell>
          <BentoCell className="md:col-span-4">
            <PorsaTerminal />
          </BentoCell>
          <BentoCell className="md:col-span-4">
            <TreeDemo />
          </BentoCell>
          <BentoCell className="md:col-span-8">
            <DataLayerCard />
          </BentoCell>
        </div>
      </div>
    </section>
  )
}
