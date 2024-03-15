import React from 'react'
import './GameCard.css'
import City from './pictures/City.png'
import Dr from './pictures/DrWatson.png'
import GodFather from './pictures/GodFather.png'
import Detective from './pictures/Kin.jpg'
import Sniper from './pictures/Leon.png'
import Mafia from './pictures/mafia.png'
import Matador from './pictures/Matador.png'
import SaulGoodMan from './pictures/SaulGoodman.png'
import BodyGuard from './pictures/BodyGuard.png'

function GameCard ({ playerChar, playerName, isPlayerActive, style }) {
  const characters = [
    {
      id: 1,
      name: 'The GodFather',
      side: 'mafia',
      ability: 'Identity false',
      image: GodFather
    },
    {
      id: 2,
      name: 'El Matador',
      side: 'mafia',
      ability: 'Can block someone ability',
      image: Matador
    },
    {
      id: 3,
      name: 'SaulGoodMan',
      side: 'mafia',
      ability: 'Can buy a citizen who has no ability',
      image: SaulGoodMan
    },
    {
      id: 4,
      name: 'Doctor',
      side: 'citizen',
      ability: 'Can save someone',
      image: Dr
    },
    {
      id: 5,
      name: 'Detective',
      side: 'citizen',
      ability: 'Can get the identity of a player',
      image: Detective
    },

    {
      id: 6,
      name: 'Sniper',
      side: 'citizen',
      ability: 'can shoot at night',
      image: Sniper
    },

    {
      id: 7,
      name: 'BodyGuard',
      side: 'citizen',
      ability: 'Can protect someone',
      image: BodyGuard
    },
    {
      id: 8,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: 'none',
      image: City
    },
    {
      id: 9,
      name: 'Regular Mafia',
      side: 'mafia',
      ability: 'none',
      image: Mafia
    }
  ]

  const character = characters.find(
    char => char.id === (playerChar ? playerChar.id : null)
  )
  return (
    <div>
      {character ? (
        <div className={`gameCard-design-container ${style ? 'player':
        '' }`}> 
          <div className={`gameCard-character-info
          ${playerName === isPlayerActive ? 'active-player': ''}`}>
            <p>{playerName}</p>
            <img
              className={`gameCard-character-image `}
              src={character.image}
              alt={character.name}
            />
            <span>{playerChar.name}</span>
          </div>
        </div>
      ) : (
        <p className='character-name'>Character not found</p>
      )}
    </div>
  )
}

export default GameCard
