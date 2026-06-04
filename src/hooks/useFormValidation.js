import { useCallback } from 'react'

const validators = {
  required: (value) => !value ? 'This field is required' : '',
  email: (value) => {
    if (!value) return ''
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !emailRegex.test(value) ? 'Please enter a valid email' : ''
  },
  phone: (value) => {
    if (!value) return ''
    const phoneRegex = /^[\d\s-+()]{7,}$/
    return !phoneRegex.test(value) ? 'Please enter a valid phone number' : ''
  },
  minLength: (value, length) => {
    if (!value) return ''
    return value.length < length ? `Minimum ${length} characters required` : ''
  },
  dateOfBirth: (value) => {
    if (!value) return ''
    const dob = new Date(value)
    const today = new Date()
    if (dob > today) return 'Date of birth cannot be in the future'
    const age = today.getFullYear() - dob.getFullYear()
    if (age < 18) return 'You must be at least 18 years old'
    return ''
  }
}

export const useFormValidation = () => {
  const validate = useCallback((value, rules) => {
    if (!rules || rules.length === 0) return ''

    for (const rule of rules) {
      let error = ''

      if (typeof rule === 'string') {
        error = validators[rule]?.(value) || ''
      } else if (typeof rule === 'object') {
        const { type, params } = rule
        error = validators[type]?.(value, params) || ''
      }

      if (error) return error
    }

    return ''
  }, [])

  return { validate }
}

export default useFormValidation
