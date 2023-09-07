import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';

import GameCard from './GameCard';
import './GameDashboard.css';
const GameDashboard = ({ socket, players }) => {
  const [gameStatus, setGameStatus] = useState('Waiting for players...');
  const [playerRoles, setPlayerRoles] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState('');

  // Event handler for starting the game
  const handleStartGame = () => {
    // Implement the game start logic here
    // You can assign roles to players and update the game status accordingly
    // For simplicity, we'll just set the gameStatus to "Game started"
    setGameStatus('Game started');
  };

  // Listen for the "startGame" event from the server
  useEffect(() => {
    socket.on('startGame', () => {
      handleStartGame();
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('startGame');
    };
  }, [socket]);

  // Update player roles when players join the game
  useEffect(() => {
    // In a real game, you would receive the player roles from the server
    // For now, we'll just assign the roles based on the number of players
    const roles = {
      // Implement your role assignment logic here
      // For example, if you have 3 players, you might have 1 Mafia and 2 Civilians
      // Replace the placeholders with actual role names
      player1: 'Mafia',
      player2: 'Civilian',
      player3: 'Civilian',
      // Add more roles for additional players
    };

    setPlayerRoles(roles);
  }, [players]);

  // Implement game actions here
  // You can handle actions like "Kill", "Vote", "Perform special abilities" etc.

  return (
    <div>
      <h2>Welcome to the Mafia Game Dashboard</h2>
      <p>Status: {gameStatus}</p>
      <PlayerList players={players} playerRoles={playerRoles} currentPlayer={currentPlayer} />
     
      <GameCard playerRole={playerRoles[currentPlayer]} />
    </div>
  );
};

export default GameDashboard;
