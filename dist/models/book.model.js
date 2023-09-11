"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Types } = mongoose_1.default;
const bookSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishingYear: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose_1.default.Schema.Types.Mixed
    },
    format: {
        type: Array,
        default: []
    },
    summary: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    images: [],
    coverImage: {
        type: String,
        default: 'https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg'
    },
    language: {
        type: String,
        default: 'vn'
    }
}, { timestamps: true });
//Export the model
exports.default = mongoose_1.default.model('Book', bookSchema);
