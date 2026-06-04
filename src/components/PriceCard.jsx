import React from 'react'

const PriceCard = ({ currency = '$', breakdown = {} }) => {
  const { subtotal, tax, serviceFee, total } = breakdown

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
      <h3 className='text-lg font-bold text-gray-800 mb-6'>Price Summary</h3>

      {subtotal && tax && serviceFee && total ? (
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Base Fare</span>
            <span className='font-semibold'>{currency}{subtotal}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Taxes & Fees</span>
            <span className='font-semibold'>{currency}{tax}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Service Fee</span>
            <span className='font-semibold'>{currency}{serviceFee}</span>
          </div>
          <div className='border-t border-gray-200 pt-4'>
            <div className='flex justify-between'>
              <span className='text-lg font-bold text-gray-800'>Total</span>
              <span className='text-2xl font-bold text-yellow-600'>
                {currency}{total}
              </span>
            </div>
            <p className='text-xs text-gray-500 mt-2'>
              Includes all taxes and fees
            </p>
          </div>
        </div>
      ) : (
        <div className='text-center py-8'>
          <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
          <p className='text-gray-500'>Search for flights to see price</p>
        </div>
      )}
    </div>
  )
}

export default PriceCard
