import Gameboards from '../src/objects/gameboard.js';
import { gameLoop, newGame, GameState } from '../src/gameloop.js';
import Ship from '../src/objects/ships.js';
import Players from '../src/players/player.js';
import { createBoards } from '../src/dom/ui.js';

const playerBoard = new Gameboards();
const opponentBoard = new Gameboards();
const humanPlayer = new Players('Jae');
const computerPlayer = new Players();

const game = (() => {
  newGame(playerBoard, opponentBoard); // contains placing functions placed by default for now
  createBoards();
  gameLoop(playerBoard, opponentBoard, humanPlayer, computerPlayer);
})();
