import React from 'react'
import './Rules.css'
const MafiaRules = () => {
  return (
    <div className='mafia-rules-container'>
      <h1 className='header-h1'>Mafia Game Rules</h1>

      <h2>Overview:</h2>
      <p>
        Mafia is a game of strategy, deduction, and deception. Players are
        assigned roles secretly and must use their wits to eliminate the
        opposing team while preserving their own.
      </p>

      <h2>Players:</h2>
      <ul>
        <li>Recommended for 6 or more players.</li>
        <li>
          Players are assigned one of several roles: Mafia, Detective, Doctor,
          and Citizens (or Villagers).
        </li>
      </ul>

      <h2>Objective:</h2>
      <ul>
        <li>
          <strong>Mafia:</strong> Eliminate all other players.
        </li>
        <li>
          <strong>El Matador:</strong> Disables abilities.
        </li>
        <li>
          <strong>Saul GoodMan:</strong> Buys the citizen with you abilities.
        </li>
      </ul>
      <ul>
        <li>
          <strong>Citizens:</strong> Eliminate all Mafia members and other
          threats.
        </li>
        <li>
          <strong>Detective:</strong> Identify the Mafia members.
        </li>
        <li>
          <strong>Doctor:</strong> Saves members.
        </li>
        <li>
          <strong>Sniper:</strong> Can shot and eliminate mafia members.
        </li>
      </ul>

      <h2>Setup:</h2>
      <ol>
        <li>
          <strong>Roles Distribution:</strong> Assign roles to players secretly.
        </li>
        <li>
          <strong>Night Phase:</strong> The game alternates between night and
          day phases.
        </li>
      </ol>

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
              El Matador has the ability to disable a player's special ability
              for the night. If successful, the targeted player will be unable
              to use their ability during that night phase.
            </li>

            <li>
              Saul Goodman has the ability to buy a regular Citizen each night(
              if mafia loses a member and don't shot).
            </li>
            <li>
              Detective chooses a player to investigate (if they are still
              alive).
            </li>
            <li>
              Doctor chooses a player to protect (if they are still alive).
            </li>
            <li>
              Sniper selects a target to eliminate. If the target is a Mafia
              member, that player will be eliminated. However, if the Sniper
              mistakenly targets a Citizen, the Sniper will be eliminated
              instead.
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
          <strong>Mafia:</strong> Win if they eliminate all other players.
        </li>
        <li>
          <strong>Citizens:</strong> Win if they eliminate all Mafia members.
        </li>
        <li>
          <strong>Detective:</strong> Wins with the Citizens if they survive and
          the Mafia is eliminated.
        </li>
      </ul>

      <h2>Special Roles (Optional):</h2>
      <ul>
        <li>Godfather: Immune to Detective investigations.</li>
        <li>
          Mafia Doctor: Can protect Mafia members but cannot protect the same
          member consecutively.
        </li>
      </ul>

      <h2>Variations:</h2>
      <p>
        There are many variations and additional roles that can be added to the
        game, such as multiple Mafia factions, additional special roles, or
        special abilities for certain roles.
      </p>

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

      <p>
        The game continues with alternating night and day phases until one team
        achieves its objective.
      </p>
    </div>
  )
}

export default MafiaRules
