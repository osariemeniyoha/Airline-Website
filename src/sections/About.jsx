import React from 'react'
import SectionHeading from '../components/SectionHeading'
import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { number: '100+', title: 'Daily Flights' },
  { number: '120+', title: 'Destinations' },
  { number: '10M+', title: 'Happy Travelers' },
  { number: '10+', title: 'Years Flying' },
]

const About = () => {
  const { ref, inView } = useScrollReveal()

  return (
    <section id='about' className='py-20 md:py-28 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-5 md:px-8'>
        <SectionHeading
          title={`No Ordinary`}
          highlight='Airline'
          className='mb-6 md:mb-8'
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16'>
          <div className='space-y-5'>
            <p className='text-lg text-slate-600 leading-relaxed'>
             What started as a single route is now a global network across 120 destinations. Built on one belief that flying should feel like the journey, not just the means to one.
            </p>
          </div>

          <div className='relative rounded-2xl overflow-hidden bg-navy-900 p-8 md:p-10 text-white'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl' />
            <blockquote className='relative'>
              <svg className='w-10 h-10 text-gold-400/40 mb-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
              </svg>
              <p className='text-lg md:text-xl leading-relaxed text-blue-100/90 italic'>
               To make every flight feel like it was designed around you, not the other way around.
              </p>
              <footer className='mt-6 text-gold-400 font-semibold text-sm tracking-wide uppercase'>
                 Our Mission
              </footer>
            </blockquote>
          </div>
        </div>

      {/* Stats strip */}
        <div
          ref={ref}
          className={`stats-strip ${inView ? 'animate-fade-up' : 'opacity-0'}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stats-strip-item opacity-0 ${inView ? 'animate-fade-up' : ''}`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className='font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
                {stat.number}
              </span>
              <span className='text-sm md:text-base text-blue-100/70 font-medium'>
                {stat.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

