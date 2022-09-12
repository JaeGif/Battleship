class Ship {
  constructor(length) {
    this.length = length;
    this.hitCoordinates = [];
    this.shipCoordinates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ]; // the array is filled with coordinnates where the ship exists this can be populated by
    // placement function
  }
  getHitCoordinates() {
    return this.hitCoordinates;
  }

  hit(coordinates) {
    // marks position on specific ship as hit
    // update hit coordinates
    this.hitCoordinates.push(coordinates);
  }
  isSunk() {
    if (this.length === this.hitCoordinates.length) {
      return true;
    }
    return false;
  }
}

const battleShip = new Ship(3);
battleShip.hit([0, 1]);
battleShip.hit([0, 0]);
battleShip.hit([0, 2]);

console.log(battleShip.getHitCoordinates());
