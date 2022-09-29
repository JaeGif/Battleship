// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects

import { GameState, gameOver } from '../gameloop.js';
import { audioHit, audioMiss, audioTitle, audioGame } from './audio.js';

function createBoards(size = 10) {
  fetchVictoryImage();

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
    createOpponentBoard(size);
  } else if (GameState.mode === 'PvC') {
    displayPlayerShips();
    createOpponentBoard(size);
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
        turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;

        computerGameLoop();
      }
    },
    { once: true }
  );
}
function sleep() {
  const ms = Math.random() * 1500;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function computerGameLoop() {
  let hitOrMiss = '';
  const turnAnnouncement = document.getElementById('turn');
  await sleep();
  const sfxHit = audioHit();
  const sfxMiss = audioMiss();
  const computer = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  computer.cpuAttackPattern(playerBoard);
  let attackedPosition =
    [...GameState.cpuAttacked][0][0] + ',' + [...GameState.cpuAttacked][0][1];
  [...GameState.cpuAttacked] = [];

  const attackedSpace = document.getElementById(`a${attackedPosition}`);

  if (playerBoard.allShipsSunk()) {
    GameState.gameOver = true;
    gameOver();
  }
  if (GameState.wasHit === true) {
    sfxHit.play();
    attackedSpace.classList.remove('reveal');
    attackedSpace.classList.add('hit');
    hitOrMiss = 'Its a hit!';
    if (GameState.sunkEventFlag === true) {
      hitOrMiss = `Computer sunk the ${GameState.justSunk}!`;
      GameState.sunkEventFlag = false;
    }
    GameState.wasHit = false;
  } else {
    sfxMiss.play();
    hitOrMiss = 'Miss...';
    attackedSpace.classList.add('miss');
  }

  GameState.turn = 'player';
  turnAnnouncement.textContent = `${hitOrMiss} It's ${turnPlayerName()}'s Turn!`;
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
  const newGameButton = document.getElementsByClassName('replay-btn')[0];
  let numShips = 0;
  let winner;
  if ([...GameState.boards][0].allShipsSunk()) {
    winner = [...GameState.players][1].name;

    numShips = 5 - [...GameState.boards][1].sunkShips.length;
  } else {
    winner = [...GameState.players][0].name;

    numShips = 5 - [...GameState.boards][0].sunkShips.length;
  }

  winnerNameP.textContent = `${winner} Won!`;
  numShipsRemaining.textContent = `${winner} had ${numShips} left!`;
  modalContainer.style.display = 'flex';

  newGameButton.addEventListener('click', () => {
    location.reload();
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
function displayPlayerShips() {
  let occupiedSpace = '';

  const playerBoard = [...GameState.boards][0];
  for (let i = 0; i < playerBoard.shipCoordinates.length; i++) {
    for (let j = 0; j < playerBoard.shipCoordinates[i].location.length; j++) {
      occupiedSpace =
        playerBoard.shipCoordinates[i].location[j][0] +
        ',' +
        playerBoard.shipCoordinates[i].location[j][1];
      const gridElement = document.getElementById(`a${occupiedSpace}`);
      gridElement.classList.add('reveal');
    }
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

export { createBoards, gameOverScreen, generateCoordinateIDs };
