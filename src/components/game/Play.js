import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './PreGame.css';
import Checkbox from './CardUI/CheckBox';

function PreGame() {
  const [userId, setUserId] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedChars, setSelectedChars] = useState([1, 2, 5, 6, 7, 8]);
  const [formSubmit, setFormSubmit] = useState(false)
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
      setSelectedChars([1, 2, 5, 6, 7, 8]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit(true);
    console.log("Selected Characters:", selectedChars);
  };

  return (
    <div className="pre-game-container">
      <h1 className="title">Welcome to Pre Game Lobby</h1>
      <h4 className="subtitle">Please wait for the God to start the game!</h4>
      <div className="player-char-container">
        <div className="players-container">
      <h2>Player List</h2>
      <div className="player-list"> 
          {players.length > 0 ? (
            players.map((player) => (
              <>
              <div className="user-avatar">

                <img src="https://cdn.wallpapersafari.com/97/93/ZyLAgn.jpg" alt="User Avatar" />
                <p>{player.name}</p>
                </div>
              </>
            ))
          ) : (
            "no players available"
          )}
      
      </div>
      
      {userId && formSubmit ? (
          <Link to={{ pathname: `/table/${gameKey}` }}>
            <button className="btn-start-game" onClick={startGame}>Start Game</button>
          </Link>
        ) : (
          <div className="btn-start-game">
          Please select the characters first
          </div>
        )}
       
        </div>
      <div className="char-checkbox-container">
        <h2 className="char-title">Available Characters</h2>
        <div className="char-checkbox">
          <form onSubmit={handleSubmit}>
            {availableChars.map((character) => (
              <Checkbox
                key={character.id}
                character={character}
                checked={character.select === true || selectedChars.includes(character.id)}
                disabled={character.select}
                onChange={() => handleCheckboxChange(character.id)}
              />
            ))}
            {userId ?
            <button className="btn-checkbox" type="submit">Submit</button>
            : 'Please Waiting for God to start' }
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreGame;
