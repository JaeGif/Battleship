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
  let Battleship = new Ship(4, 'Battleship');
  let Destroyer = new Ship(2, 'Destroyer');

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
  expect(Battleship.getHitCoordinates()).toStrictEqual([[5, 0]]);
  expect(playerBoard.recordAttack).toStrictEqual([[5, 0]]);
});

test('Attacks miss if the space is not occupied', () => {
  let playerBoard = new Gameboards();
  let Battleship = new Ship(4, 'Battleship');
  let Destroyer = new Ship(2, 'Destroyer');

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
  playerBoard.receiveAttack([4, 6]);
  expect(Battleship.getHitCoordinates()).not.toStrictEqual([[4, 6]]);
  expect(playerBoard.recordAttack).toStrictEqual([[4, 6]]);
});
test('Gameboard knows when all ships are sunk', () => {
  let playerBoard = new Gameboards();
  let Battleship = new Ship(4, 'Battleship');
  let Destroyer = new Ship(2, 'Destroyer');
  let Cruiser = new Ship(3, 'Cruiser');
  let Submarine = new Ship(3, 'Submarine');
  let Carrier = new Ship(5, 'Carrier');
  playerBoard.addShip(Carrier, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ]);
  playerBoard.addShip(Submarine, [
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  playerBoard.addShip(Cruiser, [
    [1, 0],
    [1, 1],
    [1, 2],
  ]);
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
  playerBoard.receiveAttack([5, 1]);
  playerBoard.receiveAttack([5, 2]);
  playerBoard.receiveAttack([5, 3]);

  playerBoard.receiveAttack([4, 0]);
  playerBoard.receiveAttack([4, 1]);

  playerBoard.receiveAttack([3, 0]);
  playerBoard.receiveAttack([3, 1]);
  playerBoard.receiveAttack([3, 2]);
  playerBoard.receiveAttack([3, 3]);
  playerBoard.receiveAttack([3, 4]);

  playerBoard.receiveAttack([2, 0]);
  playerBoard.receiveAttack([2, 1]);
  playerBoard.receiveAttack([2, 2]);

  playerBoard.receiveAttack([1, 0]);
  playerBoard.receiveAttack([1, 1]);
  playerBoard.receiveAttack([1, 2]);

  expect(playerBoard.allShipsSunk()).toBeTruthy();
});
