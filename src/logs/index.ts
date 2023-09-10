import winston from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'
const str = path.join(__dirname, '')

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '..', 'logsFile', `%DATE%.log`),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d'
})

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'track logs system:' }),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [transport]
})

export default logger