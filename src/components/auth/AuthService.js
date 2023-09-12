import React from "react";
import axios from "axios";
const API_URL = "http://localhost:3500/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
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
  return axios.post("/").then((response) => {
    return response.data;
  });
};
const getChars = () => {
  return axios.get(API_URL + "characters", {
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getChars,
  getCurrentUser,
}

export default AuthService;