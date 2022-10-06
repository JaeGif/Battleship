import Players from './src/players/player.js';
import Gameboards from './src/objects/gameboard.js';

let player = new Players('Jae');
let cpuGameboard = new Gameboards();

cpuGameboard.randomAddShips();
console.log('ship coords: ', cpuGameboard.shipCoordinates);

console.log(player.radarAttack([4, 4], cpuGameboard));
