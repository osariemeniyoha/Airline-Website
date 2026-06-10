import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Destinations from '../sections/Destinations'
import WhyUs from '../sections/WhyUs'
import Testimonials from '../sections/Testimonials'
import CTA from '../sections/CTA'

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <Destinations/>
    <WhyUs/>
    <Testimonials/>
    <CTA/>
    <Footer/>
    </>
  )
}

export default LandingPage