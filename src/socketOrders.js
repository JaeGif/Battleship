import { GameState } from './objects/stateManagers';
import Gameboards from './objects/gameboard';
import Players from './players/player';
import { newGame } from './gameloop';

export default class SocketClientOrders {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.room = '';
  }
  sendAttack() {}
  receiveAttack() {}
  disconnect() {}
  sendMessage() {}
  successfullyJoinedRoom(payload) {
    this.room = payload;
    console.log('Successfully connected client!', this.room);
    document.getElementById('room-id-text').textContent = 'Room: ' + this.room;
  }
  failedToJoinRoom() {
    document.getElementById('room-id-text').style.display = 'flex';
    document.getElementById('room-id-text').textContent = 'Room unavailable';
    document.getElementById('room-id-text').style.color = 'red';
  }
  initializeGame(opponentName) {
    initializeBoards(opponentName);
  }

  invokeListeners() {
    this.socket.on('initialize_game', (opponentName) =>
      this.initializeGame(opponentName)
    );
    this.socket.on('joined_room', (payload) =>
      this.successfullyJoinedRoom(payload)
    );
    this.socket.on('failed_to_join', () => this.failedToJoinRoom());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('receiveAttack', () => this.receiveAttack());
  }
}

const initializeBoards = (opponentName) => {
  const menu = document.getElementById('menu');
  const addShips = document.getElementById('placement-page-body-container');

  const onlinePlayerName = document.getElementById('online-player-name');

  let currentPlayer = new Players(onlinePlayerName.value);
  let enemyPlayer = new Players(opponentName);

  GameState.players.push(currentPlayer);
  GameState.players.push(enemyPlayer);

  const playerBoard = new Gameboards(onlinePlayerName);
  const opponentBoard = new Gameboards(opponentName);

  GameState.boards.push(playerBoard);
  GameState.boards.push(opponentBoard);

  addShips.style.display = 'flex';
  menu.style.display = 'none';

  newGame();
};
