import React, { useState } from "react";
import axios from "axios";
const NightActions = ({ characterData, hostId, gameKey, death, nightCount }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerShot, setPlayerShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [boughtCitizen, setBoughtCitizen] = useState("");
  const [votedOut, setVotedOut] = useState("");
  
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
  const handlePlayerVotedOut = (event) => {
    setVotedOut(event.target.value);
  };
  const handleSniperShot = (e) => {
    setSniperShot(e.target.value);
  }
  const handleBoughtCitizen = (e) => {
    setBoughtCitizen(e.target.value);
  }

  const handleNightAction = (e) => {
    //turning death:true for the player who got shot
    if (playerShot) {
      const killedPlayer = characterData.find(
        character => character.playerName === playerShot);

      if (killedPlayer) {
        killedPlayer.char.death = true
      }
    }
    // player who get voted out by other players 
    if(votedOut){
      const votedOutCharacter = characterData.find(
          character => character.playerId === votedOut);
          votedOutCharacter.char.death = true
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
      const targetCharacter = characterData.find(
        character => character.playerId === sniperShot);
        console.log('sniper shot', targetCharacter)
      if (targetCharacter) {
        if (targetCharacter.char.side === 'mafia') {
          // Mafia dies
          targetCharacter.char.death = true;
          console.log('mafia killed', targetCharacter.char.death )
        } else if (targetCharacter.char.side === 'citizen') {
          // Sniper dies
          const sniper = characterData.find(character => character.char.id === 6);
          if (sniper) {
            sniper.char.death = true;
            console.log('sniper died', sniper)
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
    axios.post(`http://localhost:3500/api/game/table-update`, {
      gameKey,
      hostId: hostId,

      players: characterData,
    })
      .then((response) => {
        if (response.data.message === 'Game updated successfully') {
          // Handle success, e.g., redirect to the game table
        }
      })
      .catch((error) => {
        console.error('Error updating the game:', error);
      });
      console.log('charDataaaa',characterData)
    // Increment the night counter
    ;

    // Clear the form inputs
    setSelectedAbilities([]);
    setPlayerShot("");
    setSniperShot("");
    setBoughtCitizen("");
    setVotedOut("")
  
  };
  console.log(nightCount)
  return (
    <div className={`night-actions-container ${death ? 'dead' : ''}`}>
      <h1>Night: {nightCount}</h1>
      <form onSubmit={handleNightAction}>
        <h3>Character Abilities:</h3>
        <label>
          Voted Out:
          <select value={votedOut} onChange={handlePlayerVotedOut}>
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
                <label className={`character-label ${character.char.death ? 'dead' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedAbilities.includes(character.char.id)}
                    onChange={() => handleCheckboxChange(character.char.id)}
                  />
                  {character.char.name}
                </label>
                : character.char.id === 9 ?
                  <label className={`character-label ${character.char.death ? 'dead' : ''}`}>
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
                  <label className={`character-label ${character.char.death ? 'dead' : ''}`}>
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