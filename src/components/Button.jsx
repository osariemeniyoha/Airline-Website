import React from 'react'

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-500 disabled:bg-yellow-300',
    secondary: 'bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-900 disabled:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-600 disabled:bg-green-500',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white focus:ring-blue-900 disabled:border-blue-400 disabled:text-blue-400'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClass = variants[variant] || variants.primary
  const sizeClass = sizes[size] || sizes.md
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      className={`${baseStyles} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className='w-5 h-5 animate-spin' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' className='opacity-25' />
          <path fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
