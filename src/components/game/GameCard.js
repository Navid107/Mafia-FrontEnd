import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GameCard.css';
import CharacterCard from './CardUI/CharCard'; 

function GameCard({ playerChar }) {
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

    return (
        <div>
            <ul className="character-card-container">
                {characters
                    .filter((character) => character.name === playerChar)
                    .map((character) => (
                        <li key={character}>
                            <CharacterCard character={character} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default GameCard;
