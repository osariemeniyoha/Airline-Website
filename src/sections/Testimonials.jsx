import React, { useState, useEffect, useCallback } from 'react'
import SectionHeading from '../components/SectionHeading'
import User from '../assets/user-1.jpg'
import User2 from '../assets/user-2.jpg'
import User3 from '../assets/user-3.jpg'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Williams Igwe',
      location: 'Lagos → London',
      text: 'Booking was incredibly smooth and the flight departed exactly on time. I felt safe and comfortable throughout the journey.',
      image: User,
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'New York → Tokyo',
      text: 'The premium economy seats were amazing — great legroom and attentive service. Will definitely fly with UP AIR again.',
      image: User2,
      rating: 5,
    },
    {
      id: 3,
      name: 'Matthew Ethan',
      location: 'Dubai → Paris',
      text: 'Excellent customer service from booking to landing. The crew was attentive and made the long flight genuinely enjoyable.',
      image: User3,
      rating: 5,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 200)
  }, [testimonials.length])

  const prevSlide = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 200)
  }, [testimonials.length])

  const goToSlide = (index) => {
    if (index === currentIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 200)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const current = testimonials[currentIndex]

  return (
    <section id='testimonials' className='py-20 md:py-28 bg-navy-900 relative overflow-hidden'>
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,200,66,0.08),transparent_60%)]' />

      <div className='relative max-w-7xl mx-auto px-5 md:px-8'>
        <SectionHeading
          title='What Our'
          highlight='Travelers Say'
          align='center'
          light
        />

        <div className='relative max-w-3xl mx-auto'>
          <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className='flex gap-1 mb-6 justify-center'>
              {Array.from({ length: current.rating }).map((_, i) => (
                <svg key={i} className='w-5 h-5 text-gold-400' fill='currentColor' viewBox='0 0 24 24'>
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              ))}
            </div>

            <blockquote className='text-lg md:text-xl text-blue-100/90 leading-relaxed text-center italic'>
              &ldquo;{current.text}&rdquo;
            </blockquote>

            <div className='flex flex-col items-center mt-8'>
              <img
                src={current.image}
                alt={current.name}
                className='w-16 h-16 rounded-full object-cover ring-2 ring-gold-400/50 ring-offset-2 ring-offset-navy-900 mb-3'
              />
              <p className='font-display font-bold text-white'>{current.name}</p>
              <p className='text-blue-200/60 text-sm mt-0.5'>{current.location}</p>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-900 text-white border border-white/20 flex items-center justify-center transition-all'
            aria-label='Previous testimonial'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-900 text-white border border-white/20 flex items-center justify-center transition-all'
            aria-label='Next testimonial'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          <div className='flex justify-center gap-2 mt-8'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'w-8 bg-gold-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
