import Players from './player.js';
import Gameboards from '../objects/gameboard.js';
import Ship from '../objects/ships.js';
import GameState from '../objects/stateManagers.js';

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
test('CPU random attack lands on gameboard', () => {
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let battleShip = new Ship(3);
  playerGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  cpuPlayer._cpuAttack(playerGameboard);
  expect(playerGameboard.recordAttack.length).toBe(1);
});
test('CPU random attack cannot land on already hit spot', () => {
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let battleShip = new Ship(3);
  playerGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);

  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  cpuPlayer._cpuAttack(playerGameboard);
  let hitTwice = false;
  // [[0, 0], [0, 1], [0, 0]]
  for (let i = 0; i < playerGameboard.receiveAttack.length; i++) {
    for (let j = 1; j < playerGameboard.receiveAttack.length; j++) {
      if (
        playerGameboard.receiveAttack[i][0] ===
          playerGameboard.receiveAttack[j][0] &&
        playerGameboard.receiveAttack[i][1] ===
          playerGameboard.receiveAttack[j][1]
      ) {
        hitTwice = true;
      }
    }
  }
  expect(hitTwice).toBeFalsy();
});
test('CPU basic intellisense check', () => {
  let humanplayer = new Players('Jae');
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let computerGameboard = new Gameboards();

  let battleShip = new Ship(3);

  playerGameboard.addShip(battleShip, [
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  const expected = [
    [0, 0],
    [0, 1],
    [1, 0],
  ];
  GameState.turn = 'computer';

  cpuPlayer.attack([0, 0], playerGameboard);

  cpuPlayer._cpuSmartMove(playerGameboard);
  const coordOfAttack = playerGameboard.recordAttack[1];
  let correctlyChosen = false;
  for (let i = 0; i < expected.length; i++) {
    if (
      coordOfAttack[0] === expected[i][0] &&
      coordOfAttack[1] === expected[i][1]
    ) {
      correctlyChosen = true;
    }
  }
  expect(playerGameboard.recordAttack.length).toBe(2);
  expect(correctlyChosen).toBeTruthy();
});
/* test('Kill Attack correctly attacks positions in a line', () => {
  let humanplayer = new Players('Jae');
  let cpuPlayer = new Players();
  let playerGameboard = new Gameboards();
  let computerGameboard = new Gameboards();

  let carrier = new Ship(5);

  playerGameboard.addShip(carrier, [
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
  ]);
  const expected = [
    [2, 6],
    [2, 4],
  ];
  cpuPlayer.attack([2, 2], playerGameboard);
  cpuPlayer.attack([2, 5], playerGameboard);
  cpuPlayer._cpuKillMove(playerGameboard);

  GameState.turn = 'computer';
});
 */
