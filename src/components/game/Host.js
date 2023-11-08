import React from "react";
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function Host({ hostData }) {  
    return (
      <div className="container-card">
        <div className="player-card">
          {hostData.map((e, index) => (
            <div key={index} className="character-wrapper">
              <p>{e.name}</p>
              <GameCard playerChar={e.charId} />
            </div>
          ))}
        </div>
        <NightActions characterData={hostData} />
      </div>
    );
  }
  

export default Host;
