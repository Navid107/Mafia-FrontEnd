import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/NavigationBar";
import Home from "./components/Home";
import Rules from "./components/game/Rules";
import GameRoom from "./components/profilePage/host-join/GameRoom";

import Profile from "./components/profilePage/Profile";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Character from "../src/components/game/CardUI/GameCard"
import Lobby from "../src/components/profilePage/host-join/Lobby"
import Table from "./components/game/Table";
import AuthService from "./components/auth/AuthService";
import './App.css';
import PreGameLobby from "./components/game/PreGameLobby";
const App = () => {
  const [message, setMessage] = useState('');
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    setMessage('')
    AuthService.logout().then(
      () => {
        setMessage("User logged out")
      },
      (error) => {
        setMessage("something with wrong");
      }
    );
  }

  return (
    
    <Router>
      <Navbar loggedIn={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/character" element={<Character />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/gameroom" element={<GameRoom />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/play/:gameKey" element={<PreGameLobby />} />
          <Route path="/table/:gameKey" element={<Table />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;