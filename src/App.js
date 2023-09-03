import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import Home from "./components/Home";
import Rules from "./components/Rules";
import Join from "./components/JoinGame";
import Host from "./components/HostGame";
import Profile from "./components/profilePage/Profile";
import Login from "./components/Register";
import PrivateRoute from "./components/privateRoute/PrivateRoute";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

 

  useEffect(() => {
    // Logic to determine if the user is logged in
    // If logged in, setLoggedIn(true), otherwise setLoggedIn(false)
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <Router>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/login" element={<Login />} />
    
        <Route element={<PrivateRoute />}> 
         <Route path="/join-game" element={<Join />} />
        <Route path="/host-game" element={<Host />}  />
        <Route path="/user" element={<Profile />}  />

      </Route>
      </Routes>
    </Router>
  );
};

export default App;