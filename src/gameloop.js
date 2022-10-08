/* At this point it is appropriate to begin crafting your User Interface.
The game loop should set up a new game by creating Players and Gameboards. 
\For now just populate each Gameboard with predetermined coordinates. 
You can implement a system for allowing players to place their ships later.
 */

import { gameOverScreen } from './dom/ui.js';
import { placementPage } from './dom/placement.js';
import { GameState } from './objects/stateManagers.js';

function newGame() {
  placementPage();
}
function gameOver() {
  // disable the player boards

  const opponentBoardContainer = document.getElementById(
    'current-opponent-board'
  );
  const playerBoardContainer = document.getElementById('current-player-board');

  for (let i = 0; i < opponentBoardContainer.children.length; i++) {
    if (opponentBoardContainer.children[i].tagName === 'DIV') {
      opponentBoardContainer.children[i].classList.add('revoke-events');
    }
  }
  for (let i = 0; i < playerBoardContainer.children.length; i++) {
    if (playerBoardContainer.children[i].tagName === 'DIV') {
      playerBoardContainer.children[i].classList.add('revoke-events');
    }
  }
  gameOverScreen();
}

export { newGame, gameOver };
