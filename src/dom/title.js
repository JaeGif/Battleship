import { GameState } from '../gameloop.js';
import Players from '../players/player.js';
import { newGame } from '../gameloop.js';
import Gameboards from '../objects/gameboard.js';
import { audioTitle } from './audio.js';

function gameModeSelect() {
  const titleMusic = audioTitle();
  titleMusic.play();
  const menu = document.getElementById('menu');
  menu.style.display = 'flex';

  const pvcButton = document.getElementById('pvc');
  const pvpButton = document.getElementById('multiplayer');
  const optionsButton = document.getElementById('options');
  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');
  const optionsBack = document.getElementById('return-to-menu');
  pvcButton.addEventListener('click', () => {
    GameState.mode = 'PvC';
    soloForm.style.display = 'flex';
    doubleForm.style.display = 'none';
  });
  pvpButton.addEventListener('click', () => {
    GameState.mode = 'PvP';
    soloForm.style.display = 'none';
    doubleForm.style.display = 'flex';
  });
  optionsButton.addEventListener('click', () => {
    const optionsMenu = document.getElementById('options-menu');
    const credits = document.getElementById('credits');
    const creditScroll = document.getElementById('credits-scroll');
    credits.addEventListener('click', () => {
      creditScroll.style.display = 'flex';
    });
    menu.style.display = 'none';
    optionsMenu.style.display = 'flex';
    optionsBack.addEventListener('click', () => {
      creditScroll.style.display = 'none';
      optionsMenu.style.display = 'none';
      menu.style.display = 'flex';
    });
  });

  captureNames();
}

function captureNames() {
  const newGameSolo = document.getElementById('new-game-btn-solo');
  const newGameMultiplayer = document.getElementById(
    'new-game-btn-multiplayer'
  );

  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');

  const menu = document.getElementById('menu');
  const addShips = document.getElementById('placement-page-body-container');

  const soloPlayerName = document.getElementById('single-player-input');
  const player1Name = document.getElementById('player1-input');
  const player2Name = document.getElementById('player2-input');

  newGameSolo.addEventListener('click', () => {
    let humanPlayer = new Players(soloPlayerName.value);
    let computerPlayer = new Players('Computer');
    GameState.players.push(humanPlayer);
    GameState.players.push(computerPlayer);

    const playerBoard = new Gameboards(soloPlayerName.value);
    const opponentBoard = new Gameboards('Computer');

    GameState.boards.push(playerBoard);
    GameState.boards.push(opponentBoard);

    addShips.style.display = 'flex';
    menu.style.display = 'none';
    newGame();
  });
  newGameMultiplayer.addEventListener('click', () => {
    let player1 = new Players(player1Name.value);
    let player2 = new Players(player2Name.value);

    GameState.players.push(player1);
    GameState.players.push(player2);

    const playerBoard = new Gameboards(player1Name.value);
    const opponentBoard = new Gameboards(player2Name.value);

    GameState.boards.push(playerBoard);
    GameState.boards.push(opponentBoard);

    addShips.style.display = 'flex';
    menu.style.display = 'none';
    newGame();
  });
}

function titleScreen() {
  const playButton = document.getElementById('play');
  const titleScreen = document.getElementById('play-card');
  playButton.addEventListener('click', () => {
    titleScreen.style.display = 'none';
    gameModeSelect();
  });
}
export { titleScreen };
