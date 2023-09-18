import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function UserLobbies({ userId }) {
  const [userLobbies, setUserLobbies] = useState([]);
  const token = localStorage.getItem('user')

  const userInfo = jwt_decode(token)
  userId = userInfo.userId
  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios.get(`http://localhost:3500/api/game/lobby?userId=${userId}`)
      .then((response) => {
        setUserLobbies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, [userId]);

  return (
    <div>
      <h2>Your Created Lobbies</h2>
      <ul>
        {userLobbies.length > 0 ? (
          userLobbies.map((lobby, index) => (
            <li key={index}>
              <Link to="/play">
                <p>Name: {lobby.lobbyName}  Game Key: {lobby.gameKey}
                  player: {lobby.players.length}</p>

              </Link>


            </li>
          ))
        ) : (
          <p>No lobbies found.</p>
        )}
      </ul>
    </div>
  );
}

export default UserLobbies;
