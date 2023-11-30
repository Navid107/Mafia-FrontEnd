import React, { useRef, useState } from "react";
import axios from "axios";
import GameCard from './CardUI/GameCard.js';
const NightActions = ({ characterData, hostId, gameKey, death, nightCount, gameOver }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [targetId, setTargetId] = useState('')

  const [playerAction, setPlayerAction] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [mafiaShot, setMafiaShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [saulGoodMan, setSaulGoodMan] = useState("");
  const [votedOut, setVotedOut] = useState("");
  characterData.sort((a, b) => a.char.id - b.char.id);
  // Determine the winning team
  const winningTeam = gameOver === "Mafia" ? "Mafia" : "Citizen";


  const colors = [
    {
      id: 2,
      color: '',  
    },
    {
      id: 3,
      color: ''
    },
    {
      id: 4,
      color: ''
    }, {
      id: 6,
      color: ''
    },
    {
      id: 11,
      color: ''
    },
    {
      id: 12,
      color: ''
    },
    {
      id: 0,
      color: ''
    }
  ]; // Add more colors as needed

  const getColorForCharacter = (character) => {
    
    const index = characterData.find((e) =>
      e.playerId === character);
    const color = colors.find((color) =>
    color.id === index.char.id)
    if (color) {
      console.log(color.color)
      return color.color;      
    } else {
      return 
    }
  };




  const handleCheckboxChange = (charId) => {
    if (selectedAbilities.includes(charId)) {
      if (charId === 3) {
        setSaulGoodMan('')
      } else if (charId === 6) {
        setSniperShot('');
      } else if (charId === 11) {
        setVotedOut("");
        console.log('29 setvote', votedOut);
      } else if (charId === 12) {
        setMafiaShot('')
      }
      setSelectedAbilities(selectedAbilities.filter((id) => id !== charId));

    } else {
      const findPlayer = characterData.find((id) => id.char.id === charId);

      if (charId === 3) {
        colors[1].color = 'pink'
        setSaulGoodMan(targetId)
        console.log('goodman', targetId);
      } else if (charId === 6) {
        colors[2].color = 'green'
        setSniperShot(targetId);
        console.log('sniper', targetId);
      } else if (charId === 11) {
        colors[3].color = 'yellow'
        setVotedOut(targetId);
        console.log('setvote', targetId);
      } else if (charId === 12) {
        colors[4].color = 'red'
        setMafiaShot(targetId)
        console.log('mafiashot', targetId);
      }

      setSelectedAbilities([...selectedAbilities, charId]);
    }
  };

  const handleGetTarget = (playerId) => {
    setTargetId(playerId);
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
          setMafiaShot("");
          setSniperShot("");
          setSaulGoodMan("");
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

  const handleVotingKill = () => {
    const votedOutCharacter = characterData.find(
      character => character.playerId === targetId
    );

    if (votedOutCharacter) {
      votedOutCharacter.char.death = true;
    }
  };

  const handleSaulGoodmanAbility = () => {
    const citizen = characterData.find(
      character => character.playerId === targetId)
    console.log(citizen)
    if (citizen && citizen.char.id === 9) {
      citizen.char.ability = false;
      citizen.char.death = false;
      citizen.char.id = 10;
      citizen.char.name = 'Regular Mafia';
      citizen.char.side = 'mafia';
    }
  };

  const handleSniperAbility = () => {
    const sniper = characterData.find(
      character => character.char.id === 6);

    const sniperTarget = characterData.find(
      character => character.playerId === targetId)

    if (sniperTarget.char.side === 'mafia') {
      // Mafia dies
      sniperTarget.char.death = true;
    } else {
      // Sniper dies
      sniper.char.death = true;
    }
  };

  console.log('playerId', targetId);
  return (
    <div className={`host-container-card ${death ? 'dead' : ''}`}>
      <div className={`host-player-card ${death ? 'dead' : ''}`}>
        {gameOver && (
          <p className="winning-message">
            {winningTeam === "Mafia" ? "Mafia Won the Game!" : "Citizen Won the Game!"}
          </p>
        )}
        <p className="host-sides-mafia">Mafia</p>
        <div className={`host-character-container${death ? 'dead' : ''}`}>
          {characterData
            .filter((e) => [1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className={`host-mafia-container ${e.char.death ? 'dead' : ''}`}
                onClick={() => handleGetTarget(e.playerId)}
                style={{ backgroundColor: getColorForCharacter(e.playerId) }}
              >
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>

        <p className="host-sides-citizen">Citizen</p>
        <div className={`host-character-container ${death ? 'dead' : ''}`}>
          {characterData
            .filter((e) => ![1, 2, 3, 10].includes(e.char.id))
            .map((e, index) => (
              <div key={index} className={`host-citizen-container ${e.char.death ? 'dead' : ''}`}
                onClick={() => handleGetTarget(e.playerId)}
                style={{ backgroundColor: getColorForCharacter(e.playerId) }}>
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>
      </div>
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
          <label>
            Mafia Shot
            <input
              type="checkbox"
              checked={selectedAbilities.includes(12)}
              onChange={() => handleCheckboxChange(12)}
            />

          </label>
          {/* Conditionally render Regular Citizen checkbox only if there are Regular Citizens with select:true */}
          {characterData
            .filter((character) => character.char.id <= 7)
            .map((character, index) => (
              <div key={index}>
                <label className={`character-label ${character.char.death ? 'dead' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedAbilities.includes(character.char.id)}
                    onChange={() => handleCheckboxChange(character.char.id)}
                  />
                  {character.char.name}
                </label>
              </div>
            ))}
          <button className="submit-form" type="submit">
            Submit Night Action
          </button>
        </form>
      </div>
    </div>
  );
};

export default NightActions;