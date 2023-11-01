import React, { useState } from 'react';
import axios from 'axios';

import jwt_decode from 'jwt-decode';
import './GameRoom.css';
function GameRoom() {
  const [gameKey, setGameKey] = useState('');
  const [lobbyName, setLobbyName] = useState('');
  const [lobbyInfo, setLobbyInfo] = useState('');
  const token =localStorage.getItem('user')

  const user = jwt_decode(token)
  const handleHostGame = async () => {
    try {
      // Make an API request to create a new game and receive a game key
      const response = await axios.post('http://localhost:3500/api/game/host',
        {
          userId: user.userId,
          lobbyName
        });
      setLobbyInfo(response.data);
    } catch (error) {
      console.error('Error hosting the game:', error);
    }
  };
  const joinGame = async () => {
    try {
      // Make an API request to join a game using the game key and player name
      const response = await axios.post('http://localhost:3500/api/game/join', {
        gameKey: gameKey,
        userId: user.userId,
        name: user.user,
      });
      console.log(response.data.message);
    } catch (err) {
      console.error('Error joining the game:', err);
    }
  };

  return (
    <div className="game-room">
      <div className="game-host">
        <h1>Host a Game</h1>
        <input
          type="text"
          placeholder="Enter Lobby Name"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
        />
        <button onClick={handleHostGame}>Host Game</button>
      </div>
      {lobbyInfo && (
        <div className="gameKey">
          <p>Your Game Key:</p>
          <p>{lobbyInfo.lobbyName}</p>
          <p>{lobbyInfo.gameKey}</p>
        </div>
      )} 
      <div className="game-host">
      <h1>Join a Game</h1>
        <input
          type="text"
          value={gameKey}
          onChange={(e) => setGameKey(e.target.value)}
        />
      <button onClick={joinGame}>Join Game</button>
      </div>
    </div>
  );
}

export default GameRoom;
