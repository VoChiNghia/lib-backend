"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Types } = mongoose_1.default;
const borrowSchema = new mongoose_1.default.Schema({
    userId: { type: Types.ObjectId, ref: 'User', require },
    bookId: { type: Types.ObjectId, ref: 'Book', require },
    borrowedDate: {
        type: Date,
        require
    },
    returnDate: {
        type: Date,
        require
    },
    status: {
        type: String,
        // enum: ['pending', 'borrowed', 'returned', 'due', 'approved'],
        default: 'pending'
    }
}, {
    timestamps: true
});
//Export the model
exports.default = mongoose_1.default.model('BorrowBook', borrowSchema);
