import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('user')
  console.log(accessToken)

  return accessToken ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
