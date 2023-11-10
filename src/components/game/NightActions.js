import React, { useState } from "react";

const NightActions = ({ characterData, onNightActionSubmit, onUpdateCharacterData }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerShot, setPlayerShot] = useState("");
  const [nightCounter, setNightCounter] = useState(1); // Initialize night counter to 1

  const availableChars = [
    {
      id: 1,
      name: 'GodFather',
      select: true,
    },
    {
      id: 2,
      name: 'Witch',
      select: true,
    },
    {
      id: 3,
      name: 'Saul Goodman',
      select: false,
    },
    {
      id: 4,
      name: 'Detective',
      select: true,
    },
    {
      id: 5,
      name: 'Sniper',
      select: true,
    },
    {
      id: 6,
      name: 'Dr',
      select: true,
    },
    {
      id: 7,
      name: 'BodyGuard',
      select: true,
    },
    {
      id: 8,
      name: 'Night Walker',
      select: false,
    },
    {
      id: 9,
      name: 'Regular Mafia',
      select: false,
    },
    {
      id: 10,
      name: 'Citizen',
      select: false,
    },
  ];

  const findCharacterName = (charId) => {
    const character = availableChars.find((char) => char.id === charId);
    return character ? character.name : ''; // Return character name or an empty string
  };

  const handleCheckboxChange = (charId) => {
    if (selectedAbilities.includes(charId)) {
      setSelectedAbilities(selectedAbilities.filter(id => id !== charId));
    } else {

      setSelectedAbilities([...selectedAbilities, charId]);
    }
  };

  const handlePlayerShotChange = (event) => {
    setPlayerShot(event.target.value);
  };

  const handleNightAction = (event) => {
    event.preventDefault();
  
    // Construct the night data object with the selected abilities and player shot
    const nightData = {
      night: nightCounter,
      selectedAbilities: selectedAbilities,
      playerShot: playerShot,
    };
  
    // Call the onNightActionSubmit function to handle the night action
    onNightActionSubmit(nightData);
  
    // Increment the night counter
    setNightCounter(nightCounter + 1);
  
    // Update the death property based on the selected abilities
    const updatedCharacterData = characterData.map((character) => {
      // Check if the character is in the selectedAbilities and update their status
      if (nightData.selectedAbilities.includes(character.charId)) {
        // Mark the character as dead
        character.death = true;
      }
      return character;
    });
  
    // Update the character data state with the new data
    onUpdateCharacterData(updatedCharacterData);
  
    // Clear the form inputs
    setSelectedAbilities([]);
    setPlayerShot("");
  };
console.log("charData NightActions", characterData);
  return (
    <div className="night-actions-container">
      <h1>Night: {nightCounter}</h1>
      <form onSubmit={handleNightAction}>
        <h3>Character Abilities:</h3>
        <label>
          Mafia Shot:
          <select value={playerShot} onChange={handlePlayerShotChange}>
            <option value="">Select a player</option>
            {characterData.map((character, index) => (
              <option key={index} value={character.name}>
                {character.name}
              </option>
            ))}
          </select>
        </label>
        {characterData
          .filter((character) => character.charId <= 8)
          .map((character, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedAbilities.includes(character.charId)}
                  onChange={() => handleCheckboxChange(character.charId)}
                />
                {findCharacterName(character.charId)}
              </label>
            </div>
          ))}
        <button className="submit-form" type="submit">
          Submit Night Action
        </button>
      </form>
    </div>
  );
};

export default NightActions;
