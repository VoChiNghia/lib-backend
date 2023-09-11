"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = exports.findAllUser = void 0;
const user_model_1 = __importDefault(require("../user.model"));
const findAllUser = async (select = '') => {
    return await user_model_1.default.find().lean().select(select);
};
exports.findAllUser = findAllUser;
const findUser = async (payload, select = '') => {
    return await user_model_1.default.findById(payload).lean().select(select);
};
exports.findUser = findUser;
