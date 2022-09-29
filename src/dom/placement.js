import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';
import { generateCoordinateIDs, createBoards } from './ui.js';

class UiState {
  static axis = 'x';
  static currentShip = [];
  static currentShipIndex = 0;
  static currentPlacementBoard = 'player';
}

function dynamicallyGenerateBoard(size = 10) {
  const coordinateIterator = generateCoordinateIDs(size);
  const boardContainer = document.getElementById('placement-board');

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.id = `${coordinateIterator.next().value}`;
    addDragDropListener(coordinateGrid);
    boardContainer.appendChild(coordinateGrid);
  }
}
function addDragDropListener(target) {
  target.addEventListener('dragover', (e) => {
    e.preventDefault();
    let xTargetId = target.id;
    xTargetId = xTargetId.split(',');

    if (UiState.axis === 'x') {
      for (
        let i = 0;
        i < UiState.currentShip[UiState.currentShipIndex].shipObj.length;
        i++
      ) {
        let x = xTargetId[0];
        let y = parseInt(xTargetId[1]) + i;
        let coordId = x + ',' + y;
        let coveredCoordinate = document.getElementById(`${coordId}`);
      } //replace with less thann ship length
    }
  });
  target.addEventListener('dragleave', (e) => {
    let xTargetId = target.id;
    xTargetId = xTargetId.split(',');
    if (UiState.axis === 'x') {
      for (
        let i = 0;
        i < UiState.currentShip[UiState.currentShipIndex].shipObj.length;
        i++
      ) {
        let x = xTargetId[0];
        let y = parseInt(xTargetId[1]) + i;
        let coordId = x + ',' + y;
        let coveredCoordinate = document.getElementById(`${coordId}`);
      } //replace with less thann ship length
    }
  });

  target.addEventListener('drop', (e) => {
    e.preventDefault();

    let xTargetId = target.id;
    xTargetId = xTargetId.split(',');
    let finalArray = [];

    if (
      // check out of bounds
      (UiState.axis === 'x' &&
        parseInt(xTargetId[1]) +
          UiState.currentShip[UiState.currentShipIndex].shipObj.length -
          1 >
          9) ||
      (UiState.axis === 'y' &&
        parseInt(xTargetId[0]) +
          UiState.currentShip[UiState.currentShipIndex].shipObj.length -
          1 >
          9)
    ) {
      return false;
    }
    if (UiState.axis === 'x') {
      for (
        let i = 0;
        i < UiState.currentShip[UiState.currentShipIndex].shipObj.length;
        i++
      ) {
        finalArray.push([parseInt(xTargetId[0]), parseInt(xTargetId[1]) + i]);
      }
    }
    if (UiState.axis === 'y') {
      for (
        let i = 0;
        i < UiState.currentShip[UiState.currentShipIndex].shipObj.length;
        i++
      ) {
        finalArray.push([parseInt(xTargetId[0]) + i, parseInt(xTargetId[1])]);
      }
    }

    // check for overlapping ships
    if (!isNotOverlapping(finalArray)) {
      return false;
    }

    const data = e.dataTransfer.getData('text');
    const source = document.getElementById(data);
    e.target.appendChild(source);

    source.setAttribute('draggable', false);

    addShipToBoard(finalArray);
    resetAxis();
    nextShipIteration();
    if (UiState.currentShipIndex < 5) {
      dragAndDropDisplay();
    }
  });
}
function isNotOverlapping(finalArray) {
  let board;
  if (UiState.currentPlacementBoard === 'player') {
    board = [...GameState.boards][0];
  } else {
    board = [...GameState.boards][1];
  }
  const playerBoard = [...GameState.boards][0];
  for (let i = 0; i < finalArray.length; i++) {
    for (let j = 0; j < playerBoard.shipCoordinates.length; j++) {
      for (let k = 0; k < playerBoard.shipCoordinates[j].location.length; k++) {
        if (
          finalArray[i][0] === playerBoard.shipCoordinates[j].location[k][0] &&
          finalArray[i][1] === playerBoard.shipCoordinates[j].location[k][1]
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
function nextShipIteration() {
  UiState.currentShipIndex++;

  if (UiState.currentShipIndex >= 5) {
    const mainGamePage = document.getElementById('game');
    const shipPlacementPage = document.getElementById(
      'placement-page-body-container'
    );
    if (GameState.mode === 'PvC') {
      const opponentBoard = [...GameState.boards][1];
      opponentBoard.randomAddShips();
    }
    shipPlacementPage.style.display = 'none';
    mainGamePage.style.display = 'flex';
    createBoards();
  }
}
function resetAxis() {
  UiState.axis = 'x';
  const imgContainer = document.getElementById('unplaced-ship-container');
  imgContainer.style.height = 'fit-content';
}
function addShipImgDragListeners() {
  let source =
    document.getElementsByClassName('ship-img')[UiState.currentShipIndex];
  source.addEventListener('dragstart', (e) => {
    e.dataTransfer.clearData();
    e.dataTransfer.setData('text/plain', e.target.id);
  });
}
function addShipToBoard(shipCoords) {
  if (UiState.currentPlacementBoard === 'player') {
    const playerBoard = [...GameState.boards][0];
    console.log([...UiState.currentShip][UiState.currentShipIndex]);
    playerBoard.addShip(
      [...UiState.currentShip][UiState.currentShipIndex].shipObj,
      shipCoords
    );
  } else if (UiState.currentPlacementBoard === 'opponent') {
    const opponentBoard = [...GameState.boards][1];
    opponentBoard.addShip(
      [...UiState.currentShip][UiState.currentShipIndex].shipObj,
      shipCoords
    );
  }
}
/* Display */
function dragAndDropDisplay() {
  const nextShipDisplay = document.createElement('img');
  nextShipDisplay.className = 'ship-img';
  const nextShipName = document.getElementById('ship-name');
  const nextShipLength = document.getElementById('ship-length');
  const imgContainer = document.getElementById('unplaced-ship-container');

  imgContainer.appendChild(nextShipDisplay);

  addShipImgDragListeners();

  console.log([...UiState.currentShip][UiState.currentShipIndex].shipObj.name);
  nextShipDisplay.id = `${
    [...UiState.currentShip][UiState.currentShipIndex].shipObj.name
  }`;
  nextShipDisplay.src = `${
    [...UiState.currentShip][UiState.currentShipIndex].shipSrcImg
  }`;
  nextShipName.textContent = `Name: ${
    [...UiState.currentShip][UiState.currentShipIndex].shipObj.name
  }`;
  nextShipLength.textContent = `Length: ${
    [...UiState.currentShip][UiState.currentShipIndex].shipObj.length
  }`;
  nextShipDisplay.setAttribute('draggable', true);
}

function makeShipArray() {
  let Carrier = new Ship(5, 'carrier');
  let Battleship = new Ship(4, 'battleship');
  let Destroyer = new Ship(2, 'destroyer');
  let Cruiser = new Ship(3, 'cruiser');
  let Submarine = new Ship(3, 'submarine');

  let shipArray = [
    { shipObj: Carrier, shipSrcImg: '../dist/assets/ships/carrier.png' },
    { shipObj: Battleship, shipSrcImg: '../dist/assets/ships/battleship.png' },
    { shipObj: Destroyer, shipSrcImg: '../dist/assets/ships/gamsi.png' },
    { shipObj: Cruiser, shipSrcImg: '../dist/assets/ships/frigate.png' },
    { shipObj: Submarine, shipSrcImg: '../dist/assets/ships/submarine.png' },
  ];
  UiState.currentShip = shipArray;
}

function changeAxisButton() {
  const imgContainer = document.getElementById('unplaced-ship-container');

  const ratio =
    [...UiState.currentShip][UiState.currentShipIndex].shipObj.length * 6;

  const changeAxisBtn = document.getElementById('change-orientation');
  changeAxisBtn.addEventListener('click', () => {
    let allShipsList = document.getElementsByClassName('ship-img');
    if (UiState.axis === 'x') {
      UiState.axis = 'y';
      allShipsList[UiState.currentShipIndex].classList.add('y');
      imgContainer.style.height = `${ratio}vh`;
    } else {
      UiState.axis = 'x';
      allShipsList[UiState.currentShipIndex].classList.remove('y');
      imgContainer.style.height = 'fit-content';
    }
  });
}

function placementPage() {
  const shipPlacementPage = document.getElementById(
    'placement-page-body-container'
  );
  shipPlacementPage.display = 'flex';

  dynamicallyGenerateBoard();
  makeShipArray();
  dragAndDropDisplay();
  changeAxisButton();
}

export { UiState, placementPage };
