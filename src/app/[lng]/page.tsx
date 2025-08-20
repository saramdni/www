import Navbar from '@/components/common/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Services from '@/components/Services'
import Projects from '@/components/Projects/Projects'
import Contact from '@/components/Contact'

export default function Home({ params: { lng } }: { params: { lng: string } }) {
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
