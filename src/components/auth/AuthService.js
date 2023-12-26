import axios from "axios";
import jwtDecode from 'jwt-decode';
const API_URL = "http://localhost:3500/api/auth/";

const register = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        const token = JSON.stringify(response.data.accessToken)
        localStorage.setItem("user", token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");

};
const getChars = () => {
  return axios.get(API_URL + "characters", {
  });
};

const getCurrentUser = () => {
  const token = JSON.parse(localStorage.getItem("user"));
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
};

const AuthService = {
  register,
  login,
  logout,
  getChars,
  getCurrentUser,
}

export default AuthService;