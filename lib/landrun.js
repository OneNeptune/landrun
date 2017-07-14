import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  let game = null;

  const gameOver = (won, playerName) => {
    const modal = won ? 'won' : 'loss';
    game = null;
    document.getElementById('nameDisplay').textContent = playerName;
    document.getElementById(modal).className = 'game-modal-open';
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
});
