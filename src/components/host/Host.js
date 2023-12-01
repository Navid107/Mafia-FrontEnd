import React from "react";
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
