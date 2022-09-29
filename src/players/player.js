/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */

import { GameState } from '../gameloop.js';
class Players {
  constructor(name = 'Computer') {
    this.name = name;
  }
  previousHit = [];
  attack(coordinateStringy, enemyBoard) {
    // checks that an attack has not been previously made
    let coordinates = [
      parseInt(coordinateStringy[0]),
      parseInt(coordinateStringy[1]),
    ];

    if (enemyBoard.recordAttack.length === 0) {
      enemyBoard.receiveAttack(coordinates);
      return true;
    }
    for (let i = 0; i < enemyBoard.recordAttack.length; i++) {
      if (
        !(
          coordinates[0] == enemyBoard.recordAttack[i][0] &&
          coordinates[1] == enemyBoard.recordAttack[i][1]
        )
      ) {
        enemyBoard.receiveAttack(coordinates);
        return true;
      }
      return false;
    }
  }
  _cpuAttack(enemyBoard) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    if (!this._onAvailableSpace([x, y], enemyBoard)) {
      return this._cpuAttack(enemyBoard);
    } else {
      this.attack([x, y], enemyBoard);
    }
  }
  _defineAxis() {
    let axisNum = Math.floor(Math.random() * 2);

    if (axisNum === 1) {
      return 'x';
    } else {
      return 'y';
    }
  }
  _cpuSmartMove(enemyBoard) {
    // attack a neighboring position from where the last attack landed.
    // ex.
    /* 
    mock board
    0    0    0    0    0
    0    0    next 0    0 
    0    next hit  next 0
    0    0    next 0    0 
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    */
    let previousCoordinate = [];
    previousCoordinate = [...GameState.cpuLastHit[0]]; // [x, y]

    let newCoordinate = previousCoordinate;

    // random select + or - in any direction if possible.
    const axis = this._defineAxis();
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    if (axis === 'x') {
      newCoordinate[0] += plusOrMinus;
    } else if (axis === 'y') {
      newCoordinate[1] += plusOrMinus;
    }

    // x and y values cannot fall outside of bounds, manually shift the values
    if (!this._onAvailableSpace(newCoordinate, enemyBoard)) {
      return this._cpuSmartMove(enemyBoard);
    }

    this.attack(newCoordinate, enemyBoard);
  }
  _onAvailableSpace(coordinates, enemyBoard) {
    if (coordinates[0] === -1) {
      coordinates[0] += 2;
    }
    if (coordinates[1] === -1) {
      coordinates[1] += 2;
    }
    if (coordinates[0] === 10) {
      coordinates[0] -= 2;
    }
    if (coordinates[1] === 10) {
      coordinates[1] -= 2;
    }
    for (let i = 0; i < enemyBoard.recordAttack.length; i++) {
      if (
        coordinates[0] === enemyBoard.recordAttack[i][0] &&
        coordinates[1] === enemyBoard.recordAttack[i][1]
      ) {
        return false;
      }
    }
    return true;
  }
  _cpuKillMove(enemyBoard) {
    // if there are 2 hits in a row, signaling a likely line for a ship to reside, keeping attack in that line until the ship is sunk
    // or there is a miss.
    /* 
    mock board
    0    0    next 0    0
    0    0    hit  0    0 
    0    0    hit  0    0
    0    0    next 0    0 
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    */
    let lastHit1 = [...GameState.cpuLastHit][0];
    let lastHit2 = [...GameState.cpuLastHit][1];
    let newAttack = [lastHit1, lastHit2];
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

    if (
      lastHit1[0] === lastHit2[0] &&
      Math.abs(lastHit1[1] - lastHit2[2]) === 1
    ) {
      newAttack[1] += plusOrMinus;
    }
    if (
      lastHit1[1] === lastHit2[1] &&
      Math.abs(lastHit1[1] - lastHit2[2]) === 1
    ) {
      newAttack[0] += plusOrMinus;
    }
    if (!this._onAvailableSpace()) {
      return this._cpuKillMove(enemyBoard);
    }
    this.attack(newAttack, enemyBoard);
  }
  cpuAttackPattern(enemyBoard) {
    // combines all possible attacks in logical fashion
    this._cpuAttack(enemyBoard);
  }
}

export default Players;
