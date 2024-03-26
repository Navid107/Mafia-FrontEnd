import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Lobby.css'
import useAxiosPrivate from '../../auth/api/useAxiosPrivate'

function UserLobbies ({ reRenderLobbies }) {
  const [joinedLobbies, setJoinedLobbies] = useState([])
  const [createdLobbies, setCreatedLobbies] = useState([])
  const [deletedLobby, setDeletedLobbies] = useState(0)
  const axiosPrivate = useAxiosPrivate()

  const handleDeleteLobby = e => {
    // Get the value (gameKey) of the lobby to delete
    const deleteLobby = e.target.value
    axiosPrivate
      .delete(`/game/table/${deleteLobby}`)
      .then(response => {
        setDeletedLobbies(createdLobbies.length - 1)
      })
      .catch(error => {
        console.error('Error in deleting lobby:', error)
      })
  }

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
      })
    //Api will call and reRender lobbies if there are any changes
  }, [reRenderLobbies, deletedLobby, axiosPrivate])

  return (
    <div className='lobby-container'>
      <div className='lobby-box'>
        <h2>Your Lobbies</h2>
        <table className='lobby-table'>
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
                          ? `/user/table/${lobby.gameKey}`
                          : `/user/play/${lobby.gameKey}`
                      }
                      className='lobby-link'
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
                <td>No lobby found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='lobby-box'>
        <h2>Joined Lobbies</h2>
        <table className='lobby-table'>
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
                          ? `/user/table/${lobby.gameKey}`
                          : `/user/play/${lobby.gameKey}`
                      }
                      className='lobby-link'
                    >
                      {lobby.lobbyName}
                    </Link>
                  </td>
                  <td>{lobby.gameKey}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No lobby found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserLobbies
