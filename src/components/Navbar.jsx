import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'
import Hamburger from '../assets/hambuger.png'




const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false) // state for toogle it is track by boolean state for open and close
  return (
    
    <nav className='bg-blue-900 flex justify-between items-center font-inter font-bold h-20 px-6 fixed top-0 left-0 right-0 z-50 shadow-lg '>
        

        <img src={Logo} alt="Airline logo" className='h-32 w-auto' />

        <ul className={`${isOpen ? 'flex flex-col absolute top-20 left-0 right-0 bg-blue-900 py-6 z-50' : 'hidden'} lg:flex lg:flex-row lg:static lg:bg-transparent lg:py-0 items-center gap-6 lg:gap-8 text-white`}>
            <li><Link to='/' className='hover:text-blue-300 py-2 lg:py-0'>Home</Link></li>
            <li><a href="#about" className='hover:text-blue-300 py-2 lg:py-0' >About</a></li>
            <li><a href="#destinations" className='hover:text-blue-300 py-2 lg:py-0' >Destinations</a></li>
            <li><a href="#whyus" className='hover:text-blue-300 py-2 lg:py-0' >Why Us</a></li>
            <li><a href="#testimonials" className='hover:text-blue-300 py-2 lg:py-0' >Testimonials</a></li>

            <li className='text-white bg-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-400 mt-2 lg:mt-0 font-semibold  '>
                <Link to='/booking'>
                   Book a Flight 
                </Link>
            </li>
        </ul>

        <button onClick={() => setIsOpen (!isOpen)}>
          <img src={Hamburger} alt="hamburger" className='size-16 mr-10 hidden max-lg:block' />
        </button>
       
        
        
        
    </nav>
  )
}

export default Navbar