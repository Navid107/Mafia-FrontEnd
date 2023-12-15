import React from 'react'
import AuthService from './auth/AuthService'
const Rules = () => {
  const user = AuthService.getCurrentUser().userId
  console.log(user)
  return (
    <div>Rules</div>
  )
}

export default Rules