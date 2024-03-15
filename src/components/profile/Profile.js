import React, { useState } from 'react'
import './Profile.css'
import Lobbies from './lobbies/Lobby.js'
import GameRoom from './lobbies/GameRoom.js'
import AuthService from '../auth/hooks/AuthService'
import Avatar from '../CardUI/pictures/avatar.png'

const Profile = () => {
  const [updateLobbies, setUpdateLobbies] = useState(0)
  const userStats = AuthService.getCurrentUser()

  console.log(userStats)

  //If lobby gets created or joining game happens,lobbies will get
  const apiCallback = e => {
    setUpdateLobbies(updateLobbies + e)
  }
  console.log(updateLobbies)
  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <div className='profile-header'>
          <div className='avatar'>
            <img src={Avatar} alt='User Avatar' />
          </div>
          <div className='user-name'>{userStats.user}</div>
        </div>
        <div className='profile-stats'>
          <ul className='gameStats'>
            <li className='stat-mafia'>
            <li ><span className='total-games' > Total Mafia Role: {userStats.stats.total_mafia}
            </span></li>
            <li><span className='wins'> Wins: {userStats.stats.mafia_wins}</span>
            <span className='loses'>Loses: {userStats.stats.mafia_loses}</span></li>
            </li></ul>
            <ul className='gameStats'>
            <li className='stat-citizen'>
            <li><span className='total-games' > Total Citizen Role: {userStats.stats.total_citizen}</span></li>
            <li> <span className='wins' > Wins: {userStats.stats.citizen_wins}</span>
            <span className='loses'> Loses: {userStats.stats.citizen_loses}</span></li> 
            </li>
          </ul>
        </div>
      </div>
      <Lobbies reRenderLobbies={updateLobbies} />
      <GameRoom refreshLobbies={apiCallback} />
    </div>
  )
}

export default Profile
