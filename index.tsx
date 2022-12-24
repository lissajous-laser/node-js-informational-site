import http from 'http';
import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'node:http';

const writeServerErrResponse = (res: ServerResponse<IncomingMessage>) => {
  res.writeHead(500, {'Content-Type': 'text/html'});
  res.write(`500 Internal Server Error`);
  console.log('500 Internal Server Error')
};

const writeServerResponse = (res: ServerResponse<IncomingMessage>, path: string) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      writeServerErrResponse(res);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  })
};

http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      writeServerResponse(res, './pages/index.html');
      break;
    case '/about':
      writeServerResponse(res, './pages/about.html');
      break;
    case '/contact-me':
      writeServerResponse(res, './pages/contact-me.html');
      break;
    default:
      fs.readFile('./pages/404.html', 'utf8', (err, data) => {
        if (err) {
          writeServerErrResponse(res);
        } else {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        }
      });
      break;
  }
}).listen(8080);

