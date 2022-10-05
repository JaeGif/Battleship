class GameState {
  // gamestate object keeps track of details about the games current state
  static turn = 'player';
  static players = [];
  static boards = [];
  static mode = 'PvP';
  static wasHit = false;
  static cpuAttacked = [];
  static gameOver = false;
  static justSunk = '';
  static sunkEventFlag = false;
}
class CpuGameState {
  static cpuLastHit = [];
  static cpuTargetingAid = [];
  static attempts = 0;
}
class UiState {
  static axis = 'x';
  static currentShip = [];
  static currentShipIndex = 0;
  static currentPlacementBoard = 'player';
}
export { GameState, CpuGameState, UiState };
