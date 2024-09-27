import React from 'react'
import Navbar from './Components/Navbar'
import DashBoard from './Pages/DashBoard'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <div className='h-screen'>
      <Navbar/>
      <div className=''>
      <Outlet/>
      </div>
    </div>
  )
}

export default BaseLayout
