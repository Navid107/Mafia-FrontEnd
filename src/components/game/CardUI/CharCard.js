import React from 'react';
import './CharCard.css'
function CharacterCard({ character }) {
  return (
    <div className="character-card">
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
export default CharacterCard;
