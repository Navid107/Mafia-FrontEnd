import React from 'react'
import '../table/Table.css';
import NightActions from './NightActions'
import GameOver from './GameOver'
function Host ({ hostData, hostId, gameKey, nightCount, gameOver }) {
  const winingTeamPlayers = hostData.filter(
    character => character.char.death === false
  )

  return (
    <div className='host-container-card'>
      {gameOver ? (
        <GameOver
          winningTeam={gameOver}
          winningPlayers={winingTeamPlayers}
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
