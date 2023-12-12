import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import './PreGameLobby.css'
import Checkbox from '../CardUI/CheckBox'

function PreGame () {
  const [hostId, setHostId] = useState('')
  const [players, setPlayers] = useState([])
  const [selectedChars, setSelectedChars] = useState([
    {
      id: 1,
      name: 'GodFather',
      side: 'mafia',
      ability: true,
      death: false
    },
    {
      id: 2,
      name: 'El Matador',
      side: 'mafia',
      ability: true,
      death: false
    },
    {
      id: 4,
      name: 'Dr',
      side: 'citizen',
      ability: true,
      death: false
    },
    {
      id: 5,
      name: 'Detective',
      side: 'citizen',
      ability: true,
      death: false
    },
    {
      id: 6,
      name: 'Sniper',
      side: 'citizen',
      ability: true,
      death: false
    },
    {
      id: 8,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: false,
      death: false
    }
  ])
  const [formSubmit, setFormSubmit] = useState(false)
  const { gameKey } = useParams()

  const token = localStorage.getItem('user')

  const userId = jwt_decode(token)

  useEffect(() => {
    axios
      .post(`http://localhost:3500/api/game/lobby`, { gameKey })
      .then(response => {
        if (response.data && response.data[0]) {
          setPlayers(response.data[0].players)
          setHostId(response.data[0].host)
        }
      })
      .catch(error => {
        console.error('Error fetching user lobbies:', error)
      })
  }, [gameKey])

  const availableChars = [
    {
      id: 1,
      name: 'GodFather',
      side: 'mafia',
      ability: true,
      death: false
    },
    {
      id: 2,
      name: 'El Matador',
      side: 'mafia',
      ability: true,
      death: false
    },
    {
      id: 3,
      name: 'Saul Goodman',
      side: 'mafia',
      ability: true,
      death: false
    },
    {
      id: 4,
      name: 'Dr',
      side: 'citizen',
      ability: true,
      death: false
    },
    {
      id: 5,
      name: 'Detective',
      side: 'citizen',
      ability: true,
      death: false
    },
    {
      id: 6,
      name: 'Sniper',
      side: 'citizen',
      ability: true,
      death: false
    },

    {
      id: 7,
      name: 'BodyGuard',
      side: 'citizen',
      ability: false,
      death: false
    },
    {
      id: 8,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: false,
      death: false
    },
    {
      id: 9,
      name: 'Regular Mafia',
      side: 'mafia',
      ability: false,
      death: false
    }
  ]

  const handleCheckboxChange = character => {
    const isAlwaysSelected = [1, 2, 4, 5, 6, 8].includes(character.id)

    if (!isAlwaysSelected) {
      setSelectedChars(prevSelectedChars => {
        const isAlreadySelected = prevSelectedChars.some(
          e => e.id === character.id
        )
        return isAlreadySelected
          ? prevSelectedChars.filter(e => e.id !== character.id)
          : [...prevSelectedChars, character]
      })
    }
  }

  const startGame = () => {
    axios
      .post(`http://localhost:3500/api/game/start`, {
        gameKey,
        hostId,
        selectedChars
      })
      .then(response => {
        if (
          response.data.message ===
          'Game started successfully with assigned characters'
        ) {
          // Handle success, e.g., redirect to the game table
        }
      })
      .catch(error => {
        console.error('Error starting the game:', error)
      })
    setSelectedChars([
      {
        id: 1,
        name: 'GodFather',
        side: 'mafia',
        ability: true,
        death: false
      },
      {
        id: 2,
        name: 'El Matador',
        side: 'mafia',
        ability: true,
        death: false
      },
      {
        id: 4,
        name: 'Dr',
        side: 'citizen',
        ability: true,
        death: false
      },
      {
        id: 5,
        name: 'Detective',
        side: 'citizen',
        ability: true,
        death: false
      },
      {
        id: 6,
        name: 'Sniper',
        side: 'citizen',
        ability: true,
        death: false
      },
      {
        id: 8,
        name: 'Regular Citizen',
        side: 'citizen',
        ability: false,
        death: false
      }
    ])
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (
      players.length === selectedChars.length ||
      (selectedChars.length === 9 && players.length > 9)
    ) {
      setFormSubmit(true)
      console.log('Selected Characters:', selectedChars)
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
          <h2>Player List</h2>
          <div className='player-list'>
            {players.length > 0
              ? players.map((player, index) => (
                  <div key={index} className='user-avatar'>
                    <img
                      src='https://cdn.wallpapersafari.com/97/93/ZyLAgn.jpg'
                      alt='User Avatar'
                    />
                    <p>{player.name}</p>
                  </div>
                ))
              : 'no players available'}
          </div>
          {hostId === userId.userId ? ( 
          
            <Link to={{ pathname: `/table/${gameKey}` }}>
              {formSubmit ? (
              <button
                className='btn-start-game'
                onClick={startGame}
                disabled={!selectedChars.length}
              >
                Start Game
              </button>
              ) : (
                <div className='btn-start-game'>
                  Please select the characters first
                </div>
              )}
            </Link>
          ) : (
            'Please wait for God to start'
          )}
        </div>
        <div className='char-checkbox-container'>
          <h2 className='char-title'>Available Characters</h2>
          <div className='char-checkbox'>
            <form onSubmit={handleSubmit}>
              {availableChars.map(character => (
                <div key={character.id} className='char-row'>
                  <Checkbox
                    character={character}
                    checked={selectedChars.some(e => e.id === character.id)}
                    disabled={[1, 2, 4, 5, 6, 8].includes(character.id)}
                    onChange={() => handleCheckboxChange(character)}
                  />
                </div>
              ))}
              {hostId === userId.userId ?(
                <button className='btn-checkbox' type='submit'>
                  Submit
                </button>
              ) : (
                'Please wait for God to start'
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreGame
