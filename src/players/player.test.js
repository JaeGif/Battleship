import Players from './player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';

/* 
let player = new Players('Jae');
let cpuPlayer = new Players();
let playerGameboard = new Gameboards();
let cpuGameboard = new Gameboards();
*/
test('Player attack registers', () => {
  let player = new Players('Jae');
  let cpuGameboard = new Gameboards();
  let battleShip = new Ship(3);
  cpuGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(player.attack([0, 0], cpuGameboard)).toBeTruthy();
  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
});

test('Player attacks the same spot fails', () => {
  let player = new Players('Jae');
  let cpuGameboard = new Gameboards();
  let battleShip = new Ship(3);
  cpuGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  player.attack([0, 0], cpuGameboard);
  expect(player.attack([0, 0], cpuGameboard)).toBeFalsy();
  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
});

test('CPU attack registers', () => {
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let battleShip = new Ship(3);
  playerGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  expect(cpuPlayer.attack([0, 0], playerGameboard)).toBeTruthy();
  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
});
test('CPU attacks the same spot fails', () => {
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let battleShip = new Ship(3);
  playerGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  cpuPlayer.attack([0, 0], playerGameboard);

  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 0]]);
  expect(cpuPlayer.attack([0, 0], playerGameboard)).toBeFalsy();
});
