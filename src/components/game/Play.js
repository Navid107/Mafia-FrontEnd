import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './PreGame.css';
import Checkbox from './CardUI/CheckBox';

function PreGame() {
  const [userId, setUserId] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedChars, setSelectedChars] = useState([{
    id: 1,
    name: 'GodFather',
    side: 'mafia',
    ability: true,
    death: false,
  },
  {
    id: 2,
    name: 'Witch',
    side: 'mafia',
    ability: true,
    death: false,
  },
  {
    id: 4,
    name: 'Dr',
    side: 'citizen',
    ability: true,
    death: false,
  },
  {
    id: 5,
    name: 'Detective',
    side: 'citizen',
    ability: true,
    death: false,
  },
  {
    id: 6,
    name: 'Sniper',
    side: 'citizen',
    ability: true,
    death: false,
  }, {
    id: 9,
    name: 'Regular Citizen',
    side: 'citizen',
    ability: true,
    death: false,
  },]);
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
      side: 'mafia',
      ability: true,
      death: false,
    },
    {
      id: 2,
      name: 'Witch',
      side: 'mafia',
      ability: true,
      death: false,
    },
    {
      id: 3,
      name: 'Saul Goodman',
      side: 'mafia',
      ability: true,
      death: false,
    },
    {
      id: 4,
      name: 'Dr',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 5,
      name: 'Detective',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 6,
      name: 'Sniper',
      side: 'citizen',
      ability: true,
      death: false,
    },

    {
      id: 7,
      name: 'Ex-Police Officer',
      side: 'citizen',
      ability: false,
      death: false,
    },
    {
      id: 8,
      name: 'Night Walker',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 9,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 10,
      name: 'Regular Mafia',
      side: 'mafia',
      ability: false,
      death: false,
    },
  ];

  const handleCheckboxChange = (character) => {
    // Check if the character is one of the always selected characters
    const isAlwaysSelected = [1, 2, 4, 5, 6, 9].includes(character.id);

    // Check if the character is already selected
    const isAlreadySelected = selectedChars.some((e) => e.id === character.id);

    if (!isAlwaysSelected) {
      // If the character is not always selected, allow toggling
      if (!isAlreadySelected) {
        setSelectedChars([...selectedChars, character]);
      } else {
        setSelectedChars(selectedChars.filter((e) => e.id !== character.id));
      }
    }
    // If the character is always selected, do nothing (user can't change it)
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
    setSelectedChars([{
      id: 1,
      name: 'GodFather',
      side: 'mafia',
      ability: true,
      death: false,
    },
    {
      id: 2,
      name: 'Witch',
      side: 'mafia',
      ability: true,
      death: false,
    },
    {
      id: 4,
      name: 'Dr',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 5,
      name: 'Detective',
      side: 'citizen',
      ability: true,
      death: false,
    },
    {
      id: 6,
      name: 'Sniper',
      side: 'citizen',
      ability: true,
      death: false,
    }, {
      id: 9,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: true,
      death: false,
    },]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (players.length >= selectedChars.length) {
    setFormSubmit(true);
    console.log("Selected Characters:", selectedChars);
    //  } else {
    //  alert("Please check the numbers of Players and Characters");
    // };
  }
  return (
    <div className="pre-game-container">
      <h1 className="title">Welcome to Pre Game Lobby</h1>
      <h4 className="subtitle">Please wait for the God to start the game!</h4>
      <div className="player-char-container">
        <div className="players-container">
          <h2>Player List</h2>
          <div className="player-list">
            {players.length > 0 ? (
              players.map((player, index) => (
                <div key={index} className="user-avatar">

                  <img src="https://cdn.wallpapersafari.com/97/93/ZyLAgn.jpg" alt="User Avatar" />
                  <p>{player.name}</p>
                </div>
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
                <div key={character.id} className="char-row">
                  <Checkbox
                    character={character}
                    checked={selectedChars.some((e) => e.id === character.id)}
                    disabled={[1, 2, 4, 5, 6, 9].includes(character.id)}
                    onChange={() => handleCheckboxChange(character)}
                  />
                </div>
              ))}
              {userId ? (
                <button className="btn-checkbox" type="submit">
                  Submit
                </button>
              ) : (
                'Please wait for God to start'
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreGame;
