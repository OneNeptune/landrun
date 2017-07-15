import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  var config = {
    apiKey: "AIzaSyBBNqha-ZUhUFLraH1abUaWjVMCWV8elkM",
    authDomain: "landrun-66dd5.firebaseapp.com",
    databaseURL: "https://landrun-66dd5.firebaseio.com",
    projectId: "landrun-66dd5",
    storageBucket: "scores",
    messagingSenderId: "425401135146"
  };
  firebase.initializeApp(config);

  let game = null;
  let scores = firebase.database().ref("scores")

  const gameOver = (won, playerName, score, completionTime) => {
    const modal = won ? 'won' : 'loss';
    game = null;
    document.getElementById('nameDisplay').textContent = playerName;
    document.getElementById(modal).className = 'game-modal-open';
    if (won) {
      const submitBtn = document.getElementById('submitscore')
      const handleSubmit = () => {
        firebase.database()
          .ref("scores")
          .push()
          .set({
            username: playerName,
            score: (score * 10000)
          });
        submitBtn.removeEventListener('click', handleSubmit);
        submitBtn.textContent = 'Submitted!';
      };
      submitBtn.addEventListener('click', handleSubmit);
      document.getElementById('area').textContent = `${(score * 100).toFixed(2)}% `;
      document.getElementById('time').textContent = ` ${Math.floor(completionTime / 1000)} seconds`;
      scores = firebase.database().ref("scores");
    }
  };

  const allModals = Array.from(document.getElementsByTagName('div'));
  const btnListener = (e) => {
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    document.getElementById(e.target.className).className = 'game-modal-open';
  };

  const allButtons = Array.from(document.getElementsByTagName('button'));
  allButtons.forEach(button => button.addEventListener('click', btnListener));

  const newGameBtns = Array.from(document.getElementsByClassName('start-game'));

  newGameBtns.forEach(btn => btn.addEventListener('click', () => {
    const playerName = document.getElementsByClassName('playerName')[0].value;
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    game = new Game(7, playerName, gameOver);
    })
  );

  const updateScores = () => {

  }

  updateScores();
  scores.orderByChild("score").limitToLast(10).on('value', (snapshot, highscores) => {
    const scoresList = document.getElementById("scorelist");
    let currentScores = document.getElementsByClassName("scores-li")
    for (var i = currentScores.length - 1; i >= 0; i--) {
      currentScores.item(i).remove();
    }
    highscores = [];
      snapshot.forEach((childSnapshot) => {
          highscores.push((childSnapshot.val()));
      });
      highscores = highscores.reverse();
      for (var j = 0; j < highscores.length; j++) {
        let score = document.createElement("li");
        scoresList.appendChild(score);
        score.className = 'scores-li';
        let name = document.createElement('span');
        let scoreText = document.createElement('span');
        name.textContent = `${highscores[j].username}`;
        scoreText.textContent = `${Math.floor(highscores[j].score)}`;
        score.appendChild(name);
        score.appendChild(scoreText);
      }

  });


});
