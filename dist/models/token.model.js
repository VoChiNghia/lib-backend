"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Declare the Schema of the Mongo model
const tokenSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    refreshToken: {
        type: String,
        require: true
    },
    publicKey: {
        type: String,
        require: true
    },
    privateKey: {
        type: String,
        require: true
    },
    refreshTokenUsed: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});
//Export the model
exports.default = mongoose_1.default.model('Token', tokenSchema);
