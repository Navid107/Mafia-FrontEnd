import React from 'react'
import GameCard from '../CardUI/GameCard'
import './Player.css'

function Player({player}) {
  return (
    <div className='player-container'>
      <h2> You Are </h2>
      <GameCard playerChar={player} style={player} />
      </div>
  )
}

export default Player