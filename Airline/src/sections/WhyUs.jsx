import React from 'react'

const WhyUs = () => {
  return (
     <section id='whyus' className='pt-20 bg-gray-100 min-h-screen flex items-center py-16'>

      <div className='max-w-6xl mx-auto px-6 w-full'>

        <div className='mb-12 md:mb-16'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-inter font-bold text-blue-900 mb-6'>
            Why  <span className='text-yellow-500'>Choose</span> Us
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12'>
           
           {/* Fast Booking */}
          <div className='font-montserrat bg-blue-900 text-blue-100  border border-blue-100 rounded-xl
          p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>

               <div className='flex justify-center'>
              <svg className="w-12 h-12 text-yellow-500 dark:text-yellow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.051 8.102-3.778.322-1.994 1.994a.94.94 0 0 0 .533 1.6l2.698.316m8.39 1.617-.322 3.78-1.994 1.994a.94.94 0 0 1-1.595-.533l-.4-2.652m8.166-11.174a1.366 1.366 0 0 0-1.12-1.12c-1.616-.279-4.906-.623-6.38.853-1.671 1.672-5.211 8.015-6.31 10.023a.932.932 0 0 0 .162 1.111l.828.835.833.832a.932.932 0 0 0 1.111.163c2.008-1.102 8.35-4.642 10.021-6.312 1.475-1.478 1.133-4.77.855-6.385Zm-2.961 3.722a1.88 1.88 0 1 1-3.76 0 1.88 1.88 0 0 1 3.76 0Z"/>
            </svg>
            </div>

            <h1 className='text-2xl md:text-2xl lg:text-3xl font-bold font-inter mb-2'>
              Fast Booking 
            </h1>
            <p className='text-xl md:text-xl lg:text-xl  text-white mb-2'>
              Our simple and intuitive booking process gets you from search to seat without stress.
            </p>
          </div>

           
           {/* Safety */}
           <div className='font-montserrat bg-blue-900 border border-blue-100 text-blue-100 rounded-xl
          p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>

               <div className='flex justify-center'>
             <svg class="w-12 h-12 text-yellow-500 dark:text-yellow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clip-rule="evenodd"/>
            </svg>

            </div>

            <h1 className='text-2xl md:text-2xl lg:text-3xl font-bold font-inter mb-2'>
              Safety First
            </h1>
             <p className='text-xl md:text-xl lg:text-xl  text-white mb-2'>
              We operate with strict safety standards, modern aircraft, and highly trained crew on every flight.
            </p>
          </div>

           
           {/* Affordable Prices  */}
           <div className='font-montserrat bg-blue-900 border text-blue-100 border-blue-100 rounded-xl
          p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>

               <div className='flex justify-center'>
             <svg class="w-12 h-12 text-yellow-500 dark:text-yellow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8H5m12 0a1 1 0 0 1 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"/>
            </svg>

            </div>

            <h1 className='text-2xl md:text-2xl lg:text-3xl font-bold font-inter mb-2'>
              Affordable Prices
            </h1>
            <p className='text-xl md:text-xl lg:text-xl  text-white mb-2'>
              Enjoy competitive fares without compromising comfort, service, or reliability.
            </p>
          </div>

           
           {/* On Time Flight */}
           <div className='font-montserrat bg-blue-900 border text-blue-100 border-blue-100 rounded-xl
          p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300'>

               <div className='flex justify-center'>
             <svg class="w-12 h-12 text-yellow-500 dark:text-yellow" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
            </svg>

            </div>

            <h1 className='text-2xl md:text-2xl lg:text-3xl font-bold font-inter text-white mb-2'>
              On Time Flight 
            </h1>
             <p className='text-xl md:text-xl lg:text-xl  text-white mb-2'>
              We value your time and work hard to ensure departures and arrivals stay on schedule.
            </p>
          </div>
        </div>

        
      </div>
        
    </section>
  )
}

export default WhyUs