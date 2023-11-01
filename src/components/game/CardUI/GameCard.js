import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharCard.css';
import CharacterCard from './CharCard';

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
    //console.log('playerchar line 18', playerChar);
    return (
        <div>
            {characters
                .filter((character) => character.name === playerChar)
                .map((character) => (
                    <CharacterCard character={character} />
                ))}
        </div>
    );
}

export default GameCard;
