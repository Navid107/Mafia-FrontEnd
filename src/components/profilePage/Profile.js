import React from 'react'
import './Profile.css'
import Lobbies from './host-join/Lobby.js'
import GameRoom from './host-join/GameRoom.js'
import AuthService from '../auth/hooks/AuthService'
import Avatar from '../CardUI/pictures/avatar.png'

const Profile = () => {
  const userInfo = AuthService.getCurrentUser().user
  console.log(userInfo)
  const gameData = {
    totalGames: 19,
    mafiaWins: 10,
    citizenWins: 9
  }
  return (
    <div className='profile'>
      <div className='profile-container'>
        <div className='profile-header'>
          <div className='avatar'>
            <img
              src={Avatar}
              alt='User Avatar'
            />
          </div>
          <div className='user-name'>{userInfo}</div>
        </div>
        <div className='profile-stats'>
          {Object.entries(gameData).map(([key, value]) => (
            <div className='stat' key={key}>
              <div className='stat-label'>{`${
                key.charAt(0).toUpperCase() + key.slice(1)
              }: ${value}`}</div>
            </div>
          ))}
        </div>
      </div>
      <Lobbies />
      <GameRoom />
    </div>
  )
}

export default Profile
