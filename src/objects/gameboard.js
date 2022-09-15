/* Gameboards should be able to place ships at specific coordinates by calling the ship factory function. */
import Ship from './ships.js';

class Gameboards {
  constructor(size = 7) {
    this.size = size;
  }
  shipCoordinates = [];
  recordAttack = []; // array of attacked coordinates

  receiveAttack(coordinates) {
    this.recordAttack.push(coordinates);

    for (let i = 0; i < this.shipCoordinates.length; i++) {
      for (let j = 0; j < this.shipCoordinates[i].location.length; j++) {
        if (
          coordinates[0] === this.shipCoordinates[i].location[j][0] &&
          coordinates[1] === this.shipCoordinates[i].location[j][1]
        ) {
          return this.shipCoordinates[i].object.hit(coordinates);
        }
      }
    }
  }

  addShip(ship, newCoordinates) {
    this.shipCoordinates.push({
      object: ship,
      location: newCoordinates,
    });

    // Carrier(5) Battleship(4) Cruiser(3) Submarine(3) Destroyer(2)
    // for now add ship manually to a location using coordinates
    // adds the ships chosen coordinates to the shipCoordinates array
  }
}
// classic battleship is 7x7. Try to make it a more flexible board though!
// keeps track of where missed attacks land on the gameboard and where hit attacks land. (on a ship) ships are not real they just mark
// positions on the gameboard to change to red when struck and keep track of whether a ship was sunk.

/* 
      BattleShip Board Example
x------------------------->
      0  1  2  3  4  5  6     
y  0  0  0  0  0  0  0  0 
|  1  0  0  0  0  0  0  0
|  2  0  0  0  0  0  0  0
|  3  0  0  0  0  0  0  0
|  4  0  0  0  0  0  0  0
|  5  0  0  0  0  0  0  0
v  6  0  0  0  0  0  0  0

*/
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

export default Gameboards;
