import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import './Lobby.css'

function UserLobbies () {
  const [userLobbies, setUserLobbies] = useState([])
  const [urLobbies, setUrLobbies] = useState([])

  const token = localStorage.getItem('user')
  const userInfo = jwt_decode(token)
  const userId = userInfo.userId

  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios
      .post(`http://localhost:3500/api/game/lobbies`, {
        userId
      })
      .then(response => {
        setUserLobbies(response.data.joined)
        setUrLobbies(response.data.hosted)
      })
      .catch(error => {
        console.error('Error fetching user lobbies:', error)
      })
  }, [userId])
  console.log('ur lobbbies', urLobbies)

  return (
    <div className='container'>
      <div>
        <h2>Your Lobbies</h2>
        <table className='profile-lobby'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Game Key</th>
            </tr>
          </thead>
          {urLobbies.length > 0 ? (
            <tbody>
              {urLobbies.map((lobby, index) => (
                <tr key={index} className='border-line'>
                  <td>
                    <Link
                      to={
                        lobby.gameState !== 'false'
                          ? `/table/${lobby.gameKey}`
                          : `/play/${lobby.gameKey}`
                      }
                      className='link'
                    >
                      {lobby.lobbyName}
                    </Link>
                  </td>
                  <td>{lobby.gameKey}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>No lobbies found.</p>
          )}
        </table>
      </div>

      <div>
        <h2>Joined Lobbies</h2>
        <table className='profile-lobby'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Game Key</th>
            </tr>
          </thead>
          {userLobbies.length > 0 ? (
            <tbody>
              {userLobbies.map((lobby, index) => (
                <tr key={index} className='border-line'>
                  <td>
                    <Link
                      to={
                        lobby.gameState === 'true'
                          ? `/table/${lobby.gameKey}`
                          : `/play/${lobby.gameKey}`
                      }
                      className='link'
                    >
                      {lobby.lobbyName}
                    </Link>
                  </td>
                  <td>{lobby.gameKey}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>No lobbies found.</p>
          )}
        </table>
      </div>
    </div>
  )
}

export default UserLobbies
