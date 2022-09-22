// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects
import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import { GameState, gameOver } from '../gameloop.js';

function createBoards(size = 10) {
  createPlayerBoard(size);
  if (GameState.mode === 'PvP') {
    createOpponentBoard(size);
  } else if (GameState.mode === 'PvC') {
    createComputerBoard(size);
  }
}

function createPlayerBoard(size) {
  const playerCoordinateIterator = generateCoordinateIDs(size);
  const playerBoardContainer = document.getElementById('current-player-board');

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.className = 'player-grid-elements';
    coordinateGrid.id = `a${playerCoordinateIterator.next().value}`;
    playerGridListeners(coordinateGrid);
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
    opponentGridListeners(coordinateGrid);
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
      if (GameState.turn !== 'player') {
        playerGridListeners(gridElement);
        return;
      }
      const player = GameState.players[1];
      const enemyBoard = GameState.boards[1];
      const coordinates = gridElement.id.slice(1).split(',');
      player.attack(coordinates, enemyBoard);
      if (enemyBoard.allShipsSunk()) {
        GameState.gameOver = true;

        gameOver();
      }
      if (GameState.wasHit === true) {
        gridElement.classList.add('hit');

        GameState.wasHit = false;
      } else {
        gridElement.classList.add('miss');
      }
      if (GameState.mode === 'PvP') {
        GameState.turn = 'opponent';
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
      if (GameState.turn === 'player') {
        opponentGridListeners(gridElement);
        return;
      }
      const opponent = GameState.players[0];
      const enemyBoard = GameState.boards[0];
      const coordinates = gridElement.id.slice(1).split(',');
      if (GameState.mode === 'PvP') {
        opponent.attack(coordinates, enemyBoard);

        if (GameState.wasHit === true) {
          gridElement.classList.add('hit');
          GameState.wasHit = false;
        } else {
          gridElement.classList.add('miss');
        }
      }
      if (enemyBoard.allShipsSunk()) {
        GameState.gameOver = true;

        gameOver();
      }
      GameState.turn = 'player';
    },
    { once: true }
  );
}

function gameOverScreen() {
  const winnerNameP = document.getElementById('winner-name');
  const numShipsRemaining = document.getElementById('num-remaining');
  let numShips = 0;
  let winner = '';
  if (GameState.boards[0].allShipsSunk()) {
    winner = GameState.players[1].name;
    numShips = 5 - GameState.boards[0].sunkShips.length;
  } else {
    winner = GameState.players[0].name;
    numShips = 5 - GameState.boards[1].sunkShips.length;
  }

  winnerNameP.textContent = `${winner} Won!`;
  numShipsRemaining.textContent = `${winner} had ${numShips} left!`;
}

export { createBoards, gameOverScreen };
