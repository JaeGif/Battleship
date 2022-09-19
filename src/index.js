import Gameboards from '../src/objects/gameboard.js';
import { newGame, GameState } from '../src/gameloop.js';
import Ship from '../src/objects/ships.js';
import Players from '../src/players/player.js';
import { createBoards } from '../src/dom/ui.js';

const game = (() => {
  newGame(); // contains placing functions placed by default for now
  createBoards();
})();
