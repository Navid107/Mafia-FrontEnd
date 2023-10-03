import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Game from './Game';

function UserLobbies() {
  const [userLobbies, setUserLobbies] = useState([]);
  const [urLobbies, setUrLobbies] = useState([]);

  const token = localStorage.getItem('user')
  const userInfo = jwt_decode(token)
  const userId = userInfo.userId
  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios.post(`http://localhost:3500/api/game/lobbies`,{
      userId
    })
      .then((response) => {
        setUserLobbies(response.data.player);
        setUrLobbies(response.data.lobbies);
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, []);
  console.log('userLobbies ', userLobbies);
  console.log('UrLobbies ', urLobbies);

  return (
    <div>
      <h2>Your Created Lobbies</h2>
      <ul>
  {urLobbies.length > 0 ? (
    urLobbies.map((lobby, index) => (
      <li key={index}>
        <Link to={{ pathname: `/play/${lobby.gameKey}` }}>
          <p>Name: {lobby.lobbyName}  Game Key: {lobby.gameKey}</p>
        </Link>
      </li>
    ))
  ) : (
    <p>No lobbies found.</p>
  )}
</ul>
      <h2>Joined Lobbies</h2>
      <ul>
        {userLobbies.length > 0 ? (
          userLobbies.map((lobby, index) => (
            <li key={index}>
               <Link to={{ pathname: `/play/${lobby.gameKey}` }}>
                <p>Name: {lobby.lobbyName}  Game Key: {lobby.gameKey}
                  </p>

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
