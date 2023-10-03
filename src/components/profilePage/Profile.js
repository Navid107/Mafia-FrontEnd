
import jwt_decode from 'jwt-decode';
import './Profile.css';
import Lobbies from '../game/Lobby'
const Profile = () => {

const token =localStorage.getItem('user')

const userInfo = jwt_decode(token)

console.log('line 7 info', userInfo.userId)
const gameData = {
  totalGames: 19,
   mafiaWins:10,
    citizenWins: 9

}

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
        <img src="https://cdn.wallpapersafari.com/97/93/ZyLAgn.jpg" alt="User Avatar" />
        </div>
        <div className="user-name">Name: {userInfo.user}</div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <div className="stat-label">Total Games:</div>
          <div className="stat-value">{gameData.totalGames}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Mafia Wins:</div>
          <div className="stat-value">{gameData.mafiaWins}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Citizen Wins:</div>
          <div className="stat-value">{gameData.citizenWins}</div>
        </div>
        
      </div>
    
      <Lobbies  />
    </div>
  );
};

export default Profile;
