import { io } from 'socket.io-client';
import SocketClientOrders from '../socketOrders.js';

const socket = io('https://battleshipserver-production.up.railway.app', {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  transports: ['websocket'],
});

const clientSocketHandler = new SocketClientOrders(io, socket);

export { socket, clientSocketHandler };
