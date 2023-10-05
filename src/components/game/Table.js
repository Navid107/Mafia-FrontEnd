import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router-dom";
import './GameCard.css'
import GameCard from './GameCard.js';

function GameTable() {
    const [data, setData] = useState([]);
    const [charId, setCharId] = useState('');
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
                setData(response.data[0]);
                setCharId(response.data[0].char)
            })
            .catch((error) => {
                console.error('Error fetching user lobbies:', error);
            });
    }, [gameKey, userId]);

    return (
        <div>
            <h2>Character List</h2>
            Name: {data.name}
            <GameCard playerChar={charId} />
        </div>
    );
}

export default GameTable;
