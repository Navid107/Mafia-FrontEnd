import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


function JoinGame({ props }) {
  const [gameKey, setGameKey] = useState('');
  const token =localStorage.getItem('user')
  const user = jwt_decode(token)

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
    <div>
      <h1>Join a Game</h1>
      <div>
        <label>Game Key:</label>
        <input
          type="text"
          value={gameKey}
          onChange={(e) => setGameKey(e.target.value)}
        />
      </div>
      <button onClick={joinGame}>Join Game</button>
    </div>
  );
}

export default JoinGame;
