import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = ({ loggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <ActiveLink to='/'>Home</ActiveLink>
        <ActiveLink to='/rules'>Rules</ActiveLink>
        <ActiveLink to='/character'>Characters</ActiveLink>
        <ActiveLink to='/gameplay'>Gameplay</ActiveLink>
        {!loggedIn && <ActiveLink to='/login'>Login</ActiveLink>}
        {loggedIn && (
          <>
            <ActiveLink to='/user'>Profile</ActiveLink>
            <ActiveLink to='/login' onClick={handleLogout}>
              Logout
            </ActiveLink>
          </>
        )}
      </ul>
    </nav>
  )
}
function ActiveLink ({ to, children, ...props }) {
  return (
    <li>
      <NavLink
        to={to}
        {...props}
        className={children === 'Logout' ? 'loggedIn' : ''}
      >
        {children}
      </NavLink>
    </li>
  )
}

export default NavigationBar
