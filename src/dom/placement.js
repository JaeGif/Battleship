import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';

function dragAndDropDisplay(i) {
  const nextShipDisplay = document.getElementsByClassName('ship-img');
  const nextShipName = document.getElementById('ship-name');
  const nextShipLength = document.getElementById('ship-length');

  const humanPlayer = [...GameState.players][0];
  const computerPlayer = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  const opponentBoard = [...GameState.boards][1];
  const shipObjs = makeShipArray();
  nextShipDisplay[0].classList.add(`${shipObjs[i].shipObj.name}`);
  nextShipDisplay.src = `${shipObjs[i].shipSrcImg}`;
  nextShipName.textContent = `Name: ${shipObjs[i].shipObj.name}`;
  nextShipLength.textContent = `Length: ${shipObjs[i].shipObj.length}`;
  console.log(nextShipDisplay.src);
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
dragAndDropDisplay(2);
