import InputBoxs from '@/components/InputBoxs'
import Navbar from '@/components/Navbar'
import React from 'react'

const URLInput = () => {
  return (
    <div className='min-h-screen w-full bg-background'>
        <Navbar />
        <div className=" h-screen w-full pt-32">
          <InputBoxs />

          
        </div>
    </div>
  )
}

export default URLInput