import React, { useState, useEffect } from 'react'
import { useParams, useNavigate  } from 'react-router-dom'
import './Table.css'
import GameCard from '../CardUI/GameCard.js'
import Host from '../host/Host.js'
import AuthService from '../auth/hooks/AuthService'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
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
        if(error.status(403)) {
          navigate('./login')
      }
       else if (loading !== true) {
          setLoading(true)
          window.location.reload()
        }
        else{
          console.error('Error', error)
        }
    }
  }
    fetchData()
    // eslint-disable-next-line
  }, [gameKey, userId])

  return (
    <div className='table-container'>
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
              <h2 className='your-role'>Your  Role is: </h2> 
              <GameCard playerChar={playerData} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTable
