import React from 'react'
import SectionHeading from '../components/SectionHeading'
import StatCard from '../components/StatCard'

const About = () => {
  const stats = [
    { number: '100+', title: 'Daily Flights', subtitle: 'Across continents' },
    { number: '120+', title: 'Destinations', subtitle: 'Global network' },
    { number: '10M+', title: 'Happy Travelers', subtitle: 'Trusted service' },
    { number: '10+', title: 'Years Flying', subtitle: 'Industry leader' },
  ]

  return (
    <section id='about' className='py-20 md:py-28 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-5 md:px-8'>
        <SectionHeading
          eyebrow='About Us'
          title='Redefining air travel with'
          highlight='UP AIR'
          description='From a regional carrier to a globally trusted airline — we connect people, cultures, and opportunities across every continent.'
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16'>
          <div className='space-y-5'>
            <p className='text-lg text-slate-600 leading-relaxed'>
              Founded with a vision to make air travel accessible, comfortable, and
              enjoyable for everyone, UP AIR has grown into one of the most trusted
              names in aviation.
            </p>
            <p className='text-lg text-slate-600 leading-relaxed'>
              Our commitment to safety, innovation, and customer satisfaction has
              earned us numerous awards and the loyalty of millions of travelers worldwide.
            </p>
          </div>

          <div className='relative rounded-2xl overflow-hidden bg-navy-900 p-8 md:p-10 text-white'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl' />
            <blockquote className='relative'>
              <svg className='w-10 h-10 text-gold-400/40 mb-4' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
              </svg>
              <p className='text-lg md:text-xl leading-relaxed text-blue-100/90 italic'>
                To redefine air travel by making it more accessible, comfortable,
                and sustainable while maintaining the highest standards of safety
                and customer service.
              </p>
              <footer className='mt-6 text-gold-400 font-semibold text-sm tracking-wide uppercase'>
                — Our Mission
              </footer>
            </blockquote>
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
