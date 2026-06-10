import React from 'react'

const STEPS = [
  { id: 1, label: 'Search' },
  { id: 2, label: 'Passenger' },
  { id: 3, label: 'Confirm' },
]

const BookingSteps = ({ currentStep }) => {
  return (
    <div className='flex items-center justify-center gap-0 mb-10 max-w-lg mx-auto'>
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isActive = currentStep === step.id

        return (
          <React.Fragment key={step.id}>
            <div className={`booking-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <span className='step-dot'>
                {isCompleted ? (
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
                  </svg>
                ) : (
                  step.id
                )}
              </span>
              <span className='hidden sm:inline'>{step.label}</span>
            </div>
            {index < STEPS.length - 1 && (
              <div className={`step-line ${isCompleted ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BookingSteps
