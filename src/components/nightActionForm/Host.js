import React from 'react'
import './Host.css'
import NightActions from './NightActions'
import GameOver from './GameOver'
function Host ({ hostData, hostId, gameKey, nightCount, gameOver }) {

  return (
    <div className='host-container-card'>
      {gameOver ? (
        <GameOver
          winningTeam={gameOver}
          winningPlayers={hostData}
          gameKey={gameKey}
        />
      ) : (
        <NightActions
          nightCount={nightCount}
          characterData={hostData}
          gameKey={gameKey}
          hostId={hostId}
          gameOver={gameOver}
        />
      )}
    </div>
  )
}

export default Host
