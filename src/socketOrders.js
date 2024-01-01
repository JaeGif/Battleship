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

  invokeListeners() {
    this.socket.on('joined_room', (payload) =>
      this.successfullyJoinedRoom(payload)
    );
    this.socket.on('failed_to_join', () => this.failedToJoinRoom());
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('receiveAttack', () => this.receiveAttack());
  }
}
