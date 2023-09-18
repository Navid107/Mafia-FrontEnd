import React, { useState } from 'react';
import axios from 'axios';
import Join from './JoinGame';
import jwt_decode from 'jwt-decode';
function HostGame() {
  const [gameKey, setGameKey] = useState('');
  const [lobbyName, setLobbyName] = useState('');
  const [lobbyInfo, setLobbyInfo] = useState('');
  const token =localStorage.getItem('user')

  const userInfo = jwt_decode(token)

  const handleHostGame = async () => {
    try {
      // Make an API request to create a new game and receive a game key
      const response = await axios.post('http://localhost:3500/api/game/host',
        {
          userId: userInfo.userId,
          lobbyName
        });
      setLobbyInfo(response.data);
    } catch (error) {
      console.error('Error hosting the game:', error);
    }
  };

  return (
    <div>
      <div>
        <h2>Host a Game</h2>
        <input
          type="text"
          placeholder="Enter Lobby Name"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
        />
        <button onClick={handleHostGame}>Host Game</button>
      </div>
      {lobbyInfo && (
        <div>
          <p>Your Game Key:</p>
          <p>{lobbyInfo.lobbyName}</p>
          <p>{lobbyInfo.gameKey}</p>
        </div>
      )}
      <Join props={gameKey} />

    </div>
  );
}

export default HostGame;
