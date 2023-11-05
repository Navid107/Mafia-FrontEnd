import React from 'react';
import './CharCard.css'
function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-ability">Ability: {character.ability}</p>
      </div>
    </div>
  );
}
export default CharacterCard;
