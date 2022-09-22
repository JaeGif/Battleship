/* At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. 
\For now just populate each Gameboard with predetermined coordinates. 
You can implement a system for allowing players to place their ships later.
 */

import Gameboards from './objects/gameboard.js';
import Players from './players/player.js';
import Ship from './objects/ships.js';
import { gameOverScreen } from './dom/ui.js';

function newGame() {
  const humanPlayer = new Players('Jae');
  const computerPlayer = new Players('Cindy');

  const playerBoard = new Gameboards(humanPlayer.name);
  const opponentBoard = new Gameboards(computerPlayer.name);

  GameState.boards.push(playerBoard);
  GameState.boards.push(opponentBoard);
  GameState.players.push(humanPlayer);
  GameState.players.push(computerPlayer);

  let Battleship = new Ship(4, 'Battleship');
  let Destroyer = new Ship(2, 'Destroyer');
  let Cruiser = new Ship(3, 'Cruiser');
  let Submarine = new Ship(3, 'Submarine');
  let Carrier = new Ship(5, 'Carrier');
  opponentBoard.randomAddShips();

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
}
function gameOver() {
  gameOverScreen();
}
class GameState {
  // gamestate object keeps track of details about the games current state
  static turn = 'player';
  static players = [];
  static boards = [];
  static mode = 'PvP';
  static wasHit = false;
  static cpuLastHit = [];
  static cpuTargetingAid = [];
  static gameOver = false;
}

export { newGame, GameState, gameOver };
