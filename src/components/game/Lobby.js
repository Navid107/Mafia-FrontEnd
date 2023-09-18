import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserLobbies({ userId }) {
  const [userLobbies, setUserLobbies] = useState([]);

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
             <p>Name: {lobby.lobbyName}  Game Key: {lobby.gameKey}
             player: {lobby.players.length}</p>
              
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
