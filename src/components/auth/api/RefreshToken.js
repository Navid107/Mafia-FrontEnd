import axios from './Axios';

  const RefreshToken = () => {
    //Sending a request to refresh the token
    const refresh = async () => {
      // Send a GET request to the '/auth/refreshToken' endpoint
      const response = await axios.get('/auth/refreshToken', {
        withCredentials: true // Include credentials (e.g., cookies)
      });
      // Return the access token 
      return response.data.accessToken;
    };
    // Return the refresh function / newAccessToken 
    return refresh;
  };

export default RefreshToken
