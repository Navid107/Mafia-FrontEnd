import React, { useState } from 'react'
import './Host.css'
import GameCard from '../CardUI/GameCard.js'
import useAxiosPrivate from '../auth/api/useAxiosPrivate.js'

const NightActions = ({
  characterData,
  hostId,
  gameKey,
  nightCount,
  gameOver
}) => {
  const axiosPrivate = useAxiosPrivate()
  const [selectedAbilities, setSelectedAbilities] = useState([])

  const [targetId, setTargetId] = useState('')
  const [markedTarget, setMarkedTarget] = useState('')

  const [votedOut, setVotedOut] = useState('')
  const [mafiaShot, setMafiaShot] = useState('')
  const [disableVictimAblty, setDisableVictimAblty] = useState('')

  const [elMatador, setElMatador] = useState('')
  const [saulGMActive, setSaulGMActive] = useState(false)
  const [saulGoodMan, setSaulGoodMan] = useState('')

  const [doctorSave, setDoctorSave] = useState('')
  const [sniperShot, setSniperShot] = useState('')

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
        if (charId === 2) {
          setElMatador(null)
        }
        if (charId === 3) {
          setSaulGoodMan(null)
        }
        if (charId === 4) {
          setDoctorSave(null)
        }
        if (charId === 6) {
          setSniperShot(null)
        }
        // Undo the voting kill
        if (charId === 11) {
          handleUndoVotingKill()
        }
        if (charId === 12) {
          setMafiaShot(null)
          setDisableVictimAblty(null)
          handleSaulGoodManAbility()
        }

        setSelectedAbilities(selectedAbilities.filter(id => id !== charId))
        setTargetId(null)
        setMarkedTarget(null)
      } else {
        if (charId === 2) {
          handleElMatadorAbility()
        }
        // If charId is 3, set SaulGoodMan to targetId
        if (charId === 3) {
          setSaulGoodMan(targetId)
          setTargetId(null)
          setMarkedTarget(null)
        }
        if (charId === 4) {
          setDoctorSave(targetId)
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
          setTargetId(null)
          setMarkedTarget(null)
        }
        // If charId is 12, set MafiaShot to targetId
        else if (charId === 12) {
          mafiaTargetedVictim(targetId)
          setSaulGMActive(true)
          setTargetId(null)
          setMarkedTarget(null)
        }
        // Add charId to selectedAbilities
        setSelectedAbilities([...selectedAbilities, charId])
      }
    }
  }
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
    handleSaulGoodManAbility(null)
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
  const mafiaTargetedVictim = () => {
    setMafiaShot(targetId)
    const targetedVictim = characterData.find(
      character => character.playerId === targetId
    )
    //Disabling the target ability
    setDisableVictimAblty(targetedVictim.char.id)
    handleSaulGoodManAbility()
    //setSaulGMActive(false)
  }

  function handleSaulGoodManAbility () {
    const allMafiaChars = characterData.filter(e =>
      [1, 2, 3, 9].includes(e.char.id)
    )
    const deathMafia = allMafiaChars.find(e => e.char.death === true)
    if (deathMafia) {
      setSaulGMActive(false)
    } else {
      setSaulGMActive(true)
    }
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
      setMarkedTarget(e.playerName)
    } else {
      setTargetId(null)
      setMarkedTarget(null)
      alert('Player is not alive')
    }
  }
  const handleElMatadorAbility = () => {
    const elMatadorTarget = characterData.find(
      character => character.playerId === targetId
    )
    setElMatador(elMatadorTarget.char.id)
  }

  // Function to handle night action form
  const handleNightAction = e => {
    const mafiaVictim = target => {
      // If MafiaShot is present and shot is not equal to doctor protected player
      if (target && target !== doctorSave) {
        const victim = characterData.find(
          character => character.playerId === target
        )
        if (victim) {
          victim.char.death = true
        }
        //Mafia can buy or shot, if they shot, SaulGoodMan cant buy
        setSaulGoodMan(null)
      } else {
        // if the mafiaTargetedPlayer === to doctorProtectedPlayer then the player would be saved and mafia misses
        setMafiaShot(null)
      }
    }
    mafiaVictim(mafiaShot)

    const saulGoodManVictim = target => {
      if (target) {
        //Find the targeted player
        const citizen = characterData.find(
          character => character.playerId === target
        )
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
          setSaulGoodMan(null)
        }
      }
    }
    saulGoodManVictim(saulGoodMan)

    const sniperAction = target => {
      //If SniperShot is present
      if (target) {
        // Find the Sniper and the target player
        const sniper = characterData.find(character => character.char.id === 6)
        const sniperTarget = characterData.find(
          character => character.playerId === target
        )
        // If the target is Mafia, mark them as dead; otherwise, mark the Sniper as dead
        if (sniperTarget.char.side === 'mafia') {
          sniperTarget.char.death = true
        } else {
          sniper.char.death = true
        }
      }
    }
    sniperAction(sniperShot)
    // Send a request update the game table with the Night Action Form
    axiosPrivate
      .post(`game/table-update`, {
        gameKey,
        hostId: hostId,
        players: characterData
      })
      .then(response => {
        // If the update is successful, reset selected abilities and clear certain state variables
        if (response.data.message === 'Game updated successfully') {
          setSelectedAbilities([])
          setMafiaShot(null)
          setSniperShot(null)
          setSaulGoodMan(null)
          setDoctorSave(null)
          setVotedOut(null)
        }
      })
      .catch(error => {
        console.error('Error updating the game:', error) // Log any errors to the console
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
        <h3>Characters Abilities</h3>
        <form onSubmit={handleNightAction}>
          <label className='checkBox-label'>
            <input
              type='checkbox'
              checked={selectedAbilities.includes(11)}
              onChange={() => handleCheckboxChange(11)}
            />
            Voting
          </label>
          <label className={`checkBox-label ${saulGoodMan ? 'disabled' : ''}`}>
            <input
              type='checkbox'
              checked={selectedAbilities.includes(12)}
              disabled={saulGoodMan}
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
                } ${
                  (saulGMActive && character.char.id === 3) ||
                  (elMatador && character.char.id === elMatador) ||
                  (disableVictimAblty &&
                    character.char.id === disableVictimAblty)
                    ? 'disabled'
                    : ''
                }`}
                key={index}
              >
                <input
                  type='checkbox'
                  checked={selectedAbilities.includes(character.char.id)}
                  disabled={
                    (saulGMActive && character.char.id === 3) ||
                    (elMatador && character.char.id === elMatador) ||
                    (disableVictimAblty &&
                      character.char.id === disableVictimAblty)
                  }
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
