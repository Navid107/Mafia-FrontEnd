import React, { useState } from "react";
import axios from "axios";
const NightActions = ({ characterData, hostId, gameKey, death, nightCount, targetId }) => {
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [playerAction, setPlayerAction] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [mafiaShot, setMafiaShot] = useState("");
  const [sniperShot, setSniperShot] = useState("");
  const [saulGoodMan, setSaulGoodMan] = useState("");
  const [boughtCitizen, setBoughtCitizen] = useState("");
  const [votedOut, setVotedOut] = useState("");

  const handleCheckboxChange = (charId) => {
    if (selectedAbilities.includes(charId)) {
      setSelectedAbilities(selectedAbilities.filter((id) => id !== charId));
      setPlayerAction(null);
    }
     else {
      if (charId === 12) {
        setMafiaShot(targetId);
      } else if (charId === 11) {
        setVotedOut(targetId);
      } else if (charId === 3) {
        setSaulGoodMan(targetId);
      } else if (charId === 6) {
        setSniperShot(targetId);
      }
      setSelectedAbilities([...selectedAbilities, charId]);
      
    }
  };

  const handleTarget = () => {
    return targetId
  }
  console.log('tagettttt',targetId);
  const handleCardClick = (charId) => {
    setSelectedCard(charId);
  };

  const handleNightAction = (e) => {
    e.Default()
// voting 
    if(votedOut){
      const target = characterData.find(
        (character) => character.playerId === votedOut);
        if(target){
          target.char.death = true
        }
        else{
          console.log('something went wrong with voting')  
        }
    }

//Mafia shot
    if(mafiaShot){
      const target = characterData.find(
        (character) => character.playerId === mafiaShot);
        if(target){
          target.char.death = true
        }
        else{
          console.log('something went wrong with mafiaShot')  
        }
    }
// if mafia "saulGoodMan" buy instead of shot
    if(!mafiaShot){
      const target = characterData.find(
        (character) => character.playerId === saulGoodMan);
        if (target && target.char.id === 9) {
          target.char.ability = false;
          target.char.death = false;
          target.char.id = 10;
          target.char.name = 'Regular Mafia';
          target.char.side = 'mafia';
        }
    }

    if(sniperShot){
      const target = characterData.find(
        (character) => character.playerId === sniperShot);
        if(target.char.side === 'mafia'){
          target.char.death = true
          console.log('sniper killed mafia', target)
      } else {
        const sniper = characterData.find(
          (character) => character.char.id === 6);
          sniper.char.death= true
          console.log('sniper died', sniper)
      }
    }

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
          setMafiaShot("")
          setSaulGoodMan("")
          setSniperShot("");
          setVotedOut("");
        }
      })
      .catch((error) => {
        console.error("Error updating the game:", error);
      });
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
          .filter((character) => character.char.id <= 8)
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

  );
};

export default NightActions;