import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Table.css'
import Host from '../nightActionForm/Host.js'
import Player from '../nightActionForm/Player.js'
import AuthService from '../auth/hooks/AuthService'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
function GameTable () {
  const [hostValidation, setHostValidation] = useState(false)
  const [hostData, setHostData] = useState([])
  const [nightRound, setNightRound] = useState(0)
  const [playerData, setPlayerData] = useState([])
  const [gameOver, setGameOver] = useState('')
  const [loading, setLoading] = useState(true)
  const axiosPrivate = useAxiosPrivate()
  const userId = AuthService.getCurrentUser().userId
  const { gameKey } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to fetch lobby data based on the gameKey and userId
        const response = await axiosPrivate.post(`game/table`, {
          gameKey: gameKey,
          userId: userId
        })
        // Check if the userId matches the lobby's hostId
        if (userId === response.data.host) {
          setHostValidation(true)
          setLoading(false)
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
          setLoading(false)
        }
      } catch (error) {
        console.error('Error', error)
        setLoading(true)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [gameKey, loading])

  return (
    <div className='table-container'>
      {loading ? (
        'loading...'
      ) : (
        <>
          {hostValidation === true ? (
            <div className='host-data'>
              <Host
                hostData={hostData}
                nightCount={nightRound}
                gameKey={gameKey}
                hostId={userId}
                gameOver={gameOver}
              />
            </div>
          ) : (
            <div className='player-data'>
              <Player player={playerData} />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GameTable
