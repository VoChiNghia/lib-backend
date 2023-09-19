"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Định nghĩa schema cho phiếu phạt
const penaltySchema = new mongoose_1.default.Schema({
    bookId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    requireRecover: { type: String, required: true }
});
exports.default = mongoose_1.default.model('Penalty', penaltySchema);
