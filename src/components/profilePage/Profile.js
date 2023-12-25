import './Profile.css'
import Lobbies from './host-join/Lobby.js'
import GameRoom from './host-join/GameRoom.js'
import AuthService from '../auth/AuthService'
const Profile = () => {
  const userInfo = AuthService.getCurrentUser()

  console.log('line 7 info', userInfo)
  const gameData = {
    totalGames: 19,
    mafiaWins: 10,
    citizenWins: 9
  }

  return (
    <div>
      <div className='profile'>
        <div className='profile-container'>
          <div className='profile-header'>
            <div className='avatar'>
              <img
                src='https://i1.sndcdn.com/avatars-000109494119-bioafx-t500x500.jpg'
                alt='User Avatar'
              />
            </div>
            <div className='user-name'>{userInfo.user}</div>
          </div>
          <div className='profile-stats'>
            <div className='stat'>
              <div className='stat-label'>
                Total Games: {gameData.totalGames}
              </div>
            </div>
            <div className='stat'>
              <div className='stat-label'>Mafia Wins: {gameData.mafiaWins}</div>
            </div>
            <div className='stat'>
              <div className='stat-label'>
                Citizen Wins: {gameData.citizenWins}
              </div>
            </div>
          </div>
        </div>
        <Lobbies />
      </div>
      <GameRoom />
    </div>
  )
}

export default Profile
