import React, {useState} from "react";
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function Host({ hostData, hostId, gameKey, nightCount, gameOver }) {
  hostData.sort((a, b) => a.char.id - b.char.id);
  const [targetId, setTargetId] = useState('');
  console.log('playerId', targetId)
  // Determine the winning team
  const winningTeam = gameOver === "Mafia" ? "Mafia" : "Citizen";

  return (
    <div className="host-container-card">
      <div className="host-player-card">
        {gameOver && (
          <p className="winning-message">
            {winningTeam === "Mafia" ? "Mafia Won the Game!" : "Citizen Won the Game!"}
          </p>
        )}

        <p className="host-sides-mafia">Mafia</p>
        <div className="host-character-container">
          {hostData
            .filter((e) => [1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className="host-mafia-container" 
              onClick={() => setTargetId(e.playerId)}>
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>

        <p className="host-sides-citizen">Citizen</p>
        <div className="host-character-container">
          {hostData
            .filter((e) => ![1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className="host-citizen-container"
               onClick={() => setTargetId(e.playerId)}>
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>
      </div>
      <NightActions
        nightCount={nightCount}
        characterData={hostData}
        gameKey={gameKey}
        hostId={hostId}
        gameOver={gameOver}
        targetId={targetId}
      />
    </div>
  );
}

export default Host;
