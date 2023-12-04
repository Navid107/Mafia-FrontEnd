import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'
import './Table.css'
import GameCard from '../CardUI/GameCard.js'
import Host from '../host/Host.js'

function GameTable () {
  const [hostData, setHostData] = useState([])
  const [nightRound, setNightRound] = useState()
  const [playerData, setPlayerData] = useState([])
  const [gameOver, setGameOver] = useState('')

  const token = localStorage.getItem('user')
  const userInfo = jwt_decode(token)
  const userId = userInfo.userId
  const { gameKey } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3500/api/game/table`,
          {
            gameKey: gameKey,
            userId: userId
          }
        )
        // Set your component state with the received API data
        const nightCount = response.data.nights.length - 1
        setNightRound(nightCount)
        setGameOver(response.data.gameOver)
        console.log('this', nightCount)
        if (nightCount >= 0) {
          setHostData(response.data.nights[nightCount].players)
          console.log('this is working', nightCount)
        } else {
          setHostData(response.data.nights[nightCount].players)
          setPlayerData(response.data.nightCount)
        }
      } catch (error) {
        console.error('Error fetching user lobbies:', error)
      }
    }

    fetchData()
  }, [gameKey, userId])

  return (
    <div className='table-container'>
      <h1>People in the City</h1>
      <div className='container-card'>
        <div className='player-card'>
          {hostData ? (
            <Host
              hostData={hostData}
              nightCount={nightRound}
              gameKey={gameKey}
              hostId={userId}
              gameOver={gameOver}
            />
          ) : (
            <GameCard playerChar={playerData.char} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTable
