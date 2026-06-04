import React from 'react'

const StatCard = ({ number, title, subtitle }) => {
  return (
    <div className='bg-blue-50 border border-blue-100 rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>
      <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2'>
        {number}
      </div>
      <div className='text-sm md:text-base text-gray-600 font-medium'>
        {title}
      </div>
      <div className='mt-2 text-xs text-yellow-600'>
        {subtitle}
      </div>
    </div>
  )
}

export default StatCard
