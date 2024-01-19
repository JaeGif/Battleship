import { io } from 'socket.io-client';
import SocketClientOrders from '../socketOrders.js';

const socket = io('http://localhost:8080', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
});

const clientSocketHandler = new SocketClientOrders(io, socket);

export { socket, clientSocketHandler };
