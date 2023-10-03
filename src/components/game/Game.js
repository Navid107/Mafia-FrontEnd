import React, { useEffect, useState, useLocation } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios';

function Game() {
  const [userId, setUserId] = useState('')
  const [players, setPlayers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [assignedCharacters, setAssignedCharacters] = useState([]);
  const {gameKey} = useParams()


 console.log( 'gameKey' ,gameKey)
  const navigate = useNavigate();
 
  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios.post(`http://localhost:3500/api/game/lobby`,{
      gameKey
    }
     )
      .then((response) => {
        setPlayers(response.data[0].players);
        setUserId(response.data[0].host)
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, [gameKey]);
console.log('players', players, 'userId', userId);

  useEffect(() => {
    // Fetch the list of available characters
    axios.get(`http://localhost:3500/api/game/character`)
      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, []);
console.log('gamekey', gameKey);

  const startGame = () => {
    // Send a POST request to start the game
    axios.post(`http://localhost:3500/api/game/start`,{
       gameKey,
       userId
       })
      .then((response) => {
        // Handle the response from the server
        if (response.data.message === 'Game started successfully with assigned characters') {
          // Update the UI to display assigned characters
          setAssignedCharacters(response.data.assignedCharacters);
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
      {userId ?( 
        <Link to={{ pathname: `/table/${gameKey}` }}>
      <button onClick={startGame}>Start Game</button></Link>
      ):(
        'Wating for host to start '
      ) 
      }
      <ul>
        <p>PLayer Name </p>
      {players.length > 0 ? (
        players.map(player  =>
        <li key={player._id}>
          <p>{player.name}</p>
          </li>
        ))
      :(
        "no players available"
      )}
      </ul>
      <h2>Available Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character._id}>
               <img
                className="character-image"
                src={`data:${character.image.contentType};base64,${arrayBufferToBase64(character.image.data.data)}`}
                alt={character.name}
              />
            {character.name}
          </li>
        ))}
      </ul>

      {assignedCharacters.length > 0 ? (
        <div>
          <h2>Assigned Characters</h2>
          <ul>
            {assignedCharacters.map((assignedCharacter, index) => (
              <li key={index}>
                Player {index + 1}: {assignedCharacter.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        'no char'
      )}

    </div>
  );
}
function arrayBufferToBase64(arrayBuffer) {
  const binary = new Uint8Array(arrayBuffer);
  const bytes = [];
  for (let i = 0; i < binary.length; i++) {
    bytes.push(String.fromCharCode(binary[i]));
  }
  return btoa(bytes.join(''));
}

export default Game;
