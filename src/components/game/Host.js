import React from "react";
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function Host({ hostData}) {
  hostData.sort((a, b) => a.charId - b.charId);

  return (
    <div className="container-card">
      <div className="player-card">
        <div className="character-container">
          {/* Render characters with charId 1, 2, 3, and 9 in the first row */}
          {hostData
            .filter((e) => [1, 2, 3, 10].includes(e.charId))
            .map((e, index) => (
              <div key={index} className="mafia-container">
                <p>{e.name}</p>
                <GameCard playerChar={e.charId} death={e.death} />
              </div>
            ))}
        </div>
        <div className="character-container">
          {/* Render other characters in the second row */}
          {hostData
            .filter((e) => ![1, 2, 3, 10].includes(e.charId))
            .map((e, index) => (
              <div key={index} className="citizen-container">
                <p>{e.name}</p>
                <GameCard playerChar={e.charId}/>
              </div>
            ))}
        </div>
      </div>
      <NightActions characterData={hostData} />
    </div>
  );
}

export default Host;