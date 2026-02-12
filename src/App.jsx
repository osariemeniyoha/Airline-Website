import React from 'react'
import{ BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BookingPage from './pages/BookingPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element= {<LandingPage/>}/>
        <Route path='/booking' element ={<BookingPage/>} />
      </Routes>
    </BrowserRouter>
  )
  
}

export default App