"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketService = void 0;
const socket_io_1 = require("socket.io");
function init(server) {
    const io = new socket_io_1.Server(server);
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
}
;
exports.socketService = init;
