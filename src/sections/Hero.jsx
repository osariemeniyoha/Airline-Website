import React from 'react'
import { Link } from 'react-router-dom'


const Hero = () => {
  
  return (
     <section id='home' className='hero-background pt-20 min-h-[calc(100vh-80px)] flex items-center text-white '>
      <div className='overlay'></div>

      <div className='content max-w-6xl mx-auto px-6'>
       
        <h1 className='text-4xl md:text-5xl font-inter font-bold leading-normal'>
          Comfort Safety And Global Reach 
        </h1>


        <h2 className='font-montserrat font-bold text-xl md:text-2xl mt-2 '>
          Fly With <span className='text-yellow-500'>UP AIR</span> Airline
        </h2>


        <p className='font-inter text-lg md:text-xl text-blue-200 max-w-xl mt-4'>
          Experience comfort, safety, and world class service on every flight
        </p>


        <div className='flex flex-col sm:flex-row gap-4 mt-8 font-inter'>
          
          <button className='bg-yellow-500 px-8 py-3 rounded-lg font-semibold text-center hover:bg-yellow-400 transition duration-300 '>
            <Link to='/booking'>
             Book a Flight 
            </Link>
          </button>

          <button className=' border-2 border-yellow-500 text-yellow-500 
          px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 
          hover:text-gray-900 transition duration-300 text-center'>
             <a href='#destinations'>
             Explore Destination
            </a>
          </button>


        </div>
      </div>  
    </section>
  )
}

export default Hero