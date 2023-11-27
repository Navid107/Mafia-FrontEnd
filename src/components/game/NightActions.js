import React, { useState } from "react";
import axios from "axios";
const NightActions = ({ characterData, hostId, gameKey, death, nightCount, targetId }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerAction, setPlayerAction] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [playerShot, setPlayerShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [boughtCitizen, setBoughtCitizen] = useState("");
  const [votedOut, setVotedOut] = useState("");

  const handleCheckboxChange = (charId) => {
    if (selectedAbilities.includes(charId)) {
      setSelectedAbilities(selectedAbilities.filter((id) => id !== charId));
      setPlayerAction(null);
    } else {
      const findPlayer = characterData.find((id) => id.char.id === charId);

      if (charId === 12) {
        handleKillAction();
      } else if (charId === 11) {
        handlePlayerVotedOut();
      } else if (findPlayer.char.name === "Sniper") {
        handleSniperShot();
      } else if (findPlayer.char.name === "Regular Citizen") {
        handleBoughtCitizen();
      }

      setPlayerAction(charId);
      handleAbilityAction(targetId, charId); // Make sure to pass the targetId here
      setSelectedAbilities([...selectedAbilities, charId]);
    }
  };

  const handleTarget = () => {
    return targetId
  }

  const handleCardClick = (charId) => {
    setSelectedCard(charId);
  };

  const handlePlayerVotedOut = () => {
    setVotedOut(targetId);
  };

  const handlePlayerShotChange = () => {
    setPlayerShot(targetId);
  };

  const handleSniperShot = () => {
    setSniperShot(targetId);
  };

  const handleBoughtCitizen = () => {
    setBoughtCitizen(targetId);
  };

  const handleNightAction = (e) => {
    // Turn death:true for the player who got shot
    // Async operation to update the game table
    axios
      .post(`http://localhost:3500/api/game/table-update`, {
        gameKey,
        hostId: hostId,
        players: characterData,
      })
      .then((response) => {
        if (response.data.message === "Game updated successfully") {
          // Handle success, e.g., redirect to the game table
          // Clear the form inputs after the async operation is successful
          setSelectedAbilities([]);
          setSelectedCard(null);
          setPlayerShot("");
          setSniperShot("");
          setBoughtCitizen("");
          setVotedOut("");
        }
      })
      .catch((error) => {
        console.error("Error updating the game:", error);
      });
  };
  const handleAbilityAction = (targetPlayer, playerAction) => {
    const targetCharacter = characterData.find((character) => character.playerId === targetPlayer);

    if (targetCharacter) {
      switch (playerAction) {
        case "Sniper":
          handleSniperAbility(targetPlayer, targetCharacter);
          break;
        case "SaulGoodman":
          handleSaulGoodmanAbility(targetPlayer, targetCharacter);
          break;
        // Add more cases for other abilities as needed
        default:
          break;
      }
    }
  };

  const handleKillAction = () => {
    const killedPlayer = characterData.find((character) => character.playerId === targetId);
    console.log(killedPlayer)
    if (killedPlayer) {
      killedPlayer.char.death = true;
    }
  };

  const handleKillActionByPlayerId = (playerId) => {
    const target = handleTarget()
    const votedOutCharacter = characterData.find(
      character => character.playerId === target
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
          Voted Out
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