import Players from './src/players/player.js';
import Gameboards from './src/objects/gameboard.js';

let player = new Players('Jae');
let cpuGameboard = new Gameboards();

cpuGameboard.randomAddShips();
console.log('ship coords: ', cpuGameboard.shipCoordinates);
player.attack([0, 0], cpuGameboard);
player.attack([1, 0], cpuGameboard);

player.attack([2, 0], cpuGameboard);
player.attack([9, 8], cpuGameboard);
player.attack([3, 4], cpuGameboard);
player.attack([0, 5], cpuGameboard);
player.attack([0, 6], cpuGameboard);

player.sniperAttack(cpuGameboard);
console.log(cpuGameboard.recordAttack);
