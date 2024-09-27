import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext } from '../Context/MyContext'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { SiSimpleanalytics } from "react-icons/si";

function Navbar() {

  const { login, role } = useContext(MyContext);
  
  return (
    <div className='shadow-lg justify-between px-20 h-20 flex items-center'>
      <NavLink to="/" className='text-2xl font-semibold italic underline-offset-2 underline text-red-600'>
        EventBuddy
      </NavLink>
      <div className='flex items-center gap-8'>
        {
          login ? (
            <>
              {
                role === "organiser" && (
                  <NavLink to="/role/myevents">
                    <SiSimpleanalytics className='size-8' />
                  </NavLink>
                )
              }
              {
                role === "staff" && (
                  <NavLink to="/role/tasks">
                    <h1>Tasks</h1>
                  </NavLink>
                )
              }
              <NavLink to="/chat">
                <IoChatbubbleEllipsesOutline className='size-8' />
              </NavLink>
              <NavLink to="/notification">
                <IoIosNotificationsOutline className='size-8' />
              </NavLink>
              <NavLink to="/profile" className='border-2 rounded-2xl border-black p-3 font-bold'>
                Profile
              </NavLink>
            </>
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

export default Navbar;
