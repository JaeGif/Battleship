// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects
import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import { GameState, gameOver } from '../gameloop.js';
import { audioHit, audioMiss, audioTitle, audioGame } from './audio.js';

function createBoards(size = 10) {
  const gameMusic = audioGame();
  gameMusic.play();
  const mainGameContainer = document.getElementById('game');
  const mainBody = document.body;
  mainBody.style.backgroundImage = 'none';
  fetchBackgroundImage();

  const placeShipsContainer = document.getElementById(
    'placement-page-body-container'
  );
  mainDisplay();
  createPlayerBoard(size);
  if (GameState.mode === 'PvP') {
    console.log('pvp');
    createOpponentBoard(size);
  } else if (GameState.mode === 'PvC') {
    console.log('pvc');

    createComputerBoard(size);
  }
  placeShipsContainer.style.display = 'none';

  mainGameContainer.style.display = 'flex';
  const turnAnnouncement = document.getElementById('turn');
  turnAnnouncement.textContent = `${turnPlayerName()} start your offensive!`;
}

function createPlayerBoard(size) {
  const playerCoordinateIterator = generateCoordinateIDs(size);
  const playerBoardContainer = document.getElementById('current-player-board');

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'player-grid-elements';
    coordinateGrid.id = `a${playerCoordinateIterator.next().value}`;
    opponentGridListeners(coordinateGrid);
    playerBoardContainer.appendChild(coordinateGrid);
  }
}
function createOpponentBoard(size) {
  const opponentCoordinateIterator = generateCoordinateIDs(size);
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'opponent-grid-elements';
    coordinateGrid.id = `b${opponentCoordinateIterator.next().value}`;
    playerGridListeners(coordinateGrid);

    opponentBoardContainer.appendChild(coordinateGrid);
  }
}
function createComputerBoard(size) {
  const opponentCoordinateIterator = generateCoordinateIDs(size);
  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'opponent-grid-elements';
    coordinateGrid.id = `b${opponentCoordinateIterator.next().value}`;
    opponentBoardContainer.appendChild(coordinateGrid);
  }
}
function* generateCoordinateIDs(size) {
  let currentCoords = [0, 0];
  while (currentCoords[0] <= size - 1 && currentCoords[1] <= size - 1) {
    if (currentCoords[0] === 0 && currentCoords[1] === 0) {
      yield currentCoords;
    }
    currentCoords[1]++;
    if (currentCoords[1] === size) {
      currentCoords[0]++;
      currentCoords[1] = 0;
    }
    yield currentCoords;
  }
}

function playerGridListeners(gridElement) {
  gridElement.addEventListener(
    'click',
    () => {
      let hitOrMiss = '';

      const sfxHit = audioHit();
      const sfxMiss = audioMiss();
      const turnAnnouncement = document.getElementById('turn');

      if (GameState.turn !== 'player') {
        playerGridListeners(gridElement);
        return;
      }
      const player = [...GameState.players][0];
      const opponentBoard = [...GameState.boards][1];
      const coordinates = gridElement.id.slice(1).split(',');
      player.attack(coordinates, opponentBoard);
      if (opponentBoard.allShipsSunk()) {
        GameState.gameOver = true;
        gameOver();
      }
      if (GameState.wasHit === true) {
        sfxHit.play();
        gridElement.classList.add('hit');
        hitOrMiss = 'Its a hit!';
        if (GameState.sunkEventFlag === true) {
          hitOrMiss = `You sunk the ${GameState.justSunk}!`;
          GameState.sunkEventFlag = false;
        }
        GameState.wasHit = false;
      } else {
        sfxMiss.play();
        hitOrMiss = 'Miss...';
        gridElement.classList.add('miss');
      }
      if (GameState.mode === 'PvP') {
        GameState.turn = 'opponent';
        turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
      } else if (GameState.mode === 'PvC') {
        GameState.turn = 'computer';
      }
    },
    { once: true }
  );
}

function opponentGridListeners(gridElement) {
  gridElement.addEventListener(
    'click',
    () => {
      const sfxHit = audioHit();
      const sfxMiss = audioMiss();
      let hitOrMiss = '';
      const turnAnnouncement = document.getElementById('turn');

      if (GameState.turn === 'player') {
        opponentGridListeners(gridElement);
        return;
      }
      const opponent = [...GameState.players][1];
      const playerBoard = [...GameState.boards][0];
      const coordinates = gridElement.id.slice(1).split(',');
      if (GameState.mode === 'PvP') {
        opponent.attack(coordinates, playerBoard);

        if (GameState.wasHit === true) {
          sfxHit.play();
          gridElement.classList.add('hit');
          hitOrMiss = 'Its a hit!';
          if (GameState.sunkEventFlag === true) {
            hitOrMiss = `You sunk the ${GameState.justSunk}!`;
            GameState.sunkEventFlag = false;
          }
          GameState.wasHit = false;
        } else {
          sfxMiss.play();
          gridElement.classList.add('miss');
          hitOrMiss = 'Miss...';
        }
      }
      if (playerBoard.allShipsSunk()) {
        GameState.gameOver = true;

        gameOver();
      }
      GameState.turn = 'player';
      turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
    },
    { once: true }
  );
}

function turnPlayerName() {
  const playerBoard = [...GameState.boards][0];
  const computerBoard = [...GameState.boards][1];

  switch (GameState.turn) {
    case 'player':
      if (playerBoard.name === '') {
        return 'Player 1';
      }
      return playerBoard.name;
    case 'opponent':
      if (computerBoard.name === '') {
        return 'Player 2';
      }
      return computerBoard.name;
    case 'computer':
      return 'Computer';
  }
}

function gameOverScreen() {
  const modalContainer = document.getElementById('game-over-modal');
  const winnerNameP = document.getElementById('winner-name');
  const numShipsRemaining = document.getElementById('num-remaining');
  const newGameButton = document.getElementsByClassName('replay-btn');
  fetchVictoryImage();
  let numShips = 0;
  let winner = '';
  if ([...GameState.boards][0].allShipsSunk()) {
    winner = [...GameState.players][1].name;
    if (winner === '') {
      winner = 'Player 1';
    }
    numShips = 5 - [...GameState.boards][1].sunkShips.length;
  } else {
    if (winner === '') {
      winner = 'Player 2';
    }
    winner = [...GameState.players][0].name;
    numShips = 5 - [...GameState.boards][0].sunkShips.length;
  }

  winnerNameP.textContent = `${winner} Won!`;
  numShipsRemaining.textContent = `${winner} had ${numShips} left!`;
  modalContainer.style.display = 'flex';

  newGameButton.addEventListener('click', () => {
    console.log('Clicked New Game');
  });
}

function mainDisplay() {
  const playerBoard = [...GameState.boards][0];
  const computerBoard = [...GameState.boards][1];
  const playerName = document.getElementById('player-name');
  const opponentName = document.getElementById('player-2-name');

  if (playerBoard.name === '') {
    playerName.textContent = 'Player 1';
  } else {
    playerName.textContent = `${playerBoard.name}`;
  }
  if (computerBoard.name === '') {
    opponentName.textContent = 'Player 2';
  } else {
    opponentName.textContent = `${computerBoard.name}`;
  }
}

async function fetchBackgroundImage() {
  const gifId = 'XPlcxsFs8BIKk';
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats`,
    { mode: 'cors' }
  );
  const parsedData = await response.json();
  const body = document.body;
  body.style.backgroundImage = `url(${parsedData.data.images.original.url})`;
  return;
}

async function fetchVictoryImage() {
  const gifId = 'o0eOCNkn7cSD6';
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/${gifId}?api_key=XQjjxBQQYTlh7yBaVu1JXQ6YbH5dno3B&s=cats`,
    { mode: 'cors' }
  );
  const parsedData = await response.json();
  const victoryImg = document.getElementById('gg-img');
  victoryImg.src = parsedData.data.images.original.url;
  return;
}

export { createBoards, gameOverScreen };
