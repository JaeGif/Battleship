import Gameboards from '../src/objects/gameboard.js';
import { newGame, GameState, gameOver } from '../src/gameloop.js';
import Ship from '../src/objects/ships.js';
import Players from '../src/players/player.js';
import { createBoards } from '../src/dom/ui.js';
import { titleScreen } from './dom/title.js';
const game = (() => {
  titleScreen();
})();
/*
 */
