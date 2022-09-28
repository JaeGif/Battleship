import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';
import { generateCoordinateIDs } from './ui.js';

let humanPlayer = new Players('Jae');
let computerPlayer = new Players('Computer');

GameState.players.push(humanPlayer);
GameState.players.push(computerPlayer);

const playerBoard = new Gameboards('Jae');
const opponentBoard = new Gameboards('Computer');

GameState.boards.push(playerBoard);
GameState.boards.push(opponentBoard);

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
      for (let i = 0; i < 5; i++) {
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
      for (let i = 0; i < 5; i++) {
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
    if (UiState.axis === 'x') {
      for (let i = 0; i < 5; i++) {
        finalArray.push([parseInt(xTargetId[0]), parseInt(xTargetId[1]) + i]);

        let x = xTargetId[0];
        let y = parseInt(xTargetId[1]) + i;
        let coordId = x + ',' + y;
        let coveredCoordinate = document.getElementById(`${coordId}`);
      }
    }
    const data = e.dataTransfer.getData('text');
    const source = document.getElementById(data);
    e.target.appendChild(source);
    source.setAttribute('draggable', false);
    addShipToBoard(finalArray);
    UiState.currentShipIndex++;
    if (UiState.currentShipIndex >= 5) {
      console.log('moving on');
      return;
    }
    dragAndDropDisplay();
  });
}
function addShipImgDragListeners() {
  let source =
    document.getElementsByClassName('ship-img')[UiState.currentShipIndex];
  console.log(source);
  source.addEventListener('dragstart', (e) => {
    e.dataTransfer.clearData();
    e.dataTransfer.setData('text/plain', e.target.id);
  });
}
function addShipToBoard(shipCoords) {
  if (UiState.currentPlacementBoard === 'player') {
    const playerBoard = [...GameState.boards][0];
    playerBoard.addShip(
      UiState.currentShip[UiState.currentShipIndex],
      shipCoords
    );
  } else if (UiState.currentPlacementBoard === 'opponent') {
    const opponentBoard = [...GameState.boards][1];
    opponentBoard.addShip(
      UiState.currentShip[UiState.currentShipIndex],
      shipCoords
    );
  }
}
/* Display */
function dragAndDropDisplay() {
  console.log(UiState.currentShipIndex);
  const nextShipDisplay = document.createElement('img');
  nextShipDisplay.className = 'ship-img';
  const nextShipName = document.getElementById('ship-name');
  const nextShipLength = document.getElementById('ship-length');
  const imgContainer = document.getElementById('unplaced-ship-container');

  imgContainer.appendChild(nextShipDisplay);

  addShipImgDragListeners();

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
  console.log(UiState.currentShip);
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
      console.log(allShipsList[UiState.currentShipIndex]);
      imgContainer.style.height = `${ratio}vh`;
    } else {
      UiState.axis = 'x';
      allShipsList[UiState.currentShipIndex].classList.remove('y');
      imgContainer.style.height = 'fit-content';
    }
  });
}

dynamicallyGenerateBoard(10);
makeShipArray();
dragAndDropDisplay();
changeAxisButton();
