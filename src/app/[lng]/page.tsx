import PortfolioShell from '@/components/PortfolioShell'
import { languages } from '@/i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  await params
  return <PortfolioShell />
}
