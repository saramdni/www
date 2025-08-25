import Navbar from '@/components/common/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Services from '@/components/Services'
import Projects from '@/components/Projects/Projects'
import Contact from '@/components/Contact'
import { languages } from '@/i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Home({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  
  return (
    <>
      <Navbar lng={lng} />
      <main className="container">
        <Hero />
        <About />
        <Experience />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
