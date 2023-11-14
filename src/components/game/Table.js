import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import "./Table.css";
import GameCard from "./CardUI/GameCard.js";
import Host from "./Host";

function GameTable() {
  const [hostData, setHostData] = useState([]);
  const [playerData, setPlayerData] = useState([]);

  const token = localStorage.getItem("user");
  const userInfo = jwt_decode(token);
  const userId = userInfo.userId;
  const { gameKey } = useParams();

  useEffect(() => {
      axios
        .post(`http://localhost:3500/api/game/table`, {
          gameKey: gameKey,
          userId: userId,
        })
        .then((response) => {
          // Set your component state with the received API data
          setHostData(response.data.nights[0].players);
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user lobbies:", error);
        });
    
  }, [gameKey, userId]);
  
  
  useEffect(() => {
    console.log("data", hostData);
    console.log("playerData", playerData);
  }, [hostData, playerData]);

  return (
    <div className="table-container">
      <h1>People in the City</h1>
      <div className="container-card">
        <div className="player-card">
          {hostData ? (
            <Host hostData={hostData} />
          ) : (
            <GameCard playerChar={playerData.char} />
          )}
        </div>
      </div>
    </div>
  );
}

export default GameTable;
