import http from 'http';
import fs from 'fs';
import path from 'path';

import { default as apiHandler } from '../server/index.js';

const PORT = process.env.PORT || 3000;

const routes = [
  {
    path: /^\/(|index.*)$/,
    file: 'index.html',
    contentType: 'text/html',
  },
  {
    path: /^\/styles\.css$/,
    file: 'styles.css',
    contentType: 'text/css',
  },
  {
    path: /^\/script\.js$/,
    file: 'script.js',
    contentType: 'application/javascript',
  },
  {
    path: /^\/api\/(.+)$/,
    handler: apiHandler,
  },
];

export default class WebServer {
  #server;

  constructor() {
    this.#server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
  }

  start() {
    this.#server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}/`);
    });
  }

  handleRequest(req, res) {
    const { url } = req;
    for (const route of routes) {
      if (route.path) {
        const match = url.match(route.path);

        if (!match) {
          continue;
        }

        if (route.handler && typeof route.handler === 'function') {
          route.handler(req, res);
          return;
        }

        if (route.file && route.contentType) {
          fs.readFile(path.resolve(__dirname, `./front-end/${route.file}`), (err, data) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Internal Server Error ... ' + err);
              return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', route.contentType);
            res.end(data);
          });
          return;
        }
      }
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
}
