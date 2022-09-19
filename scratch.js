import Gameboards from './src/objects/gameboard.js';
import Ship from './src/objects/ships.js';
import Players from './src/players/player.js';

let Jae = new Players('Jae');
let JaeBoard = new Gameboards();
Jae.randomAddShips(JaeBoard);
