"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Forbidden = exports.BadRequest = exports.NotFoundError = exports.SusscessResponse = exports.AppError = void 0;
const httpCode_1 = require("@/utils/httpCode");
const reasonError_1 = require("@/utils/reasonError");
class AppError extends Error {
    constructor(message, httpCode, errorType) {
        super(message);
        this.httpCode = httpCode;
        this.errorType = errorType;
        this.isOperational = true;
    }
}
exports.AppError = AppError;
class SusscessResponse {
    constructor({ message = '', httpCode = httpCode_1.HttpCode.OK, errorType = '', metadata = {} }) {
        this.httpCode = httpCode;
        this.message = message;
        this.metadata = metadata;
    }
    send(res, headers = {}) {
        return res.status(this.httpCode || httpCode_1.HttpCode.OK).json(this);
    }
}
exports.SusscessResponse = SusscessResponse;
class NotFoundError extends AppError {
    constructor(message, httpCode = 404, errorType = reasonError_1.ReasonPhrases.NOT_FOUND) {
        super(message, httpCode, errorType);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequest extends AppError {
    constructor(message, httpCode = httpCode_1.HttpCode.BAD_REQUEST, errorType = reasonError_1.ReasonPhrases.BAD_REQUEST) {
        super(message, httpCode, errorType);
    }
}
exports.BadRequest = BadRequest;
class Forbidden extends AppError {
    constructor(message, httpCode = httpCode_1.HttpCode.FORBIDDEN, errorType = reasonError_1.ReasonPhrases.FORBIDDEN) {
        super(message, httpCode, errorType);
    }
}
exports.Forbidden = Forbidden;
