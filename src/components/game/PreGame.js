.pre-game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
    margin: 0 auto;
    color:antiquewhite
  }
  
  /* Title styles */
  .title {
    text-align: center;
    margin: 0 auto;
    font-size: 24px;
    color:antiquewhite; /* Adjust the color as needed */
  }
  
  /* Subtitle styles */
  .subtitle {
    text-align: center;
    margin-bottom: 20px;
    font-size: 13px;
    color:bisque; /* Adjust the color as needed */
  }
  .player-char-container{
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 50px;
    box-shadow: inset 0px 11px 8px -10px #fb0303,
    inset 0px -11px 8px -10px #fb0303; 
  }
  /* Player list styles */
  .players-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60vh;
    font-size: 15px;
  }

  .player-list {
    display: grid;
    grid-template-columns: repeat(6, max-content);
    justify-content: left;
    align-items: center;
    padding: 15px;
    gap: 10px;
    width:100%;
    height: 90%;
    border-radius: 50px;
    box-shadow: inset 0px 11px 8px -10px #0697ff;
  }
  .user-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    box-shadow: 0 0 0 1px rgb(255, 0, 162);
  }
  /* Player avatar styles */
  .user-avatar img {
    margin-left: 10px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }
  

  .btn-start-game {
    background-color: #ff00006b; /* Adjust the button color as needed */
    color: #FFF; /* Adjust the text color as needed */
    margin-left: 300px;
    padding: 10px 50px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }  
  /* Character checkbox container styles */
  .char-checkbox-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    height: 60vh;
   
  }
  
  /* Character title styles */
  .char-title {
    text-align: left;
    margin-bottom: 20px;
    font-size: 24px;
    color:antiquewhite /* Adjust the color as needed */
  }
  
  /* Character checkbox styles */
  .char-checkbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    width:70%;
    height: auto;
    border-radius: 50px;
    box-shadow: inset 0px 11px 8px -10px #06ff0a; 
  }
  
  /* Checkbox label styles */
  .char-checkbox label {
    display: flex;
    align-items: left;
    font-size: 20px;
    margin: 10px;
    color: hsl(70, 42%, 54%); /* Adjust the color as needed */
    cursor: pointer;
  }
  
  /* Checkbox input styles */
  .char-checkbox input[type="checkbox"] {
    margin-right: 5px;
    width: 20px;
    cursor: pointer;
  }
  
  /* Submit button styles */
  .btn-checkbox {
    background-color: #3300ff55; /* Adjust the button color as needed */
    color: #FFF; /* Adjust the text color as needed */
    font-weight: bold;
    padding: 10px 50px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  