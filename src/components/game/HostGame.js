import React, { useState } from 'react';
import axios from 'axios';

function HostGame() {
  const [gameKey, setGameKey] = useState('');

  const hostGame = async () => {
    try {
      // Make an API request to create a new game and receive a game key
      const response = await axios.post('http://localhost:3500/api/game/host');
      setGameKey(response.data.gameKey);
    } catch (error) {
      console.error('Error hosting the game:', error);
    }
  };

  return (
    <div>
      <h1>Host a Game</h1>
      <button onClick={hostGame}>Host Game</button>
      {gameKey && (
        <div>
          <p>Your Game Key:</p>
          <p>{gameKey}</p>
        </div>
      )}
    </div>
  );
}

export default HostGame;
