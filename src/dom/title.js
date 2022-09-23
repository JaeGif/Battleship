import { GameState } from '../gameloop.js';
import Players from '../players/player.js';

function gameModeSelect() {
  const pvcButton = document.getElementById('pvc');
  const pvpButton = document.getElementById('multiplayer');
  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');

  pvcButton.addEventListener('click', () => {
    GameState.mode = 'PvC';
    soloForm.style.display = 'flex';
    doubleForm.style.display = 'none';
    doubleForm.reset();
  });
  pvpButton.addEventListener('click', () => {
    GameState.mode = 'PvP';
    soloForm.style.display = 'none';
    doubleForm.style.display = 'flex';
    soloForm.reset();
  });
}

function captureNames() {
  const newGameSolo = document.getElementById('new-game-btn-solo');
  const newGameMultiplayer = document.getElementById(
    'new-game-btn-multiplayer'
  );

  const soloForm = document.getElementById('single-player-name');
  const doubleForm = document.getElementById('multiplayer-name');

  const titleCard = document.getElementById('card-container');
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
    titleCard.style.display = 'none';
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

    const addShips = document.getElementById('placement-page-body-container');
    addShips.style.display = 'flex';
    titleCard.style.display = 'none';
  });
}

function titleScreen() {
  gameModeSelect();
  captureNames();
}
export { titleScreen };
