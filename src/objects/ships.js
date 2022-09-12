class Ship {
  constructor(length) {
    this.length = length;
    this.shipStruckPositions = null;
    this.shipPositions = Array(this.length);
  }
  hit(position) {
    // marks position on specific ship as hit
    // do stuff, then update hits
    // update struckPositions
  }
  isSunk() {
    if (this.shipPositions === this.shipStruckPositions) {
      return true;
    }
    return false;
  }
}
