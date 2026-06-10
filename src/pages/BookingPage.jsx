import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingSteps from '../components/BookingSteps'
import DatePickerInput, { startOfToday, parseDateString, addDays } from '../components/DatePickerInput'

const POPULAR_DESTINATIONS = [
  'Lagos', 'London', 'New York', 'Dubai', 'Paris', 'Tokyo',
  'Johannesburg', 'Cairo', 'Nairobi', 'Accra', 'Mumbai', 'Beijing',
]

const FLIGHT_TIMES = ['06:00', '08:30', '11:00', '13:30', '16:00', '18:30', '21:00', '23:30']

const CABIN_CLASSES = [
  { value: 'economy', label: 'Economy', desc: 'Standard comfort' },
  { value: 'premium', label: 'Premium', desc: 'Extra legroom' },
  { value: 'business', label: 'Business', desc: 'Lie-flat seats' },
  { value: 'first', label: 'First', desc: 'Ultimate luxury' },
]

const Booking = () => {
  const [searchParams] = useSearchParams()

  const [flightType, setFlightType] = useState(() => {
    const type = searchParams.get('type')
    return type === 'oneway' || type === 'roundtrip' ? type : 'roundtrip'
  })
  const [from, setFrom] = useState(() => searchParams.get('from') || '')
  const [to, setTo] = useState(() => searchParams.get('to') || '')
  const [departDate, setDepartDate] = useState(() => searchParams.get('date') || '')
  const [departTime, setDepartTime] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [passengers, setPassengers] = useState(() => {
    const p = searchParams.get('passengers')
    return p ? Number(p) : 1
  })
  const [cabinClass, setCabinClass] = useState('economy')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [nationality, setNationality] = useState('')

  const [error, setError] = useState('')
  const [dateError, setDateError] = useState('')
  const [calculatedPrice, setCalculatedPrice] = useState(null)
  const [showPrice, setShowPrice] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  const currentStep = bookingConfirmed ? 3 : showPrice ? 2 : 1
  const today = startOfToday()
  const returnMinDate = departDate ? addDays(parseDateString(departDate), 1) : today

  const calculatePrice = () => {
    const basePrices = { economy: 450, premium: 650, business: 1200, first: 2500 }
    const distanceMultipliers = {
      'Lagos-London': 1.5, 'Lagos-New York': 2.0, 'Lagos-Dubai': 1.3,
      'Lagos-Paris': 1.4, 'Lagos-Tokyo': 2.2, 'New York-London': 1.2,
      'Dubai-London': 1.3, default: 1.0,
    }
    const route = `${from}-${to}`
    const distanceMultiplier = distanceMultipliers[route] || distanceMultipliers.default
    const flightTypeMultiplier = flightType === 'roundtrip' ? 2 : 1
    const basePrice = basePrices[cabinClass] || basePrices.economy
    const subtotal = basePrice * distanceMultiplier * passengers * flightTypeMultiplier
    const tax = subtotal * 0.15
    const serviceFee = 25
    const total = subtotal + tax + serviceFee
    return {
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const generateBookingReference = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
  }

  const validateDates = () => {
    setDateError('')
    if (flightType !== 'roundtrip') return true
    if (!returnDate) { setDateError('Please select a return date'); return false }
    if (returnDate < departDate) { setDateError('Return date cannot be before departure date'); return false }
    if (departDate === returnDate) { setDateError('Return date cannot be the same as departure date'); return false }
    return true
  }

  const swapCities = () => { setFrom(to); setTo(from) }

  const handleSearch = (e) => {
    e.preventDefault()
    setError('')
    if (from === to) { setError('Departure and destination cannot be the same city'); return }
    if (!validateDates()) return
    if (from && to && departDate && departTime) {
      setCalculatedPrice(calculatePrice())
      setShowPrice(true)
      setBookingConfirmed(false)
    }
  }

  const handleBooking = (e) => {
    e.preventDefault()
    setError('')
    setBookingDetails({
      reference: generateBookingReference(),
      bookingDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      passenger: { firstName, lastName, email, phone, nationality },
      flight: {
        type: flightType, from, to, departDate, departTime,
        returnDate: flightType === 'roundtrip' ? returnDate : null,
        returnTime: flightType === 'roundtrip' ? returnTime : null,
        cabinClass, passengers,
      },
      price: calculatedPrice,
    })
    setBookingConfirmed(true)
  }

  const resetForm = () => {
    setFlightType('roundtrip'); setFrom(''); setTo(''); setDepartDate(''); setDepartTime('')
    setReturnDate(''); setReturnTime(''); setPassengers(1); setCabinClass('economy')
    setFirstName(''); setLastName(''); setEmail(''); setPhone(''); setDob(''); setNationality('')
    setCalculatedPrice(null); setShowPrice(false); setError(''); setDateError('')
  }

  const bookAnotherFlight = () => { resetForm(); setBookingConfirmed(false); setBookingDetails(null) }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A'
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <>
      <Navbar />
      <section className='pt-[4.5rem] pb-20 min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14'>
          <div className='text-center mb-8'>
            <span className='section-eyebrow justify-center'>Booking</span>
            <h1 className='font-display text-3xl md:text-5xl font-bold text-navy-900 mt-3 tracking-tight'>
              Book Your <span className='text-gold-500'>Flight</span>
            </h1>
            <p className='text-slate-600 mt-3 max-w-xl mx-auto'>
              Search, select, and confirm — your next journey is just a few steps away.
            </p>
          </div>

          <BookingSteps currentStep={currentStep} />

          {(error || dateError) && (
            <div className='max-w-4xl mx-auto mb-6 animate-slide-down'>
              <div className='flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl'>
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='font-medium text-sm'>{error || dateError}</span>
              </div>
            </div>
          )}

          {bookingConfirmed && bookingDetails ? (
            <div className='max-w-4xl mx-auto animate-fade-in'>
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-xl mb-8'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0'>
                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold'>Booking Confirmed</p>
                    <p className='text-sm text-emerald-700'>Your e-ticket is ready to download or print.</p>
                  </div>
                </div>
                <button onClick={bookAnotherFlight} className='text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 no-print'>
                  Book another flight
                </button>
              </div>

              <div className='boarding-pass'>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_200px]'>
                  <div>
                    <div className='bg-navy-900 text-white px-6 py-5 flex justify-between items-start'>
                      <div>
                        <p className='font-display text-xl font-bold tracking-wide'>UP AIR</p>
                        <p className='text-blue-200/70 text-xs mt-0.5'>Electronic Ticket / E-Ticket</p>
                      </div>
                      <div className='text-right'>
                        <p className='font-display text-2xl font-bold tracking-widest text-gold-400'>{bookingDetails.reference}</p>
                        <p className='text-blue-200/70 text-xs'>PNR Reference</p>
                      </div>
                    </div>

                    <div className='px-6 py-5 border-b border-slate-100'>
                      <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Passenger</p>
                      <p className='font-display text-lg font-bold text-navy-900'>
                        {bookingDetails.passenger.firstName} {bookingDetails.passenger.lastName}
                      </p>
                      <div className='grid grid-cols-2 gap-3 mt-3 text-sm'>
                        <div><p className='text-slate-400 text-xs'>Email</p><p className='text-slate-700'>{bookingDetails.passenger.email}</p></div>
                        <div><p className='text-slate-400 text-xs'>Phone</p><p className='text-slate-700'>{bookingDetails.passenger.phone}</p></div>
                        <div><p className='text-slate-400 text-xs'>Nationality</p><p className='text-slate-700'>{bookingDetails.passenger.nationality}</p></div>
                        <div><p className='text-slate-400 text-xs'>Booked</p><p className='text-slate-700'>{bookingDetails.bookingDate}</p></div>
                      </div>
                    </div>

                    <div className='px-6 py-5 bg-slate-50'>
                      <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4'>Flight Itinerary</p>
                      <div className='flex items-center gap-4'>
                        <div className='text-center'>
                          <p className='font-display text-2xl font-bold text-navy-900'>{bookingDetails.flight.from}</p>
                          <p className='text-sm font-semibold text-navy-700 mt-1'>{formatTime(bookingDetails.flight.departTime)}</p>
                          <p className='text-xs text-slate-500 mt-0.5'>{formatDate(bookingDetails.flight.departDate)}</p>
                        </div>
                        <div className='flex-1 flex flex-col items-center gap-1'>
                          <div className='w-full flex items-center gap-2'>
                            <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                            <svg className='w-6 h-6 text-gold-500 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                            </svg>
                            <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                          </div>
                          <p className='text-xs text-slate-400 capitalize'>{bookingDetails.flight.type} · {bookingDetails.flight.cabinClass}</p>
                        </div>
                        <div className='text-center'>
                          <p className='font-display text-2xl font-bold text-navy-900'>{bookingDetails.flight.to}</p>
                          <p className='text-sm font-semibold text-navy-700 mt-1'>{formatTime(bookingDetails.flight.departTime)}</p>
                          {bookingDetails.flight.returnDate && (
                            <p className='text-xs text-slate-500 mt-0.5'>Return {formatDate(bookingDetails.flight.returnDate)}</p>
                          )}
                        </div>
                      </div>
                      <p className='text-xs text-slate-500 mt-4'>{bookingDetails.flight.passengers} passenger{bookingDetails.flight.passengers > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className='bg-navy-900 text-white px-6 py-5 flex flex-col justify-between md:border-l border-dashed border-slate-300'>
                    <div>
                      <p className='text-xs text-blue-200/60 uppercase tracking-wider mb-4'>Payment</p>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'><span className='text-blue-200/70'>Base fare</span><span>${bookingDetails.price.subtotal}</span></div>
                        <div className='flex justify-between'><span className='text-blue-200/70'>Taxes</span><span>${bookingDetails.price.tax}</span></div>
                        <div className='flex justify-between'><span className='text-blue-200/70'>Service fee</span><span>${bookingDetails.price.serviceFee}</span></div>
                      </div>
                    </div>
                    <div className='mt-6 pt-4 border-t border-white/10'>
                      <p className='text-xs text-blue-200/60 uppercase tracking-wider'>Total Paid</p>
                      <p className='font-display text-3xl font-bold text-gold-400 mt-1'>${bookingDetails.price.total}</p>
                    </div>
                    <div className='mt-6 hidden md:block'>
                      <div className='w-full h-16 bg-white/5 rounded-lg flex items-center justify-center'>
                        <div className='flex gap-0.5'>
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className={`w-1 ${i % 3 === 0 ? 'h-10 bg-white/30' : 'h-6 bg-white/20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className='text-[10px] text-blue-200/40 text-center mt-2 tracking-widest'>{bookingDetails.reference}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row justify-center gap-3 mt-8 no-print'>
                <button onClick={() => window.print()} className='btn-primary'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' />
                  </svg>
                  Print Ticket
                </button>
                <button onClick={bookAnotherFlight} className='btn-outline !text-navy-900 !border-navy-900/20 hover:!bg-navy-900 hover:!text-white hover:!border-navy-900'>
                  Book Another Flight
                </button>
              </div>
            </div>
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
              <div className='lg:col-span-2 space-y-6'>
                <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8'>
                  <h2 className='font-display text-xl font-bold text-navy-900 mb-6 flex items-center gap-2'>
                    <span className='w-8 h-8 rounded-lg bg-navy-900 text-white text-sm flex items-center justify-center font-bold'>1</span>
                    Search Flights
                  </h2>

                  <form onSubmit={handleSearch} className='space-y-5'>
                    <div className='flex flex-wrap gap-2'>
                      {[{ value: 'roundtrip', label: 'Round Trip' }, { value: 'oneway', label: 'One Way' }].map(({ value, label }) => (
                        <button
                          key={value}
                          type='button'
                          onClick={() => setFlightType(value)}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            flightType === value ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end'>
                      <div>
                        <label className='form-label'>From</label>
                        <select value={from} onChange={(e) => setFrom(e.target.value)} required className={`form-input ${from === to && from ? 'error' : ''}`}>
                          <option value=''>Select departure city</option>
                          {POPULAR_DESTINATIONS.map((city) => <option key={city} value={city}>{city}</option>)}
                        </select>
                      </div>
                      <button type='button' onClick={swapCities} aria-label='Swap cities' className='hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-slate-100 hover:bg-gold-400/20 text-slate-500 hover:text-gold-600 transition-colors mb-0.5'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
                        </svg>
                      </button>
                      <div>
                        <label className='form-label'>To</label>
                        <select value={to} onChange={(e) => setTo(e.target.value)} required className={`form-input ${from === to && to ? 'error' : ''}`}>
                          <option value=''>Select destination</option>
                          {POPULAR_DESTINATIONS.map((city) => <option key={city} value={city}>{city}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                        <label className='form-label'>Departure Time</label>
                        <select value={departTime} onChange={(e) => setDepartTime(e.target.value)} required className='form-input'>
                          <option value=''>Select time</option>
                          {FLIGHT_TIMES.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                        </select>
                      </div>
                    </div>

                    {flightType === 'roundtrip' && (
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in'>
                        <div>
                          <label className='form-label'>Return Date</label>
                          <DatePickerInput
                            value={returnDate}
                            onChange={setReturnDate}
                            minDate={returnMinDate}
                            required
                            error={returnDate && departDate && returnDate <= departDate}
                            placeholder='Select return date'
                          />
                        </div>
                        <div>
                          <label className='form-label'>Return Time</label>
                          <select value={returnTime} onChange={(e) => setReturnTime(e.target.value)} required className='form-input'>
                            <option value=''>Select time</option>
                            {FLIGHT_TIMES.map((time) => <option key={time} value={time}>{formatTime(time)}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className='form-label'>Passengers</label>
                      <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className='form-input max-w-xs'>
                        {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Passenger' : 'Passengers'}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className='form-label mb-3'>Cabin Class</label>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                        {CABIN_CLASSES.map(({ value, label, desc }) => (
                          <button
                            key={value}
                            type='button'
                            onClick={() => setCabinClass(value)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              cabinClass === value
                                ? 'border-navy-900 bg-navy-900/5 ring-1 ring-navy-900'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <p className={`text-sm font-bold ${cabinClass === value ? 'text-navy-900' : 'text-slate-700'}`}>{label}</p>
                            <p className='text-xs text-slate-500 mt-0.5'>{desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type='submit' className='btn-primary w-full py-3.5'>
                      Search Flights
                    </button>
                  </form>
                </div>

                {showPrice && (
                  <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 animate-fade-in'>
                    <h2 className='font-display text-xl font-bold text-navy-900 mb-6 flex items-center gap-2'>
                      <span className='w-8 h-8 rounded-lg bg-navy-900 text-white text-sm flex items-center justify-center font-bold'>2</span>
                      Passenger Details
                    </h2>
                    <form onSubmit={handleBooking} className='space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div><label className='form-label'>First Name</label><input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='form-input' placeholder='John' /></div>
                        <div><label className='form-label'>Last Name</label><input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} required className='form-input' placeholder='Doe' /></div>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div><label className='form-label'>Email</label><input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='form-input' placeholder='john@example.com' /></div>
                        <div><label className='form-label'>Phone</label><input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} required className='form-input' placeholder='+1 234 567 8900' /></div>
                      </div>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label className='form-label'>Date of Birth</label>
                          <DatePickerInput
                            value={dob}
                            onChange={setDob}
                            maxDate={today}
                            required
                            placeholder='Select date of birth'
                          />
                        </div>
                        <div>
                          <label className='form-label'>Nationality</label>
                          <select value={nationality} onChange={(e) => setNationality(e.target.value)} required className='form-input'>
                            <option value=''>Select nationality</option>
                            {['United States','United Kingdom','Nigeria','Ghana','Kenya','South Africa','UAE','France','Japan','China','India','Brazil'].map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button type='submit' className='w-full py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        Confirm Booking
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <div className='lg:col-span-1'>
                <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 sticky top-24'>
                  <h2 className='font-display text-lg font-bold text-navy-900 mb-5'>Trip Summary</h2>

                  {showPrice && calculatedPrice ? (
                    <div className='animate-fade-in'>
                      {from && to && (
                        <div className='bg-slate-50 rounded-xl p-4 mb-5'>
                          <div className='flex items-center justify-between'>
                            <span className='font-display font-bold text-navy-900 text-lg'>{from}</span>
                            <svg className='w-5 h-5 text-gold-500' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                            </svg>
                            <span className='font-display font-bold text-navy-900 text-lg'>{to}</span>
                          </div>
                          <p className='text-xs text-slate-500 mt-2'>{formatDate(departDate)} · {formatTime(departTime)}</p>
                          {flightType === 'roundtrip' && returnDate && (
                            <p className='text-xs text-slate-500'>Return {formatDate(returnDate)} · {formatTime(returnTime)}</p>
                          )}
                          <p className='text-xs text-slate-500 mt-1 capitalize'>{cabinClass} · {passengers} pax</p>
                        </div>
                      )}
                      <div className='space-y-3 text-sm'>
                        <div className='flex justify-between'><span className='text-slate-500'>Base fare</span><span className='font-medium'>${calculatedPrice.subtotal}</span></div>
                        <div className='flex justify-between'><span className='text-slate-500'>Taxes & fees</span><span className='font-medium'>${calculatedPrice.tax}</span></div>
                        <div className='flex justify-between'><span className='text-slate-500'>Service fee</span><span className='font-medium'>${calculatedPrice.serviceFee}</span></div>
                        <div className='border-t border-slate-100 pt-3 flex justify-between items-end'>
                          <span className='font-semibold text-navy-900'>Total</span>
                          <span className='font-display text-2xl font-bold text-gold-500'>${calculatedPrice.total}</span>
                        </div>
                      </div>
                      <p className='text-xs text-slate-400 mt-3'>All taxes and fees included</p>
                    </div>
                  ) : (
                    <div className='text-center py-10'>
                      <div className='w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4'>
                        <svg className='w-8 h-8 text-slate-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                        </svg>
                      </div>
                      <p className='text-slate-500 text-sm'>Complete your search to see pricing</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Booking
