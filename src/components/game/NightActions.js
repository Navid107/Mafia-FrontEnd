import React, { useState } from "react";
import CheckboxWithData from './CardUI/CheckboxWithData';
const NightActions = ({ characterData, death, gameKey }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerShot, setPlayerShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [boughtCitizen, setBoughtCitizen] = useState("");
  const [nightCounter, setNightCounter] = useState(1); // Initialize night counter to 1

  const handleCheckboxChange = (charId) => {
    if (selectedAbilities.includes(charId)) {
      setSelectedAbilities(selectedAbilities.filter(id => id !== charId));
    } else {
      setSelectedAbilities([...selectedAbilities, charId]);
    }
  };
  // set the night actions for Mafia shot, Sniper and RC
  const handlePlayerShotChange = (event) => {
    setPlayerShot(event.target.value);
  };
  const handleSniperShot = (e) => {
    setSniperShot(e.target.value);
  }
  const handleBoughtCitizen = (e) => {
    setBoughtCitizen(e.target.value);
  }

  const handleNightAction = (event) => {
    event.preventDefault();

    //turning death:true for the player who got shot
    if (playerShot) {
      const killedPlayer = characterData.find(
        character => character.playerName === playerShot);

      if (killedPlayer) {
        killedPlayer.char.death = true
      }
    }
    // Handle Saul Goodman's ability
    if (boughtCitizen) {
      // Find the selected citizen by name
      const targetCharacter = characterData.find(
        character => character.playerId === boughtCitizen);
        targetCharacter.char.ability = false
        targetCharacter.char.death = false
        targetCharacter.char.id = 10
        targetCharacter.char.name = 'Regular Mafia'
        targetCharacter.char.side = 'mafia'
      
    }
    console.log('bought citizen ',boughtCitizen)
    // Handle Sniper's ability
    if (sniperShot) {
      const targetCharacter = characterData.find(character => character.playerId === sniperShot);
      console.log('sniper shot ',sniperShot)
      if (targetCharacter) {
        if (targetCharacter.char.side === 'mafia') {
          // Mafia dies
          targetCharacter.char.death = true;
        } else if (targetCharacter.char.side === 'citizen') {
          // Sniper dies
          const sniper = characterData.find(character => character.char.id === 5);
          if (sniper) {
            sniper.char.death = true;
            console.log('sniper ',sniper)
          }
        }
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

    console.log('charDataaaa',characterData)
    // Increment the night counter
    setNightCounter(nightCounter + 1);

    // Clear the form inputs
    setSelectedAbilities([]);
    setPlayerShot("");
    setSniperShot("");
    setBoughtCitizen("");
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
              .filter((character) => !character.char.death)
              .map((character, index) => (
                <option key={index} value={character.playerName}>
                  {character.playerName}
                </option>
              ))}
          </select>
        </label>

        {/* Conditionally render Regular Citizen checkbox only if there are Regular Citizens with select:true */}
        {characterData
          .filter((character) => character.char.id <= 9)
          .map((character, index) => (
            <div key={index}>
              {character.char.id !== 6 && character.char.id !== 9 ?
                <label className={`character-label ${character.death ? 'dead' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedAbilities.includes(character.char.id)}
                    onChange={() => handleCheckboxChange(character.char.id)}
                  />
                  {character.char.name}
                </label>
                : character.char.id === 9 ?
                  <label>
                    Regular Citizen
                    <select value={boughtCitizen} onChange={handleBoughtCitizen}>
                      <option value="">Change Side</option>
                      {
                        <option key={index} value={character.playerId}>
                          Mafia
                        </option>
                      }
                    </select>
                  </label>
                  : character.char.id === 6 &&
                  <label>
                    Sniper
                    <select value={sniperShot} onChange={handleSniperShot}>
                      <option value="">Select a player</option>
                      {characterData
                        .filter((character) => !character.char.death)
                        .map((character, index) => (
                          <option key={index} value={character.playerId}>
                            {character.playerName}
                          </option>
                        ))}
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