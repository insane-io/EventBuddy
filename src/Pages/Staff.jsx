import React from 'react'

const Staff = () => {

    const {role} = useContext(MyContext)
  return (
    <div>
      { role === "staff" ? <Outlet/> : <PermissionDenied/>}
      
    </div>
  )
}

export default Staff
