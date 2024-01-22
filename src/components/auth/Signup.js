import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from './AuthService'
const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
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
            <input type='password' placeholder='Confirm password' required />
          </div>
          <div className='field btn'>
            
            <button type='submit' value='Signup'>SignUp</button>
          </div>
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
