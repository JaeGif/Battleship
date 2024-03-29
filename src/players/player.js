/* Players can take turns playing the game by attacking the enemy Gameboard.
The game is played against the computer, so make ‘computer’ players capable of making random plays.
 The AI does not have to be smart, but it should know whether or not a given move is legal.
 (i.e. it shouldn’t shoot the same coordinate twice). */
import { CpuGameState, GameState } from '../objects/stateManagers.js';
import { socket } from '../services/socket.js';
class Players {
  constructor(name = 'Computer') {
    this.name = name;
  }
  attackCharges = 0;
  previousHit = [];
  attack(coordinateStringy, enemyBoard, incoming = false) {
    // send every attacked coordinate from here

    /*     if (incoming && GameState.mode === 'Socket')
      enemyBoard = GameState.boards[1]; */
    if (!incoming && GameState.mode === 'Socket') {
      socket.emit('send_attack', {
        type: GameState.selectedAttack,
        coordinates: coordinateStringy,
      });
    }
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
  _inBounds(coordinate) {
    if (
      coordinate[0] > 9 ||
      coordinate[1] > 9 ||
      coordinate[0] < 0 ||
      coordinate[1] < 0
    ) {
      return false;
    }
    return true;
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
    if (enemyBoard.recordAttack.length === 0) {
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
            // check ALL recorded attacks to make sure the attack has not yet been made
            enemyBoard.shipCoordinates[i].location[j][0] ===
              enemyBoard.recordAttack[k][0] &&
            enemyBoard.shipCoordinates[i].location[j][1] ===
              enemyBoard.recordAttack[k][1]
          ) {
            GameState.sniperInvalidFlag = true;
          }
        }
        if (!GameState.sniperInvalidFlag) {
          this.attack(
            [
              enemyBoard.shipCoordinates[i].location[j][0],
              enemyBoard.shipCoordinates[i].location[j][1],
            ],
            enemyBoard
          );
          return [
            enemyBoard.shipCoordinates[i].location[j][0],
            enemyBoard.shipCoordinates[i].location[j][1],
          ];
        }
        GameState.sniperInvalidFlag = false;
      }
    }
  }
  bombAttack(coordinates, enemyBoard) {
    let upperLeftCoordinates = [
      parseInt(coordinates[0]),
      parseInt(coordinates[1]),
    ];
    const upperRight = [upperLeftCoordinates[0], upperLeftCoordinates[1] + 1];
    const bottomRight = [
      upperLeftCoordinates[0] + 1,
      upperLeftCoordinates[1] + 1,
    ];
    const bottomLeft = [upperLeftCoordinates[0] + 1, upperLeftCoordinates[1]];
    const hitSquare = [
      upperLeftCoordinates,
      upperRight,
      bottomRight,
      bottomLeft,
    ];
    let finalHits = [];
    // send each attack to the enemy board
    for (let i = 0; i < hitSquare.length; i++) {
      // validate  to only pass unhit squares and in bound squares.
      if (
        this._onAvailableSpace(hitSquare[i], enemyBoard) &&
        this._inBounds(hitSquare[i])
      ) {
        finalHits.push(hitSquare[i]);
      }
    }
    return finalHits;
  }
  strikeAttack(incCoordinate, axis, enemyBoard) {
    let row = [];
    let column = [];
    let finalColumn = [];
    let finalRow = [];
    let coordinate = [parseInt(incCoordinate[0]), parseInt(incCoordinate[1])];
    let newCoordinate = coordinate;
    let originalCoordinate = coordinate;
    finalColumn.push(coordinate);
    if (axis === 'x') {
      for (let i = 0; i < enemyBoard.size; i++) {
        if (this._inBounds([newCoordinate[0] + 1, newCoordinate[1]])) {
          newCoordinate = [newCoordinate[0] + 1, newCoordinate[1]];
          column.push(newCoordinate);
        } else if (
          this._inBounds([originalCoordinate[0] - 1, originalCoordinate[1]])
        ) {
          originalCoordinate = [
            originalCoordinate[0] - 1,
            originalCoordinate[1],
          ];
          column.push(originalCoordinate);
        }
      }
      for (let i = 0; i < column.length; i++) {
        if (this._onAvailableSpace(column[i], enemyBoard)) {
          finalColumn.push(column[i]);
        }
      }
      return finalColumn;
    } else if (axis === 'y') {
      for (let i = 0; i < enemyBoard.size; i++) {
        if (this._inBounds([newCoordinate[0], newCoordinate[1] + 1])) {
          newCoordinate = [newCoordinate[0], newCoordinate[1] + 1];
          row.push(newCoordinate);
        } else if (
          this._inBounds([originalCoordinate[0], originalCoordinate[1] - 1])
        ) {
          originalCoordinate = [
            originalCoordinate[0],
            originalCoordinate[1] - 1,
          ];
          row.push(originalCoordinate);
        }
      }
      for (let i = 0; i < row.length; i++) {
        if (this._onAvailableSpace(row[i], enemyBoard)) {
          finalRow.push(row[i]);
        }
      }
      return finalRow;
    }
  }
}

export default Players;
