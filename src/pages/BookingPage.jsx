import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookingSteps from '../components/BookingSteps'
import DatePickerInput, { startOfToday, parseDateString, addDays } from '../components/DatePickerInput'

const AIRPORTS = {
  'Lagos':        { code: 'LOS' }, 'London':       { code: 'LHR' },
  'New York':     { code: 'JFK' }, 'Dubai':        { code: 'DXB' },
  'Paris':        { code: 'CDG' }, 'Tokyo':        { code: 'HND' },
  'Johannesburg': { code: 'JNB' }, 'Cairo':        { code: 'CAI' },
  'Nairobi':      { code: 'NBO' }, 'Accra':        { code: 'ACC' },
  'Mumbai':       { code: 'BOM' }, 'Beijing':      { code: 'PEK' },
}
const POPULAR_DESTINATIONS = Object.keys(AIRPORTS)

const ROUTE_DURATIONS = {
  'Lagos-London':395,'Lagos-New York':625,'Lagos-Dubai':485,'Lagos-Paris':360,
  'Lagos-Tokyo':795,'Lagos-Johannesburg':270,'Lagos-Cairo':280,'Lagos-Nairobi':255,
  'Lagos-Accra':60,'Lagos-Mumbai':540,'Lagos-Beijing':720,'London-New York':415,
  'London-Dubai':390,'London-Paris':75,'London-Tokyo':705,'London-Johannesburg':660,
  'London-Cairo':260,'New York-Dubai':825,'New York-Paris':430,'New York-Tokyo':840,
  'Dubai-Tokyo':540,'Dubai-Paris':390,'Dubai-Cairo':225,'Dubai-Mumbai':180,
  'Johannesburg-Nairobi':210,'Johannesburg-Cairo':300,'Cairo-Paris':315,
  'Nairobi-Mumbai':285,'Mumbai-London':555,'Mumbai-Beijing':390,
  'Beijing-Tokyo':210,'Accra-London':385,
}

const CABIN_CLASSES = [
  { value:'economy',  label:'Economy',         baggage:'23kg checked + 7kg cabin' },
  { value:'premium',  label:'Premium Economy',    baggage:'23kg checked + 10kg cabin' },
  { value:'business', label:'Business',           baggage:'2x32kg checked + 18kg cabin' },
  { value:'first',    label:'First Class',     baggage:'2x32kg checked + 18kg cabin' },
]

const BASE_PRICES = { economy:450, premium:650, business:1200, first:2500 }
const DIST_MULT = {
  'Lagos-London':1.5,'Lagos-New York':2.0,'Lagos-Dubai':1.3,'Lagos-Paris':1.4,
  'Lagos-Tokyo':2.2,'Lagos-Johannesburg':1.1,'Lagos-Cairo':1.1,'Lagos-Nairobi':1.1,
  'Lagos-Accra':0.5,'Lagos-Mumbai':1.6,'Lagos-Beijing':1.9,'London-New York':1.2,
  'London-Dubai':1.3,'London-Paris':0.6,'London-Tokyo':1.8,'New York-Dubai':2.0,
  'New York-Paris':1.4,'New York-Tokyo':2.1,'Dubai-Tokyo':1.5,'Dubai-Paris':1.3,
  'Mumbai-London':1.6,'Accra-London':1.4,
}

// Nationality -> phone country code + expected digit count
const NATIONALITY_DATA = {
  'Nigerian':      { code:'+234', digits:10 },
  'British':       { code:'+44',  digits:10 },
  'American':      { code:'+1',   digits:10 },
  'Canadian':      { code:'+1',   digits:10 },
  'Emirati':       { code:'+971', digits:9  },
  'French':        { code:'+33',  digits:9  },
  'Japanese':      { code:'+81',  digits:10 },
  'South African': { code:'+27',  digits:9  },
  'Egyptian':      { code:'+20',  digits:10 },
  'Kenyan':        { code:'+254', digits:9  },
  'Ghanaian':      { code:'+233', digits:9  },
  'Indian':        { code:'+91',  digits:10 },
  'Chinese':       { code:'+86',  digits:11 },
  'Brazilian':     { code:'+55',  digits:11 },
  'German':        { code:'+49',  digits:10 },
  'Italian':       { code:'+39',  digits:10 },
  'Spanish':       { code:'+34',  digits:9  },
  'Australian':    { code:'+61',  digits:9  },
}

// Helpers
const getRouteDuration = (f,t) => ROUTE_DURATIONS[`${f}-${t}`] || ROUTE_DURATIONS[`${t}-${f}`] || 180
const formatDuration = (m) => { const h=Math.floor(m/60),r=m%60; return r>0?`${h}h ${r}m`:`${h}h` }
const timeToMins = (t) => { const [h,m]=t.split(':').map(Number); return h*60+m }
const addMinsToTime = (t, mins) => {
  const total = timeToMins(t)+mins
  const hh=Math.floor(total/60)%24, mm=total%60
  return { time:`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`, nextDay:total>=1440 }
}
const isToday = (d) => {
  if(!d) return false
  const [y,m,dd]=d.split('-').map(Number), n=new Date()
  return n.getFullYear()===y && n.getMonth()+1===m && n.getDate()===dd
}
const nowMins = () => { const n=new Date(); return n.getHours()*60+n.getMinutes() }
const formatDate = (d) => {
  if(!d) return 'N/A'
  const [y,m,dd]=d.split('-').map(Number)
  return new Date(y,m-1,dd).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',year:'numeric'})
}
const formatTime = (t) => {
  if(!t) return 'N/A'
  return new Date(`2000-01-01T${t}`).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})
}
const genFlightNum = () => `UP${Math.floor(100+Math.random()*900)}`
const genSeat = (c) => {
  const rows={first:[1,4],business:[5,14],premium:[15,25],economy:[26,45]}
  const [mn,mx]=rows[c]||rows.economy
  return `${Math.floor(Math.random()*(mx-mn+1))+mn}${'ABCDEF'[Math.floor(Math.random()*6)]}`
}
const genRef = () => Array.from({length:6},()=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random()*36)]).join('')

const generateFlightOptions = (from, to, cabinClass, passengers, flightType, forDate) => {
  const duration  = getRouteDuration(from, to)
  const route     = `${from}-${to}`
  const mult      = DIST_MULT[route] || DIST_MULT[`${to}-${from}`] || 1.0
  const ftMult    = flightType==='roundtrip' ? 2 : 1
  const basePrice = BASE_PRICES[cabinClass] || BASE_PRICES.economy
  const checkToday = isToday(forDate)
  const currentMins = nowMins()

  return [
    { depTime:'06:15', priceVar:0.92, label:'Early Bird' },
    { depTime:'11:40', priceVar:1.00, label:'Most Popular' },
    { depTime:'18:55', priceVar:1.08, label:'Evening' },
  ].map(({ depTime, priceVar, label }) => {
    const arrival   = addMinsToTime(depTime, duration)
    const subtotal  = basePrice * mult * passengers * ftMult * priceVar
    const tax       = subtotal * 0.15
    const departed  = checkToday && timeToMins(depTime) <= currentMins
    return {
      flightNumber: genFlightNum(),
      departTime:   depTime,
      arrivalTime:  arrival.time,
      nextDay:      arrival.nextDay,
      duration:     formatDuration(duration),
      label, departed,
      price: {
        subtotal:   subtotal.toFixed(2),
        tax:        tax.toFixed(2),
        serviceFee: '25.00',
        total:      (subtotal+tax+25).toFixed(2),
      },
    }
  })
}

// Flight list component
const FlightList = ({ options, from, to, cabinClass, passengers, onSelect, dateLabel }) => {
  const allDeparted = options.every(f => f.departed)
  return (
    <div className='mt-8 space-y-3 animate-fade-in'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold text-slate-500 uppercase tracking-wider'>
          {options.length} flights · {from} ({AIRPORTS[from]?.code}) to {to} ({AIRPORTS[to]?.code})
        </p>
        <p className='text-xs text-slate-400'>{formatDate(dateLabel)}</p>
      </div>

      {allDeparted ? (
        <div className='rounded-xl border border-amber-200 bg-amber-50 p-5 text-center'>
          <p className='text-amber-800 font-semibold text-base'>No flights available today</p>
          <p className='text-amber-700 text-sm mt-1'>All flights for this route have departed. Please search for tomorrow or a later date.</p>
        </div>
      ) : (
        options.map((flight, i) => (
          <div key={i}
            onClick={() => !flight.departed && onSelect(flight)}
            className={`border rounded-xl p-4 transition-all ${
              flight.departed
                ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                : 'border-slate-200 hover:border-navy-900 hover:shadow-md cursor-pointer group'
            }`}>
            <div className='flex items-center gap-3 sm:gap-6'>
              <div className='flex items-center gap-3 sm:gap-6 flex-1 min-w-0'>
                <div className='text-center shrink-0'>
                  <p className={`font-bold text-lg leading-none ${flight.departed ? 'text-slate-400' : 'text-navy-900'}`}>
                    {formatTime(flight.departTime)}
                  </p>
                  <p className='text-xs text-slate-400 mt-1'>{AIRPORTS[from]?.code}</p>
                </div>
                <div className='flex-1 flex flex-col items-center min-w-0'>
                  <p className='text-xs text-slate-400'>{flight.duration}</p>
                  <div className='w-full flex items-center gap-1 my-1'>
                    <div className='flex-1 border-t border-slate-300' />
                    <svg className={`w-4 h-4 shrink-0 ${flight.departed ? 'text-slate-300' : 'text-gold-500'}`} fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                    </svg>
                    <div className='flex-1 border-t border-slate-300' />
                  </div>
                  <p className='text-xs text-slate-400'>Direct</p>
                </div>
                <div className='text-center shrink-0'>
                  <p className={`font-bold text-lg leading-none ${flight.departed ? 'text-slate-400' : 'text-navy-900'}`}>
                    {formatTime(flight.arrivalTime)}
                    {flight.nextDay && !flight.departed && <span className='text-xs text-gold-500 ml-1'>+1</span>}
                  </p>
                  <p className='text-xs text-slate-400 mt-1'>{AIRPORTS[to]?.code}</p>
                </div>
              </div>
              <div className='text-right shrink-0'>
                {flight.departed ? (
                  <span className='text-xs font-semibold text-slate-400 bg-slate-200 px-2 py-1 rounded-full'>Departed</span>
                ) : (
                  <>
                    <p className='font-display font-bold text-gold-500 text-xl'>${flight.price.total}</p>
                    <p className='text-xs text-slate-400'>total</p>
                    {flight.label==='Most Popular' && (
                      <span className='text-[10px] bg-navy-900 text-white px-2 py-0.5 rounded-full mt-1 inline-block'>Popular</span>
                    )}
                  </>
                )}
              </div>
              {!flight.departed && (
                <button className='hidden sm:block shrink-0 px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity'>
                  Select
                </button>
              )}
            </div>
            <p className='text-xs text-slate-400 mt-2 pt-2 border-t border-slate-100'>
              {flight.flightNumber} · {CABIN_CLASSES.find(c=>c.value===cabinClass)?.label} · {passengers} pax
              {flight.departed && ' · Flight has departed'}
            </p>
          </div>
        ))
      )}
    </div>
  )
}

const Booking = () => {
  const [searchParams] = useSearchParams()

  const [flightType, setFlightType] = useState(() => {
    const t=searchParams.get('type'); return t==='oneway'||t==='roundtrip'?t:'roundtrip'
  })
  const [from,       setFrom]       = useState(() => searchParams.get('from') || '')
  const [to,         setTo]         = useState(() => searchParams.get('to') || '')
  const [departDate, setDepartDate] = useState(() => searchParams.get('date') || '')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(() => Number(searchParams.get('passengers')||1))
  const [cabinClass, setCabinClass] = useState('economy')

  const [isSearching,    setIsSearching]    = useState(false)
  const [flightOptions,  setFlightOptions]  = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [returnOptions,  setReturnOptions]  = useState([])
  const [selectedReturn, setSelectedReturn] = useState(null)

  const [firstName,      setFirstName]      = useState('')
  const [lastName,       setLastName]       = useState('')
  const [gender,         setGender]         = useState('')
  const [dob,            setDob]            = useState('')
  const [email,          setEmail]          = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nationality, setNationality] = useState('')

  const [phoneError, setPhoneError] = useState('')

  const [error,            setError]            = useState('')
  const [dateError,        setDateError]        = useState('')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingDetails,   setBookingDetails]   = useState(null)

  const today         = startOfToday()
  const returnMinDate = departDate ? addDays(parseDateString(departDate), 1) : today

  const needsReturn = flightType === 'roundtrip'
  const currentStep = bookingConfirmed ? 3
    : (selectedFlight && needsReturn && !selectedReturn) ? 2
    : (selectedFlight && (!needsReturn || selectedReturn)) ? 3
    : 1

  // Nationality handler
  const handleNationalityChange = (val) => {
    setNationality(val)
    setPhoneNumber('')
    setPhoneError('')
    const d = NATIONALITY_DATA[val]
    if (d) setCountryCode(d.code)
  }

  // Phone number validation 
  const validatePhone = (raw, nat) => {
    setPhoneError('')
    if (!raw) return
    const digitCount = (raw.match(/[0-9]/g) || []).length
    const d = NATIONALITY_DATA[nat]
    if (d && digitCount > 0 && digitCount !== d.digits)
      setPhoneError(`${nat} numbers require ${d.digits} digits after the country code (you entered ${digitCount})`)
  }

  // Store raw value so user can type freely, only validate digit count
  const handlePhoneChange = (e) => {
    const raw = e.target.value
    setPhoneNumber(raw)
    validatePhone(raw, nationality)
  }

  const validateDates = () => {
    setDateError('')
    if (flightType!=='roundtrip') return true
    if (!returnDate)              { setDateError('Please select a return date'); return false }
    if (returnDate < departDate)  { setDateError('Return date cannot be before departure date'); return false }
    if (returnDate===departDate)  { setDateError('Return and departure date cannot be the same'); return false }
    return true
  }

  const swapCities = () => { setFrom(to); setTo(from) }

  const handleSearch = (e) => {
    e.preventDefault()
    setError('')
    if (from===to) { setError('Departure and destination cannot be the same city'); return }
    if (!validateDates()) return
    setIsSearching(true)
    setFlightOptions([]); setSelectedFlight(null); setReturnOptions([]); setSelectedReturn(null)
    setTimeout(() => {
      setFlightOptions(generateFlightOptions(from, to, cabinClass, passengers, flightType, departDate))
      setIsSearching(false)
    }, 1500)
  }

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
    if (needsReturn) {
      setReturnOptions(generateFlightOptions(to, from, cabinClass, passengers, 'oneway', returnDate))
    }
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  const handleSelectReturn = (flight) => {
    setSelectedReturn(flight)
    window.scrollTo({ top:0, behavior:'smooth' })
  }

  // All required passenger fields filled and valid
  const formIsValid =
    firstName.trim() !== '' &&
    lastName.trim()  !== '' &&
    gender           !== '' &&
    dob              !== '' &&
    email.trim()     !== '' &&
    nationality      !== '' &&
    phoneNumber.trim() !== '' &&
    !phoneError

  const handleBooking = (e) => {
    e.preventDefault()
    if (!formIsValid || phoneError) return
    const cabin = CABIN_CLASSES.find(c=>c.value===cabinClass)
    const outTotal = parseFloat(selectedFlight.price.total)
    const retTotal = selectedReturn ? parseFloat(selectedReturn.price.total) : 0

    setBookingDetails({
      reference:   genRef(),
      bookingDate: new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),
      passenger:   { firstName, lastName, gender, dob, email, phone:`${countryCode} ${phoneNumber}`, nationality },
      flight: {
        type:flightType, from, to, departDate,
        departTime:        selectedFlight.departTime,
        arrivalTime:       selectedFlight.arrivalTime,
        nextDay:           selectedFlight.nextDay,
        duration:          selectedFlight.duration,
        flightNumber:      selectedFlight.flightNumber,
        returnDate:        needsReturn ? returnDate : null,
        returnTime:        selectedReturn?.departTime || null,
        returnArrivalTime: selectedReturn?.arrivalTime || null,
        returnFlightNumber:selectedReturn?.flightNumber || null,
        returnDuration:    selectedReturn?.duration || null,
        cabinClass, passengers,
        seat:     genSeat(cabinClass),
        gate:     `G${Math.floor(10+Math.random()*90)}`,
        terminal: (cabinClass==='economy'||cabinClass==='premium') ? 'Terminal 2' : 'Terminal 1',
        baggage:  cabin?.baggage || '23kg checked + 7kg cabin',
      },
      price: {
        subtotal:   (parseFloat(selectedFlight.price.subtotal)+(selectedReturn?parseFloat(selectedReturn.price.subtotal):0)).toFixed(2),
        tax:        (parseFloat(selectedFlight.price.tax)+(selectedReturn?parseFloat(selectedReturn.price.tax):0)).toFixed(2),
        serviceFee: selectedReturn ? '50.00' : '25.00',
        total:      (outTotal+retTotal).toFixed(2),
      },
    })
    setBookingConfirmed(true)
  }

  const resetForm = () => {
    setFlightType('roundtrip'); setFrom(''); setTo(''); setDepartDate(''); setReturnDate('')
    setPassengers(1); setCabinClass('economy'); setIsSearching(false)
    setFlightOptions([]); setSelectedFlight(null); setReturnOptions([]); setSelectedReturn(null)
    setFirstName(''); setLastName(''); setGender(''); setDob('')
    setEmail(''); setCountryCode(''); setPhoneNumber(''); setNationality('')
    setPhoneError(''); setError(''); setDateError('')
  }
  const bookAnotherFlight = () => { resetForm(); setBookingConfirmed(false); setBookingDetails(null) }

  return (
    <>
      <Navbar />
      <section className='pt-18 pb-20 min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50'>
        <div className='max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14'>

          <div className='text-center mb-8'>
            <h1 className='font-display text-3xl md:text-5xl font-bold text-navy-900 mt-3 tracking-tight'>
              Book Your <span className='text-gold-500'>Flight</span>
            </h1>
            <p className='text-slate-600 mt-3 max-w-xl mx-auto'>
              Search, select, and confirm your next journey
            </p>
          </div>

          <BookingSteps currentStep={Math.min(currentStep, 3)} />

          {(error||dateError) && (
            <div className='max-w-4xl mx-auto mb-6 animate-slide-down'>
              <div className='flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl'>
                <svg className='w-5 h-5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='font-medium text-sm'>{error||dateError}</span>
              </div>
            </div>
          )}

          {/* E-TICKET */}
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
                    <p className='text-sm text-emerald-700'>E-ticket sent to {bookingDetails.passenger.email}</p>
                  </div>
                </div>
                <button onClick={bookAnotherFlight} className='text-sm font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 no-print'>
                  Book another flight
                </button>
              </div>

              <div className='boarding-pass'>
                <div className='grid grid-cols-1 md:grid-cols-[1fr_200px]'>
                  <div>
                    {/* Ticket header */}
                    <div className='bg-navy-900 text-white px-6 py-5 flex justify-between items-start'>
                      <div>
                        <p className='font-display text-xl font-bold tracking-wide'>UP AIR</p>
                        <p className='text-blue-200/70 text-xs mt-0.5'>Electronic Ticket / E-Ticket</p>
                        <p className='text-gold-400 text-xs font-mono mt-1'>{bookingDetails.flight.flightNumber}</p>
                      </div>
                      <div className='text-right'>
                        <p className='font-display text-2xl font-bold tracking-widest text-gold-400'>{bookingDetails.reference}</p>
                        <p className='text-blue-200/70 text-xs'>PNR Reference</p>
                      </div>
                    </div>

                    {/* Outbound */}
                    <div className='px-6 py-5 bg-slate-50 border-b border-slate-100'>
                      <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>
                        Outbound · {formatDate(bookingDetails.flight.departDate)}
                      </p>
                      <div className='flex items-center gap-3'>
                        <div className='text-center min-w-0'>
                          <p className='font-display text-3xl font-bold text-navy-900'>{AIRPORTS[bookingDetails.flight.from]?.code}</p>
                          <p className='text-xs text-slate-500 mt-0.5 truncate max-w-22.5'>{bookingDetails.flight.from}</p>
                          <p className='text-lg font-bold text-navy-700 mt-2'>{formatTime(bookingDetails.flight.departTime)}</p>
                        </div>
                        <div className='flex-1 flex flex-col items-center gap-1 px-2'>
                          <p className='text-xs text-slate-400'>{bookingDetails.flight.duration}</p>
                          <div className='w-full flex items-center gap-1 my-1'>
                            <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                            <svg className='w-5 h-5 text-gold-500 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                            </svg>
                            <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                          </div>
                          <p className='text-xs text-slate-400'>Direct</p>
                        </div>
                        <div className='text-center min-w-0'>
                          <p className='font-display text-3xl font-bold text-navy-900'>{AIRPORTS[bookingDetails.flight.to]?.code}</p>
                          <p className='text-xs text-slate-500 mt-0.5 truncate max-w-22.5'>{bookingDetails.flight.to}</p>
                          <p className='text-lg font-bold text-navy-700 mt-2'>
                            {formatTime(bookingDetails.flight.arrivalTime)}
                            {bookingDetails.flight.nextDay && <span className='text-xs text-gold-500 ml-1 align-super'>+1</span>}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Return (if roundtrip) */}
                    {bookingDetails.flight.returnDate && bookingDetails.flight.returnTime && (
                      <div className='px-6 py-5 bg-white border-b border-slate-100'>
                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>
                          Return · {formatDate(bookingDetails.flight.returnDate)}
                          <span className='text-gold-500 ml-2 font-mono'>{bookingDetails.flight.returnFlightNumber}</span>
                        </p>
                        <div className='flex items-center gap-3'>
                          <div className='text-center min-w-0'>
                            <p className='font-display text-3xl font-bold text-navy-900'>{AIRPORTS[bookingDetails.flight.to]?.code}</p>
                            <p className='text-xs text-slate-500 mt-0.5 truncate max-w-22.5'>{bookingDetails.flight.to}</p>
                            <p className='text-lg font-bold text-navy-700 mt-2'>{formatTime(bookingDetails.flight.returnTime)}</p>
                          </div>
                          <div className='flex-1 flex flex-col items-center gap-1 px-2'>
                            <p className='text-xs text-slate-400'>{bookingDetails.flight.returnDuration}</p>
                            <div className='w-full flex items-center gap-1 my-1'>
                              <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                              <svg className='w-5 h-5 text-gold-500 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                                <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                              </svg>
                              <div className='flex-1 border-t-2 border-dashed border-slate-300' />
                            </div>
                            <p className='text-xs text-slate-400'>Direct · Return</p>
                          </div>
                          <div className='text-center min-w-0'>
                            <p className='font-display text-3xl font-bold text-navy-900'>{AIRPORTS[bookingDetails.flight.from]?.code}</p>
                            <p className='text-xs text-slate-500 mt-0.5 truncate max-w-22.5'>{bookingDetails.flight.from}</p>
                            <p className='text-lg font-bold text-navy-700 mt-2'>{formatTime(bookingDetails.flight.returnArrivalTime)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Passenger */}
                    <div className='px-6 py-5 border-b border-slate-100'>
                      <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Passenger</p>
                      <p className='font-display text-lg font-bold text-navy-900'>
                        {bookingDetails.passenger.firstName} {bookingDetails.passenger.lastName}
                      </p>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-sm'>
                        <div><p className='text-slate-400 text-xs'>Email</p><p className='text-slate-700 break-all'>{bookingDetails.passenger.email}</p></div>
                        <div><p className='text-slate-400 text-xs'>Phone</p><p className='text-slate-700'>{bookingDetails.passenger.phone}</p></div>
                        <div><p className='text-slate-400 text-xs'>Nationality</p><p className='text-slate-700'>{bookingDetails.passenger.nationality}</p></div>
                        <div><p className='text-slate-400 text-xs'>Passengers</p><p className='text-slate-700'>{bookingDetails.flight.passengers} pax</p></div>
                        <div><p className='text-slate-400 text-xs'>Booked</p><p className='text-slate-700'>{bookingDetails.bookingDate}</p></div>
                      </div>
                    </div>

                    {/* Flight details */}
                    <div className='px-6 py-5 bg-slate-50'>
                      <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3'>Flight Details</p>
                      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                        <div><p className='text-slate-400 text-xs'>Seat</p><p className='text-navy-900 font-bold font-mono text-xl'>{bookingDetails.flight.seat}</p></div>
                        <div><p className='text-slate-400 text-xs'>Cabin</p><p className='text-slate-700 capitalize'>{bookingDetails.flight.cabinClass}</p></div>
                        <div><p className='text-slate-400 text-xs'>Gate</p><p className='text-slate-700 font-mono'>{bookingDetails.flight.gate}</p></div>
                        <div><p className='text-slate-400 text-xs'>Terminal</p><p className='text-slate-700'>{bookingDetails.flight.terminal}</p></div>
                        <div className='col-span-2 sm:col-span-4'><p className='text-slate-400 text-xs'>Baggage Allowance</p><p className='text-slate-700'>{bookingDetails.flight.baggage}</p></div>
                      </div>
                    </div>
                  </div>

                  {/* Payment sidebar */}
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
                          {Array.from({length:20}).map((_,i)=>(
                            <div key={i} className={`w-1 ${i%3===0?'h-10 bg-white/30':'h-6 bg-white/20'}`} />
                          ))}
                        </div>
                      </div>
                      <p className='text-[10px] text-blue-200/40 text-center mt-2 tracking-widest'>{bookingDetails.reference}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row justify-center gap-3 mt-8 no-print'>
                <button onClick={()=>window.print()} className='btn-primary'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z' />
                  </svg>
                  Print Ticket
                </button>
                <button onClick={bookAnotherFlight} className='btn-outline text-navy-900! border-navy-900/20! hover:bg-navy-900! hover:text-white! hover:border-navy-900!'>
                  Book Another Flight
                </button>
              </div>
            </div>

          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
              <div className='lg:col-span-2 space-y-6'>

                {/* STEP 1: Search */}
                {!selectedFlight && (
                  <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8'>
                    <h2 className='font-display text-xl font-bold text-navy-900 mb-6 flex items-center gap-2'>
                      <span className='w-8 h-8 rounded-lg bg-navy-900 text-white text-sm flex items-center justify-center font-bold'>1</span>
                      Search Flights
                    </h2>
                    <form onSubmit={handleSearch} className='space-y-5'>
                      <div className='flex flex-wrap gap-2'>
                        {[{value:'roundtrip',label:'Round Trip'},{value:'oneway',label:'One Way'}].map(({value,label})=>(
                          <button key={value} type='button' onClick={()=>setFlightType(value)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${flightType===value?'bg-navy-900 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                            {label}
                          </button>
                        ))}
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-end'>
                        <div>
                          <label className='form-label'>From</label>
                          <select value={from} onChange={e=>setFrom(e.target.value)} required
                            className={`form-input ${from===to&&from?'error':''}`}>
                            <option value=''>Select departure city</option>
                            {POPULAR_DESTINATIONS.map(c=><option key={c} value={c}>{c} ({AIRPORTS[c]?.code})</option>)}
                          </select>
                        </div>
                        <button type='button' onClick={swapCities} aria-label='Swap cities'
                          className='hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-slate-100 hover:bg-gold-400/20 text-slate-500 hover:text-gold-600 transition-colors mb-0.5'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
                          </svg>
                        </button>
                        <div>
                          <label className='form-label'>To</label>
                          <select value={to} onChange={e=>setTo(e.target.value)} required
                            className={`form-input ${from===to&&to?'error':''}`}>
                            <option value=''>Select destination</option>
                            {POPULAR_DESTINATIONS.map(c=><option key={c} value={c}>{c} ({AIRPORTS[c]?.code})</option>)}
                          </select>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label className='form-label'>Departure Date</label>
                          <DatePickerInput value={departDate} onChange={setDepartDate} minDate={today} required placeholder='Select departure date' />
                        </div>
                        {needsReturn && (
                          <div className='animate-fade-in'>
                            <label className='form-label'>Return Date</label>
                            <DatePickerInput value={returnDate} onChange={setReturnDate} minDate={returnMinDate} required
                              error={returnDate&&departDate&&returnDate<=departDate} placeholder='Select return date' />
                          </div>
                        )}
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label className='form-label'>Passengers</label>
                          <select value={passengers} onChange={e=>setPassengers(Number(e.target.value))} className='form-input'>
                            {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} {n===1?'Passenger':'Passengers'}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className='form-label'>Cabin Class</label>
                          <select value={cabinClass} onChange={e=>setCabinClass(e.target.value)} className='form-input'>
                            {CABIN_CLASSES.map(({value,label})=>(
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button type='submit' disabled={isSearching} className='btn-primary w-full py-3.5 disabled:opacity-70'>
                        {isSearching ? (
                          <span className='flex items-center justify-center gap-2'>
                            <svg className='animate-spin w-4 h-4' fill='none' viewBox='0 0 24 24'>
                              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                            </svg>
                            Searching flights...
                          </span>
                        ) : 'Search Flights'}
                      </button>
                    </form>

                    {flightOptions.length > 0 && (
                      <FlightList options={flightOptions} from={from} to={to} cabinClass={cabinClass}
                        passengers={passengers} onSelect={handleSelectFlight} dateLabel={departDate} />
                    )}
                  </div>
                )}

                {/* STEP 2: Return flight selection */}
                {selectedFlight && needsReturn && !selectedReturn && (
                  <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 animate-fade-in'>
                    <div className='flex items-center justify-between mb-6'>
                      <h2 className='font-display text-xl font-bold text-navy-900 flex items-center gap-2'>
                        <span className='w-8 h-8 rounded-lg bg-navy-900 text-white text-sm flex items-center justify-center font-bold'>2</span>
                        Select Return Flight
                      </h2>
                      <button onClick={()=>{setSelectedFlight(null);setReturnOptions([])}}
                        className='text-xs text-slate-500 hover:text-navy-900 underline'>
                        Change outbound
                      </button>
                    </div>
                    <div className='bg-navy-900/5 border border-navy-900/10 rounded-xl p-4 mb-6 flex items-center gap-4 text-sm'>
                      <div className='text-center'>
                        <p className='font-bold text-navy-900'>{AIRPORTS[from]?.code}</p>
                        <p className='text-xs text-slate-500'>{formatTime(selectedFlight.departTime)}</p>
                      </div>
                      <div className='flex-1 text-center text-xs text-slate-400'>{selectedFlight.duration} · Direct</div>
                      <div className='text-center'>
                        <p className='font-bold text-navy-900'>{AIRPORTS[to]?.code}</p>
                        <p className='text-xs text-slate-500'>{formatTime(selectedFlight.arrivalTime)}</p>
                      </div>
                      <span className='text-xs font-mono text-gold-600 shrink-0'>{selectedFlight.flightNumber}</span>
                    </div>
                    <FlightList options={returnOptions} from={to} to={from} cabinClass={cabinClass}
                      passengers={passengers} onSelect={handleSelectReturn} dateLabel={returnDate} />
                  </div>
                )}

                {/* STEP 3: Passenger details */}
                {selectedFlight && (!needsReturn || selectedReturn) && (
                  <>
                    {/* Flight summary card */}
                    <div className='bg-navy-900 text-white rounded-2xl p-5'>
                      <div className='flex items-start justify-between mb-4'>
                        <div>
                          <p className='text-xs text-blue-200/60 uppercase tracking-wider'>
                            {needsReturn ? 'Outbound Flight' : 'Selected Flight'}
                          </p>
                          <p className='font-mono text-gold-400 font-bold text-lg mt-0.5'>{selectedFlight.flightNumber}</p>
                        </div>
                        <button onClick={()=>{setSelectedFlight(null);setSelectedReturn(null);setReturnOptions([])}}
                          className='text-xs text-blue-200/70 hover:text-white underline'>
                          Change flight
                        </button>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='text-center'>
                          <p className='font-display text-2xl font-bold'>{AIRPORTS[from]?.code}</p>
                          <p className='text-sm text-blue-200/70 mt-1'>{formatTime(selectedFlight.departTime)}</p>
                        </div>
                        <div className='flex-1 flex flex-col items-center gap-1'>
                          <p className='text-xs text-blue-200/50'>{selectedFlight.duration} · Direct</p>
                          <div className='w-full flex items-center gap-1 my-1'>
                            <div className='flex-1 border-t border-dashed border-white/20' />
                            <svg className='w-4 h-4 text-gold-400 shrink-0' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                            </svg>
                            <div className='flex-1 border-t border-dashed border-white/20' />
                          </div>
                          <p className='text-xs text-blue-200/50'>{formatDate(departDate)}</p>
                        </div>
                        <div className='text-center'>
                          <p className='font-display text-2xl font-bold'>{AIRPORTS[to]?.code}</p>
                          <p className='text-sm text-blue-200/70 mt-1'>
                            {formatTime(selectedFlight.arrivalTime)}
                            {selectedFlight.nextDay && <span className='text-xs text-gold-400 ml-1'>+1</span>}
                          </p>
                        </div>
                      </div>
                      {selectedReturn && (
                        <div className='mt-4 pt-4 border-t border-white/10'>
                          <p className='text-xs text-blue-200/60 uppercase tracking-wider mb-2'>
                            Return · {selectedReturn.flightNumber}
                          </p>
                          <div className='flex items-center gap-4'>
                            <div className='text-center'>
                              <p className='font-display text-xl font-bold'>{AIRPORTS[to]?.code}</p>
                              <p className='text-sm text-blue-200/70 mt-1'>{formatTime(selectedReturn.departTime)}</p>
                            </div>
                            <div className='flex-1 text-center'>
                              <p className='text-xs text-blue-200/50'>{selectedReturn.duration} · Direct · {formatDate(returnDate)}</p>
                            </div>
                            <div className='text-center'>
                              <p className='font-display text-xl font-bold'>{AIRPORTS[from]?.code}</p>
                              <p className='text-sm text-blue-200/70 mt-1'>{formatTime(selectedReturn.arrivalTime)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Passenger form */}
                    <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 animate-fade-in'>
                      <h2 className='font-display text-xl font-bold text-navy-900 mb-6 flex items-center gap-2'>
                        <span className='w-8 h-8 rounded-lg bg-navy-900 text-white text-sm flex items-center justify-center font-bold'>
                          {needsReturn ? '3' : '2'}
                        </span>
                        Passenger Details
                      </h2>
                      <form onSubmit={handleBooking} className='space-y-4'>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            <label className='form-label'>First Name</label>
                            <input type='text' value={firstName} onChange={e=>setFirstName(e.target.value)} required className='form-input' placeholder='John' />
                          </div>
                          <div>
                            <label className='form-label'>Last Name</label>
                            <input type='text' value={lastName} onChange={e=>setLastName(e.target.value)} required className='form-input' placeholder='Doe' />
                          </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            <label className='form-label'>Gender</label>
                            <select value={gender} onChange={e=>setGender(e.target.value)} required className='form-input'>
                              <option value=''>Select gender</option>
                              <option>Male</option><option>Female</option><option>Prefer not to say</option>
                            </select>
                          </div>
                          <div>
                            <label className='form-label'>Date of Birth</label>
                            <DatePickerInput value={dob} onChange={setDob} maxDate={today} required placeholder='Select date of birth' />
                          </div>
                        </div>

                        <div>
                          <label className='form-label'>Email</label>
                          <input type='email' value={email} onChange={e=>setEmail(e.target.value)} required className='form-input' placeholder='john@example.com' />
                        </div>

                        {/* Nationality and Phone number */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            {/* Nationality auto-fills country code */}
                            <label className='form-label'>Nationality</label>
                            <select value={nationality} onChange={e=>handleNationalityChange(e.target.value)} required className='form-input'>
                              <option value=''>Select nationality</option>
                              {Object.keys(NATIONALITY_DATA).map(n=><option key={n} value={n}>{n}</option>)}
                            </select>
                          </div>

                          <div>
                            <label className='form-label'>Phone Number</label>
                            <div className={`flex items-stretch rounded-xl border overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gold-400 focus-within:border-gold-400 ${phoneError ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'}`}>
                              <span className='flex items-center px-3 bg-slate-50 text-slate-600 font-mono text-sm border-r border-slate-200 shrink-0 select-none'>
                                {countryCode || '+--'}
                              </span>
                              <input
                                type='text'
                                inputMode='tel'
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                required
                                className='flex-1 px-3 py-2.5 outline-none bg-transparent text-sm text-navy-900 placeholder:text-slate-400'
                                placeholder={nationality && NATIONALITY_DATA[nationality]
                                  ? `${NATIONALITY_DATA[nationality].digits} digits`
                                  : 'Select nationality first'}
                                disabled={!nationality}
                              />
                            </div>
                            {phoneError ? (
                              <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                                <svg className='w-3.5 h-3.5 shrink-0' fill='currentColor' viewBox='0 0 20 20'>
                                  <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                                </svg>
                                {phoneError}
                              </p>
                            ) : nationality && NATIONALITY_DATA[nationality] && (
                              <p className='text-slate-400 text-xs mt-1'>
                                Enter {NATIONALITY_DATA[nationality].digits} digits after {countryCode}
                              </p>
                            )}
                          </div>
                        </div>

                        <button type='submit'
                          disabled={!formIsValid}
                          className='w-full py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed'>
                          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                          </svg>
                          Confirm Booking
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </div>

              {/* Trip Summary Sidebar */}
              <div className='lg:col-span-1'>
                <div className='bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 sticky top-24'>
                  <h2 className='font-display text-lg font-bold text-navy-900 mb-5'>Trip Summary</h2>
                  {selectedFlight ? (
                    <div className='animate-fade-in'>
                      <div className='bg-slate-50 rounded-xl p-4 mb-5'>
                        <div className='flex items-center justify-between mb-2'>
                          <span className='font-display font-bold text-navy-900'>{AIRPORTS[from]?.code}</span>
                          <svg className='w-4 h-4 text-gold-500' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M21 16v-2l-8-5V3.5a1.5 1.5 0 00-1.5-1.5h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' />
                          </svg>
                          <span className='font-display font-bold text-navy-900'>{AIRPORTS[to]?.code}</span>
                        </div>
                        <p className='text-xs text-slate-500'>{formatDate(departDate)}</p>
                        <p className='text-xs text-slate-500'>
                          {formatTime(selectedFlight.departTime)} → {formatTime(selectedFlight.arrivalTime)}
                          {selectedFlight.nextDay && <span className='text-gold-500 ml-1'>+1</span>}
                        </p>
                        {selectedReturn && (
                          <>
                            <p className='text-xs text-slate-500 mt-2'>Return {formatDate(returnDate)}</p>
                            <p className='text-xs text-slate-500'>
                              {formatTime(selectedReturn.departTime)} → {formatTime(selectedReturn.arrivalTime)}
                            </p>
                          </>
                        )}
                        <p className='text-xs text-slate-500 mt-1 capitalize'>
                          {cabinClass} · {passengers} pax
                        </p>
                      </div>
                      <div className='space-y-3 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-slate-500'>Base fare</span>
                          <span className='font-medium'>
                            ${(parseFloat(selectedFlight.price.subtotal)+(selectedReturn?parseFloat(selectedReturn.price.subtotal):0)).toFixed(2)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-500'>Taxes & fees</span>
                          <span className='font-medium'>
                            ${(parseFloat(selectedFlight.price.tax)+(selectedReturn?parseFloat(selectedReturn.price.tax):0)).toFixed(2)}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-500'>Service fee</span>
                          <span className='font-medium'>${selectedReturn?'50.00':'25.00'}</span>
                        </div>
                        <div className='border-t border-slate-100 pt-3 flex justify-between items-end'>
                          <span className='font-semibold text-navy-900'>Total</span>
                          <span className='font-display text-2xl font-bold text-gold-500'>
                            ${(parseFloat(selectedFlight.price.total)+(selectedReturn?parseFloat(selectedReturn.price.total):0)).toFixed(2)}
                          </span>
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
                      <p className='text-slate-500 text-sm'>Search for flights to see pricing</p>
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