import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = ({ loggedIn, handleLogout }) => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
       
          <ActiveLink to="/">Home</ActiveLink>
       
          <ActiveLink to="/rules">Rules</ActiveLink>
       
          <ActiveLink to="/character">Characters</ActiveLink>
       
          <ActiveLink to="/gameplay">Gameplay</ActiveLink>
        
        {!loggedIn && (
            <ActiveLink to="/login">Login</ActiveLink>
          
        )}
        {loggedIn && (
          <>
              <ActiveLink to="/user">Profile</ActiveLink>
              <ActiveLink onClick={handleLogout}>Logout</ActiveLink>
          </>
        )}
      </ul>
    </nav>
  )
}
function ActiveLink({ to, children, ...props }){
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

export default NavigationBar