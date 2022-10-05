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

export { newGame, gameOver };
