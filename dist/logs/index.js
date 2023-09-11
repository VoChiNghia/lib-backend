"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
require("winston-daily-rotate-file");
const str = path_1.default.join(__dirname, '');
const transport = new winston_1.default.transports.DailyRotateFile({
    filename: path_1.default.join(__dirname, '..', 'logsFile', `%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d'
});
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.label({ label: 'track logs system:' }), winston_1.default.format.timestamp(), winston_1.default.format.prettyPrint()),
    transports: [transport]
});
exports.default = logger;
