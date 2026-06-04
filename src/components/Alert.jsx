import React from 'react'

const Alert = ({ type = 'info', message, onDismiss, className = '' }) => {
  const styles = {
    error: {
      container: 'bg-red-100 border border-red-400 text-red-700',
      icon: 'text-red-500'
    },
    success: {
      container: 'bg-green-100 border border-green-400 text-green-700',
      icon: 'text-green-500'
    },
    info: {
      container: 'bg-blue-100 border border-blue-400 text-blue-700',
      icon: 'text-blue-500'
    },
    warning: {
      container: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
      icon: 'text-yellow-500'
    }
  }

  const style = styles[type] || styles.info

  const icons = {
    error: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    ),
    success: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
      </svg>
    ),
    info: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    ),
    warning: (
      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4v2m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
      </svg>
    )
  }

  return (
    <div className={`${style.container} px-6 py-4 rounded-lg flex items-center justify-between gap-4 animate-slideDown ${className}`}>
      <div className='flex items-center gap-3'>
        <div className={`${style.icon} shrink-0`}>{icons[type]}</div>
        <span className='font-semibold'>{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className='shrink-0 hover:opacity-70 transition-opacity'
          aria-label='Dismiss alert'
        >
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Alert
