import React from 'react'

const SectionHeading = ({ eyebrow, title, highlight, description, align = 'left', light = false }) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 mb-12 md:mb-16 ${alignClass}`}>
      {eyebrow && <span className='section-eyebrow'>{eyebrow}</span>}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight ${light ? 'text-white' : 'text-navy-900'}`}>
        {title}{' '}
        {highlight && <span className='text-gold-500'>{highlight}</span>}
      </h2>
      {description && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${light ? 'text-blue-100/80' : 'text-slate-600'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
