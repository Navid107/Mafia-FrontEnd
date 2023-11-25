import React, { useState } from "react";
import axios from "axios";
const NightActions = ({ characterData, hostId, gameKey, death, nightCount, targetId }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerAction, setPlayerAction] = useState(null);
  const [targetPlayer, setTargetPlayer] = useState(targetId);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerShot, setPlayerShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [boughtCitizen, setBoughtCitizen] = useState("");
  const [votedOut, setVotedOut] = useState("");

  const handleCheckboxChange = (charId) => {

    if (selectedAbilities.includes(charId)) {
      setSelectedAbilities(selectedAbilities.filter(id => id !== charId));
      setPlayerAction(null);
    } else {
      const findPlayer = characterData.find(id => id.char.id === charId);
      if(charId === 12){
        handleKillAction(targetPlayer)
      }
      else if(charId === 11){
        handlePlayerVotedOut()
      }
      else if(findPlayer.char.name === "Sniper"){
        handleSniperShot()
      }
      else if(findPlayer.char.name === "Regular Citizen"){
        handleBoughtCitizen()
      }
      console.log('found Player',findPlayer)
      setPlayerAction(charId)
      console.log('else ', charId);
      handleAbilityAction()
      setSelectedAbilities([...selectedAbilities, charId]);
    }

  };

  console.log('selected target', targetPlayer);
  const handleCardClick = (charId) => {
    setSelectedCard(charId);
  };

  const handlePlayerVotedOut = () => {
    setVotedOut(targetId);
  };

  const handlePlayerShotChange = () => {
    setTargetPlayer(targetId)
    
  };
  console.log('PlayerShot',playerShot);
  const handleSniperShot = () => {
    setSniperShot(targetId);
  };

  const handleBoughtCitizen = () => {
    setBoughtCitizen(targetId);
  };

  const handleNightAction = (e) => {
    //turning death:true for the player who got shot


    console.log('charDataaaa', characterData)
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
    console.log('charDataaaa', characterData)
      // Increment the night counter
      ;

    // Clear the form inputs
    setSelectedAbilities([]);
    setSelectedCard(null);
    setPlayerShot("");
    setSniperShot("");
    setBoughtCitizen("");
    setVotedOut("");

  };
  const handleAbilityAction = (targetPlayer, playerAction) => {
    const targetCharacter = characterData.find(
      character => character.playerId === targetPlayer
    );

    if (targetCharacter) {
      switch (playerAction) {
        case 'Sniper':
          handleSniperAbility(targetPlayer, targetCharacter);
          break;
        case 'SaulGoodman':
          handleSaulGoodmanAbility(targetPlayer, targetCharacter);
          break;
        // Add more cases for other abilities as needed
        default:
          break;
      }
    }
  };

  const handleKillAction = (playerId) => {
    const killedPlayer = characterData.find(
      character => character.playerId === playerId
    );
      console.log('player killed',killedPlayer)
    if (killedPlayer) {
      killedPlayer.char.death = true;
    }
  };

  const handleKillActionByPlayerId = (playerId) => {
    const votedOutCharacter = characterData.find(
      character => character.playerId === playerId
    );

    if (votedOutCharacter) {
      votedOutCharacter.char.death = true;
    }
  };

  const handleSaulGoodmanAbility = (targetPlayerId, targetCharacter) => {
    if (targetCharacter && targetCharacter.char.side !== 'mafia') {
      targetCharacter.char.ability = false;
      targetCharacter.char.death = false;
      targetCharacter.char.id = 10;
      targetCharacter.char.name = 'Regular Mafia';
      targetCharacter.char.side = 'mafia';
    }
  };

  const handleSniperAbility = (targetPlayerId, targetCharacter) => {
    if (targetCharacter) {
      if (targetCharacter.char.side === 'mafia') {
        // Mafia dies
        targetCharacter.char.death = true;
      } else if (targetCharacter.char.side === 'citizen') {
        // Sniper dies
        const sniper = characterData.find(character => character.char.id === 6);
        if (sniper) {
          sniper.char.death = true;
        }
      }
    }
  };

  console.log(selectedAbilities)
  return (
    <div className={`night-actions-container ${death ? 'dead' : ''}`}>
      <h1>Night: {nightCount}</h1>
      <form onSubmit={handleNightAction}>
        <h3>Character Abilities:</h3>
        <label>
          Voted Out:
          <input
            type="checkbox"
            checked={selectedAbilities.includes(11)}
            onChange={() => handleCheckboxChange(11)}
          />
        </label>
        <label className={`character-label `}>
          Mafia Shot
          <input
            type="checkbox"
            checked={selectedAbilities.includes(12)}
            onChange={() => handleCheckboxChange(12)}
          />

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