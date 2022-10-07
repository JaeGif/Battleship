import Players from './src/players/player.js';
import Gameboards from './src/objects/gameboard.js';

let player = new Players('Jae');
let cpuGameboard = new Gameboards();

cpuGameboard.randomAddShips();
player.attack([5, 6], cpuGameboard);
console.log(player.strikeAttack([5, 5], 'y', cpuGameboard));
