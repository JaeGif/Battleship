import Gameboards from './src/objects/gameboard.js';
import Ship from './src/objects/ships.js';
let battleship = new Ship(4, 'Battlship');
let cpuBoard = new Gameboards();
cpuBoard.addShip(battleship, [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
]);

function cpuAddShips(cpuBoard, shipLength = 4, size = 10) {
  let coordinate = [];
  let axis = defineAxis();
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  coordinate.push([x, y]);

  if (axis === 'x' && x + shipLength <= size) {
    for (let i = 0; i < shipLength - 1; i++) {
      x++;
      coordinate.push([x, y]);
    }
  } else if (axis === 'x' && x + shipLength > size) {
    for (let i = 0; i < shipLength - 1; i++) {
      x--;
      coordinate.push([x, y]);
    }
  }
  if (axis === 'y' && y + shipLength <= size) {
    for (let i = 0; i < shipLength - 1; i++) {
      y++;
      coordinate.push([x, y]);
    }
  } else if (axis === 'y' && y + shipLength > size) {
    for (let i = 0; i < shipLength - 1; i++) {
      y--;
      coordinate.push([x, y]);
    }
  }
  console.log(coordinate);
}
function defineAxis() {
  let axisNum = Math.floor(Math.random() * 2);

  if (axisNum === 1) {
    return 'x';
  } else {
    return 'y';
  }
}
function isEmptySpace(coordinate, gameboard) {
  for (let i = 0; i < gameboard.shipCoordinates.length; i++) {
    // go through the list of ships placed first
    for (let j = 0; j < gameboard.shipCoordinates[i].location.length; j++) {
      // go through the ships coordinates next
      if (
        // Array matching in JS has no built-ins so compare each element individually
        // there's only 2 elements per array no matter what so this method is ok.
        coordinate[0] === gameboard.shipCoordinates[i].location[j][0] &&
        coordinate[1] === gameboard.shipCoordinates[i].location[j][1]
      ) {
        return false;
      }
    }
  }
  return true;
}

cpuAddShips(cpuBoard);
