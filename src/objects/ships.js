class Ship {
  constructor(length, name = null) {
    this.name = name;
    this.length = length;
    this.hitCoordinates = [];
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

export default Ship;
