"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configDatabase = {
    mongodb: {
        name: process.env.NAME,
        password: process.env.PASSWORD,
        host: process.env.HOST
    }
};
exports.default = configDatabase;
