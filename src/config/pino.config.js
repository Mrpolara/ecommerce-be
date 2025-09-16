import pino from 'pino';

const helperFunctionPath = '../helpers/pino.helper.js';

const logger = pino({
    transport: {
        target: helperFunctionPath,
        options: {
            colorize: true,
            ignore: 'pid,hostname,name,level,time',
        },
    },
});

export default logger;
