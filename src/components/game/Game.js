import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function Game({ userId }) {
  const [players, setPlayers] = useState([]);
  const token = localStorage.getItem('user')

  const userInfo = jwt_decode(token)
  userId = userInfo.userId
  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios.get(`http://localhost:3500/api/game/lobby?userId=${userId}`)
      .then((response) => {
        setPlayers(response.data[0].players);
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, [userId]);
console.log('players', players)
  return (
    <div>
      <h2>Your Created Lobbies</h2>
      <ul>
        <p>PLayer Name </p>
      {players.length > 0 ? (
        players.map((player, e) =>(
        <li keys={e}>
          <p>{player.name}</p>
          </li>
        )))
      :(
        "no players available"
      )}
      </ul>
    </div>
  );
}

export default Game;
