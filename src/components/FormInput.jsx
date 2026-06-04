import React from 'react'

const FormInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className='w-full'>
      {label && (
        <label className='block text-slate-700 font-medium mb-2 font-montserrat'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-poppins ${
          error
            ? 'border-red-500 bg-red-50 focus:ring-red-400'
            : 'border-slate-300 focus:border-teal-500 focus:ring-teal-400'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M18.101 12.93a1 1 0 0 0-1.414-1.414L13 14.584V7a1 1 0 0 0-2 0v7.584l-3.687-3.686a1 1 0 0 0-1.414 1.414l5.5 5.5a1 1 0 0 0 1.414 0l5.5-5.5z' />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormInput
