import React from 'react';

const SelectBox = ({ characterData, target, handleSubmission, character }) => {
  if (!character) {
    return null;
  }

  return (
    <label>
      {character.name}
      <select value={target} onChange={handleSubmission}>
        <option value="">Select a player</option>
        {characterData
          .filter((char) => !char.death && char.side !== character.side)
          .map((char, index) => (
            <option key={index} value={char.name}>
              {char.name}
            </option>
          ))}
      </select>
    </label>
  );
};

export default SelectBox;
