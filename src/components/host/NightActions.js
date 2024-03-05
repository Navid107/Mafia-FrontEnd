import React, { useState } from 'react'
import './Host.css'
import GameCard from '../CardUI/GameCard.js'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
const NightActions = ({
  characterData,
  hostId,
  gameKey,
  nightCount,
  gameOver
}) => {
  const [selectedAbilities, setSelectedAbilities] = useState([])
  const [votedOut, setVotedOut] = useState('')
  const [targetId, setTargetId] = useState('')
  const [mafiaShot, setMafiaShot] = useState('')
  const [sniperShot, setSniperShot] = useState('')
  const [saulGoodMan, setSaulGoodMan] = useState('')
  const [markedTarget, setMarkedTarget] = useState('')
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  // Sorting character data based on character ID
  characterData.sort((a, b) => a.char.id - b.char.id)

  // Determine the winning team
  const winningTeam = gameOver // Assigning the gameOver state to winningTeam

  /* "handleCheckboxChange" This is the night action checkBox,
      first GOD wakes up the player with ability player picks the target
      'GOD will pick that target by clicking on its character card'
      Then GOD checks the checkBox of the player with ability
    */
  const handleCheckboxChange = charId => {
    if (!selectedAbilities.includes(charId) && !targetId) {
      alert('please Select The Target First')
    } else {
      // Remove charId from selectedAbilities and reset targetId
      if (selectedAbilities.includes(charId)) {
        if (charId === 3) {
          setSaulGoodMan(null)
        }
        if (charId === 6) {
          setSniperShot(null)
        }
        // Undo the voting kill
        if (charId === 11) {
          console.log('uncgo', charId)
          handleUndoVotingKill()
        }
        if (charId === 12) {
          setMafiaShot(null)
        }

        setSelectedAbilities(selectedAbilities.filter(id => id !== charId))
        console.log('abilities ', selectedAbilities)
        setTargetId(null)
        setMarkedTarget(null)
      } else {
        // If charId is 3, set SaulGoodMan to targetId
        if (charId === 3) {
          setSaulGoodMan(targetId)
          console.log('target', targetId)
          setTargetId(null)
          setMarkedTarget(null)
        }
        // If charId is 6, set SniperShot to targetId
        else if (charId === 6) {
          setSniperShot(targetId)
          setTargetId(null)
          setMarkedTarget(null)
        }
        // If charId is 11, call handleVotingKill function
        else if (charId === 11) {
          handleVotingKill()
        }
        // If charId is 12, set MafiaShot to targetId
        else if (charId === 12) {
          setMafiaShot(targetId)
          setTargetId(null)
          setMarkedTarget(null)
        }
        // Add charId to selectedAbilities
        setSelectedAbilities([...selectedAbilities, charId])
      }
    }
  }
  console.log('mafiashot', mafiaShot)
  console.log('jadid', targetId)
  console.log('abilities ', selectedAbilities)
  console.log('mafiashot', mafiaShot)
  // Function to handle voting kill
  const handleVotingKill = () => {
    // Find the character to be voted out based on targetId
    const votedOutCharacter = characterData.find(
      character => character.playerId === targetId
    )
    if (votedOutCharacter) {
      votedOutCharacter.char.death = true
      setVotedOut(targetId)
    }
    setTargetId(null)
    setMarkedTarget(null)
  }

  // Function to handle undo voting kill
  const handleUndoVotingKill = () => {
    const votedOutCharacter = characterData.find(
      character => character.playerId === votedOut
    )
    if (votedOutCharacter) {
      votedOutCharacter.char.death = false
      setVotedOut(null)
    }
    setTargetId(null)
    setMarkedTarget(null)
  }

  // Getting the targeted playerID
  const handleGetTarget = e => {
    const ifTargetAlive = characterData.find(
      character => character.playerId === e.playerId
    )
    //Check if player is alive before setting as target
    if (ifTargetAlive.char.death === false) {
      // Set targeted player
      setTargetId(e.playerId)
      setMarkedTarget(e.char.id)
    } else {
      setTargetId(null)
      setMarkedTarget(null)
      alert('Player is not alive')
    }
  }
  // Function to handle night action form
  const handleNightAction = e => {
    // If MafiaShot is present
    if (mafiaShot) {
      // Find the character targeted by MafiaShot and mark them as dead
      const killedPlayer = characterData.find(
        character => character.playerId === mafiaShot
      )
      if (killedPlayer) {
        killedPlayer.char.death = true
      }
      //Mafia can shots to buy or shot, if they shot, SaulGoodMan cant buy
      setSaulGoodMan(null)
    }
    // If no MafiaShot but SaulGoodMan is present
    if (!mafiaShot && saulGoodMan) {
      // Find all Mafia players and check if a dead Mafia player exists
      const mafiaChars = characterData.filter(
        character => character.char.side === 'mafia'
      )
      const deathMafiaChar = mafiaChars.find(
        character => character.char.death === true
      )
      // If a dead Mafia player exists, then check if saulGoodMan's target
      if (deathMafiaChar) {
        //Find the targeted player
        const citizen = characterData.find(
          character => character.playerId === saulGoodMan
        )
        console.log(citizen)
        // if the targeted player is regular citizen
        if (citizen && citizen.char.id === 8) {
          //Change the role of the target player to mafia
          citizen.char.ability = false
          citizen.char.death = false
          citizen.char.id = 9
          citizen.char.name = 'Regular Mafia'
          citizen.char.side = 'mafia'
        } else {
          //If the targeted player is not regular citizen, set saulGoodMan to empty string
          return setSaulGoodMan('')
        }
      }
    }
    //If SniperShot is present
    if (sniperShot) {
      // Find the Sniper and the target player
      const sniper = characterData.find(character => character.char.id === 6)
      const sniperTarget = characterData.find(
        character => character.playerId === sniperShot
      )
      // If the target is Mafia, mark them as dead; otherwise, mark the Sniper as dead
      if (sniperTarget.char.side === 'mafia') {
        sniperTarget.char.death = true
      } else {
        sniper.char.death = true
      }
    }
    // Send a request update the game table with the Night Action Form
    axiosPrivate
      .post(`/game/table-update`, {
        gameKey,
        hostId: hostId,
        players: characterData
      })
      .then(response => {
        // If the update is successful, reset selected abilities and clear certain state variables
        if (response.data.message === 'Game updated successfully') {
          setSelectedAbilities([])
          setMafiaShot('')
          setSniperShot('')
          setSaulGoodMan('')
        }
      })
      .catch(error => {
        console.error('Error updating the game:', error) // Log any errors to the console
        navigate('/login')
        localStorage.removeItem('accessToken')
        window.location.reload()
      })
  }

  return (
    <div className={`host-container-card`}>
      <div className={`host-player-card `}>
        <h1 className='ppl-in-city-h1'>People in the City</h1>
        {gameOver && (
          <p className='winning-message'>
            {winningTeam === 'Mafia'
              ? 'Mafia Won the Game!'
              : 'Citizen Won the Game!'}
          </p>
        )}
        <p className='host-sides-mafia'>MAFIA</p>
        <div className={`host-character-container`}>
          {characterData
            .filter(e => [1, 2, 3, 9].includes(e.char.id))
            .map((e, index) => (
              <div
                key={index}
                className={`host-mafia-container ${e.char.death ? 'dead' : ''}`}
                onClick={() => handleGetTarget(e)}
              >
                <GameCard
                  playerChar={e.char}
                  playerName={e.playerName}
                  isPlayerActive={markedTarget}
                />
              </div>
            ))}
        </div>

        <p className='host-sides-citizen'>CITIZEN</p>
        <div className={`host-character-container`}>
          {characterData
            .filter(e => ![1, 2, 3, 9].includes(e.char.id))
            .map((e, index) => (
              <div
                key={index}
                className={`host-citizen-container ${
                  e.char.death ? 'dead' : ''
                }`}
                onClick={() => handleGetTarget(e)}
              >
                <GameCard
                  playerChar={e.char}
                  playerName={e.playerName}
                  isPlayerActive={markedTarget}
                />
              </div>
            ))}
        </div>
      </div>
      <div className={`night-actions-container`}>
        <h1>Night: {nightCount}</h1>
        <h3>Character Abilities:</h3>
        <form onSubmit={handleNightAction}>
         
          <label className='checkBox-label'>
            <input
              type='checkbox'
              checked={selectedAbilities.includes(11)}
              onChange={() => handleCheckboxChange(11)}
            />
            Voting
          </label>
          <label className='checkBox-label'>
            <input
              type='checkbox'
              checked={selectedAbilities.includes(12)}
              onChange={() => handleCheckboxChange(12)}
            />{' '}
            Mafia Shot
          </label>

          {characterData
            .filter(character => character.char.id <= 7)
            .map((character, index) => (
              <label
                className={`checkBox-label ${
                  character.char.death ? 'dead' : ''
                }`}
                key={index}
              >
                <input
                  type='checkbox'
                  checked={selectedAbilities.includes(character.char.id)}
                  disabled={character.char.death === true}
                  onChange={() => handleCheckboxChange(character.char.id)}
                />
                {character.char.name}
              </label>  
            ))}
         
          <button className='night-action-form-btn' type='submit'>
            Next Day
          </button>
        </form>
      </div>
    </div>
  )
}

export default NightActions
