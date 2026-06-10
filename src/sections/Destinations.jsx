import React from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Nigeria from '../assets/Nigeria.avif'
import China from '../assets/china.avif'
import London from '../assets/london.avif'
import NewYork from '../assets/newyork.avif'

const Destinations = () => {
  const destinations = [
    { id: 1, city: 'Lagos', country: 'Nigeria', image: Nigeria, price: 380, tag: 'Popular' },
    { id: 2, city: 'Beijing', country: 'China', image: China, price: 850, tag: 'Trending' },
    { id: 3, city: 'London', country: 'United Kingdom', image: London, price: 500, tag: 'Classic' },
    { id: 4, city: 'New York', country: 'USA', image: NewYork, price: 550, tag: 'Hot Deal' },
  ]

  return (
    <section id='destinations' className='py-20 md:py-28 bg-white'>
      <div className='max-w-7xl mx-auto px-5 md:px-8'>
        <SectionHeading
          eyebrow='Explore'
          title='Popular'
          highlight='Destinations'
          description='Handpicked routes with competitive fares. Your next adventure is one click away.'
          align='center'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {destinations.map((dest) => (
            <article key={dest.id} className='dest-card group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm'>
              <div className='relative h-52 overflow-hidden'>
                <img
                  src={dest.image}
                  alt={dest.city}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-linear-to-t from-navy-900/70 via-transparent to-transparent' />
                <span className='absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold-400 text-navy-900 text-xs font-bold'>
                  {dest.tag}
                </span>
                <div className='absolute bottom-3 left-3 right-3'>
                  <h3 className='font-display text-xl font-bold text-white'>{dest.city}</h3>
                  <p className='text-blue-100/80 text-sm'>{dest.country}</p>
                </div>
              </div>

              <div className='p-5'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <p className='text-xs text-slate-500 uppercase tracking-wide'>From</p>
                    <p className='font-display text-2xl font-bold text-navy-900'>
                      ${dest.price}
                    </p>
                  </div>
                  <span className='text-xs text-slate-400'>per person</span>
                </div>
                <Link
                  to={`/booking?from=Lagos&to=${dest.city}`}
                  className='flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold transition-colors'
                >
                  Book Flight
                  <svg className='w-4 h-4 group-hover:translate-x-0.5 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link to='/booking' className='btn-primary'>
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Destinations
