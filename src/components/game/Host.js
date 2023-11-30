import React, {useState} from "react";
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function Host({ hostData, hostId, gameKey, nightCount, gameOver }) {

  return (
    <div className="host-container-card">
      <NightActions
        nightCount={nightCount}
        characterData={hostData}
        gameKey={gameKey}
        hostId={hostId}
        gameOver={gameOver}        
      />
    </div>
  );
}

export default Host;
