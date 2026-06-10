import React from 'react'
import DatePicker from 'react-datepicker'

export const parseDateString = (str) => {
  if (!str) return null
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const formatDateString = (date) => {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const startOfToday = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export const addDays = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const toDate = (value) => {
  if (!value) return undefined
  if (value instanceof Date) return value
  return parseDateString(value)
}

const DatePickerInput = ({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = 'Select date',
  required = false,
  error = false,
  className = '',
  id,
}) => {
  return (
    <DatePicker
      id={id}
      selected={parseDateString(value)}
      onChange={(date) => onChange(formatDateString(date))}
      minDate={toDate(minDate)}
      maxDate={toDate(maxDate)}
      dateFormat='MMM d, yyyy'
      placeholderText={placeholder}
      required={required}
      calendarClassName='upair-datepicker'
      popperClassName='upair-datepicker-popper'
      className={`form-input ${error ? 'error' : ''} ${className}`.trim()}
      showPopperArrow={false}
      autoComplete='off'
    />
  )
}

export default DatePickerInput
