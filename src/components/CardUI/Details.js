import GodFather from './pictures/GodFather.png'
import Matador from './pictures/Matador.png'
import SaulGoodMan from './pictures/SaulGoodman.png'
import Mafia from './pictures/mafia.png'
import Dr from './pictures/DrWatson.png'
import Detective from './pictures/Kin.jpg'
import Sniper from './pictures/Leon.png'
import BodyGuard from './pictures/BodyGuard.png'
import City from './pictures/City.png'

const details = [
  {
    id: 1,
    name: 'GodFather',
    side: 'Mafia',
    image: GodFather,
    description:
      'The Godfather, a key role in the game, keeps their identity hidden from detectives and possesses a armor vest against sniper, requiring players to employ deduction and strategy to reveal their true identity despite their added protection .'
  },
  {
    id: 2,
    name: 'El Matador',
    side: 'Mafia',
    image: Matador,
    description:
      "El Matador possesses the ability to disable another player's ability for a night, restricting their usage until the next night, introducing an element of disruption and strategy into the game."
  },
  {
    id: 3,
    name: 'Saul Goodman',
    side: 'Mafia',
    image: SaulGoodMan,
    description:
      'Saul Goodman, when activated by the Mafia after losing a member, has the unique ability to recruit a regular citizen into their ranks, providing a strategic opportunity for the Mafia to bolster their numbers without resorting to elimination.'
  },
  {
    id: 9,
    name: 'Regular Mafia',
    side: 'Mafia',
    image: Mafia,
    description:
      'Regular Mafia members lack any special abilities, serving as basic operatives within the Mafia faction, relying solely on collective strategy and cunning to achieve their goals during the game.'
  },
  {
    id: 4,
    name: 'Dr. Watson',
    side: 'Citizen',
    image: Dr,
    description:
      'Dr. Watson, a citizen role, has the ability to protect themselves once during the game, while being able to protect other players unlimited times, adding a strategic dynamic to gameplay as they balance self-preservation with aiding fellow participants.'
  },
  {
    id: 5,
    name: 'Detective',
    side: 'Citizen',
    image: Detective,
    description:
      "The Detective, pivotal in social deduction games, has the ability to investigate players' roles discreetly, aiding in the identification of Mafia members and shaping strategic decisions for the Innocents."
  },
  {
    id: 6,
    name: 'Sniper',
    side: 'Citizen',
    image: Sniper,
    description:
      'The Sniper, able to shoot nightly, faces a dilemma: killing a citizen results in their own demise, while targeting Mafia members, excluding the Godfather who withstands two shots, eliminates them, introducing a strategic risk-reward dynamic into gameplay.'
  },
  {
    id: 7,
    name: 'BodyGuard',
    side: 'Citizen',
    image: BodyGuard,
    description:
      'The Bodyguard, with nightly protection ability, selects a player to safeguard; upon Mafia elimination, the Bodyguard receives notification from GOD regarding the assailant, adding intrigue and strategic depth to gameplay dynamics.'
  },
  {
    id: 8,
    name: 'Regular Citizen',
    side: 'Citizen',
    image: City,
    description:
      'Regular Citizens lack special abilities, focusing on identifying Mafia members; however, they can be recruited by Saul Goodman, transforming them into standard Mafia operatives and altering the balance of power in the game.'
  }
]

export default details
