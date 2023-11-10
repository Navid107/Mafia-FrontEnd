import React, { useState } from 'react';

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

function GameCard({ playerChar, death}) {
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
      name: 'Sniper',
      side: 'citizen',
      ability: 'can shoot at night',
      image: Sniper
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
      name: 'Doctor',
      side: 'citizen',
      ability: 'Can save someone',
      image: Dr
    },
    {
      id: 7,
      name: 'BodyGuard',
      side: 'citizen',
      ability: 'Can protect someone',
      image: City
    },
    {
      id: 8,
      name: 'Night Walker',
      side: 'citizen',
      ability: 'Can wake a at night',
      image: City
    },
    {
      id: 9,
      name: 'Regular Mafia',
      side: 'mafia',
      ability: 'none',
      image: Mafia
    },
    {
      id: 10,
      name: 'Regular Citizen',
      side: 'citizen',
      ability: 'none',
      image: City
    },
  ];

  // Find the character based on playerChar
  const character = characters.find((char) => char.id === playerChar);
  
  return (
    <div>
      {character ? (
        <div className={`character-card ${death ? 'dead' : ''}`}>
          {death && <div className="death-marker">X</div>}
          <img className="character-image" src={character.image} alt={character.name} />
          <div className="character-info">
            <h3 className="character-name">{character.name}</h3>
            <p className="character-ability">Ability: {character.ability}</p>
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
