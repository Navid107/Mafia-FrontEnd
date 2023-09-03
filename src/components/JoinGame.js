// JoinGame.js
import React, { useEffect } from 'react';

const JoinGame = ({ socket, playerId }) => {
  useEffect(() => {
    // Emit the "join" event when the component mounts
    socket.emit('join', playerId);

    // Listen for the "playerJoined" event from the server
    socket.on('playerJoined', (joinedPlayerId) => {
      console.log(`Player with ID ${joinedPlayerId} joined the game`);
      // Update your component state or trigger any necessary actions
    });

    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('playerJoined');
    };
  }, [socket, playerId]);

  // Your component JSX and logic...

  return <div>Join Game Component</div>;
};

export default JoinGame;
