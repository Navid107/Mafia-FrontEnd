import React,{useState} from 'react';

import './GameCard.css';
import City from './pictures/City.jpg';
import Dr from './pictures/DrWatson.jpg';
import GodFather from './pictures/GodFather.jpg';
import Detective from './pictures/Kin.jpg';
import Sniper from './pictures/Leon.jpg';
import Mafia from './pictures/mafia.jpeg';
import Matador from './pictures/Matador.jpg';
import Nostradamoos from './pictures/Nostradamoos.jpg';
import S6Constantine from './pictures/S6Constantine.jpg';
import SaulGoodMan from './pictures/SaulGoodman.jpg';

function GameCard({ playerChar, playerName, activeBorderLine, death}) {

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
      name: 'Witch',
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
      image: Nostradamoos
    },
    {
      id: 8,
      name: 'Night Walker',
      side: 'citizen',
      ability: 'Can wake a at night',
      image: S6Constantine
    },
    {
      id: 9,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: 'none',
      image: City
    },
    {
      id: 10,
      name: 'Regular Mafia',
      side: 'mafia',
      ability: 'none',
      image: Mafia
    },
  ];

  const character = characters.find((char) => 
                char.id === (playerChar ? playerChar.id : null));
  return (
    <div>
      {character ? (
        <div className="gameCard-design-container">
          <div className={`gameCard-character-info `}>
            <p>{playerName}</p>
          {death && <div className="death-marker">X</div>}
          <img className="gameCard-character-image" src={character.image}
           alt={character.name}
            />
            <p>{playerChar.name}</p>
          </div>
        </div>
      ) : (
        <div className="character-card">
          <p className="character-name">Character not found</p>
        </div>
      )}
    </div>
  );
}

export default GameCard;