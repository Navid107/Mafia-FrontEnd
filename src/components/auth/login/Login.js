import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import AuthService from '../hooks/AuthService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async e => {
    e.preventDefault()
    
    // Call the login function from the AuthService
    AuthService.login(email, password).then(response => {
      if (response === true) {
        navigate('/user')
        window.location.reload()
      } else {
        setMessage('Invalid Email and Password')
      }
    })
  }

  return (
    <div className='form-container'>
      <div className='form-inner'>
        <form className='login' onSubmit={handleSubmit}>
          <div className='field'>
            <input
              type='text'
              placeholder='Email Address'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='field'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button className='field-btn' type='submit' value='Login'>
            {' '}
            Login{' '}
          </button>

          <div className='signup-link'>
            Create an account <a href='/signup'>Signup now</a>
          </div>
        </form>
        {message && (
          <div className='alert alert-danger' role='alert'>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
