
import './Lobby.css'; // Import the CSS file
import React, { useState } from 'react';
import axios from 'axios';

const Lobby = () => {
  const [playerName, setPlayerName] = useState('');
  const [playerList, setPlayerList] = useState([]);

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/players', {
        name: playerName,
      });

      // Player successfully joined, update the player list
      setPlayerList([...playerList, response.data]);
      setPlayerName('');
    } catch (error) {
      // Handle any errors, e.g., player name is already taken
    }
  };

  return (
    <div>
      <h2>Lobby</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={handlePlayerNameChange}
          placeholder="Enter your name"
        />
        <button type="submit">Join Game</button>
      </form>
      <h3>Players in the Lobby:</h3>
      <ul>
        {playerList.map((player) => (
          <li key={player._id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
