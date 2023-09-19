"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Types } = mongoose_1.default;
const blogSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    thumbnail: {
        type: String,
        required: true,
        default: 'https://www.wpbeginner.com/wp-content/uploads/2020/04/featuredimageswp-og.png'
    },
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', require: true },
}, { timestamps: true });
//Export the model
exports.default = mongoose_1.default.model('Blog', blogSchema);
