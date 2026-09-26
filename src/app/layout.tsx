import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const plusJakarta = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-plus-jakarta',
  weight: '100 900',
  display: 'swap',
})

const jetbrainsMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-jetbrains',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sara Madani · Design & Code',
  description:
    'Staff Frontend Engineer and UI/UX Specialist crafting high-throughput web apps, zero-dependency design systems, and streaming AI agents.',
  metadataBase: new URL('https://saramadani.io'),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Sara Madani · Design & Code',
    description:
      'Engineering enterprise platforms with extreme craft and zero bloatware.',
    url: 'https://saramadani.io',
    siteName: 'saramadani.io',
    type: 'website',
  },
}

const colorModeBootScript = `(function(){try{var k='sm-color-mode';var s=localStorage.getItem(k);var m=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.colorMode=m;document.documentElement.style.colorScheme=m;}catch(e){}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorModeBootScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
