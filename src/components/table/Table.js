import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Table.css'
import GameCard from '../CardUI/GameCard.js'
import Host from '../host/Host.js'
import AuthService from '../auth/hooks/AuthService'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
function GameTable () {
  const [hostValidation, setHostValidation] = useState(false)
  const [hostData, setHostData] = useState([])
  const [nightRound, setNightRound] = useState(0)
  const [playerData, setPlayerData] = useState([])
  const [gameOver, setGameOver] = useState('')
  const [loading, setLoading] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const userId = AuthService.getCurrentUser().userId
  const navigate = useNavigate()

  const { gameKey } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to fetch lobby data based on the gameKey and userId
        const response = await axiosPrivate.post(`/game/table`, {
          gameKey: gameKey,
          userId: userId
        })
        // Check if the userId matches the lobby's hostId
        if (userId === response.data.host) {
          setHostValidation(true)
          // Set component state with the received API data
          const nightCount = response.data.nights.length - 1
          setNightRound(nightCount)
          setGameOver(response.data.gameOver)
          // Set hostData based on the number of nights
          if (nightCount >= 0) {
            setHostData(response.data.nights[nightCount].players)
          } else {
            setHostData(response.data.nights[nightCount].players)
          }
        } else {
          // If userId does not match hostId, set playerData
          setPlayerData(response.data[0].char)
        }
      } catch (error) {
        // Handle errors and reload the page if not already loading
        if (loading !== true) {
          window.location.reload()
          setLoading(true)
        }
        console.error('Error fetching user lobbies:', error)
        navigate('/login')
        localStorage.removeItem('accessToken')
        window.location.reload()
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [gameKey, userId])

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
