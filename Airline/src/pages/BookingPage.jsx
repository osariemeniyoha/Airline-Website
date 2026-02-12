import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Booking = () => {
  // Flight search state
  const [flightType, setFlightType] = useState('roundtrip')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [departTime, setDepartTime] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState('economy')
  
  // Passenger details state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [nationality, setNationality] = useState('')
  
  // Error state
  const [error, setError] = useState('')
  const [dateError, setDateError] = useState('')
  
  // Price calculation state
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [showPrice, setShowPrice] = useState(false)
  
  // Booking confirmation state
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Popular destinations
  const popularDestinations = [
    'Lagos', 'London', 'New York', 'Dubai', 'Paris', 'Tokyo', 
    'Johannesburg', 'Cairo', 'Nairobi', 'Accra', 'Mumbai', 'Beijing'
  ]

  // Available flight times
  const flightTimes = [
    '06:00', '08:30', '11:00', '13:30', '16:00', '18:30', '21:00', '23:30'
  ]

  // Price calculation function
  const calculatePrice = () => {
    const basePrices = {
      economy: 450,
      premium: 650,
      business: 1200,
      first: 2500
    }

    const distanceMultipliers = {
      'Lagos-London': 1.5,
      'Lagos-New York': 2.0,
      'Lagos-Dubai': 1.3,
      'Lagos-Paris': 1.4,
      'Lagos-Tokyo': 2.2,
      'New York-London': 1.2,
      'Dubai-London': 1.3,
      'default': 1.0
    }

    const route = `${from}-${to}`
    const distanceMultiplier = distanceMultipliers[route] || distanceMultipliers.default
    const passengerMultiplier = passengers
    const flightTypeMultiplier = flightType === 'roundtrip' ? 2 : 1
    
    const basePrice = basePrices[cabinClass] || basePrices.economy
    const subtotal = basePrice * distanceMultiplier * passengerMultiplier * flightTypeMultiplier
    const tax = subtotal * 0.15
    const serviceFee = 25
    const total = subtotal + tax + serviceFee
    
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: total.toFixed(2)
    }
  }

  // Generate random booking reference
  const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let reference = ''
    for (let i = 0; i < 6; i++) {
      reference += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return reference
  }

  // Validate dates
  const validateDates = () => {
    setDateError('')
    
    if (flightType === 'roundtrip') {
      if (!returnDate) {
        setDateError('Please select a return date')
        return false
      }
      
      const depart = new Date(departDate)
      const return_d = new Date(returnDate)
      
      if (return_d < depart) {
        setDateError('Return date cannot be before departure date')
        return false
      }
      
      if (departDate === returnDate) {
        setDateError('Return date cannot be the same as departure date')
        return false
      }
    }
    return true
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setError('')
    
    // Check if departure and destination are the same
    if (from === to) {
      setError('Departure and destination cannot be the same city')
      return
    }
    
    // Validate dates
    if (!validateDates()) {
      return
    }
    
    if (from && to && departDate && departTime) {
      const price = calculatePrice()
      setCalculatedPrice(price)
      setShowPrice(true)
      setBookingConfirmed(false)
    }
  }

  const handleBooking = (e) => {
    e.preventDefault()
    setError('')
    
    // Create booking details object
    const booking = {
      reference: generateBookingReference(),
      bookingDate: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      passenger: {
        firstName,
        lastName,
        email,
        phone,
        nationality
      },
      flight: {
        type: flightType,
        from,
        to,
        departDate,
        departTime,
        returnDate: flightType === 'roundtrip' ? returnDate : null,
        returnTime: flightType === 'roundtrip' ? returnTime : null,
        cabinClass,
        passengers
      },
      price: calculatedPrice
    }
    
    setBookingDetails(booking)
    setBookingConfirmed(true)
  }

  // Reset form to initial state
  const resetForm = () => {
    setFlightType('roundtrip')
    setFrom('')
    setTo('')
    setDepartDate('')
    setDepartTime('')
    setReturnDate('')
    setReturnTime('')
    setPassengers(1)
    setCabinClass('economy')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setDob('')
    setNationality('')
    setCalculatedPrice(null)
    setShowPrice(false)
    setError('')
    setDateError('')
  }

  // Book another flight
  const bookAnotherFlight = () => {
    resetForm()
    setBookingConfirmed(false)
    setBookingDetails(null)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A'
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <section className='pt-20 pb-16 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-6'>
        
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-blue-900 mb-4'>
            Book Your <span className='text-yellow-500'>Flight</span>
          </h1>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            Experience comfort and luxury with UP Air. Book your next adventure today.
          </p>
          <div className='h-1 w-24 bg-yellow-500 mx-auto mt-6'></div>
        </div>

        {/* Error Message Display */}
        {(error || dateError) && (
          <div className='max-w-4xl mx-auto mb-6'>
            <div className='bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg flex items-center'>
              <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span className='font-semibold'>{error || dateError}</span>
            </div>
          </div>
        )}

        {/* Show Ticket if booking is confirmed */}
        {bookingConfirmed && bookingDetails ? (
          <div className='max-w-4xl mx-auto'>
            {/* Success Message */}
            <div className='bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 flex items-center justify-between'>
              <div className='flex items-center'>
                <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                </svg>
                <span className='font-semibold'>Booking Confirmed! Your e-ticket is ready.</span>
              </div>
              <button
                onClick={bookAnotherFlight}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors'
              >
                Book Another Flight
              </button>
            </div>

            {/* E-Ticket */}
            <div className='bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200'>
              {/* Ticket Header */}
              <div className='bg-blue-900 text-white p-6 flex justify-between items-center'>
                <div>
                  <h2 className='text-2xl font-bold'>UP AIR</h2>
                  <p className='text-blue-200 text-sm'>Electronic Ticket</p>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold tracking-wider'>{bookingDetails.reference}</p>
                  <p className='text-blue-200 text-sm'>Booking Reference</p>
                </div>
              </div>

              {/* Passenger Info */}
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>Passenger Information</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div>
                    <p className='text-xs text-gray-500'>Name</p>
                    <p className='font-semibold'>{bookingDetails.passenger.firstName} {bookingDetails.passenger.lastName}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Email</p>
                    <p className='font-semibold'>{bookingDetails.passenger.email}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Phone</p>
                    <p className='font-semibold'>{bookingDetails.passenger.phone}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Nationality</p>
                    <p className='font-semibold'>{bookingDetails.passenger.nationality}</p>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              <div className='p-6 border-b border-gray-200 bg-blue-50'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>Flight Details</h3>
                
                {/* Route */}
                <div className='flex items-center justify-between mb-6'>
                  <div className='text-center flex-1'>
                    <p className='text-3xl font-bold text-blue-900'>{bookingDetails.flight.from}</p>
                    <p className='text-xs text-gray-500 mt-1'>Departure</p>
                    <p className='text-sm font-semibold text-blue-700 mt-1'>
                      {formatTime(bookingDetails.flight.departTime)}
                    </p>
                  </div>
                  <div className='flex-1 flex justify-center'>
                    <div className='relative w-full max-w-50'>
                      <div className='border-t-2 border-dashed border-blue-300 absolute top-1/2 w-full'></div>
                      <svg className='w-8 h-8 text-blue-600 mx-auto relative bg-blue-50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                      </svg>
                    </div>
                  </div>
                  <div className='text-center flex-1'>
                    <p className='text-3xl font-bold text-blue-900'>{bookingDetails.flight.to}</p>
                    <p className='text-xs text-gray-500 mt-1'>Arrival</p>
                    <p className='text-sm font-semibold text-blue-700 mt-1'>
                      {/* Arrival time is departure time + flight duration */}
                      {formatTime(bookingDetails.flight.departTime)}
                    </p>
                  </div>
                </div>

                {/* Dates & Class */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4'>
                  <div>
                    <p className='text-xs text-gray-500'>Departure Date</p>
                    <p className='font-semibold'>{formatDate(bookingDetails.flight.departDate)}</p>
                  </div>
                  {bookingDetails.flight.returnDate && (
                    <div>
                      <p className='text-xs text-gray-500'>Return Date</p>
                      <p className='font-semibold'>{formatDate(bookingDetails.flight.returnDate)}</p>
                      <p className='text-xs text-gray-600'>{formatTime(bookingDetails.flight.returnTime)}</p>
                    </div>
                  )}
                  <div>
                    <p className='text-xs text-gray-500'>Cabin Class</p>
                    <p className='font-semibold capitalize'>{bookingDetails.flight.cabinClass}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500'>Passengers</p>
                    <p className='font-semibold'>{bookingDetails.flight.passengers}</p>
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-lg font-bold text-gray-800 mb-4'>Payment Summary</h3>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Base Fare</span>
                    <span className='font-semibold'>${bookingDetails.price.subtotal}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Taxes & Fees</span>
                    <span className='font-semibold'>${bookingDetails.price.tax}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Service Fee</span>
                    <span className='font-semibold'>${bookingDetails.price.serviceFee}</span>
                  </div>
                  <div className='flex justify-between pt-2 border-t border-gray-200'>
                    <span className='font-bold text-gray-800'>Total Paid</span>
                    <span className='text-2xl font-bold text-yellow-600'>${bookingDetails.price.total}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className='p-6 bg-gray-50 text-center'>
                <p className='text-sm text-gray-600 mb-4'>
                  Thank you for choosing UP Air. We wish you a pleasant flight!
                </p>
                <p className='text-xs text-gray-500'>
                  Booking Date: {bookingDetails.bookingDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-center gap-4 mt-8'>
              <button
                onClick={() => window.print()}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' />
                </svg>
                Print Ticket
              </button>
              <button
                onClick={bookAnotherFlight}
                className='bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                </svg>
                Book Another Flight
              </button>
            </div>
          </div>
        ) : (
          /* Regular Booking Form - Shown when no booking is confirmed */
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Booking Form - Left Column */}
            <div className='lg:col-span-2'>
              
              {/* Flight Search Card */}
              <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8'>
                <h2 className='text-2xl font-bold text-blue-900 mb-6'>Search Flights</h2>
                
                <form onSubmit={handleSearch}>
                  {/* Flight Type */}
                  <div className='flex gap-6 mb-6'>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='flightType'
                        value='roundtrip'
                        checked={flightType === 'roundtrip'}
                        onChange={(e) => setFlightType(e.target.value)}
                        className='w-4 h-4 text-yellow-500 focus:ring-yellow-500'
                      />
                      <span className='ml-2 text-gray-700'>Round Trip</span>
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='flightType'
                        value='oneway'
                        checked={flightType === 'oneway'}
                        onChange={(e) => setFlightType(e.target.value)}
                        className='w-4 h-4 text-yellow-500 focus:ring-yellow-500'
                      />
                      <span className='ml-2 text-gray-700'>One Way</span>
                    </label>
                  </div>

                  {/* From/To */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>From</label>
                      <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          from === to && from !== '' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value=''>Select departure city</option>
                        {popularDestinations.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>To</label>
                      <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                          from === to && to !== '' ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                      >
                        <option value=''>Select destination</option>
                        {popularDestinations.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Departure Date & Time */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>Departure Date</label>
                      <input
                        type='date'
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                      />
                    </div>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>Departure Time</label>
                      <select
                        value={departTime}
                        onChange={(e) => setDepartTime(e.target.value)}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                      >
                        <option value=''>Select time</option>
                        {flightTimes.map((time) => (
                          <option key={time} value={time}>{formatTime(time)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Return Date & Time - Only for round trips */}
                  {flightType === 'roundtrip' && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Return Date</label>
                        <input
                          type='date'
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          required
                          min={departDate || new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                            (returnDate && departDate && (returnDate < departDate || returnDate === departDate)) 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-300'
                          }`}
                        />
                        {returnDate && departDate && returnDate === departDate && (
                          <p className='text-xs text-red-500 mt-1'>Return date cannot be same as departure</p>
                        )}
                      </div>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Return Time</label>
                        <select
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >
                          <option value=''>Select time</option>
                          {flightTimes.map((time) => (
                            <option key={time} value={time}>{formatTime(time)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Passengers & Class */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>Passengers</label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2'>Cabin Class</label>
                      <select
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                      >
                        <option value='economy'>Economy Class</option>
                        <option value='premium'>Premium Economy</option>
                        <option value='business'>Business Class</option>
                        <option value='first'>First Class</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg'
                  >
                    Search Flights
                  </button>
                </form>
              </div>

              {/* Passenger Details Card - Shows after price calculation */}
              {showPrice && (
                <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
                  <h2 className='text-2xl font-bold text-blue-900 mb-6'>Passenger Details</h2>
                  
                  <form onSubmit={handleBooking}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>First Name</label>
                        <input
                          type='text'
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          placeholder='Osariemen Precious'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Last Name</label>
                        <input
                          type='text'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          placeholder='Iyoha'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Email</label>
                        <input
                          type='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          placeholder='iyohapreciousosariemen@gmail.com'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Phone</label>
                        <input
                          type='tel'
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                          placeholder='+1234567890'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Date of Birth</label>
                        <input
                          type='date'
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          required
                          max={new Date().toISOString().split('T')[0]}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        />
                      </div>
                      <div>
                        <label className='block text-gray-700 font-medium mb-2'>Nationality</label>
                        <select
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          required
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >
                          <option value=''>Select nationality</option>
                          <option value='United States'>United States</option>
                          <option value='United Kingdom'>United Kingdom</option>
                          <option value='Nigeria'>Nigeria</option>
                          <option value='Ghana'>Ghana</option>
                          <option value='Kenya'>Kenya</option>
                          <option value='South Africa'>South Africa</option>
                          <option value='UAE'>UAE</option>
                          <option value='France'>France</option>
                          <option value='Japan'>Japan</option>
                          <option value='China'>China</option>
                          <option value='India'>India</option>
                          <option value='Brazil'>Brazil</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type='submit'
                      className='w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300 text-lg'
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Price Summary - Right Column */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 sticky top-24'>
                <h2 className='text-2xl font-bold text-blue-900 mb-6'>Price Summary</h2>
                
                {showPrice && calculatedPrice ? (
                  <div>
                    <div className='space-y-4 mb-6'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Base Fare</span>
                        <span className='font-semibold'>${calculatedPrice.subtotal}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Taxes & Fees</span>
                        <span className='font-semibold'>${calculatedPrice.tax}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Service Fee</span>
                        <span className='font-semibold'>${calculatedPrice.serviceFee}</span>
                      </div>
                      <div className='border-t border-gray-200 pt-4'>
                        <div className='flex justify-between'>
                          <span className='text-lg font-bold text-gray-800'>Total</span>
                          <span className='text-2xl font-bold text-yellow-600'>
                            ${calculatedPrice.total}
                          </span>
                        </div>
                        <p className='text-xs text-gray-500 mt-2'>
                          Includes all taxes and fees
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <svg className='w-16 h-16 text-gray-300 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <p className='text-gray-500'>
                      Search for flights to see price
                    </p>
                  </div>
                )}

                {/* Flight Summary */}
                {showPrice && from && to && departDate && departTime && (
                  <div className='mt-6 pt-6 border-t border-gray-200'>
                    <h3 className='font-bold text-gray-800 mb-3'>Flight Summary</h3>
                    <div className='bg-blue-50 rounded-lg p-4'>
                      <div className='flex items-center gap-2 text-blue-900 mb-2'>
                        <span className='font-bold'>{from}</span>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                        </svg>
                        <span className='font-bold'>{to}</span>
                      </div>
                      <p className='text-sm text-gray-600'>
                        <span className='font-medium'>Depart:</span> {formatDate(departDate)} at {formatTime(departTime)}
                      </p>
                      {flightType === 'roundtrip' && returnDate && returnTime && (
                        <p className='text-sm text-gray-600 mt-1'>
                          <span className='font-medium'>Return:</span> {formatDate(returnDate)} at {formatTime(returnTime)}
                        </p>
                      )}
                      <p className='text-sm text-gray-600 mt-1'>
                        {cabinClass.charAt(0).toUpperCase() + cabinClass.slice(1)} Class • {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Booking