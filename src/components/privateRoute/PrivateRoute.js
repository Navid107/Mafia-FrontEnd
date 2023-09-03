import React from 'react';
import axios from "axios";
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

  const validateToken = (token) => {
    const request = {
      method: "POST",
      url: "http://localhost:3500/api/auth/validate-token",
      data: {
        token,
      },
    };
  
    return axios(request).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.message);
      }
    });
  };
 
return (
  validateToken ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute;
