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
    const storedData = localStorage.getItem(gameKey);
  
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Parsed Data:", parsedData);
      setHostData(parsedData.players || []);
      setPlayerData(parsedData[0] || []);
    } else {
      axios
        .post(`http://localhost:3500/api/game/table`, {
          gameKey: gameKey,
          userId: userId,
        })
        .then((response) => {
          // Save the API data to local storage using the GameKey as the key
          localStorage.setItem(gameKey, JSON.stringify(response.data));
  
          // Set your component state with the received API data
          setHostData(response.data.players || []);
          setPlayerData(response.data[0] || []);
        })
        .catch((error) => {
          console.error("Error fetching user lobbies:", error);
        });
    }
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
