import http from 'http';
import fs from 'fs';
import path from 'path';

import { default as apiHandler } from './api/index';

const PORT = process.env.PORT || 3000;

// don't really need other mime types for this app
const typeMap = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  json: 'application/json',
  gif: 'image/gif',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
};

const routes = [
  {
    path: /^\/api(\/(.*))*$/,
    contentType: 'application/json',
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

  handleFile(req, res) {
    const { url } = req;
    const filePath = path.resolve(__dirname, `../front-end${url === '/' ? '/index.html' : url}`);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
        return;
      }
      res.statusCode = 200;
      res.end(data);
    });
  }

  handleRequest(req, res) {
    const { url } = req;
    if (url === '/') {
      res.setHeader('Content-Type', typeMap['html']);
      this.handleFile(req, res);
      return;
    }

    for (const type in typeMap) {
      if (url.endsWith(`.${type}`)) {
        res.setHeader('Content-Type', typeMap[type]);
        this.handleFile(req, res);
        return;
      }
    }

    for (const route of routes) {
      if (!route.path) {
        continue;
      }
      const match = url.match(route.path);

      if (!match) {
        continue;
      }

      if (route.contentType) {
        res.setHeader('Content-Type', route.contentType);
      }

      if (route.handler && typeof route.handler === 'function') {
        route.handler(req, res);
        return;
      }

      if (route.file && route.contentType) {
        this.handleFile(req, res);
        return;
      }
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
}
