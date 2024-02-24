import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/navBar/NavigationBar'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import Home from './components/pubPages/Home'
import Rules from './components/pubPages/Rules'
import Character from './components/pubPages/Chars'

import Profile from './components/profilePage/Profile'
import AuthService from './components/auth/hooks/AuthService'
import Login from './components/auth/login/Login'
import SignUp from './components/auth/login/Signup'

import Lobby from '../src/components/profilePage/host-join/Lobby'
import PreGameLobby from './components/preGame/PreGameLobby'
import Table from './components/table/Table'

const App = () => {
  const user = AuthService.getCurrentUser()

  return (
    <Router>
      <Navbar loggedIn={user} handleLogout={(e) => AuthService.logout()} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/character' element={<Character />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route element={<PrivateRoute props={user} />}>
          <Route path='/user' element={<Profile />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/play/:gameKey' element={<PreGameLobby />} />
          <Route path='/table/:gameKey' element={<Table />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
