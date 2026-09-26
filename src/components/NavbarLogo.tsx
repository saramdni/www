import Link from 'next/link'

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 84 48"
        fill="none"
        className="h-8 w-14 transition-transform duration-300 group-hover:scale-105"
        aria-hidden
      >
        <rect width="84" height="48" rx="12" fill="#080A12" />
        <rect
          x="0.75"
          y="0.75"
          width="82.5"
          height="46.5"
          rx="11.25"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          className="transition-colors group-hover:stroke-indigo-500/40"
        />
        <circle cx="42" cy="24" r="16" fill="#6366F1" fillOpacity="0.2" />

        <path
          d="M 16 16 L 9 24 L 16 32"
          stroke="#64748B"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 30 17 H 24 C 22 17 20.5 18.5 20.5 20 C 20.5 21.8 22 23 24 23 H 27.5 C 29.5 23 31 24.2 31 26 C 31 27.8 29.5 29.5 27.5 29.5 H 21"
          stroke="#F8FAFC"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 37 30 V 17 L 43 24.5 L 49 17 V 30"
          stroke="url(#navSmGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1="55"
          y1="31"
          x2="61"
          y2="15"
          stroke="#6366F1"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        <path
          d="M 67 16 L 74 24 L 67 32"
          stroke="#64748B"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="76" cy="11" r="2.2" fill="#10B981" />

        <defs>
          <linearGradient
            id="navSmGrad"
            x1="37"
            y1="17"
            x2="49"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>
        </defs>
      </svg>

      <span className="font-semibold text-sm tracking-tight text-ink-soft transition-colors group-hover:text-ink">
        saramadani<span className="text-[color:var(--accent)]">.io</span>
      </span>
      <span className="sr-only">Sara Madani home</span>
    </Link>
  )
}
