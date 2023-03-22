import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './logger';
import serveIndex from 'serve-index';
import http from 'http';
import { socketService } from './SocketService'
import { fetchService } from './FetchService'
import { rabbitSendService } from './RabbitSendService'
import { rabbitReceiveService } from './RabbitReceiveService'

dotenv.config();
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

// Start socket.io
socketService(server);

// Load SHMI times
//fetchService.getSmhiTimes().then(res => console.log(res));

// Start RabbitMQ publisher
rabbitSendService.send("hello there", "hello");
//setInterval(() => rabbitSendService.send("yo", "hello"), 5000);

// Start RabbitMQ consumer
rabbitReceiveService.receive("hello");

// Load index.html
app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});

// Load styles in index.html
app.get('/styles.css', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/styles.css');
});

// Configure log path
app.use(express.static(__dirname + '/public'));
app.use('/logs', express.static(__dirname + '/public/logs'), serveIndex(__dirname + '/public/logs'));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

setInterval(() => logger.info("cheese"), 100000);

