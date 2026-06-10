import React from 'react'
import SectionHeading from '../components/SectionHeading'

const StatCard = ({ number, title, subtitle }) => {
  return (
    <div className='group relative bg-white rounded-2xl p-6 md:p-8 text-center border border-slate-100 hover:border-gold-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-navy-900/5 hover:-translate-y-1'>
      <div className='absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl' />
      <div className='font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-1'>
        {number}
      </div>
      <div className='text-sm md:text-base text-slate-700 font-semibold'>
        {title}
      </div>
      <div className='mt-1 text-xs text-gold-600 font-medium'>
        {subtitle}
      </div>
    </div>
  )
}

export default StatCard
