/* At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. 
\For now just populate each Gameboard with predetermined coordinates. 
You can implement a system for allowing players to place their ships later.
 */

import Gameboards from './objects/gameboard.js';
import Players from './players/player.js';
import Ship from './objects/ships.js';
import { gameOverScreen } from './dom/ui.js';
import { createBoards } from './dom/ui.js';
import { placementPage } from './dom/placement.js';

function newGame() {
  const humanPlayer = [...GameState.players][0];
  const computerPlayer = [...GameState.players][1];

  const playerBoard = [...GameState.boards][0];
  const opponentBoard = [...GameState.boards][1];

  if (GameState.mode === 'PvC') {
    placementPage();
  } else {
    opponentBoard.randomAddShips();
    playerBoard.randomAddShips();
    createBoards();
  }
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
  static cpuAttacked = [];
  static cpuLastHit = [];
  static cpuTargetingAid = [];
  static gameOver = false;
  static justSunk = '';
  static sunkEventFlag = false;
}

export { newGame, GameState, gameOver };
