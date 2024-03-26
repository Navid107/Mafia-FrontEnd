import React from 'react'
import './GamePlay.css'
import Footer from '../CardUI/Footer'

const GamePlay = () => {
  return (
    <div className='gamePlay-container'>
      <h1 className='header-h1'>The GOD's Tasks</h1>
      <p className='inter-p'>
        These are the steps which GOD/Host need to follow{' '}
      </p>
      <h2>Setup:</h2>
      <p>
        Players can sign up and wait for GOD/Host to get them the Key for the
        lobby. One player can Create a lobby and become GOD. after creating the
        lobby, GOD will receives Key to the lobby then GOD can pass the key to
        the players. Once they have a key, they can join the lobby. After
        everyone joins the looby, GOD can start the game.
      </p>
      <h2>Randomized Characters:</h2>
      <ul>
        <li>Every player receives a random character.</li>
        <li>GOD will receive all the characters and Night Actions Forms.</li>
      </ul>
      <h2>Before the Introduction:</h2>
      <ul>
        <li>Every player can speak in their round.</li>
      </ul>
      <h2>Introduction:</h2>
      <ol>
        <li>
          Introduction is a very short night. Only mafia characters will wake up
          to introduce themselves to each other. After that night, everyone
          wakes up and continues to the first day of the game.
        </li>
        <br />
        <strong>During The Day:</strong>
        <ul>
          <br />
          <li>
            Every player has 30 seconds or 1 minute (Time is changeable to
            longer or shorter) to speak.
          </li>
          <li>
            <strong>Quick Stand: </strong>
            Before each player takes their turn to speak, they can offer a
            "Quick Stand" opportunity, allowing one other player to speak before
            them, with the choice of who receives this opportunity lying solely
            with the player whose turn it is "NOTE:" Quick Stand time is half of
            the regular time and every player can get one Quick Stand every
            round.
          </li>
          <li>
            No one can reveal their identity during the talk phase or they will
            get kicked by GOD.
          </li>
          <li>After everyone talks, GOD will start voting.</li>
          <li>If there's any trial available:</li>
          <ul>
            <li>
              If there's any second voting for eliminating the defended player.
            </li>
          </ul>
          <h4>Everyone sleeps and the night begins.</h4>
        </ul>
        <strong>During The Night:</strong>

        <ul>
          <br />
          <li>
            GOD will call out the players based on the Night Actions Form.
          </li>
          <li>
            After every player wakes up to perform their ability, GOD must check
            mark the player's name on the Night Actions Form.
          </li>
          <li>
            <strong>Example: </strong>
            If Mafia shoots a player, first GOD needs to pick the targeted
            player, then check mark the MafiaShot. If the doctor saves the same
            targeted player, GOD must uncheck mark the MafiaShot.
          </li>
          <li>
            <strong>BodyGuard: </strong>
            When GOD wakes up the BodyGuard, BodyGuard picks a player to watch
            over. If that player was targeted by Mafia, then GOD will give info
            about the shooter to BodyGuard.
          </li>
          <li>
            <strong>El Matador: </strong>
            When El Matador disables someone's ability, click on El Matador's
            card, then on the Night Actions Form, check mark the targeted
            player. El Matador's form does not require a check mark.
          </li>
          <li>
            <strong>Next Day: </strong>
            After everyone uses the ability. GOD can click the Next Day button
            and the game will be updated accordingly to Night Actions Form. This
            will repeat until one team wins.
          </li>
        </ul>
      </ol>

      <h2>Winning:</h2>
      <ul>
        <li>
          <strong>Mafia:</strong> Wins if Mafia has an equal or greater number
          of members compared to the Citizens.
        </li>
        <li>
          <strong>Citizens:</strong> Win if they eliminate all Mafia members.
        </li>
      </ul>
      <h2>Strategy Tips:</h2>
      <ul>
        <li>
          <strong>Mafia:</strong> Work together to avoid suspicion and eliminate
          key players.
        </li>
        <li>
          <strong>Citizens:</strong> Use logic, observation, and intuition to
          identify Mafia members.
        </li>
      </ul>
      <Footer />
    </div>
  )
}

export default GamePlay
