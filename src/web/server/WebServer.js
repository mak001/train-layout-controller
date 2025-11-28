import path from 'path';
import express from 'express';

import trainRouter from './api/trainsRouter.js';

const PORT = process.env.PORT || 3000;
const baseApiPath = '/api';

export default class WebServer {
  #server;

  constructor() {
    this.#server = express();
    this.setUpRoutes();
  }

  start() {
    this.#server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}/`);
    });
  }

  setUpRoutes() {
    this.#server.use(express.static(path.resolve(__dirname, '../front-end')));

    this.#server.use(`${baseApiPath}/trains`, trainRouter);
    this.#server.use(baseApiPath, (req, res) => {
      res.status(404);
      res.json({ message: 'unknown api endpoint' });
    });

    this.#server.use((req, res) => {
      res.status(404);
      res.sendFile(path.resolve(__dirname, '../front-end/404.html'));
    });
  }
}
