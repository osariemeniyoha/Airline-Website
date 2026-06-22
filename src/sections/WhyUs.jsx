import React from 'react'
import SectionHeading from '../components/SectionHeading'

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <div className='group relative bg-white rounded-2xl p-7 md:p-8 border border-slate-100 hover:border-navy-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-navy-900/5 hover:-translate-y-1'>
      <div className='flex items-start gap-5'>
        <div className='shrink-0 w-14 h-14 rounded-xl bg-navy-900 flex items-center justify-center group-hover:bg-gold-400 transition-colors duration-300'>
          {Icon && (
            <span className='text-gold-400 group-hover:text-navy-900 transition-colors duration-300'>
              <Icon />
            </span>
          )}
        </div>
        <div>
          <span className='text-xs font-bold text-gold-600 tracking-wider'>0{index + 1}</span>
          <h3 className='font-display text-xl font-bold text-navy-900 mt-1 mb-2'>
            {title}
          </h3>
          <p className='text-slate-600 leading-relaxed'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const WhyUs = () => {
  const IconPhone = () => (
    <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z' />
    </svg>
  )

  const IconShield = () => (
    <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
      <path fillRule='evenodd' d='M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z' clipRule='evenodd' />
    </svg>
  )

  const IconMoney = () => (
    <svg className='w-7 h-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z' />
    </svg>
  )

  const IconClock = () => (
    <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z' />
    </svg>
  )

  const features = [
    {
      icon: IconPhone,
      title: 'Fast Booking',
      description: 'Our intuitive booking flow gets you from search to seat in under two minutes, no hidden steps, no friction.',
    },
    {
      icon: IconShield,
      title: 'Safety First',
      description: 'Modern fleet, rigorous maintenance schedules, and crew trained to the highest international standards.',
    },
    {
      icon: IconMoney,
      title: 'Transparent Pricing',
      description: 'Competitive fares with no surprise fees. What you see at checkout is exactly what you pay.',
    },
    {
      icon: IconClock,
      title: 'On-Time Performance',
      description: 'A 99.2% on-time departure rate backed by smart scheduling and real-time operational intelligence.',
    },
  ]

  return (
    <section id='whyus' className='py-20 md:py-28 bg-slate-50'>
      <div className='max-w-7xl mx-auto px-5 md:px-8'>
        <SectionHeading
          title='Why Travelers Choose'
          highlight=' UP AIR'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
