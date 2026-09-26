'use client'

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative border-b border-line py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] sm:text-xs">
          01 // PRODUCT ENGINEER &amp; UI SPECIALIST
        </p>

        <h1
          id="hero-title"
          className="max-w-4xl text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl sm:leading-[1.1]"
        >
          Engineering enterprise platforms with extreme craft and zero bloatware.
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
          Staff Frontend Engineer and UI/UX Specialist crafting high-throughput web
          apps, custom zero-dependency design systems, and streaming AI agents.
        </p>

        <div className="mt-8">
          <span
            className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm"
            style={{
              color: 'var(--status-fg)',
              backgroundColor: 'var(--status-bg)',
              border: '1px solid var(--status-border)',
            }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Building at Fakoor Sanat
          </span>
        </div>
      </div>
    </section>
  )
}
