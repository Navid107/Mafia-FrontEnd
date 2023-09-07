import React from 'react';
import './GameCards.css';
const GameCard = ({ playerRole }) => {
  // Define the actions based on player roles
  const actions = {
    Mafia: ['Kill', 'Silent Kill'],
    Civilian: ['Vote'],
    // Add more actions for other roles as needed
  };

  return (
    <div>
      <h3>Player Card</h3>
      {playerRole ? (
        <>
          <p>Role: {playerRole}</p>
          <p>Actions:</p>
          <ul>
            {actions[playerRole].map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Waiting for game to start...</p>
      )}
    </div>
  );
};

export default GameCard;
