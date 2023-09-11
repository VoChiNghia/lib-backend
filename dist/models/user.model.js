"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Declare the Schema of the Mongo model
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String
    },
    studentCode: {
        type: String
    },
    role: { type: String, default: 'user' },
    borrowedBook: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'BorrowBook'
        }
    ]
}, {
    timestamps: true
});
userSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
//Export the model
exports.default = mongoose_1.default.model('User', userSchema);
