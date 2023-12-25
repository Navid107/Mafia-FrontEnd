import React, { useState } from 'react'
import axios from 'axios'
import './GameRoom.css'
import AuthService from '../../auth/AuthService'
function GameRoom () {
  const [gameKey, setGameKey] = useState('')
  const [lobbyName, setLobbyName] = useState('')
  const [lobbyInfo, setLobbyInfo] = useState('')
  
  const userInfo = AuthService.getCurrentUser()
  
  const handleHostGame = async () => {
    try {
      // request to create a new game and receive a game key
      const response = await axios.post('http://localhost:3500/api/game/host', {
        userId: userInfo.userId,
        lobbyName
      })
      setLobbyInfo(response.data)
      window.location.reload();
    } catch (error) {
      console.error('Error hosting the game:', error)
    }
  }
  const joinGame = async () => {
    try {
      // request to join a game using the game key and player name
      const response = await axios.post('http://localhost:3500/api/game/join', {
        gameKey: gameKey,
        userId: userInfo.userId,
        name: userInfo.user
      })
      console.log(response.data.message)
    } catch (err) {
      console.error('Error joining the game:', err)
    }
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
