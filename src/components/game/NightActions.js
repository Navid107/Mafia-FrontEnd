import React, { useState } from "react";

const NightActions = ({ characterData, onNightActionSubmit }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerShot, setPlayerShot] = useState([]);
  const [nightCounter, setNightCounter] = useState(1); // Initialize night counter to 1

  const handleCheckboxChange = (char) => {
    // Implement your logic to update selectedAbilities based on form input
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
      // Add more properties if needed
    };

    // Call the onNightActionSubmit function to handle the night action
    onNightActionSubmit(nightData);

    // Increment the night counter
    setNightCounter(nightCounter + 1);

    // Clear the form inputs
    setSelectedAbilities([]);
    setPlayerShot([]);
  };


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

        <button className="submit-form" type="submit">
          Submit Night Action
        </button>
      </form>
    </div>
  );
};

export default NightActions;
