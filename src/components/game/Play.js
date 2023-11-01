import React, { useEffect, useState, useLocation } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';
import CharacterCard from './CardUI/CharCard';

function Play() {
  const [userId, setUserId] = useState('')
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const { gameKey } = useParams()
  const navigate = useNavigate();


  console.log('gameKey', gameKey)

  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios.post(`http://localhost:3500/api/game/lobby`, {
      gameKey
    }
    )
      .then((response) => {
        if (response.status === 201) {
          navigate(`/table/${gameKey}`)
        }
        setPlayers(response.data[0].players);
        setUserId(response.data[0].host)
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, []);
  //console.log('players', players, 'userId', userId);

  useEffect(() => {
    // Fetch the list of available characters
    axios.get(`http://localhost:3500/api/game/character`)
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, [gameKey]);


  const startGame = () => {
    // Send a POST request to start the game
    axios.post(`http://localhost:3500/api/game/start`, {
      gameKey,
      userId
    })
      .then((response) => {
        // Handle the response from the server
        if (response.data.message ===
          'Game started successfully with assigned characters') {
        }

      })
      .catch((error) => {
        console.error('Error starting the game:', error);
      });
  };

  console.log('players', players)
  return (
    <div>
      <h2>Your Created Lobbies</h2>
      {userId ? (
        <Link to={{ pathname: `/table/${gameKey}` }}>
          <button onClick={startGame}>Start Game</button></Link>
      ) : (
        'Wating for host to start '
      )
      }
      <ul>
        <p>PLayer Name </p>
        {players.length > 0 ? (
          players.map(player =>
            <li key={player._id}>
              <p>{player.name}</p>
            </li>
          ))
          : (
            "no players available"
          )}
      </ul>
      <h2>Available Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>


    </div>
  );
}

export default Play;
