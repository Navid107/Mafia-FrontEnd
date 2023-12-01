import React from "react";

function GameOverComponent({ winningTeam, winningPlayers }) {
  return (
    <div>
      <h2>Game Over</h2>
      <p>Winning Team: {winningTeam}</p>
      <p>Winning Players:</p>
      <ul>
        {winningPlayers.map((player, index) => (
          <li key={index}>{player.playerName}</li>
        ))}
      </ul>
    </div>
  );
}

export default GameOverComponent;
