import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';
import { generateCoordinateIDs } from './ui.js';
class UiState {
  static axis = 'x';
}
function dynamicallyGenerateBoard(size = 10) {
  const coordinateIterator = generateCoordinateIDs(size);
  const boardContainer = document.getElementById('placement-board');

  for (let i = 0; i < size * size; i++) {
    const coordinateGrid = document.createElement('div');
    coordinateGrid.id = `${coordinateIterator.next().value}`;
    boardContainer.appendChild(coordinateGrid);
  }
}
function dragAndDropDisplay(i) {
  const nextShipDisplay = document.getElementsByClassName('ship-img');
  const nextShipName = document.getElementById('ship-name');
  const nextShipLength = document.getElementById('ship-length');
  const changeAxisBtn = document.getElementById('change-orientation');
  const imgContainer = document.getElementById('unplaced-ship-container');

  const humanPlayer = [...GameState.players][0];
  const computerPlayer = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  const opponentBoard = [...GameState.boards][1];
  const shipObjs = makeShipArray();
  nextShipDisplay[0].classList.add(`${shipObjs[i].shipObj.name}`);
  nextShipDisplay.src = `${shipObjs[i].shipSrcImg}`;
  nextShipName.textContent = `Name: ${shipObjs[i].shipObj.name}`;
  nextShipLength.textContent = `Length: ${shipObjs[i].shipObj.length}`;
  const ratio = shipObjs[i].shipObj.length * 6;
  nextShipDisplay[0].setAttribute('draggable', true);
  changeAxisBtn.addEventListener('click', () => {
    if (UiState.axis === 'x') {
      UiState.axis = 'y';
      nextShipDisplay[0].classList.add('y');
      imgContainer.style.height = `${ratio}vh`;
    } else {
      UiState.axis = 'x';
      nextShipDisplay[0].classList.remove('y');
      imgContainer.style.height = 'fit-content';
    }
  });
}
function changeOrientation() {
  const imgContainer = document.getElementById('details-grouping-container');
  const changeAxisBtn = document.getElementById('change-orientation');
  const nextShipDisplay = document.getElementsByClassName('ship-img');
  changeAxisBtn.addEventListener('click', () => {
    if (UiState.axis === 'x') {
      UiState.axis = 'y';
      nextShipDisplay[0].classList.add('y');
      imgContainer.style.height = 'fit-content';
    } else {
      UiState.axis = 'x';
      nextShipDisplay[0].classList.remove('y');
      imgContainer.style.height = ``;
    }
  });
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
  return shipArray;
}
dynamicallyGenerateBoard();
dragAndDropDisplay(0);
