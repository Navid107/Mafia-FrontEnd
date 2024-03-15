import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = ({ loggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li>
          <HandleActiveLink to='/'>Home</HandleActiveLink>
        </li>
        <li>
          <HandleActiveLink to='/rules'>Rules</HandleActiveLink>
        </li>
        <li>
          <HandleActiveLink to='/character'>Characters</HandleActiveLink>
        </li>
        <li>
          <HandleActiveLink to='/gameplay'>Gameplay</HandleActiveLink>
        </li>
        {!loggedIn && (
          <li>
            <HandleActiveLink to='/login'>Login</HandleActiveLink>
          </li>
        )}
        {loggedIn && (
          <>
            <li>
              <HandleActiveLink to='/user'>Profile</HandleActiveLink>
            </li>
            <li>
              <HandleActiveLink onClick={handleLogout}>Logout</HandleActiveLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  )

function HandleActiveLink({ to, children, ...props }){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname })
  return(
    <li className={isActive ? 'active' : ''} >
      <Link to={to} {...props} >
        {children}
        </Link>
    </li>
  )
}
}
export default NavigationBar