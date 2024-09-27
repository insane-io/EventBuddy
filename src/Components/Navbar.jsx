import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext } from '../Context/MyContext'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function Navbar() {

  const { login } = useContext(MyContext)
  return (
    <div className=' shadow-lg justify-between px-20 h-20 flex items-center'>
      <NavLink to="/" className='text-2xl font-semibold italic underline-offset-2 underline text-red-600'>
        EventBuddy
      </NavLink>
      <div className='flex items-center gap-4'>
        <NavLink to="/chat">
          <IoChatbubbleEllipsesOutline className='size-8'/>
        </NavLink>
        {
          login ? (
            <NavLink to="/profile" className='border-2 rounded-2xl border-black p-3 font-bold'>
              Profile
            </NavLink>
          ) : (
            <NavLink to="/login" className='border-2 rounded-2xl border-black p-3 font-bold'>
              Login
            </NavLink>
          )
        }

      </div>
    </div>
  )
}

export default Navbar
