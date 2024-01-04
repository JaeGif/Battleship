import { GameState } from './objects/stateManagers.js';
import Gameboards from './objects/gameboard.js';
import Players from './players/player.js';
import { newGame } from './gameloop.js';
import { createBoards } from './dom/ui.js';
import Ship from './objects/ships.js';
import { clientSocketHandler } from './services/socket.js';
const mainGamePage = document.getElementById('game');
const shipPlacementPage = document.getElementById(
  'placement-page-body-container'
);
export default class SocketClientOrders {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.room = '';
    this.joinerOrCreator = '';
  }
  receiveAttack(payload) {
    let opponent = GameState.players[1];
    let myBoard = GameState.boards[0];
    GameState.turn = 'player';
    opponent.attack(payload.coordinates, myBoard, true);
  }
  receiveRadar(payload) {
    // payload | {grid: HTMLdivElement, count: number}
    console.log(payload);
    const gridEl = document.getElementById(`${payload.grid.id}`);
    gridEl.textContent = `${payload.count}`;
    gridEl.classList.add('radar');
  }
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
    shipPlacementPage.style.display = ' none';
    mainGamePage.style.display = 'flex';
    // here all the ships have been placed

    createBoards();
  }

  createOpponentBoard(shipCoords) {
    for (let i = 0; i < shipCoords.length; i++) {
      const newShip = new Ship(
        shipCoords[i].object.length,
        shipCoords[i].object.name
      );
      GameState.boards[1].addShip(newShip, shipCoords[i].location);
    }
    this.socket.emit('increment_ready_check');
  }
  invokeListeners() {
    this.socket.on('receive_radar', (payload) => this.receiveRadar(payload));
    this.socket.on('receive_attack', (payload) => this.receiveAttack(payload));
    this.socket.on('send_board', (shipCoords) =>
      this.createOpponentBoard(shipCoords)
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
  }
}

const initializeBoards = (opponentName) => {
  const menu = document.getElementById('menu');
  const addShips = document.getElementById('placement-page-body-container');

  const onlinePlayerName = document.getElementById('online-player-input');

  if (clientSocketHandler.joinerOrCreator === 'joiner') {
    opponentName = opponentName.creator;
  } else opponentName = opponentName.joiner;
  console.log('opps: ', opponentName);
  let currentPlayer = new Players(onlinePlayerName.value);
  let opponentPlayer = new Players(opponentName);

  GameState.players.push(currentPlayer);
  GameState.players.push(opponentPlayer);

  const playerBoard = new Gameboards(onlinePlayerName.value);
  const opponentBoard = new Gameboards(opponentName);

  GameState.boards.push(playerBoard);
  GameState.boards.push(opponentBoard);

  addShips.style.display = 'flex';
  menu.style.display = 'none';

  newGame();
};
