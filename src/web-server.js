const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { PORT } = process.env;

const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.resolve(__dirname, './web/index.html'), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error ... ' + err);
        return;
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
