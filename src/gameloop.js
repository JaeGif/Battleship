/* At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. 
\For now just populate each Gameboard with predetermined coordinates. 
You can implement a system for allowing players to place their ships later.
 */
import Gameboards from './objects/gameboard.js';
import Players from './players/player.js';
import Ship from './objects/ships.js';

function newGame(playerBoard, opponentBoard) {
  let Battleship = new Ship(4, 'Battleship');
  let Destroyer = new Ship(2, 'Destroyer');
  let Cruiser = new Ship(3, 'Cruiser');
  let Submarine = new Ship(3, 'Submarine');
  let Carrier = new Ship(5, 'Carrier');

  playerBoard.addShip(Carrier, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ]);
  playerBoard.addShip(Submarine, [
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  playerBoard.addShip(Cruiser, [
    [1, 0],
    [1, 1],
    [1, 2],
  ]);
  playerBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  playerBoard.addShip(Destroyer, [
    [4, 0],
    [4, 1],
  ]);

  opponentBoard.addShip(Carrier, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ]);
  opponentBoard.addShip(Submarine, [
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  opponentBoard.addShip(Cruiser, [
    [1, 0],
    [1, 1],
    [1, 2],
  ]);
  opponentBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  opponentBoard.addShip(Destroyer, [
    [4, 0],
    [4, 1],
  ]);
}

function gameLoop(playerBoard, opponentBoard, humanPlayer, computerPlayer) {
  let turn = 'player';
  while (!opponentBoard.allShipsSunk() && !playerBoard.allShipsSunk()) {
    // if an attack is executed change turns
    if (humanPlayer.attack() || computerPlayer.cpuAttack()) {
      turn = changeTurn(turn);
    }
  }
}
class GameState {
  static turn = 'player';
}
export { newGame, gameLoop, GameState };
