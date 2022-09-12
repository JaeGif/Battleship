/* Gameboards should be able to place ships at specific coordinates by calling the ship factory function. */
class Gameboards {
  constructor(size = 7, recordAttack) {
    this.size = size;
    recordAttack = null;
  }
  receiveAttack(coordinates) {
    // determines whether or not the attack hit a placed ship and records the coordinates.
  }
}
// classic battleship is 7x7. Try to make it a more flexible board though!
// keeps track of where missed attacks land on the gameboard and where hit attacks land. (on a ship) ships are not real they just mark
// positions on the gameboard to change to red when struck and keep track of whether a ship was sunk.
