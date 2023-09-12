import axios from "axios";

const API_URL = "http://localhost:3500/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};
const getChars = () => {
  return axios.get(API_URL + "/character");
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getChars,
  getAdminBoard,
}

export default UserService;