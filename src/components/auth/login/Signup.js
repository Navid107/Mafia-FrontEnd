import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../hooks/AuthService'
const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')

    if(name.length > 9 || name.length < 3) {
      setMessage("Username must be between 9-3 letter")
      return 
    }
    // Email validation
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address')
      return
    }

    // Password confirmation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    // Create an object to send as the request body
    AuthService.register(name, email, password).then(
      () => {
        navigate('/login')
        window.location.reload()
      },
      error => {
        setMessage('Please Check Your Inputs')
      }
    )
  }

  // Function to validate email format
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <div className='form-container'>
      <div className='form-inner'>
        <form className='signup' onSubmit={handleSubmit}>
          <div className='field'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
          <div className='field'>
            <input
             type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required />
          </div>

          <button className='field-btn' type='submit' value='Signup'>
            SignUp
          </button>

          <div className='signup-link'>
            Already have an account? <a href='/login'>Login</a>
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

export default SignUp
