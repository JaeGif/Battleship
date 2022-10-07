/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */
import { CpuGameState } from '../objects/stateManagers.js';

class Players {
  constructor(name = 'Computer') {
    this.name = name;
  }
  attackCharges = 0;
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
  radarAttack(coordinates, enemyBoard) {
    // reveals the number of adjacent and diagonal ships to the placement of the radar. The radar drop itself counts as an attacked space
    this.attack(coordinates, enemyBoard);

    // there are 8 total adjacent elements, discounting out of bounds possibilities
    // this will go circularly in order of top left -> top right -> bottom right -> bottom left -> top left
    let count = 0;
    let adjacentMatrixElements = [];

    let intCoords = [parseInt(coordinates[0]), parseInt(coordinates[1])];
    const topLeft = [intCoords[0] - 1, intCoords[1] - 1];
    const topMiddle = [intCoords[0] - 1, intCoords[1]];
    const topRight = [intCoords[0] - 1, intCoords[1] + 1];
    const centerRight = [intCoords[0], intCoords[1] + 1];
    const bottomRight = [intCoords[0] + 1, intCoords[1] + 1];
    const bottomMiddle = [intCoords[0] + 1, intCoords[1]];
    const bottomLeft = [intCoords[0] + 1, intCoords[1] - 1];
    const centerLeft = [intCoords[0], intCoords[1] - 1];

    const temporaryArray = [
      topLeft,
      topMiddle,
      topRight,
      centerRight,
      bottomRight,
      bottomMiddle,
      bottomLeft,
      centerLeft,
    ];

    for (let i = 0; i < temporaryArray.length; i++) {
      // if in bound push to adjacency matrix
      if (
        temporaryArray[i][0] < 10 &&
        temporaryArray[i][1] < 10 &&
        temporaryArray[i][0] >= 0 &&
        temporaryArray[i][1] >= 0
      ) {
        adjacentMatrixElements.push(temporaryArray[i]);
      }
    }
    // compare against occupied spaces
    for (let k = 0; k < adjacentMatrixElements.length; k++) {
      for (let i = 0; i < enemyBoard.shipCoordinates.length; i++) {
        // go through the list of ships placed first
        for (
          let j = 0;
          j < enemyBoard.shipCoordinates[i].location.length;
          j++
        ) {
          // go through the ships coordinates next
          if (
            // Array matching in JS has no built-ins so compare each element individually
            // there's only 2 elements per array no matter what so this method is ok.
            adjacentMatrixElements[k][0] ===
              enemyBoard.shipCoordinates[i].location[j][0] &&
            adjacentMatrixElements[k][1] ===
              enemyBoard.shipCoordinates[i].location[j][1]
          ) {
            count++;
          }
        }
      }
    }
    return count;
  }
  sniperAttack(enemyBoard) {
    // sniper shot attacks a random unhit enemy position
    if (recordAttack.length === 0) {
      // this isn't currently possible to enter due to ennergy costs, but it may become useful
      // in further patches to the game.
      return this.attack(
        [
          enemyBoard.shipCoordinates[0].location[0][0],
          enemyBoard.shipCoordinates[0].location[0][1],
        ],
        enemyBoard
      );
    }
    for (let i = 0; i < enemyBoard.shipCoordinates.length; i++) {
      // go through the list of ships placed first
      for (let j = 0; j < enemyBoard.shipCoordinates[i].location.length; j++) {
        for (let k = 0; k < enemyBoard.recordAttack.length; k++) {
          if (
            enemyBoard.shipCoordinates[i].location[j][0] !==
              enemyBoard.recordAttack[k][0] &&
            enemyBoard.shipCoordinates[i].location[j][1] !==
              enemyBoard.recordAttack[k][1]
          ) {
            return this.attack(
              [
                enemyBoard.shipCoordinates[i].location[j][0],
                enemyBoard.shipCoordinates[i].location[j][1],
              ],
              enemyBoard
            );
          }
        }
      }
    }
    return false;
  }
}

export default Players;
