"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const writeServerErrResponse = (res) => {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.write(`500 Internal Server Error`);
    console.log('500 Internal Server Error');
};
const writeServerResponse = (res, path) => {
    fs_1.default.readFile(path, 'utf8', (err, data) => {
        if (err) {
            writeServerErrResponse(res);
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
};
http_1.default.createServer((req, res) => {
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
            fs_1.default.readFile('./pages/404.html', 'utf8', (err, data) => {
                if (err) {
                    writeServerErrResponse(res);
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
            break;
    }
}).listen(8080);
