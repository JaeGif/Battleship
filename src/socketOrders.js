import { GameState } from './objects/stateManagers.js';
import Gameboards from './objects/gameboard.js';
import Players from './players/player.js';
import { newGame } from './gameloop.js';
import { createBoards } from './dom/ui.js';

const mainGamePage = document.getElementById('game');
const shipPlacementPage = document.getElementById(
  'placement-page-body-container'
);
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
  beginGame() {
    shipPlacementPage.style.display = 'none';
    mainGamePage.style.display = 'flex';
    // here all the ships have been placed
    console.log('passing');
    createBoards();
  }

  createOpponentBoard(opponentBoard) {
    console.log('creating');
    GameState.boards.push(opponentBoard);
    this.socket.emit('increment_ready_check');
  }
  invokeListeners() {
    console.log('invoked');
    this.socket.on('send_board', (opponentBoard) =>
      this.createOpponentBoard(opponentBoard)
    );
    this.socket.on('begin_full_game', () => this.beginGame());
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
  let opponentPlayer = new Players(opponentName);

  GameState.players.push(currentPlayer);
  GameState.players.push(opponentPlayer);

  const playerBoard = new Gameboards(onlinePlayerName);

  GameState.boards.push(playerBoard);

  addShips.style.display = 'flex';
  menu.style.display = 'none';

  newGame();
};
