import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom'

import './App.css'
import Navbar from './components/navBar/NavigationBar'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import Home from './components/Home'
import Rules from './components/Rules'

import Profile from './components/profilePage/Profile'
import AuthService from './components/auth/AuthService'
import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'

import Character from './components/Chars'
import Lobby from '../src/components/profilePage/host-join/Lobby'
import Table from './components/table/Table'
import PreGameLobby from './components/preGame/PreGameLobby'
const App = () => {
  const [message, setMessage] = useState('')
  const user = AuthService.getCurrentUser()

  const handleLogout = () => {
    setMessage('')
    AuthService.logout().then(
      () => {   
        window.location.reload();
      },
      error => {
        setMessage('something with wrong')
      }
    )
  }

  return (
    <Router>
      <Navbar loggedIn={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/character' element={<Character />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/rules' element={<Rules />} />
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
