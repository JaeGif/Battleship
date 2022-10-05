/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */
import { CpuGameState } from '../objects/stateManagers.js';

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
    const lastHit = [
      [...CpuGameState.cpuLastHit][0][0],
      [...CpuGameState.cpuLastHit][0][1],
    ];
    let coordinates = [];
    let x = lastHit[0];
    let y = lastHit[1];

    if (CpuGameState.attempts === 0) {
      x++;
      coordinates.push(x);
      coordinates.push(y);
    }
    if (CpuGameState.attempts === 1) {
      y++;
      coordinates.push(x);
      coordinates.push(y);
    }
    if (CpuGameState.attempts === 2) {
      y--;
      coordinates.push(x);
      coordinates.push(y);
    }
    if (CpuGameState.attempts === 3) {
      x--;
      coordinates.push(x);
      coordinates.push(y);
    }

    if (coordinates[0] === -1) {
      CpuGameState.attempts++;
      return this._cpuSmartMove(enemyBoard);
    }
    if (coordinates[1] === -1) {
      CpuGameState.attempts++;
      return this._cpuSmartMove(enemyBoard);
    }
    if (coordinates[0] === 10) {
      CpuGameState.attempts++;
      return this._cpuSmartMove(enemyBoard);
    }
    if (coordinates[1] === 10) {
      CpuGameState.attempts++;
      return this._cpuSmartMove(enemyBoard);
    }

    if (
      !this._onAvailableSpace(coordinates, enemyBoard) &&
      CpuGameState.attempts < 4
    ) {
      CpuGameState.attempts++;
      return this._cpuSmartMove(enemyBoard);
    } else if (
      this._onAvailableSpace(coordinates, enemyBoard) &&
      CpuGameState.attempts < 4
    ) {
      CpuGameState.attempts = 0;

      return this.attack(coordinates, enemyBoard);
    }

    CpuGameState.attempts = 0;
    this._cpuAttack(enemyBoard);
  }

  _onAvailableSpace(coordinates, enemyBoard) {
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

  cpuAttackPattern(enemyBoard) {
    // combines all possible attacks in logical fashion
    if (CpuGameState.cpuLastHit.length === 0) {
      this._cpuAttack(enemyBoard);
    } else {
      this._cpuSmartMove(enemyBoard);
    }
  }
}

export default Players;
