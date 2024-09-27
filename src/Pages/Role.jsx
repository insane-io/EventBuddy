import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import PermissionDenied from "../Pages/PermissionDenied"
import { MyContext } from '../Context/MyContext'

const Role = () => {
    const {role} = useContext(MyContext)
  return (
    <div>
      { role === "organiser" ? <Outlet/> : <PermissionDenied/>}
    </div>
  )
}

export default Role
