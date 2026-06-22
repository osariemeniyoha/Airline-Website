import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Destinations from '../sections/Destinations'
import WhyUs from '../sections/WhyUs'
import Testimonials from '../sections/Testimonials'
import CTA from '../sections/CTA'

const LandingPage = () => {
  const { ref: heroRef, inView: heroInView } = useScrollReveal({ threshold: 0 })
  const { ref: aboutRef, inView: aboutInView } = useScrollReveal()
  const { ref: destRef, inView: destInView } = useScrollReveal()
  const { ref: whyRef, inView: whyInView } = useScrollReveal()
  const { ref: testRef, inView: testInView } = useScrollReveal()
  const { ref: ctaRef, inView: ctaInView } = useScrollReveal()

  return (
    <>
      <Navbar />
      <div ref={heroRef} className={heroInView ? 'animate-fade-down' : 'opacity-0'}>
        <Hero />
      </div>
      <div ref={aboutRef} className={aboutInView ? 'animate-fade-up' : 'opacity-0'}>
        <About />
      </div>
      <div ref={destRef} className={destInView ? 'animate-fade-up' : 'opacity-0'}>
        <Destinations />
      </div>
      <div ref={whyRef} className={whyInView ? 'animate-fade-up' : 'opacity-0'}>
        <WhyUs />
      </div>
      <div ref={testRef} className={testInView ? 'animate-fade-up' : 'opacity-0'}>
        <Testimonials />
      </div>
      <div ref={ctaRef} className={ctaInView ? 'animate-fade-up' : 'opacity-0'}>
        <CTA />
      </div>
      <Footer />
    </>
  )
}

export default LandingPage