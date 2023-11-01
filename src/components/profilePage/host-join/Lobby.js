import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './Lobby.css';

function UserLobbies() {
  const [userLobbies, setUserLobbies] = useState([]);
  const [urLobbies, setUrLobbies] = useState([]);

  const token = localStorage.getItem('user');
  const userInfo = jwt_decode(token);
  const userId = userInfo.userId;

  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios
      .post(`http://localhost:3500/api/game/lobbies`, {
        userId,
      })
      .then((response) => {
        setUserLobbies(response.data.joined);
        setUrLobbies(response.data.hosted);
      })
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, [userId]);

  return (
    <div className="container">
  {urLobbies.length > 0 ? (
    <div>
      <h2>Your Lobbies</h2>
      <table className="profile-lobby">
        <thead>
          <tr>
            <th>Name</th>
            <th>Game Key</th>
          </tr>
        </thead>
        <tbody>
          {urLobbies.map((lobby, index) => (
            <tr key={index} className="border-line">
              <td>
                <Link
                  to={
                    lobby.gameState === 'started'
                      ? `/table/${lobby.gameKey}`
                      : `/play/${lobby.gameKey}`
                  }
                  className="link"
                >
                  {lobby.lobbyName}
                </Link>
              </td>
              <td>{lobby.gameKey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No lobbies found.</p>
  )}

  {userLobbies.length > 0 ? (
    <div>
      <h2>Joined Lobbies</h2>
      <table className="profile-lobby">
        <thead>
          <tr>
            <th>Name</th>
            <th>Game Key</th>
          </tr>
        </thead>
        <tbody>
          {userLobbies.map((lobby, index) => (
            <tr key={index} className="border-line">
              <td>
                <Link
                  to={
                    lobby.gameState === 'started'
                      ? `/table/${lobby.gameKey}`
                      : `/play/${lobby.gameKey}`
                  }
                  className="link"
                >
                  {lobby.lobbyName}
                </Link>
              </td>
              <td>{lobby.gameKey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>No lobbies found.</p>
  )}
</div>
  )
}

export default UserLobbies;
