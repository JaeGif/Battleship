import Gameboards from './gameboard.js';
import Ship from './ships.js';
let Carrier = new Ship(5, 'Carrier');
let Battleship = new Ship(4, 'Battleship');
let Cruiser = new Ship(3, 'Cruiser');
let Submarine = new Ship(3, 'Submarine');
let Destroyer = new Ship(2, 'Destroyer');

console.log(Carrier.name);
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
    name: 'Carrier',
    location: [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4],
    ],
  });
});
