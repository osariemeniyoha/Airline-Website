import React from 'react'

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className='bg-blue-900 text-blue-100 border border-blue-100 rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>
      <div className='flex justify-center mb-4'>
        {Icon && <Icon className='w-12 h-12 text-yellow-500' />}
      </div>
      <h3 className='text-2xl md:text-2xl lg:text-3xl font-bold font-inter mb-2'>
        {title}
      </h3>
      <p className='text-xl md:text-xl lg:text-xl text-white mb-2'>
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
