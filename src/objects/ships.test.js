import Ship from './ships.js';

test('.hit(coord) pushes single hit to hitCoordinates', () => {
  let battleShip = new Ship(3);
  battleShip.hit([0, 1]);
  expect(battleShip.getHitCoordinates()).toStrictEqual([[0, 1]]);
});
test('.hit(coord) pushes multiple hits to hitCoordinates', () => {
  let battleShip = new Ship(3);
  battleShip.hit([0, 1]);
  battleShip.hit([0, 0]);
  battleShip.hit([0, 2]);
  expect(battleShip.getHitCoordinates()).toStrictEqual([
    [0, 1],
    [0, 0],
    [0, 2],
  ]);
});
test('What is the ships length?', () => {
  let battleShip = new Ship(3);
  expect(battleShip.length).toBe(3);
});
test('What is the ships length short?', () => {
  let battleShip = new Ship(1);
  expect(battleShip.length).toBe(1);
});
test('What is the ships length long?', () => {
  let battleShip = new Ship(6);
  expect(battleShip.length).toBe(6);
});
test('Is a ship of length 3 sunk after 2 hits?', () => {
  let battleShip = new Ship(3);
  battleShip.hit([0, 0]);
  battleShip.hit([0, 1]);
  expect(battleShip.isSunk()).toBe(false);
});
test('Is a ship of length 3 sunk after 3 hits?', () => {
  let battleShip = new Ship(3);
  battleShip.hit([0, 0]);
  battleShip.hit([0, 1]);
  battleShip.hit([0, 2]);
  expect(battleShip.isSunk()).toBe(true);
});
test('Is a ship of length 5 sunk after 0 hits?', () => {
  let battleShip = new Ship(5);
  expect(battleShip.isSunk()).toBe(false);
});
test('Is a ship of length 5 sunk after 5 hits?', () => {
  let battleShip = new Ship(5);
  battleShip.hit([0, 0]);
  battleShip.hit([0, 1]);
  battleShip.hit([0, 2]);
  battleShip.hit([0, 3]);
  battleShip.hit([0, 4]);
  expect(battleShip.isSunk()).toBe(true);
});
