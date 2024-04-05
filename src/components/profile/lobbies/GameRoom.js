import React, { useState } from 'react'
import './GameRoom.css'
import AuthService from '../../auth/hooks/AuthService'
import useAxiosPrivate from '../../auth/api/useAxiosPrivate'

function GameRoom ({ refreshLobbies }) {
  const [gameKey, setGameKey] = useState('')
  const [lobbyName, setLobbyName] = useState('')
  const userInfo = AuthService.getCurrentUser()
  const axiosPrivate = useAxiosPrivate()

  //Create lobby
  const handleHostGame = async () => {
    try {
      if (!lobbyName) {
        return 'Lobby name was not provided'
      }
      // request to create a new game and receive a game key
      await axiosPrivate.post(`game/host`, { lobbyName }).then(respond => {
        if (respond.status === 201) {
          apiCallback()
        }
      })
    } catch (error) {
      console.error('Error hosting the game:', error)
    }
    setLobbyName('')
  }
  //Join Lobby
  const joinGame = async () => {
    try {
      // request to join a game using the game key and player name
      await axiosPrivate
        .post(`game/join`, {
          gameKey: gameKey,
          name: userInfo.user
        })
        .then(respond => {
          if (respond.status === 201) {
            apiCallback()
          }
        })
    } catch (err) {
      console.error('Error joining the game:', err)
    }
    setGameKey('')
  }
  //ApiCallback after creating/joining lobby
  const apiCallback = () => {
    refreshLobbies(1)
  }
  return (
    <div className='game-room'>
      <div className='game-host'>
        <h1>Host a Game</h1>
        <input
          type='text'
          placeholder='Enter Lobby Name'
          value={lobbyName}
          onChange={e => setLobbyName(e.target.value)}
        />
        <button className='host-btn' onClick={handleHostGame}>
          Create Lobby
        </button>
      </div>
      <div className='game-host'>
        <h1>Join a Game</h1>
        <input
          type='text'
          placeholder='Enter Lobby GameKey'
          value={gameKey}
          onChange={e => setGameKey(e.target.value)}
        />
        <button className='host-btn' onClick={joinGame}>
          Join Lobby
        </button>
      </div>
    </div>
  )
}

export default GameRoom
