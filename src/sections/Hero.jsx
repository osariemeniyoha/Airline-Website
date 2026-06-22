import React from 'react'
import FlightSearchWidget from '../components/FlightSearchWidget'

const Hero = () => {
  return (
    <section id='home' className='hero-background relative pt-[4.5rem] min-h-screen flex items-center'>
      <div className='hero-overlay' />
      <div className='hero-grid' />

      <div className='relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 py-12 md:py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
          <div>
            <h1 className='animate-fade-up font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-tight'>
              Where the world feels{' '}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-gold-400 to-gold-500'>
                closer
              </span>
            </h1>

            <p className='animate-fade-up animate-fade-up-delay-1 text-lg md:text-xl text-white max-w-lg mt-5 leading-relaxed'>
              Every seat. A destination worth the journey.
            </p>

          </div>

          <div className='animate-fade-up animate-fade-up-delay-2'>
            <FlightSearchWidget compact />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
