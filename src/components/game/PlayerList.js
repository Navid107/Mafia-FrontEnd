import React from 'react';
import './PlayerList.css';
const PlayerList = ({ players, playerRoles, currentPlayer }) => {
  return (
    <div>
      <h3>Players:</h3>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}
          </li>
        ))}
      </ul>
      {currentPlayer && <p>It's {currentPlayer}'s turn</p>}
    </div>
  );
};

export default PlayerList;
