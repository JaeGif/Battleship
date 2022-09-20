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
}

export default Players;
