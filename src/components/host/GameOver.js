import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameCard from "../CardUI/GameCard";
function GameOver({ winningTeam, winningPlayers, gameKey }) {
  const navigate = useNavigate();

  const playAgain = () => {
    axios
      .delete(`http://localhost:3500/api/game/table/${gameKey}`)
      .then((response) => {
        console.log(response);
        navigate('/user')
      })
      .catch((error) => {
        console.error('Error in deleting lobby:', error);
      });
  };
  return (
    <div>
      <h2>Game Over</h2>
      
        <button className="btn-start-game" onClick={playAgain}>
        Play Again
        </button>
      
      <p>Winning Team: {winningTeam}</p>
      <div className={`host-character-container`}>
        {winningPlayers
          .map((e, index) => (
            <div key={index}
              className={`host-mafia-container`}
            >
              <GameCard playerChar={e.char} playerName={e.playerName} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default GameOver;
