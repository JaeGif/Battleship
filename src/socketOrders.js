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

  invokeListeners() {
    this.socket.on('joined_room', (payload) =>
      this.successfullyJoinedRoom(payload)
    );
    this.socket.on('disconnect', () => this.disconnect());
    this.socket.on('receiveAttack', () => this.receiveAttack());
  }
}
