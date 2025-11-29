import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import DataStore from 'train-controller/DataStore';

const PORT = process.env.PORT || 3000;

export default class WebServer {
  #expressServer;
  #wsServer;
  #server;

  #wsClients;

  constructor() {
    this.#wsClients = new Set();
    this.#expressServer = express();
    this.#server = createServer(this.#expressServer);

    this.#expressServer.use(express.static(path.resolve(__dirname, '../front-end')));
    this.#expressServer.use((req, res) => {
      res.status(404);
      res.sendFile(path.resolve(__dirname, '../front-end/404.html'));
    });
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
      wsClient.send(DataStore.store);

      wsClient.on('message', (message) => {
        console.log(`Received message from ${clientIp}: ${message}`);
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

    const interval = setInterval(function ping() {
      this.#wsServer.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
          return ws.terminate();
        }

        ws.isAlive = false;

        ws.ping();
      });
    }, 30000);

    this.#wsServer.on('close', function close() {
      clearInterval(interval);
    });
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    this.#wsClients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  }
}
