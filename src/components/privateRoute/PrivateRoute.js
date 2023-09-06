import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

  const accessToken = localStorage.getItem('accessToken');
  console.log('line 8',accessToken)
 
return (
  accessToken ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute;
