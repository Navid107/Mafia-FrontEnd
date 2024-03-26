import { axiosPrivate } from './Axios'
import { useEffect } from 'react'
import refreshToken from './RefreshToken'

const useAxiosPrivate = () => {
  //Refresh Token
  const refresh = refreshToken()
  // Retrieve the access token from local storage
  const token = localStorage.getItem('accessToken')

  // Set up side effects with useEffect
  useEffect(() => {
    // Add request interceptors
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        // Check if the request does not already have an Authorization header
        if (!config.headers['Authorization']) {
          // Add the Authorization header with the access token
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Add response interceptors
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        // Check if the error response status is 403 (Forbidden)
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          // Get a new access token using the refresh function
          const newAccessToken = await refresh()
          // Update the access token in local storage
          localStorage.setItem('accessToken', newAccessToken)
          // Update the Authorization header in the previous request
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          // Resend the previous request with the updated access token
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    // Clean up interceptors when the component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [token, refresh])

  // Return token and refresh report
  return axiosPrivate
}

export default useAxiosPrivate
