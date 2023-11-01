import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router-dom";
import './Table.css'
import GameCard from './CardUI/GameCard.js';
import NightActions from "./NightActions";

function GameTable() {
    const [hostData, setHostData] = useState([]);
    const [playerData, setPlayerData] = useState([]);
    const [checkboxData, setCheckboxData] = useState([]);

    const token = localStorage.getItem('user')
    const userInfo = jwt_decode(token)
    const userId = userInfo.userId
    const { gameKey } = useParams()

    useEffect(() => {
        axios.post(`http://localhost:3500/api/game/table`, {
            gameKey: gameKey,
            userId: userId,
        })
            .then((response) => {
                setHostData(response.data.players);
                setPlayerData(response.data[0]);

            })
            .catch((error) => {
                console.error('Error fetching user lobbies:', error);
            });
    }, [gameKey, userId]);
    console.log('data', hostData)
    console.log('playerData', playerData)

    return (
        <div className="table-container">
            <h1>People in the City</h1>
            <div className="container-card">
                <div className="player-card ">
                    {playerData ? (
                        <GameCard playerChar={playerData.char} />
                    ) : (
                        hostData.map((e, index) => (
                            <div key={index} className="character-wrapper">
                                <p>{e.name}</p>
                                <GameCard playerChar={e.char} />
                            </div>
                            
                        ))
                    )}
                </div>
                <NightActions characterData={hostData} />

            </div>
        </div>
    );
}

export default GameTable;
