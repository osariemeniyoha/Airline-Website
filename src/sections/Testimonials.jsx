import React, { useState, useEffect, useCallback } from 'react'
import User from '../assets/user-1.jpg'
import User2 from '../assets/user-2.jpg'
import User3 from '../assets/user-3.jpg'



const Testimonials = () => {

  const testimonials = [
    {
      id: 1,
      name: 'Willams Igwe',
      location: 'Lagos to London',
      text: 'Booking was incredibly smooth and the flight departed exactly on time. I felt safe and comfortable throughout the journey.',
      image: User
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'New York to Tokyo',
      text: 'The premium economy seats were amazing! Great legroom and service. Will definitely fly with UP AIR again.',
      image: User2
    },
    {
      id: 3,
      name: 'Matthew Ethan',
      location: 'Dubai to Paris',
      text: 'Excellent customer service from booking to landing. The crew was attentive and made the long flight enjoyable.',
      image: User3
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Next Slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length -1 ? 0 : prevIndex + 1 
    )
  }, [testimonials.length])

  
  // Previous Slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length-1 : prevIndex -1
    )
  }, [testimonials.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }



  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])


  return (
     <section id='testimonials' className='bg-gray-100 min-h-screen flex items-center'>

      <div className='max-w-6xl mx-auto px-6 w-full'>


        <div className='text-center mb-12'>
          
          <h2 className='text-3xl md:text-4xl lg:text-5xl
          font-bold text-blue-900 mb-4'>
            What Our <span className='text-yellow-500'> Passengers Say</span>
          </h2>

          <p className='text-gray-600 text-lg max-w-2xl mx-auto mb-10'>
            Hear from travelers who have experienced the <span className='text-yellow-500'>UP AIR</span> difference
          </p>
        </div>


        {/* Slider Component */}
        <div className='relative w-full max-w-4xl mx-auto'>

          {/* Card */}
          <div className='bg-white rounded-xl shadow-2xl p-8 md:p-12
          flex flex-col items-center text-center'>

            <p className='text-gray-700 text-lg md:text-xl
            italic mb-8 leading-relaxed max-w-2xl'>
              {testimonials[currentIndex].text}
            </p>


            <div className='flex flex-col items-center'>
              <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className='w-20 h-20 md:w-24 md:h-24 rounded-full
              object-cover border-4 border-blue-100 mb-4'/>

              <h4 className='font-bold text-xl text-gray-800'>
                {testimonials[currentIndex].name}
              </h4>

              <p className='text-gray-500 mt-1'>
                {testimonials[currentIndex].location}
              </p>
            </div>

            {/* Arrows */}
            <button 
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2
            -translate-x-4 md:-translate-x-12 bg-white 
            hover:bg-blue-900 text-blue-900 hover:text-white
            w-10 h-10 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 focus:outline-none '
            aria-label='Previous testimonial'>

              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              
            </button>


            <button 
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12
          bg-white hover:bg-blue-900 text-blue-900 hover:text-white 
            w-10 h-10 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 focus:outline-none'
            aria-label='Next testimonial'>

              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className='flex justify-center mt-8 space-x-3'>
            {testimonials.map((_, index) => (
              <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300
                ${currentIndex === index
                  ? 'bg-yellow-500 w-6'
                  : 'bg-gray-300 hover:bg-gray-300'
                }`} 
                aria-label={`Go to testimonial ${index + 1}`}/>
            ))}
          </div>
        </div>
      </div>
        
    </section>
  )
}

export default Testimonials