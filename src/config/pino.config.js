import pino from 'pino';

const logger = pino({
   transport: {
      target: 'pino-pretty', // enables colored, pretty logs
      options: {
         colorize: true,
         translateTime: 'SYS:standard', // adds timestamp
         ignore: 'pid,hostname' // remove extra fields
      }
   }
});

export default logger;
