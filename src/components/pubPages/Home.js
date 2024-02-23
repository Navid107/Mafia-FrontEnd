import React from 'react'
import './HomePage.css'

const Home = () => {
  return (
    <div className='home-container'>
      <header className='main-header'>
        <h1>Welcome to Mafia Mastermind</h1>
        <p>Your Ultimate Mafia Game Companion</p>
      </header>

      <section className='about-section'>
        <h2>About the Project:</h2>
        <p>
          This Mafia game app is a personal challenge and a labor of love. As an
          individual project, I've taken on the challenge of creating a unique
          and immersive experience for Mafia game enthusiasts.
        </p>
      </section>

      <section className='why-section'>
        <h2>Why Mafia Mastermind?</h2>
        <p>
          Tired of fumbling with cards and player management during Mafia game
          nights with friends and family? Look no further. Mafia Mastermind is
          designed to streamline your Mafia game sessions, ensuring a seamless
          and enjoyable experience for all players.
        </p>
      </section>

      <section className='features-section'>
        <h2>Features:</h2>
        <ul>
          <li>Effortless Game Management</li>
          <li>Customizable Settings</li>
          <li>User-Friendly Interface</li>
        </ul>
      </section>

      <section className='future-section'>
        <h2>What's in Store:</h2>
        <p>
          This app is a work in progress, and I'm committed to enhancing your
          Mafia gaming experience. Expect regular updates with exciting new
          features, game modes, and improvements to keep the game fresh and
          engaging.
        </p>
      </section>

      <section className='community-section'>
        <h2>Join the Mafia Mastermind Community:</h2>
        <p>
          Follow Mafia Mastermind on social media to stay updated on the latest
          news, events, and sneak peeks of upcoming features. Connect with
          fellow Mafia enthusiasts and become part of the growing community.
        </p>
      </section>

      <section className='get-started-section'>
        <h2>Ready to Unleash the Mafia Mastermind in You?</h2>
        <p>
          Get started now! Sign up, dive into the world of Mafia Mastermind, and
          elevate your Mafia game nights to a whole new level.
        </p>
      </section>

      <footer className='main-footer'>
        <p>
          <strong>Note:</strong> Mafia Mastermind is a solo project driven by a
          passion for Mafia games. Your feedback is invaluable in shaping the
          future of this app. Together, let's make Mafia game nights
          unforgettable!
        </p>
      </footer>
    </div>
  )
}

export default Home
