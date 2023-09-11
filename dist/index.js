"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const httpCode_1 = require("./utils/httpCode");
const helpper_1 = require("./helpper");
const db_init_1 = __importDefault(require("./database/db.init"));
const logs_1 = __importDefault(require("./logs"));
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
new db_init_1.default();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.router();
    }
    config() {
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/public', express_1.default.static('public'));
        this.app.use(express_1.default.json({ limit: '50mbb' }));
    }
    router() {
        this.app.use('/', router_1.default);
        this.app.use((req, res, next) => {
            const err = new helpper_1.NotFoundError('Not found');
            logs_1.default.error('Not found');
            next(err);
        });
        this.app.use((err, req, res, next) => {
            const error = err.httpCode ? err.httpCode : httpCode_1.HttpCode.INTERNAL_SERVER_ERROR;
            return new helpper_1.SusscessResponse({
                message: err.message,
                httpCode: error
            }).send(res);
        });
    }
}
exports.default = new App().app;
