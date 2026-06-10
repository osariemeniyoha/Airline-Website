import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.png'

const NAV_LINKS = [
  { href: '/#about', label: 'About', hash: true },
  { href: '/#destinations', label: 'Destinations', hash: true },
  { href: '/#whyus', label: 'Why Us', hash: true },
  { href: '/#testimonials', label: 'Reviews', hash: true },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsOpen(false)

  const handleHomeClick = (e) => {
    closeMenu()
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (window.location.hash) {
        window.history.replaceState(null, '', '/')
      }
    } else {
      e.preventDefault()
      navigate('/')
    }
  }

  const navClass = scrolled || !isHome
    ? 'glass-nav-solid shadow-lg'
    : 'glass-nav'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className='max-w-7xl mx-auto flex justify-between items-center h-[4.5rem] px-5 md:px-8'>
        <Link to='/' className='flex items-center shrink-0' onClick={handleHomeClick}>
          <img src={Logo} alt='UP AIR' className='h-14 md:h-16 w-auto object-contain' />
        </Link>

        <ul className='hidden lg:flex items-center gap-1'>
          <li>
            <Link
              to='/'
              onClick={handleHomeClick}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHome ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
          </li>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={closeMenu}
                className='px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors'
              >
                {label}
              </a>
            </li>
          ))}
          <li className='ml-3'>
            <Link to='/booking' onClick={closeMenu} className='btn-primary !py-2.5 !px-5 !text-sm'>
              Book a Flight
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className='lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors'
          aria-label='Toggle menu'
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className='lg:hidden animate-slide-down border-t border-white/10 bg-navy-900/98 backdrop-blur-xl'>
          <ul className='flex flex-col px-5 py-4 gap-1'>
            <li>
              <Link to='/' onClick={handleHomeClick} className='block px-4 py-3 rounded-lg text-white/90 hover:bg-white/10 font-medium'>
                Home
              </Link>
            </li>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} onClick={closeMenu} className='block px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 font-medium'>
                  {label}
                </a>
              </li>
            ))}
            <li className='pt-2'>
              <Link to='/booking' onClick={closeMenu} className='btn-primary w-full !py-3'>
                Book a Flight
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
