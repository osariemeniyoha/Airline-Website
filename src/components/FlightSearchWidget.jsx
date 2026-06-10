import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePickerInput, { startOfToday } from './DatePickerInput'

const CITIES = [
  'Lagos', 'London', 'New York', 'Dubai', 'Paris', 'Tokyo',
  'Johannesburg', 'Cairo', 'Nairobi', 'Accra', 'Mumbai', 'Beijing'
]

const FlightSearchWidget = ({ compact = false }) => {
  const navigate = useNavigate()
  const [flightType, setFlightType] = useState('roundtrip')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [cityError, setCityError] = useState('')

  const swapCities = () => {
    setFrom(to)
    setTo(from)
    setCityError('')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (from === to) {
      setCityError('Departure and destination cannot be the same city')
      return
    }
    setCityError('')
    const params = new URLSearchParams({
      from,
      to,
      type: flightType,
      date: departDate,
      passengers: String(passengers),
    })
    navigate(`/booking?${params.toString()}`)
  }

  const today = startOfToday()

  return (
    <div className={`search-widget rounded-2xl ${compact ? 'p-5 md:p-6' : 'p-6 md:p-8'}`}>
      <div className='flex flex-wrap gap-2 mb-5'>
        {[
          { value: 'roundtrip', label: 'Round Trip' },
          { value: 'oneway', label: 'One Way' },
        ].map(({ value, label }) => (
          <button
            key={value}
            type='button'
            onClick={() => setFlightType(value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              flightType === value
                ? 'search-widget-toggle-active'
                : 'search-widget-toggle'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end'>
          <div>
            <label className='form-label'>From</label>
            <select
              value={from}
              onChange={(e) => { setFrom(e.target.value); setCityError('') }}
              required
              className={`form-input ${cityError ? 'error' : ''}`}
            >
              <option value=''>Departure city</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button
            type='button'
            onClick={swapCities}
            aria-label='Swap cities'
            className='hidden md:flex w-10 h-10 items-center justify-center rounded-full search-widget-swap transition-colors mb-0.5 mx-auto'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
            </svg>
          </button>

          <div>
            <label className='form-label'>To</label>
            <select
              value={to}
              onChange={(e) => { setTo(e.target.value); setCityError('') }}
              required
              className={`form-input ${cityError ? 'error' : ''}`}
            >
              <option value=''>Destination</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {cityError && (
          <p className='text-sm search-widget-error font-medium -mt-1'>{cityError}</p>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div>
            <label className='form-label'>Departure Date</label>
            <DatePickerInput
              value={departDate}
              onChange={setDepartDate}
              minDate={today}
              required
              placeholder='Select departure date'
            />
          </div>
          <div>
            <label className='form-label'>Passengers</label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className='form-input'
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>
        </div>

        <button type='submit' className='btn-primary w-full py-3.5 text-base'>
          Search Flights
        </button>
      </form>
    </div>
  )
}

export default FlightSearchWidget
