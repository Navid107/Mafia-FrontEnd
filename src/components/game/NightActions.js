import React, { useState } from "react";
const NightActions = ({ characterData, death, gameKey }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerShot, setPlayerShot] = useState("");
  const [nightCounter, setNightCounter] = useState(1); // Initialize night counter to 1

  const availableChars = [
    {
      id: 1,
      name: 'GodFather',
      side: 'mafia',
      select: true,
    },
    {
      id: 2,
      name: 'Witch',
      side: 'mafia',
      select: true,
    },
    {
      id: 3,
      name: 'Saul Goodman',
      side: 'mafia',
      select: false,
    },
    {
      id: 4,
      name: 'Detective',
      side: 'citizen',
      select: true,
    },
    {
      id: 5,
      name: 'Sniper',
      side: 'citizen',
      select: true,
    },
    {
      id: 6,
      name: 'Dr',
      side: 'citizen',
      select: true,
    },
    {
      id: 7,
      name: 'BodyGuard',
      side: 'citizen',
      select: true,
    },
    {
      id: 8,
      name: 'Night Walker',
      side: 'citizen',
      select: false,
    },
    {
      id: 9,
      name: 'Regular Citizen',
      side: 'citizen',
      select: false,
    },
    {
      id: 10,
      name: 'Regular Mafia',
      side: 'mafia',
      select: false,
    },
  ];

  const findCharacterName = (charId) => {
    const character = availableChars.find((char) => char.id === charId);
    return character ? character.name : '';
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

    if(playerShot){
      const killedPlayer = characterData.find(
        character => character.name === playerShot);

        if(killedPlayer){
          killedPlayer.death = true
        }
    }

    // Handle Saul Goodman's ability
    if (selectedAbilities.includes(3)) { // Assuming charId 3 is Saul Goodman
      // Find the selected citizen by name
      const selectedCitizen = characterData.find(character => character.name === playerShot);

      if (selectedCitizen && selectedCitizen.side === 'citizen') {
        // Convert the citizen to Regular Mafia
        selectedCitizen.side = 'mafia';
      }
    }

    // Handle Sniper's ability
    if (selectedAbilities.includes(5)) { // Assuming charId 5 is Sniper
      const targetCharacter = characterData.find(character => character.name === playerShot);

      if (targetCharacter && targetCharacter.side === 'mafia') {
        // Mafia dies
        targetCharacter.death = true;
      } else if (targetCharacter && targetCharacter.side === 'citizen') {
        // Sniper dies
        death = true;
      }
    }

    /* Handle Night Walker's ability
    if (selectedAbilities.includes(8)) { // Assuming charId 8 is Night Walker
      const targetCharacter = characterData.find(character => character.name === playerShot);

      if (targetCharacter && targetCharacter.side === 'citizen') {
        // Implement the logic for Night Walker's ability with the citizen
      } else if (targetCharacter && targetCharacter.side === 'mafia') {
        // Night Walker dies
        death = true;
      }
    }
*/
    if(selectedAbilities.includes(9)){
      
    }

    // Update local storage with the modified characterData
    localStorage.setItem(gameKey, JSON.stringify(characterData));

    // Increment the night counter
    setNightCounter(nightCounter + 1);

    // Clear the form inputs
    setSelectedAbilities([]);
    setPlayerShot("");
  };

  return (
    <div className={`night-actions-container ${death ? 'dead' : ''}`}>
      <h1>Night: {nightCounter}</h1>
      <form onSubmit={handleNightAction}>
        <h3>Character Abilities:</h3>
        <label>
          Mafia Shot:
          <select value={playerShot} onChange={handlePlayerShotChange}>
            <option value="">Select a player</option>
            {characterData
              .filter((character) => !character.death)
              .map((character, index) => (
                <option key={index} value={character.name}>
                  {character.name}
                </option>
              ))}
          </select>
        </label>

        {/* Conditionally render Regular Citizen checkbox only if there are Regular Citizens with select:true */}
        {characterData
          .filter((character) => character.charId <= 9)
          .map((character, index) => (
            <div key={index}>
              {character.charId !== 3 && character.charId !== 8 ?
                <label className={`character-label ${character.death ? 'dead' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedAbilities.includes(character.charId)}
                    onChange={() => handleCheckboxChange(character.charId)}
                  />
                  {findCharacterName(character.charId)}
                </label>
                 : character.charId === 8 ?
                <label>
                  Regular Citizen
                  <select value={playerShot} onChange={handlePlayerShotChange}>
                    <option value=""></option>
                    {
                      <option key={index} value={character.name}>
                        {character.name}
                      </option>
                    }
                  </select>
                </label>
                  : character.charId === 3 &&
                <label>
                Sniper
                <select value={playerShot} onChange={handlePlayerShotChange}>
                  <option value=""></option>
                  {
                    <option key={index} value={character.name}>
                      {character.name}
                    </option>
                  }
                </select>
              </label>
              }
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