import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import DataStore from 'train-controller/DataStore';
import PowerHandler from 'train-controller/server/messageHandlers/PowerHandler';

const PORT = process.env.PORT || 3000;

export default class WebServer {
  #expressServer;
  #wsServer;
  #server;

  #wsClients;
  #messageHandlers = [
    PowerHandler,
  ];

  constructor() {
    this.#wsClients = new Set();
    this.#expressServer = express();
    this.#server = createServer(this.#expressServer);

    this.#expressServer.use(express.static(path.resolve(__dirname, '../../front-end/dist')));
    this.#expressServer.use((req, res) => res.sendFile(path.resolve(__dirname, '../../front-end/dist/index.html')));
  }

  get wsServer() {
    return this.#wsServer;
  }

  start() {
    this.#server.listen(PORT, () => {
      console.log(`WebSocket server running on port ${PORT}/`);
    });

    this.#wsServer = new WebSocketServer({ server: this.#server, clientTracking: true });
    this.#wsServer.on('connection', (wsClient, request) => {
      const clientIp = request.socket.remoteAddress;
      console.log(`New WebSocket connection established from ${clientIp}`);
      this.#wsClients.add(wsClient);
      wsClient.isAlive = true;
      wsClient.send(JSON.stringify(DataStore.store));

      wsClient.on('message', (message) => {
        console.log(`Received message from ${clientIp}: ${message}`);
        const data = JSON.parse(message);

        for (const handler of this.#messageHandlers) {
          if (handler.shouldHandle(data)) {
            handler.handleMessage(data);
          }
        }
      });

      wsClient.on('close', () => {
        console.log(`WebSocket connection from ${clientIp} closed`);
      });

      wsClient.on('error', (error) => {
        console.error(`WebSocket error from ${clientIp}:`, error);
      });

      wsClient.on('pong', () => {
        wsClient.isAlive = true;
      });

      wsClient.on('close', () => {
        this.#wsClients.delete(wsClient);
      });
    });

    const interval = setInterval(() => {
      this.#wsServer.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);

    this.#wsServer.on('close', () => {
      clearInterval(interval);
    });
  }

  broadcast(data) {
    let message = data;

    if (typeof message === 'object' && message !== null) {
      message = JSON.stringify(message);
    }

    if (typeof message !== 'string') {
      console.error('WebServer.broadcast: data must be string or object');
      return;
    }

    this.#wsClients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }
}
