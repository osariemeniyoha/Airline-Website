import React from 'react'
import StatCard from '../components/StatCard'

const About = () => {
  const stats = [
    { number: '100+', title: 'Daily Flights', subtitle: 'Across continents' },
    { number: '120+', title: 'Destinations', subtitle: 'Global network' },
    { number: '10M+', title: 'Happy Members', subtitle: 'Trusted Service' },
    { number: '10+', title: 'Years of Experience', subtitle: 'Industry leader' }
  ]

  return (
    <section id='about' className=' pt-20 bg-white min-h-screen flex items-center py-16'>

      <div className='max-w-6xl mx-auto px-6 w-full'>

       <div className='mb-12 md:mb-16'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-blue-900 mb-6'>
          About <span className='text-yellow-500'>UP AIR</span> Airline
        </h1>

       <div className='space-y-6 max-w-3xl'>
        <p className='font-poppins text-lg md:text-xl text-gray-700 leading-relaxed'>
          Founded with a vision to make air travel accessible, comfortable, and
          enjoyable for everyone. Up Air Airline has grown from a small regional
          carrier to one of the most trusted names in aviation.
        </p>

        <p className=' font-poppins text-lg md:text-xl text-gray-700 leading-relaxed'>
            Our commitment to safety, innovation, and customer satisfaction has
          earned us numerous awards and the loyalty of millions of travelers world wide
        </p>

        </div>

        </div>


         {/* Grid Card  */}

         <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12'>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>


        {/* Mission  */}

        <div className='mt-20 bg-blue-900 text-white rounded-2xl p-4 md:p-6'>

          <div className='max-w-3xl mx-auto text-center'>
            <h2 className=' font-inter text-3xl md:text-4xl font-bold mb-8'>
              Our <span className='text-yellow-500 pr-2 pl-2'>Mission</span> Statement
            </h2>

            <p className=' font-montserrat text-xl leading-relaxed text-blue-100 mb-8'>
              To redefine air travel by making it more accessible, comfortable,
              and sustainable while maintaining the highest standards of safety
              and customer service.
            </p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default About
