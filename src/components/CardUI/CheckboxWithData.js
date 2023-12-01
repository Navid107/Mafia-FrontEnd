import React from 'react';

const CheckboxWithData = ({ data, selectedAbilities, handleCheckboxChange, findCharacterName }) => {
  return (
    <div>
      {data.map((character, index) => (
        <div key={index}>
          <label className={`character-label ${character.death ? 'dead' : ''}`}>
            <input
              type="checkbox"
              checked={selectedAbilities.includes(character.charId)}
              onChange={() => handleCheckboxChange(character.charId)}
            />
            {findCharacterName(character.charId)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxWithData;
