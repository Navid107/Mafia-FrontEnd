import axios from 'axios'
import jwtDecode from 'jwt-decode'
const API_URL = process.env.REACT_APP_API_ONLINE;

// Function to register a new user
const register = (name, email, password) => {
  return axios.post(API_URL + 'auth/signup', {
    name,
    email,
    password
  })
}

// Function to log in a user
const login = async (email, password) => {
  try {
    // Send a POST request to the login endpoint with credentials
    const response = await axios.post(
      API_URL + 'auth/login',
      {
        email,
        password
      },
      { withCredentials: true } // Include credentials (cookies) with the request
    )
    //store the access token in local storage and set default headers
    const accessToken = response.data.accessToken
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    return true
  } catch (error) {
    console.log(error) // Log any errors to the console
    return error
  }
}

// Function to logout a user
const logout = async () => {
  try {
    // Send a POST request to the login endpoint with credentials
    await axios.get(API_URL + 'auth/logout', { withCredentials: true })
    localStorage.removeItem('accessToken')
    window.location.reload()
  } catch (error) {
    console.log(error) // Log any errors to the console
    return error
  }
}

// Function to get the current user from the access token
const getCurrentUser = () => {
  const token = localStorage.getItem('accessToken') // Get access token from local storage
  try {
    const decodedToken = jwtDecode(token) // Decode the access token
    return decodedToken // Return the decoded token (user information)
  } catch (error) {
    return null // Return null if there's an error decoding the token
  }
}

// Object containing authentication service functions
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default AuthService
