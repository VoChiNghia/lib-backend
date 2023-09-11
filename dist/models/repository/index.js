"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../user.model"));
const findUserByEmail = async (email) => {
    return await user_model_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
