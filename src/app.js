import express from 'express';
import logger from './config/pino.config.js';
import PinoHttp from 'pino-http';

const app = express();

app.use(PinoHttp({ logger }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;
