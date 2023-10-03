import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useParams } from "react-router-dom";
import './GameCard.css';
function GameTable () {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('user')

    const userInfo = jwt_decode(token)
    const userId = userInfo.userId
    const {gameKey} = useParams()
   

    useEffect(() => {
    axios.post(`http://localhost:3500/api/game/table`,{
        gameKey: gameKey,
        userId: userId,
    })
      .then((response) => {
       setData(response.data);
        
      })
      
      .catch((error) => {
        console.error('Error fetching user lobbies:', error);
      });
  }, []);
  
    
    console.log(data)
return(
    <div>
      <h2>Your Role</h2>
      <ul className="character-card-container"> {/* Add a container for the character cards */}
        <h1>{data.name}</h1>
          <li>
            <div className="character-card"> {/* Wrap each character card in a div */}
              <img
                className="character-image"
                src={`data:${data.char.image.contentType};base64,${arrayBufferToBase64(data.char.image.data.data)}`}
                alt={data.char.name}
              />
              <div className="character-info">
                <h3 className="character-name">{data.char.name}</h3>
                <p className="character-ability">Ability: {data.char.ability}</p>
              </div>
            </div>
          </li>
       
      </ul>
    </div>
    )
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