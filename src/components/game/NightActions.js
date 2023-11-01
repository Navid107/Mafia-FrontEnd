import React, { useState } from "react";

const NightActions = ({ characterData }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (char) => {
    if (selectedAbilities.includes(char)) {
      setSelectedAbilities(selectedAbilities.filter((a) => a !== char));
    } else {
      setSelectedAbilities([...selectedAbilities, char]);
    }
  };

  return (
    <div className="night-actions-container">
      <h3>Character Abilities:</h3>
      {characterData.map((character, index) => (
        <label key={index}>
          <input
            type="checkbox"
            checked={selectedAbilities.includes(character.char)}
            onChange={() => handleCheckboxChange(character.char)}
          />
          {character.char}
        </label>
      ))}
    </div>
  );
};

export default NightActions;
