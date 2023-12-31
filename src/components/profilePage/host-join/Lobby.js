import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Lobby.css'
import AuthService from '../../auth/AuthService'
function UserLobbies () {
  const [joinedLobbies, setJoinedLobbies] = useState([])
  const [createdLobbies, setCreatedLobbies] = useState([])
  const userId = AuthService.getCurrentUser().userId

  useEffect(() => {
    // Make an API request to retrieve the user's created lobbies
    axios
      .post(`http://localhost:3500/api/game/lobbies`, {
        userId
      })
      .then(response => {
        setJoinedLobbies(response.data.joined)
        setCreatedLobbies(response.data.hosted)
      })
      .catch(error => {
        console.error('Error fetching user lobbies:', error)
      })
  }, [userId])

  function handleDeleteLobby (e) {
    axios
      .delete(`http://localhost:3500/api/game/table/${e}`)

      .then(response => {
        console.log(response)
        window.location.reload()
      })
      .catch(error => {
        console.error('Error in deleting lobby:', error)
      })
  }
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

          <tbody className='border-line'>
            {createdLobbies.length > 0 ? (
              createdLobbies.map((lobby, index) => (
                <tr key={index}>
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
                  <td>
                    <button
                      className='Delete-lobby'
                      onClick={() => handleDeleteLobby(lobby.gameKey)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No lobbies found</td>
              </tr>
            )}
          </tbody>
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
          <tbody className='border-line'>
            {joinedLobbies.length > 0 ? (
              joinedLobbies.map((lobby, index) => (
                <tr key={index}>
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
              ))
            ) : (
              <tr>
                <td>No lobbies found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserLobbies
