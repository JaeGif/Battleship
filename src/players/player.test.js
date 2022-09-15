import Players from './player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';

let player = new Players('Jae');
let cpuPlayer = new Players();

let playerGameboard = new Gameboards();
let cpuGameboard = new Gameboards();

test('Player attack registers', () => {
  let battleShip = new Ship(3);
  cpuGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  player.attack([0, 0], cpuGameboard);
  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
});
test('Player attacks the same spot fails', () => {
  let battleShip = new Ship(3);
  cpuGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  player.attack([0, 0], cpuGameboard);
  player.attack([0, 0], cpuGameboard);

  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
});
