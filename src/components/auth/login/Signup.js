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

    // Validate username length
    if (name.length < 3 || name.length > 9) {
      setMessage('Username must be between 3 and 9 characters')
      return
    }

    // Validate email format
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address')
      return
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      // Register user
      await AuthService.register(name, email, password)
      navigate('/login')
      window.location.reload() // Refresh page after registration
    } catch (error) {
      setMessage('An error occurred. Please check your inputs and try again.')
    }
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
              required
            />
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
