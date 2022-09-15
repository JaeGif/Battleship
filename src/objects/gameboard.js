/* Gameboards should be able to place ships at specific coordinates by calling the ship factory function. */
import Ship from './ships.js';

class Gameboards {
  constructor(size = 7) {
    this.size = size;
  }
  shipCoordinates = [];
  recordAttack = []; // array of attacked coordinates

  receiveAttack(coordinates) {
    // updates the gameboards data on what spaces have been hit for the DOM
    this.recordAttack.push(coordinates);

    for (let i = 0; i < this.shipCoordinates.length; i++) {
      // go through the list of ships placed first
      for (let j = 0; j < this.shipCoordinates[i].location.length; j++) {
        // go through the ships coordinates next
        if (
          // Array matching in JS has no built-ins so compare each element individually
          // there's only 2 elemeents per array no matter what so this method is ok.
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

export default Gameboards;
