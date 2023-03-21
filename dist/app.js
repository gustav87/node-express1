"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./logger");
const serve_index_1 = __importDefault(require("serve-index"));
const http_1 = __importDefault(require("http"));
const SocketService_1 = require("./SocketService");
const RabbitService_1 = require("./RabbitService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = http_1.default.createServer(app);
// Start socket.io
(0, SocketService_1.socketService)(server);
// Load SHMI times
//fetchService.getSmhiTimes().then(res => console.log(res));
// Start RabbitMQ
RabbitService_1.rabbitService.connect();
// Load index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Load styles in index.html
app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css');
});
// Configure log path
app.use(express_1.default.static(__dirname + '/public'));
app.use('/logs', express_1.default.static(__dirname + '/public/logs'), (0, serve_index_1.default)(__dirname + '/public/logs'));
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
setInterval(() => logger_1.logger.info("cheese"), 100000);
