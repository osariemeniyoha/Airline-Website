import { useReducer, useCallback } from 'react'

const initialState = {
  step: 1,
  searchResults: null,
  bookingConfirmed: false,
  bookingDetails: null,
  loading: false,
  error: null
}

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_FLIGHTS':
      return {
        ...state,
        step: 2,
        searchResults: action.payload,
        loading: false,
        error: null
      }
    case 'SHOW_PASSENGER_FORM':
      return {
        ...state,
        step: 2,
        loading: false
      }
    case 'CONFIRM_BOOKING':
      return {
        ...state,
        step: 3,
        bookingConfirmed: true,
        bookingDetails: action.payload,
        loading: false,
        error: null
      }
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const useBookingFlow = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const searchFlights = useCallback((searchData) => {
    dispatch({ type: 'SET_LOADING' })
    dispatch({ type: 'SEARCH_FLIGHTS', payload: searchData })
  }, [])

  const confirmBooking = useCallback((bookingData) => {
    dispatch({ type: 'CONFIRM_BOOKING', payload: bookingData })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [])

  return {
    state,
    searchFlights,
    confirmBooking,
    reset,
    setError,
    step: state.step,
    isLoading: state.loading,
    error: state.error
  }
}

export default useBookingFlow
