import React from 'react'
import './Rules.css'
import Footer from '../CardUI/Footer'
const MafiaRules = () => {
  return (
    <div className='mafia-rules-container'>
      <h1 className='header-h1'>The Rules Of The Game</h1>

      <h2>Overview:</h2>
      <p>
        Mafia is a game of strategy, deduction, and deception. Players are
        assigned roles secretly and must use their wits to eliminate the
        opposing team while preserving their own.
      </p>

      <h2>Players:</h2>
      <ul>
        <li>Recommended for 6 or more players.</li>
        <li>Players are assigned one of two groups: Mafia or Citizen.</li>
      </ul>

      <h2>Characters:</h2>
      <ul>
        <li>
          <strong>The GodFather:</strong> Conceals their true identity from the
          Detective and wearing a vest.
        </li>
        <li>
          <strong>El Matador:</strong> Can disable abilities.
        </li>
        <li>
          <strong>Saul GoodMan:</strong> Purchases citizens without abilities.
        </li>
        <li>
          <strong>Mafia:</strong> Does not have ability.
        </li>
      </ul>
      <ul>
        <li>
          <strong>Detective:</strong> Involves identifying a member.
        </li>
        <li>
          <strong>Doctor:</strong> Saves a member each night.
        </li>
        <li>
          <strong>Sniper:</strong> Can shot and eliminate mafia members.
        </li>
        <li>
          <strong>BodyGuard:</strong> Once receives notification of their
          protected player's assailant.
        </li>
        <li>
          <strong>Citizens:</strong> Does not have ability.
        </li>
      </ul>

      <h2>Gameplay:</h2>
      <ol>
        <li>
          <strong>Night Phase:</strong>
          <ul>
            <li>
              Mafia members secretly choose a player to eliminate or Saul
              goodman could use his ability.
            </li>
            <li>
              <strong>El Matador:</strong> has the ability to disable a player's
              special ability for the night. If successful, the targeted player
              will be unable to use their ability during that night phase.
            </li>

            <li>
              <strong>Saul GoodMan:</strong> has the ability to buy a regular
              Citizen each night( if mafia loses a member and don't shot).
            </li>
            <li>
              <strong>Detective:</strong> chooses a player to investigate (if
              they are still alive).
            </li>
            <li>
              <strong>Doctor:</strong> chooses a player to protect (if they are
              still alive).
            </li>
            <li>
              <strong>Sniper:</strong> selects a target to eliminate. If the
              target is a Mafia member, that player will be eliminated. However,
              if the Sniper mistakenly targets a Citizen, the Sniper will be
              eliminated instead.
            </li>
            <li>
              <strong>BodyGuard:</strong> With nightly protection ability,
              selects a player to safeguard; upon Mafia elimination, the
              Bodyguard receives notification from a divine source regarding the
              assailant, adding intrigue and strategic depth to gameplay
              dynamics.
            </li>
          </ul>
        </li>
        <li>
          <strong>Day Phase:</strong>
          <ul>
            <li>Players discuss and debate to identify Mafia members.</li>
            <li>
              A vote is held to eliminate a player suspected of being Mafia.
            </li>
            <li>
              The player with the most votes is eliminated (or if it's a tie
              then head/face between 2 players).
            </li>
            <li>
              If there are 9 players in the game and the voting starts, everyone
              can vote multiples except the person in accusation. From 8 votes a
              player needs 5+ (more than half lf players) to get into court and
              defend him/herself. The players who received court will defend
              them self individually and after everyone goes to a nap and God
              will read the defended players names and every player can vote
              once and the most voted player will be eliminate from the game.
            </li>
          </ul>
        </li>
      </ol>

      <h2>Winning:</h2>
      <ul>
        <li>
          <strong>Mafia:</strong> Win if Mafia has an equal or greater number of
          members compared to the Citizens.
        </li>
        <li>
          <strong>Citizens:</strong> Win if they eliminate all Mafia members.
        </li>
      </ul>
      <h2>Strategy Tips:</h2>
      <ul>
        <li>
          Mafia: Work together to avoid suspicion and eliminate key players.
        </li>
        <li>
          Citizens: Use logic, observation, and intuition to identify Mafia
          members.
        </li>
        <li>
          Detective: Gather information and use it wisely without revealing your
          role.
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default MafiaRules
