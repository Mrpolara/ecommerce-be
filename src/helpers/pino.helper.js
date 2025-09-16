import prettyFactory from 'pino-pretty';
import { Writable } from 'stream';

export default (options) => {
    const pretty = prettyFactory(options);
    const maxMethodLength = 'DELETE'.length; // Longest HTTP method type

    return new Writable({
        write(chunk, enc, cb) {
            const logData = chunk.toString();
            const log = JSON.parse(logData);
            const timeColor = '\x1b[36m'; // Cyan
            const methodColor = '\x1b[33m'; // Yellow
            const urlColor = '\x1b[35m'; // Magenta
            const durationColor = '\x1b[32m'; // Green
            const resetColor = '\x1b[0m'; // Reset color

            // Custom format for pino-http logs
            if (log.req && log.res) {
                const time = new Date(log.time).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short',
                });

                const method = log.req.method.padEnd(maxMethodLength); // Add padding
                const duration = log.responseTime
                    ? `${log.responseTime.toFixed(2)}ms`
                    : 'N/A';

                const formattedLog =
                    `${timeColor}[${time}]${resetColor} ` +
                    `${methodColor}${method}${resetColor} ` +
                    `${urlColor}${log.req.url}${resetColor} ` +
                    `${durationColor}${duration}${resetColor}\n`;
                process.stdout.write(formattedLog);
            } else {
                // Fallback for other logs, using pino-pretty for standard formatting
                const standardLog = pretty(logData);
                process.stdout.write(standardLog);
            }

            cb();
        },
    });
};
