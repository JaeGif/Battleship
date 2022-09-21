/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';
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
  _cpuAttack(enemyBoard) {
    let x = Math.floor(Math.random()) * enemyBoard.size;
    let y = Math.floor(Math.random()) * enemyBoard.size;
    return this.attack([x, y], enemyBoard);
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
    let previousCoordinate = GameState.cpuLastHit; // [x, y]
    // random select + or - in any direction if possible.
    console.log(GameState.cpuLastHit);
    const axis = this._defineAxis();
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    if (axis === 'x') {
      previousCoordinate[0] += plusOrMinus;
    } else if (axis === 'y') {
      previousCoordinate[1] += plusOrMinus;
    }
    // x and y values cannot fall outside of bounds
    if (previousCoordinate[0] === -1) {
      previousCoordinate[0] += 2;
    }
    if (previousCoordinate[1] === -1) {
      previousCoordinate[1] += 2;
    }
    if (previousCoordinate[0] === 10) {
      previousCoordinate[0] -= 2;
    }
    if (previousCoordinate[1] === 10) {
      previousCoordinate[1] -= 2;
    }

    for (let i = 0; i < enemyBoard.recordAttack.length; i++) {
      if (
        previousCoordinate[0] === enemyBoard.recordAttack[i][0] &&
        previousCoordinate[1] === enemyBoard.recordAttack[i][1]
      ) {
        // if attack has already beenn made, try again
        return this._cpuSmartMove(enemyBoard);
      }
    }
    this.attack(previousCoordinate, enemyBoard);
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
  }
  _cpuAttackPattern(enemyBoard) {
    // combines all possible attacks in logical fashion
  }
}

export default Players;
