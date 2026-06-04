import { useState, useCallback, useEffect } from 'react'

export const useCarousel = (items, autoRotateInterval = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev === items.length - 1 ? 0 : prev + 1))
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? items.length - 1 : prev - 1))
  }, [items.length])

  const goTo = useCallback((index) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index)
    }
  }, [items.length])

  useEffect(() => {
    if (!items || items.length === 0) return

    const interval = setInterval(() => {
      next()
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [next, autoRotateInterval, items])

  return {
    currentIndex,
    next,
    prev,
    goTo,
    currentItem: items[currentIndex],
    itemsCount: items.length
  }
}

export default useCarousel
