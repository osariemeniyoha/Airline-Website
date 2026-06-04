import { useMemo } from 'react'

const BASE_PRICES = {
  economy: 450,
  premium: 650,
  business: 1200,
  first: 2500
}

const DISTANCE_MULTIPLIERS = {
  'Lagos-London': 1.5,
  'Lagos-New York': 2.0,
  'Lagos-Dubai': 1.3,
  'Lagos-Paris': 1.4,
  'Lagos-Tokyo': 2.2,
  'New York-London': 1.2,
  'Dubai-London': 1.3,
  default: 1.0
}

export const usePriceCalculation = (flightType, from, to, passengers, cabinClass) => {
  const calculatedPrice = useMemo(() => {
    if (!from || !to || !passengers) return null

    const route = `${from}-${to}`
    const distanceMultiplier = DISTANCE_MULTIPLIERS[route] || DISTANCE_MULTIPLIERS.default
    const passengerMultiplier = passengers
    const flightTypeMultiplier = flightType === 'roundtrip' ? 2 : 1

    const basePrice = BASE_PRICES[cabinClass] || BASE_PRICES.economy
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
  }, [flightType, from, to, passengers, cabinClass])

  return calculatedPrice
}

export default usePriceCalculation
