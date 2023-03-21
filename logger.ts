import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const transport = new winston.transports.DailyRotateFile({
  filename: __dirname + '/public/logs/app-%DATE%.log',
  datePattern: 'YYYY_MM_DD_HH',
  zippedArchive: true,
  maxSize: '300k',
  maxFiles: '1d',
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: __dirname + '/public/logs/app-error%DATE%.log',
  datePattern: 'YYYY_MM_DD',
  zippedArchive: false,
  maxSize: '1m',
  maxFiles: '3h',
  level: 'error'
});

const loggingInstance = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json()
    ),
  defaultMeta: { service: 'user-service' },
  transports: [transport, errorTransport]
});

loggingInstance.add(new winston.transports.Console());

export const logger = loggingInstance;
