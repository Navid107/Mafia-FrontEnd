// components/Game.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = () => {
  const [players, setPlayers] = useState([]);

  // Fetch the list of players from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/game/players')
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
      });
  }, []);

  return (
    <div>
      <h1>Mafia Game</h1>
      <div>
        <h2>Players:</h2>
        <ul>
          {players.map((player) => (
            <li key={player._id}>{player.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
