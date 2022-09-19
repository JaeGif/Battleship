/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';

class Players {
  constructor(name = 'Computer') {
    this.name = name;
  }
  attack(coordinateStringy, enemyBoard) {
    // checks that an attack has not been previously made
    let coordinates = [
      parseInt(coordinateStringy[0]),
      parseInt(coordinateStringy[1]),
    ];
    console.log(coordinates);
    if (enemyBoard.recordAttack.length === 0) {
      enemyBoard.receiveAttack(coordinates);
      return true;
    }
    for (let i = 0; i < enemyBoard.recordAttack.length; i++) {
      if (
        !(
          coordinates[0] === enemyBoard.recordAttack[i][0] &&
          coordinates[1] === enemyBoard.recordAttack[i][1]
        )
      ) {
        enemyBoard.receiveAttack(coordinates);
        return true;
      }
      return false;
    }
  }
  cpuAttack(enemyBoard) {
    let x = Math.floor(Math.random()) * enemyBoard.size;
    let y = Math.floor(Math.random()) * enemyBoard.size;
    return this.attack([x, y], enemyBoard);
  }
  randomAddShips(board) {
    let Carrier = new Ship(5, 'Carrier');
    let Battleship = new Ship(4, 'Battleship');
    let Destroyer = new Ship(2, 'Destroyer');
    let Cruiser = new Ship(3, 'Cruiser');
    let Submarine = new Ship(3, 'Submarine');

    this._randomizeShips(board, Carrier);
    this._randomizeShips(board, Battleship);
    this._randomizeShips(board, Cruiser);
    this._randomizeShips(board, Destroyer);
    this._randomizeShips(board, Submarine);
  }
  _randomizeShips(board, newShip, size = 10) {
    let coordinate = [];
    const shipLength = newShip.length;
    let axis = this._defineAxis();
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
    for (let i = 0; i < coordinate.length; i++) {
      if (!_isEmptySpace(i, board)) {
        // redoes the random choice if space is not empty
        return _randomizeShips(board, newShip, size);
      }
    }
    board.addShip(newShip, coordinate);
  }
  _defineAxis() {
    let axisNum = Math.floor(Math.random() * 2);

    if (axisNum === 1) {
      return 'x';
    } else {
      return 'y';
    }
  }
  _isEmptySpace(coordinate, gameboard) {
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
}

export default Players;
