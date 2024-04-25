import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PreGameLobby.css'
import Checkbox from '../CardUI/CheckBox'
import Avatar from '../CardUI/pictures/avatar.png'
import { preSelectedChars, availableChars } from './CharData'
import AuthService from '../auth/hooks/AuthService'
import useAxiosPrivate from '../auth/api/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
function PreGameLobby () {
  const [hostId, setHostId] = useState('')
  const [players, setPlayers] = useState([])
  const [formSubmit, setFormSubmit] = useState(false)
  const { gameKey } = useParams()
  const userId = AuthService.getCurrentUser()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const [selectedChars, setSelectedChars] = useState(preSelectedChars)

  useEffect(() => {
    // Fetch lobby data based on gameKey
    axiosPrivate
      .post(`game/lobby`, { gameKey })
      .then(response => {
        if (response.data && response.data[0]) {
          // Set players and hostId based on response data
          setPlayers(response.data[0].players)
          setHostId(response.data[0].host)
        }
      })
      .catch(error => {
        console.error('Error fetching user lobbies:', error)
        navigate('/login')
      })
    // eslint-disable-next-line
  }, [gameKey])

  // Function to handle checkbox change for character selection
  const handleCheckboxChange = character => {
    //These are the base characters which unchangeable
    const isAlwaysSelected = [1, 2, 4, 5, 6, 8].includes(character.id)
    // If the character is not always selected
    if (!isAlwaysSelected) {
      setSelectedChars(prevSelectedChars => {
        // Check if the character is already selected
        const isAlreadySelected = prevSelectedChars.some(
          e => e.id === character.id
        )
        // If already selected, remove it from the selected characters;
        // otherwise, add it
        return isAlreadySelected
          ? prevSelectedChars.filter(e => e.id !== character.id)
          : [...prevSelectedChars, character]
      })
      setFormSubmit(false)
    }
  }
  // Function to start the game with selected characters
  const startGame = () => {
    try {
      axiosPrivate.post(`/game/start`, {
        gameKey,
        hostId,
        selectedChars
      })
    } catch (error) {
      console.error('Error starting the game:', error)
    }
    // default characters
    setSelectedChars(preSelectedChars)
  }
  const formValidation = e => {
    e.preventDefault()
    return alert('You Must Select The Characters First ')
  }
  const handleSubmit = e => {
    e.preventDefault()
    //Check if players length and character length is equal
    if (
      players.length === selectedChars.length ||
      (selectedChars.length === 9 && players.length > 9)
    ) {
      setFormSubmit(true)
    } else {
      alert('Please make sure you have selected characters for all players.')
    }
  }
  return (
    <div className='pre-game-container'>
      <h1 className='title'>Welcome to Pre Game Lobby</h1>
      <h4 className='subtitle'>Please wait for the God to start the game!</h4>
      <div className='player-char-container'>
        <div className='players-container'>
          <h2>Players List</h2>
          <div className='player-list'>
            {players.length > 0
              ? players.map((player, index) => (
                  <div key={index} className='user-avatar'>
                    <img src={Avatar} alt='User Avatar' />
                    <p>{player.name}</p>
                  </div>
                ))
              : 'no players available'}
          </div>
          {hostId === userId.userId ? (
            <Link to={{ pathname: `user/table/${gameKey}` }}>
              {formSubmit ? (
                <button
                  className='btn-start-game'
                  onClick={startGame}
                  disabled={!selectedChars.length}
                >
                  Start Game
                </button>
              ) : (
                <button className='btn-start-game' onClick={formValidation}>
                  Select The Characters First
                </button>
              )}
            </Link>
          ) : (
            'Please wait for God to start'
          )}
        </div>
        <div className='char-checkbox-container'>
          <h2>Available Characters</h2>
          <div className='char-checkbox'>
            <form className='checkBox-form' onSubmit={handleSubmit}>
              {availableChars.map(character => (
                <div key={character.id}>
                  <Checkbox
                    character={character}
                    checked={selectedChars.some(e => e.id === character.id)}
                    disabled={[1, 2, 4, 5, 6, 8].includes(character.id)}
                    onChange={() => handleCheckboxChange(character)}
                  />
                </div>
              ))}
            </form>
            {hostId === userId.userId ? (
              <button className='btn-checkbox' onClick={handleSubmit}>
                {formSubmit ? 'Done!' : 'Submit'}
              </button>
            ) : (
              'Please wait for God to start'
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreGameLobby
