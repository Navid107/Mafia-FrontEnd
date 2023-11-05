import City from './pictures/city.jpg';
import Dr from './pictures/DrWatson.jpg';
import GodFather from './pictures/GodFather.jpg';
import Detective from './pictures/Kin.jpg';
import Sniper from './pictures/Leon.jpg';
import Mafia from './pictures/Mafia.jpeg';
import Matador from './pictures/Matador.jpg';
import Nostradamoos from './pictures/Nostradamoos.jpg';
import S6Constantine from './pictures/S6Constantine.jpg';
import SaulGoodMan from './pictures/SaulGoodman.jpg'

function CharList ({character}){
    let characters = [
        {
          name: 'The GodFather',
          side: 'mafia',
          ability: 'Identity false',
          image: GodFather
        },
        {
          name: 'Matador',
          side: 'mafia',
          ability: 'Can block someone ability',
          image: Matador
        },
        {
          name: 'SaulGoodMan',
          side: 'mafia',
          ability: 'Can buy citizen who has no ability',
          image: SaulGoodMan,
        },
        {
          name: 'Regular Mafia',
          side: 'mafia',
          ability: 'none',
          image: Mafia
        },
        {
          name: 'Leon',
          side: 'citizen',
          ability: 'can shot at night',
          image: Sniper
        },
        {
          name: 'Detective',
          side: 'citizen',
          ability: 'Can get identity of a player',
          image: Detective
        },
        {
          name: 'Doctor',
          side: 'citizen',
          ability: 'Can save someone',
          image: Dr
        },
        {
          name: 'Regular Citizen',
          side: 'citizen',
          ability: 'none',
          image: City
        },
     
      ];
    return (
        <div className="character-card">
        <img
          className="character-image"
          src={`data:${character.image.contentType};base64,${arrayBufferToBase64(character.image.data.data)}`}
          alt={character.name}
        />
        <div className="character-info">
          <h3 className="character-name">{character.name}</h3>
          <p className="character-ability">Ability: {character.ability}</p>
        </div>
      </div>
    );
}