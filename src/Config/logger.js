// logger.js
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = './logs';

const transport = new DailyRotateFile({
  filename: `${logDir}/service-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '10m',
  maxFiles: '7d'  // ⏳ Keep logs for 7 days
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    transport
  ]
});

export default logger;
