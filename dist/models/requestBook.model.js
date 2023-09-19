"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestBookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    descriptions: {
        type: String,
        required: false
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
//Export the model
exports.default = mongoose_1.default.model('RequestBook', requestBookSchema);
