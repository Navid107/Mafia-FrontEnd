import React from 'react'
import GameCard from '../CardUI/GameCard.js'
function Chars () {
  const characters = [
    {
      id: 1,
      name: 'The GodFather'
    },
    {
      id: 2,
      name: 'El Matador'
    },
    {
      id: 3,
      name: 'SaulGoodMan'
    },
    {
      id: 4,
      name: 'Doctor'
    },
    {
      id: 5,
      name: 'Detective'
    },

    {
      id: 6,
      name: 'Sniper'
    },
    {
      id: 7,
      name: 'BodyGuard'
    },
    {
      id: 8,
      name: 'Regular Citizen'
    },
    {
      id: 9,
      name: 'Regular Mafia'
    }
  ]
  return (
    <div className='host-container-card'>
      <div className='host-player-card'>
        <p className='host-sides-mafia'>MAFIA</p>
        <div className='host-character-container'>
          {characters
            .filter(e => [1, 2, 3, 9].includes(e.id))
            .map((e, index) => (
              <div key={index} className='host-mafia-container'>
                <GameCard playerChar={e} />
              </div>
            ))}
        </div>

        <p className='host-sides-citizen'>CITIZEN</p>
        <div className='host-character-container'>
          {characters
            .filter(e => ![1, 2, 3, 9].includes(e.id))
            .map((e, index) => (
              <div key={index} className='host-citizen-container'>
                <GameCard playerChar={e} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Chars
