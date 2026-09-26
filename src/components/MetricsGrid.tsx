'use client'

interface Metric {
  value: string
  label: string
}

const METRICS: Metric[] = [
  {
    value: '5+ yrs',
    label: 'Engineering production enterprise apps',
  },
  {
    value: '50,000+',
    label: 'Hierarchical tree nodes rendered at 60fps (algorithmic recursive components)',
  },
  {
    value: '-30%',
    label: 'Bundle size reduction via Next.js server-side API optimization',
  },
  {
    value: '0 Libs',
    label: 'Bespoke, zero-dependency in-house UI design system',
  },
]

export default function MetricsGrid() {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="border-b border-line py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="metrics-heading" className="sr-only">
          Impact metrics
        </h2>
        <ul className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line-strong sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <li
              key={metric.value}
              className={`relative bg-glass-soft p-5 sm:p-6 ${
                index % 2 === 1 ? 'sm:border-l sm:border-line' : ''
              } ${index >= 2 ? 'lg:border-l lg:border-line' : ''} ${
                index === 2 ? 'sm:border-t sm:border-line lg:border-t-0' : ''
              } ${index === 3 ? 'sm:border-t sm:border-line lg:border-t-0' : ''}`}
            >
              <p className="font-mono text-2xl font-semibold tracking-tight text-[color:var(--accent)] sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{metric.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
