import React from 'react'
import './Host.css'
import { useNavigate } from 'react-router-dom'
import GameCard from '../CardUI/GameCard'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
function GameOver ({ winningTeam, winningPlayers }) {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const winner = capitalizeFirstLetter(winningTeam)

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
      })
  }
  return (
    <div className='gameOver-container'>
      <h1>Game Over</h1>
      <button className='play-again-btn' onClick={playAgain}>
        Play Again
      </button>
      <div className='winner-team-name'>
        Winning Team: <p>{winner}</p>
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
