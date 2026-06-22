import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section className='py-16 md:py-20 bg-linear-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,200,66,0.12),transparent_60%)]' />
      <div className='relative max-w-4xl mx-auto px-5 md:px-8 text-center'>
        <h2 className='font-display text-3xl md:text-4xl font-bold text-white tracking-tight'>
          Your seat is waiting
        </h2>
        <p className='text-blue-100/70 mt-4 text-lg max-w-xl mx-auto'>
          Join 10 million travelers who trust UP AIR for journeys that matter.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 justify-center mt-8'>
          <Link to='/booking' className='btn-primary'>
            Book a Flight
          </Link>
          <a href='#destinations' className='btn-outline'>
            Browse Destinations
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
