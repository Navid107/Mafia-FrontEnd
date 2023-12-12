import React, { useState } from 'react'
import axios from 'axios'
import GameCard from '../CardUI/GameCard.js'
const NightActions = ({
  characterData,
  hostId,
  gameKey,
  death,
  nightCount,
  gameOver
}) => {
  const [selectedAbilities, setSelectedAbilities] = useState([])
  const [targetId, setTargetId] = useState('')
  const [mafiaShot, setMafiaShot] = useState('')
  const [sniperShot, setSniperShot] = useState('')
  const [saulGoodMan, setSaulGoodMan] = useState('')
  const [votedOut, setVotedOut] = useState('')
  characterData.sort((a, b) => a.char.id - b.char.id)
  // Determine the winning team
  const winningTeam = gameOver
  console.log(winningTeam, 'winning')

  const handleCheckboxChange = charId => {
    if (selectedAbilities.includes(charId)) {
      if (charId === 11) {
        handleUndoVotingKill()
      }
      setSelectedAbilities(selectedAbilities.filter(id => id !== charId))
      setTargetId(null)
    } else {
      if (charId === 3) {
        setSaulGoodMan(targetId)
        console.log('goodman', targetId)
      } else if (charId === 6) {
        setSniperShot(targetId)
        console.log('sniper', targetId)
      } else if (charId === 11) {
        handleVotingKill()
      } else if (charId === 12) {
        setMafiaShot(targetId)
      }
      setSelectedAbilities([...selectedAbilities, charId])
    }
  }

  const handleVotingKill = () => {
    const votedOutCharacter = characterData.find(
      character => character.playerId === targetId
    )

    if (votedOutCharacter) {
      votedOutCharacter.char.death = true
    }
  }
  const handleUndoVotingKill = () => {
    const votedOutCharacter = characterData.find(
      character => character.playerId === targetId
    )

    if (votedOutCharacter) {
      votedOutCharacter.char.death = false
    }
    setTargetId(null)
  }

  const handleGetTarget = playerId => {
    setTargetId(playerId)
  }

  const handleNightAction = e => {
    if (mafiaShot) {
      const killedPlayer = characterData.find(
        character => character.playerId === mafiaShot
      )
      console.log(killedPlayer)
      if (killedPlayer) {
        killedPlayer.char.death = true
      }
      setSaulGoodMan(null)
    }
    if (!mafiaShot && saulGoodMan) {
      const mafiaPlayers = characterData.filter(
        character => character.char.side === 'mafia'
      )

      // Find a dead Mafia player among the Mafia players
      const deathMafia = mafiaPlayers.find(
        character => character.char.death === true
      )

      if (deathMafia) {
        const citizen = characterData.find(
          character => character.playerId === saulGoodMan
        )

        if (citizen && citizen.char.id === 9) {
          // Update the information of the dead Mafia player
          deathMafia.char.ability = false
          deathMafia.char.death = false
          deathMafia.char.id = 10
          deathMafia.char.name = 'Regular Mafia'
          deathMafia.char.side = 'mafia'
        }
      }
    }

    if (sniperShot) {
      const sniper = characterData.find(character => character.char.id === 6)

      const sniperTarget = characterData.find(
        character => character.playerId === sniperShot
      )

      if (sniperTarget.char.side === 'mafia') {
        // Mafia dies
        sniperTarget.char.death = true
      } else {
        // Sniper dies
        sniper.char.death = true
      }
    }

    axios
      .post(`http://localhost:3500/api/game/table-update`, {
        gameKey,
        hostId: hostId,
        players: characterData
      })
      .then(response => {
        if (response.data.message === 'Game updated successfully') {
          // Handle success, e.g., redirect to the game table
          // Clear the form inputs after the async operation is successful
          setSelectedAbilities([])
          setMafiaShot('')
          setSniperShot('')
          setSaulGoodMan('')
          setVotedOut('')
        }
      })
      .catch(error => {
        console.error('Error updating the game:', error)
      })
  }

  console.log('playerId', targetId)
  return (
    <div className={`host-container-card ${death ? 'dead' : ''}`}>
      <div className={`host-player-card `}>
        {gameOver && (
          <p className='winning-message'>
            {winningTeam === 'Mafia'
              ? 'Mafia Won the Game!'
              : 'Citizen Won the Game!'}
          </p>
        )}
        <p className='host-sides-mafia'>MAFIA</p>
        <div className={`host-character-container${death ? 'dead' : ''}`}>
          {characterData
            .filter(e => [1, 2, 3, 9].includes(e.char.id))
            .map((e, index) => (
              <div
                key={index}
                className={`host-mafia-container ${e.char.death ? 'dead' : ''}`}
                onClick={() => handleGetTarget(e.playerId)}
              >
                <GameCard playerChar={e.char} playerName={e.playerName} />
              </div>
            ))}
        </div>

        <p className='host-sides-citizen'>CITIZEN</p>
        <div className={`host-character-container ${death ? 'dead' : ''}`}>
          {characterData
            .filter(e => ![1, 2, 3, 9].includes(e.char.id))
            .map((e, index) => (
              <div
                key={index}
                className={`host-citizen-container ${
                  e.char.death ? 'dead' : ''
                }`}
                onClick={() => handleGetTarget(e.playerId)}
              >
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
            Voting
            <input
              type='checkbox'
              checked={selectedAbilities.includes(11)}
              onChange={() => handleCheckboxChange(11)}
            />
          </label>
          <label>
            Mafia Shot
            <input
              type='checkbox'
              checked={selectedAbilities.includes(12)}
              onChange={() => handleCheckboxChange(12)}
            />
          </label>
          {/* Conditionally render Regular Citizen checkbox only if there are Regular Citizens with select:true */}
          {characterData
            .filter(character => character.char.id <= 6)
            .map((character, index) => (
              <div key={index}>
                <label
                  className={`character-label ${
                    character.char.death ? 'dead' : ''
                  }`}
                >
                  <input
                    type='checkbox'
                    checked={selectedAbilities.includes(character.char.id)}
                    onChange={() => handleCheckboxChange(character.char.id)}
                  />
                  {character.char.name}
                </label>
              </div>
            ))}
          <button className='submit-form' type='submit'>
            Submit Night Action
          </button>
        </form>
      </div>
    </div>
  )
}

export default NightActions
