import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameCard.css'; // Make sure you have a CSS file for styling

function CharacterList({playerChar}) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Make an API request to retrieve character data
    axios.get('http://localhost:3500/api/game/character')

      .then((response) => {
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, [playerChar]);
console.log(characters);


console.log('playerchar',playerChar);
  
  return (
    <div>
      <h2>Character List</h2>
      <ul className="character-card-container"> {/* Add a container for the character cards */}
        {characters.map((character) => (
          <>
          {character.name = playerChar ? (
              <li key={character.id} >
              <div className="character-card"> {/* Wrap each character card in a div */}
                <img
                  className="character-image"
                  src={`data:${character.image.contentType};base64,${arrayBufferToBase64(character.image.data.data)}`}
                  alt={character.name}
                />
                <div className="character-info">
                  <h3 className="character-name">{character.name}</h3>
                  <p className="character-ability">Ability: {character.ability}</p>
                </div>
              </div>
            </li>
          ) : (
            'theres something wrong'
          )}</>
        ))}
      </ul>
    </div>
  );
}

// Function to convert an ArrayBuffer to base64
function arrayBufferToBase64(arrayBuffer) {
  const binary = new Uint8Array(arrayBuffer);
  const bytes = [];
  for (let i = 0; i < binary.length; i++) {
    bytes.push(String.fromCharCode(binary[i]));
  }
  return btoa(bytes.join(''));
}

export default CharacterList;
