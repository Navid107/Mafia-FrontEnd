import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './PreGame.css';
import Checkbox from './CardUI/CheckBox';
function PreGame() {
  const [userId, setUserId] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedChars, setSelectedChars] = useState([]);
  const { gameKey } = useParams();

  useEffect(() => {
    axios.post(`http://localhost:3500/api/game/lobby`, { gameKey })
      .then((response) => {
        if (response.data && response.data[0]) {
          setPlayers(response.data[0].players);
          setUserId(response.data[0].host);
        }
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, [gameKey]);

  const availableChars = [
    {
      id: 1,
      name: 'GodFather',
      select: true,
    },
    {
      id: 2,
      name: 'Witch',
      select: true,
    },
    {
      id: 3,
      name: 'Saul Goodman',
      select: false,
    },
    {
      id: 4,
      name: 'Regular Mafia',
      select: false,
    },
    {
      id: 5,
      name: 'Detective',
      select: true,
    },
    {
      id: 6,
      name: 'Sniper',
      select: true,
    },
    {
      id: 7,
      name: 'Dr',
      select: true,
    },
    {
      id: 8,
      name: 'BodyGuard',
      select: true,
    },
    {
      id: 9,
      name: 'Night Walker',
      select: false,
    },
    {
      id: 10,
      name: 'Citizen',
      select: false,
    },
  ];

  const handleCheckboxChange = (charId) => {
    const isAlreadySelected = selectedChars.includes(charId);

    if (!isAlreadySelected) {
      const char = availableChars.find((character) => character.id === charId);
      if (char && !char.select) {
        setSelectedChars([...selectedChars, charId]);
      }
    }

    if (isAlreadySelected) {
      setSelectedChars(selectedChars.filter((id) => id !== charId));
    }
  };

  const startGame = () => {
    axios.post(`http://localhost:3500/api/game/start`, {
      gameKey,
      userId,
      selectedChars,
    })
      .then((response) => {
        if (response.data.message === 'Game started successfully with assigned characters') {
          // Handle success, e.g., redirect to the game table
        }
      })
      .catch((error) => {
        console.error('Error starting the game:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the selected characters
    console.log("Selected Characters:", selectedChars);
  };

  return (
    <div className="pre-game-container">
      <div className="players-in-lobby">
        <h2>Your Created Lobbies</h2>
        {userId ? (
          <Link to={{ pathname: `/table/${gameKey}` }}>
            <button onClick={startGame}>Start Game</button>
          </Link>
        ) : (
          'Waiting for host to start'
        )}
  
        <ul>
          <p>Player Name </p>
          {players.length > 0 ? (
            players.map((player) => (
              <li key={player._id}>
                <p>{player.name}</p>
              </li>
            ))
          ) : (
            "no players available"
          )}
        </ul>
      </div>
      <h2>Available Characters</h2>
      <form onSubmit={handleSubmit}>
        {availableChars.map((character) => (
          <Checkbox
            key={character.id}
            character={character}
            checked={selectedChars.includes(character.id)}
            disabled={!character.select}
            onChange={() => handleCheckboxChange(character.id)}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
  
}

export default PreGame;
