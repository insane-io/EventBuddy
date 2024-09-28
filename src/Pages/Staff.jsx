import React from 'react'
import { useContext } from 'react'
import {MyContext} from "../Context/MyContext"
import {Outlet} from "react-router-dom"
import PermissionDenied from "./PermissionDenied"

const Staff = () => {

    const {role} = useContext(MyContext)
  return (
    <div>
      { role === "staff" ? <Outlet/> : <PermissionDenied/>}
      
    </div>
  )
}

export default Staff
