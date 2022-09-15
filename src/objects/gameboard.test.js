import Gameboards from './gameboard.js';
import Ship from './ships.js';
let Carrier = new Ship(5, 'Carrier');
let Battleship = new Ship(4, 'Battleship');
let Cruiser = new Ship(3, 'Cruiser');
let Submarine = new Ship(3, 'Submarine');
let Destroyer = new Ship(2, 'Destroyer');

test('Gameboard of size 7', () => {
  let playerBoard = new Gameboards();
  expect(playerBoard.size).toBe(7);
});
test('Gamerboard of random size range 7 - 100', () => {
  const sizeBoard = Math.random(7, 100);
  let playerBoard = new Gameboards(sizeBoard);
  expect(playerBoard.size).toBe(sizeBoard);
});

test('add Carrier location', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Carrier, [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ]);
  expect(playerBoard.shipCoordinates[0].location).toStrictEqual([
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ]);
});

test('add Carrier full object', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Carrier, [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ]);
  expect(playerBoard.shipCoordinates[0]).toStrictEqual({
    object: Carrier,
    location: [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
    ],
  });
});
test('add Battleship location', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  expect(playerBoard.shipCoordinates[0].location).toStrictEqual([
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
});

test('add Battleship full object', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  expect(playerBoard.shipCoordinates[0]).toStrictEqual({
    object: Battleship,
    location: [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3],
    ],
  });
});

test('add multiple ship objects to the board', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  playerBoard.addShip(Destroyer, [
    [4, 0],
    [4, 1],
  ]);
  expect(playerBoard.shipCoordinates).toStrictEqual([
    {
      object: Battleship,
      location: [
        [5, 0],
        [5, 1],
        [5, 2],
        [5, 3],
      ],
    },
    {
      object: Destroyer,
      location: [
        [4, 0],
        [4, 1],
      ],
    },
  ]);
});
test('Attacks hit if the space is occupied', () => {
  let playerBoard = new Gameboards();
  playerBoard.addShip(Battleship, [
    [5, 0],
    [5, 1],
    [5, 2],
    [5, 3],
  ]);
  playerBoard.addShip(Destroyer, [
    [4, 0],
    [4, 1],
  ]);
  playerBoard.receiveAttack([5, 0]);
  expect(playerBoard.receiveAttack([5, 0])).toBe('kjwvn');
  /*   expect(Battleship.getHitCoordinates()).toBe([[5, 0]]);
   */
});
