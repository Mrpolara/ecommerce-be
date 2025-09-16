import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const HTTPS_PORT = process.env.HTTPS_APP_PORT || 1008;
const HTTP_PORT = process.env.HTTP_APP_PORT || 1009;

http.createServer((req, res) => {
    res.writeHead(301, {
        Location: 'https://' + req.headers.host + req.url,
    });
    res.end();
}).listen(HTTP_PORT, () => {
    console.log(`http url --->  http://localhost:${HTTP_PORT}`);
});

const keyPath = path.resolve(process.cwd(), 'certs/key.pem');
const certPath = path.resolve(process.cwd(), 'certs/cert.pem');

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`https url --->  https://localhost:${HTTPS_PORT}`);
});
