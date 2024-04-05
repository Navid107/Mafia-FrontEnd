import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/navBar/NavigationBar'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import Home from './components/publicPages/Home'
import Rules from './components/publicPages/Rules'
import Character from './components/publicPages/Chars'
import Gameplay from './components/publicPages/GamePlay'
import NotFoundPage from './components/publicPages/NotFoundPage'

import Profile from './components/profile/Profile'
import AuthService from './components/auth/hooks/AuthService'
import Login from './components/auth/login/Login'
import SignUp from './components/auth/login/Signup'

import Lobby from '../src/components/profile/lobbies/Lobby'
import PreGameLobby from './components/preGame/PreGameLobby'
import Table from './components/table/Table'

const App = () => {
  const user = AuthService.getCurrentUser()

  return (
    <Router>
  <Navbar loggedIn={user} handleLogout={e => AuthService.logout()} />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/rules' element={<Rules />} />
    <Route path='/character' element={<Character />} />
    <Route path='/gameplay' element={<Gameplay />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />

    <Route element={<PrivateRoute props={user} />}>
      <Route path='/user' element={<Profile />} />
      <Route path='/user/lobby' element={<Lobby />} />
      <Route path='/user/play/:gameKey' element={<PreGameLobby />} />
      <Route path='/user/table/:gameKey' element={<Table />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} /> 
  </Routes>
</Router>

  )
}

export default App
