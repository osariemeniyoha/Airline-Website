import { useState, useCallback } from 'react'

export const useBookingForm = () => {
  const [formState, setFormState] = useState({
    flightType: 'roundtrip',
    from: '',
    to: '',
    departDate: '',
    departTime: '',
    returnDate: '',
    returnTime: '',
    passengers: 1,
    cabinClass: 'economy',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    nationality: ''
  })

  const [errors, setErrors] = useState({})

  const setField = useCallback((name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const getValues = useCallback(() => formState, [formState])

  const reset = useCallback(() => {
    setFormState({
      flightType: 'roundtrip',
      from: '',
      to: '',
      departDate: '',
      departTime: '',
      returnDate: '',
      returnTime: '',
      passengers: 1,
      cabinClass: 'economy',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      nationality: ''
    })
    setErrors({})
  }, [])

  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    formState,
    setField,
    getValues,
    reset,
    errors,
    setError,
    clearErrors
  }
}

export default useBookingForm
