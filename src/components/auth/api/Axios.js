import axios from 'axios'
const API_URL = process.env.REACT_APP_API_ONLINE;

// Create an Axios instance with default settings for making HTTP requests.
export default axios.create({
  baseURL: API_URL // Base URL for API requests
})

// Create another Axios instance with additional settings for private requests.
export const axiosPrivate = axios.create({
  baseURL: API_URL, // Base URL for API requests
  headers: {
    'Content-Type': 'application/json' // Set content type to JSON
  },
  withCredentials: true // Include credentials (e.g., cookies) with requests
})
