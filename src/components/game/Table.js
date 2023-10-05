import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router-dom";
import './GameCard.css'
import GameCard from './GameCard.js';

function GameTable() {
  const [data, setData] = useState([]);
    const [charId, setCharId] =useState('');

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
      setData(response.data);
      setCharId(response.data[0].char)
    })
    .catch((error) => {
      console.error('Error fetching user lobbies:', error);
    });
  }, [gameKey, userId]);

console.log('charId', charId);
  console.log(data);
  return (
    <div>
      <h2>Character List</h2>
     <GameCard playerChar={charId} />
    </div>
  );
}

function arrayBufferToBase64(arrayBuffer) {
    const binary = new Uint8Array(arrayBuffer);
    const bytes = [];
    for (let i = 0; i < binary.length; i++) {
      bytes.push(String.fromCharCode(binary[i]));
    }
    return btoa(bytes.join(''));
  }

export default GameTable;
