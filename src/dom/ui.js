// displays gameboards based on whose turn it is.
// generates gameboards, and on click effects
import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import { GameState } from '../gameloop.js';

function createBoards(size = 10) {
  createPlayerBoard(size);
  createOpponentBoard(size);
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
      if (GameState.turn === 'opponent') {
        playerGridListeners(gridElement);
        return;
      }
      const player = GameState.players[1];
      const enemyBoard = GameState.boards[0];
      const coordinates = gridElement.id.slice(1).split(',');
      player.attack(coordinates, enemyBoard);
      if (GameState.wasHit === true) {
        gridElement.classList.add('hit');
        GameState.wasHit = false;
      } else {
        gridElement.classList.add('miss');
      }
      GameState.turn = 'opponent';
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
      const enemyBoard = GameState.boards[1];
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
      GameState.turn = 'player';
    },
    { once: true }
  );
}

export { createBoards };
