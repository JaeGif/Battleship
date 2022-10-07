import { multiAttackRegistery } from '../dom/ui.js';
import Ship from './ships.js';
import { GameState, CpuGameState } from './stateManagers.js';

class Gameboards {
  constructor(name, size = 10) {
    this.name = name;
    this.size = size;
  }
  shipCoordinates = [];
  recordAttack = []; // array of attacked coordinates
  sunkShips = [];
  receiveAttack(coordinates) {
    let bombHitOrMissStr = 'miss';
    // updates the gameboards data on what spaces have been hit for the DOM
    this.recordAttack.push(coordinates);
    if (GameState.turn === 'computer') {
      GameState.cpuAttacked.push(coordinates);
    }
    for (let i = 0; i < this.shipCoordinates.length; i++) {
      // go through the list of ships placed first
      for (let j = 0; j < this.shipCoordinates[i].location.length; j++) {
        // go through the ships coordinates next
        if (
          // Array matching in JS has no built-ins so compare each element individually
          // there's only 2 elements per array no matter what so this method is ok.
          coordinates[0] === this.shipCoordinates[i].location[j][0] &&
          coordinates[1] === this.shipCoordinates[i].location[j][1]
        ) {
          // if the coords match, it's a hit
          // bomb hits
          if (
            GameState.selectedAttack === 'bomb' ||
            GameState.selectedAttack === 'strike'
          ) {
            bombHitOrMissStr = 'hit';
          }
          this.shipCoordinates[i].object.hit(coordinates);
          GameState.wasHit = true;

          if (GameState.turn === 'computer') {
            CpuGameState.cpuLastHit.push(coordinates);

            if (CpuGameState.cpuLastHit.length === 2) {
              CpuGameState.cpuLastHit.shift();
            }
          }

          if (this.shipCoordinates[i].object.isSunk()) {
            // if the ship is sunk add to the graveyard
            this.sunkShips.push(this.shipCoordinates[i].object);
            GameState.justSunk = this.shipCoordinates[i].object.name;
            GameState.sunkEventFlag = true;

            if (GameState.turn === 'computer') {
              CpuGameState.cpuLastHit = [];
            }
          }
          if (
            GameState.selectedAttack === 'bomb' ||
            GameState.selectedAttack === 'strike'
          ) {
            multiAttackRegistery(coordinates, bombHitOrMissStr);
          }
          return true;
        }
      }
    }
    if (
      GameState.selectedAttack === 'bomb' ||
      GameState.selectedAttack === 'strike'
    ) {
      multiAttackRegistery(coordinates, bombHitOrMissStr);
    }
    return false;
  }
  removeShip() {
    return this.shipCoordinates.pop();
  }
  addShip(ship, newCoordinates) {
    // [[], [], []]
    this.shipCoordinates.push({
      object: ship,
      location: newCoordinates,
    });
  }
  randomAddShips() {
    let Carrier = new Ship(5, 'Carrier');
    let Battleship = new Ship(4, 'Battleship');
    let Destroyer = new Ship(2, 'Destroyer');
    let Cruiser = new Ship(3, 'Cruiser');
    let Submarine = new Ship(3, 'Submarine');

    this._randomizeShips(Carrier);
    this._randomizeShips(Battleship);
    this._randomizeShips(Cruiser);
    this._randomizeShips(Destroyer);
    this._randomizeShips(Submarine);
  }
  _isEmptySpace(coordinate) {
    for (let k = 0; k < coordinate.length; k++) {
      // through all coordinates in the soon to be placed coords
      for (let i = 0; i < this.shipCoordinates.length; i++) {
        // go through the list of ships placed first
        for (let j = 0; j < this.shipCoordinates[i].location.length; j++) {
          // go through the ships coordinates next
          if (
            // Array matching in JS has no built-ins so compare each element individually
            // there's only 2 elements per array no matter what so this method is ok.
            coordinate[k][0] === this.shipCoordinates[i].location[j][0] &&
            coordinate[k][1] === this.shipCoordinates[i].location[j][1]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  }
  _randomizeShips(newShip, size = 10) {
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
    if (!this._isEmptySpace(coordinate)) {
      // redoes the random choice if space is not empty
      return this._randomizeShips(newShip, size);
    }

    this.addShip(newShip, coordinate);
  }
  _defineAxis() {
    let axisNum = Math.floor(Math.random() * 2);

    if (axisNum === 1) {
      return 'x';
    } else {
      return 'y';
    }
  }
  getSunkShips() {
    return this.sunkShips;
  }
  allShipsSunk() {
    if (this.sunkShips.length === 5) {
      return true;
    }
    return false;
  }
}

export default Gameboards;
