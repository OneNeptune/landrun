import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  let game = null;

  const allModals = Array.from(document.getElementsByTagName('div'));
  const btnListener = (e) => {
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    document.getElementById(e.target.className).className = 'game-modal-open';
  };

  const allButtons = Array.from(document.getElementsByTagName('button'));
  allButtons.forEach(button => button.addEventListener('click', btnListener));

  const newGameBtn = document.getElementById('start-game');

  newGameBtn.addEventListener('click', () => {
    const playerName = document.getElementsByClassName('playerName')[0].value;
    allModals.forEach(modal => { modal.className = 'game-modal'; });
    game = new Game(1, playerName);
  });
});
