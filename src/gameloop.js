/* At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. 
\For now just populate each Gameboard with predetermined coordinates. 
You can implement a system for allowing players to place their ships later.
 */

import { gameOverScreen } from './dom/ui.js';
import { placementPage } from './dom/placement.js';

function newGame() {
  placementPage();
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
  static gameOver = false;
  static justSunk = '';
  static sunkEventFlag = false;
}
class CpuGameState {
  static cpuLastHit = [];
  static cpuTargetingAid = [];
  static attempts = 0;
}
export { newGame, GameState, CpuGameState, gameOver };
