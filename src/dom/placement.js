import Players from '../players/player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import { GameState } from '../gameloop.js';

function dragAndDropShips() {
  const humanPlayer = [...GameState.players][0];
  const computerPlayer = [...GameState.players][1];
  const playerBoard = [...GameState.boards][0];
  const opponentBoard = [...GameState.boards][1];
  if (GameState.mode === 'PvP') {
    // drag and drop for both players boards
  } else if (GameState.mode === 'PvC') {
    // drag and drop for just player 1's board
  }
}
