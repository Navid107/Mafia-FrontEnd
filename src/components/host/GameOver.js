import React from 'react'
import '../table/Table.css'
import { useNavigate } from 'react-router-dom'
import GameCard from '../CardUI/GameCard'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
function GameOver ({ winningTeam, winningPlayers, gameKey }) {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  const playAgain = () => {
    //DELETE request for the table
    axiosPrivate
      .delete(`/game/table/${gameKey}`)
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
      })
  }
  return (
    <div>
      <h2>Game Over</h2>
      <button className='btn-start-game' onClick={playAgain}>
        Play Again
      </button>
      <p>Winning Team: {winningTeam}</p>
      <div className={`host-character-container`}>
        {winningPlayers.map((e, index) => (
          <div key={index} className={`host-mafia-container`}>
            <GameCard playerChar={e.char} playerName={e.playerName} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameOver
