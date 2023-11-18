import React from "react";
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function Host({ hostData }) {
  hostData.sort((a, b) => a.char.id - b.char.id);
  return (
    <div className="host-container-card">
      <div className="host-player-card">
        <p className="host-sides-mafia">Mafia</p>
        <div className="host-character-container">
        {hostData
            .filter((e) => [1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className="host-mafia-container">
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>

        <p className="host-sides-citizen">Citizen</p>
        <div className="host-character-container">
          {hostData
            .filter((e) => ![1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className="host-citizen-container">
                <GameCard playerChar={e.char} playerName={e.playerName}/>
              </div>
            ))}
        </div>
      </div>
      <NightActions characterData={hostData} />
    </div>
  );
}

export default Host;