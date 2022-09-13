/* Gameboards should be able to place ships at specific coordinates by calling the ship factory function. */
class Gameboards {
  constructor(size = 7) {
    this.size = size;
  }
  shipCoordinates = [];
  recordAttack = []; // array of attacked coordinates

  receiveAttack(coordinates) {
    // determines whether or not the attack hit a placed ship and records the coordinates.
  }
  addShip(shipSize) {
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
