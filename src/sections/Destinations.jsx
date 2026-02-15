import React from 'react'
import { Link } from 'react-router-dom'
import Nigeria from '../assets/Nigeria.avif'
import China from '../assets/china.avif'
import London from '../assets/london.avif'
import NewYork from '../assets/newyork.avif'

const Destinations = () => {
  const destinations = [
    {
      id: 1,
      city: 'Lagos',
      country: 'Nigeria',
      image: Nigeria,
      price: 380
    },
    {
      id: 2,
      city: 'Beijing',
      country: 'China',
      image: China,
      price: 850
    },
    {
      id: 3,
      city: 'London',
      country: 'UK',
      image: London,
      price: 500
    },
    {
      id: 4,
      city: 'New York',
      country: 'USA',
      image: NewYork,
      price: 550
    }
  ]

  return (
    <section id='destinations' className='pt-20 pb-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6'>
        
        
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-inter'>
            Popular <span className='text-yellow-500'>Destinations</span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto font-poppins'>
            Explore our most loved destinations. Book your next adventure with <span className='text-yellow-500'>UP AIR</span> .
          </p>
        </div>

        {/* Destinations Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {destinations.map((dest) => (
            <div 
              key={dest.id}
              className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow font-inter'
            >
              {/* Image */}
              <div className='h-48 overflow-hidden'>
                <img 
                  src={dest.image} 
                  alt={dest.city}
                  className='w-full h-full object-cover hover:scale-110 transition-transform duration-300 font-poppins'
                />
              </div>
              
              {/* Content */}
              <div className='p-5'>
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-800'>{dest.city}</h3>
                    <p className='text-gray-600 text-sm'>{dest.country}</p>
                  </div>
                  <span className='bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold'>
                    ${dest.price}
                  </span>
                </div>
                
                <Link 
                  to={`/booking?from=Lagos&to=${dest.city}`}
                  className='block w-full bg-blue-900 hover:bg-blue-800 text-white text-center font-poppins font-semibold py-2 rounded-lg transition-colors mt-3'
                >
                  Book Flight
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className='text-center mt-10'>
          <Link 
            to='/booking'
            className='inline-block border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors'
          >
            View All Destinations
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Destinations