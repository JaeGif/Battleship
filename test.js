import Players from './src/players/player.js';
import Gameboards from './src/objects/gameboard.js';

let player = new Players('Jae');
let cpuGameboard = new Gameboards();

cpuGameboard.randomAddShips();
console.log('ship coords: ', cpuGameboard.shipCoordinates);
player.attack([8, 9], cpuGameboard);
console.log(cpuGameboard.recordAttack);

console.log(player.bombAttack([8, 8], cpuGameboard));
console.log(cpuGameboard.recordAttack);
