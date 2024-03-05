import React from 'react'
import './DetailsUI.css'
const DetailUI = ({ char, onClose }) => {
  console.log('charrrr', char)
  return (
    <div
      className={`detailUI-container ${char.side === 'Mafia' ? 'mafia' : ''}`}
    >
      <div className='char-layout'>
        <div className='detailUI-image'>
          <img src={char.image} alt={char.name} />
        </div>
        <div className='detailUI-info'>
          <p>
            Name: <span>{char.name}</span>
          </p>

          <p>
            Side: <span>{char.side}</span>
          </p>

          <p>
            Ability: <span>{char.description}</span>
          </p>
        </div>
      </div>
      <button className='detailUI-btn' onClick={onClose}>
        Close
      </button>
    </div>
  )
}
export default DetailUI
