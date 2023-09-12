import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/NavigationBar";
import Home from "./components/Home";
import Rules from "./components/game/Rules";
import Join from "./components/game/JoinGame";
import Host from "./components/game/HostGame";
import Profile from "./components/profilePage/Profile";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Character from "../src/components/game/GameCard"
import AuthService from "./components/auth/AuthService";
import './App.css';
const App = () => {
  const [message, setMessage] = useState('');
  const user = AuthService.getCurrentUser();
  


  const handleLogout = () => {
    setMessage('')
    AuthService.logout().then(
      () => {
        window.location.reload();
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
        <Route path="/character" element={<Character/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
    
        <Route element={<PrivateRoute />}> 
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
         <Route path="/join-game" element={<Join />} />
        <Route path="/host-game" element={<Host />}  />
        <Route path="/user" element={<Profile />}  />

      </Route>
      </Routes>
    </Router>
  );
};

export default App;