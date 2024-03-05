import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = ({ loggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/rules'>Rules</Link>
        </li>
        <li>
          <Link to='/character'>Characters</Link>
        </li>
        <li>
          <Link to='/gameplay'>Gameplay</Link>
        </li>
        {!loggedIn && (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        )}
        {loggedIn && (
          <>
            <li>
              <Link to='/user'>Profile</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavigationBar