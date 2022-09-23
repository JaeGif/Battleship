import Gameboards from '../src/objects/gameboard.js';
import { newGame, GameState, gameOver } from '../src/gameloop.js';
import Ship from '../src/objects/ships.js';
import Players from '../src/players/player.js';
import { createBoards } from '../src/dom/ui.js';
import { titleScreen } from './dom/title.js';
const game = (() => {
  titleScreen();
  newGame(); // contains placing functions placed by default for now
  createBoards();

  /*   while (GameState.gameOver === false) {
    if (playerBoard.allShipsSunk() || opponentBoard.allShipsSunk()) {
      GameState.gameOver = true;
    }
  } */
})();
/*
 */
