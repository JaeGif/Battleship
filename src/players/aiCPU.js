class computerPlayer {
  randomMove() {
    // pick a random valid coordinate and attack it
  }

  smartMove() {
    // attack a neighboring position from where the last attack landed.
    // ex.
    /* 
    mock board
    0    0    0    0    0
    0    0    next 0    0 
    0    next hit  next 0
    0    0    next 0    0 
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    */
  }

  killMove() {
    // if there are 2 hits in a row, signaling a likely line for a ship to reside, keeping attack in that line until the ship is sunk
    // or there is a miss.
    /* 
    mock board
    0    0    next 0    0
    0    0    hit  0    0 
    0    0    hit  0    0
    0    0    next 0    0 
    0    0    0    0    0
    0    0    0    0    0
    0    0    0    0    0
    */
  }
}
