import React from 'react'
import DashHeader from './DashHeader'
import DashStats from './DashStats'
import DashRecent from './DashRecent'

const MainDashBoard = () => {
  return (
   <>
    <div className="bg-gray-900 rounded p-6 space-y-6 flex-1 transition-all duration-300 m-2 ">
      <DashHeader />
      <DashStats />
      <DashRecent />
    </div>
   </>
  )
}

export default MainDashBoard