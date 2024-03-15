import React from 'react'
import './Host.css'
import { useNavigate } from 'react-router-dom'
import GameCard from '../CardUI/GameCard'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
function GameOver ({ winningTeam, winningPlayers, gameKey }) {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const playAgain = () => {
    //DELETE request for the table
    axiosPrivate
      .delete(`/game/table/`)
      //${gameKey}
      //If the request is successful,
      .then(response => {
        if (response) {
          navigate('/user') //Navigate to the '/user' route
        }
      })
      // If an error occurs, log the error to the console
      .catch(error => {
        console.error('Error in deleting lobby:', error)
        navigate('/login')
        localStorage.removeItem('accessToken')
        window.location.reload()
      })
  }
  return (
    <div  className='winner-container'>
      <h1>Game Over</h1>
      <button className='play-again-btn' onClick={playAgain}>
        Play Again
      </button>
      <div className='winner-team-name'>
      Winning Team: <p>{winningTeam}</p>
      </div>
    <div className='winner-team-players'>
        {winningPlayers.map((e, index) => (
          <div key={index} className='winner-player-list'>
            <GameCard playerChar={e.char} playerName={e.playerName} />
          </div>
        ))}
    </div>
    </div>
  )
}

export default GameOver
