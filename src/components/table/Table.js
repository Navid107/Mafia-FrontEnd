import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Table.css'
import GameCard from '../CardUI/GameCard.js'
import Host from '../host/Host.js'
import AuthService from '../auth/AuthService'
function GameTable () {
  const [hostValidation, setHostValidation] = useState(false)
  const [hostData, setHostData] = useState([])
  const [nightRound, setNightRound] = useState(0)
  const [playerData, setPlayerData] = useState([])
  const [gameOver, setGameOver] = useState('')

  const userId = AuthService.getCurrentUser().userId
 
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
        if (userId === response.data.host) {
          setHostValidation(true)
          // Set component state with the received API data
          const nightCount = response.data.nights.length - 1
          setNightRound(nightCount)
          setGameOver(response.data.gameOver)
          console.log('this', nightCount)
          if (nightCount >= 0) {
            setHostData(response.data.nights[nightCount].players)
            console.log('this is working', nightCount)
          } else {
            setHostData(response.data.nights[nightCount].players)
          }
        } else {
          setPlayerData(response.data[0].char)
        }
      } catch (error) {
        console.error('Error fetching user lobbies:', error)
      }
    }

    fetchData()
  }, [gameKey, userId])
  console.log(hostData)
  return (
    <div className='table-container'>
      <h1>People in the City</h1>
      <div className='container-card'>
        <div className='player-card'>
          {hostValidation === true ? (
            <Host
              hostData={hostData}
              nightCount={nightRound}
              gameKey={gameKey}
              hostId={userId}
              gameOver={gameOver}
            />
          ) : (
            <div className='player-characterCard-container'>
              <GameCard playerChar={playerData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTable
