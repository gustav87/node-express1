import { Server } from "socket.io";
import http from 'http';

function init(server:http.Server): void {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`);
      io.emit('chat message response', msg);
    });
  });
};


export const socketService = init;
