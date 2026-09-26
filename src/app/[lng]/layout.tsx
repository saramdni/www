import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sara Madani · Design & Code',
  description:
    'Staff Frontend Engineer and UI/UX Specialist crafting high-throughput web apps, zero-dependency design systems, and streaming AI agents.',
}

export default function LanguageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
