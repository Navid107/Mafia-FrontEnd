import React, { useState } from 'react'
import './Char.css'
import GameCard from '../CardUI/GameCard.js'
import Details from '../CardUI/Details.js'
import DetailsUI from '../CardUI/DetailsUI.js'
function Chars () {
  const [selectedChar, setSelectedChar] = useState(null)

  const handleCloseDetail = () => {
    setSelectedChar(null)
  }
  const openDetail = char => {
    setSelectedChar(char)
  }

  return (
    <div className='cards-container'>
      {!selectedChar ? (
        <div className='cards-wrapper'>
          <p className='mafia'>All The Mafia Characters </p>
          <div className='character-container'>
            {Details.filter(e => [1, 2, 3, 9].includes(e.id)).map(
              (e, index) => (
                <div
                  key={index}
                  className='mafia-container'
                  onClick={() => openDetail(e)}
                >
                  <GameCard playerChar={e} isPlayerActive={null} />
                </div>
              )
            )}
          </div>
          <p className='citizen'>All The Citizen Characters</p>
          <div className='character-container'>
            {Details.filter(e => ![1, 2, 3, 9].includes(e.id)).map(
              (e, index) => (
                <div
                  key={index}
                  className='citizen-container'
                  onClick={() => openDetail(e)}
                >
                  <GameCard playerChar={e} isPlayerActive={null} />
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <DetailsUI char={selectedChar} onClose={handleCloseDetail} />
      )}
    </div>
  )
}

export default Chars
