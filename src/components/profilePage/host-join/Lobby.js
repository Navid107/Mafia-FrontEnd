import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Lobby.css'
import useAxiosPrivate from '../../auth/api/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'

function UserLobbies () {
  const [joinedLobbies, setJoinedLobbies] = useState([])
  const [createdLobbies, setCreatedLobbies] = useState([])
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch joined and hosted lobbies data
    axiosPrivate
      .post('/game/lobbies')
      .then(response => {
        setJoinedLobbies(response.data.joined)
        setCreatedLobbies(response.data.hosted)
      })
      .catch(error => {
        console.error('Error fetching user lobbies:', error)
        navigate('/login')
        localStorage.removeItem('accessToken')
        window.location.reload()
        
      })
  },[axiosPrivate]);

  function handleDeleteLobby (e) {
    // Get the value (gameKey) of the lobby to delete
    const deleteLobby = e.target.value
    axiosPrivate
      .delete(`/game/table/${deleteLobby}`)
      .then(() => {
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
                      value={lobby.gameKey}
                      onClick={handleDeleteLobby}
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
